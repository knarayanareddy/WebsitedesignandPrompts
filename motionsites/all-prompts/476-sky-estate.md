# Sky Estate (`sky-estate`)

- **ID:** `sky-estate`
- **Category:** Real Estate
- **Type:** `hero` (Page Type: `landing`, Tags: `hero`)
- **Tier:** Premium
- **Video / Animated Preview:** https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/uploaded/galaxyhome.mp4
- **Poster / Image Preview:** https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260715_015601_5e651473-dece-49b0-8402-c098804446a1.png&w=1280&q=85
- **Live URL:** `https://motionsites.ai/?prompt=sky-estate`

## Visual & Architectural DNA (`design_similarity`)

> dreamy sky backdrop soft periwinkle blue lavender navy palette luxury skyline building imagery scrolling marquee strips smooth fade animations tight modern sans-serif rounded cards light airy ethereal calm aspirational elegant polished serene cloudlike gentle premium

## Complete Verbatim Build Prompt
*Source: Academy Lesson Bundle (Lesson-C4G0P249.js)*

```markdown
Build a luxury real estate landing page — only the navbar and hero section. Use Vite + React + TypeScript + Tailwind CSS + Framer Motion + lucide-react. Font: Inter Tight (weights 400, 500, 600, 700) loaded from Google Fonts with preconnect. Body font-family 'Inter Tight', system-ui, sans-serif. Enable -webkit-font-smoothing: antialiased globally, scroll-behavior: smooth on html, overflow-x: hidden on body. Page background black.

### Tailwind config

Extend with:
- fontFamily.sans: ['Inter Tight', 'system-ui', 'sans-serif']
- Custom colors: brand.blue: #8F9EFF, brand.navy: #271C40, brand.dark: #020319

### Navbar (fixed glass pill)

A <header> fixed top, left, right, z-index: 60, flex justify-center, padding 16px (top) / 24px on md. Inside, a <nav> pill: display:flex, align-items:center, gap:16px (32px on md, 80px on lg), border-radius: 9999px, background rgba(49, 45, 124, 0.4) (#312D7C at 40% opacity), backdrop-filter: blur(15px), padding 12px 16px.

Brand: an SVG (viewBox 0 0 256 256, fill white) of a four-lobed pinwheel shape with path M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z. Size 24x24 (28x28 on md). Next to it, text "Aether Lane", font-size:16px / 20px on md, font-weight:500, white.

Nav links (desktop only, display:none until md): list of 5 — "Home", "About", "Estates", "Projects", "Inquire". Horizontal, gap:24px. First link white, rest #B6B8C3 with hover-to-white transition. Each links to #<lowercase>.

CTA button (desktop only): "Get in touch", rounded-full, border: 1px solid rgba(255,255,255,0.8), padding 8px 24px, font-size:15px, font-weight:500, text color rgba(39, 28, 64, 0.8) (brand-navy/80) with text-shadow drop-shadow. Background layered: linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.10) 76%), radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.7) 0%, transparent 100%), #BEC7FF. On hover, scale(1.05) transform.

Mobile hamburger (below md only): 36x36 button, three 2px-tall, 20px-wide white rounded bars at vertical offsets 10px/17px/24px. When open: bar 1 rotates 45deg and moves to center (17px), bar 2 fades + scales to 0, bar 3 rotates -45deg to center. Use Framer Motion animate with duration:0.3, easing [0.25, 0.1, 0.25, 1].

Mobile fullscreen menu (Framer Motion AnimatePresence): when open, a fixed inset:0 overlay, z-index:55, background rgba(2, 3, 25, 0.95) (brand-dark/95) with backdrop-filter: blur(24px). Links centered vertically, font-size:30px, font-weight:500, rgba(255,255,255,0.9). Staggered entrance: each link animates from {opacity:0, y:20, filter:'blur(4px)'} to {opacity:1, y:0, filter:'blur(0px)'}, stagger 0.06s with 0.1s initial delay, duration:0.35. Exit reverses stagger direction. The CTA button appears below links with same animation. Lock body scroll when open.

### Hero (full-screen parallax)

A <section> position:relative, z-index:10, height:100vh, width:100%, overflow:hidden. Use Framer Motion useScroll targeting this section, offset ['start start', 'end start'], and useTransform mapping scroll progress [0,1] -> ['0%', '8%'] for a vertical parallax y value.

Layer 1 — sky background (z-0): a motion.div filling the section, style={{ y: bgY }}. Inside, an <img> with src="https://soft-zoom-63098134.figma.site/_assets/v11/7af55796a90a26e2d57c9fa2a48815874023cff0.png", width:100%, height:120%, object-fit:cover.

Layer 2 — giant title (z-10): an absolutely-positioned flex container, align-items:flex-start, justify-content:center, padding-top:22vh (128px on md, 144px on lg). Inside, an <h1> reading Galaxy  Home (two non-breaking spaces between words), white-space:nowrap, text-align:center, font-size:clamp(3rem, 14vw, 14rem), font-weight:600, line-height:1, background-image:linear-gradient(to bottom, #A8B4FF, #FFFFFF), -webkit-background-clip:text, background-clip:text, color:transparent, mix-blend-mode:lighten.

Layer 3 — subtext (z-20, desktop only): two absolutely-positioned <div>s at top:320px, mix-blend-mode:overlay.
- Left: left:48px (96px on lg), text "Elegance Above the Skyline", font-size:22px, line-height:24px, font-weight:500, color rgba(255,255,255,0.7).
- Right: right:48px (96px on lg), text "Your Dream Residence Starts Here", same size/weight, color white.

Layer 4 — building foreground (z-30): a motion.div filling the section with the same bgY parallax. Inside, an <img> with src="https://soft-zoom-63098134.figma.site/_assets/v11/644aba5492aa8bd5756bc5c6d65255d577b1aaf3.png", width:100%, height:120%, object-fit:cover. This building image overlaps the title (higher z-index) so the text appears to sit behind the architecture.

The parallax effect: as you scroll down through the hero, both the sky and building layers translate downward by up to 8% of their height, creating a subtle parallax while the title stays fixed — giving the illusion of depth between the text, sky, and building.
```
