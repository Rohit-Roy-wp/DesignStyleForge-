'use client';

import React, { useState } from 'react';
import { Check, Copy, Download, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface CodeTab {
  id: string;
  label: string;
  language: string;
  code: string;
  filename?: string;
}

interface CodeBoxProps {
  tabs: CodeTab[];
  title?: string;
}

export function CodeBox({ tabs, title = 'Generated Output' }: CodeBoxProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleCopy = async () => {
    if (!activeTab) return;
    try {
      await navigator.clipboard.writeText(activeTab.code);
      setCopied(true);
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b'],
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    if (!activeTab) return;
    const blob = new Blob([activeTab.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeTab.filename || `${activeTab.id}-code.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!activeTab) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/90 shadow-2xl backdrop-blur">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-800/80 bg-neutral-900/60 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-300">
            <Code2 className="h-3.5 w-3.5 text-cyan-400" />
            {title}
          </span>
        </div>

        {/* Tab Switcher & Actions */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <div className="flex items-center rounded-lg bg-neutral-800/80 p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  activeTabId === tab.id
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownload}
            title="Download file"
            className="flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800/60 px-2.5 py-1 text-xs text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-800"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Save</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-cyan-600 text-white hover:bg-cyan-500 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Text Area */}
      <div className="relative p-4">
        <pre className="max-h-72 overflow-x-auto overflow-y-auto font-mono text-xs leading-relaxed text-cyan-200/90 selection:bg-cyan-500/30">
          <code>{activeTab.code}</code>
        </pre>
      </div>
    </div>
  );
}
