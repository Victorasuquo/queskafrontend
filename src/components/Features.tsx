import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, Clock, Route, LifeBuoy, Languages } from "lucide-react";
import { useState, useEffect } from "react";
import featurePersonalized from "@/assets/feature-personalized.jpg";
import featureRealtime from "@/assets/feature-realtime.jpg";
import featurePlanning from "@/assets/feature-planning.jpg";
import featureSupport from "@/assets/feature-support.jpg";
import featureAccessibility from "@/assets/feature-accessibility.jpg";

const features = [
  {
    icon: Heart,
    title: "Queska adapts to your needs",
    subtitle: "Personalized, inclusive travel experiences",
    description: "Every traveler is unique. That's why Queska learns your preferences, respects your budget, and honors your accessibility requirements. From solo adventurers to family groups, we create experiences that feel designed just for you.",
    image: featurePersonalized,
  },
  {
    icon: Clock,
    title: "Never miss a moment",
    subtitle: "Real-time recommendations",
    description: "Discover what's happening right now. Get instant updates on events, restaurant availability, special offers, and hidden gems near you. Your adventure unfolds in real-time, with opportunities you won't find in guidebooks.",
    image: featureRealtime,
  },
  {
    icon: Route,
    title: "Travel smarter, not harder",
    subtitle: "Smart itinerary, budget & route planning",
    description: "Don't worry about the details—we've got them covered. Queska optimizes your routes, manages your budget, and creates seamless itineraries that maximize your time. Spend less time planning and more time experiencing.",
    image: featurePlanning,
  },
  {
    icon: LifeBuoy,
    title: "Help when you need it most",
    subtitle: "Live help & instant emergency connection",
    description: "Travel with confidence knowing support is always a tap away. Whether you need quick recommendations or emergency assistance, Queska connects you to help instantly—24/7, in any situation.",
    image: featureSupport,
  },
  {
    icon: Languages,
    title: "Built for everyone",
    subtitle: "Accessibility-first design",
    description: "Travel should be for everyone. Queska breaks down barriers with multi-language support, accessibility features, and inclusive design. We ensure every traveler can explore Akwa Ibom with ease and confidence.",
    image: featureAccessibility,
  },
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % features.length);
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Choose Queska?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience travel technology that truly understands and supports you
          </p>
        </div>

        <div className="relative">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === activeIndex
                  ? "opacity-100 translate-x-0 relative"
                  : "opacity-0 absolute inset-0 pointer-events-none translate-x-full"
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
                {/* Content */}
                <div className="space-y-6 animate-fade-in-up">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full">
                    <feature.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-primary uppercase tracking-wide">
                      {feature.subtitle}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  <Button size="lg" className="mt-4">
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Image */}
                <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={feature.image}
                      alt={feature.subtitle}
                      className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
