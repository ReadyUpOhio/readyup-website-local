import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MessageCircle, ArrowRight, Clock } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Games Adam Hates",
    excerpt: "Discover the hidden gems that are taking the gaming world by storm. From puzzle platformers to narrative adventures...",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Reviews",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
    comments: 24
  },
  {
    id: 2,
    title: "Ready Up Exclusive: Developer Interview",
    excerpt: "We sat down with the creators of the upcoming space exploration game 'Stellar Horizons' to discuss their vision...",
    author: "Mike Rodriguez",
    date: "2024-01-12", 
    readTime: "8 min read",
    category: "Interviews",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=250&fit=crop",
    comments: 42
  },
  {
    id: 3,
    title: "Gaming Setup Guide: Budget vs Premium",
    excerpt: "Building the perfect gaming setup doesn't have to break the bank. Here's our complete guide to getting started...",
    author: "Alex Kim",
    date: "2024-01-10",
    readTime: "12 min read", 
    category: "Guides",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    comments: 18
  }
];

const Blog = () => {
  return (
    <section className="py-12 lg:py-20 px-4 lg:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-orbitron">
            <span className="gradient-text-ready">GAMING</span> BLOG
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-orbitron">
            Latest news, reviews, and insights from the gaming universe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id} 
              className="arcade-card rounded-lg overflow-hidden group animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Featured Image */}
              <div className="relative overflow-hidden h-48 lg:h-56">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <Badge className="absolute top-3 left-3 bg-ready-blue/90 text-white border-0 text-xs font-orbitron font-bold">
                  {post.category.toUpperCase()}
                </Badge>

                {/* Read Time */}
                <div className="absolute bottom-3 right-3 flex items-center text-white text-xs font-orbitron">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 lg:p-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    <span className="font-orbitron text-xs">{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-orbitron text-xs">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-bold mb-3 text-foreground group-hover:text-ready-blue transition-colors font-orbitron line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 text-sm lg:text-base line-clamp-3 font-orbitron">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span className="font-orbitron text-xs">{post.comments}</span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-ready-cyan hover:text-ready-blue p-0 font-orbitron font-bold text-xs">
                    READ MORE <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 lg:mt-12">
          <Button size="lg" variant="outline" className="arcade-card border-ready-blue/50 hover:border-ready-blue text-lg px-8 py-3 font-orbitron font-bold" onClick={() => (window.location.href = '/blog')}>
            VIEW ALL POSTS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;