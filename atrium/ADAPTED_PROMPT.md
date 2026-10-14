# Adapted Prompt Kit: ATRIUM MTL — An archive of light cast in stone

Use this prompt specification to generate a high-impact, brutalist editorial museum and photography retrospective website inspired by **ATRIUM MTL**:

---

## Prompt Specification

```markdown
Build ONE self-contained file: index.html — no build step, no npm, no React/Vue, no external CSS/JS libraries. Everything in a single document: inline <style>, inline SVG icons, vanilla JavaScript only.

1. Meta & Document Requirements:
   - Page title: "ATRIUM MTL — An archive of light cast in stone"
   - Viewport meta: width=device-width, initial-scale=1, viewport-fit=cover
   - Self-contained fonts: @font-face Archivo (weight 100–900, width 62%–125%) and Inter (weight 100–900) in woff2 format
   - Zero video: NO <video> element and NO CloudFront video URL on this page

2. Media Assets & Remote Tokens:
   --img-sculpt: url(https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/fc524fc3-03c3-40a1-9954-22eab1322592.webp)
   --img-man: url(https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/1d56967e-0ed5-40f8-812d-9360e5ec1780.webp)
   --img-visit: url(https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5f3f6135-26b9-4c48-92ad-105161327cbc.webp)
   --img-sil: url(https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e7b68ae9-9240-4f52-a0a2-89082df4b8d0.webp)
   --grain: url(https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/40b7fef3-410d-4ef3-bd67-0a2fc7ee5a1d.svg)

3. Design Tokens & Palette:
   - Page background: --paper #f5f4ef
   - Typography & Ink: --ink #0f0f0e
   - Solid tiles: --red #ef5d44, --yellow #fcdd71, --blue #9fd5f7, --card-cream #f9f6f1, --card-dark #151515
   - Header tokens: --nav-bg #ffffff, --nav-bar #ffffff, --nav-fg #0f0f0e, --nav-muted #62615d, --nav-line rgba(15,15,14,.08), --nav-rule rgba(15,15,14,.16), --nav-search #e8e7e2, --nav-cta #0f0f0e, --nav-cta-fg #fff
   - Desktop grid metrics: --col 205.33px, --gap 13px, --pitch 282.5px, --r 22px

4. Visual Atmosphere & Layout:
   - Editorial museum & brutalist archive: warm off-white full viewport canvas.
   - Floating white header card: radius 0 0 22px 22px, subtle border and drop shadow. Includes top utility strip (hotlines 418 838-6000 and 838-6001, utility links, search button) and main row (ATRIUM MTL logo, navigation links, and rounded Tickets pill with rotated ticket circle badge).
   - Left Hero Block: oversized Archivo 900 uppercase 4-line headline ("An archive" / "of light" / "cast in" / "stone"), editorial description, and primary action buttons.
   - Right Vertical Mosaic: 3 columns of alternating rounded tiles (photos + solid blocks with grain overlay) scrolling infinitely via pure CSS @keyframes (14.6s loop, 0.342 card-heights per second).

5. Photo Crops (desktop hero tiles):
   - .f-sculpt: width 124.19%, height 112.57%, left -16.07%, top -8.5%
   - .f-man: 113.48%, 103.36%, -5.36%, -3.54%
   - .f-visit: 110.07%, 100%, -3.9%, 8.5%; gradient backdrop + top fade
   - .f-sil: 139.29%, 126.37%, -8.77%, -56.64%

6. Responsive Architecture:
   - CSS-only --mode token mirrored on <html>: mob, mob-l, tab-p, tab-l, desk
   - Desktop 1280×800 reference canvas scaled with transform scale(--s)
   - Extra wide-screen columns (x1, x2, x3) calculated dynamically with clamp(0..3)
   - Mobile: single-column flex layout with expandable menu drawer and compact mosaic grid

7. Entrance Animation (WAAPI Timeline):
   - Header slides down from -100%
   - Headline lines rise with clip-path masking
   - Marquee columns drift up with quint-out easing and seamlessly hand off to CSS marquee at T0 + 2100ms
```
