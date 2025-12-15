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
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    MapPin,
    Search,
    Filter,
    Grid,
    List,
    Heart,
    Share2,
    Star,
    ArrowRight,
    X,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Sun,
    Umbrella,
    Mountain,
    Waves,
    TreePine,
    Building,
    Camera,
    Utensils,
    Clock,
    DollarSign,
    Plane,
    Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Import images
import ibenoBeach from "@/assets/destination-ibeno-beach.jpg";
import mangrove from "@/assets/destination-mangrove.jpg";
import museum from "@/assets/destination-museum.jpg";
import destinationPlanning from "@/assets/destination-planning.jpg";
import heroBeach from "@/assets/hero-beach.jpg";
import heroAdventure from "@/assets/hero-adventure.jpg";
import heroFestival from "@/assets/hero-festival.jpg";
import heroProfessional from "@/assets/hero-professional.jpg";
import communityExperience from "@/assets/community-experience.jpg";

const Destinations = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [regionFilter, setRegionFilter] = useState("all");
    const [budgetFilter, setBudgetFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedDestination, setSelectedDestination] = useState<typeof allDestinations[0] | null>(null);
    const [savedDestinations, setSavedDestinations] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const destinationsPerPage = 8;

    const allDestinations = [
        {
            id: 1,
            name: "Ibeno Beach",
            tagline: "Nigeria's Longest Natural Sand Beach",
            description: "Stretching over 30 kilometers, Ibeno Beach is a pristine paradise offering golden sands, warm Atlantic waters, and breathtaking sunsets. Perfect for swimming, beach sports, and relaxation away from city life.",
            location: "Ibeno, Akwa Ibom",
            region: "South South",
            country: "Nigeria",
            image: ibenoBeach,
            galleryImages: [ibenoBeach, heroBeach, communityExperience],
            category: "Beach",
            rating: 4.8,
            reviews: 2456,
            priceRange: "₦15,000 - ₦150,000",
            budget: "mid",
            bestTime: "November - March",
            climate: "Tropical",
            highlights: ["Swimming", "Beach Sports", "Sunset Views", "Fresh Seafood", "Boat Rides"],
            attractions: [
                { name: "Ibeno Beach Resort", type: "Resort" },
                { name: "QIT Industrial Complex", type: "Landmark" },
                { name: "Local Fish Markets", type: "Market" }
            ],
            travelTips: "Best visited during dry season. Bring sunscreen and beach gear. Local seafood is a must-try.",
            gettingThere: "45 minutes drive from Uyo. Regular buses available from Uyo Motor Park."
        },
        {
            id: 2,
            name: "Obudu Mountain Resort",
            tagline: "Africa's Premier Mountain Destination",
            description: "Perched 1,716 meters above sea level, Obudu offers a unique temperate climate in tropical Nigeria. Experience cable car rides, hiking trails, and world-class hospitality in the clouds.",
            location: "Obudu, Cross River",
            region: "South South",
            country: "Nigeria",
            image: heroAdventure,
            galleryImages: [heroAdventure, destinationPlanning, mangrove],
            category: "Mountain",
            rating: 4.9,
            reviews: 3890,
            priceRange: "₦75,000 - ₦500,000",
            budget: "luxury",
            bestTime: "October - March",
            climate: "Temperate",
            highlights: ["Cable Car", "Hiking", "Golf Course", "Spa & Wellness", "Bird Watching"],
            attractions: [
                { name: "Obudu Cable Car", type: "Activity" },
                { name: "Grotto", type: "Natural Wonder" },
                { name: "Water Park", type: "Recreation" }
            ],
            travelTips: "Pack warm clothing - temperatures can drop to 10°C. Book accommodation in advance during holidays.",
            gettingThere: "6 hours drive from Calabar. Charter flights available to Obudu Airstrip."
        },
        {
            id: 3,
            name: "Calabar",
            tagline: "Nigeria's Tourism Paradise",
            description: "Known as the cleanest city in Nigeria, Calabar blends colonial heritage with modern attractions. Home to the famous Calabar Carnival, museums, and the enchanting Tinapa Resort.",
            location: "Calabar, Cross River",
            region: "South South",
            country: "Nigeria",
            image: heroFestival,
            galleryImages: [heroFestival, museum, heroProfessional],
            category: "City",
            rating: 4.7,
            reviews: 5670,
            priceRange: "₦25,000 - ₦300,000",
            budget: "mid",
            bestTime: "Year-round (December for Carnival)",
            climate: "Tropical",
            highlights: ["Calabar Carnival", "Tinapa Resort", "Slave History Museum", "Marina Resort", "Drill Ranch"],
            attractions: [
                { name: "Tinapa Business Resort", type: "Resort" },
                { name: "Calabar Museum", type: "Museum" },
                { name: "Drill Rehabilitation Center", type: "Wildlife" }
            ],
            travelTips: "December is peak season for Calabar Carnival. Book hotels months in advance.",
            gettingThere: "Direct flights from Lagos and Abuja to Margaret Ekpo International Airport."
        },
        {
            id: 4,
            name: "Yankari National Park",
            tagline: "Nigeria's Premier Safari Destination",
            description: "Home to elephants, lions, and over 350 bird species, Yankari offers authentic African safari experiences. The Wikki Warm Springs provide natural swimming in crystal-clear waters.",
            location: "Bauchi, Nigeria",
            region: "North East",
            country: "Nigeria",
            image: mangrove,
            galleryImages: [mangrove, heroAdventure, destinationPlanning],
            category: "Wildlife",
            rating: 4.6,
            reviews: 2100,
            priceRange: "₦30,000 - ₦200,000",
            budget: "mid",
            bestTime: "November - May",
            climate: "Savanna",
            highlights: ["Safari Tours", "Wikki Warm Springs", "Bird Watching", "Camping", "Photography"],
            attractions: [
                { name: "Wikki Warm Springs", type: "Natural Wonder" },
                { name: "Marshall Caves", type: "Historical" },
                { name: "Safari Drives", type: "Activity" }
            ],
            travelTips: "Early morning safaris offer best wildlife sightings. Bring binoculars and cameras.",
            gettingThere: "2 hours drive from Bauchi city. 4WD vehicles recommended during rainy season."
        },
        {
            id: 5,
            name: "Lagos",
            tagline: "Africa's City of Aquatic Splendor",
            description: "Nigeria's vibrant economic hub offers endless entertainment, beaches, nightlife, and cultural experiences. From Lekki to Victoria Island, discover Africa's most dynamic city.",
            location: "Lagos, Nigeria",
            region: "South West",
            country: "Nigeria",
            image: heroProfessional,
            galleryImages: [heroProfessional, heroBeach, heroFestival],
            category: "City",
            rating: 4.5,
            reviews: 12500,
            priceRange: "₦20,000 - ₦1,000,000",
            budget: "varies",
            bestTime: "November - March",
            climate: "Tropical",
            highlights: ["Beaches", "Nightlife", "Shopping", "Art Galleries", "Fine Dining"],
            attractions: [
                { name: "Lekki Conservation Centre", type: "Nature" },
                { name: "Nike Art Gallery", type: "Art" },
                { name: "Elegushi Beach", type: "Beach" }
            ],
            travelTips: "Traffic can be intense - plan travel times accordingly. Use ride-hailing apps.",
            gettingThere: "Murtala Muhammed International Airport serves international and domestic flights."
        },
        {
            id: 6,
            name: "Olumo Rock",
            tagline: "Abeokuta's Ancient Fortress",
            description: "This historic granite rock served as a fortress during inter-tribal wars. Climb to the top for panoramic views of Abeokuta and explore caves with ancient inscriptions.",
            location: "Abeokuta, Ogun",
            region: "South West",
            country: "Nigeria",
            image: museum,
            galleryImages: [museum, destinationPlanning, heroAdventure],
            category: "Heritage",
            rating: 4.4,
            reviews: 1890,
            priceRange: "₦5,000 - ₦50,000",
            budget: "budget",
            bestTime: "October - March",
            climate: "Tropical",
            highlights: ["Rock Climbing", "Historical Caves", "Panoramic Views", "Cultural Tours", "Adire Market"],
            attractions: [
                { name: "Olumo Rock Caves", type: "Historical" },
                { name: "Adire Market", type: "Market" },
                { name: "Centenary Hall", type: "Landmark" }
            ],
            travelTips: "Wear comfortable shoes for climbing. Visit early morning to avoid heat.",
            gettingThere: "1.5 hours drive from Lagos. Regular buses from Ojota Motor Park."
        },
        {
            id: 7,
            name: "Osun-Osogbo Sacred Grove",
            tagline: "UNESCO World Heritage Site",
            description: "A sacred forest along the Osun River, featuring shrines, sculptures, and sanctuaries honoring Yoruba gods. Home to the annual Osun-Osogbo Festival attracting thousands globally.",
            location: "Osogbo, Osun",
            region: "South West",
            country: "Nigeria",
            image: mangrove,
            galleryImages: [mangrove, museum, heroFestival],
            category: "Heritage",
            rating: 4.7,
            reviews: 2340,
            priceRange: "₦3,000 - ₦30,000",
            budget: "budget",
            bestTime: "August (for Osun Festival)",
            climate: "Tropical",
            highlights: ["Sacred Shrines", "Art Sculptures", "Forest Walks", "Cultural Festival", "River Views"],
            attractions: [
                { name: "Osun Shrine", type: "Religious" },
                { name: "Susanne Wenger Sculptures", type: "Art" },
                { name: "Sacred Forest Trail", type: "Nature" }
            ],
            travelTips: "August festival is spectacular but crowded. Off-season visits offer peaceful exploration.",
            gettingThere: "4 hours drive from Lagos. Buses available from Lagos and Ibadan."
        },
        {
            id: 8,
            name: "Badagry",
            tagline: "Gateway to African History",
            description: "A coastal town with profound historical significance as a major slave trade port. Visit the Point of No Return, slave museums, and the first storey building in Nigeria.",
            location: "Badagry, Lagos",
            region: "South West",
            country: "Nigeria",
            image: communityExperience,
            galleryImages: [communityExperience, museum, heroBeach],
            category: "Heritage",
            rating: 4.5,
            reviews: 3200,
            priceRange: "₦10,000 - ₦80,000",
            budget: "budget",
            bestTime: "November - March",
            climate: "Tropical",
            highlights: ["Slave History", "Beach Resort", "Colonial Buildings", "Coconut Beach", "Heritage Museum"],
            attractions: [
                { name: "Point of No Return", type: "Historical" },
                { name: "First Storey Building", type: "Historical" },
                { name: "Whispering Palms Resort", type: "Resort" }
            ],
            travelTips: "Combine history tours with beach time at Whispering Palms or Suntan Beach.",
            gettingThere: "1.5 hours from Lagos Island. Can be accessed by road or boat."
        },
        {
            id: 9,
            name: "Ogbunike Caves",
            tagline: "Sacred Underground Wonder",
            description: "A network of caves with spiritual significance to the Igbo people. Descend 317 steps to explore underground streams, bat colonies, and ancient shrines.",
            location: "Ogbunike, Anambra",
            region: "South East",
            country: "Nigeria",
            image: heroAdventure,
            galleryImages: [heroAdventure, mangrove, museum],
            category: "Nature",
            rating: 4.3,
            reviews: 1560,
            priceRange: "₦5,000 - ₦40,000",
            budget: "budget",
            bestTime: "November - February",
            climate: "Tropical",
            highlights: ["Cave Exploration", "Underground Streams", "Spiritual Sites", "Forest Trail", "Photography"],
            attractions: [
                { name: "Main Cave Chamber", type: "Natural Wonder" },
                { name: "Underground Stream", type: "Natural Wonder" },
                { name: "Forest Trail", type: "Nature" }
            ],
            travelTips: "Wear sturdy shoes and bring a flashlight. Not recommended for those with mobility issues.",
            gettingThere: "30 minutes from Onitsha. Local guides are mandatory and available on-site."
        },
        {
            id: 10,
            name: "Zuma Rock",
            tagline: "Gateway to Abuja",
            description: "A massive 725-meter monolith on the outskirts of Abuja, known for its distinctive 'face' and cultural significance. A symbol of Nigerian unity on the 100 Naira note.",
            location: "Niger State",
            region: "North Central",
            country: "Nigeria",
            image: destinationPlanning,
            galleryImages: [destinationPlanning, heroAdventure, museum],
            category: "Nature",
            rating: 4.2,
            reviews: 1890,
            priceRange: "₦5,000 - ₦25,000",
            budget: "budget",
            bestTime: "October - March",
            climate: "Tropical",
            highlights: ["Rock Formation", "Photography", "Scenic Views", "Cultural Significance", "Hiking"],
            attractions: [
                { name: "Zuma Rock", type: "Landmark" },
                { name: "Viewing Points", type: "Scenic" },
                { name: "Local Markets", type: "Market" }
            ],
            travelTips: "Best viewed from the Abuja-Kaduna expressway. Climbing is not permitted.",
            gettingThere: "45 minutes from Abuja city center along the Abuja-Kaduna expressway."
        },
        {
            id: 11,
            name: "Idanre Hills",
            tagline: "Ondo's Majestic Highlands",
            description: "A UNESCO World Heritage tentative site featuring ancient settlements, mysterious footprints, and breathtaking landscapes. Climb 660 steps to discover Yoruba history.",
            location: "Idanre, Ondo",
            region: "South West",
            country: "Nigeria",
            image: heroAdventure,
            galleryImages: [heroAdventure, museum, mangrove],
            category: "Mountain",
            rating: 4.6,
            reviews: 1450,
            priceRange: "₦8,000 - ₦60,000",
            budget: "budget",
            bestTime: "November - February",
            climate: "Tropical",
            highlights: ["Hill Climbing", "Ancient Palace", "Mysterious Footprints", "Panoramic Views", "Cultural History"],
            attractions: [
                { name: "Owa's Palace", type: "Historical" },
                { name: "Agbogun Footprint", type: "Mystery" },
                { name: "Old Court", type: "Historical" }
            ],
            travelTips: "Start climb early to avoid midday heat. Bring water and snacks.",
            gettingThere: "20 minutes from Akure. Accessible by road from Lagos (4 hours)."
        },
        {
            id: 12,
            name: "Mambilla Plateau",
            tagline: "Nigeria's Roof Top",
            description: "At 1,800 meters, this is Nigeria's highest plateau offering temperate climate, tea plantations, and stunning landscapes reminiscent of the Scottish Highlands.",
            location: "Taraba State",
            region: "North East",
            country: "Nigeria",
            image: mangrove,
            galleryImages: [mangrove, heroAdventure, destinationPlanning],
            category: "Mountain",
            rating: 4.7,
            reviews: 890,
            priceRange: "₦50,000 - ₦250,000",
            budget: "mid",
            bestTime: "October - March",
            climate: "Temperate",
            highlights: ["Tea Plantations", "Cool Climate", "Hiking", "Cattle Ranches", "Waterfalls"],
            attractions: [
                { name: "Ngel Nyaki Forest", type: "Nature" },
                { name: "Tea Plantations", type: "Agriculture" },
                { name: "Local Ranches", type: "Agriculture" }
            ],
            travelTips: "Remote location - plan logistics carefully. 4WD vehicle essential.",
            gettingThere: "Fly to Jalingo, then 6-hour drive. Roads can be challenging in rainy season."
        }
    ];

    const categories = ["all", "Beach", "Mountain", "City", "Wildlife", "Heritage", "Nature"];
    const regions = ["all", "South South", "South West", "South East", "North Central", "North East"];
    const budgetOptions = ["all", "budget", "mid", "luxury"];

    // Filter destinations
    const filteredDestinations = allDestinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || dest.category === categoryFilter;
        const matchesRegion = regionFilter === "all" || dest.region === regionFilter;
        const matchesBudget = budgetFilter === "all" || dest.budget === budgetFilter;
        return matchesSearch && matchesCategory && matchesRegion && matchesBudget;
    });

    // Pagination
    const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage);
    const paginatedDestinations = filteredDestinations.slice(
        (currentPage - 1) * destinationsPerPage,
        currentPage * destinationsPerPage
    );

    const toggleSaveDestination = (destId: number) => {
        if (savedDestinations.includes(destId)) {
            setSavedDestinations(savedDestinations.filter(id => id !== destId));
            toast.success("Destination removed from saved");
        } else {
            setSavedDestinations([...savedDestinations, destId]);
            toast.success("Destination saved to your wishlist");
        }
    };

    const handleShare = (dest: typeof allDestinations[0]) => {
        navigator.clipboard.writeText(`Check out ${dest.name} on Queska! ${window.location.href}`);
        toast.success("Link copied to clipboard!");
    };

    const handlePlanTrip = (dest: typeof allDestinations[0]) => {
        toast.success(`Starting trip planning for ${dest.name}...`);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Beach": return Waves;
            case "Mountain": return Mountain;
            case "City": return Building;
            case "Wildlife": return TreePine;
            case "Heritage": return Camera;
            case "Nature": return TreePine;
            default: return MapPin;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src={destinationPlanning} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <MapPin className="w-3 h-3 mr-1" />
                            {allDestinations.length} Destinations to Explore
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
                            Discover Incredible
                            <span className="block text-primary">Destinations</span>
                        </h1>
                        <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            From pristine beaches to ancient heritage sites, explore the best destinations across Nigeria and beyond.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search destinations by name, location, or type..."
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
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-3 items-center">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Filters:</span>
                            </div>

                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat === "all" ? "All Types" : cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={regionFilter} onValueChange={setRegionFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    {regions.map(reg => (
                                        <SelectItem key={reg} value={reg}>
                                            {reg === "all" ? "All Regions" : reg}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Budget" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Budgets</SelectItem>
                                    <SelectItem value="budget">Budget-Friendly</SelectItem>
                                    <SelectItem value="mid">Mid-Range</SelectItem>
                                    <SelectItem value="luxury">Luxury</SelectItem>
                                </SelectContent>
                            </Select>

                            {(categoryFilter !== "all" || regionFilter !== "all" || budgetFilter !== "all" || searchQuery) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setCategoryFilter("all");
                                        setRegionFilter("all");
                                        setBudgetFilter("all");
                                        setSearchQuery("");
                                    }}
                                    className="text-muted-foreground"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Clear
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                {filteredDestinations.length} destinations found
                            </span>
                            <div className="flex items-center border rounded-lg">
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

            {/* Destinations Grid/List */}
            <section className="py-12">
                <div className="container px-4">
                    {filteredDestinations.length === 0 ? (
                        <div className="text-center py-20">
                            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                            <p className="text-muted-foreground mb-6">
                                Try adjusting your filters or search query
                            </p>
                            <Button onClick={() => {
                                setCategoryFilter("all");
                                setRegionFilter("all");
                                setBudgetFilter("all");
                                setSearchQuery("");
                            }}>
                                Clear All Filters
                            </Button>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {paginatedDestinations.map((dest) => {
                                const CategoryIcon = getCategoryIcon(dest.category);
                                return (
                                    <Card
                                        key={dest.id}
                                        className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                        onClick={() => setSelectedDestination(dest)}
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <Badge className="bg-background/90 text-foreground">
                                                    <CategoryIcon className="w-3 h-3 mr-1" />
                                                    {dest.category}
                                                </Badge>
                                            </div>
                                            <div className="absolute top-3 right-3 flex gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="w-8 h-8 bg-background/90 hover:bg-background"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleSaveDestination(dest.id);
                                                    }}
                                                >
                                                    <Heart
                                                        className={`w-4 h-4 ${savedDestinations.includes(dest.id) ? "fill-red-500 text-red-500" : ""}`}
                                                    />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-medium">{dest.rating}</span>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                                {dest.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                                                {dest.tagline}
                                            </p>
                                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="line-clamp-1">{dest.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Sun className="w-4 h-4" />
                                                    <span>Best: {dest.bestTime}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-primary text-sm">{dest.priceRange}</span>
                                                <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                                                    Explore
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {paginatedDestinations.map((dest) => {
                                const CategoryIcon = getCategoryIcon(dest.category);
                                return (
                                    <Card
                                        key={dest.id}
                                        className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                        onClick={() => setSelectedDestination(dest)}
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden">
                                                <img
                                                    src={dest.image}
                                                    alt={dest.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <Badge className="bg-background/90 text-foreground">
                                                        <CategoryIcon className="w-3 h-3 mr-1" />
                                                        {dest.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardContent className="flex-1 p-6">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                                                                {dest.name}
                                                            </h3>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                                <span className="text-sm font-medium">{dest.rating}</span>
                                                                <span className="text-sm text-muted-foreground">({dest.reviews})</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-primary mb-2">{dest.tagline}</p>
                                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                                            {dest.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{dest.location}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Sun className="w-4 h-4" />
                                                                <span>Best: {dest.bestTime}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Umbrella className="w-4 h-4" />
                                                                <span>{dest.climate}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-3">
                                                        <span className="text-xl font-bold text-primary">{dest.priceRange}</span>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleSaveDestination(dest.id);
                                                                }}
                                                            >
                                                                <Heart
                                                                    className={`w-4 h-4 ${savedDestinations.includes(dest.id) ? "fill-red-500 text-red-500" : ""}`}
                                                                />
                                                            </Button>
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleShare(dest);
                                                                }}
                                                            >
                                                                <Share2 className="w-4 h-4" />
                                                            </Button>
                                                            <Button>
                                                                Explore
                                                                <ArrowRight className="w-4 h-4 ml-2" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Destination Details Modal */}
            <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedDestination && (
                        <>
                            <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                                <img
                                    src={selectedDestination.image}
                                    alt={selectedDestination.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                <div className="absolute bottom-4 left-6 right-6">
                                    <Badge className="mb-2">{selectedDestination.category}</Badge>
                                    <h2 className="text-3xl font-bold text-white">{selectedDestination.name}</h2>
                                    <p className="text-white/80">{selectedDestination.tagline}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-5 h-5" />
                                        <span>{selectedDestination.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Sun className="w-5 h-5" />
                                        <span>Best Time: {selectedDestination.bestTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Umbrella className="w-5 h-5" />
                                        <span>{selectedDestination.climate} Climate</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        <span className="font-semibold">{selectedDestination.rating}</span>
                                        <span className="text-muted-foreground">({selectedDestination.reviews} reviews)</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">About This Destination</h3>
                                    <p className="text-muted-foreground">{selectedDestination.description}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">Highlights</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDestination.highlights.map((highlight, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm">
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                {highlight}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">Top Attractions</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {selectedDestination.attractions.map((attraction, index) => (
                                            <div key={index} className="p-3 bg-muted rounded-lg">
                                                <p className="font-medium">{attraction.name}</p>
                                                <p className="text-sm text-muted-foreground">{attraction.type}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-muted rounded-lg">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Plane className="w-4 h-4" />
                                            Getting There
                                        </h4>
                                        <p className="text-sm text-muted-foreground">{selectedDestination.gettingThere}</p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Travel Tips
                                        </h4>
                                        <p className="text-sm text-muted-foreground">{selectedDestination.travelTips}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Estimated Budget</p>
                                        <p className="text-2xl font-bold text-primary">{selectedDestination.priceRange}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Region</p>
                                        <p className="font-medium">{selectedDestination.region}, {selectedDestination.country}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        className="flex-1"
                                        size="lg"
                                        onClick={() => handlePlanTrip(selectedDestination)}
                                    >
                                        <Plane className="w-5 h-5 mr-2" />
                                        Plan Your Trip
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => toggleSaveDestination(selectedDestination.id)}
                                    >
                                        <Heart
                                            className={`w-5 h-5 mr-2 ${savedDestinations.includes(selectedDestination.id) ? "fill-red-500 text-red-500" : ""}`}
                                        />
                                        {savedDestinations.includes(selectedDestination.id) ? "Saved" : "Save"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => handleShare(selectedDestination)}
                                    >
                                        <Share2 className="w-5 h-5 mr-2" />
                                        Share
                                    </Button>
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

export default Destinations;
