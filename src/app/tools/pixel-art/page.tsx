'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, Download, Paintbrush, Eraser, Grid as GridIcon, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PixelArtPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'pixel-art')!;

  const [gridSize, setGridSize] = useState<number>(16); // 16x16 or 32x32
  const [currentColor, setCurrentColor] = useState<string>('#00f0ff');
  const [toolMode, setToolMode] = useState<'paint' | 'erase'>('paint');
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // 2D grid matrix stored in state
  const [pixels, setPixels] = useState<string[]>(() =>
    Array(16 * 16).fill('transparent')
  );

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  // Change grid dimension
  const handleSizeChange = (newSize: number) => {
    setGridSize(newSize);
    setPixels(Array(newSize * newSize).fill('transparent'));
  };

  const colorPixel = (index: number) => {
    setPixels((prev) => {
      const copy = [...prev];
      copy[index] = toolMode === 'paint' ? currentColor : 'transparent';
      return copy;
    });
  };

  const clearCanvas = () => {
    setPixels(Array(gridSize * gridSize).fill('transparent'));
  };

  // Preset Palettes
  const PALETTES = [
    { name: 'Cyber Neon', colors: ['#00f0ff', '#ff007f', '#ffe600', '#7928ca', '#ffffff', '#000000'] },
    { name: 'GameBoy 4-Tone', colors: ['#9bbc0f', '#8bac0f', '#306230', '#0f380f'] },
    { name: 'Pico-8 Warm', colors: ['#ff004d', '#ffa300', '#ffec27', '#00e436', '#29adff', '#83769c'] },
  ];

  // High-Resolution Crisp PNG Export
  const downloadPng = () => {
    const scale = 24; // 16 * 24 = 384px crisp canvas
    const canvas = document.createElement('canvas');
    canvas.width = gridSize * scale;
    canvas.height = gridSize * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false; // preserve pixel crispness

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const color = pixels[r * gridSize + c];
        if (color && color !== 'transparent') {
          ctx.fillStyle = color;
          ctx.fillRect(c * scale, r * scale, scale, scale);
        }
      }
    }

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixel-art-${gridSize}x${gridSize}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.8 },
    });
  };

  const seoSections = [
    {
      id: 'history-of-pixel-art',
      title: 'The Enduring Magic of Pixel Art: From 8-Bit Limits to Modern Aesthetic',
      content: (
        <>
          <p>
            <strong>Pixel Art</strong> is a digital art form born out of technical constraints on early 8-bit and 16-bit gaming microprocessors (like the NES, Game Boy, and Sega Genesis). Because early graphical chips possessed limited video RAM and small palette look-up tables (often restricted to 4 to 16 colors per sprite), graphic artists had to meticulously position each individual pixel to convey volume, lighting, emotion, and motion.
          </p>
          <p>
            Today, pixel art is no longer a technological restriction, but a celebrated creative choice. Popularized by modern indie gaming triumphs like <em>Stardew Valley</em>, <em>Celeste</em>, and <em>Hyper Light Drifter</em>, pixel art delivers instant nostalgic warmth and distinct visual identity in web interfaces and retro-inspired branding.
          </p>
        </>
      ),
    },
    {
      id: 'html5-canvas-nearest-neighbor',
      title: 'Technical Implementation: Nearest-Neighbor Upscaling in HTML5 Canvas',
      content: (
        <>
          <p>
            When rendering or scaling pixel art on the web, modern browsers by default apply bilinear interpolation, resulting in blurry, fuzzy sprites. To preserve needle-sharp edges:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Canvas Context Smoothing:</strong> Explicitly declare <code className="text-cyan-400">ctx.imageSmoothingEnabled = false</code> prior to rasterizing scaled rectangular units.</li>
            <li><strong>CSS Property:</strong> Apply <code className="text-cyan-400">image-rendering: pixelated</code> (or <code className="text-cyan-400">image-rendering: crisp-edges</code> for Firefox) to force the GPU to use Nearest Neighbor sampling during display resizing.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Will exported pixel art appear blurry when shared on social media?',
      answer:
        'No! UXForge automatically upscales your pixel canvas by 24x using nearest-neighbor interpolation upon export, guaranteeing razor-sharp clarity on Twitter, Discord, and Retina screens.',
    },
    {
      question: 'Can I import this pixel art into game engines like Unity or Godot?',
      answer:
        'Yes, the exported PNG has full alpha transparency and can be directly imported into any sprite sheet or 2D game engine.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Grid Resolution Switcher */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Grid Resolution:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[16, 32].map((sz) => (
                <button
                  key={sz}
                  onClick={() => handleSizeChange(sz)}
                  className={`rounded-xl py-2 text-xs font-bold transition-all ${
                    gridSize === sz
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {sz} x {sz} Canvas
                </button>
              ))}
            </div>
          </div>

          {/* Tool Mode: Paint or Erase */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Drawing Tool:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setToolMode('paint')}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                  toolMode === 'paint'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                }`}
              >
                <Paintbrush className="h-4 w-4" />
                Pixel Brush
              </button>
              <button
                onClick={() => setToolMode('erase')}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                  toolMode === 'erase'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                }`}
              >
                <Eraser className="h-4 w-4" />
                Eraser
              </button>
            </div>
          </div>

          {/* Color Picker & Palettes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="currentColor" className="text-xs font-semibold text-neutral-300">Active Color:</label>
              <div className="flex items-center gap-2">
                <input
                  id="currentColor"
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400 uppercase">{currentColor}</span>
              </div>
            </div>

            {/* Quick Palettes */}
            <div className="space-y-2 mt-3">
              {PALETTES.map((pal) => (
                <div key={pal.name} className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">{pal.name}</span>
                  <div className="flex gap-1">
                    {pal.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrentColor(c);
                          setToolMode('paint');
                        }}
                        style={{ backgroundColor: c }}
                        className={`h-5 w-5 rounded-md border transition-transform hover:scale-110 ${
                          currentColor === c ? 'border-white scale-110 ring-2 ring-cyan-400' : 'border-neutral-700'
                        }`}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid lines toggle */}
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-300">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="rounded border-neutral-700 accent-cyan-400"
              />
              Show Canvas Grid Overlay
            </label>

            <button
              onClick={clearCanvas}
              className="text-xs text-neutral-400 hover:text-rose-400 transition-colors"
            >
              Clear Canvas
            </button>
          </div>

          {/* Download Action */}
          <button
            onClick={downloadPng}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Scaled Crisp PNG
          </button>
        </div>
      }
      preview={
        <div
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          onMouseLeave={() => setIsMouseDown(false)}
          className="flex flex-col items-center justify-center p-4 select-none"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              width: gridSize === 16 ? '320px' : '360px',
              height: gridSize === 16 ? '320px' : '360px',
            }}
            className="rounded-xl overflow-hidden border-2 border-neutral-700 bg-neutral-900 shadow-2xl cursor-crosshair"
          >
            {pixels.map((color, idx) => (
              <div
                key={idx}
                onMouseEnter={() => {
                  if (isMouseDown) colorPixel(idx);
                }}
                onMouseDown={() => colorPixel(idx)}
                style={{
                  backgroundColor: color === 'transparent' ? undefined : color,
                }}
                className={`relative transition-colors ${
                  color === 'transparent'
                    ? (Math.floor(idx / gridSize) + (idx % gridSize)) % 2 === 0
                      ? 'bg-neutral-900'
                      : 'bg-neutral-850'
                    : ''
                } ${showGrid ? 'border-[0.5px] border-neutral-800/40' : ''}`}
              />
            ))}
          </div>
          <p className="mt-4 text-[11px] font-mono text-neutral-400">
            Click or drag across pixels to paint • High-res PNG export ready
          </p>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
