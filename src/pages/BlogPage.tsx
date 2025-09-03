import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, MessageCircle, Eye, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch("/blogs.json", { cache: "no-store" });
        const seed = await res.json();
        const storedRaw = localStorage.getItem("adminBlogs");
        const stored = storedRaw ? JSON.parse(storedRaw) : [];
        const merged = [...seed, ...stored].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(merged);
      } catch (e: any) {
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => {
      const key = (p.category || "uncategorized").toLowerCase();
      map.set(key, (map.get(key) || 0) + 1);
    });
    const arr = Array.from(map.entries()).map(([id, count]) => ({ id, label: id.charAt(0).toUpperCase() + id.slice(1), count }));
    const total = posts.length;
    return [{ id: "all", label: "All Posts", count: total }, ...arr];
  }, [posts]);

  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((post) => (post.category || "").toLowerCase() === selectedCategory);

  const featuredPost = posts[0];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-orbitron bg-gradient-to-r from-space-blue via-space-purple to-space-cyan bg-clip-text text-transparent mb-6">
              Gaming Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Stay updated with the latest gaming news, reviews, guides, and community stories from fellow gamers.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold font-orbitron mb-8 text-center bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent">
              Featured Article
            </h2>
            
            {loading ? (
              <div className="text-center text-muted-foreground">Loading posts...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : !featuredPost ? (
              <div className="text-center text-muted-foreground">No posts yet.</div>
            ) : (
            <div className="glass-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
              <div className="md:flex">
                {/* Featured Image */}
                <div className="md:w-1/2">
                  <div className="aspect-[16/10] bg-gradient-to-br from-space-purple/20 to-space-blue/20 flex items-center justify-center">
                    <div className="text-6xl opacity-50">📝</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(featuredPost.tags || []).map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl font-bold font-orbitron mb-4 text-foreground hover:text-space-cyan transition-colors">
                    <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {(featuredPost.views ?? 0).toLocaleString()}
                    </div>
                  </div>
                  
                  <Link to={`/blog/${featuredPost.id}`}>
                    <Button className="bg-gradient-to-r from-space-blue to-space-cyan font-orbitron">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            )}
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

        {/* Blog Posts Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            {loading || error || !featuredPost ? null : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <article key={post.id} className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 group">
                  {/* Post Image */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-space-purple/20 to-space-blue/20 flex items-center justify-center">
                    <div className="text-4xl opacity-50">📝</div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <Badge 
                      variant="secondary" 
                      className="mb-3 capitalize"
                    >
                      {post.category}
                    </Badge>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold font-orbitron mb-3 text-foreground group-hover:text-space-cyan transition-colors line-clamp-2">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {(post.views ?? 0).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments ?? 0}
                        </div>
                      </div>
                      
                      <Link to={`/blog/${post.id}`} className="inline-flex items-center">
                        <Button variant="ghost" size="sm" className="hover:text-space-cyan">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            )}

            {/* Load More */}
            {loading || error ? null : (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="border-space-blue/50 hover:bg-space-blue/10 font-orbitron">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl bg-gradient-to-r from-space-purple/10 to-space-cyan/10">
              <h2 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent">
                Stay in the Loop
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the latest gaming articles, reviews, and community updates delivered straight to your inbox.
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

export default BlogPage;