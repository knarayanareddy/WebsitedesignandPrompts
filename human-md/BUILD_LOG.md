# Build Log — HUMAN.md Surrealist Editorial Manifesto

## 1. Project Overview & Provenance

- **Target Site**: [https://www.human-md.ai/](https://www.human-md.ai/)
- **Author of Original Manifesto**: Briana (Mazzio) May (`briana.mazzio@gmail.com`)
- **Published**: April 28, 2026 (last touched kitchen table, coffee #2)
- **Concept**: A working manifesto and philosophical reminder of what human beings uniquely bring to the creative equation in an era of rapidly advancing machine intelligence.
- **Replication Target**: Pixel-faithful, asset-complete reproduction following the repository standards established in `apogee/`.

---

## 2. Reverse Engineering & Architecture Discovery

### A. Two-Layer Architecture (Stage vs. Read)

Inspection of `index.html` revealed a dual-mode layout:
1. **The Semantic Read Layer (`<article id="read" class="read" lang="en">`)**:
   - Plain HTML semantics (`header`, `h1`, `h2`, `h3`, `blockquote`, `ul`, `li`, `hr`).
   - Served directly to screen readers, web crawlers, and users with `prefers-reduced-motion: reduce`.
   - Includes skip link: `<a class="skip" href="#read">Skip to the text</a>`.
   - Contains the unadorned manifesto text, ensuring accessibility even if WebGL/JavaScript fails to execute.
2. **The Visual Stage Layer (`<div id="stage" aria-hidden="true">`)**:
   - Houses the visual diorama and kinetic scenes.
   - Pinned and transformed via GSAP ScrollTrigger and Lenis smooth scrolling.
   - Includes full-bleed room backgrounds (`#bg`), dynamic SVG filter defs (`#t-shade`, `#t-shade-arm`), and layered scene containers (`.L-open`, `.L-taste`, `.L-table`).

### B. The HUD & Control System

The Heads-Up Display (`<header class="hud">`) floats at `z-index: 900` above the stage:
- **Left Cluster (`.hud__l`)**:
  - `.hud-mug`: Sculpted ceramic coffee mug containing `.hud-mug__eye`. An event listener calculates vector angle relative to cursor coordinates and updates CSS variables `--mug-x` and `--mug-y`. Clicking scrolls smoothly to `0`.
  - `.hud-file`: Pill badge displaying `HUMAN.md` with an animated pulsing safety-orange indicator dot (`.hud-file__dot`).
  - `.hud-crumb`: Real-time breadcrumbs that update based on active scroll section.
- **Right Cluster (`.hud__r`)**:
  - `.hud-watch`: Autoplay conductor toggle. When active, sets `html.is-conducted` and advances the timeline automatically at a steady reading cadence.
  - `.hud-index`: Drawer trigger toggling `nav.index`. Opens a staggered grid of 16 tarot/playing cards linking to all major chapters.

### C. Mechanical Cellar & SVG Engineering

The underground engine room in Scene 4 (`.L-taste`) demonstrates extraordinary craft:
- Built with an inline `<svg class="t-svg art">` containing drop-shadow filters (`feDropShadow` with flood-color `#2b0b02`).
- Renders an articulated human arm turning a brass drive crank.
- The crank connects to an eccentric camshaft that pushes vertical bronze lifter rods.
- Lifter rods physically bounce individual letterforms (`t`, `a`, `s`, `t`, `e`) as the user scrolls, visually demonstrating the core thesis: *"There is a whole engine underneath it, and that engine is the part the model can't have."*

---

## 3. Asset Harvesting & Preservation

The original production bundle relied on 1,263 cutouts, textures, and webfonts resolved via `new URL(..., import.meta.url)`.

To ensure total independence from external CDNs, dead buckets, or network deprecation:
1. An asynchronous multi-threaded Python ingestion pipeline was dispatched across all asset references in `index-BWodrEjC.js`, `index-B0EnfEl-.css`, and `index.html`.
2. All 1,263 assets were downloaded and preserved in `public/assets/` (total footprint: 57 MB).
3. Webfonts downloaded and locally resolved:
   - `Bricolage Grotesque` (Latin, Latin-ext, Vietnamese in `.woff2`)
   - `Instrument Serif` (Latin, Latin-ext, normal and italic in `.woff` and `.woff2`)
   - `Cutive Mono` (Latin, Latin-ext in `.woff` and `.woff2`)
4. Root assets downloaded:
   - `og.png` (1200x630 OpenGraph card)
   - `robots.txt`
   - `sitemap.xml`

---

## 4. Build System & Tooling Deviations

Following the standard set by `apogee` and `anubi`:

| Item | Source Site | Shipped Replication | Reason |
|------|-------------|---------------------|--------|
| Bundler | Vite 5/6 | Vite **6.4.3** | Clean audit line, high-performance asset handling |
| Type System | TypeScript ESNext | TypeScript **5.5.4** | Strict mode, `@/` alias resolution |
| Linter | ESLint | **oxlint** (v1.85) | Ultra-fast zero-config linter standard in repository |
| Typecheck | Manual | `tsc --noEmit -p tsconfig.app.json` | Runs before every `vite build` |
| Asset Path | Absolute | `base: './'` | Works from any GitHub Pages subpath or root URL |
| Dependencies | Global/Vendor | npm `lenis`, `gsap`, `lucide-react` | Packaged in `package.json` |

---

## 5. Directory Structure

```
human-md/
├── index.html                  # Full DOM structure (read article + HUD + stage)
├── package.json                # Project manifest & build scripts
├── vite.config.ts              # Base relative path & dev server
├── tsconfig.json               # Root TS configuration
├── tsconfig.app.json           # Application compiler configuration
├── tsconfig.node.json          # Vite node compiler configuration
├── postcss.config.js           # PostCSS Tailwind & Autoprefixer
├── tailwind.config.js          # Custom colors (stage, accent, cobalt)
├── .oxlintignore               # Oxlint exclusions (dist, public, assets)
├── .gitignore                  # Git exclusions (node_modules, dist)
├── public/
│   ├── og.png                  # OpenGraph share preview
│   ├── robots.txt              # Search engine directives
│   ├── sitemap.xml             # Canonical XML sitemap
│   └── assets/                 # 1,263 cutouts, SVGs, and webfonts
├── src/
│   ├── main.ts                 # TypeScript interfaces, chapters, HUD logic
│   └── index.css               # Core styling, fonts, and SVG filters
├── ADAPTED_PROMPT.md           # Coding prompt to reproduce the site
├── BUILD_LOG.md                # This document
└── README.md                   # User-facing documentation
```

---

## 6. Verification & Quality Assurance

- **Build Verification**: `npm run build` completed cleanly in 23.48s.
  - Output generated to `dist/` with relative asset links.
  - Zero broken references.
- **Typecheck Verification**: `npm run typecheck` (`tsc --noEmit -p tsconfig.app.json`) exited with code 0 (zero errors).
- **Linter Verification**: `npm run lint` (`oxlint --ignore-path .oxlintignore`) scanned 4 files in 273ms with **0 warnings and 0 errors**.
- **Browser Subagent Walkthrough**:
  - Live inspection confirmed accurate rendering of opening cobalt diorama, character in pajamas, pink foot vase, mechanical engine cellar, banquet table, 16-card tarot index drawer, and watch mode.
