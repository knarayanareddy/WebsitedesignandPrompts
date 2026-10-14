# Vitalii Radov — Digital Designer & Framer Developer

Autonomous 1:1 replication of [Vitalii Radov's Portfolio](https://www.vitaliiradov.com/), an award-winning digital designer and Framer developer showcasing editorial layouts, kinetic typography, interactive product mockups, and structured design systems.

![Vitalii Radov Hero Editorial Layout](/Users/brightech/.gemini/antigravity/brain/a8799862-6265-4037-a33d-57afea018fef/vitalii_hero.png)

## Features

- **Swiss Editorial Typographic System**: Classic editorial styling pairing **Crimson Pro** (light, regular, italic, bold) with **Inter**, featuring custom open-type typographic features (`blwf`, `cv03`, `cv04`, `cv09`, `cv11`).
- **Interactive Device Mockups & Multi-State Galleries**:
  - `01. Promova` (*Blog, portfolio, personal website*) with interactive 4-tab screenshot switcher.
  - `02. Kalyna Studio` (*Studio, portfolio*) with multi-view perspective switcher.
  - `03. Nastaga` (*Agency, portfolio*) with device frame transitions.
- **Interactive Practice Matrix & Compass**: 3×3 capabilities grid featuring a center interactive hover compass box (`↑ Hover ↓ / ← →`).
- **Concentric Orbital Radar**: Procedurally rendered vector capabilities diagram illustrating studio breadth (Personal & Portfolio, Studios & Agencies, Blog & Editorial, Gallery & Exhibition).
- **Curved Undulating Process Spine**: Dynamic SVG dashed timeline connecting 5 stages of design & development (`Discovery`, `Direction`, `Design & Build`, `Refinement`, `Launch & Handoff`).
- **Real-Time Weather & Geocoding Display**: Header live status widget displaying local time, temperature, and atmospheric conditions.
- **100% Self-Contained Local Assets**: 94 localized assets (Crimson Pro & Inter WOFF2 fonts, WebP device renders, SVGs, MP4 reel, search indices) with zero external CDN dependencies.

## Directory Structure

```
vitaliiradov/
├── index.html           # Main semantic document with inline layout & component tree
├── fonts/               # 48 localized WOFF2 font subsets (Crimson Pro & Inter)
├── images/              # 48 localized WebP & SVG project mockups and graphics
├── js/                  # 18 localized ES module chunks (Framer runtime & components)
├── media/               # Localized MP4 video reels
├── data/                # Local search indices, weather & geocoding data
├── ADAPTED_PROMPT.md    # Detailed engineering specification & generative prompt guide
├── BUILD_LOG.md         # Full audit log & Puppeteer verification metrics
└── README.md            # Project overview documentation
```

## Running Locally

```bash
# Serve from repo root
npx serve . -l 3008

# Open in browser
open http://localhost:3008/vitaliiradov/
```
