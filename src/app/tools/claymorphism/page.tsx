'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, Box } from 'lucide-react';

export default function ClaymorphismPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'claymorphism')!;

  const [baseColor, setBaseColor] = useState<string>('#6366f1'); // Indigo
  const [borderRadius, setBorderRadius] = useState<number>(28);
  const [depth, setDepth] = useState<number>(8);
  const [insetBlur, setInsetBlur] = useState<number>(14);
  const [outerBlur, setOuterBlur] = useState<number>(24);
  const [buttonText, setButtonText] = useState<string>('Press Clay Button');

  // Multi-tier clay shadows
  const outerShadow = `0px ${depth * 2}px ${outerBlur}px rgba(0, 0, 0, 0.35)`;
  const insetTopHighlight = `inset -${depth}px -${depth}px ${insetBlur}px rgba(0, 0, 0, 0.4)`;
  const insetBottomLight = `inset ${depth}px ${depth}px ${insetBlur}px rgba(255, 255, 255, 0.45)`;

  const fullBoxShadow = `${outerShadow}, ${insetTopHighlight}, ${insetBottomLight}`;

  const cssCode = `/* 3D Claymorphism Button CSS */
.clay-button {
  background-color: ${baseColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${fullBoxShadow};
  padding: 16px 36px;
  color: #ffffff;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.clay-button:hover {
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.05);
}

.clay-button:active {
  transform: translateY(${depth / 2}px) scale(0.98);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(0, 0, 0, 0.5), inset 4px 4px 8px rgba(255, 255, 255, 0.4);
}`;

  const tailwindCode = `<!-- Tailwind CSS Custom Claymorphism Button -->
<button class="relative rounded-[${borderRadius}px] bg-[${baseColor}] px-8 py-4 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:translate-y-1"
  style="box-shadow: ${fullBoxShadow};">
  ${buttonText}
</button>`;

  const resetDefaults = () => {
    setBaseColor('#6366f1');
    setBorderRadius(28);
    setDepth(8);
    setInsetBlur(14);
    setOuterBlur(24);
    setButtonText('Press Clay Button');
  };

  const seoSections = [
    {
      id: 'what-is-claymorphism',
      title: 'What is Claymorphism? The Friendly Evolution of Neumorphism',
      content: (
        <>
          <p>
            <strong>Claymorphism</strong> is a tactile, playful UI style characterized by inflated three-dimensional shapes resembling sculpted modeling clay or soft marshmallow cushions. Unlike rigid flat design or cold metallic skeuomorphism, claymorphism relies on high corner radii, thick rounded profiles, and dual inner reflections to give interfaces an approachable, friendly, and gamified aesthetic.
          </p>
          <p>
            Popularized alongside modern 3D illustration libraries, claymorphism solves the severe accessibility issues that crippled Neumorphism in 2020. While neumorphism used subtle low-contrast shadows that disappeared against background shades, claymorphism pairs vibrant saturated base colors with dark contrasting drop shadows, ensuring distinct boundary visibility.
          </p>
        </>
      ),
    },
    {
      id: 'physics-of-clay-shadow-stack',
      title: 'The Dual Inset Physics: Simulating Convex Volume in CSS',
      content: (
        <>
          <p>
            To transform a flat CSS rectangle into an inflated convex bubble, two opposing light phenomena must occur within the button&apos;s perimeter:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>The Specular Keylight:</strong> An inner highlight (<code className="text-cyan-400">inset +x +y</code>) with a bright white semi-transparent wash simulating overhead ambient illumination.</li>
            <li><strong>The Underside Ambient Shadow:</strong> A dark inner shade (<code className="text-cyan-400">inset -x -y</code>) on the opposite corner creating the optical illusion of material curvature.</li>
            <li><strong>The Elevation Drop Shadow:</strong> An outer drop shadow with substantial vertical offset (<code className="text-cyan-400">0 Y Blur</code>) that physically detaches the button from the background plane.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'interactive-micro-interactions',
      title: 'Micro-Interactions & Haptic Feedback in Modern Web Apps',
      content: (
        <>
          <p>
            A static clay button loses half its magic without responsive haptic physics. When users hover, a slight expansion (<code className="text-cyan-400">scale(1.02)</code>) coupled with a brightness boost signals readiness. On <code className="text-cyan-400">:active</code> click, translating the element downwards while compressing the outer shadow creates the realistic sensation of depressing a soft rubber ball.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'How is Claymorphism different from Neumorphism?',
      answer:
        'Neumorphism forced elements to have the exact same color as their parent background, which resulted in dangerously low contrast and failed accessibility standards. Claymorphism uses standalone vibrant floating elements with high contrast and dual inner shadows.',
    },
    {
      question: 'Does this work on mobile touch devices?',
      answer:
        'Yes! The active state responds smoothly to touchstart and touchend events, providing satisfying physical click feedback on iPhone and Android screens.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Button Text */}
          <div>
            <label htmlFor="buttonText" className="block text-xs font-semibold text-neutral-300 mb-1">
              Button Label:
            </label>
            <input
              id="buttonText"
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-cyan-300 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Base Color Picker */}
          <div>
            <label htmlFor="baseColor" className="block text-xs font-semibold text-neutral-300 mb-1">
              Clay Material Color:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="baseColor"
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="h-8 w-12 cursor-pointer rounded border border-neutral-700 bg-transparent"
              />
              <span className="font-mono text-xs text-neutral-400 uppercase">{baseColor}</span>
            </div>
          </div>

          {/* Depth / Offset Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="depth">3D Inflation Depth</label>
              <span className="font-mono text-cyan-400">{depth}px</span>
            </div>
            <input
              id="depth"
              type="range"
              min="2"
              max="16"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Corner Radius Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="borderRadius">Corner Curvature</label>
              <span className="font-mono text-cyan-400">{borderRadius}px</span>
            </div>
            <input
              id="borderRadius"
              type="range"
              min="8"
              max="50"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Inset Blur */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="insetBlur">Inner Softness Blur</label>
              <span className="font-mono text-cyan-400">{insetBlur}px</span>
            </div>
            <input
              id="insetBlur"
              type="range"
              min="4"
              max="30"
              value={insetBlur}
              onChange={(e) => setInsetBlur(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Defaults
          </button>
        </div>
      }
      preview={
        <div className="relative w-full h-80 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-8">
          <p className="text-xs text-neutral-400 mb-6 font-mono">
            Click / Hover to test tactile physical response
          </p>

          <button
            type="button"
            style={{
              backgroundColor: baseColor,
              borderRadius: `${borderRadius}px`,
              boxShadow: fullBoxShadow,
            }}
            className="px-8 py-4 text-base font-extrabold text-white transition-all duration-200 cursor-pointer select-none hover:-translate-y-1 hover:brightness-105 active:translate-y-1 active:scale-95 flex items-center gap-2 shadow-2xl"
          >
            <Box className="h-5 w-5" />
            {buttonText}
          </button>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Generated Claymorphism Code"
          tabs={[
            {
              id: 'css',
              label: 'Pure CSS',
              language: 'css',
              code: cssCode,
              filename: 'clay-button.css',
            },
            {
              id: 'tailwind',
              label: 'Tailwind CSS',
              language: 'html',
              code: tailwindCode,
              filename: 'clay-button.html',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
