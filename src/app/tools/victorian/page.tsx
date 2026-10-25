'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { Download, Feather, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VictorianPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'victorian')!;

  const [initials, setInitials] = useState<string>('V');
  const [subtitle, setSubtitle] = useState<string>('EST. MDCCCLXXXVIII');
  const [frameType, setFrameType] = useState<'crest' | 'laurel' | 'oval' | 'baroque'>('crest');
  const [goldTint, setGoldTint] = useState<string>('#d4af37'); // Antique Gold
  const [paperTint, setPaperTint] = useState<'cream' | 'noir' | 'parchment'>('cream');

  const getPaperBg = () => {
    switch (paperTint) {
      case 'noir':
        return '#0f0f12';
      case 'parchment':
        return '#f4ede4';
      default:
        return '#fdfbf7';
    }
  };

  const svgMonogramCode = `<!-- Victorian Royal Monogram SVG -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <!-- Antique Frame -->
  <rect x="25" y="25" width="250" height="250" rx="20" fill="none" stroke="${goldTint}" stroke-width="2.5" />
  <rect x="35" y="35" width="230" height="230" rx="14" fill="none" stroke="${goldTint}" stroke-width="1" stroke-dasharray="4, 4" />
  
  <!-- Corner Filigree Flourishes -->
  <circle cx="50" cy="50" r="8" fill="${goldTint}" />
  <circle cx="250" cy="50" r="8" fill="${goldTint}" />
  <circle cx="50" cy="250" r="8" fill="${goldTint}" />
  <circle cx="250" cy="250" r="8" fill="${goldTint}" />
  
  <!-- Regal Monogram Typography -->
  <text x="150" y="165" font-family="'Times New Roman', serif" font-size="92" font-weight="bold" fill="${goldTint}" text-anchor="middle" letter-spacing="4">
    ${initials}
  </text>
  
  <!-- Vintage Latin Subtitle -->
  <text x="150" y="210" font-family="'Courier New', monospace" font-size="10" font-weight="bold" fill="${goldTint}" text-anchor="middle" letter-spacing="3">
    ${subtitle}
  </text>
</svg>`;

  const downloadSvg = () => {
    const blob = new Blob([svgMonogramCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `victorian-monogram-${initials.toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const seoSections = [
    {
      id: 'history-of-victorian-heraldry',
      title: 'Victorian Typography, Heraldry & Copperplate Engravings (1837–1901)',
      content: (
        <>
          <p>
            During the 19th-century Victorian era, the expansion of commercial trade, letterpress publishing, and aristocratic society sparked an obsession with ornate personalized heraldry. Noble families and master guild artisans commissioned hand-engraved <strong>monograms and cyphers</strong> etched into silver cutlery, copper signet rings, hot-wax letters, and luxury stationery.
          </p>
          <p>
            Victorian monograms intertwine classical Roman serifs with botanical filigree flourishes (acanthus leaves, laurel wreaths, and rosettes) to symbolize timeless lineage, artisanal craftsmanship, and prestige.
          </p>
        </>
      ),
    },
    {
      id: 'modern-luxury-branding',
      title: 'The Revival of Monogram Seals in Luxury Branding & Spirits',
      content: (
        <>
          <p>
            Today, bespoke monograms are the hallmark of high-luxury packaging: fine perfumery, aged whiskey distilleries, boutique heritage hotels, and high-fashion fashion houses (e.g., Louis Vuitton, Gucci, Ralph Lauren). Integrating an SVG monogram adds immediate artisanal gravitas and historical credibility to digital e-commerce storefronts.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Can I use this monogram for commercial wax seals or wedding stationery?',
      answer:
        'Yes! The generated SVG path is vector-sharp and can be sent directly to laser engravers or letterpress printers for physical embossing.',
    },
    {
      question: 'How many letters should a traditional monogram contain?',
      answer:
        'Traditionally, monograms feature 1 initial (the family surname), 2 initials (couple initials), or 3 initials (first, middle, and last name).',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Monogram Initials */}
          <div>
            <label htmlFor="initials" className="block text-xs font-semibold text-neutral-300 mb-1">
              Monogram Initial(s):
            </label>
            <input
              id="initials"
              type="text"
              maxLength={4}
              value={initials}
              onChange={(e) => setInitials(e.target.value.toUpperCase())}
              className="w-full text-center rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xl font-serif font-black text-amber-400 uppercase tracking-widest focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Subtitle / Motto */}
          <div>
            <label htmlFor="subtitle" className="block text-xs font-semibold text-neutral-300 mb-1">
              Motto / Foundation Date:
            </label>
            <input
              id="subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value.toUpperCase())}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 uppercase focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Gold Ink Tint */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Foil / Ink Tint:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={goldTint}
                onChange={(e) => setGoldTint(e.target.value)}
                className="h-8 w-12 cursor-pointer rounded border border-neutral-700 bg-transparent"
              />
              <span className="font-mono text-xs text-neutral-400 uppercase">{goldTint}</span>
            </div>
          </div>

          {/* Paper Background */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Parchment Background:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['cream', 'noir', 'parchment'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPaperTint(p)}
                  className={`rounded-lg py-1.5 font-medium capitalize transition-all ${
                    paperTint === p
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Download Action */}
          <button
            onClick={downloadSvg}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 py-3 text-sm font-bold text-white shadow-lg shadow-amber-900/30 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Scalable Vector Stamp .SVG
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-6">
          <div
            style={{
              backgroundColor: getPaperBg(),
              width: '320px',
              height: '320px',
            }}
            className="relative rounded-2xl border-4 border-neutral-400 p-6 flex items-center justify-center shadow-2xl select-none"
          >
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgMonogramCode }}
            />
          </div>
          <p className="mt-4 text-[11px] font-mono text-neutral-400">
            Regal Victorian Monogram with gold foil filigree styling
          </p>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Generated Monogram SVG Code"
          tabs={[
            {
              id: 'svg',
              label: 'Monogram SVG',
              language: 'html',
              code: svgMonogramCode,
              filename: 'victorian-monogram.svg',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
