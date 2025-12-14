import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Plane,
  Hotel,
  CreditCard,
  Bot,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Check,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "booking",
    title: "Flight Booking Confirmed",
    message: "Your flight from Lagos to Calabar on Dec 20 has been confirmed.",
    time: "2 hours ago",
    read: false,
    icon: Plane,
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    type: "ai",
    title: "AI Itinerary Updated",
    message: "Your Calabar trip itinerary has been optimized based on weather forecast.",
    time: "5 hours ago",
    read: false,
    icon: Bot,
    iconColor: "text-violet-500",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Successful",
    message: "Payment of $850 for Calabar Marina Resort has been processed.",
    time: "1 day ago",
    read: true,
    icon: CreditCard,
    iconColor: "text-emerald-500",
  },
  {
    id: 4,
    type: "alert",
    title: "Price Drop Alert",
    message: "Prices for your saved hotel in Rio dropped by 15%!",
    time: "1 day ago",
    read: true,
    icon: AlertCircle,
    iconColor: "text-amber-500",
  },
  {
    id: 5,
    type: "booking",
    title: "Hotel Reservation Reminder",
    message: "Your check-in at Calabar Marina Resort is in 5 days.",
    time: "2 days ago",
    read: true,
    icon: Hotel,
    iconColor: "text-rose-500",
  },
  {
    id: 6,
    type: "social",
    title: "New Recommendation",
    message: "Based on your interests, check out Obudu Mountain Resort.",
    time: "3 days ago",
    read: true,
    icon: Heart,
    iconColor: "text-pink-500",
  },
];

const activityLog = [
  {
    id: 1,
    action: "Logged in from Lagos, Nigeria",
    time: "Today, 10:30 AM",
    status: "success",
  },
  {
    id: 2,
    action: "Updated profile information",
    time: "Today, 9:15 AM",
    status: "success",
  },
  {
    id: 3,
    action: "Booked flight to Calabar",
    time: "Yesterday, 3:45 PM",
    status: "success",
  },
  {
    id: 4,
    action: "Password changed successfully",
    time: "Dec 8, 2024, 11:20 AM",
    status: "success",
  },
  {
    id: 5,
    action: "Payment method added",
    time: "Dec 5, 2024, 2:30 PM",
    status: "success",
  },
  {
    id: 6,
    action: "Trip to Rio saved to wishlist",
    time: "Dec 3, 2024, 5:00 PM",
    status: "success",
  },
];

const NotificationsActivity = () => {
  const [notificationList, setNotificationList] = useState(notifications);

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotificationList(
      notificationList.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notificationList.filter((n) => !n.read).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications & Activity</h1>
          <p className="text-muted-foreground mt-1">Stay updated on your travel activities</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {notificationList.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors ${
                      !notification.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-muted ${notification.iconColor}`}>
                      <notification.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-foreground flex items-center gap-2">
                            {notification.title}
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      </div>
                      {index < activityLog.length - 1 && (
                        <div className="absolute top-10 left-1/2 w-px h-8 bg-border -translate-x-1/2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsActivity;
