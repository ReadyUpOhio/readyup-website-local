import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { type Session } from "@supabase/supabase-js";
import supabase from "@/lib/supabaseClient";
import { ApplicationViewer, type ApplicationFull } from '@/components/ApplicationViewer';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO string
  readTime: string;
  category: string;
  image?: string;
  views?: number;
  comments?: number;
  tags?: string[];
  content?: string; // HTML
}

interface LeadItem {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string | null;
  collection_type: string;
  description: string;
  estimated_value?: string | number | null;
  images_json?: string | null; // Changed from images to match DB
  source?: string | null;
  status?: string | null;
}

interface ContactItem {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string;
  status?: string | null;
}

interface ApplicationItem extends ApplicationFull {}

interface SubscriberItem {
  id: number;
  created_at: string;
  email: string;
}

// Supabase client is provided by src/lib/supabaseClient

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const allowedAdmins = useMemo(() => ["readyupgsl@gmail.com"], []);
  const localMode = !supabase; // when Supabase env is missing, run in local mode

  // Load initial session and subscribe to auth state changes
  useEffect(() => {
    if (!supabase) return; // local mode: skip Supabase auth wiring
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => {
      sub?.subscription?.unsubscribe();
    };
  }, []);

  // Legacy local password gate removed in favor of Supabase Auth

  const [form, setForm] = useState<BlogPost>({
    id: Date.now(),
    title: "",
    excerpt: "",
    author: "",
    date: new Date().toISOString().slice(0, 10),
    readTime: "5 min",
    category: "news",
    image: "",
    views: 0,
    comments: 0,
    tags: [],
    content: "",
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [leadFilter, setLeadFilter] = useState<'active' | 'archived' | 'all'>('active');
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [contactFilter, setContactFilter] = useState<'active' | 'archived' | 'all'>('active');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string>("");
  const [contactError, setContactError] = useState<string>("");
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [applicationFilter, setApplicationFilter] = useState<'active' | 'archived' | 'all'>('active');
  const [applicationError, setApplicationError] = useState<string>("");
  const [viewingApplication, setViewingApplication] = useState<ApplicationItem | null>(null);
  // const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  // const [subscriberError, setSubscriberError] = useState<string>("");

  // Reload helpers so actions can refresh current view
  const reloadLeads = useCallback(async () => {
    if (!supabase) return;
    try {
      setLeadError("");
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (leadFilter !== 'all') {
        query = query.eq('status', leadFilter);
      }
      const { data, error } = await query;
      if (error) throw error;
      setLeads(data as LeadItem[]);
    } catch (e: any) {
      setLeadError(String(e?.message || e || 'Failed to load leads'));
    }
  }, [leadFilter]);

  const reloadContacts = useCallback(async () => {
    if (!supabase) return;
    try {
      setContactError("");
      let query = supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (contactFilter !== 'all') {
        query = query.eq('status', contactFilter);
      }
      const { data, error } = await query;
      if (error) throw error;
      setContacts(data as ContactItem[]);
    } catch (e: any) {
      setContactError(String(e?.message || e || 'Failed to load contacts'));
    }
  }, [contactFilter]);

  const reloadApplications = useCallback(async () => {
    if (!supabase) return;
    try {
      setApplicationError("");
      let query = supabase.from('applications').select('*').order('created_at', { ascending: false });
      if (applicationFilter !== 'all') {
        query = query.eq('status', applicationFilter);
      }
      const { data, error } = await query;
      if (error) throw error;
      setApplications(data as ApplicationItem[]);
    } catch (e: any) {
      setApplicationError(String(e?.message || e || 'Failed to load applications'));
    }
  }, [applicationFilter]);

  // const reloadSubscribers = useCallback(async () => {
  //   try {
  //     setSubscriberError("");
  //     const res = await fetch(`/api/subscribers`);
  //     if (!res.ok) {
  //       const txt = await res.text().catch(() => "");
  //       throw new Error(`GET /api/subscribers failed (${res.status}): ${txt}`);
  //     }
  //     const json = await res.json().catch(() => ({}));
  //     if (json?.success && Array.isArray(json.data)) {
  //       setSubscribers(json.data as SubscriberItem[]);
  //     } else {
  //       throw new Error(json?.message || "Unexpected response for subscribers");
  //     }
  //   } catch (e: any) {
  //     setSubscriberError(String(e?.message || e || 'Failed to load subscribers'));
  //   }
  // }, []);

  useEffect(() => {
    const storedRaw = localStorage.getItem("adminBlogs");
    const stored = storedRaw ? JSON.parse(storedRaw) : [];
    setPosts(stored);

    // Load data from Supabase
    if (session || localMode) {
      reloadLeads();
      reloadContacts();
      reloadApplications();
    }

    // Realtime: subscribe to new leads, contacts, applications
    if (!localMode && supabase) {
      const leadChanges = supabase
        .channel('leads-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => reloadLeads())
        .subscribe();
      const contactChanges = supabase
        .channel('contacts-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => reloadContacts())
        .subscribe();
      const applicationChanges = supabase
        .channel('applications-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, () => reloadApplications())
        .subscribe();

      return () => {
        supabase.removeChannel(leadChanges);
        supabase.removeChannel(contactChanges);
        supabase.removeChannel(applicationChanges);
      };
    }
  }, [session, localMode, leadFilter, contactFilter, applicationFilter, reloadLeads, reloadContacts, reloadApplications]);

  const updateStatus = async (type: 'leads' | 'contacts' | 'applications', id: number | string, status: 'active' | 'archived') => {
    const entityName = type.slice(0, -1);
    try {
      if (!confirm(`Are you sure you want to ${status === 'active' ? 'restore' : 'archive'} this ${entityName}?`)) return;
      toast({ title: `Updating ${entityName}...`, description: `#${id}` });

      // NEW: Update Supabase directly
      if (!supabase) throw new Error('Supabase client not available');
      const { error } = await supabase.from(type).update({ status }).eq('id', id);
      if (error) throw error;
      
      toast({ title: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)} updated`, description: `#${id} moved to ${status}` });

      // Reload the relevant list
      if (type === 'leads') reloadLeads();
      else if (type === 'contacts') reloadContacts();
      else if (type === 'applications') reloadApplications();

    } catch (e) {
      const msg = (e as any)?.message || `Failed to update ${entityName}`;
      if (type === 'leads') setLeadError(msg);
      else if (type === 'contacts') setContactError(msg);
      else if (type === 'applications') setApplicationError(msg);
      toast({ title: 'Update failed', description: msg });
    }
  };

  // Rich text editor helpers (uses document.execCommand for simplicity)
  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
  };
  const onPasteSanitize: React.ClipboardEventHandler<HTMLDivElement> = (e) => {
    // Basic paste-as-plain-text to reduce messy HTML
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };
  const contentRef = (node: HTMLDivElement | null) => {
    if (!node) return;
    // keep innerHTML in sync from state
    if (node.innerHTML !== (form.content || "")) node.innerHTML = form.content || "";
  };
  const onInputContent: React.FormEventHandler<HTMLDivElement> = (e) => {
    const html = (e.target as HTMLDivElement).innerHTML;
    setForm((f) => ({ ...f, content: html }));
  };
  const insertLink = () => {
    const url = prompt('Enter URL');
    if (url) exec('createLink', url);
  };
  const clearFormatting = () => {
    exec('removeFormat');
  };
  const insertInlineImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      exec('insertImage', dataUrl);
      // sync state after DOM change
      const el = document.getElementById('rich-editor');
      if (el) setForm((f) => ({ ...f, content: el.innerHTML }));
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setForm((f) => ({ ...f, tags: value.split(",").map((t) => t.trim()).filter(Boolean) }));
    } else {
      setForm((f) => ({ ...f, [name]: value } as any));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // update existing
      const next = posts.map((p) => (p.id === editingId ? { ...p, ...form, id: editingId } : p));
      setPosts(next);
      localStorage.setItem("adminBlogs", JSON.stringify(next));
      setEditingId(null);
    } else {
      // create new
      const newPost: BlogPost = {
        ...form,
        id: Date.now(),
        views: form.views ?? 0,
        comments: form.comments ?? 0,
        image: form.image || "/api/placeholder/600/400",
      };
      const next = [newPost, ...posts];
      setPosts(next);
      localStorage.setItem("adminBlogs", JSON.stringify(next));
    }
    setForm({
      id: Date.now(),
      title: "",
      excerpt: "",
      author: "",
      date: new Date().toISOString().slice(0, 10),
      readTime: "5 min",
      category: "news",
      image: "",
      views: 0,
      comments: 0,
      tags: [],
      content: "",
    });
  };

  const removePost = (id: number) => {
    const next = posts.filter((p) => p.id !== id);
    setPosts(next);
    localStorage.setItem("adminBlogs", JSON.stringify(next));
  };

  const editPost = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      ...post,
      date: (post.date || new Date().toISOString().slice(0, 10)).slice(0, 10),
      tags: post.tags || [],
      content: post.content || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      id: Date.now(),
      title: "",
      excerpt: "",
      author: "",
      date: new Date().toISOString().slice(0, 10),
      readTime: "5 min",
      category: "news",
      image: "",
      views: 0,
      comments: 0,
      tags: [],
    });
  };

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setForm((f) => ({ ...f, image: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const onSelectImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.currentTarget.value = ""; // reset for re-uploading same file
  };

  const exportPosts = () => {
    const blob = new Blob([JSON.stringify(posts, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `readyup-blogs-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const importPostsFromFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data)) return alert("Invalid JSON: Expected an array of posts");
      // merge by id; if missing id, assign new id
      const incoming: BlogPost[] = data.map((p: any) => ({
        id: typeof p.id === "number" ? p.id : Date.now() + Math.floor(Math.random()*1000),
        title: p.title || "Untitled",
        excerpt: p.excerpt || "",
        author: p.author || "",
        date: p.date || new Date().toISOString().slice(0,10),
        readTime: p.readTime || "5 min",
        category: p.category || "news",
        image: p.image || "",
        views: typeof p.views === "number" ? p.views : 0,
        comments: typeof p.comments === "number" ? p.comments : 0,
        tags: Array.isArray(p.tags) ? p.tags : [],
        content: typeof p.content === "string" ? p.content : "",
      }));
      const map = new Map<number, BlogPost>();
      [...posts, ...incoming].forEach((p) => map.set(p.id, p));
      const next = Array.from(map.values()).sort((a, b) => b.id - a.id);
      setPosts(next);
      localStorage.setItem("adminBlogs", JSON.stringify(next));
      alert(`Imported ${incoming.length} posts`);
    } catch (err) {
      alert("Failed to import JSON");
    } finally {
      e.currentTarget.value = "";
    }
  };

  if (!session && !localMode) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-md">
            <h1 className="text-4xl font-bold font-orbitron mb-6 bg-gradient-to-r from-space-blue to-space-cyan bg-clip-text text-transparent">Admin Login</h1>
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <label className="block text-sm">Email</label>
              <Input id="email" name="email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="you@example.com" />
              <label className="block text-sm">Password (optional)</label>
              <Input id="password" name="password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter password or use magic link" />
              {authError ? <p className="text-sm text-red-400">{authError}</p> : null}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button
                  className="bg-gradient-to-r from-space-blue to-space-cyan font-orbitron w-full"
                  onClick={async () => {
                    setAuthError("");
                    if (!loginEmail) return setAuthError("Please enter your email.");
                    if (!supabase) return setAuthError('Supabase not configured');
                    const { error } = await supabase.auth.signInWithOtp({
                      email: loginEmail,
                      options: { emailRedirectTo: window.location.origin + "/admin" },
                    });
                    if (error) setAuthError(error.message);
                    else alert("Magic link sent. Check your email.");
                  }}
                >
                  Send Magic Link
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    setAuthError("");
                    if (!loginEmail || !loginPassword) return setAuthError("Enter email and password.");
                    if (!supabase) return setAuthError("Supabase is not configured.");
                    const { data, error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
                    if (error) {
                      setAuthError(error.message);
                    } else {
                      // Ensure immediate UI update even before onAuthStateChange fires
                      setSession(data.session);
                    }
                  }}
                >
                  Sign In
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">We’ll email you a sign-in link, or you can sign in with email + password if enabled.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Admin email gating
  const userEmail = session?.user?.email || "local@admin";
  const isAdmin = localMode ? true : allowedAdmins.includes(userEmail);
  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-md">
            <h1 className="text-4xl font-bold font-orbitron mb-6 bg-gradient-to-r from-space-blue to-space-cyan bg-clip-text text-transparent">Not Authorized</h1>
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <p className="text-sm">Signed in as {userEmail}. This account is not authorized for admin access.</p>
              <Button variant="outline" onClick={() => (!localMode ? supabase?.auth.signOut() : null)}>Sign Out</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold font-orbitron mt-8 mb-6 bg-gradient-to-r from-space-blue to-space-cyan bg-clip-text text-transparent">Admin Portal</h1>
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">Manage blog posts, leads, contacts, and applications.</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{userEmail}</span>
              <Button variant="outline" size="sm" onClick={() => supabase?.auth.signOut()}>Sign Out</Button>
            </div>
          </div>

          <Tabs defaultValue="blogs" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="blogs" className="space-y-8">
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="outline" onClick={exportPosts}>Export JSON</Button>
                <label className="inline-flex items-center" htmlFor="import-json">
                  <input id="import-json" name="importJson" type="file" accept="application/json" className="hidden" onChange={importPostsFromFile} />
                  <span className="btn-like cursor-pointer px-4 py-2 rounded-md border border-white/20 hover:bg-white/10">Import JSON</span>
                </label>
              </div>

              <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1" htmlFor="title">Title</label>
                    <Input id="title" name="title" value={form.title} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="author">Author</label>
                    <Input id="author" name="author" value={form.author} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="date">Date</label>
                    <Input id="date" type="date" name="date" value={form.date} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="readTime">Read Time</label>
                    <Input id="readTime" name="readTime" value={form.readTime} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="category">Category</label>
                    <Input id="category" name="category" value={form.category} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="image">Image URL</label>
                    <Input id="image" name="image" value={form.image} onChange={handleChange} placeholder="/api/placeholder/600/400" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="upload-image">Upload Image</label>
                    <input id="upload-image" name="uploadImage" type="file" accept="image/*" onChange={onSelectImage} className="block w-full text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="tags">Tags (comma-separated)</label>
                    <Input id="tags" name="tags" value={(form.tags || []).join(", ")} onChange={handleChange} />
                  </div>
                </div>
                {form.image ? (
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <img src={form.image} alt="Preview" className="w-full max-h-64 object-cover cursor-pointer" onClick={() => setPreviewImage(form.image)} />
                    <div className="p-2 flex gap-2 justify-end">
                      <Button type="button" variant="outline" onClick={() => setForm((f) => ({ ...f, image: "" }))}>Remove Image</Button>
                    </div>
                  </div>
                ) : null}
                <div>
                  <label className="block text-sm mb-2" htmlFor="excerpt">Excerpt</label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    className="w-full min-h-[80px] rounded-md border border-white/10 bg-transparent p-3"
                    placeholder="Short summary of the post"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm">Rich Content</label>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <Button type="button" variant="outline" onClick={() => exec('bold')}>Bold</Button>
                      <Button type="button" variant="outline" onClick={() => exec('italic')}>Italic</Button>
                      <Button type="button" variant="outline" onClick={() => exec('underline')}>Underline</Button>
                      <Button type="button" variant="outline" onClick={() => exec('formatBlock', '<h2>')}>H2</Button>
                      <Button type="button" variant="outline" onClick={() => exec('insertUnorderedList')}>• List</Button>
                      <Button type="button" variant="outline" onClick={() => exec('insertOrderedList')}>1. List</Button>
                      <Button type="button" variant="outline" onClick={insertLink}>Link</Button>
                      <label className="inline-flex items-center" htmlFor="inline-image">
                        <input id="inline-image" name="inlineImage" type="file" accept="image/*" className="hidden" onChange={insertInlineImage} />
                        <span className="btn-like cursor-pointer px-3 py-1 rounded-md border border-white/20 hover:bg-white/10">Insert Image</span>
                      </label>
                      <Button type="button" variant="outline" onClick={() => exec('undo')}>Undo</Button>
                      <Button type="button" variant="outline" onClick={() => exec('redo')}>Redo</Button>
                      <Button type="button" variant="outline" onClick={clearFormatting}>Clear</Button>
                    </div>
                  </div>
                  <div
                    id="rich-editor"
                    ref={contentRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={onInputContent}
                    onPaste={onPasteSanitize}
                    className="min-h-[200px] rounded-xl border border-white/10 bg-background/40 p-4 prose prose-invert max-w-none"
                  />
                </div>

                <div className="flex justify-between">
                  {editingId ? (
                    <Button type="button" variant="outline" onClick={cancelEdit}>Cancel Edit</Button>
                  ) : <span />}
                  <Button type="submit" className="bg-gradient-to-r from-space-blue to-space-cyan font-orbitron">{editingId ? "Save Changes" : "Add Post"}</Button>
                </div>
              </form>

              <div>
                <h2 className="text-2xl font-bold font-orbitron mb-4">Your Posts</h2>
                {posts.length === 0 ? (
                  <div className="text-muted-foreground">No posts yet.</div>
                ) : (
                  <ul className="space-y-3">
                    {posts.map((p) => (
                      <li key={p.id} className="glass-card p-4 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-md overflow-hidden bg-white/5 border border-white/10">
                            {p.image ? <img src={p.image} alt="thumb" className="w-full h-full object-cover" /> : null}
                          </div>
                          <div>
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-sm text-muted-foreground">{p.category} • {new Date(p.date).toLocaleDateString()}</div>
                            {p.content ? <div className="text-xs opacity-70 line-clamp-1" dangerouslySetInnerHTML={{ __html: p.content.replace(/<[^>]+>/g, '').slice(0, 120) }} /> : null}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" onClick={() => editPost(p)}>Edit</Button>
                          <Button variant="outline" onClick={() => removePost(p.id)}>Delete</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>

            <TabsContent value="leads">
              <div className="p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold font-orbitron">Leads</h2>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex rounded-md border border-white/10 overflow-hidden">
                      <button className={`px-3 py-1 text-sm ${leadFilter === 'active' ? 'bg-white/10' : ''}`} onClick={() => setLeadFilter('active')} type="button">Active</button>
                      <button className={`px-3 py-1 text-sm border-l border-white/10 ${leadFilter === 'archived' ? 'bg-white/10' : ''}`} onClick={() => setLeadFilter('archived')} type="button">Archived</button>
                      <button className={`px-3 py-1 text-sm border-l border-white/10 ${leadFilter === 'all' ? 'bg-white/10' : ''}`} onClick={() => setLeadFilter('all')} type="button">All</button>
                    </div>
                    <Button variant="outline" onClick={reloadLeads}>Refresh</Button>
                  </div>
                </div>
                {leadError && <div className="mb-3 text-sm text-red-400 bg-red-950/40 border border-red-500/30 rounded p-2">{leadError}</div>}
                {leads.length === 0 ? (
                  <div className="text-muted-foreground">No {leadFilter === 'all' ? '' : leadFilter} leads found.</div>
                ) : (
                  <ul className="divide-y divide-white/10">
                    {leads.map((l) => {
                      const images = l.images_json ? JSON.parse(l.images_json) : [];
                      return (
                      <li key={l.id} className="py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="font-semibold truncate">{l.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{l.email} • {new Date(l.created_at).toLocaleString()}</div>
                            <p className="mt-2 whitespace-pre-wrap leading-relaxed text-sm">{l.description}</p>
                            {images.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {images.map((img: string, i: number) => (
                                  <a href={img} key={i} target="_blank" rel="noopener noreferrer">
                                    <img src={img} alt={`lead-${l.id}-img-${i}`} className="w-20 h-20 object-cover rounded-md border border-white/10" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="shrink-0">
                            {l.status === 'archived' || leadFilter === 'archived' ? (
                              <Button variant="secondary" onClick={() => updateStatus('leads', l.id, 'active')}>Restore</Button>
                            ) : (
                              <Button variant="outline" onClick={() => updateStatus('leads', l.id, 'archived')}>Archive</Button>
                            )}
                          </div>
                        </div>
                      </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </TabsContent>

            <TabsContent value="contacts">
              <div className="p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold font-orbitron">Contacts</h2>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex rounded-md border border-white/10 overflow-hidden">
                      <button className={`px-3 py-1 text-sm ${contactFilter === 'active' ? 'bg-white/10' : ''}`} onClick={() => setContactFilter('active')} type="button">Active</button>
                      <button className={`px-3 py-1 text-sm border-l border-white/10 ${contactFilter === 'archived' ? 'bg-white/10' : ''}`} onClick={() => setContactFilter('archived')} type="button">Archived</button>
                      <button className={`px-3 py-1 text-sm border-l border-white/10 ${contactFilter === 'all' ? 'bg-white/10' : ''}`} onClick={() => setContactFilter('all')} type="button">All</button>
                    </div>
                    <Button variant="outline" onClick={reloadContacts}>Refresh</Button>
                  </div>
                </div>
                {contactError && <div className="mb-3 text-sm text-red-400 bg-red-950/40 border border-red-500/30 rounded p-2">{contactError}</div>}
                {contacts.length === 0 ? (
                  <div className="text-muted-foreground">No {contactFilter === 'all' ? '' : contactFilter} contacts found.</div>
                ) : (
                  <ul className="divide-y divide-white/10">
                    {contacts.map((c) => (
                      <li key={c.id} className="py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="font-semibold truncate">{c.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{c.email} • {new Date(c.created_at).toLocaleString()}</div>
                            <p className="mt-2 whitespace-pre-wrap leading-relaxed text-sm">{c.message}</p>
                          </div>
                          <div className="shrink-0">
                            {c.status === 'archived' || contactFilter === 'archived' ? (
                              <Button variant="secondary" onClick={() => updateStatus('contacts', c.id, 'active')}>Restore</Button>
                            ) : (
                              <Button variant="outline" onClick={() => updateStatus('contacts', c.id, 'archived')}>Archive</Button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <div className="p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold font-orbitron">Applications</h2>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex rounded-md border border-white/10 overflow-hidden">
                      <button className={`px-3 py-1 text-sm ${applicationFilter === 'active' ? 'bg-white/10' : ''}`} onClick={() => setApplicationFilter('active')} type="button">Active</button>
                      <button className={`px-3 py-1 text-sm border-l border-white/10 ${applicationFilter === 'archived' ? 'bg-white/10' : ''}`} onClick={() => setApplicationFilter('archived')} type="button">Archived</button>
                      <button className={`px-3 py-1 text-sm border-l border-white/10 ${applicationFilter === 'all' ? 'bg-white/10' : ''}`} onClick={() => setApplicationFilter('all')} type="button">All</button>
                    </div>
                    <Button variant="outline" onClick={reloadApplications}>Refresh</Button>
                  </div>
                </div>
                {applicationError && <div className="mb-3 text-sm text-red-400 bg-red-950/40 border border-red-500/30 rounded p-2">{applicationError}</div>}
                {applications.length === 0 ? (
                  <div className="text-muted-foreground">No {applicationFilter === 'all' ? '' : applicationFilter} applications found.</div>
                ) : (
                  <ul className="divide-y divide-white/10">
                    {applications.map((app) => (
                      <li key={app.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{app.name}</div>
                          <div className="text-sm text-muted-foreground truncate">{app.position} • {new Date(app.created_at).toLocaleString()}</div>
                        </div>
                        <div className="shrink-0 flex gap-2">
                          <Button variant="secondary" onClick={() => setViewingApplication(app)}>View</Button>
                          {app.status === 'archived' || applicationFilter === 'archived' ? (
                            <Button variant="secondary" onClick={() => updateStatus('applications', app.id, 'active')}>Restore</Button>
                          ) : (
                            <Button variant="outline" onClick={() => updateStatus('applications', app.id, 'archived')}>Archive</Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>

          </Tabs>

          {previewImage && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setPreviewImage(null)}>
              <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                <Button
                  className="absolute -top-12 right-0 w-10 h-10 p-0 bg-white/20 hover:bg-white/30"
                  variant="secondary"
                  onClick={() => setPreviewImage(null)}
                >
                  ✕
                </Button>
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-black">
                  <img src={previewImage} alt="Preview" className="w-full max-h-[80vh] object-contain" />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <ApplicationViewer
        application={viewingApplication}
        onClose={() => setViewingApplication(null)}
      />

      <Footer />
    </div>
  );
};

export default Admin;
