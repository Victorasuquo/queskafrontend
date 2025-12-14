import { Button } from '@/components/ui/button';
import { useVendor } from '@/contexts/VendorContext';
import { 
  LayoutDashboard, 
  List, 
  Plus, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut, 
  Sparkles,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { VendorView } from './VendorDashboard';

interface VendorSidebarProps {
  currentView: VendorView;
  onNavigate: (view: VendorView) => void;
}

const VendorSidebar = ({ currentView, onNavigate }: VendorSidebarProps) => {
  const { vendor, logout } = useVendor();

  const menuItems = [
    { id: 'overview' as VendorView, icon: LayoutDashboard, label: 'Overview' },
    { id: 'listings' as VendorView, icon: List, label: 'My Listings' },
    { id: 'add-listing' as VendorView, icon: Plus, label: 'Add Listing' },
    { id: 'bookings' as VendorView, icon: Calendar, label: 'Bookings' },
    { id: 'analytics' as VendorView, icon: BarChart3, label: 'Analytics' },
    { id: 'settings' as VendorView, icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-background border-r border-border min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-vendor flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-vendor-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Queska</span>
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm text-vendor">
          <Building2 className="w-4 h-4" />
          <span className="font-medium">Vendor Portal</span>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vendor/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-vendor" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{vendor?.businessName}</p>
            <p className="text-xs text-muted-foreground truncate">{vendor?.email}</p>
          </div>
        </div>
        {vendor?.verified && (
          <div className="mt-2 inline-flex items-center gap-1 text-xs text-vendor bg-vendor-muted px-2 py-1 rounded">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified Partner
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === item.id
                ? 'bg-vendor text-vendor-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default VendorSidebar;
