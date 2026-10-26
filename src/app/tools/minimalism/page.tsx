'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/common/ToolLayout';
import { CodeBox } from '@/components/common/CodeBox';
import { TOOLS_DATA } from '@/data/toolsData';
import { RefreshCw, ExternalLink, Globe, Smartphone } from 'lucide-react';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export default function MinimalismPage() {
  const tool = TOOLS_DATA.find((t) => t.id === 'minimalism')!;

  const [name, setName] = useState<string>('Alex Rivera');
  const [bio, setBio] = useState<string>('Frontend Architect & Open Source Creator. Building aesthetic digital tools.');
  const [avatarText, setAvatarText] = useState<string>('AR');
  const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'earth' | 'midnight'>('dark');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');

  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', title: 'Portfolio Website', url: 'https://alexrivera.design', icon: '🌐' },
    { id: '2', title: 'GitHub Open Source', url: 'https://github.com/alexrivera', icon: '💻' },
    { id: '3', title: 'Twitter / X Thoughts', url: 'https://x.com/alexrivera', icon: '🐦' },
    { id: '4', title: 'Read My Engineering Blog', url: 'https://blog.alexrivera.dev', icon: '✍️' },
  ]);

  const updateLink = (id: string, field: 'title' | 'url', val: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: val } : l))
    );
  };

  const getThemeStyles = () => {
    switch (themeMode) {
      case 'light':
        return {
          bg: '#f8fafc',
          card: '#ffffff',
          text: '#0f172a',
          subtext: '#64748b',
          border: '#e2e8f0',
          linkHover: '#f1f5f9',
        };
      case 'earth':
        return {
          bg: '#2c2523',
          card: '#3b322f',
          text: '#f5efe6',
          subtext: '#d7c4b7',
          border: '#4a3f3b',
          linkHover: '#4e423d',
        };
      case 'midnight':
        return {
          bg: '#090d16',
          card: '#111827',
          text: '#f3f4f6',
          subtext: '#9ca3af',
          border: '#1f2937',
          linkHover: '#1f293d',
        };
      default: // dark
        return {
          bg: '#0a0a0a',
          card: '#171717',
          text: '#ffffff',
          subtext: '#a3a3a3',
          border: '#262626',
          linkHover: '#262626',
        };
    }
  };

  const st = getThemeStyles();
  const fontClass =
    fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  // Standalone Single-File HTML / CSS export
  const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Links</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: ${st.bg};
      color: ${st.text};
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 48px 16px;
    }
    .container {
      width: 100%;
      max-width: 480px;
      text-align: center;
    }
    .avatar {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: ${st.card};
      border: 2px solid ${st.border};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      margin: 0 auto 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    h1 { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    p.bio { font-size: 14px; color: ${st.subtext}; line-height: 1.5; margin-bottom: 32px; }
    .links-stack { display: flex; flex-direction: column; gap: 14px; }
    .link-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: ${st.card};
      border: 1px solid ${st.border};
      border-radius: 14px;
      color: ${st.text};
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .link-card:hover {
      background: ${st.linkHover};
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }
    .footer { margin-top: 40px; font-size: 11px; color: ${st.subtext}; }
  </style>
</head>
<body>
  <div class="container">
    <div class="avatar">${avatarText}</div>
    <h1>${name}</h1>
    <p class="bio">${bio}</p>
    <div class="links-stack">
      ${links
        .map(
          (l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="link-card">
        <span>${l.icon} ${l.title}</span>
        <span>&rarr;</span>
      </a>`
        )
        .join('\n      ')}
    </div>
    <div class="footer">Created with UXForge</div>
  </div>
</body>
</html>`;

  const resetDefaults = () => {
    setName('Alex Rivera');
    setBio('Frontend Architect & Open Source Creator. Building aesthetic digital tools.');
    setAvatarText('AR');
    setThemeMode('dark');
    setFontFamily('sans');
  };

  const seoSections = [
    {
      id: 'why-minimalist-bio-link',
      title: 'The Advantage of Minimalist Single-File Bio Links over Heavy Aggregators',
      content: (
        <>
          <p>
            Traditional bio link services (such as Linktree or Beacons) load heavy tracking pixels, intrusive third-party cookie scripts, marketing analytics bundles, and promotional branding that degrade page performance. For creators, influencers, and developers, a 1-second delay in page load time directly translates into a <strong>20% drop in profile click-through rate</strong>.
          </p>
          <p>
            By contrast, a pure single-file HTML/CSS bio link page has a payload of less than <strong>4 Kilobytes</strong>, loads in under <strong>80 milliseconds</strong>, scores a perfect <strong>100/100 on Google Lighthouse</strong>, and can be hosted completely free on GitHub Pages, Vercel, or Netlify.
          </p>
        </>
      ),
    },
    {
      id: 'typography-and-spacing-principles',
      title: 'Typography & Spacing Principles of Clean Digital Portfolios',
      content: (
        <>
          <p>
            Minimalist web design is not the absence of elements, but the presence of absolute intention. To make a simple link list look executive and polished:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Generous Touch Targets:</strong> Links must have a minimum height of 48px to comply with WCAG mobile touch target recommendations.</li>
            <li><strong>Micro-Elevation Transitions:</strong> Subtle 2px upward translation on hover signals interactivity without gaudy animations.</li>
            <li><strong>Subdued Monochromatic Contrast:</strong> A dark slate background paired with off-white text reduces eye strain and emphasizes user photography.</li>
          </ul>
        </>
      ),
    },
  ];

  const faqs = [
    {
      question: 'Where can I host this standalone HTML file for free?',
      answer:
        'You can host it on GitHub Pages, Netlify Drop, Vercel, or Cloudflare Pages with zero monthly fees forever. Simply save the file as index.html and upload it.',
    },
    {
      question: 'Can I add custom social icons or SVG icons?',
      answer:
        'Yes! You can either use standard emojis as shown in the editor or replace the emoji text with inline SVG icons like FontAwesome or Lucide in the exported HTML.',
    },
  ];

  return (
    <ToolLayout
      tool={tool}
      controls={
        <div className="space-y-4 text-sm">
          {/* Profile Name & Initials */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label htmlFor="name" className="block text-xs font-semibold text-neutral-300 mb-1">
                Display Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="avatarText" className="block text-xs font-semibold text-neutral-300 mb-1">
                Avatar Initials:
              </label>
              <input
                id="avatarText"
                type="text"
                maxLength={3}
                value={avatarText}
                onChange={(e) => setAvatarText(e.target.value.toUpperCase())}
                className="w-full text-center rounded-xl border border-neutral-800 bg-neutral-950 px-2 py-1.5 text-xs font-bold text-cyan-400 focus:border-cyan-500 focus:outline-none uppercase"
              />
            </div>
          </div>

          {/* Bio text */}
          <div>
            <label htmlFor="bio" className="block text-xs font-semibold text-neutral-300 mb-1">
              Short Bio / Tagline:
            </label>
            <textarea
              id="bio"
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Theme Palette */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Color Aesthetic:
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {(['dark', 'light', 'earth', 'midnight'] as const).map((thm) => (
                <button
                  key={thm}
                  onClick={() => setThemeMode(thm)}
                  className={`rounded-lg py-1.5 font-medium capitalize transition-all ${
                    themeMode === thm
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  {thm}
                </button>
              ))}
            </div>
          </div>

          {/* Editable Links */}
          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <label className="block text-xs font-semibold text-neutral-300">
              Social & Project Links (4):
            </label>
            {links.map((link) => (
              <div
                key={link.id}
                className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-2.5 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{link.icon}</span>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                    placeholder="Link Title"
                    className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs text-white focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1 text-[11px] font-mono text-neutral-400 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Reset Action */}
          <button
            onClick={resetDefaults}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to Default Bio
          </button>
        </div>
      }
      preview={
        <div className="w-full flex items-center justify-center py-4">
          {/* Smartphone Bezel Mockup */}
          <div className="relative w-72 rounded-[36px] border-4 border-neutral-800 bg-black p-3 shadow-2xl">
            {/* Phone Speaker Notch */}
            <div className="mx-auto mb-3 h-3.5 w-24 rounded-full bg-neutral-900 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-700"></span>
            </div>

            {/* Phone Screen Area */}
            <div
              style={{
                backgroundColor: st.bg,
                color: st.text,
              }}
              className={`rounded-[26px] p-5 text-center min-h-[400px] flex flex-col justify-between transition-colors ${fontClass}`}
            >
              <div>
                {/* Avatar Circle */}
                <div
                  style={{
                    backgroundColor: st.card,
                    borderColor: st.border,
                    color: st.text,
                  }}
                  className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 text-lg font-black shadow-md"
                >
                  {avatarText}
                </div>

                <h3 className="text-base font-bold tracking-tight">{name}</h3>
                <p
                  style={{ color: st.subtext }}
                  className="mt-1 text-[11px] leading-relaxed line-clamp-2"
                >
                  {bio}
                </p>

                {/* Links Stack */}
                <div className="mt-4 space-y-2">
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: st.card,
                        borderColor: st.border,
                        color: st.text,
                      }}
                      className="flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold shadow-xs hover:scale-102 transition-transform"
                    >
                      <span className="truncate">
                        {link.icon} {link.title}
                      </span>
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-60 ml-1" />
                    </a>
                  ))}
                </div>
              </div>

              <div
                style={{ color: st.subtext }}
                className="mt-4 text-[9px] font-mono tracking-wider"
              >
                100% LIGHTHOUSE SPEED
              </div>
            </div>
          </div>
        </div>
      }
      codeOutput={
        <CodeBox
          title="Single-File HTML & CSS Bundle"
          tabs={[
            {
              id: 'html',
              label: 'index.html',
              language: 'html',
              code: standaloneHtml,
              filename: 'index.html',
            },
          ]}
        />
      }
      seoSections={seoSections}
      faqs={faqs}
    />
  );
}
