import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ataimaPhoto from "@/assets/testimonial-ataima.jpg";
import victoriaPhoto from "@/assets/testimonial_victoria_uyo.png";

const testimonials = [
  {
    name: "Ataima Onofiok",
    location: "Uyo, Akwa Ibom",
    avatar: "AO",
    avatarUrl: ataimaPhoto,
    rating: 5,
    text: "I like the travel concept that Queska is introducing, it is unique, more like having a friend travel with you on an adventure, a friend who knows what you like.",
  },
  {
    name: "Victoria Enoh Uyoh",
    location: "Uyo, Akwa Ibom",
    avatar: "VU",
    avatarUrl: victoriaPhoto,
    rating: 5,
    text: "I used queska to navigate my travel from Cross river State to Christmas Village in Akwa Ibom State. It was a wonderful experience I had as everything was well planned and catered for. Thank you queska for helping me experience tourism without stress. 👍🏻",
  },
  {
    name: "Chukwudi Okafor",
    location: "Abuja, Nigeria",
    avatar: "CO",
    rating: 5,
    text: "The smart itinerary feature saved me so much time. Everything was perfectly organized, from beach visits to cultural festivals. Absolutely brilliant!",
  },
  {
    name: "Michael Adeyemi",
    location: "Port Harcourt, Nigeria",
    avatar: "MA",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "Used Queska for a family trip to the beach. The budget planning tools kept us on track, and the kids loved the interactive event discovery!",
  },
  {
    name: "Amara Nwosu",
    location: "Enugu, Nigeria",
    avatar: "AN",
    rating: 5,
    text: "The personalized recommendations matched my preferences perfectly. Queska understood exactly what I was looking for in my cultural exploration.",
  },
  {
    name: "David Thompson",
    location: "London, UK",
    avatar: "DT",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    text: "Best travel app I've used. The route optimization saved us hours, and the instant emergency connection feature is a game-changer for international travelers.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What Travelers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied travelers who've discovered Akwa Ibom with Queska
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 space-y-4 bg-background hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-lg">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="font-bold text-2xl text-foreground">4.9</span>
            <span className="text-muted-foreground">Average rating from 2,847 reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
