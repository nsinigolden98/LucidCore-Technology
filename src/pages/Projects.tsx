import { useState, useMemo } from 'react';
import { allProjects } from '@/data/projects';
import type { FilterType } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';

const filters: { label: string; value: FilterType }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Live', value: 'live' },
  { label: 'Coming Soon', value: 'coming-soon' },
  { label: 'Internal', value: 'internal' },
  { label: 'Client Work', value: 'client' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProjects = useMemo(() => {
    switch (activeFilter) {
      case 'live':
        return allProjects.filter((p) => p.status === 'live');
      case 'coming-soon':
        return allProjects.filter((p) => p.status === 'coming-soon');
      case 'internal':
        return allProjects.filter((p) => p.category === 'internal');
      case 'client':
        return allProjects.filter((p) => p.category === 'client');
      default:
        return allProjects;
    }
  }, [activeFilter]);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-12">
        <div className="container-lucid">
          <SectionHeader
            caption="Projects Hub"
            title="Our Portfolio."
            description="Explore our ecosystem of products — from live platforms serving real users to experimental projects pushing the boundaries of what's possible."
          />
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-8">
        <div className="container-lucid">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-cyan text-void'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-8">
        <div className="container-lucid">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">No projects found</h3>
              <p className="text-white/40">No projects match the selected filter. Check back soon for updates.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="pb-24">
        <div className="container-lucid">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Projects', value: allProjects.length },
              { label: 'Live', value: allProjects.filter((p) => p.status === 'live').length },
              { label: 'Coming Soon', value: allProjects.filter((p) => p.status === 'coming-soon').length },
              { label: 'In Development', value: allProjects.filter((p) => p.status === 'in-development').length },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div className="font-display font-bold text-3xl text-cyan mb-1">{stat.value}</div>
                <div className="text-white/40 text-xs font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
