import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Star, Clock, Calendar, Navigation, MessageCircle } from "lucide-react";

const storeInfo = [
  {
    icon: MapPin,
    title: "Location",
    description: "Ontario Center Mall, Ontario, Ohio",
    color: "ready-blue"
  },
  {
    icon: Phone,
    title: "Contact Us", 
    description: "Call us for trade values & availability",
    color: "ready-cyan"
  },
  {
    icon: Star,
    title: "Highly Rated",
    description: "5-star rated by customers across Ohio",
    color: "ready-purple"
  }
];

const storeHours = [
  { day: "Monday - Friday", hours: "11:00 AM - 7:00 PM" },
  { day: "Saturday", hours: "11:00 AM - 7:00 PM" },
  { day: "Sunday", hours: "12:00 PM - 6:00 PM" }
];

const SellSection = () => {
  return (
    <section id="visit" className="py-12 lg:py-20 px-4 lg:px-6 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <Badge className="bg-ready-purple/30 backdrop-blur-xl text-ready-purple border-ready-purple/40 text-sm font-mono font-medium mb-4 rounded-2xl shadow-lg">
            VISIT US TODAY
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
            VISIT <span className="gradient-text-space">READY UP GAMESTORE</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Your premier gaming destination in Ontario Center Mall - where gamers unite!
          </p>
        </div>

        {/* Store Hours */}
        <div className="bg-white/10 backdrop-blur-xl p-6 lg:p-8 rounded-3xl mb-16 border border-white/20 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold font-display mb-4">
              <span className="text-ready-cyan">STORE</span> HOURS
            </h3>
            <p className="text-muted-foreground font-sans">
              Open 7 days a week for all your gaming needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storeHours.map((schedule, index) => (
              <div key={schedule.day} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-12 h-12 bg-ready-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg backdrop-blur-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-ready-blue font-display mb-2">{schedule.day.toUpperCase()}</h4>
                <p className="text-sm text-muted-foreground font-sans">{schedule.hours}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA: Get Directions */}
        <div className="text-center mt-6">
          <Button
            size="lg"
            className="bg-gradient-to-r from-ready-blue to-ready-cyan hover:from-ready-blue/90 hover:to-ready-cyan/90 text-white font-sans font-bold rounded-2xl"
            onClick={() => window.open('https://www.google.com/maps/place/Ready+Up+Game+Store/@40.7705142,-82.595924,17z/data=!4m15!1m8!3m7!1s0x883994e546db3ab5:0x86f1169f0b64844!2s676+Richland+Mall,+Ontario,+OH+44906!3b1!8m2!3d40.7705142!4d-82.5933491!16s%2Fg%2F11c4n_hyl7!3m5!1s0x8839950fc2c08709:0xb4f5942d36173c4!8m2!3d40.7705142!4d-82.5933491!16s%2Fg%2F11y2ch3w_j?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D', '_blank')}
          >
            <Navigation className="w-5 h-5 mr-2" />
            Get Directions
          </Button>
        </div>

      </div>
    </section>
  );
};

export default SellSection;