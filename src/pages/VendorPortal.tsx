import { useState } from 'react';
import { useVendor } from '@/contexts/VendorContext';
import VendorLanding from '@/components/vendor/VendorLanding';
import VendorAuth from '@/components/vendor/VendorAuth';
import VendorDashboard from '@/components/vendor/VendorDashboard';

const VendorPortal = () => {
  const { isLoggedIn } = useVendor();
  const [showAuth, setShowAuth] = useState(false);

  if (isLoggedIn) {
    return <VendorDashboard />;
  }

  if (showAuth) {
    return <VendorAuth onBack={() => setShowAuth(false)} />;
  }

  return <VendorLanding onGetStarted={() => setShowAuth(true)} />;
};

export default VendorPortal;
