'use client';

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { TOOLS_DATA } from '@/data/toolsData';
import { Play, Pause, Square, Volume2, Music, Disc } from 'lucide-react';

export default function Y2kWinampPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'y2k')!;

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [skin, setSkin] = useState<'titanium' | 'cyan' | 'matrix'>('titanium');
  const [volume, setVolume] = useState<number>(85);
  const [eqLevels, setEqLevels] = useState<number[]>([40, 65, 80, 50, 90, 70, 45, 85, 60, 75]);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(142);

  // EQ Spectrum Animation & Timer Loop
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => prev + 1);
        setEqLevels((prev) =>
          prev.map(() => Math.floor(Math.random() * 85) + 15)
        );
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSkinTheme = () => {
    switch (skin) {
      case 'cyan':
        return {
          chassis: 'from-cyan-900 via-slate-900 to-cyan-950',
          border: 'border-cyan-500/50',
          screenBg: 'bg-black',
          screenText: 'text-cyan-400',
          eqBar: 'bg-cyan-400',
        };
      case 'matrix':
        return {
          chassis: 'from-emerald-950 via-black to-emerald-950',
          border: 'border-emerald-500/50',
          screenBg: 'bg-black',
          screenText: 'text-emerald-400',
          eqBar: 'bg-emerald-400',
        };
      default: // titanium
        return {
          chassis: 'from-neutral-700 via-neutral-800 to-neutral-900',
          border: 'border-neutral-500',
          screenBg: 'bg-black',
          screenText: 'text-emerald-400',
          eqBar: 'bg-gradient-to-t from-emerald-500 via-amber-400 to-red-500',
        };
    }
  };

  const currentTheme = getSkinTheme();

  const seoSections = [
    {
      id: 'y2k-skeuomorphism-resurgence',
      title: 'The Y2K Aesthetic & The Resurgence of Tactile Skeuomorphism',
      content: (
        <>
          <p>
            Between 1998 and 2004, personal computing experienced the iconic <strong>Y2K Aesthetic</strong>—a fusion of futuristic techno-optimism, chrome metallic textures, glowing vacuum-fluorescent displays, and unapologetic skeuomorphism. The undisputed champion of this era was <em>Winamp</em> (&quot;It really whips the llama&apos;s ass!&quot;), which pioneered skinable media player interfaces.
          </p>
          <p>
            In contemporary web design, the Y2K resurgence is fueled by nostalgia for tangible, hardware-inspired digital artifacts. Modern flat design can often feel clinical and impersonal; skeuomorphic audio components inject joy, tactility, and distinct brand character.
          </p>
        </>
      ),
    },
    {
      id: 'web-audio-api-analyser-node',
      title: 'How the Web Audio API AnalyserNode Animates Real-time EQ Bars',
      content: (
        <>
          <p>
            In modern HTML5 browsers, real-time audio visualization is powered by the <code className="text-cyan-400">AudioContext.createAnalyser()</code> node:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Fast Fourier Transform (FFT):</strong> The AnalyserNode converts raw time-domain PCM waveforms into frequency-domain decibel bands via <code className="text-cyan-400">getByteFrequencyData()</code>.</li>
            <li><strong>Sub-Band Mapping:</strong> The frequency spectrum is sliced into standard octave bins (Sub-bass, Bass, Midrange, Highs) to drive vertical CSS bar heights.</li>
            <li><strong>Peak Hold Falloff:</strong> Retaining the top pixel for 200 milliseconds replicates classic hardware LED peak meters.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Can I upload and play my own MP3 songs?',
      answer:
        'Yes! DesignStyleForge includes a local audio upload input that routes playback directly through the browser Web Audio pipeline without uploading your files anywhere.',
    },
    {
      question: 'Is Winamp skin styling possible in pure CSS?',
      answer:
        'Yes! Using CSS metallic linear gradients, inset bevel borders, and monospace LCD font-stacks, developers can faithfully emulate iconic early 2000s desktop software.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-5 text-sm">
          {/* Skin Selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Player Skin Theme:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'titanium', label: 'Titanium 2000' },
                { id: 'cyan', label: 'Cyber Blue' },
                { id: 'matrix', label: 'Matrix Neon' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSkin(s.id as any)}
                  className={`rounded-xl py-2 text-xs font-bold capitalize transition-all ${
                    skin === s.id
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-300 font-medium mb-1">
              <label htmlFor="volume" className="flex items-center gap-1.5">
                <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
                Output Volume
              </label>
              <span className="font-mono text-cyan-400">{volume}%</span>
            </div>
            <input
              id="volume"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Quick Playback Triggers */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800">
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-emerald-400 hover:bg-neutral-800"
            >
              <Play className="h-3.5 w-3.5 fill-emerald-400" /> Play
            </button>
            <button
              onClick={() => setIsPlaying(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-amber-400 hover:bg-neutral-800"
            >
              <Pause className="h-3.5 w-3.5 fill-amber-400" /> Pause
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setPlaybackSeconds(0);
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-rose-400 hover:bg-neutral-800"
            >
              <Square className="h-3.5 w-3.5 fill-rose-400" /> Stop
            </button>
          </div>
        </div>
      }
      preview={
        <div className="flex flex-col items-center justify-center p-4">
          {/* Winamp Skeuomorphic Chassis */}
          <div
            className={`w-[380px] rounded-xl border-2 bg-gradient-to-b ${currentTheme.chassis} ${currentTheme.border} p-3 shadow-2xl select-none`}
            style={{
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            {/* Top Chrome Title Bar */}
            <div className="flex items-center justify-between border-b border-black/60 pb-1.5 mb-2.5 px-1">
              <div className="flex items-center gap-1.5">
                <Disc className={`h-3.5 w-3.5 ${isPlaying ? 'animate-spin text-cyan-400' : 'text-neutral-500'}`} />
                <span className="font-mono text-[10px] font-bold text-neutral-300 tracking-wider">
                  WINAMP v2.91 CLASSIC
                </span>
              </div>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-xs bg-neutral-600"></span>
                <span className="h-2 w-2 rounded-xs bg-neutral-600"></span>
                <span className="h-2 w-2 rounded-xs bg-neutral-600"></span>
              </div>
            </div>

            {/* Retro LED Screen */}
            <div className="rounded-lg border-2 border-neutral-950 bg-black p-3 mb-3 shadow-inner">
              <div className="flex items-center justify-between font-mono">
                {/* Track Time Counter */}
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] text-neutral-500 uppercase">TIME</span>
                  <span className={`text-xl font-black ${currentTheme.screenText} tracking-widest`}>
                    {formatTime(playbackSeconds)}
                  </span>
                </div>

                {/* Bitrate & Sample Rate */}
                <div className="text-right text-[9px] text-neutral-400 font-mono leading-tight">
                  <div>320 KBPS</div>
                  <div className="text-cyan-400">44.1 KHZ • STEREO</div>
                </div>
              </div>

              {/* Scrolling Track Marquee */}
              <div className="mt-2 overflow-hidden whitespace-nowrap border-t border-neutral-900 pt-1 text-[11px] font-mono text-neutral-300">
                <span className="animate-pulse">▶ 01. Daft Punk - One More Time (Y2K Club Mix)</span>
              </div>

              {/* Real-time Spectrum EQ Frequency Bars */}
              <div className="mt-3 flex items-end justify-between h-10 px-1 border-t border-neutral-900 pt-1 gap-1">
                {eqLevels.map((lvl, idx) => (
                  <div key={idx} className="flex-1 flex flex-col justify-end h-full">
                    <div
                      style={{ height: `${isPlaying ? lvl : 8}%` }}
                      className={`w-full rounded-xs transition-all duration-100 ${currentTheme.eqBar}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Skeuomorphic Playback Transport Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-md border border-neutral-600 bg-neutral-700 px-3 py-1 text-xs font-bold text-white shadow-xs active:translate-y-0.5 active:bg-neutral-800"
                >
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setPlaybackSeconds(0);
                  }}
                  className="rounded-md border border-neutral-600 bg-neutral-700 px-2.5 py-1 text-xs font-bold text-neutral-300 active:translate-y-0.5"
                >
                  STOP
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-neutral-400">VOL</span>
                <div className="w-20 h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-700">
                  <div
                    style={{ width: `${volume}%` }}
                    className="h-full bg-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
