import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, MapPin, Compass } from "lucide-react";
import queskaLogo from "@/assets/queska-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col">
      {/* Header with Logo */}
      <header className="w-full py-6 px-4">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={queskaLogo} alt="Queska" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/10 rounded-full p-6 animate-pulse">
                <Compass className="w-16 h-16 md:w-20 md:h-20 text-primary" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Oops! You've wandered off the map
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track to your next adventure!
            </p>
            <p className="text-sm text-muted-foreground/70">
              Attempted path:{" "}
              <code className="px-2 py-1 bg-muted rounded text-foreground">
                {location.pathname}
              </code>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/destinations">
                <MapPin className="w-4 h-4" />
                Explore Destinations
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="border-t pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Or try one of these popular pages:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/flights"
                className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
              >
                Flights
              </Link>
              <Link
                to="/stays"
                className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
              >
                Stays
              </Link>
              <Link
                to="/restaurants"
                className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
              >
                Restaurants
              </Link>
              <Link
                to="/events"
                className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
              >
                Events
              </Link>
              <Link
                to="/activities"
                className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
              >
                Activities
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Need help?{" "}
          <Link to="/about" className="text-primary hover:underline">
            Contact our support team
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default NotFound;
