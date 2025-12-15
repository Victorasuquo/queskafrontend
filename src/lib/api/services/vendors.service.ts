// Vendors Service
// Handles all vendor-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config';
import type {
    Vendor,
    VendorListing,
    VendorRegisterData,
    CreateListingData,
    PaginatedResponse,
    Booking,
    AuthTokens,
} from '@/types';

export interface VendorLoginCredentials {
    email: string;
    password: string;
}

export interface VendorAnalytics {
    revenue: {
        total: number;
        thisMonth: number;
        lastMonth: number;
        growth: number;
    };
    bookings: {
        total: number;
        thisMonth: number;
        pending: number;
        confirmed: number;
    };
    listings: {
        total: number;
        active: number;
        pending: number;
    };
    ratings: {
        average: number;
        total: number;
        distribution: Record<number, number>;
    };
    chartData: {
        revenue: { date: string; amount: number }[];
        bookings: { date: string; count: number }[];
    };
}

export interface VendorListingFilters {
    status?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export const vendorsService = {
    /**
     * Register as a vendor
     */
    async register(data: VendorRegisterData): Promise<{ vendor: Vendor; tokens: AuthTokens }> {
        const response = await apiClient.post<{ vendor: Vendor; tokens: AuthTokens }>(
            API_ENDPOINTS.VENDORS.REGISTER,
            data,
            { skipAuth: true }
        );

        if (response.data.tokens) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
            localStorage.setItem(STORAGE_KEYS.VENDOR_SESSION, JSON.stringify(response.data.vendor));
        }

        return response.data;
    },

    /**
     * Vendor login
     */
    async login(credentials: VendorLoginCredentials): Promise<{ vendor: Vendor; tokens: AuthTokens }> {
        const response = await apiClient.post<{ vendor: Vendor; tokens: AuthTokens }>(
            API_ENDPOINTS.VENDORS.LOGIN,
            credentials,
            { skipAuth: true }
        );

        if (response.data.tokens) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.tokens.accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.tokens.refreshToken);
            localStorage.setItem(STORAGE_KEYS.VENDOR_SESSION, JSON.stringify(response.data.vendor));
        }

        return response.data;
    },

    /**
     * Get vendor profile
     */
    async getProfile(): Promise<Vendor> {
        const response = await apiClient.get<Vendor>(API_ENDPOINTS.VENDORS.PROFILE);
        return response.data;
    },

    /**
     * Update vendor profile
     */
    async updateProfile(data: Partial<Vendor>): Promise<Vendor> {
        const response = await apiClient.patch<Vendor>(
            API_ENDPOINTS.VENDORS.PROFILE,
            data
        );
        return response.data;
    },

    /**
     * Get vendor's listings
     */
    async getListings(filters?: VendorListingFilters): Promise<PaginatedResponse<VendorListing>> {
        const response = await apiClient.get<PaginatedResponse<VendorListing>>(
            API_ENDPOINTS.VENDORS.LISTINGS,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get a single listing by ID
     */
    async getListingById(id: string): Promise<VendorListing> {
        const response = await apiClient.get<VendorListing>(
            `${API_ENDPOINTS.VENDORS.LISTINGS}/${id}`
        );
        return response.data;
    },

    /**
     * Create a new listing
     */
    async createListing(data: CreateListingData): Promise<VendorListing> {
        const response = await apiClient.post<VendorListing>(
            API_ENDPOINTS.VENDORS.LISTINGS,
            data
        );
        return response.data;
    },

    /**
     * Update a listing
     */
    async updateListing(id: string, data: Partial<CreateListingData>): Promise<VendorListing> {
        const response = await apiClient.patch<VendorListing>(
            `${API_ENDPOINTS.VENDORS.LISTINGS}/${id}`,
            data
        );
        return response.data;
    },

    /**
     * Delete a listing
     */
    async deleteListing(id: string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.VENDORS.LISTINGS}/${id}`);
    },

    /**
     * Upload listing images
     */
    async uploadListingImages(listingId: string, files: File[]): Promise<{ urls: string[] }> {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        const response = await apiClient.upload<{ urls: string[] }>(
            `${API_ENDPOINTS.VENDORS.LISTINGS}/${listingId}/images`,
            formData
        );
        return response.data;
    },

    /**
     * Get vendor's bookings
     */
    async getBookings(filters?: { status?: string; page?: number; limit?: number }): Promise<PaginatedResponse<Booking>> {
        const response = await apiClient.get<PaginatedResponse<Booking>>(
            API_ENDPOINTS.VENDORS.BOOKINGS,
            { params: filters }
        );
        return response.data;
    },

    /**
     * Update booking status
     */
    async updateBookingStatus(bookingId: string, status: string, notes?: string): Promise<Booking> {
        const response = await apiClient.patch<Booking>(
            `${API_ENDPOINTS.VENDORS.BOOKINGS}/${bookingId}`,
            { status, notes }
        );
        return response.data;
    },

    /**
     * Get vendor analytics
     */
    async getAnalytics(period?: 'week' | 'month' | 'year'): Promise<VendorAnalytics> {
        const response = await apiClient.get<VendorAnalytics>(
            API_ENDPOINTS.VENDORS.ANALYTICS,
            { params: { period } }
        );
        return response.data;
    },

    /**
     * Submit verification documents
     */
    async submitVerification(documents: File[]): Promise<{ message: string; status: string }> {
        const formData = new FormData();
        documents.forEach(doc => formData.append('documents', doc));

        const response = await apiClient.upload<{ message: string; status: string }>(
            API_ENDPOINTS.VENDORS.VERIFY,
            formData
        );
        return response.data;
    },

    /**
     * Check if vendor is logged in
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem(STORAGE_KEYS.VENDOR_SESSION);
    },

    /**
     * Get stored vendor from localStorage
     */
    getStoredVendor(): Vendor | null {
        const vendorStr = localStorage.getItem(STORAGE_KEYS.VENDOR_SESSION);
        if (vendorStr) {
            try {
                return JSON.parse(vendorStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    /**
     * Logout vendor
     */
    logout(): void {
        localStorage.removeItem(STORAGE_KEYS.VENDOR_SESSION);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    },
};
