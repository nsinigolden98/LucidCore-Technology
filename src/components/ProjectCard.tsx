import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import StatusBadge from './StatusBadge';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative block glass-card overflow-hidden"
    >
      {/* Gradient accent top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.themeGradient}`} />

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
              <img
                src={project.logo}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan transition-colors">
                {project.name}
              </h3>
              <p className="text-white/40 text-sm mt-0.5">{project.slogan}</p>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-mono">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs font-mono text-white/30 uppercase tracking-wider">
            {project.category === 'internal' ? 'Lucidcore Project' : 'Client Project'}
          </span>
          <span className="flex items-center gap-1 text-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${project.themeColor}08, transparent 60%)`,
        }}
      />
    </Link>
  );
}
