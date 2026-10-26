# MEMORY.md — UXForge Project Evolution & Decision Log

## 1. Project Context & Origins

- **Project:** UXForge (originally created as DesignStyleForge)
- **Live URL:** `https://uxforge.vercel.app/`
- **Repository:** `https://github.com/Rohit-Roy-wp/DesignStyleForge-.git`
- **Owner Support:** `dailystudyhindi@gmail.com`
- **Tech Stack:** Next.js 15+ (App Router), React 19, Tailwind CSS v4, Lucide Icons, Vercel Web Analytics.

---

## 2. Key Chronological Milestones

### Phase 1: Core Engine & 20 Generators Build
- Architected all 20 tools under 3 modules (CSS Generators, Canvas & Image Processing, Typography & Audio).
- Enforced pure client-side execution using HTML5 Canvas `ImageData` and Web Audio API oscillators.
- Configured static export (`output: 'export'`) for zero-cost hosting.

### Phase 2: Branding Synchronization & Monetization Readiness
- Rebranded platform name consistently across all 30 routes from `DesignStyleForge` to `UXForge`.
- Implemented high-trust compliance pages:
  - `/privacy-policy`: Explicit GDPR, CCPA, and Google AdSense cookie disclaimers.
  - `/terms`: Commercial rights and intellectual property terms.
  - `/about`: Platform mission and client-side architecture.
  - `/contact`: Activated live FormSubmit AJAX endpoint delivering directly to `dailystudyhindi@gmail.com`.
- Added AdSense-ready responsive slots (`leaderboard`, `in-feed`, `sidebar`, `sticky-anchor`) with automated non-obstructive fallbacks when no AdSense ID is set.

### Phase 3: Google Search Console Verification & Sitemap Ingestion
- Injected Google verification token `CujcaDk-RkvuftzKsrgu-z5wXSvOdeLDMN94H03OGS0` in root metadata.
- Successfully verified domain ownership on Google Search Console.
- Submitted `sitemap.xml` containing all 30 clean production URLs.
- Requested priority crawl indexing for root homepage.

### Phase 4: Anti-AI UI Overhaul & Developer Studio Redesign
- Comprehensive audit against 30 AI-generated tells.
- **Font Modernization:** Switched from generic `Inter` to `Plus Jakarta Sans` paired with `JetBrains Mono`.
- **Hero Transformation:** Replaced centered 72px marketing headline with an industrial **Left-Right Split Workbench**:
  - Left: Clean title, integrated search input, technical specs line.
  - Right: Live interactive specimen sandbox flush with workbench.
- **Glassmorphism Specimen Fix:** Added contrasting substrate geometry and grid to make real-time `backdrop-filter: blur(16px)` visibly refract.
- **Widescreen Real Estate Expansion:**
  - Expanded all containers from `max-w-7xl` (1280px) to fluid `max-w-[1600px]`.
  - Upgraded tools directory from 3-columns to a dense **4-column catalog** on wide screens.
- **Complete AI Purge:** Removed all Sparkles icons, radial glowing orbs, bouncy transforms, and emojis from technical tags.

---

## 3. Critical Architectural Learnings & Invariants

1. **Windows Webpack Invariant:**
   - On Windows, always run dev and build with `--webpack` flag:
     `npx next dev --webpack` and `npx next build --webpack`.
   - Never use Turbopack locally on this machine due to blocked native SWC DLL bindings.
2. **React Inline Style Shorthand Rule:**
   - Never mix shorthand `background` with longhand `backgroundImage`. Always use `backgroundColor` alongside `backgroundImage` to prevent DOM rerender reconciliation warnings.
3. **Manual Push Commitment:**
   - All code edits must be verified locally by the user. The AI assistant must NEVER execute `git push` autonomously.
