import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import MyTrips from "@/components/dashboard/MyTrips";
import SavedWishlist from "@/components/dashboard/SavedWishlist";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import NotificationsActivity from "@/components/dashboard/NotificationsActivity";
import AIAgentActivities from "@/components/dashboard/AIAgentActivities";
import SpendingTracker from "@/components/dashboard/SpendingTracker";

export type DashboardView = 
  | "overview"
  | "trips"
  | "saved"
  | "profile"
  | "notifications"
  | "ai-agents"
  | "spending";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<DashboardView>("overview");

  const renderView = () => {
    switch (currentView) {
      case "overview":
        return <DashboardOverview onNavigate={setCurrentView} />;
      case "trips":
        return <MyTrips />;
      case "saved":
        return <SavedWishlist />;
      case "profile":
        return <ProfileSettings />;
      case "notifications":
        return <NotificationsActivity />;
      case "ai-agents":
        return <AIAgentActivities />;
      case "spending":
        return <SpendingTracker />;
      default:
        return <DashboardOverview onNavigate={setCurrentView} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {renderView()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
