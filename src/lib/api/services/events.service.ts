// Events Service
// Handles all event-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Event,
    EventFilters,
    PaginatedResponse,
} from '@/types';

export const eventsService = {
    /**
     * Get all events with optional filters
     */
    async getAll(filters?: EventFilters): Promise<PaginatedResponse<Event>> {
        const response = await apiClient.get<PaginatedResponse<Event>>(
            API_ENDPOINTS.EVENTS.BASE,
            { params: filters as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get a single event by ID
     */
    async getById(id: string): Promise<Event> {
        const response = await apiClient.get<Event>(
            `${API_ENDPOINTS.EVENTS.BASE}/${id}`
        );
        return response.data;
    },

    /**
     * Get an event by slug
     */
    async getBySlug(slug: string): Promise<Event> {
        const response = await apiClient.get<Event>(
            `${API_ENDPOINTS.EVENTS.BASE}/slug/${slug}`
        );
        return response.data;
    },

    /**
     * Get featured events
     */
    async getFeatured(limit?: number): Promise<Event[]> {
        const response = await apiClient.get<Event[]>(
            API_ENDPOINTS.EVENTS.FEATURED,
            { params: { limit } }
        );
        return response.data;
    },

    /**
     * Get upcoming events
     */
    async getUpcoming(limit?: number): Promise<Event[]> {
        const response = await apiClient.get<Event[]>(
            API_ENDPOINTS.EVENTS.UPCOMING,
            { params: { limit } }
        );
        return response.data;
    },

    /**
     * Search events
     */
    async search(query: string, filters?: Omit<EventFilters, 'search'>): Promise<PaginatedResponse<Event>> {
        const response = await apiClient.get<PaginatedResponse<Event>>(
            API_ENDPOINTS.EVENTS.SEARCH,
            { params: { search: query, ...filters } as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get event categories
     */
    async getCategories(): Promise<{ id: string; name: string; count: number }[]> {
        const response = await apiClient.get<{ id: string; name: string; count: number }[]>(
            API_ENDPOINTS.EVENTS.CATEGORIES
        );
        return response.data;
    },

    /**
     * Get events by location
     */
    async getByLocation(location: string, limit?: number): Promise<Event[]> {
        const response = await apiClient.get<Event[]>(
            `${API_ENDPOINTS.EVENTS.BY_LOCATION}/${encodeURIComponent(location)}`,
            { params: { limit } }
        );
        return response.data;
    },
};
