# Complete AI Prompt to Build the Guillaume Colombel "Standing Stone (Stele)" Portfolio

Copy and paste the prompt below into Claude Code, Cursor, Antigravity, Bolt, or Lovable to build a complete, customizable version of `guillaumecolombel.fr` for showcasing your own projects.

---

```markdown
# Build an Interactive 3D "Backlit Alabaster Stele" Developer Portfolio (Inspired by guillaumecolombel.fr)

You are an expert creative technologist and WebGL/Three.js developer. Build a **single self-contained `index.html`** (using ES Modules via `<script type="importmap">` for Three.js `0.165.0` and GSAP `3.12.5`) that recreates the signature architectural, visual, and interactive experience of **guillaumecolombel.fr** to showcase a list of creative engineering projects.

---

## 1. Core Concept & Visual Direction
- **Centerpiece**: A sculpted, vertical **backlit alabaster standing stone (stele/monolith)** standing in a moody dusk landscape with reflective water, ground mist, procedural terrain relief, and wind-swept grass.
- **Color Palette**:
  - `--black`: `#050404`
  - `--ivory`: `#f4f2ee`
  - `--amber-glow`: `#ffd6b0`
  - Plus per-project linear RGB internal stone glow colors.
- **Typography**: `'Neue Montreal'`, `'Inter'`, or `system-ui`, clean medium/regular weights (`400`, `500`, `600`), tight tracking, and `tabular-nums` for project indices and award counts.

---

## 2. Declarative Project Showcase Data Array (`PROJECTS`)
Create a clean, easily editable `PROJECTS` array at the top of the `<script type="module">` with 8–12 projects. Each project object must follow this exact schema so the user can swap in their own portfolio items:
```js
const PROJECTS = [
  {
    slug: "project-alpha",
    title: "CLARTÉ",
    wheel: ["CLARTÉ", "WORLD"],
    year: 2026,
    description: "An interactive WebGL & AI design system built for real-time spatial storytelling and high-craft product launches.",
    credits: "Design & Creative Development",
    url: "https://example.com",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    color: [1.0, 0.25, 0.1], // Internal stone subsurface glow RGB
    matter: { veins: 1.4, veinScale: 1.0, bands: 0.5, bandScale: 1.0, density: 1.0 },
    scene: { water: 0.02, mist: 0.7, view: 1.05, flora: 0.85, relief: 1.25, night: 0 }
  },
  // ... include 8 rich sample projects with distinct colors, matter, and scene biomes
];
```

---

## 3. 3D Scene & Custom GLSL Shader Systems

### A. The Backlit Alabaster Stele & Voronoi Fracture
1. **Sculpted Monolith Geometry**:
   - Create a tall, organic, asymmetrically tapered standing stone mesh (`height: ~2.4`, `width: ~0.9`, `depth: ~0.42`) subdivided and grouped into Voronoi-like fracture cells so fragments can separate when hovered or clicked.
2. **Subsurface Scattering & Mineral Strata Shader**:
   - Custom `THREE.ShaderMaterial` (or physical node shader) implementing:
     - **Internal Backlighting**: Light source behind/inside the stone that scatters through thinner edges (`Fresnel + thickness approximation`) using the active project's `color` RGB and `matter.density`.
     - **Sedimentary Strata & Veins**: 3D simplex/FBM noise generating horizontal mineral bands (`matter.bands`, `matter.bandScale`) and dark/incandescent fracture veins (`matter.veins`, `matter.veinScale`).
     - **Embedded Inclusion Preview**: Sample the active project's `coverImage` texture inside the stone core with refraction distortion so it appears trapped inside translucent amber/alabaster before opening.
     - **Pointer Heat & Hover Cracks**: Raycast the pointer against the stone; cells near the cursor heat up (glowing amber/project-color along their seams) and displace slightly toward the viewer.
3. **Click-to-Fracture & Unfold Project Canvas (`stele-open`)**:
   - Clicking the stone (or pressing `Enter` / clicking a project in the list) triggers a spring-driven fracture animation:
     - The stone fragments part outward and upward with inertia.
     - A 3D plane displaying the project's `coverImage` (with subtle cloth/wind vertex wave and pointer parallax tilt) unfolds from inside the monolith core to center stage.
     - Clicking the background, pressing `Escape`, or clicking **Close** refolds the cover and seals the stone fragments back together.

### B. 3D Cylindrical Title Drum ("Roue des titres")
- Encircling the standing stone is a 3D helical/cylindrical drum of project titles rendered on curved/billboarded high-DPI canvas texture planes (or troika/MSDF text meshes).
- **Wheel / Drag / Touch Navigation**:
  - Scrolling the mouse wheel or dragging horizontally/vertically rotates the title drum and monolith (`rotationTurns`), smoothly interpolating `matter`, `scene`, and `color` uniforms between adjacent projects with magnetic detent snapping (`snapStrength`).
  - **Click-and-Hold Jog Mode**: Holding the mouse button down pulls the camera back slightly (`holdPull`) and lets the user scrub rapidly through the drum.

### C. Procedural Dusk Landscape (`Décor`)
- **Ground & Relief**: Displaced terrain mesh around the stone whose elevation scales with `scene.relief`, lit by a puddle of colored light (`steleGlow`) cast from the monolith and a cursor-following ground spotlight (`pointerGlow`).
- **Reflective Water Plane**: Animated ripple shader (`scene.water` height) reflecting the monolith's internal glow and dusk sky, disturbed by pointer movement (`waterStir`).
- **Atmospheric Mist & Sky**: Dusk horizon-to-zenith gradient shader (`dusk`, `night`) with volumetric ground mist (`scene.mist`) and subtle animated birds in the distance.
- **Screen-Space Pointer Frost & Blue-Noise Grain**: Post-processing pass (or fullscreen overlay shader) applying a subtle pointer-wake lens refraction (`frostWarp`), bloom glow, vignette, and animated dithering grain.

---

## 4. UI Components & Micro-Interactions

### 1. SVG Stele Silhouette Preloader (`#stele-loading`)
- Fixed centered SVG outline of the standing stone with `.flank` and glowing `.tip` paths (`stroke-dasharray: 1 1`, `stroke-dashoffset: calc(1 - var(--stele-progress))`) that traces the monolith silhouette from bottom to top during initial load, then fades out (`body.stele-wired`) as the 3D stone illuminates.

### 2. Fixed Header (`#site-header`) with Fractured-Word Hover
- Top-left `.brand` link (`Your Name / Studio`) and top-right `.nav` link (`About`, or `Close` when a project or About panel is open).
- **Fractured Word CSS Effect**:
  - Every `.word` splits into `:before` and `:after` pseudo-elements using `content: attr(data-word)` and complementary jagged diagonal `clip-path: polygon(...)` masks:
    - `:before`: `clip-path: polygon(-30% -30%, 130% -30%, 130% 38%, 70% 50%, 62% 40%, 34% 62%, 26% 52%, -30% 66%)`
    - `:after`: `clip-path: polygon(-30% 66%, 26% 52%, 34% 62%, 62% 40%, 70% 50%, 130% 38%, 130% 130%, -30% 130%)`
  - On hover, the two halves shear apart (`translate(-0.5px, -1.1px) rotate(-1.2deg)` and `translate(0.5px, 1.1px) rotate(0.8deg)`) with `cubic-bezier(0.3, 2.2, 0.45, 1)` and warm to `#ffe8cd`.

### 3. Project Details Sheet (`#project-sheet`) & Prev/Next Arrows (`#project-prev`, `#project-next`)
- When a project is fractured open (`is-visible`):
  - Bottom-left `#project-sheet` reveals the project description, credits, and year (`© 2026`) using staggered line-mask slide-up animations (`yPercent: 110 -> 0`).
  - Includes a **"Visit website ↗"** link where hovering rolls each character upward (`translateY(-100%)` with `transition-delay: calc(var(--i) * 16ms)`), swaps the `↗` arrow diagonally, and wipes the bottom 1px rule from right to left.
  - Left and right `#project-prev` / `#project-next` buttons with dual `.leave` and `.enter` SVG arrows (`stroke-dashoffset` erase and draw animations) step directly to the previous/next project.

### 4. About Route & Eroded Amber Lantern (`#about-panel`)
- Clicking **About** smoothly shifts the camera horizontally so the monolith sits on the right (`aboutShiftX`), erodes the stone surface to reveal a breathing bioluminescent amber core casting caustics, and FLIP-animates the top-left `.brand` name directly into the lead bio paragraph of `#about-panel`!
- Includes an **Awards / Recognition Ledger** (`tabular-nums` counts + labels), external social links (`Instagram`, `LinkedIn`, `GitHub`, `X`), and a **`Copy email`** button with live `"Copied"` state feedback.

### 5. Procedural Web Audio Synthesizer (`#sound-toggle`)
- Bottom-right animated speaker/wave/cross SVG button (`#sound-toggle`).
- Implement a zero-asset **Web Audio API procedural sound engine** (no external MP3 files required) that synthesizes:
  - Soft filtered pink-noise dusk wind drone (`main`).
  - Subtle mineral geiger/crackle texture when hovering the monolith (`hover`).
  - Deep resonant stone fracture thud + crystalline chime when clicking to open a project (`break`).
  - Soft wooden/stone detent tick as the title wheel steps between projects (`wheel`).
```
