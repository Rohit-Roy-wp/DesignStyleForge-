'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { Shuffle, Lock, Unlock, Copy, Check, Download, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaletteColor {
  hex: string;
  name: string;
  locked: boolean;
}

const EARTH_PRESETS: { hex: string; name: string }[][] = [
  [
    { hex: '#c86d51', name: 'Terracotta Clay' },
    { hex: '#e8c5a5', name: 'Desert Sand' },
    { hex: '#879b88', name: 'Wild Sage' },
    { hex: '#d9a74a', name: 'Warm Ochre' },
    { hex: '#443730', name: 'Raw Umber' },
  ],
  [
    { hex: '#b2533e', name: 'Burnt Sienna' },
    { hex: '#fceee9', name: 'Bleached Linen' },
    { hex: '#5b8a72', name: 'Eucalyptus' },
    { hex: '#e2b473', name: 'Adobe Mustard' },
    { hex: '#2c2523', name: 'Espresso Soil' },
  ],
  [
    { hex: '#9d5c41', name: 'Canyon Rust' },
    { hex: '#e7d8c9', name: 'Pampas Grass' },
    { hex: '#6b7a69', name: 'Olive Grove' },
    { hex: '#c59b6d', name: 'Golden Dune' },
    { hex: '#3d312a', name: 'Charcoal Hearth' },
  ],
];

export default function BohemianPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'bohemian')!;

  const [palette, setPalette] = useState<PaletteColor[]>(
    EARTH_PRESETS[0].map((c) => ({ ...c, locked: false }))
  );
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const toggleLock = (index: number) => {
    setPalette((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const randomizePalette = () => {
    const randomSet = EARTH_PRESETS[Math.floor(Math.random() * EARTH_PRESETS.length)];
    setPalette((prev) =>
      prev.map((c, i) => (c.locked ? c : { ...randomSet[i], locked: false }))
    );
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  // Generate CSS Variables Code
  const cssVariablesCode = `:root {
  --color-primary: ${palette[0].hex}; /* ${palette[0].name} */
  --color-secondary: ${palette[1].hex}; /* ${palette[1].name} */
  --color-accent: ${palette[2].hex}; /* ${palette[2].name} */
  --color-highlight: ${palette[3].hex}; /* ${palette[3].name} */
  --color-surface: ${palette[4].hex}; /* ${palette[4].name} */
}`;

  const tailwindConfigCode = `// tailwind.config.js - Earthy Bohemian Palette
module.exports = {
  theme: {
    extend: {
      colors: {
        earth: {
          terracotta: '${palette[0].hex}',
          linen: '${palette[1].hex}',
          sage: '${palette[2].hex}',
          ochre: '${palette[3].hex}',
          umber: '${palette[4].hex}',
        },
      },
    },
  },
};`;

  const downloadSwatchPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colWidth = 100;
    palette.forEach((c, idx) => {
      ctx.fillStyle = c.hex;
      ctx.fillRect(idx * colWidth, 0, colWidth, 200);

      // Label
      ctx.fillStyle = idx === 1 ? '#000000' : '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(c.hex.toUpperCase(), idx * colWidth + 50, 160);
      ctx.font = '9px sans-serif';
      ctx.fillText(c.name, idx * colWidth + 50, 178);
    });

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bohemian-earth-swatch.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const seoSections = [
    {
      id: 'bohemian-earthy-color-theory',
      title: 'Bohemian & Organic Color Theory: Terracotta, Desert Sage, and Warm Ochre',
      content: (
        <>
          <p>
            The <strong>Bohemian (Boho) & Earthy</strong> color aesthetic draws inspiration from natural mineral pigments, Mediterranean pottery, baked clay, sun-bleached desert sands, and botanical flora. As digital fatigue with neon screens grows, consumers and brand strategists increasingly gravitate toward warm, grounding, low-saturation hues that communicate tranquility, organic sustainability, and artisanal craftsmanship.
          </p>
          <p>
            Unlike synthetic digital primary colors (pure #ff0000 or #0000ff), earthy hues share common warm undertones (yellow and red base pigments), ensuring that any 5-color combination feels naturally cohesive without jarring clashing.
          </p>
        </>
      ),
    },
    {
      id: 'css-custom-properties-theming',
      title: 'Integrating Semantic CSS Variables into Modern Web Design Systems',
      content: (
        <>
          <p>
            By abstracting raw hex values into semantic tokens (<code className="text-cyan-400">--color-primary</code>, <code className="text-cyan-400">--color-surface</code>), engineering teams can hot-swap brand themes across entire design systems in a single CSS declaration block.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Can I lock specific colors while randomizing the others?',
      answer:
        'Yes! Click the lock icon on any color swatch to lock it in place while shuffling the remaining colors.',
    },
    {
      question: 'How do I copy all 5 colors at once for Tailwind CSS?',
      answer:
        'Use the Tailwind Config tab in the Generated Output box below to copy a ready-to-paste JavaScript theme config object.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Randomize Button */}
          <button
            onClick={randomizePalette}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 py-3 text-sm font-bold text-white shadow-lg shadow-amber-900/30 hover:opacity-95 active:scale-98 transition-all"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle Harmonized Earthy Palette
          </button>

          {/* Color Breakdown List */}
          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <label className="block text-xs font-semibold text-neutral-300">
              Active Hues & Lock Controls:
            </label>
            {palette.map((col, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 p-2.5"
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: col.hex }}
                    className="h-8 w-8 rounded-lg border border-white/20 shadow-xs"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{col.name}</h4>
                    <span className="font-mono text-[11px] text-neutral-400 uppercase">
                      {col.hex}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(col.hex)}
                    className="rounded-lg border border-neutral-800 bg-neutral-900 p-1.5 text-neutral-400 hover:text-white"
                    title="Copy Hex"
                  >
                    {copiedHex === col.hex ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => toggleLock(idx)}
                    className={`rounded-lg p-1.5 transition-colors ${
                      col.locked
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'border border-neutral-800 bg-neutral-900 text-neutral-500 hover:text-white'
                    }`}
                    title={col.locked ? 'Unlock Color' : 'Lock Color'}
                  >
                    {col.locked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Download Swatch PNG */}
          <button
            onClick={downloadSwatchPng}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Palette Swatch PNG
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          <div className="flex w-full max-w-md h-64 rounded-2xl overflow-hidden border-2 border-neutral-700 shadow-2xl">
            {palette.map((col, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: col.hex }}
                onClick={() => copyToClipboard(col.hex)}
                className="group relative flex-1 h-full flex flex-col justify-end p-3 cursor-pointer transition-all duration-300 hover:flex-[1.4]"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-md p-1.5 text-center text-white backdrop-blur-xs mb-2">
                  <div className="text-[10px] font-bold">{col.name}</div>
                  <div className="font-mono text-[9px] uppercase">{col.hex}</div>
                </div>

                <div className="text-center">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-black/70 mix-blend-difference">
                    {col.hex.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] font-mono text-neutral-400">
            Hover any column to inspect • Click to copy HEX code
          </p>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Generated Bohemian Palette Code"
          tabs={[
            {
              id: 'css',
              label: 'CSS Variables',
              language: 'css',
              code: cssVariablesCode,
              filename: 'earth-palette.css',
            },
            {
              id: 'tailwind',
              label: 'Tailwind Config',
              language: 'javascript',
              code: tailwindConfigCode,
              filename: 'tailwind.config.js',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
