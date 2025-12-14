import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Star, MapPin, Users } from "lucide-react";
import communityImage from "@/assets/community-professional.jpg";

const stats = [
  { icon: Users, value: "250K+", label: "Active Travelers" },
  { icon: MapPin, value: "10K+", label: "Destinations" },
  { icon: Star, value: "50K+", label: "Reviews Shared" },
  { icon: Heart, value: "95%", label: "Satisfaction Rate" },
];

const Community = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src={communityImage}
                alt="Diverse group of professional travelers exploring together"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-8 -right-8 grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <Card
                  key={index}
                  className="p-4 bg-card shadow-lg animate-scale-in"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <stat.icon className="w-6 h-6 text-primary mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Join a Growing Community of Smart Travelers
              </h2>
              <p className="text-lg text-muted-foreground">
                Be part of a vibrant community that shares experiences, discovers hidden gems, and supports local businesses across Nigeria.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold text-foreground">Community Benefits</h3>
              <ul className="space-y-3">
                {[
                  "Share your travel stories and inspire others",
                  "Discover authentic local experiences from real travelers",
                  "Support local businesses and cultural preservation",
                  "Access exclusive community events and meetups",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              Join the Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
