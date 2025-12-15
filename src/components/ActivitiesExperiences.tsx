import { Button } from "@/components/ui/button";
import { Camera, Utensils, Waves, Mountain, Music, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import activitiesImage from "@/assets/activities-experiences.jpg";

const activities = [
  { icon: Waves, label: "Beach & Water Sports", color: "text-blue-500" },
  { icon: Utensils, label: "Local Cuisine", color: "text-orange-500" },
  { icon: Mountain, label: "Nature & Hiking", color: "text-green-500" },
  { icon: Camera, label: "Photography Tours", color: "text-purple-500" },
  { icon: Music, label: "Cultural Events", color: "text-pink-500" },
  { icon: Heart, label: "Wellness & Spa", color: "text-red-500" },
];

const ActivitiesExperiences = () => {
  return (
    <section className="min-h-screen flex items-center bg-muted/30 relative overflow-hidden">
      <div className="container px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative animate-fade-in-up order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={activitiesImage}
                alt="Various travel activities and experiences"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
            </div>

            {/* Floating Activity Badge */}
            <div className="absolute top-6 right-6 bg-background/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Activities</span>
              </div>
              <div className="text-2xl font-bold text-primary mt-1">24</div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 animate-fade-in-up order-1 lg:order-2" style={{ animationDelay: "0.2s" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Curated Experiences</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              What do you want to do?
            </h2>

            <p className="text-xl text-muted-foreground">
              Choose from hundreds of activities tailored to your interests. Whether you seek adventure, relaxation, or cultural immersion, we've got you covered.
            </p>

            {/* Activity Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <button
                  key={activity.label}
                  className="group p-6 bg-card hover:bg-card/80 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <activity.icon className={`w-8 h-8 ${activity.color} mb-3 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-semibold text-foreground mb-1">{activity.label}</h3>
                  <p className="text-sm text-muted-foreground">Discover unique experiences</p>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <Link to="/activities">
                <Button size="lg" className="group">
                  Explore Activities
                  <Camera className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link to="/activities">
                <Button variant="outline" size="lg">
                  View All
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesExperiences;
