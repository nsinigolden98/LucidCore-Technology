import { useState } from 'react';
import { Building2, Handshake, Megaphone, MessageSquare, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { submitProjectRequest, submitPartnershipRequest, submitSponsorshipRequest, submitGeneralInquiry } from '@/lib/supabase';
import SectionHeader from '@/components/SectionHeader';
import type { FormType } from '@/types';

interface FormTab {
  id: FormType;
  label: string;
  description: string;
  icon: React.ElementType;
}

const formTabs: FormTab[] = [
  { id: 'project', label: 'Build a Project', description: 'Tell us about your project idea', icon: Building2 },
  { id: 'partnership', label: 'Partnership', description: 'Propose a strategic partnership', icon: Handshake },
  { id: 'sponsorship', label: 'Sponsorship', description: 'Request sponsorship support', icon: Megaphone },
  { id: 'inquiry', label: 'General Inquiry', description: 'Ask us anything', icon: MessageSquare },
];

/* ─── Project Form ─── */
function ProjectForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ full_name: '', email: '', project_name: '', description: '', budget_range: '', timeline: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.project_name || !form.description) return;
    setSubmitting(true);
    setError('');
    const result = await submitProjectRequest(form);
    setSubmitting(false);
    if (result.success) onSuccess();
    else setError(result.error || 'Submission failed');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput label="Full Name *" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} required />
        <FormInput label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
      </div>
      <FormInput label="Project Name *" value={form.project_name} onChange={(v) => setForm({ ...form, project_name: v })} required />
      <FormTextarea label="Project Description *" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required rows={4} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput label="Budget Range (optional)" value={form.budget_range} onChange={(v) => setForm({ ...form, budget_range: v })} placeholder="e.g. $5,000 - $10,000" />
        <FormInput label="Timeline Expectation (optional)" value={form.timeline} onChange={(v) => setForm({ ...form, timeline: v })} placeholder="e.g. 3 months" />
      </div>
      {error && <p className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={14} />{error}</p>}
      <SubmitButton submitting={submitting} label="Submit Project Request" />
    </form>
  );
}

/* ─── Partnership Form ─── */
function PartnershipForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ company_name: '', contact_person: '', email: '', proposal: '', goals: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name || !form.contact_person || !form.email || !form.proposal) return;
    setSubmitting(true);
    setError('');
    const result = await submitPartnershipRequest(form);
    setSubmitting(false);
    if (result.success) onSuccess();
    else setError(result.error || 'Submission failed');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput label="Company Name *" value={form.company_name} onChange={(v) => setForm({ ...form, company_name: v })} required />
        <FormInput label="Contact Person *" value={form.contact_person} onChange={(v) => setForm({ ...form, contact_person: v })} required />
      </div>
      <FormInput label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
      <FormTextarea label="Partnership Proposal *" value={form.proposal} onChange={(v) => setForm({ ...form, proposal: v })} required rows={4} />
      <FormTextarea label="Goals & Expectations (optional)" value={form.goals} onChange={(v) => setForm({ ...form, goals: v })} rows={3} />
      {error && <p className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={14} />{error}</p>}
      <SubmitButton submitting={submitting} label="Submit Partnership Request" />
    </form>
  );
}

/* ─── Sponsorship Form ─── */
function SponsorshipForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ org_name: '', contact_info: '', purpose: '', budget_range: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.org_name || !form.contact_info || !form.purpose) return;
    setSubmitting(true);
    setError('');
    const result = await submitSponsorshipRequest(form);
    setSubmitting(false);
    if (result.success) onSuccess();
    else setError(result.error || 'Submission failed');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput label="Organization Name *" value={form.org_name} onChange={(v) => setForm({ ...form, org_name: v })} required />
        <FormInput label="Contact Info *" value={form.contact_info} onChange={(v) => setForm({ ...form, contact_info: v })} required placeholder="Email or phone" />
      </div>
      <FormTextarea label="Sponsorship Purpose *" value={form.purpose} onChange={(v) => setForm({ ...form, purpose: v })} required rows={3} />
      <FormInput label="Budget Range (optional)" value={form.budget_range} onChange={(v) => setForm({ ...form, budget_range: v })} />
      <FormTextarea label="Additional Description (optional)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />
      {error && <p className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={14} />{error}</p>}
      <SubmitButton submitting={submitting} label="Submit Sponsorship Request" />
    </form>
  );
}

/* ─── Inquiry Form ─── */
function InquiryForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    setError('');
    const result = await submitGeneralInquiry(form);
    setSubmitting(false);
    if (result.success) onSuccess();
    else setError(result.error || 'Submission failed');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <FormInput label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
      </div>
      <FormTextarea label="Message *" value={form.message} onChange={(v) => setForm({ ...form, message: v })} required rows={5} />
      {error && <p className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={14} />{error}</p>}
      <SubmitButton submitting={submitting} label="Send Message" />
    </form>
  );
}

/* ─── Reusable Form Components ─── */
function FormInput({ label, value, onChange, type = 'text', required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-white/60 text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all text-sm"
      />
    </div>
  );
}

function FormTextarea({ label, value, onChange, required, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-white/60 text-sm font-medium mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all text-sm resize-vertical"
      />
    </div>
  );
}

function SubmitButton({ submitting, label }: { submitting: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan text-void font-display font-semibold text-sm hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {submitting ? (
        <>
          <span className="w-4 h-4 rounded-full border-2 border-void/30 border-t-void animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <Send size={16} />
          {label}
        </>
      )}
    </button>
  );
}

/* ─── Success State ─── */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
        <CheckCircle size={32} className="text-neon-green" />
      </div>
      <h3 className="font-display font-bold text-2xl text-white mb-3">Submission Successful!</h3>
      <p className="text-white/50 mb-8 max-w-md mx-auto">
        Thank you for reaching out. We've received your submission and will get back to you within 24-48 hours.
      </p>
      <button onClick={onReset} className="glow-button glow-button-secondary">
        Submit Another Request
      </button>
    </div>
  );
}

/* ─── Main Contact Page ─── */
export default function Contact() {
  const [activeTab, setActiveTab] = useState<FormType>('project');
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = () => setSubmitted(true);
  const handleReset = () => { setSubmitted(false); };

  const renderForm = () => {
    if (submitted) return <SuccessState onReset={handleReset} />;
    switch (activeTab) {
      case 'project': return <ProjectForm onSuccess={handleSuccess} />;
      case 'partnership': return <PartnershipForm onSuccess={handleSuccess} />;
      case 'sponsorship': return <SponsorshipForm onSuccess={handleSuccess} />;
      case 'inquiry': return <InquiryForm onSuccess={handleSuccess} />;
    }
  };

  return (
    <div className="pt-24">
      <section className="section-padding pb-12">
        <div className="container-lucid">
          <SectionHeader
            caption="Get In Touch"
            title="Let's Collaborate."
            description="Whether you have a project idea, partnership proposal, or just want to say hello — we'd love to hear from you."
          />
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-lucid">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                {formTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setSubmitted(false); }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 flex-shrink-0 ${
                        activeTab === tab.id
                          ? 'bg-cyan/10 border border-cyan/30 text-cyan'
                          : 'bg-white/5 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      <div>
                        <div className="font-medium text-sm whitespace-nowrap">{tab.label}</div>
                        <div className="text-xs text-white/40 whitespace-nowrap hidden lg:block">{tab.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Area */}
            <div className="lg:col-span-3">
              <div className="glass-card p-6 md:p-10">
                {!submitted && (
                  <div className="mb-8">
                    <h2 className="font-display font-bold text-2xl text-white mb-2">
                      {formTabs.find((t) => t.id === activeTab)?.label}
                    </h2>
                    <p className="text-white/40 text-sm">
                      {formTabs.find((t) => t.id === activeTab)?.description}
                    </p>
                  </div>
                )}
                {renderForm()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-24">
        <div className="container-lucid">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Email', value: 'hello@lucidcore.tech', href: 'mailto:hello@lucidcore.tech' },
              { label: 'Location', value: 'Global — Remote First', href: null },
              { label: 'Response Time', value: 'Within 24-48 hours', href: null },
            ].map((item) => (
              <div key={item.label} className="glass-card p-6 text-center">
                <div className="text-white/40 text-xs font-mono uppercase tracking-wider mb-2">{item.label}</div>
                {item.href ? (
                  <a href={item.href} className="text-white hover:text-cyan transition-colors font-medium">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-white font-medium">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
