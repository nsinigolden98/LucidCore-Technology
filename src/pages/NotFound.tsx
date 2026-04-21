import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 */}
        <div className="relative mb-8">
          <h1 className="font-display font-bold text-[120px] md:text-[180px] text-white/[0.03] leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-cyan to-neon-purple">
              404
            </span>
          </div>
        </div>

        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-white/50 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Don't worry — you can navigate back or head to our homepage.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="glow-button glow-button-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <Link to="/" className="glow-button glow-button-primary inline-flex items-center gap-2">
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
