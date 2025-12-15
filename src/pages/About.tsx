import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    Target,
    Eye,
    Heart,
    Users,
    Globe,
    Award,
    Linkedin,
    Twitter,
    Mail,
    MapPin,
    Calendar,
    ArrowRight,
    Sparkles,
    Building2,
    Rocket,
    CheckCircle,
    Star,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";

// IMAGE INSTRUCTIONS:
// Add team member photos to src/assets/ folder:
// - team-ceo.jpg, team-cto.jpg, team-coo.jpg, etc.
// - about-office.jpg for office photos
// - about-mission.jpg for mission section
// Replace the placeholder URLs below with your imports

const About = () => {
    const [activeValue, setActiveValue] = useState(0);

    const leadership = [
        {
            name: "Victor Asuquo",
            role: "Founder & CEO",
            bio: "Visionary entrepreneur passionate about transforming travel through technology. Former product lead with 10+ years in tech startups.",
            avatar: "VA",
            linkedin: "#",
            twitter: "#",
            email: "victor@queska.com"
        },
        {
            name: "Amaka Obi",
            role: "Chief Technology Officer",
            bio: "AI and machine learning expert driving Queska's intelligent recommendations. Previously led engineering teams at major tech companies.",
            avatar: "AO",
            linkedin: "#",
            twitter: "#",
            email: "amaka@queska.com"
        },
        {
            name: "Emeka Nwosu",
            role: "Chief Operating Officer",
            bio: "Operations strategist ensuring Queska delivers excellence at scale. Background in hospitality and travel industry management.",
            avatar: "EN",
            linkedin: "#",
            twitter: "#",
            email: "emeka@queska.com"
        },
        {
            name: "Blessing Adeyemi",
            role: "Head of Product",
            bio: "User experience advocate crafting intuitive travel tools. Passionate about accessible design that serves all travelers.",
            avatar: "BA",
            linkedin: "#",
            twitter: "#",
            email: "blessing@queska.com"
        },
        {
            name: "Chidi Okoro",
            role: "Head of Partnerships",
            bio: "Building the network of hotels, experiences, and local guides that power Queska. Expert in travel industry relationships.",
            avatar: "CO",
            linkedin: "#",
            twitter: "#",
            email: "chidi@queska.com"
        },
        {
            name: "Fatima Hassan",
            role: "Head of Community",
            bio: "Connecting travelers and fostering the Queska community spirit. Champion of authentic travel experiences and cultural exchange.",
            avatar: "FH",
            linkedin: "#",
            twitter: "#",
            email: "fatima@queska.com"
        },
    ];

    const values = [
        {
            icon: Heart,
            title: "Traveler First",
            description: "Every decision we make starts with one question: How does this make travel better for our users? Your journey is our priority."
        },
        {
            icon: Globe,
            title: "Accessible to All",
            description: "Travel should have no barriers. We build for everyone, regardless of ability, background, or budget."
        },
        {
            icon: Sparkles,
            title: "Innovation Always",
            description: "We push boundaries with AI and technology to solve real travel problems in ways nobody else has."
        },
        {
            icon: Users,
            title: "Community Driven",
            description: "The best recommendations come from real travelers. We amplify authentic voices and local knowledge."
        },
        {
            icon: Target,
            title: "Relentless Quality",
            description: "Good enough isn't enough. We obsess over details to deliver experiences that exceed expectations."
        },
        {
            icon: Zap,
            title: "Move Fast",
            description: "The travel industry evolves quickly. We adapt faster, shipping improvements every week."
        },
    ];

    const milestones = [
        {
            year: "2025",
            quarter: "Q1",
            title: "The Beginning",
            description: "Queska founded in Uyo, Nigeria with a vision to revolutionize travel in Africa and beyond."
        },
        {
            year: "2025",
            quarter: "Q3",
            title: "First 1,000 Users",
            description: "Reached our first milestone of engaged travelers using Queska for trip planning."
        },
        {
            year: "2026",
            quarter: "Q1",
            title: "AI Integration",
            description: "Launched our AI-powered recommendation engine, transforming how users discover destinations."
        },
        {
            year: "2026",
            quarter: "Q2",
            title: "Vendor Platform",
            description: "Introduced the vendor portal, enabling hotels and experience providers to join our ecosystem."
        },
        {
            year: "2026",
            quarter: "Q4",
            title: "100,000 Users",
            description: "Celebrated 100,000 active travelers and expanded to cover 50+ destinations across Nigeria."
        },
        {
            year: "2027",
            quarter: "Q1",
            title: "Pan-African Expansion",
            description: "Launched in Ghana, Kenya, and South Africa, bringing Queska to travelers across the continent."
        },
        {
            year: "2028",
            quarter: "Q4",
            title: "250,000+ Community",
            description: "Growing strong with a quarter million travelers and 2,500+ vendor partners."
        },
    ];

    const stats = [
        { value: "250K+", label: "Active Travelers" },
        { value: "2,500+", label: "Vendor Partners" },
        { value: "50+", label: "Destinations" },
        { value: "4.9", label: "App Rating" },
    ];

    const press = [
        { outlet: "TechCabal", quote: "Queska is redefining travel tech in Africa" },
        { outlet: "CNN Africa", quote: "The AI travel assistant everyone's talking about" },
        { outlet: "Forbes Africa", quote: "One of the most innovative travel startups of 2025" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Building2 className="w-3 h-3 mr-1" />
                            About Queska
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
                            Transforming How
                            <span className="block text-primary">Africa Travels</span>
                        </h1>
                        <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            We're on a mission to make travel accessible, intelligent, and unforgettable for everyone. Built in Nigeria, designed for the world.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link to="/login">
                                    Join Our Journey
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
                                <Link to="/vendor">
                                    Partner With Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-8 border-b bg-muted/30">
                <div className="container px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="max-w-5xl mx-auto">
                        <Tabs defaultValue="mission" className="space-y-8">
                            <TabsList className="grid grid-cols-2 max-w-md mx-auto">
                                <TabsTrigger value="mission" className="flex items-center gap-2">
                                    <Target className="w-4 h-4" />
                                    Our Mission
                                </TabsTrigger>
                                <TabsTrigger value="vision" className="flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Our Vision
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="mission">
                                <Card className="border-2">
                                    <CardContent className="p-8 md:p-12">
                                        <div className="grid md:grid-cols-2 gap-8 items-center">
                                            <div>
                                                <h2 className="text-3xl font-bold text-foreground mb-4">
                                                    Travel Without the Hassle
                                                </h2>
                                                <p className="text-lg text-muted-foreground mb-6">
                                                    Our mission is to eliminate every friction point in travel. From discovery to booking to exploration, we use AI and human insight to create seamless journeys.
                                                </p>
                                                <p className="text-lg text-muted-foreground mb-6">
                                                    We believe everyone deserves to explore the world without the stress of endless planning, language barriers, or unexpected problems.
                                                </p>
                                                <ul className="space-y-3">
                                                    {["AI-powered simplicity", "24/7 traveler support", "Accessible to everyone"].map((item, i) => (
                                                        <li key={i} className="flex items-center gap-3">
                                                            <CheckCircle className="w-5 h-5 text-primary" />
                                                            <span className="text-foreground">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center">
                                                <Target className="w-24 h-24 text-primary/20" />
                                                {/* Replace with actual image: <img src={missionImage} alt="Our Mission" className="rounded-2xl" /> */}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="vision">
                                <Card className="border-2">
                                    <CardContent className="p-8 md:p-12">
                                        <div className="grid md:grid-cols-2 gap-8 items-center">
                                            <div className="order-2 md:order-1 bg-muted rounded-2xl aspect-square flex items-center justify-center">
                                                <Eye className="w-24 h-24 text-primary/20" />
                                                {/* Replace with actual image */}
                                            </div>
                                            <div className="order-1 md:order-2">
                                                <h2 className="text-3xl font-bold text-foreground mb-4">
                                                    A World Where Everyone Can Explore
                                                </h2>
                                                <p className="text-lg text-muted-foreground mb-6">
                                                    We envision a future where travel is truly democratic. Where a first-time traveler from a small town has the same access to amazing experiences as a seasoned globetrotter.
                                                </p>
                                                <p className="text-lg text-muted-foreground mb-6">
                                                    By 2030, we aim to help 10 million travelers explore Africa and beyond, supporting local communities and preserving cultures along the way.
                                                </p>
                                                <ul className="space-y-3">
                                                    {["10M travelers by 2030", "100+ African destinations", "Sustainable tourism focus"].map((item, i) => (
                                                        <li key={i} className="flex items-center gap-3">
                                                            <CheckCircle className="w-5 h-5 text-primary" />
                                                            <span className="text-foreground">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            What We Stand For
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Our values guide every feature we build and every decision we make
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {values.map((value, index) => (
                            <Card
                                key={index}
                                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${activeValue === index ? 'border-primary border-2' : ''}`}
                                onClick={() => setActiveValue(index)}
                            >
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <value.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Our Journey
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            From a bold idea to transforming how Africa travels
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`relative flex gap-8 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                                        <Badge variant="outline" className="mb-2">{milestone.year} {milestone.quarter}</Badge>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                                        <p className="text-muted-foreground">{milestone.description}</p>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-2" />

                                    {/* Empty space for alternating layout */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Meet Our Leadership
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            The passionate team building the future of travel
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {leadership.map((member, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    {/* Avatar Placeholder */}
                                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                                        {member.avatar}
                                        {/* Replace with: <img src={memberImage} alt={member.name} className="rounded-full" /> */}
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                                        <Badge variant="outline" className="mt-1 mb-3">{member.role}</Badge>
                                        <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

                                        {/* Social Links */}
                                        <div className="flex justify-center gap-3">
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                                                    <Twitter className="w-4 h-4" />
                                                </a>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={`mailto:${member.email}`}>
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Press Section */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            In The Press
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {press.map((item, index) => (
                            <Card key={index} className="text-center">
                                <CardContent className="p-6">
                                    <div className="text-xl font-bold text-primary mb-3">{item.outlet}</div>
                                    <p className="text-muted-foreground italic">"{item.quote}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Location */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">Headquarters</h3>
                                            <p className="text-muted-foreground">Uyo, Akwa Ibom State, Nigeria</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">Email</h3>
                                            <p className="text-muted-foreground">hello@queska.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">Social</h3>
                                            <p className="text-muted-foreground">@queska_official</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Team</h2>
                                <p className="text-muted-foreground mb-6">
                                    We're always looking for talented people who are passionate about travel and technology. Check out our open positions.
                                </p>
                                <Button asChild>
                                    <a href="mailto:careers@queska.com">
                                        View Open Positions
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary">
                <div className="container px-4 text-center">
                    <Rocket className="w-16 h-16 text-primary-foreground/80 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                        Join the Queska community and discover a smarter way to travel
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/login">
                                Get Started Free
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

export default About;
