import { useEffect, useState } from "react";
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
import { dashboardService } from "@/lib/api/services/dashboard.service";
import type { DashboardOverview } from "@/types";

interface DashboardOverviewProps {
  onNavigate: (view: DashboardView) => void;
}

const DashboardOverview = ({ onNavigate }: DashboardOverviewProps) => {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getUserOverview();
        setOverview(data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
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

  if (error || !overview) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {error || "Unable to load dashboard data"}
          </p>
        </div>
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            Please try refreshing the page or contact support if the problem persists.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        {overview.profile.profile_photo && (
          <img
            src={overview.profile.profile_photo}
            alt={`${overview.profile.name}'s profile`}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {overview.profile.name}!
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your travels</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Trips</p>
                <p className="text-2xl font-bold text-foreground mt-1">{overview.quick_stats.upcoming}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted text-blue-500">
                <Plane className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saved Places</p>
                <p className="text-2xl font-bold text-foreground mt-1">{overview.quick_stats.favorites}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted text-rose-500">
                <Heart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Interactions</p>
                <p className="text-2xl font-bold text-foreground mt-1">{overview.quick_stats.experiences}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted text-violet-500">
                <Bot className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {overview.spending.currency}{overview.spending.total_spent.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-muted text-emerald-500">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
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
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Plane className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming trips yet</p>
              <p className="text-sm mt-1">Start planning your next adventure!</p>
            </div>
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
            <div className="text-center py-8 text-muted-foreground">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm mt-1">Your travel journey starts here!</p>
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
                I'm here to help you plan amazing trips! Start by telling me where you'd like to go or what type of experience you're looking for.
              </p>
            </div>
            <Button onClick={() => onNavigate("ai-agents")}>
              Start Planning <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
