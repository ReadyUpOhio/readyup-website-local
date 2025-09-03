import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import supabase from '@/lib/supabaseClient'; // Import Supabase client

const ContactUs: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setMessage({ type: 'error', text: 'Please fill in your name, email, and message.' });
      return;
    }
    setSubmitting(true);
    setMessage({ type: 'info', text: 'Sending…' });
    try {
      // NEW: Insert into Supabase 'contacts' table
      const { error } = await supabase
        .from('contacts')
        .insert([{ name: form.name, email: form.email, message: form.message }]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Thanks! We received your message and will reply shortly.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Failed to send: ${err?.message || 'Unknown error'}` });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 lg:py-20 px-4 lg:px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <Badge className="bg-green-500/30 backdrop-blur-xl text-green-300 border-green-500/40 text-sm font-mono font-medium mb-4 rounded-2xl shadow-lg">
            ✉️ CONTACT US
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold font-display">We'd love to hear from you</h2>
          <p className="text-muted-foreground mt-2">Questions, trade offers, or feedback—send us a message.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
          {message && (
            <div className={`text-sm px-4 py-3 rounded-2xl ${
              message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
              message.type === 'error' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
              'bg-white/10 text-white border border-white/20'
            }`}>
              {message.text}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-ready-cyan focus:outline-none"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-ready-cyan focus:outline-none"
              required
            />
          </div>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="How can we help?"
            rows={4}
            className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-ready-cyan focus:outline-none resize-none"
            required
          />
          <div className="text-right">
            <Button type="submit" disabled={submitting} className={`rounded-2xl ${submitting ? 'opacity-70' : ''}`}>
              {submitting ? 'Sending…' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
