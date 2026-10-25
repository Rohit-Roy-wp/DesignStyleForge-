'use client';

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { Compass, Volume2, VolumeX, Crosshair, Radio, RefreshCw } from 'lucide-react';

export default function FuturisticHudPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'futuristic')!;

  const [hudColor, setHudColor] = useState<string>('#00f0ff'); // Cyan
  const [targetLock, setTargetLock] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [altitude, setAltitude] = useState<number>(34280);
  const [telemetryTime, setTelemetryTime] = useState<string>('00:00:00');

  // Realtime Telemetry Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTelemetryTime(now.toTimeString().split(' ')[0]);
      setAltitude((prev) => prev + (Math.floor(Math.random() * 20) - 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio API Synthesizer Beep
  const playHudBeep = () => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.error(e);
    }
  };

  const cssCode = `/* Sci-Fi HUD Radar Sweep Animation */
.hud-radar-sweep {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 1px solid ${hudColor};
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px ${hudColor}33;
}

.hud-radar-sweep::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: conic-gradient(from 0deg, ${hudColor}66 0deg, transparent 60deg);
  transform-origin: top left;
  animation: radarRotate 4s linear infinite;
}

@keyframes radarRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`;

  const seoSections = [
    {
      id: 'history-of-sci-fi-huds',
      title: 'Diegetic UI & Sci-Fi HUD Architecture: From Star Wars to Iron Man',
      content: (
        <>
          <p>
            A <strong>Heads-Up Display (HUD)</strong> projects vital telemetry, targeting reticles, navigation vectors, and sensor data directly onto a transparent visor or cockpit windshield. Popularized by seminal fictional technologies—from <em>Iron Man&apos;s</em> holographic JARVIS interface to <em>Minority Report</em> and <em>Mass Effect</em>—HUD design represents the holy grail of futuristic UI aesthetics.
          </p>
          <p>
            In modern frontend web engineering, HUD components are deployed in cryptocurrency dashboards, defense simulators, esports livestreams, and cutting-edge gaming web portals to evoke high-tech mastery and precision engineering.
          </p>
        </>
      ),
    },
    {
      id: 'css-conic-gradients-radar',
      title: 'Engineering 60fps Radar Sweeps with CSS Conic Gradients',
      content: (
        <>
          <p>
            Traditional radar sweep animations required costly canvas redraws or heavy GIF assets. With modern CSS, developers can achieve silky 60fps GPU-accelerated sweeps using:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Conic-Gradient Emitters:</strong> <code className="text-cyan-400">conic-gradient(from 0deg, color 0deg, transparent 60deg)</code> creates the signature fading light trail.</li>
            <li><strong>Circular Origin Rotation:</strong> Anchoring the transform-origin at the geometric center allows pure <code className="text-cyan-400">transform: rotate(360deg)</code> keyframes without triggering layout reflows.</li>
            <li><strong>Glow Filter Halos:</strong> Wrapping vectors in <code className="text-cyan-400">drop-shadow(0 0 8px color)</code> delivers true holographic luminescence.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'How does the Web Audio synthesizer work without external MP3 files?',
      answer:
        'DesignStyleForge uses the browser-native Web Audio API to procedurally generate a high-frequency sine wave oscillator directly in hardware, resulting in zero network downloads.',
    },
    {
      question: 'Can I customize the HUD color to amber or crimson?',
      answer:
        'Yes! Use the color picker to instantly switch between Tactical Cyan, Alert Crimson, or Imperial Amber.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* HUD Accent Color */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Hologram HUD Color:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hudColor}
                onChange={(e) => setHudColor(e.target.value)}
                className="h-8 w-12 cursor-pointer rounded border border-neutral-700 bg-transparent"
              />
              <span className="font-mono text-xs text-neutral-400 uppercase">{hudColor}</span>
            </div>
          </div>

          {/* Audio Telemetry Toggle */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Acoustic Telemetry Beep</span>
              <span className="text-[11px] text-neutral-400">Synthesizes Web Audio oscillator FX</span>
            </div>
            <button
              onClick={() => {
                const next = !audioEnabled;
                setAudioEnabled(next);
                if (next) playHudBeep();
              }}
              className={`p-2 rounded-lg transition-colors ${
                audioEnabled ? 'bg-cyan-500 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>

          {/* Target Lock Reticle Toggle */}
          <div className="pt-2 border-t border-neutral-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-300">
              <input
                type="checkbox"
                checked={targetLock}
                onChange={(e) => {
                  setTargetLock(e.target.checked);
                  playHudBeep();
                }}
                className="rounded border-neutral-700 accent-cyan-400"
              />
              Engage Target Lock Reticle
            </label>
          </div>

          {/* Interactive Trigger Button */}
          <button
            onClick={playHudBeep}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-cyan-800/60 bg-cyan-950/40 py-2.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60 transition-colors"
          >
            <Radio className="h-3.5 w-3.5 text-cyan-400" />
            Ping Sensor Sweep
          </button>
        </div>
      }
      preview={
        <div className="relative w-full h-80 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#04060c] p-6 border border-neutral-800 select-none">
          {/* Circular Coordinate Compass */}
          <div
            style={{
              borderColor: `${hudColor}44`,
              boxShadow: `0 0 20px ${hudColor}1a`,
            }}
            className="relative flex items-center justify-center h-52 w-52 rounded-full border border-dashed"
          >
            {/* Center Radar Sweep */}
            <div
              style={{
                borderColor: `${hudColor}66`,
              }}
              className="relative h-40 w-40 rounded-full border overflow-hidden"
            >
              {/* Rotating conic sweep */}
              <div
                style={{
                  background: `conic-gradient(from 0deg, ${hudColor}55 0deg, transparent 60deg)`,
                }}
                className="absolute inset-0 origin-center animate-spin"
              />

              {/* Concentric rings */}
              <div
                style={{ borderColor: `${hudColor}33` }}
                className="absolute inset-4 rounded-full border"
              />
              <div
                style={{ borderColor: `${hudColor}33` }}
                className="absolute inset-8 rounded-full border"
              />

              {/* Center crosshair dot */}
              <span
                style={{ backgroundColor: hudColor }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full shadow-lg shadow-cyan-400"
              />
            </div>

            {/* Target Reticle if enabled */}
            {targetLock && (
              <div
                style={{ color: hudColor }}
                className="absolute -top-2 right-4 flex items-center gap-1 text-[9px] font-mono font-bold animate-pulse"
              >
                <Crosshair className="h-3.5 w-3.5" />
                <span>LOCK ACQUIRED</span>
              </div>
            )}
          </div>

          {/* Telemetry Readouts Bottom Bar */}
          <div className="mt-4 flex items-center justify-between w-full max-w-sm px-4 font-mono text-[10px]">
            <span style={{ color: hudColor }}>
              SYS TIME: {telemetryTime} UTC
            </span>
            <span style={{ color: hudColor }}>
              ALT: {altitude} FT
            </span>
            <span style={{ color: hudColor }}>
              STATUS: NOMINAL
            </span>
          </div>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Sci-Fi HUD CSS & Keyframe Code"
          tabs={[
            {
              id: 'css',
              label: 'CSS Conic Radar',
              language: 'css',
              code: cssCode,
              filename: 'scifi-hud.css',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
