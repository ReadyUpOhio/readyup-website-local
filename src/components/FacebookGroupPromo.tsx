import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const FacebookGroupPromo = () => {
  return (
    <section className="py-12 lg:py-20 px-4 lg:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/10 text-center">
          <div className="inline-flex items-center bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Community</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold font-orbitron mb-4">
            The Rare Collective
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our exclusive Facebook group for buying, selling, and trading rare games, cards, and collectibles. Connect with fellow enthusiasts and find your next treasure.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={() => window.open('https://www.facebook.com/groups/752309750095859', '_blank', 'noopener,noreferrer')}
          >
            Join Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FacebookGroupPromo;
