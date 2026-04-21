import { Link } from 'react-router-dom';
import { Cpu, Globe, Zap, Shield, Layers, Radio } from 'lucide-react';
import { internalProjects } from '@/data/projects';
import SectionHeader from '@/components/SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import CommandTerminal from '@/components/CommandTerminal';
import { useEffect, useRef } from 'react';

/* ─── AnimatedText: word-by-word fade-in ─── */
function AnimatedText({ children, className = '', delay = 0 }: { children: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const words = ref.current?.querySelectorAll('.word');
    if (!words) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((word, i) => {
              (word as HTMLElement).style.animationDelay = `${delay + i * 0.05}s`;
              word.classList.add('animate-fade-in-up');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className={className}>
      {children.split(' ').map((word, i) => (
        <span key={i} className="word inline-block opacity-0 mr-[0.3em]">
          {word}
        </span>
      ))}
    </span>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const featuredProjects = internalProjects.slice(0, 3);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-lucid pb-16 md:pb-24 pt-32">
        <div className="max-w-4xl">
          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-white leading-[1] tracking-tight mb-6">
            <AnimatedText>We engineer realities.</AnimatedText>
          </h1>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            Lucidcore is a spatial computing and advanced systems lab building the infrastructure for tomorrow's digital economies.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/projects" className="glow-button glow-button-primary">
              Explore Projects
            </Link>
            <Link to="/contact" className="glow-button glow-button-secondary">
              Start a Project
            </Link>
          </div>
        </div>

        {/* Floating Preview Cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mt-16 max-w-4xl">
          {featuredProjects.map((project, i) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="glass-card p-5 group animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={project.logo} alt={project.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="font-display font-semibold text-white text-sm group-hover:text-cyan transition-colors">
                    {project.name}
                  </h4>
                  <span className={`text-xs font-mono ${project.status === 'live' ? 'text-neon-green' : 'text-yellow-400'}`}>
                    {project.status === 'live' ? '● Live' : 'Coming Soon'}
                  </span>
                </div>
              </div>
              <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Fluid Intelligence Section ─── */
function FluidIntelligenceSection() {
  const cards = [
    { icon: Cpu, title: 'Spatial Computing', desc: 'Building immersive 3D environments that blend physical and digital realities for next-generation user experiences.' },
    { icon: Globe, title: 'Distributed Systems', desc: 'Architecting resilient, scalable infrastructure capable of handling millions of concurrent users worldwide.' },
    { icon: Zap, title: 'Real-time Processing', desc: 'Low-latency data pipelines and event-driven architectures for instantaneous user interactions.' },
    { icon: Shield, title: 'Secure by Design', desc: 'Security-first development practices ensuring data integrity and user privacy at every layer.' },
    { icon: Layers, title: 'Modular Architecture', desc: 'Composable systems built from interchangeable modules that adapt and evolve with your needs.' },
    { icon: Radio, title: 'Edge Computing', desc: 'Processing power pushed to the network edge for faster responses and reduced server load.' },
  ];

  return (
    <section id="systems" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/ecosystem-texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-void" />

      <div className="relative z-10 container-lucid">
        <SectionHeader
          caption="Core Technologies"
          title="Fluid Intelligence."
          description="Our technology stack adapts, evolves, and scales with the challenges we tackle. Every system is engineered for performance, security, and future growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {cards.map(({ icon: Icon, title, desc }) => (
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
  );
}

/* ─── Ecosystem Modules Section ─── */
function EcosystemModulesSection() {
  const modules = [
    { title: 'Blue Sea Mobile', desc: 'Mobile platform ecosystem serving users across Nigeria with unified commerce and communication services.', img: '/logo-blue-sea.jpg' },
    { title: 'Nexus', desc: 'Decentralized connectivity hub bridging Web3 infrastructure with intuitive everyday interfaces.', img: '/logo-nexus.jpg' },
    { title: 'Nova', desc: 'AI-powered intelligence platform transforming raw data into actionable business insights.', img: '/logo-nova.jpg' },
    { title: 'Truth Sayer', desc: 'Real-time fact-checking engine combating misinformation with AI verification.', img: '/logo-truth-sayer.jpg' },
  ];

  return (
    <section className="section-padding bg-void">
      <div className="container-lucid">
        <SectionHeader
          caption="Integrations"
          title="Ecosystem Modules."
          description="A growing constellation of products, each solving distinct problems while contributing to a unified technological vision."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="group relative glass-card overflow-hidden aspect-[4/3] flex flex-col justify-end p-8"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url(${mod.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
              <div className="relative z-10">
                <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-cyan transition-colors">
                  {mod.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  {mod.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Founder's Vision Section ─── */
function FoundersVisionSection() {
  return (
    <section id="vision" className="relative py-32 md:py-40 overflow-hidden">
      <div className="container-lucid">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <span className="caption-label">The Vision</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mt-4 mb-8">
              Innovation at its core.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              Lucidcore isn't just a development house; it's an applied research lab. Every product we ship is a thesis on how human-computer interaction should evolve. We move fast, validate constantly, and build systems that scale exponentially.
            </p>
            <p className="text-white/40 leading-relaxed mb-8">
              Our approach combines rigorous engineering with bold creative vision. We don't follow trends — we set them. From mobile ecosystems to AI intelligence platforms, each project represents a step toward a more connected, intelligent digital future.
            </p>
            <Link
              to="/founder"
              className="inline-flex items-center gap-2 text-cyan hover:text-white transition-colors font-medium group"
            >
              Read the full vision
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Portrait */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface">
              <img
                src="/founder-portrait.jpg"
                alt="Founder"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan/20 to-neon-purple/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-cyan/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Command Center Section ─── */
function CommandCenterSection() {
  return (
    <section id="command" className="relative py-32 md:py-48 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.05) 0%, transparent 70%)',
        }}
      />
      <div className="container-lucid relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="caption-label">Command Center</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mt-4">
            Initialize Sequence.
          </h2>
        </div>
        <CommandTerminal />
      </div>
    </section>
  );
}

/* ─── Featured Projects Section ─── */
function FeaturedProjectsSection() {
  const featured = internalProjects.slice(0, 6);

  return (
    <section className="section-padding bg-void">
      <div className="container-lucid">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="caption-label">Our Work</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mt-4">
              Featured Projects.
            </h2>
          </div>
          <Link
            to="/projects"
            className="glow-button glow-button-secondary self-start"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Home Page ─── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <FluidIntelligenceSection />
      <EcosystemModulesSection />
      <FoundersVisionSection />
      <FeaturedProjectsSection />
      <CommandCenterSection />
    </>
  );
}
