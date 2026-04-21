import { useState } from 'react';
import { Lock, RefreshCw } from 'lucide-react';

interface MiniBrowserProps {
  url: string;
}

export default function MiniBrowser({ url }: MiniBrowserProps) {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);

  const displayUrl = url.replace(/^https?:\/\//, '');

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-surface shadow-2xl">
      {/* Browser Chrome */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-white/5">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex items-center gap-2 px-4 py-1.5 rounded-lg bg-void/60 border border-white/5">
          <Lock size={12} className="text-white/30 flex-shrink-0" />
          <span className="text-white/40 text-xs font-mono truncate">{displayUrl}</span>
        </div>
        <button
          onClick={() => { setLoading(true); setKey(k => k + 1); }}
          className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
          title="Reload"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* iframe */}
      <div className="relative aspect-[16/10] bg-void">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-cyan/30 border-t-cyan animate-spin" />
              <span className="text-white/40 text-xs font-mono">Loading...</span>
            </div>
          </div>
        )}
        <iframe
          key={key}
          src={url}
          title="Project Preview"
          className="w-full h-full border-0"
          onLoad={() => setLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
