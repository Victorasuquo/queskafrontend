// Activities Service
// Handles all activity-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Activity,
    ActivityFilters,
    PaginatedResponse,
} from '@/types';

export const activitiesService = {
    /**
     * Get all activities with optional filters
     */
    async getAll(filters?: ActivityFilters): Promise<PaginatedResponse<Activity>> {
        const response = await apiClient.get<PaginatedResponse<Activity>>(
            API_ENDPOINTS.ACTIVITIES.BASE,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get a single activity by ID
     */
    async getById(id: string): Promise<Activity> {
        const response = await apiClient.get<Activity>(
            `${API_ENDPOINTS.ACTIVITIES.BASE}/${id}`
        );
        return response.data;
    },

    /**
     * Get an activity by slug
     */
    async getBySlug(slug: string): Promise<Activity> {
        const response = await apiClient.get<Activity>(
            `${API_ENDPOINTS.ACTIVITIES.BASE}/slug/${slug}`
        );
        return response.data;
    },

    /**
     * Get featured activities
     */
    async getFeatured(limit?: number): Promise<Activity[]> {
        const response = await apiClient.get<Activity[]>(
            API_ENDPOINTS.ACTIVITIES.FEATURED,
            { params: { limit } }
        );
        return response.data;
    },

    /**
     * Get popular activities
     */
    async getPopular(limit?: number): Promise<Activity[]> {
        const response = await apiClient.get<Activity[]>(
            API_ENDPOINTS.ACTIVITIES.POPULAR,
            { params: { limit } }
        );
        return response.data;
    },

    /**
     * Search activities
     */
    async search(query: string, filters?: Omit<ActivityFilters, 'search'>): Promise<PaginatedResponse<Activity>> {
        const response = await apiClient.get<PaginatedResponse<Activity>>(
            API_ENDPOINTS.ACTIVITIES.SEARCH,
            { params: { search: query, ...filters } as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get activity categories
     */
    async getCategories(): Promise<{ id: string; name: string; count: number }[]> {
        const response = await apiClient.get<{ id: string; name: string; count: number }[]>(
            API_ENDPOINTS.ACTIVITIES.CATEGORIES
        );
        return response.data;
    },

    /**
     * Get activities by destination
     */
    async getByDestination(destinationId: string, limit?: number): Promise<Activity[]> {
        const response = await apiClient.get<Activity[]>(
            `${API_ENDPOINTS.ACTIVITIES.BY_DESTINATION}/${destinationId}`,
            { params: { limit } }
        );
        return response.data;
    },
};
