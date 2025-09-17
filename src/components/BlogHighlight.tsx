import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import getSupabase from '@/lib/supabaseClient';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image_url?: string;
  slug?: string;
  category: string;
}

const BlogHighlight = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = getSupabase();
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, excerpt, image_url, slug, category')
          .eq('status', 'published')
          .order('date', { ascending: false })
          .limit(3);

        if (error) throw error;
        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">Loading latest articles...</p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't render the section if there are no posts
  }

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent mb-4">
            Latest From The Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out our recent articles, guides, and news from the gaming world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="glass-card rounded-3xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-space-cyan/10">
              <div className="aspect-[16/10] bg-gradient-to-br from-space-purple/20 to-space-blue/20 overflow-hidden">
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-3 capitalize">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-bold font-orbitron mb-3 text-foreground group-hover:text-space-cyan transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-space-cyan group-hover:underline">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button variant="outline" size="lg" className="border-space-blue/50 hover:bg-space-blue/10 font-orbitron">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlight;
