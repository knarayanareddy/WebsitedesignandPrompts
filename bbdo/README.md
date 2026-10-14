# BBDO Germany — Creative Agency Showcase

Autonomous 1:1 replication of [BBDO Germany](https://bbdo.bizarro.dev/), designed and developed by Bizarro Studio.

![BBDO Hero Showcase](/tmp/bbdo_local_03_hero_dragged.png)

## Features

- **Typographic Preloader & Curtain**: Sequential typographic reveal ("Hello" &rarr; "we" &rarr; "are" &rarr; logo expand) with countdown progress indicator, SKIP button, and dual split-column curtain.
- **Tilted 3D Hero Carousel**: Skewed horizontal draggable card carousel (01–06) with progress bar and pagination.
- **Ambient Blur Work Showcase**: Case study gallery (01–04) with dynamic blurred background crossfading.
- **Agency Stats & Marquee**: Kinetic statistics counter with infinite animated typographic ribbon.
- **Dual-Row Partner Logo Tickers**: Infinite SVG marquee displaying 18 international brands.
- **Full-Screen Menu Overlay**: Red-orange interactive menu with hover image previews, bilingual switch, and social buttons.
- **WebGL Displacement Canvas**: Fluid liquid shader distortion powered by OGL and noise displacement maps.
- **Zero Remote Dependencies**: 100% self-contained local fonts, SVG sprites, and assets.

## Directory Structure

```
bbdo/
├── index.html           # Main markup with inlined SVG symbols & clean structure
├── styles.css           # Complete responsive stylesheet with Gotham HTF fonts
├── script.js            # Webpack bundle powering WebGL, GSAP motion & virtual physics
├── ADAPTED_PROMPT.md    # Detailed engineering specification & design breakdown
├── BUILD_LOG.md         # Full audit log & verification steps
├── README.md            # Project documentation
└── assets/
    ├── fonts/           # Gotham HTF webfonts (book, bold, black, ultra)
    ├── logos/           # 18 vector SVG partner logos
    ├── images/          # Campaign photos and blurred ambient backdrops
    ├── favicon/         # Touch icons, webmanifest, browserconfig
    └── build/           # Displacement noise map & SVG spritemap
```

## Running Locally

```bash
# Serve from repo root
npx serve . -l 3008

# Open in browser
open http://localhost:3008/bbdo/
```
