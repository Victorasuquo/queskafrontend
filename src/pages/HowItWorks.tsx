import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    Search,
    Sparkles,
    Map,
    Share2,
    UserPlus,
    Settings,
    Compass,
    CreditCard,
    CheckCircle,
    ArrowRight,
    ArrowDown,
    Play,
    ChevronRight,
    Smartphone,
    Globe,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";

// IMAGE INSTRUCTIONS:
// Replace these imports with your actual images
// 1. Add images to src/assets/ folder with names like:
//    - step-1-preferences.jpg
//    - step-2-ai-suggestions.jpg
//    - step-3-explore.jpg
//    - step-4-share.jpg
// 2. Import like: import stepImage from "@/assets/your-image.jpg"

import featurePersonalized from "@/assets/feature-personalized.jpg";
import featureRealtime from "@/assets/feature-realtime.jpg";
import featurePlanning from "@/assets/feature-planning.jpg";
import featureSupport from "@/assets/feature-support.jpg";

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [demoProgress, setDemoProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const steps = [
        {
            number: "01",
            icon: UserPlus,
            title: "Create Your Profile",
            subtitle: "Tell us about yourself",
            description: "Sign up in seconds and tell Queska about your travel preferences. Whether you're an adventure seeker, culture enthusiast, or beach lover, we tailor everything to you.",
            image: featurePersonalized,
            details: [
                "Quick 2-minute signup process",
                "Connect social accounts for faster setup",
                "Set dietary restrictions and accessibility needs",
                "Choose your preferred travel pace and budget"
            ],
            demo: {
                title: "Profile Setup",
                action: "Try creating a sample profile"
            }
        },
        {
            number: "02",
            icon: Sparkles,
            title: "Get AI Recommendations",
            subtitle: "Personalized suggestions just for you",
            description: "Our AI analyzes your preferences, past trips, and current trends to suggest destinations, activities, and experiences you'll love. The more you use Queska, the smarter it gets.",
            image: featureRealtime,
            details: [
                "AI learns from every interaction",
                "Recommendations improve over time",
                "Discover hidden gems others miss",
                "Get suggestions based on your mood"
            ],
            demo: {
                title: "AI in Action",
                action: "See sample recommendations"
            }
        },
        {
            number: "03",
            icon: Map,
            title: "Plan & Book Seamlessly",
            subtitle: "Everything in one place",
            description: "Build your perfect itinerary with drag-and-drop simplicity. Book flights, accommodations, and activities directly through Queska with our best-price guarantee.",
            image: featurePlanning,
            details: [
                "Drag-and-drop itinerary builder",
                "Real-time pricing and availability",
                "Automatic schedule optimization",
                "Secure payment processing"
            ],
            demo: {
                title: "Itinerary Builder",
                action: "Build a sample trip"
            }
        },
        {
            number: "04",
            icon: Compass,
            title: "Explore with Confidence",
            subtitle: "Your AI companion on the go",
            description: "During your trip, Queska provides real-time guidance, instant translations, emergency support, and spontaneous suggestions based on your location and time.",
            image: featureSupport,
            details: [
                "Turn-by-turn navigation",
                "Real-time language translation",
                "One-tap emergency assistance",
                "Location-based recommendations"
            ],
            demo: {
                title: "Live Exploration",
                action: "Experience the app"
            }
        }
    ];

    const quickStart = [
        { icon: Smartphone, title: "Download the App", description: "Available on iOS and Android" },
        { icon: Settings, title: "Set Preferences", description: "Takes less than 2 minutes" },
        { icon: Globe, title: "Start Exploring", description: "Discover your next adventure" },
    ];

    const startDemo = () => {
        setIsPlaying(true);
        setDemoProgress(0);

        const interval = setInterval(() => {
            setDemoProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsPlaying(false);
                    if (activeStep < steps.length - 1) {
                        setActiveStep(activeStep + 1);
                    }
                    return 0;
                }
                return prev + 2;
            });
        }, 50);
    };

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
                            <Zap className="w-3 h-3 mr-1" />
                            Simple & Powerful
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
                            Travel Planning
                            <span className="block text-primary">Made Effortless</span>
                        </h1>
                        <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            From first idea to final memory, Queska guides you through every step of your journey. Here's how the magic happens.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link to="/login">
                                    Get Started Now
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10"
                                onClick={() => {
                                    setActiveStep(0);
                                    startDemo();
                                }}
                            >
                                <Play className="mr-2 w-5 h-5" />
                                Watch Walkthrough
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start */}
            <section className="py-12 border-b">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6">
                            {quickStart.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-primary">Step {index + 1}</span>
                                            {index < quickStart.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                                        </div>
                                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Steps */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Step Navigation */}
                        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
                            <div className="flex gap-4">
                                {steps.map((step, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveStep(index)}
                                        className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all ${activeStep === index
                                            ? 'bg-primary text-primary-foreground shadow-lg'
                                            : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                                            }`}
                                    >
                                        <span className="text-lg font-bold">{step.number}</span>
                                        <span className="hidden sm:inline font-medium">{step.title.split(' ').slice(0, 2).join(' ')}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Progress Bar for Demo */}
                        {isPlaying && (
                            <div className="max-w-md mx-auto mb-8">
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                    <span>Demo Progress</span>
                                    <span>{demoProgress}%</span>
                                </div>
                                <Progress value={demoProgress} className="h-2" />
                            </div>
                        )}

                        {/* Active Step Content */}
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-500 ${activeStep === index ? 'opacity-100 translate-y-0' : 'opacity-0 absolute pointer-events-none -translate-y-4'
                                    }`}
                            >
                                {activeStep === index && (
                                    <Card className="overflow-hidden border-2">
                                        <CardContent className="p-0">
                                            <div className="grid lg:grid-cols-2">
                                                {/* Image Side */}
                                                <div className="relative h-64 lg:h-auto min-h-[400px] overflow-hidden bg-secondary order-2 lg:order-1">
                                                    <img
                                                        src={step.image}
                                                        alt={step.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />

                                                    {/* Step Number Overlay */}
                                                    <div className="absolute top-6 left-6">
                                                        <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                                                            <span className="text-2xl font-bold">{step.number}</span>
                                                        </div>
                                                    </div>

                                                    {/* Demo Button Overlay */}
                                                    <div className="absolute bottom-6 left-6 right-6">
                                                        <Button
                                                            className="w-full"
                                                            variant="secondary"
                                                            onClick={startDemo}
                                                            disabled={isPlaying}
                                                        >
                                                            <Play className="w-4 h-4 mr-2" />
                                                            {step.demo.action}
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Content Side */}
                                                <div className="p-8 lg:p-12 order-1 lg:order-2">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                            <step.icon className="w-6 h-6 text-primary" />
                                                        </div>
                                                        <Badge variant="outline">{step.subtitle}</Badge>
                                                    </div>

                                                    <h2 className="text-3xl font-bold text-foreground mb-4">
                                                        {step.title}
                                                    </h2>

                                                    <p className="text-lg text-muted-foreground mb-8">
                                                        {step.description}
                                                    </p>

                                                    <div className="space-y-4 mb-8">
                                                        {step.details.map((detail, idx) => (
                                                            <div key={idx} className="flex items-start gap-3">
                                                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                                <span className="text-foreground">{detail}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Navigation Buttons */}
                                                    <div className="flex gap-4">
                                                        {index > 0 && (
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => setActiveStep(index - 1)}
                                                            >
                                                                Previous Step
                                                            </Button>
                                                        )}
                                                        {index < steps.length - 1 ? (
                                                            <Button onClick={() => setActiveStep(index + 1)}>
                                                                Next Step
                                                                <ArrowRight className="ml-2 w-4 h-4" />
                                                            </Button>
                                                        ) : (
                                                            <Button asChild>
                                                                <Link to="/login">
                                                                    Start Your Journey
                                                                    <ArrowRight className="ml-2 w-4 h-4" />
                                                                </Link>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        ))}

                        {/* Step Indicators */}
                        <div className="flex justify-center mt-8 gap-2">
                            {steps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${activeStep === index ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            See Queska in Action
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Watch how travelers use Queska to plan unforgettable trips
                        </p>

                        {/* Video Placeholder */}
                        <Card className="overflow-hidden aspect-video bg-secondary relative group cursor-pointer">
                            <CardContent className="p-0 h-full flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary" />
                                <div className="relative z-10 text-center">
                                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-primary-foreground ml-1" />
                                    </div>
                                    <p className="text-secondary-foreground font-medium">Click to play video</p>
                                    <p className="text-secondary-foreground/60 text-sm">2:30 minutes</p>
                                </div>
                            </CardContent>
                        </Card>
                        <p className="text-sm text-muted-foreground mt-4">
                            💡 Replace this with your actual demo video by embedding a YouTube or Vimeo link
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline View */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Your Journey Timeline
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            From download to departure, here's what your first week with Queska looks like
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {[
                            { day: "Day 1", title: "Download & Setup", description: "Create your account and set your travel preferences in just 2 minutes" },
                            { day: "Day 2-3", title: "Explore Destinations", description: "Browse AI-curated destinations based on your interests and budget" },
                            { day: "Day 4-5", title: "Build Your Itinerary", description: "Use our drag-and-drop builder to create the perfect trip plan" },
                            { day: "Day 6", title: "Book Everything", description: "Secure flights, hotels, and activities with our best-price guarantee" },
                            { day: "Day 7+", title: "Travel with Confidence", description: "Enjoy your trip with real-time guidance and 24/7 AI support" },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-6 mb-8 last:mb-0">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    {index < 4 && <div className="w-0.5 h-full bg-border mt-2" />}
                                </div>
                                <div className="flex-1 pb-8">
                                    <Badge variant="outline" className="mb-2">{item.day}</Badge>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary">
                <div className="container px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                        Ready to Transform Your Travel?
                    </h2>
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                        Join the Queska community and experience the future of travel planning
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/login">
                                Create Free Account
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                            <Link to="/features">
                                Explore Features
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HowItWorks;
