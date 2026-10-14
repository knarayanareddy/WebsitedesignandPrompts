# Build Log: Yogi Suria — Design Partner (1:1 Replication)

## Architecture & Technology Stack
- **Framework & Runtime**:
  - Framer SSG with pre-rendered DOM, CSS variable design tokens, and React 18 hydration.
  - Custom `stoik.js` and `stoik.css` overlay layer managing hero displays, carousels, and pixel preloader.
  - `@splinetool/viewer` Web Component embedding local `.splinecode` with Draco WebAssembly decompression.
- **Typography**:
  - `FK Raster Sharp`: Pixelated display glyphs for hero headline stamps.
  - `Geist` & `Geist Mono`: Vercel's neo-grotesque sans and monospace families for UI and technical data.
  - `Inter`: General body and Framer components.
  - `Gellix`: Clean accent typography.

## Extraction & Localization Steps
1. **Network Discovery**:
   - Traced 166 network requests via Puppeteer headless Chromium.
   - Identified external calls to `prod.spline.design` (3D scene), `www.gstatic.com/draco` (decompression wasm), `html.aqlova.com` (banner video), `pbs.twimg.com` (Twitter avatars), `fonts.googleapis.com` (Geist fonts), and `framerusercontent.com` (assets).
2. **Asset Harvesting**:
   - Downloaded 214 host assets directly from `ysuriadesign.com`.
   - Downloaded `scene.splinecode` (7.6 MB) and Draco wasm binaries.
   - Downloaded 11 Twitter profile avatars and 23 Framer images.
   - Downloaded 11 WOFF2 Geist font subsets and compiled local `geist.css`.
   - Copied `FKRasterRomanCompactTrial-Sharp.otf` and `Gellix-TRIAL-Regular.otf` to `assets/`.
3. **Offline Resiliency & Script Sanitization**:
   - Patched `spline-viewer.js` to point Draco decoder from `gstatic.com/draco/...` to `./assets/vendor/draco/`.
   - Patched `stoik.js` line 36 from `https://prod.spline.design/...` to `./assets/scene.splinecode`.
   - Patched 18 Framer `.mjs` chunks to rewrite all `framerusercontent.com` URLs to relative paths (`../../assets/`, `../../images/`, `../../modules/`).
   - Patched `script_main.DRBmzTwq.mjs` route matching regex to strip `/ysuriadesign/` subfolder prefixes.
   - Removed early `/projects/*` redirect script and external Framer events telemetry.
4. **Verification**:
   - Puppeteer audit: 0 console errors, 0 external requests.
   - Verified 3D Spline bust, pixel preloader, video reels, and footer panorama.
