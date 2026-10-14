# Expa — Global Company Studio
## Adapted Engineering & Prompt Specification

> **Source**: [https://www.expa.com/](https://www.expa.com/)  
> **Studio**: Expa (Garrett Camp) & Bizarro Studio ([https://bizar.ro/](https://bizar.ro/))  
> **Implementation**: Standalone HTML5, WebGL Particle Engine, p5.js Kinetic Dot Matrix Typography, Lenis Smooth Virtual Scroll, Custom PJAX View Transition Router, Universal Sans & Expa Dots Typography.

---

### 1. Architectural Concept & Aesthetic Vision

Expa's digital identity blends minimal Swiss editorial rigor with cutting-edge creative technology, featuring a bespoke dot matrix design system that manifests across procedural canvases, custom typography, and card grids.

1. **Procedural Dot Matrix Kinetic Typography**:
   - Built on p5.js and OpenType vector font glyph parsing.
   - Points are sampled along the vector outlines of `Universal Sans Expa Display 530`.
   - Each sampled point renders as a dynamic circular dot with distance-based physics, subtle oscillation, and cursor repulsion/attraction.
   - Seamlessly constructs the monumental headline statement *"Expa is a Company Studio"*.

2. **WebGL Particle Field Loader**:
   - Canvas-based particle swarm (`canvas.introduction__canvas`) powered by WebGL.
   - Samples pixel density from `canvas/expa.png` to determine target coordinate vectors for thousands of floating particles.
   - Physics simulation interpolates velocity, drag, and cohesion to assemble the initial logo mark and transition smoothly into the main hero view upon page load.

3. **Multi-Column Parallax Grid & Lenis Virtual Scroll**:
   - Staggered multi-column layout showcasing studio portfolio companies:
     - *Aero* (Next-generation aviation)
     - *Fin.com* (Work automation & AI)
     - *Collective* (All-in-one financial platform)
     - *Current* (Modern banking)
     - *Iconic* (AI-powered digital identity)
     - *Pin* (Decentralized storage)
     - *First* (Real estate intelligence)
     - *Metabase* (Open source business intelligence)
     - *Cmd* (Linux infrastructure security)
     - *Layer* (Enterprise communications)
   - Virtualized wheel scrolling driven by Lenis provides smooth inertial dampening and parallax depth between columns.

4. **Subpath-Aware PJAX Client Router**:
   - Custom pushState / PJAX router intercepting link navigation.
   - Fetches target HTML templates, swaps `.app` view container, and triggers lifecycle hooks (`destroy` / `createPage`).
   - Normalizes route paths with `window.__EXPA_BASE__` to support arbitrary base subpaths and static hosting on GitHub Pages.

---

### 2. Complete Asset & Dependency Matrix

The replication is 100% self-contained within `./expa/`:

| Asset Category | Directory | Contents |
| :--- | :--- | :--- |
| **Core Bundles** | `./` | `bundle.js` (1.3MB), `bundle.css` (77KB) |
| **Typography** | `fonts/` | 10 custom WOFF/WOFF2 font files (`expa-dots`, `universal-sans-530`, `universal-sans-expa-display-450`, `universal-sans-expa-display-530`, `universal-sans-expa-display-730`) |
| **Vector Icons** | `./` | `bundle.svg` (sprite sheet), `symbols.svg` (inline symbols) |
| **WebGL Particle Map** | `canvas/` | `expa.png` (particle density map) |
| **Favicons** | `favicon/`, `about/favicon/` | Complete favicon set (`apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `favicon.ico`, `safari-pinned-tab.svg`, `site.webmanifest`) |
| **Company Media** | `assets/` | 153 localized media files: 117 SVGs, 25 WebP, 8 WebM, 2 MP4, 1 PNG (24MB total) |
| **HTML Views** | `./`, `about/` | `index.html` (Companies / Home), `about/index.html` (About view) |

---

### 3. Engineering Implementation Details

#### Dynamic Path Resolution
Asset paths in `bundle.js` are dynamically resolved using `window.__EXPA_BASE__`:
```javascript
window.__EXPA_BASE__ = window.location.pathname.replace(/\/(about\/?)?$/, "") + "/";
```
This guarantees flawless execution when served at root (`/`), subfolder (`/expa/`), or GitHub Pages (`/WebsitedesignandPrompts/expa/`).

#### Verification Metrics
- **Console Errors**: 0 errors across all routes.
- **Network Requests**: 100% local resolution, 0 external CDN calls.
- **Canvases**: 9 active WebGL / p5.js canvases rendering at device pixel ratio.
- **Transitions**: Flawless bidirectional PJAX routing between Home and About.
