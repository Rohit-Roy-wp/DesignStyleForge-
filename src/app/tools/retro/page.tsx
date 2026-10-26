'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, Download, Upload, Tv } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RetroCrtPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'retro')!;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [scanlineOpacity, setScanlineOpacity] = useState<number>(45);
  const [curvature, setCurvature] = useState<number>(15);
  const [vignette, setVignette] = useState<number>(60);
  const [phosphorGlow, setPhosphorGlow] = useState<number>(20);

  // Initialize sample arcade graphic if no custom image is uploaded
  useEffect(() => {
    // Generate an 80s arcade test screen on dummy canvas
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 480;
    sampleCanvas.height = 360;
    const ctx = sampleCanvas.getContext('2d');
    if (!ctx) return;

    // Dark grid background
    ctx.fillStyle = '#08081a';
    ctx.fillRect(0, 0, 480, 360);

    // Neon mountain grid
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 2;
    for (let y = 200; y < 360; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(480, y);
      ctx.stroke();
    }
    for (let x = -100; x < 580; x += 40) {
      ctx.beginPath();
      ctx.moveTo(240, 180);
      ctx.lineTo(x * 1.5, 360);
      ctx.stroke();
    }

    // Glowing sun
    const grad = ctx.createLinearGradient(240, 80, 240, 180);
    grad.addColorStop(0, '#ffe600');
    grad.addColorStop(1, '#ff007f');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(240, 130, 50, Math.PI, 0, false);
    ctx.fill();

    // Text
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('INSERT COIN • 1984', 240, 270);

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.fillText('SCORE < 1 > 098420', 240, 40);

    setImageSrc(sampleCanvas.toDataURL('image/png'));
  }, []);

  // Re-draw canvas whenever controls or image change
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 480;
      canvas.height = 360;

      // 1. Draw base image
      ctx.clearRect(0, 0, 480, 360);
      ctx.drawImage(img, 0, 0, 480, 360);

      // 2. Phosphor bloom simulation (color tint & soft blur overlay)
      if (phosphorGlow > 0) {
        ctx.fillStyle = `rgba(0, 255, 200, ${(phosphorGlow / 300).toFixed(2)})`;
        ctx.fillRect(0, 0, 480, 360);
      }

      // 3. Scanlines overlay
      const scanAlpha = (scanlineOpacity / 100).toFixed(2);
      ctx.fillStyle = `rgba(0, 0, 0, ${scanAlpha})`;
      for (let y = 0; y < 360; y += 4) {
        ctx.fillRect(0, y, 480, 2);
      }

      // 4. CRT Vignette & Curvature Corner Shadow
      const radial = ctx.createRadialGradient(240, 180, 120, 240, 180, 260);
      radial.addColorStop(0, 'rgba(0, 0, 0, 0)');
      radial.addColorStop(0.7, `rgba(0, 0, 0, ${(vignette / 180).toFixed(2)})`);
      radial.addColorStop(1, `rgba(0, 0, 0, ${(vignette / 100).toFixed(2)})`);
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, 480, 360);
    };
  }, [imageSrc, scanlineOpacity, curvature, vignette, phosphorGlow]);

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

  const downloadProcessedImage = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crt-scanline-retro.png';
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
    setScanlineOpacity(45);
    setCurvature(15);
    setVignette(60);
    setPhosphorGlow(20);
  };

  const seoSections = [
    {
      id: 'how-crt-monitors-work',
      title: 'How Cathode Ray Tube (CRT) Monitors Work: Physics & Electronics',
      content: (
        <>
          <p>
            Before the advent of liquid crystal displays (LCD) and OLEDs, visual computer displays operated using vacuum <strong>Cathode Ray Tubes (CRTs)</strong>. An electron gun at the rear of the tube fired focused beams of electrons, accelerated by thousands of volts across deflection coils, striking a glass screen coated with phosphorescent materials.
          </p>
          <p>
            Because the electron gun rasterized video line-by-line from top to bottom at 50Hz or 60Hz intervals, microscopic black gaps emerged between active scanlines. Furthermore, the phosphor coating glowed briefly after excitation (known as phosphor persistence or bloom), bathing retro arcade graphics in warm, soft-focus luminescence that cannot be replicated by modern razor-flat pixels.
          </p>
        </>
      ),
    },
    {
      id: 'emulating-scanlines-in-html5-canvas',
      title: 'Emulating Shadow Masks & Scanline Geometry in HTML5 Canvas',
      content: (
        <>
          <p>
            Faithfully simulating a CRT on a digital 2D canvas requires three optical phenomena:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Even-Row Scanline Blanking:</strong> Masking every alternating 2-4 pixels with a semi-opaque black line (<code className="text-cyan-400">rgba(0, 0, 0, 0.4)</code>) replicates electron beam raster spacing.</li>
            <li><strong>Curved Glass Barrel Distortion:</strong> Convex screen curvature is simulated using corner radial gradients that vignette the perimeter into a subtle fish-eye bulge.</li>
            <li><strong>RGB Subpixel Bleed:</strong> Diffusing light into neighboring pixels mimics phosphor blooming, blending harsh 8-bit sprites into smooth organic shapes.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Can I upload custom screenshots from modern games or photos?',
      answer:
        'Yes! Click the Upload Custom Image button to apply authentic 80s arcade CRT scanlines and phosphor glow to any PNG, JPEG, or WebP graphic completely client-side.',
    },
    {
      question: 'Is my uploaded image uploaded to a server?',
      answer:
        'No. UXForge operates with zero server infrastructure. All canvas operations execute locally inside your web browser thread; your images never leave your computer.',
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
              Source Image:
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 p-3 text-xs text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors">
              <Upload className="h-4 w-4 text-cyan-400" />
              <span>Upload Custom Photo / Screenshot</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Scanline Opacity */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="scanlineOpacity">Scanline Density & Darkness</label>
              <span className="font-mono text-cyan-400">{scanlineOpacity}%</span>
            </div>
            <input
              id="scanlineOpacity"
              type="range"
              min="10"
              max="90"
              value={scanlineOpacity}
              onChange={(e) => setScanlineOpacity(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Vignette Shadow */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="vignette">CRT Screen Curvature & Vignette</label>
              <span className="font-mono text-cyan-400">{vignette}%</span>
            </div>
            <input
              id="vignette"
              type="range"
              min="10"
              max="100"
              value={vignette}
              onChange={(e) => setVignette(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Phosphor Bloom */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="phosphorGlow">Phosphor Glow / Bloom</label>
              <span className="font-mono text-cyan-400">{phosphorGlow}%</span>
            </div>
            <input
              id="phosphorGlow"
              type="range"
              min="0"
              max="60"
              value={phosphorGlow}
              onChange={(e) => setPhosphorGlow(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Arcade Defaults
          </button>

          {/* Download Action */}
          <button
            onClick={downloadProcessedImage}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Processed Retro Artwork
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          {/* Retro Monitor Housing Bezel */}
          <div className="relative rounded-3xl border-8 border-neutral-800 bg-neutral-900 p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-2 px-1 text-[10px] font-mono text-neutral-400 uppercase">
              <span className="flex items-center gap-1 text-emerald-400">
                <Tv className="h-3 w-3" />
                RGB MATRIX 60HZ
              </span>
              <span>SL-1984 VINTAGE</span>
            </div>

            <canvas
              ref={canvasRef}
              className="rounded-xl overflow-hidden shadow-inner max-w-full h-auto block"
            />
          </div>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
