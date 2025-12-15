// React Query Hooks for API Data Fetching
// Custom hooks that wrap API services with React Query for caching and state management

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import {
    authService,
    usersService,
    destinationsService,
    eventsService,
    activitiesService,
    bookingsService,
    tripsService,
    wishlistService,
    reviewsService,
    searchService,
    aiService,
    vendorsService,
    adminService,
} from '@/lib/api';
import type {
    User,
    Destination,
    DestinationFilters,
    Event,
    EventFilters,
    Activity,
    ActivityFilters,
    Booking,
    Trip,
    WishlistItem,
    Review,
    SearchResult,
    SearchFilters,
    LoginCredentials,
    RegisterData,
    CreateBookingData,
    CreateTripData,
    CreateReviewData,
    PaginatedResponse,
} from '@/types';

// Query Keys
export const queryKeys = {
    // Auth
    currentUser: ['currentUser'] as const,

    // Users
    userProfile: ['userProfile'] as const,
    userPreferences: ['userPreferences'] as const,
    userNotifications: (filters?: unknown) => ['userNotifications', filters] as const,
    userActivity: (filters?: unknown) => ['userActivity', filters] as const,

    // Destinations
    destinations: (filters?: DestinationFilters) => ['destinations', filters] as const,
    destination: (id: string) => ['destination', id] as const,
    featuredDestinations: (limit?: number) => ['featuredDestinations', limit] as const,
    popularDestinations: (limit?: number) => ['popularDestinations', limit] as const,
    destinationCategories: ['destinationCategories'] as const,

    // Events
    events: (filters?: EventFilters) => ['events', filters] as const,
    event: (id: string) => ['event', id] as const,
    featuredEvents: (limit?: number) => ['featuredEvents', limit] as const,
    upcomingEvents: (limit?: number) => ['upcomingEvents', limit] as const,
    eventCategories: ['eventCategories'] as const,

    // Activities
    activities: (filters?: ActivityFilters) => ['activities', filters] as const,
    activity: (id: string) => ['activity', id] as const,
    featuredActivities: (limit?: number) => ['featuredActivities', limit] as const,
    popularActivities: (limit?: number) => ['popularActivities', limit] as const,
    activityCategories: ['activityCategories'] as const,

    // Bookings
    userBookings: (filters?: unknown) => ['userBookings', filters] as const,
    booking: (id: string) => ['booking', id] as const,
    bookingHistory: (filters?: unknown) => ['bookingHistory', filters] as const,

    // Trips
    userTrips: (filters?: unknown) => ['userTrips', filters] as const,
    trip: (id: string) => ['trip', id] as const,
    tripItinerary: (tripId: string) => ['tripItinerary', tripId] as const,

    // Wishlist
    wishlist: (filters?: unknown) => ['wishlist', filters] as const,

    // Reviews
    reviews: (itemType: string, itemId: string, filters?: unknown) => ['reviews', itemType, itemId, filters] as const,
    userReviews: (filters?: unknown) => ['userReviews', filters] as const,

    // Search
    search: (filters: SearchFilters) => ['search', filters] as const,
    autocomplete: (query: string) => ['autocomplete', query] as const,

    // AI
    aiRecommendations: (params?: unknown) => ['aiRecommendations', params] as const,

    // Vendors
    vendorProfile: ['vendorProfile'] as const,
    vendorListings: (filters?: unknown) => ['vendorListings', filters] as const,
    vendorListing: (id: string) => ['vendorListing', id] as const,
    vendorBookings: (filters?: unknown) => ['vendorBookings', filters] as const,
    vendorAnalytics: (period?: string) => ['vendorAnalytics', period] as const,

    // Admin
    adminDashboard: ['adminDashboard'] as const,
    adminStats: ['adminStats'] as const,
    adminUsers: (filters?: unknown) => ['adminUsers', filters] as const,
    adminUser: (id: string) => ['adminUser', id] as const,
    adminVendors: (filters?: unknown) => ['adminVendors', filters] as const,
    adminVendor: (id: string) => ['adminVendor', id] as const,
};

// ============================================
// Authentication Hooks
// ============================================

export const useCurrentUser = (options?: UseQueryOptions<User>) => {
    return useQuery({
        queryKey: queryKeys.currentUser,
        queryFn: () => authService.getCurrentUser(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};

export const useLogin = (options?: UseMutationOptions<unknown, Error, LoginCredentials>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
        },
        ...options,
    });
};

export const useRegister = (options?: UseMutationOptions<unknown, Error, RegisterData>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: RegisterData) => authService.register(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
        },
        ...options,
    });
};

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            queryClient.clear();
        },
        ...options,
    });
};

// ============================================
// Destination Hooks
// ============================================

export const useDestinations = (filters?: DestinationFilters, options?: UseQueryOptions<PaginatedResponse<Destination>>) => {
    return useQuery({
        queryKey: queryKeys.destinations(filters),
        queryFn: () => destinationsService.getAll(filters),
        ...options,
    });
};

export const useDestination = (id: string, options?: UseQueryOptions<Destination>) => {
    return useQuery({
        queryKey: queryKeys.destination(id),
        queryFn: () => destinationsService.getById(id),
        enabled: !!id,
        ...options,
    });
};

export const useFeaturedDestinations = (limit?: number, options?: UseQueryOptions<Destination[]>) => {
    return useQuery({
        queryKey: queryKeys.featuredDestinations(limit),
        queryFn: () => destinationsService.getFeatured(limit),
        ...options,
    });
};

export const usePopularDestinations = (limit?: number, options?: UseQueryOptions<Destination[]>) => {
    return useQuery({
        queryKey: queryKeys.popularDestinations(limit),
        queryFn: () => destinationsService.getPopular(limit),
        ...options,
    });
};

export const useDestinationCategories = (options?: UseQueryOptions<{ id: string; name: string; count: number }[]>) => {
    return useQuery({
        queryKey: queryKeys.destinationCategories,
        queryFn: () => destinationsService.getCategories(),
        staleTime: 30 * 60 * 1000, // 30 minutes
        ...options,
    });
};

// ============================================
// Event Hooks
// ============================================

export const useEvents = (filters?: EventFilters, options?: UseQueryOptions<PaginatedResponse<Event>>) => {
    return useQuery({
        queryKey: queryKeys.events(filters),
        queryFn: () => eventsService.getAll(filters),
        ...options,
    });
};

export const useEvent = (id: string, options?: UseQueryOptions<Event>) => {
    return useQuery({
        queryKey: queryKeys.event(id),
        queryFn: () => eventsService.getById(id),
        enabled: !!id,
        ...options,
    });
};

export const useFeaturedEvents = (limit?: number, options?: UseQueryOptions<Event[]>) => {
    return useQuery({
        queryKey: queryKeys.featuredEvents(limit),
        queryFn: () => eventsService.getFeatured(limit),
        ...options,
    });
};

export const useUpcomingEvents = (limit?: number, options?: UseQueryOptions<Event[]>) => {
    return useQuery({
        queryKey: queryKeys.upcomingEvents(limit),
        queryFn: () => eventsService.getUpcoming(limit),
        ...options,
    });
};

// ============================================
// Activity Hooks
// ============================================

export const useActivities = (filters?: ActivityFilters, options?: UseQueryOptions<PaginatedResponse<Activity>>) => {
    return useQuery({
        queryKey: queryKeys.activities(filters),
        queryFn: () => activitiesService.getAll(filters),
        ...options,
    });
};

export const useActivity = (id: string, options?: UseQueryOptions<Activity>) => {
    return useQuery({
        queryKey: queryKeys.activity(id),
        queryFn: () => activitiesService.getById(id),
        enabled: !!id,
        ...options,
    });
};

export const useFeaturedActivities = (limit?: number, options?: UseQueryOptions<Activity[]>) => {
    return useQuery({
        queryKey: queryKeys.featuredActivities(limit),
        queryFn: () => activitiesService.getFeatured(limit),
        ...options,
    });
};

export const usePopularActivities = (limit?: number, options?: UseQueryOptions<Activity[]>) => {
    return useQuery({
        queryKey: queryKeys.popularActivities(limit),
        queryFn: () => activitiesService.getPopular(limit),
        ...options,
    });
};

// ============================================
// Booking Hooks
// ============================================

export const useUserBookings = (filters?: Parameters<typeof bookingsService.getUserBookings>[0], options?: UseQueryOptions<PaginatedResponse<Booking>>) => {
    return useQuery({
        queryKey: queryKeys.userBookings(filters),
        queryFn: () => bookingsService.getUserBookings(filters),
        ...options,
    });
};

export const useBooking = (id: string, options?: UseQueryOptions<Booking>) => {
    return useQuery({
        queryKey: queryKeys.booking(id),
        queryFn: () => bookingsService.getById(id),
        enabled: !!id,
        ...options,
    });
};

export const useCreateBooking = (options?: UseMutationOptions<Booking, Error, CreateBookingData>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateBookingData) => bookingsService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userBookings'] });
        },
        ...options,
    });
};

export const useCancelBooking = (options?: UseMutationOptions<Booking, Error, { id: string; reason?: string }>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, reason }: { id: string; reason?: string }) => bookingsService.cancel(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userBookings'] });
        },
        ...options,
    });
};

// ============================================
// Trip Hooks
// ============================================

export const useUserTrips = (filters?: Parameters<typeof tripsService.getUserTrips>[0], options?: UseQueryOptions<PaginatedResponse<Trip>>) => {
    return useQuery({
        queryKey: queryKeys.userTrips(filters),
        queryFn: () => tripsService.getUserTrips(filters),
        ...options,
    });
};

export const useTrip = (id: string, options?: UseQueryOptions<Trip>) => {
    return useQuery({
        queryKey: queryKeys.trip(id),
        queryFn: () => tripsService.getById(id),
        enabled: !!id,
        ...options,
    });
};

export const useCreateTrip = (options?: UseMutationOptions<Trip, Error, CreateTripData>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateTripData) => tripsService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userTrips'] });
        },
        ...options,
    });
};

export const useUpdateTrip = (options?: UseMutationOptions<Trip, Error, { id: string; data: Partial<CreateTripData> }>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CreateTripData> }) => tripsService.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.trip(variables.id) });
            queryClient.invalidateQueries({ queryKey: ['userTrips'] });
        },
        ...options,
    });
};

export const useDeleteTrip = (options?: UseMutationOptions<void, Error, string>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => tripsService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userTrips'] });
        },
        ...options,
    });
};

// ============================================
// Wishlist Hooks
// ============================================

export const useWishlist = (filters?: Parameters<typeof wishlistService.getAll>[0], options?: UseQueryOptions<PaginatedResponse<WishlistItem>>) => {
    return useQuery({
        queryKey: queryKeys.wishlist(filters),
        queryFn: () => wishlistService.getAll(filters),
        ...options,
    });
};

export const useAddToWishlist = (options?: UseMutationOptions<WishlistItem, Error, { type: WishlistItem['type']; itemId: string; notes?: string }>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ type, itemId, notes }: { type: WishlistItem['type']; itemId: string; notes?: string }) =>
            wishlistService.add(type, itemId, notes),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        },
        ...options,
    });
};

export const useRemoveFromWishlist = (options?: UseMutationOptions<void, Error, string>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => wishlistService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        },
        ...options,
    });
};

// ============================================
// Review Hooks
// ============================================

export const useReviews = (
    itemType: Review['itemType'],
    itemId: string,
    filters?: Parameters<typeof reviewsService.getByItem>[2],
    options?: UseQueryOptions<PaginatedResponse<Review>>
) => {
    return useQuery({
        queryKey: queryKeys.reviews(itemType, itemId, filters),
        queryFn: () => reviewsService.getByItem(itemType, itemId, filters),
        enabled: !!itemId,
        ...options,
    });
};

export const useCreateReview = (options?: UseMutationOptions<Review, Error, CreateReviewData>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateReviewData) => reviewsService.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', variables.itemType, variables.itemId] });
        },
        ...options,
    });
};

// ============================================
// Search Hooks
// ============================================

export const useSearch = (filters: SearchFilters, options?: UseQueryOptions<PaginatedResponse<SearchResult>>) => {
    return useQuery({
        queryKey: queryKeys.search(filters),
        queryFn: () => searchService.search(filters),
        enabled: !!filters.query,
        ...options,
    });
};

export const useAutocomplete = (query: string, options?: UseQueryOptions<SearchResult[]>) => {
    return useQuery({
        queryKey: queryKeys.autocomplete(query),
        queryFn: () => searchService.autocomplete(query),
        enabled: query.length >= 2,
        staleTime: 30 * 1000, // 30 seconds
        ...options,
    });
};

// ============================================
// AI Hooks
// ============================================

export const useAIRecommendations = (params?: Parameters<typeof aiService.getRecommendations>[0], options?: UseQueryOptions<unknown>) => {
    return useQuery({
        queryKey: queryKeys.aiRecommendations(params),
        queryFn: () => aiService.getRecommendations(params || {}),
        ...options,
    });
};

export const useAIChat = (options?: UseMutationOptions<unknown, Error, Parameters<typeof aiService.chat>[0]>) => {
    return useMutation({
        mutationFn: (request: Parameters<typeof aiService.chat>[0]) => aiService.chat(request),
        ...options,
    });
};

export const useGenerateTripPlan = (options?: UseMutationOptions<Trip, Error, Parameters<typeof aiService.generateTripPlan>[0]>) => {
    return useMutation({
        mutationFn: (request: Parameters<typeof aiService.generateTripPlan>[0]) => aiService.generateTripPlan(request),
        ...options,
    });
};

// ============================================
// Vendor Hooks
// ============================================

export const useVendorProfile = (options?: UseQueryOptions<unknown>) => {
    return useQuery({
        queryKey: queryKeys.vendorProfile,
        queryFn: () => vendorsService.getProfile(),
        ...options,
    });
};

export const useVendorListings = (filters?: Parameters<typeof vendorsService.getListings>[0], options?: UseQueryOptions<unknown>) => {
    return useQuery({
        queryKey: queryKeys.vendorListings(filters),
        queryFn: () => vendorsService.getListings(filters),
        ...options,
    });
};

export const useVendorBookings = (filters?: Parameters<typeof vendorsService.getBookings>[0], options?: UseQueryOptions<unknown>) => {
    return useQuery({
        queryKey: queryKeys.vendorBookings(filters),
        queryFn: () => vendorsService.getBookings(filters),
        ...options,
    });
};

export const useVendorAnalytics = (period?: 'week' | 'month' | 'year', options?: UseQueryOptions<unknown>) => {
    return useQuery({
        queryKey: queryKeys.vendorAnalytics(period),
        queryFn: () => vendorsService.getAnalytics(period),
        ...options,
    });
};

// ============================================
// Admin Hooks
// ============================================

export const useAdminDashboard = (options?: UseQueryOptions<unknown>) => {
    return useQuery({
        queryKey: queryKeys.adminDashboard,
        queryFn: () => adminService.getDashboard(),
        ...options,
    });
};

export const useAdminStats = (options?: UseQueryOptions<unknown>) => {
    return useQuery({
        queryKey: queryKeys.adminStats,
        queryFn: () => adminService.getStats(),
        ...options,
    });
};

export const useAdminUsers = (filters?: Parameters<typeof adminService.getUsers>[0], options?: UseQueryOptions<PaginatedResponse<User>>) => {
    return useQuery({
        queryKey: queryKeys.adminUsers(filters),
        queryFn: () => adminService.getUsers(filters),
        ...options,
    });
};

export const useAdminVendors = (filters?: Parameters<typeof adminService.getVendors>[0], options?: UseQueryOptions<unknown>) => {
    return useQuery({
        queryKey: queryKeys.adminVendors(filters),
        queryFn: () => adminService.getVendors(filters),
        ...options,
    });
};
