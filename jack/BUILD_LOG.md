# Build log — Jack, 3D Creator

## Composition

- **Hero:** full-screen dark canvas, 4-link nav, oversized Kanit gradient heading, centered magnetic portrait, concise intro, and gradient contact pill.
- **Marquee:** two image tracks driven by a passive page-scroll listener and spring-smoothed MotionValues. The first 11 supplied GIFs travel right; the other 10 travel left. Each row is tripled to keep the moving strip continuous.
- **About:** four supplied decorative 3D assets frame the biography. `AnimatedText` maps each character to a Framer Motion opacity transform driven by the section's scroll progress.
- **Services:** white rounded panel with five staggered offerings.
- **Projects:** three sticky, scaling project cards with the provided Higgs/CloudFront project imagery.

## Reusable interactions

- `FadeIn` uses `motion.create()` for semantic element types and a one-time `whileInView` reveal.
- `Magnet` tracks pointer position within its configured 150px activation boundary and applies the specified easing transitions.
- `ContactButton` and `LiveProjectButton` share the rounded pill treatment; `ArrowUpRight` is the project-link affordance.

## Tooling and verification

React 18 + TypeScript + Vite + Tailwind CSS v3 + Framer Motion + Lucide React. The app builds independently and is assembled at `/jack/` by `scripts/build-site.sh`.

The portfolio media stays hot-linked exactly as supplied. External image/GIF availability and licensing were not independently verified in this sandbox.
