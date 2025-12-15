// Authentication Service
// Handles all authentication-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config';
import type {
    User,
    LoginCredentials,
    RegisterData,
    AuthResponse,
    AuthTokens,
    PasswordResetRequest,
    PasswordResetConfirm,
} from '@/types';

export const authService = {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials,
            { skipAuth: true }
        );

        if (response.data.tokens) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
        }

        return response.data;
    },

    /**
     * Register new user
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            API_ENDPOINTS.AUTH.REGISTER,
            data,
            { skipAuth: true }
        );

        if (response.data.tokens) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
        }

        return response.data;
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
    async refreshToken(refreshToken: string): Promise<AuthTokens> {
        const response = await apiClient.post<AuthTokens>(
            API_ENDPOINTS.AUTH.REFRESH_TOKEN,
            { refreshToken },
            { skipAuth: true }
        );

        if (response.data.accessToken) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
            if (response.data.refreshToken) {
                localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
            }
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
