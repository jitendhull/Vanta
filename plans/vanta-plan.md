# Vanta — Static BCA Notes Library & Design System Plan

**Document Version:** 4.0.0 (Design-System & Static Architecture)  
**Status:** Approved for Implementation  
**Project:** Vanta (Obsidian + Kernill inspired BCA Digital Notes Library)  
**Scope:** University project for BCA students — zero auth, zero backend, 100% static on GitHub Pages.  
**Design References:**
- Atmospheric & Shader: [kernill.neocities.org](https://kernill.neocities.org/) (Dark, quiet, WebGL2 fluid deform, technical)
- Functional & Layout: [notes-bca.neocities.org](https://notes-bca.neocities.org/) (Two-panel layout, left-accent cards, top-right download, client search)

---

## 1. Design Token System & Visual Identity

### A. Color Palette (Obsidian + Purposeful Semantic Accents)
- **Background Base:** `#080808` (Deep obsidian black)
- **Surface / Card:** `#121212` (Subtle elevated container)
- **Border / Separators:** `rgba(255, 255, 255, 0.08)` (Ultra-thin crisp hairlines)
- **Text Primary:** `#EDEDED` (High contrast, readable body)
- **Text Muted / Meta:** `#888888` (Hierarchy, breadcrumbs, tags)
- **Primary Brand Accent:** `#E5A93C` (Technical Amber/Gold — active tree items, primary actions)
- **Semantic Callout Borders (Left-accent bars, 3px):**
  - **Definition / Core Concept:** `#E5A93C` (Amber)
  - **Valid / Theorem / Rule:** `#10B981` (Emerald Green)
  - **Invalid / Pitfall / Warning:** `#F43F5E` (Rose/Red)
  - **Example / Syntax:** `#60A5FA` (Technical Blue)

### B. Typography Hierarchy
- **Display & Monospace Accent:** `Geist Mono` / `JetBrains Mono`
  - Used for: Breadcrumbs, semester/unit tags, code snippets, search bar, metadata.
- **Reading & Prose Body:** `Geist Sans` / `Inter`
  - Used for: Note titles, explanations, readable definitions, tables.
- **Prose Constraint:** Max line width capped at $68\text{ch}$ for effortless reading.

### C. Signature Element
- **Native WebGL2 Atmospheric Shader:**
  - Full-screen `<canvas>` at `z-index: 0`, `pointer-events: none`.
  - Subtle fluid/simplex warp reacting softly to cursor/touch coordinates.
  - Downscaled buffer (`0.5x`), strictly capped at 30fps, pauses on `prefers-reduced-motion` and background tab.

---

## 2. Layout & UI Structure

### Desktop Layout (Two-Panel)
```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ ✦ VANTA // BCA ARCHIVE          [ Search notes / topics (Ctrl+K)... ]      GitHub / Info│
├─────────────────────────┬───────────────────────────────────────────────────────────────┤
│                         │  BCA › Sem-1 › Maths Foundations › Unit-1 › Set Operations     │
│ [Search Tree Filter...] │  ──────────────────────────────────────────────────────────── │
│                         │  Set Operations & Venn Diagrams              [ Download PDF ] │
│ ▾ BCA                   │                                                               │
│   ▾ Semester 1          │  ┌ [Amber Bar] ─────────────────────────────────────────────┐ │
│     ▾ Discrete Maths    │  │ Definition: Union of Sets (A ∪ B)                        │ │
│       ▾ Unit 1: Sets    │  │ The set containing all elements belonging to A or B...   │ │
│         • 1. Set Basics │  └──────────────────────────────────────────────────────────┘ │
│         • 2. Operations │                                                               │
│     ▸ Programming in C  │  ┌ [Emerald] ───────────────┐ ┌ [Rose] ─────────────────────┐ │
│   ▸ Semester 2          │  │ Valid Set Properties     │ │ Invalid / Counter-example   │ │
│   ▸ Semester 3          │  │ A ∪ ∅ = A (Identity)     │ │ {1, 2, 2, 3} (Not distinct) │ │
│   ▸ Semester 4          │  └──────────────────────────┘ └─────────────────────────────┘ │
│   ▸ Semester 5          │                                                               │
│   ▸ Semester 6          │  [ Single continuous scroll — no fragmented pagination ]    │
└─────────────────────────┴───────────────────────────────────────────────────────────────┘
```

### Mobile Layout (Slide-out Drawer)
- **Header:** Compact top-bar with `[☰]` menu button + current subject name + `[Download]` icon button.
- **Drawer:** Smooth slide-out menu carrying the identical tree hierarchy + quick search filter.
- **Content:** Single-column responsive layout; side-by-side comparison cards stack gracefully.

---

## 3. Tech Stack & Repository Architecture

| Layer | Choice | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ (`output: 'export'`) | Static site generation (SSG) for instant zero-server deployment. |
| **Hosting** | GitHub Pages | Free, edge-cached, automated build on push via GitHub Actions. |
| **Styling** | Tailwind CSS + CSS Variables | Utility-first obsidian tokens and semantic callout cards. |
| **Content Store** | `content/` (Markdown) + `public/notes/` (PDFs) | Pre-curated notes committed directly to the repo. |
| **Markdown Engine** | `react-markdown` + `remark-gfm` + `rehype-highlight` | Fast, clean reading typography with syntax highlighting. |
| **PDF Delivery** | `react-pdf` / Native viewer + Direct Download Link | Clean reading mode and immediate download. |
| **Client Search** | Lightweight client-side fuzzy search | Instant filtering of semesters, subjects, units, and note titles. |

---

## 4. Content Architecture & File Organization

```text
Vanta/
├── content/                         # Pre-curated BCA curriculum markdown notes
│   ├── semester-1/
│   │   ├── discrete-mathematics/
│   │   │   ├── unit-1-set-theory.md
│   │   │   └── unit-2-relations.md
│   │   └── programming-in-c/
│   │       ├── unit-1-basics-and-io.md
│   │       └── unit-2-arrays-pointers.md
│   ├── semester-2/
│   └── ... (Semesters 1-6)
├── public/
│   ├── notes/                       # Static PDFs for direct viewing & download
│   │   ├── bca-sem1-discrete-maths.pdf
│   │   └── bca-sem1-c-programming.pdf
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout + WebGL shader background
│   │   ├── page.tsx                 # Empty/Home screen with quick curriculum map
│   │   └── notes/[...slug]/page.tsx # Static note view page
│   ├── components/
│   │   ├── nav/
│   │   │   ├── Sidebar.tsx          # Desktop tree sidebar with search bar
│   │   │   ├── MobileDrawer.tsx     # Mobile slide-out navigation
│   │   │   └── Breadcrumbs.tsx      # Orientation path: BCA / Sem / Subject / Unit
│   │   ├── shader/
│   │   │   └── AtmosphereShader.tsx # Native WebGL2 canvas (<120 LOC)
│   │   ├── viewer/
│   │   │   ├── MarkdownViewer.tsx   # Custom cards, comparison blocks & code blocks
│   │   │   └── PdfViewer.tsx        # Responsive PDF reader + download button
│   │   └── ui/
│   │       └── CalloutCard.tsx      # Left-accented semantic content block
│   ├── lib/
│   │   ├── content.ts               # Build-time content indexing & frontmatter parsing
│   │   └── search.ts                # Client-side quick filter logic
│   └── types/
│       └── content.ts               # Hierarchy & Note TypeScript interfaces
├── .github/workflows/deploy.yml     # Automated GitHub Pages CI/CD workflow
├── next.config.ts                   # output: 'export', basePath configured
└── tailwind.config.ts
```

---

## 5. Markdown Card Directives (Custom Semantic Callouts)

Notes authoring supports Obsidian-like callouts mapped to clean styled cards:

```markdown
> [!definition] Union of Sets (A ∪ B)
> The union of two sets A and B is the set of elements which are in A, in B, or in both.

> [!valid] Identity Law
> A ∪ ∅ = A

> [!invalid] Common Pitfall
> Writing elements repeatedly: `{1, 2, 2, 3}` is not a distinct representation.

> [!compare] Distinct Elements vs Well-Defined
> **Left:** Distinct means no duplicate items.
> **Right:** Well-defined means membership is unambiguous.
```

---

## 6. Implementation Roadmap

### Phase 0: Project Scaffold & GitHub Pages CI/CD
1. Initialize Next.js 15+ (App Router, TypeScript, Tailwind CSS).
2. Configure `next.config.ts` (`output: "export"`, `images: { unoptimized: true }`).
3. Add GitHub Actions deploy workflow (`.github/workflows/deploy.yml`).
4. Install minimal dependencies:
   ```bash
   npm i lucide-react clsx tailwind-merge react-markdown remark-gfm rehype-highlight gray-matter react-pdf
   npm i -D @types/node @types/react
   ```

### Phase 1: Design Tokens & Atmospheric Shader
1. Configure `app/globals.css` with Obsidian theme palette (`#080808` base, `#121212` surface, `#E5A93C` amber accent).
2. Implement `AtmosphereShader.tsx` using raw WebGL2 (<120 LOC, throttled, pauses on reduced motion).
3. Build base layout with full-screen shader layer + clean dark scrollbar.

### Phase 2: Static Catalog Parser & Client Search
1. Write `src/lib/content.ts` to index `content/` files and frontmatter at build time.
2. Implement client-side fuzzy filter (`src/lib/search.ts`) over semesters, subjects, units, and note titles.
3. Wire up `generateStaticParams()` in `src/app/notes/[...slug]/page.tsx`.

### Phase 3: Two-Panel Navigation (Sidebar & Mobile Drawer)
1. Build `Sidebar.tsx`:
   - Instant search input at top.
   - Expandable tree hierarchy (`Semester → Subject → Unit → Note`).
   - Active note indicator with gold accent bar.
   - Expand/collapse sidebar toggle.
2. Build `MobileDrawer.tsx` with smooth drawer open/close and responsive hamburger trigger.

### Phase 4: Note Viewing Engine & Semantic Cards
1. Build `Breadcrumbs.tsx`: Displays `BCA / Semester {N} / {Subject} / {Unit} / {Title}`.
2. Build `CalloutCard.tsx`: Custom left-accent colored bars (Amber, Green, Red, Blue, Compare).
3. Build `MarkdownViewer.tsx`: Render markdown notes with custom callout cards, math notation, and syntax highlighted code blocks.
4. Build `PdfViewer.tsx`: Responsive PDF reader with persistent top-right "Download PDF" action.
5. Build Home / Empty State with quick subject shortcuts.

### Phase 5: Content Population & Verification
1. Add core starter notes for BCA Semester 1 to 6.
2. Verify static build generation (`npm run build` → `out/`).
3. Check mobile responsive behavior (iPhone/Android viewports).
4. Verify GPU usage (<1% on idle) and instant search responsiveness.
