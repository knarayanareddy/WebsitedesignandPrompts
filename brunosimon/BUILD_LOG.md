# Bruno Simon 3D Playground — Build Log & Engineering Journal

This document records the provenance, engineering analysis, lessons learned, and modernization process for **Bruno Simon's 3D Playground Portfolio**.

---

## 1. Post-Mortem: Why the Initial Primitive Prototype Scored 1/10

In our initial attempt, we attempted to procedurally hand-code a facsimile of `bruno-simon.com` using primitive Three.js geometries (`BoxGeometry`, `CylinderGeometry`) and Web Audio API synthesized oscillators. The result was rated 1/10 by the user.

### Why Procedural Facsimiles Fail for Iconic Masterpieces:
1. **Asset Artistry Cannot Be Faked**: Bruno Simon's portfolio is renowned because of its bespoke 3D Blender models—the charming toy RC truck with rounded fenders, the low-poly trees with stylized facets, the white masonry bricks, the road cones, the bowling ball with finger holes, and the monumental 3D extruded lettering resting physically in the world with pre-baked ambient occlusion contact shadows. Replacing those with crude procedural boxes and cylinders strips away 100% of the visual charm.
2. **Matcaps & Lighting**: Bruno's world relies on custom spherical Matcaps (`beige`, `emeraldGreen`, `orange`, `metal`) combined with baked shadow textures (`floorShadow.png`), creating a warm, toy-like miniature aesthetic that generic WebGL shaders cannot duplicate without the artwork.
3. **Audio Texture**: Procedural synth bleeps sound sterile compared to real recorded toy car engine loops, dual-tone horns, tire screeches, and physical bowling pin impact sounds.
4. **The Flawed Default**: The critical lesson is that when replicating a world-famous website, the very first step must be checking for an authoritative open-source release. Bruno Simon explicitly published `folio-2019` under the MIT license on GitHub. Trying to recreate it from scratch was an unforced error.

---

## 2. Adoption & Modernization of `brunosimon/folio-2019`

We adopted the official open-source repository [`brunosimon/folio-2019`](https://github.com/brunosimon/folio-2019) and updated it for modern tooling:

1. **Vite 5 Integration**:
   - Upgraded to modern Vite with `vite-plugin-glsl` for shader imports.
   - Configured `base: './'` so all asset paths (textures, sounds, models) resolve relatively, enabling deployment anywhere (including GitHub Pages subpaths).
2. **Draco Decoder Delivery**:
   - Sourced Draco mesh decoders in `static/draco/` so GLB geometry loads and decodes with zero external CDN dependencies.
3. **Physics & Control Engine**:
   - Preserved the authentic Cannon.js physics engine, vehicle constraints, chassis bounce, and collision bodies.
4. **Verified Gameplay**:
   - Verified in headless Chrome: initial isometric "LOADING..." progress box transitions to "START", clicking triggers the car drop, engine startup rev, and full 3D world reveal with 3D letters, trees, rocks, and bowling alley.

---

## 3. Verification Artifacts

- **Loading State**: `/tmp/authentic_brunosimon.png`
- **Loaded Gameplay**: `/tmp/authentic_brunosimon_gameplay.png`
  - Captures the authentic red RC car, low-poly pastel trees, white brick boundaries, rocks, keyboard arrow floor decals, and physical "BRUNO SIMON" extruded 3D lettering.
- **Port**: Live on `http://localhost:3003`.
