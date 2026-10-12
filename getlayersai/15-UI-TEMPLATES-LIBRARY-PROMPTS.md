# GetLayers AI — 10 Modular UI Template Prompts (`UI_PREVIEWS`)

Reversed-engineered from `00lwrpf20me7x.js`, GetLayers AI includes **10 reusable UI layout templates** that can be layered over any WebGL shader, 3D scene, or video background.

Each UI template supports `data-uit-theme="dark"` and `data-uit-theme="light"`, automatic hover spring physics (`--uit-hot="card"` and `--uit-hot="control"`), and SVG cutout window masks (`--uit-window="1"`).

---

## 1. Spotlight (`key: "spotlight"`)
**Concept**: Centered high-converting SaaS hero with top announcement pill, bold gradient headline, dual CTA buttons, and a floating glass product preview frame at the bottom.
```text
Build the "Spotlight" UI template overlay:
- Top floating navbar with brand mark, 4 centered links, and a pill CTA.
- Centered hero stack: glowing announcement badge ("New: Realtime Engine 2.0"), display headline (clamp(2.8rem, 6vw, 5.2rem)), 2-line muted lead paragraph, and primary solid + secondary frosted glass buttons.
- Bottom floating dashboard window with 1px translucent border, window traffic lights, and live metric cards that tilt slightly on pointer hover.
```

## 2. Bento (`key: "bento"`)
**Concept**: Asymmetric 4-card bento grid showcasing product features over a live WebGL background, where cards have cut-out windows revealing the shader underneath.
```text
Build the "Bento" UI template overlay:
- Compact header bar with breadcrumb and theme toggle.
- 12-column CSS Grid bento layout (2 rows):
  - Span-7 Card: Primary headline + live interactive toggle control.
  - Span-5 Card: Circular radial gauge and real-time counter.
  - Span-4 Card: Code snippet / API preview with copy button.
  - Span-8 Card: Horizontal feature timeline with spring-animated hover elevation.
```

## 3. Showcase (`key: "showcase"`)
**Concept**: Full-frame product showcase with bottom-anchored typography and floating specification pills.
```text
Build the "Showcase" UI template overlay:
- Minimalist corner-anchored navigation (top-left brand, top-right menu button).
- Unobstructed center stage so the underlying 3D scene or shader commands 70% of the viewport.
- Bottom-left oversized display title paired with bottom-right horizontal specification metrics and an arrow CTA button.
```

## 4. Atelier (`key: "atelier"`)
**Concept**: Luxury design studio / fashion house editorial layout with fine hairlines, serif numerals, and asymmetric columns.
```text
Build the "Atelier" UI template overlay:
- Full-width 1px hairline grid dividing the screen into 3 vertical columns.
- Italic editorial serif headline in the center column, Roman numeral index markers (I, II, III), and a rotating circular stamp badge in the bottom right.
```

## 5. Split Lab (`key: "divide"`)
**Concept**: 50/50 split-screen layout where the left half is a frosted glass content panel and the right half is an open window to the live WebGL canvas with HUD crosshairs.
```text
Build the "Split Lab" (divide) UI template overlay:
- Left 50% viewport: Frosted glass panel (backdrop-filter: blur(24px)) containing technical eyebrow, headline, feature checklist, and email capture form.
- Right 50% viewport: Transparent cutout window framed by corner reticles, live FPS/coordinate readouts, and an interactive parameter pill bar.
```

## 6. Exhibit (`key: "exhibit"`)
**Concept**: Museum / gallery exhibition poster layout with oversized border frame and curatorial metadata.
```text
Build the "Exhibit" UI template overlay:
- Outer 24px margin frame with thin hairline borders and exhibition dates in the top corners.
- Central cutout window (`--uit-window="1"`) framing the live WebGL shader like a hung artwork.
- Below the window: Artist name, work title, medium ("Procedural GLSL Shader, 60fps"), and an "Acquire / Inspect" CTA.
```

## 7. Lookbook (`key: "runway"`)
**Concept**: Editorial fashion/product lookbook with numbered slide indicators and floating thumbnail rail.
```text
Build the "Lookbook" (runway) UI template overlay:
- Vertical left-hand rail with rotated collection title ("AUTUMN / WINTER — ARCHIVE 04").
- Bottom-right floating glass card with item title, price/spec tag, and Next/Previous slide triggers.
```

## 8. Logo Wall (`key: "emerald"`)
**Concept**: Enterprise SaaS hero with social-proof customer logo marquee anchored at the bottom.
```text
Build the "Logo Wall" (emerald) UI template overlay:
- Enterprise navigation bar with product dropdown pills and "Book Demo" button.
- Centered hero copy with high-contrast badge, headline, and dual CTAs.
- Bottom-anchored 6-column glass grid displaying monochrome SVG partner logos that brighten on hover.
```

## 9. Festival (`key: "festival"`)
**Concept**: Event / conference launch page ("A World of Motion®") with ticket CTAs, speaker links, and vertical capability tags.
```text
Build the "Festival" UI template overlay:
- Top bar with brand mark, "Event schedule" and "Our speakers" two-line links, and a "Contacts" indicator.
- Giant display headline "A World of Motion®", followed by a horizontal row containing a lead paragraph ("Take control of your surfaces with live scenes, real-time colour and motion") and "Get tickets" + "Explore event" buttons.
- Right-hand vertical capability column listing "Living gradients", "Endless scenes", and "Connect with colour".
```

## 10. Field Notes (`key: "brutal"`)
**Concept**: Neo-brutalist swiss architectural grid ("Onda") with exposed 1px borders, agency stats ("WE SHIP 100+ SCENES A YEAR"), and founder booking card.
```text
Build the "Field Notes" (brutal) UI template overlay:
- Exposed structural border box around the viewport with internal horizontal rule dividers.
- Header row: Brand "Onda", links ("Projects (6)", "About", "Blog", "Contact"), and "Get a free consultation" CTA.
- Mid-band: Left label "WE SHIP 100+ SCENES A YEAR", right mission statement ("We design motion that brings clarity, precision, and efficiency to the way your product speaks.").
- Bottom split:
  - Left: Index tags ("/ Motion Systems", "/ Brand Worlds", "/ Spatial Web") above stacked giant headline "Calm. Exact. Alive."
  - Right: Founder aside card ("Talk with Mira — Co-founder of Onda — Book a 15-min call") with portrait avatar.
```
