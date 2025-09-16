import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Calendar, User, Clock, Eye, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import getSupabase from "@/lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  read_time: string;
  category: string;
  image_url?: string;
  views?: number;
  comments?: number;
  tags?: string[];
  content?: string; // HTML
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setPost(data);
        } else {
          setError("Post not found.");
        }
      } catch (e: any) {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Ready Up Blog`;
    }
  }, [post?.title]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 container mx-auto px-4">
          <div className="text-center text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 container mx-auto px-4">
          <div className="glass-card p-8 rounded-2xl text-center">
            <p className="mb-6">{error || "Post not found."}</p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-6">
              <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-space-cyan">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {(post.tags || []).map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 bg-gradient-to-r from-space-blue via-space-purple to-space-cyan bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.read_time}
              </div>
            </div>

            {post.image_url ? (
              <div className="rounded-2xl overflow-hidden border border-white/10 mb-8">
                <img src={post.image_url} alt={post.title} className="w-full max-h-[480px] object-cover" />
              </div>
            ) : null}

            <article className="prose prose-invert max-w-none">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p className="text-muted-foreground">{post.excerpt}</p>
              )}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
