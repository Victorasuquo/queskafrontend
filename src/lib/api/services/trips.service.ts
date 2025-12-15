// Trips Service
// Handles all trip-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Trip,
    CreateTripData,
    ItineraryItem,
    PaginatedResponse,
} from '@/types';

export interface TripFilters {
    status?: string;
    destination?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}

export const tripsService = {
    /**
     * Get user's trips
     */
    async getUserTrips(filters?: TripFilters): Promise<PaginatedResponse<Trip>> {
        const response = await apiClient.get<PaginatedResponse<Trip>>(
            API_ENDPOINTS.TRIPS.USER_TRIPS,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get a single trip by ID
     */
    async getById(id: string): Promise<Trip> {
        const response = await apiClient.get<Trip>(
            `${API_ENDPOINTS.TRIPS.BASE}/${id}`
        );
        return response.data;
    },

    /**
     * Create a new trip
     */
    async create(data: CreateTripData): Promise<Trip> {
        const response = await apiClient.post<Trip>(
            API_ENDPOINTS.TRIPS.CREATE,
            data
        );
        return response.data;
    },

    /**
     * Update a trip
     */
    async update(id: string, data: Partial<CreateTripData>): Promise<Trip> {
        const response = await apiClient.patch<Trip>(
            `${API_ENDPOINTS.TRIPS.UPDATE}/${id}`,
            data
        );
        return response.data;
    },

    /**
     * Delete a trip
     */
    async delete(id: string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.TRIPS.BASE}/${id}`);
    },

    /**
     * Get trip itinerary
     */
    async getItinerary(tripId: string): Promise<Trip['itinerary']> {
        const response = await apiClient.get<Trip['itinerary']>(
            `${API_ENDPOINTS.TRIPS.ITINERARY}/${tripId}`
        );
        return response.data;
    },

    /**
     * Add item to itinerary
     */
    async addItineraryItem(tripId: string, dayIndex: number, item: Omit<ItineraryItem, 'id'>): Promise<ItineraryItem> {
        const response = await apiClient.post<ItineraryItem>(
            `${API_ENDPOINTS.TRIPS.ITINERARY}/${tripId}/items`,
            { dayIndex, ...item }
        );
        return response.data;
    },

    /**
     * Update itinerary item
     */
    async updateItineraryItem(tripId: string, itemId: string, data: Partial<ItineraryItem>): Promise<ItineraryItem> {
        const response = await apiClient.patch<ItineraryItem>(
            `${API_ENDPOINTS.TRIPS.ITINERARY}/${tripId}/items/${itemId}`,
            data
        );
        return response.data;
    },

    /**
     * Remove itinerary item
     */
    async removeItineraryItem(tripId: string, itemId: string): Promise<void> {
        await apiClient.delete(
            `${API_ENDPOINTS.TRIPS.ITINERARY}/${tripId}/items/${itemId}`
        );
    },

    /**
     * Share trip
     */
    async share(tripId: string): Promise<{ shareCode: string; shareUrl: string }> {
        const response = await apiClient.post<{ shareCode: string; shareUrl: string }>(
            `${API_ENDPOINTS.TRIPS.BASE}/${tripId}/share`
        );
        return response.data;
    },

    /**
     * Get shared trip by code
     */
    async getSharedTrip(shareCode: string): Promise<Trip> {
        const response = await apiClient.get<Trip>(
            `${API_ENDPOINTS.TRIPS.BASE}/shared/${shareCode}`,
            { skipAuth: true }
        );
        return response.data;
    },

    /**
     * Clone a trip
     */
    async clone(tripId: string): Promise<Trip> {
        const response = await apiClient.post<Trip>(
            `${API_ENDPOINTS.TRIPS.BASE}/${tripId}/clone`
        );
        return response.data;
    },
};
