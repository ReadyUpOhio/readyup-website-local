import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Wrench, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10 lg:mb-14">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron bg-gradient-to-r from-space-blue via-space-purple to-space-cyan bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Professional help for gamers and shops. Fast turnarounds. Trusted expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
            {/* Console Repairs */}
                        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-space-blue to-space-cyan flex items-center justify-center">
                  <Wrench className="w-7 h-7 " />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-orbitron">Console Repairs</h3>
                  <Badge variant="secondary" className="mt-1">Most Brands & Generations</Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                HDMI port replacements and laptop repairs (screens, batteries, keyboards), diagnostics, cleaning, joystick drift, thermal paste, retro mods, and more.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• HDMI port replacements</li>
                <li>• Laptop repairs (screens, batteries, keyboards)</li>
                <li>• Same-week diagnostics (when possible)</li>
              </ul>
              <Button className="bg-gradient-to-r from-space-blue to-space-cyan font-orbitron" onClick={() => { window.location.href = '/contact'; }}>
                Book a Repair
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Consulting for BST Shops */}
                        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-space-purple to-space-cyan flex items-center justify-center">
                  <Briefcase className="w-7 h-7 " />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-orbitron">Consulting for Buy/Sell/Trade Shops</h3>
                  <Badge variant="secondary" className="mt-1">Operations • Pricing • Sourcing</Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                We help game stores optimize intake, pricing, inventory systems, sourcing, e-commerce strategy, and customer experience.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• In-person or remote sessions</li>
                <li>• Playbooks and templates provided</li>
                <li>• Ongoing advisory available</li>
              </ul>
              <Button variant="outline" className="font-orbitron" onClick={() => { window.location.href = '/contact'; }}>
                Request Consulting
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
