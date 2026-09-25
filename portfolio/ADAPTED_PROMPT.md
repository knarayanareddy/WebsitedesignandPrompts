# Adapted AI Prompt: Editorial Dark Portfolio

> **Prompt Category:** Creative Technologist / Design Engineer / Editorial Portfolio / Interactive Showcase  
> **Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS v3, GSAP 3 (ScrollTrigger), Lenis, Framer Motion 11, HLS.js  
> **Aesthetic:** Dark Editorial Minimalism, Instrument Serif (italic) + Inter, Halftone Spotlights, Dual-Speed Pinned Parallax, Inverted Mux Video Marquee

---

## 🎯 Master AI Prompt Kit

Copy and paste the prompt below into any advanced coding AI agent (such as Antigravity, Claude, ChatGPT, or Cursor) to reproduce or customize this editorial portfolio template.

```markdown
Build a high-end, Awwwards-grade single-page editorial dark portfolio landing page for "Michael Smith" — a creative developer and design engineer based in Chicago. The page pairs typography (Instrument Serif italic + Inter) with physics-driven animations, Lenis smooth scrolling synchronized with GSAP ScrollTrigger, Mux HLS video streaming, dynamic cursor spotlights with halftone dot textures, and a pinned dual-speed parallax exploration gallery.

---

## Technical & Deployment Guardrails
1. In `vite.config.ts`, include `base: './'` for seamless GitHub Pages subpath hosting, plus manual chunking for `['react', 'react-dom']`, `['framer-motion']`, `['gsap']`, `['hls.js']`, and `['lenis']`.
2. In `package.json`, include:
   - `"framer-motion": "^11.15.0"`
   - `"gsap": "^3.12.5"`
   - `"hls.js": "^1.5.17"`
   - `"lenis": "^1.1.18"`
   - `"react": "^18.3.1"`
   - `"react-dom": "^18.3.1"`
3. Semantic Heading Hierarchy:
   - Exactly ONE `<h1>` on the page: `Michael Smith` in the Hero.
   - Section headers (`Selected Work`, `Visual Playground`, `Selected Writings`, `Let's make something unforgettable`) must use `<h2>`.
   - Card items and modal titles must use `<h3>`.
4. Smooth Scroll Architecture:
   - Instantiate `Lenis` in `App.tsx` and sync it with `gsap.ticker` (`gsap.ticker.add((time) => lenis.raf(time * 1000))` and `gsap.ticker.lagSmoothing(0)`).
   - Update `ScrollTrigger.update()` on every Lenis scroll event.
   - Lock Lenis scrolling while the initial loading screen is active, and trigger `ScrollTrigger.refresh()` after completion.
5. High-Performance Video:
   - Use `hls.js` inside a custom hook `useHlsVideo(source)` with automatic detection for native browser HLS (Safari) vs MediaSource extensions (Chrome/Firefox).

---

## Design System & Tokens (`index.css` & `tailwind.config.js`)
- Google Fonts in `index.html`:
  - `Inter`: weights 300, 400, 500, 600, 700
  - `Instrument Serif`: italic, regular 400
- CSS Custom Properties (HSL):
  - `--bg: 0 0% 4%` (#0a0a0a)
  - `--surface: 0 0% 8%` (#141414)
  - `--text: 0 0% 96%` (#f5f5f5)
  - `--muted: 0 0% 53%` (#878787)
  - `--stroke: 0 0% 12%` (#1f1f1f)
  - `--accent-blue: #89aacc`
  - `--accent-sky: #4e85bf`
- Tailwind extend colors:
  - `bg: "hsl(var(--bg))"`, `surface: "hsl(var(--surface))"`, `'text-primary': "hsl(var(--text))"`, `muted: "hsl(var(--muted))"`, `stroke: "hsl(var(--stroke))"`, `'accent-blue': "#89AACC"`, `'accent-sky': "#4E85BF"`.
- Utility Classes:
  - `.accent-gradient`: `linear-gradient(90deg, #89aacc 0%, #4e85bf 100%)`
  - `.gradient-ring` & `.gradient-ring-hover`: animated rotating gradient border ring masked with `-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor;`.

---

## Verified Media Assets
- **Background Video (Hero & Footer):** `https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8`
- **Fallback Video Poster:** `https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop`
- **Featured Works Imagery:**
  1. *Automotive Motion:* `https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop`
  2. *Urban Architecture:* `https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop`
  3. *Human Perspective:* `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop`
  4. *Brand Identity:* `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop`
- **Explorations Gallery Imagery (Thumbnails + Hi-Res):**
  - Concrete Geometry: `photo-1513694203232-719a280e022f`
  - Monolith Form: `photo-1486406146926-c627a92ad1ab`
  - Kinetic Light: `photo-1509198397868-475647b2a1e5`
  - Horizon Void: `photo-1506744038136-46273834b3fb`
  - Executive Study: `photo-1507679799987-c73779587ccf`
  - Circuit Macro: `photo-1518770660439-4636190af475`

---

## Key Component Specifications

### 1. `LoadingScreen.tsx` (Preloader)
- Numerical counter animating from `000` to `100` via `requestAnimationFrame` over 2700ms.
- Rotating word switcher (`Design` → `Create` → `Inspire`) cycling every 900ms via `AnimatePresence`.
- Glowing accent gradient progress bar scaling across the bottom (`scaleX(${progress})`).
- 400ms fade-out transition triggering the application ready state.

### 2. `Navbar.tsx` (Floating Capsule)
- Floating frosted glass capsule (`bg-surface/80 border-white/10 backdrop-blur-md`).
- Logo badge with glowing animated gradient ring on hover.
- Navigation links (`Home`, `Work`, `Journal`, `Explorations`) triggering smooth programmatic scroll via `lenis.scrollTo()`.
- "Say Hi ↗" button with gradient border highlight.

### 3. `Hero.tsx` (Full-Viewport Cinematic Showcase)
- Fullscreen HLS video background with dark gradient bottom scrim (`bg-gradient-to-t from-bg to-transparent`).
- Massive display title: `Michael Smith` in `font-display` (Instrument Serif italic) at `text-6xl md:text-9xl`.
- Cycling role tagline: `"A [Creative | Fullstack | Founder | Scholar] lives in Chicago."` animating vertically every 2.2s.
- Dual action pills: `See Works` (filled) and `Reach out` (outlined).
- Animated vertical scroll indicator with pulsing downward accent gradient line.

### 4. `Works.tsx` (Asymmetric Halftone Project Grid)
- 4-card asymmetric layout:
  - Row 1: Card 1 (`col-span-7`) + Card 2 (`col-span-5`).
  - Row 2: Card 3 (`col-span-5`) + Card 4 (`col-span-7`).
- Card Interactions:
  - Halftone dot texture overlay (`mix-blend-multiply` with 4px circular dot pattern).
  - Cursor-tracking ambient spotlight glow (`radial-gradient(500px circle at ${glow.x}px ${glow.y}px, rgba(137,170,204,0.12), transparent 40%)`).
  - Dark blur wash on hover with smooth upward pill reveal (`View — [Project Title]`).

### 5. `Explorations.tsx` (Dual-Speed Pinned Parallax Gallery)
- Pinned stage (`min-h-[260vh]`) locked via GSAP ScrollTrigger (`pin: stage, scrub: true`).
- Dual vertical columns:
  - Column 1 (Left, 3 items) travels at `1.2x` scroll speed.
  - Column 2 (Right, 3 items) travels at `0.8x` scroll speed.
- Floating center glass badge: `"Visual playground"` (`bg-bg/70 backdrop-blur-xl border-stroke`).
- Click-to-expand Lightbox Modal with spring scaling, Esc key listener, and backdrop blur.

### 6. `Journal.tsx` (Editorial Writing List)
- Elegant pill-shaped article rows with hover translations (`group-hover:translate-x-1`) and circular arrow buttons that invert color on hover (`group-hover:bg-text-primary group-hover:text-bg`).

### 7. `Stats.tsx` (Impact Metrics)
- Minimalist 3-column metrics (`12+ Years`, `84+ Shipments`, `99.4% Client Satisfaction`) rendered in large serif numbers with `Reveal` scroll animations.

### 8. `Footer.tsx` (Infinite Marquee & Inverted HLS Loop)
- Fullscreen inverted HLS background video loop (`filter: invert(1)`).
- Infinite GSAP marquee ticker moving seamlessly across the viewport at `-50%` translation over 30s.
- Live pulsing green availability badge (`"Available for Q4 contracts"`).
- Direct email link with magnetic arrow micro-interaction.
```
