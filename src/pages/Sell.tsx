import React, { useRef, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, DollarSign, MessageCircle, X } from "lucide-react";
import getSupabase from '@/lib/supabaseClient';

const SellPage = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collectionType: '',
    description: '',
    estimatedValue: ''
  });
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage({ type: 'info', text: 'Submitting…' });
    if (!formData.name || !formData.email || !formData.collectionType || !formData.description) {
      const msg = 'Please fill in your name, email, collection type, and description.';
      setSubmitMessage({ type: 'error', text: msg });
      alert(msg);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        collection_type: formData.collectionType,
        description: formData.description,
        estimated_value: formData.estimatedValue || null,
        images: JSON.stringify((uploadedImages || []).slice(0, 6)), // Store images as JSON string
        source: 'sell_form',
      };

      // NEW: Initialize Supabase client before use
      const supabase = getSupabase();
      const { data, error } = await supabase.from('leads').insert(payload);
      if (error) throw error;

      setSubmitMessage({ type: 'success', text: 'Thank you! Your request was submitted. We\'ll contact you within 24 hours with an offer.' });
      setUploadedImages([]);
      setFormData({ name: '', email: '', phone: '', collectionType: '', description: '', estimatedValue: '' });
    } catch (err: any) {
      console.error('Lead insert failed:', err);
      setSubmitMessage({ type: 'error', text: `Failed to submit: ${err?.message || 'Unknown error'}` });
    } finally {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section id="sell" className="py-8 md:py-12 px-4 bg-gradient-to-b from-transparent to-black/20">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-10 md:mb-12">
              <Badge className="bg-blue-500/30 backdrop-blur-xl text-blue-400 border-blue-500/40 text-sm font-mono font-medium mb-4 rounded-2xl shadow-lg">
                💰 CASH FOR YOUR COLLECTION
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                TURN YOUR GAMES INTO <span className="gradient-text-space">INSTANT CASH</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-sans mb-8">
                Stop letting your collection gather dust! We buy video games, trading cards, and collectibles. Get paid fast with our hassle-free process.
              </p>

              <div className="space-y-4 max-w-2xl mx-auto text-left mb-8">
                <div className="bg-white/10 backdrop-blur-xl p-0 rounded-2xl border border-white/20 shadow-lg overflow-hidden">
                  <details className="group" open>
                    <summary className="cursor-pointer list-none p-5 lg:p-6 flex items-center justify-between">
                      <h3 className="text-xl font-bold font-display text-blue-400">We Buy Games — Get an Offer</h3>
                      <span className="ml-3 text-white/60 lg:hidden">▼</span>
                    </summary>
                    <div className="px-5 pb-5 lg:px-6 lg:pb-6">
                      <ul className="list-disc list-inside text-sm lg:text-base text-muted-foreground space-y-2 font-sans">
                        <li><span className="text-white">Visit in-store</span> for a quick evaluation and on-the-spot offer.</li>
                        <li><span className="text-white">Or submit the form below</span> with photos and your contact info — we’ll review and reach out.</li>
                      </ul>
                    </div>
                  </details>
                </div>
                <div className="bg-white/10 backdrop-blur-xl p-0 rounded-2xl border border-white/20 shadow-lg overflow-hidden">
                  <details className="group" open>
                    <summary className="cursor-pointer list-none p-5 lg:p-6 flex items-center justify-between">
                      <h3 className="text-xl font-bold font-display text-blue-400">Shipping Process (if you’re not local)</h3>
                      <span className="ml-3 text-white/60 lg:hidden">▼</span>
                    </summary>
                    <div className="px-5 pb-5 lg:px-6 lg:pb-6">
                      <ol className="list-decimal list-inside text-sm lg:text-base text-muted-foreground space-y-2 font-sans">
                        <li>Submit the form with clear item photos and your details.</li>
                        <li>Our staff will contact you with an offer or follow-up questions.</li>
                        <li>If you accept, we’ll email you a prepaid shipping label.</li>
                        <li>When your items arrive, we verify condition and completeness.</li>
                        <li>If everything matches, payment is sent within 24 hours.</li>
                      </ol>
                    </div>
                  </details>
                </div>
              </div>

              <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-500/20 backdrop-blur-xl p-4 rounded-2xl border border-blue-500/30">
                  <div className="text-xl md:text-2xl font-bold text-blue-400 mb-1">💵 FAIR OFFERS</div>
                  <div className="text-sm text-muted-foreground">Based on current market value and condition</div>
                </div>
                <div className="bg-blue-500/20 backdrop-blur-xl p-4 rounded-2xl border border-blue-500/30">
                  <div className="text-xl md:text-2xl font-bold text-blue-400 mb-1">⚡ FAST PAYMENT</div>
                  <div className="text-sm text-muted-foreground">Cash or PayPal within 24 hours</div>
                </div>
                <div className="bg-blue-400/20 backdrop-blur-xl p-4 rounded-2xl border border-blue-400/30">
                  <div className="text-xl md:text-2xl font-bold text-blue-300 mb-1">🔒 TRUSTED</div>
                  <div className="text-sm text-muted-foreground">5-star rated by 100+ sellers</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-2xl border border-white/20 shadow-lg">
              <form ref={formRef} id="sell-form" onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-5 font-display text-ready-blue">
                    <Camera className="w-6 h-6 inline mr-2" />
                    📸 Show Us What You've Got
                  </h3>
                  
                  <div className="border-2 border-dashed border-ready-cyan/50 rounded-2xl p-6 md:p-8 text-center hover:border-ready-cyan transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="collection-upload"
                    />
                    <label htmlFor="collection-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-ready-cyan" />
                      <p className="text-lg font-medium mb-2 text-ready-cyan">📱 Snap & Upload for Instant Value</p>
                      <p className="text-sm text-muted-foreground">
                        Take clear photos of your items - the better the photos, the better your offer!
                      </p>
                      <p className="text-xs text-green-400 mt-2 font-medium">
                        ✨ Pro tip: Include close-ups of rare or valuable items
                      </p>
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-4">Uploaded Photos ({uploadedImages.length})</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Collection photo ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-5 font-display text-ready-purple">
                    <DollarSign className="w-6 h-6 inline mr-2" />
                    💎 Tell Us About Your Treasures
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Collection Type</label>
                      <select
                        name="collectionType"
                        value={formData.collectionType}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none"
                        required
                      >
                        <option value="">What are you selling?</option>
                        <option value="video-games">Video Games</option>
                        <option value="trading-cards">Trading Cards</option>
                        <option value="board-games">Board Games</option>
                        <option value="collectibles">Collectibles</option>
                        <option value="mixed">Mixed Collection</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">What are you hoping to get</label>
                      <input
                        type="text"
                        name="estimatedValue"
                        value={formData.estimatedValue}
                        onChange={handleInputChange}
                        placeholder="e.g., $500-1000"
                        className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-ready-cyan focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Collection Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="What makes your collection special? Any rare finds, mint condition items, or complete sets? The more details, the better your offer!"
                      rows={4}
                      className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-ready-cyan focus:outline-none resize-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-5 font-display text-ready-green">
                    <MessageCircle className="w-6 h-6 inline mr-2" />
                    🤝 Let's Make a Deal
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-ready-cyan focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-ready-cyan focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-ready-cyan focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-center pt-6">
                  {submitMessage ? (
                    <div
                      className={`mb-4 text-sm px-4 py-3 rounded-2xl inline-block ${
                        submitMessage.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                        submitMessage.type === 'error' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      {submitMessage.text}
                    </div>
                  ) : null}
                    <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-sans font-bold px-8 py-4 rounded-2xl backdrop-blur-xl shadow-lg text-lg ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    {submitting ? 'Submitting…' : '💰 GET MY CASH OFFER NOW'}
                  </Button>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-green-400 font-medium">
                      ⚡ Fast Response: Offers sent within 24 hours
                    </p>
                    <p className="text-xs text-muted-foreground">
                      No obligation • Free appraisal • We buy collections of any size
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellPage;
