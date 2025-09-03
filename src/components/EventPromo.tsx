import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Users } from "lucide-react";
import { useEffect, useState } from "react";

const EventPromo = () => {
  const events = [
    {
      id: "rare-swap",
      title: "RARE SWAP MEET",
      dateText: "November 1st, 2024",
      description:
        "Join us for our exclusive collectibles swap meet! Trade, buy, and sell rare cards, games, and collectibles with fellow enthusiasts. Connect with the community and discover hidden treasures.",
      badges: ["Open to All Collectors", "Free Entry", "Rare Finds Guaranteed"],
      imageUrl: "/rareswap-meet-banner.jpg",
      ctaLabel: "LEARN MORE & RSVP",
      ctaUrl: "https://rareswapmeet.squarespace.com/",
    },
    {
      id: "trade-day",
      title: "READY UP TRADE DAY",
      dateText: "Coming Soon",
      description:
        "Collectors meet at Ready Up Gamestore to trade cards and video games with other collectors. Stay tuned for the official date!",
      badges: ["Collector Meet-Up", "Trading Cards", "Video Games"],
      imageUrl: "/trade-day-banner.svg",
      ctaLabel: undefined,
      ctaUrl: undefined,
    },
  ] as const;

  const [index, setIndex] = useState(0);
  const current = events[index];

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % events.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => setIndex(i % events.length);

  return (
    <section id="events" className="py-12 lg:py-16 px-4 lg:px-6 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-blue-500/30 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-500">
            {/* Event Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center bg-blue-500/30 backdrop-blur-xl px-4 py-2 rounded-2xl border border-blue-500/40 mb-4">
                <Calendar className="w-4 h-4 text-blue-300 mr-2" />
                <span className="text-sm text-blue-200 font-medium">UPCOMING EVENT</span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {current.title}
                </span>
              </h2>

              <div className="flex items-center space-x-2 text-xl lg:text-2xl font-semibold text-white mb-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <span>{current.dateText}</span>
              </div>

              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-blue-200 mb-6">
                {current.badges.map((b, i) => (
                  <div key={i} className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${i % 2 === 0 ? 'bg-blue-400' : 'bg-cyan-400'}`}></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {current.ctaUrl && current.ctaLabel ? (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 text-base lg:text-lg px-8 py-4 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-xl shadow-lg"
                  onClick={() => window.open(current.ctaUrl!, '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {current.ctaLabel}
                </Button>
              ) : (
                <div className="text-blue-200/80 text-sm font-medium">Details coming soon. Stay tuned!</div>
              )}

              {/* Dots */}
              <div className="flex items-center gap-2 pt-2">
                {events.map((e, i) => (
                  <button
                    key={e.id}
                    onClick={() => goTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? 'bg-cyan-400 scale-110' : 'bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Event Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="w-full h-64 lg:h-80 object-cover object-center transition-all duration-500 brightness-75 contrast-110 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/20">
                    <p className="text-white font-semibold text-sm lg:text-base">
                      🎯 Trading Cards • 🎮 Retro Games • 🏆 Collectibles
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventPromo;
