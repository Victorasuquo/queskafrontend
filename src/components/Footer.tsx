import { Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t border-border/20">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Queska</span>
            </div>
            <p className="text-sm text-secondary-foreground/70">
              Powered by Lumicoria AI Technology. Transforming how you travel, learn, and explore.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-secondary-foreground/70 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-secondary-foreground/70 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-secondary-foreground/70 hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#community" className="text-secondary-foreground/70 hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-secondary-foreground/70 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#careers" className="text-secondary-foreground/70 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#blog" className="text-secondary-foreground/70 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-secondary-foreground/70 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" className="text-secondary-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-secondary-foreground/70 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#cookies" className="text-secondary-foreground/70 hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#accessibility" className="text-secondary-foreground/70 hover:text-primary transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10 text-center">
          <p className="text-sm text-secondary-foreground/50">
            © {currentYear} Queska by Lumicoria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
