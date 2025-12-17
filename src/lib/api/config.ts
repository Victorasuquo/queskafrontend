// API Configuration
// This file contains all API-related configuration settings

export const API_CONFIG = {
    // Base URL - will be replaced with actual API URL from environment
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',

    // API Version
    VERSION: 'api/v1',

    // Timeout in milliseconds
    TIMEOUT: 30000,

    // Retry configuration
    RETRY: {
        MAX_RETRIES: 3,
        RETRY_DELAY: 1000,
    },
};

// API Endpoints
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/users/login',
        REGISTER: '/users/register',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh',
        FORGOT_PASSWORD: '/users/forgot-password',
        RESET_PASSWORD: '/users/reset-password',
        VERIFY_EMAIL: '/users/verify-email/confirm',
        ME: '/users/me',
        // Google OAuth
        GOOGLE_LOGIN: '/auth/google/login',
        GOOGLE_CALLBACK: '/auth/google/callback',
        GOOGLE_TOKEN: '/auth/google/token',
        OAUTH_STATUS: '/auth/oauth/status',
    },

    // Dashboard
    DASHBOARD: {
        USER: '/dashboards/user',
        USER_OVERVIEW: '/dashboards/user/overview',
        USER_STATS: '/dashboards/user/stats',
    },

    // Users
    USERS: {
        BASE: '/users',
        PROFILE: '/users/me',
        UPDATE_PROFILE: '/users/me',
        PROFILE_PHOTO: '/users/me/profile-photo',
        CHANGE_PASSWORD: '/users/change-password',
        PREFERENCES: '/users/preferences',
        NOTIFICATIONS: '/users/notifications',
        ACTIVITY: '/users/activity',
    },

    // Destinations
    DESTINATIONS: {
        BASE: '/destinations',
        FEATURED: '/destinations/featured',
        POPULAR: '/destinations/popular',
        SEARCH: '/destinations/search',
        CATEGORIES: '/destinations/categories',
        BY_REGION: '/destinations/region',
    },

    // Events
    EVENTS: {
        BASE: '/events',
        FEATURED: '/events/featured',
        UPCOMING: '/events/upcoming',
        SEARCH: '/events/search',
        CATEGORIES: '/events/categories',
        BY_LOCATION: '/events/location',
    },

    // Activities
    ACTIVITIES: {
        BASE: '/activities',
        FEATURED: '/activities/featured',
        POPULAR: '/activities/popular',
        SEARCH: '/activities/search',
        CATEGORIES: '/activities/categories',
        BY_DESTINATION: '/activities/destination',
    },

    // Bookings
    BOOKINGS: {
        BASE: '/bookings',
        USER_BOOKINGS: '/bookings/user',
        CREATE: '/bookings/create',
        CANCEL: '/bookings/cancel',
        HISTORY: '/bookings/history',
    },

    // Trips
    TRIPS: {
        BASE: '/trips',
        USER_TRIPS: '/trips/user',
        CREATE: '/trips/create',
        UPDATE: '/trips/update',
        ITINERARY: '/trips/itinerary',
    },

    // Wishlist
    WISHLIST: {
        BASE: '/wishlist',
        ADD: '/wishlist/add',
        REMOVE: '/wishlist/remove',
    },

    // Reviews
    REVIEWS: {
        BASE: '/reviews',
        CREATE: '/reviews/create',
        BY_DESTINATION: '/reviews/destination',
        BY_ACTIVITY: '/reviews/activity',
        BY_USER: '/reviews/user',
    },

    // Vendors
    VENDORS: {
        BASE: '/vendors',
        REGISTER: '/vendors/register',
        LOGIN: '/vendors/login',
        PROFILE: '/vendors/profile',
        LISTINGS: '/vendors/listings',
        BOOKINGS: '/vendors/bookings',
        ANALYTICS: '/vendors/analytics',
        VERIFY: '/vendors/verify',
    },

    // Admin
    ADMIN: {
        BASE: '/admin',
        LOGIN: '/admin/login',
        DASHBOARD: '/admin/dashboard',
        USERS: '/admin/users',
        VENDORS: '/admin/vendors',
        ANALYTICS: '/admin/analytics',
        REPORTS: '/admin/reports',
    },

    // AI/Chat
    AI: {
        CHAT: '/ai/chat',
        RECOMMENDATIONS: '/ai/recommendations',
        TRIP_PLANNING: '/ai/trip-planning',
    },

    // Search
    SEARCH: {
        GLOBAL: '/search',
        AUTOCOMPLETE: '/search/autocomplete',
    },

    // Payments
    PAYMENTS: {
        INITIALIZE: '/payments/initialize',
        VERIFY: '/payments/verify',
        HISTORY: '/payments/history',
    },
};

// Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'queska_access_token',
    REFRESH_TOKEN: 'queska_refresh_token',
    USER: 'queska_user',
    VENDOR_SESSION: 'queska_vendor_session',
    ADMIN_SESSION: 'queska_admin_session',
    PREFERENCES: 'queska_preferences',
    CART: 'queska_cart',
};

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};
