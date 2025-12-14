import { Card } from "@/components/ui/card";
import { Search, Sparkles, Map, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Tell Us Your Preferences",
    description: "Share your interests, budget, accessibility needs, and travel style. Our AI listens and learns.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Get AI-Powered Suggestions",
    description: "Receive personalized recommendations for destinations, activities, restaurants, and local experiences.",
  },
  {
    number: "03",
    icon: Map,
    title: "Explore with Confidence",
    description: "Access real-time updates, local insights, and instant support throughout your journey.",
  },
  {
    number: "04",
    icon: Share2,
    title: "Share Your Experience",
    description: "Help others discover amazing places by sharing your stories and contributing to our community.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              How Queska Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps to unlock personalized, AI-powered travel experiences
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                      <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
