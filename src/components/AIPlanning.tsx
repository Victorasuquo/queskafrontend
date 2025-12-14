import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react";
import aiAssistantImage from "@/assets/ai-assistant.jpg";

const planFeatures = [
  "Personalized itinerary based on your preferences",
  "Real-time updates and local insights",
  "Budget optimization and recommendations",
  "Accessibility support and assistance",
  "24/7 AI-powered travel companion"
];

const AIPlanning = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      <div className="container px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Powered by Lumicoria AI</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Let AI create your perfect trip
            </h2>
            
            <p className="text-xl text-muted-foreground">
              Our intelligent AI agent learns your preferences and crafts a personalized travel experience just for you. No two journeys are the same.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {planFeatures.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Sample Itinerary Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Your Custom Itinerary</h3>
                <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">AI Generated</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Day 1: Arrival & Beach Sunset</div>
                    <div className="text-xs text-muted-foreground">Ibeno Beach Resort</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Day 2: Cultural Exploration</div>
                    <div className="text-xs text-muted-foreground">Traditional Markets & Museum</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Day 3: Adventure Activities</div>
                    <div className="text-xs text-muted-foreground">Water Sports & Hiking</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="group">
                Start Planning
                <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                See Example
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={aiAssistantImage} 
                alt="AI travel assistant on smartphone"
                className="w-full h-[700px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
            </div>

            {/* Floating AI Badge */}
            <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-border animate-pulse">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">AI Status</div>
                  <div className="text-sm font-bold text-foreground">Creating Your Plan...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlanning;
