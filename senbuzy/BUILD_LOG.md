# Senbuzy 3D Clay Resume Portfolio — Build Log & Engineering Journal

This document records the provenance, engineering analysis, lessons learned, and integration process for **Senbuzy's 3D Claymation Studio Portfolio**.

---

## 1. Post-Mortem: Why the Initial Approximation Scored 4.5/10

While our earlier attempt successfully extracted the 3D clay model `man2.glb` and reproduced the static background colors and basic hairline frame, it fell far short of the real experience (4.5/10) because:

1. **Missing Scroll-Driven Camera Splines**: In the real `about.senbuzy.com`, scrolling does not simply move HTML text over a static 3D canvas. Instead, scrolling dynamically choreographs the 3D camera along precise spline trajectories—zooming directly into cheek stickers (`I ♥ SYSU`, `HOTSAR`), shifting focal depth, and orbiting the head during the timeline section. Our earlier version left the camera largely static.
2. **Missing Post-Processing & Tactile Grain**: The signature claymation feel comes from subtle film grain and depth-of-field blur (`@react-three/postprocessing` + SVG noise overlay), making the digital model look like physical sculpted clay.
3. **Missing Rich Markdown Dossiers**: The real site features extensive Markdown documentation for each project with rich galleries, diagrams, and behind-the-scenes logs, rendered via `react-markdown`.
4. **The Critical Lesson**: As with Bruno Simon, the original author open-sourced the complete production application under [`dayinji/sen-3d-resume`](https://github.com/dayinji/sen-3d-resume). Sourcing the authentic repository directly guarantees 10/10 visual and interactive fidelity.

---

## 2. Adoption & Integration of `dayinji/sen-3d-resume`

1. **Stack**:
   - React 18.3 + `@react-three/fiber` 8.17 + `@react-three/drei` 9.114 + `@react-three/postprocessing` 2.16
   - `framer-motion` 11.18 for scroll position interpolation
   - `zustand` 4.5 for global localization and modal state
   - `react-markdown` 10.1 for interactive project documentation sheets
   - Vite 5.4 + TypeScript 5.9
2. **Relative Path Optimization**:
   - Ensured `base: './'` in `vite.config.ts` so the build output deploys smoothly on any subpath or static host.
3. **Build & Verification**:
   - `npm run build` generates self-contained production bundle in `dist/`.
   - Verified in headless Chrome:
     - Hero: `/tmp/authentic_senbuzy_hero.png` (film grain, clay textures, lighting, typography).
     - Camera Scroll: `/tmp/authentic_senbuzy_scroll.png` (camera zoom into cheek stickers, depth-of-field, animated résumé timeline).
   - Served live on port `http://localhost:3004`.
