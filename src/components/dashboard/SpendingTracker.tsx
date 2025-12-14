import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plane,
  Hotel,
  Utensils,
  Camera,
  CreditCard,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const spendingOverview = {
  totalSpent: 4280,
  thisMonth: 1850,
  lastMonth: 2430,
  budgetTotal: 8000,
  budgetUsed: 53.5,
};

const spendingByCategory = [
  { category: "Flights", amount: 1650, icon: Plane, color: "bg-blue-500", percentage: 38.5 },
  { category: "Accommodation", amount: 1420, icon: Hotel, color: "bg-violet-500", percentage: 33.2 },
  { category: "Dining", amount: 580, icon: Utensils, color: "bg-orange-500", percentage: 13.5 },
  { category: "Activities", amount: 450, icon: Camera, color: "bg-emerald-500", percentage: 10.5 },
  { category: "Other", amount: 180, icon: CreditCard, color: "bg-gray-500", percentage: 4.3 },
];

const recentTransactions = [
  {
    id: 1,
    description: "Calabar Marina Resort - Deposit",
    amount: -850,
    date: "Dec 9, 2024",
    category: "Accommodation",
    status: "completed",
  },
  {
    id: 2,
    description: "Flight - Lagos to Calabar",
    amount: -425,
    date: "Dec 8, 2024",
    category: "Flights",
    status: "completed",
  },
  {
    id: 3,
    description: "Calabar Carnival VIP Tickets",
    amount: -150,
    date: "Dec 7, 2024",
    category: "Activities",
    status: "completed",
  },
  {
    id: 4,
    description: "Refund - Hotel Cancellation",
    amount: 320,
    date: "Dec 5, 2024",
    category: "Accommodation",
    status: "completed",
  },
  {
    id: 5,
    description: "Restaurant Reservation - Obudu",
    amount: -85,
    date: "Dec 4, 2024",
    category: "Dining",
    status: "pending",
  },
];

const tripBudgets = [
  {
    id: 1,
    trip: "Calabar, Nigeria",
    budget: 2400,
    spent: 1850,
    remaining: 550,
  },
  {
    id: 2,
    trip: "Rio de Janeiro",
    budget: 5600,
    spent: 2100,
    remaining: 3500,
  },
];

const SpendingTracker = () => {
  const monthChange = ((spendingOverview.thisMonth - spendingOverview.lastMonth) / spendingOverview.lastMonth) * 100;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Spending Tracker</h1>
          <p className="text-muted-foreground mt-1">Track and manage your travel expenses</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">${spendingOverview.totalSpent.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">${spendingOverview.thisMonth.toLocaleString()}</p>
                <div className={`flex items-center gap-1 text-sm mt-1 ${monthChange < 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {monthChange < 0 ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                  <span>{Math.abs(monthChange).toFixed(1)}% vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget Used</p>
                <p className="text-2xl font-bold text-foreground">{spendingOverview.budgetUsed}%</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            <Progress value={spendingOverview.budgetUsed} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold text-foreground">${spendingOverview.budgetTotal.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-violet-500/10">
                <CreditCard className="h-6 w-6 text-violet-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending by Category */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">By Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {spendingByCategory.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-foreground">{item.category}</span>
                  </div>
                  <span className="font-semibold text-foreground">${item.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="h-2 flex-1" />
                  <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${transaction.amount > 0 ? "bg-emerald-500/10" : "bg-muted"}`}>
                      {transaction.amount > 0 ? (
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.amount > 0 ? "text-emerald-500" : "text-foreground"}`}>
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount < 0 ? "-" : ""}${Math.abs(transaction.amount)}
                    </p>
                    {transaction.status === "pending" && (
                      <Badge variant="secondary" className="text-xs mt-1">Pending</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trip Budgets */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Trip Budgets</CardTitle>
          <CardDescription>Track spending for each of your upcoming trips</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tripBudgets.map((trip) => {
              const percentUsed = (trip.spent / trip.budget) * 100;
              return (
                <div key={trip.id} className="p-4 rounded-xl bg-muted/50">
                  <h3 className="font-semibold text-foreground mb-4">{trip.trip}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Spent</span>
                      <span className="font-medium text-foreground">${trip.spent.toLocaleString()}</span>
                    </div>
                    <Progress value={percentUsed} className="h-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className="font-medium text-emerald-500">${trip.remaining.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="text-muted-foreground">Total Budget</span>
                      <span className="font-semibold text-foreground">${trip.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpendingTracker;
