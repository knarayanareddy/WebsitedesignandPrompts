# Adapted Prompt — Guillaume Colombel "Backlit Alabaster Stele" portfolio

> Feed this to a coding assistant to reproduce the template in this folder. **Part A** fixes the
> stack and project layout used across this repository (so the result deploys through
> `scripts/build-site.sh`). **Part B** is the creative/technical brief, adapted from
> [`BUILD_PROMPT.md`](./BUILD_PROMPT.md) and the [REA report](./REA_REVERSE_ENGINEERING_REPORT.md)
> for a bundled TypeScript build instead of a single CDN-importmap file. Keep every numeric
> default unless the brief says it is tunable.

---

## Part A — stack & project setup (literal)

- **Vite 6.4 + TypeScript 5.5, vanilla (no UI framework).** `three@0.165.0`, `gsap@3.12.5`,
  `lil-gui@0.19` (lazy-loaded). Dev tooling: `@types/three@0.165.0`, `oxlint`.
- `package.json` `"type": "module"`. Scripts: `dev: vite`,
  `build: tsc --noEmit -p tsconfig.app.json && vite build`, `lint: oxlint`,
  `preview: vite preview`, `typecheck: tsc --noEmit -p tsconfig.app.json`.
- **`vite.config.ts`** — `base: './'` (GitHub Pages subpath), `@` → `src/`,
  `server/preview: { host: true, allowedHosts: true }`, `manualChunks: { three, gsap }`.
- `tsconfig.app.json` strict (`noUnusedLocals`, `noUnusedParameters`), `types: ["vite/client"]`,
  `paths: { "@/*": ["src/*"] }`. `tsconfig.node.json` covers `vite.config.ts`.
- Layout:
  ```
  index.html                 Vite entry: full UI shell markup + <script type="module" src="/src/main.ts">
  public/favicon.svg         stele silhouette icon
  public/assets/covers/      optional local cover images
  src/main.ts                imports style.css, calls start()
  src/app.ts                 renderer, state, input, routes, project/about transitions, frame loop, boot
  src/style.css              production CSS (header fracture, sheet, arrows, about, sound toggle, loader)
  src/tune.ts                TUNE tree (lil-gui mirrors it)
  src/data/projects.ts       PROJECTS + Project type   ← the only file users must edit
  src/lib/math.ts            clamp / lerp / damp / mulberry PRNG / lerpProject
  src/scene/shaders.ts       GLSL chunks: simplex noise, FBM, terrainH(), skyColor()
  src/scene/stele.ts         parametric stone, Voronoi convex cells, SSS material, core, debris, cover sheet
  src/scene/drum.ts          helical title drum (canvas labels + bokeh/meniscus shader)
  src/scene/landscape.ts     sky, ground, water, instanced grass, mist layers, birds
  src/scene/post.ts          EffectComposer: bloom → OutputPass → frost/vignette/grain pass
  src/audio/engine.ts        procedural Web Audio SoundEngine
  src/ui/dom.ts              typed DOM handles
  ```
- Fonts: Google Fonts **Inter** (400/500/600/800) as the stand-in for Neue Montreal. Covers:
  Unsplash URLs with `crossOrigin='anonymous'` and a procedural canvas fallback on error/timeout.
- No build-time assets beyond the favicon; everything else is procedural.

---

## Part B — the experience

### B1. Concept, palette, type
A sculpted **backlit alabaster standing stone** (H 2.4 × W 0.9 × D 0.42 scene units) in a dusk
landscape with water, ground mist, terrain relief and wind-bent grass. `--black #050404`,
`--ivory #f4f2ee`, `--amber-glow #ffd6b0`, plus per-project linear-RGB glow colours (> 1.0 blooms).
Type 400/500/600/800, tight tracking, `tabular-nums` for indices and award counts.

### B2. Data (`src/data/projects.ts`)
8 entries following exactly:
```ts
{ slug, title, wheel: [LINE1, LINE2], year, description, credits, url, coverImage,
  color: [r,g,b], matter: { veins, veinScale, bands, bandScale, density },
  scene: { water, mist, view, flora, relief, night, skyDim } }
```
Scrolling blends **all** numeric fields continuously between neighbours (`lerpProject`).

### B3. Stele
1. **Geometry** — parametric surface `stoneSurface(θ, y)` (tapered width envelope, lean, superellipse
   section, sinusoidal bumps). Sample 44×46 surface points + crown + 1,400 interior points; assign to
   16 seeds with a slab-biased metric (`dy·0.95`, `dz·0.8`); build each cell with `ConvexGeometry`.
   Flag cut faces as `aInner`, store `aRadial` (0 core → 1 skin), give exterior faces analytic normals.
2. **Shader** — drifting internal light; transmission `exp(-σ(1.35d + 1.8·thick))`; Fresnel rim;
   simplex-FBM strata (`uBands/uBandScale`) and ridged veins (`uVeins/uVeinScale`) that occlude and
   incandesce; cover **inclusion** sampled in stone space with IOR offset, view parallax
   (`depth 0.55, ior 1.5, parallax 0.28`), frost noise and LOD blur; pointer heat (`radius 0.25`)
   glows seams and opens a molten pinhole; inner faces render molten (`uOpen`) or lantern-lit
   (`uErode`); erosion `discard`s skin by noise threshold (`erodeRelief 0.62`).
3. **Per-cell uniforms** via `mesh.onBeforeRender` + `material.uniformsNeedUpdate = true`
   (`uHeat`, `uCellCenter`, `uCellSeed`).
4. **Interaction** — raycast cells; hovered cell → heat 1, neighbours (< 0.75) → 0.45;
   `conductionRate 2.5`, `decay 1.6`, `spread 0.012`, `lift 0.025`. Click → `elastic.out(1,0.55)`
   over 1.4 s moves cells along per-cell outward vectors × `openOffset 0.9`, rotates them, fires 42
   instanced debris shards, and unfolds the cloth plane (`uFold 1→0`, `uUnfold 0→1`, breeze wave,
   edge weave, molten edge, pointer tilt). Esc / background / Close reseals.

### B4. Title drum
Canvas labels 2048×640 (800-weight, `scale(0.8,1)` condensed, two lines + `01…` index) on planes
3.4 wide at `radius 2.3`, `verticalStep 0.72`, `angleStep 0.6`. Drum `rotation.y = -pos·step`,
`position.y = 1.3 + pos·vStep`. Wheel `Δ·0.0024`, drag `Δ·0.004`, exponential damping (6/s;
9/s while jogging), detent snap `snapStrength 6` after 140 ms idle. Non-active rows: mip-bias
blur `far/0.9 · bokehWidth 8.5 · 0.55`, opacity to `farOpacity 0.14`; active row: meniscus warp
`0.08` near world x≈0. Hold ≥ 260 ms → jog mode (`holdPull 1.1`, `holdTilt 0.22`, `holdScale 0.86`).

### B5. Landscape & post
Shared `terrainH(xz, relief)` in ground + grass shaders (FBM, flattened within r 0.75–3.4). Ground:
earth + stele light puddle + cursor spotlight + about-route caustics + distance/height fog.
Water plane at `scene.water` (hidden < −0.11): ripple normals, sky reflection, stele streak, pointer
stir rings. 6,500 instanced blades (2,400 on coarse pointers) bending with wind and away from the
cursor; `instanceCount = flora`. Three scrolling mist planes. Sky sphere: dusk→night gradient,
sun, stars, cloud bands. 14 point-sprite birds. Post: `UnrealBloomPass(0.55, 0.55, 0.85)` →
`OutputPass` (ACES) → frost pass (12-sample pointer trail, warp 0.012, chromatic split, blur in the
wake, vignette 0.38, grain 0.035).

### B6. UI (production CSS — see `ORIGINAL_CSS_AND_SHADERS.md`)
`#stele-loading` SVG flanks/tip driven by `--stele-progress`; `body.stele-wired` fade, then
`body.stele-ui`. Header fractured-word hover (`clip-path` polygons, `cubic-bezier(.3,2.2,.45,1)`,
`#ffe8cd`), About ↔ Close swap. `#project-sheet` with line-mask reveals (`yPercent 110→0`,
stagger 0.07), char-roll **Visit website ↗** (`--i · 16ms`), arrow swap, rule wipe.
`#project-prev/next` dual `.leave/.enter` dash arrows. `#about-panel`: camera shift 1.55 left,
stone erosion + breathing amber core (`breath 0.8`), FLIP of `.brand` into `.name`, awards ledger,
links, `Copy email` → "Copied" 1.8 s. `#sound-toggle` speaker/wave/cross choreography.
Project-index dots, keyboard (←/→/↑/↓, Enter, Esc), hash routes `#/`, `#/about`, `#/projects/<slug>`,
`?debug` / `Ctrl+Shift+D` lil-gui with **Copy project preset**, no-WebGL fallback list,
`prefers-reduced-motion` respected.

### B7. Audio (zero assets)
Pink-noise wind (LP 420 Hz + BP 900 Hz, three LFOs) + 48/48.4 Hz sub pair; hover crackle bursts;
fracture = 72→32 Hz sine thud + pink burst + 4-partial FM chime; close thud; wheel tick
(highpass click + 880→620 Hz triangle); about swell. Master fades 0 ↔ 0.9 over 0.5 s.
