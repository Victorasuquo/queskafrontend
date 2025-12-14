import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  MapPin,
  Users,
  Plane,
  Hotel,
  Utensils,
  Camera,
  MoreVertical,
} from "lucide-react";

const trips = {
  upcoming: [
    {
      id: 1,
      destination: "Calabar, Nigeria",
      dates: "Dec 20, 2024 - Jan 2, 2025",
      image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=400",
      status: "confirmed",
      progress: 85,
      travelers: 2,
      budget: "$2,400",
      spent: "$1,850",
      activities: [
        { type: "flight", name: "Lagos → Calabar", date: "Dec 20" },
        { type: "hotel", name: "Calabar Marina Resort", date: "Dec 20-Jan 2" },
        { type: "event", name: "Calabar Carnival", date: "Dec 26" },
        { type: "dining", name: "Obudu Mountain Cuisine", date: "Dec 28" },
      ],
    },
    {
      id: 2,
      destination: "Rio de Janeiro, Brazil",
      dates: "Feb 14 - Feb 21, 2025",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400",
      status: "planning",
      progress: 45,
      travelers: 4,
      budget: "$5,600",
      spent: "$2,100",
      activities: [
        { type: "flight", name: "Lagos → Rio", date: "Feb 14" },
        { type: "hotel", name: "Copacabana Palace", date: "Feb 14-21" },
        { type: "event", name: "Rio Carnival", date: "Feb 16" },
      ],
    },
  ],
  past: [
    {
      id: 3,
      destination: "Ibeno Beach, Nigeria",
      dates: "Oct 5 - Oct 8, 2024",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      status: "completed",
      progress: 100,
      travelers: 2,
      budget: "$800",
      spent: "$756",
      rating: 4.8,
    },
    {
      id: 4,
      destination: "Cape Town, South Africa",
      dates: "Aug 10 - Aug 17, 2024",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400",
      status: "completed",
      progress: 100,
      travelers: 3,
      budget: "$3,200",
      spent: "$3,050",
      rating: 4.9,
    },
  ],
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "flight": return Plane;
    case "hotel": return Hotel;
    case "event": return Camera;
    case "dining": return Utensils;
    default: return MapPin;
  }
};

const MyTrips = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Trips</h1>
          <p className="text-muted-foreground mt-1">Manage all your travel plans in one place</p>
        </div>
        <Button>
          <Plane className="h-4 w-4 mr-2" />
          Plan New Trip
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="upcoming">Upcoming ({trips.upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({trips.past.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {trips.upcoming.map((trip) => (
            <Card key={trip.id} className="bg-card border-border overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-80 h-48 lg:h-auto">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-foreground">{trip.destination}</h2>
                        <Badge variant={trip.status === "confirmed" ? "default" : "secondary"}>
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {trip.dates}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {trip.travelers} travelers
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-lg font-semibold text-foreground">{trip.budget}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-xs text-muted-foreground">Spent</p>
                      <p className="text-lg font-semibold text-foreground">{trip.spent}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted col-span-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Planning Progress</span>
                        <span className="text-foreground font-medium">{trip.progress}%</span>
                      </div>
                      <Progress value={trip.progress} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Booked Activities</h3>
                    <div className="flex flex-wrap gap-2">
                      {trip.activities?.map((activity, idx) => {
                        const Icon = getActivityIcon(activity.type);
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-sm"
                          >
                            <Icon className="h-4 w-4 text-primary" />
                            <span className="text-foreground">{activity.name}</span>
                            <span className="text-muted-foreground">• {activity.date}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.past.map((trip) => (
              <Card key={trip.id} className="bg-card border-border overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{trip.destination}</h3>
                    <p className="text-white/80 text-sm">{trip.dates}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                        <p className="font-semibold text-foreground">{trip.spent}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="font-semibold text-foreground">⭐ {trip.rating}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTrips;
