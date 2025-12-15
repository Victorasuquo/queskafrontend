import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVendor } from '@/contexts/VendorContext';
import {
  Plus,
  Search,
  Building2,
  Utensils,
  MapPin,
  Calendar,
  Star,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListingType } from '@/lib/vendorData';
import { useLoadingState } from '@/hooks/useLoading';
import { VendorListingsGridSkeleton, SearchBarSkeleton } from '@/components/skeletons';

interface VendorListingsProps {
  onAddNew: () => void;
}

const VendorListings = ({ onAddNew }: VendorListingsProps) => {
  const { listings, deleteListing } = useVendor();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ListingType | 'all'>('all');

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || listing.type === filterType;
    return matchesSearch && matchesType;
  });

  const getListingIcon = (type: string) => {
    switch (type) {
      case 'hotel': return Building2;
      case 'restaurant': return Utensils;
      case 'activity': return MapPin;
      default: return Calendar;
    }
  };

  const typeFilters = [
    { value: 'all', label: 'All Types' },
    { value: 'hotel', label: 'Hotels' },
    { value: 'event', label: 'Events' },
    { value: 'activity', label: 'Activities' },
    { value: 'restaurant', label: 'Restaurants' },
  ];

  const { isLoading } = useLoadingState(true, 1000);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
            <p className="text-muted-foreground">Manage all your listings in one place</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-4">
            <SearchBarSkeleton />
          </CardContent>
        </Card>
        <VendorListingsGridSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
          <p className="text-muted-foreground">Manage all your listings in one place</p>
        </div>
        <Button onClick={onAddNew} className="bg-vendor hover:bg-vendor-accent text-vendor-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {typeFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterType === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(filter.value as ListingType | 'all')}
                  className={filterType === filter.value ? 'bg-vendor hover:bg-vendor-accent' : ''}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first listing to get started'}
            </p>
            <Button onClick={onAddNew} className="bg-vendor hover:bg-vendor-accent text-vendor-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add New Listing
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => {
            const Icon = getListingIcon(listing.type);
            return (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-40 bg-muted">
                  {listing.images[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${listing.status === 'verified'
                      ? 'bg-green-500 text-white'
                      : listing.status === 'pending'
                        ? 'bg-amber-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                    {listing.status}
                  </div>
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background border">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteListing(listing.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-1">{listing.name}</h3>
                    <span className="text-xs font-medium text-vendor bg-vendor-muted px-2 py-0.5 rounded capitalize">
                      {listing.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {listing.shortDescription}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{listing.rating}</span>
                      <span className="text-muted-foreground">({listing.reviewCount})</span>
                    </div>
                    <div className="font-semibold text-vendor">
                      {listing.pricing.currency} {listing.pricing.amount.toLocaleString()}
                      <span className="text-xs text-muted-foreground font-normal">/{listing.pricing.unit}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>{listing.bookings} bookings</span>
                    <span>₦{(listing.revenue / 1000).toFixed(0)}K revenue</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VendorListings;
