import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import eventsImage from "@/assets/events-festivals.jpg";
import calabarCarnival from "@/assets/event-calabar-carnival.jpg";
import culturalFestival from "@/assets/event-cultural-festival.jpg";
import beachMusic from "@/assets/event-beach-music.jpg";
import rioCarnival from "@/assets/event-rio-carnival.jpg";

const upcomingEvents = [
  {
    title: "Calabar Carnival",
    date: "Dec 2025",
    location: "Calabar, Nigeria",
    attendees: "2.3K",
    category: "Festival",
    image: calabarCarnival
  },
  {
    title: "Akwa Ibom Cultural Festival",
    date: "Jan 2025",
    location: "Uyo, Nigeria",
    attendees: "1.8K",
    category: "Culture",
    image: culturalFestival
  },
  {
    title: "Christmas Village" ,
    date: "Dec 2025",
    location: "Uyo, Nigeria",
    attendees: "3.1K",
    category: "Festival",
    image: beachMusic
  },
  {
    title: "Rio Carnival",
    date: "Mar 2025",
    location: "Rio de Janeiro, Brazil",
    attendees: "5.2K",
    category: "Festival",
    image: rioCarnival
  }
];

const EventsDiscovery = () => {
  return (
    <section className="min-h-screen flex items-center bg-secondary relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={eventsImage}
          alt="Cultural festival with traditional dancers"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90" />
      </div>

      <div className="container px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground">Live Events</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-secondary-foreground leading-tight">
              Discover Events & Experiences
            </h2>

            <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
              From vibrant festivals to intimate cultural gatherings, find events that make your trip unforgettable.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.title}
                className="group bg-background/10 backdrop-blur-sm hover:bg-background/20 border border-secondary-foreground/10 hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="inline-block px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                      {event.category}
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-foreground mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-secondary-foreground/70">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-foreground/70">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-foreground/70">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.attendees} interested</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/events">
                View All Events
                <Calendar className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsDiscovery;
