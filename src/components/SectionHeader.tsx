interface SectionHeaderProps {
  caption: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({ caption, title, description, align = 'center', light }: SectionHeaderProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      <span className="caption-label">{caption}</span>
      <h2 className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 mb-6 ${light ? 'text-white' : 'text-white'}`}>
        {title}
      </h2>
      {description && (
        <p className="text-white/50 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
