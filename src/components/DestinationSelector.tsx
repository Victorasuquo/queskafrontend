import { Button } from "@/components/ui/button";
import { MapPin, Search, Calendar as CalendarIcon, Users, Minus, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import destinationImage from "@/assets/destination-planning.jpg";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";

const DestinationSelector = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [travelers, setTravelers] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const dateDisplay = dateRange?.from
      ? dateRange.to
        ? `${format(dateRange.from, "PP")} - ${format(dateRange.to, "PP")}`
        : format(dateRange.from, "PP")
      : "Any date";

    const searchData = {
      destination: searchQuery || "Any destination",
      dateRange: dateDisplay,
      travelers: travelers,
    };

    toast.success("Search submitted!", {
      description: `Searching for ${searchData.destination} from ${searchData.dateRange} for ${searchData.travelers} traveler${searchData.travelers > 1 ? 's' : ''}`,
    });

    console.log("Search data:", searchData);
  };

  const handlePopularDestination = (destination: string) => {
    setSearchQuery(destination);
  };

  return (
    <section className="min-h-screen flex items-center bg-background relative overflow-hidden">
      <div className="container px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Plan Your Journey</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Where are you traveling to?
            </h2>

            <p className="text-xl text-muted-foreground">
              Discover hidden gems and popular destinations across Akwa Ibom State. From pristine beaches to cultural landmarks, find your perfect escape.
            </p>

            {/* Search Interface */}
            <form onSubmit={handleSearch} className="bg-card p-6 rounded-2xl shadow-lg space-y-4 border border-border">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                {/* Date Range Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal bg-muted/50 border-none hover:bg-muted",
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

                {/* Travelers Selector */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal bg-muted/50 border-none hover:bg-muted"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {travelers} Traveler{travelers > 1 ? 's' : ''}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64" align="start">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Number of Travelers</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Travelers</span>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                            disabled={travelers <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{travelers}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setTravelers(Math.min(20, travelers + 1))}
                            disabled={travelers >= 20}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button type="submit" size="lg" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </form>

            {/* Popular Destinations */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Popular destinations:</p>
              <div className="flex flex-wrap gap-2">
                {["Ibeno Beach", "Ikot Abasi", "Eket", "Oron", "Uyo City"].map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => handlePopularDestination(dest)}
                    className="px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium transition-colors"
                  >
                    {dest}
                  </button>
                ))}
              </div>
              <div className="pt-4">
                <Button variant="outline" asChild>
                  <Link to="/destinations">
                    View All Destinations
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={destinationImage}
                alt="Travel destination planning interface"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border">
              <div className="text-4xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationSelector;
