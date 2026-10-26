'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  Palette,
  Compass,
  ArrowRight,
  Zap,
  Code2,
  ShieldCheck,
  Search,
  Flame,
} from 'lucide-react';
import { TOOLS_DATA } from '@/data/toolsData';
import { AdBanner } from '@/components/ads/AdBanner';
import { HeroShowcase } from '@/components/home/HeroShowcase';
import { ToolCardPreview } from '@/components/home/ToolCardPreview';

const MARQUEE_ITEMS = [
  'FROSTED GLASSMORPHISM',
  'CYBERPUNK GLITCH',
  '3D CLAYMORPHISM',
  'AURORA MESH GRADIENT',
  '8-BIT PIXEL ART',
  'CRT SCANLINES',
  'POP-ART HALFTONE',
  'RETRO WINAMP PLAYER',
  'SWISS INTERNATIONAL',
  'VICTORIAN MONOGRAM',
  'URBAN GRAFFITI SPRAY',
  'CALLIGRAPHIC SIGNATURE',
  'MINIMALIST BIO-LINK',
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'css' && tool.categoryShort === 'CSS Generators') ||
      (selectedCategory === 'canvas' && tool.categoryShort === 'Canvas & Images') ||
      (selectedCategory === 'typography' && tool.categoryShort === 'Typography & Audio');

    const matchesSearch =
      searchFilter.trim() === '' ||
      tool.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tool.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tool.features.some((f) => f.toLowerCase().includes(searchFilter.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen forge-bg forge-text selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Studio Workbench Header (Left-Right Split Layout) */}
      <section className="border-b border-[var(--app-card-border)] bg-[var(--app-bg)] py-8 md:py-10">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Direct Utility & Search Workbench */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              <div className="flex items-center gap-2 mb-3 font-mono text-xs text-cyan-500 font-semibold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                <span>Open Source Frontend Utility</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight forge-text leading-tight">
                CSS &amp; Canvas Code Studio
              </h1>

              <p className="mt-3 text-sm sm:text-base forge-text-muted leading-relaxed max-w-xl">
                Visual builders for frosted glass, glitch keyframes, tactile 3D elements, and generative canvas textures. Generates production-ready CSS and Tailwind snippets entirely inside your browser.
              </p>

              {/* Fast Search & Jump Input */}
              <div className="mt-6 relative max-w-lg">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 forge-text-muted" />
                <input
                  type="text"
                  placeholder="Search styles (e.g. Glassmorphism, Pixel Art, Scanlines)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full rounded-lg border border-[var(--app-card-border)] bg-[var(--app-card)] pl-10 pr-4 py-2.5 text-sm forge-text placeholder-[var(--app-text-muted)] focus:border-cyan-500 focus:outline-none transition-colors shadow-xs"
                />
              </div>

              {/* Technical Specifications Specs Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono forge-text-muted border-t border-[var(--app-card-border)] pt-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-cyan-400 font-bold">20</span> Tools
                </div>
                <span>•</span>
                <div>100% Client-Side</div>
                <span>•</span>
                <div>Zero Dependencies</div>
                <span>•</span>
                <div>MIT License</div>
              </div>
            </div>

            {/* Right Column: Live Interactive Specimen Stage */}
            <div className="lg:col-span-6">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Smooth Design Marquee Ribbon */}
      <div className="relative border-y border-[var(--app-card-border)] bg-[var(--app-bg-secondary)] py-3 overflow-hidden shadow-inner">
        <div className="animate-marquee gap-8 items-center text-xs font-mono font-bold tracking-widest forge-text-muted">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-4 transition-colors hover:text-cyan-400 cursor-default"
            >
              <span>{item}</span>
              <span className="text-cyan-500/40">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Top Banner Advertisement Slot */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
        <AdBanner format="leaderboard" />
      </div>

      {/* Tools Directory & Filter Section */}
      <section id="tools-directory" className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Category Tabs (smooth horizontal scroll on mobile) */}
        <div className="flex items-center justify-between gap-4 mb-6 border-b border-[var(--app-card-border)] pb-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text-muted hover:forge-text'
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              All Tools ({TOOLS_DATA.length})
            </button>

            <button
              id="css-generators"
              onClick={() => setSelectedCategory('css')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'css'
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text-muted hover:forge-text'
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span>CSS Generators (5)</span>
            </button>

            <button
              id="canvas-images"
              onClick={() => setSelectedCategory('canvas')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'canvas'
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text-muted hover:forge-text'
              }`}
            >
              <Palette className="h-3.5 w-3.5 text-amber-400" />
              <span>Canvas &amp; Images (6)</span>
            </button>

            <button
              id="typography-audio"
              onClick={() => setSelectedCategory('typography')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'typography'
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text-muted hover:forge-text'
              }`}
            >
              <Compass className="h-3.5 w-3.5 text-purple-400" />
              <span>Typography &amp; Audio (9)</span>
            </button>
          </div>

          <div className="hidden sm:block text-xs font-mono forge-text-muted shrink-0">
            Showing {filteredTools.length} tools
          </div>
        </div>

        {/* 20 Tools Catalog Grid: 4 columns on large screens for high spatial density */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.route}
              className="forge-card group relative flex flex-col justify-between overflow-hidden rounded-xl p-5"
            >
              <div>
                {/* Visual Preview on Top of Each Card */}
                <div className="mb-4">
                  <ToolCardPreview toolId={tool.id} />
                </div>

                {/* Card Top Category Pill & Badges */}
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-2 py-0.5 text-[11px] font-mono font-medium text-cyan-400">
                    <Code2 className="h-3 w-3" />
                    {tool.categoryShort}
                  </span>
                  {tool.badge && (
                    <span className="flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold forge-text group-hover:text-cyan-400 transition-colors flex items-center justify-between mt-2">
                  <span>{tool.name}</span>
                  <ArrowRight className="h-4 w-4 forge-text-muted opacity-60 group-hover:opacity-100 group-hover:text-cyan-400 transition-opacity" />
                </h3>
                <p className="mt-1 text-xs font-medium text-cyan-400/80">
                  {tool.subtitle}
                </p>

                <p className="mt-2.5 text-xs leading-relaxed forge-text-muted line-clamp-2">
                  {tool.description}
                </p>
              </div>

              {/* Card Footer Feature Chips & Action */}
              <div className="mt-5 pt-3 border-t border-[var(--app-card-border)]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tool.features.slice(0, 3).map((feat, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-1.5 py-0.5 text-[10px] font-mono forge-text-muted"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span>Open Studio</span>
                  <span>Direct Export →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-12 text-center">
            <p className="forge-text-muted text-sm">
              No design tools matched your query &quot;{searchFilter}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setSelectedCategory('all');
              }}
              className="mt-3 rounded-lg bg-cyan-600 px-4 py-1.5 text-xs font-semibold text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Mid-Page In-Feed High CTR Ad Slot */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 my-8">
        <AdBanner format="in-feed" />
      </div>

      {/* Architecture & Engineering Standards Section */}
      <section className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-[var(--app-card-border)]">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            System Specifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold forge-text tracking-tight mt-1">
            Engineered for Precision & Zero Latency
          </h2>
          <p className="text-sm forge-text-muted mt-2">
            Technical foundation behind UXForge code generators and processing pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-cyan-400 font-mono text-xs font-bold border border-slate-700">
                01
              </div>
              <h3 className="text-base font-bold forge-text">Client-Side Runtime</h3>
            </div>
            <p className="text-xs forge-text-muted leading-relaxed">
              Every slider computation, canvas convolution, and color mix algorithm runs locally in the main browser thread. No external API requests, no cloud bottlenecks, and zero telemetry on your inputs.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-cyan-400 font-mono text-xs font-bold border border-slate-700">
                02
              </div>
              <h3 className="text-base font-bold forge-text">Production Code Output</h3>
            </div>
            <p className="text-xs forge-text-muted leading-relaxed">
              Export standard CSS declarations, keyframe blocks, and modern Tailwind CSS utility classes. Clean syntax formatted for immediate use in Next.js, React, or static HTML repositories.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
