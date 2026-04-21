import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { navLinks, contactEmail } from '@/data/projects';

export default function Footer() {
  const socialIcons = [
    { icon: Github, url: 'https://github.com/nsinigolden98', label: 'GitHub' },
    { icon: Twitter, url: 'https://twitter.com/lucidcore', label: 'Twitter' },
    { icon: Instagram, url: 'https://instagram.com/lucidcore', label: 'Instagram' },
    { icon: Linkedin, url: 'https://linkedin.com/company/lucidcore', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-surface border-t border-white/5">
      {/* Large Display Text */}
      <div className="container-lucid pt-20 pb-16">
        <h2 className="font-display font-bold text-[60px] sm:text-[80px] md:text-[100px] lg:text-[130px] text-white/5 text-center leading-none tracking-tighter select-none">
          LUCIDCORE
        </h2>
      </div>

      {/* Footer Content */}
      <div className="container-lucid pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-neon-purple flex items-center justify-center">
                <span className="font-display font-bold text-void text-sm">L</span>
              </div>
              <span className="font-display font-semibold text-white text-lg">
                Lucidcore
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Innovation at its core. Building the future of digital products and spatial computing.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 text-cyan hover:text-white transition-colors text-sm"
            >
              <Mail size={14} />
              {contactEmail}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/60 hover:text-cyan transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/founder" className="text-white/60 hover:text-cyan transition-colors text-sm">
                  Founder
                </Link>
              </li>
              <li>
                <Link to="/proof" className="text-white/60 hover:text-cyan transition-colors text-sm">
                  Verification
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/60 hover:text-cyan transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialIcons.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Lucidcore Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
