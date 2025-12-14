import { useState } from 'react';
import { useVendor } from '@/contexts/VendorContext';
import VendorSidebar from './VendorSidebar';
import VendorOverview from './dashboard/VendorOverview';
import VendorListings from './dashboard/VendorListings';
import VendorBookings from './dashboard/VendorBookings';
import VendorAnalytics from './dashboard/VendorAnalytics';
import VendorSettings from './dashboard/VendorSettings';
import AddListingForm from './dashboard/AddListingForm';

export type VendorView = 'overview' | 'listings' | 'add-listing' | 'bookings' | 'analytics' | 'settings';

const VendorDashboard = () => {
  const [currentView, setCurrentView] = useState<VendorView>('overview');
  const { vendor } = useVendor();

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <VendorOverview onNavigate={setCurrentView} />;
      case 'listings':
        return <VendorListings onAddNew={() => setCurrentView('add-listing')} />;
      case 'add-listing':
        return <AddListingForm onComplete={() => setCurrentView('listings')} onCancel={() => setCurrentView('listings')} />;
      case 'bookings':
        return <VendorBookings />;
      case 'analytics':
        return <VendorAnalytics />;
      case 'settings':
        return <VendorSettings />;
      default:
        return <VendorOverview onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <VendorSidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default VendorDashboard;
