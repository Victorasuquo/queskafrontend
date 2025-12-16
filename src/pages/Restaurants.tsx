import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    Utensils,
    Search,
    MapPin,
    Star,
    Clock,
    DollarSign,
    Heart,
    Share2,
    Phone,
    Globe,
    ChevronLeft,
    ChevronRight,
    Filter,
    Grid,
    List,
    Flame,
    Leaf,
    Wine,
    Coffee,
    IceCream,
    Pizza,
    Soup,
    UtensilsCrossed,
    Users,
    Calendar,
    CheckCircle,
    X,
    Navigation as NavigationIcon,
    ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useLoadingState } from "@/hooks/useLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Images
import heroFestival from "@/assets/hero-festival.jpg";
import interestFood from "@/assets/interest-food.jpg";
import communityExperience from "@/assets/community-experience.jpg";

// Restaurant card skeleton
const RestaurantCardSkeleton = () => (
    <Card className="overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
            </div>
        </CardContent>
    </Card>
);

const Restaurants = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cuisineFilter, setCuisineFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");
    const [sortBy, setSortBy] = useState("rating");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedRestaurant, setSelectedRestaurant] = useState<typeof allRestaurants[0] | null>(null);
    const [savedRestaurants, setSavedRestaurants] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const restaurantsPerPage = 9;

    const { isLoading } = useLoadingState(true, 1200);

    const allRestaurants = [
        {
            id: 1,
            name: "Yellow Chilli",
            tagline: "Authentic Nigerian Fine Dining",
            description: "Experience the finest Nigerian cuisine at Yellow Chilli, where traditional recipes meet contemporary presentation. Known for our signature pepper soup, jollof rice, and premium suya.",
            cuisine: "Nigerian",
            location: "Victoria Island, Lagos",
            city: "Lagos",
            address: "27 Oju Olobun Close, Victoria Island, Lagos",
            image: interestFood,
            galleryImages: [interestFood, heroFestival, communityExperience],
            priceRange: "₦₦₦",
            priceLevel: 3,
            rating: 4.7,
            reviews: 2340,
            openHours: "11:00 AM - 11:00 PM",
            isOpen: true,
            phone: "+234 812 345 6789",
            website: "https://yellowchilli.com",
            features: ["Outdoor Seating", "Live Music", "Private Dining", "Valet Parking"],
            specialties: ["Pepper Soup", "Jollof Rice", "Suya", "Egusi Soup"],
            dietary: ["Vegetarian Options", "Gluten-Free Options"],
            atmosphere: "Fine Dining",
            reservations: true,
            delivery: true,
            takeaway: true,
        },
        {
            id: 2,
            name: "Nkoyo",
            tagline: "Calabar's Culinary Gem",
            description: "Nkoyo brings the rich flavors of Cross River cuisine to your table. Specializing in native Calabar dishes, fresh seafood, and traditional delicacies prepared with authentic recipes.",
            cuisine: "Calabar",
            location: "Calabar, Cross River",
            city: "Calabar",
            address: "8 Mary Slessor Avenue, Calabar",
            image: heroFestival,
            galleryImages: [heroFestival, interestFood, communityExperience],
            priceRange: "₦₦",
            priceLevel: 2,
            rating: 4.8,
            reviews: 1890,
            openHours: "10:00 AM - 10:00 PM",
            isOpen: true,
            phone: "+234 803 456 7890",
            website: "https://nkoyo.ng",
            features: ["River View", "Cultural Decor", "Live Band (Weekends)", "Family Friendly"],
            specialties: ["Afang Soup", "Edikang Ikong", "Ekpang Nkukwo", "Fresh Fish Pepper Soup"],
            dietary: ["Seafood", "Local Ingredients"],
            atmosphere: "Casual Dining",
            reservations: true,
            delivery: false,
            takeaway: true,
        },
        {
            id: 3,
            name: "Sky Restaurant & Lounge",
            tagline: "Dining Above the Clouds",
            description: "Lagos's premier rooftop dining experience offering panoramic city views, international cuisine, and an extensive cocktail menu. Perfect for romantic dinners and special celebrations.",
            cuisine: "International",
            location: "Ikoyi, Lagos",
            city: "Lagos",
            address: "24th Floor, Civic Tower, Ozumba Mbadiwe Avenue, Ikoyi",
            image: communityExperience,
            galleryImages: [communityExperience, heroFestival, interestFood],
            priceRange: "₦₦₦₦",
            priceLevel: 4,
            rating: 4.6,
            reviews: 3200,
            openHours: "6:00 PM - 2:00 AM",
            isOpen: true,
            phone: "+234 815 678 9012",
            website: "https://skylagos.com",
            features: ["Rooftop", "City Views", "Cocktail Bar", "Live DJ", "VIP Section"],
            specialties: ["Grilled Lobster", "Wagyu Steak", "Signature Cocktails", "Sushi"],
            dietary: ["Vegetarian Options", "Vegan Options"],
            atmosphere: "Upscale/Lounge",
            reservations: true,
            delivery: false,
            takeaway: false,
        },
        {
            id: 4,
            name: "Mama Cass Restaurant",
            tagline: "Home of Lagos Amala",
            description: "A Lagos institution famous for authentic Yoruba cuisine. Mama Cass serves the best amala, ewedu, and gbegiri in town, along with a variety of traditional Nigerian dishes.",
            cuisine: "Yoruba",
            location: "Ikeja, Lagos",
            city: "Lagos",
            address: "15 Opebi Road, Ikeja, Lagos",
            image: interestFood,
            galleryImages: [interestFood, heroFestival, communityExperience],
            priceRange: "₦",
            priceLevel: 1,
            rating: 4.5,
            reviews: 5600,
            openHours: "8:00 AM - 10:00 PM",
            isOpen: true,
            phone: "+234 809 876 5432",
            website: "https://mamacass.ng",
            features: ["Local Favorite", "Quick Service", "Large Portions", "AC Section"],
            specialties: ["Amala & Ewedu", "Gbegiri", "Asun", "Goat Meat Pepper Soup"],
            dietary: ["Traditional Recipes"],
            atmosphere: "Casual",
            reservations: false,
            delivery: true,
            takeaway: true,
        },
        {
            id: 5,
            name: "The Place",
            tagline: "Where Nigeria Meets the World",
            description: "Modern Nigerian restaurant chain offering a fusion of local and international flavors. Known for consistent quality, great ambiance, and family-friendly atmosphere.",
            cuisine: "Nigerian Fusion",
            location: "Multiple Locations",
            city: "Lagos",
            address: "Lekki, Victoria Island, Ikeja, Surulere",
            image: heroFestival,
            galleryImages: [heroFestival, interestFood, communityExperience],
            priceRange: "₦₦",
            priceLevel: 2,
            rating: 4.4,
            reviews: 8900,
            openHours: "10:00 AM - 11:00 PM",
            isOpen: true,
            phone: "+234 700 THEPLACE",
            website: "https://theplaceng.com",
            features: ["Multiple Locations", "Kids Menu", "Birthday Packages", "Free WiFi"],
            specialties: ["Jollof Rice", "Fried Rice", "Grilled Chicken", "Smoothies"],
            dietary: ["Vegetarian Options", "Kids Menu"],
            atmosphere: "Family Friendly",
            reservations: true,
            delivery: true,
            takeaway: true,
        },
        {
            id: 6,
            name: "Jevinik Restaurant",
            tagline: "South-South Delicacies",
            description: "Premium Nigerian restaurant specializing in South-South and South-East cuisines. Famous for native soups, fresh seafood, and traditional cooking methods.",
            cuisine: "South-South",
            location: "Lekki, Lagos",
            city: "Lagos",
            address: "Plot 5, Admiralty Road, Lekki Phase 1",
            image: communityExperience,
            galleryImages: [communityExperience, interestFood, heroFestival],
            priceRange: "₦₦₦",
            priceLevel: 3,
            rating: 4.6,
            reviews: 2100,
            openHours: "11:00 AM - 10:30 PM",
            isOpen: true,
            phone: "+234 816 543 2109",
            website: "https://jevinik.com",
            features: ["Private Rooms", "Corporate Events", "Catering Services"],
            specialties: ["Ofe Nsala", "Banga Soup", "Fresh Catfish", "Ukodo"],
            dietary: ["Seafood Specialties"],
            atmosphere: "Semi-Formal",
            reservations: true,
            delivery: true,
            takeaway: true,
        },
        {
            id: 7,
            name: "Shiro Lagos",
            tagline: "Pan-Asian Excellence",
            description: "Award-winning Asian restaurant offering authentic Japanese, Chinese, and Thai cuisines. Experience omakase dining, fresh sushi, and premium sake selection.",
            cuisine: "Asian",
            location: "Victoria Island, Lagos",
            city: "Lagos",
            address: "12A Adeola Odeku Street, Victoria Island",
            image: interestFood,
            galleryImages: [interestFood, communityExperience, heroFestival],
            priceRange: "₦₦₦₦",
            priceLevel: 4,
            rating: 4.8,
            reviews: 1560,
            openHours: "12:00 PM - 11:00 PM",
            isOpen: true,
            phone: "+234 813 210 9876",
            website: "https://shirolagos.com",
            features: ["Sushi Bar", "Teppanyaki", "Private Tatami Rooms", "Sake Selection"],
            specialties: ["Omakase", "Wagyu Beef", "Dragon Roll", "Pad Thai"],
            dietary: ["Vegetarian Options", "Gluten-Free Options"],
            atmosphere: "Fine Dining",
            reservations: true,
            delivery: false,
            takeaway: true,
        },
        {
            id: 8,
            name: "Bungalow Restaurant",
            tagline: "Continental Classics",
            description: "Elegant continental restaurant in the heart of Ikoyi. Known for grilled meats, Mediterranean dishes, and an award-winning wine cellar.",
            cuisine: "Continental",
            location: "Ikoyi, Lagos",
            city: "Lagos",
            address: "9 Bourdillon Road, Ikoyi, Lagos",
            image: heroFestival,
            galleryImages: [heroFestival, communityExperience, interestFood],
            priceRange: "₦₦₦₦",
            priceLevel: 4,
            rating: 4.7,
            reviews: 2800,
            openHours: "12:00 PM - 11:30 PM",
            isOpen: true,
            phone: "+234 802 109 8765",
            website: "https://bungalowikoyi.com",
            features: ["Wine Cellar", "Cigar Lounge", "Garden Seating", "Sunday Brunch"],
            specialties: ["Grilled Ribeye", "Seafood Platter", "Truffle Pasta", "Tiramisu"],
            dietary: ["Vegetarian Options"],
            atmosphere: "Fine Dining",
            reservations: true,
            delivery: false,
            takeaway: false,
        },
        {
            id: 9,
            name: "Obudu Ranch Restaurant",
            tagline: "Mountain Dining Experience",
            description: "Dine at 1,716 meters above sea level with breathtaking views of the Obudu Plateau. Fresh ingredients, local recipes, and international options.",
            cuisine: "Nigerian/International",
            location: "Obudu, Cross River",
            city: "Obudu",
            address: "Obudu Mountain Resort, Cross River State",
            image: communityExperience,
            galleryImages: [communityExperience, heroFestival, interestFood],
            priceRange: "₦₦₦",
            priceLevel: 3,
            rating: 4.5,
            reviews: 980,
            openHours: "7:00 AM - 10:00 PM",
            isOpen: true,
            phone: "+234 817 654 3210",
            website: "https://obuduranch.com",
            features: ["Mountain Views", "Outdoor Terrace", "Breakfast Buffet", "Room Service"],
            specialties: ["Mountain Trout", "Bush Meat", "Continental Breakfast", "Local Soups"],
            dietary: ["Vegetarian Options", "Special Diets"],
            atmosphere: "Resort Dining",
            reservations: true,
            delivery: false,
            takeaway: false,
        },
        {
            id: 10,
            name: "Cafe Neo",
            tagline: "Africa's Premium Coffee Experience",
            description: "Nigerian-owned premium coffee chain serving single-origin African coffee, fresh pastries, and light meals. Perfect for work meetings or casual hangouts.",
            cuisine: "Cafe",
            location: "Multiple Locations",
            city: "Lagos",
            address: "Lekki, Ikoyi, Victoria Island",
            image: interestFood,
            galleryImages: [interestFood, heroFestival, communityExperience],
            priceRange: "₦₦",
            priceLevel: 2,
            rating: 4.6,
            reviews: 4500,
            openHours: "7:00 AM - 9:00 PM",
            isOpen: true,
            phone: "+234 700 CAFENEO",
            website: "https://cafeneo.com",
            features: ["Free WiFi", "Power Outlets", "Work Friendly", "Outdoor Seating"],
            specialties: ["Single Origin Coffee", "Croissants", "Smoothie Bowls", "Avocado Toast"],
            dietary: ["Vegetarian Options", "Vegan Options", "Gluten-Free Options"],
            atmosphere: "Casual/Cafe",
            reservations: false,
            delivery: true,
            takeaway: true,
        },
        {
            id: 11,
            name: "Cactus Restaurant",
            tagline: "Mexican Fiesta in Lagos",
            description: "Authentic Mexican cuisine with a Nigerian twist. Famous for tacos, burritos, fajitas, and the best margaritas in Lagos.",
            cuisine: "Mexican",
            location: "Lekki, Lagos",
            city: "Lagos",
            address: "32 Admiralty Way, Lekki Phase 1",
            image: heroFestival,
            galleryImages: [heroFestival, interestFood, communityExperience],
            priceRange: "₦₦",
            priceLevel: 2,
            rating: 4.4,
            reviews: 1800,
            openHours: "12:00 PM - 11:00 PM",
            isOpen: true,
            phone: "+234 814 567 8901",
            website: "https://cactuslagos.com",
            features: ["Taco Tuesday", "Happy Hour", "Live Music (Fridays)", "Tequila Bar"],
            specialties: ["Beef Tacos", "Chicken Burrito", "Guacamole", "Churros"],
            dietary: ["Vegetarian Options", "Vegan Tacos"],
            atmosphere: "Casual/Fun",
            reservations: true,
            delivery: true,
            takeaway: true,
        },
        {
            id: 12,
            name: "Orchid Bistro",
            tagline: "French Elegance, Nigerian Soul",
            description: "Upscale French bistro offering classic dishes with local ingredients. Renowned for wine pairing dinners and elegant weekend brunch.",
            cuisine: "French",
            location: "Ikoyi, Lagos",
            city: "Lagos",
            address: "45 Awolowo Road, Ikoyi",
            image: communityExperience,
            galleryImages: [communityExperience, interestFood, heroFestival],
            priceRange: "₦₦₦₦",
            priceLevel: 4,
            rating: 4.7,
            reviews: 920,
            openHours: "11:00 AM - 10:30 PM",
            isOpen: true,
            phone: "+234 811 234 5678",
            website: "https://orchidbistro.ng",
            features: ["Wine Pairing", "Sommelier", "Brunch Menu", "Private Events"],
            specialties: ["Duck Confit", "Coq au Vin", "Crème Brûlée", "French Onion Soup"],
            dietary: ["Vegetarian Options"],
            atmosphere: "Fine Dining",
            reservations: true,
            delivery: false,
            takeaway: false,
        },
    ];

    const cuisines = ["all", "Nigerian", "Calabar", "Yoruba", "South-South", "Nigerian Fusion", "International", "Asian", "Continental", "Cafe", "Mexican", "French"];
    const cities = ["all", "Lagos", "Calabar", "Obudu", "Abuja", "Port Harcourt"];
    const priceRanges = [
        { value: "all", label: "All Prices" },
        { value: "1", label: "₦ - Budget" },
        { value: "2", label: "₦₦ - Moderate" },
        { value: "3", label: "₦₦₦ - Upscale" },
        { value: "4", label: "₦₦₦₦ - Fine Dining" },
    ];

    const getCuisineIcon = (cuisine: string) => {
        switch (cuisine.toLowerCase()) {
            case "nigerian":
            case "yoruba":
            case "calabar":
            case "south-south":
                return <Flame className="w-4 h-4" />;
            case "asian":
                return <Soup className="w-4 h-4" />;
            case "mexican":
                return <Pizza className="w-4 h-4" />;
            case "cafe":
                return <Coffee className="w-4 h-4" />;
            case "french":
            case "continental":
                return <Wine className="w-4 h-4" />;
            default:
                return <Utensils className="w-4 h-4" />;
        }
    };

    // Filter and sort restaurants
    const filteredRestaurants = allRestaurants
        .filter(restaurant => {
            const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                restaurant.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCuisine = cuisineFilter === "all" || restaurant.cuisine === cuisineFilter;
            const matchesLocation = locationFilter === "all" || restaurant.city === locationFilter;
            const matchesPrice = priceFilter === "all" || restaurant.priceLevel === parseInt(priceFilter);
            return matchesSearch && matchesCuisine && matchesLocation && matchesPrice;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "rating": return b.rating - a.rating;
                case "reviews": return b.reviews - a.reviews;
                case "price-low": return a.priceLevel - b.priceLevel;
                case "price-high": return b.priceLevel - a.priceLevel;
                case "name": return a.name.localeCompare(b.name);
                default: return 0;
            }
        });

    // Pagination
    const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);
    const paginatedRestaurants = filteredRestaurants.slice(
        (currentPage - 1) * restaurantsPerPage,
        currentPage * restaurantsPerPage
    );

    const toggleSaveRestaurant = (restaurantId: number) => {
        if (savedRestaurants.includes(restaurantId)) {
            setSavedRestaurants(savedRestaurants.filter(id => id !== restaurantId));
            toast.success("Restaurant removed from saved");
        } else {
            setSavedRestaurants([...savedRestaurants, restaurantId]);
            toast.success("Restaurant saved to your favorites");
        }
    };

    const handleShare = (restaurant: typeof allRestaurants[0]) => {
        navigator.clipboard.writeText(`Check out ${restaurant.name} on Queska! ${window.location.href}`);
        toast.success("Link copied to clipboard!");
    };

    const handleReservation = (restaurant: typeof allRestaurants[0]) => {
        if (restaurant.reservations) {
            toast.success(`Opening reservation for ${restaurant.name}...`);
        } else {
            toast.info("This restaurant doesn't take reservations. Walk-ins welcome!");
        }
    };

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    const handleDirections = (address: string) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src={interestFood} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Utensils className="w-3 h-3 mr-1" />
                            {allRestaurants.length} Restaurants to Explore
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
                            Discover Amazing
                            <span className="block text-primary">Restaurants</span>
                        </h1>
                        <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            From local Nigerian delicacies to international cuisines, find the perfect dining experience for every occasion.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search restaurants, cuisines, or dishes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-4 py-6 text-lg bg-background/80 backdrop-blur-sm border-secondary-foreground/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-6 border-b sticky top-16 bg-background/95 backdrop-blur-md z-40">
                <div className="container px-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Cuisine Filter */}
                            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Cuisine" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cuisines.map((cuisine) => (
                                        <SelectItem key={cuisine} value={cuisine}>
                                            {cuisine === "all" ? "All Cuisines" : cuisine}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Location Filter */}
                            <Select value={locationFilter} onValueChange={setLocationFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city === "all" ? "All Locations" : city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Price Filter */}
                            <Select value={priceFilter} onValueChange={setPriceFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Price Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priceRanges.map((price) => (
                                        <SelectItem key={price.value} value={price.value}>
                                            {price.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Sort By */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-44">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="reviews">Most Reviewed</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="name">Name: A-Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                                {filteredRestaurants.length} restaurants found
                            </span>
                            <div className="flex">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="rounded-r-none"
                                >
                                    <Grid className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className="rounded-l-none"
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Restaurants Grid/List */}
            <section className="py-12">
                <div className="container px-4">
                    {isLoading ? (
                        <div className={cn(
                            "grid gap-6",
                            viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                        )}>
                            {Array.from({ length: 9 }).map((_, i) => (
                                <RestaurantCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredRestaurants.length === 0 ? (
                        <div className="text-center py-20">
                            <Utensils className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
                            <p className="text-muted-foreground mb-6">
                                Try adjusting your filters or search query
                            </p>
                            <Button onClick={() => {
                                setCuisineFilter("all");
                                setLocationFilter("all");
                                setPriceFilter("all");
                                setSearchQuery("");
                            }}>
                                Clear All Filters
                            </Button>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedRestaurants.map((restaurant) => (
                                <Card
                                    key={restaurant.id}
                                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                    onClick={() => setSelectedRestaurant(restaurant)}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={restaurant.image}
                                            alt={restaurant.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <Badge className="bg-background/90 text-foreground">
                                                {getCuisineIcon(restaurant.cuisine)}
                                                <span className="ml-1">{restaurant.cuisine}</span>
                                            </Badge>
                                        </div>
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="w-8 h-8 bg-background/90 hover:bg-background"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleSaveRestaurant(restaurant.id);
                                                }}
                                            >
                                                <Heart
                                                    className={cn("w-4 h-4", savedRestaurants.includes(restaurant.id) && "fill-red-500 text-red-500")}
                                                />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                            <Badge className={cn(
                                                "text-xs",
                                                restaurant.isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            )}>
                                                {restaurant.isOpen ? "Open Now" : "Closed"}
                                            </Badge>
                                        </div>
                                        <div className="absolute bottom-3 right-3">
                                            <Badge variant="secondary" className="bg-background/90">
                                                {restaurant.priceRange}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                                    {restaurant.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {restaurant.tagline}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                <span className="text-sm font-medium">{restaurant.rating}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                                <span className="line-clamp-1">{restaurant.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 flex-shrink-0" />
                                                <span>{restaurant.openHours}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {restaurant.specialties.slice(0, 3).map((specialty, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">
                                                    {specialty}
                                                </Badge>
                                            ))}
                                            {restaurant.specialties.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{restaurant.specialties.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-4 pt-3 border-t">
                                            <span className="text-xs text-muted-foreground">
                                                {restaurant.reviews.toLocaleString()} reviews
                                            </span>
                                            <div className="flex gap-1">
                                                {restaurant.delivery && (
                                                    <Badge variant="secondary" className="text-xs">Delivery</Badge>
                                                )}
                                                {restaurant.reservations && (
                                                    <Badge variant="secondary" className="text-xs">Reservations</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        // List View
                        <div className="space-y-4">
                            {paginatedRestaurants.map((restaurant) => (
                                <Card
                                    key={restaurant.id}
                                    className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                    onClick={() => setSelectedRestaurant(restaurant)}
                                >
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
                                                <img
                                                    src={restaurant.image}
                                                    alt={restaurant.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <Badge className={cn(
                                                    "absolute top-3 left-3 text-xs",
                                                    restaurant.isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                                )}>
                                                    {restaurant.isOpen ? "Open Now" : "Closed"}
                                                </Badge>
                                            </div>
                                            <div className="flex-1 p-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                                                                {restaurant.name}
                                                            </h3>
                                                            <Badge variant="outline">{restaurant.cuisine}</Badge>
                                                            <Badge variant="secondary">{restaurant.priceRange}</Badge>
                                                        </div>
                                                        <p className="text-muted-foreground">{restaurant.tagline}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-semibold">{restaurant.rating}</span>
                                                        <span className="text-sm text-muted-foreground">({restaurant.reviews.toLocaleString()})</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                    {restaurant.description}
                                                </p>
                                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {restaurant.location}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {restaurant.openHours}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-wrap gap-1">
                                                        {restaurant.specialties.slice(0, 4).map((specialty, idx) => (
                                                            <Badge key={idx} variant="outline" className="text-xs">
                                                                {specialty}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleSaveRestaurant(restaurant.id);
                                                            }}
                                                        >
                                                            <Heart className={cn("w-5 h-5", savedRestaurants.includes(restaurant.id) && "fill-red-500 text-red-500")} />
                                                        </Button>
                                                        <Button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleReservation(restaurant);
                                                            }}
                                                        >
                                                            {restaurant.reservations ? "Reserve Table" : "View Details"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && filteredRestaurants.length > restaurantsPerPage && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Restaurant Detail Modal */}
            <Dialog open={!!selectedRestaurant} onOpenChange={() => setSelectedRestaurant(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    {selectedRestaurant && (
                        <>
                            <DialogHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <DialogTitle className="text-2xl">{selectedRestaurant.name}</DialogTitle>
                                        <p className="text-muted-foreground">{selectedRestaurant.tagline}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-semibold">{selectedRestaurant.rating}</span>
                                    </div>
                                </div>
                            </DialogHeader>

                            {/* Image Gallery */}
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {selectedRestaurant.galleryImages.map((img, idx) => (
                                    <div key={idx} className={cn(
                                        "rounded-lg overflow-hidden",
                                        idx === 0 && "col-span-2 row-span-2"
                                    )}>
                                        <img
                                            src={img}
                                            alt={`${selectedRestaurant.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 mt-6">
                                {/* Quick Info */}
                                <div className="flex flex-wrap gap-3">
                                    <Badge variant="outline" className="text-sm">
                                        {getCuisineIcon(selectedRestaurant.cuisine)}
                                        <span className="ml-1">{selectedRestaurant.cuisine}</span>
                                    </Badge>
                                    <Badge variant="outline" className="text-sm">{selectedRestaurant.priceRange}</Badge>
                                    <Badge variant="outline" className="text-sm">{selectedRestaurant.atmosphere}</Badge>
                                    <Badge className={cn(
                                        "text-sm",
                                        selectedRestaurant.isOpen ? "bg-green-500" : "bg-red-500"
                                    )}>
                                        {selectedRestaurant.isOpen ? "Open Now" : "Closed"}
                                    </Badge>
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground">{selectedRestaurant.description}</p>

                                {/* Contact & Location */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <h3 className="font-semibold">Contact & Hours</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span>{selectedRestaurant.openHours}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-muted-foreground" />
                                                <a href={`tel:${selectedRestaurant.phone}`} className="hover:text-primary">
                                                    {selectedRestaurant.phone}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-muted-foreground" />
                                                <a href={selectedRestaurant.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                                                    Visit Website
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="font-semibold">Location</h3>
                                        <div className="flex items-start gap-2 text-sm">
                                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                                            <span>{selectedRestaurant.address}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Specialties */}
                                <div>
                                    <h3 className="font-semibold mb-3">Specialties</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedRestaurant.specialties.map((specialty, idx) => (
                                            <Badge key={idx} variant="secondary">{specialty}</Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="font-semibold mb-3">Features</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedRestaurant.features.map((feature, idx) => (
                                            <Badge key={idx} variant="outline">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Dietary */}
                                {selectedRestaurant.dietary.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-3">Dietary Options</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedRestaurant.dietary.map((diet, idx) => (
                                                <Badge key={idx} className="bg-green-100 text-green-700">
                                                    <Leaf className="w-3 h-3 mr-1" />
                                                    {diet}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Services */}
                                <div className="flex gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className={cn("w-4 h-4", selectedRestaurant.reservations ? "text-green-500" : "text-muted-foreground")} />
                                        <span className={!selectedRestaurant.reservations ? "text-muted-foreground" : ""}>Reservations</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className={cn("w-4 h-4", selectedRestaurant.delivery ? "text-green-500" : "text-muted-foreground")} />
                                        <span className={!selectedRestaurant.delivery ? "text-muted-foreground" : ""}>Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className={cn("w-4 h-4", selectedRestaurant.takeaway ? "text-green-500" : "text-muted-foreground")} />
                                        <span className={!selectedRestaurant.takeaway ? "text-muted-foreground" : ""}>Takeaway</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 pt-4 border-t">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleCall(selectedRestaurant.phone)}
                                    >
                                        <Phone className="w-4 h-4 mr-2" />
                                        Call
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDirections(selectedRestaurant.address)}
                                    >
                                        <NavigationIcon className="w-4 h-4 mr-2" />
                                        Directions
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleShare(selectedRestaurant)}
                                    >
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => toggleSaveRestaurant(selectedRestaurant.id)}
                                    >
                                        <Heart className={cn("w-4 h-4 mr-2", savedRestaurants.includes(selectedRestaurant.id) && "fill-red-500 text-red-500")} />
                                        {savedRestaurants.includes(selectedRestaurant.id) ? "Saved" : "Save"}
                                    </Button>
                                    {selectedRestaurant.reservations && (
                                        <Button onClick={() => handleReservation(selectedRestaurant)}>
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Reserve Table
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Restaurants;
