# Luis Bizarro — Creative Technologist Project Archive

Autonomous 1:1 replication of [Luis Bizarro Projects Archive](https://projects.bizar.ro/), showcasing decades of creative technology productions for Apple, Airbnb, Active Theory, National Design Studio, UNIT9, and independent studios.

![Luis Bizarro 3D Cassette Tower](/tmp/local_bizarro_02_hover.png)

## Features

- **Procedural 3D Cassette Tower**: Built on Three.js r186 with WebGL 2.0. Procedurally synthesizes high-fidelity Sony cassette tape models (plastics, spools, labels, and glass sheen) in real time.
- **Dynamic HUD Reticle & Tracker**: Interactive raycast crosshair tracking cassette coordinates (`X / Y`), project details, and hovering micro-video previews.
- **Inertial Wheel Navigation**: Smooth physics scrolling through the vertical cassette tower archive.
- **Procedural Web Audio**: Real-time tape click and whir sound effects synthesized via Web Audio API oscillators and filters.
- **Keyboard Accessible Drawer**: Full semantic markup and focus-within navigation drawer for screen readers and keyboard users.
- **100% Self-Contained Assets**: 80 localized media files (59 WebP, 21 MP4) and local typography with zero external dependencies.

## Directory Structure

```
bizarro/
├── index.html           # Main markup with semantic project list & UI chrome
├── ADAPTED_PROMPT.md    # Detailed engineering specification & prompt guide
├── BUILD_LOG.md         # Full verification audit log
├── README.md            # Project overview documentation
├── poster.webp          # Initial blur backdrop
├── bizarro.webp         # Brand logomark
├── og.jpg               # OpenGraph card
├── favicon.png          # Favicon
├── apple-touch-icon.png # Touch icon
├── assets/
│   ├── index-DYQWZS1f.js    # Three.js r186 + application bundle (665KB)
│   ├── index-DPqIsaom.css   # Responsive UI styles (4.4KB)
│   └── fonts/
│       └── inter-400.woff2  # Local Inter typography (47KB)
└── projects/            # 80 project media assets (59 WebP images, 21 MP4 clips)
```

## Running Locally

```bash
# Serve from repo root
npx serve . -l 3008

# Open in browser
open http://localhost:3008/bizarro/
```
