import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, MapPin, Clock, CheckCircle, XCircle, Clock3 } from 'lucide-react';

const VendorBookings = () => {
  // Dummy booking data
  const bookings = [
    {
      id: 'BK001',
      listingName: 'Le Meridien Ibom Hotel',
      guestName: 'John Adewale',
      guestEmail: 'john@email.com',
      checkIn: '2024-03-25',
      checkOut: '2024-03-28',
      guests: 2,
      amount: 255000,
      status: 'confirmed',
      createdAt: '2024-03-20',
    },
    {
      id: 'BK002',
      listingName: 'Calabar Carnival Experience',
      guestName: 'Sarah Okonkwo',
      guestEmail: 'sarah@email.com',
      checkIn: '2024-12-26',
      checkOut: '2024-12-26',
      guests: 4,
      amount: 100000,
      status: 'pending',
      createdAt: '2024-03-18',
    },
    {
      id: 'BK003',
      listingName: 'Ibeno Beach Adventure',
      guestName: 'Michael Eze',
      guestEmail: 'michael@email.com',
      checkIn: '2024-04-05',
      checkOut: '2024-04-05',
      guests: 6,
      amount: 90000,
      status: 'confirmed',
      createdAt: '2024-03-15',
    },
    {
      id: 'BK004',
      listingName: 'Le Meridien Ibom Hotel',
      guestName: 'Ada Nwosu',
      guestEmail: 'ada@email.com',
      checkIn: '2024-04-10',
      checkOut: '2024-04-12',
      guests: 1,
      amount: 170000,
      status: 'cancelled',
      createdAt: '2024-03-10',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock3 className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    revenue: bookings.filter(b => b.status !== 'cancelled').reduce((acc, b) => acc + b.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
        <p className="text-muted-foreground">Manage your reservations and bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-vendor">₦{(stats.revenue / 1000).toFixed(0)}K</p>
            <p className="text-sm text-muted-foreground">Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div 
                key={booking.id} 
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{booking.id}</span>
                    <Badge className={`${getStatusColor(booking.status)} border`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-foreground">{booking.listingName}</h4>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {booking.guestName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {booking.checkIn} {booking.checkIn !== booking.checkOut && `→ ${booking.checkOut}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₦{booking.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Booked {booking.createdAt}</p>
                  </div>
                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-vendor hover:bg-vendor-accent text-vendor-foreground">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorBookings;
