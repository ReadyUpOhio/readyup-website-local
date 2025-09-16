import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";

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

const EventCard = ({ event }: { event: typeof events[number] }) => {
  const content = (
    <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border shadow-lg overflow-hidden h-full flex flex-col md:flex-row">
      <img src={event.imageUrl} alt={event.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold font-display mb-2">{event.title}</h3>
        <div className="flex items-center text-muted-foreground mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{event.dateText}</span>
        </div>
        <p className="text-muted-foreground mb-4 flex-grow">{event.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {event.badges.map((badge, i) => (
            <span key={i} className="bg-primary/20 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              {badge}
            </span>
          ))}
        </div>
        {event.ctaUrl && event.ctaLabel ? (
          <Button size="lg" className="fighter-button mt-auto font-semibold self-start">
            <ExternalLink className="w-4 h-4 mr-2" />
            {event.ctaLabel}
          </Button>
        ) : (
          <div className="text-sm text-muted-foreground mt-auto py-2">More info coming soon!</div>
        )}
      </div>
    </div>
  );

  if (event.ctaUrl) {
    return (
      <a href={event.ctaUrl} target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform duration-300">
        {content}
      </a>
    );
  }

  return content;
};

const Events = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">Upcoming Events</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Join us for exciting events, tournaments, and community meet-ups!</p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
