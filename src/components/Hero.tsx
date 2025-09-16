import { Button } from "@/components/ui/button";
import { MapPin, Trophy, Star, GamepadIcon } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
      {/* Glass overlay background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Enhanced space floating elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-space-blue/20 to-transparent rounded-full blur-2xl space-float backdrop-blur-sm"></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 lg:w-64 lg:h-64 bg-gradient-to-br from-space-purple/15 to-transparent rounded-full blur-2xl space-drift backdrop-blur-sm"></div>
      <div className="absolute top-1/2 left-1/6 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-space-cyan/20 to-transparent rounded-full blur-xl space-float backdrop-blur-sm" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-3/4 right-1/3 w-20 h-20 lg:w-28 lg:h-28 bg-gradient-to-br from-space-pink/15 to-transparent rounded-full blur-xl space-drift backdrop-blur-sm" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-1/6 left-3/4 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-space-indigo/20 to-transparent rounded-full blur-lg space-float backdrop-blur-sm" style={{ animationDelay: '6s' }}></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 mb-6 shadow-lg">
            <GamepadIcon className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-100 font-medium">ONTARIO CENTER MALL</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-transparent animate-gradient-sweep bg-[size:200%_auto]">READY UP</span>
            <br />
            <span className="text-white">GAMESTORE</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light mb-8">
            A place for players, collectors, and families. Discover games, trade cards, and share your passion with a community built on trust, fair prices, and unforgettable finds.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-base sm:text-lg px-8 py-4 font-semibold min-h-[52px] w-full sm:w-auto rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-xl shadow-lg"
              onClick={() => window.open('https://www.google.com/maps/place/Ready+Up+Game+Store/@40.7705142,-82.595924,17z/data=!4m15!1m8!3m7!1s0x883994e546db3ab5:0x86f1169f0b64844!2s676+Richland+Mall,+Ontario,+OH+44906!3b1!8m2!3d40.7705142!4d-82.5933491!16s%2Fg%2F11c4n_hyl7!3m5!1s0x8839950fc2c08709:0xb4f5942d36173c4!8m2!3d40.7705142!4d-82.5933491!16s%2Fg%2F11y2ch3w_j?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D', '_blank')}
            >
              <MapPin className="w-5 h-5 mr-2" />
              VISIT US
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-base sm:text-lg px-8 py-4 font-semibold min-h-[52px] w-full sm:w-auto rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-xl shadow-lg animate-bounce-slow"
              onClick={() => window.open('https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop', '_blank')}
            >
              SHOP
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;