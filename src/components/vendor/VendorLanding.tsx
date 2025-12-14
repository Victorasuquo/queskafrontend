import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Calendar, Utensils, MapPin, TrendingUp, Users, Shield, Globe, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VendorLandingProps {
  onGetStarted: () => void;
}

const VendorLanding = ({ onGetStarted }: VendorLandingProps) => {
  const benefits = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with travelers from around the world actively searching for experiences like yours.',
    },
    {
      icon: TrendingUp,
      title: 'Grow Revenue',
      description: 'Our platform drives bookings directly to you with zero upfront costs.',
    },
    {
      icon: Shield,
      title: 'Verified Trust',
      description: 'Build credibility with our verification badge that travelers trust.',
    },
    {
      icon: Users,
      title: 'Real-Time Bookings',
      description: 'Manage reservations, track performance, and optimize your offerings.',
    },
  ];

  const listingTypes = [
    { icon: Building2, label: 'Hotels & Stays', description: 'Resorts, hotels, apartments, guesthouses' },
    { icon: Calendar, label: 'Events & Festivals', description: 'Concerts, cultural events, tours' },
    { icon: Utensils, label: 'Restaurants & Dining', description: 'Restaurants, cafes, food experiences' },
    { icon: MapPin, label: 'Activities & Tours', description: 'Adventure, sightseeing, experiences' },
  ];

  const steps = [
    { number: '01', title: 'Register', description: 'Create your vendor account with business details' },
    { number: '02', title: 'List', description: 'Add your offerings with photos, pricing, and details' },
    { number: '03', title: 'Verify', description: 'Upload documents for our quick verification process' },
    { number: '04', title: 'Earn', description: 'Start receiving bookings and grow your business' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-vendor flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-vendor-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Queska</span>
              <span className="text-xs font-medium text-vendor bg-vendor-muted px-2 py-0.5 rounded">Vendor</span>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/">Back to Traveler Site</Link>
              </Button>
              <Button onClick={onGetStarted} className="bg-vendor hover:bg-vendor-accent text-vendor-foreground">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-vendor-muted text-vendor px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Partner with Queska
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Grow Your Business.<br />
              <span className="text-vendor">Reach More Travelers.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of hotels, event organizers, and experience providers who trust Queska to connect them with travelers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onGetStarted} className="bg-vendor hover:bg-vendor-accent text-vendor-foreground text-lg px-8">
                Start Listing Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '50K+', label: 'Active Travelers' },
              { value: '2,500+', label: 'Partner Vendors' },
              { value: '95%', label: 'Booking Rate' },
              { value: '24/7', label: 'Support' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-vendor-muted rounded-xl">
                <div className="text-3xl font-bold text-vendor mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can List */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What You Can List</h2>
            <p className="text-muted-foreground">Multiple categories to showcase your offerings</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listingTypes.map((type) => (
              <Card key={type.label} className="border-2 hover:border-vendor transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-vendor-muted flex items-center justify-center mx-auto mb-4 group-hover:bg-vendor transition-colors">
                    <type.icon className="w-8 h-8 text-vendor group-hover:text-vendor-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{type.label}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Partner with Queska?</h2>
            <p className="text-muted-foreground">Everything you need to succeed</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-vendor/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-vendor" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-secondary text-secondary-foreground">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-secondary-foreground/70">Get started in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-6xl font-bold text-vendor/30 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-secondary-foreground/70 text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-vendor/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Built on Trust</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Secure payment processing',
              'Verified partner badges',
              'Real customer reviews',
              'Dedicated support team',
              'Transparent commission structure',
              'Performance analytics dashboard',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <CheckCircle className="w-5 h-5 text-vendor flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-vendor">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-vendor-foreground mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-vendor-foreground/80 text-lg mb-8">
            Join Queska today and start reaching travelers from around the world.
          </p>
          <Button size="lg" variant="secondary" onClick={onGetStarted} className="text-lg px-8">
            Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Queska. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VendorLanding;
