import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Plane,
  Heart,
  Bot,
  Wallet,
  TrendingUp,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import type { DashboardView } from "@/pages/Dashboard";
import { useLoadingState } from "@/hooks/useLoading";
import { DashboardStatsSkeleton, TripListSkeleton, NotificationListSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardOverviewProps {
  onNavigate: (view: DashboardView) => void;
}

const quickStats = [
  { label: "Upcoming Trips", value: "3", icon: Plane, color: "text-blue-500" },
  { label: "Saved Places", value: "24", icon: Heart, color: "text-rose-500" },
  { label: "AI Interactions", value: "156", icon: Bot, color: "text-violet-500" },
  { label: "Total Spent", value: "$4,280", icon: Wallet, color: "text-emerald-500" },
];

const upcomingTrips = [
  {
    id: 1,
    destination: "Calabar, Nigeria",
    date: "Dec 20 - Jan 2",
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=300",
    progress: 85,
  },
  {
    id: 2,
    destination: "Rio de Janeiro, Brazil",
    date: "Feb 14 - Feb 21",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=300",
    progress: 45,
  },
];

const recentActivity = [
  { id: 1, action: "AI planned your Calabar trip itinerary", time: "2 hours ago", icon: Bot },
  { id: 2, action: "Saved 'Marina Resort' to wishlist", time: "5 hours ago", icon: Heart },
  { id: 3, action: "Booked flight to Calabar", time: "1 day ago", icon: Plane },
  { id: 4, action: "Payment of $850 processed", time: "1 day ago", icon: Wallet },
];

const DashboardOverview = ({ onNavigate }: DashboardOverviewProps) => {
  const { isLoading } = useLoadingState(true, 1000);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <DashboardStatsSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <TripListSkeleton count={2} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <NotificationListSkeleton count={4} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your travels</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Trips */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Upcoming Trips</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("trips")}>
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{trip.destination}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{trip.date}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Planning Progress</span>
                      <span className="text-foreground font-medium">{trip.progress}%</span>
                    </div>
                    <Progress value={trip.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("notifications")}>
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground line-clamp-2">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Summary */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-primary">
              <Bot className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Your AI Travel Assistant</h3>
              <p className="text-muted-foreground mt-1">
                I've been working on optimizing your Calabar trip! I found 3 new restaurants matching your preferences
                and adjusted your itinerary to avoid peak crowds.
              </p>
            </div>
            <Button onClick={() => onNavigate("ai-agents")}>
              View Details <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
