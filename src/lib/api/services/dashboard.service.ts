// Dashboard Service
// Handles dashboard-related API calls

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { DashboardOverview } from '@/types';

export const dashboardService = {
    /**
     * Get user dashboard overview
     */
    async getUserOverview(): Promise<DashboardOverview> {
        const response = await apiClient.get<DashboardOverview>(
            API_ENDPOINTS.DASHBOARD.USER_OVERVIEW
        );

        // Handle different response formats
        // Backend might return data directly or wrapped in ApiResponse
        let data: any = response.data || response;

        // If data is wrapped in another layer (e.g., { data: actualData })
        if (data.data && typeof data.data === 'object') {
            data = data.data;
        }

        // Validate and provide defaults for missing fields
        const validatedData: DashboardOverview = {
            profile: {
                name: data.profile?.name || data.user?.full_name || 'User',
                email: data.profile?.email || data.user?.email || '',
                profile_photo: data.profile?.profile_photo || data.user?.profile_photo || null,
                profile_completion: data.profile?.profile_completion || 0,
                is_verified: data.profile?.is_verified || data.user?.is_email_verified || false,
                member_since: data.profile?.member_since || data.user?.created_at || new Date().toISOString(),
            },
            quick_stats: {
                experiences: data.quick_stats?.experiences || data.stats?.experiences || 0,
                upcoming: data.quick_stats?.upcoming || data.stats?.upcoming || 0,
                bookings: data.quick_stats?.bookings || data.stats?.bookings || 0,
                reviews: data.quick_stats?.reviews || data.stats?.reviews || 0,
                favorites: data.quick_stats?.favorites || data.stats?.favorites || 0,
                followers: data.quick_stats?.followers || data.stats?.followers || 0,
                following: data.quick_stats?.following || data.stats?.following || 0,
            },
            spending: {
                total_spent: data.spending?.total_spent || data.stats?.total_spent || 0,
                total_saved: data.spending?.total_saved || data.stats?.total_saved || 0,
                currency: data.spending?.currency || data.stats?.currency || 'USD',
            },
            travel_stats: {
                countries_visited: data.travel_stats?.countries_visited || data.stats?.countries_visited || 0,
                cities_visited: data.travel_stats?.cities_visited || data.stats?.cities_visited || 0,
            },
            subscription: {
                plan: data.subscription?.plan || data.user?.subscription?.plan || 'free',
                is_active: data.subscription?.is_active || data.user?.subscription?.is_active || true,
                expires_at: data.subscription?.expires_at || data.user?.subscription?.expires_at || null,
            },
            agent: {
                has_agent: data.agent?.has_agent || !!data.user?.assigned_agent_id,
                agent_id: data.agent?.agent_id || data.user?.assigned_agent_id || null,
            },
        };

        return validatedData;
    },

    /**
     * Get user dashboard stats
     */
    async getUserStats() {
        const response = await apiClient.get(
            API_ENDPOINTS.DASHBOARD.USER_STATS
        );
        return response.data;
    },
};