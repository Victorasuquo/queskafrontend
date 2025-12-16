import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    MapPin,
    Calendar,
    Users,
    Star,
    Heart,
    Wifi,
    Car,
    Dumbbell,
    Waves,
    Coffee,
    Utensils,
    Wind,
    Tv,
    Shield,
    Building2,
    Home,
    Hotel,
    Castle,
    Tent,
    TreePine,
    ChevronDown,
    Filter,
    SlidersHorizontal,
    X,
    Check,
    Bed,
    Bath,
    Square,
    Phone,
    Mail,
    Globe,
    Sparkles,
} from "lucide-react";
import { useLoadingState } from "@/hooks/useLoading";
import { StaysPageSkeleton } from "@/components/skeletons";

// Sample stays data
const staysData = [
    {
        id: 1,
        name: "Eko Hotel & Suites",
        type: "Hotel",
        location: "Victoria Island, Lagos",
        rating: 4.8,
        reviews: 2340,
        pricePerNight: 85000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        amenities: ["Pool", "WiFi", "Gym", "Restaurant", "Spa", "Parking"],
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        sqft: 450,
        featured: true,
        instantBook: true,
        superhost: true,
        description: "Luxury beachfront hotel with stunning ocean views and world-class amenities.",
    },
    {
        id: 2,
        name: "Transcorp Hilton Abuja",
        type: "Hotel",
        location: "Maitama, Abuja",
        rating: 4.9,
        reviews: 1856,
        pricePerNight: 120000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        amenities: ["Pool", "WiFi", "Gym", "Restaurant", "Spa", "Business Center"],
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        sqft: 520,
        featured: true,
        instantBook: true,
        superhost: true,
        description: "Premier 5-star hotel in the heart of Nigeria's capital city.",
    },
    {
        id: 3,
        name: "Lekki Modern Apartment",
        type: "Apartment",
        location: "Lekki Phase 1, Lagos",
        rating: 4.6,
        reviews: 423,
        pricePerNight: 45000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        amenities: ["WiFi", "Kitchen", "AC", "Parking", "Security"],
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        sqft: 1200,
        featured: false,
        instantBook: true,
        superhost: false,
        description: "Modern fully-furnished apartment with city views and premium amenities.",
    },
    {
        id: 4,
        name: "Oceanview Beach Resort",
        type: "Resort",
        location: "Oniru Beach, Lagos",
        rating: 4.7,
        reviews: 892,
        pricePerNight: 150000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        amenities: ["Beach Access", "Pool", "WiFi", "Restaurant", "Bar", "Spa"],
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        sqft: 800,
        featured: true,
        instantBook: false,
        superhost: true,
        description: "Beachfront resort offering a perfect blend of luxury and relaxation.",
    },
    {
        id: 5,
        name: "Cozy Studio in Ikoyi",
        type: "Studio",
        location: "Ikoyi, Lagos",
        rating: 4.5,
        reviews: 156,
        pricePerNight: 25000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        amenities: ["WiFi", "AC", "Kitchen", "Smart TV"],
        bedrooms: 0,
        bathrooms: 1,
        maxGuests: 2,
        sqft: 350,
        featured: false,
        instantBook: true,
        superhost: false,
        description: "Perfect for solo travelers or couples, located in upscale Ikoyi.",
    },
    {
        id: 6,
        name: "Villa Magnifico",
        type: "Villa",
        location: "Banana Island, Lagos",
        rating: 4.9,
        reviews: 78,
        pricePerNight: 350000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        amenities: ["Private Pool", "WiFi", "Chef", "Security", "Garden", "Gym"],
        bedrooms: 5,
        bathrooms: 6,
        maxGuests: 10,
        sqft: 5500,
        featured: true,
        instantBook: false,
        superhost: true,
        description: "Exclusive luxury villa on Nigeria's most prestigious island.",
    },
    {
        id: 7,
        name: "Mountain View Lodge",
        type: "Lodge",
        location: "Obudu Mountain Resort, Cross River",
        rating: 4.4,
        reviews: 234,
        pricePerNight: 55000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800",
        amenities: ["Mountain View", "WiFi", "Restaurant", "Hiking Trails"],
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        sqft: 650,
        featured: false,
        instantBook: true,
        superhost: false,
        description: "Scenic mountain retreat with breathtaking views and nature trails.",
    },
    {
        id: 8,
        name: "Heritage Guest House",
        type: "Guest House",
        location: "Calabar, Cross River",
        rating: 4.3,
        reviews: 312,
        pricePerNight: 20000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        amenities: ["WiFi", "Breakfast", "AC", "Parking"],
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        sqft: 300,
        featured: false,
        instantBook: true,
        superhost: false,
        description: "Charming guest house with authentic Nigerian hospitality.",
    },
    {
        id: 9,
        name: "Radisson Blu Anchorage",
        type: "Hotel",
        location: "Victoria Island, Lagos",
        rating: 4.7,
        reviews: 1543,
        pricePerNight: 95000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        amenities: ["Pool", "WiFi", "Gym", "Restaurant", "Bar", "Meeting Rooms"],
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        sqft: 480,
        featured: true,
        instantBook: true,
        superhost: true,
        description: "International luxury hotel with Lagos Lagoon views.",
    },
    {
        id: 10,
        name: "Penthouse Suite Ikeja",
        type: "Apartment",
        location: "GRA Ikeja, Lagos",
        rating: 4.6,
        reviews: 287,
        pricePerNight: 75000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        amenities: ["Rooftop Terrace", "WiFi", "Kitchen", "Gym", "Parking"],
        bedrooms: 3,
        bathrooms: 3,
        maxGuests: 6,
        sqft: 2200,
        featured: false,
        instantBook: true,
        superhost: true,
        description: "Stunning penthouse with panoramic city views and modern luxury.",
    },
    {
        id: 11,
        name: "Beachfront Cabana",
        type: "Cabin",
        location: "Tarkwa Bay, Lagos",
        rating: 4.2,
        reviews: 89,
        pricePerNight: 35000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
        amenities: ["Beach Access", "WiFi", "BBQ", "Outdoor Shower"],
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        sqft: 400,
        featured: false,
        instantBook: false,
        superhost: false,
        description: "Rustic beach cabin perfect for a romantic getaway.",
    },
    {
        id: 12,
        name: "Presidential Suite - Four Points",
        type: "Hotel",
        location: "Oniru, Lagos",
        rating: 4.8,
        reviews: 1120,
        pricePerNight: 180000,
        currency: "₦",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        amenities: ["Pool", "WiFi", "Gym", "Spa", "Restaurant", "Concierge"],
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        sqft: 1100,
        featured: true,
        instantBook: true,
        superhost: true,
        description: "Ultimate luxury presidential suite with butler service.",
    },
];

const propertyTypes = [
    { id: "hotel", label: "Hotel", icon: Hotel },
    { id: "apartment", label: "Apartment", icon: Building2 },
    { id: "villa", label: "Villa", icon: Castle },
    { id: "resort", label: "Resort", icon: Waves },
    { id: "guest-house", label: "Guest House", icon: Home },
    { id: "cabin", label: "Cabin", icon: Tent },
    { id: "studio", label: "Studio", icon: Bed },
    { id: "lodge", label: "Lodge", icon: TreePine },
];

const amenitiesList = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "pool", label: "Pool", icon: Waves },
    { id: "parking", label: "Parking", icon: Car },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "restaurant", label: "Restaurant", icon: Utensils },
    { id: "ac", label: "Air Conditioning", icon: Wind },
    { id: "kitchen", label: "Kitchen", icon: Coffee },
    { id: "tv", label: "TV", icon: Tv },
];

const popularDestinations = [
    { name: "Lagos", image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=400", stays: 1240 },
    { name: "Abuja", image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=400", stays: 856 },
    { name: "Port Harcourt", image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=400", stays: 432 },
    { name: "Calabar", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400", stays: 287 },
    { name: "Ibadan", image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=400", stays: 198 },
    { name: "Enugu", image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=400", stays: 156 },
];

const Stays = () => {
    const { isLoading } = useLoadingState(1500);
    const [searchLocation, setSearchLocation] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [guests, setGuests] = useState("2");
    const [rooms, setRooms] = useState("1");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [minRating, setMinRating] = useState<number | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("recommended");
    const [selectedStay, setSelectedStay] = useState<typeof staysData[0] | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleType = (typeId: string) => {
        setSelectedTypes(prev =>
            prev.includes(typeId)
                ? prev.filter(t => t !== typeId)
                : [...prev, typeId]
        );
    };

    const toggleAmenity = (amenityId: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenityId)
                ? prev.filter(a => a !== amenityId)
                : [...prev, amenityId]
        );
    };

    const toggleFavorite = (stayId: number) => {
        setFavorites(prev =>
            prev.includes(stayId)
                ? prev.filter(id => id !== stayId)
                : [...prev, stayId]
        );
    };

    const clearFilters = () => {
        setSelectedTypes([]);
        setSelectedAmenities([]);
        setPriceRange([0, 500000]);
        setMinRating(null);
    };

    const filteredStays = staysData.filter(stay => {
        if (searchLocation && !stay.location.toLowerCase().includes(searchLocation.toLowerCase())) {
            return false;
        }
        if (selectedTypes.length > 0 && !selectedTypes.some(t => stay.type.toLowerCase().includes(t))) {
            return false;
        }
        if (stay.pricePerNight < priceRange[0] || stay.pricePerNight > priceRange[1]) {
            return false;
        }
        if (minRating && stay.rating < minRating) {
            return false;
        }
        if (selectedAmenities.length > 0) {
            const stayAmenities = stay.amenities.map(a => a.toLowerCase());
            if (!selectedAmenities.some(a => stayAmenities.some(sa => sa.includes(a)))) {
                return false;
            }
        }
        return true;
    });

    const sortedStays = [...filteredStays].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.pricePerNight - b.pricePerNight;
            case "price-high":
                return b.pricePerNight - a.pricePerNight;
            case "rating":
                return b.rating - a.rating;
            case "reviews":
                return b.reviews - a.reviews;
            default:
                return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG').format(price);
    };

    const getAmenityIcon = (amenity: string) => {
        const iconMap: { [key: string]: any } = {
            wifi: Wifi,
            pool: Waves,
            gym: Dumbbell,
            parking: Car,
            restaurant: Utensils,
            spa: Sparkles,
            kitchen: Coffee,
            ac: Wind,
            tv: Tv,
            security: Shield,
            "beach access": Waves,
            "smart tv": Tv,
            bar: Coffee,
            "business center": Building2,
            "meeting rooms": Building2,
            garden: TreePine,
            chef: Utensils,
            "private pool": Waves,
            "mountain view": TreePine,
            "hiking trails": TreePine,
            breakfast: Coffee,
            bbq: Utensils,
            "outdoor shower": Waves,
            "rooftop terrace": Building2,
            concierge: Shield,
        };
        const Icon = iconMap[amenity.toLowerCase()] || Check;
        return Icon;
    };

    if (isLoading) {
        return <StaysPageSkeleton />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Search Section */}
            <section className="relative pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Find Your Perfect Stay
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover amazing accommodations from luxury hotels to cozy apartments across Nigeria
                        </p>
                    </div>

                    {/* Search Form */}
                    <Card className="max-w-5xl mx-auto shadow-xl border-0 bg-card/95 backdrop-blur">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {/* Location */}
                                <div className="lg:col-span-1">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Where are you going?"
                                            value={searchLocation}
                                            onChange={(e) => setSearchLocation(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Check-in */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Check-in
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="date"
                                            value={checkInDate}
                                            onChange={(e) => setCheckInDate(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Check-out */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Check-out
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="date"
                                            value={checkOutDate}
                                            onChange={(e) => setCheckOutDate(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Guests & Rooms */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Guests & Rooms
                                    </label>
                                    <div className="flex gap-2">
                                        <Select value={guests} onValueChange={setGuests}>
                                            <SelectTrigger className="flex-1">
                                                <Users className="w-4 h-4 mr-2" />
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        {num} Guest{num > 1 ? 's' : ''}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={rooms} onValueChange={setRooms}>
                                            <SelectTrigger className="w-24">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        {num} Room{num > 1 ? 's' : ''}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="flex items-end">
                                    <Button className="w-full h-10 bg-primary hover:bg-primary/90">
                                        <Search className="w-4 h-4 mr-2" />
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Property Types */}
            <section className="py-8 border-b bg-card/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
                        {propertyTypes.map((type) => {
                            const Icon = type.icon;
                            const isSelected = selectedTypes.includes(type.id);
                            return (
                                <button
                                    key={type.id}
                                    onClick={() => toggleType(type.id)}
                                    className={`flex flex-col items-center gap-2 min-w-[80px] py-3 px-4 rounded-xl transition-all ${isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <Icon className="w-6 h-6" />
                                    <span className="text-xs font-medium whitespace-nowrap">{type.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className={`lg:w-72 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                            <Card className="sticky top-24">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                                            <SlidersHorizontal className="w-4 h-4" />
                                            Filters
                                        </h3>
                                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                                            Clear all
                                        </Button>
                                    </div>

                                    {/* Price Range */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-foreground mb-4">Price per night</h4>
                                        <Slider
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                            min={0}
                                            max={500000}
                                            step={5000}
                                            className="mb-3"
                                        />
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>₦{formatPrice(priceRange[0])}</span>
                                            <span>₦{formatPrice(priceRange[1])}</span>
                                        </div>
                                    </div>

                                    {/* Rating Filter */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-foreground mb-3">Guest Rating</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[3, 3.5, 4, 4.5].map((rating) => (
                                                <Button
                                                    key={rating}
                                                    variant={minRating === rating ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setMinRating(minRating === rating ? null : rating)}
                                                    className="text-xs"
                                                >
                                                    <Star className="w-3 h-3 mr-1 fill-current" />
                                                    {rating}+
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Amenities */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-foreground mb-3">Amenities</h4>
                                        <div className="space-y-2">
                                            {amenitiesList.map((amenity) => {
                                                const Icon = amenity.icon;
                                                return (
                                                    <div key={amenity.id} className="flex items-center gap-3">
                                                        <Checkbox
                                                            id={amenity.id}
                                                            checked={selectedAmenities.includes(amenity.id)}
                                                            onCheckedChange={() => toggleAmenity(amenity.id)}
                                                        />
                                                        <label
                                                            htmlFor={amenity.id}
                                                            className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                                                        >
                                                            <Icon className="w-4 h-4" />
                                                            {amenity.label}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Booking Options */}
                                    <div>
                                        <h4 className="text-sm font-medium text-foreground mb-3">Booking Options</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Checkbox id="instant-book" />
                                                <label htmlFor="instant-book" className="text-sm text-muted-foreground cursor-pointer">
                                                    Instant Book
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Checkbox id="free-cancel" />
                                                <label htmlFor="free-cancel" className="text-sm text-muted-foreground cursor-pointer">
                                                    Free Cancellation
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Checkbox id="superhost" />
                                                <label htmlFor="superhost" className="text-sm text-muted-foreground cursor-pointer">
                                                    Superhost
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Results */}
                        <div className="flex-1">
                            {/* Results Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">
                                        {sortedStays.length} stays found
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {searchLocation || "All locations"} • {guests} guest{parseInt(guests) > 1 ? 's' : ''} • {rooms} room{parseInt(rooms) > 1 ? 's' : ''}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="lg:hidden"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filters
                                    </Button>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-44">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="recommended">Recommended</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                            <SelectItem value="rating">Highest Rated</SelectItem>
                                            <SelectItem value="reviews">Most Reviews</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Stay Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {sortedStays.map((stay) => (
                                    <Card
                                        key={stay.id}
                                        className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md"
                                        onClick={() => setSelectedStay(stay)}
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={stay.image}
                                                alt={stay.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            {/* Favorite Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(stay.id);
                                                }}
                                                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform"
                                            >
                                                <Heart
                                                    className={`w-5 h-5 ${favorites.includes(stay.id)
                                                        ? "fill-red-500 text-red-500"
                                                        : "text-gray-600 dark:text-gray-300"
                                                        }`}
                                                />
                                            </button>
                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                {stay.featured && (
                                                    <Badge className="bg-primary text-primary-foreground">
                                                        Featured
                                                    </Badge>
                                                )}
                                                {stay.superhost && (
                                                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                                                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                        Superhost
                                                    </Badge>
                                                )}
                                            </div>
                                            {/* Type Badge */}
                                            <Badge className="absolute bottom-3 left-3 bg-black/60 text-white">
                                                {stay.type}
                                            </Badge>
                                        </div>

                                        <CardContent className="p-4">
                                            {/* Location */}
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                                <MapPin className="w-3 h-3" />
                                                {stay.location}
                                            </div>

                                            {/* Name */}
                                            <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                                                {stay.name}
                                            </h3>

                                            {/* Details */}
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Bed className="w-4 h-4" />
                                                    {stay.bedrooms === 0 ? "Studio" : `${stay.bedrooms} bed`}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Bath className="w-4 h-4" />
                                                    {stay.bathrooms} bath
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {stay.maxGuests}
                                                </span>
                                            </div>

                                            {/* Amenities Preview */}
                                            <div className="flex items-center gap-2 mb-3">
                                                {stay.amenities.slice(0, 4).map((amenity, index) => {
                                                    const Icon = getAmenityIcon(amenity);
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
                                                            title={amenity}
                                                        >
                                                            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                                                        </div>
                                                    );
                                                })}
                                                {stay.amenities.length > 4 && (
                                                    <span className="text-xs text-muted-foreground">
                                                        +{stay.amenities.length - 4}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Rating & Price */}
                                            <div className="flex items-center justify-between pt-3 border-t">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-medium text-foreground">{stay.rating}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        ({stay.reviews.toLocaleString()})
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-foreground">
                                                        {stay.currency}{formatPrice(stay.pricePerNight)}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground"> /night</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {sortedStays.length === 0 && (
                                <div className="text-center py-16">
                                    <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">No stays found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Try adjusting your filters or search criteria
                                    </p>
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear all filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Popular Destinations</h2>
                    <p className="text-muted-foreground mb-8">Explore top places to stay in Nigeria</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {popularDestinations.map((destination) => (
                            <Card
                                key={destination.name}
                                className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => setSearchLocation(destination.name)}
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-3 left-3 text-white">
                                        <h3 className="font-semibold">{destination.name}</h3>
                                        <p className="text-sm text-white/80">{destination.stays} stays</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stay Detail Modal */}
            <Dialog open={!!selectedStay} onOpenChange={() => setSelectedStay(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                    {selectedStay && (
                        <div className="p-6">
                            <DialogHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Badge className="mb-2">{selectedStay.type}</Badge>
                                        <DialogTitle className="text-2xl">{selectedStay.name}</DialogTitle>
                                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                                            <MapPin className="w-4 h-4" />
                                            {selectedStay.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-lg">{selectedStay.rating}</span>
                                            <span className="text-muted-foreground">
                                                ({selectedStay.reviews.toLocaleString()} reviews)
                                            </span>
                                        </div>
                                        {selectedStay.superhost && (
                                            <Badge variant="secondary">
                                                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                Superhost
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </DialogHeader>

                            {/* Image */}
                            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-4">
                                <img
                                    src={selectedStay.image}
                                    alt={selectedStay.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Quick Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Bed className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                                        <p className="font-semibold">
                                            {selectedStay.bedrooms === 0 ? "Studio" : selectedStay.bedrooms}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Bath className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                                        <p className="font-semibold">{selectedStay.bathrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Users className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Max Guests</p>
                                        <p className="font-semibold">{selectedStay.maxGuests}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Square className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Size</p>
                                        <p className="font-semibold">{selectedStay.sqft} sq ft</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-foreground mb-2">About this place</h3>
                                <p className="text-muted-foreground">{selectedStay.description}</p>
                            </div>

                            {/* Amenities */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-foreground mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {selectedStay.amenities.map((amenity, index) => {
                                        const Icon = getAmenityIcon(amenity);
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                                            >
                                                <Icon className="w-4 h-4 text-primary" />
                                                <span className="text-sm">{amenity}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Booking Section */}
                            <Card className="border-2 border-primary/20">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-foreground">
                                                    {selectedStay.currency}{formatPrice(selectedStay.pricePerNight)}
                                                </span>
                                                <span className="text-muted-foreground">per night</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                {selectedStay.instantBook && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        <Check className="w-3 h-3 mr-1" />
                                                        Instant Book
                                                    </Badge>
                                                )}
                                                <span className="text-sm text-muted-foreground">
                                                    Free cancellation available
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                            <Button
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(selectedStay.id);
                                                }}
                                            >
                                                <Heart
                                                    className={`w-4 h-4 mr-2 ${favorites.includes(selectedStay.id)
                                                        ? "fill-red-500 text-red-500"
                                                        : ""
                                                        }`}
                                                />
                                                Save
                                            </Button>
                                            <Button className="bg-primary hover:bg-primary/90">
                                                Reserve Now
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Date Selection */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Check-in
                                            </label>
                                            <Input type="date" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Check-out
                                            </label>
                                            <Input type="date" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Guests
                                            </label>
                                            <Select defaultValue="2">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Array.from({ length: selectedStay.maxGuests }, (_, i) => i + 1).map(num => (
                                                        <SelectItem key={num} value={num.toString()}>
                                                            {num} Guest{num > 1 ? 's' : ''}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact */}
                            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t">
                                <Button variant="ghost" size="sm">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Contact Host
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Globe className="w-4 h-4 mr-2" />
                                    View on Map
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Stays;
