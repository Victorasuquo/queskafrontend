// Search Service
// Handles global search and autocomplete

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { SearchResult, SearchFilters, PaginatedResponse } from '@/types';

export const searchService = {
    /**
     * Global search across all content types
     */
    async search(filters: SearchFilters): Promise<PaginatedResponse<SearchResult>> {
        const response = await apiClient.get<PaginatedResponse<SearchResult>>(
            API_ENDPOINTS.SEARCH.GLOBAL,
            { params: filters as unknown as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get autocomplete suggestions
     */
    async autocomplete(query: string, limit?: number): Promise<SearchResult[]> {
        const response = await apiClient.get<SearchResult[]>(
            API_ENDPOINTS.SEARCH.AUTOCOMPLETE,
            { params: { query, limit } }
        );
        return response.data;
    },

    /**
     * Search by location
     */
    async searchByLocation(
        location: string,
        radius?: number,
        types?: ('destination' | 'event' | 'activity')[]
    ): Promise<SearchResult[]> {
        const response = await apiClient.get<SearchResult[]>(
            `${API_ENDPOINTS.SEARCH.GLOBAL}/location`,
            { params: { location, radius, types: types?.join(',') } }
        );
        return response.data;
    },
};
