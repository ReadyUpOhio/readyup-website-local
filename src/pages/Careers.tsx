import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import supabase from "@/lib/supabaseClient";
import { v4 as uuidv4 } from 'uuid';

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
  // New detailed fields
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  startDate?: string;
  desiredPay?: string;
  availabilityType?: "full-time" | "part-time" | "seasonal";
  hoursPerWeek?: string;
  workAuth?: "yes" | "no";
  over18?: "yes" | "no";
  hasTransport?: "yes" | "no";
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  experienceSummary?: string;
  lastEmployer?: string;
  lastTitle?: string;
  lastEmploymentDates?: string;
  referenceName?: string;
  referencePhone?: string;
  availabilityNotes?: string;
  consent?: boolean;
}

const Careers = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [form, setForm] = useState<ApplicationForm>({
    name: "",
    email: "",
    phone: "",
    position: "Sales Associate",
    coverLetter: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    startDate: "",
    desiredPay: "",
    availabilityType: "part-time",
    hoursPerWeek: "",
    workAuth: "yes",
    over18: "yes",
    hasTransport: "yes",
    website: "",
    linkedin: "",
    github: "",
    portfolio: "",
    experienceSummary: "",
    lastEmployer: "",
    lastTitle: "",
    lastEmploymentDates: "",
    referenceName: "",
    referencePhone: "",
    availabilityNotes: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement & { name: string; value: string };
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Resume file must be under 5MB.");
      setResumeFile(null);
      e.target.value = ''; // Clear the input
      return;
    }
    setError(null);
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    if (!form.name || !form.email || !form.phone || !form.position || !form.coverLetter || !form.consent) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      if (!supabase) {
        throw new Error("Database connection not available.");
      }

      let resume_url: string | undefined = undefined;

      if (resumeFile) {
        const fileName = `${uuidv4()}-${resumeFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) {
          throw new Error(`Resume upload failed: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(uploadData.path);
        resume_url = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('applications').insert([{
        ...form,
        start_date: form.startDate || null,
        work_auth: form.workAuth === 'yes',
        over_18: form.over18 === 'yes',
        has_transport: form.hasTransport === 'yes',
        resume_url,
      }]);

      if (insertError) {
        throw new Error(`Failed to submit application: ${insertError.message}`);
      }
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        position: "Sales Associate",
        coverLetter: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        startDate: "",
        desiredPay: "",
        availabilityType: "part-time",
        hoursPerWeek: "",
        workAuth: "yes",
        over18: "yes",
        hasTransport: "yes",
        website: "",
        linkedin: "",
        github: "",
        portfolio: "",
        experienceSummary: "",
        lastEmployer: "",
        lastTitle: "",
        lastEmploymentDates: "",
        referenceName: "",
        referencePhone: "",
        availabilityNotes: "",
        consent: false,
      });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mt-8 mb-6 bg-gradient-to-r from-space-blue via-space-purple to-space-cyan bg-clip-text text-transparent text-center">
            Careers at Ready Up
          </h1>
          <p className="text-muted-foreground text-center mb-10">Join our team! Fill out the application below and we'll be in touch.</p>

          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-2xl space-y-7 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Full Name</label>
                <Input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="text-sm mb-1 block">Email</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Phone</label>
                <Input name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div>
                <label className="text-sm mb-1 block">Start Date (Earliest)</label>
                <Input name="startDate" type="date" value={form.startDate} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm mb-1 block">Address</label>
                <Input name="address" value={form.address} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm mb-1 block">City</label>
                <Input name="city" value={form.city} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm mb-1 block">State</label>
                  <Input name="state" value={form.state} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-sm mb-1 block">ZIP</label>
                  <Input name="zip" value={form.zip} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Position</label>
                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-white/10 bg-transparent px-3"
                >
                  <option value="Sales Associate">Sales Associate</option>
                  <option value="Repair Technician">Repair Technician</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Marketing / Social Media">Marketing / Social Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block">Availability</label>
                <select
                  name="availabilityType"
                  value={form.availabilityType}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-white/10 bg-transparent px-3"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="seasonal">Seasonal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm mb-1 block">Desired Pay (Hourly)</label>
                <Input name="desiredPay" placeholder="$" value={form.desiredPay} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm mb-1 block">Hours per Week</label>
                <Input name="hoursPerWeek" placeholder="e.g., 10-20" value={form.hoursPerWeek} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-sm mb-1 block">Authorized to work in US?</label>
                  <select name="workAuth" value={form.workAuth} onChange={handleChange} className="w-full h-10 rounded-md border border-white/10 bg-background px-2">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm mb-1 block">Over 18?</label>
                  <select name="over18" value={form.over18} onChange={handleChange} className="w-full h-10 rounded-md border border-white/10 bg-background px-2">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm mb-1 block">Reliable Transportation?</label>
                  <select name="hasTransport" value={form.hasTransport} onChange={handleChange} className="w-full h-10 rounded-md border border-white/10 bg-background px-2">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Website</label>
                <Input name="website" placeholder="https://" value={form.website} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm mb-1 block">LinkedIn</label>
                <Input name="linkedin" placeholder="https://linkedin.com/in/" value={form.linkedin} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm mb-1 block">GitHub</label>
                <Input name="github" placeholder="https://github.com/" value={form.github} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm mb-1 block">Portfolio</label>
                <Input name="portfolio" placeholder="https://" value={form.portfolio} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="text-sm mb-1 block">Cover Letter</label>
              <Textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} rows={6} required placeholder="Tell us about your experience and why you want to join." />
            </div>

            <div>
              <label className="text-sm mb-1 block">Experience Summary</label>
              <Textarea name="experienceSummary" value={form.experienceSummary} onChange={handleChange} rows={4} placeholder="Retail/repair experience, systems you know, customer service, leadership, etc." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm mb-1 block">Last Employer</label>
                <Input name="lastEmployer" value={form.lastEmployer} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm mb-1 block">Job Title</label>
                <Input name="lastTitle" value={form.lastTitle} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm mb-1 block">Employment Dates</label>
                <Input name="lastEmploymentDates" placeholder="e.g., 2023-2024" value={form.lastEmploymentDates} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Reference Name</label>
                <Input name="referenceName" value={form.referenceName} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm mb-1 block">Reference Phone</label>
                <Input name="referencePhone" value={form.referencePhone} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="text-sm mb-1 block">Schedule / Availability Notes</label>
              <Textarea name="availabilityNotes" value={form.availabilityNotes} onChange={handleChange} rows={3} placeholder="Days/times available, restrictions, notice needed, etc." />
            </div>

            <div>
              <label className="text-sm mb-1 block">Resume (PDF or DOC, up to 5MB)</label>
              <Input type="file" accept=".pdf,.doc,.docx" onChange={handleResume} />
              {resumeFile && (
                <div className="text-xs text-muted-foreground mt-1">Attached: {resumeFile.name}</div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input id="consent" name="consent" type="checkbox" checked={!!form.consent} onChange={handleChange} />
              <label htmlFor="consent" className="text-sm text-muted-foreground">I certify that my answers are true and complete to the best of my knowledge.</label>
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}
            {submitted && <div className="text-sm text-green-400">Thank you! Your application was submitted.</div>}

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-gradient-to-r from-space-blue to-space-cyan font-orbitron">
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
