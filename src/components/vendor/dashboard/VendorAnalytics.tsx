import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVendor } from '@/contexts/VendorContext';
import { TrendingUp, TrendingDown, Eye, Calendar, Star, DollarSign } from 'lucide-react';

const VendorAnalytics = () => {
  const { getStats } = useVendor();
  const stats = getStats();

  const metrics = [
    {
      title: 'Total Revenue',
      value: `₦${(stats.revenue / 1000).toFixed(0)}K`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Bookings',
      value: stats.bookings.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
    },
    {
      title: 'Page Views',
      value: stats.views.toLocaleString(),
      change: '+24.1%',
      trend: 'up',
      icon: Eye,
    },
    {
      title: 'Average Rating',
      value: stats.rating.toFixed(1),
      change: '+0.2',
      trend: 'up',
      icon: Star,
    },
  ];

  const monthlyData = [
    { month: 'Jan', bookings: 12, revenue: 180000 },
    { month: 'Feb', bookings: 18, revenue: 270000 },
    { month: 'Mar', bookings: 24, revenue: 360000 },
    { month: 'Apr', bookings: 21, revenue: 315000 },
    { month: 'May', bookings: 28, revenue: 420000 },
    { month: 'Jun', bookings: 32, revenue: 480000 },
  ];

  const topListings = [
    { name: 'Le Meridien Ibom Hotel', bookings: 89, revenue: 1250000, rating: 4.8 },
    { name: 'Calabar Carnival Experience', bookings: 45, revenue: 850000, rating: 4.9 },
    { name: 'Ibeno Beach Adventure', bookings: 22, revenue: 350000, rating: 4.6 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Track your performance and insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-vendor/10 flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-vendor" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-8 text-sm text-muted-foreground">{data.month}</span>
                  <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-vendor rounded-full transition-all"
                      style={{ width: `${(data.bookings / 35) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-16 text-right">
                    {data.bookings} bookings
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topListings.map((listing, index) => (
                <div key={listing.name} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-vendor/20 flex items-center justify-center text-vendor font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{listing.name}</p>
                    <p className="text-sm text-muted-foreground">{listing.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-vendor">₦{(listing.revenue / 1000).toFixed(0)}K</p>
                    <div className="flex items-center gap-1 text-sm text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      {listing.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-foreground mb-1">6.4%</p>
              <p className="text-sm text-muted-foreground">View to Booking Rate</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-foreground mb-1">₦15,750</p>
              <p className="text-sm text-muted-foreground">Average Booking Value</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-foreground mb-1">2.3 days</p>
              <p className="text-sm text-muted-foreground">Avg. Response Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAnalytics;
