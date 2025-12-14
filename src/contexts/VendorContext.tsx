import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vendor, VendorListing, dummyVendor, dummyListings, getStoredListings, saveListingToStorage, updateListingInStorage, deleteListingFromStorage } from '@/lib/vendorData';

interface VendorContextType {
  vendor: Vendor | null;
  isLoggedIn: boolean;
  listings: VendorListing[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: Partial<Vendor>) => boolean;
  addListing: (listing: VendorListing) => void;
  updateListing: (listing: VendorListing) => void;
  deleteListing: (id: string) => void;
  getStats: () => { bookings: number; revenue: number; views: number; rating: number };
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider = ({ children }: { children: ReactNode }) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listings, setListings] = useState<VendorListing[]>([]);

  useEffect(() => {
    // Check for existing session
    const savedVendor = localStorage.getItem('queska_vendor_session');
    if (savedVendor) {
      setVendor(JSON.parse(savedVendor));
      setIsLoggedIn(true);
    }
    // Load all listings
    setListings([...dummyListings, ...getStoredListings()]);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Dummy login - accepts any credentials
    const loggedInVendor = { ...dummyVendor, email };
    setVendor(loggedInVendor);
    setIsLoggedIn(true);
    localStorage.setItem('queska_vendor_session', JSON.stringify(loggedInVendor));
    return true;
  };

  const logout = () => {
    setVendor(null);
    setIsLoggedIn(false);
    localStorage.removeItem('queska_vendor_session');
  };

  const register = (data: Partial<Vendor>): boolean => {
    const newVendor: Vendor = {
      ...dummyVendor,
      id: `vendor-${Date.now()}`,
      ...data,
      verified: false,
      listings: [],
      totalBookings: 0,
      totalRevenue: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
    };
    setVendor(newVendor);
    setIsLoggedIn(true);
    localStorage.setItem('queska_vendor_session', JSON.stringify(newVendor));
    return true;
  };

  const addListing = (listing: VendorListing) => {
    saveListingToStorage(listing);
    setListings(prev => [...prev, listing]);
  };

  const updateListing = (listing: VendorListing) => {
    updateListingInStorage(listing);
    setListings(prev => prev.map(l => l.id === listing.id ? listing : l));
  };

  const deleteListing = (id: string) => {
    deleteListingFromStorage(id);
    setListings(prev => prev.filter(l => l.id !== id));
  };

  const getStats = () => {
    const vendorListings = listings.filter(l => l.vendorId === vendor?.id);
    return {
      bookings: vendorListings.reduce((acc, l) => acc + l.bookings, 0) || dummyVendor.totalBookings,
      revenue: vendorListings.reduce((acc, l) => acc + l.revenue, 0) || dummyVendor.totalRevenue,
      views: 2450, // Dummy data
      rating: vendor?.rating || 4.8,
    };
  };

  return (
    <VendorContext.Provider value={{
      vendor,
      isLoggedIn,
      listings,
      login,
      logout,
      register,
      addListing,
      updateListing,
      deleteListing,
      getStats,
    }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
};
