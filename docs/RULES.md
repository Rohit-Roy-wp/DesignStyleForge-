# RULES.md — Engineering & Governance Standards

## 1. Non-Negotiable Operational Rules

1. **NEVER Push Code Autonomously:**
   - The AI agent must NEVER run `git push origin main` or any push commands.
   - All code updates must remain local on the user's workstation.
   - The user will inspect, test in the browser, and push manually.

2. **Zero Server Cost Guarantee:**
   - Every single feature, generator, filter, and synthesizer must operate 100% client-side in the browser thread.
   - Never add serverless functions, Node.js API routes (`/api/*`), or cloud databases.
   - The build output MUST always remain `output: 'export'`.

3. **Windows CLI Execution Standards:**
   - Because Windows Application Control blocks native Next.js SWC bindings:
     - Always run: `npx next dev --webpack`
     - Always test build with: `npx next build --webpack`
     - Never remove the `--webpack` flag in local commands.

---

## 2. Anti-AI Design & Styling Guidelines

1. **No Sparkles or Wand Icons:** Use functional tools (`Wrench`, `Layers`, `Terminal`, `Sliders`).
2. **No Floating Radial Orbs:** Avoid oversized blurred colored circles behind sections.
3. **No 72px Center-Aligned Marketing Copy:** Maintain left-to-right density like Raycast or Linear.
4. **No Emojis as Functional Icons:** Do not use `⚡`, `✦`, `🔥` as interface bullets. Use monospace font chips.
5. **No Em Dashes (`—`):** Format technical titles with colons (`:`) or hyphens (`-`).
6. **No Clashing Rainbow Gradients:** Keep base backgrounds deep slate/graphite, with a single surgical focal accent (Electric Cyan).
7. **Widescreen Real Estate:** Always design for `max-w-[1600px]` with 4-column catalog density rather than 1280px narrow boxes.

---

## 3. Code Quality & React Standards

1. **Inline Style Invariant:**
   - Never pair shorthand `background` with `backgroundImage`.
   - Always use `backgroundColor` alongside `backgroundImage`.
2. **Hydration Safety:**
   - Always retain `<body suppressHydrationWarning>` in `src/app/layout.tsx` to handle browser extension attribute injections (`cz-shortcut-listen`, ColorZilla).
3. **TypeScript Discipline:**
   - Maintain zero TypeScript errors across all 30 routes during static page generation.
   - Keep centralized data structures in `src/data/toolsData.ts`.
