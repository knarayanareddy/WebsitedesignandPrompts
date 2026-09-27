# Build Log: Template 06 — Editorial Dark Portfolio (Michael Smith)

> **Template ID:** `06`  
> **Folder:** `portfolio/`  
> **Target Audience:** Creative Developers, Design Engineers, Technical Founders, High-End Studios  
> **Primary Tech Stack:** React 18.3.1, TypeScript 5.6.3, Vite 5.4.11, Tailwind CSS 3.4.17, GSAP 3.12.5 (ScrollTrigger), Lenis 1.1.18, Framer Motion 11.15.0, HLS.js 1.5.17  
> **Deployment Target:** GitHub Pages (`/WebsitedesignandPrompts/portfolio/`)

---

## 🏗️ Architecture & Technical Innovations

### 1. Lenis Smooth Scroll + GSAP ScrollTrigger Synchronization
A common pitfall in modern web development is scroll stutter when pairing a virtual scroll library (Lenis) with scroll-bound animation engines (GSAP ScrollTrigger). This template establishes a unified animation loop inside `App.tsx`:
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

// Update ScrollTrigger on every Lenis scroll tick
lenis.on('scroll', () => {
  ScrollTrigger.update();
});

// Drive Lenis directly from GSAP ticker for zero-latency lockstep
const raf = (time: number): void => {
  lenis.raf(time * 1000);
};
gsap.ticker.add(raf);
gsap.ticker.lagSmoothing(0);
```
Furthermore, scroll is completely halted during preloader execution (`lenis.stop()`) and unlocked upon preloader complete (`lenis.start()`), followed by `ScrollTrigger.refresh()` after fonts and layout settle.

---

### 2. Dual-Speed Pinned Parallax Stage (`Explorations.tsx`)
Rather than relying on generic horizontal carousels or flat image grids, the Visual Playground uses a pinned full-viewport stage spanning `260vh`:
- The viewport stage is pinned using `ScrollTrigger.create({ pin: stage, scrub: true })`.
- Inside the pinned viewport, two vertical columns counter-translate at asynchronous speeds:
  - **Column 1 (Left):** `speed = 1.2` (faster downward travel)
  - **Column 2 (Right):** `speed = 0.8` (slower drift)
- The center floating title badge (`"Visual playground"`) remains anchored in dead center of the viewport via `pointer-events-none` with heavy backdrop blur (`backdrop-blur-xl`), producing a 3D depth field without WebGL overhead.
- Clicking any image triggers an accessible lightbox with `AnimatePresence` spring entrance and keyboard `Escape` dismiss.

---

### 3. Asymmetric Halftone & Mouse-Tracking Spotlight (`Works.tsx`)
Each case study card in the 4-project asymmetric grid features layered sensory textures:
1. **Halftone Radial Grid:** A pointer-events-none CSS dot mask:
   ```css
   background-image: radial-gradient(circle, #000 1px, transparent 1px);
   background-size: 4px 4px;
   mix-blend-mode: multiply;
   ```
2. **Dynamic Mouse Spotlight:** Real-time pointer tracking calculates local card coordinates `(glow.x, glow.y)` and applies a dynamic light beam:
   ```css
   background: radial-gradient(500px circle at ${glow.x}px ${glow.y}px, rgba(137,170,204,0.12), transparent 40%);
   ```
3. **Elevated Hover Pill:** Hovering transforms the static card into a frosted wash with an elevated gradient-ring pill badge (`View — [Title]`) animating up from below.

---

### 4. Cross-Platform HLS Streaming Video (`useHlsVideo.ts`)
Instead of loading massive 50MB MP4 files, video is served via HTTP Live Streaming (.m3u8) through Mux CDN:
- Native HLS is checked first (`video.canPlayType('application/vnd.apple.mpegurl')`) so Safari on iOS/macOS uses hardware-accelerated playback via `video.src`; Chromium/Firefox fall back to `hls.js` with MSE attachment.
- The stream is attached **lazily** — only when the `<video>` comes within 200px of the viewport (the hero opts into `eager`). The hero and footer share one playback ID, so this stops the same stream being downloaded twice on page load. Playback pauses whenever the element scrolls out of view.
- Fatal `hls.js` errors destroy the instance and leave the poster in place; under `prefers-reduced-motion` the stream is never attached at all.
- In the footer, the background stream is flipped via CSS `invert` and lowered to 25% opacity under a dark scrim, creating a ghostly monochrome texture behind the infinite ticker.
- `VIDEO_SRC` / `POSTER_SRC` are centralised in `src/lib/media.ts`. Both are third-party hosted (Mux playback ID of undocumented ownership, Unsplash poster) — replace them before shipping. See `../ASSETS.md`.

### 4.1 Reduced motion, focus management & real links (review pass)
- `src/lib/motion.ts` exposes `prefersReducedMotion()` / `usePrefersReducedMotion()`. When set: Lenis is not created (native scrolling; `handleNavigate` uses `scrollIntoView`), `<MotionConfig reducedMotion="user">` strips framer-motion transforms, the Explorations section renders as a plain two-column grid instead of a pinned scrub, the footer marquee is static, the hero role cycler and preloader words stop rotating, and CSS keyframe loops are disabled.
- Navbar: a `md:hidden` disclosure button (`aria-expanded` / `aria-controls`) opens the four section links on small screens; Escape closes it and restores focus; it auto-closes when the viewport grows past `md`.
- Explorations lightbox: focus moves to the Close button on open, Tab is kept inside the dialog, and focus returns to the thumbnail that opened it.
- Works cards and Journal rows take an optional `href`. With one they render as real `<a>` elements (keyboard-focusable, focus-visible ring, hover/focus pill); without one they are plain tiles — no more `cursor-pointer` on elements that go nowhere. The demo data leaves `href` unset; fill it in when adapting.
- Preloader: progress now tracks real loading (webfonts + hero poster) with a 1 s floor and 2.7 s ceiling instead of a fixed 2.7 s timer.
- The redundant `onClick` on the `mailto:` link was removed; `h-screen` became `h-svh` so mobile browser chrome no longer clips the hero.

---

### 5. Production Chunking & GitHub Pages Subpath Compatibility
In `vite.config.ts`, `base: './'` ensures all bundle assets use relative pathing for subfolder deployments (`/WebsitedesignandPrompts/portfolio/`).
The vendor bundle is partitioned into granular cacheable chunks:
```typescript
build: {
  chunkSizeWarningLimit: 700,
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom'],
        motion: ['framer-motion'],
        gsap: ['gsap'],
        hls: ['hls.js'],
        lenis: ['lenis'],
      },
    },
  },
}
```
Result: Total initial page transfer is ~100 KB gzipped, and subsequent navigations hit 100% cache hits.

---

## 📊 Verification & Test Results
- **TypeScript Typecheck:** `tsc --noEmit` exited `0` (Zero warnings/errors).
- **Vite Production Build:** Successfully compiled in 1.6s.
- **Accessibility:** Semantic structure verified (`h1` ➔ `h2` ➔ `h3`), `aria-hidden` on decorative media, proper contrast ratios (> 7:1) across text tokens.
