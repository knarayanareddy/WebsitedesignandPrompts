# Places Organizer (`places-organizer`)

- **ID:** `places-organizer`
- **Category:** Travel
- **Type:** `mobile` (Page Type: `hero`, Tags: `mobile`)
- **Tier:** Premium
- **Video / Animated Preview:** https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/a/cosmicperplexArea.mp4
- **Live URL:** `https://motionsites.ai/?prompt=places-organizer`

## Visual & Architectural DNA (`design_similarity`)

> two ios device frames neutral pale grey stage travel places organizer app narrow garamond serif italic accents playfair elegant typography refined editorial calm sophisticated polished showcase compact

## Opening Build Specification (`prompts_public.search_keywords`)

```markdown
**Build a single-page HTML showcase displaying two iOS device frames (370x790px each) side by side on a neutral `#F4F4F4` stage. The stage auto-scales to fit the viewport using JS. Both phones have a Dynamic Island, status bar (time "11:11", signal/wifi/battery icons in white SVG), and a home indicator bar. Animations are gated behind video `loadeddata` events + font loading, with a 5s safety timeout.**
```

## Reconstructed Build Prompt

```markdown
**Build a single-page HTML showcase displaying two iOS device frames (370x790px each) side by side on a neutral `#F4F4F4` stage. The stage auto-scales to fit the viewport using JS. Both phones have a Dynamic Island, status bar (time "11:11", signal/wifi/battery icons in white SVG), and a home indicator bar. Animations are gated behind video `loadeddata` events + font loading, with a 5s safety timeout.**

### Visual Direction & Aesthetic DNA
- **Style & Atmosphere:** two ios device frames neutral pale grey stage travel places organizer app narrow garamond serif italic accents playfair elegant typography refined editorial calm sophisticated polished showcase compact
- **Reference Preview / Loop Media:** https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/a/cosmicperplexArea.mp4

### Technical & Motion Requirements
- Use semantic React components with Tailwind CSS utility classes and smooth Framer Motion (`motion/react`) entrance/scroll animations.
- If using an HLS (`.m3u8`) or MP4 background video, attach `hls.js` (for `.m3u8`) or native `<video autoPlay muted loop playsInline className="w-full h-full object-cover" />`.
- Ensure responsive typography, liquid glass / frosted surfaces where indicated by the visual DNA, and accessible interactive states.
```
