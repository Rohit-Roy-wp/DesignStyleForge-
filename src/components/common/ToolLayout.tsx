'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles, ArrowLeft } from 'lucide-react';
import { AdBanner } from '@/components/ads/AdBanner';
import { SeoArticle, SeoArticleSection } from '@/components/common/SeoArticle';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/common/JsonLd';
import { TOOLS_DATA, ToolMetadata } from '@/data/toolsData';

interface ToolLayoutProps {
  tool: ToolMetadata;
  controls: React.ReactNode;
  preview: React.ReactNode;
  codeOutput?: React.ReactNode;
  seoSections: SeoArticleSection[];
  faqs: FaqItem[];
  browserSupport?: { browser: string; support: string }[];
}

export function ToolLayout({
  tool,
  controls,
  preview,
  codeOutput,
  seoSections,
  faqs,
  browserSupport,
}: ToolLayoutProps) {
  // Related tools from the same or other categories
  const relatedTools = TOOLS_DATA.filter((t) => t.id !== tool.id).slice(0, 4);

  return (
    <div className="min-h-screen forge-bg forge-text selection:bg-cyan-500/30 transition-colors duration-300">
      {/* JSON-LD Schema for Google Rich Snippets */}
      <JsonLd
        toolName={tool.name}
        description={tool.description}
        category={tool.category}
        url={`https://uxforge.vercel.app${tool.route}`}
        faqs={faqs}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs forge-text-muted">
          <Link href="/" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <span>{tool.categoryShort}</span>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <span className="text-cyan-400 font-semibold">{tool.name}</span>
        </nav>

        {/* Top Header Banner AdSlot */}
        <div className="mb-6">
          <AdBanner format="leaderboard" />
        </div>

        {/* Hero Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--app-card-border)] pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
                <Sparkles className="h-3 w-3" />
                {tool.categoryShort}
              </span>
              {tool.badge && (
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                  {tool.badge}
                </span>
              )}
              <span className="rounded-full border border-[var(--app-card-border)] bg-[var(--app-tag-bg)] px-2.5 py-0.5 text-xs forge-text-muted">
                100% Client-Side
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight forge-text">
              {tool.name}
            </h1>
            <p className="mt-1.5 text-sm md:text-base forge-text-muted max-w-2xl">
              {tool.subtitle}
            </p>
          </div>

          {/* Quick Features tags */}
          <div className="flex flex-wrap gap-1.5">
            {tool.features.map((feat, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-2.5 py-1 text-xs forge-text-muted"
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-5 forge-card rounded-2xl p-5 md:p-6 shadow-xl">
            <h2 className="text-base font-bold forge-text mb-4 pb-2 border-b border-[var(--app-card-border)] flex items-center justify-between">
              <span>Configuration & Controls</span>
              <span className="text-xs font-normal forge-text-muted">Real-time update</span>
            </h2>
            {controls}
          </div>

          {/* Right Column: Live Interactive Preview */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="forge-card rounded-2xl p-5 md:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--app-card-border)]">
                <h2 className="text-base font-bold forge-text">Live Visual Preview</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs forge-text-muted">Interactive</span>
                </div>
              </div>
              <div className="min-h-[300px] flex items-center justify-center rounded-xl overflow-hidden border border-[var(--app-card-border)] bg-[var(--app-bg-secondary)] p-4 relative">
                {preview}
              </div>
            </div>

            {/* Code Output Box if present */}
            {codeOutput && <div>{codeOutput}</div>}
          </div>
        </div>

        {/* High-CTR In-Feed Ad Banner (Placed directly below generator output) */}
        <div className="my-8">
          <AdBanner format="in-feed" />
        </div>

        {/* SEO In-Depth Technical Guide & Article (Min 400+ words) */}
        <SeoArticle
          toolName={tool.name}
          sections={seoSections}
          browserSupport={browserSupport}
        />

        {/* FAQ Accordion Section */}
        <FaqAccordion faqs={faqs} />

        {/* Related Tools Recommendation */}
        <section className="my-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold forge-text">Explore More Design Generators</h3>
            <Link
              href="/"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View All 20 Tools →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTools.map((rel) => (
              <Link
                key={rel.id}
                href={rel.route}
                className="forge-card group rounded-xl p-4 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-cyan-400">{rel.categoryShort}</span>
                  {rel.badge && (
                    <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">
                      {rel.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold forge-text group-hover:text-cyan-400 transition-colors">
                  {rel.name}
                </h4>
                <p className="mt-1 text-xs forge-text-muted line-clamp-2">
                  {rel.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
