'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { Download, Shuffle, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChaosSticker {
  id: number;
  text: string;
  emoji: string;
  bg: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
  fontSize: number;
}

const PHRASES = ['NO RULES', 'CHAOS THEORY', 'LOUD & PROUD', 'ANTI-DESIGN', 'OVERLOAD', 'MORE IS MORE', 'FUTURE SHOCK', 'RADICAL'];
const COLORS = ['#ff0055', '#ffe600', '#00ffcc', '#7928ca', '#ff6b00', '#00f0ff', '#ffffff', '#000000'];
const EMOJIS = ['⚡', '🔥', '👁️', '💥', '⚠️', '⭐', '👾', '🌈'];

export default function MaximalismPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'maximalism')!;

  const [seed, setSeed] = useState<number>(1);
  const [density, setDensity] = useState<number>(7);
  const [boardBg, setBoardBg] = useState<string>('#ffe600');

  const generateStickers = (count: number): ChaosSticker[] => {
    const list: ChaosSticker[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        text: PHRASES[i % PHRASES.length],
        emoji: EMOJIS[i % EMOJIS.length],
        bg: COLORS[(i * 2 + 1) % COLORS.length],
        color: COLORS[(i * 3) % COLORS.length] === COLORS[(i * 2 + 1) % COLORS.length] ? '#ffffff' : COLORS[(i * 3) % COLORS.length],
        x: 30 + ((i * 55) % 260) + (Math.sin(i * seed) * 30),
        y: 20 + ((i * 45) % 240) + (Math.cos(i * seed) * 30),
        rotation: (Math.sin(i * 99 + seed) * 35),
        fontSize: 14 + (i % 3) * 6,
      });
    }
    return list;
  };

  const stickers = generateStickers(density);

  const randomize = () => {
    setSeed(Date.now());
    setBoardBg(COLORS[Math.floor(Math.random() * COLORS.length)]);
  };

  const downloadPoster = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = boardBg;
    ctx.fillRect(0, 0, 440, 380);

    stickers.forEach((s) => {
      ctx.save();
      ctx.translate(s.x + 60, s.y + 20);
      ctx.rotate((s.rotation * Math.PI) / 180);

      // Sticker box
      ctx.fillStyle = s.bg;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.fillRect(-60, -20, 130, 40);
      ctx.strokeRect(-60, -20, 130, 40);

      // Text
      ctx.fillStyle = s.color;
      ctx.font = `900 ${s.fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(`${s.emoji} ${s.text}`, 5, 6);
      ctx.restore();
    });

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chaos-maximalism-poster.png';
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
      id: 'what-is-maximalism-anti-design',
      title: 'Maximalism & Anti-Design: The "More is More" Aesthetic Revolt',
      content: (
        <>
          <p>
            <strong>Maximalism</strong> in graphic and web design is a deliberate rebellion against sterile, monochromatic corporate minimalism. While minimalist design worships negative space and uniform grids, maximalism screams with unrepentant visual energy: saturated neon palettes, clashing typographic scales, dense layered stickers, and sensory abundance.
          </p>
          <p>
            Associated with <em>Anti-Design</em>, brutalist posters, and Gen Z festival aesthetics, maximalism captures fleeting attention on mobile screens by overwhelming the viewer with playful visual discovery.
          </p>
        </>
      ),
    },
    {
      id: 'controlled-chaos-in-web-design',
      title: 'Principles of Controlled Chaos & Dynamic Jitter',
      content: (
        <>
          <p>
            True maximalism is not accidental messiness—it is <em>calculated visual vibration</em>. By applying pseudo-random rotational jitter between -35° and +35° and pairing contrasting primary tones (Acid Yellow, Hot Magenta, Electric Cyan), every sticker establishes its own dynamic focal gravity.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'When should I use maximalist anti-design in web development?',
      answer:
        'Maximalism excels for music festivals, youth lifestyle branding, rebellious streetwear drops, creative portfolio headers, and event landing pages where high energy is paramount.',
    },
    {
      question: 'Can I export the layout as a printable high-res poster?',
      answer:
        'Yes! Clicking Download Poster rasterizes the composition with bold vector borders and high-contrast lettering ready for print.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Randomize Button */}
          <button
            onClick={randomize}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-amber-500 to-cyan-500 py-3 text-sm font-black text-black shadow-lg hover:scale-102 active:scale-98 transition-all"
          >
            <Shuffle className="h-4 w-4" />
            Randomize Chaos Seed
          </button>

          {/* Density Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="density">Sticker Density & Layer Count</label>
              <span className="font-mono text-cyan-400">{density} Layers</span>
            </div>
            <input
              id="density"
              type="range"
              min="4"
              max="12"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Board Background Color */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Backdrop Base Color:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={boardBg}
                onChange={(e) => setBoardBg(e.target.value)}
                className="h-8 w-12 cursor-pointer rounded border border-neutral-700 bg-transparent"
              />
              <span className="font-mono text-xs text-neutral-400 uppercase">{boardBg}</span>
            </div>
          </div>

          {/* Download Action */}
          <button
            onClick={downloadPoster}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 text-sm font-bold text-white shadow-lg hover:bg-cyan-500 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Chaos Poster PNG
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          <div
            style={{
              backgroundColor: boardBg,
              width: '420px',
              height: '360px',
            }}
            className="relative rounded-2xl border-4 border-black shadow-2xl overflow-hidden select-none"
          >
            {stickers.map((s) => (
              <div
                key={s.id}
                style={{
                  left: `${s.x}px`,
                  top: `${s.y}px`,
                  backgroundColor: s.bg,
                  color: s.color,
                  transform: `rotate(${s.rotation}deg)`,
                  fontSize: `${s.fontSize}px`,
                }}
                className="absolute border-2 border-black font-black uppercase px-3 py-1 shadow-[4px_4px_0px_#000] tracking-wider transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                {s.emoji} {s.text}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] font-mono text-neutral-400">
            Click Randomize Chaos Seed to generate infinite layout variants
          </p>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
