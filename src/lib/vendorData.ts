// Vendor dummy data and types

export type ListingType = 'hotel' | 'event' | 'activity' | 'restaurant';
export type ListingStatus = 'pending' | 'verified' | 'rejected';

export interface VendorListing {
  id: string;
  vendorId: string;
  type: ListingType;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  pricing: {
    currency: string;
    amount: number;
    unit: string; // per night, per person, per event, etc.
  };
  metadata: Record<string, any>;
  documents: { name: string; url: string; verified: boolean }[];
  status: ListingStatus;
  rating: number;
  reviewCount: number;
  bookings: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  logo?: string;
  description: string;
  verified: boolean;
  listings: VendorListing[];
  totalBookings: number;
  totalRevenue: number;
  rating: number;
  createdAt: string;
}

// Dummy vendor data
export const dummyVendor: Vendor = {
  id: 'vendor-001',
  businessName: 'Akwa Paradise Hotels',
  email: 'contact@akwaparadise.com',
  phone: '+234 800 123 4567',
  logo: '',
  description: 'Premium hospitality services across Nigeria',
  verified: true,
  listings: [],
  totalBookings: 156,
  totalRevenue: 2450000,
  rating: 4.8,
  createdAt: '2024-01-15',
};

export const dummyListings: VendorListing[] = [
  {
    id: 'listing-001',
    vendorId: 'vendor-001',
    type: 'hotel',
    name: 'Le Meridien Ibom Hotel & Golf Resort',
    description: 'Experience luxury at its finest at Le Meridien Ibom Hotel & Golf Resort, featuring world-class amenities, an 18-hole golf course, and stunning views of the tropical landscape.',
    shortDescription: 'Luxury resort with golf course and spa',
    images: ['/placeholder.svg'],
    location: {
      address: 'Nwaniba Road',
      city: 'Uyo',
      country: 'Nigeria',
      lat: 5.0377,
      lng: 7.9128,
    },
    pricing: {
      currency: 'NGN',
      amount: 85000,
      unit: 'per night',
    },
    metadata: {
      rooms: 166,
      amenities: ['Pool', 'Spa', 'Golf Course', 'Restaurant', 'WiFi', 'Gym'],
      checkIn: '14:00',
      checkOut: '12:00',
      stars: 5,
    },
    documents: [
      { name: 'Business Registration', url: '/docs/reg.pdf', verified: true },
      { name: 'Tourism License', url: '/docs/license.pdf', verified: true },
    ],
    status: 'verified',
    rating: 4.8,
    reviewCount: 324,
    bookings: 89,
    revenue: 1250000,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-15',
  },
  {
    id: 'listing-002',
    vendorId: 'vendor-001',
    type: 'event',
    name: 'Calabar Carnival Experience',
    description: 'Join Africa\'s biggest street party! The Calabar Carnival features vibrant parades, cultural displays, and entertainment that celebrates Nigerian heritage.',
    shortDescription: 'Africa\'s biggest street party',
    images: ['/placeholder.svg'],
    location: {
      address: 'Mary Slessor Avenue',
      city: 'Calabar',
      country: 'Nigeria',
      lat: 4.9517,
      lng: 8.3220,
    },
    pricing: {
      currency: 'NGN',
      amount: 25000,
      unit: 'per person',
    },
    metadata: {
      date: '2024-12-26',
      duration: '8 hours',
      capacity: 500,
      includes: ['VIP Seating', 'Drinks', 'Snacks', 'Transport'],
    },
    documents: [
      { name: 'Event Permit', url: '/docs/permit.pdf', verified: true },
    ],
    status: 'verified',
    rating: 4.9,
    reviewCount: 156,
    bookings: 45,
    revenue: 850000,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-20',
  },
  {
    id: 'listing-003',
    vendorId: 'vendor-001',
    type: 'activity',
    name: 'Ibeno Beach Adventure',
    description: 'Discover the pristine Ibeno Beach with guided tours, water sports, and authentic local cuisine experiences.',
    shortDescription: 'Beach tours and water sports',
    images: ['/placeholder.svg'],
    location: {
      address: 'Ibeno Beach',
      city: 'Ibeno',
      country: 'Nigeria',
      lat: 4.5667,
      lng: 7.9833,
    },
    pricing: {
      currency: 'NGN',
      amount: 15000,
      unit: 'per person',
    },
    metadata: {
      duration: '6 hours',
      difficulty: 'Easy',
      includes: ['Guide', 'Equipment', 'Lunch', 'Transport'],
      groupSize: '2-15 people',
    },
    documents: [
      { name: 'Safety Certification', url: '/docs/safety.pdf', verified: false },
    ],
    status: 'pending',
    rating: 4.6,
    reviewCount: 78,
    bookings: 22,
    revenue: 350000,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-25',
  },
];

// Local storage helpers for uploaded listings
const STORAGE_KEY = 'queska_vendor_listings';

export const getStoredListings = (): VendorListing[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveListingToStorage = (listing: VendorListing): void => {
  const existing = getStoredListings();
  existing.push(listing);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const updateListingInStorage = (listing: VendorListing): void => {
  const existing = getStoredListings();
  const index = existing.findIndex(l => l.id === listing.id);
  if (index >= 0) {
    existing[index] = listing;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }
};

export const deleteListingFromStorage = (id: string): void => {
  const existing = getStoredListings();
  const filtered = existing.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getAllListings = (): VendorListing[] => {
  return [...dummyListings, ...getStoredListings()];
};

export const getListingsByType = (type: ListingType): VendorListing[] => {
  return getAllListings().filter(l => l.type === type && l.status === 'verified');
};
