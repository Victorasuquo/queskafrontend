import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MapPin, Calendar as CalendarIcon, Users, Music, 
  Utensils, Camera, Hotel, Share2, Check, Sparkles,
  Navigation, ChevronRight, Clock, Star, DollarSign,
  CreditCard, Plane, ShoppingCart, Shield, Lock
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import restaurantAfang from "@/assets/restaurant-afang.jpg";
import restaurantMeridien from "@/assets/restaurant-meridien.jpg";
import restaurantSuya from "@/assets/restaurant-suya.jpg";
import eventCalabar from "@/assets/event-calabar-detailed.jpg";
import eventBeach from "@/assets/event-beach-detailed.jpg";
import eventCultural from "@/assets/event-cultural-detailed.jpg";
import eventRio from "@/assets/event-rio-detailed.jpg";
import destBeach from "@/assets/destination-ibeno-beach.jpg";
import destMuseum from "@/assets/destination-museum.jpg";
import destMangrove from "@/assets/destination-mangrove.jpg";
import interestBeaches from "@/assets/interest-beaches.jpg";
import interestCulture from "@/assets/interest-culture.jpg";
import interestFood from "@/assets/interest-food.jpg";
import interestNature from "@/assets/interest-nature.jpg";
import interestNightlife from "@/assets/interest-nightlife.jpg";
import interestEvents from "@/assets/interest-events.jpg";

const events = [
  {
    id: 1,
    title: "Calabar Carnival",
    date: "Dec 27-30, 2025",
    location: "Calabar, Cross River",
    category: "Festival",
    attendees: "50K+ Expected",
    price: "₦15,000",
    rating: 4.8,
    image: eventCalabar,
    description: "Africa's biggest street party with vibrant cultural displays, parades, and performances. Experience the color and energy of this spectacular festival.",
    highlights: ["Street Parade", "Cultural Performances", "Food Festival"]
  },
  {
    id: 2,
    title: "Beach Music Festival",
    date: "Nov 15-17, 2025",
    location: "Ibeno Beach, Akwa Ibom",
    category: "Music & Beach",
    attendees: "25K+ Expected",
    price: "₦8,000",
    rating: 4.9,
    image: eventBeach,
    description: "Sunset concerts by the ocean featuring top African artists. Enjoy live music with your toes in the sand and the ocean as your backdrop.",
    highlights: ["Live Concerts", "Beach Activities", "Food & Drinks"]
  },
  {
    id: 3,
    title: "Cultural Heritage Festival",
    date: "Dec 20, 2025",
    location: "Uyo, Akwa Ibom",
    category: "Culture",
    attendees: "30K+ Expected",
    price: "₦10,000",
    rating: 4.7,
    image: eventCultural,
    description: "Traditional dances, drumming, and authentic Nigerian cultural performances celebrating our rich heritage and diversity.",
    highlights: ["Traditional Dance", "Drumming", "Art Exhibitions"]
  },
  {
    id: 4,
    title: "International Carnival",
    date: "Jan 5-8, 2026",
    location: "Lagos Island, Lagos",
    category: "Carnival",
    attendees: "75K+ Expected",
    price: "₦20,000",
    rating: 4.9,
    image: eventRio,
    description: "Rio-style carnival extravaganza with elaborate costumes, samba dancers, and massive street parties. The ultimate celebration experience.",
    highlights: ["Samba Parade", "Costume Competition", "Night Parties"]
  }
];

const destinations = [
  { 
    id: 1, 
    name: "Ibeno Beach", 
    type: "Coastal Paradise", 
    rating: 4.8, 
    visitors: "2.5K+ monthly",
    image: destBeach, 
    duration: "Full Day",
    description: "Nigeria's longest sand beach with crystal clear waters and pristine white sand. Perfect for swimming, sunbathing, and water sports.",
    activities: ["Swimming", "Beach Volleyball", "Water Sports"]
  },
  { 
    id: 2, 
    name: "National Museum", 
    type: "Cultural Heritage", 
    rating: 4.6, 
    visitors: "1.8K+ monthly",
    image: destMuseum, 
    duration: "3 Hours",
    description: "Explore centuries of Nigerian history through artifacts, traditional art, and historical exhibitions. A journey through time and culture.",
    activities: ["Guided Tours", "Art Gallery", "Historical Exhibits"]
  },
  { 
    id: 3, 
    name: "Ikot Abasi Mangrove", 
    type: "Nature Reserve", 
    rating: 4.9, 
    visitors: "1.2K+ monthly",
    image: destMangrove, 
    duration: "Half Day",
    description: "Serene mangrove forest with wooden boardwalks and diverse wildlife. Experience nature's tranquility and spot unique bird species.",
    activities: ["Nature Walks", "Bird Watching", "Photography"]
  },
];

const restaurants = [
  { 
    id: 1, 
    name: "Afang Delights", 
    cuisine: "Local Nigerian Cuisine", 
    rating: 4.7, 
    reviews: 1240,
    price: "₦₦", 
    deliveryTime: "25-35 min",
    deliveryFee: "₦500",
    image: restaurantAfang,
    description: "Authentic Afang soup with assorted meat and fresh vegetables. Traditional recipes passed down through generations.",
    specialties: ["Afang Soup", "Edikang Ikong", "Abacha"]
  },
  { 
    id: 2, 
    name: "Le Meridien", 
    cuisine: "Continental Fine Dining", 
    rating: 4.8, 
    reviews: 2100,
    price: "₦₦₦", 
    deliveryTime: "35-45 min",
    deliveryFee: "₦800",
    image: restaurantMeridien,
    description: "Elegant continental cuisine featuring premium steaks, fresh seafood, and French-inspired dishes in a sophisticated setting.",
    specialties: ["Grilled Ribeye", "Lobster Thermidor", "Coq au Vin"]
  },
  { 
    id: 3, 
    name: "Suya Spot", 
    cuisine: "Street Food & Grills", 
    rating: 4.9, 
    reviews: 3450,
    price: "₦", 
    deliveryTime: "15-25 min",
    deliveryFee: "₦300",
    image: restaurantSuya,
    description: "Mouthwatering grilled suya with authentic spice blend. Fast, fresh, and full of flavor. Perfect for quick bites.",
    specialties: ["Beef Suya", "Chicken Suya", "Spicy Grilled Fish"]
  },
];

const InteractiveExperience = () => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [travelers, setTravelers] = useState("2");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const interests = [
    { id: "Events", name: "Events & Festivals", image: interestEvents, description: "Live concerts, festivals, and celebrations" },
    { id: "Beaches", name: "Beaches & Coastal", image: interestBeaches, description: "Sun, sand, and water sports" },
    { id: "Culture", name: "Culture & Heritage", image: interestCulture, description: "Museums, history, and traditions" },
    { id: "Food", name: "Food & Cuisine", image: interestFood, description: "Local delicacies and fine dining" },
    { id: "Nature", name: "Nature & Wildlife", image: interestNature, description: "Parks, trails, and eco-tourism" },
    { id: "Nightlife", name: "Nightlife & Entertainment", image: interestNightlife, description: "Clubs, bars, and live music" }
  ];

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
    );
  };

  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeAccommodation, setIncludeAccommodation] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const canProceed = () => {
    if (step === 1) return destination && dateRange?.from && travelers;
    if (step === 2) return selectedInterests.length > 0;
    if (step === 3) return selectedEvent !== null;
    if (step === 4) return selectedDestinations.length > 0;
    if (step === 5) return selectedRestaurants.length > 0;
    if (step === 6) return true; // Checkout step
    if (step === 7) return paymentMethod !== ""; // Payment step
    return false;
  };

  const handleNext = () => {
    if (step === 7) {
      // Simulate payment processing
      setIsProcessingPayment(true);
      setTimeout(() => {
        setIsProcessingPayment(false);
        setShowResults(true);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    const selectedEventData = events.find(e => e.id === selectedEvent);
    const selectedDestData = destinations.filter(d => selectedDestinations.includes(d.id));
    const selectedRestData = restaurants.filter(r => selectedRestaurants.includes(r.id));
    
    const eventCost = selectedEventData ? parseInt(selectedEventData.price.replace(/[₦,]/g, '')) * parseInt(travelers) : 0;
    const destCost = selectedDestData.length * 5000 * parseInt(travelers);
    const restCost = selectedRestData.length * 8000 * parseInt(travelers);
    const flightCost = includeFlights ? 85000 * parseInt(travelers) : 0;
    const accommodationCost = includeAccommodation ? 45000 * (dateRange?.to && dateRange?.from ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) : 3) : 0;
    
    const subtotal = eventCost + destCost + restCost + flightCost + accommodationCost;
    const serviceFee = Math.round(subtotal * 0.05);
    const total = subtotal + serviceFee;
    
    return { eventCost, destCost, restCost, flightCost, accommodationCost, subtotal, serviceFee, total };
  };

  const handleReset = () => {
    setStep(1);
    setDestination("");
    setDateRange(undefined);
    setTravelers("2");
    setSelectedInterests([]);
    setSelectedEvent(null);
    setSelectedDestinations([]);
    setSelectedRestaurants([]);
    setIncludeFlights(true);
    setIncludeAccommodation(true);
    setPaymentMethod("card");
    setShowResults(false);
  };

  if (showResults) {
    const selectedEventData = events.find(e => e.id === selectedEvent);
    const selectedDestData = destinations.filter(d => selectedDestinations.includes(d.id));
    const selectedRestData = restaurants.filter(r => selectedRestaurants.includes(r.id));
    
    // Generate a detailed itinerary based on selections
    const itinerary = [
      {
        day: 1,
        title: "Arrival & Beach Sunset",
        activities: [
          { time: "10:00 AM", icon: MapPin, title: "Arrive in " + destination, description: "Check into your accommodation and freshen up", duration: "2 hours", cost: "Free" },
          { time: "12:30 PM", icon: Utensils, title: "Lunch at " + (selectedRestData[0]?.name || "Local Restaurant"), description: selectedRestData[0]?.cuisine + " cuisine with authentic flavors", duration: "1.5 hours", cost: selectedRestData[0]?.price || "₦₦" },
          { time: "3:00 PM", icon: Camera, title: selectedDestData[0]?.name || "Beach Visit", description: "Relax and explore the pristine coastline, perfect for photos", duration: selectedDestData[0]?.duration || "3 hours", cost: "₦2,000" },
          { time: "7:00 PM", icon: Utensils, title: "Sunset Dinner", description: "Enjoy fresh seafood with ocean views", duration: "2 hours", cost: "₦₦₦" }
        ]
      },
      {
        day: 2,
        title: "Cultural Exploration",
        activities: [
          { time: "9:00 AM", icon: Hotel, title: "Breakfast & Preparation", description: "Start your day with a hearty local breakfast", duration: "1 hour", cost: "Included" },
          { time: "10:30 AM", icon: Camera, title: selectedDestData[1]?.name || "Cultural Site", description: "Discover rich history and traditional artifacts", duration: "2.5 hours", cost: "₦3,500" },
          { time: "1:00 PM", icon: Utensils, title: "Traditional Lunch", description: "Sample authentic local cuisine at " + (selectedRestData[1]?.name || "traditional eatery"), duration: "1.5 hours", cost: "₦₦" },
          { time: "3:30 PM", icon: MapPin, title: "Market Shopping", description: "Browse local crafts, textiles, and souvenirs", duration: "2 hours", cost: "₦5,000 - ₦15,000" },
          { time: "6:00 PM", icon: Music, title: "Cultural Performance", description: "Experience traditional music and dance", duration: "2 hours", cost: "₦4,000" }
        ]
      },
      {
        day: 3,
        title: "Adventure & Activities",
        activities: [
          { time: "8:00 AM", icon: Camera, title: selectedDestData[2]?.name || "Adventure Activity", description: "Thrilling outdoor experience with guided tour", duration: "3 hours", cost: "₦8,000" },
          { time: "12:00 PM", icon: Utensils, title: "Lunch Break", description: "Refuel with local favorites at " + (selectedRestData[2]?.name || "nearby spot"), duration: "1 hour", cost: selectedRestData[2]?.price || "₦" },
          { time: "2:00 PM", icon: MapPin, title: "Free Time Exploration", description: "Explore at your own pace or relax", duration: "3 hours", cost: "Variable" },
          { time: "6:00 PM", icon: Utensils, title: "Farewell Dinner", description: "Celebrate your journey with a special meal", duration: "2 hours", cost: "₦₦₦" }
        ]
      }
    ];

    if (selectedEventData) {
      itinerary.push({
        day: 4,
        title: "Festival Day",
        activities: [
          { time: "All Day", icon: Music, title: selectedEventData.title, description: selectedEventData.description, duration: "Full day", cost: selectedEventData.price }
        ]
      });
    }

    return (
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Experience Created!</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Your Custom Itinerary
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AI-powered day-by-day plan crafted specifically for your {destination} adventure
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">AI Generated</span>
              </div>
            </div>

            {/* Trip Overview Card */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Destination</p>
                    <p className="font-semibold text-foreground">{destination}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Travel Dates</p>
                    <p className="font-semibold text-foreground text-sm">
                      {dateRange?.from && (
                        dateRange.to 
                          ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")}`
                          : format(dateRange.from, "MMM d, yyyy")
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Travelers</p>
                    <p className="font-semibold text-foreground">{travelers} People</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Day by Day Itinerary */}
            <div className="space-y-6 mb-8">
              {itinerary.map((day, idx) => (
                <Card key={idx} className="overflow-hidden">
                  {/* Day Header */}
                  <div className="bg-primary/10 px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">Day {day.day}</h3>
                          <p className="text-sm text-muted-foreground">{day.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Est. Budget</p>
                        <p className="font-semibold text-foreground">₦15,000 - ₦25,000</p>
                      </div>
                    </div>
                  </div>

                  {/* Activities Timeline */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {day.activities.map((activity, actIdx) => {
                        const ActivityIcon = activity.icon;
                        return (
                          <div key={actIdx} className="flex gap-4 group hover:bg-muted/50 -mx-2 px-2 py-3 rounded-lg transition-colors">
                            {/* Time */}
                            <div className="w-24 flex-shrink-0">
                              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {activity.time}
                              </div>
                            </div>

                            {/* Timeline Connector */}
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <ActivityIcon className="w-4 h-4 text-primary" />
                              </div>
                              {actIdx < day.activities.length - 1 && (
                                <div className="w-0.5 h-full bg-border mt-2" />
                              )}
                            </div>

                            {/* Activity Details */}
                            <div className="flex-1 pb-2">
                              <h4 className="font-semibold text-foreground mb-1">{activity.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                              <div className="flex flex-wrap gap-4 text-xs">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{activity.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <DollarSign className="w-3.5 h-3.5" />
                                  <span>{activity.cost}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* AI Recommendations */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-3">Queska AI Travel Tips</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-muted-foreground">Book accommodations near {selectedEventData?.location || destination} city center for easy access to attractions</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-muted-foreground">Visit popular beaches early morning (7-9 AM) to avoid crowds and heat</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-muted-foreground">Try local delicacies like Afang soup and Edikang Ikong - regional specialties</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-muted-foreground">Carry cash for local markets and smaller vendors - not all accept cards</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-muted-foreground">Hire a local guide for cultural sites to get deeper insights and stories</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-muted-foreground">Download offline maps before traveling - internet can be spotty in remote areas</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button size="lg" className="group">
                <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                Activate AI Guide
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="w-4 h-4" />
                Share Itinerary
              </Button>
              <Button size="lg" variant="outline" onClick={handleReset}>
                <ChevronRight className="w-4 h-4" />
                Create Another
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Experience Queska in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how Queska helps you create the perfect travel experience in just a few steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12 overflow-x-auto pb-4">
            {["Destination", "Interests", "Events", "Places", "Dining", "Checkout", "Payment"].map((label, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold transition-all text-sm ${
                    step > idx + 1 ? "bg-primary text-primary-foreground" :
                    step === idx + 1 ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {step > idx + 1 ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className="text-[10px] md:text-xs font-medium text-muted-foreground whitespace-nowrap">{label}</span>
                </div>
                {idx < 6 && (
                  <div className={`h-0.5 w-6 md:w-12 mx-1 md:mx-2 ${
                    step > idx + 1 ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card className="p-8">
            {/* Step 1: Destination & Dates */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Where do you want to go?</h3>
                  <p className="text-muted-foreground">Tell us your destination and travel details</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="e.g., Uyo, Akwa Ibom"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Travel Dates</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "w-full justify-start text-left",
                              !dateRange && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {dateRange?.from ? (
                              dateRange.to ? (
                                <>
                                  {format(dateRange.from, "PP")} - {format(dateRange.to, "PP")}
                                </>
                              ) : (
                                format(dateRange.from, "PP")
                              )
                            ) : (
                              "Select dates"
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar 
                            mode="range" 
                            selected={dateRange} 
                            onSelect={setDateRange}
                            numberOfMonths={2}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Number of Travelers</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="2"
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                          className="pl-10"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">What interests you?</h3>
                  <p className="text-muted-foreground">Select your preferences to get personalized recommendations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {interests.map((interest) => (
                    <Card
                      key={interest.id}
                      className={`cursor-pointer group overflow-hidden transition-all duration-300 ${
                        selectedInterests.includes(interest.id)
                          ? "border-primary border-2 shadow-xl"
                          : "border-border hover:border-primary/50 hover:shadow-lg"
                      }`}
                      onClick={() => handleInterestToggle(interest.id)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={interest.image} 
                          alt={interest.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {selectedInterests.includes(interest.id) && (
                          <div className="absolute top-3 right-3 bg-primary rounded-full p-2">
                            <Check className="w-5 h-5 text-primary-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h4 className="font-bold text-lg text-foreground mb-1">
                            {interest.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {interest.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Events */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Discover Events</h3>
                  <p className="text-muted-foreground">Select an event you'd like to attend</p>
                </div>

                <div className="grid gap-6">
                  {events.map((event) => (
                    <Card
                      key={event.id}
                      className={`cursor-pointer group overflow-hidden transition-all duration-300 ${
                        selectedEvent === event.id
                          ? "border-primary border-2 shadow-xl"
                          : "border-border hover:border-primary/50 hover:shadow-lg"
                      }`}
                      onClick={() => setSelectedEvent(event.id)}
                    >
                      <div className="grid md:grid-cols-3 gap-0">
                        {/* Event Image */}
                        <div className="relative h-64 md:h-auto overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {selectedEvent === event.id && (
                            <div className="absolute top-3 right-3 bg-primary rounded-full p-2">
                              <Check className="w-5 h-5 text-primary-foreground" />
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            {event.category}
                          </div>
                        </div>

                        {/* Event Info */}
                        <div className="md:col-span-2 p-6 space-y-4">
                          <div>
                            <h4 className="font-bold text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                              {event.title}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {event.description}
                            </p>
                          </div>

                          {/* Event Details Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarIcon className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="font-medium text-foreground">{event.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-xs text-muted-foreground">Location</p>
                                <p className="font-medium text-foreground">{event.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-xs text-muted-foreground">Attendance</p>
                                <p className="font-medium text-foreground">{event.attendees}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              <div>
                                <p className="text-xs text-muted-foreground">Rating</p>
                                <p className="font-medium text-foreground">{event.rating}/5.0</p>
                              </div>
                            </div>
                          </div>

                          {/* Highlights and Price */}
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex flex-wrap gap-2">
                              {event.highlights.map((highlight, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">From</p>
                              <p className="text-2xl font-bold text-primary">{event.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Destinations */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Choose Destinations</h3>
                  <p className="text-muted-foreground">Based on your interests, here are our top recommendations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {destinations.map((dest) => (
                    <Card
                      key={dest.id}
                      className={`cursor-pointer group overflow-hidden transition-all duration-300 ${
                        selectedDestinations.includes(dest.id)
                          ? "border-primary border-2 shadow-xl"
                          : "border-border hover:border-primary/50 hover:shadow-lg"
                      }`}
                      onClick={() => {
                        setSelectedDestinations(
                          selectedDestinations.includes(dest.id)
                            ? selectedDestinations.filter(id => id !== dest.id)
                            : [...selectedDestinations, dest.id]
                        );
                      }}
                    >
                      {/* Destination Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={dest.image} 
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {selectedDestinations.includes(dest.id) && (
                          <div className="absolute top-3 right-3 bg-primary rounded-full p-2">
                            <Check className="w-5 h-5 text-primary-foreground" />
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          {dest.duration}
                        </div>
                      </div>

                      {/* Destination Info */}
                      <div className="p-5 space-y-3">
                        <div>
                          <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                            {dest.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{dest.type}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-semibold text-foreground">{dest.rating}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{dest.visitors}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {dest.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {dest.activities.slice(0, 2).map((activity, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Restaurants */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Where to Eat</h3>
                  <p className="text-muted-foreground">Select restaurants for your culinary journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {restaurants.map((rest) => (
                    <Card
                      key={rest.id}
                      className={`cursor-pointer group overflow-hidden transition-all duration-300 ${
                        selectedRestaurants.includes(rest.id)
                          ? "border-primary border-2 shadow-xl"
                          : "border-border hover:border-primary/50 hover:shadow-lg"
                      }`}
                      onClick={() => setSelectedRestaurants(prev =>
                        prev.includes(rest.id)
                          ? prev.filter(id => id !== rest.id)
                          : [...prev, rest.id]
                      )}
                    >
                      {/* Restaurant Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={rest.image} 
                          alt={rest.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {selectedRestaurants.includes(rest.id) && (
                          <div className="absolute top-3 right-3 bg-primary rounded-full p-2">
                            <Check className="w-5 h-5 text-primary-foreground" />
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          {rest.price}
                        </div>
                      </div>

                      {/* Restaurant Info */}
                      <div className="p-5 space-y-3">
                        {/* Name and Cuisine */}
                        <div>
                          <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                            {rest.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{rest.cuisine}</p>
                        </div>

                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-semibold text-foreground">{rest.rating}</span>
                            <span className="text-sm text-muted-foreground">({rest.reviews})</span>
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{rest.deliveryTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{rest.deliveryFee}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {rest.description}
                        </p>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {rest.specialties.slice(0, 2).map((specialty, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Checkout */}
            {step === 6 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Review Your Experience</h3>
                  <p className="text-muted-foreground">Add extras and review everything before payment</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Selections Summary */}
                  <div className="space-y-6">
                    {/* Trip Details */}
                    <Card className="p-5">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Trip Details
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Destination</span>
                          <span className="font-medium text-foreground">{destination}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dates</span>
                          <span className="font-medium text-foreground">
                            {dateRange?.from && dateRange?.to 
                              ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")}`
                              : dateRange?.from ? format(dateRange.from, "MMM d, yyyy") : "Not selected"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Travelers</span>
                          <span className="font-medium text-foreground">{travelers} People</span>
                        </div>
                      </div>
                    </Card>

                    {/* Selected Event */}
                    {selectedEvent && (
                      <Card className="p-5">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Music className="w-5 h-5 text-primary" />
                          Event
                        </h4>
                        <div className="flex gap-4">
                          <img 
                            src={events.find(e => e.id === selectedEvent)?.image} 
                            alt="Event"
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{events.find(e => e.id === selectedEvent)?.title}</p>
                            <p className="text-sm text-muted-foreground">{events.find(e => e.id === selectedEvent)?.date}</p>
                            <p className="text-sm font-semibold text-primary mt-1">{events.find(e => e.id === selectedEvent)?.price} × {travelers}</p>
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* Selected Places */}
                    <Card className="p-5">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-primary" />
                        Places ({selectedDestinations.length})
                      </h4>
                      <div className="space-y-3">
                        {destinations.filter(d => selectedDestinations.includes(d.id)).map(dest => (
                          <div key={dest.id} className="flex items-center gap-3">
                            <img src={dest.image} alt={dest.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm">{dest.name}</p>
                              <p className="text-xs text-muted-foreground">{dest.duration}</p>
                            </div>
                            <span className="text-sm text-primary font-medium">₦5,000</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Selected Restaurants */}
                    <Card className="p-5">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-primary" />
                        Dining ({selectedRestaurants.length})
                      </h4>
                      <div className="space-y-3">
                        {restaurants.filter(r => selectedRestaurants.includes(r.id)).map(rest => (
                          <div key={rest.id} className="flex items-center gap-3">
                            <img src={rest.image} alt={rest.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm">{rest.name}</p>
                              <p className="text-xs text-muted-foreground">{rest.cuisine}</p>
                            </div>
                            <span className="text-sm text-primary font-medium">₦8,000</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column - Add-ons & Pricing */}
                  <div className="space-y-6">
                    {/* Add-ons */}
                    <Card className="p-5">
                      <h4 className="font-semibold text-foreground mb-4">Add to Your Trip</h4>
                      <div className="space-y-4">
                        <div 
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            includeFlights ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setIncludeFlights(!includeFlights)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <Plane className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-foreground">Round-trip Flights</p>
                                <Checkbox checked={includeFlights} />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">Direct flights with flexible booking</p>
                              <p className="text-lg font-bold text-primary mt-2">₦85,000 <span className="text-sm font-normal text-muted-foreground">/ person</span></p>
                            </div>
                          </div>
                        </div>

                        <div 
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            includeAccommodation ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setIncludeAccommodation(!includeAccommodation)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <Hotel className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-foreground">Hotel Accommodation</p>
                                <Checkbox checked={includeAccommodation} />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">4-star hotel with breakfast included</p>
                              <p className="text-lg font-bold text-primary mt-2">₦45,000 <span className="text-sm font-normal text-muted-foreground">/ night</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Price Summary */}
                    <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        Price Summary
                      </h4>
                      <div className="space-y-3 text-sm">
                        {calculateTotals().eventCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Event Tickets</span>
                            <span className="text-foreground">₦{calculateTotals().eventCost.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Destinations & Activities</span>
                          <span className="text-foreground">₦{calculateTotals().destCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dining Reservations</span>
                          <span className="text-foreground">₦{calculateTotals().restCost.toLocaleString()}</span>
                        </div>
                        {includeFlights && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Flights ({travelers} travelers)</span>
                            <span className="text-foreground">₦{calculateTotals().flightCost.toLocaleString()}</span>
                          </div>
                        )}
                        {includeAccommodation && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Accommodation</span>
                            <span className="text-foreground">₦{calculateTotals().accommodationCost.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="border-t border-border pt-3 mt-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="text-foreground">₦{calculateTotals().subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-muted-foreground">Service Fee (5%)</span>
                            <span className="text-foreground">₦{calculateTotals().serviceFee.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="border-t border-primary/30 pt-3 mt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-foreground">Total</span>
                            <span className="font-bold text-2xl text-primary">₦{calculateTotals().total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Payment */}
            {step === 7 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Complete Your Booking</h3>
                  <p className="text-muted-foreground">Secure payment for your all-in-one travel experience</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Payment Methods */}
                  <div className="space-y-6">
                    <Card className="p-5">
                      <h4 className="font-semibold text-foreground mb-4">Select Payment Method</h4>
                      <div className="space-y-3">
                        {[
                          { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Verve" },
                          { id: "bank", label: "Bank Transfer", icon: Hotel, desc: "Direct bank payment" },
                          { id: "wallet", label: "Digital Wallet", icon: DollarSign, desc: "Paystack, Flutterwave" },
                        ].map((method) => (
                          <div
                            key={method.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <method.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{method.label}</p>
                                <p className="text-sm text-muted-foreground">{method.desc}</p>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                paymentMethod === method.id ? "border-primary" : "border-muted-foreground"
                              }`}>
                                {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Card Details Form */}
                    {paymentMethod === "card" && (
                      <Card className="p-5">
                        <h4 className="font-semibold text-foreground mb-4">Card Details</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Card Number</label>
                            <Input placeholder="1234 5678 9012 3456" className="font-mono" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-foreground mb-2 block">Expiry Date</label>
                              <Input placeholder="MM/YY" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground mb-2 block">CVV</label>
                              <Input placeholder="123" type="password" />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Cardholder Name</label>
                            <Input placeholder="John Doe" />
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* Security Badge */}
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Shield className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium text-foreground text-sm">Secure Payment</p>
                        <p className="text-xs text-muted-foreground">Your payment is protected with 256-bit SSL encryption</p>
                      </div>
                      <Lock className="w-5 h-5 text-muted-foreground ml-auto" />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 sticky top-4">
                      <h4 className="font-semibold text-foreground mb-4">Order Summary</h4>
                      
                      {/* Trip Overview */}
                      <div className="p-4 bg-background rounded-lg mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{destination}</p>
                            <p className="text-sm text-muted-foreground">
                              {dateRange?.from && dateRange?.to 
                                ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                                : "Dates not set"}
                            </p>
                            <p className="text-sm text-muted-foreground">{travelers} travelers</p>
                          </div>
                        </div>
                      </div>

                      {/* Included Items */}
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-foreground">Included:</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">1 Event</span>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{selectedDestinations.length} Places</span>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{selectedRestaurants.length} Restaurants</span>
                          {includeFlights && <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Flights</span>}
                          {includeAccommodation && <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Hotel</span>}
                        </div>
                      </div>

                      {/* Final Total */}
                      <div className="border-t border-primary/30 pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-lg text-foreground">Total Amount</span>
                          <span className="font-bold text-3xl text-primary">₦{calculateTotals().total.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          By completing this purchase, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 pt-8">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} size="lg" disabled={isProcessingPayment}>
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isProcessingPayment}
                size="lg"
                className="ml-auto group"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : step === 7 ? (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Pay ₦{calculateTotals().total.toLocaleString()}
                  </>
                ) : step === 6 ? (
                  <>
                    Proceed to Payment
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveExperience;
