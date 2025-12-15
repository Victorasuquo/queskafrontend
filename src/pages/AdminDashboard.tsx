import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Users,
    Building2,
    TrendingUp,
    DollarSign,
    MapPin,
    Calendar,
    Search,
    Bell,
    Settings,
    LogOut,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    UserPlus,
    Download,
    Filter,
    RefreshCw,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    Activity,
    Globe,
    MessageSquare,
    FileText,
    BarChart3,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    Sparkles,
    Mail,
    Phone,
    Home
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import queskaLogo from "@/assets/queska-logo.png";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [userFilter, setUserFilter] = useState("all");
    const [vendorFilter, setVendorFilter] = useState("all");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Check admin authentication
    useEffect(() => {
        const adminAuth = localStorage.getItem("adminAuth");
        if (!adminAuth) {
            navigate("/admin");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        toast.success("Logged out successfully");
        navigate("/admin");
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsRefreshing(false);
        toast.success("Data refreshed");
    };

    // Dashboard Stats
    const stats = [
        {
            title: "Total Users",
            value: "254,892",
            change: "+12.5%",
            trend: "up",
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            title: "Active Vendors",
            value: "2,547",
            change: "+8.2%",
            trend: "up",
            icon: Building2,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        {
            title: "Total Revenue",
            value: "₦45.2M",
            change: "+23.1%",
            trend: "up",
            icon: DollarSign,
            color: "text-green-500",
            bgColor: "bg-green-500/10"
        },
        {
            title: "Active Trips",
            value: "12,458",
            change: "-2.4%",
            trend: "down",
            icon: MapPin,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10"
        }
    ];

    // Recent Users Data
    const recentUsers = [
        {
            id: 1,
            name: "Adaeze Okonkwo",
            email: "adaeze@gmail.com",
            avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
            status: "active",
            joined: "Dec 14, 2025",
            trips: 8,
            spent: "₦245,000"
        },
        {
            id: 2,
            name: "Emeka Nwachukwu",
            email: "emeka.n@yahoo.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            status: "active",
            joined: "Dec 13, 2025",
            trips: 3,
            spent: "₦89,500"
        },
        {
            id: 3,
            name: "Chioma Eze",
            email: "chioma.eze@outlook.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            status: "pending",
            joined: "Dec 12, 2025",
            trips: 0,
            spent: "₦0"
        },
        {
            id: 4,
            name: "Oluwaseun Adeyemi",
            email: "seun.adeyemi@gmail.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            status: "active",
            joined: "Dec 11, 2025",
            trips: 12,
            spent: "₦567,000"
        },
        {
            id: 5,
            name: "Blessing Okoro",
            email: "blessing.o@hotmail.com",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            status: "suspended",
            joined: "Dec 10, 2025",
            trips: 2,
            spent: "₦45,000"
        }
    ];

    // Vendors Data
    const vendors = [
        {
            id: 1,
            name: "Lagos Beach Resort",
            type: "Hotel",
            email: "info@lagosbeach.com",
            status: "verified",
            listings: 15,
            revenue: "₦12.5M",
            rating: 4.8
        },
        {
            id: 2,
            name: "Calabar Adventures",
            type: "Experience",
            email: "book@calabaradv.com",
            status: "verified",
            listings: 8,
            revenue: "₦5.2M",
            rating: 4.9
        },
        {
            id: 3,
            name: "Abuja City Tours",
            type: "Tour",
            email: "tours@abujacity.ng",
            status: "pending",
            listings: 5,
            revenue: "₦1.8M",
            rating: 4.5
        },
        {
            id: 4,
            name: "Port Harcourt Stays",
            type: "Hotel",
            email: "hello@phstays.com",
            status: "verified",
            listings: 22,
            revenue: "₦8.9M",
            rating: 4.7
        },
        {
            id: 5,
            name: "Enugu Heritage",
            type: "Experience",
            email: "info@enuguheritage.com",
            status: "suspended",
            listings: 3,
            revenue: "₦450K",
            rating: 3.9
        }
    ];

    // Recent Activities
    const activities = [
        { id: 1, action: "New user registration", user: "Adaeze Okonkwo", time: "2 minutes ago", type: "user" },
        { id: 2, action: "Vendor application submitted", user: "Lagos Beach Resort", time: "15 minutes ago", type: "vendor" },
        { id: 3, action: "Booking completed", user: "Emeka Nwachukwu", time: "32 minutes ago", type: "booking" },
        { id: 4, action: "Review flagged for moderation", user: "Anonymous", time: "1 hour ago", type: "alert" },
        { id: 5, action: "Payment processed", user: "Chioma Eze", time: "2 hours ago", type: "payment" },
        { id: 6, action: "Vendor listing approved", user: "Calabar Adventures", time: "3 hours ago", type: "vendor" },
        { id: 7, action: "Support ticket opened", user: "Blessing Okoro", time: "4 hours ago", type: "support" },
        { id: 8, action: "System backup completed", user: "System", time: "6 hours ago", type: "system" }
    ];

    // System Metrics
    const systemMetrics = [
        { label: "Server Uptime", value: 99.9, color: "bg-green-500" },
        { label: "API Response Time", value: 85, color: "bg-blue-500" },
        { label: "Database Load", value: 42, color: "bg-purple-500" },
        { label: "Storage Used", value: 67, color: "bg-orange-500" }
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
            case "verified":
                return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
            case "pending":
                return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
            case "suspended":
                return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Suspended</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "user": return <UserPlus className="w-4 h-4 text-blue-500" />;
            case "vendor": return <Building2 className="w-4 h-4 text-purple-500" />;
            case "booking": return <Calendar className="w-4 h-4 text-green-500" />;
            case "alert": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            case "payment": return <DollarSign className="w-4 h-4 text-emerald-500" />;
            case "support": return <MessageSquare className="w-4 h-4 text-orange-500" />;
            case "system": return <Settings className="w-4 h-4 text-slate-500" />;
            default: return <Activity className="w-4 h-4 text-slate-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-md border-b border-slate-700">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-3">
                            <img src={queskaLogo} alt="Queska" className="h-10 w-auto" />
                            <div>
                                <span className="text-xs text-slate-400">Admin Dashboard</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input
                                placeholder="Search users, vendors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                            />
                        </div>

                        {/* Refresh */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleRefresh}
                            className="text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </Button>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </Button>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-700">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">AD</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:inline text-sm">Admin</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                                <DropdownMenuLabel className="text-slate-400">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-700" />
                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 focus:text-white">
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 focus:text-white">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Activity Log
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-700" />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 min-h-[calc(100vh-73px)] bg-slate-800/50 border-r border-slate-700 p-4">
                    <nav className="space-y-2">
                        {[
                            { id: "overview", label: "Overview", icon: Home },
                            { id: "users", label: "Users", icon: Users },
                            { id: "vendors", label: "Vendors", icon: Building2 },
                            { id: "analytics", label: "Analytics", icon: BarChart3 },
                            { id: "bookings", label: "Bookings", icon: Calendar },
                            { id: "content", label: "Content", icon: FileText },
                            { id: "support", label: "Support", icon: MessageSquare },
                            { id: "settings", label: "Settings", icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                    ? "bg-primary text-primary-foreground"
                                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Mobile Tabs */}
                    <div className="lg:hidden mb-6 overflow-x-auto">
                        <div className="flex gap-2 min-w-max">
                            {["overview", "users", "vendors", "analytics"].map((tab) => (
                                <Button
                                    key={tab}
                                    variant={activeTab === tab ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setActiveTab(tab)}
                                    className={activeTab !== tab ? "border-slate-600 text-slate-400" : ""}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat, index) => (
                                    <Card key={index} className="bg-slate-800/50 border-slate-700">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm text-slate-400">{stat.title}</p>
                                                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                                    <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"
                                                        }`}>
                                                        {stat.trend === "up" ? (
                                                            <ArrowUpRight className="w-4 h-4" />
                                                        ) : (
                                                            <ArrowDownRight className="w-4 h-4" />
                                                        )}
                                                        {stat.change}
                                                    </div>
                                                </div>
                                                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Recent Activity */}
                                <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-white">Recent Activity</CardTitle>
                                            <CardDescription className="text-slate-400">Latest actions across the platform</CardDescription>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                            View All
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {activities.map((activity) => (
                                                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors">
                                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                                                        {getActivityIcon(activity.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-white">{activity.action}</p>
                                                        <p className="text-xs text-slate-500">{activity.user}</p>
                                                    </div>
                                                    <span className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* System Health */}
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">System Health</CardTitle>
                                        <CardDescription className="text-slate-400">Real-time infrastructure metrics</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {systemMetrics.map((metric, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">{metric.label}</span>
                                                    <span className="text-white font-medium">{metric.value}%</span>
                                                </div>
                                                <Progress value={metric.value} className={`h-2 ${metric.color}`} />
                                            </div>
                                        ))}
                                        <div className="pt-4 border-t border-slate-700">
                                            <div className="flex items-center gap-2 text-green-500">
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="text-sm">All systems operational</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Actions */}
                            <Card className="bg-slate-800/50 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: "Add User", icon: UserPlus, color: "bg-blue-500" },
                                            { label: "Approve Vendor", icon: CheckCircle, color: "bg-green-500" },
                                            { label: "View Reports", icon: BarChart3, color: "bg-purple-500" },
                                            { label: "Export Data", icon: Download, color: "bg-orange-500" },
                                        ].map((action, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                className="h-auto py-4 flex flex-col items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                                            >
                                                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                                                    <action.icon className="w-5 h-5 text-white" />
                                                </div>
                                                {action.label}
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === "users" && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">User Management</h2>
                                    <p className="text-slate-400">Manage and monitor all platform users</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="border-slate-600 text-slate-300">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                    <Button>
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Add User
                                    </Button>
                                </div>
                            </div>

                            {/* Filters */}
                            <Card className="bg-slate-800/50 border-slate-700">
                                <CardContent className="p-4">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <Input
                                                placeholder="Search users by name or email..."
                                                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                                            />
                                        </div>
                                        <Select value={userFilter} onValueChange={setUserFilter}>
                                            <SelectTrigger className="w-[180px] bg-slate-700/50 border-slate-600 text-white">
                                                <SelectValue placeholder="Filter by status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-slate-700">
                                                <SelectItem value="all">All Users</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="suspended">Suspended</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Users Table */}
                            <Card className="bg-slate-800/50 border-slate-700">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-slate-700 hover:bg-transparent">
                                                <TableHead className="text-slate-400">User</TableHead>
                                                <TableHead className="text-slate-400">Status</TableHead>
                                                <TableHead className="text-slate-400">Joined</TableHead>
                                                <TableHead className="text-slate-400">Trips</TableHead>
                                                <TableHead className="text-slate-400">Total Spent</TableHead>
                                                <TableHead className="text-slate-400 text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentUsers.map((user) => (
                                                <TableRow key={user.id} className="border-slate-700 hover:bg-slate-700/30">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="w-10 h-10">
                                                                <AvatarImage src={user.avatar} />
                                                                <AvatarFallback className="bg-slate-600 text-white">
                                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="font-medium text-white">{user.name}</p>
                                                                <p className="text-sm text-slate-500">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                                                    <TableCell className="text-slate-300">{user.joined}</TableCell>
                                                    <TableCell className="text-slate-300">{user.trips}</TableCell>
                                                    <TableCell className="text-slate-300">{user.spent}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                                                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                                                                    <Eye className="w-4 h-4 mr-2" />
                                                                    View Profile
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                                                                    <Edit className="w-4 h-4 mr-2" />
                                                                    Edit User
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                                                                    <Mail className="w-4 h-4 mr-2" />
                                                                    Send Email
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator className="bg-slate-700" />
                                                                <DropdownMenuItem className="text-red-400 focus:bg-red-500/10">
                                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                                    Delete User
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Vendors Tab */}
                    {activeTab === "vendors" && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Vendor Management</h2>
                                    <p className="text-slate-400">Review and manage vendor accounts</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="border-slate-600 text-slate-300">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filter
                                    </Button>
                                    <Button>
                                        <Building2 className="w-4 h-4 mr-2" />
                                        Add Vendor
                                    </Button>
                                </div>
                            </div>

                            {/* Vendor Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                    { label: "Total Vendors", value: "2,547", icon: Building2 },
                                    { label: "Pending Approval", value: "23", icon: Clock },
                                    { label: "Verified", value: "2,489", icon: CheckCircle },
                                    { label: "Suspended", value: "35", icon: XCircle },
                                ].map((stat, index) => (
                                    <Card key={index} className="bg-slate-800/50 border-slate-700">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                                                <stat.icon className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                                <p className="text-sm text-slate-400">{stat.label}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Vendors Table */}
                            <Card className="bg-slate-800/50 border-slate-700">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-slate-700 hover:bg-transparent">
                                                <TableHead className="text-slate-400">Vendor</TableHead>
                                                <TableHead className="text-slate-400">Type</TableHead>
                                                <TableHead className="text-slate-400">Status</TableHead>
                                                <TableHead className="text-slate-400">Listings</TableHead>
                                                <TableHead className="text-slate-400">Revenue</TableHead>
                                                <TableHead className="text-slate-400">Rating</TableHead>
                                                <TableHead className="text-slate-400 text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {vendors.map((vendor) => (
                                                <TableRow key={vendor.id} className="border-slate-700 hover:bg-slate-700/30">
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium text-white">{vendor.name}</p>
                                                            <p className="text-sm text-slate-500">{vendor.email}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                                                            {vendor.type}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                                                    <TableCell className="text-slate-300">{vendor.listings}</TableCell>
                                                    <TableCell className="text-slate-300">{vendor.revenue}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <Sparkles className="w-4 h-4 text-yellow-500" />
                                                            <span className="text-white">{vendor.rating}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                                                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                                                                    <Eye className="w-4 h-4 mr-2" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                                    Approve
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700">
                                                                    <Edit className="w-4 h-4 mr-2" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator className="bg-slate-700" />
                                                                <DropdownMenuItem className="text-red-400 focus:bg-red-500/10">
                                                                    <XCircle className="w-4 h-4 mr-2" />
                                                                    Suspend
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === "analytics" && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
                                    <p className="text-slate-400">Platform performance insights</p>
                                </div>
                                <div className="flex gap-2">
                                    <Select defaultValue="7days">
                                        <SelectTrigger className="w-[180px] bg-slate-700/50 border-slate-600 text-white">
                                            <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="7days">Last 7 days</SelectItem>
                                            <SelectItem value="30days">Last 30 days</SelectItem>
                                            <SelectItem value="90days">Last 90 days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline" className="border-slate-600 text-slate-300">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Report
                                    </Button>
                                </div>
                            </div>

                            {/* Analytics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { label: "Page Views", value: "1.2M", change: "+15.3%", icon: Eye },
                                    { label: "Bookings", value: "8,432", change: "+22.1%", icon: Calendar },
                                    { label: "Conversion Rate", value: "3.8%", change: "+0.5%", icon: TrendingUp },
                                    { label: "Avg. Session", value: "4m 32s", change: "+12s", icon: Clock },
                                ].map((stat, index) => (
                                    <Card key={index} className="bg-slate-800/50 border-slate-700">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <stat.icon className="w-5 h-5 text-slate-400" />
                                                <span className="text-sm text-green-500">{stat.change}</span>
                                            </div>
                                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                                            <p className="text-sm text-slate-400">{stat.label}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Charts Placeholder */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardHeader>
                                        <CardTitle className="text-white flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5" />
                                            Revenue Overview
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-64 flex items-center justify-center bg-slate-700/30 rounded-lg">
                                            <div className="text-center text-slate-500">
                                                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <p>Revenue chart visualization</p>
                                                <p className="text-sm">Integrate with chart library</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardHeader>
                                        <CardTitle className="text-white flex items-center gap-2">
                                            <PieChart className="w-5 h-5" />
                                            User Distribution
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-64 flex items-center justify-center bg-slate-700/30 rounded-lg">
                                            <div className="text-center text-slate-500">
                                                <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <p>User distribution chart</p>
                                                <p className="text-sm">Integrate with chart library</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Top Destinations */}
                            <Card className="bg-slate-800/50 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Top Destinations</CardTitle>
                                    <CardDescription className="text-slate-400">Most popular travel destinations this month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Lagos", bookings: 2456, percentage: 85 },
                                            { name: "Abuja", bookings: 1823, percentage: 72 },
                                            { name: "Port Harcourt", bookings: 1245, percentage: 58 },
                                            { name: "Calabar", bookings: 987, percentage: 45 },
                                            { name: "Enugu", bookings: 654, percentage: 32 },
                                        ].map((destination, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white font-medium">{destination.name}</span>
                                                    <span className="text-slate-400">{destination.bookings.toLocaleString()} bookings</span>
                                                </div>
                                                <Progress value={destination.percentage} className="h-2" />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Other tabs placeholder */}
                    {["bookings", "content", "support", "settings"].includes(activeTab) && (
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <Settings className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                                </h3>
                                <p className="text-slate-400">This section is under development</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
