'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { Download, RefreshCw, Layout, Type } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SwissDesignPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'swiss-design')!;

  const [headline, setHeadline] = useState<string>('DIE FORM');
  const [subhead, setSubhead] = useState<string>('INTERNATIONALE AUSSTELLUNG FÜR TYPOGRAFIE & FORMGEBUNG');
  const [dateVenue, setDateVenue] = useState<string>('KUNSTGEWERBEMUSEUM ZÜRICH • 14. MAI BIS 30. JUNI');
  const [accentColor, setAccentColor] = useState<string>('#e11d48'); // Iconic Swiss Red
  const [gridStyle, setGridStyle] = useState<'asymmetric' | 'diagonal' | 'block'>('asymmetric');

  const downloadPoster = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 580;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Swiss Stark White Paper
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 440, 580);

    // Accent Geometry
    if (gridStyle === 'asymmetric') {
      ctx.fillStyle = accentColor;
      ctx.fillRect(36, 40, 16, 500); // Strict vertical grid anchor

      // Massive Grotesque Headline
      ctx.fillStyle = '#0a0a0a';
      ctx.font = '900 68px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(headline, 68, 140);

      // Accent Red Solid Geometric Block
      ctx.fillStyle = accentColor;
      ctx.fillRect(68, 180, 336, 160);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial, sans-serif';
      ctx.fillText('MODERNE GRAFIK 1968', 84, 260);

      // Body Typographic Column
      ctx.fillStyle = '#171717';
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillText(subhead, 68, 380);

      // Horizontal Divider
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(68, 450, 336, 3);

      ctx.font = 'bold 10px Arial, sans-serif';
      ctx.fillText(dateVenue, 68, 480);
    } else if (gridStyle === 'diagonal') {
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(440, 240);
      ctx.lineTo(440, 580);
      ctx.lineTo(0, 580);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#0a0a0a';
      ctx.font = '900 64px Arial, sans-serif';
      ctx.fillText(headline, 40, 120);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.fillText(subhead, 40, 340);
      ctx.fillText(dateVenue, 40, 440);
    } else {
      // Pure Block
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 440, 260);

      ctx.fillStyle = accentColor;
      ctx.font = '900 72px Arial, sans-serif';
      ctx.fillText(headline, 40, 160);

      ctx.fillStyle = '#171717';
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.fillText(subhead, 40, 320);
      ctx.fillText(dateVenue, 40, 420);
    }

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `swiss-style-${headline.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const resetDefaults = () => {
    setHeadline('DIE FORM');
    setSubhead('INTERNATIONALE AUSSTELLUNG FÜR TYPOGRAFIE & FORMGEBUNG');
    setDateVenue('KUNSTGEWERBEMUSEUM ZÜRICH • 14. MAI BIS 30. JUNI');
    setAccentColor('#e11d48');
    setGridStyle('asymmetric');
  };

  const seoSections = [
    {
      id: 'swiss-design-international-style',
      title: 'The International Typographic Style: Philosophy & Historical Impact',
      content: (
        <>
          <p>
            Developed in Switzerland during the 1950s by graphic luminaries such as <strong>Josef Müller-Brockmann</strong>, <strong>Armin Hofmann</strong>, and <strong>Max Bill</strong>, the <em>International Typographic Style</em> (commonly known as <strong>Swiss Design</strong>) championed objectivity, extreme clarity, and mathematical harmony over decorative subjectivity.
          </p>
          <p>
            Swiss designers believed that typography should not &quot;shout&quot; with ornamental fluff, but present information with utmost legibility. By pairing asymmetric modular grid matrices with neutral grotesque sans-serif typefaces (most notably <em>Helvetica</em>, created by Max Miedinger in 1957), Swiss Style transformed modern graphic design, corporate identity manuals, and subway signage across the globe.
          </p>
        </>
      ),
    },
    {
      id: 'asymmetric-grid-modular-math',
      title: 'Asymmetry vs Symmetry: The Modular Mathematics of Grid Systems',
      content: (
        <>
          <p>
            Central to Müller-Brockmann&apos;s masterpiece <em>Grid Systems in Graphic Design</em> is the principle of asymmetrical balance:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Flush-Left / Ragged-Right:</strong> Eliminates artificial letter-spacing distortion found in justified text, creating natural cadence for the human eye.</li>
            <li><strong>Dynamic Asymmetry:</strong> Offsetting the visual anchor creates active optical tension that guides the reader hierarchically from primary title to event metadata.</li>
            <li><strong>Restrained Palettes:</strong> Strict adherence to Stark White, Deep Charcoal, and a single vibrant accent (Swiss Crimson Red) maximizes informational impact.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Which fonts are authentic to Swiss Design?',
      answer:
        'Helvetica, Neue Haas Grotesk, Akzidenz-Grotesk, and Univers are the definitive cornerstones of authentic Swiss International typography.',
    },
    {
      question: 'Can I use this generated poster for exhibition or conference branding?',
      answer:
        'Yes! The layout complies with rigorous international grid ratios, making it immediately printable for architecture, tech keynote, or gallery posters.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-4 text-sm">
          {/* Main Headline */}
          <div>
            <label htmlFor="headline" className="block text-xs font-semibold text-neutral-300 mb-1">
              Primary Grotesque Headline:
            </label>
            <input
              id="headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value.toUpperCase())}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-black uppercase text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Subhead Input */}
          <div>
            <label htmlFor="subhead" className="block text-xs font-semibold text-neutral-300 mb-1">
              Exhibition / Body Copy:
            </label>
            <textarea
              id="subhead"
              rows={2}
              value={subhead}
              onChange={(e) => setSubhead(e.target.value.toUpperCase())}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 uppercase focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Date & Venue */}
          <div>
            <label htmlFor="dateVenue" className="block text-xs font-semibold text-neutral-300 mb-1">
              Date & Location Metadata:
            </label>
            <input
              id="dateVenue"
              type="text"
              value={dateVenue}
              onChange={(e) => setDateVenue(e.target.value.toUpperCase())}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 uppercase focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Grid Layout Selector */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Grid Structure:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['asymmetric', 'diagonal', 'block'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGridStyle(g)}
                  className={`rounded-lg py-1.5 font-bold capitalize transition-all ${
                    gridStyle === g
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Accent Color (Swiss Red):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-7 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent"
              />
              <span className="font-mono text-xs text-neutral-400 uppercase">{accentColor}</span>
            </div>
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Swiss Default
          </button>

          {/* Download Action */}
          <button
            onClick={downloadPoster}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 py-3 text-sm font-bold text-white shadow-lg shadow-rose-600/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Print-Ready Swiss Poster
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          {/* Swiss Style Poster Canvas */}
          <div
            style={{
              width: '380px',
              minHeight: '480px',
            }}
            className="relative rounded-lg border-2 border-neutral-400 bg-white p-6 shadow-2xl text-black font-sans select-none"
          >
            {gridStyle === 'asymmetric' ? (
              <div className="relative pl-6">
                {/* Red vertical rule */}
                <div
                  style={{ backgroundColor: accentColor }}
                  className="absolute left-0 top-0 bottom-0 w-2.5"
                />

                <h2 className="text-5xl font-black tracking-tighter text-black uppercase">
                  {headline}
                </h2>

                {/* Red Block */}
                <div
                  style={{ backgroundColor: accentColor }}
                  className="my-5 p-5 text-white font-bold text-sm tracking-tight"
                >
                  MODERNE GRAFIK 1968
                </div>

                <p className="text-xs font-bold leading-relaxed text-neutral-800 uppercase">
                  {subhead}
                </p>

                <div className="mt-8 border-t-2 border-black pt-3 text-[10px] font-bold text-neutral-900 uppercase tracking-wider">
                  {dateVenue}
                </div>
              </div>
            ) : gridStyle === 'diagonal' ? (
              <div>
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-6">
                  {headline}
                </h2>
                <div
                  style={{ backgroundColor: accentColor }}
                  className="h-28 w-full p-4 text-white font-black text-sm flex items-center"
                >
                  ZÜRICH AUSSTELLUNG
                </div>
                <p className="mt-4 text-xs font-bold leading-relaxed uppercase">
                  {subhead}
                </p>
                <div className="mt-6 border-t-2 border-black pt-2 text-[10px] font-bold uppercase">
                  {dateVenue}
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-black p-5 text-white">
                  <h2
                    style={{ color: accentColor }}
                    className="text-5xl font-black tracking-tighter uppercase"
                  >
                    {headline}
                  </h2>
                </div>
                <p className="mt-6 text-xs font-bold leading-relaxed uppercase px-2">
                  {subhead}
                </p>
                <div className="mt-8 border-t-2 border-black pt-3 text-[10px] font-bold uppercase px-2">
                  {dateVenue}
                </div>
              </div>
            )}
          </div>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
