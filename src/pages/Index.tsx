import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DestinationSelector from "@/components/DestinationSelector";
import ActivitiesExperiences from "@/components/ActivitiesExperiences";
import EventsDiscovery from "@/components/EventsDiscovery";
import AIPlanning from "@/components/AIPlanning";
import Testimonials from "@/components/Testimonials";
import TrustedPartners from "@/components/TrustedPartners";
import InteractiveExperience from "@/components/InteractiveExperience";
import Features from "@/components/Features";
import Community from "@/components/Community";
import JoinQueska from "@/components/JoinQueska";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <DestinationSelector />
        <ActivitiesExperiences />
        <EventsDiscovery />
        <AIPlanning />
        <Testimonials />
        <TrustedPartners />
        <InteractiveExperience />
        <Features />
        <Community />
        <JoinQueska />
        <CTA />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
