// Admin Service
// Handles all admin-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config';
import type {
    User,
    Vendor,
    AdminStats,
    AdminUserFilters,
    AdminVendorFilters,
    PaginatedResponse,
    AuthTokens,
} from '@/types';

export interface AdminLoginCredentials {
    email: string;
    password: string;
}

export interface AdminDashboardData {
    stats: AdminStats;
    recentUsers: User[];
    recentVendors: Vendor[];
    recentBookings: unknown[];
    chartData: {
        revenue: { date: string; amount: number }[];
        users: { date: string; count: number }[];
        bookings: { date: string; count: number }[];
    };
}

export const adminService = {
    /**
     * Admin login
     */
    async login(credentials: AdminLoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
        const response = await apiClient.post<{ user: User; tokens: AuthTokens }>(
            API_ENDPOINTS.ADMIN.LOGIN,
            credentials,
            { skipAuth: true }
        );

        if (response.data.tokens) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
            localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(response.data.user));
        }

        return response.data;
    },

    /**
     * Get dashboard data
     */
    async getDashboard(): Promise<AdminDashboardData> {
        const response = await apiClient.get<AdminDashboardData>(
            API_ENDPOINTS.ADMIN.DASHBOARD
        );
        return response.data;
    },

    /**
     * Get admin stats
     */
    async getStats(): Promise<AdminStats> {
        const response = await apiClient.get<AdminStats>(
            `${API_ENDPOINTS.ADMIN.DASHBOARD}/stats`
        );
        return response.data;
    },

    /**
     * Get all users
     */
    async getUsers(filters?: AdminUserFilters): Promise<PaginatedResponse<User>> {
        const response = await apiClient.get<PaginatedResponse<User>>(
            API_ENDPOINTS.ADMIN.USERS,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get user by ID
     */
    async getUserById(id: string): Promise<User> {
        const response = await apiClient.get<User>(
            `${API_ENDPOINTS.ADMIN.USERS}/${id}`
        );
        return response.data;
    },

    /**
     * Update user status
     */
    async updateUserStatus(id: string, status: string): Promise<User> {
        const response = await apiClient.patch<User>(
            `${API_ENDPOINTS.ADMIN.USERS}/${id}/status`,
            { status }
        );
        return response.data;
    },

    /**
     * Delete user
     */
    async deleteUser(id: string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.ADMIN.USERS}/${id}`);
    },

    /**
     * Get all vendors
     */
    async getVendors(filters?: AdminVendorFilters): Promise<PaginatedResponse<Vendor>> {
        const response = await apiClient.get<PaginatedResponse<Vendor>>(
            API_ENDPOINTS.ADMIN.VENDORS,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get vendor by ID
     */
    async getVendorById(id: string): Promise<Vendor> {
        const response = await apiClient.get<Vendor>(
            `${API_ENDPOINTS.ADMIN.VENDORS}/${id}`
        );
        return response.data;
    },

    /**
     * Update vendor status
     */
    async updateVendorStatus(id: string, status: string, reason?: string): Promise<Vendor> {
        const response = await apiClient.patch<Vendor>(
            `${API_ENDPOINTS.ADMIN.VENDORS}/${id}/status`,
            { status, reason }
        );
        return response.data;
    },

    /**
     * Verify vendor
     */
    async verifyVendor(id: string): Promise<Vendor> {
        const response = await apiClient.post<Vendor>(
            `${API_ENDPOINTS.ADMIN.VENDORS}/${id}/verify`
        );
        return response.data;
    },

    /**
     * Delete vendor
     */
    async deleteVendor(id: string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.ADMIN.VENDORS}/${id}`);
    },

    /**
     * Get analytics
     */
    async getAnalytics(period?: 'week' | 'month' | 'year'): Promise<unknown> {
        const response = await apiClient.get(
            API_ENDPOINTS.ADMIN.ANALYTICS,
            { params: { period } }
        );
        return response.data;
    },

    /**
     * Generate report
     */
    async generateReport(type: 'users' | 'vendors' | 'bookings' | 'revenue', params?: Record<string, unknown>): Promise<{ url: string }> {
        const response = await apiClient.post<{ url: string }>(
            API_ENDPOINTS.ADMIN.REPORTS,
            { type, ...params }
        );
        return response.data;
    },

    /**
     * Check if admin is logged in
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    },

    /**
     * Get stored admin from localStorage
     */
    getStoredAdmin(): User | null {
        const adminStr = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
        if (adminStr) {
            try {
                return JSON.parse(adminStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    /**
     * Logout admin
     */
    logout(): void {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    },
};
