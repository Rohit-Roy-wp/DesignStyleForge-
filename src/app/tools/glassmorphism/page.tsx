'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { Copy, RefreshCw, Eye } from 'lucide-react';

export default function GlassmorphismPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'glassmorphism')!;

  // Interactive State
  const [blur, setBlur] = useState<number>(16);
  const [opacity, setOpacity] = useState<number>(20);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [borderOpacity, setBorderOpacity] = useState<number>(25);
  const [borderRadius, setBorderRadius] = useState<number>(24);
  const [tintColor, setTintColor] = useState<string>('#ffffff');
  const [hasReflection, setHasReflection] = useState<boolean>(true);

  // Convert hex to rgb
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const rgbColor = hexToRgb(tintColor);
  const bgRgba = `rgba(${rgbColor}, ${(opacity / 100).toFixed(2)})`;
  const borderRgba = `rgba(${rgbColor}, ${(borderOpacity / 100).toFixed(2)})`;

  // Generated CSS Code
  const cssCode = `/* Glassmorphism Frosted Glass CSS */
.glass-card {
  background: ${bgRgba};
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderRgba};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);${
    hasReflection
      ? '\n  background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%);'
      : ''
  }
}`;

  // Generated Tailwind CSS Classes
  const tailwindCode = `<!-- Tailwind CSS v3 / v4 Example -->
<div class="relative overflow-hidden rounded-[${borderRadius}px] border-[${borderWidth}px] border-[${borderRgba}] bg-[${bgRgba}] p-6 shadow-2xl backdrop-blur-[${blur}px] ${
    hasReflection ? 'bg-gradient-to-br from-white/15 to-transparent' : ''
  }">
  <h3 class="text-xl font-bold text-white">Glassmorphism Card</h3>
  <p class="text-sm text-neutral-300">Frosted glass effect created with Tailwind CSS utilities.</p>
</div>`;

  const resetDefaults = () => {
    setBlur(16);
    setOpacity(20);
    setBorderWidth(1);
    setBorderOpacity(25);
    setBorderRadius(24);
    setTintColor('#ffffff');
    setHasReflection(true);
  };

  // SEO Article Sections (Min 400+ words)
  const seoSections = [
    {
      id: 'what-is-glassmorphism',
      title: 'What is Glassmorphism? Origins and Aesthetic Evolution',
      content: (
        <>
          <p>
            <strong>Glassmorphism</strong> is a modern user interface design trend characterized by translucent frosted-glass surfaces, vivid background blurs, subtle glowing outlines, and floating multi-layered depth. While skeuomorphism in the early 2010s attempted to replicate physical textures literally, and Flat Design stripped away all depth, Glassmorphism strikes a harmonious balance between futuristic digital elegance and spatial realism.
          </p>
          <p>
            The trend gained monumental momentum with Apple&apos;s introduction of macOS Big Sur and iOS 14, alongside Microsoft&apos;s <em>Fluent Design System</em> (known as the Acrylic material). By allowing background imagery, vibrant gradient blobs, or underlying application dashboards to bleed subtly through foreground containers, Glassmorphism preserves visual hierarchy while creating a sense of three-dimensional physical presence on a two-dimensional screen.
          </p>
        </>
      ),
    },
    {
      id: 'css-backdrop-filter-mechanics',
      title: 'How CSS backdrop-filter Works: Mechanics & Hardware Acceleration',
      content: (
        <>
          <p>
            At the heart of any true glassmorphic card lies the standard CSS property{' '}
            <code className="text-cyan-400">backdrop-filter: blur(...)</code>. Unlike standard <code className="text-cyan-400">filter: blur()</code>—which blurs the contents and children of the element itself—<code className="text-cyan-400">backdrop-filter</code> instructs the browser&apos;s rendering engine to apply a Gaussian blur filter exclusively to the graphical pixels rendered <em>directly behind</em> the targeted bounding box.
          </p>
          <p>
            To achieve realistic optical refraction, three essential layers must be paired together:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Low Alpha Background:</strong> An RGBA or HSLA background fill with an opacity between 10% and 30% to diffuse light.</li>
            <li><strong>Translucent Specular Border:</strong> A 1px semi-transparent white border (<code className="text-cyan-400">rgba(255, 255, 255, 0.2)</code>) representing the sharp edge of cut bevel glass catching overhead light.</li>
            <li><strong>Diagonal Reflection Gradient:</strong> A gentle 135-degree linear highlight mimicking real-world glass reflection.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'browser-compatibility-performance',
      title: 'Cross-Browser Compatibility & Performance Best Practices',
      content: (
        <>
          <p>
            Modern versions of Google Chrome, Safari, Mozilla Firefox, and Microsoft Edge natively support <code className="text-cyan-400">backdrop-filter</code> without vendor prefixes. However, for legacy iOS Safari versions (iOS 12-14), providing <code className="text-cyan-400">-webkit-backdrop-filter</code> ensures uninterrupted rendering parity.
          </p>
          <p>
            <strong>Performance Warning & GPU Caution:</strong> High blur radii (e.g. &gt; 30px) on large viewport areas can cause GPU repaints during scroll events on mobile devices. To optimize frame rates, always pair glassmorphic containers with <code className="text-cyan-400">will-change: transform</code> or <code className="text-cyan-400">transform: translateZ(0)</code> to force hardware acceleration into an isolated compositor layer.
          </p>
        </>
      ),
    },
    {
      id: 'accessibility-contrast',
      title: 'Accessibility & WCAG 2.1 Contrast Standards',
      content: (
        <>
          <p>
            One common pitfall in glassmorphism is insufficient text-to-background contrast. When placing text inside a translucent glass card, ensure that high-contrast typography (white on dark tints, or deep charcoal on light tints) satisfies the minimum <strong>WCAG AA ratio of 4.5:1</strong>. When overlaying dynamic imagery, adding a secondary semi-opaque inner scrim prevents background colors from washing out readable text.
          </p>
        </>
      ),
    },
  ];

  // FAQ Items for JSON-LD schema & Accordion
  const faqs = [
    {
      question: 'Why is backdrop-filter not working in my browser?',
      answer:
        'Ensure that the element has a semi-transparent background color (e.g., rgba(255,255,255,0.2)). If the background is fully opaque (#ffffff), no background pixels can show through. Also, remember to include the -webkit-backdrop-filter prefix for Safari.',
    },
    {
      question: 'Can I use this generated Glassmorphism code in Tailwind CSS?',
      answer:
        'Yes! UXForge generates both raw CSS declarations and corresponding Tailwind CSS arbitrary values that you can paste directly into any Next.js or React component.',
    },
    {
      question: 'Does Glassmorphism hurt website SEO or page speed?',
      answer:
        'No. Since all styling is handled via standard native CSS, it adds virtually zero JavaScript overhead and maintains a 100/100 Lighthouse performance rating when properly hardware-accelerated.',
    },
    {
      question: 'Is this tool completely free for commercial design projects?',
      answer:
        'Yes, all CSS and Tailwind snippets generated by UXForge are 100% royalty-free for both personal and commercial applications.',
    },
  ];

  const browserSupport = [
    { browser: 'Chrome 76+', support: 'Full Native' },
    { browser: 'Safari 9+ (-webkit-)', support: 'Full' },
    { browser: 'Firefox 103+', support: 'Full Native' },
    { browser: 'Edge 79+', support: 'Full Native' },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Blur Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="blur">Backdrop Blur Radius</label>
              <span className="font-mono text-cyan-400">{blur}px</span>
            </div>
            <input
              id="blur"
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Opacity Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="opacity">Background Opacity</label>
              <span className="font-mono text-cyan-400">{opacity}%</span>
            </div>
            <input
              id="opacity"
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Border Width & Opacity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
                <label htmlFor="borderWidth">Border Width</label>
                <span className="font-mono text-cyan-400">{borderWidth}px</span>
              </div>
              <input
                id="borderWidth"
                type="range"
                min="0"
                max="5"
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
                <label htmlFor="borderOpacity">Border Opacity</label>
                <span className="font-mono text-cyan-400">{borderOpacity}%</span>
              </div>
              <input
                id="borderOpacity"
                type="range"
                min="0"
                max="100"
                value={borderOpacity}
                onChange={(e) => setBorderOpacity(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="borderRadius">Corner Radius</label>
              <span className="font-mono text-cyan-400">{borderRadius}px</span>
            </div>
            <input
              id="borderRadius"
              type="range"
              min="0"
              max="50"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Tint Color Picker & Reflection Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              <label htmlFor="tintColor" className="text-xs font-medium text-neutral-300">
                Glass Tint Color:
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="tintColor"
                  type="color"
                  value={tintColor}
                  onChange={(e) => setTintColor(e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400 uppercase">{tintColor}</span>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-300">
              <input
                type="checkbox"
                checked={hasReflection}
                onChange={(e) => setHasReflection(e.target.checked)}
                className="rounded border-neutral-700 accent-cyan-400"
              />
              Specular Highlight
            </label>
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Default Settings
          </button>
        </div>
      }
      preview={
        <div className="relative w-full h-80 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-900">
          {/* Vibrant background geometric shapes to demonstrate the blur */}
          <div className="absolute -top-10 -left-10 h-44 w-44 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 blur-sm animate-pulse" />
          <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 blur-sm" />
          <div className="absolute top-1/2 left-1/3 h-28 w-28 -translate-y-1/2 rounded-full bg-amber-400/80 blur-xs" />

          {/* The Live Glass Card */}
          <div
            style={{
              backgroundColor: bgRgba,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              borderRadius: `${borderRadius}px`,
              border: `${borderWidth}px solid ${borderRgba}`,
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              backgroundImage: hasReflection
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 100%)'
                : 'none',
            }}
            className="relative z-10 w-4/5 max-w-sm p-6 text-white shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="flex h-3 w-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50"></span>
              <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                Glass OS v2.0
              </span>
            </div>
            <h4 className="text-xl font-bold tracking-tight">Frosted Glass</h4>
            <p className="mt-1 text-xs text-white/80 leading-relaxed">
              Real-time translucent backdrop filter with customizable specular reflection.
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-3">
              <span className="text-[11px] font-mono text-white/70">Blur: {blur}px</span>
              <span className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur hover:bg-white/30 cursor-pointer">
                Action
              </span>
            </div>
          </div>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Generated Glassmorphism Code"
          tabs={[
            {
              id: 'css',
              label: 'Pure CSS',
              language: 'css',
              code: cssCode,
              filename: 'glassmorphism.css',
            },
            {
              id: 'tailwind',
              label: 'Tailwind CSS',
              language: 'html',
              code: tailwindCode,
              filename: 'glass-card.html',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
      browserSupport={browserSupport}
    />
  );
}
