import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "per month",
      description: "Try out Queska with essential features",
      features: [
        "Basic destination recommendations",
        "Access to public events calendar",
        "Community forum access (read-only)",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$5",
      period: "per month",
      description: "Everything you need for seamless travel experiences",
      features: [
        "Unlimited AI-powered recommendations",
        "Personalized itinerary planning",
        "Real-time route optimization",
        "Priority event notifications",
        "Exclusive deals & discounts",
        "24/7 AI travel assistant",
        "Offline access to saved trips",
        "Advanced budget tracking",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "VIP",
      price: "$15",
      period: "per month",
      description: "Premium experience for frequent travelers",
      features: [
        "Everything in Pro",
        "VIP event access & early bookings",
        "Personal travel concierge",
        "Premium partner discounts",
        "Multi-destination planning",
        "Priority customer support",
        "Travel insurance integration",
        "Unlimited group trip planning",
      ],
      cta: "Go VIP",
      popular: false,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For travel agencies and tour operators",
      features: [
        "Everything in VIP",
        "Multi-user management (unlimited)",
        "Custom branding & white-label",
        "API access & webhooks",
        "Dedicated account manager",
        "Advanced analytics & reports",
        "Custom integrations",
        "24/7 priority support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Travel Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start for free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    / {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans include secure payment processing and can be cancelled anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
