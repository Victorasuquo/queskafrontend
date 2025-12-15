// AI Service
// Handles AI chat and recommendations

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ChatMessage, AIRecommendation, TripPlanRequest, Trip } from '@/types';

export interface ChatRequest {
    message: string;
    conversationId?: string;
    context?: {
        destination?: string;
        dates?: { from: string; to: string };
        travelers?: number;
        interests?: string[];
    };
}

export interface ChatResponse {
    message: ChatMessage;
    conversationId: string;
}

export const aiService = {
    /**
     * Send a chat message to the AI assistant
     */
    async chat(request: ChatRequest): Promise<ChatResponse> {
        const response = await apiClient.post<ChatResponse>(
            API_ENDPOINTS.AI.CHAT,
            request
        );
        return response.data;
    },

    /**
     * Get personalized recommendations
     */
    async getRecommendations(params: {
        type?: 'destination' | 'event' | 'activity';
        interests?: string[];
        location?: string;
        limit?: number;
    }): Promise<AIRecommendation[]> {
        const response = await apiClient.get<AIRecommendation[]>(
            API_ENDPOINTS.AI.RECOMMENDATIONS,
            { params: params as unknown as Record<string, string | number | boolean | undefined> }
        );
        return response.data;
    },

    /**
     * Generate AI trip plan
     */
    async generateTripPlan(request: TripPlanRequest): Promise<Trip> {
        const response = await apiClient.post<Trip>(
            API_ENDPOINTS.AI.TRIP_PLANNING,
            request
        );
        return response.data;
    },

    /**
     * Get destination suggestions based on preferences
     */
    async suggestDestinations(preferences: {
        budget?: string;
        travelStyle?: string;
        interests?: string[];
        duration?: number;
        season?: string;
    }): Promise<AIRecommendation> {
        const response = await apiClient.post<AIRecommendation>(
            `${API_ENDPOINTS.AI.RECOMMENDATIONS}/destinations`,
            preferences
        );
        return response.data;
    },
};
