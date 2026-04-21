import type { ProjectStatus } from '@/types';

interface StatusBadgeProps {
  status: ProjectStatus;
}

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: 'Live', className: 'status-live' },
  'coming-soon': { label: 'Coming Soon', className: 'status-coming-soon' },
  'in-development': { label: 'In Development', className: 'status-in-development' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium ${config.className}`}>
      {status === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
      )}
      {config.label}
    </span>
  );
}
