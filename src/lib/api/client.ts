// API Client
// Centralized HTTP client with interceptors, error handling, and token management

import { API_CONFIG, STORAGE_KEYS, HTTP_STATUS } from './config';

// Types
export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    success: boolean;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

export interface ApiError {
    message: string;
    code?: string;
    status: number;
    errors?: Record<string, string[]>;
}

export interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
    timeout?: number;
    skipAuth?: boolean;
}

// Token management
const getAccessToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

const getRefreshToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

const setTokens = (accessToken: string, refreshToken?: string): void => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
};

const clearTokens = (): void => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
};

// Build URL with query parameters
const buildUrl = (endpoint: string, params?: Record<string, string | number | boolean | undefined>): string => {
    const baseUrl = `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}`;
    const url = new URL(`${baseUrl}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.append(key, String(value));
            }
        });
    }

    return url.toString();
};

// Build headers
const buildHeaders = (customHeaders?: HeadersInit, skipAuth?: boolean): Headers => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...customHeaders,
    });

    if (!skipAuth) {
        const token = getAccessToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    return headers;
};

// Handle API errors
const handleApiError = async (response: Response): Promise<never> => {
    let errorData: ApiError = {
        message: 'An unexpected error occurred',
        status: response.status,
    };

    try {
        const data = await response.json();
        errorData = {
            message: data.message || data.error || errorData.message,
            code: data.code,
            status: response.status,
            errors: data.errors,
        };
    } catch {
        // Response might not be JSON
        errorData.message = response.statusText || errorData.message;
    }

    // Handle specific status codes
    switch (response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
            // Token expired or invalid - attempt refresh or logout
            clearTokens();
            window.dispatchEvent(new CustomEvent('auth:logout'));
            break;
        case HTTP_STATUS.FORBIDDEN:
            window.dispatchEvent(new CustomEvent('auth:forbidden'));
            break;
        case HTTP_STATUS.TOO_MANY_REQUESTS:
            errorData.message = 'Too many requests. Please try again later.';
            break;
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
            errorData.message = 'Service temporarily unavailable. Please try again later.';
            break;
    }

    throw errorData;
};

// Token refresh logic
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void): void => {
    refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token: string): void => {
    refreshSubscribers.forEach(callback => callback(token));
    refreshSubscribers = [];
};

const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
        const response = await fetch(
            buildUrl('/auth/refresh'),
            {
                method: 'POST',
                headers: buildHeaders(undefined, true),
                body: JSON.stringify({ refreshToken }),
            }
        );

        if (!response.ok) {
            clearTokens();
            return null;
        }

        const data = await response.json();
        setTokens(data.accessToken, data.refreshToken);
        return data.accessToken;
    } catch {
        clearTokens();
        return null;
    }
};

// Main API client class
class ApiClient {
    private async request<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<ApiResponse<T>> {
        const { params, timeout = API_CONFIG.TIMEOUT, skipAuth, ...fetchConfig } = config;

        const url = buildUrl(endpoint, params);
        const headers = buildHeaders(fetchConfig.headers, skipAuth);

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...fetchConfig,
                headers,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // Handle 401 - attempt token refresh
                if (response.status === HTTP_STATUS.UNAUTHORIZED && !skipAuth && !isRefreshing) {
                    isRefreshing = true;
                    const newToken = await refreshAccessToken();
                    isRefreshing = false;

                    if (newToken) {
                        onTokenRefreshed(newToken);
                        // Retry the original request
                        headers.set('Authorization', `Bearer ${newToken}`);
                        const retryResponse = await fetch(url, {
                            ...fetchConfig,
                            headers,
                        });

                        if (retryResponse.ok) {
                            return retryResponse.json();
                        }
                    }
                }

                await handleApiError(response);
            }

            // Handle empty responses
            if (response.status === HTTP_STATUS.NO_CONTENT) {
                return { data: null as T, success: true };
            }

            return response.json();
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof DOMException && error.name === 'AbortError') {
                throw {
                    message: 'Request timeout',
                    status: 408,
                } as ApiError;
            }

            throw error;
        }
    }

    // HTTP Methods
    async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...config, method: 'GET' });
    }

    async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...config, method: 'DELETE' });
    }

    // File upload
    async upload<T>(endpoint: string, formData: FormData, config?: RequestConfig): Promise<ApiResponse<T>> {
        const { skipAuth, ...fetchConfig } = config || {};
        const headers = new Headers();

        if (!skipAuth) {
            const token = getAccessToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }

        const response = await fetch(buildUrl(endpoint), {
            ...fetchConfig,
            method: 'POST',
            headers,
            body: formData,
        });

        if (!response.ok) {
            await handleApiError(response);
        }

        return response.json();
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export utility functions
export { getAccessToken, getRefreshToken, setTokens, clearTokens };
