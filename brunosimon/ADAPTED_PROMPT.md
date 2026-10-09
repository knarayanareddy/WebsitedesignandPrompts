# Master Prompt & Architectural Specification: Bruno Simon 3D Interactive Playground

> **Target Standard:** Replicate the authentic, award-winning interactive 3D physics playground of `bruno-simon.com` with complete visual fidelity, Draco GLB assets, baked ambient occlusion matcaps, Cannon.js rigid-body dynamics, Howler multi-track sound design, and spring follow-camera tracking.

---

## 1. Executive Summary & Provenance

Bruno Simon's 2019 portfolio is one of the most celebrated web experiences in history (Awwwards Site of the Year). The author published the production source code under the MIT license at [`github.com/brunosimon/folio-2019`](https://github.com/brunosimon/folio-2019).

### Key Architectural Pillars:
1. **Low-Poly Artistry with Baked Shadows**: Instead of flat computer graphics, all assets are stylized low-poly meshes created in Blender and compressed with Draco. Ground contact shadows are pre-rendered into transparent alpha textures (`floorShadow.png`), providing buttery 60 FPS performance without heavy real-time shadow cascades.
2. **Spherical Matcaps**: Materials bypass standard PBR lighting calculations by indexing pre-rendered spherical reflection matcaps (`beige.png`, `emeraldGreen.png`, `metal.png`, `orange.png`), producing a signature warm clay/toy aesthetic.
3. **Physical 3D Typography**: Text in the world is not flat HTML or canvas sprites; it consists of actual 3D extruded geometry meshes (`models/intro/b/base.glb`, `models/intro/r/base.glb`, etc.) with physical mass and collision hulls.
4. **Cannon.js Physics Simulation**: The toy buggy is simulated with compound rigid bodies and suspension springs, allowing it to jump ramps, roll when cornering sharply, crash through walls of dynamic bricks, and knock down bowling pins.
5. **Howler.js Dynamic Audio**: Audio is driven by recorded audio samples dynamically modulated in real time based on velocity, collision forces, and drifting state.

---

## 2. World Layout & Sections Architecture

The 3D world is laid out across an isometric plane divided into coordinates:

| Section | Coordinates | 3D Features & Interactive Elements |
|---|---|---|
| **Intro** | `(x: 0, y: 0)` | Spawn point, 3D extruded lettering **"BRUNO SIMON"**, 3D keyboard arrow keys embossed on floor, perimeter boundaries, and starting gate. |
| **Crossroads** | `(x: 0, y: -30)` | Central roundabout with physical 3D directional road signs pointing left to *Playground*, right to *Projects*, and straight to *Information*. |
| **Projects** | `(x: 30, y: -30)` | Dedicated project zones featuring 3D billboards, interactive dioramas, and physical Webby/Awwwards distinction trophies that can be knocked over. |
| **Playground** | `(x: -38, y: -34)` | Dynamic bowling alley (10 knockable physical pins + heavy bowling ball), stacked destructible masonry brick wall, air-time launch ramps, and traffic cones. |
| **Information** | `(x: 1.2, y: -55)` | Contact information, skills showcases, and physical 3D social blocks (Twitter, GitHub, LinkedIn) with collision triggers. |

---

## 3. Vehicle Physics & Dynamics (`Cannon.js`)

### 3.1 Chassis & Rigid Body Setup
```javascript
// Cannon chassis body definition
const chassisShape = new CANNON.Box(new CANNON.Vec3(0.6, 0.35, 1.15))
const chassisBody = new CANNON.Body({ mass: 35 })
chassisBody.addShape(chassisShape, new CANNON.Vec3(0, 0.4, 0))
chassisBody.position.set(0, 0, 12)
chassisBody.angularDamping = 0.5
chassisBody.linearDamping = 0.1
```

### 3.2 Suspension & Wheel Assemblies
The vehicle utilizes 4 raycast suspension springs:
- **Rest Length**: `0.20 m`
- **Spring Stiffness**: `35.0`
- **Damping Compression**: `1.6`
- **Damping Relaxation**: `2.2`
- **Friction Slip**: `5.5`
- **Roll Influence**: `0.06` (causes chassis to tilt outwards on sharp turns)

### 3.3 Dynamic Tire Skid Marks
A custom canvas-backed texture tracks wheel contact points and writes alpha-blended tire marks to the floor plane whenever:
`driftHandbrakeActive === true || lateralSlipVelocity > 2.5 m/s`

---

## 4. Materials & Asset Pipeline

### 4.1 Spherical Matcaps
All primary meshes utilize custom shaders indexing Matcap textures:
- `matcapBeige` — Ground tiles, stone borders, rocks
- `matcapOrange` — Vehicle body, accent geometry
- `matcapRed` — Bowling pins stripe, brick bodies
- `matcapEmeraldGreen` — Low-poly tree foliage
- `matcapMetal` — Trophy cups, chassis axles
- `matcapWhite` — Floor text, keyboard keys, boundaries

### 4.2 Draco Compression
All GLB files are compressed with Draco (`.drc` geometry chunks), reducing multi-megabyte 3D scenes down to lightweight assets decoded in worker threads via `static/draco/draco_decoder.wasm`.

---

## 5. Master Reproduction Prompt

Copy and paste the following prompt into an AI assistant or coding agent to adapt or reproduce the complete experience:

```markdown
Create an interactive 3D physics playground portfolio in Three.js and Cannon.js inspired by Bruno Simon's iconic site (bruno-simon.com).

Requirements:
1. Engine & Stack:
   - Three.js (0.160+) + Cannon.js (or cannon-es) + Vite 5 + Howler.js.
   - Configure vite with base: './' for universal static deployment.
2. Visual Aesthetic:
   - Low-poly clay/toy aesthetic with warm sunset floor gradient (#ff8908 to #ffb76b).
   - Use spherical matcap shaders (beige, green, orange, red, metal) for consistent stylized lighting.
   - Include pre-baked soft floor contact shadows (transparent PNGs) under all static meshes.
3. Vehicle Physics:
   - 4-wheel driveable toy RC buggy with independent suspension springs, chassis roll, and drift handbrake.
   - Dynamic tire skid marks left on the floor when drifting.
   - Support WASD / Arrow keys, Space for handbrake, H for horn, R to reset.
   - Support URL hash #cybertruck to switch vehicle model to a low-poly Cybertruck.
4. Playground Elements:
   - Central starting gate with extruded 3D lettering for the author's name and keyboard controls decals on the floor.
   - Bowling alley with 10 free-standing physical pins and a heavy bowling ball.
   - Destructible stacked brick wall made of dynamic rigid bodies in running bond.
   - Jump ramps that launch the vehicle into the air.
   - 3D road signs and project stations.
5. Audio Design:
   - Multi-track Howler audio: pitch-modulated engine revs, dual-tone horn, tire screech on drift, velocity-proportional collision crashes, and pin impacts.
```
