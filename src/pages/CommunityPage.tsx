import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    Users,
    MapPin,
    Star,
    Heart,
    MessageCircle,
    Share2,
    Globe,
    Award,
    TrendingUp,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Quote,
    ArrowRight,
    Sparkles,
    Check,
    Send
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// IMAGE INSTRUCTIONS:
// Add community member photos to src/assets/ folder:
// - community-member-1.jpg through community-member-6.jpg
// - community-event-1.jpg, community-event-2.jpg, etc.
// Then replace the placeholder URLs below

import communityImage from "@/assets/community-professional.jpg";

const CommunityPage = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [email, setEmail] = useState("");
    const [story, setStory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { icon: Users, value: "250,000+", label: "Active Travelers", growth: "+45% this year" },
        { icon: MapPin, value: "10,000+", label: "Destinations Explored", growth: "+120 new" },
        { icon: Star, value: "50,000+", label: "Reviews Shared", growth: "4.9 avg rating" },
        { icon: Heart, value: "98%", label: "Satisfaction Rate", growth: "Industry leading" },
    ];

    const testimonials = [
        {
            id: 1,
            name: "Adaeze Okonkwo",
            location: "Lagos, Nigeria",
            avatar: "AO",
            avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
            rating: 5,
            trip: "Calabar Carnival Experience",
            text: "Queska completely transformed how I travel. The AI recommendations led me to hidden gems I would never have found on my own. The Calabar Carnival trip was perfectly planned down to every detail.",
            date: "November 2025"
        },
        {
            id: 2,
            name: "Emeka Nwachukwu",
            location: "Abuja, Nigeria",
            avatar: "EN",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            rating: 5,
            trip: "Family Beach Getaway",
            text: "As a father of three, planning family trips used to be stressful. With Queska, I planned our entire Ibeno Beach vacation in under an hour. The kids loved the activities it suggested!",
            date: "October 2025"
        },
        {
            id: 3,
            name: "Fatima Ibrahim",
            location: "Kano, Nigeria",
            avatar: "FI",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            rating: 5,
            trip: "Solo Adventure Tour",
            text: "Traveling solo as a woman, safety is my priority. Queska's safety features and real-time support gave me the confidence to explore places I'd only dreamed of. Absolutely life-changing!",
            date: "September 2025"
        },
        {
            id: 4,
            name: "Chidi Eze",
            location: "Port Harcourt, Nigeria",
            avatar: "CE",
            avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            rating: 5,
            trip: "Business + Leisure Trip",
            text: "I use Queska for both business and personal travel. The budget tracking alone has saved me thousands. It's like having a personal travel assistant in my pocket 24/7.",
            date: "December 2025"
        },
    ];

    const communityEvents = [
        {
            title: "Queska Travelers Meetup - Lagos",
            date: "January 15, 2026",
            location: "Victoria Island, Lagos",
            attendees: 120,
            type: "In-Person"
        },
        {
            title: "Travel Photography Workshop",
            date: "January 22, 2026",
            location: "Virtual Event",
            attendees: 450,
            type: "Online"
        },
        {
            title: "Calabar Carnival Group Trip",
            date: "December 26-30, 2025",
            location: "Calabar, Cross River",
            attendees: 85,
            type: "Group Trip"
        },
    ];

    const topContributors = [
        { name: "Blessing A.", reviews: 156, badge: "Explorer Elite", avatar: "BA" },
        { name: "Tunde O.", reviews: 142, badge: "Local Guide", avatar: "TO" },
        { name: "Grace M.", reviews: 128, badge: "Photo Master", avatar: "GM" },
        { name: "David N.", reviews: 115, badge: "Trail Blazer", avatar: "DN" },
    ];

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Welcome to the Queska community!", {
                description: "Check your email for exclusive travel tips and updates."
            });
            setEmail("");
            setIsSubmitting(false);
        }, 1000);
    };

    const handleStorySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!story) {
            toast.error("Please share your travel story");
            return;
        }

        toast.success("Thank you for sharing!", {
            description: "Your story has been submitted for review."
        });
        setStory("");
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src={communityImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Users className="w-3 h-3 mr-1" />
                            Join 250,000+ Travelers
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
                            Travel Better,
                            <span className="block text-primary">Together</span>
                        </h1>
                        <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            Connect with fellow adventurers, share experiences, and discover destinations through the eyes of real travelers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link to="/login">
                                    Join the Community
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                                <Share2 className="mr-2 w-5 h-5" />
                                Share Your Story
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-b">
                <div className="container px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <stat.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                                    <Badge variant="outline" className="text-xs">{stat.growth}</Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Carousel */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Stories from Our Community
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Real experiences from real travelers who've discovered the Queska difference
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Main Testimonial */}
                        <Card className="mb-8 border-2 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="grid md:grid-cols-5 gap-0">
                                    {/* Quote Section */}
                                    <div className="md:col-span-3 p-8 md:p-12">
                                        <Quote className="w-12 h-12 text-primary/20 mb-4" />
                                        <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                                            "{testimonials[activeTestimonial].text}"
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-14 h-14">
                                                <AvatarImage src={testimonials[activeTestimonial].avatarUrl} />
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {testimonials[activeTestimonial].avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-foreground">
                                                    {testimonials[activeTestimonial].name}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {testimonials[activeTestimonial].location}
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Info Section */}
                                    <div className="md:col-span-2 bg-muted/50 p-8 flex flex-col justify-center">
                                        <div className="mb-4">
                                            <Badge className="mb-2">Featured Trip</Badge>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {testimonials[activeTestimonial].trip}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonials[activeTestimonial].date}
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link to="/login">
                                                Plan Similar Trip
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Carousel Controls */}
                        <div className="flex items-center justify-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            <div className="flex gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                            }`}
                                    />
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Events */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Upcoming Community Events
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Join meetups, workshops, and group trips with fellow Queska travelers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {communityEvents.map((event, index) => (
                            <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <Badge className="mb-4" variant={event.type === "Online" ? "outline" : "default"}>
                                        {event.type}
                                    </Badge>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {event.title}
                                    </h3>
                                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {event.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            {event.attendees} attending
                                        </div>
                                    </div>
                                    <Button className="w-full" variant="outline">
                                        Join Event
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Button variant="outline" size="lg">
                            View All Events
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Top Contributors */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Top Community Contributors
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Meet the travelers who help make Queska better for everyone
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {topContributors.map((contributor, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="relative inline-block mb-4">
                                        <Avatar className="w-20 h-20">
                                            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                                {contributor.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        {index === 0 && (
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                                <Award className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-1">{contributor.name}</h3>
                                    <Badge variant="outline" className="mb-2">{contributor.badge}</Badge>
                                    <p className="text-sm text-muted-foreground">{contributor.reviews} reviews</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Share Your Story */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Share Your Travel Story
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Inspire others with your adventures and get featured in our community
                            </p>
                        </div>

                        <Card>
                            <CardContent className="p-8">
                                <form onSubmit={handleStorySubmit} className="space-y-6">
                                    <div>
                                        <Textarea
                                            placeholder="Tell us about your most memorable Queska travel experience..."
                                            value={story}
                                            onChange={(e) => setStory(e.target.value)}
                                            className="min-h-[150px] resize-none"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button type="submit" className="flex-1">
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Your Story
                                        </Button>
                                        <Button type="button" variant="outline">
                                            Add Photos
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-20 bg-primary">
                <div className="container px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <Sparkles className="w-12 h-12 text-primary-foreground/80 mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                            Stay Connected
                        </h2>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Get exclusive travel tips, community updates, and special offers delivered to your inbox.
                        </p>

                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                            />
                            <Button type="submit" variant="secondary" disabled={isSubmitting}>
                                {isSubmitting ? "Joining..." : "Subscribe"}
                            </Button>
                        </form>

                        <div className="flex items-center justify-center gap-6 mt-8 text-primary-foreground/60 text-sm">
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                Weekly tips
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                No spam
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                Unsubscribe anytime
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join CTA */}
            <section className="py-20">
                <div className="container px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Ready to Join the Adventure?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Become part of a community that's changing how the world travels
                    </p>
                    <Button size="lg" asChild>
                        <Link to="/login">
                            Create Your Free Account
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CommunityPage;
