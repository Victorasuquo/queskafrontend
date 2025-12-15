// Wishlist Service
// Handles all wishlist-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { WishlistItem, PaginatedResponse } from '@/types';

export interface WishlistFilters {
    type?: 'destination' | 'event' | 'activity';
    page?: number;
    limit?: number;
}

export const wishlistService = {
    /**
     * Get user's wishlist
     */
    async getAll(filters?: WishlistFilters): Promise<PaginatedResponse<WishlistItem>> {
        const response = await apiClient.get<PaginatedResponse<WishlistItem>>(
            API_ENDPOINTS.WISHLIST.BASE,
            { params: filters as unknown as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Add item to wishlist
     */
    async add(type: WishlistItem['type'], itemId: string, notes?: string): Promise<WishlistItem> {
        const response = await apiClient.post<WishlistItem>(
            API_ENDPOINTS.WISHLIST.ADD,
            { type, itemId, notes }
        );
        return response.data;
    },

    /**
     * Remove item from wishlist
     */
    async remove(id: string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.WISHLIST.REMOVE}/${id}`);
    },

    /**
     * Update wishlist item notes
     */
    async updateNotes(id: string, notes: string): Promise<WishlistItem> {
        const response = await apiClient.patch<WishlistItem>(
            `${API_ENDPOINTS.WISHLIST.BASE}/${id}`,
            { notes }
        );
        return response.data;
    },

    /**
     * Check if item is in wishlist
     */
    async check(type: WishlistItem['type'], itemId: string): Promise<boolean> {
        const response = await apiClient.get<{ inWishlist: boolean }>(
            `${API_ENDPOINTS.WISHLIST.BASE}/check`,
            { params: { type, itemId } }
        );
        return response.data.inWishlist;
    },

    /**
     * Clear all wishlist items
     */
    async clear(): Promise<void> {
        await apiClient.delete(API_ENDPOINTS.WISHLIST.BASE);
    },
};
