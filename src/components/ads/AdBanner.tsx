'use client';

import React, { useEffect } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface AdBannerProps {
  format: 'leaderboard' | 'in-feed' | 'sidebar' | 'sticky-anchor';
  className?: string;
  slotId?: string;
}

export function AdBanner({ format, className = '', slotId }: AdBannerProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (adClient && typeof window !== 'undefined') {
      try {
        // @ts-expect-error - adsbygoogle is injected by google adsense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // adsbygoogle push error handling
        console.error('AdSense error:', e);
      }
    }
  }, [adClient]);

  // If mobile sticky anchor has no live ad client, do not obstruct user's mobile screen
  if (!adClient && format === 'sticky-anchor') {
    return null;
  }

  // Dimension classes based on format
  const getFormatClasses = () => {
    switch (format) {
      case 'leaderboard':
        return 'w-full max-w-[728px] min-h-[80px] mx-auto';
      case 'in-feed':
        return 'w-full min-h-[90px] max-w-4xl mx-auto my-6';
      case 'sidebar':
        return 'w-[300px] min-h-[250px] mx-auto';
      case 'sticky-anchor':
        return 'fixed bottom-0 left-0 right-0 z-50 bg-[var(--app-header-bg)] backdrop-blur-xl border-t border-[var(--app-card-border)] py-2 flex items-center justify-center shadow-lg';
      default:
        return 'w-full min-h-[80px]';
    }
  };

  return (
    <aside
      aria-label="Advertisement or Pro-Tip"
      className={`relative overflow-hidden rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 shadow-xs flex items-center justify-center ${getFormatClasses()} ${className}`}
    >
      {adClient && slotId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-between flex-wrap gap-3 px-4 sm:px-6 py-3.5 text-xs text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold forge-text text-xs sm:text-sm flex items-center gap-1.5 flex-wrap">
                <span>Quick Tip: Press</span>
                <kbd className="px-1.5 py-0.2 rounded border border-[var(--app-card-border)] bg-[var(--app-input-bg)] font-mono text-[10px] font-bold">
                  /
                </kbd>
                <span>to search 20+ frontend styles instantly</span>
              </p>
              <p className="forge-text-muted text-[11px] mt-0.5">
                Client-side generation • 1-click CSS & Tailwind copy
              </p>
            </div>
          </div>
          <a
            href="https://github.com/Rohit-Roy-wp/DesignStyleForge-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] hover:border-cyan-500/50 hover:forge-text transition-colors text-[11px] sm:text-xs font-semibold forge-text-muted shrink-0"
          >
            <span>⭐ Star on GitHub</span>
          </a>
        </div>
      )}
    </aside>
  );
}
