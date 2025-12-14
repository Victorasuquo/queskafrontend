import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Bot,
  Sparkles,
  Route,
  Utensils,
  Hotel,
  Clock,
  CheckCircle,
  Loader2,
  ArrowRight,
  TrendingUp,
  Calendar,
  MapPin,
} from "lucide-react";

const aiAgents = [
  {
    id: 1,
    name: "Trip Planner",
    description: "Optimizes your travel itineraries",
    status: "active",
    icon: Route,
    color: "bg-blue-500",
    lastActivity: "2 hours ago",
    tasksCompleted: 12,
    currentTask: "Optimizing Calabar itinerary",
  },
  {
    id: 2,
    name: "Restaurant Scout",
    description: "Finds dining options matching your preferences",
    status: "active",
    icon: Utensils,
    color: "bg-orange-500",
    lastActivity: "4 hours ago",
    tasksCompleted: 28,
    currentTask: "Finding local cuisine in Calabar",
  },
  {
    id: 3,
    name: "Accommodation Finder",
    description: "Searches for the best stays within your budget",
    status: "idle",
    icon: Hotel,
    color: "bg-violet-500",
    lastActivity: "1 day ago",
    tasksCompleted: 8,
    currentTask: null,
  },
  {
    id: 4,
    name: "Budget Optimizer",
    description: "Tracks spending and finds savings",
    status: "active",
    icon: TrendingUp,
    color: "bg-emerald-500",
    lastActivity: "30 minutes ago",
    tasksCompleted: 45,
    currentTask: "Analyzing trip expenses",
  },
];

const recentAIActions = [
  {
    id: 1,
    agent: "Trip Planner",
    action: "Reorganized your Calabar itinerary to avoid peak traffic times",
    impact: "Saved 2.5 hours of travel time",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    agent: "Restaurant Scout",
    action: "Found 3 new restaurants matching your preferences",
    impact: "Added to recommendations",
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    agent: "Budget Optimizer",
    action: "Detected potential savings on Rio flight booking",
    impact: "Potential savings: $120",
    time: "6 hours ago",
    status: "pending_action",
  },
  {
    id: 4,
    agent: "Trip Planner",
    action: "Weather alert: Rain expected Dec 24-25 in Calabar",
    impact: "Suggested indoor activities",
    time: "1 day ago",
    status: "completed",
  },
];

const aiStats = {
  totalInteractions: 156,
  timeSaved: "18 hours",
  moneySaved: "$340",
  recommendationsAccepted: 42,
};

const AIAgentActivities = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Agents</h1>
        <p className="text-muted-foreground mt-1">
          Your personal travel assistants working behind the scenes
        </p>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <Sparkles className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{aiStats.totalInteractions}</p>
            <p className="text-sm text-muted-foreground">Total Interactions</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">{aiStats.timeSaved}</p>
            <p className="text-sm text-muted-foreground">Time Saved</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-emerald-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">{aiStats.moneySaved}</p>
            <p className="text-sm text-muted-foreground">Money Saved</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-violet-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">{aiStats.recommendationsAccepted}</p>
            <p className="text-sm text-muted-foreground">Recommendations Used</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Agents */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Your AI Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiAgents.map((agent) => (
            <Card key={agent.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${agent.color}`}>
                    <agent.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{agent.name}</h3>
                      <Badge
                        variant={agent.status === "active" ? "default" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        {agent.status === "active" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                    
                    {agent.currentTask && (
                      <div className="p-3 rounded-lg bg-muted mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-foreground">{agent.currentTask}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {agent.tasksCompleted} tasks completed
                      </span>
                      <span className="text-muted-foreground">
                        Last active: {agent.lastActivity}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent AI Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent AI Actions</CardTitle>
          <CardDescription>What your agents have been doing for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAIActions.map((action) => (
              <div
                key={action.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{action.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {action.agent}
                        </Badge>
                        <span className="text-sm text-emerald-500">{action.impact}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{action.time}</span>
                  </div>
                  {action.status === "pending_action" && (
                    <Button size="sm" className="mt-3">
                      Review Savings <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-primary">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI Insights for You</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Best time to visit Calabar Carnival is Dec 26-28 for optimal experience
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  3 hidden gems near your hotel have high ratings from similar travelers
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  You could save $85 by booking Rio activities 2 weeks earlier
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAgentActivities;
