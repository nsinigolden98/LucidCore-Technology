import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Globe } from 'lucide-react';
import { allProjects } from '@/data/projects';
import StatusBadge from '@/components/StatusBadge';
import MiniBrowser from '@/components/MiniBrowser';
import { useState } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Project Not Found</h2>
          <p className="text-white/50 mb-6">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="glow-button glow-button-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const hasLiveUrl = project.url && project.status === 'live';
  const hasPreviewUrl = project.url && project.status !== 'live';

  return (
    <div className="pt-16">
      {/* Hero with theme color */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.themeColor}15 0%, #050505 60%)`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${project.themeColor}30, transparent 60%)`,
            }}
          />
        </div>

        <div className="container-lucid relative z-10">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-white/50 hover:text-cyan transition-colors text-sm mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>

          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
              <img src={project.logo} alt={project.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <StatusBadge status={project.status} />
                <span className="text-xs font-mono text-white/30 uppercase tracking-wider">
                  {project.category === 'internal' ? 'Lucidcore Project' : 'Client Project'}
                </span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-2">
                {project.name}
              </h1>
              <p className="text-xl text-white/50 mb-6">{project.slogan}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan text-void font-display font-semibold text-sm hover:shadow-glow transition-all"
                  >
                    <Globe size={16} />
                    {project.status === 'live' ? 'Visit Live Site' : 'View Preview'}
                  </a>
                )}
                {project.repo && (
                  <a
                    href={`https://github.com/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 text-white font-display font-semibold text-sm hover:bg-white/10 transition-all"
                  >
                    <Github size={16} />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Browser Preview */}
      {(hasLiveUrl || hasPreviewUrl) && project.url && (
        <section className="py-12 md:py-16">
          <div className="container-lucid">
            <div className="flex items-center justify-between mb-6">
              <span className="caption-label">Live Preview</span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan hover:text-white transition-colors text-sm"
              >
                Open in new tab
                <ExternalLink size={12} />
              </a>
            </div>
            <MiniBrowser url={project.url} />
          </div>
        </section>
      )}

      {/* Description & Tech Stack */}
      <section className="py-12 md:py-16">
        <div className="container-lucid">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="caption-label">About</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-4 mb-6">
                Project Overview
              </h2>
              <p className="text-white/50 leading-relaxed text-lg mb-8">
                {project.description}
              </p>

              {/* How It Was Built */}
              <div className="space-y-8">
                <div className="glass-card p-6 md:p-8 border-l-4" style={{ borderLeftColor: project.themeColor }}>
                  <h3 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">1</span>
                    The Problem
                  </h3>
                  <p className="text-white/50 leading-relaxed">{project.problem}</p>
                </div>
                <div className="glass-card p-6 md:p-8 border-l-4" style={{ borderLeftColor: project.themeColor }}>
                  <h3 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan/20 text-cyan flex items-center justify-center text-xs">2</span>
                    The Solution
                  </h3>
                  <p className="text-white/50 leading-relaxed">{project.solution}</p>
                </div>
                <div className="glass-card p-6 md:p-8 border-l-4" style={{ borderLeftColor: project.themeColor }}>
                  <h3 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-neon-green/20 text-neon-green flex items-center justify-center text-xs">3</span>
                    The Outcome
                  </h3>
                  <p className="text-white/50 leading-relaxed">{project.outcome}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card p-6 md:p-8 sticky top-24">
                <h3 className="font-display font-bold text-lg text-white mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.socialLinks.length > 0 && (
                  <>
                    <h3 className="font-display font-bold text-lg text-white mb-4">Links</h3>
                    <div className="space-y-2">
                      {project.socialLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                          <ExternalLink size={16} className="text-white/40 group-hover:text-cyan transition-colors" />
                          <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                            {link.platform}
                          </span>
                        </a>
                      ))}
                    </div>
                  </>
                )}

                <div className="mt-8 pt-6 border-t border-white/5">
                  <Link
                    to="/contact"
                    className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan to-neon-purple text-void font-display font-semibold text-sm hover:shadow-glow transition-all"
                  >
                    Start a Similar Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 md:py-16 pb-24">
        <div className="container-lucid">
          <span className="caption-label">Gallery</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-4 mb-8">
            Project Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className="aspect-video rounded-xl overflow-hidden bg-surface border border-white/10 hover:border-cyan/30 transition-colors group"
              >
                <img
                  src={img}
                  alt={`${project.name} gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
