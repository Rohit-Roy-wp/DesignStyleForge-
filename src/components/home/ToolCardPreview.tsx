'use client';

import React from 'react';

interface ToolCardPreviewProps {
  toolId: string;
}

export function ToolCardPreview({ toolId }: ToolCardPreviewProps) {
  switch (toolId) {
    case 'glassmorphism':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-3 border border-white/5">
          <div className="absolute -top-2 -left-2 h-16 w-16 rounded-full bg-pink-500/80 blur-xs animate-pulse" />
          <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-cyan-400/80 blur-xs" />
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
            className="relative z-10 w-3/4 rounded-lg p-2.5 text-center text-white"
          >
            <div className="h-1.5 w-6 rounded-full bg-cyan-400 mx-auto mb-1" />
            <div className="text-[10px] font-mono font-bold tracking-wider">FROSTED GLASS</div>
          </div>
        </div>
      );

    case 'cyberpunk':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-black flex flex-col items-center justify-center border border-cyan-500/20">
          <div className="scanlines absolute inset-0 opacity-40 pointer-events-none" />
          <span
            style={{ textShadow: '0 0 6px #00f0ff, 0 0 14px #ff007f' }}
            className="glitch-text font-mono text-base font-black tracking-widest text-white uppercase select-none"
          >
            NEON 2077
          </span>
          <div className="mt-2 flex gap-1">
            <span className="h-1 w-4 rounded-full bg-cyan-400 animate-pulse" />
            <span className="h-1 w-4 rounded-full bg-pink-500 animate-pulse" />
            <span className="h-1 w-4 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </div>
      );

    case 'claymorphism':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-gradient-to-br from-indigo-950/30 to-purple-950/30 flex items-center justify-center p-3 border border-white/5">
          <div
            style={{
              backgroundColor: '#6366f1',
              borderRadius: '20px',
              boxShadow:
                '0px 8px 16px rgba(0,0,0,0.3), inset -4px -4px 8px rgba(0,0,0,0.35), inset 4px 4px 8px rgba(255,255,255,0.4)',
            }}
            className="px-5 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            3D Clay Pill
          </div>
        </div>
      );

    case 'aurora':
      return (
        <div
          style={{
            backgroundColor: '#030712',
            backgroundImage:
              'radial-gradient(at 0% 0%, #10b981 0px, transparent 65%), radial-gradient(at 100% 0%, #06b6d4 0px, transparent 65%), radial-gradient(at 100% 100%, #8b5cf6 0px, transparent 65%), radial-gradient(at 0% 100%, #ec4899 0px, transparent 65%)',
            backgroundSize: '180% 180%',
            animation: 'auroraDrift 8s ease infinite alternate',
          }}
          className="relative h-28 w-full rounded-xl overflow-hidden flex items-center justify-center border border-white/10"
        >
          <div className="rounded-lg bg-black/40 px-3 py-1 font-mono text-[10px] text-white backdrop-blur-xs font-bold">
            AURORA MESH
          </div>
        </div>
      );

    case 'minimalism':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-neutral-900/60 flex items-center justify-center p-2 border border-white/5">
          <div className="w-24 rounded-xl border border-neutral-700 bg-neutral-950 p-1.5 text-center shadow-lg">
            <div className="h-5 w-5 rounded-full bg-neutral-700 mx-auto mb-1 border border-neutral-600" />
            <div className="h-1 w-8 bg-neutral-500 rounded-full mx-auto mb-1.5" />
            <div className="space-y-1">
              <div className="h-2 w-full rounded bg-neutral-800" />
              <div className="h-2 w-full rounded bg-neutral-800" />
            </div>
          </div>
        </div>
      );

    case 'pixel-art':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center border border-white/5">
          {/* 8-bit Sword Sprite Grid */}
          <div
            style={{ imageRendering: 'pixelated' }}
            className="grid grid-cols-5 gap-1 p-2 bg-neutral-900 rounded-lg border border-neutral-800"
          >
            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-cyan-400" />
            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-transparent" />

            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-cyan-400" />
            <div className="h-2.5 w-2.5 bg-white" />
            <div className="h-2.5 w-2.5 bg-cyan-400" />
            <div className="h-2.5 w-2.5 bg-transparent" />

            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-cyan-400" />
            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-transparent" />

            <div className="h-2.5 w-2.5 bg-amber-400" />
            <div className="h-2.5 w-2.5 bg-amber-400" />
            <div className="h-2.5 w-2.5 bg-amber-400" />
            <div className="h-2.5 w-2.5 bg-amber-400" />
            <div className="h-2.5 w-2.5 bg-amber-400" />

            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-neutral-500" />
            <div className="h-2.5 w-2.5 bg-transparent" />
            <div className="h-2.5 w-2.5 bg-transparent" />
          </div>
        </div>
      );

    case 'retro':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#090b14] flex flex-col items-center justify-center border-2 border-neutral-700">
          <div className="scanlines absolute inset-0 opacity-50 pointer-events-none" />
          <span className="font-mono text-xs font-bold text-emerald-400 tracking-widest animate-pulse">
            INSERT COIN
          </span>
          <span className="font-mono text-[9px] text-amber-400 mt-1">1984 ARCADE 60HZ</span>
        </div>
      );

    case 'pop-art':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-yellow-400 flex items-center justify-center p-2 border-2 border-black">
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 rounded-full bg-red-600 border-2 border-black flex items-center justify-center text-white text-lg font-black shadow-[3px_3px_0px_#000]">
              POW!
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-12 bg-black rounded" />
              <div className="h-1.5 w-8 bg-blue-600 rounded" />
            </div>
          </div>
        </div>
      );

    case 'collage-art':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#f4ede4] flex items-center justify-center border border-neutral-400">
          <div className="relative">
            <div className="h-12 w-14 rounded bg-red-700 text-white font-mono text-[8px] p-1 shadow-md rotate-[-6deg] border border-red-900">
              AIR MAIL
            </div>
            <div className="absolute -top-1 -right-4 text-2xl rotate-[12deg]">🌿</div>
          </div>
        </div>
      );

    case 'editorial':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-900 flex flex-col justify-between p-2.5 border border-white/10 text-white">
          <div className="text-center font-serif text-lg font-black tracking-widest border-b border-white/20 pb-0.5">
            VOGUE
          </div>
          <div className="font-serif text-[10px] italic">The Digital Issue</div>
        </div>
      );

    case 'surreal-art':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-neutral-950 flex items-center justify-center border border-white/10">
          <div className="text-3xl filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)] animate-float">
            👁️
          </div>
          <div className="absolute top-2 right-4 text-lg">🌙</div>
        </div>
      );

    case 'maximalism':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-pink-600 flex items-center justify-center border-2 border-black p-2">
          <div className="bg-yellow-400 text-black font-black text-xs px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-8deg]">
            NO RULES
          </div>
          <div className="absolute bg-cyan-400 text-black font-black text-[9px] px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] rotate-[10deg] bottom-2">
            CHAOS!
          </div>
        </div>
      );

    case 'futuristic':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#04060c] flex items-center justify-center border border-cyan-500/20">
          <div className="relative h-16 w-16 rounded-full border border-cyan-400/50 flex items-center justify-center">
            <div className="absolute inset-0 origin-center animate-spin rounded-full border-t border-cyan-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>
      );

    case 'vector-art':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center border border-white/5 p-2">
          <svg viewBox="0 0 100 100" className="h-14 w-14 text-cyan-400">
            <polygon points="50 10, 90 40, 75 85, 25 85, 10 40" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'y2k':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-950 flex flex-col justify-center items-center border border-neutral-600 p-3">
          <div className="w-full bg-black rounded p-1.5 flex items-end justify-between h-10 gap-1 border border-neutral-700">
            {[40, 70, 90, 50, 80, 60, 95, 30].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-emerald-500 to-amber-400 rounded-xs"
              />
            ))}
          </div>
          <span className="font-mono text-[8px] text-emerald-400 mt-1">WINAMP v2.91</span>
        </div>
      );

    case 'swiss-design':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-white text-black flex flex-col justify-between p-2.5 border border-neutral-300">
          <div className="flex gap-2 items-center">
            <div className="h-full w-1.5 bg-red-600" />
            <div className="font-black text-sm uppercase tracking-tighter">DIE FORM</div>
          </div>
          <div className="h-2 w-full bg-red-600" />
          <div className="text-[7px] font-bold uppercase">ZÜRICH 1968</div>
        </div>
      );

    case 'bohemian':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden flex border border-white/5">
          <div className="flex-1 bg-[#c86d51]" />
          <div className="flex-1 bg-[#e8c5a5]" />
          <div className="flex-1 bg-[#879b88]" />
          <div className="flex-1 bg-[#d9a74a]" />
          <div className="flex-1 bg-[#443730]" />
        </div>
      );

    case 'victorian':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#fdfbf7] flex items-center justify-center border-2 border-neutral-300 p-2">
          <div className="h-16 w-16 rounded-full border-2 border-dashed border-[#b45309] flex items-center justify-center text-[#b45309] font-serif font-black text-2xl">
            V
          </div>
        </div>
      );

    case 'graffiti':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#18181b] flex items-center justify-center border border-neutral-700">
          <div className="text-xl font-black text-pink-500 tracking-wider rotate-[-6deg] filter drop-shadow-[0_0_8px_#ec4899]">
            STREET ART
          </div>
          <div className="absolute h-4 w-1 bg-pink-500 rounded-full bottom-3 left-1/2" />
        </div>
      );

    case 'handwritten':
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#fffdfa] flex items-center justify-center border border-neutral-300 text-slate-900">
          <span className="font-serif italic text-xl font-bold tracking-wide rotate-[-3deg]">
            Signature Elegance
          </span>
        </div>
      );

    default:
      return (
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-neutral-900/60 flex items-center justify-center border border-white/5">
          <span className="text-xs font-mono font-bold text-cyan-400">DESIGN FORGE</span>
        </div>
      );
  }
}
