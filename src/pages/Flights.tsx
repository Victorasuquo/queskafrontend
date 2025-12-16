import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    Plane,
    Search,
    ArrowRight,
    ArrowLeftRight,
    Calendar as CalendarIcon,
    Users,
    Clock,
    Luggage,
    Wifi,
    Coffee,
    Tv,
    ChevronDown,
    ChevronUp,
    Star,
    Filter,
    SlidersHorizontal,
    Heart,
    Share2,
    Check,
    X,
    MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useLoadingState } from "@/hooks/useLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Import images
import heroAdventure from "@/assets/hero-adventure.jpg";

// Flight card skeleton
const FlightCardSkeleton = () => (
    <Card className="overflow-hidden">
        <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex items-center gap-4 flex-1">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>
        </CardContent>
    </Card>
);

const Flights = () => {
    const [tripType, setTripType] = useState<"roundtrip" | "oneway" | "multicity">("roundtrip");
    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");
    const [departureDate, setDepartureDate] = useState<Date>();
    const [returnDate, setReturnDate] = useState<Date>();
    const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
    const [cabinClass, setCabinClass] = useState("economy");
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<typeof allFlights[0] | null>(null);
    const [savedFlights, setSavedFlights] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState("price");
    const [stopFilter, setStopFilter] = useState("all");
    const [airlineFilter, setAirlineFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    const { isLoading } = useLoadingState(false, 1500);
    const [isSearching, setIsSearching] = useState(false);

    const airports = [
        { code: "LOS", city: "Lagos", name: "Murtala Muhammed International Airport", country: "Nigeria" },
        { code: "ABV", city: "Abuja", name: "Nnamdi Azikiwe International Airport", country: "Nigeria" },
        { code: "PHC", city: "Port Harcourt", name: "Port Harcourt International Airport", country: "Nigeria" },
        { code: "CBQ", city: "Calabar", name: "Margaret Ekpo International Airport", country: "Nigeria" },
        { code: "KAN", city: "Kano", name: "Mallam Aminu Kano International Airport", country: "Nigeria" },
        { code: "ENU", city: "Enugu", name: "Akanu Ibiam International Airport", country: "Nigeria" },
        { code: "ACC", city: "Accra", name: "Kotoka International Airport", country: "Ghana" },
        { code: "JNB", city: "Johannesburg", name: "O.R. Tambo International Airport", country: "South Africa" },
        { code: "NBO", city: "Nairobi", name: "Jomo Kenyatta International Airport", country: "Kenya" },
        { code: "CAI", city: "Cairo", name: "Cairo International Airport", country: "Egypt" },
        { code: "DXB", city: "Dubai", name: "Dubai International Airport", country: "UAE" },
        { code: "LHR", city: "London", name: "Heathrow Airport", country: "UK" },
        { code: "JFK", city: "New York", name: "John F. Kennedy International Airport", country: "USA" },
        { code: "CDG", city: "Paris", name: "Charles de Gaulle Airport", country: "France" },
    ];

    const allFlights = [
        {
            id: 1,
            airline: "Air Peace",
            airlineLogo: "🛫",
            flightNumber: "APK 7201",
            from: { code: "LOS", city: "Lagos", time: "06:30" },
            to: { code: "ABV", city: "Abuja", time: "07:45" },
            duration: "1h 15m",
            stops: 0,
            stopDetails: [],
            price: 45000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 8,
            aircraft: "Boeing 737-800",
            amenities: ["wifi", "entertainment", "meals"],
            baggage: { cabin: "7kg", checked: "23kg" },
            refundable: true,
            rating: 4.2,
            reviews: 1250,
        },
        {
            id: 2,
            airline: "Ibom Air",
            airlineLogo: "✈️",
            flightNumber: "IBA 104",
            from: { code: "LOS", city: "Lagos", time: "08:00" },
            to: { code: "ABV", city: "Abuja", time: "09:10" },
            duration: "1h 10m",
            stops: 0,
            stopDetails: [],
            price: 52000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 12,
            aircraft: "Bombardier CRJ900",
            amenities: ["entertainment", "meals"],
            baggage: { cabin: "7kg", checked: "23kg" },
            refundable: true,
            rating: 4.5,
            reviews: 890,
        },
        {
            id: 3,
            airline: "Arik Air",
            airlineLogo: "🛩️",
            flightNumber: "W3 501",
            from: { code: "LOS", city: "Lagos", time: "10:30" },
            to: { code: "ABV", city: "Abuja", time: "11:50" },
            duration: "1h 20m",
            stops: 0,
            stopDetails: [],
            price: 48000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 5,
            aircraft: "Boeing 737-700",
            amenities: ["meals"],
            baggage: { cabin: "7kg", checked: "20kg" },
            refundable: false,
            rating: 3.8,
            reviews: 2100,
        },
        {
            id: 4,
            airline: "Ethiopian Airlines",
            airlineLogo: "🌍",
            flightNumber: "ET 901",
            from: { code: "LOS", city: "Lagos", time: "23:45" },
            to: { code: "ADD", city: "Addis Ababa", time: "06:30+1" },
            duration: "4h 45m",
            stops: 0,
            stopDetails: [],
            price: 285000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 24,
            aircraft: "Boeing 787 Dreamliner",
            amenities: ["wifi", "entertainment", "meals", "power"],
            baggage: { cabin: "7kg", checked: "23kg x 2" },
            refundable: true,
            rating: 4.4,
            reviews: 3400,
        },
        {
            id: 5,
            airline: "Emirates",
            airlineLogo: "🏜️",
            flightNumber: "EK 783",
            from: { code: "LOS", city: "Lagos", time: "02:15" },
            to: { code: "DXB", city: "Dubai", time: "13:45" },
            duration: "7h 30m",
            stops: 0,
            stopDetails: [],
            price: 520000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 42,
            aircraft: "Airbus A380",
            amenities: ["wifi", "entertainment", "meals", "power", "lounge"],
            baggage: { cabin: "7kg", checked: "30kg" },
            refundable: true,
            rating: 4.7,
            reviews: 8900,
        },
        {
            id: 6,
            airline: "British Airways",
            airlineLogo: "🇬🇧",
            flightNumber: "BA 75",
            from: { code: "LOS", city: "Lagos", time: "22:55" },
            to: { code: "LHR", city: "London", time: "05:15+1" },
            duration: "6h 20m",
            stops: 0,
            stopDetails: [],
            price: 680000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 18,
            aircraft: "Boeing 777-300ER",
            amenities: ["wifi", "entertainment", "meals", "power"],
            baggage: { cabin: "6kg", checked: "23kg" },
            refundable: true,
            rating: 4.3,
            reviews: 5600,
        },
        {
            id: 7,
            airline: "Air Peace",
            airlineLogo: "🛫",
            flightNumber: "APK 1001",
            from: { code: "LOS", city: "Lagos", time: "14:00" },
            to: { code: "ACC", city: "Accra", time: "15:00" },
            duration: "1h 00m",
            stops: 0,
            stopDetails: [],
            price: 125000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 15,
            aircraft: "Embraer E195",
            amenities: ["meals"],
            baggage: { cabin: "7kg", checked: "23kg" },
            refundable: true,
            rating: 4.1,
            reviews: 780,
        },
        {
            id: 8,
            airline: "Kenya Airways",
            airlineLogo: "🦁",
            flightNumber: "KQ 535",
            from: { code: "LOS", city: "Lagos", time: "11:30" },
            to: { code: "NBO", city: "Nairobi", time: "20:45" },
            duration: "5h 15m",
            stops: 1,
            stopDetails: [{ airport: "ADD", city: "Addis Ababa", duration: "1h 30m" }],
            price: 345000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 9,
            aircraft: "Boeing 787-8",
            amenities: ["wifi", "entertainment", "meals", "power"],
            baggage: { cabin: "7kg", checked: "23kg" },
            refundable: true,
            rating: 4.2,
            reviews: 2300,
        },
        {
            id: 9,
            airline: "Air France",
            airlineLogo: "🇫🇷",
            flightNumber: "AF 149",
            from: { code: "LOS", city: "Lagos", time: "21:30" },
            to: { code: "CDG", city: "Paris", time: "05:45+1" },
            duration: "6h 15m",
            stops: 0,
            stopDetails: [],
            price: 720000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 22,
            aircraft: "Airbus A350-900",
            amenities: ["wifi", "entertainment", "meals", "power"],
            baggage: { cabin: "12kg", checked: "23kg" },
            refundable: true,
            rating: 4.5,
            reviews: 4200,
        },
        {
            id: 10,
            airline: "South African Airways",
            airlineLogo: "🇿🇦",
            flightNumber: "SA 57",
            from: { code: "LOS", city: "Lagos", time: "19:00" },
            to: { code: "JNB", city: "Johannesburg", time: "02:30+1" },
            duration: "5h 30m",
            stops: 0,
            stopDetails: [],
            price: 395000,
            currency: "₦",
            cabinClass: "Economy",
            seatsLeft: 31,
            aircraft: "Airbus A330-300",
            amenities: ["entertainment", "meals", "power"],
            baggage: { cabin: "8kg", checked: "23kg" },
            refundable: true,
            rating: 4.0,
            reviews: 1800,
        },
    ];

    const airlines = [...new Set(allFlights.map(f => f.airline))];

    const handleSearch = () => {
        if (!fromCity || !toCity || !departureDate) {
            toast.error("Please fill in departure city, destination, and date");
            return;
        }
        setIsSearching(true);
        setTimeout(() => {
            setHasSearched(true);
            setIsSearching(false);
            toast.success(`Found ${allFlights.length} flights`);
        }, 1500);
    };

    const swapCities = () => {
        const temp = fromCity;
        setFromCity(toCity);
        setToCity(temp);
    };

    const toggleSaveFlight = (flightId: number) => {
        if (savedFlights.includes(flightId)) {
            setSavedFlights(savedFlights.filter(id => id !== flightId));
            toast.success("Flight removed from saved");
        } else {
            setSavedFlights([...savedFlights, flightId]);
            toast.success("Flight saved to your wishlist");
        }
    };

    const handleShare = (flight: typeof allFlights[0]) => {
        navigator.clipboard.writeText(`Check out this ${flight.airline} flight on Queska! ${window.location.href}`);
        toast.success("Link copied to clipboard!");
    };

    const handleBookFlight = (flight: typeof allFlights[0]) => {
        toast.success(`Booking ${flight.airline} ${flight.flightNumber}...`);
    };

    const getAmenityIcon = (amenity: string) => {
        switch (amenity) {
            case "wifi": return <Wifi className="w-4 h-4" />;
            case "entertainment": return <Tv className="w-4 h-4" />;
            case "meals": return <Coffee className="w-4 h-4" />;
            case "power": return <span className="text-xs">🔌</span>;
            case "lounge": return <span className="text-xs">🛋️</span>;
            default: return null;
        }
    };

    // Filter and sort flights
    const filteredFlights = allFlights
        .filter(flight => {
            if (stopFilter === "nonstop" && flight.stops > 0) return false;
            if (stopFilter === "1stop" && flight.stops !== 1) return false;
            if (airlineFilter !== "all" && flight.airline !== airlineFilter) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price": return a.price - b.price;
                case "duration": return parseInt(a.duration) - parseInt(b.duration);
                case "departure": return a.from.time.localeCompare(b.from.time);
                case "rating": return b.rating - a.rating;
                default: return 0;
            }
        });

    const totalPassengers = passengers.adults + passengers.children + passengers.infants;

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section with Search */}
            <section className="pt-24 pb-12 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src={heroAdventure} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-8">
                            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                                <Plane className="w-3 h-3 mr-1" />
                                Search & Book Flights
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
                                Find Your Perfect
                                <span className="block text-primary">Flight</span>
                            </h1>
                            <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
                                Compare prices from top airlines and book your next adventure with the best deals.
                            </p>
                        </div>

                        {/* Search Card */}
                        <Card className="bg-background/95 backdrop-blur-sm shadow-xl">
                            <CardContent className="p-6">
                                {/* Trip Type */}
                                <div className="mb-6">
                                    <RadioGroup
                                        value={tripType}
                                        onValueChange={(value) => setTripType(value as typeof tripType)}
                                        className="flex flex-wrap gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="roundtrip" id="roundtrip" />
                                            <Label htmlFor="roundtrip" className="cursor-pointer">Round Trip</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="oneway" id="oneway" />
                                            <Label htmlFor="oneway" className="cursor-pointer">One Way</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="multicity" id="multicity" />
                                            <Label htmlFor="multicity" className="cursor-pointer">Multi-City</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Search Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    {/* From */}
                                    <div className="relative">
                                        <Label className="text-xs text-muted-foreground mb-1 block">From</Label>
                                        <Select value={fromCity} onValueChange={setFromCity}>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Select departure city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {airports.map((airport) => (
                                                    <SelectItem key={airport.code} value={airport.code}>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold">{airport.code}</span>
                                                            <span className="text-muted-foreground">- {airport.city}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Swap Button */}
                                    <div className="hidden lg:flex items-end justify-center pb-2 -mx-6">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={swapCities}
                                            className="rounded-full h-10 w-10"
                                        >
                                            <ArrowLeftRight className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* To */}
                                    <div className="lg:-ml-6">
                                        <Label className="text-xs text-muted-foreground mb-1 block">To</Label>
                                        <Select value={toCity} onValueChange={setToCity}>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Select destination city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {airports.map((airport) => (
                                                    <SelectItem key={airport.code} value={airport.code}>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold">{airport.code}</span>
                                                            <span className="text-muted-foreground">- {airport.city}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Departure Date */}
                                    <div>
                                        <Label className="text-xs text-muted-foreground mb-1 block">Departure</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full h-12 justify-start text-left font-normal",
                                                        !departureDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {departureDate ? format(departureDate, "PPP") : "Select date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={departureDate}
                                                    onSelect={setDepartureDate}
                                                    initialFocus
                                                    disabled={(date) => date < new Date()}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* Second Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    {/* Return Date */}
                                    {tripType === "roundtrip" && (
                                        <div>
                                            <Label className="text-xs text-muted-foreground mb-1 block">Return</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full h-12 justify-start text-left font-normal",
                                                            !returnDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {returnDate ? format(returnDate, "PPP") : "Select date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={returnDate}
                                                        onSelect={setReturnDate}
                                                        initialFocus
                                                        disabled={(date) => date < (departureDate || new Date())}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    )}

                                    {/* Passengers */}
                                    <div>
                                        <Label className="text-xs text-muted-foreground mb-1 block">Passengers</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full h-12 justify-start">
                                                    <Users className="mr-2 h-4 w-4" />
                                                    {totalPassengers} Passenger{totalPassengers > 1 ? "s" : ""}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-64" align="start">
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium">Adults</p>
                                                            <p className="text-xs text-muted-foreground">12+ years</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => setPassengers({ ...passengers, adults: Math.max(1, passengers.adults - 1) })}
                                                            >
                                                                -
                                                            </Button>
                                                            <span className="w-8 text-center">{passengers.adults}</span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => setPassengers({ ...passengers, adults: passengers.adults + 1 })}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium">Children</p>
                                                            <p className="text-xs text-muted-foreground">2-11 years</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => setPassengers({ ...passengers, children: Math.max(0, passengers.children - 1) })}
                                                            >
                                                                -
                                                            </Button>
                                                            <span className="w-8 text-center">{passengers.children}</span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => setPassengers({ ...passengers, children: passengers.children + 1 })}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium">Infants</p>
                                                            <p className="text-xs text-muted-foreground">Under 2 years</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => setPassengers({ ...passengers, infants: Math.max(0, passengers.infants - 1) })}
                                                            >
                                                                -
                                                            </Button>
                                                            <span className="w-8 text-center">{passengers.infants}</span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => setPassengers({ ...passengers, infants: passengers.infants + 1 })}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Cabin Class */}
                                    <div>
                                        <Label className="text-xs text-muted-foreground mb-1 block">Cabin Class</Label>
                                        <Select value={cabinClass} onValueChange={setCabinClass}>
                                            <SelectTrigger className="h-12">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="economy">Economy</SelectItem>
                                                <SelectItem value="premium">Premium Economy</SelectItem>
                                                <SelectItem value="business">Business</SelectItem>
                                                <SelectItem value="first">First Class</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Search Button */}
                                    <div className="flex items-end">
                                        <Button
                                            className="w-full h-12"
                                            onClick={handleSearch}
                                            disabled={isSearching}
                                        >
                                            {isSearching ? (
                                                <>
                                                    <span className="animate-spin mr-2">⏳</span>
                                                    Searching...
                                                </>
                                            ) : (
                                                <>
                                                    <Search className="w-4 h-4 mr-2" />
                                                    Search Flights
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            {hasSearched && (
                <section className="py-12">
                    <div className="container px-4">
                        {/* Filters Bar */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {filteredFlights.length} flights found
                                </h2>
                                <p className="text-muted-foreground">
                                    {airports.find(a => a.code === fromCity)?.city || fromCity} → {airports.find(a => a.code === toCity)?.city || toCity}
                                    {departureDate && ` • ${format(departureDate, "EEE, MMM d")}`}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                {/* Sort */}
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="price">Price: Low to High</SelectItem>
                                        <SelectItem value="duration">Duration: Shortest</SelectItem>
                                        <SelectItem value="departure">Departure: Earliest</SelectItem>
                                        <SelectItem value="rating">Rating: Highest</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Stops Filter */}
                                <Select value={stopFilter} onValueChange={setStopFilter}>
                                    <SelectTrigger className="w-36">
                                        <SelectValue placeholder="Stops" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Any Stops</SelectItem>
                                        <SelectItem value="nonstop">Non-stop Only</SelectItem>
                                        <SelectItem value="1stop">1 Stop</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Airline Filter */}
                                <Select value={airlineFilter} onValueChange={setAirlineFilter}>
                                    <SelectTrigger className="w-44">
                                        <SelectValue placeholder="All Airlines" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Airlines</SelectItem>
                                        {airlines.map((airline) => (
                                            <SelectItem key={airline} value={airline}>{airline}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Flight Results */}
                        {isSearching ? (
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FlightCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : filteredFlights.length === 0 ? (
                            <div className="text-center py-20">
                                <Plane className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                                <p className="text-muted-foreground mb-6">
                                    Try adjusting your filters or search for different dates
                                </p>
                                <Button onClick={() => {
                                    setStopFilter("all");
                                    setAirlineFilter("all");
                                }}>
                                    Clear All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredFlights.map((flight) => (
                                    <Card
                                        key={flight.id}
                                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                        onClick={() => setSelectedFlight(flight)}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                                {/* Airline Info */}
                                                <div className="flex items-center gap-4 lg:w-48">
                                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                                                        {flight.airlineLogo}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{flight.airline}</p>
                                                        <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                                                    </div>
                                                </div>

                                                {/* Flight Times */}
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold">{flight.from.time}</p>
                                                            <p className="text-sm text-muted-foreground">{flight.from.code}</p>
                                                        </div>
                                                        <div className="flex-1 px-4">
                                                            <div className="text-center text-sm text-muted-foreground mb-1">
                                                                {flight.duration}
                                                            </div>
                                                            <div className="relative">
                                                                <div className="h-0.5 bg-muted-foreground/30 w-full"></div>
                                                                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                                            </div>
                                                            <div className="text-center text-xs text-muted-foreground mt-1">
                                                                {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold">{flight.to.time}</p>
                                                            <p className="text-sm text-muted-foreground">{flight.to.code}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price & Actions */}
                                                <div className="flex items-center gap-4 lg:w-56 justify-between lg:justify-end">
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold text-primary">
                                                            {flight.currency}{flight.price.toLocaleString()}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">per person</p>
                                                        {flight.seatsLeft <= 10 && (
                                                            <Badge variant="destructive" className="mt-1">
                                                                {flight.seatsLeft} seats left
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleBookFlight(flight);
                                                            }}
                                                        >
                                                            Select
                                                        </Button>
                                                        <div className="flex gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleSaveFlight(flight.id);
                                                                }}
                                                            >
                                                                <Heart className={cn("w-4 h-4", savedFlights.includes(flight.id) && "fill-red-500 text-red-500")} />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleShare(flight);
                                                                }}
                                                            >
                                                                <Share2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Amenities */}
                                            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Luggage className="w-4 h-4" />
                                                    <span>Cabin: {flight.baggage.cabin}</span>
                                                    <span>•</span>
                                                    <span>Checked: {flight.baggage.checked}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {flight.amenities.map((amenity, idx) => (
                                                        <div key={idx} className="text-muted-foreground" title={amenity}>
                                                            {getAmenityIcon(amenity)}
                                                        </div>
                                                    ))}
                                                </div>
                                                {flight.refundable && (
                                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                                        <Check className="w-3 h-3 mr-1" />
                                                        Refundable
                                                    </Badge>
                                                )}
                                                <div className="ml-auto flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                    <span className="font-medium">{flight.rating}</span>
                                                    <span className="text-muted-foreground text-sm">({flight.reviews})</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Popular Routes Section (shown when no search) */}
            {!hasSearched && (
                <section className="py-16">
                    <div className="container px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Popular Flight Routes</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Discover the most booked routes from Nigeria to destinations across Africa and the world.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { from: "Lagos", to: "Abuja", price: "₦45,000", duration: "1h 15m", airlines: ["Air Peace", "Ibom Air"] },
                                { from: "Lagos", to: "Dubai", price: "₦520,000", duration: "7h 30m", airlines: ["Emirates", "Ethiopian"] },
                                { from: "Lagos", to: "London", price: "₦680,000", duration: "6h 20m", airlines: ["British Airways", "Virgin"] },
                                { from: "Lagos", to: "Accra", price: "₦125,000", duration: "1h", airlines: ["Air Peace", "Africa World"] },
                                { from: "Abuja", to: "Johannesburg", price: "₦395,000", duration: "5h 30m", airlines: ["Ethiopian", "SAA"] },
                                { from: "Lagos", to: "New York", price: "₦1,200,000", duration: "12h", airlines: ["Delta", "Ethiopian"] },
                            ].map((route, idx) => (
                                <Card
                                    key={idx}
                                    className="hover:shadow-lg transition-shadow cursor-pointer group"
                                    onClick={() => {
                                        setFromCity(route.from === "Lagos" ? "LOS" : "ABV");
                                        setToCity(route.to === "Abuja" ? "ABV" : route.to === "Dubai" ? "DXB" : route.to === "London" ? "LHR" : route.to === "Accra" ? "ACC" : route.to === "Johannesburg" ? "JNB" : "JFK");
                                    }}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{route.from}</span>
                                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-semibold">{route.to}</span>
                                            </div>
                                            <Badge variant="secondary">{route.duration}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-primary">{route.price}</p>
                                                <p className="text-xs text-muted-foreground">Starting from</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">{route.airlines.join(", ")}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Flight Detail Modal */}
            <Dialog open={!!selectedFlight} onOpenChange={() => setSelectedFlight(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    {selectedFlight && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-3">
                                    <span className="text-3xl">{selectedFlight.airlineLogo}</span>
                                    <div>
                                        <p>{selectedFlight.airline}</p>
                                        <p className="text-sm font-normal text-muted-foreground">{selectedFlight.flightNumber} • {selectedFlight.aircraft}</p>
                                    </div>
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">
                                {/* Flight Route */}
                                <div className="bg-muted/50 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">{selectedFlight.from.time}</p>
                                            <p className="font-semibold">{selectedFlight.from.code}</p>
                                            <p className="text-sm text-muted-foreground">{selectedFlight.from.city}</p>
                                        </div>
                                        <div className="flex-1 px-8">
                                            <div className="text-center mb-2">
                                                <Badge variant="outline">{selectedFlight.duration}</Badge>
                                            </div>
                                            <div className="relative">
                                                <div className="h-0.5 bg-primary/30 w-full"></div>
                                                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                            </div>
                                            <p className="text-center text-sm text-muted-foreground mt-2">
                                                {selectedFlight.stops === 0 ? "Non-stop" : `${selectedFlight.stops} stop`}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">{selectedFlight.to.time}</p>
                                            <p className="font-semibold">{selectedFlight.to.code}</p>
                                            <p className="text-sm text-muted-foreground">{selectedFlight.to.city}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stop Details */}
                                {selectedFlight.stops > 0 && selectedFlight.stopDetails.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Stop Details</h3>
                                        {selectedFlight.stopDetails.map((stop, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4" />
                                                <span>{stop.city} ({stop.airport})</span>
                                                <span>•</span>
                                                <span>Layover: {stop.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Amenities & Baggage */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold mb-3">Amenities</h3>
                                        <div className="space-y-2">
                                            {selectedFlight.amenities.map((amenity, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm">
                                                    {getAmenityIcon(amenity)}
                                                    <span className="capitalize">{amenity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-3">Baggage Allowance</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Luggage className="w-4 h-4" />
                                                <span>Cabin: {selectedFlight.baggage.cabin}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Luggage className="w-4 h-4" />
                                                <span>Checked: {selectedFlight.baggage.checked}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating & Reviews */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        <span className="font-semibold text-lg">{selectedFlight.rating}</span>
                                    </div>
                                    <span className="text-muted-foreground">{selectedFlight.reviews.toLocaleString()} reviews</span>
                                    {selectedFlight.refundable && (
                                        <Badge className="bg-green-100 text-green-700">
                                            <Check className="w-3 h-3 mr-1" />
                                            Refundable
                                        </Badge>
                                    )}
                                </div>

                                {/* Price & Book */}
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div>
                                        <p className="text-3xl font-bold text-primary">
                                            {selectedFlight.currency}{selectedFlight.price.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-muted-foreground">per person • {selectedFlight.cabinClass}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => toggleSaveFlight(selectedFlight.id)}
                                        >
                                            <Heart className={cn("w-5 h-5", savedFlights.includes(selectedFlight.id) && "fill-red-500 text-red-500")} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleShare(selectedFlight)}
                                        >
                                            <Share2 className="w-5 h-5" />
                                        </Button>
                                        <Button size="lg" onClick={() => handleBookFlight(selectedFlight)}>
                                            Book Now
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
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

export default Flights;
