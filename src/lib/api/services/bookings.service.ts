// Bookings Service
// Handles all booking-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Booking,
    CreateBookingData,
    PaginatedResponse,
} from '@/types';

export interface BookingFilters {
    status?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}

export const bookingsService = {
    /**
     * Get user's bookings
     */
    async getUserBookings(filters?: BookingFilters): Promise<PaginatedResponse<Booking>> {
        const response = await apiClient.get<PaginatedResponse<Booking>>(
            API_ENDPOINTS.BOOKINGS.USER_BOOKINGS,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get a single booking by ID
     */
    async getById(id: string): Promise<Booking> {
        const response = await apiClient.get<Booking>(
            `${API_ENDPOINTS.BOOKINGS.BASE}/${id}`
        );
        return response.data;
    },

    /**
     * Get booking by reference number
     */
    async getByReference(reference: string): Promise<Booking> {
        const response = await apiClient.get<Booking>(
            `${API_ENDPOINTS.BOOKINGS.BASE}/reference/${reference}`
        );
        return response.data;
    },

    /**
     * Create a new booking
     */
    async create(data: CreateBookingData): Promise<Booking> {
        const response = await apiClient.post<Booking>(
            API_ENDPOINTS.BOOKINGS.CREATE,
            data
        );
        return response.data;
    },

    /**
     * Cancel a booking
     */
    async cancel(id: string, reason?: string): Promise<Booking> {
        const response = await apiClient.post<Booking>(
            `${API_ENDPOINTS.BOOKINGS.CANCEL}/${id}`,
            { reason }
        );
        return response.data;
    },

    /**
     * Get booking history
     */
    async getHistory(filters?: BookingFilters): Promise<PaginatedResponse<Booking>> {
        const response = await apiClient.get<PaginatedResponse<Booking>>(
            API_ENDPOINTS.BOOKINGS.HISTORY,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Update booking details
     */
    async update(id: string, data: Partial<CreateBookingData>): Promise<Booking> {
        const response = await apiClient.patch<Booking>(
            `${API_ENDPOINTS.BOOKINGS.BASE}/${id}`,
            data
        );
        return response.data;
    },
};
