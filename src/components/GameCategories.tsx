import { Gamepad2, Monitor, Headphones, Smartphone, Cpu, Joystick } from "lucide-react";

const categories = [
  {
    icon: Gamepad2,
    name: "CONSOLES",
    count: "All Gens",
    color: "from-blue-500 to-blue-700"
  },
  {
    icon: Monitor,
    name: "PC GAMES",
    count: "Latest", 
    color: "from-green-500 to-green-700"
  },
  {
    icon: Smartphone,
    name: "RETRO",
    count: "Classics",
    color: "from-purple-500 to-purple-700"
  },
  {
    icon: Headphones,
    name: "ACCESSORIES",
    count: "Premium",
    color: "from-orange-500 to-orange-700"
  },
  {
    icon: Cpu,
    name: "TRADING CARDS",
    count: "TCG",
    color: "from-red-500 to-red-700"
  },
  {
    icon: Joystick,
    name: "COLLECTIBLES",
    count: "Rare",
    color: "from-cyan-500 to-cyan-700"
  }
];

const GameCategories = () => {
  return (
    <section className="py-12 lg:py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
            SHOP BY <span className="gradient-text-victory">CATEGORY</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Find exactly what you're looking for in our organized collections
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.name}
                className="group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="arcade-card p-4 lg:p-6 text-center h-full hover:scale-105 transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 rounded-lg bg-gradient-to-br ${category.color} p-3 lg:p-4 group-hover:fighter-pulse retro-float`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Category Name */}
                  <h3 className="text-sm lg:text-lg font-bold mb-1 lg:mb-2 group-hover:text-ready-blue transition-colors font-display">
                    {category.name}
                  </h3>
                  
                  {/* Category Description */}
                  <p className="text-xs lg:text-sm text-muted-foreground font-sans">
                    {category.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GameCategories;