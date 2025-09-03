import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CollectionSellSummary = () => {
  return (
    <section id="sell" className="py-12 lg:py-20 px-4 lg:px-6 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <Badge className="bg-blue-500/30 backdrop-blur-xl text-blue-400 border-blue-500/40 text-sm font-mono font-medium mb-4 rounded-2xl shadow-lg">
            💰 CASH FOR YOUR COLLECTION
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
            TURN YOUR GAMES INTO <span className="gradient-text-space">INSTANT CASH</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-sans mb-6">
            Got a collection of games, cards, or collectibles? We offer competitive prices and a hassle-free process to turn your items into cash.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <Link to="/sell">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-sans font-bold rounded-2xl backdrop-blur-xl shadow-lg"
                size="lg"
              >
                Get an Online Offer
              </Button>
            </Link>
            <Button 
              variant="outline"
              className="rounded-2xl backdrop-blur-xl border-white/30"
              onClick={() => window.open('https://www.google.com/maps/place/Ready+Up+Game+Store/@40.7705142,-82.595924,17z/data=!4m15!1m8!3m7!1s0x883994e546db3ab5:0x86f1169f0b64844!2s676+Richland+Mall,+Ontario,+OH+44906!3b1!8m2!3d40.7705142!4d-82.5933491!16s%2Fg%2F11c4n_hyl7!3m5!1s0x8839950fc2c08709:0xb4f5942d36173c4!8m2!3d40.7705142!4d-82.5933491!16s%2Fg%2F11y2ch3w_j?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D', '_blank')}
              size="lg"
            >
              Visit Us In Store
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSellSummary;
