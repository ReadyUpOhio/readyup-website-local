import { Facebook, MessageCircle, Youtube, Mail, Gamepad, Trophy, ExternalLink } from "lucide-react";
import EbayIcon from "./icons/EbayIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (response.ok) {
        toast({
          title: result.isNew ? "Subscribed!" : "Already Subscribed",
          description: result.message || "You're on the list for updates.",
        });
        setEmail('');
      } else {
        throw new Error(result.message || 'An error occurred.');
      }
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: (error as Error).message || "Could not subscribe. Please try again later.",
        variant: "destructive",
      });
    }
  };
  return (
    <footer className="pt-16 pb-10 px-4 mt-16">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center arcade-card px-4 py-2 rounded-full mb-4 border-sf2-yellow/50">
            <Trophy className="w-4 h-4 text-sf2-yellow mr-2" />
            <span className="text-sm text-sf2-yellow font-pixel text-xs">STAY CONNECTED</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-orbitron">
            JOIN THE <span className="gradient-text-fighter">READY UP</span> COMMUNITY
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto font-orbitron">
            Get updates on new arrivals, trade events, and exclusive deals from Ready Up Gamestore
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <Input 
              placeholder="Enter your email" 
              className="arcade-card border-sf2-blue/30 flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
            />
            <Button className="fighter-button px-6 font-orbitron font-bold" onClick={handleSubscribe}>
              <Mail className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 lg:mb-16">
          {/* Company */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4 lg:mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-sf2-blue to-sf2-red rounded-lg flex items-center justify-center arcade-glow">
                <Gamepad className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-fighter font-orbitron">Ready Up Gamestore</span>
            </div>
            <p className="text-muted-foreground text-sm lg:text-base font-orbitron">
              &copy; {new Date().getFullYear()} GameGrid Emporium. All Rights Reserved.
              Buy, sell, and trade games, consoles, and TCGs in Ontario, Ohio.
            </p>
          </div>

          {/* Arcade */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4 text-sf2-blue font-orbitron">ONLINE STORES</h4>
            <ul className="space-y-2 text-muted-foreground text-sm lg:text-base font-orbitron">
              <li>
                <a href="https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop" className="hover:text-sf2-blue transition-colors" target="_blank" rel="noreferrer noopener">eBay Store</a>
              </li>
              <li>
                <a href="https://www.whatnot.com/user/readyupohio" className="hover:text-sf2-blue transition-colors" target="_blank" rel="noreferrer noopener">Whatnot</a>
              </li>
            </ul>
          </div>

          {/* Tournaments */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4 text-sf2-red font-orbitron">SELL & TRADE</h4>
            <ul className="space-y-2 text-muted-foreground text-sm lg:text-base font-orbitron">
              <li><a href="/about" className="hover:text-sf2-red transition-colors">Trade-In Info</a></li>
              <li><a href="/about" className="hover:text-sf2-red transition-colors">How It Works</a></li>
              <li><a href="/about" className="hover:text-sf2-red transition-colors">Store Policies</a></li>
              <li><a href="https://facebook.com/readyupgamestore" target="_blank" rel="noreferrer noopener" className="hover:text-sf2-red transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4 text-sf2-yellow font-orbitron">SUPPORT</h4>
            <ul className="space-y-2 text-muted-foreground text-sm lg:text-base font-orbitron">
              <li><a href="/about" className="hover:text-sf2-yellow transition-colors">About Us</a></li>
              <li><a href="https://facebook.com/readyupgamestore" target="_blank" rel="noreferrer noopener" className="hover:text-sf2-yellow transition-colors">Contact</a></li>
              <li><a href="/about" className="hover:text-sf2-yellow transition-colors">Store Hours</a></li>
              <li><a href="https://maps.google.com/?q=Ontario+Center+Mall,+Ontario,+Ohio" target="_blank" rel="noreferrer noopener" className="hover:text-sf2-yellow transition-colors">Directions</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-6 lg:pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-muted-foreground text-center lg:text-left text-sm font-orbitron">
              &copy; 2024 Ready Up Gamestore. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-sf2-blue p-2"
                aria-label="Facebook"
                onClick={() => window.open('https://facebook.com/readyupgamestore', '_blank', 'noopener,noreferrer')}
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-sf2-red p-2"
                aria-label="TikTok"
                onClick={() => window.open('https://www.tiktok.com/@readyupgs', '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-sf2-yellow p-2"
                aria-label="Whatnot"
                onClick={() => window.open('https://www.whatnot.com/user/readyupohio', '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-sf2-orange p-2"
                aria-label="YouTube"
                onClick={() => window.open('https://www.youtube.com/@ReadyUpVlogs/shorts', '_blank', 'noopener,noreferrer')}
              >
                <Youtube className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-green-500 p-2"
                aria-label="eBay"
                onClick={() => window.open('https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop', '_blank', 'noopener,noreferrer')}
              >
                <EbayIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground font-orbitron">
              <a href="/about" className="hover:text-sf2-blue transition-colors">PRIVACY</a>
              <a href="/about" className="hover:text-sf2-blue transition-colors">TERMS</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;