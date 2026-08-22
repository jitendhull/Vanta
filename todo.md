# Vanta — Implementation Todo & Status Tracker

**Current Status:** All Phases Complete (Verified with Next.js 15 SSG Production Build)

---

## 📌 Status Summary
- [x] **Phase 0: Project Scaffold & GitHub Pages CI/CD**
  - [x] Initialize Next.js 15 App Router project structure
  - [x] Install dependencies (`lucide-react`, `clsx`, `tailwind-merge`, `react-markdown`, `remark-gfm`, `rehype-highlight`, `gray-matter`, `autoprefixer`, etc.)
  - [x] Configure `next.config.ts` (`output: 'export'`, `basePath`, unoptimized images, trailingSlash)
  - [x] Add GitHub Actions deployment workflow (`.github/workflows/deploy.yml`)
  - [x] Setup `tsconfig.json`, Tailwind CSS config, PostCSS, and directory structure
- [x] **Phase 1: Design Tokens & Atmospheric Shader**
  - [x] Define Obsidian design tokens & CSS variables in `globals.css`
  - [x] Create `AtmosphereShader.tsx` (WebGL2 fluid warp canvas, throttled 30fps, reduced-motion check)
  - [x] Build base layout wrapper with shader background & custom scrollbars
- [x] **Phase 2: Static Catalog Parser & Client Search**
  - [x] Implement `src/lib/content.ts` (Build-time filesystem scanner & frontmatter parser)
  - [x] Implement `src/lib/search.ts` (Client fuzzy search filter)
  - [x] Create dynamic route `src/app/notes/[...slug]/page.tsx` with `generateStaticParams()`
- [x] **Phase 3: Two-Panel Navigation (Sidebar & Mobile Drawer)**
  - [x] Build `Sidebar.tsx` with expandable tree & instant search filter
  - [x] Build `MobileDrawer.tsx` with responsive toggle
  - [x] Build `Breadcrumbs.tsx` navigation bar
- [x] **Phase 4: Note Viewing Engine & Semantic Cards**
  - [x] Build `CalloutCard.tsx` (Amber, Green, Red, Blue, Compare cards)
  - [x] Build `MarkdownViewer.tsx` (Callout transformer, GFM tables, syntax highlighting)
  - [x] Build `PdfViewer.tsx` (PDF reader & download trigger)
  - [x] Build Home / Curriculum overview page
- [x] **Phase 5: Content Population & Verification**
  - [x] Seed BCA curriculum markdown notes (Semesters 1-6)
  - [x] Seed sample offline PDF notes
  - [x] Verify static production export (`npm run build` → `out/` verified 13/13 static routes)
