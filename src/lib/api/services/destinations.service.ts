// Destinations Service
// Handles all destination-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Destination,
    DestinationFilters,
    PaginatedResponse,
} from '@/types';

export const destinationsService = {
    /**
     * Get all destinations with optional filters
     */
    async getAll(filters?: DestinationFilters): Promise<PaginatedResponse<Destination>> {
        const response = await apiClient.get<PaginatedResponse<Destination>>(
            API_ENDPOINTS.DESTINATIONS.BASE,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get a single destination by ID
     */
    async getById(id: string): Promise<Destination> {
        const response = await apiClient.get<Destination>(
            `${API_ENDPOINTS.DESTINATIONS.BASE}/${id}`
        );
        return response.data;
    },

    /**
     * Get a destination by slug
     */
    async getBySlug(slug: string): Promise<Destination> {
        const response = await apiClient.get<Destination>(
            `${API_ENDPOINTS.DESTINATIONS.BASE}/slug/${slug}`
        );
        return response.data;
    },

    /**
     * Get featured destinations
     */
    async getFeatured(limit?: number): Promise<Destination[]> {
        const response = await apiClient.get<Destination[]>(
            API_ENDPOINTS.DESTINATIONS.FEATURED,
            { params: { limit } }
        );
        return response.data;
    },

    /**
     * Get popular destinations
     */
    async getPopular(limit?: number): Promise<Destination[]> {
        const response = await apiClient.get<Destination[]>(
            API_ENDPOINTS.DESTINATIONS.POPULAR,
            { params: { limit } }
        );
        return response.data;
    },

    /**
     * Search destinations
     */
    async search(query: string, filters?: Omit<DestinationFilters, 'search'>): Promise<PaginatedResponse<Destination>> {
        const response = await apiClient.get<PaginatedResponse<Destination>>(
            API_ENDPOINTS.DESTINATIONS.SEARCH,
            { params: { search: query, ...filters } as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get destination categories
     */
    async getCategories(): Promise<{ id: string; name: string; count: number }[]> {
        const response = await apiClient.get<{ id: string; name: string; count: number }[]>(
            API_ENDPOINTS.DESTINATIONS.CATEGORIES
        );
        return response.data;
    },

    /**
     * Get destinations by region
     */
    async getByRegion(region: string, limit?: number): Promise<Destination[]> {
        const response = await apiClient.get<Destination[]>(
            `${API_ENDPOINTS.DESTINATIONS.BY_REGION}/${region}`,
            { params: { limit } }
        );
        return response.data;
    },
};
