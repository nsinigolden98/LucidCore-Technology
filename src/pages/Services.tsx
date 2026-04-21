import { Link } from 'react-router-dom';
import { Globe, Palette, Sparkles, Handshake, Users, ArrowRight } from 'lucide-react';
import { services } from '@/data/projects';
import SectionHeader from '@/components/SectionHeader';

const iconMap: Record<string, React.ElementType> = {
  Globe, Palette, Sparkles, Handshake, Users,
};

export default function Services() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-16">
        <div className="container-lucid">
          <SectionHeader
            caption="What We Do"
            title="Our Services."
            description="From concept to deployment, we offer end-to-end digital solutions that transform ideas into market-ready products."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding pt-8">
        <div className="container-lucid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <div
                  key={service.id}
                  className="glass-card p-8 group hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6 group-hover:bg-cyan/20 group-hover:scale-110 transition-all duration-300">
                    <Icon size={26} className="text-cyan" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/50 text-sm">
                        <span className="w-1 h-1 rounded-full bg-cyan flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-cyan text-sm font-medium group/link"
                  >
                    Get Started
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="container-lucid">
          <SectionHeader
            caption="Our Process"
            title="How We Work."
            description="A proven methodology that delivers consistent results across every project engagement."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            {[
              { step: '01', title: 'Discovery', desc: 'Deep dive into your vision, goals, and constraints. We ask the right questions to uncover the real problem.' },
              { step: '02', title: 'Strategy', desc: 'Define the roadmap, tech stack, and milestones. Clear deliverables and timelines before any code is written.' },
              { step: '03', title: 'Build', desc: 'Agile development with weekly demos. Transparent progress tracking and continuous feedback loops.' },
              { step: '04', title: 'Launch', desc: 'Deployment, monitoring, and optimization. We ensure your product succeeds in the real world.' },
            ].map((phase) => (
              <div key={phase.step} className="relative glass-card p-8">
                <span className="font-display font-bold text-5xl text-white/5 absolute top-4 right-4">
                  {phase.step}
                </span>
                <h3 className="font-display font-bold text-xl text-white mb-3">{phase.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-lucid text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Ready to build something amazing?
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            Let's discuss your project. We'll help you refine your vision and create a roadmap to success.
          </p>
          <Link to="/contact" className="glow-button glow-button-primary">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
