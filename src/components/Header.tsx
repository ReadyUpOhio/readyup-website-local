import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    if (window.location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/#${id}`;
    }
    setIsMobileMenuOpen(false);
  };

  const handleHome = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src="/lovable-uploads/e6568095-9de9-49a5-a3c9-cfe668a2153d.png" 
              alt="Ready Up"
              className="h-12 lg:h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 font-sans font-semibold">
            <button onClick={handleHome} className="text-foreground hover:text-space-blue transition-colors text-sm font-bold">HOME</button>
            <Link to="/events" className="text-foreground hover:text-space-blue transition-colors text-sm font-bold">EVENTS</Link>
            <button onClick={() => handleNav('social')} className="text-foreground hover:text-space-blue transition-colors text-sm font-bold">SOCIAL</button>
            <Link to="/services" className="text-foreground hover:text-space-blue transition-colors text-sm font-bold">SERVICES</Link>
            <Link to="/sell" className="text-foreground hover:text-space-blue transition-colors text-sm font-bold">SELL</Link>
            <Link to="/careers" className="text-foreground hover:text-space-blue transition-colors text-sm font-bold">CAREERS</Link>
            <Link to="/blog" className="text-foreground hover:text-space-pink transition-colors text-sm font-bold">BLOG</Link>
          </nav>

          {/* Desktop Search removed */}

          {/* Mobile & Desktop Actions */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            {/* Mobile Search Toggle removed */}
            
            {/* Removed Shopping Cart */}
            
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden hover:text-ready-purple p-2 min-w-[44px] min-h-[44px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar removed */}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4 font-sans font-semibold">
              <button 
                onClick={handleHome}
                className="text-left text-foreground hover:text-space-blue transition-colors text-base font-bold py-2 px-4 rounded-lg hover:bg-white/5"
              >
                HOME
              </button>
              <Link 
                to="/events" 
                className="text-left text-foreground hover:text-space-blue transition-colors text-base font-bold py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                EVENTS
              </Link>
              <button 
                onClick={() => handleNav('social')}
                className="text-left text-foreground hover:text-space-blue transition-colors text-base font-bold py-2 px-4 rounded-lg hover:bg-white/5"
              >
                SOCIAL
              </button>
              <Link 
                to="/services" 
                className="text-left text-foreground hover:text-space-blue transition-colors text-base font-bold py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SERVICES
              </Link>
              <Link 
                to="/sell" 
                className="text-left text-foreground hover:text-space-blue transition-colors text-base font-bold py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SELL
              </Link>
              <Link 
                to="/careers" 
                className="text-foreground hover:text-space-blue transition-colors text-base font-bold py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CAREERS
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground hover:text-space-pink transition-colors text-base font-bold py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BLOG
              </Link>
              {/* Removed SHOP and ABOUT from mobile menu */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;