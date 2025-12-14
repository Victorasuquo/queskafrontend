import { Building2, Plane, Hotel, Utensils, MapPin, Shield } from "lucide-react";

const partners = [
  { name: "Akwa Ibom Tourism", icon: MapPin },
  { name: "Nigerian Aviation", icon: Plane },
  { name: "Premium Hotels", icon: Hotel },
  { name: "Local Restaurants", icon: Utensils },
  { name: "Cultural Centers", icon: Building2 },
  { name: "Travel Insurance", icon: Shield },
];

const TrustedPartners = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trusted by Leading Partners
          </h3>
          <p className="text-muted-foreground">
            Working with the best to bring you exceptional travel experiences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg hover:bg-secondary/20 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <partner.icon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <span className="text-sm font-medium text-muted-foreground text-center group-hover:text-foreground transition-colors duration-300">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Partnered with <span className="font-bold text-foreground">50+ organizations</span> across Akwa Ibom
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
