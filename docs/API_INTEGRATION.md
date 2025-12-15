# API Integration Guide

This document explains how the Queska frontend is structured for API integration.

## Directory Structure

```
src/
├── lib/
│   └── api/
│       ├── config.ts          # API configuration, endpoints, storage keys
│       ├── client.ts          # HTTP client with interceptors
│       ├── index.ts           # Export all services
│       └── services/
│           ├── auth.service.ts        # Authentication
│           ├── users.service.ts       # User management
│           ├── destinations.service.ts # Destinations
│           ├── events.service.ts      # Events
│           ├── activities.service.ts  # Activities
│           ├── bookings.service.ts    # Bookings
│           ├── trips.service.ts       # Trip management
│           ├── wishlist.service.ts    # Wishlist
│           ├── reviews.service.ts     # Reviews
│           ├── search.service.ts      # Global search
│           ├── ai.service.ts          # AI chat & recommendations
│           ├── vendors.service.ts     # Vendor portal
│           └── admin.service.ts       # Admin dashboard
├── types/
│   └── index.ts               # All TypeScript interfaces
├── hooks/
│   └── useApi.ts              # React Query hooks for data fetching
└── contexts/
    ├── AuthContext.tsx        # Global auth state
    └── VendorContext.tsx      # Vendor state (existing)
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
VITE_API_BASE_URL=https://api.queska.com/api
VITE_API_VERSION=v1
```

### API Base URL

The API client is configured in `src/lib/api/config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  VERSION: 'v1',
  TIMEOUT: 30000,
};
```

## Usage Examples

### Using Services Directly

```typescript
import { authService, destinationsService } from '@/lib/api';

// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get destinations
const destinations = await destinationsService.getAll({
  category: 'beach',
  region: 'South South',
  page: 1,
  limit: 10
});
```

### Using React Query Hooks

```typescript
import { useDestinations, useLogin, useCreateBooking } from '@/hooks/useApi';

// In a component
function DestinationList() {
  const { data, isLoading, error } = useDestinations({ category: 'beach' });
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {data?.data.map(destination => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
}

// Mutations
function LoginForm() {
  const loginMutation = useLogin();
  
  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => navigate('/dashboard'),
      onError: (error) => toast.error(error.message)
    });
  };
}
```

### Using Auth Context

```typescript
import { useAuth } from '@/contexts/AuthContext';

function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Endpoints

All endpoints are defined in `src/lib/api/config.ts`:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Refresh token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `GET /auth/me` - Get current user

### Destinations
- `GET /destinations` - List all destinations
- `GET /destinations/:id` - Get destination by ID
- `GET /destinations/featured` - Featured destinations
- `GET /destinations/popular` - Popular destinations
- `GET /destinations/search` - Search destinations
- `GET /destinations/categories` - List categories

### Events
- `GET /events` - List all events
- `GET /events/:id` - Get event by ID
- `GET /events/featured` - Featured events
- `GET /events/upcoming` - Upcoming events
- `GET /events/search` - Search events

### Activities
- `GET /activities` - List all activities
- `GET /activities/:id` - Get activity by ID
- `GET /activities/featured` - Featured activities
- `GET /activities/popular` - Popular activities

### Bookings
- `GET /bookings/user` - User's bookings
- `POST /bookings/create` - Create booking
- `POST /bookings/cancel/:id` - Cancel booking
- `GET /bookings/history` - Booking history

### Trips
- `GET /trips/user` - User's trips
- `POST /trips/create` - Create trip
- `PATCH /trips/update/:id` - Update trip
- `DELETE /trips/:id` - Delete trip

### Vendors
- `POST /vendors/register` - Vendor registration
- `POST /vendors/login` - Vendor login
- `GET /vendors/profile` - Vendor profile
- `GET /vendors/listings` - Vendor's listings
- `POST /vendors/listings` - Create listing
- `GET /vendors/bookings` - Vendor's bookings
- `GET /vendors/analytics` - Vendor analytics

### Admin
- `POST /admin/login` - Admin login
- `GET /admin/dashboard` - Dashboard data
- `GET /admin/users` - List users
- `GET /admin/vendors` - List vendors
- `GET /admin/analytics` - Platform analytics

## Type Definitions

All types are in `src/types/index.ts`:

- `User`, `UserPreferences`, `UserActivity`
- `Destination`, `DestinationFilters`
- `Event`, `EventFilters`
- `Activity`, `ActivityFilters`
- `Booking`, `CreateBookingData`
- `Trip`, `CreateTripData`, `ItineraryItem`
- `Vendor`, `VendorListing`, `VendorStats`
- `Review`, `CreateReviewData`
- `WishlistItem`
- `SearchResult`, `SearchFilters`
- `ChatMessage`, `AIRecommendation`

## Error Handling

The API client automatically handles:

1. **401 Unauthorized** - Attempts token refresh, then logs out if failed
2. **403 Forbidden** - Dispatches `auth:forbidden` event
3. **429 Too Many Requests** - Shows rate limit message
4. **Network Errors** - Timeout handling with retry logic

```typescript
try {
  const data = await destinationsService.getById('123');
} catch (error) {
  if (error.status === 404) {
    // Handle not found
  } else if (error.status === 401) {
    // User will be logged out automatically
  } else {
    // Show generic error
    toast.error(error.message);
  }
}
```

## Token Management

Tokens are stored in localStorage:

- `queska_access_token` - JWT access token
- `queska_refresh_token` - Refresh token
- `queska_user` - Cached user data
- `queska_vendor_session` - Vendor session data
- `queska_admin_session` - Admin session data

## Migration from Dummy Data

To replace dummy data with API calls:

1. **Import the appropriate hook or service**
2. **Replace static data with API response**
3. **Add loading and error states**
4. **Remove dummy data imports**

### Before (Dummy Data):
```typescript
const destinations = [
  { id: 1, name: "Ibeno Beach", ... },
  { id: 2, name: "Obudu Ranch", ... },
];

return destinations.map(d => <Card key={d.id} {...d} />);
```

### After (API Integration):
```typescript
import { useDestinations } from '@/hooks/useApi';

const { data, isLoading, error } = useDestinations();

if (isLoading) return <Skeleton />;
if (error) return <Error />;

return data.data.map(d => <Card key={d.id} {...d} />);
```

## Backend Requirements

The backend API should:

1. Return JSON responses with this structure:
```json
{
  "data": { ... },
  "message": "Success",
  "success": true,
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

2. Use JWT for authentication
3. Support token refresh
4. Follow RESTful conventions
5. Return appropriate HTTP status codes
