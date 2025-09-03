import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  type: "repair" | "consulting" | "general";
  message: string;
}

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    type: "repair",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      subject: form.subject || (form.type === "repair" ? "Repair Request" : form.type === "consulting" ? "Consulting Request" : "Contact"),
      message: `[${form.type.toUpperCase()}] ${form.message}`,
      receivedAt: new Date().toISOString(),
    };
    const raw = localStorage.getItem("contactSubmissions");
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(item);
    localStorage.setItem("contactSubmissions", JSON.stringify(arr));
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", type: "repair", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-to-r from-space-blue via-space-purple to-space-cyan bg-clip-text text-transparent text-center">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-center mb-10">Tell us about your repair or consulting needs. We'll get back to you ASAP.</p>

          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-2xl space-y-5 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Name</label>
                <Input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="text-sm mb-1 block">Email</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-white/10 bg-transparent px-3"
                >
                  <option value="repair">Repair</option>
                  <option value="consulting">Consulting</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block">Subject</label>
                <Input name="subject" value={form.subject} onChange={handleChange} placeholder="Optional" />
              </div>
            </div>

            <div>
              <label className="text-sm mb-1 block">Message</label>
              <Textarea name="message" value={form.message} onChange={handleChange} rows={6} required placeholder="Describe the issue, console/laptop model, symptoms, or consulting needs." />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-gradient-to-r from-space-blue to-space-cyan font-orbitron">
                Submit
              </Button>
            </div>

            {submitted && (
              <div className="text-sm text-green-400">Thanks! Your message was submitted.</div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
