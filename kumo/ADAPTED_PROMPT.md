# Kumo (Layers Studio) — Hand-Painted 2D Japanese Anime Animation Studio

> **Adapted Implementation & Prompt Specification**  
> **Source Inspiration**: [GetLayers AI — Kumo](https://www.getlayers.ai/templates?layer=kumo)  
> **Live GitHub Pages URL**: [https://knarayanareddy.github.io/WebsitedesignandPrompts/kumo/](https://knarayanareddy.github.io/WebsitedesignandPrompts/kumo/)

---

## 1. Design Philosophy & Aesthetic Blueprint

Kumo is a hand-painted 2D Japanese anime animation studio website told as one unbroken continuous shot through an autumn city, sewn together by clouds and multi-plane cel animation layers.

- **Creative Direction**: "A hand-painted animation studio told as one unbroken shot through an autumn city, sewn together by clouds."
- **Artistic Influence**: Makoto Shinkai (*Your Name*, *Weathering with You*) and Studio Ghibli (*The Wind Rises*), blended with brutalist broadcast monitor ergonomics and Japanese editorial layout principles.
- **Color Palette**:
  - Warm parchment canvas: `#ece6dc` / `#f4f0e8`
  - Charcoal ink: `#111111` / `rgba(17,17,17,0.65)`
  - Japanese Autumn Maple & Ginkgo: `#ef5d44` (vermilion), `#fcdd71` (ginkgo yellow), `#e06c28` (persimmon amber)
  - Sky Cerulean & Deep Indigo: `#9fd5f7`, `#203a60`
- **Typography**:
  - Editorial Serif: **Newsreader** (variable font weight 400–700, italic) for high-impact cinematic headlines and poetic project titles.
  - Engineering Monospace: **Space Mono** (400, 700) for studio timecodes, broadcast telemetry, kanji annotations, and audio/CRT toggles.
  - Classical Display: **Cinzel** (600–800) for traditional stamps and commemorative markings.
- **Hardware Texture**:
  - CRT scanline raster overlay (toggleable via the floating bottom dock: `CRT: On/Off`).
  - Studio monitor corner registration brackets (`┌ ┐ └ ┘`).
  - Live ticking broadcast clock (`18:49:16 ABOVE THE CITY · SC 01`).

---

## 2. Key Interactive Features & Architecture

1. **Procedural ASCII Matrix Cloud Preloader**:
   - Dynamic real-time canvas character wave synthesis (`@ % # * + = - : .`).
   - Harmonic noise algorithms simulate drifting cumulus clouds in golden autumn sunlight.
   - Live percentage counter (`000%` → `100%`), telemetry status ticker (`DRAWING THE CITY...` → `INKING AUTUMN LIGHT...`), and user "Skip intro" bypass.
2. **Unbroken 3D Anime Movie Scrollytelling Engine**:
   - Single continuous 3D camera flight scrubbed smoothly by page scroll across 600vh:
     - **Scene 01: Above the City** — Diving from radiant golden cumulus clouds over Mt. Fuji.
     - **Scene 02: Golden Boulevard** — Swooping down into a sun-drenched Tokyo avenue lined with amber ginkgo trees.
     - **Scene 03: Looking Up** — Gliding up towering glass skyscraper facades into the autumn sky.
     - **Scene 04: The Animator's Room** — Flying through the window into the warm cozy studio room with paper drafts and drawing desk.
     - **Scene 05: Skyline Horizon** — Sweeping across the autumn city horizon, smoothly dissolving into the cream 3D amphitheater carousel.
   - **Zero-Latency Video Scrubbing Architecture**:
     - Encoded as an intra-frame-only (all I-frame, `-g 1`) MP4 asset (`kumo-scrub.mp4`) allowing instantaneous sub-3ms seeking without decoding stalls.
     - Processed with FFmpeg `delogo` inpainting filter to remove the stationary screen-recorder cursor without artifacts.
     - Non-blocking sequential seek queue (`applyVideoScrub`) with `isVideoSeeking` latch and `pendingScrubTime` preventing Chromium seek cancellations.
     - Clean typographic isolation: native anime typography displays pristinely on desktop without duplicate text ghosting; mobile renders a frosted-glass glassmorphism caption card.
     - Dual-mode fallback: automatically falls back to 5 high-resolution hand-painted cel stills if video is unavailable.
3. **Dual Amphitheater 3D Rotating Film Reel Ring**:
   - Revolving 3D cylinder carousel (`preserve-3d`, `rotateY`) with upper and lower tracks orbiting in opposing perspective inclinations (`rotateX(4deg)` and `rotateX(-4deg)`).
   - Momentum drag physics with inertia, touch swipes, and mouse wheel scrubbing.
   - Center editorial display crowns the active front-facing project title and metadata (*"Paper Weather — Brand film · 1:30 · 2026"*).
   - Synchronized bottom control updates (`02 / 06 PAPER WEATHER — WATCH FILM ▶`).
4. **Interactive Cinema Viewer Modal**:
   - Clicking any 3D card or the "Watch Film" trigger opens the responsive cinema player modal with video playback, film synopsis, and technical tags (`24 FPS · HAND-PAINTED`).
5. **Atmospheric Cloudscape Contact Footer**:
   - Infinite kinetic marquee banner (`View us ● Have a brief? ● Ship on paper ● Layers Studio ●`).
   - Direct mail link (`hello@layers.studio ↗`), studio locations (Tokyo & Montreal), and colophon.
6. **Web Audio Ambient Chimes Synthesizer**:
   - Toggleable Web Audio API sound generator providing subtle pentatonic chime reverberations when browsing.

---

## 3. Reverse-Engineered System Prompt

Use the prompt below to recreate this complete experience in any new environment:

```markdown
Create a single-page, self-contained interactive website for "Kumo (Layers Studio)", an award-winning hand-painted 2D Japanese anime animation studio inspired by Makoto Shinkai and Studio Ghibli.

TECHNICAL CONSTRAINTS:
- Single self-contained HTML file (index.html) with inline CSS and vanilla JavaScript.
- Zero external tracking scripts, zero npm dependencies, zero framework lock-in.
- Self-hosted variable woff2 fonts (Newsreader, Space Mono, Cinzel) and local imagery/video.
- Fully offline-capable and responsive across mobile (390px), tablet, and ultrawide desktops.

KEY SECTIONS & EXPERIENCES:
1. ASCII Matrix Cloud Preloader:
   - Full-screen parchment canvas (#ece6dc) featuring real-time procedural ASCII cumulus cloud synthesis.
   - Dynamic ticker status ("Inking autumn light...", "Entering the city...") with a 000% -> 100% counter and skip button.
2. Studio Monitor Frame & Scanlines:
   - Fixed broadcast monitor registration marks (┌ ┐ └ ┘) around the viewport edges.
   - Scanline raster overlay that can be toggled on/off via a bottom utility dock.
3. Persistent Studio Navigation Header:
   - [ 層 ] Layers brand identity with kanji badge.
   - Three columns of links: Films/Clips/Brand films, About/Process/Journal, Say hello/Careers.
   - Live timecode clock (HH:MM:SS) paired with real-time active scene tag (e.g., ABOVE THE CITY · SC 01).
   - "Start a project" CTA button with pulsing amber status indicator.
4. Continuous Unbroken Scrollytelling:
   - 600vh sticky narrative container with smooth lerped scroll progression.
   - 5 hand-painted anime scenes crossfading seamlessly: Sky clouds, Golden boulevard, Looking up at facades, Animator's room desk, and Panorama horizon.
   - Synchronized typography with large Newsreader headlines, descriptive body copy, and vertical Japanese kanji stamps.
5. Dual Amphitheater 3D Film Reel Ring:
   - 3D CSS cylinder carousel (perspective: 1400px, preserve-3d) featuring 6 project film cards arranged in an upper tier and a lower tier.
   - Drag, touch swipe, and wheel scroll rotation with smooth inertia lerping.
   - Center space displays active project title ("Paper Weather", "Last Tram", etc.) and runtime metadata.
   - Dynamic bottom action bar showing active index and "WATCH FILM ▶" button.
6. Cinema Film Viewer Modal:
   - Accessible lightbox modal with video player, synopsis, and production tags (24 FPS, Hand-painted, Gouache).
7. Kinetic Footer:
   - Infinite animated marquee banner ("Have a brief? ● Ship on paper ● Layers Studio ●").
   - Large serif contact mailto link, colophon details, and copyright.
8. Interactive Utility Dock:
   - Sound toggle button (Web Audio API ambient chime synth).
   - CRT scanline effect toggle button.
```
