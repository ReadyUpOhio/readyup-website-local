import { Star, Tag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import sf2Game1 from "@/assets/game1.jpg";
import sf2Game2 from "@/assets/game2.jpg";
import sf2Game3 from "@/assets/game3.jpg";
import sf2Game4 from "@/assets/sf2-game1.jpg";
import sf2Game5 from "@/assets/sf2-game2.jpg";
import sf2Game6 from "@/assets/sf2-game3.jpg";

const featuredProducts = [
  {
    id: 1,
    title: "Call of Duty: Modern Warfare III",
    platform: "PS5",
    image: sf2Game1,
    badge: "IN STOCK",
    rating: 4.8,
    description: "Latest military shooter with enhanced graphics and multiplayer modes"
  },
  {
    id: 2,
    title: "Super Mario Bros. Wonder",
    platform: "Nintendo Switch",
    image: sf2Game2,
    badge: "NEW ARRIVAL",
    rating: 4.9,
    description: "Nintendo's newest platformer with innovative Wonder Flower mechanics"
  },
  {
    id: 3,
    title: "Spider-Man 2",
    platform: "PS5",
    image: sf2Game3,
    badge: "POPULAR",
    rating: 4.7,
    description: "Swing through New York as both Spider-Man and Miles Morales"
  },
  {
    id: 4,
    title: "The Legend of Zelda: TOTK",
    platform: "Nintendo Switch",
    image: sf2Game4,
    badge: "STAFF PICK",
    rating: 5.0,
    description: "Epic adventure with building mechanics and vast open world"
  },
  {
    id: 5,
    title: "Hogwarts Legacy",
    platform: "Xbox Series X",
    image: sf2Game5,
    badge: "AVAILABLE",
    rating: 4.6,
    description: "Experience the wizarding world in this immersive RPG adventure"
  },
  {
    id: 6,
    title: "FIFA 24",
    platform: "PS5",
    image: sf2Game6,
    badge: "SPORTS",
    rating: 4.3,
    description: "The ultimate football simulation with updated teams and gameplay"
  }
];

const FeaturedGames = () => {
  return (
    <section className="py-12 lg:py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text-fighter">GAMES</span> SHOWCASE
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Check out our current selection - visit our store to see availability and pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => {
            return (
              <div 
                key={product.id}
                className="group arcade-card overflow-hidden hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-48 lg:h-56">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <Badge className={`absolute top-4 left-4 border-0 font-bold text-xs px-3 py-1 ${
                    product.badge === 'IN STOCK' ? 'bg-green-500 text-white' :
                    product.badge === 'NEW ARRIVAL' ? 'bg-blue-500 text-white' :
                    product.badge === 'POPULAR' ? 'bg-red-500 text-white' :
                    product.badge === 'STAFF PICK' ? 'bg-purple-500 text-white' :
                    product.badge === 'AVAILABLE' ? 'bg-cyan-500 text-white' :
                    'bg-orange-500 text-white'
                  }`}>
                    {product.badge}
                  </Badge>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span className="text-white text-xs font-bold">{product.rating}</span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {product.platform}
                    </Badge>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <span className="text-xs font-bold">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 font-display group-hover:text-sf2-blue transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 font-sans leading-relaxed">
                    {product.description}
                  </p>
                  
                  <Button 
                    className="w-full fighter-button font-sans font-bold text-sm"
                    size="sm"
                  >
                    ASK IN STORE
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="fighter-button text-lg px-8 py-3 font-sans font-bold"
          >
            VISIT OUR STORE
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;