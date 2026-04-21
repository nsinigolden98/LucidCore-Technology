import { Shield, FileCheck, Award, Building2, Lock, ExternalLink } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

export default function Proof() {
  const documents = [
    {
      id: 'cac',
      title: 'Corporate Affairs Commission',
      subtitle: 'Business Registration',
      description: 'Lucidcore Technologies is a legally registered business entity with the Corporate Affairs Commission.',
      icon: Building2,
      status: 'Verified',
      color: 'cyan',
    },
    {
      id: 'tax',
      title: 'Tax Identification',
      subtitle: 'TIN Certificate',
      description: 'Fully compliant with all tax regulations and obligations.',
      icon: FileCheck,
      status: 'Compliant',
      color: 'green',
    },
    {
      id: 'cert',
      title: 'Professional Certifications',
      subtitle: 'Industry Standards',
      description: 'Team certifications in cloud architecture, cybersecurity, and software engineering.',
      icon: Award,
      status: 'Active',
      color: 'purple',
    },
    {
      id: 'security',
      title: 'Security Compliance',
      subtitle: 'Data Protection',
      description: 'Adherence to industry-standard security practices and data protection protocols.',
      icon: Lock,
      status: 'Certified',
      color: 'cyan',
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    cyan: { bg: 'bg-cyan/10', border: 'border-cyan/20', text: 'text-cyan' },
    green: { bg: 'bg-neon-green/10', border: 'border-neon-green/20', text: 'text-neon-green' },
    purple: { bg: 'bg-neon-purple/10', border: 'border-neon-purple/20', text: 'text-neon-purple' },
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-16">
        <div className="container-lucid">
          <SectionHeader
            caption="Trust & Verification"
            title="Proof of Business."
            description="Transparency is fundamental to how we operate. Here you'll find documentation verifying our legal standing, certifications, and commitment to professional standards."
          />
        </div>
      </section>

      {/* Trust Banner */}
      <section className="pb-12">
        <div className="container-lucid">
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan via-neon-purple to-cyan" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-cyan" />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
                Verified & Legitimate
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Lucidcore Technologies operates with full legal compliance. We maintain transparent business practices and are committed to earning your trust through verified credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Cards */}
      <section className="section-padding pt-8">
        <div className="container-lucid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => {
              const Icon = doc.icon;
              const colors = colorMap[doc.color];
              return (
                <div key={doc.id} className="glass-card p-8 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                      <Icon size={22} className={colors.text} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${colors.bg} ${colors.border} border ${colors.text}`}>
                      {doc.status}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-1">{doc.title}</h3>
                  <p className="text-white/40 text-sm font-mono mb-3">{doc.subtitle}</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{doc.description}</p>
                  <button className="inline-flex items-center gap-2 text-cyan text-sm hover:text-white transition-colors group/link">
                    <span className="group-hover/link:underline">View Document</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Details */}
      <section className="pb-24">
        <div className="container-lucid">
          <div className="glass-card p-8 md:p-10">
            <h3 className="font-display font-bold text-xl text-white mb-6">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Business Name', value: 'Lucidcore Technologies' },
                { label: 'Business Type', value: 'Technology & Innovation Lab' },
                { label: 'Year Established', value: '2024' },
                { label: 'Operating Model', value: 'Remote-First, Global' },
                { label: 'Primary Focus', value: 'Software Development & Digital Products' },
                { label: 'Contact', value: 'hello@lucidcore.tech' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-white/30 text-xs font-mono uppercase tracking-wider mb-1">{item.label}</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
