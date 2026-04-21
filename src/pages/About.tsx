import { Link } from 'react-router-dom';
import { Target, Eye, Rocket, Code2, Users, Lightbulb } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

export default function About() {
  const values = [
    { icon: Code2, title: 'Engineering Excellence', desc: 'We write clean, scalable code that stands the test of time. Every line is intentional, every architecture decision is strategic.' },
    { icon: Users, title: 'User-First Design', desc: 'Technology exists to serve people. We obsess over user experience, ensuring our products are intuitive, accessible, and delightful.' },
    { icon: Lightbulb, title: 'Innovation Driven', desc: 'We challenge assumptions and explore uncharted territories. Our lab is a safe space for bold ideas and experimental thinking.' },
    { icon: Rocket, title: 'Rapid Execution', desc: 'Speed without sacrificing quality. We ship fast, learn faster, and iterate continuously based on real-world feedback.' },
  ];

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-16">
        <div className="container-lucid">
          <SectionHeader
            caption="About Us"
            title="Building the future, one product at a time."
            description="Lucidcore Technologies is an applied research lab and digital product studio. We combine advanced engineering with visionary design to create systems that push the boundaries of what technology can achieve."
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="container-lucid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="glass-card p-8 md:p-10">
              <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6">
                <Target size={22} className="text-cyan" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-4">Our Mission</h3>
              <p className="text-white/50 leading-relaxed">
                To democratize access to cutting-edge technology by building products that are both powerful and accessible. We believe the best technology fades into the background, amplifying human potential without adding complexity.
              </p>
            </div>
            <div className="glass-card p-8 md:p-10">
              <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center mb-6">
                <Eye size={22} className="text-neon-purple" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-4">Our Vision</h3>
              <p className="text-white/50 leading-relaxed">
                A world where technology adapts to humans, not the other way around. We envision intelligent systems that anticipate needs, seamless interfaces that feel like extensions of thought, and digital infrastructure that empowers every creator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-lucid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="caption-label">Our Story</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight mt-4 mb-6">
                From concept to constellation.
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>
                  Lucidcore Technologies began as a single developer's obsession with building tools that matter. What started as experimental side projects quickly evolved into a systematic approach to product development — one that treats every project as both a technical challenge and a creative expression.
                </p>
                <p>
                  Today, Lucidcore operates as a distributed innovation lab. We don't have a physical headquarters because our products live in the cloud, accessible to anyone, anywhere. Our team spans multiple time zones, united by a shared belief that great software can change lives.
                </p>
                <p>
                  With nine projects in various stages of development — from the live Blue Sea Mobile platform to upcoming releases like Nexus, Nova, and Truth Sayer — we're building a constellation of products that each address real problems while contributing to a unified technological vision.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-surface">
                <img
                  src="/ecosystem-texture.jpg"
                  alt="Abstract technology"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-cyan/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="container-lucid">
          <SectionHeader
            caption="Principles"
            title="Core Values."
            description="The principles that guide every decision we make and every product we build."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-8 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-5 group-hover:bg-cyan/20 transition-colors">
                  <Icon size={22} className="text-cyan" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-lucid text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Want to be part of the journey?
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            Whether you're looking to collaborate, invest, or simply learn more about what we're building, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="glow-button glow-button-primary">
              Get in Touch
            </Link>
            <Link to="/projects" className="glow-button glow-button-secondary">
              Explore Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
