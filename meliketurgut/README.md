# Melike Turgut — me · like (1:1 Autonomous Replication)

A 1:1 autonomous replication of **[Melike Turgut](https://meliketurgut.com/)** (`me · like`), a tactile, interactive digital collection of eight career chapters told through 3D gummy candy physics, editorial storytelling, and kinetic typography.

---

## Overview & Highlights

- **Visual Theme**: Minimalist soft sage canvas (`#eaece5`) anchored by the hero typographic anchor `me` [8 interactive candies] `like` in deep olive (`#40400c`) using *Pangram Pangram Agrandir*.
- **Tactile 3D Gummy Candies**: 8 unique glossy candy charms (*bow*, *flower*, *bean*, *pretzel*, *squiggle*, *heart*, *pebble*, *clover*) powered by custom WebGL shaders, Three.js alpha-hashing, and spring physics.
- **Editorial Chapters**:
  - `01. Digitas` (2011) — *Bow Candy*
  - `02. MRM` (2011—12) — *Flower Candy*
  - `03. SYPartners` (2012—14) — *Bean Candy*
  - `04. R/GA` (2014—16) — *Pretzel Candy*
  - `05. AKQA` (2016—17) — *Squiggle Candy*
  - `06. Squarespace` (2017—20) — *Heart Candy*
  - `07. Instagram` (2020—23) — *Pebble Candy*
  - `08. Shopify` (2023—25) — *Clover Candy*
- **Interactive Mechanics**:
  - **The Plot Slider**: Draggable mini-candy handle with custom track to scrub through chapter storylines and reveal extra details.
  - **Secret X-Ray Note**: Hidden handwriting notes in *Belmonte Ballpoint* revealed on hover/drag.
  - **Story Sheet**: Slide-out editorial card with *PP Editorial New Ultralight* headline numerals and responsive media embeds (videos, high-res webp).
  - **About Sheet**: Expanding biographical story with backdrop blur and Pangram Pangram credits.

---

## Asset Breakdown

- **Total Local Assets**: 142 files (~68 MB)
  - `assets/`: 4 WOFF2 fonts (*Agrandir Regular*, *Agrandir Tight*, *PP Editorial New Ultralight*, *Belmonte Ballpoint Cursive*).
  - `assets/`: 8 JSON candy outline fixtures + 1 charm geometry descriptor.
  - `assets/`: 32 WebP candy renders across 4 resolutions (`-384`, `-640`, `-960`, base).
  - `assets/chapters/`: 80 media items (high-res WebP case study captures, posters, and looping MP4 clips).
  - `runtime/`: 5 ES module runtime chunks (Three.js WebGL shaders, gesture engine, spring physics, and view controllers).

---

## Local Verification & Testing

Run local server:
```bash
python3 -m http.server 3008
```
Navigate to `http://localhost:3008/meliketurgut/`.

Audited via Puppeteer:
- **Console Errors**: 0
- **Failed Network Requests**: 0
- **External CDN Calls**: 0 (100% self-contained)
