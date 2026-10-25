'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { Download, RefreshCw, Edit3, Type } from 'lucide-react';
import confetti from 'canvas-confetti';

const SCRIPTS = [
  { id: 'copperplate', name: 'Flourished Copperplate', font: 'Brush Script MT, cursive' },
  { id: 'fountain', name: 'Fountain Pen Ink', font: 'Lucida Handwriting, cursive' },
  { id: 'casual', name: 'Casual Modern Marker', font: 'Comic Sans MS, cursive, sans-serif' },
  { id: 'elegant', name: 'Calligraphic Italic', font: 'Georgia, serif' },
];

export default function HandwrittenPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'handwritten')!;

  const [text, setText] = useState<string>('Yours Faithfully');
  const [activeScript, setActiveScript] = useState<string>('copperplate');
  const [slant, setSlant] = useState<number>(12); // degrees
  const [letterSpacing, setLetterSpacing] = useState<number>(2); // px
  const [inkColor, setInkColor] = useState<string>('#0f172a'); // Midnight Blue-Black
  const [fontSize, setFontSize] = useState<number>(44);

  const selectedFont = SCRIPTS.find((s) => s.id === activeScript)?.font || 'cursive';

  const cssCode = `/* Handwritten Script Typography CSS */
.handwritten-signature {
  font-family: ${selectedFont};
  font-size: ${fontSize}px;
  color: ${inkColor};
  letter-spacing: ${letterSpacing}px;
  transform: skewX(-${slant}deg);
  display: inline-block;
  font-style: italic;
  font-weight: 500;
  text-rendering: optimizeLegibility;
}`;

  const downloadSignaturePng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Transparent or light parchment
    ctx.clearRect(0, 0, 440, 200);

    ctx.save();
    ctx.translate(220, 110);
    // Apply slant matrix
    const rad = (-slant * Math.PI) / 180;
    ctx.transform(1, 0, Math.tan(rad), 1, 0, 0);

    ctx.fillStyle = inkColor;
    ctx.font = `italic 500 ${fontSize}px cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(text, 0, 0);
    ctx.restore();

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'handwritten-signature.png';
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
    setText('Yours Faithfully');
    setActiveScript('copperplate');
    setSlant(12);
    setLetterSpacing(2);
    setInkColor('#0f172a');
    setFontSize(44);
  };

  const seoSections = [
    {
      id: 'psychology-of-handwritten-fonts',
      title: 'The Psychology of Handwritten Fonts in Contemporary Digital Branding',
      content: (
        <>
          <p>
            In an era dominated by hyper-standardized neo-grotesque typefaces (like Inter and Roboto), the intentional insertion of <strong>handwritten and calligraphic scripts</strong> breaks visual monotony, projecting human warmth, authenticity, and personal connection.
          </p>
          <p>
            Neurological research in visual perception indicates that organic calligraphic curves activate emotional centers in the brain associated with bespoke craftsmanship, artisan dining, luxury perfumery, and intimate correspondence.
          </p>
        </>
      ),
    },
    {
      id: 'pairing-rules-and-legibility',
      title: 'Font Pairing Best Practices: Accents vs Body Copy',
      content: (
        <>
          <p>
            Golden Rule of Cursive Web Typography: <em>Never set paragraphs or long body copy in script fonts</em>. Handwritten fonts should be deployed strictly for high-impact accents: founder signatures on testimonial cards, artisanal brand taglines, hero section pull-quotes, and formal invitation headers.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Will the exported signature have a transparent background?',
      answer:
        'Yes! The Download Signature button exports a transparent 32-bit PNG file, perfect for overlaying onto email signatures, PDF contracts, or digital photos.',
    },
    {
      question: 'How do I add Google Fonts like Great Vibes or Dancing Script?',
      answer:
        'You can import any Google font link into your HTML &lt;head&gt; and apply the font-family class generated in our CSS output box.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Custom Text Input */}
          <div>
            <label htmlFor="text" className="block text-xs font-semibold text-neutral-300 mb-1">
              Sample Text / Signature:
            </label>
            <input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-cyan-300 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Script Style Selector */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Calligraphy Style:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {SCRIPTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveScript(s.id)}
                  className={`rounded-xl border p-2 font-medium transition-all ${
                    activeScript === s.id
                      ? 'border-cyan-500 bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Slant Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="slant">Italic Slant Angle</label>
              <span className="font-mono text-cyan-400">{slant}°</span>
            </div>
            <input
              id="slant"
              type="range"
              min="0"
              max="25"
              value={slant}
              onChange={(e) => setSlant(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Font Size Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="fontSize">Font Scale</label>
              <span className="font-mono text-cyan-400">{fontSize}px</span>
            </div>
            <input
              id="fontSize"
              type="range"
              min="24"
              max="64"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Ink Color Picker */}
          <div>
            <label htmlFor="inkColor" className="block text-xs font-semibold text-neutral-300 mb-1">Fountain Pen Ink:</label>
            <div className="flex items-center gap-2">
              <input
                id="inkColor"
                type="color"
                value={inkColor}
                onChange={(e) => setInkColor(e.target.value)}
                className="h-7 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent"
              />
              <span className="font-mono text-xs text-neutral-400 uppercase">{inkColor}</span>
            </div>
          </div>

          {/* Download Action */}
          <button
            onClick={downloadSignaturePng}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Transparent PNG Signature
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-6 w-full">
          {/* Fine Cotton Parchment Card */}
          <div className="w-full max-w-md min-h-[220px] rounded-2xl border-2 border-neutral-300 bg-[#fffdfa] p-8 shadow-2xl flex flex-col justify-center items-center text-center select-none">
            <span
              style={{
                fontFamily: selectedFont,
                fontSize: `${fontSize}px`,
                color: inkColor,
                letterSpacing: `${letterSpacing}px`,
                transform: `skewX(-${slant}deg)`,
              }}
              className="font-medium italic transition-all block max-w-full truncate"
            >
              {text || 'Signature'}
            </span>
          </div>
          <p className="mt-4 text-[11px] font-mono text-neutral-400">
            Rendered on ivory stationery paper • Transparent PNG export ready
          </p>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Generated Handwritten CSS Code"
          tabs={[
            {
              id: 'css',
              label: 'CSS Rule',
              language: 'css',
              code: cssCode,
              filename: 'handwritten-script.css',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
