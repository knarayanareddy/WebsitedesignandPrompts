# Yogi Suria — Design Partner (1:1 Autonomous Replication)

A 1:1 autonomous replication of **[Yogi Suria](https://ysuriadesign.com/)** (`Stoik Agency®`), a neoclassical digital design portfolio for Web3 and AI founders. Featuring a 3D Spline neoclassical marble bust with headphones, interactive project reels, a live Twitter social proof ticker, engraved dual-approach cards, and a panoramic sky footer.

---

## Overview & Highlights

- **Visual Direction**: High-contrast brutalist meets neoclassical digital sculpture. Muted grey background (`#E5E5E5` / `#ECECEC`) with subtle vertical column grid guidelines.
- **3D Spline Neoclassical Hero**:
  - Centerpiece 3D sculpture of a classical Greek/Roman marble philosopher wearing over-ear headphones, holding an iPhone in one hand and a MacBook Pro in the other.
  - Powered by embedded `@splinetool/viewer` with local Draco WebAssembly geometry decompression.
- **Interactive Project Carousel**:
  - Dual-speed carousel featuring 27 `.webm` looping video reels and high-resolution WebP mockups.
- **Live Social Proof Ticker**:
  - Floating ticker bar displaying endorsements from Spline, HappyDesign, Kuba, Nick, and prominent Web3/design leaders with avatars and verified badges.
- **Engraved Approach Modules**:
  - **Approach 1: Traditional**: Methodical discovery, scoping, and documentation accompanied by an etching of the philosopher sitting cross-legged with a laptop.
  - **Approach 2: Just bring it**: Rapid execution without bureaucratic friction, accompanied by an etching of the philosopher doing one-arm pushups over a laptop.
- **Skyline Contact Footer**:
  - Panoramic blue sky with cumulus clouds, reclining classical statue, and direct mail action `reachout@yogindersuria.live`.

---

## Asset Breakdown

- **Total Local Assets**: 276 files (~26 MB)
  - `assets/scene.splinecode`: Local 7.6 MB 3D Spline scene.
  - `assets/vendor/`: `spline-viewer.js` + local Draco wasm decoder (`draco_wasm_wrapper.js`, `draco_decoder.wasm`).
  - `assets/hero-reels/`: 27 WebM looping video reels (`brand/` and `product/`).
  - `assets/videos/`: 1 MP4 project video reel (`banner-4-1.mp4`).
  - `assets/avatars/`: 11 Twitter verified profile avatars.
  - `assets/fonts/`: 11 Geist & Geist Mono subsets + `FKRasterRomanCompactTrial-Sharp.otf` + `Gellix-TRIAL-Regular.otf`.
  - `assets/framer/`: 25 Framer `.mjs` module chunks, 105 WOFF2 Inter subsets, and 47 WebP image assets.

---

## Local Verification & Testing

Run local server:
```bash
python3 -m http.server 3008
```
Navigate to `http://localhost:3008/ysuriadesign/`.

Audited via Puppeteer:
- **Console Errors**: 0
- **External Network Calls**: 0 (100% self-contained)
- **HTTP Status**: 200 OK
