// Authentication Service
// Handles all authentication-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config';
import type {
    User,
    LoginCredentials,
    RegisterData,
    LoginResponse,
    RegisterResponse,
    AuthResponse,
    PasswordResetRequest,
    PasswordResetConfirm,
    GoogleAuthResponse,
} from '@/types';

export const authService = {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<LoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials,
            { skipAuth: true }
        );

        const data = response.data;

        // Store tokens and user
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

        // Return in standard format
        return {
            user: data.user,
            tokens: {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                expiresIn: data.expires_in,
            },
        };
    },

    /**
     * Register new user
     */
    async register(data: RegisterData): Promise<RegisterResponse> {
        const response = await apiClient.post<RegisterResponse>(
            API_ENDPOINTS.AUTH.REGISTER,
            data,
            { skipAuth: true }
        );

        return response.data;
    },

    /**
     * Get Google OAuth URL for login
     */
    async getGoogleAuthUrl(): Promise<{ auth_url: string }> {
        const response = await apiClient.get<{ auth_url: string }>(
            API_ENDPOINTS.AUTH.GOOGLE_LOGIN,
            { skipAuth: true }
        );
        // Handle both wrapped and unwrapped responses
        // Backend may return { auth_url: "..." } or { data: { auth_url: "..." } }
        const data = response.data || response;
        if (!data.auth_url && (data as unknown as { authorization_url?: string }).authorization_url) {
            // Backend might use authorization_url instead of auth_url
            return { auth_url: (data as unknown as { authorization_url: string }).authorization_url };
        }
        return data as { auth_url: string };
    },

    /**
     * Handle Google OAuth callback
     */
    async handleGoogleCallback(code: string): Promise<GoogleAuthResponse> {
        const response = await apiClient.get<GoogleAuthResponse>(
            `${API_ENDPOINTS.AUTH.GOOGLE_CALLBACK}?code=${code}`,
            { skipAuth: true }
        );

        const data = response.data;

        // Store tokens and user
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

        return data;
    },

    /**
     * Authenticate with Google ID token (for client-side OAuth)
     */
    async loginWithGoogleToken(idToken: string): Promise<GoogleAuthResponse> {
        const response = await apiClient.post<GoogleAuthResponse>(
            API_ENDPOINTS.AUTH.GOOGLE_TOKEN,
            { id_token: idToken },
            { skipAuth: true }
        );

        const data = response.data;

        // Store tokens and user
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

        return data;
    },

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
        }
    },

    /**
     * Get current user profile
     */
    async getCurrentUser(): Promise<User> {
        const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
        return response.data;
    },

    /**
     * Refresh access token
     */
    async refreshToken(refreshToken: string): Promise<{ access_token: string; token_type: string; expires_in: number }> {
        const response = await apiClient.post<{ access_token: string; token_type: string; expires_in: number }>(
            API_ENDPOINTS.AUTH.REFRESH_TOKEN,
            { refresh_token: refreshToken },
            { skipAuth: true }
        );

        if (response.data.access_token) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.access_token);
        }

        return response.data;
    },

    /**
     * Request password reset email
     */
    async forgotPassword(data: PasswordResetRequest): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>(
            API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
            data,
            { skipAuth: true }
        );
        return response.data;
    },

    /**
     * Reset password with token
     */
    async resetPassword(data: PasswordResetConfirm): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>(
            API_ENDPOINTS.AUTH.RESET_PASSWORD,
            data,
            { skipAuth: true }
        );
        return response.data;
    },

    /**
     * Verify email address
     */
    async verifyEmail(token: string): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>(
            API_ENDPOINTS.AUTH.VERIFY_EMAIL,
            { token },
            { skipAuth: true }
        );
        return response.data;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    },

    /**
     * Get stored user from localStorage
     */
    getStoredUser(): User | null {
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },
};
