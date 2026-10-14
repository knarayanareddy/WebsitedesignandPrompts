# GetLayers AI — Free Procedural WebGL Gradient & Shader Prompts

Extracted from `/gradients` (`freeGroups`), these 5 pure-WebGL shaders require **zero external libraries or assets** (~1 KB of GLSL each) and feature pointer-interactive physics.

---

## 1. Soffit (`id: "soffit"`)
- **Nature / Family**: `shadow` · `light`
- **Shader Hash**: `a242c4de205b5a97537cecac4a070e5d`
- **Description**: The underside of an overhang: one long fall from the opening into the shade, and a bounce coming back the other way so the deep end lifts off the floor instead of dying flat — the hand turns the light and walks it along the opening.
- **Prompt**:
```text
Create a self-contained WebGL2 canvas component implementing the "Soffit" architectural shadow-and-bounce-light gradient shader.
- Uniforms: u_time, u_resolution, u_pointer (smoothed via spring physics), u_colors[5] (violet #4c1d95, magenta #be185d, teal #0f766e, orange #ea580c, deep indigo #1e1b4b).
- Visual behavior: Simulate a directional light grazing the underside of an architectural overhang with a secondary warm bounce light reflecting from the opposite edge. Pointer movement rotates the light incidence angle and slides the aperture opening smoothly. Add subtle film dithering to prevent 8-bit color banding.
```

---

## 2. Flue (`id: "flue"`)
- **Nature / Family**: `smoke` · `liquid`
- **Shader Hash**: `97c6aadf665dd22f6cd812ede4f54e03`
- **Description**: A column of smoke drawn up a flue by the curl of a scalar potential — the hand goes into the velocity field rather than the coordinate, so it folds the column the way a draught does and keeps blowing for a beat after the hand stops.
- **Prompt**:
```text
Create a self-contained WebGL2 canvas component implementing the "Flue" curl-noise smoke column shader.
- Uniforms: u_time, u_resolution, u_pointer, u_pointer_velocity (decays with momentum after pointer stops), u_colors[5].
- Visual behavior: Compute 2D curl of a multi-octave simplex scalar potential field rising vertically like warm smoke in a chimney flue. Inject u_pointer_velocity directly into the advection velocity field so moving the cursor folds and eddies the rising column like a physical draught, lingering for 1.5 seconds after pointer rest.
```

---

## 3. Gnomon (`id: "gnomon"`)
- **Nature / Family**: `shadow` · `light`
- **Shader Hash**: `dac5d50a049f28c6b996fed0045718e5`
- **Description**: Soft shadows obeying the one rule that makes them soft: the penumbra widens with distance from the occluder and goes fainter as it widens.
- **Prompt**:
```text
Create a self-contained WebGL2 canvas component implementing the "Gnomon" physically-inspired soft penumbra shadow shader.
- Uniforms: u_time, u_resolution, u_pointer, u_colors[5] (warm amber, deep red, slate blue, violet, obsidian).
- Visual behavior: Render an analytical sundial gnomon / linear occluder casting a shadow across a luminous gradient plane. The shadow penumbra width (`smoothstep` kernel radius) increases linearly with distance from the contact base while contrast attenuates inversely. Cursor position orbits the virtual sun elevation and azimuth.
```

---

## 4. Astragal (`id: "astragal"`)
- **Nature / Family**: `lattice` · `structure`
- **Shader Hash**: `e204997cca8fdd1efb55bc2d16e97249`
- **Description**: Glazing bars on a five-fold quasi-periodic grid — ordered everywhere, periodic nowhere; the cursor bows the phase and the whole lattice bends like warm glass.
- **Prompt**:
```text
Create a self-contained WebGL2 canvas component implementing the "Astragal" 5-fold Penrose / quasi-periodic glazing lattice shader.
- Uniforms: u_time, u_resolution, u_pointer, u_colors[5].
- Visual behavior: Sum 5 plane waves separated by 72-degree (2*PI/5) angles to form a quasi-periodic crystal interference pattern resembling architectural glazing bars and refracted glass panes. Displace the wave phases radially around `u_pointer` so the lattice bends and refracts elastically like warm glass under the cursor.
```

---

## 5. Airlight (`id: "airlight"`)
- **Nature / Family**: `haze` · `light`
- **Shader Hash**: `e750d964aa80ee53bb0bba70d7a4093b`
- **Description**: Ridges going pale as they recede — the air between piling up until the far ones are only sky.
- **Prompt**:
```text
Create a self-contained WebGL2 canvas component implementing the "Airlight" atmospheric perspective ridge shader.
- Uniforms: u_time, u_resolution, u_pointer, u_colors[5] (deep foreground indigo to pale horizon sky blue and warm zenith amber).
- Visual behavior: Render 7 layered horizontal FBM mountain/wave ridges receding in depth. Apply Beer-Lambert atmospheric scattering (`mix(ridgeColor, skyColor, 1.0 - exp(-depth * density))`) so distant ridges dissolve into luminous aerial haze. Cursor parallax shifts foreground ridges faster than distant ones.
```
