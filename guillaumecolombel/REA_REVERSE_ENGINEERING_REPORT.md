# Guillaume Colombel (`guillaumecolombel.fr`) — REA Reverse-Engineering Architecture Report

- **Target URL**: [https://guillaumecolombel.fr/](https://guillaumecolombel.fr/)
- **Concept Summary**: *"A backlit alabaster standing stone with coloured strata, in a dusk landscape — portfolio of Guillaume Colombel"*
- **REA Evidence ID**: `ev_a3687a50aecf5cb4dadd3fc58b6108288ffae805dea7c83aedf6b26cde5a2e37`
- **Root Artifact SHA-256**: `e84c2f058c3ff26bcbf9bfc0ac131ea0e40e19a157cd3240a3b0a09c8219b8c4`

---

## 1. Executive Summary & Tech Stack (Discovered via REA)

Using `npx rea-agents analyze-javascript-application`, we inventoried and reconstructed the full 104-node, 236-edge application graph across all 12 production JavaScript bundles:

| Bundle File | Size | Role in Architecture |
| :--- | :--- | :--- |
| `Cd_dFser.js` | `1,097 KB` | **Core 3D Stele Engine**: Three.js `WebGPURenderer` (with automatic `WebGL2` fallback), TSL (Three.js Shading Language) nodes, baked Voronoi stone fracture mesh, MSDF 3D text drum, 2D Navier-Stokes fluid frost simulator, procedural terrain/water/flora/birds, and 18-folder `lil-gui` parameter tree. |
| `DECYU8Im.js` | `292 KB` | **Nuxt 3 + Vue 3 + GSAP 3.15 Core (`SplitText`)**: Project data array (`hd`), router orchestration, FLIP brand transition (`#site-header .brand` -> `#about-panel .name`), `ProjectSheet`, `ProjectNav`, `AboutPanel`, and Web Audio event bus. |
| `DKWN85t0.js` | `157 KB` | **`threejs-inspector` Profiler**: Real-time GPU/CPU timestamp query profiler and overdraw visualizer. |
| `ZcAlFalt.js` | `36.7 KB` | **`Howler.js` Audio Engine**: Web Audio API spatial/faded loop controller. |
| `8uC13fTG.js` | `33.8 KB` | **`stats-gl`**: WebGPU / WebGL2 hardware timestamp query and FPS graph monitor. |
| `DlQTpyMx.js` | `29.4 KB` | **`lil-gui`**: Interactive parameter tweaking UI for all 18 shader/scene subsystems. |
| `C0u6vjcG.js` | `6.9 KB` | **404 Void Stone Shader (`startVoid`)**: Standalone WebGL2 raymarched/embossed stone slab shader with multi-radius RGB blur heightmap and blue-noise dithering. |
| `DFdsr1Wd.js` | `1.7 KB` | **Capture & Recording Panel (`#record-panel`)**: Quick toggles for `décor (sol + ciel)`, `bloom`, `grain`, and `givre pointeur`. |
| `CFcAeC4a.js` | `1.1 KB` | SEO / JSON-LD Schema.org structured data generator. |
| `DbA73l9F.js` | `1.1 KB` | `/projects/[slug]` route view component. |
| `z8gN8xZA.js` | `641 B` | `/about` route view component. |
| `im-Em6LF.js` | `550 B` | `/` home route view component. |

---

## 2. How the Portfolio Showcases Projects (The Data Model)

In `DECYU8Im.js`, all showcased projects are defined in a single declarative array (`hd`). Each project controls **not only its text/links**, but also **physically alters the mineral composition of the stone monolith (`matter`) and the surrounding 3D landscape (`scene`)**:

```javascript
const PROJECTS = [
  {
    slug: "clarte",
    title: "CLARTÉ",
    wheel: ["CLARTÉ", "World"],       // 2-line 3D MSDF title orbiting the stone drum
    year: 2026,
    description: "CLARTÉ was born from a personal experience with illness...",
    credits: null,                     // Optional agency/design credits
    url: "http://clarte.world/",
    color: [1.0, 0.1, 0.05],           // Linear RGB internal light & vein glow color
    featured: true,
    // Procedural Mineral Composition of the Alabaster Stone:
    matter: {
      veins: 1.4,                      // Mineral vein intensity
      veinScale: 1.0,                  // Spatial frequency of 3D veins
      bands: 0.5,                      // Sedimentary horizontal strata strength
      bandScale: 1.0,                  // Strata frequency
      density: 1.0                     // Subsurface optical density / absorption
    },
    // Procedural 3D Landscape Biome around the Stone:
    scene: {
      water: 0.0,                      // Water table height (-0.12 = dry canyon, +0.03 = flooded lake)
      mist: 0.7,                       // Low-lying ground fog density (0.0 to 1.8)
      view: 1.05,                      // Camera distance multiplier (0.7 = close-up, 1.3 = wide vista)
      flora: 0.85,                     // Instanced wind-swept grass/reeds density (0.0 to 1.0)
      relief: 1.25,                    // Surrounding terrain elevation multiplier
      night: 0,                        // Optional: 1 = night sky mode
      skyDim: 1.0                      // Optional: sky brightness attenuation
    }
  }
];
```

### Media Assets per Project (`/assets/covers/<slug>.mp4` or `.webp`):
- Video or WebP covers are mapped both **inside the translucent stone** (`Inclusion` shader: refracted, frosted, and distorted by mineral veins) and **unfolded onto a 3D cloth/canvas plane** (`te.sheet`) when the user clicks to fracture the stone open!

---

## 3. The 18 Reverse-Engineered 3D & Shader Subsystems (`Cd_dFser.js`)

From the internal `lil-gui` definitions in `Cd_dFser.js`, the engine is divided into 18 interconnected subsystems:

### 1. **Alabaster Stone & Subsurface Scattering (`Matière` & `Lumière`)**
- A sculpted vertical monolith (`zP` Float32Array mesh) positioned at `(0, 0, 0)`.
- **Backlit Subsurface Scattering**: Uses RGB extinction coefficients (`uSigma = vec3(σR, σG, σB)`), dual-radius blur diffusion (`uDiffRadiusMin` at thin edges, `uDiffRadiusMax` at the thick core), and 3D simplex/FBM noise for mineral strata (`uBandStr`) and dark/glowing veins (`uVeinStr`).
- **Temporal Accumulation (8×)**: Accumulates 8 sub-pixel jittered frames when still, with motion-rejection clamping (`analyticMotionCap`, `fireflyClamp`) during camera/drum movement.

### 2. **Inclusion & Unfolding Project Cover (`Inclusion`)**
- Before clicking, the active project's cover video/image is visible **embedded deep inside the translucent alabaster** (`uInclDepth`, `uInclRefract`, `uInclFrost`), occluded by mineral veins.
- Upon clicking the stone, the stone fractures apart and the project media **unfolds out of the stone core** with cloth physics (`jn.burst` outward impulse, `jn.wind` breeze sway, `jn.gravity`, `jn.bounce`).

### 3. **Voronoi 3D Fracture & Cell Heat Conduction (`Fracture`)**
- The monolith is pre-shattered into 3D Voronoi fragments (`geometry`, `centers`, `neighbors`) plus smaller flying debris (`Fracture.debris`).
- **Pointer Pressure & Heat**: Moving the cursor over the stone transfers kinetic energy and thermal heat (`ke.settings.heatSigma`, `conduction`) across neighboring Voronoi cells. Cells slightly separate (`spread`), lift toward the pointer (`lift`), and glow incandescently along the cracks (`uCrackHeat`, `uGapGlow`).
- **Click Fracture (`stele-open`)**: Clicking triggers a crack propagation wave (`crackDuration`, `crackEase`) followed by a spring-driven explosion (`impulse`, `stiffness`, `damping`) that opens the stone to reveal the project video canvas and shows `#project-sheet` + `#project-prev`/`#project-next`.

### 4. **3D Cylindrical MSDF Title Drum (`Roue des titres`)**
- Uses a Multi-channel Signed Distance Field (MSDF) font atlas (`/assets/fonts/integral-msdf.json` + `.png`) to render crisp 3D project titles wrapped around a virtual helical drum (`wrap` turns) encircling the monolith.
- Features depth-of-field bokeh (`bokeh`, `focal`), neighbor opacity falloff (`farOpacity`), and an igneous molten edge (`meniscus`, `crumbleRough`, `crumbleBite`) as letters enter/exit.
- **Click-and-Hold Jog Mode**: Holding the mouse button down pulls the camera back (`holdPull`), tilts the drum (`holdTilt`), scales down the type (`holdScale`), and lets the user scrub rapidly through all projects with magnetic detents (`snapStrength`).

### 5. **About Route Erosion & Living Amber Organism (`Érosion (about)` & `Lanterne / ambre`)**
- Clicking **About** transitions the monolith into an eroded hollow relic (`uErodeMode`, `uErodeRelief`, `uErodeVeins`) while the camera tracks horizontally (`aboutShiftX`) so the stone frames the right side of the screen.
- Inside the hollowed stone floats a breathing bioluminescent organism/lantern (`Pt.breath`, `G.orgSpeed`) that reacts to pointer hover (`hoverPull`, `hoverFlare`), casts volumetric god-rays (`rayStrength`, `rayDecay`), and projects procedural caustics (`Caustic.ground`, `Caustic.wall`) onto the water and rock!

### 6. **DOM-to-WebGPU Thermal Text Bridge (`[906500]` in `Cd_dFser.js`)**
- When `#about-panel` is open, a `TreeWalker` + `Range.getClientRects()` measures every individual character of the HTML bio, awards list, and social links, rendering them into an offscreen 2D Canvas texture (`texture`) and a red-channel thermal map (`heatTexture`).
- Hovering any link in the About panel heats up its characters (`ge.heat`, `ge.front`), sweeping a warm amber highlight (`rgba(255, 214, 160, ...)`) across the glyphs AND casting a matching 3D point light (`z.uniforms.linkLight`) onto the 3D water/ground below!

### 7. **2D Navier-Stokes Pointer Fluid & Screen Frost (`Fluide pointeur`)**
- Cursor movement injects velocity splats into a GPU Navier-Stokes fluid solver (`radius`, `force`, `curlStrength`, `dyeDissipation`).
- The resulting fluid velocity field drives a screen-space frosted glass lens distortion (`frostAmp`, `frostWarp`) and stirs physical ripples into the 3D water surface (`waterStir`).

### 8. **Procedural Dusk Landscape (`Décor`)**
- Surrounding the monolith is a procedural terrain heightmap (`relief`), reflective water plane (`waterLevel`, `waterReflect`, `waterRipple`), low ground mist (`mist`), instanced wind-blown grass blades that bend away from the cursor (`floraBend`), and an instanced flock of birds (`Decor.birds`) flying across the dusk sky.

---

## 4. Micro-Interactions & UI Details

1. **Diagonal Fractured Word Hover (`#site-header .nav .word`)**:
   - Navigation words (`About`, `Close`) hide the real text (`color: transparent`) and duplicate it into `:before` and `:after` pseudo-elements split along a jagged diagonal polygon crack:
     - `:before`: `clip-path: polygon(-30% -30%, 130% -30%, 130% 38%, 70% 50%, 62% 40%, 34% 62%, 26% 52%, -30% 66%)`
     - `:after`: `clip-path: polygon(-30% 66%, 26% 52%, 34% 62%, 62% 40%, 70% 50%, 130% 38%, 130% 130%, -30% 130%)`
   - On hover, the two halves shear apart (`translate(-0.5px, -1.1px) rotate(-1.2deg)` and `translate(0.5px, 1.1px) rotate(0.8deg)`) with an elastic spring curve `cubic-bezier(0.3, 2.2, 0.45, 1)`—mimicking a stone fracture!
2. **Header-to-Bio FLIP Brand Animation (`brand-flipped`)**:
   - When opening `/about`, GSAP measures the bounding rect of `#site-header .brand` ("Guillaume Colombel") and FLIP-animates it seamlessly into the first sentence of `#about-panel .bio` ("**Guillaume Colombel**, freelance interactive developer.").
3. **SVG Stele Silhouette Loader (`#stele-loading`)**:
   - While shaders and textures compile, an exact SVG contour of the standing stone draws its left and right flanks (`stroke-dashoffset: calc(1 - var(--stele-progress))`) with a glowing ember tip (`filter: drop-shadow(0 0 6px rgba(255,170,110,0.9))`).
4. **Interactive Sound Design (`Howler.js`)**:
   - 5 layered audio stems: ambient dusk wind (`main.mp3`), stone crackle on hover (`break-loop.mp3`), UI tick (`click.mp3`), stone shatter on open (`break-click.mp3`), and drum rotation tick (`wheel.mp3`).
