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
import SEO from "@/components/SEO";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Queska",
        "url": "https://queska.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://queska.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "Queska",
        "url": "https://queska.com",
        "logo": "https://queska.com/logo.png",
        "sameAs": [
          "https://facebook.com/queska",
          "https://twitter.com/queska",
          "https://instagram.com/queska",
          "https://linkedin.com/company/queska"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+234-800-123-4567",
          "contactType": "customer service",
          "areaServed": "NG"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO structuredData={structuredData} />
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
