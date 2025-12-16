import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import queskaLogo from "@/assets/queska-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-16 border-t border-border/20">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={queskaLogo} alt="Queska" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-secondary-foreground/70 max-w-sm">
              Powered by Lumicoria AI Technology. Transforming how you travel, discover destinations, and create unforgettable experiences across Nigeria and beyond.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://facebook.com/queska" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/queska" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/queska" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/queska" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@queska" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-foreground">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/flights" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Flights
                </Link>
              </li>
              <li>
                <Link to="/stays" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Stays
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-foreground">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/vendor" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <a href="mailto:careers@queska.com" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Uyo, Akwa Ibom State, Nigeria</span>
              </li>
              <li>
                <a href="mailto:hello@queska.com" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>hello@queska.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+2348001234567" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+234 800 123 4567</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-foreground/50">
              © {currentYear} Queska by Lumicoria. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="/privacy" className="text-secondary-foreground/50 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-secondary-foreground/50 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-secondary-foreground/50 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
