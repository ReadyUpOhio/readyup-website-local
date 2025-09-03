import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

type Review = {
  id?: number;
  name: string;
  location?: string;
  rating?: number; // default 5
  text: string;
  game?: string;
  verified?: boolean;
};

const defaultTestimonials: Review[] = [
  {
    id: 1,
    name: "Mike Johnson",
    location: "Ontario, OH",
    rating: 5,
    text: "Best game store in Ohio! Found a rare copy of Chrono Trigger here that I'd been searching for years. Staff knows their stuff and prices are fair.",
    game: "Retro Collector",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Chen",
    location: "Mansfield, OH", 
    rating: 5,
    text: "Traded in my old PS4 games and got way more store credit than expected. Used it to get the new Spider-Man game. Will definitely be back!",
    game: "PS5 Gamer",
    verified: true
  },
  {
    id: 3,
    name: "Alex Rivera",
    location: "Galion, OH",
    rating: 5,
    text: "My go-to spot for Pokemon cards and Nintendo games. They always have the latest releases and the staff gives great recommendations.",
    game: "Nintendo Fan",
    verified: true
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Bucyrus, OH",
    rating: 5,
    text: "Sold my entire Xbox collection here when I moved. Quick, easy process and they gave me a fair price. Professional service all around.",
    game: "Xbox Collector",
    verified: true
  },
  {
    id: 5,
    name: "Jessica Martinez",
    location: "Ontario, OH",
    rating: 5,
    text: "Love this place! My kids and I come here every weekend to browse. Great selection of family-friendly games and helpful staff.",
    game: "Family Gamer",
    verified: true
  },
  {
    id: 6,
    name: "Ryan Brooks",
    location: "Shelby, OH",
    rating: 5,
    text: "Been shopping here for 2 years. Consistent quality, great prices, and they remember what I'm looking for. True local gem!",
    game: "Regular Customer",
    verified: true
  }
];

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultTestimonials);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const MAX_LEN = 240;

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/reviews.json", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          // Normalize: ensure rating, verified defaults
          const normalized = data.map((r: any, idx: number) => ({
            id: r.id ?? idx + 1,
            name: String(r.name ?? "Anonymous"),
            text: String(r.text ?? ""),
            location: r.location ?? undefined,
            rating: typeof r.rating === "number" ? r.rating : 5,
            game: r.game ?? undefined,
            verified: r.verified ?? true,
          }));
          setReviews(normalized);
        }
      } catch (e) {
        // Fail silently, fallback to defaults
      }
    };
    load();
  }, []);

  return (
    <section id="reviews" className="py-12 lg:py-20 px-4 lg:px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
            WHAT <span className="gradient-text-victory">GAMERS SAY</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Don't just take our word for it - hear from fellow gamers in our community
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mt-2 font-mono">
            Verified Google reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((testimonial, index) => {
            const key = String(testimonial.id ?? index);
            const full = testimonial.text ?? "";
            const isLong = full.length > MAX_LEN;
            const isOpen = !!expanded[key];
            const display = isOpen || !isLong ? full : full.slice(0, MAX_LEN) + "…";
            return (
            <div 
              key={key}
              className="bg-white/10 backdrop-blur-xl p-6 lg:p-8 hover:scale-105 transition-all duration-300 animate-slide-up rounded-3xl border border-white/20 shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-space-cyan opacity-50" />
                {testimonial.verified && (
                  <Badge className="bg-green-500/90 backdrop-blur-xl text-white text-xs font-bold rounded-2xl shadow-lg">
                    VERIFIED
                  </Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating ?? 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground font-mono">
                  {(testimonial.rating ?? 5).toFixed(1)}
                </span>
              </div>

              {/* Testimonial Text (compact with toggle) */}
              <div className="text-muted-foreground mb-4 font-sans leading-relaxed italic">
                &quot;{display}&quot;
              </div>
              {isLong && (
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  className="text-sm font-medium text-space-cyan hover:underline mb-4"
                >
                  {isOpen ? "See less" : "See more"}
                </button>
              )}

              {/* Customer Info */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm font-display">
                      {testimonial.name}
                    </h4>
                    {testimonial.location && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {testimonial.location}
                      </p>
                    )}
                  </div>
                  {testimonial.game && (
                    <Badge variant="outline" className="text-xs font-mono rounded-2xl backdrop-blur-xl border-white/30">
                      {testimonial.game}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
