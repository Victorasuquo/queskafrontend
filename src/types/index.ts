// Type Definitions
// All TypeScript interfaces and types for the application

// ============================================
// Common Types
// ============================================

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Address {
    street?: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    coordinates?: Coordinates;
}

export interface Image {
    id: string;
    url: string;
    alt?: string;
    thumbnail?: string;
    isPrimary?: boolean;
}

export interface PriceRange {
    min: number;
    max: number;
    currency: string;
}

export interface DateRange {
    from: Date | string;
    to: Date | string;
}

export interface Rating {
    average: number;
    count: number;
    distribution?: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
}

// ============================================
// User Types
// ============================================

export type UserRole = 'user' | 'vendor' | 'admin';
export type UserStatus = 'pending' | 'active' | 'suspended' | 'disabled';

export interface UserPreferences {
    interests: string[];
    travel_style: 'budget' | 'mid-range' | 'luxury' | null;
    dietary_restrictions: string[];
    languages: string[];
    currency: string;
}

export interface NotificationPreferences {
    email_bookings: boolean;
    email_promotions: boolean;
    email_newsletter: boolean;
    email_experience_updates: boolean;
    email_agent_messages: boolean;
    push_bookings: boolean;
    push_messages: boolean;
    push_promotions: boolean;
    push_experience_updates: boolean;
    sms_bookings: boolean;
    sms_verification: boolean;
}

export interface UserSubscription {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    started_at: string;
    expires_at: string | null;
    is_active: boolean;
    auto_renew: boolean;
    features: string[];
}

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string | null;
    display_name: string | null;
    phone: string | null;
    bio: string | null;
    profile_photo: string | null;
    cover_photo: string | null;
    date_of_birth: string | null;
    gender: string | null;
    status: UserStatus;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    is_active: boolean;
    preferences: UserPreferences | null;
    notification_preferences: NotificationPreferences;
    subscription: UserSubscription | null;
    followers_count: number;
    following_count: number;
    experiences_count: number;
    reviews_count: number;
    favorite_destinations: string[];
    referral_code: string | null;
    assigned_agent_id: string | null;
    created_at: string;
    updated_at: string;
    last_login_at: string | null;
}
    marketing: boolean;
    tripUpdates: boolean;
    priceAlerts: boolean;
}

export interface UserActivity {
    id: string;
    action: string;
    description: string;
    timestamp: string;
    ipAddress?: string;
    device?: string;
}

// ============================================
// Authentication Types
// ============================================

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirm {
    token: string;
    password: string;
    confirmPassword: string;
}

// ============================================
// Destination Types
// ============================================

export type DestinationCategory =
    | 'beach'
    | 'mountain'
    | 'city'
    | 'cultural'
    | 'adventure'
    | 'nature'
    | 'historical';

export type BudgetLevel = 'budget' | 'mid' | 'luxury';

export interface Destination {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    shortDescription?: string;
    location: Address;
    region: string;
    category: DestinationCategory;
    images: Image[];
    coverImage: string;
    rating: Rating;
    priceRange: PriceRange;
    budgetLevel: BudgetLevel;
    bestTime: string;
    climate?: string;
    highlights: string[];
    activities: string[];
    gettingThere: string[];
    tips?: string[];
    isFeatured: boolean;
    isPopular: boolean;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface DestinationFilters {
    search?: string;
    category?: DestinationCategory;
    region?: string;
    budget?: BudgetLevel;
    rating?: number;
    priceMin?: number;
    priceMax?: number;
    page?: number;
    limit?: number;
    sortBy?: 'rating' | 'popularity' | 'price' | 'name';
    sortOrder?: 'asc' | 'desc';
}

// ============================================
// Event Types
// ============================================

export type EventCategory =
    | 'festival'
    | 'concert'
    | 'cultural'
    | 'sports'
    | 'food'
    | 'art'
    | 'conference';

export type EventStatus = 'upcoming' | 'ongoing' | 'past' | 'cancelled';

export interface Event {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    category: EventCategory;
    status: EventStatus;
    venue: {
        name: string;
        address: Address;
    };
    startDate: string;
    endDate: string;
    startTime?: string;
    endTime?: string;
    images: Image[];
    coverImage: string;
    price: PriceRange;
    ticketTypes?: TicketType[];
    capacity?: number;
    attendees?: number;
    organizer: {
        id: string;
        name: string;
        logo?: string;
    };
    highlights: string[];
    schedule?: EventScheduleItem[];
    rating: Rating;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TicketType {
    id: string;
    name: string;
    description?: string;
    price: number;
    currency: string;
    quantity: number;
    available: number;
    maxPerOrder: number;
}

export interface EventScheduleItem {
    time: string;
    title: string;
    description?: string;
    speaker?: string;
}

export interface EventFilters {
    search?: string;
    category?: EventCategory;
    location?: string;
    dateFrom?: string;
    dateTo?: string;
    priceMin?: number;
    priceMax?: number;
    status?: EventStatus;
    page?: number;
    limit?: number;
    sortBy?: 'date' | 'price' | 'popularity' | 'rating';
    sortOrder?: 'asc' | 'desc';
}

// ============================================
// Activity Types
// ============================================

export type ActivityCategory =
    | 'cultural'
    | 'adventure'
    | 'nature'
    | 'food'
    | 'wellness'
    | 'sports'
    | 'tour';

export type DifficultyLevel = 'easy' | 'moderate' | 'challenging' | 'extreme';

export interface Activity {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    category: ActivityCategory;
    location: Address;
    duration: string;
    durationMinutes: number;
    difficulty: DifficultyLevel;
    price: number;
    currency: string;
    images: Image[];
    coverImage: string;
    rating: Rating;
    highlights: string[];
    included: string[];
    notIncluded?: string[];
    requirements?: string[];
    schedule: string;
    groupSize: {
        min: number;
        max: number;
    };
    languages: string[];
    cancellationPolicy: string;
    vendor: {
        id: string;
        name: string;
        logo?: string;
        rating: number;
    };
    isFeatured: boolean;
    isPopular: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ActivityFilters {
    search?: string;
    category?: ActivityCategory;
    location?: string;
    destination?: string;
    difficulty?: DifficultyLevel;
    durationMin?: number;
    durationMax?: number;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    page?: number;
    limit?: number;
    sortBy?: 'rating' | 'price' | 'duration' | 'popularity';
    sortOrder?: 'asc' | 'desc';
}

// ============================================
// Booking Types
// ============================================

export type BookingType = 'destination' | 'event' | 'activity' | 'accommodation';
export type BookingStatus =
    | 'pending'
    | 'confirmed'
    | 'cancelled'
    | 'completed'
    | 'refunded';

export type PaymentStatus =
    | 'pending'
    | 'paid'
    | 'failed'
    | 'refunded'
    | 'partial';

export interface Booking {
    id: string;
    bookingReference: string;
    type: BookingType;
    status: BookingStatus;
    user: {
        id: string;
        name: string;
        email: string;
    };
    item: {
        id: string;
        name: string;
        image?: string;
    };
    vendor?: {
        id: string;
        name: string;
    };
    date: string;
    time?: string;
    quantity: number;
    guests: GuestInfo[];
    pricing: BookingPricing;
    payment: PaymentInfo;
    specialRequests?: string;
    cancellationPolicy?: string;
    createdAt: string;
    updatedAt: string;
}

export interface GuestInfo {
    name: string;
    email?: string;
    phone?: string;
    age?: number;
    specialNeeds?: string;
}

export interface BookingPricing {
    basePrice: number;
    quantity: number;
    subtotal: number;
    taxes: number;
    fees: number;
    discount?: number;
    total: number;
    currency: string;
}

export interface PaymentInfo {
    status: PaymentStatus;
    method?: string;
    transactionId?: string;
    paidAt?: string;
    amount: number;
    currency: string;
}

export interface CreateBookingData {
    type: BookingType;
    itemId: string;
    date: string;
    time?: string;
    quantity: number;
    guests: GuestInfo[];
    specialRequests?: string;
    paymentMethod?: string;
}

// ============================================
// Trip Types
// ============================================

export type TripStatus = 'planning' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Trip {
    id: string;
    name: string;
    destination: string;
    description?: string;
    startDate: string;
    endDate: string;
    status: TripStatus;
    coverImage?: string;
    travelers: number;
    budget: {
        planned: number;
        spent: number;
        currency: string;
    };
    itinerary: ItineraryDay[];
    bookings: string[];
    notes?: string;
    isShared: boolean;
    shareCode?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ItineraryDay {
    date: string;
    dayNumber: number;
    items: ItineraryItem[];
}

export interface ItineraryItem {
    id: string;
    time: string;
    type: 'activity' | 'transport' | 'accommodation' | 'meal' | 'free' | 'note';
    title: string;
    description?: string;
    location?: string;
    duration?: string;
    cost?: number;
    bookingId?: string;
    isBooked: boolean;
}

export interface CreateTripData {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
    budget?: number;
    description?: string;
}

// ============================================
// Vendor Types
// ============================================

export type VendorStatus = 'pending' | 'verified' | 'suspended' | 'rejected';
export type ListingType = 'hotel' | 'event' | 'activity' | 'restaurant' | 'tour';
export type ListingStatus = 'draft' | 'pending' | 'active' | 'inactive' | 'rejected';

export interface Vendor {
    id: string;
    businessName: string;
    email: string;
    phone: string;
    logo?: string;
    coverImage?: string;
    description: string;
    address: Address;
    status: VendorStatus;
    verified: boolean;
    verifiedAt?: string;
    documents?: VendorDocument[];
    bankDetails?: BankDetails;
    listings: VendorListing[];
    stats: VendorStats;
    rating: Rating;
    createdAt: string;
    updatedAt: string;
}

export interface VendorDocument {
    id: string;
    type: 'business_registration' | 'id_card' | 'tax_certificate' | 'license' | 'other';
    name: string;
    url: string;
    status: 'pending' | 'approved' | 'rejected';
    uploadedAt: string;
}

export interface BankDetails {
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingNumber?: string;
}

export interface VendorStats {
    totalListings: number;
    activeListings: number;
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
}

export interface VendorListing {
    id: string;
    vendorId: string;
    type: ListingType;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    category: string;
    location: Address;
    images: Image[];
    coverImage: string;
    price: number;
    currency: string;
    priceUnit?: string;
    rating: Rating;
    status: ListingStatus;
    amenities?: string[];
    features?: string[];
    policies?: string[];
    availability?: Availability[];
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Availability {
    date: string;
    available: boolean;
    slots?: number;
    price?: number;
}

export interface VendorRegisterData {
    businessName: string;
    email: string;
    phone: string;
    password: string;
    description?: string;
    address?: Partial<Address>;
}

export interface CreateListingData {
    type: ListingType;
    name: string;
    description: string;
    category: string;
    location: Address;
    price: number;
    currency: string;
    amenities?: string[];
    features?: string[];
    images?: File[];
}

// ============================================
// Review Types
// ============================================

export interface Review {
    id: string;
    user: {
        id: string;
        name: string;
        avatar?: string;
    };
    itemType: 'destination' | 'event' | 'activity' | 'vendor';
    itemId: string;
    rating: number;
    title?: string;
    content: string;
    images?: Image[];
    helpful: number;
    response?: {
        content: string;
        respondedAt: string;
    };
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateReviewData {
    itemType: 'destination' | 'event' | 'activity' | 'vendor';
    itemId: string;
    rating: number;
    title?: string;
    content: string;
    images?: File[];
}

// ============================================
// Wishlist Types
// ============================================

export interface WishlistItem {
    id: string;
    type: 'destination' | 'event' | 'activity';
    itemId: string;
    item: Destination | Event | Activity;
    addedAt: string;
    notes?: string;
}

// ============================================
// Search Types
// ============================================

export interface SearchResult {
    type: 'destination' | 'event' | 'activity' | 'vendor';
    id: string;
    name: string;
    description: string;
    image?: string;
    location?: string;
    rating?: number;
    price?: number;
}

export interface SearchFilters {
    query: string;
    types?: ('destination' | 'event' | 'activity' | 'vendor')[];
    location?: string;
    dateFrom?: string;
    dateTo?: string;
    priceMin?: number;
    priceMax?: number;
    page?: number;
    limit?: number;
}

// ============================================
// AI/Chat Types
// ============================================

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    suggestions?: string[];
    actions?: ChatAction[];
}

export interface ChatAction {
    type: 'link' | 'booking' | 'search';
    label: string;
    data: Record<string, unknown>;
}

export interface AIRecommendation {
    type: 'destination' | 'event' | 'activity';
    items: (Destination | Event | Activity)[];
    reason: string;
}

export interface TripPlanRequest {
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
    budget?: number;
    interests?: string[];
    preferences?: string[];
}

// ============================================
// Notification Types
// ============================================

export type NotificationType =
    | 'booking'
    | 'trip'
    | 'promotion'
    | 'system'
    | 'social'
    | 'reminder';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    data?: Record<string, unknown>;
    createdAt: string;
}

// ============================================
// Admin Types
// ============================================

export interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    totalVendors: number;
    verifiedVendors: number;
    totalBookings: number;
    totalRevenue: number;
    revenueGrowth: number;
    bookingGrowth: number;
}

export interface AdminUserFilters {
    search?: string;
    status?: UserStatus;
    role?: UserRole;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}

export interface AdminVendorFilters {
    search?: string;
    status?: VendorStatus;
    type?: ListingType;
    verified?: boolean;
    page?: number;
    limit?: number;
}
