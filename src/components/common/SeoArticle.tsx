import React from 'react';
import { BookOpen, Clock, CheckCircle2, Globe, ShieldCheck } from 'lucide-react';

export interface SeoArticleSection {
  title: string;
  id: string;
  content: React.ReactNode;
}

interface SeoArticleProps {
  toolName: string;
  readTime?: string;
  sections: SeoArticleSection[];
  browserSupport?: { browser: string; support: string }[];
}

export function SeoArticle({
  toolName,
  readTime = '4 min read',
  sections,
  browserSupport,
}: SeoArticleProps) {
  return (
    <article className="mt-12 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 p-6 md:p-10 backdrop-blur shadow-xl">
      {/* Article Header */}
      <header className="border-b border-neutral-800/80 pb-6 mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-3">
          <span className="flex items-center gap-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 font-medium text-cyan-300">
            <BookOpen className="h-3 w-3" />
            In-Depth Guide & Specs
          </span>
          <span className="flex items-center gap-1 text-neutral-400">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            AdSense Safe & Verified
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Mastering {toolName}: Technical Specs, Best Practices & Code Implementation
        </h2>
        <p className="mt-2 text-sm md:text-base text-neutral-400">
          Everything you need to know about the design principles, performance implications, and cross-browser CSS/Canvas integration for modern web applications.
        </p>

        {/* Quick Table of Contents Pills */}
        <nav aria-label="Table of contents" className="mt-4 flex flex-wrap gap-2">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 text-xs text-neutral-400 transition-colors hover:border-cyan-500/50 hover:text-cyan-300"
            >
              #{sec.title}
            </a>
          ))}
        </nav>
      </header>

      {/* Sections Content */}
      <div className="space-y-8 text-neutral-300 leading-relaxed">
        {sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-24">
            <h3 className="text-xl font-bold tracking-tight text-white mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              {sec.title}
            </h3>
            <div className="text-sm md:text-base text-neutral-300 space-y-3 prose-invert">
              {sec.content}
            </div>
          </section>
        ))}
      </div>

      {/* Browser Support Table if provided */}
      {browserSupport && browserSupport.length > 0 && (
        <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-cyan-400" />
            <h4 className="text-sm font-semibold text-white">Browser Compatibility Matrix</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {browserSupport.map((b, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-neutral-800/80 bg-neutral-900/60 p-2.5"
              >
                <span className="font-medium text-neutral-300">{b.browser}</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  {b.support}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
