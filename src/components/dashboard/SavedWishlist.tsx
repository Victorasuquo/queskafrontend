import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MapPin,
  Star,
  Hotel,
  Utensils,
  Camera,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useLoadingState } from "@/hooks/useLoading";
import { WishlistSkeleton, PageHeaderSkeleton, TabsSkeleton } from "@/components/skeletons";

const savedItems = {
  destinations: [
    {
      id: 1,
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
      rating: 4.9,
      category: "Island",
      savedDate: "2 days ago",
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
      rating: 4.8,
      category: "Cultural",
      savedDate: "1 week ago",
    },
    {
      id: 3,
      name: "Marrakech, Morocco",
      image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400",
      rating: 4.7,
      category: "Adventure",
      savedDate: "2 weeks ago",
    },
  ],
  hotels: [
    {
      id: 1,
      name: "Calabar Marina Resort",
      location: "Calabar, Nigeria",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      rating: 4.8,
      price: "$180/night",
      savedDate: "3 days ago",
    },
    {
      id: 2,
      name: "Copacabana Palace",
      location: "Rio de Janeiro, Brazil",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      rating: 4.9,
      price: "$450/night",
      savedDate: "1 week ago",
    },
  ],
  restaurants: [
    {
      id: 1,
      name: "Obudu Mountain Cuisine",
      location: "Calabar, Nigeria",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      rating: 4.7,
      cuisine: "Nigerian",
      price: "$$",
      savedDate: "1 day ago",
    },
    {
      id: 2,
      name: "Le Meridien Grill",
      location: "Lagos, Nigeria",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      rating: 4.6,
      cuisine: "Continental",
      price: "$$$",
      savedDate: "5 days ago",
    },
  ],
  experiences: [
    {
      id: 1,
      name: "Calabar Carnival VIP Access",
      location: "Calabar, Nigeria",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
      rating: 4.9,
      price: "$150",
      duration: "Full day",
      savedDate: "2 days ago",
    },
    {
      id: 2,
      name: "Mangrove Kayaking Tour",
      location: "Calabar, Nigeria",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
      rating: 4.8,
      price: "$75",
      duration: "4 hours",
      savedDate: "1 week ago",
    },
  ],
};

const SavedWishlist = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { isLoading } = useLoadingState(true, 1000);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeaderSkeleton />
        <TabsSkeleton tabs={4} />
        <WishlistSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Saved & Wishlist</h1>
        <p className="text-muted-foreground mt-1">
          All your saved destinations, hotels, restaurants, and experiences
        </p>
      </div>

      <Tabs defaultValue="destinations" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="destinations" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Destinations ({savedItems.destinations.length})
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Hotel className="h-4 w-4" />
            Hotels ({savedItems.hotels.length})
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Restaurants ({savedItems.restaurants.length})
          </TabsTrigger>
          <TabsTrigger value="experiences" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Experiences ({savedItems.experiences.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="destinations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.destinations.map((item) => (
              <Card
                key={item.id}
                className="bg-card border-border overflow-hidden group"
                onMouseEnter={() => setHoveredItem(`dest-${item.id}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  </Button>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-foreground">{item.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.savedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="flex-1">Plan Trip</Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hotels">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.hotels.map((item) => (
              <Card key={item.id} className="bg-card border-border overflow-hidden group">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-foreground">{item.rating}</span>
                    </div>
                    <span className="font-semibold text-foreground">{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="flex-1">Book Now</Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="restaurants">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.restaurants.map((item) => (
              <Card key={item.id} className="bg-card border-border overflow-hidden group">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.cuisine}</Badge>
                      <span className="text-sm text-muted-foreground">{item.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-foreground">{item.rating}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4">Reserve Table</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experiences">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.experiences.map((item) => (
              <Card key={item.id} className="bg-card border-border overflow-hidden group">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                    <span className="font-semibold text-foreground">{item.price}</span>
                  </div>
                  <Button size="sm" className="w-full mt-4">Book Experience</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedWishlist;
