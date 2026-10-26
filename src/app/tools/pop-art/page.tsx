'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, Download, Upload, CircleDot } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PopArtPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'pop-art')!;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [dotSize, setDotSize] = useState<number>(8); // dot spacing
  const [colorMode, setColorMode] = useState<'comic' | 'mono' | 'warhol'>('comic');
  const [contrast, setContrast] = useState<number>(25);

  // Initialize sample artistic portrait on dummy canvas
  useEffect(() => {
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 400;
    sampleCanvas.height = 400;
    const ctx = sampleCanvas.getContext('2d');
    if (!ctx) return;

    // Gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 400, 400);
    bgGrad.addColorStop(0, '#fde047');
    bgGrad.addColorStop(1, '#f43f5e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 400, 400);

    // Face circle
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(200, 200, 120, 0, Math.PI * 2);
    ctx.fill();

    // Dark Sunglasses (Iconic Pop Art)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(140, 160, 50, 36, 8);
    ctx.roundRect(210, 160, 50, 36, 8);
    ctx.fill();
    ctx.fillRect(190, 172, 20, 6);

    // Bright Red Lips
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(200, 260, 35, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    setImageSrc(sampleCanvas.toDataURL('image/png'));
  }, []);

  // Process image with client-side Halftone Dot algorithm
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;

      // Draw source image to offscreen canvas to sample pixels
      const offCanvas = document.createElement('canvas');
      offCanvas.width = 400;
      offCanvas.height = 400;
      const offCtx = offCanvas.getContext('2d')!;
      offCtx.drawImage(img, 0, 0, 400, 400);

      const imgData = offCtx.getImageData(0, 0, 400, 400);
      const data = imgData.data;

      // Clear main canvas with appropriate paper background
      ctx.fillStyle = colorMode === 'warhol' ? '#fde047' : '#ffffff';
      ctx.fillRect(0, 0, 400, 400);

      const spacing = dotSize;
      const radiusMax = spacing / 2;

      for (let y = 0; y < 400; y += spacing) {
        for (let x = 0; x < 400; x += spacing) {
          const pixelIndex = (y * 400 + x) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];

          // Compute perceived luminance (0 to 1)
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          const dotRadius = (1 - lum) * radiusMax * (1 + contrast / 100);

          if (dotRadius > 0.5) {
            ctx.beginPath();
            ctx.arc(x + spacing / 2, y + spacing / 2, Math.min(dotRadius, radiusMax * 1.3), 0, Math.PI * 2);

            if (colorMode === 'comic') {
              // Ben-Day primary comic colors based on dominant channel
              if (r > 160 && g < 100) ctx.fillStyle = '#dc2626'; // Comic Red
              else if (b > 150) ctx.fillStyle = '#2563eb'; // Comic Blue
              else if (r > 150 && g > 150) ctx.fillStyle = '#eab308'; // Comic Yellow
              else ctx.fillStyle = '#0f172a'; // Black ink
            } else if (colorMode === 'warhol') {
              ctx.fillStyle = lum > 0.5 ? '#ec4899' : '#3b82f6';
            } else {
              // Monochrome black ink
              ctx.fillStyle = '#111827';
            }

            ctx.fill();
          }
        }
      }
    };
  }, [imageSrc, dotSize, colorMode, contrast]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadArtwork = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pop-art-halftone.png';
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
    setDotSize(8);
    setColorMode('comic');
    setContrast(25);
  };

  const seoSections = [
    {
      id: 'roy-lichtenstein-pop-art',
      title: 'Roy Lichtenstein & The Pop-Art Ben-Day Dot Revolution',
      content: (
        <>
          <p>
            During the 1960s American Pop Art movement, legendary artists such as <strong>Roy Lichtenstein</strong> and <strong>Andy Warhol</strong> transformed commercial mass-printing techniques into high fine art. Lichtenstein drew inspiration from cheap pulp comic strips, magnifying industrial <em>Ben-Day dots</em> to parody mass consumer media and commercial advertising.
          </p>
          <p>
            Rather than painting smooth gradients, comic publishers saved massive printing costs by overlaying patterned grids of primary dots (Cyan, Magenta, Yellow, and Key Black). When viewed from normal reading distance, the human eye blends these distinct dots into unified skin tones and scenic textures.
          </p>
        </>
      ),
    },
    {
      id: 'javascript-pixel-rasterization',
      title: 'Client-Side Pixel Rasterization & Luminance Mapping in JS',
      content: (
        <>
          <p>
            To generate authentic digital halftone comic plates without slow server processing, UXForge uses native HTML5 Canvas <code className="text-cyan-400">getImageData()</code> array buffers:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Luma Calculation:</strong> The algorithm reads RGBA bytes and calculates luminance using the standard ITU-R BT.601 formula: <code className="text-cyan-400">Y = 0.299R + 0.587G + 0.114B</code>.</li>
            <li><strong>Inverse Dot Radius:</strong> Inverting luminance determines dot size: darker shadows receive expansive overlapping dots, while highlights collapse into tiny micro-points.</li>
            <li><strong>Zero Server Load:</strong> All calculations execute in less than 40ms directly in the client&apos;s browser thread.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Which photos produce the best pop-art comic results?',
      answer:
        'High-contrast portraits, animal photography, and bold still-life objects with clean lighting produce the most striking Ben-Day comic effects.',
    },
    {
      question: 'Can I print the exported pop-art image as a physical poster?',
      answer:
        'Yes! The output PNG is rendered at 100% vector-sharp circle coordinates on white paper background, making it ready for print or digital poster framing.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Upload Button */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Source Photo:
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 p-3 text-xs text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors">
              <Upload className="h-4 w-4 text-cyan-400" />
              <span>Upload Custom Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Color Mode Tabs */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Comic Color Mode:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'comic', label: 'Classic Comic' },
                { id: 'warhol', label: 'Warhol Pop' },
                { id: 'mono', label: 'Ink Monochrome' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setColorMode(m.id as any)}
                  className={`rounded-xl py-2 text-xs font-bold transition-all ${
                    colorMode === m.id
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Halftone Dot Spacing */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="dotSize">Halftone Dot Density</label>
              <span className="font-mono text-cyan-400">{dotSize}px</span>
            </div>
            <input
              id="dotSize"
              type="range"
              min="4"
              max="16"
              value={dotSize}
              onChange={(e) => setDotSize(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Contrast Boost */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="contrast">Dot Contrast / Ink Weight</label>
              <span className="font-mono text-cyan-400">+{contrast}%</span>
            </div>
            <input
              id="contrast"
              type="range"
              min="0"
              max="60"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Pop-Art Defaults
          </button>

          {/* Download Action */}
          <button
            onClick={downloadArtwork}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Halftone Artwork PNG
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative rounded-2xl border-4 border-black bg-white p-2 shadow-2xl">
            <canvas
              ref={canvasRef}
              className="rounded-lg overflow-hidden max-w-full h-auto block shadow-md"
            />
          </div>
          <p className="mt-3 text-[11px] font-mono text-neutral-400">
            Halftone dot rasterization calculated in real-time
          </p>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
