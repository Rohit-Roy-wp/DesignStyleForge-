import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap, ShieldCheck, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About UXForge — the ultimate frontend utility platform.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-neutral-300">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-cyan-400 mb-6 transition-colors">
        <ArrowLeft className="h-3 w-3" />
        Back to Home
      </Link>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-10 backdrop-blur">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          About UXForge
        </h1>

        <div className="space-y-6 text-sm leading-relaxed">
          <p className="text-base text-neutral-200">
            <strong>UXForge</strong> was built with a single audacious mission: to provide web developers, UI/UX engineers, and digital creators with instantaneous access to 20+ specialized design style generators with <strong>zero server lag</strong>, <strong>zero paywalls</strong>, and <strong>zero data tracking</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
              <Zap className="h-5 w-5 text-amber-400 mb-2" />
              <h3 className="font-bold text-white text-sm">Instant Client-Side</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Zero API latency. Canvas and CSS computations happen instantaneously in your browser.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-400 mb-2" />
              <h3 className="font-bold text-white text-sm">100% Free & Open</h3>
              <p className="text-xs text-neutral-400 mt-1">
                All generated code and assets can be used in your personal and commercial production apps.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
              <Heart className="h-5 w-5 text-pink-400 mb-2" />
              <h3 className="font-bold text-white text-sm">Aesthetic Depth</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Curated styles spanning Cyberpunk, Glassmorphism, Swiss Typographic, Pop Art, and Y2K.
              </p>
            </div>
          </div>

          <p>
            Whether you are fine-tuning a frosted glass navbar for a Next.js dashboard, designing a retro 8-bit game sprite, or previewing calligraphy scripts, UXForge saves hours of trial and error by producing production-ready code in 1-click.
          </p>
        </div>
      </div>
    </main>
  );
}
