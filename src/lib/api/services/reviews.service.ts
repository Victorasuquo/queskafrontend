// Reviews Service
// Handles all review-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Review, CreateReviewData, PaginatedResponse } from '@/types';

export interface ReviewFilters {
    rating?: number;
    sortBy?: 'recent' | 'helpful' | 'rating';
    page?: number;
    limit?: number;
}

export const reviewsService = {
    /**
     * Get reviews for an item
     */
    async getByItem(
        itemType: Review['itemType'],
        itemId: string,
        filters?: ReviewFilters
    ): Promise<PaginatedResponse<Review>> {
        const response = await apiClient.get<PaginatedResponse<Review>>(
            `${API_ENDPOINTS.REVIEWS.BASE}/${itemType}/${itemId}`,
            { params: filters as unknown as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get reviews by destination
     */
    async getByDestination(destinationId: string, filters?: ReviewFilters): Promise<PaginatedResponse<Review>> {
        const response = await apiClient.get<PaginatedResponse<Review>>(
            `${API_ENDPOINTS.REVIEWS.BY_DESTINATION}/${destinationId}`,
            { params: filters as unknown as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get reviews by activity
     */
    async getByActivity(activityId: string, filters?: ReviewFilters): Promise<PaginatedResponse<Review>> {
        const response = await apiClient.get<PaginatedResponse<Review>>(
            `${API_ENDPOINTS.REVIEWS.BY_ACTIVITY}/${activityId}`,
            { params: filters as unknown as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Get user's reviews
     */
    async getUserReviews(filters?: ReviewFilters): Promise<PaginatedResponse<Review>> {
        const response = await apiClient.get<PaginatedResponse<Review>>(
            API_ENDPOINTS.REVIEWS.BY_USER,
            { params: filters as unknown as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Create a review
     */
    async create(data: CreateReviewData): Promise<Review> {
        // If there are images, use FormData
        if (data.images && data.images.length > 0) {
            const formData = new FormData();
            formData.append('itemType', data.itemType);
            formData.append('itemId', data.itemId);
            formData.append('rating', String(data.rating));
            formData.append('content', data.content);
            if (data.title) formData.append('title', data.title);
            data.images.forEach(image => formData.append('images', image));

            const response = await apiClient.upload<Review>(
                API_ENDPOINTS.REVIEWS.CREATE,
                formData
            );
            return response.data;
        }

        const response = await apiClient.post<Review>(
            API_ENDPOINTS.REVIEWS.CREATE,
            data
        );
        return response.data;
    },

    /**
     * Update a review
     */
    async update(id: string, data: Partial<Omit<CreateReviewData, 'itemType' | 'itemId'>>): Promise<Review> {
        const response = await apiClient.patch<Review>(
            `${API_ENDPOINTS.REVIEWS.BASE}/${id}`,
            data
        );
        return response.data;
    },

    /**
     * Delete a review
     */
    async delete(id: string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.REVIEWS.BASE}/${id}`);
    },

    /**
     * Mark review as helpful
     */
    async markHelpful(id: string): Promise<Review> {
        const response = await apiClient.post<Review>(
            `${API_ENDPOINTS.REVIEWS.BASE}/${id}/helpful`
        );
        return response.data;
    },

    /**
     * Report a review
     */
    async report(id: string, reason: string): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>(
            `${API_ENDPOINTS.REVIEWS.BASE}/${id}/report`,
            { reason }
        );
        return response.data;
    },
};
