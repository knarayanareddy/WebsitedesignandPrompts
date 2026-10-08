# One Thread — 3D WebGL Spline Flight & Spatial Architecture

[![Three.js](https://img.shields.io/badge/Three.js-r186-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![WebGL](https://img.shields.io/badge/WebGL-2.0-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-API-FFA500?logo=w3c&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deploy](https://img.shields.io/badge/deploy-Cloudflare_Pages-F38020?logo=cloudflare&logoColor=white)](https://kiranreddy.nl)

> **Live Production:** [https://kiranreddy.nl](https://kiranreddy.nl)  
> **Source Origin Inspiration:** [ysuriadesign.co](https://ysuriadesign.co/) ("One person. One thread.")

A complete reverse-engineering, architectural deconstruction, and value-for-value replication of the iconic **ysuriadesign.co** interactive WebGL experience. Built on a continuous 3D camera flight along a glowing mathematical spline curve, featuring hardware-accelerated post-processing (anamorphic lens flares, volumetric bloom, circle-of-confusion bokeh, chromatic aberration, film grain), a reactive Web Audio API soundscape, screen-projected landmark callouts, and an interactive luxury work modal.

---

## 🧭 The 6 Stations (Flight Path)

| # | Station ID | Title & Kicker | 3D Spatial Geometry | Interactive Features & Callouts |
|---|------------|----------------|---------------------|--------------------------------|
| **01** | `#origin` | **One person**<br>Delft, NL · 2026 | Rotating asteroid ring, coordinate reticle, volumetric laser beam | Monogram `KR`, live status radar dot, camera initial drift |
| **02** | `#memory` | **One person. One thread.**<br>Delft, NL | Swooping descent into deep corridor, trailing light pulses | Character-by-character staggered typography reveal (`.ch-char`) |
| **03** | `#refraction` | **Vouwloods Delft**<br>Physical Venture · Showroom | Orbiting prism and light-deflecting plane | Projected leader-line pin tags (`StopHeling Verified`, `15+ Folding Bikes`) |
| **04** | `#work` | **The work**<br>Physical, 3D & Protocols | Floating 3D exhibition panels rendering studio bike photography | Glassmorphic project cards (`.wl`), interactive 3D work modal with media carousel |
| **05** | `#threshold` | **Shipped**<br>3D Multiverse & Solana | Floating crystal clusters & constellation nodes | Deep space banking physics, TVL & protocol metrics |
| **06** | `#network` | **What’s next**<br>Open for Collaboration | Horizon light portal, converging particle streams | Full-width glowing footer reveal, `kiran@kiranreddy.nl`, `Begin again ↑` button |

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HARDWARE DISPLAY / VIEWPORT                     │
├────────────────────────────────────────────────────────────────────────┤
│  LAYER 4: FIXED LUXURY DOM OVERLAY (z-index: 2, pointer-events: none)  │
│  • Precision cursor (.c-dot & spring-lagged .c-ring)                   │
│  • Fixed Header: Monogram [KR], Counter 00/06, Audio toggle, Index     │
│  • Screen-Projected Landmark Pins (.ft-tag with SVG leader lines)       │
│  • Dynamic Chapter Typography (.ch-char staggered blur-ins)           │
│  • Work Cards (.wl) & Interactive Modal (.work-modal)                  │
│  • Right Navigation Rail (Progress indicator & Chapter dots)           │
│  • Expanding Horizon Footer (ScaleX rule, Mailto, Begin Again)         │
├────────────────────────────────────────────────────────────────────────┤
│  LAYER 3: POST-PROCESSING GLSL COMPOSITOR (Custom Pass Chain)         │
│  • Pass 1: Depth of Field / Circle of Confusion (CoC) Bokeh            │
│  • Pass 2: Anamorphic Horizontal Streak Lens Flare                     │
│  • Pass 3: Multi-level Dual-pass Gaussian Bloom Downsample/Upsample    │
│  • Pass 4: Color Grade, Vignette, Chromatic Aberration & Film Grain    │
├────────────────────────────────────────────────────────────────────────┤
│  LAYER 2: 3D THREE.JS WEBGL PIPELINE (z-index: 0, #gl Canvas)          │
│  • Continuous Catmull-Rom Spline Curve (10 control points)             │
│  • Dual-Core Spline Tube: Emissive core + Additive aura glow           │
│  • 12,000 Particle Volumetric Starfield & Drifting Asteroids           │
│  • Dynamic Camera Light (Tracking camera position for specular punch)  │
│  • Floating 3D Exhibition Panels (Photo planes + Edge lines)           │
├────────────────────────────────────────────────────────────────────────┤
│  LAYER 1: AUDIO SYNTHESIZER & SFX GRAPH (Web Audio API)                │
│  • Master Bus with Dynamics Compressor & Convolver Reverb              │
│  • Dual-Oscillator Ambient Drone (A1 55Hz + E2 82.4Hz)                 │
│  • Dynamic Biquad Filter (Tracking camera speed & scroll velocity)     │
│  • Micro-interaction SFX: Pentatonic tag chimes, card triggers, rumbles│
├────────────────────────────────────────────────────────────────────────┤
│  LAYER 0: VIRTUAL SCROLL DRIVER (#scroll Element)                      │
│  • Height: 750vh (Calculated as `count * 46vh`)                        │
│  • Smooth velocity damping with spring inertia                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Core Engineering Highlights

### 1. The Precompilation Loader Gate ("Tying the thread")
The application does not display until all shaders, textures, and geometries are asynchronously compiled via `renderer.compileAsync()`.
- Real-time percentage counter (`000` to `100`) accompanied by an expanding crimson laser rule.
- "Best with headphones" prompt offering two interactive entry paths: **[Enter with sound]** and **[Enter muted]**.
- Once entered, the `gate` class is stripped from `<html>`, unlocking page scroll and launching the 60fps render loop.

### 2. Camera Kinematics & Tangent Tracking
The camera does not simply translate along static waypoints. It features an advanced kinematic vehicle physics model:
- Camera position is sampled at `spline.getPointAt(t)`.
- Forward look target samples `spline.getPointAt(t + delta)`.
- **Bank Angle Calculation**: Lateral curvature $\kappa$ and lateral mouse velocity calculate an authentic aircraft banking angle:
  $$\text{bank} = \text{clamp}(-\text{latV} \times 0.5 - \text{sx} \times 0.3 - \vec{u} \cdot \vec{S} \times 2.2, -0.9, 0.9)$$
- **Spring Damped Parallax**: Cursor position provides gentle pitch and yaw offsets without desynchronizing from the thread tangent.

### 3. Screen-Projected 3D Landmark Pins (`.ft-tag`)
As landmark coordinates pass near the camera in 3D space, they are projected to screen space in real time:
$$\vec{p}_{\text{screen}} = \vec{v}_{3D} \cdot \mathbf{M}_{\text{view}} \cdot \mathbf{M}_{\text{proj}}$$
- Normalized Device Coordinates (NDC) are converted to viewport pixels.
- Dynamic visibility and opacity fade based on distance: $d < 48\text{ units}$.
- Renders an expanding SVG leader line, coordinate reticle (`.ft-dot`), and glassmorphic badge with monospace metadata.

### 4. Reactive Web Audio API Synthesis
Zero reliance on bloated third-party audio libraries:
- Native Web Audio graph containing a master gain, biquad lowpass filter, dynamics compressor, and convolution reverb.
- Dynamic cutoff frequency responds directly to scrolling speed:
  $$f_{\text{cutoff}} = \text{clamp}(120, 19000, f_{\text{base}} \times (1 - v_{\text{scroll}} \times 0.6))$$
- Interactive micro-sounds: Pentatonic sine chimes on tag reveal (`880Hz`, `988Hz`, `1175Hz`, `1319Hz`, `1568Hz`), triangle click pings (`1320Hz`), and low-frequency resonant air sweeps on station transitions.

---

## 🚀 Quickstart

```bash
# Install dependencies
npm install

# Run local development server (port 3000/5173)
npm run dev

# Build production bundle
npm run build

# Build and deploy to Cloudflare Worker
npm run deploy:worker
```

---

## 📁 Repository Structure

```
onethread/
├── README.md               # Architecture overview, flight map & stack
├── ADAPTED_PROMPT.md       # Master specification prompt for 1:1 replication
├── BUILD_LOG.md            # Deep-dive math, GLSL shaders & audio graph
├── index.html              # Fixed semantic DOM structure & gate loader
├── vite.config.ts          # Build configuration & asset bundling
├── package.json            # Dependencies & deployment scripts
└── public/
    ├── assets/
    │   ├── engine.js       # Core Three.js flight engine & shaders (887KB)
    │   └── style.css       # Complete luxury editorial design system (25KB)
    ├── fonts/
    │   └── geist-latin-var.woff # Primary variable font
    ├── models/
    │   └── figure.v2.glb   # 3D spatial flight asset
    ├── media/
    │   ├── audio/          # Spatial ambient soundscapes
    │   └── jumper/         # Interactive exhibition loop videos
    └── images/
        └── vouwloods/      # Studio photography for physical ventures
```

---

## ⚖️ Design System Contract

- **Canvas Background**: Pure Pitch Black (`#000000`).
- **Primary Ink**: Warm Ivory White (`--ink: #f2eee7`).
- **Secondary Ink**: Semi-transparent Ivory (`--ink-2: #f2eee79e`).
- **Tertiary Ink**: Muted Ivory (`--ink-3: #f2eee747`).
- **Accent Color**: Electric Crimson / Ember (`--accent: #ff3a26`).
- **Line Borders**: Fine Hairline Rule (`--line: #f2eee72e`).
- **Display Font**: `"Geist", "Helvetica Neue", -apple-system, sans-serif`.
- **Easing Curve**: `cubic-bezier(0.2, 0.7, 0.1, 1)`.
- **Gutter Padding**: `clamp(16px, 3.2vw, 48px)`.
