# Adapted AI Prompt: SynapseX Neural-AI BCI Landing Page

> **Prompt Category:** Cyberpunk / Sci-Fi / High-Tech Hardware Spec / Brain-Computer Interface  
> **Tech Stack:** React 18, Vite 5, Tailwind CSS v3, TypeScript, Framer Motion v12, Lenis  
> **Aesthetic:** Monospace Brutalism, Pure Black (#000) & White (#fff), Dynamic 3D Camera Tilt, Fluid Physics

---

## 🎯 Master AI Prompt Kit

Copy and paste the prompt below into any advanced coding AI agent (such as Antigravity, Claude 3.7 Sonnet, GPT-4.5, or Cursor) to reproduce or customize this high-velocity neural interface landing page.

```markdown
Build a single-page landing site for "SynapseX" — a futuristic neural-AI interface product. The entire site uses a pure black background (#000) with white text (#fff) and full-viewport CloudFront video backgrounds. The primary font is "Space Mono" (monospace) for all text, paired with "Anton SC" for massive background watermarks. Use React + TypeScript + Vite + Tailwind CSS + Framer Motion + lenis.

---

## Technical & Deployment Guardrails
1. In `vite.config.ts`, include `base: './'` for seamless GitHub Pages subpath hosting.
2. In `package.json`, include: `"framer-motion": "^12.4.0"`, `"lucide-react": "^0.344.0"`, `"lenis": "^1.1.20"`, `"react": "^18.3.1"`, `"react-dom": "^18.3.1"`.
3. Heading Hierarchy: Exactly ONE `<h1>` on the hero ("Brain & Body / One Network"). Subsequent section titles must use `<h2>`.
4. Continuous Kinetic Energy: The hero video must NEVER freeze on load. It autoplays in a smooth 60 FPS loop, while horizontal cursor movement applies real-time 3D parallax tilt and time-warp playback acceleration.
5. All icons are rendered as inline SVGs or Lucide icons (no heavy external icon font CDNs).

---

## Fonts & Global Styling (`index.css`)
- Load Google Fonts in `index.html`:
  - "Space Mono" (weights 400, 700, and italic)
  - "Anton SC" (display watermark)
- Override all Tailwind `fontFamily` keys (`sans`, `serif`, `mono`) to `"Space Mono", monospace`.
- Global CSS:
  - Lenis smooth scroll initialization (`new Lenis({ duration: 1.2 })`).
  - Scanline keyframes (`@keyframes scanline`, `@keyframes flicker`, `@keyframes icon-pulse-spin`).
  - Hero watermark text styling with radial gradient text-clip.

---

## Video URLs (Verified CloudFront Assets)
1. **Hero (3D Parallax & Time-Warp):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4`
2. **Cinematic Text (Dynamic 3D Camera Tilt):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4`
3. **Metrics (Rolling Cyberpunk Counters):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4`
4. **Adaptive Technology (Mouse Radial Light):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4`
5. **Footer (Split View):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4`

---

## Custom Text Components
1. `ScrambleIn`: Character decryption entrance reveal. Prop: `text: string`, `delay: number`, `triggered: boolean`. Randomizes glyphs (`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><`) and resolves left-to-right at 0.5 chars/frame every 25ms.
2. `ScrambleText`: Hover-driven scramble. Scrambles all characters on pointer hover, resolving back to original text over 4 frames/char.
3. `AnimatedCounter`: Viewport-triggered cyberpunk counter with decimal-jitter pre-roll before smoothly easing to target values (`2.4ms`, `99.7%`, `140B`).

---

## Custom SVG Logo (`SynapseXLogo`)
4-fold rotational symmetry inside `<svg viewBox="-50 -50 100 100">`:
Quadrant path rotated at 0°, 90°, 180°, 270°:
`M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z`

---

## Page Architecture

### 1. Hero Section (`Hero.tsx`, h-[100dvh])
- Video #1 autoplays in background at 60 FPS with 24×24px dot-matrix overlay.
- Cursor 3D Parallax: Normalizes mouse coordinates from -1 to 1, piped through Framer Motion springs (`stiffness: 150, damping: 20`).
- Background watermark `"TRANSCENDENCE"` translates with depth (`x: mouseX * -30px, y: mouseY * -20px`).
- Hero typography tilts in 3D: `perspective: 900px`, `rotateY: mouseX * 8deg, rotateX: mouseY * -8deg`.
- Interactive Time-Warp: Rapid cursor velocity accelerates video playback up to `1.6x`, smoothly decaying back to `1.0x` when idle.

### 2. Floating Spring Capsule Navbar (`Navbar.tsx`, fixed top-0 z-50 h-20)
- Left Group:
  - Logo capsule: `h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px]` with `SynapseXLogo` + "SynapseX".
  - Expanding Menu Capsule: Framer Motion spring width animation from `48px` (closed) to `290px` (open) with `stiffness: 350, damping: 28`. Contains `SquashHamburger` icon (morphs into an X) + nav links ("About", "Metrics") with `ScrambleText`.
- Right: Download Pill with inline Apple SVG + "Download" (`ScrambleText` on hover).

### 3. Cinematic Text Section (`CinematicText.tsx`, h-[100dvh])
- Background: Video #2 with top gradient fade from `#000` to transparent.
- Typography floats freely in 3D space with a luminous drop shadow (`drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]`).
- Dynamic 3D Camera Tilt on Scroll:
  Piped through `useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 1 })`:
  - `rotateX`: Dynamically sweeps from **`55deg`** (incoming crawl) $\rightarrow$ **`0deg`** (flat to camera) $\rightarrow$ **`-45deg`** (outgoing tilt).
  - `y`: Glides from `140px` $\rightarrow$ `0px` $\rightarrow$ `-140px`.
  - `scale`: Shifts from `0.85` $\rightarrow$ `1.08` $\rightarrow$ `0.9`.
  - `opacity`: Fades in from `0` to `1` and back to `0`.

### 4. Metrics Section (`Metrics.tsx`, min-h-screen)
- Background: Video #3 with dark scrim.
- Live Status Badges: Pulsing green dot + `STREAM ACTIVE • 1000Hz`.
- 3-Column Stats Grid with vertical glitch scanlines that flicker on hover:
  - `2.4ms` — Synaptic Latency (with decimal-jitter pre-roll)
  - `99.7%` — Signal Accuracy (with 2-digit zero-padding)
  - `140B` — Neural Parameters

### 5. Technology Section (`Technology.tsx`, h-[100dvh])
- Background: Video #4.
- 4-Column Feature Grid with Cursor Radial Spotlights:
  Each card tracks local mouse coordinates, casting a dynamic `radial-gradient(350px circle at mouseX mouseY, rgba(255,255,255,0.12), transparent 70%)`.
- Feature icons pulse and spin `360deg` on hover (`@keyframes icon-pulse-spin`).

### 6. Architecture Section (`Architecture.tsx`, min-h-screen, pure black)
- Heading: `"Three layers. Zero friction."`
- 3 Interactive Layer Cards with 3D Magnetic Tilt (`useSpring(0, { stiffness: 200, damping: 18 })`).
- Sweeping cyan/white laser scanline traversing active cards (`@keyframes scanline`).
- Live Signal Wave: Active layer expands with `AnimatePresence`, revealing an infinite animated SVG sine waveform (`SignalWave`).

### 7. Footer Section (`Footer.tsx`, min-h-[70dvh])
- Split-screen layout: Left half plays Video #5; right half contains `SynapseXLogo`, mission statement, and copyright.
```

---

## 💡 Adaptation Guide

1. **Hardware / Medical Tech**: Swap the video assets and metrics (`latency`, `sample rate`, `channels`) to represent neurotech headsets, ECG/EEG sensors, or prosthetics.
2. **Cybersecurity / High-Speed Infrastructure**: Re-skin the telemetry badges for DDoS scrubbing, edge latency, or packet inspection platforms.
3. **Web3 / Crypto Node**: Adapt the architecture layers for Consensus, Execution, and Data Availability.
