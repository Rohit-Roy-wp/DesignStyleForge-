'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap, Layers, Box, Flame } from 'lucide-react';

export function HeroShowcase() {
  const [activeTab, setActiveTab] = useState<'glass' | 'cyber' | 'clay' | 'aurora'>('glass');
  const [isClayPressed, setIsClayPressed] = useState<boolean>(false);

  return (
    <div className="relative mx-auto max-w-4xl mt-12 mb-6">
      {/* Decorative ambient glowing orbs behind the showcase */}
      <div className="absolute -top-10 left-1/4 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl -z-10 pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-10 right-1/4 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl -z-10 pointer-events-none animate-pulse-glow" />

      {/* Main Showcase Container */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-3.5 sm:p-6 backdrop-blur-2xl shadow-2xl">
        {/* Top Specimen Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-[var(--app-card-border)] pb-3 sm:pb-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase forge-text">
              Live Style Lab • Interactive Specimens
            </span>
          </div>

          <div className="flex items-center rounded-xl bg-[var(--app-bg-secondary)] p-1 border border-[var(--app-card-border)] text-xs overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveTab('glass')}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'glass'
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'forge-text-muted hover:forge-text'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              Glass
            </button>
            <button
              onClick={() => setActiveTab('cyber')}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'cyber'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'forge-text-muted hover:forge-text'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              Cyberpunk
            </button>
            <button
              onClick={() => setActiveTab('clay')}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'clay'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'forge-text-muted hover:forge-text'
              }`}
            >
              <Box className="h-3.5 w-3.5" />
              3D Clay
            </button>
            <button
              onClick={() => setActiveTab('aurora')}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'aurora'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'forge-text-muted hover:forge-text'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Aurora
            </button>
          </div>
        </div>

        {/* Interactive Specimen Stage */}
        <div className="relative min-h-[260px] sm:min-h-[290px] rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-[var(--app-card-border)]">
          {/* TAB 1: GLASSMORPHISM */}
          {activeTab === 'glass' && (
            <div className="relative w-full h-full flex items-center justify-center py-6">
              {/* Dynamic glowing geometric spheres that bleed through the glass */}
              <div className="absolute -top-4 left-1/3 h-32 w-32 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 blur-sm animate-float" />
              <div className="absolute -bottom-4 right-1/3 h-36 w-36 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 blur-sm animate-float-delayed" />

              {/* The Live Glass Specimen */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.28)',
                  boxShadow: '0 16px 40px 0 rgba(0, 0, 0, 0.35)',
                  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
                }}
                className="relative z-10 w-full max-w-sm rounded-2xl p-6 text-white transition-all hover:scale-102 duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-3 w-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80"></span>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-80">
                    Fluent Glass Acrylic
                  </span>
                </div>
                <h4 className="text-xl font-bold tracking-tight">Frosted Glass Prism</h4>
                <p className="mt-1 text-xs opacity-90 leading-relaxed">
                  Backdrop filter blur with optical reflection and specular edge highlights.
                </p>
                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] opacity-75">backdrop-filter: blur(20px)</span>
                  <Link
                    href="/tools/glassmorphism/"
                    className="flex items-center gap-1 font-semibold text-cyan-300 hover:text-white"
                  >
                    Open Builder →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CYBERPUNK NEON GLITCH */}
          {activeTab === 'cyber' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-black rounded-xl p-6 overflow-hidden">
              {/* Scanline overlay */}
              <div className="scanlines absolute inset-0 opacity-40 pointer-events-none" />
              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10 text-center">
                <span
                  style={{
                    textShadow: '0 0 8px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #ff007f',
                  }}
                  className="glitch-text text-3xl sm:text-4xl font-black text-white tracking-widest uppercase block select-none"
                >
                  CYBERPUNK 2077
                </span>
                <p className="mt-2 text-xs font-mono text-cyan-400">
                  Dual-tone chromatic aberration & 60fps jitter keyframes
                </p>
                <Link
                  href="/tools/cyberpunk/"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-pink-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-pink-600/30 hover:bg-pink-500 transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" /> Launch Glitch Generator
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: 3D CLAYMORPHISM */}
          {activeTab === 'clay' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-950/40 rounded-xl">
              <p className="text-xs forge-text-muted mb-4 font-mono">
                Click or press to test tactile 3D rubber cushion physics:
              </p>

              <button
                type="button"
                onMouseDown={() => setIsClayPressed(true)}
                onMouseUp={() => setIsClayPressed(false)}
                onMouseLeave={() => setIsClayPressed(false)}
                onTouchStart={() => setIsClayPressed(true)}
                onTouchEnd={() => setIsClayPressed(false)}
                style={{
                  backgroundColor: '#6366f1',
                  borderRadius: '32px',
                  boxShadow: isClayPressed
                    ? '0px 4px 8px rgba(0,0,0,0.3), inset -4px -4px 8px rgba(0,0,0,0.5), inset 4px 4px 8px rgba(255,255,255,0.4)'
                    : '0px 16px 32px rgba(0,0,0,0.35), inset -8px -8px 14px rgba(0,0,0,0.4), inset 8px 8px 14px rgba(255,255,255,0.45)',
                  transform: isClayPressed ? 'translateY(4px) scale(0.97)' : 'translateY(0) scale(1)',
                }}
                className="px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-extrabold text-white transition-all duration-150 cursor-pointer select-none flex items-center gap-2"
              >
                <Box className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Tactile Clay Cushion</span>
              </button>

              <Link
                href="/tools/claymorphism/"
                className="mt-6 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Build Custom Clay Buttons →
              </Link>
            </div>
          )}

          {/* TAB 4: AURORA MESH */}
          {activeTab === 'aurora' && (
            <div
              style={{
                backgroundColor: '#030712',
                backgroundImage:
                  'radial-gradient(at 0% 0%, #10b981 0px, transparent 65%), radial-gradient(at 100% 0%, #06b6d4 0px, transparent 65%), radial-gradient(at 100% 100%, #8b5cf6 0px, transparent 65%), radial-gradient(at 0% 100%, #ec4899 0px, transparent 65%)',
                backgroundSize: '180% 180%',
                animation: 'auroraDrift 10s ease infinite alternate',
              }}
              className="relative w-full h-full flex flex-col items-center justify-center rounded-xl p-6 text-center select-none shadow-inner"
            >
              <div className="rounded-2xl border border-white/20 bg-black/40 p-5 backdrop-blur-md max-w-xs text-white">
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  Liquid Mesh Canvas
                </span>
                <h4 className="text-xl font-black mt-1">Northern Lights</h4>
                <p className="mt-1 text-xs opacity-80">
                  Continuous 4-node radial gradient drift in pure CSS.
                </p>
                <Link
                  href="/tools/aurora/"
                  className="mt-3 inline-block rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-400 transition-colors"
                >
                  Generate Aurora CSS →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
