# ADAPTED PROMPT — "Measured" Multi-Surface Scroll Experience

The full specification prompt for the 5-surface interactive wearable landing page, followed by
the build adaptations applied while implementing it in this repository.

---

## 1. Original Specification

```
# Multi-Surface Scroll Experience: "Measured" Health & Wellness Wearable
Build a full-screen, multi-section scrollable landing page for "Measured" — a luxury health and wellness wearable device. The website is an immersive journey across **5 full-screen (100vh) interactive surfaces**.
Each surface features a dark luxury aesthetic, layered depth imagery, a grid background with parallax, and an interactive **cursor/touch-following spotlight reveal** that uncovers an underlying dynamic layer (video, sensor telemetry, or biometric visualizations) wherever the user hovers or drags.
Use React + Vite + Tailwind CSS + TypeScript.
---
## 1. Global Design System & Fonts
- **Inter** (weights 300–700): Set as the global default font (`font-family: 'Inter', sans-serif`).
- **Instrument Serif** (regular + italic): Loaded via Google Fonts (`family=Instrument+Serif:ital@0;1`). Used for all main section display headings.
- **Helvetica Neue / System Fallback**: Used for technical data labels, specs, and metric counters.
- **Color Palette:** Pure black (`#000000`), deep zinc (`#0a0a0a`), pure white (`#ffffff`), muted white opacities (`white/40`, `white/70`, `white/90`), and subtle emerald accents (`#10b981` / `green-400` for active sensors/status dots).
- **Smooth Scroll:** Enabled globally via `html { scroll-behavior: smooth; }` (disabled if `prefers-reduced-motion: reduce`).
---
## 2. Liquid Glass Design System (`.liquid-glass`)
Use the following exact CSS utility for floating navbar pills, interactive tags, and control elements:
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.02);
  background-blend-mode: luminosity;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.12);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.12) 25%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.12) 75%,
    rgba(255, 255, 255, 0.45) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

## 3. Persistent Fixed Navigation (z-50)
Header: Fixed at top, `px-6 md:px-10 pt-6 flex items-center justify-between`.
Logo (top-left): White custom vector SVG (28x28, viewBox 0 0 256 256): Path: M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z. Links to #hero.
Center Nav Pill (hidden on mobile): .liquid-glass pill with smooth scroll links:
"Device" → #hero
"Science" → #science
"Real Stories" → #stories
"Hardware" → #hardware
"Reserve" → #reserve. All buttons: text-white/70 hover:text-white text-sm font-medium px-4 py-2 transition-colors.
Right CTA Pill (hidden on mobile): .liquid-glass button with green status dot (w-2 h-2 rounded-full bg-emerald-400 animate-pulse) and text "Reserve Yours" linking to #reserve.
Mobile Hamburger & Fullscreen Drawer (z-55):
Smooth 2-line hamburger button.
Solid #0a0a0a fullscreen drawer with staggered slide-up animations for navigation items and a prominent "Reserve Yours" CTA. Body scroll locks when open.

## 4. Multi-Surface Interactive Architecture
Create an array of surfaces. Each surface is a pinned relative h-screen w-full overflow-hidden bg-black snap-start section.

Layer Stack for Every Surface:
Layer 0 (z-0): Parallax Grid: Repeating 48px SVG grid pattern (stroke="#64748b" opacity="0.1"). Subtly offsets based on cursor position ((cursor - center) * 12 with lerp factor 0.06).
Layer 1 (z-10): Static Base Atmosphere: Base high-resolution imagery and dark vignette gradients (from-black/80 via-transparent to-black).
Layer 2 (z-20): Editorial Content:
Heading in Instrument Serif (text-6xl sm:text-8xl md:text-9xl tracking-tight text-white).
Kicker label (text-xs tracking-[0.3em] uppercase text-emerald-400 font-mono).
Descriptive paragraph in Inter (max-w-md text-white/80 text-sm md:text-base leading-relaxed).
Real-time technical stat badge (e.g. 0.01s latency, 99.4% clinical grade, 7-day battery).
Layer 3 (z-30): Spotlight Reveal Layer:
Positioned in the lower 60% of the screen (clipPath: 'inset(40% 0 0 0)' or custom boundary).
An underlying active visual layer (looping video or high-density biometric visualization) that is only revealed under the cursor/touch spotlight.
Spotlight Mechanics:
Pointer tracking (pointermove, touchmove) with linear interpolation (LERP factor 0.1) using requestAnimationFrame.
Radial mask: Center radius 260px, feathered gradient falloff from 100% white down to transparent.
Generated dynamically via <canvas> or hardware-accelerated CSS mask (radial-gradient centered at --mouse-x, --mouse-y).
Mobile Touch Handling: When no active touch is detected, the spotlight drifts in a slow, hypnotic figure-8 breathing loop, snapping to user touch on touchstart/touchmove.
Layer 4 (z-40): Top/Bottom Readability Bleeds:
Top h-28 gradient (from-black/80 to-transparent) and bottom h-36 gradient (from-transparent to-black) to ensure seamless visual continuity across sections.

## 5. The 5 Interactive Surfaces
Surface 1 — #hero: "The Pulse of Form"
Heading: "Measured" (Giant serif text, text-[5rem] sm:text-[10rem] md:text-[14rem])
Subtext: "Continuous clinical-grade physiological intelligence, rendered invisible."
Base Layer: Atmospheric still image of the wearable on a wrist in low-key lighting: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260713_140344_79e1296a-86d7-43fd-9b5f-63ffe560f291.png&w=1280&q=85
Spotlight Reveal: Unveils looping video of the device in dynamic motion: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_162101_0d7498c5-29bb-47bf-a99f-2773c0a880a9.mp4
Stat Block: 54mg / "Weightless Grade 5 Titanium"

Surface 2 — #science: "Sub-Dermal Accuracy"
Heading: "Light That Sees Within"
Subtext: "Quad-wavelength PPG sensors sample arterial blood volume 250 times per second."
Spotlight Reveal: As the user moves their cursor over the wrist, the skin layer becomes translucent to reveal the pulsing optical sensor rays, capillary blood volume waveforms, and micro-vessel illumination.
Stat Block: 250 Hz / "Continuous Optical Sampling"

Surface 3 — #stories: "Circadian Rhythm"
Heading: "Tuned to Your Sleep Architecture"
Subtext: "Tracking autonomic nervous system recovery, micro-awakenings, and core thermal shifts."
Spotlight Reveal: Hovering over a deep night landscape reveals real-time hypnogram sleep stages and HRV (Heart Rate Variability) recovery curves.
Stat Block: +94% / "HRV Correlation with ECG"

Surface 4 — #hardware: "Zero Compromise"
Heading: "Forged in Medical Titanium"
Subtext: "Sapphire crystal sensor window. Water-resistant to 100 meters. 8 days without a dock."
Spotlight Reveal: Reveals an exploded schematic view of the internal flex circuits, battery cells, and custom silicon.
Stat Block: 100m / "Atmospheric Depth Resistance"

Surface 5 — #reserve: "Quiet Clarity"
Heading: "Own Your Rhythm"
Subtext: "Founding member batches shipping Spring 2027. Includes lifetime membership and custom sizing kit."
Spotlight Reveal: Gentle iridescent reflection highlighting the mirror-finish metallic luster of the device.
Interactive Action: Frosted-glass finish selector (Matte Onyx, Raw Titanium, Champagne Gold) and "Reserve Batch 01" checkout button.

## 6. Performance & Lifecycle Optimization
Selective Rendering: Implement an IntersectionObserver (threshold 0.25). Only the currently visible surface computes cursor animations or plays background media. Inactive surfaces pause video and suspend render loops.
Single Semantic Heading: Chapter 1 uses a single <h1> for "Measured". Subsequent surfaces use <h2> to maintain perfect WCAG accessibility and SEO structure.
Clean Code Architecture: Organize data inside a structured SURFACES array so all copy, assets, and stats can be edited from one configuration object.
```

---

## 2. Build Adaptations

Decisions taken while implementing the spec above, so a future rebuild or port can reproduce them:

1. **GitHub Pages subpath support.** `base: './'` in `vite.config.ts` and all local asset
   paths in `src/data/surfaces.ts` are relative (`./img/…`), so the built site resolves
   correctly from any repository subpath
   (`https://<user>.github.io/<repo>/measured/`) or from `file://`.
2. **Asset strategy.** The hero keeps the spec's external higgs.ai base image and
   cloudfront loop video, but both have local fallbacks (`onError` → generated image in
   `public/img/hero-base.jpg`; video → animated CSS/SVG scene). Surfaces 2–5 use
   AI-generated local base imagery in `public/img/` (dark, low-key, emerald accents) so the
   site is fully self-contained.
3. **Revelation layers.** All four procedural reveals (PPG optics, sleep hypnogram, titanium
   exploded schematic, iridescent mirror finish) are implemented as memoized inline SVG/CSS
   components in `src/components/revelations/` — zero runtime dependencies, pausable via a
   `--play` CSS custom property.
4. **Specular finish selector.** The reserve finish selector (Matte Onyx / Raw Titanium /
   Champagne Gold) re-tints the iridescent device in the reveal layer in real time via
   per-finish tint variables, and the checkout button has a reserved confirmation state.
5. **Spotlight zone.** Implemented as an absolutely-positioned container starting at
   `insetTop`% of the section (configurable per surface: 40/38/20/34/32) with a
   hardware-accelerated `radial-gradient` CSS mask driven by `--mx/--my/--r`; a nested
   `zone-fade` linear mask feathers the zone's top edge (the spec's `inset(40% 0 0 0)`
   boundary, softened).
6. **Heading scale.** Hero: `text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[14rem]`;
   other surfaces: `text-5xl sm:text-7xl md:text-8xl lg:text-9xl` with one
   Instrument Serif *italic* accent word per heading (keeps the spec scale from overflowing
   at 768px).
7. **Grid parallax mapping.** Spec's `(cursor − center) * 12` is mapped to a normalized
   ±12px travel: `-(cursor/size − 0.5) * 24`, LERP 0.06.
8. **Section height.** `h-svh` (100svh) instead of `100vh` so mobile browser chrome never
   clips a surface; `min-h-[560px]` guards short landscape viewports.
