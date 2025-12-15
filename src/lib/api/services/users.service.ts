// Users Service
// Handles all user-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    User,
    UserPreferences,
    UserActivity,
    Notification,
    PaginatedResponse,
} from '@/types';

export interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const usersService = {
    /**
     * Get user profile
     */
    async getProfile(): Promise<User> {
        const response = await apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE);
        return response.data;
    },

    /**
     * Update user profile
     */
    async updateProfile(data: UpdateProfileData): Promise<User> {
        const response = await apiClient.patch<User>(
            API_ENDPOINTS.USERS.UPDATE_PROFILE,
            data
        );
        return response.data;
    },

    /**
     * Upload avatar
     */
    async uploadAvatar(file: File): Promise<{ url: string }> {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await apiClient.upload<{ url: string }>(
            `${API_ENDPOINTS.USERS.PROFILE}/avatar`,
            formData
        );
        return response.data;
    },

    /**
     * Change password
     */
    async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>(
            API_ENDPOINTS.USERS.CHANGE_PASSWORD,
            data
        );
        return response.data;
    },

    /**
     * Get user preferences
     */
    async getPreferences(): Promise<UserPreferences> {
        const response = await apiClient.get<UserPreferences>(
            API_ENDPOINTS.USERS.PREFERENCES
        );
        return response.data;
    },

    /**
     * Update user preferences
     */
    async updatePreferences(data: Partial<UserPreferences>): Promise<UserPreferences> {
        const response = await apiClient.patch<UserPreferences>(
            API_ENDPOINTS.USERS.PREFERENCES,
            data
        );
        return response.data;
    },

    /**
     * Get user notifications
     */
    async getNotifications(filters?: {
        read?: boolean;
        type?: string;
        page?: number;
        limit?: number
    }): Promise<PaginatedResponse<Notification>> {
        const response = await apiClient.get<PaginatedResponse<Notification>>(
            API_ENDPOINTS.USERS.NOTIFICATIONS,
            { params: filters }
        );
        return response.data;
    },

    /**
     * Mark notification as read
     */
    async markNotificationRead(id: string): Promise<Notification> {
        const response = await apiClient.patch<Notification>(
            `${API_ENDPOINTS.USERS.NOTIFICATIONS}/${id}/read`
        );
        return response.data;
    },

    /**
     * Mark all notifications as read
     */
    async markAllNotificationsRead(): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>(
            `${API_ENDPOINTS.USERS.NOTIFICATIONS}/read-all`
        );
        return response.data;
    },

    /**
     * Delete notification
     */
    async deleteNotification(id: string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.USERS.NOTIFICATIONS}/${id}`);
    },

    /**
     * Get user activity log
     */
    async getActivity(filters?: {
        page?: number;
        limit?: number
    }): Promise<PaginatedResponse<UserActivity>> {
        const response = await apiClient.get<PaginatedResponse<UserActivity>>(
            API_ENDPOINTS.USERS.ACTIVITY,
            { params: filters }
        );
        return response.data;
    },

    /**
     * Delete user account
     */
    async deleteAccount(password: string): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>(
            `${API_ENDPOINTS.USERS.BASE}/delete`,
            { password }
        );
        return response.data;
    },
};
