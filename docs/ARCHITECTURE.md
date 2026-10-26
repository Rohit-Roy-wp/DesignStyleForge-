# ARCHITECTURE.md — UXForge Technical Architecture

## 1. System Overview

**UXForge** is a high-performance, statically exported developer utility suite delivering 20+ specialized CSS, SVG, and HTML5 Canvas generators. The platform runs entirely inside the user's web browser, adhering to a strict **₹0 / $0 permanent server infrastructure** model.

```
+-----------------------------------------------------------------------------------+
|                                  USER BROWSER                                     |
|                                                                                   |
|  +--------------------+   +-----------------------+   +------------------------+  |
|  |  Interactive UI    |   |  Local Computation    |   |  Hardware Acceleration |  |
|  |  (Next.js App Dir) |-->|  (Web Workers / RAF)  |-->|  (HTML5 Canvas 2D/GL)  |  |
|  +--------------------+   +-----------------------+   +------------------------+  |
|            |                         |                            |               |
|            v                         v                            v               |
|  +-----------------------------------------------------------------------------+  |
|  |                      OUTPUT GENERATION & EXPORT                             |  |
|  |   - Standard CSS declarations (`backdrop-filter`, `@keyframes`, box-shadow) |  |
|  |   - Tailwind CSS arbitrary value classes                                    |  |
|  |   - Vector SVG paths & High-Res 24x nearest-neighbor Canvas PNGs            |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  Static Asset Delivery: Vercel CDN (Edge Caching, Zero Serverless Compute Cost)   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Core Architectural Pillars

### 2.1 Zero-Server Client-Side Compute
- **Zero API Endpoints:** No Node.js serverless functions or backends are triggered for tool operations.
- **Client-Side Image Manipulation:** Canvas convolutions (halftone dots, CRT scanlines, pixel art nearest-neighbor 24x upscaling, duotone matrix filters) run directly in the browser's thread via `ImageData` array buffers and `Uint8ClampedArray`.
- **Procedural Synthesizers:** Audio tools (e.g. Futuristic HUD UI clicks, Retro Winamp sound generator) generate square/sine wave frequencies using hardware-native Web Audio API (`AudioContext`, `OscillatorNode`) without downloading audio assets.

### 2.2 Next.js Static Export Architecture
- Configured via `next.config.ts`:
  ```ts
  output: 'export'
  ```
- **30 Statically Prerendered HTML Pages:**
  - 1 Homepage (`/`)
  - 20 Specialized Tool Pages (`/tools/[slug]`)
  - 4 Compliance & Trust Pages (`/about`, `/contact`, `/privacy-policy`, `/terms`)
  - 5 System routes (`/robots.txt`, `/sitemap.xml`, etc.)
- **Edge CDN Caching:** All assets are immutable static files delivered through Vercel Global Edge CDN with zero cold starts and sub-millisecond response times.

### 2.3 Windows OS & Toolchain Compatibility
- Windows Application Control blocks `@next/swc-win32-x64-msvc` native bindings in local dev environments.
- Architectural invariant:
  - Local Dev: `npx next dev --webpack`
  - Local Build: `npx next build --webpack`
  - Remote CI/CD: Vercel Cloud Build uses native Linux SWC automatically.

---

## 3. Directory & Module Structure

```
DesignStyleForge/
├── docs/                      # Comprehensive System Documentation
│   ├── ARCHITECTURE.md        # Technical design & compute pipelines
│   ├── DESIGN.md              # Design tokens, typography, layout rules
│   ├── MEMORY.md              # Project history, change logs & decisions
│   ├── PRD.md                 # Product requirements & tool matrix
│   ├── RULES.md               # Strict engineering & design standards
│   └── TASK.md                # Milestone status & backlog
├── src/
│   ├── app/                   # Next.js App Router (Static Routes)
│   │   ├── layout.tsx         # Root layout (Fonts, Meta, Theme, Analytics)
│   │   ├── page.tsx           # Studio Workbench & Tool Catalog
│   │   ├── loading.tsx        # Route transition skeleton loaders
│   │   ├── globals.css        # Theme variables & micro-animations
│   │   ├── sitemap.ts         # Automated XML sitemap generation
│   │   ├── robots.ts          # Search crawler directives
│   │   ├── about/             # Brand overview & mission
│   │   ├── contact/           # Ajax FormSubmit integration
│   │   ├── privacy-policy/    # GDPR/CCPA & AdSense compliance
│   │   ├── terms/             # Legal terms of service
│   │   └── tools/             # 20 Individual Tool Modules
│   ├── components/
│   │   ├── ads/               # AdSense responsive ad slots & fallbacks
│   │   ├── common/            # ToolLayout, SeoArticle, FaqAccordion, JsonLd
│   │   ├── home/              # HeroShowcase, ToolCardPreview
│   │   └── layout/            # Header, Footer, ThemeProvider
│   └── data/
│       └── toolsData.ts       # Central source-of-truth metadata registry
```

---

## 4. Performance & Technical SEO Engineering

1. **Font Strategy:**
   - Primary: `Plus_Jakarta_Sans` via `next/font/google` (`display: swap`, variable `--font-sans`).
   - Monospace: `JetBrains_Mono` (`display: swap`, variable `--font-mono`).
   - Zero layout shift (CLS = 0) with automatic font subsetting.
2. **Dynamic JSON-LD Schemas:**
   - Every tool page automatically injects `SoftwareApplication` and `FAQPage` rich schemas into `<head>` for Google search rich snippets.
3. **Analytics & Web Vitals:**
   - Integrated with `@vercel/analytics` measuring LCP, FID, CLS, and INP without tracking cookies.
