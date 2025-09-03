import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, Star, ShoppingCart, Heart, Eye, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Games", count: 156 },
    { id: "action", label: "Action", count: 45 },
    { id: "rpg", label: "RPG", count: 32 },
    { id: "strategy", label: "Strategy", count: 28 },
    { id: "indie", label: "Indie", count: 51 },
  ];

  const featuredGames = [
    {
      id: 1,
      title: "Cyberpunk Odyssey",
      price: "$59.99",
      originalPrice: "$79.99",
      discount: "-25%",
      rating: 4.8,
      reviews: 1247,
      category: "action",
      image: "/api/placeholder/300/400",
      isOnSale: true,
      playersOnline: 15420,
      tags: ["Cyberpunk", "Open World", "RPG"]
    },
    {
      id: 2,
      title: "Mystic Realms",
      price: "$39.99",
      rating: 4.6,
      reviews: 892,
      category: "rpg",
      image: "/api/placeholder/300/400",
      isOnSale: false,
      playersOnline: 8950,
      tags: ["Fantasy", "Magic", "Adventure"]
    },
    {
      id: 3,
      title: "Space Conquest",
      price: "$49.99",
      originalPrice: "$69.99",
      discount: "-29%",
      rating: 4.9,
      reviews: 2156,
      category: "strategy",
      image: "/api/placeholder/300/400",
      isOnSale: true,
      playersOnline: 22340,
      tags: ["Space", "Strategy", "4X"]
    },
    {
      id: 4,
      title: "Neon Runner",
      price: "$19.99",
      rating: 4.4,
      reviews: 567,
      category: "indie",
      image: "/api/placeholder/300/400",
      isOnSale: false,
      playersOnline: 3420,
      tags: ["Indie", "Platformer", "Retro"]
    },
    {
      id: 5,
      title: "Dragon's Legacy",
      price: "$44.99",
      originalPrice: "$59.99",
      discount: "-25%",
      rating: 4.7,
      reviews: 1834,
      category: "rpg",
      image: "/api/placeholder/300/400",
      isOnSale: true,
      playersOnline: 12670,
      tags: ["Dragons", "Epic", "Fantasy"]
    },
    {
      id: 6,
      title: "Mech Warriors",
      price: "$54.99",
      rating: 4.5,
      reviews: 1023,
      category: "action",
      image: "/api/placeholder/300/400",
      isOnSale: false,
      playersOnline: 9850,
      tags: ["Mech", "Combat", "Multiplayer"]
    }
  ];

  const filteredGames = selectedCategory === "all" 
    ? featuredGames 
    : featuredGames.filter(game => game.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-space-blue via-space-purple to-space-cyan bg-clip-text text-transparent mb-6">
              Game Store
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover amazing games, connect with fellow gamers, and build your ultimate gaming library.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search for games, genres, or developers..." 
                  className="pl-12 pr-16 h-14 text-lg glass-card border-space-blue/30 focus:border-space-cyan"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-space-blue/20"
                >
                  <Filter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`font-orbitron ${
                    selectedCategory === category.id 
                      ? "bg-gradient-to-r from-space-blue to-space-cyan" 
                      : "border-space-purple/50 hover:bg-space-purple/10"
                  }`}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.map((game) => (
                <div key={game.id} className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 group">
                  {/* Game Image */}
                  <div className="relative">
                    <div className="aspect-[3/4] bg-gradient-to-br from-space-purple/20 to-space-blue/20 flex items-center justify-center">
                      <div className="text-4xl opacity-50">🎮</div>
                    </div>
                    
                    {/* Overlays */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {game.isOnSale && (
                        <Badge className="bg-destructive text-destructive-foreground font-bold">
                          {game.discount}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="sm" className="hover:bg-space-blue/20 backdrop-blur-sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Quick Actions (appear on hover) */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <Button variant="outline" size="sm" className="backdrop-blur-sm border-white/20">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button className="bg-gradient-to-r from-space-blue to-space-cyan">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {game.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-orbitron mb-2 text-foreground group-hover:text-space-cyan transition-colors">
                      {game.title}
                    </h3>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{game.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({game.reviews.toLocaleString()} reviews)
                      </span>
                    </div>

                    {/* Players Online */}
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-space-cyan" />
                      <span className="text-sm text-muted-foreground">
                        {game.playersOnline.toLocaleString()} online
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {game.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {game.originalPrice}
                          </span>
                        )}
                        <span className="text-xl font-bold text-space-cyan">
                          {game.price}
                        </span>
                      </div>
                      
                      <Button size="sm" className="bg-gradient-to-r from-space-purple to-space-pink">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-space-blue/50 hover:bg-space-blue/10 font-orbitron">
                Load More Games
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl bg-gradient-to-r from-space-purple/10 to-space-cyan/10">
              <h2 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent">
                Never Miss a Deal
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get notified about new releases, exclusive discounts, and community events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  className="glass-card border-space-purple/30"
                />
                <Button className="bg-gradient-to-r from-space-purple to-space-cyan font-orbitron">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;