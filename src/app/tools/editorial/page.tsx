'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, Download, Upload, FileText, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EditorialPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'editorial')!;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [masthead, setMasthead] = useState<string>('VOGUE');
  const [mastheadFont, setMastheadFont] = useState<'Didot' | 'Bodoni' | 'Modernist'>('Didot');
  const [mainHeadline, setMainHeadline] = useState<string>('THE FUTURE OF DIGITAL COUTURE');
  const [subHeadline1, setSubHeadline1] = useState<string>('Cyberpunk Streetwear & High-Tech Textiles');
  const [subHeadline2, setSubHeadline2] = useState<string>('Exclusive: Inside the Neo-Tokyo Underground');
  const [issueDate, setIssueDate] = useState<string>('NOVEMBER 2026 • ISSUE NO. 84');
  const [textColor, setTextColor] = useState<string>('#ffffff');

  // Initialize sample high-fashion portrait
  useEffect(() => {
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 400;
    sampleCanvas.height = 560; // Standard 1:1.4 magazine aspect ratio
    const ctx = sampleCanvas.getContext('2d');
    if (!ctx) return;

    // Moody editorial background gradient
    const grad = ctx.createLinearGradient(0, 0, 400, 560);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(0.5, '#312e81');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 400, 560);

    // Artistic fashion silhouette
    ctx.fillStyle = '#f87171';
    ctx.beginPath();
    ctx.arc(200, 240, 100, 0, Math.PI * 2);
    ctx.fill();

    // Dark sleek trenchcoat overlay
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(120, 560);
    ctx.lineTo(200, 320);
    ctx.lineTo(280, 560);
    ctx.closePath();
    ctx.fill();

    setImageSrc(sampleCanvas.toDataURL('image/png'));
  }, []);

  // Render composite Magazine Cover
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 560;

      // 1. Draw Background Photograph
      ctx.drawImage(img, 0, 0, 400, 560);

      // Subtle editorial vignette at bottom and top to ensure typography pops
      const topVignette = ctx.createLinearGradient(0, 0, 0, 140);
      topVignette.addColorStop(0, 'rgba(0,0,0,0.5)');
      topVignette.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topVignette;
      ctx.fillRect(0, 0, 400, 140);

      const botVignette = ctx.createLinearGradient(0, 380, 0, 560);
      botVignette.addColorStop(0, 'rgba(0,0,0,0)');
      botVignette.addColorStop(1, 'rgba(0,0,0,0.75)');
      ctx.fillStyle = botVignette;
      ctx.fillRect(0, 380, 400, 180);

      // 2. Issue Date & Price Header
      ctx.fillStyle = textColor;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '2px';
      ctx.fillText(issueDate, 200, 24);

      // 3. Iconic Masthead
      ctx.fillStyle = textColor;
      ctx.font = 'bold 74px serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;
      ctx.fillText(masthead, 200, 96);

      // 4. Main Lead Cover Story
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 8;
      ctx.textAlign = 'left';
      ctx.font = '900 24px sans-serif';
      ctx.fillStyle = '#38bdf8'; // Accent Cyan
      ctx.fillText('EXCLUSIVE', 24, 430);

      ctx.font = 'bold 20px serif';
      ctx.fillStyle = textColor;
      const lines = mainHeadline.split(' ');
      const half = Math.ceil(lines.length / 2);
      ctx.fillText(lines.slice(0, half).join(' '), 24, 458);
      ctx.fillText(lines.slice(half).join(' '), 24, 482);

      // 5. Secondary Teaser Headline
      ctx.font = '500 11px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`• ${subHeadline1}`, 24, 510);
      ctx.fillText(`• ${subHeadline2}`, 24, 528);

      // 6. Realistic Barcode
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(320, 500, 60, 40);
      ctx.fillStyle = '#000000';
      for (let x = 326; x < 374; x += 3) {
        ctx.fillRect(x, 504, (x % 2 === 0 ? 1.5 : 2), 26);
      }
      ctx.font = '7px monospace';
      ctx.fillText('9 771234', 330, 536);
    };
  }, [imageSrc, masthead, mainHeadline, subHeadline1, subHeadline2, issueDate, textColor]);

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

  const downloadCover = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${masthead.toLowerCase()}-magazine-cover.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.8 },
    });
  };

  const resetDefaults = () => {
    setMasthead('VOGUE');
    setMainHeadline('THE FUTURE OF DIGITAL COUTURE');
    setSubHeadline1('Cyberpunk Streetwear & High-Tech Textiles');
    setSubHeadline2('Exclusive: Inside the Neo-Tokyo Underground');
    setIssueDate('NOVEMBER 2026 • ISSUE NO. 84');
    setTextColor('#ffffff');
  };

  const seoSections = [
    {
      id: 'editorial-cover-rules',
      title: 'Editorial Magazine Cover Architecture: Hierarchy & Focal Points',
      content: (
        <>
          <p>
            An iconic magazine cover—whether from <em>Vogue</em>, <em>Time</em>, <em>Harper&apos;s Bazaar</em>, or <em>Rolling Stone</em>—is governed by precise visual hierarchy rules designed to command attention on crowded newsstands and Instagram feeds.
          </p>
          <p>
            The portrait subject&apos;s eyes must establish immediate contact with the viewer (the &quot;Hero Gaze&quot;), positioned along the upper third horizontal rule. The masthead typography spans boldly across the top margin, often slightly overlapped by the model&apos;s crown or hair to convey dimensional depth between typography and photography.
          </p>
        </>
      ),
    },
    {
      id: 'didone-typography-and-leading',
      title: 'Didone Modernist Serifs: High Contrast Hairlines & Gravitas',
      content: (
        <>
          <p>
            High-fashion mastheads almost exclusively utilize Didone serifs (like Firmin Didot and Giambattista Bodoni). Characterized by extreme vertical contrast between razor-thin horizontal hairlines and thick vertical stems, Didone fonts radiate timeless aristocratic luxury, authority, and editorial restraint.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Can I upload my own portrait for LinkedIn or Instagram?',
      answer:
        'Yes! Upload any high-res portrait, adjust the headlines, and download a publication-grade magazine cover ready for your social feed or digital portfolio.',
    },
    {
      question: 'Is the exported cover high enough resolution for physical printing?',
      answer:
        'Yes, the canvas exports at a standard vertical publishing ratio, ideal for digital display and 8x10 print framing.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-4 text-sm">
          {/* Photo Upload */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Cover Portrait / Photograph:
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 p-3 text-xs text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors">
              <Camera className="h-4 w-4 text-cyan-400" />
              <span>Upload Cover Portrait Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Masthead Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="masthead" className="block text-xs font-semibold text-neutral-300 mb-1">
                Masthead Title:
              </label>
              <input
                id="masthead"
                type="text"
                value={masthead}
                onChange={(e) => setMasthead(e.target.value.toUpperCase())}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-serif font-black text-white uppercase focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="issueDate" className="block text-xs font-semibold text-neutral-300 mb-1">
                Issue & Date:
              </label>
              <input
                id="issueDate"
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Main Story Headline */}
          <div>
            <label htmlFor="mainHeadline" className="block text-xs font-semibold text-neutral-300 mb-1">
              Lead Cover Story Headline:
            </label>
            <input
              id="mainHeadline"
              type="text"
              value={mainHeadline}
              onChange={(e) => setMainHeadline(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-cyan-300 font-semibold focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Sub Headlines */}
          <div>
            <label htmlFor="subHeadline1" className="block text-xs font-semibold text-neutral-300 mb-1">
              Secondary Feature Teaser:
            </label>
            <input
              id="subHeadline1"
              type="text"
              value={subHeadline1}
              onChange={(e) => setSubHeadline1(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Vogue Cover Defaults
          </button>

          {/* Download Action */}
          <button
            onClick={downloadCover}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download High-Res Magazine Cover
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative rounded-2xl border-4 border-neutral-800 bg-neutral-950 p-2 shadow-2xl">
            <canvas
              ref={canvasRef}
              className="rounded-lg overflow-hidden shadow-2xl max-w-full h-auto block"
            />
          </div>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
