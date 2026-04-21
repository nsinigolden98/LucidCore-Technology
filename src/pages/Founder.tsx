import { Link } from 'react-router-dom';
import { Quote, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

export default function Founder() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-8">
        <div className="container-lucid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Portrait */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface max-w-md mx-auto lg:mx-0">
                <img
                  src="/founder-portrait.jpg"
                  alt="Founder of Lucidcore Technologies"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan/20 to-neon-purple/20 rounded-2xl -z-10 hidden lg:block" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-cyan/20 rounded-2xl -z-10 hidden lg:block" />
            </div>

            {/* Bio */}
            <div className="order-1 lg:order-2">
              <span className="caption-label">The Founder</span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mt-4 mb-4">
                Innovation at its core.
              </h1>
              <p className="text-xl text-white/40 mb-8">
                Founder & Lead Architect, Lucidcore Technologies
              </p>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>
                  Lucidcore Technologies was born from a simple belief: technology should amplify human potential, not complicate it. As a developer and systems thinker, I founded Lucidcore to be more than a software company — it's an applied research lab where every product is a thesis on how human-computer interaction should evolve.
                </p>
                <p>
                  My journey in technology started with a fascination for how systems work — from the smallest mobile apps to the largest distributed networks. Over the years, I've built products that have served thousands of users, each one teaching me something new about what people actually need from technology.
                </p>
                <p>
                  At Lucidcore, we don't just write code. We engineer realities. From Blue Sea Mobile's ecosystem serving users across Nigeria to the upcoming AI-powered Nova platform, every project represents a commitment to solving real problems with elegant solutions.
                </p>
              </div>

              {/* Social */}
              <div className="flex gap-3 mt-8">
                {[
                  { icon: Github, url: 'https://github.com/nsinigolden98', label: 'GitHub' },
                  { icon: Twitter, url: 'https://twitter.com/lucidcore', label: 'Twitter' },
                  { icon: Linkedin, url: 'https://linkedin.com/in/lucidcore', label: 'LinkedIn' },
                ].map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan hover:border-cyan/30 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="container-lucid">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-10 md:p-12 relative">
              <Quote size={40} className="text-cyan/20 absolute top-6 left-6" />
              <blockquote className="relative z-10 pt-6">
                <p className="font-display text-xl md:text-2xl text-white leading-relaxed mb-6">
                  "The future belongs to those who build it. At Lucidcore, we're not waiting for the future to arrive — we're coding it into existence, one product at a time. Every line of code is a step toward a world where technology serves humanity with grace, intelligence, and purpose."
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface">
                    <img src="/founder-portrait.jpg" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <cite className="font-display font-semibold text-white not-italic">Founder</cite>
                    <p className="text-white/40 text-sm">Lucidcore Technologies</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding">
        <div className="container-lucid">
          <SectionHeader
            caption="Philosophy"
            title="What Drives Us."
            description="The principles that shape every decision, every product, and every interaction at Lucidcore."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { title: 'Move Fast, Build Right', desc: 'Speed without quality is debt. We ship quickly but never compromise on architecture, security, or user experience. Every product is built to last.' },
              { title: 'Users Over Features', desc: "We don't build features for the sake of it. Every functionality serves a real user need, validated through research and feedback. If it doesn't solve a problem, it doesn't ship." },
              { title: 'Open by Default', desc: 'We believe in the power of open source and transparent development. Our work contributes to the broader tech ecosystem, and we learn as much from the community as we give back.' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8">
                <h3 className="font-display font-bold text-xl text-white mb-3">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pb-24">
        <div className="container-lucid text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Want to collaborate?
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link to="/contact" className="glow-button glow-button-primary inline-flex items-center gap-2">
            Let's Talk
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
