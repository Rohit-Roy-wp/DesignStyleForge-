'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, Download, Code, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESETS = [
  {
    name: 'Shield & Lightning',
    path1: 'M50 10 L90 25 L90 60 C90 85 50 100 50 100 C50 100 10 85 10 60 L10 25 Z',
    path2: 'M52 28 L36 54 L48 54 L44 76 L64 48 L52 48 Z',
  },
  {
    name: 'Star & Diamond',
    path1: 'M50 5 L63 35 L95 38 L70 60 L78 92 L50 75 L22 92 L30 60 L5 38 L37 35 Z',
    path2: 'M50 25 L65 50 L50 75 L35 50 Z',
  },
  {
    name: 'Double Hexagon Rings',
    path1: 'M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z',
    path2: 'M50 25 L72 38 L72 62 L50 75 L28 62 L28 38 Z',
  },
];

export default function VectorArtPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'vector-art')!;

  const [path1, setPath1] = useState<string>(PRESETS[0].path1);
  const [path2, setPath2] = useState<string>(PRESETS[0].path2);
  const [fillColor, setFillColor] = useState<string>('#06b6d4');
  const [strokeColor, setStrokeColor] = useState<string>('#ffffff');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);

  const mergedPath = `${path1.trim()} ${path2.trim()}`;

  const svgCode = `<!-- Unified Scalable Vector Graphic (SVG) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <path
    d="${mergedPath}"
    fill="${fillColor}"
    stroke="${strokeColor}"
    stroke-width="${strokeWidth}"
    stroke-linejoin="round"
    stroke-linecap="round"
    fill-rule="evenodd"
  />
</svg>`;

  const loadPreset = (presetIndex: number) => {
    setPath1(PRESETS[presetIndex].path1);
    setPath2(PRESETS[presetIndex].path2);
  };

  const downloadSvgFile = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unified-vector-path.svg';
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
      id: 'understanding-svg-path-commands',
      title: 'Deconstructing SVG Path Commands: M, L, C, Z Mechanics',
      content: (
        <>
          <p>
            An SVG <code className="text-cyan-400">&lt;path&gt;</code> element is the most powerful primitive in 2D vector geometry. Unlike static rect or circle tags, a path string contains precise pen plotter commands:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>M (Moveto):</strong> Lifts the virtual pen and places it at coordinate X Y (<code className="text-cyan-400">M50 10</code>).</li>
            <li><strong>L (Lineto):</strong> Draws a straight vector segment from the current position to the destination.</li>
            <li><strong>C / S (Cubic / Smooth Bézier Curve):</strong> Defines two directional control handles to bend lines into smooth organic curvatures.</li>
            <li><strong>Z (Closepath):</strong> Automatically draws a straight segment back to the initial start point, sealing the polygon for filling.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'compound-paths-fill-rule',
      title: 'Compound Paths & The Evenodd Fill Rule in UI Design',
      content: (
        <>
          <p>
            When two closed paths share a single <code className="text-cyan-400">d</code> string, applying <code className="text-cyan-400">fill-rule="evenodd"</code> creates automatic cutouts and compound donut shapes without needing Boolean Union operations in desktop software.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Can I copy the combined SVG directly into React/Next.js components?',
      answer:
        'Yes! The output is clean, standard XML that can be pasted directly into JSX as an inline SVG icon or saved as a .svg asset.',
    },
    {
      question: 'Does combining paths improve web performance?',
      answer:
        'Yes! Consolidating multiple vector shapes into a single compound path reduces DOM node count, decreases browser memory overhead, and allows single-pass GPU rendering.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-4 text-sm">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Vector Preset Geometries:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {PRESETS.map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => loadPreset(idx)}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 p-2 font-medium text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Path 1 Input */}
          <div>
            <label htmlFor="path1" className="block text-xs font-semibold text-neutral-300 mb-1">
              Base Path (d-attribute):
            </label>
            <textarea
              id="path1"
              rows={2}
              value={path1}
              onChange={(e) => setPath1(e.target.value)}
              className="w-full font-mono text-[11px] rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-cyan-300 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Path 2 Input */}
          <div>
            <label htmlFor="path2" className="block text-xs font-semibold text-neutral-300 mb-1">
              Secondary Overlaid Path:
            </label>
            <textarea
              id="path2"
              rows={2}
              value={path2}
              onChange={(e) => setPath2(e.target.value)}
              className="w-full font-mono text-[11px] rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-indigo-300 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Color & Stroke Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fillColor" className="block text-xs font-semibold text-neutral-300 mb-1">Fill Color:</label>
              <div className="flex items-center gap-2">
                <input
                  id="fillColor"
                  type="color"
                  value={fillColor}
                  onChange={(e) => setFillColor(e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400 uppercase">{fillColor}</span>
              </div>
            </div>

            <div>
              <label htmlFor="strokeColor" className="block text-xs font-semibold text-neutral-300 mb-1">Stroke Color:</label>
              <div className="flex items-center gap-2">
                <input
                  id="strokeColor"
                  type="color"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400 uppercase">{strokeColor}</span>
              </div>
            </div>
          </div>

          {/* Stroke Width Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="strokeWidth">Stroke Border Width</label>
              <span className="font-mono text-cyan-400">{strokeWidth}px</span>
            </div>
            <input
              id="strokeWidth"
              type="range"
              min="0"
              max="6"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Download Action */}
          <button
            onClick={downloadSvgFile}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Clean .SVG File
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-6">
          <div className="h-64 w-64 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex items-center justify-center shadow-2xl">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full filter drop-shadow-[0_8px_24px_rgba(6,182,212,0.3)]"
            >
              <path
                d={mergedPath}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <p className="mt-3 text-[11px] font-mono text-neutral-400">
            Rendered with fill-rule: evenodd for compound geometry
          </p>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Generated Vector SVG Markup"
          tabs={[
            {
              id: 'svg',
              label: 'Clean SVG',
              language: 'html',
              code: svgCode,
              filename: 'vector-icon.svg',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
