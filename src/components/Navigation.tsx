import { Button } from "@/components/ui/button";
import { Menu, X, Building2 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import queskaLogo from "@/assets/queska-logo.png";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Community", href: "/community" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={queskaLogo} alt="Queska" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium transition-colors ${isActive(item.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="default" asChild className="border-vendor text-vendor hover:bg-vendor hover:text-vendor-foreground">
              <Link to="/vendor">
                <Building2 className="w-4 h-4 mr-2" />
                Vendor
              </Link>
            </Button>
            <Button variant="ghost" size="default" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="default" asChild>
              <Link to="/login">Create Experience</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`block text-sm font-medium transition-colors py-2 ${isActive(item.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Button variant="ghost" size="default" className="w-full" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="default" className="w-full" asChild>
                <Link to="/login">Create Experience</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
