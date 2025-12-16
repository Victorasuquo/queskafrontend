import { Building2, Users, Crown, Calendar, Utensils, Hotel, PartyPopper, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const JoinQueska = () => {
  const joinOptions = [
    {
      title: "Vendor",
      icon: Building2,
      description: "List your business and reach travelers worldwide",
      features: [
        { icon: PartyPopper, text: "Events & Experiences" },
        { icon: Utensils, text: "Restaurants & Dining" },
        { icon: Hotel, text: "Hotels & Accommodation" },
        { icon: MapPin, text: "Attractions & Tours" },
      ],
      cta: "Become a Vendor",
    },
    {
      title: "Agent",
      icon: Users,
      description: "Partner with us to curate travel experiences",
      features: [
        { icon: PartyPopper, text: "Create Custom Packages" },
        { icon: Utensils, text: "Manage Bookings" },
        { icon: Hotel, text: "Earn Commissions" },
        { icon: MapPin, text: "Access Exclusive Deals" },
      ],
      cta: "Join as Agent",
    },
    {
      title: "VIP Guest",
      icon: Crown,
      description: "Unlock premium perks and priority access",
      features: [
        { icon: PartyPopper, text: "Early Event Access" },
        { icon: Utensils, text: "Exclusive Reservations" },
        { icon: Hotel, text: "Luxury Upgrades" },
        { icon: MapPin, text: "Personal Concierge" },
      ],
      cta: "Become VIP",
    },
    {
      title: "Consultation",
      icon: Calendar,
      description: "Speak with our team about custom solutions",
      features: [
        { icon: PartyPopper, text: "Enterprise Packages" },
        { icon: Utensils, text: "White-Label Solutions" },
        { icon: Hotel, text: "API Integrations" },
        { icon: MapPin, text: "Dedicated Support" },
      ],
      cta: "Schedule a Call",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Join the Queska Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're a business owner, travel professional, or adventure seeker—there's a place for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {joinOptions.map((option, index) => (
            <Card
              key={index}
              className="relative flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border group overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
                  <option.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl mb-2 text-card-foreground">{option.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {option.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <feature.icon className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-card-foreground">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                >
                  {option.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Questions? Reach out to our partnerships team at{" "}
            <a href="mailto:hello@queska.com" className="text-primary hover:underline">
              hello@queska.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinQueska;
