import { Facebook, ExternalLink, MessageCircle, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialPlatforms = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/readyupgamestore",
    color: "from-blue-600 to-blue-700",
    hoverColor: "hover:from-blue-700 hover:to-blue-800"
  },
  {
    name: "eBay Store",
    icon: ExternalLink,
    url: "https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop",
    color: "from-yellow-500 to-orange-500",
    hoverColor: "hover:from-yellow-600 hover:to-orange-600"
  },
  {
    name: "TikTok",
    icon: MessageCircle,
    url: "https://www.tiktok.com/@readyupgs",
    color: "from-pink-500 to-purple-600",
    hoverColor: "hover:from-pink-600 hover:to-purple-700"
  },
  {
    name: "Whatnot",
    icon: ExternalLink,
    url: "https://www.whatnot.com/user/readyupohio",
    color: "from-purple-500 to-pink-500",
    hoverColor: "hover:from-purple-600 hover:to-pink-600"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@ReadyUpVlogs/shorts",
    color: "from-red-500 to-red-600",
    hoverColor: "hover:from-red-600 hover:to-red-700"
  }
];

const SocialMedia = () => {
  return (
    <section id="social" className="py-12 lg:py-20 px-4 lg:px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text-space">CONNECT</span> WITH US
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Follow us on social media for the latest updates, gaming content, and community events
          </p>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-4xl mx-auto mb-12">
          {socialPlatforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.name}
                className="group bg-white/10 backdrop-blur-xl p-6 text-center hover:scale-105 transition-all duration-300 animate-slide-up rounded-3xl border border-white/20 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${platform.color} p-3 lg:p-4 group-hover:fighter-pulse shadow-lg backdrop-blur-xl`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-sm lg:text-base font-bold mb-3 font-display">
                  {platform.name}
                </h3>
                
                <Button
                  className={`w-full bg-gradient-to-r ${platform.color} ${platform.hoverColor} text-white font-sans font-bold border-0 text-xs lg:text-sm rounded-2xl backdrop-blur-xl shadow-lg`}
                  size="sm"
                  onClick={() => window.open(platform.url, '_blank')}
                >
                  FOLLOW
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
