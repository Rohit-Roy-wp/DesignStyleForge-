'use client';

import React, { useEffect, useState } from 'react';

interface AdBannerProps {
  format: 'leaderboard' | 'in-feed' | 'sidebar' | 'sticky-anchor';
  className?: string;
  slotId?: string;
}

export function AdBanner({ format, className = '', slotId }: AdBannerProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (adClient && typeof window !== 'undefined') {
      try {
        // @ts-expect-error - adsbygoogle is injected by google adsense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [adClient]);

  // If mobile sticky anchor has no live ad, hide it
  if (!adClient && format === 'sticky-anchor') {
    return null;
  }

  // Dimension classes based on format
  const getFormatClasses = () => {
    switch (format) {
      case 'leaderboard':
        return 'w-full max-w-[760px] mx-auto';
      case 'in-feed':
        return 'w-full max-w-4xl mx-auto my-6';
      case 'sidebar':
        return 'w-[300px] min-h-[250px] mx-auto';
      case 'sticky-anchor':
        return 'fixed bottom-0 left-0 right-0 z-50 bg-[var(--app-header-bg)] backdrop-blur-xl border-t border-[var(--app-card-border)] py-1.5 flex items-center justify-center shadow-lg';
      default:
        return 'w-full';
    }
  };

  // Google AdSense render branch (if env variable is set)
  if (adClient && slotId) {
    return (
      <aside
        aria-label="Advertisement"
        className={`relative overflow-hidden rounded-xl border border-[var(--app-card-border)] bg-[var(--app-card)] shadow-xs flex items-center justify-center min-h-[96px] ${getFormatClasses()} ${className}`}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  // Adsterra 728x90 Banner (Unit Key: 916e9f25d6aa919ecb3bd1d2b2af619f)
  const adsterraHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '916e9f25d6aa919ecb3bd1d2b2af619f',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bauval.org/22/916e9f25d6aa919ecb3bd1d2b2af619f"></script>
</body>
</html>`;

  return (
    <aside
      aria-label="Sponsored Advertisement"
      className={`relative overflow-hidden rounded-xl border border-[var(--app-card-border)] bg-[var(--app-card)] transition-colors hover:border-cyan-500/30 shadow-xs flex flex-col items-center justify-center p-2 ${getFormatClasses()} ${className}`}
    >
      <div className="w-full flex items-center justify-between px-2 pb-1.5 text-[9px] font-mono text-[var(--app-text-muted)] opacity-60 uppercase tracking-widest border-b border-[var(--app-card-border)] mb-2">
        <span>Sponsored Banner</span>
        <span>Adsterra • 728×90</span>
      </div>

      <div className="w-full flex items-center justify-center overflow-hidden py-1">
        <div className="flex items-center justify-center overflow-x-auto no-scrollbar max-w-full">
          {mounted ? (
            <iframe
              srcDoc={adsterraHtml}
              width="728"
              height="90"
              className="border-0 overflow-hidden shrink-0 rounded"
              scrolling="no"
              title="Sponsored Advertisement"
              loading="lazy"
            />
          ) : (
            <div className="w-[728px] h-[90px] shrink-0 bg-slate-900/40 rounded flex items-center justify-center text-xs font-mono text-slate-500">
              Loading Advertisement...
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
