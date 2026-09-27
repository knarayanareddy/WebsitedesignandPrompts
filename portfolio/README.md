# Editorial Dark Portfolio — Michael Smith

> **Template 06:** An Awwwards-grade editorial dark portfolio for creative developers and design engineers, featuring Lenis smooth inertia scrolling synchronized with GSAP ScrollTrigger, Mux HLS video streaming, dynamic mouse spotlights with halftone dot textures, and a pinned dual-speed parallax exploration playground.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=flat&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-1.1.18-black?style=flat)](https://github.com/darkroomengineering/lenis)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-black?style=flat&logo=github)](https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/)

---

## 🌟 Live Demo

Experience the live interactive portfolio on GitHub Pages:  
👉 **[https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/](https://knarayanareddy.github.io/WebsitedesignandPrompts/portfolio/)**

---

## ⚡ Kinetic Motion & Design Highlights

### 1. Unified Lenis + GSAP Scroll Engine
A zero-lag animation loop that binds **Lenis** inertia physics directly to the **GSAP ticker** and **ScrollTrigger.update()**, locking scroll during preloader execution and recalibrating triggers after webfonts load.

### 2. Dual-Speed Pinned Parallax Playground
A 260vh pinned stage featuring two asynchronous vertical columns (`1.2x` and `0.8x` speed differential) floating behind a centered, frosted glass title badge, complete with click-to-expand image lightbox and `Escape` key controls.

### 3. Asymmetric Halftone & Pointer Spotlight
An asymmetric 4-project showcase combining print-inspired 4px radial halftone dot overlays with real-time cursor spotlight glows and animated hover pill badges.

### 4. Mux HLS Streaming Video Loops
Hardware-accelerated HTTP Live Streaming (`.m3u8`) with native-HLS-first playback (Safari) and hls.js elsewhere, attached lazily when each section nears the viewport and paused offscreen; the footer applies a negative-inversion treatment. The stream and poster live in `src/lib/media.ts` and are third-party hosted — swap them for your own before shipping (see [`../ASSETS.md`](../ASSETS.md)).

### Accessibility & motion
- Honors `prefers-reduced-motion`: native scrolling instead of Lenis, `MotionConfig reducedMotion="user"`, static parallax grid, static marquee, no role cycling, videos stay on their poster.
- Mobile navigation menu below `md`, lightbox focus management (focus to Close, Tab trapped, focus restored), and Works / Journal cards that are real links whenever a `href` is supplied.

### 5. Infinite GSAP Marquee Ticker
A seamless `-50%` marquee ticker loop paired with a live pulsing availability indicator (`"Available for Q4 contracts"`).

---

## 🛠️ Local Development

To run this template locally:

```bash
# From the repository root:
cd portfolio

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

Open `http://localhost:5173` to explore the design locally.

To test the production build:
```bash
npm run build
npm run preview
```

---

## 📂 File Hierarchy

```
portfolio/
├── ADAPTED_PROMPT.md        # Complete AI prompt kit to reproduce/adapt this template
├── BUILD_LOG.md             # In-depth architectural & performance engineering notes
├── README.md                # Template documentation & quickstart
├── index.html               # Entry HTML with Instrument Serif & Inter fonts + SVG favicon
├── package.json             # React 18, Vite 5, GSAP, Lenis, Framer Motion, HLS.js
├── tailwind.config.js       # HSL color system, typography, gradient ring styles
├── tsconfig.json            # Strict TypeScript configuration
├── vite.config.ts           # Relative base ('./') + manual vendor chunking
├── public/
│   └── favicon.svg          # Custom SVG monogram favicon
└── src/
    ├── App.tsx              # Lenis (or native) scroll setup, preloader gating, layout
    ├── index.css            # Design tokens, halftone utilities, keyframes, reduced-motion overrides
    ├── main.tsx             # React DOM entry point + MotionConfig
    ├── vite-env.d.ts        # Vite client types
    ├── components/
    │   ├── LoadingScreen.tsx # Asset-aware 000-100 counter & rotating word preloader
    │   ├── Navbar.tsx        # Floating glass pill navbar + mobile disclosure menu
    │   ├── Hero.tsx          # Full-viewport HLS video showcase & role cycler
    │   ├── Works.tsx         # Asymmetric halftone grid with mouse-follow glow (linkable cards)
    │   ├── Explorations.tsx  # Dual-speed pinned parallax stage & focus-managed lightbox
    │   ├── Journal.tsx       # Editorial writings (linkable rows)
    │   ├── Stats.tsx         # Impact metrics in Instrument Serif
    │   ├── Footer.tsx        # Infinite marquee ticker, inverted video & email CTA
    │   └── Reveal.tsx        # Viewport reveal wrapper with Framer Motion
    └── lib/
        ├── gsap.ts           # GSAP & ScrollTrigger registration
        ├── media.ts          # Shared stream + poster URLs (third-party hosted)
        ├── motion.ts         # prefers-reduced-motion helpers (sync + hook)
        └── useHlsVideo.ts    # Lazy, viewport-gated cross-platform HLS hook
```
