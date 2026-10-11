# Halcyon — Time, Cast in Gold | Reverse-Engineered Prompt & Design Spec

## Executive Overview
- **Project**: Halcyon (Project #23)
- **Reference**: [GetLayers Halcyon Template](https://www.getlayers.ai/layer/halcyon)
- **Core Concept**: A pocket watch drifts above an endless sea as the sky burns from dawn to dusk to moonlit night — a slow, cinematic voyage for a timepiece made to outlast generations.
- **Stack**: Single-file HTML5/CSS3/Vanilla JS, zero npm, zero external build tools, self-hosted fonts and assets.

---

## Reverse-Engineered Prompt Specification

```markdown
Build a production-grade, single-file HTML/CSS/JS luxury horology landing page titled "Halcyon — Time, Cast in Gold" (Sub-headline: "Haute Horlogerie · A Watch Without End").

ZERO external runtime libraries, zero build steps, and zero npm packages. All HTML, inline <style>, and vanilla <script> must be inside one document. All fonts, images, and video must be self-hosted locally under assets/.

1. Fixed Cinematic Stage:
   - Full-viewport fixed stage running a scroll-synchronized 3D voyage across an endless calm ocean (`assets/video/halcyon_voyage.mp4`).
   - Seamlessly transitions through four biomes based on scroll depth:
     1. Golden Hour (0% - 25%): Pastel azure dawn with golden sun haze, brass gate arch, and the pocket watch floating dead center.
     2. Smouldering Dusk (28% - 55%): Blazing sunset with copper/lavender reflections, the brass ring framing the setting sun, and the watch dipping and rising with an iridescent oily shimmer.
     3. Moonlit Night (58% - 85%): Deep twilight purple with thousands of shimmering stars, silver moonbeam water caustics, and the pocket watch viewed edge-on (90° profile) showing its winding crown and case thickness.
     4. Emerald Dawn (88% - 100%): Ethereal mist over turquoise jade water, the pocket watch facing directly forward showcasing its Roman numeral enamel dial, oxidized Fleur-de-lis hands, and "SHOP NOW →" action.

2. Center-Docked Glass Navigation Pill:
   - Floating glassmorphism pill with `backdrop-filter: blur(24px)`, rounded borders, and subtle inner glow.
   - Blackletter brandmark: "Halcyon".
   - Chapter navigation links: "Origin" (0%), "Forge" (33%), "Heritage" (66%), "Shop" (100%).
   - Dynamic active indicator highlighting the current chapter.
   - Built-in Web Audio API ambient sound toggle button with real-time waveform animation.

3. Live Web Audio Synthesizer:
   - Dual-layer procedural audio engine:
     a) Oceanic swell: Filtered pink noise buffer with slow LFO modulation simulating calm horizon waves.
     b) Mechanical pocket watch escapement: 2.5 Hz (5 ticks per second, 18,000 vibrations/hour) pallet fork impulse clicks with metallic resonance decay.

4. Narrative Blackletter Text Beats:
   - Centered above the water horizon using authentic Fraktur/Blackletter typography:
     - Beat 1: "Halcyon" · "Time, Cast In Gold"
     - Beat 2: "Forged In Fire" · "Tempered To Outlast Time"
     - Beat 3: "Through The Night" · "Wound By Generations"
     - Beat 4: "Timeless" · "A Watch Without End" + "SHOP NOW →"
   - Liquid blur and opacity dissolve transitions triggered smoothly as the user navigates between chapters.

5. Interactive Atelier Shop Drawer:
   - Slide-out luxury showcase drawer triggered by clicking "Shop" or "SHOP NOW →".
   - Interactive 3D tilt card allowing the user to rotate and tilt the pocket watch with mouse physics.
   - Toggle between the antique enamel Roman dial with Fleur-de-lis crest and the hand-forged Damascus steel caseback.
   - Horological dossier detailing Calibre H-1889, frequency (18,000 vph), 48-hour dual-barrel power reserve, 21 rubies, double-curved sapphire crystal, and $18,500 price.
   - Commission and allocation reservation form with edition selector (No. 042 / 100) and toast confirmation feedback.

6. Bottom Telemetry & Navigation Dock:
   - Real-time biome indicator ("Golden Hour", "Smouldering Dusk", "Moonlit Night", "Emerald Dawn").
   - Quick jump chapter dots.
   - Scroll percentage readout ("00%" → "100%").
   - Direct shortcut button to open the Atelier Dossier.
```

---

## Design Tokens

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--gold` | `#d4af37` | 24K gold accents, active indicators, and pushpins |
| `--gold-light` | `#f5e8b7` | Golden hour glow and twilight highlights |
| `--brass` | `#c5a059` | Bezel and shackle metallic tone |
| `--ink` | `#0d0f12` | Obsidian contrast typography and luxury backdrops |
| `--paper` | `#f8f6f0` | Warm parchment dial enamel |
| `--glass-bg` | `rgba(255, 255, 255, 0.42)` | Navigation pill frosted glass surface |
| `--font-blackletter` | `'UnifrakturMaguntia', 'UnifrakturCook'` | Primary narrative headlines & Halcyon logo |
| `--font-serif` | `'Cinzel', serif` | Chapter labels, specifications, and button typography |
| `--font-sans` | `'Plus Jakarta Sans', sans-serif` | Technical specs, pricing, and form elements |
