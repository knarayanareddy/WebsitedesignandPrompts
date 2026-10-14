# Vitalii Radov — Digital Designer & Framer Developer
## Adapted Engineering & Prompt Specification

> **Source**: [https://www.vitaliiradov.com/](https://www.vitaliiradov.com/)  
> **Creator**: Vitalii Radov  
> **Role**: Digital Designer & Framer Developer  
> **Stack**: Framer SSG, React Runtime, Motion, Crimson Pro Typography, Localized Media System.

---

### 1. Architectural Concept & Aesthetic Vision

The Vitalii Radov portfolio exemplifies Swiss editorial minimalism, structured informational design, and calm interactive craftsmanship:

1. **Typographic Rhythm & Hierarchy**:
   - Masterful editorial pairing of **Crimson Pro** (classic high-contrast serif with stylistic open-type features `blwf`, `cv03`, `cv04`, `cv09`, `cv11`) and **Inter** (clean neutral sans-serif).
   - Prominent italic serif introduction: *"Hello there, I'm Vitalii."* with dashed interactive underline.
   - Large display headlines with generous letter-spacing and disciplined line-height.

2. **Narrative Sectional Structure**:
   - `I. Intro`: Hero headline, mission statement, contact CTA, and floating device mockup gallery.
   - `II. Work`: Selected productions (*Promova*, *Kalyna Studio*, *Nastaga*) with multi-state tabbed device views.
   - `III. Fields of Practice`: 3×3 matrix grid featuring a central interactive hover box (`↑ Hover ↓ / ← →`).
   - `IV. Capabilities`: Procedural concentric orbital circles mapping design reach.
   - `V. Outcomes`: Client value proposition and benefit checklist.
   - `VI. Process`: Sinusoidal dashed timeline connecting 5 execution phases.
   - `VII. Contact`: Clean tabular inquiry form and direct contact links.

3. **Dynamic Chrome & Real-Time Context**:
   - Top status bar featuring real-time timestamp, weather condition, and temperature.
   - Fixed bottom-left section counter ("I. Intro", "II. Work", etc.) synchronizing with viewport scroll position.

---

### 2. Complete Asset & Dependency Matrix

The replication is 100% self-contained within `./vitaliiradov/`:

| Asset Category | Directory | Contents |
| :--- | :--- | :--- |
| **Document** | `./` | `index.html` (Complete semantic DOM & inline CSS styles) |
| **Fonts** | `fonts/` | 48 localized WOFF2 files (Crimson Pro 300/400/700 normal/italic, Inter subsets) |
| **Images** | `images/` | 48 localized WebP & SVG files (Device mockups, icons, UI chrome) |
| **Scripts** | `js/` | 18 localized ES module chunks (React runtime, Motion, components) |
| **Media** | `media/` | Localized MP4 video reels |
| **Data** | `data/` | `weather.json`, `geocode.json`, `searchIndex-*.json` |

---

### 3. Engineering Implementation Details

#### Local Path Normalization
All external CDN paths (`https://framerusercontent.com/...`, `https://api.fetch.tools/...`) are replaced with relative paths:
- `./fonts/[id].woff2`
- `./images/[id].webp`
- `./js/[module].mjs`
- `./data/[dataset].json`

#### Zero-Dependency Execution
- External editor telemetry disabled.
- Static fallback payloads for weather and geocoding provide 100% offline uptime.
- Route hydration handles arbitrary subfolder hosting on GitHub Pages.
