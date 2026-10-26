# PRD.md — Product Requirements Document

## 1. Executive Summary

**UXForge** is a free, web-based developer utility platform providing 20+ specialized CSS, SVG, and HTML5 Canvas tools. The product addresses developer frustration with fragmented, ad-bloated, paywalled, or login-gated CSS utility websites by offering a consolidated, lightning-fast, zero-login studio that runs completely inside the browser.

---

## 2. Target Audience & Personas

1. **Frontend Engineers (React, Next.js, Vue, Svelte):**
   - Need rapid CSS snippets, Tailwind classes, and SVG paths without manually tweaking pixel values in DevTools.
2. **UI/UX Designers & Design Engineers:**
   - Need tactile, visual sandboxes to explore micro-styles (Glassmorphism, Cyberpunk, 3D Clay, Aurora gradients).
3. **Indie Hackers & Content Creators:**
   - Need quick social assets (8-bit pixel art, CRT scanline mockups, minimalist bio-links).

---

## 3. Core Feature Requirements & Tool Matrix

### 3.1 Module A: UI & CSS Generators
| Tool Name | Route | Core Functionality | Export Formats |
| :--- | :--- | :--- | :--- |
| **Frosted Glass Builder** | `/tools/glassmorphism/` | Backdrop blur, tint opacity, specular highlight | CSS, Tailwind |
| **Neon Glitch Text Gen** | `/tools/cyberpunk/` | Chromatic aberration, keyframe animations | CSS `@keyframes` |
| **3D Clay Button Builder** | `/tools/claymorphism/` | Dual inset shadows, light angle, depth | CSS box-shadow |
| **Aurora Mesh Gradient** | `/tools/aurora/` | Multi-point radial mesh emitters | CSS background |
| **Fluid Typography Calc** | `/tools/editorial/` | Viewport clamp formula calculator | CSS `clamp()` |

### 3.2 Module B: Canvas & Image Processing
| Tool Name | Route | Core Functionality | Export Formats |
| :--- | :--- | :--- | :--- |
| **8-Bit Pixel Art Studio** | `/tools/pixel-art/` | Grid canvas, palette selector, 24x upscale | PNG (Retina sharp) |
| **CRT Scanlines Simulator**| `/tools/retro/` | Scanlines, phosphor glow, barrel distortion | PNG, CSS overlay |
| **Pop-Art Halftone Maker** | `/tools/pop-art/` | Dot radius, angle offset, CMYK simulation | PNG, SVG |
| **Surreal Dada Collage**   | `/tools/surreal-art/` | Multi-layer canvas collage assembler | PNG download |
| **Bohemian Floral Canvas** | `/tools/bohemian/` | Procedural organic textures and stamps | PNG download |
| **Vintage Victorian Seal** | `/tools/victorian/` | Monogram generator, ornate borders | SVG, PNG |

### 3.3 Module C: Typography, Layout & Audio
| Tool Name | Route | Core Functionality | Export Formats |
| :--- | :--- | :--- | :--- |
| **Y2K Retro Winamp Player**| `/tools/y2k/` | Local MP3 audio visualizer & vintage skin | Functional player |
| **Swiss International Grid**| `/tools/swiss-design/` | Strict asymmetric typographic grid | CSS Grid |
| **Urban Graffiti Stencil** | `/tools/graffiti/` | Drip physics, spray noise, grunge layers | PNG, SVG |
| **Calligraphic Signature** | `/tools/handwritten/` | Smooth bezier curve pressure simulation | SVG vector |
| **Minimalist Bio-Link**    | `/tools/minimalism/` | Clean personal profile page generator | Standalone HTML |
| **Futuristic HUD UI**      | `/tools/futuristic/` | Telemetry reticles + Web Audio SFX | CSS, Web Audio |
| **Maximalist Sticker Bomb**| `/tools/maximalism/` | Rotational jitter, sticker layering | PNG download |
| **Vector Badge Designer**  | `/tools/vector-art/` | Geometric emblems, ribbon banners | SVG download |
| **Collage Art Assembler**  | `/tools/collage-art/` | Avant-garde paper and texture layers | PNG download |

---

## 4. Monetization & Business Strategy

1. **₹0 / $0 Cost Model:**
   - Zero database, zero API compute, zero cloud storage costs. 100% static hosting on Vercel Free Tier.
2. **Google AdSense Display Ads:**
   - 4 High-CTR standard slots built into the architecture:
     - Top Leaderboard (`728x90` / responsive)
     - Mid-page In-Feed (`max-w-4xl`)
     - Sidebar Rectangle (`300x250`)
     - Mobile Sticky Anchor (activates automatically once approved)
3. **Organic Acquisition Channels:**
   - Programmatic Technical SEO (each tool page contains 400+ words of technical guides, browser compatibility tables, and JSON-LD schemas).
   - Developer Communities (Dev.to published backlink, Reddit `r/SideProject`, `r/webdev`).
