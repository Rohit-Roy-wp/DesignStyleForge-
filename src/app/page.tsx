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
  '✦ FROSTED GLASSMORPHISM',
  '⚡ CYBERPUNK 2077 GLITCH',
  '☁️ 3D CLAYMORPHISM',
  '🌌 AURORA BOREALIS MESH',
  '👾 8-BIT PIXEL ART',
  '📺 CRT SCANLINES',
  '💥 POP-ART HALFTONE',
  '📼 Y2K RETRO WINAMP',
  '📐 SWISS INTERNATIONAL',
  '📜 VICTORIAN MONOGRAM',
  '🎨 URBAN GRAFFITI SPRAY',
  '✍️ CALLIGRAPHIC SIGNATURE',
  '📱 MINIMALIST BIO-LINK',
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
      {/* Hero Section with Ambient Lights */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Dynamic Glowing Ambient Light Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[650px] rounded-full bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl -z-10 pointer-events-none animate-pulse-glow" />
        <div className="absolute top-8 right-8 h-80 w-80 rounded-full bg-pink-500/15 blur-3xl -z-10 pointer-events-none animate-float" />
        <div className="absolute bottom-8 left-8 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl -z-10 pointer-events-none animate-float-delayed" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400 shadow-lg shadow-cyan-500/10 mb-6 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
            <span>20+ Frontend Style Engines & Canvas Laboratories</span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="forge-text-muted">₹0 Server Cost</span>
          </div>

          {/* Main Headline */}
          <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            Forge Extraordinary{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500">
              Frontend Aesthetics
            </span>{' '}
            in Real-Time.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg forge-text-muted leading-relaxed">
            Stop guessing CSS blur values and shadow coordinates. Design, preview, and generate production-grade code for <strong>Glassmorphism, Cyberpunk, Claymorphism, Aurora Gradients, Pixel Art, and 15+ more styles</strong> in seconds.
          </p>

          {/* The Interactive Style Specimen Showcase */}
          <HeroShowcase />

          {/* Quick Metrics Bar */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-4 backdrop-blur shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">20+</div>
              <div className="text-xs forge-text-muted mt-0.5 font-medium">Design Styles</div>
            </div>
            <div className="rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-4 backdrop-blur shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹0</div>
              <div className="text-xs forge-text-muted mt-0.5 font-medium">Infra / Server Cost</div>
            </div>
            <div className="rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-4 backdrop-blur shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">100%</div>
              <div className="text-xs forge-text-muted mt-0.5 font-medium">Client-Side SSG</div>
            </div>
            <div className="rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-4 backdrop-blur shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-pink-400">&lt; 1s</div>
              <div className="text-xs forge-text-muted mt-0.5 font-medium">Instant Copy Code</div>
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
      <section id="tools-directory" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Section Header & Search Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2 forge-text">
              <span>Interactive Utility Suite</span>
              <span className="text-xs font-mono rounded-lg border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-2 py-0.5 forge-text-muted">
                {filteredTools.length} of {TOOLS_DATA.length} Tools
              </span>
            </h2>
            <p className="text-sm forge-text-muted mt-1">
              Select a category or filter to begin generating code.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 forge-text-muted" />
            <input
              type="text"
              placeholder="Filter by style or feature..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] pl-10 pr-4 py-2 text-sm forge-text placeholder-[var(--app-text-muted)] focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[var(--app-card-border)] pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text-muted hover:forge-text'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            All Styles (20)
          </button>

          <button
            id="css-generators"
            onClick={() => setSelectedCategory('css')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'css'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text-muted hover:forge-text'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            Module A: CSS Generators (5)
          </button>

          <button
            id="canvas-images"
            onClick={() => setSelectedCategory('canvas')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'canvas'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text-muted hover:forge-text'
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-amber-400" />
            Module B: Canvas & Images (6)
          </button>

          <button
            id="typography-audio"
            onClick={() => setSelectedCategory('typography')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'typography'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text-muted hover:forge-text'
            }`}
          >
            <Compass className="h-3.5 w-3.5 text-purple-400" />
            Module C: Typography & Audio (9)
          </button>
        </div>

        {/* 20 Tools Bento Grid with Visual Micro-Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.route}
              className="forge-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-md"
            >
              <div>
                {/* Visual Micro-Preview on Top of Each Card */}
                <div className="mb-4">
                  <ToolCardPreview toolId={tool.id} />
                </div>

                {/* Card Top Category Pill & Badges */}
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1 rounded-lg border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-cyan-400">
                    <Code2 className="h-3 w-3" />
                    {tool.categoryShort}
                  </span>
                  {tool.badge && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                      <Flame className="h-3 w-3" />
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold forge-text group-hover:text-cyan-400 transition-colors flex items-center justify-between mt-2">
                  <span>{tool.name}</span>
                  <ArrowRight className="h-4 w-4 forge-text-muted group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
                </h3>
                <p className="mt-1 text-xs font-medium text-cyan-400/80">
                  {tool.subtitle}
                </p>

                <p className="mt-3 text-xs leading-relaxed forge-text-muted line-clamp-2">
                  {tool.description}
                </p>
              </div>

              {/* Card Footer Feature Chips & Action */}
              <div className="mt-5 pt-3 border-t border-[var(--app-card-border)]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tool.features.slice(0, 3).map((feat, idx) => (
                    <span
                      key={idx}
                      className="rounded-md border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-2 py-0.5 text-[10px] forge-text-muted"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span>Launch Generator</span>
                  <span>Instant Code →</span>
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-10">
        <AdBanner format="in-feed" />
      </div>

      {/* Why DesignStyleForge Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--app-card-border)]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-black forge-text tracking-tight">
            Engineered for Modern Web Speed & Zero Friction
          </h2>
          <p className="text-sm forge-text-muted mt-2">
            Why thousands of developers and content creators choose DesignStyleForge for daily frontend design workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="forge-card rounded-2xl p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold forge-text">Zero Server Bottlenecks</h3>
            <p className="text-xs forge-text-muted mt-2 leading-relaxed">
              Every slider computation, canvas convolution, and color mix algorithm runs 100% locally in your browser thread. No loading spinners, no slow APIs.
            </p>
          </div>

          <div className="forge-card rounded-2xl p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold forge-text">Full Commercial Rights</h3>
            <p className="text-xs forge-text-muted mt-2 leading-relaxed">
              Every generated CSS snippet, Tailwind utility class, SVG path, and canvas PNG belongs entirely to you. Use them in production apps and client work royalty-free.
            </p>
          </div>

          <div className="forge-card rounded-2xl p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400 mb-4">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold forge-text">Tailwind & Pure CSS Ready</h3>
            <p className="text-xs forge-text-muted mt-2 leading-relaxed">
              Toggle between raw CSS keyframes and Tailwind CSS utility classes with one tap. Click Copy and paste directly into your project.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
