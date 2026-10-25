'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { Download, RefreshCw, Paintbrush, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

const CANS = [
  { name: 'Neon Toxic', color: '#10b981' },
  { name: 'Hot Magenta', color: '#ec4899' },
  { name: 'Electric Cyan', color: '#06b6d4' },
  { name: 'Acid Yellow', color: '#eab308' },
  { name: 'Chrome White', color: '#ffffff' },
];

export default function GraffitiPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'graffiti')!;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeColor, setActiveColor] = useState<string>('#ec4899');
  const [sprayRadius, setSprayRadius] = useState<number>(25);
  const [sprayDensity, setSprayDensity] = useState<number>(45);
  const [enableDrips, setEnableDrips] = useState<boolean>(true);
  const [isSpraying, setIsSpraying] = useState<boolean>(false);

  // Initialize Urban Brick Texture on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 440;
    canvas.height = 360;

    // Dark distressed brick wall background
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, 440, 360);

    // Draw procedural brick grid
    ctx.strokeStyle = '#09090b';
    ctx.lineWidth = 3;
    const rowHeight = 30;
    const brickWidth = 70;

    for (let y = 0; y < 360; y += rowHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(440, y);
      ctx.stroke();

      const offset = (Math.floor(y / rowHeight) % 2) * (brickWidth / 2);
      for (let x = -offset; x < 440; x += brickWidth) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + rowHeight);
        ctx.stroke();
      }
    }

    // Concrete texture noise speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 4000; i++) {
      ctx.fillRect(Math.random() * 440, Math.random() * 360, 1.5, 1.5);
    }
  }, []);

  const handleSpray = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSpraying || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = activeColor;

    // Realistic Gaussian aerosol particle splatter
    for (let i = 0; i < sprayDensity; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * sprayRadius;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      const particleSize = Math.random() * 2 + 0.5;

      ctx.beginPath();
      ctx.arc(px, py, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Procedural paint drip
    if (enableDrips && Math.random() < 0.08) {
      const dripLength = Math.random() * 25 + 10;
      ctx.beginPath();
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.strokeStyle = activeColor;
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + dripLength);
      ctx.stroke();

      // Drip drop bead at the bottom
      ctx.beginPath();
      ctx.arc(x, y + dripLength, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, 440, 360);

    // Re-draw bricks
    ctx.strokeStyle = '#09090b';
    ctx.lineWidth = 3;
    const rowHeight = 30;
    const brickWidth = 70;
    for (let y = 0; y < 360; y += rowHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(440, y);
      ctx.stroke();
      const offset = (Math.floor(y / rowHeight) % 2) * (brickWidth / 2);
      for (let x = -offset; x < 440; x += brickWidth) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + rowHeight);
        ctx.stroke();
      }
    }
  };

  const downloadGraffiti = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'street-art-graffiti.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const seoSections = [
    {
      id: 'street-art-graffiti-history',
      title: 'From NYC Subway Wildstyle to Banksy: The Cultural History of Street Art',
      content: (
        <>
          <p>
            Modern graffiti culture was born in late 1960s Philadelphia and 1970s New York City with pioneers like TAKI 183 and Cornbread tagging subway carriages with aerosol spray cans. Over the decades, simple signature tags evolved into complex <strong>Wildstyle pieces</strong>, multi-layer stencil murals (popularized globally by Banksy), and acclaimed museum gallery exhibitions.
          </p>
          <p>
            In digital product design, graffiti brings rebellious authenticity, urban energy, and raw street credibility to skateboard branding, hip-hop apparel drops, and creative counter-culture portfolios.
          </p>
        </>
      ),
    },
    {
      id: 'aerosol-particle-physics-canvas',
      title: 'Simulating Aerosol Fluid Dispersion & Viscous Drips in JavaScript',
      content: (
        <>
          <p>
            Pressing an aerosol spray nozzle discharges pressurized liquid propellant through a tiny valve orifice, creating a conical plume of atomized micro-droplets. In HTML5 Canvas, this physical behavior is simulated using:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Polar Coordinate Dispersion:</strong> Distributing micro-circles across random angles (<code className="text-cyan-400">Math.PI * 2</code>) and radial offsets emulates the natural spray plume falloff.</li>
            <li><strong>Paint Viscosity & Gravity Drips:</strong> When the user lingers over an area, accumulated fluid weight overcomes surface tension, procedurally generating vertical drips with teardrop beads.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'How do I spray on the canvas?',
      answer:
        'Simply click and drag your mouse or finger across the brick wall canvas. Move slowly in one spot to create natural paint drips!',
    },
    {
      question: 'Can I export my street art tag with high resolution?',
      answer:
        'Yes! Clicking Download Street Art PNG exports your artwork directly with the underlying brick wall texture and paint splatters intact.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Spray Can Palettes */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              Select Spray Can:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CANS.map((can) => (
                <button
                  key={can.name}
                  onClick={() => setActiveColor(can.color)}
                  className={`flex items-center gap-2 rounded-xl border p-2 font-medium transition-all ${
                    activeColor === can.color
                      ? 'border-white bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span
                    style={{ backgroundColor: can.color }}
                    className="h-4 w-4 rounded-full border border-white/30"
                  />
                  <span>{can.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spray Can Radius */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="sprayRadius">Nozzle Spray Radius</label>
              <span className="font-mono text-cyan-400">{sprayRadius}px</span>
            </div>
            <input
              id="sprayRadius"
              type="range"
              min="10"
              max="50"
              value={sprayRadius}
              onChange={(e) => setSprayRadius(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Particle Density */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="sprayDensity">Pressure / Splatter Flow</label>
              <span className="font-mono text-cyan-400">{sprayDensity} Flow</span>
            </div>
            <input
              id="sprayDensity"
              type="range"
              min="15"
              max="90"
              value={sprayDensity}
              onChange={(e) => setSprayDensity(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Drips Toggle */}
          <div className="pt-2 border-t border-neutral-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-300">
              <input
                type="checkbox"
                checked={enableDrips}
                onChange={(e) => setEnableDrips(e.target.checked)}
                className="rounded border-neutral-700 accent-cyan-400"
              />
              Procedural Gravity Paint Drips
            </label>
          </div>

          {/* Clear Wall */}
          <button
            onClick={clearCanvas}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-medium text-neutral-400 hover:text-rose-400 hover:bg-neutral-850 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Repaint Blank Brick Wall
          </button>

          {/* Download Action */}
          <button
            onClick={downloadGraffiti}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Street Art PNG
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative rounded-2xl border-4 border-neutral-700 overflow-hidden shadow-2xl cursor-crosshair select-none">
            <canvas
              ref={canvasRef}
              onMouseDown={() => setIsSpraying(true)}
              onMouseUp={() => setIsSpraying(false)}
              onMouseLeave={() => setIsSpraying(false)}
              onMouseMove={handleSpray}
              className="block"
            />
          </div>
          <p className="mt-3 text-[11px] font-mono text-neutral-400">
            Click & drag to spray paint • Linger in one spot to trigger gravity paint drips
          </p>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
