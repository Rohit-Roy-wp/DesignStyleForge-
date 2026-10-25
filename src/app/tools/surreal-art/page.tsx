'use client';

import React, { useState, useRef } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { Download, Plus, RotateCw, Trash2, Eye, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurrealElement {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export default function SurrealArtPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'surreal-art')!;

  const [atmosphere, setAtmosphere] = useState<'twilight' | 'void' | 'emerald' | 'eclipse'>('twilight');
  const [fogDensity, setFogDensity] = useState<number>(35);
  const [selectedId, setSelectedId] = useState<string>('elem-1');

  const [elements, setElements] = useState<SurrealElement[]>([
    { id: 'elem-1', emoji: '👁️', label: 'Cosmic Eye', x: 160, y: 70, scale: 1.5, rotation: 0 },
    { id: 'elem-2', emoji: '🌙', label: 'Crescent Moon', x: 260, y: 40, scale: 1.2, rotation: -15 },
    { id: 'elem-3', emoji: '🪜', label: 'Celestial Ladder', x: 120, y: 190, scale: 1.3, rotation: 8 },
    { id: 'elem-4', emoji: '☁️', label: 'Dream Cloud', x: 60, y: 130, scale: 1.4, rotation: -5 },
  ]);

  const selectedElem = elements.find((e) => e.id === selectedId);

  const getAtmosphereGradient = () => {
    switch (atmosphere) {
      case 'void':
        return 'linear-gradient(to bottom, #050508 0%, #0d0f18 60%, #171728 100%)';
      case 'emerald':
        return 'linear-gradient(to bottom, #022c22 0%, #064e3b 50%, #0f172a 100%)';
      case 'eclipse':
        return 'linear-gradient(to bottom, #450a0a 0%, #78350f 60%, #0f172a 100%)';
      default: // twilight
        return 'linear-gradient(to bottom, #1e1b4b 0%, #312e81 40%, #701a75 80%, #09090b 100%)';
    }
  };

  const addElement = (emoji: string, label: string) => {
    const newElem: SurrealElement = {
      id: `elem-${Date.now()}`,
      emoji,
      label,
      x: 120 + Math.random() * 80,
      y: 100 + Math.random() * 80,
      scale: 1.2,
      rotation: Math.floor(Math.random() * 30) - 15,
    };
    setElements((prev) => [...prev, newElem]);
    setSelectedId(newElem.id);
  };

  const updateSelected = (field: 'rotation' | 'scale', val: number) => {
    if (!selectedId) return;
    setElements((prev) =>
      prev.map((e) => (e.id === selectedId ? { ...e, [field]: val } : e))
    );
  };

  const deleteSelected = () => {
    setElements((prev) => prev.filter((e) => e.id !== selectedId));
    setSelectedId('');
  };

  // High-Res Artwork Export
  const downloadArtwork = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background sky
    const grad = ctx.createLinearGradient(0, 0, 0, 400);
    if (atmosphere === 'void') {
      grad.addColorStop(0, '#050508');
      grad.addColorStop(1, '#171728');
    } else if (atmosphere === 'emerald') {
      grad.addColorStop(0, '#022c22');
      grad.addColorStop(1, '#0f172a');
    } else if (atmosphere === 'eclipse') {
      grad.addColorStop(0, '#450a0a');
      grad.addColorStop(1, '#0f172a');
    } else {
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(0.6, '#701a75');
      grad.addColorStop(1, '#09090b');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 440, 400);

    // Desert surreal horizon ground
    ctx.fillStyle = '#0a0a14';
    ctx.beginPath();
    ctx.ellipse(220, 360, 260, 70, 0, 0, Math.PI * 2);
    ctx.fill();

    // Render surreal elements
    elements.forEach((el) => {
      ctx.save();
      ctx.translate(el.x + 30, el.y + 30);
      ctx.rotate((el.rotation * Math.PI) / 180);
      ctx.scale(el.scale, el.scale);

      ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
      ctx.shadowBlur = 16;
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(el.emoji, 0, 10);
      ctx.restore();
    });

    // Fog overlay
    if (fogDensity > 0) {
      const fogGrad = ctx.createLinearGradient(0, 260, 0, 400);
      fogGrad.addColorStop(0, 'rgba(255,255,255,0)');
      fogGrad.addColorStop(1, `rgba(255,255,255,${(fogDensity / 200).toFixed(2)})`);
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 260, 440, 140);
    }

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `surreal-dreamscape-${atmosphere}.png`;
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
      id: 'history-of-surrealism',
      title: 'The Metaphysical Dreamscape: From Dalí & Magritte to Digital Art',
      content: (
        <>
          <p>
            <strong>Surrealism</strong> was established in 1924 by poet André Breton, seeking to liberate the human subconscious, unlock dream logic, and transcend rigid rationalism. Renowned masters like Salvador Dalí, René Magritte, and Giorgio de Chirico juxtaposed realistic objects in impossible, poetic configurations: melting clocks draped across desolate shorelines, solitary floating eyes gazing through clouds, and staircases reaching toward infinite voids.
          </p>
          <p>
            In contemporary digital art, 3D motion design, and album artworks, surrealism provides endless wonder, challenging viewers&apos; perceptions of reality and spatial dimension.
          </p>
        </>
      ),
    },
    {
      id: 'lighting-and-metaphor',
      title: 'Metaphorical Lighting & Atmospheric Fog in Composition',
      content: (
        <>
          <p>
            A compelling surrealist artwork relies on dramatic contrast between celestial cosmic illumination and earthly shadows. Layering atmospheric ground fog softens the boundary where impossible geometry intersects the horizon, creating the psychological illusion that the floating motifs truly inhabit an otherworldly physical realm.
          </p>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'What are the most popular symbols in surrealist composition?',
      answer:
        'Floating cosmic eyes (symbolizing awareness), crescent moons (the unconscious mind), infinite staircases (transcendence), and melting clocks (relativity of time) are timeless surreal motifs.',
    },
    {
      question: 'Can I export the artwork with transparent background?',
      answer:
        'The dreamscape canvas exports complete with the rich atmospheric gradient sky and horizon mist, ready for digital wallpaper or print framing.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Add Surreal Motifs */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              Summon Surrealist Motifs:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => addElement('👁️', 'Cosmic Eye')}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-cyan-400" />
                Floating Eye 👁️
              </button>
              <button
                onClick={() => addElement('⏳', 'Melting Hourglass')}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-amber-400" />
                Hourglass ⏳
              </button>
              <button
                onClick={() => addElement('🪜', 'Celestial Ladder')}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-indigo-400" />
                Ladder 🪜
              </button>
              <button
                onClick={() => addElement('🌙', 'Crescent Moon')}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-neutral-300 hover:border-cyan-500 hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-purple-400" />
                Crescent Moon 🌙
              </button>
            </div>
          </div>

          {/* Atmosphere Palette */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Dream Atmosphere:
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {(['twilight', 'void', 'emerald', 'eclipse'] as const).map((atm) => (
                <button
                  key={atm}
                  onClick={() => setAtmosphere(atm)}
                  className={`rounded-lg py-1.5 font-medium capitalize transition-all ${
                    atmosphere === atm
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {atm}
                </button>
              ))}
            </div>
          </div>

          {/* Fog Density Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="fogDensity">Atmospheric Horizon Mist</label>
              <span className="font-mono text-cyan-400">{fogDensity}%</span>
            </div>
            <input
              id="fogDensity"
              type="range"
              min="0"
              max="70"
              value={fogDensity}
              onChange={(e) => setFogDensity(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Selected Motif Controls */}
          {selectedElem && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>Selected: {selectedElem.label} {selectedElem.emoji}</span>
                <button
                  onClick={deleteSelected}
                  className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs text-neutral-400 mb-1">
                  <label htmlFor="surrealRotation">Rotation Angle</label>
                  <span className="font-mono text-cyan-400">{selectedElem.rotation}°</span>
                </div>
                <input
                  id="surrealRotation"
                  type="range"
                  min="-45"
                  max="45"
                  value={selectedElem.rotation}
                  onChange={(e) => updateSelected('rotation', Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-neutral-400 mb-1">
                  <label htmlFor="surrealScale">Motif Scale</label>
                  <span className="font-mono text-cyan-400">{selectedElem.scale.toFixed(1)}x</span>
                </div>
                <input
                  id="surrealScale"
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={selectedElem.scale}
                  onChange={(e) => updateSelected('scale', Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          )}

          {/* Download Action */}
          <button
            onClick={downloadArtwork}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Surreal Artwork PNG
          </button>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          <div
            style={{
              background: getAtmosphereGradient(),
              width: '420px',
              height: '380px',
            }}
            className="relative rounded-2xl border-4 border-neutral-700 shadow-2xl overflow-hidden cursor-pointer select-none"
          >
            {/* Metaphysical Horizon Ground */}
            <div className="absolute -bottom-16 -left-10 -right-10 h-36 rounded-[100%] bg-neutral-950 shadow-inner" />

            {/* Atmosphere Mist Overlay */}
            {fogDensity > 0 && (
              <div
                style={{
                  background: `linear-gradient(to top, rgba(255,255,255,${fogDensity / 250}), transparent)`,
                }}
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
              />
            )}

            {elements.map((el) => {
              const isSelected = el.id === selectedId;
              return (
                <div
                  key={el.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(el.id);
                  }}
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    transform: `rotate(${el.rotation}deg) scale(${el.scale})`,
                  }}
                  className={`absolute p-2 transition-transform cursor-pointer ${
                    isSelected ? 'ring-2 ring-cyan-400 rounded-2xl bg-white/10 backdrop-blur-xs' : ''
                  }`}
                >
                  <span className="text-4xl filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]">
                    {el.emoji}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] font-mono text-neutral-400">
            Click any surreal motif to rotate or scale
          </p>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
