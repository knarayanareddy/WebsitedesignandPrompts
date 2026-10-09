# Master Prompt & Architectural Specification: Senbuzy 3D Clay Resume Portfolio

> **Target Standard:** Replicate the authentic, award-winning interactive 3D claymation portfolio of `about.senbuzy.com` with complete visual fidelity, continuous scroll-driven camera splines, film grain post-processing, React Three Fiber architecture, and rich markdown project dossiers.

---

## 1. Executive Summary & Provenance

Senbuzy's portfolio (`about.senbuzy.com`) is a breakthrough in web-based 3D personal portfolios. The author published the open-source production codebase at [`github.com/dayinji/sen-3d-resume`](https://github.com/dayinji/sen-3d-resume).

### Key Architectural Pillars:
1. **React Three Fiber (R3F) & Drei Ecosystem**: Built on React 18, `@react-three/fiber`, and `@react-three/drei`, leveraging the declarative component model for 3D scene graphs, asset preloading, and responsive viewport management.
2. **Scroll-Driven Camera Splines**: Scrolling is not merely a trigger for HTML CSS animations; it directly drives the 3D perspective camera along continuous mathematical spline curves. Scrolling down zooms into facial sticker decals (`I ♥ SYSU`, `HOTSAR`), rotates around the head during the résumé timeline, and pans into a sticky horizontal works gallery.
3. **Film Grain & Depth-of-Field Post-Processing**: Sits between pure 3D rendering and film production, combining `@react-three/postprocessing` with custom SVG noise filter overlays (`NoiseOverlay.tsx`) to replicate the tactile texture of physical claymation.
4. **Zustand State Management**: Global store manages localization (`en` / `zh`), active project modals, and sound settings.
5. **Rich Markdown Documentation**: Venture dossiers are rendered via `react-markdown` with `remark-gfm` and `rehype-raw`, presenting deep-dive case studies with photo galleries, diagrams, and video embeds.

---

## 2. 3D Scene Graph & Lighting Pipeline

### 2.1 Model & Rig (`man2.glb`)
- High-poly clay bust with organic wrinkles and clothing folds.
- Decal textures baked onto cheek and forehead geometry.
- Skeletal animation mixer playing continuous ambient movement.

### 2.2 Inverted Dome Environment (`Env.tsx`)
A custom sphere mesh with `BackSide` rendering creates the studio background:
- **Top Color**: `#6f906f` (Muted Studio Olive Sage)
- **Bottom Color**: `#dbd3b5` (Warm Sand Ivory)
- **Lighting Rig**:
  - `ambientLight` with soft warm fill.
  - `directionalLight` (Key, peach `#ffd9c6`, intensity 2.35 at `[5, 8, 5]`).
  - `directionalLight` (Fill, cool daylight `#9fc6ff`, intensity 2.25 at `[-5, 4, -4]`).

---

## 3. Scroll Choreography & Camera Trajectories

Using `framer-motion`'s `useScroll` hook, normalized scroll progress `[0, 1]` is mapped to camera keyframes:

| Scroll Offset | Section | Camera Position Vector | Camera Target | Effect |
|---|---|---|---|---|
| `0.00 – 0.15` | **Hero** | `(0, 0.24, 4.2)` | `(0, 0.20, 0)` | Portrait framing; character head tilts to cursor with smooth lerp damping. |
| `0.15 – 0.45` | **Résumé** | `(-0.65, 0.35, 1.8)` | `(-0.2, 0.35, 0)` | Extreme close-up on left cheek stickers (`I ♥ SYSU`, `HOTSAR`); foreground blur; timeline slides into right column. |
| `0.45 – 0.85` | **Works** | `(0.85, 0.15, 2.8)` | `(0, 0.15, 0)` | Camera pans right; character shifts to left edge; sticky horizontal cards slide across screen. |
| `0.85 – 1.00` | **Footer** | `(0, -0.4, 3.8)` | `(0, 0, 0)` | Camera tilts down; final call to action and contact buttons. |

---

## 4. Master Reproduction Prompt

Copy and paste the following prompt into an AI assistant or coding agent to adapt or reproduce the complete experience:

```markdown
Create a 3D claymation personal resume portfolio in React Three Fiber inspired by about.senbuzy.com.

Requirements:
1. Core Stack:
   - React 18 + @react-three/fiber + @react-three/drei + Vite 5 + TypeScript.
   - framer-motion for scroll progress interpolation.
   - zustand for localization (EN/ZH) and modal state.
   - react-markdown with remark-gfm for project case studies.
   - Configure vite with base: './' for static hosting.
2. 3D Scene & Character:
   - Load an expressive 3D clay bust avatar (GLB) with facial sticker decals and ambient skeletal animation.
   - Inverted sky dome background shader blending olive sage (#6f906f) to warm sand ivory (#dbd3b5).
   - Studio 3-point lighting (warm key light, cool fill light, ambient bounce).
3. Scroll Camera Spline:
   - Scrolling the page must choreograph the 3D camera along continuous spline paths.
   - Hero: wide portrait framing with subtle cursor head-tracking parallax.
   - Résumé: zoom in close to the character's cheek stickers with depth-of-field blur while the timeline animates on the right.
   - Works: pan camera to the left as a horizontal gallery of project cards slides across the viewport.
4. Post-Processing & Tactile Texture:
   - Add a subtle film grain SVG noise overlay across the entire viewport.
   - Depth-of-field bokeh blur on foreground/background elements.
5. Typography & UI:
   - Google Fonts: Mansalva (handwritten title), Cormorant Upright (editorial serif subtitles), Chiron GoRound TC (clean rounded sans).
   - Architectural 1px hairline border with corner + registration marks and coordinates.
   - Deep-linkable modal sheet for inspecting project case studies.
```
