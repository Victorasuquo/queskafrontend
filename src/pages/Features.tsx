import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    Brain,
    Map,
    Calendar,
    Shield,
    Accessibility,
    Globe,
    Sparkles,
    Route,
    Bell,
    Wallet,
    MessageCircle,
    Clock,
    CheckCircle,
    ArrowRight,
    Play,
    ChevronDown,
    Star
} from "lucide-react";
import { Link } from "react-router-dom";

// IMAGE INSTRUCTIONS:
// Replace these imports with your actual images
// 1. Add images to src/assets/ folder
// 2. Import like: import featureAI from "@/assets/your-image-name.jpg"
// 3. Use in src={featureAI}

// Placeholder imports - replace with actual images
import featurePersonalized from "@/assets/feature-personalized.jpg";
import featureRealtime from "@/assets/feature-realtime.jpg";
import featurePlanning from "@/assets/feature-planning.jpg";
import featureSupport from "@/assets/feature-support.jpg";
import featureAccessibility from "@/assets/feature-accessibility.jpg";

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const mainFeatures = [
        {
            id: "ai-assistant",
            icon: Brain,
            title: "AI Travel Assistant",
            subtitle: "Your 24/7 intelligent travel companion",
            description: "Queska's AI understands your preferences, learns from your choices, and provides personalized recommendations that evolve with you. Ask questions in natural language and get instant, contextual answers.",
            image: featurePersonalized,
            highlights: [
                "Natural language conversations",
                "Learns your preferences over time",
                "Real-time problem solving",
                "Multi-language support"
            ],
            stats: { users: "50,000+", satisfaction: "98%", responseTime: "<2s" }
        },
        {
            id: "smart-planning",
            icon: Route,
            title: "Smart Itinerary Planning",
            subtitle: "Optimized routes and schedules",
            description: "Our intelligent planning engine creates perfect itineraries by analyzing traffic patterns, opening hours, travel distances, and your personal preferences. Save hours of planning with one-click optimization.",
            image: featurePlanning,
            highlights: [
                "Automatic route optimization",
                "Real-time traffic integration",
                "Weather-aware scheduling",
                "Budget-conscious planning"
            ],
            stats: { timeSaved: "5+ hours", efficiency: "40%", trips: "100,000+" }
        },
        {
            id: "live-updates",
            icon: Bell,
            title: "Real-Time Updates",
            subtitle: "Never miss important changes",
            description: "Stay informed with instant notifications about flight changes, event updates, weather alerts, and local happenings. Queska keeps you connected to everything that matters during your journey.",
            image: featureRealtime,
            highlights: [
                "Push notifications",
                "Flight status tracking",
                "Event reminders",
                "Local alerts & advisories"
            ],
            stats: { alertAccuracy: "99.5%", avgDelivery: "< 30s", coverage: "195 countries" }
        },
        {
            id: "safety",
            icon: Shield,
            title: "Safety & Emergency Support",
            subtitle: "Travel with complete peace of mind",
            description: "One-tap emergency assistance, real-time safety alerts, and 24/7 support ensure you're never alone. Our network of local partners provides immediate help when you need it most.",
            image: featureSupport,
            highlights: [
                "One-tap emergency button",
                "Local emergency contacts",
                "Travel insurance integration",
                "Real-time safety scores"
            ],
            stats: { responseTime: "<60s", availability: "24/7", partners: "500+" }
        },
        {
            id: "accessibility",
            icon: Accessibility,
            title: "Accessibility First",
            subtitle: "Travel designed for everyone",
            description: "Queska is built from the ground up to be accessible. Screen reader support, high contrast modes, voice navigation, and detailed accessibility information for every destination.",
            image: featureAccessibility,
            highlights: [
                "Full screen reader support",
                "Voice-controlled navigation",
                "Wheelchair accessibility info",
                "Sensory-friendly recommendations"
            ],
            stats: { wcagCompliance: "AAA", features: "50+", languages: "12" }
        }
    ];

    const additionalFeatures = [
        { icon: Wallet, title: "Budget Tracking", description: "Track expenses in real-time and stay within budget" },
        { icon: Calendar, title: "Event Discovery", description: "Find local events, festivals, and experiences" },
        { icon: Globe, title: "Offline Mode", description: "Access your plans without internet connection" },
        { icon: MessageCircle, title: "Group Planning", description: "Collaborate with friends and family on trips" },
        { icon: Clock, title: "Time Zone Smart", description: "Automatic adjustments for jet lag and schedules" },
        { icon: Star, title: "Verified Reviews", description: "Authentic reviews from real travelers" }
    ];

    const faqs = [
        {
            question: "How does the AI assistant learn my preferences?",
            answer: "Our AI analyzes your interactions, saved places, completed trips, and explicit preferences you set. The more you use Queska, the better it understands your travel style. You can also manually adjust preferences in your profile settings."
        },
        {
            question: "Is my data secure with Queska?",
            answer: "Absolutely. We use end-to-end encryption for all personal data, comply with GDPR and CCPA regulations, and never sell your information. Your travel data is used solely to improve your experience."
        },
        {
            question: "Can I use Queska offline?",
            answer: "Yes! Download your itineraries, maps, and essential information before your trip. You'll have access to all saved content without needing an internet connection."
        },
        {
            question: "How accurate are the real-time updates?",
            answer: "We partner with airlines, event organizers, and local authorities to provide 99.5% accurate real-time information. Updates are typically delivered within 30 seconds of changes."
        },
        {
            question: "Is Queska available in my country?",
            answer: "Queska is available worldwide with full feature support in 50+ countries. Our core features work everywhere, with enhanced local partnerships in major tourist destinations."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src={featurePersonalized} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Powered by Advanced AI
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
                            Features Built for
                            <span className="block text-primary">Modern Travelers</span>
                        </h1>
                        <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            Discover how Queska transforms every aspect of your journey with intelligent features designed around your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link to="/login">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                                <Play className="mr-2 w-5 h-5" />
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Features - Interactive Tabs */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Core Features
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore the powerful tools that make Queska the smartest way to travel
                        </p>
                    </div>

                    <Tabs defaultValue="ai-assistant" className="max-w-6xl mx-auto">
                        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-transparent mb-8">
                            {mainFeatures.map((feature, index) => (
                                <TabsTrigger
                                    key={feature.id}
                                    value={feature.id}
                                    onClick={() => setActiveFeature(index)}
                                    className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl border-2 border-transparent data-[state=active]:border-primary transition-all"
                                >
                                    <feature.icon className="w-6 h-6" />
                                    <span className="text-xs font-medium text-center">{feature.title.split(' ')[0]}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {mainFeatures.map((feature) => (
                            <TabsContent key={feature.id} value={feature.id} className="mt-0">
                                <Card className="border-2 overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="grid lg:grid-cols-2 gap-0">
                                            {/* Image Side */}
                                            <div className="relative h-64 lg:h-auto min-h-[400px] overflow-hidden">
                                                <img
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                {/* Stats Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {Object.entries(feature.stats).map(([key, value]) => (
                                                            <div key={key} className="text-center">
                                                                <div className="text-2xl font-bold text-white">{value}</div>
                                                                <div className="text-xs text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Side */}
                                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                                <div className="inline-flex items-center gap-2 mb-4">
                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <feature.icon className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <Badge variant="outline">{feature.subtitle}</Badge>
                                                </div>

                                                <h3 className="text-3xl font-bold text-foreground mb-4">
                                                    {feature.title}
                                                </h3>

                                                <p className="text-lg text-muted-foreground mb-6">
                                                    {feature.description}
                                                </p>

                                                <ul className="space-y-3 mb-8">
                                                    {feature.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="flex items-center gap-3">
                                                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                            <span className="text-foreground">{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <Button className="self-start" asChild>
                                                    <Link to="/login">
                                                        Try {feature.title.split(' ')[0]} Now
                                                        <ArrowRight className="ml-2 w-4 h-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>

            {/* Additional Features Grid */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            And So Much More
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Every feature is designed to make your travel experience seamless
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {additionalFeatures.map((feature, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer"
                            >
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                        <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Why Queska Stands Out
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            See how we compare to traditional travel planning
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="grid grid-cols-3 bg-muted p-4 font-semibold text-sm">
                                    <div>Feature</div>
                                    <div className="text-center">Traditional</div>
                                    <div className="text-center text-primary">Queska</div>
                                </div>
                                {[
                                    { feature: "Trip Planning Time", traditional: "8+ hours", queska: "< 30 minutes" },
                                    { feature: "Real-time Updates", traditional: "Manual checking", queska: "Automatic alerts" },
                                    { feature: "Personalization", traditional: "Generic results", queska: "AI-powered" },
                                    { feature: "Budget Tracking", traditional: "Spreadsheets", queska: "Automatic" },
                                    { feature: "Emergency Support", traditional: "Phone calls", queska: "One-tap help" },
                                    { feature: "Offline Access", traditional: "Print everything", queska: "Full offline mode" },
                                ].map((row, index) => (
                                    <div
                                        key={index}
                                        className={`grid grid-cols-3 p-4 items-center ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
                                    >
                                        <div className="font-medium">{row.feature}</div>
                                        <div className="text-center text-muted-foreground">{row.traditional}</div>
                                        <div className="text-center">
                                            <Badge className="bg-primary/10 text-primary border-0">
                                                {row.queska}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Get answers to common questions about Queska's features
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <Card
                                key={index}
                                className={`cursor-pointer transition-all duration-300 ${expandedFaq === index ? 'border-primary shadow-md' : ''}`}
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                                        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                                    </div>
                                    <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary">
                <div className="container px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                        Ready to Experience Smart Travel?
                    </h2>
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                        Join thousands of travelers who've transformed their journeys with Queska
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/login">
                                Get Started Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Features;
