'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, Sparkles } from 'lucide-react';

export default function AuroraPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'aurora')!;

  const [color1, setColor1] = useState<string>('#10b981'); // Emerald
  const [color2, setColor2] = useState<string>('#06b6d4'); // Cyan
  const [color3, setColor3] = useState<string>('#8b5cf6'); // Violet
  const [color4, setColor4] = useState<string>('#ec4899'); // Pink
  const [speed, setSpeed] = useState<number>(14); // seconds
  const [blurSpread, setBlurSpread] = useState<number>(75);
  const [hasNoise, setHasNoise] = useState<boolean>(true);

  const backgroundGradientCss = `radial-gradient(at 0% 0%, ${color1} 0px, transparent ${blurSpread}%),
radial-gradient(at 100% 0%, ${color2} 0px, transparent ${blurSpread}%),
radial-gradient(at 100% 100%, ${color3} 0px, transparent ${blurSpread}%),
radial-gradient(at 0% 100%, ${color4} 0px, transparent ${blurSpread}%)`;

  const cssCode = `/* Aurora Northern Lights Gradient CSS */
.aurora-mesh {
  background-color: #030712;
  background-image: ${backgroundGradientCss};
  background-size: 180% 180%;
  animation: auroraFlow ${speed}s ease infinite alternate;
}

@keyframes auroraFlow {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 100%;
  }
}`;

  const tailwindCode = `<!-- Tailwind CSS Aurora Mesh Background -->
<div class="relative min-h-[400px] w-full overflow-hidden rounded-2xl bg-neutral-950 p-8 shadow-2xl"
  style="background-image: ${backgroundGradientCss}; background-size: 180% 180%;">
  <div class="relative z-10 flex flex-col items-center justify-center h-full text-center">
    <h2 class="text-3xl font-extrabold text-white">Aurora Experience</h2>
    <p class="mt-2 text-sm text-white/80">Ethereal animated mesh gradient.</p>
  </div>
</div>`;

  const resetDefaults = () => {
    setColor1('#10b981');
    setColor2('#06b6d4');
    setColor3('#8b5cf6');
    setColor4('#ec4899');
    setSpeed(14);
    setBlurSpread(75);
    setHasNoise(true);
  };

  const seoSections = [
    {
      id: 'aurora-gradient-trend',
      title: 'The Rise of Aurora & Mesh Gradients in Modern SaaS Products',
      content: (
        <>
          <p>
            <strong>Aurora Gradients</strong>—named after the celestial Aurora Borealis (Northern Lights)—represent the pinnacle of contemporary high-end branding for AI tools, developer platforms, and luxury digital products (popularized by Stripe, Linear, and Raycast). Unlike linear two-color gradients of the past, Aurora gradients layer multi-point radial color emitters across varying focal points, creating organic, luminous depth that feels alive.
          </p>
          <p>
            When animated slowly with subtle background position drift, these gradients evoke feelings of high craftsmanship, calm sophistication, and technological wonder without distracting users from key conversion actions.
          </p>
        </>
      ),
    },
    {
      id: 'css-radial-gradient-mechanics',
      title: 'How Multi-Point CSS Radial Gradients Create Smooth Mesh Blends',
      content: (
        <>
          <p>
            Standard CSS lacks native NURBS mesh splines (found in vector design apps like Figma or Illustrator). However, developers can emulate complex meshes by stacking multiple <code className="text-cyan-400">radial-gradient(at X% Y%, color 0px, transparent Spread%)</code> declarations in a single <code className="text-cyan-400">background-image</code>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Coordinate Anchoring:</strong> By positioning emitter nodes at diagonally opposite corners (0% 0%, 100% 0%, 100% 100%, 0% 100%), color spheres naturally overlap at the center.</li>
            <li><strong>The Alpha Falloff:</strong> Transitioning from 100% opacity at 0px to <code className="text-cyan-400">transparent</code> at 50%-80% allows colors to blend through natural optical additive color mixing.</li>
            <li><strong>Micro-Noise Dithering:</strong> A subtle semi-transparent SVG noise texture overlay eliminates color banding artifacts on low-bitrate displays.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Why do gradients look banded or pixelated on some screens?',
      answer:
        'Color banding occurs when 8-bit displays cannot render enough intermediate shades between colors. Enabling the Noise Grain overlay injects micro-dithering, breaking up color boundaries into a smooth photographic gradient.',
    },
    {
      question: 'Is this animated background responsive on mobile?',
      answer:
        'Yes! By using percentage-based coordinates (at 0% 0%) and background-size: 180%, the gradient seamlessly scales across any screen aspect ratio from ultrawide monitors to mobile viewports.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* 4 Color Mesh Pickers */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              Mesh Color Coordinates:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400">Top-Left</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400">Top-Right</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-2">
                <input
                  type="color"
                  value={color4}
                  onChange={(e) => setColor4(e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400">Bottom-Left</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-2">
                <input
                  type="color"
                  value={color3}
                  onChange={(e) => setColor3(e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400">Bottom-Right</span>
              </div>
            </div>
          </div>

          {/* Animation Speed Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="speed">Animation Drift Period</label>
              <span className="font-mono text-cyan-400">{speed}s</span>
            </div>
            <input
              id="speed"
              type="range"
              min="4"
              max="30"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Blur Spread Radius */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="blurSpread">Color Diffusion Spread</label>
              <span className="font-mono text-cyan-400">{blurSpread}%</span>
            </div>
            <input
              id="blurSpread"
              type="range"
              min="40"
              max="95"
              value={blurSpread}
              onChange={(e) => setBlurSpread(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Noise Grain Toggle */}
          <div className="pt-2 border-t border-neutral-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-300">
              <input
                type="checkbox"
                checked={hasNoise}
                onChange={(e) => setHasNoise(e.target.checked)}
                className="rounded border-neutral-700 accent-cyan-400"
              />
              Photographic Noise Grain (Dithering)
            </label>
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Aurora Defaults
          </button>
        </div>
      }
      preview={
        <div
          style={{
            backgroundColor: '#030712',
            backgroundImage: backgroundGradientCss,
            backgroundSize: '180% 180%',
            animation: `auroraDrift ${speed}s ease infinite alternate`,
          }}
          className="relative w-full h-80 flex flex-col items-center justify-center overflow-hidden rounded-xl p-6 text-center select-none shadow-2xl transition-all"
        >
          {/* Noise Grain Texture Overlay */}
          {hasNoise && (
            <div
              className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 0)',
                backgroundSize: '4px 4px',
              }}
            />
          )}

          <div className="relative z-10 rounded-2xl border border-white/20 bg-black/30 p-6 backdrop-blur-md shadow-2xl max-w-sm">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>AURORA BOREALIS</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Northern Lights
            </h3>
            <p className="mt-1 text-xs text-white/80">
              Fluid multi-color radial gradient mesh drifting in real-time.
            </p>
          </div>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Generated Aurora Gradient Code"
          tabs={[
            {
              id: 'css',
              label: 'CSS Radial Mesh',
              language: 'css',
              code: cssCode,
              filename: 'aurora-gradient.css',
            },
            {
              id: 'tailwind',
              label: 'Tailwind Snippet',
              language: 'html',
              code: tailwindCode,
              filename: 'aurora-mesh.html',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
