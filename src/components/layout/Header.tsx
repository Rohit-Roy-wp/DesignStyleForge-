'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Sun, Moon, Menu, X, Compass, Layers, Palette, Search } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { TOOLS_DATA } from '@/data/toolsData';

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = searchQuery.trim()
    ? TOOLS_DATA.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.categoryShort.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--app-card-border)] bg-[var(--app-header-bg)] backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 group min-w-0 shrink">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="truncate">
              <span className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1 font-sans truncate">
                <span className="forge-text">DesignStyle</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 font-extrabold">
                  Forge
                </span>
              </span>
              <span className="hidden sm:block text-[9px] font-mono forge-text-muted -mt-1 tracking-widest uppercase truncate">
                20+ Aesthetic Code Engines
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (visible on lg: 1024px+ to avoid tablet cramping) */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === '/'
                  ? 'text-cyan-500 font-bold bg-cyan-500/10 border border-cyan-500/20'
                  : 'forge-text-muted hover:forge-text'
              }`}
            >
              All Tools (20)
            </Link>
            <Link
              href="/#css-generators"
              className="px-3 py-1.5 rounded-lg forge-text-muted hover:forge-text transition-colors flex items-center gap-1.5"
            >
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              CSS
            </Link>
            <Link
              href="/#canvas-images"
              className="px-3 py-1.5 rounded-lg forge-text-muted hover:forge-text transition-colors flex items-center gap-1.5"
            >
              <Palette className="h-3.5 w-3.5 text-amber-400" />
              Canvas
            </Link>
            <Link
              href="/#typography-audio"
              className="px-3 py-1.5 rounded-lg forge-text-muted hover:forge-text transition-colors flex items-center gap-1.5"
            >
              <Compass className="h-3.5 w-3.5 text-purple-400" />
              Typography
            </Link>
          </nav>

          {/* Right Actions: Search + Interactive Theme Toggle + Mobile/Tablet Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] h-8 w-8 sm:h-auto sm:w-auto px-0 sm:px-3 py-0 sm:py-1.5 text-xs forge-text-muted hover:border-cyan-500/50 hover:forge-text transition-all shadow-xs"
              title="Search tools"
              aria-label="Search tools"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search styles...</span>
              <kbd className="hidden sm:inline-block rounded border border-[var(--app-card-border)] px-1.5 py-0.2 text-[10px] font-mono">
                /
              </kbd>
            </button>

            {/* High-Visibility Animated Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center gap-1.5 rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] h-8 w-8 sm:h-auto sm:w-auto px-0 sm:px-2.5 py-0 sm:py-1.5 text-xs font-semibold forge-text shadow-xs hover:border-cyan-500/50 active:scale-95 transition-all cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`}
              aria-label="Toggle Theme Mode"
            >
              <div className="relative flex items-center justify-center">
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0" />
                ) : (
                  <Moon className="h-4 w-4 text-indigo-500 transition-transform duration-300 rotate-0" />
                )}
              </div>
              <span className="hidden sm:inline text-[11px] font-mono capitalize">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
            </button>

            {/* Mobile & Tablet menu trigger (visible on < 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] forge-text hover:border-cyan-500/50 transition-colors"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--app-card-border)] bg-[var(--app-header-bg)] px-4 py-4 space-y-2 backdrop-blur-xl">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium forge-text hover:bg-[var(--app-bg-secondary)]"
            >
              All Tools Directory (20)
            </Link>
            <Link
              href="/#css-generators"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium forge-text hover:bg-[var(--app-bg-secondary)]"
            >
              CSS & UI Generators
            </Link>
            <Link
              href="/#canvas-images"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium forge-text hover:bg-[var(--app-bg-secondary)]"
            >
              Canvas & Image Studios
            </Link>
            <Link
              href="/#typography-audio"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium forge-text hover:bg-[var(--app-bg-secondary)]"
            >
              Typography & Audio Labs
            </Link>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-20 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-bg)] p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--app-card-border)] pb-3 mb-3">
              <div className="flex items-center gap-2 forge-text">
                <Search className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold">Search Design Tools</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-lg p-1 forge-text-muted hover:forge-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              placeholder="e.g. Glassmorphism, Cyberpunk, Pixel Art, Y2K..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-4 py-2.5 text-sm forge-text placeholder-[var(--app-text-muted)] focus:border-cyan-500 focus:outline-none"
            />

            <div className="mt-4 max-h-72 overflow-y-auto space-y-2">
              {searchQuery.trim() === '' ? (
                <p className="text-center text-xs forge-text-muted py-6">
                  Type tool name or design style above to jump directly.
                </p>
              ) : filteredTools.length === 0 ? (
                <p className="text-center text-xs forge-text-muted py-6">
                  No tools found matching &quot;{searchQuery}&quot;
                </p>
              ) : (
                filteredTools.map((t) => (
                  <Link
                    key={t.id}
                    href={t.route}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] p-3 hover:border-cyan-500/50 hover:bg-[var(--app-bg-secondary)] transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold forge-text">{t.name}</h4>
                      <p className="text-xs forge-text-muted">{t.subtitle}</p>
                    </div>
                    <span className="rounded bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-medium text-cyan-400">
                      {t.categoryShort}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
