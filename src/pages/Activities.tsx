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
    Clock,
    Users,
    MapPin,
    Waves,
    Mountain,
    Camera,
    Utensils,
    Music,
    Palette,
    Bike,
    Compass,
    TreePine,
    Anchor,
    Wind,
    Tent,
    DollarSign,
    Calendar,
    CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Import images
import activitiesExperiences from "@/assets/activities-experiences.jpg";
import heroBeach from "@/assets/hero-beach.jpg";
import heroAdventure from "@/assets/hero-adventure.jpg";
import heroFestival from "@/assets/hero-festival.jpg";
import communityExperience from "@/assets/community-experience.jpg";
import interestBeaches from "@/assets/interest-beaches.jpg";
import interestCulture from "@/assets/interest-culture.jpg";
import interestFood from "@/assets/interest-food.jpg";
import interestNature from "@/assets/interest-nature.jpg";
import interestEvents from "@/assets/interest-events.jpg";

const Activities = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [durationFilter, setDurationFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedActivity, setSelectedActivity] = useState<typeof allActivities[0] | null>(null);
    const [savedActivities, setSavedActivities] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const activitiesPerPage = 8;

    const allActivities = [
        {
            id: 1,
            name: "Ibeno Beach Day Adventure",
            tagline: "Sun, Sand & Nigerian Seafood",
            description: "Spend a perfect day at Nigeria's longest natural sand beach. Enjoy swimming in warm Atlantic waters, beach volleyball, jet skiing, and end with fresh grilled fish at sunset. Our guides ensure safety while you experience the best of Ibeno.",
            location: "Ibeno Beach, Akwa Ibom",
            image: interestBeaches,
            galleryImages: [interestBeaches, heroBeach, communityExperience],
            category: "Beach",
            duration: "Full Day (8 hours)",
            durationHours: 8,
            difficulty: "Easy",
            groupSize: "2-20 people",
            price: "₦25,000",
            priceValue: 25000,
            rating: 4.9,
            reviews: 456,
            includes: ["Transportation", "Beach Equipment", "Lunch", "Safety Gear", "Guide"],
            highlights: ["Swimming", "Beach Sports", "Jet Skiing", "Fresh Seafood", "Sunset Views"],
            requirements: ["Swimwear", "Sunscreen", "Change of Clothes"],
            provider: "Queska Beach Adventures",
            availability: "Daily, 7:00 AM - 5:00 PM"
        },
        {
            id: 2,
            name: "Obudu Cable Car & Hiking",
            tagline: "Africa's Longest Cable Car Experience",
            description: "Ride Africa's longest cable car to the top of Obudu Mountain, then embark on guided hiking trails through temperate forests. Experience breathtaking views, unique flora, and cool mountain air at 1,716 meters above sea level.",
            location: "Obudu Mountain Resort, Cross River",
            image: heroAdventure,
            galleryImages: [heroAdventure, interestNature, communityExperience],
            category: "Adventure",
            duration: "Full Day (10 hours)",
            durationHours: 10,
            difficulty: "Moderate",
            groupSize: "2-12 people",
            price: "₦85,000",
            priceValue: 85000,
            rating: 4.8,
            reviews: 892,
            includes: ["Cable Car Tickets", "Hiking Guide", "Lunch", "Water", "First Aid"],
            highlights: ["Cable Car Ride", "Mountain Hiking", "Waterfall Visit", "Bird Watching", "Photography"],
            requirements: ["Hiking Boots", "Warm Clothing", "Camera", "Good Fitness Level"],
            provider: "Obudu Adventures",
            availability: "Daily, 8:00 AM - 6:00 PM"
        },
        {
            id: 3,
            name: "Calabar Cultural Heritage Tour",
            tagline: "Journey Through Nigerian History",
            description: "Explore Calabar's rich history from the slave trade era to modern times. Visit the Slave History Museum, Duke Town Church, and the National Museum. Learn about the Efik culture and taste traditional cuisine.",
            location: "Calabar, Cross River",
            image: interestCulture,
            galleryImages: [interestCulture, heroFestival, communityExperience],
            category: "Culture",
            duration: "Half Day (5 hours)",
            durationHours: 5,
            difficulty: "Easy",
            groupSize: "2-15 people",
            price: "₦35,000",
            priceValue: 35000,
            rating: 4.7,
            reviews: 678,
            includes: ["Museum Entries", "Professional Guide", "Traditional Snacks", "Transportation"],
            highlights: ["Slave Museum", "Colonial Buildings", "Local Markets", "Traditional Food", "Cultural Stories"],
            requirements: ["Comfortable Shoes", "Camera", "Respectful Attire"],
            provider: "Calabar Heritage Tours",
            availability: "Tuesday - Sunday, 9:00 AM & 2:00 PM"
        },
        {
            id: 4,
            name: "Nigerian Cooking Class",
            tagline: "Master Authentic Nigerian Cuisine",
            description: "Learn to cook traditional Nigerian dishes from expert local chefs. Visit a local market to select fresh ingredients, then prepare dishes like Afang soup, Edikang Ikong, and Ekpang Nkukwo. Take home recipes and memories.",
            location: "Uyo, Akwa Ibom",
            image: interestFood,
            galleryImages: [interestFood, communityExperience, interestCulture],
            category: "Food",
            duration: "Half Day (4 hours)",
            durationHours: 4,
            difficulty: "Easy",
            groupSize: "2-8 people",
            price: "₦40,000",
            priceValue: 40000,
            rating: 4.9,
            reviews: 324,
            includes: ["All Ingredients", "Recipe Book", "Apron", "Full Meal", "Drinks"],
            highlights: ["Market Visit", "Hands-on Cooking", "Local Chef", "Traditional Recipes", "Take-home Recipes"],
            requirements: ["None - All Materials Provided"],
            provider: "Taste of Akwa Ibom",
            availability: "Wednesday - Sunday, 10:00 AM"
        },
        {
            id: 5,
            name: "Yankari Safari Experience",
            tagline: "Encounter African Wildlife",
            description: "Embark on an unforgettable safari through Yankari National Park. Spot elephants, baboons, hippos, and over 350 bird species. Cool off in the natural Wikki Warm Springs with its crystal-clear 31°C waters.",
            location: "Yankari National Park, Bauchi",
            image: interestNature,
            galleryImages: [interestNature, heroAdventure, communityExperience],
            category: "Wildlife",
            duration: "2 Days",
            durationHours: 48,
            difficulty: "Moderate",
            groupSize: "4-16 people",
            price: "₦150,000",
            priceValue: 150000,
            rating: 4.6,
            reviews: 567,
            includes: ["Accommodation", "All Meals", "Safari Drives", "Park Fees", "Guide"],
            highlights: ["Elephant Sighting", "Wikki Springs", "Bird Watching", "Night Safari", "Bush Breakfast"],
            requirements: ["Binoculars", "Neutral Clothing", "Camera", "Insect Repellent"],
            provider: "Yankari Safari Tours",
            availability: "November - May"
        },
        {
            id: 6,
            name: "Lagos Nightlife Tour",
            tagline: "Experience Africa's Entertainment Capital",
            description: "Discover why Lagos never sleeps! Visit the hottest clubs, rooftop bars, and live music venues on Victoria Island and Lekki. Enjoy VIP treatment, local cocktails, and dance to Afrobeats with locals.",
            location: "Victoria Island & Lekki, Lagos",
            image: heroFestival,
            galleryImages: [heroFestival, communityExperience, interestEvents],
            category: "Nightlife",
            duration: "Evening (6 hours)",
            durationHours: 6,
            difficulty: "Easy",
            groupSize: "4-12 people",
            price: "₦75,000",
            priceValue: 75000,
            rating: 4.7,
            reviews: 445,
            includes: ["VIP Entry (3 venues)", "Welcome Drinks", "Transportation", "Security", "Local Guide"],
            highlights: ["Rooftop Bars", "Live Afrobeats", "VIP Lounges", "Local Cocktails", "Celebrity Hotspots"],
            requirements: ["Smart Dress Code", "Valid ID", "21+ Age"],
            provider: "Lagos Night Tours",
            availability: "Thursday - Saturday, 9:00 PM"
        },
        {
            id: 7,
            name: "Olumo Rock Climbing Adventure",
            tagline: "Conquer Abeokuta's Ancient Fortress",
            description: "Scale the historic Olumo Rock, a natural fortress used during inter-tribal wars. Navigate through caves, see ancient shrines, and reach the summit for panoramic views of Abeokuta. Learn about Egba history from local guides.",
            location: "Abeokuta, Ogun State",
            image: heroAdventure,
            galleryImages: [heroAdventure, interestCulture, interestNature],
            category: "Adventure",
            duration: "Half Day (4 hours)",
            durationHours: 4,
            difficulty: "Moderate",
            groupSize: "2-10 people",
            price: "₦20,000",
            priceValue: 20000,
            rating: 4.5,
            reviews: 789,
            includes: ["Entry Fee", "Local Guide", "Water", "Light Refreshments"],
            highlights: ["Rock Climbing", "Cave Exploration", "Historical Sites", "Panoramic Views", "Cultural Stories"],
            requirements: ["Comfortable Shoes", "Physical Fitness", "Camera"],
            provider: "Ogun Heritage Adventures",
            availability: "Daily, 8:00 AM - 5:00 PM"
        },
        {
            id: 8,
            name: "Kayaking the Mangroves",
            tagline: "Paddle Through Nigeria's Wetlands",
            description: "Explore the mysterious mangrove forests of the Niger Delta by kayak. Navigate through water channels, spot exotic birds, and learn about the unique ecosystem. Perfect for nature lovers and photography enthusiasts.",
            location: "Calabar River, Cross River",
            image: interestNature,
            galleryImages: [interestNature, heroBeach, communityExperience],
            category: "Water Sports",
            duration: "Half Day (4 hours)",
            durationHours: 4,
            difficulty: "Moderate",
            groupSize: "2-8 people",
            price: "₦30,000",
            priceValue: 30000,
            rating: 4.8,
            reviews: 234,
            includes: ["Kayak & Paddle", "Life Jacket", "Waterproof Bag", "Guide", "Snacks"],
            highlights: ["Mangrove Exploration", "Bird Watching", "Photography", "Fishing Villages", "Sunset Paddle"],
            requirements: ["Swimming Ability", "Waterproof Camera", "Sun Protection"],
            provider: "Delta Paddle Adventures",
            availability: "Daily, 7:00 AM & 3:00 PM"
        },
        {
            id: 9,
            name: "Traditional Pottery Workshop",
            tagline: "Create Authentic Nigerian Pottery",
            description: "Learn the ancient art of Nigerian pottery from master craftsmen. Shape clay using traditional techniques, decorate your creation, and fire it in a traditional kiln. Take home your handmade masterpiece.",
            location: "Abuja, FCT",
            image: interestCulture,
            galleryImages: [interestCulture, communityExperience, interestFood],
            category: "Arts & Crafts",
            duration: "Half Day (3 hours)",
            durationHours: 3,
            difficulty: "Easy",
            groupSize: "2-6 people",
            price: "₦25,000",
            priceValue: 25000,
            rating: 4.6,
            reviews: 156,
            includes: ["All Materials", "Expert Instruction", "Firing", "Packaging", "Refreshments"],
            highlights: ["Hands-on Learning", "Traditional Techniques", "Take Home Creation", "Cultural Insights"],
            requirements: ["Comfortable Clothes", "Creativity"],
            provider: "Nigerian Arts Collective",
            availability: "Tuesday - Saturday, 10:00 AM & 2:00 PM"
        },
        {
            id: 10,
            name: "Fishing Trip with Locals",
            tagline: "Fish Like a Nigerian",
            description: "Join local fishermen for an authentic fishing experience on the Atlantic coast. Learn traditional fishing techniques, help cast nets, and cook your catch on the beach. A genuine immersion into coastal Nigerian life.",
            location: "Ibeno, Akwa Ibom",
            image: heroBeach,
            galleryImages: [heroBeach, interestBeaches, communityExperience],
            category: "Water Sports",
            duration: "Full Day (8 hours)",
            durationHours: 8,
            difficulty: "Moderate",
            groupSize: "2-6 people",
            price: "₦35,000",
            priceValue: 35000,
            rating: 4.7,
            reviews: 189,
            includes: ["Fishing Equipment", "Boat Ride", "Fresh Catch Lunch", "Drinks", "Life Jacket"],
            highlights: ["Traditional Fishing", "Boat Ride", "Beach BBQ", "Local Stories", "Sunset"],
            requirements: ["Sun Protection", "Seasickness Medication (if prone)", "Change of Clothes"],
            provider: "Coastal Fishing Tours",
            availability: "Daily, 5:00 AM"
        },
        {
            id: 11,
            name: "Afrobeats Dance Class",
            tagline: "Move to Nigerian Rhythms",
            description: "Learn to dance Afrobeats from professional dancers who have worked with top Nigerian artists. Master popular moves, learn about the culture behind the music, and leave with new skills to show off.",
            location: "Lagos, Nigeria",
            image: interestEvents,
            galleryImages: [interestEvents, heroFestival, communityExperience],
            category: "Entertainment",
            duration: "2 hours",
            durationHours: 2,
            difficulty: "Easy",
            groupSize: "4-20 people",
            price: "₦15,000",
            priceValue: 15000,
            rating: 4.9,
            reviews: 567,
            includes: ["Professional Instructor", "Water", "Video Recording", "Dance Space"],
            highlights: ["Popular Moves", "Music History", "Video to Keep", "Meet New People"],
            requirements: ["Comfortable Clothes", "Sneakers", "Water Bottle"],
            provider: "Lagos Dance Academy",
            availability: "Monday - Saturday, 4:00 PM & 6:00 PM"
        },
        {
            id: 12,
            name: "Spa & Wellness Retreat",
            tagline: "Rejuvenate Mind, Body & Soul",
            description: "Indulge in a luxurious spa experience using traditional African ingredients. Enjoy massages with shea butter, black soap treatments, and herbal steam baths. Complete relaxation in a serene setting.",
            location: "Obudu Mountain Resort, Cross River",
            image: activitiesExperiences,
            galleryImages: [activitiesExperiences, interestNature, heroAdventure],
            category: "Wellness",
            duration: "Half Day (4 hours)",
            durationHours: 4,
            difficulty: "Easy",
            groupSize: "1-4 people",
            price: "₦65,000",
            priceValue: 65000,
            rating: 4.8,
            reviews: 298,
            includes: ["Full Body Massage", "Facial", "Steam Bath", "Herbal Tea", "Relaxation Lounge"],
            highlights: ["Shea Butter Massage", "Black Soap Treatment", "Mountain Views", "Herbal Therapy"],
            requirements: ["Arrive 30 Minutes Early", "Medical Conditions Disclosed"],
            provider: "Obudu Wellness Center",
            availability: "Daily, 9:00 AM - 7:00 PM"
        }
    ];

    const categories = ["all", "Beach", "Adventure", "Culture", "Food", "Wildlife", "Nightlife", "Water Sports", "Arts & Crafts", "Entertainment", "Wellness"];
    const difficulties = ["all", "Easy", "Moderate", "Challenging"];
    const durations = ["all", "2-3 hours", "Half Day", "Full Day", "Multi-Day"];

    // Filter activities
    const filteredActivities = allActivities.filter(activity => {
        const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter;
        const matchesDifficulty = difficultyFilter === "all" || activity.difficulty === difficultyFilter;

        let matchesDuration = true;
        if (durationFilter !== "all") {
            if (durationFilter === "2-3 hours") matchesDuration = activity.durationHours <= 3;
            else if (durationFilter === "Half Day") matchesDuration = activity.durationHours > 3 && activity.durationHours <= 5;
            else if (durationFilter === "Full Day") matchesDuration = activity.durationHours > 5 && activity.durationHours <= 10;
            else if (durationFilter === "Multi-Day") matchesDuration = activity.durationHours > 24;
        }

        return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
    });

    // Pagination
    const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
    const paginatedActivities = filteredActivities.slice(
        (currentPage - 1) * activitiesPerPage,
        currentPage * activitiesPerPage
    );

    const toggleSaveActivity = (activityId: number) => {
        if (savedActivities.includes(activityId)) {
            setSavedActivities(savedActivities.filter(id => id !== activityId));
            toast.success("Activity removed from saved");
        } else {
            setSavedActivities([...savedActivities, activityId]);
            toast.success("Activity saved to your wishlist");
        }
    };

    const handleShare = (activity: typeof allActivities[0]) => {
        navigator.clipboard.writeText(`Check out ${activity.name} on Queska! ${window.location.href}`);
        toast.success("Link copied to clipboard!");
    };

    const handleBookActivity = (activity: typeof allActivities[0]) => {
        toast.success(`Redirecting to book ${activity.name}...`);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Beach": return Waves;
            case "Adventure": return Mountain;
            case "Culture": return Camera;
            case "Food": return Utensils;
            case "Wildlife": return TreePine;
            case "Nightlife": return Music;
            case "Water Sports": return Anchor;
            case "Arts & Crafts": return Palette;
            case "Entertainment": return Music;
            case "Wellness": return Wind;
            default: return Compass;
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Easy": return "bg-green-500/10 text-green-600 border-green-500/20";
            case "Moderate": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
            case "Challenging": return "bg-red-500/10 text-red-600 border-red-500/20";
            default: return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src={activitiesExperiences} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Compass className="w-3 h-3 mr-1" />
                            {allActivities.length} Activities & Experiences
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
                            Unforgettable
                            <span className="block text-primary">Activities & Experiences</span>
                        </h1>
                        <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            From beach adventures to cultural immersions, discover unique experiences that make your trip truly memorable.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search activities by name, location, or type..."
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

                            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {difficulties.map(diff => (
                                        <SelectItem key={diff} value={diff}>
                                            {diff === "all" ? "All Levels" : diff}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={durationFilter} onValueChange={setDurationFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    {durations.map(dur => (
                                        <SelectItem key={dur} value={dur}>
                                            {dur === "all" ? "All Durations" : dur}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {(categoryFilter !== "all" || difficultyFilter !== "all" || durationFilter !== "all" || searchQuery) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setCategoryFilter("all");
                                        setDifficultyFilter("all");
                                        setDurationFilter("all");
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
                                {filteredActivities.length} activities found
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

            {/* Activities Grid/List */}
            <section className="py-12">
                <div className="container px-4">
                    {filteredActivities.length === 0 ? (
                        <div className="text-center py-20">
                            <Compass className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No activities found</h3>
                            <p className="text-muted-foreground mb-6">
                                Try adjusting your filters or search query
                            </p>
                            <Button onClick={() => {
                                setCategoryFilter("all");
                                setDifficultyFilter("all");
                                setDurationFilter("all");
                                setSearchQuery("");
                            }}>
                                Clear All Filters
                            </Button>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {paginatedActivities.map((activity) => {
                                const CategoryIcon = getCategoryIcon(activity.category);
                                return (
                                    <Card
                                        key={activity.id}
                                        className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                        onClick={() => setSelectedActivity(activity)}
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={activity.image}
                                                alt={activity.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <Badge className="bg-background/90 text-foreground">
                                                    <CategoryIcon className="w-3 h-3 mr-1" />
                                                    {activity.category}
                                                </Badge>
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="w-8 h-8 bg-background/90 hover:bg-background"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleSaveActivity(activity.id);
                                                    }}
                                                >
                                                    <Heart
                                                        className={`w-4 h-4 ${savedActivities.includes(activity.id) ? "fill-red-500 text-red-500" : ""}`}
                                                    />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                                                <Badge className={getDifficultyColor(activity.difficulty)}>
                                                    {activity.difficulty}
                                                </Badge>
                                                <div className="flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-xs font-medium">{activity.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                                {activity.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                                                {activity.tagline}
                                            </p>
                                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="line-clamp-1">{activity.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{activity.duration}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-primary">{activity.price}</span>
                                                <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                                                    View Details
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {paginatedActivities.map((activity) => {
                                const CategoryIcon = getCategoryIcon(activity.category);
                                return (
                                    <Card
                                        key={activity.id}
                                        className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                        onClick={() => setSelectedActivity(activity)}
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden">
                                                <img
                                                    src={activity.image}
                                                    alt={activity.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <Badge className="bg-background/90 text-foreground">
                                                        <CategoryIcon className="w-3 h-3 mr-1" />
                                                        {activity.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardContent className="flex-1 p-6">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                                                                {activity.name}
                                                            </h3>
                                                            <Badge className={getDifficultyColor(activity.difficulty)}>
                                                                {activity.difficulty}
                                                            </Badge>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                                <span className="text-sm font-medium">{activity.rating}</span>
                                                                <span className="text-sm text-muted-foreground">({activity.reviews})</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-primary mb-2">{activity.tagline}</p>
                                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                                            {activity.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{activity.location}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{activity.duration}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Users className="w-4 h-4" />
                                                                <span>{activity.groupSize}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-3">
                                                        <span className="text-xl font-bold text-primary">{activity.price}</span>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleSaveActivity(activity.id);
                                                                }}
                                                            >
                                                                <Heart
                                                                    className={`w-4 h-4 ${savedActivities.includes(activity.id) ? "fill-red-500 text-red-500" : ""}`}
                                                                />
                                                            </Button>
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleShare(activity);
                                                                }}
                                                            >
                                                                <Share2 className="w-4 h-4" />
                                                            </Button>
                                                            <Button>
                                                                Book Now
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

            {/* Activity Details Modal */}
            <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedActivity && (
                        <>
                            <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                                <img
                                    src={selectedActivity.image}
                                    alt={selectedActivity.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                <div className="absolute bottom-4 left-6 right-6">
                                    <div className="flex gap-2 mb-2">
                                        <Badge>{selectedActivity.category}</Badge>
                                        <Badge className={getDifficultyColor(selectedActivity.difficulty)}>
                                            {selectedActivity.difficulty}
                                        </Badge>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">{selectedActivity.name}</h2>
                                    <p className="text-white/80">{selectedActivity.tagline}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-5 h-5" />
                                        <span>{selectedActivity.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-5 h-5" />
                                        <span>{selectedActivity.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users className="w-5 h-5" />
                                        <span>{selectedActivity.groupSize}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="w-5 h-5" />
                                        <span>{selectedActivity.availability}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        <span className="font-semibold">{selectedActivity.rating}</span>
                                        <span className="text-muted-foreground">({selectedActivity.reviews} reviews)</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">About This Activity</h3>
                                    <p className="text-muted-foreground">{selectedActivity.description}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">Highlights</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedActivity.highlights.map((highlight, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm">
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                {highlight}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">What's Included</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {selectedActivity.includes.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">What to Bring</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedActivity.requirements.map((req, index) => (
                                            <Badge key={index} variant="outline" className="text-sm">
                                                {req}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Price per person</p>
                                        <p className="text-2xl font-bold text-primary">{selectedActivity.price}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Provided by</p>
                                        <p className="font-medium">{selectedActivity.provider}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        className="flex-1"
                                        size="lg"
                                        onClick={() => handleBookActivity(selectedActivity)}
                                    >
                                        <Calendar className="w-5 h-5 mr-2" />
                                        Book This Activity
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => toggleSaveActivity(selectedActivity.id)}
                                    >
                                        <Heart
                                            className={`w-5 h-5 mr-2 ${savedActivities.includes(selectedActivity.id) ? "fill-red-500 text-red-500" : ""}`}
                                        />
                                        {savedActivities.includes(selectedActivity.id) ? "Saved" : "Save"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => handleShare(selectedActivity)}
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

export default Activities;
