# Expa — Global Company Studio

Autonomous 1:1 replication of [Expa](https://www.expa.com), the global company studio founded by Garrett Camp (Uber co-founder) and built in collaboration with Bizarro Studio.

![Expa Hero Kinetic Typography and Parallax](/tmp/local_expa_assembled.png)

## Features

- **Procedural Dot Matrix Kinetic Typography**: Real-time generative point-sampling engine powered by p5.js and OpenType font glyph geometry (`Universal Sans Expa Display 530`). Procedurally renders and animates the signature dot matrix headline *"Expa is a Company Studio"*.
- **WebGL Particle Swarm Loader**: High-DPI canvas WebGL particle field rendering an interactive dot density map (`canvas/expa.png`) that dynamically converges into the hero presentation.
- **Lenis Smooth Virtual Scroll & Parallax Grid**: Staggered multi-column interactive card showcase highlighting studio companies (*Aero*, *Fin.com*, *Collective*, *Current*, *Iconic*, *Pin*, *First*, *Metabase*, *Cmd*, *Layer*) with smooth momentum damping.
- **Full PJAX View Transitions**: Seamless subpath-aware client routing between **Companies** (`/`) and **About** (`/about/`), updating page state, DOM trees, and navigation chrome without full document reloads.
- **100% Localized Self-Contained Assets**: 153 localized media assets (117 SVGs, 25 WebP, 8 WebM, 2 MP4, 1 PNG), 10 custom Universal Sans & Expa Dots webfonts, vector SVG sprite sheets, and favicons with zero remote CDN dependencies.

## Directory Structure

```
expa/
├── index.html           # Companies (Home) view with hero canvases & company cards
├── about/
│   ├── index.html       # About view with studio methodology, team, & history
│   └── favicon/         # Subpath favicon assets
├── bundle.css           # Responsive layout, typography & transition styles (77KB)
├── bundle.js            # p5.js generative engine, Lenis scroll, & PJAX router (1.3MB)
├── bundle.svg           # Local vector icon sprite sheet
├── symbols.svg          # Inline symbol definitions
├── canvas/
│   └── expa.png         # WebGL particle density map
├── fonts/               # 10 Universal Sans & Expa Dots WOFF/WOFF2 font files
├── favicon/             # Complete favicon suite & webmanifest
├── assets/              # 153 localized brand logos, photos, and video cards (24MB)
├── ADAPTED_PROMPT.md    # Detailed engineering specification & generative prompt guide
├── BUILD_LOG.md         # Complete verification audit log & Puppeteer test results
└── README.md            # Project overview documentation
```

## Running Locally

```bash
# Serve from repo root
npx serve . -l 3008

# Open in browser
open http://localhost:3008/expa/
open http://localhost:3008/expa/about/
```
