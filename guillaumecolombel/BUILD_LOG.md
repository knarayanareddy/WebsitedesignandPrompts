# Guillaume Colombel "Backlit Alabaster Stele" — Build Log

### Overview
- **Project**: Recreation of `guillaumecolombel.fr` from the REA reverse-engineering report + `BUILD_PROMPT.md` in this folder
- **Date**: 2026-10-12
- **Output**: `guillaumecolombel/` Vite + TypeScript app (`index.html` + `src/` + `public/`), built to `dist/` by `scripts/build-site.sh` and published at `/guillaumecolombel/` on GitHub Pages
- **Stack**: Vite 6.4, TypeScript 5.5 (strict), Three.js `0.165.0`, GSAP `3.12.5`, lazy `lil-gui 0.19` — all bundled locally (`manualChunks: three, gsap`); Inter from Google Fonts as the `Neue Montreal` fallback; Unsplash cover images with procedural fallbacks.
- **History**: first shipped as a single self-contained import-map file (commit `fa947f1`), then restructured to the repository's Vite/TypeScript template layout (like `apogee/`) so it deploys through the same pipeline as the other apps.

> The brand/bio/awards content is fictional placeholder copy ("Aurèle Vasseur") — swap it with your own in the header and `#about-panel`, and edit the `PROJECTS` array at the top of the module script.

---

### What was built (mapped to the prompt)

| Prompt section | Implementation |
| :--- | :--- |
| **2. `PROJECTS` data array** | 8 projects with the exact schema (`slug, title, wheel, year, description, credits, url, coverImage, color, matter{…}, scene{…}`). Scrolling interpolates `color`, `matter` and `scene` continuously between neighbours (`lerpProject`). |
| **3A. Sculpted monolith + Voronoi cells** | Parametric stone surface (`stoneSurface`: tapered, leaning, superellipse section, noise bumps, H 2.4 × W 0.9 × D 0.42) sampled at 44×46 + crown, plus 1,400 interior samples. 16 slab-metric Voronoi seeds → per-cell `ConvexGeometry` fragments. Exterior faces get analytic smooth normals; cut faces are flagged `aInner` so they render as molten rock when the stone opens. Verified in Node: 16 cells / 2,676 triangles / ~90 ms. |
| **3A. SSS & strata shader** | `ShaderMaterial` with internal drifting light (`uLightPos`), thickness proxy (`aRadial`), density-driven extinction `exp(-σ(d + thick))`, Fresnel rim, 3D simplex FBM sedimentary bands (`uBands/uBandScale`) and ridged veins (`uVeins/uVeinScale`) that occlude and incandesce. |
| **3A. Embedded inclusion** | Active cover sampled in stone space with IOR-based normal refraction, view-parallax (`uInclDepth`, `uParallax`), noise frost and LOD-biased blur, masked by veins/strata and faded between projects. |
| **3A. Pointer heat & cracks** | Raycast per cell; hovered cell + neighbours heat up (`conductionRate 2.5`, decay 1.6), seams glow in the project colour, cells micro-spread and lift toward the viewer, and a molten pinhole reveals the cover under the cursor. Mineral "geiger" crackle plays while hovering. |
| **3A. Click-to-fracture / unfold** | Click (or `Enter` / index dot) → `elastic.out` spring parts the cells along per-cell outward vectors with rotation, 42 instanced debris shards fly out under gravity, and a 40×26 cloth plane unfolds from the core (`uFold`, `uUnfold`, breeze wave, edge weave, molten edge, pointer tilt). `Escape`, background click, brand or **Close** reseals the stone. |
| **3B. Title drum** | 8 high-DPI canvas labels (condensed 800-weight two-line titles + `01…08` index) on a helical cylinder (`radius 2.3`, `verticalStep 0.72`, `angleStep 0.6`). Wheel / drag / touch rotate it with exponential damping and magnetic detent snap (`snapStrength 6`). Non-active rows blur via mip bias (`bokehWidth 8.5`) and fade to `farOpacity`; the active row warps near the stone silhouette (`meniscusStrength 0.08`). Click-and-hold = jog mode (`holdPull`, `holdTilt`, `holdScale`). |
| **3C. Landscape** | Shared GLSL `terrainH()` (ground + grass): FBM relief scaled by `scene.relief`, flattened around the stone; stele light puddle + cursor spotlight; reflective water plane at `scene.water` with ripples, reflection streak and pointer stir rings; three scrolling mist layers (`scene.mist`); 6,500 instanced wind-bent grass blades that bend away from the cursor (`scene.flora` sets `instanceCount`); dusk→night gradient sky with sun, stars and cloud bands; 14 point-sprite birds. |
| **3C. Post** | `EffectComposer`: Render → `UnrealBloomPass` → `OutputPass` (ACES) → custom pass with 12-sample pointer-wake lens warp + chromatic split + frosted blur, vignette and animated grain. |
| **4.1 Preloader** | `#stele-loading` SVG flanks + glowing tip driven by `--stele-progress` as the 8 covers load (9 s timeout → procedural fallback), then `body.stele-wired` and a 2.4 s light reveal. |
| **4.2 Header** | Verbatim fractured-word CSS (`clip-path` polygons, shear/rotate on hover with `cubic-bezier(.3,2.2,.45,1)`, `#ffe8cd`). `About` swaps to `Close` when a project / About is open. |
| **4.3 Sheet & arrows** | `#project-sheet` line-mask reveals (`yPercent 110 → 0`, staggered), character-roll **Visit website ↗** link with `--i` delays, diagonal arrow swap and right-to-left rule wipe. `#project-prev / #project-next` with dual `.leave` / `.enter` dash-offset arrows. |
| **4.4 About route** | `aboutShiftX` camera slide (stone to the right), stone erodes via noise `discard` to a hollow relic, breathing amber lantern core inside casting procedural caustics on the ground and water; FLIP of the header brand into the bio's lead `.name`; awards ledger (`tabular-nums`), social links, `Copy email` with "Copied" state. |
| **4.5 Audio** | Zero-asset Web Audio: pink-noise wind drone (LP + BP with three LFOs + 48 Hz sub pair), hover crackle, fracture thud + noise burst + 4-partial FM chime, close thud, wheel detent tick, about swell. `#sound-toggle` speaker/wave/cross SVG with the production transition choreography. |
| **Extras** | Hash routes `#/`, `#/about`, `#/projects/<slug>`; keyboard (arrows, Enter, Escape); accessible project-index dots; `?debug` or `Ctrl+Shift+D` opens a lil-gui tree mirroring the original folders (Source, Lumière, Matière, Décor, Inclusion, Fracture, Lanterne, Roue, Fluide, Post) plus **Copy project preset**; WebGL-less fallback list; reduced-motion handling. |

---

### Project layout
```
index.html · vite.config.ts · tsconfig*.json · package.json · .gitignore
public/favicon.svg · public/assets/covers/
src/main.ts · src/app.ts · src/style.css · src/tune.ts
src/data/projects.ts · src/lib/math.ts · src/ui/dom.ts · src/audio/engine.ts
src/scene/{shaders,stele,drum,landscape,post}.ts
```

### Verification
- `npm run build` (= `tsc --noEmit -p tsconfig.app.json && vite build`) passes: 33 modules, `dist/` = index.html 8 kB + CSS 20 kB + app 84 kB + three 466 kB + gsap 70 kB (+ lil-gui 32 kB lazy chunk). `npx oxlint src` — 0 warnings.
- Built `dist/index.html` references only `./assets/*` (no `/src/` dev entry), satisfying `scripts/verify-site.mjs`.
- All 16 GLSL vertex/fragment shaders (with Three's injected prelude) parsed with `@shaderfrog/glsl-parser` — 0 errors.
- Voronoi stele builder executed under Node with Three 0.165 `ConvexGeometry`: 16 cells, bounding box `[-0.49,-0.22,-0.17] → [0.50,2.47,0.30]`, exterior / interior vertex split 5,925 / 2,103.
- Served via `python3 -m http.server` and verified HTTP 200. (The sandbox has no headless browser/GPU, so visual QA should be done in the live preview: CDN modules, fonts and Unsplash covers are loaded by the visitor's browser.)

### Customising
1. Edit `PROJECTS` in `src/data/projects.ts`. Keep `wheel` to two short uppercase lines.
2. Replace `coverImage` URLs (any CORS-enabled image; local files under `./assets/covers/` work too).
3. Replace the brand, bio, awards and links in `index.html` (`#site-header` / `#about-panel`) and `data-email` on `#copy-email`.
4. Open `?debug`, tune the sliders, press **Copy project preset** and paste the JSON into a project entry.
