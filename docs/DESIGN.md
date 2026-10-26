# DESIGN.md — UXForge Design System & Human-Craft Guidelines

## 1. Design Philosophy

UXForge is built as an authentic **developer's studio workbench** rather than an AI-generated marketing landing page. The design prioritizes **density, utilitarian elegance, and spatial precision**.

```
Anti-AI Marketing Template            UXForge Developer Workbench
--------------------------------      -----------------------------------
- 72px center-aligned hype copy       - Grounded, left-aligned utility header
- Giant empty side margins            - Wide fluid layout (max-w-[1600px])
- Floating purple/pink radial orbs    - Crisp structural borders & matte canvas
- Emojis as button icons              - Semantic SVG developer icons
- Bouncy transforms everywhere        - Instant 150ms border transitions
- Sparkles icons                      - Clean monospace & geometric branding
```

---

## 2. Typography Hierarchy

| Role | Font Family | Weights | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Sans Primary** | `Plus Jakarta Sans` | 500, 600, 700, 800 | Tight (`1.1` - `1.25`) | Headers, labels, button text, body paragraphs |
| **Mono Technical**| `JetBrains Mono` | 400, 500, 700 | Normal (`1.4` - `1.6`) | Code blocks, CSS properties, tags, metrics, badge chips |

---

## 3. Color Tokens & Theme System

The design system uses CSS custom properties defined in `globals.css` with seamless switching between Dark and Light modes:

```css
/* Dark Mode Palette (Default) */
:root, html.dark {
  --app-bg: #090a0f;              /* Deep matte slate canvas */
  --app-bg-secondary: #0f121a;    /* Elevated surface */
  --app-text: #f1f5f9;            /* High-contrast crisp foreground */
  --app-text-muted: #94a3b8;      /* Secondary label gray */
  --app-card: rgba(15, 19, 28, 0.85);
  --app-card-border: rgba(255, 255, 255, 0.08);
  --app-card-hover-border: rgba(6, 182, 212, 0.5); /* Electric cyan focal */
  --app-input-bg: #0f121a;
}

/* Light Mode Palette */
html.light {
  --app-bg: #f8fafc;              /* Soft off-white (no harsh glare) */
  --app-bg-secondary: #f1f5f9;
  --app-text: #0f172a;            /* Deep ink slate */
  --app-text-muted: #64748b;
  --app-card: #ffffff;
  --app-card-border: #e2e8f0;
  --app-card-hover-border: #cbd5e1;
  --app-input-bg: #f8fafc;        /* Tinted input to avoid blinding white */
}
```

---

## 4. Layout & Grid Architecture

### 4.1 Fluid Screen Real Estate
- Maximum container bounds: **`max-w-[1600px]`** (eliminating the generic 1280px bottleneck).
- Edge-to-edge structural density with clean horizontal separation lines (`border-b border-[var(--app-card-border)]`).

### 4.2 Split Workbench Hero
- **Left Column (6 cols):**
  - Left-aligned title: `CSS & Canvas Code Studio`
  - Integrated Search & Jump input
  - Technical specs line with monospace metrics
- **Right Column (6 cols):**
  - Live interactive specimen lab flush with search controls

### 4.3 High-Density 4-Column Catalog
- Responsive breakdown:
  - Mobile: `grid-cols-1`
  - Tablet: `grid-cols-2`
  - Laptop: `grid-cols-3`
  - Widescreen (1280px+): `grid-cols-4` (maximum space utilization, zero empty voids)

---

## 5. Strict Anti-AI Design Rules

1. **No Sparkles Icons:** Never use `Sparkles` as brand logos or decorations. Use semantic icons (`Wrench`, `Layers`, `Terminal`).
2. **No Emojis as Icons:** Replace all emoji badges (`✦`, `⚡`, `👾`) with monospace text badges or SVG icons.
3. **No Radial Orbs / Blobs:** No floating blurred gradient spheres behind headers.
4. **No Bouncy Transforms:** No `translateY(-3px)` or `hover:scale-105` on passive cards. Use crisp `border-color` transitions.
5. **No Em Dashes (`—`):** Use colons (`:`) or hyphens (`-`) for clean technical formatting.
6. **No "It's not X, it's Y" Copy:** Use direct, authoritative technical prose.
