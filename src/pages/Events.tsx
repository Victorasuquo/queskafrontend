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
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    Calendar,
    MapPin,
    Users,
    Search,
    Filter,
    Grid,
    List,
    Heart,
    Share2,
    Clock,
    Ticket,
    Star,
    ArrowRight,
    X,
    ChevronLeft,
    ChevronRight,
    Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useLoadingState } from "@/hooks/useLoading";
import { EventCardSkeleton } from "@/components/skeletons";

// Import images
import calabarCarnival from "@/assets/event-calabar-carnival.jpg";
import culturalFestival from "@/assets/event-cultural-festival.jpg";
import beachMusic from "@/assets/event-beach-music.jpg";
import rioCarnival from "@/assets/event-rio-carnival.jpg";
import calabarDetailed from "@/assets/event-calabar-detailed.jpg";
import culturalDetailed from "@/assets/event-cultural-detailed.jpg";
import beachDetailed from "@/assets/event-beach-detailed.jpg";
import rioDetailed from "@/assets/event-rio-detailed.jpg";
import eventsImage from "@/assets/events-festivals.jpg";

const Events = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedEvent, setSelectedEvent] = useState<typeof allEvents[0] | null>(null);
    const [savedEvents, setSavedEvents] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;

    // Loading state - simulates API loading
    const { isLoading } = useLoadingState(true, 1200);

    const allEvents = [
        {
            id: 1,
            title: "Calabar Carnival",
            description: "Africa's biggest street party featuring colorful parades, cultural displays, and music performances from across the continent. Experience the vibrant energy of Calabar as the city transforms into a celebration of African heritage and unity.",
            date: "December 26-31, 2025",
            startTime: "10:00 AM",
            endTime: "Late Night",
            location: "Calabar, Cross River",
            venue: "Calabar Stadium & Mary Slessor Avenue",
            attendees: 2300,
            category: "Festival",
            price: "Free - ₦50,000",
            image: calabarCarnival,
            detailedImage: calabarDetailed,
            rating: 4.9,
            reviews: 1250,
            highlights: ["Cultural Parades", "Live Music", "Food Festival", "Beauty Pageant"],
            organizer: "Cross River State Government"
        },
        {
            id: 2,
            title: "Akwa Ibom Cultural Festival",
            description: "A celebration of the rich cultural heritage of Akwa Ibom State featuring traditional dances, music, art exhibitions, and culinary experiences. Discover the unique traditions that make this region special.",
            date: "January 15-20, 2026",
            startTime: "9:00 AM",
            endTime: "10:00 PM",
            location: "Uyo, Akwa Ibom",
            venue: "Ibom Hall & Cultural Center",
            attendees: 1800,
            category: "Culture",
            price: "₦5,000 - ₦25,000",
            image: culturalFestival,
            detailedImage: culturalDetailed,
            rating: 4.7,
            reviews: 856,
            highlights: ["Traditional Dance", "Art Exhibition", "Local Cuisine", "Craft Market"],
            organizer: "Akwa Ibom State Ministry of Culture"
        },
        {
            id: 3,
            title: "Ibeno Beach Music Festival",
            description: "The ultimate beach party experience featuring top Nigerian and international artists. Three days of non-stop music, beach activities, and unforgettable memories at Nigeria's longest beach.",
            date: "February 14-16, 2026",
            startTime: "2:00 PM",
            endTime: "2:00 AM",
            location: "Ibeno Beach, Akwa Ibom",
            venue: "Ibeno Beach Resort",
            attendees: 3100,
            category: "Music",
            price: "₦15,000 - ₦150,000",
            image: beachMusic,
            detailedImage: beachDetailed,
            rating: 4.8,
            reviews: 2100,
            highlights: ["Live Concerts", "Beach Party", "VIP Lounges", "Camping"],
            organizer: "Queska Events"
        },
        {
            id: 4,
            title: "Rio Carnival Experience",
            description: "Join us for an exclusive trip to the world's most famous carnival. Experience the samba, the costumes, and the energy of Rio de Janeiro during the most spectacular celebration on Earth.",
            date: "March 1-5, 2026",
            startTime: "All Day",
            endTime: "All Night",
            location: "Rio de Janeiro, Brazil",
            venue: "Sambadrome & Various Locations",
            attendees: 5200,
            category: "Festival",
            price: "₦850,000 - ₦2,500,000",
            image: rioCarnival,
            detailedImage: rioDetailed,
            rating: 4.9,
            reviews: 3500,
            highlights: ["Samba Parade", "Street Parties", "Beach Events", "VIP Access"],
            organizer: "Queska International"
        },
        {
            id: 5,
            title: "Lagos Food & Wine Festival",
            description: "A gastronomic journey featuring the best of Nigerian and international cuisine. Celebrity chefs, wine tastings, cooking demonstrations, and exclusive dining experiences await.",
            date: "January 25-27, 2026",
            startTime: "11:00 AM",
            endTime: "11:00 PM",
            location: "Lagos, Nigeria",
            venue: "Eko Convention Center",
            attendees: 4500,
            category: "Food",
            price: "₦20,000 - ₦100,000",
            image: culturalFestival,
            detailedImage: culturalDetailed,
            rating: 4.6,
            reviews: 1890,
            highlights: ["Celebrity Chefs", "Wine Tasting", "Cooking Classes", "Gourmet Market"],
            organizer: "Lagos State Tourism Board"
        },
        {
            id: 6,
            title: "Abuja Tech Summit",
            description: "West Africa's premier technology conference bringing together innovators, entrepreneurs, and industry leaders. Discover the future of technology in Africa through keynotes, workshops, and networking.",
            date: "February 20-22, 2026",
            startTime: "8:00 AM",
            endTime: "6:00 PM",
            location: "Abuja, FCT",
            venue: "International Conference Center",
            attendees: 2800,
            category: "Tech",
            price: "₦50,000 - ₦250,000",
            image: beachMusic,
            detailedImage: beachDetailed,
            rating: 4.8,
            reviews: 1456,
            highlights: ["Keynote Speakers", "Startup Pitch", "Workshops", "Networking"],
            organizer: "Nigerian Tech Foundation"
        },
        {
            id: 7,
            title: "Port Harcourt Garden City Festival",
            description: "Celebrate the beauty and culture of the Garden City with music, art, and community events. A family-friendly festival showcasing the best of Rivers State.",
            date: "March 15-17, 2026",
            startTime: "10:00 AM",
            endTime: "10:00 PM",
            location: "Port Harcourt, Rivers",
            venue: "Port Harcourt Pleasure Park",
            attendees: 3200,
            category: "Festival",
            price: "₦2,000 - ₦15,000",
            image: calabarCarnival,
            detailedImage: calabarDetailed,
            rating: 4.5,
            reviews: 980,
            highlights: ["Live Entertainment", "Kids Zone", "Food Court", "Art Exhibition"],
            organizer: "Rivers State Events"
        },
        {
            id: 8,
            title: "Enugu Coal City Marathon",
            description: "Join thousands of runners in this annual marathon through the historic streets of Enugu. Categories for all fitness levels with prizes and entertainment.",
            date: "April 5, 2026",
            startTime: "6:00 AM",
            endTime: "2:00 PM",
            location: "Enugu, Nigeria",
            venue: "Nnamdi Azikiwe Stadium",
            attendees: 5000,
            category: "Sports",
            price: "₦5,000 - ₦25,000",
            image: beachMusic,
            detailedImage: beachDetailed,
            rating: 4.7,
            reviews: 2340,
            highlights: ["42km Marathon", "21km Half", "10km Fun Run", "5km Walk"],
            organizer: "Enugu State Sports Commission"
        },
        {
            id: 9,
            title: "Benin Kingdom Heritage Tour",
            description: "Explore the ancient Kingdom of Benin with guided tours of historical sites, museums, and cultural performances. Learn about one of Africa's greatest civilizations.",
            date: "Ongoing - Daily Tours",
            startTime: "9:00 AM",
            endTime: "5:00 PM",
            location: "Benin City, Edo",
            venue: "National Museum & Royal Palace",
            attendees: 150,
            category: "Culture",
            price: "₦10,000 - ₦35,000",
            image: culturalFestival,
            detailedImage: culturalDetailed,
            rating: 4.9,
            reviews: 567,
            highlights: ["Museum Tour", "Palace Visit", "Bronze Casting", "Traditional Dance"],
            organizer: "Edo State Tourism"
        },
        {
            id: 10,
            title: "Obudu Mountain Resort Retreat",
            description: "Escape to the clouds at Obudu Mountain Resort. Enjoy hiking, cable car rides, and wellness activities in one of Nigeria's most breathtaking locations.",
            date: "Available Year-Round",
            startTime: "Check-in 2:00 PM",
            endTime: "Check-out 12:00 PM",
            location: "Obudu, Cross River",
            venue: "Obudu Mountain Resort",
            attendees: 200,
            category: "Adventure",
            price: "₦75,000 - ₦350,000",
            image: rioCarnival,
            detailedImage: rioDetailed,
            rating: 4.8,
            reviews: 1890,
            highlights: ["Cable Car", "Hiking Trails", "Spa & Wellness", "Golf Course"],
            organizer: "Obudu Ranch Resort"
        },
        {
            id: 11,
            title: "Olumo Rock Festival",
            description: "Annual celebration at the historic Olumo Rock featuring rock climbing, cultural performances, and local delicacies. A unique blend of adventure and heritage.",
            date: "April 20-21, 2026",
            startTime: "8:00 AM",
            endTime: "8:00 PM",
            location: "Abeokuta, Ogun",
            venue: "Olumo Rock",
            attendees: 2500,
            category: "Adventure",
            price: "₦3,000 - ₦20,000",
            image: calabarCarnival,
            detailedImage: calabarDetailed,
            rating: 4.6,
            reviews: 780,
            highlights: ["Rock Climbing", "Cave Tours", "Cultural Dance", "Local Food"],
            organizer: "Ogun State Tourism"
        },
        {
            id: 12,
            title: "Afropolitan Vibes Concert",
            description: "The biggest Afrobeats concert of the year featuring top artists from Nigeria and across Africa. An unforgettable night of music, dance, and celebration.",
            date: "May 1, 2026",
            startTime: "6:00 PM",
            endTime: "2:00 AM",
            location: "Lagos, Nigeria",
            venue: "Tafawa Balewa Square",
            attendees: 15000,
            category: "Music",
            price: "₦25,000 - ₦500,000",
            image: beachMusic,
            detailedImage: beachDetailed,
            rating: 4.9,
            reviews: 4500,
            highlights: ["Top Artists", "VIP Experience", "After Party", "Meet & Greet"],
            organizer: "Afropolitan Music Group"
        }
    ];

    const categories = ["all", "Festival", "Culture", "Music", "Food", "Tech", "Sports", "Adventure"];
    const locations = ["all", "Lagos", "Abuja", "Calabar", "Uyo", "Port Harcourt", "Enugu", "Benin City", "International"];
    const dateOptions = ["all", "This Week", "This Month", "Next Month", "Next 3 Months"];

    // Filter events
    const filteredEvents = allEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
        const matchesLocation = locationFilter === "all" || event.location.toLowerCase().includes(locationFilter.toLowerCase());
        return matchesSearch && matchesCategory && matchesLocation;
    });

    // Pagination
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * eventsPerPage,
        currentPage * eventsPerPage
    );

    const toggleSaveEvent = (eventId: number) => {
        if (savedEvents.includes(eventId)) {
            setSavedEvents(savedEvents.filter(id => id !== eventId));
            toast.success("Event removed from saved");
        } else {
            setSavedEvents([...savedEvents, eventId]);
            toast.success("Event saved to your wishlist");
        }
    };

    const handleShare = (event: typeof allEvents[0]) => {
        navigator.clipboard.writeText(`Check out ${event.title} on Queska! ${window.location.href}`);
        toast.success("Link copied to clipboard!");
    };

    const handleBookEvent = (event: typeof allEvents[0]) => {
        toast.success(`Redirecting to book ${event.title}...`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src={eventsImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Calendar className="w-3 h-3 mr-1" />
                            {allEvents.length} Events Available
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
                            Discover Amazing
                            <span className="block text-primary">Events & Experiences</span>
                        </h1>
                        <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            From vibrant festivals to intimate cultural gatherings, find events that make your journey unforgettable.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search events by name, location, or keyword..."
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
                                            {cat === "all" ? "All Categories" : cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={locationFilter} onValueChange={setLocationFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map(loc => (
                                        <SelectItem key={loc} value={loc}>
                                            {loc === "all" ? "All Locations" : loc}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={dateFilter} onValueChange={setDateFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dateOptions.map(opt => (
                                        <SelectItem key={opt} value={opt}>
                                            {opt === "all" ? "All Dates" : opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {(categoryFilter !== "all" || locationFilter !== "all" || searchQuery) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setCategoryFilter("all");
                                        setLocationFilter("all");
                                        setDateFilter("all");
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
                                {filteredEvents.length} events found
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

            {/* Events Grid/List */}
            <section className="py-12">
                <div className="container px-4">
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <EventCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No events found</h3>
                            <p className="text-muted-foreground mb-6">
                                Try adjusting your filters or search query
                            </p>
                            <Button onClick={() => {
                                setCategoryFilter("all");
                                setLocationFilter("all");
                                setSearchQuery("");
                            }}>
                                Clear All Filters
                            </Button>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {paginatedEvents.map((event) => (
                                <Card
                                    key={event.id}
                                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <Badge className="bg-background/90 text-foreground">
                                                {event.category}
                                            </Badge>
                                        </div>
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="w-8 h-8 bg-background/90 hover:bg-background"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleSaveEvent(event.id);
                                                }}
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${savedEvents.includes(event.id) ? "fill-red-500 text-red-500" : ""}`}
                                                />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-xs font-medium">{event.rating}</span>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                            {event.title}
                                        </h3>
                                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="line-clamp-1">{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>{event.attendees.toLocaleString()} interested</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-primary">{event.price}</span>
                                            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                                                View Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {paginatedEvents.map((event) => (
                                <Card
                                    key={event.id}
                                    className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <Badge className="bg-background/90 text-foreground">
                                                    {event.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardContent className="flex-1 p-6">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                                                            {event.title}
                                                        </h3>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                            <span className="text-sm font-medium">{event.rating}</span>
                                                            <span className="text-sm text-muted-foreground">({event.reviews})</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground mb-4 line-clamp-2">
                                                        {event.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{event.date}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-4 h-4" />
                                                            <span>{event.attendees.toLocaleString()} interested</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-3">
                                                    <span className="text-xl font-bold text-primary">{event.price}</span>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleSaveEvent(event.id);
                                                            }}
                                                        >
                                                            <Heart
                                                                className={`w-4 h-4 ${savedEvents.includes(event.id) ? "fill-red-500 text-red-500" : ""}`}
                                                            />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleShare(event);
                                                            }}
                                                        >
                                                            <Share2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button>
                                                            View Details
                                                            <ArrowRight className="w-4 h-4 ml-2" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            ))}
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

            {/* Event Details Modal */}
            <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedEvent && (
                        <>
                            <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                                <img
                                    src={selectedEvent.detailedImage}
                                    alt={selectedEvent.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                <div className="absolute bottom-4 left-6 right-6">
                                    <Badge className="mb-2">{selectedEvent.category}</Badge>
                                    <h2 className="text-3xl font-bold text-white">{selectedEvent.title}</h2>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="w-5 h-5" />
                                        <span>{selectedEvent.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-5 h-5" />
                                        <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-5 h-5" />
                                        <span>{selectedEvent.venue}, {selectedEvent.location}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        <span className="font-semibold">{selectedEvent.rating}</span>
                                        <span className="text-muted-foreground">({selectedEvent.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Users className="w-5 h-5" />
                                        <span>{selectedEvent.attendees.toLocaleString()} interested</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">About This Event</h3>
                                    <p className="text-muted-foreground">{selectedEvent.description}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">Highlights</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedEvent.highlights.map((highlight, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm">
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                {highlight}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Price Range</p>
                                        <p className="text-2xl font-bold text-primary">{selectedEvent.price}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Organized by</p>
                                        <p className="font-medium">{selectedEvent.organizer}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        className="flex-1"
                                        size="lg"
                                        onClick={() => handleBookEvent(selectedEvent)}
                                    >
                                        <Ticket className="w-5 h-5 mr-2" />
                                        Book Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => toggleSaveEvent(selectedEvent.id)}
                                    >
                                        <Heart
                                            className={`w-5 h-5 mr-2 ${savedEvents.includes(selectedEvent.id) ? "fill-red-500 text-red-500" : ""}`}
                                        />
                                        {savedEvents.includes(selectedEvent.id) ? "Saved" : "Save Event"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => handleShare(selectedEvent)}
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

export default Events;
