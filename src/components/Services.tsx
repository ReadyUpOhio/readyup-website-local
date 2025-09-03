import { DollarSign, RefreshCw, ExternalLink, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: 1,
    title: "EBAY STORE",
    description: "Browse our complete online inventory on eBay",
    icon: ExternalLink,
    features: ["Live Inventory", "Secure Checkout", "Worldwide Shipping"],
    highlight: "Shop Online",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    title: "SELL & TRADE",
    description: "Turn your games into cash or store credit with bonus value",
    icon: RefreshCw,
    features: ["Instant Cash Offers", "25% Bonus Store Credit", "Fair Market Prices", "No Expiration on Credit"],
    highlight: "Best Value",
    color: "from-blue-500 to-blue-700"
  }
];

const guarantees = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "All games tested & working"
  },
  {
    icon: Clock,
    title: "30-Day Returns",
    description: "Full refund or exchange"
  },
  {
    icon: Award,
    title: "Expert Staff",
    description: "Gaming enthusiasts helping gamers"
  }
];

const Services = () => {
  return (
    <section className="py-12 lg:py-20 px-4 lg:px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text-fighter">SHOP</span> & TRADE
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Browse our eBay store online or visit us in-store to sell and trade your games
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="group bg-white/10 backdrop-blur-xl p-6 lg:p-8 text-center hover:scale-105 transition-all duration-300 animate-slide-up rounded-3xl border border-white/20 shadow-lg"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Special eBay Section for first service */}
                {service.id === 1 ? (
                  <>
                    {/* eBay Logo Area */}
                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-4 lg:p-5 group-hover:fighter-pulse flex items-center justify-center shadow-lg backdrop-blur-xl">
                      <span className="text-white font-bold text-lg lg:text-xl">eBay</span>
                    </div>
                    
                    {/* Badge */}
                    <Badge className="mb-4 bg-blue-500/90 backdrop-blur-xl text-white font-bold text-xs rounded-2xl shadow-lg">
                      LIVE INVENTORY
                    </Badge>
                    
                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 font-display group-hover:text-blue-400 transition-colors">
                      SHOP OUR EBAY STORE
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground mb-6 font-sans leading-relaxed">
                      Browse our complete online inventory with live updates, secure checkout, and worldwide shipping available.
                    </p>
                    
                    {/* eBay Features */}
                    <ul className="space-y-2 mb-6 text-sm">
                      <li className="flex items-center justify-center text-muted-foreground font-sans">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        Real-time Inventory
                      </li>
                      <li className="flex items-center justify-center text-muted-foreground font-sans">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        Buyer Protection
                      </li>
                      <li className="flex items-center justify-center text-muted-foreground font-sans">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        Fast Shipping
                      </li>
                    </ul>
                    
                    {/* eBay Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-sans font-bold border-0 rounded-2xl backdrop-blur-xl shadow-lg"
                      size="lg"
                      onClick={() => window.open('https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      VIEW EBAY STORE
                    </Button>
                  </>
                ) : service.id === 2 ? (
                  <>
                    {/* Combined Sell & Trade Layout */}
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.color} p-4 lg:p-5 group-hover:fighter-pulse shadow-lg backdrop-blur-xl`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-xs rounded-2xl backdrop-blur-xl shadow-lg">
                      {service.highlight}
                    </Badge>
                    
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 font-display group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 font-sans leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Sell & Trade Options */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-blue-500/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-lg">
                        <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <h4 className="font-bold text-sm text-blue-500 mb-1">SELL FOR CASH</h4>
                        <p className="text-xs text-muted-foreground">Instant payment</p>
                      </div>
                      <div className="text-center p-3 bg-blue-400/20 backdrop-blur-xl rounded-2xl border border-blue-400/30 shadow-lg">
                        <RefreshCw className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                        <h4 className="font-bold text-sm text-blue-400 mb-1">TRADE FOR CREDIT</h4>
                        <p className="text-xs text-muted-foreground">+25% bonus value</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6 text-sm">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center text-muted-foreground font-sans">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            idx < 2 ? 'bg-blue-500' : 'bg-blue-400'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-sans font-bold border-0 rounded-2xl backdrop-blur-xl shadow-lg"
                      size="lg"
                    >
                      GET QUOTE
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Fallback Regular Service Layout */}
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br ${service.color} p-4 lg:p-5 group-hover:fighter-pulse`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    <Badge className="mb-4 bg-space-cyan text-black font-bold text-xs">
                      {service.highlight}
                    </Badge>
                    
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 font-display group-hover:text-space-cyan transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 font-sans leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6 text-sm">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center text-muted-foreground font-sans">
                          <div className="w-1.5 h-1.5 bg-space-cyan rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full fighter-button font-sans font-bold"
                      size="lg"
                    >
                      GET STARTED
                    </Button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Guarantees */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-lg">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 font-display">
            Why Choose <span className="gradient-text-space">Ready Up Gamestore</span>?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <div 
                  key={index}
                  className="text-center group"
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-3 lg:p-4 group-hover:scale-110 transition-transform shadow-lg backdrop-blur-xl">
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  <h4 className="text-lg font-bold mb-2 font-display">
                    {guarantee.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm font-sans">
                    {guarantee.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
