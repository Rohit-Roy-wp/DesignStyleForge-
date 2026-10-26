'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, Zap } from 'lucide-react';

export default function CyberpunkPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'cyberpunk')!;

  const [text, setText] = useState<string>('NEON NIGHTS 2077');
  const [cyanGlow, setCyanGlow] = useState<string>('#00f0ff');
  const [pinkGlow, setPinkGlow] = useState<string>('#ff007f');
  const [glowIntensity, setGlowIntensity] = useState<number>(18);
  const [glitchSpeed, setGlitchSpeed] = useState<string>('normal'); // 'slow' | 'normal' | 'hyper'
  const [fontSize, setFontSize] = useState<number>(36);

  const getAnimationDuration = () => {
    switch (glitchSpeed) {
      case 'slow':
        return '3s';
      case 'hyper':
        return '0.8s';
      default:
        return '1.8s';
    }
  };

  const textShadowStyle = `0 0 5px ${cyanGlow}, 0 0 10px ${cyanGlow}, 0 0 ${glowIntensity}px ${cyanGlow}, 0 0 ${
    glowIntensity * 2
  }px ${pinkGlow}`;

  // Generated CSS Code
  const cssCode = `/* Cyberpunk Neon Glitch Text Generator */
.cyber-glitch {
  font-family: 'Courier New', Courier, monospace;
  font-size: ${fontSize}px;
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: ${textShadowStyle};
  animation: cyberpunkGlitch ${getAnimationDuration()} infinite ease-in-out;
  position: relative;
  display: inline-block;
  letter-spacing: 0.15em;
}

@keyframes cyberpunkGlitch {
  0% {
    text-shadow: 2px 2px ${pinkGlow}, -2px -2px ${cyanGlow};
    transform: translate(0);
  }
  20% {
    text-shadow: -2px 2px ${pinkGlow}, 2px -2px ${cyanGlow};
    transform: translate(-2px, 1px);
  }
  40% {
    text-shadow: 2px -2px ${pinkGlow}, -2px 2px ${cyanGlow};
    transform: translate(2px, -1px);
  }
  60% {
    text-shadow: -1px -1px ${pinkGlow}, 1px 1px ${cyanGlow};
    transform: translate(-1px, 2px);
  }
  80% {
    text-shadow: 3px 1px ${pinkGlow}, -3px -1px ${cyanGlow};
    transform: translate(1px, -2px);
  }
  100% {
    text-shadow: 2px 2px ${pinkGlow}, -2px -2px ${cyanGlow};
    transform: translate(0);
  }
}`;

  const htmlCode = `<div class="cyber-container">
  <h1 class="cyber-glitch" data-text="${text}">${text}</h1>
</div>`;

  const resetDefaults = () => {
    setText('NEON NIGHTS 2077');
    setCyanGlow('#00f0ff');
    setPinkGlow('#ff007f');
    setGlowIntensity(18);
    setGlitchSpeed('normal');
    setFontSize(36);
  };

  const seoSections = [
    {
      id: 'cyberpunk-aesthetic-origins',
      title: 'The Cyberpunk Aesthetic: High Tech & Low Life in Digital Design',
      content: (
        <>
          <p>
            The <strong>Cyberpunk</strong> aesthetic stems from 1980s retro-futurism, popularized by seminal literary works like William Gibson&apos;s <em>Neuromancer</em> and legendary cinematic masterpieces such as <em>Blade Runner</em> and <em>Akira</em>. In web development, cyberpunk manifests as high-contrast dark mode interfaces flooded with luminous neon glows, analog television scanlines, wireframe grids, and deliberate CRT chromatic aberration.
          </p>
          <p>
            Unlike sterile corporate minimalism, Cyberpunk UI embraces deliberate distortion, sensory overload, and gritty digital textures. Neon glitch typography serves as a show-stopping headline treatment for tech launch pages, gaming portals, Web3 platforms, and interactive portfolio headers.
          </p>
        </>
      ),
    },
    {
      id: 'how-css-text-shadow-glow-works',
      title: 'Mastering Cascading CSS Text-Shadows & Chromatic Aberration',
      content: (
        <>
          <p>
            Realistic neon signs do not emit flat monochromatic color; they radiate an intense white-hot core wrapped in concentric halos of ionized gas. In CSS, this optical physical phenomenon is engineered using multiple comma-separated offsets inside <code className="text-cyan-400">text-shadow</code>:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>The White Filament Core:</strong> A sharp 2px-5px blur with the primary cyan/neon color creates high edge contrast.</li>
            <li><strong>The Atmospheric Halo:</strong> A mid-range 10px-20px blur that washes surrounding pixels in vibrant color.</li>
            <li><strong>Secondary Chromatic Dispersion:</strong> A wider 30px-50px blur in a contrasting hue (such as magenta or hot pink) emulates chromatic lens aberration.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'css-keyframes-jitter-optimization',
      title: 'Smooth 60fps Keyframe Jitter & Hardware Acceleration',
      content: (
        <>
          <p>
            To produce authentic glitch tremors without causing layout reflows, CSS animations must alter only <code className="text-cyan-400">transform</code> and <code className="text-cyan-400">text-shadow</code>. Changing properties like <code className="text-cyan-400">top</code>, <code className="text-cyan-400">left</code>, or <code className="text-cyan-400">margin</code> forces the browser engine into costly geometry recalculations, resulting in micro-stuttering.
          </p>
          <p>
            By applying <code className="text-cyan-400">transform: translate(x, y)</code>, the GPU Compositor handles the position displacement entirely off the main thread, guaranteeing flawless 60 FPS performance even on low-power mobile devices.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'How do I add a scanline overlay behind the glitch text?',
      answer:
        'You can add a repeating-linear-gradient background overlay on a parent container with pointer-events: none. UXForge automatically includes the .scanlines utility class for instant CRT monitor lines.',
    },
    {
      question: 'Can I change the font to a custom Cyberpunk font?',
      answer:
        'Yes! Simply replace the font-family declaration in the generated CSS with custom fonts like Orbitron, Michroma, or Cyberpunk 2077 from Google Fonts.',
    },
    {
      question: 'Does the CSS glitch animation consume excessive CPU/battery?',
      answer:
        'No. Because our code utilizes GPU-accelerated transform: translate and text-shadow keyframes rather than heavy SVG filters or JavaScript requestAnimationFrame loops, CPU overhead is negligible.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Text Input */}
          <div>
            <label htmlFor="text" className="block text-xs font-semibold text-neutral-300 mb-1">
              Headline Text:
            </label>
            <input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-sm text-cyan-300 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Color Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="cyanGlow" className="block text-xs font-semibold text-neutral-300 mb-1">
                Primary Neon:
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="cyanGlow"
                  type="color"
                  value={cyanGlow}
                  onChange={(e) => setCyanGlow(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400 uppercase">{cyanGlow}</span>
              </div>
            </div>

            <div>
              <label htmlFor="pinkGlow" className="block text-xs font-semibold text-neutral-300 mb-1">
                Secondary Halo:
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="pinkGlow"
                  type="color"
                  value={pinkGlow}
                  onChange={(e) => setPinkGlow(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent"
                />
                <span className="font-mono text-xs text-neutral-400 uppercase">{pinkGlow}</span>
              </div>
            </div>
          </div>

          {/* Glow Intensity Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="glowIntensity">Glow Halo Radius</label>
              <span className="font-mono text-cyan-400">{glowIntensity}px</span>
            </div>
            <input
              id="glowIntensity"
              type="range"
              min="5"
              max="40"
              value={glowIntensity}
              onChange={(e) => setGlowIntensity(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Font Size Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="fontSize">Font Size</label>
              <span className="font-mono text-cyan-400">{fontSize}px</span>
            </div>
            <input
              id="fontSize"
              type="range"
              min="20"
              max="60"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Glitch Speed Selector */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Glitch Jitter Speed:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['slow', 'normal', 'hyper'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setGlitchSpeed(spd)}
                  className={`rounded-lg py-1.5 text-xs font-semibold capitalize transition-all ${
                    glitchSpeed === spd
                      ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Cyberpunk Default
          </button>
        </div>
      }
      preview={
        <div className="relative w-full h-80 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-neutral-950 p-6 border border-neutral-850">
          {/* Cyberpunk Grid Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${cyanGlow} 1px, transparent 1px), linear-gradient(90deg, ${cyanGlow} 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* CRT Scanlines Overlay */}
          <div className="scanlines absolute inset-0 opacity-40 pointer-events-none" />

          {/* Glowing Animated Text */}
          <div className="relative z-10 text-center">
            <span
              style={{
                fontSize: `${fontSize}px`,
                textShadow: textShadowStyle,
              }}
              className="glitch-text font-black tracking-widest text-white uppercase select-none transition-all block"
            >
              {text || 'CYBERPUNK'}
            </span>

            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1 rounded bg-neutral-900/80 border border-neutral-800 px-2 py-0.5 font-mono text-[10px] text-cyan-400">
                <Zap className="h-3 w-3" />
                NEON ACTIVE
              </span>
              <span className="font-mono text-[10px] text-pink-400">
                SPEED: {glitchSpeed.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Cyberpunk CSS & HTML Output"
          tabs={[
            {
              id: 'css',
              label: 'CSS Keyframes',
              language: 'css',
              code: cssCode,
              filename: 'cyberpunk-glitch.css',
            },
            {
              id: 'html',
              label: 'HTML Snippet',
              language: 'html',
              code: htmlCode,
              filename: 'cyberpunk-text.html',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
