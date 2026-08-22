# Vanta — Architecture & Design Decisions

This document records architectural, UX, and implementation choices made during development.

---

## 1. Core Architecture & Deployment
- **Decision:** Next.js (App Router) with static export (`output: 'export'`) + GitHub Pages.
- **Why:** Zero runtime server costs, maximum edge cache performance, fully static output.
- **Trade-off:** No server actions or dynamic server-side rendering. All search and filtering must execute client-side.

---

## 2. Visual Identity & Atmosphere
- **Decision:** Deep Obsidian Palette (`#080808` background, `#121212` surface, hairlines `rgba(255,255,255,0.08)`).
- **Accent:** Technical Amber (`#E5A93C`) for active items and core definitions.
- **Atmospheric Canvas:** Raw WebGL2 full-screen shader at `z-index: 0` with `pointer-events: none`.
  - Half-resolution buffer (`0.5x`) throttled to 30 FPS.
  - Pauses on `prefers-reduced-motion` and hidden document visibility.
- **Typography:** `Geist Sans` for reading prose (max 68ch line length) and `Geist Mono` / `JetBrains Mono` for code, tags, and breadcrumbs.

---

## 3. Navigation & Content Hierarchy
- **Hierarchy:** `Semester (1-6) → Subject → Unit → Topic/Note`.
- **Layout:** Two-panel layout on desktop (collapsible tree sidebar + sticky breadcrumbs/header). Slide-out drawer on mobile viewports.
- **Active State:** Solid amber left indicator on current tree node with auto-scroll into view.

---

## 4. Markdown & Semantic Callouts
- **Parser Engine:** `react-markdown` + `remark-gfm` + `rehype-highlight`.
- **Custom Callouts:** Obsidian-style blockquote directives:
  - `[!definition]` — Amber accent (`#E5A93C`)
  - `[!valid]` — Emerald accent (`#10B981`)
  - `[!invalid]` — Rose accent (`#F43F5E`)
  - `[!compare]` — Side-by-side flex card on desktop, vertical stack on mobile.

---

## 5. Client Search & Performance
- **Approach:** In-memory lightweight index created at build time, filtered client-side via fuzzy matching.
- **Why:** Keeps bundle tiny without heavy search library overhead.
