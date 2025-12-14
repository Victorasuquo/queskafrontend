import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroTravel from "@/assets/hero-travel.jpg";
import heroProfessional from "@/assets/hero-professional.jpg";
import heroFestival from "@/assets/hero-festival.jpg";
import heroBeach from "@/assets/hero-beach.jpg";
import heroAdventure from "@/assets/hero-adventure.jpg";

const slides = [
  {
    image: heroTravel,
    alt: "Travelers exploring new destinations",
    title: "Discover Your Next Adventure",
  },
  {
    image: heroProfessional,
    alt: "Professional woman planning travel",
    title: "Travel Without Boundaries",
  },
  {
    image: heroFestival,
    alt: "Travelers experiencing cultural festivals",
    title: "Experience Cultural Wonders",
  },
  {
    image: heroBeach,
    alt: "Couple enjoying tropical paradise",
    title: "Escape to Paradise",
  },
  {
    image: heroAdventure,
    alt: "Hikers on mountain adventure",
    title: "Embrace the Journey",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-secondary overflow-hidden">
      {/* Background Images with Transitions */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 via-secondary/50 to-secondary/30" />
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-10 px-4 py-32">
        <div className="max-w-2xl space-y-8">
          {/* Small Label */}
          <div className="inline-block animate-fade-in">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Travel Intelligence
            </span>
          </div>

          {/* Main Heading - Bold & Large with Slide Animation */}
          <h1
            key={currentSlide}
            className="text-6xl md:text-8xl font-bold text-secondary-foreground leading-tight animate-fade-in-up"
          >
            {slides[currentSlide].title}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            AI-powered travel companion with personalized recommendations, real-time updates, and 24/7 support.
          </p>

          {/* CTA Button */}
          <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button size="xl" className="group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
              Learn More
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-secondary-foreground"
                    : "w-1.5 bg-secondary-foreground/30 hover:bg-secondary-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trustpilot-style Rating Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border py-4 z-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="container px-4">
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-primary" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-foreground font-medium">4.8 out of 5</span>
            <span className="text-muted-foreground">based on 68,000+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
