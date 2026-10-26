import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Heart, Terminal } from 'lucide-react';
import { TOOLS_DATA } from '@/data/toolsData';

export function Footer() {
  const cssTools = TOOLS_DATA.filter((t) => t.categoryShort === 'CSS Generators');
  const canvasTools = TOOLS_DATA.filter((t) => t.categoryShort === 'Canvas & Images');

  return (
    <footer className="border-t border-[var(--app-card-border)] bg-[var(--app-bg-secondary)] forge-text-muted transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[var(--app-card-border)]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-tight forge-text">
                DesignStyle<span className="text-cyan-400">Forge</span>
              </span>
            </Link>
            <p className="text-xs forge-text-muted leading-relaxed max-w-sm">
              The premier static frontend utility platform providing 20+ specialized generators, canvas filters, and layout tools for web developers, UI/UX designers, and digital creators.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs forge-text-muted">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                100% Free & Open
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Terminal className="h-3.5 w-3.5" />
                Client-Side Only
              </span>
            </div>
          </div>

          {/* CSS Generators */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider forge-text mb-3">
              CSS Generators
            </h4>
            <ul className="space-y-2 text-xs">
              {cssTools.map((t) => (
                <li key={t.id}>
                  <Link href={t.route} className="hover:text-cyan-400 transition-colors">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Canvas & Images */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider forge-text mb-3">
              Canvas & Image Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {canvasTools.slice(0, 5).map((t) => (
                <li key={t.id}>
                  <Link href={t.route} className="hover:text-cyan-400 transition-colors">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance (Mandatory for AdSense) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider forge-text mb-3">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy/" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-cyan-400 transition-colors">
                  About DesignStyleForge
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-cyan-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs forge-text-muted">
          <p>
            © {new Date().getFullYear()} DesignStyleForge. All rights reserved. Built with Next.js 15+ SSG.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for Developers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
