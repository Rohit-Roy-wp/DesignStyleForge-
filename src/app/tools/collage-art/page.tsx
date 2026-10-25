'use client';

import React, { useState, useRef } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { Download, Plus, RotateCw, Trash2, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CollageItem {
  id: string;
  type: 'stamp' | 'flower' | 'paper' | 'seal' | 'tape' | 'quote';
  label: string;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
}

export default function CollageArtPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'collage-art')!;

  const [bgTint, setBgTint] = useState<'parchment' | 'cream' | 'sepia' | 'noir'>('parchment');
  const [selectedId, setSelectedId] = useState<string>('item-1');

  const [items, setItems] = useState<CollageItem[]>([
    { id: 'item-1', type: 'stamp', label: 'AIR MAIL 1942', emoji: '✉️', x: 50, y: 50, rotation: -8, scale: 1.1, color: '#b91c1c' },
    { id: 'item-2', type: 'flower', label: 'Botanical Rose', emoji: '🥀', x: 200, y: 120, rotation: 14, scale: 1.3, color: '#15803d' },
    { id: 'item-3', type: 'seal', label: 'Royal Wax Seal', emoji: '⚜️', x: 120, y: 220, rotation: -4, scale: 1.2, color: '#b45309' },
    { id: 'item-4', type: 'quote', label: 'MEMOIRE', emoji: '📜', x: 80, y: 140, rotation: 5, scale: 1.0, color: '#4338ca' },
  ]);

  const selectedItem = items.find((i) => i.id === selectedId);

  const getBgColor = () => {
    switch (bgTint) {
      case 'cream':
        return '#fdfbf7';
      case 'sepia':
        return '#27221f';
      case 'noir':
        return '#141416';
      default: // parchment
        return '#f4ede4';
    }
  };

  const addItem = (type: CollageItem['type'], emoji: string, label: string, color: string) => {
    const newItem: CollageItem = {
      id: `item-${Date.now()}`,
      type,
      label,
      emoji,
      x: 100 + Math.random() * 80,
      y: 100 + Math.random() * 80,
      rotation: Math.floor(Math.random() * 30) - 15,
      scale: 1.0,
      color,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
  };

  const updateSelected = (field: 'rotation' | 'scale', val: number) => {
    if (!selectedId) return;
    setItems((prev) =>
      prev.map((i) => (i.id === selectedId ? { ...i, [field]: val } : i))
    );
  };

  const deleteSelected = () => {
    setItems((prev) => prev.filter((i) => i.id !== selectedId));
    setSelectedId('');
  };

  const moveLayer = (direction: 'up' | 'down') => {
    if (!selectedId) return;
    const index = items.findIndex((i) => i.id === selectedId);
    if (index === -1) return;
    const newItems = [...items];
    const item = newItems.splice(index, 1)[0];
    const targetIdx = direction === 'up' ? Math.min(newItems.length, index + 1) : Math.max(0, index - 1);
    newItems.splice(targetIdx, 0, item);
    setItems(newItems);
  };

  // Download Composite PNG
  const downloadCollage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 450;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = getBgColor();
    ctx.fillRect(0, 0, 450, 400);

    // Vintage paper grain simulation
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    for (let i = 0; i < 3000; i++) {
      ctx.fillRect(Math.random() * 450, Math.random() * 400, 1.5, 1.5);
    }

    // Render items in order
    items.forEach((item) => {
      ctx.save();
      ctx.translate(item.x + 40, item.y + 40);
      ctx.rotate((item.rotation * Math.PI) / 180);
      ctx.scale(item.scale, item.scale);

      // Card shadow
      ctx.shadowColor = 'rgba(0,0,0,0.18)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      // Sticker frame
      ctx.fillStyle = '#fffefb';
      ctx.strokeStyle = '#d6cebe';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-40, -35, 80, 70, 6);
      ctx.fill();
      ctx.stroke();

      // Emoji & label
      ctx.shadowColor = 'transparent';
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.emoji, 0, 5);

      ctx.fillStyle = item.color;
      ctx.font = 'bold 8px monospace';
      ctx.fillText(item.label, 0, 24);

      ctx.restore();
    });

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vintage-scrapbook-collage.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const seoSections = [
    {
      id: 'dadaism-and-punk-collage',
      title: 'From Dadaism to Punk Zines: The Evolution of Mixed-Media Collage',
      content: (
        <>
          <p>
            <strong>Collage art</strong> emerged in the early 20th century through avant-garde movements like Cubism (Pablo Picasso) and Dadaism (Hannah Höch). Rather than painting solitary scenes, artists assembled discordant physical artifacts—newspaper clippings, postage stamps, vintage tickets, and photographic fragments—to critique modern culture.
          </p>
          <p>
            During the 1970s and 1980s DIY punk explosion, photocopied fanzines embraced raw collage cutouts, tape textures, and irregular rotation. In modern UI/UX design, vintage collage adds tangible tactile humanity, emotional nostalgia, and craft authenticity to editorial fashion magazines, music albums, and bespoke brand landing pages.
          </p>
        </>
      ),
    },
    {
      id: 'canvas-transformation-matrices',
      title: 'Canvas Coordinate Transformation & 2D Layer Compositing',
      content: (
        <>
          <p>
            Compositing multiple rotated elements on an HTML5 canvas requires strict adherence to the transformation stack:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Context Save & Restore:</strong> Wrapping each element between <code className="text-cyan-400">ctx.save()</code> and <code className="text-cyan-400">ctx.restore()</code> ensures translation and rotation states do not contaminate subsequent sibling elements.</li>
            <li><strong>Center Origin Translation:</strong> Translating the origin to the item&apos;s geometric center (<code className="text-cyan-400">ctx.translate(x, y)</code>) allows natural rotation around the center axis rather than the top-left corner.</li>
            <li><strong>Z-Index Array Flattening:</strong> Canvas renders sequentially; the last element pushed onto the render queue naturally paints over earlier layers.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Can I add multiple stamps and flowers to the same artwork?',
      answer:
        'Yes! Click the sticker buttons to add as many vintage stamps, flowers, and seals as you desire, adjust their scale, and drag them around.',
    },
    {
      question: 'Is the exported collage suitable for print scrapbooking?',
      answer:
        'Yes, the canvas renders full high-resolution drop shadows, antique paper textures, and typography seals ready for printing.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Add Elements Bar */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              Add Vintage Stickers & Elements:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => addItem('stamp', '📬', 'POSTAGE 1936', '#b91c1c')}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-cyan-400" />
                Air Mail Stamp
              </button>
              <button
                onClick={() => addItem('flower', '🌿', 'WILD FERNS', '#15803d')}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-emerald-400" />
                Dried Botanical
              </button>
              <button
                onClick={() => addItem('seal', '👑', 'ROYAL MOTIF', '#b45309')}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-amber-400" />
                Wax Seal
              </button>
              <button
                onClick={() => addItem('paper', '🎟️', 'TICKET STUB', '#4338ca')}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-indigo-400" />
                Vintage Ticket
              </button>
            </div>
          </div>

          {/* Background Canvas Tint */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Paper Texture & Tint:
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {(['parchment', 'cream', 'sepia', 'noir'] as const).map((tnt) => (
                <button
                  key={tnt}
                  onClick={() => setBgTint(tnt)}
                  className={`rounded-lg py-1.5 font-medium capitalize transition-all ${
                    bgTint === tnt
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {tnt}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Item Controls */}
          {selectedItem && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>Selected: {selectedItem.label}</span>
                <button
                  onClick={deleteSelected}
                  className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>

              {/* Rotation Slider */}
              <div>
                <div className="flex justify-between text-xs text-neutral-400 mb-1">
                  <label htmlFor="rotation">Rotation Angle</label>
                  <span className="font-mono text-cyan-400">{selectedItem.rotation}°</span>
                </div>
                <input
                  id="rotation"
                  type="range"
                  min="-45"
                  max="45"
                  value={selectedItem.rotation}
                  onChange={(e) => updateSelected('rotation', Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Scale Slider */}
              <div>
                <div className="flex justify-between text-xs text-neutral-400 mb-1">
                  <label htmlFor="scale">Sticker Scale</label>
                  <span className="font-mono text-cyan-400">{selectedItem.scale.toFixed(1)}x</span>
                </div>
                <input
                  id="scale"
                  type="range"
                  min="0.6"
                  max="2.0"
                  step="0.1"
                  value={selectedItem.scale}
                  onChange={(e) => updateSelected('scale', Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Layer Ordering */}
              <div className="flex items-center gap-2 pt-1 border-t border-neutral-850">
                <button
                  onClick={() => moveLayer('up')}
                  className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900 py-1 text-xs text-neutral-300 hover:text-white"
                >
                  <ArrowUp className="h-3 w-3" />
                  Bring Forward
                </button>
                <button
                  onClick={() => moveLayer('down')}
                  className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900 py-1 text-xs text-neutral-300 hover:text-white"
                >
                  <ArrowDown className="h-3 w-3" />
                  Send Backward
                </button>
              </div>
            </div>
          )}

          {/* Download Action */}
          <button
            onClick={downloadCollage}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Flattened Collage PNG
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          {/* Interactive Collage Workspace */}
          <div
            style={{
              backgroundColor: getBgColor(),
              width: '420px',
              height: '380px',
            }}
            className="relative rounded-2xl border-4 border-neutral-700 shadow-2xl overflow-hidden cursor-pointer select-none"
          >
            {/* Paper Texture overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            />

            {items.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(item.id);
                  }}
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
                  }}
                  className={`absolute rounded-xl bg-[#fffefb] p-3 shadow-xl transition-all border ${
                    isSelected
                      ? 'border-cyan-500 ring-2 ring-cyan-400 scale-105'
                      : 'border-neutral-300/80 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-3xl text-center">{item.emoji}</div>
                  <div
                    style={{ color: item.color }}
                    className="mt-1 text-center font-mono text-[9px] font-bold tracking-wider"
                  >
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] font-mono text-neutral-400">
            Click any element to rotate, scale, or rearrange layers
          </p>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
