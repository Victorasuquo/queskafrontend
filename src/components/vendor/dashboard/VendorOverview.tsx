import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVendor } from '@/contexts/VendorContext';
import { VendorView } from '../VendorDashboard';
import { 
  TrendingUp, 
  Calendar, 
  Eye, 
  Star, 
  Plus, 
  ArrowUpRight,
  Building2,
  Utensils,
  MapPin
} from 'lucide-react';

interface VendorOverviewProps {
  onNavigate: (view: VendorView) => void;
}

const VendorOverview = ({ onNavigate }: VendorOverviewProps) => {
  const { vendor, listings, getStats } = useVendor();
  const stats = getStats();

  const statCards = [
    { 
      title: 'Total Bookings', 
      value: stats.bookings.toLocaleString(), 
      icon: Calendar, 
      trend: '+12%',
      color: 'text-vendor' 
    },
    { 
      title: 'Revenue', 
      value: `₦${(stats.revenue / 1000).toFixed(0)}K`, 
      icon: TrendingUp, 
      trend: '+8%',
      color: 'text-green-600' 
    },
    { 
      title: 'Total Views', 
      value: stats.views.toLocaleString(), 
      icon: Eye, 
      trend: '+24%',
      color: 'text-blue-600' 
    },
    { 
      title: 'Rating', 
      value: stats.rating.toFixed(1), 
      icon: Star, 
      trend: 'Excellent',
      color: 'text-amber-500' 
    },
  ];

  const getListingIcon = (type: string) => {
    switch (type) {
      case 'hotel': return Building2;
      case 'restaurant': return Utensils;
      case 'activity': return MapPin;
      default: return Calendar;
    }
  };

  const recentListings = listings.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {vendor?.businessName}</h1>
          <p className="text-muted-foreground">Here's what's happening with your listings</p>
        </div>
        <Button onClick={() => onNavigate('add-listing')} className="bg-vendor hover:bg-vendor-accent text-vendor-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Listings */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => onNavigate('add-listing')}
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Listing
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => onNavigate('bookings')}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                View Bookings
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => onNavigate('analytics')}
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                View Analytics
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Listings</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('listings')}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentListings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No listings yet</p>
                <Button 
                  variant="link" 
                  className="text-vendor"
                  onClick={() => onNavigate('add-listing')}
                >
                  Create your first listing
                </Button>
              </div>
            ) : (
              recentListings.map((listing) => {
                const Icon = getListingIcon(listing.type);
                return (
                  <div key={listing.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-vendor/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-vendor" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{listing.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{listing.type} • {listing.bookings} bookings</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      listing.status === 'verified' 
                        ? 'bg-green-100 text-green-700' 
                        : listing.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {listing.status}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorOverview;
