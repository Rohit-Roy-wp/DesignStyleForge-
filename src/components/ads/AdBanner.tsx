'use client';

import React, { useEffect } from 'react';

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

  // Dimension classes based on format
  const getFormatClasses = () => {
    switch (format) {
      case 'leaderboard':
        return 'w-full max-w-[728px] min-h-[90px] mx-auto';
      case 'in-feed':
        return 'w-full min-h-[110px] max-w-4xl mx-auto my-8';
      case 'sidebar':
        return 'w-[300px] min-h-[250px] mx-auto';
      case 'sticky-anchor':
        return 'fixed bottom-0 left-0 right-0 z-50 bg-[var(--app-header-bg)] backdrop-blur-xl border-t border-[var(--app-card-border)] py-2 flex items-center justify-center shadow-lg';
      default:
        return 'w-full min-h-[90px]';
    }
  };

  return (
    <aside
      aria-label="Advertisement"
      className={`relative overflow-hidden rounded-2xl border border-dashed border-[var(--app-card-border)] bg-[var(--app-card)] backdrop-blur-md text-center transition-all duration-300 hover:border-cyan-500/40 shadow-xs flex items-center justify-center ${getFormatClasses()} ${className}`}
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
        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-xs">
          <div className="inline-flex items-center gap-2 mb-1.5 px-3 py-1 rounded-full border border-[var(--app-card-border)] bg-[var(--app-input-bg)] shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold forge-text">
              Sponsor / Ad Space
            </span>
          </div>
          <p className="forge-text-muted text-[11px] sm:text-xs font-medium">
            {format === 'in-feed'
              ? 'High-CTR In-Feed Placement • Ready for AdSense / Direct Sponsors'
              : format === 'leaderboard'
              ? 'Leaderboard 728×90 • Contextual Display Banner'
              : format === 'sticky-anchor'
              ? 'Sticky Mobile Anchor Ad Slot'
              : 'Sidebar Display 300×250'}
          </p>
        </div>
      )}
    </aside>
  );
}
