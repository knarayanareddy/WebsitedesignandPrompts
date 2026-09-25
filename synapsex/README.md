# SynapseX — Neural-AI Interface Landing Page

> **Template 05:** A futuristic, high-velocity landing page for a neural-AI interface product featuring continuous kinetic energy, 3D cursor parallax, dynamic multi-stage scroll camera tilting, rolling cyberpunk counters, and interactive magnetic hardware layer stacks.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.0-black?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-black?style=flat&logo=github)](https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/)

---

## 🌟 Live Demo

Experience the live interactive neural interface on GitHub Pages:  
👉 **[https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/](https://knarayanareddy.github.io/WebsitedesignandPrompts/synapsex/)**

---

## ⚡ Kinetic Motion & Interaction Highlights

### 1. 3D Parallax & Cursor Time-Warp Hero
The hero video loops continuously at native 60 FPS. As you move your mouse, the hero typography tilts smoothly in 3D (`perspective: 900px`, `rotateX`, `rotateY`) while the background `"TRANSCENDENCE"` watermark translates with depth. Rapid cursor movement dynamically accelerates the video playback rate from `1.0x` up to `1.6x`.

### 2. Multi-Stage 3D Camera Tilt on Scroll
As you scroll into Section 2, the raw typography pitches dynamically from **`55°`** (incoming Star Wars-style crawl) $\rightarrow$ **`0°`** (dead-flat to camera) $\rightarrow$ **`-45°`** (outgoing dive) via `useSpring` and `useScroll`.

### 3. Rolling Cyberpunk Telemetry Counters
The performance metrics (`2.4ms`, `99.7%`, `140B`) feature randomized decimal-jitter pre-rolls that rapidly flicker before rolling up into precision values, accompanied by live pulsing status badges (`STREAM ACTIVE • 1000Hz`) and vertical CRT scanline flickers on hover.

### 4. 3D Magnetic Neural Layer Stack with Live Sine Wave
Hovering over the Architecture cards tilts each card in 3D space relative to your cursor position. Clicking or focusing any layer expands an infinite animated cyan/white SVG sine waveform (`SignalWave`) with sweeping laser scanlines.

### 5. Cursor-Tracking Radial Spotlights
In the Technology section, cards cast a dynamic radial light beam following your cursor (`radial-gradient(350px circle at mouseX mouseY)`), while feature icons pulse and spin `360°` on hover.

### 6. Spring Capsule Navbar & Character Decryption
An expanding pill navbar physically animates from `48px` to `290px` with spring physics (`stiffness: 350, damping: 28`), featuring an animated 3-bar hamburger icon and hacker-style character scramble decryption on links.

---

## 🎮 Interaction Controls

| Section / Element | Action | Kinetic Result |
| :--- | :--- | :--- |
| **Hero** | Cursor Movement | Tilts typography in 3D & shifts watermark depth |
| **Hero** | Rapid Mouse Shake | Accelerates background video time-warp (`1.0x` $\rightarrow$ `1.6x`) |
| **Hero & Nav** | Hover Links / Buttons | Triggers character scramble decryption (`ScrambleText`) |
| **Navbar** | Click Hamburger | Spring-expands capsule from `48px` to `290px` |
| **Section 2** | Scroll Down | Pitches 3D typography from `55°` $\rightarrow$ `0°` $\rightarrow$ `-45°` |
| **Section 3** | Scroll into View | Jitters and rolls up numeric telemetry counters |
| **Section 4** | Hover Cards | Directional cursor spotlight beam & 360° icon spin |
| **Section 5** | Hover / Click Layers | 3D magnetic card tilt & expands live SVG sine waveform |

---

## 📂 File Hierarchy

```text
synapsex/
├── public/
│   └── favicon.svg           # 4-fold rotational SynapseX logo favicon
├── src/
│   ├── components/
│   │   ├── AnimatedCounter.tsx  # Viewport counter with decimal jitter pre-roll
│   │   ├── Architecture.tsx     # 3D magnetic cards & live SVG sine wave
│   │   ├── CinematicText.tsx    # Multi-stage 3D camera scroll perspective
│   │   ├── Footer.tsx           # Split video & mission statement
│   │   ├── Hero.tsx             # 3D parallax hero & cursor time-warp
│   │   ├── Metrics.tsx          # 3-column telemetry grid with glitch scanlines
│   │   ├── Navbar.tsx           # Morphing spring capsule navigation
│   │   ├── ScrambleIn.tsx       # Character entrance decryption
│   │   ├── ScrambleText.tsx     # Hover-driven scramble effect
│   │   ├── SquashHamburger.tsx  # Spring-animated morphing hamburger
│   │   ├── SynapseXLogo.tsx     # 4-fold rotational vector logo
│   │   └── Technology.tsx       # Cursor-tracking radial spotlight cards
│   ├── lib/
│   │   └── scroll.ts            # Lenis smooth-scroll bridge
│   ├── App.tsx                  # Root page layout
│   ├── index.css                # Tailwind base, Lenis styles & keyframes
│   └── main.tsx                 # App mount & Lenis initialization
├── ADAPTED_PROMPT.md            # Master AI prompt kit & adaptation guide
├── BUILD_LOG.md                 # In-depth physics formulas & engineering log
├── package.json
├── tailwind.config.js
└── vite.config.ts               # Base './' for GitHub Pages subpath hosting
```

---

## 🚀 Quickstart & Local Development

To run this template locally:

```bash
# Clone the repository
git clone https://github.com/knarayanareddy/WebsitedesignandPrompts.git
cd WebsitedesignandPrompts/synapsex

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open `http://localhost:5173` to explore the interactive interface.

---

## 🤖 AI Prompt Engineering Kit

Want to build or adapt this neural interface to your own brand, medical hardware, or Web3 platform?

👉 Read **[`ADAPTED_PROMPT.md`](./ADAPTED_PROMPT.md)** for the complete master prompt.  
👉 Read **[`BUILD_LOG.md`](./BUILD_LOG.md)** for the full physics equations, spring parameters, and architecture breakdowns.
