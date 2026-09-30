# Jack — 3D Creator Portfolio Prompt

Build a responsive portfolio landing page for **Jack**, a 3D creator. Use **React 18, TypeScript, Vite, Tailwind CSS v3, Framer Motion, and Lucide React**. Preserve the section order and visual direction below. Use the exact portrait, decorative PNG, project GIF, and project-image URLs already declared in `src/App.tsx`; do not substitute unrelated assets.

## Global visual system

- Background `#0C0C0C` on `html`, `body`, `#root`, and the main wrapper; main wrapper uses `overflow-x: clip`.
- Kanit from Google Fonts at weights 300–900; sans-serif fallback.
- Reset margin/padding to zero and use `box-sizing: border-box` globally.
- Primary light text `#D7E2EA`.
- `.hero-heading` uses `linear-gradient(180deg, #646973 0%, #BBCCD7 100%)` clipped into transparent text.
- Respect reduced-motion preferences for entrance, marquee, magnetic and scroll-linked effects.

## Section order

1. `HeroSection`
2. `MarqueeSection`
3. `AboutSection`
4. `ServicesSection`
5. `ProjectsSection`

## Hero

Create a full-viewport, flex-column section with clipped horizontal overflow. The top nav has four evenly spaced links: About, Price, Projects, Contact. Use uppercase medium-weight Kanit in `#D7E2EA`, tracking-wider, `text-sm md:text-lg lg:text-[1.4rem]`, `px-6 md:px-10 pt-6 md:pt-8`; hover fades to 70% over 200ms.

Place the oversize, uppercase, weight-900 heading `Hi, i'm jack` in a clipped, full-width container. Keep it on one line with tight tracking and line-height one. Sizes: `14vw`, `15vw` at `sm`, `16vw` at `md`, and `17.5vw` at `lg`; top spacing `mt-6 sm:mt-4 md:-mt-5`.

The bottom row aligns the intro and Contact Me pill at the bottom edge. Copy: “a 3d creator driven by crafting striking and unforgettable projects”; uppercase, light, tracking-wide, snug leading, `clamp(0.75rem, 1.4vw, 1.5rem)`, max widths 160/220/260px across breakpoints. The portrait uses the supplied Figma PNG, centered absolutely, width 280/360/440/520px by breakpoint. Wrap it in `Magnet` with 150px activation padding, strength 3, active transform transition `0.3s ease-out`, and reset transition `0.6s ease-in-out`. Center it vertically on mobile and bottom-align it from `sm` upward.

Use the reusable `FadeIn` wrapper (`motion.create`, `whileInView`, once, margin 50px, amount 0, ease `[0.25, 0.1, 0.25, 1]`). Hero delays/y offsets: nav 0/-20, heading 0.15/40, intro 0.35/20, contact 0.5/20, portrait 0.6/30.

`ContactButton` is a rounded pill with gradient `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)`, inner shadow `0 4px 4px rgba(181,1,167,0.25)` and `4px 4px 12px #7721B1 inset`, plus a white 2px outline with -3px offset. Label “Contact Me”; uppercase, medium, tracking-widest; padding `px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4`.

## Scroll-driven image marquee

Use the exact 21 Motionsites GIF URLs in `src/App.tsx`. Split the first 11 into row one and the remaining 10 into row two; repeat each row three times. Tiles are 420×270px, rounded-2xl, object-cover, lazy-loaded; scale down responsively on small screens. Use `gap-3` both between tiles and rows, `will-change: transform`, and a passive scroll listener.

Calculate `offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3`. Row one moves right via `translateX(offset - 200)`; row two moves left via `translateX(-(offset - 200))`. Smooth the MotionValue with a spring. Section padding: `pt-24 sm:pt-32 md:pt-40 pb-10`.

## About

Use a centered `min-h-screen` section with `px-5 sm:px-8 md:px-10 py-20`. Place the four supplied Figma-hosted 3D PNGs at the corners: moon top-left, object bottom-left, Lego top-right, group bottom-right. Preserve the URLs, positions, widths and entrance delays in `src/App.tsx`.

Center an “About me” gradient heading (`font-black uppercase`, `clamp(3rem, 12vw, 160px)`) above this exact paragraph:

> With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!

Animate paragraph characters from opacity 0.2 to 1 based on scroll progress, using Framer Motion `useScroll` with offset `['start 0.8', 'end 0.2']`. Set text in `#D7E2EA`, medium, centered, `max-w-[560px]`, `clamp(1rem, 2vw, 1.35rem)`, relaxed leading. Place a Contact Me pill after the text, with heading/text gaps `gap-10 sm:gap-14 md:gap-16` and text/button gaps `mt-16 sm:mt-20 md:mt-24`.

## Services

Use a white panel with rounded top corners `40/50/60px`, `px-5 sm:px-8 md:px-10`, and vertical padding `py-20 sm:py-24 md:py-32`. Center a black, uppercase, weight-900 “Services” heading at `clamp(3rem, 12vw, 160px)` with a generous bottom margin.

Create a centered `max-w-5xl` vertical list. Each row has a huge weight-900 number on the left and uppercase service name plus light description on the right. Use `py-8 sm:py-10 md:py-12`, 1px `rgba(12,12,12,0.15)` separators, and staggered `FadeIn` delays of `index * 0.1`.

1. **3D Modeling** — Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.
2. **Rendering** — High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.
3. **Motion Design** — Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.
4. **Branding** — Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.
5. **Web Design** — Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.

## Projects

Finish with a dark `#0C0C0C` panel with rounded top corners `40/50/60px`, pulled upward by `-mt-10 sm:-mt-12 md:-mt-14`, and positioned above the white section. Center the gradient, weight-900, uppercase heading “Project”.

Use three sticky project cards in `h-[85vh]` containers, sticky at `top-24 md:top-32`, each offset vertically by `index * 28px`. Scale each card on scroll to `targetScale = 1 - (totalCards - 1 - index) * 0.03`. Cards have `#0C0C0C` background, `#D7E2EA` 2px border, 40/50/60px corner radii, and `p-4 sm:p-6 md:p-8`.

Each card's top row contains a large number, category, project name, and a ghost “Live Project” pill (outlined, uppercase, tracking-widest, hover background `#D7E2EA/10`). Its lower grid is 40/60: two stacked images in the left column, one tall image in the right. Use the three provided project image URLs for each project, object-cover, and heavy rounded corners. Project data in order:

1. **Nextlevel Studio** — Client
2. **Aura Brand Identity** — Personal
3. **Solaris Digital** — Client

## Responsive and asset notes

Use Tailwind's mobile-first breakpoints, preserve the specified fluid typography and image crops, and stack/resize content cleanly on narrow screens. The supplied media URLs remain hot-linked; document provenance, rights and availability in `ASSETS.md` and do not claim they were verified unless the asset checker can reach them.
