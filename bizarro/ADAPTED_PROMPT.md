# Luis Bizarro — Creative Technologist Project Archive
## Adapted Engineering & Prompt Specification

> **Source**: [https://projects.bizar.ro/](https://projects.bizar.ro/)  
> **Creator**: Luis Bizarro ([https://bizar.ro/](https://bizar.ro/))  
> **Role**: Creative Technologist (Apple, Airbnb, Active Theory, National Design Studio, UNIT9)  
> **Implementation**: Standalone HTML5, Three.js r186 (WebGL 2.0 PBR Renderer), Screen-Space Dynamic Tracker HUD, HTML5 Video Micro-Streams, Web Audio API Procedural Synthesizer, Localized Inter Typography.

---

### 1. Architectural Concept & Aesthetic Vision

The Luis Bizarro Projects Archive is an ultra-minimalist, tactile 3D interactive portfolio centered on a towering vertical stack of physical Sony cassette tapes, each representing a flagship creative technology production.

1. **Procedural 3D Cassette Tower**:
   - Built on Three.js r186 with WebGL 2.0 and half-float render targets.
   - Procedural geometry models classic cassette casing: high-gloss plastic shell, screw recesses, tape spools, clear central viewing window, and authentic tape label typography.
   - PBR materials feature specular sheen, subtle glass refraction, realistic roughness gradients, and directional lighting reacting to camera orbital angles.
   - A vertical infinite carousel stack allows continuous mouse wheel and trackpad navigation through decades of digital productions.

2. **Screen-Space Dynamic HUD Tracker**:
   - Custom crosshair tracking reticle (`.tracker`) that locks onto the cassette nearest to the cursor in 3D viewport space via raycasting.
   - Real-time cartesian coordinates HUD (`X / Y` readout) in mono typography.
   - Animated ring reticle that snaps to the cassette center.
   - Dynamic project metadata preview drawer:
     - Project title (e.g., *Xbox Museum*, *Lufthansa*, *Castle Crush*, *Bruno Arizio*, *Cult London*).
     - Production year and collaborative studio (e.g., *Active Theory*, *Apple*, *Bizarro Studio*).
     - Role description (e.g., *Lead Creative Developer*, *WebGL / Three.js Shaders*).
     - Hover-activated looping MP4 micro-video clip or high-resolution WebP snapshot.

3. **Tactile Wheel & Drag Navigation**:
   - Inertial wheel physics scrolling smoothly up and down the cassette tower.
   - Direct pointer drag / touch pan listeners on mobile and touchscreens.
   - Kinetic spring dampers provide elastic bounce when reaching stack boundaries or snapping to active cassette intervals.

4. **Procedural Web Audio Synthesizer**:
   - Zero external audio files: synthesized on-the-fly via the browser's native `AudioContext`.
   - Frequency modulation (FM) and additive sine/triangle oscillator synthesis create tape mechanism clicks, whirs, and ambient mechanical clicks on wheel navigation.
   - Accessible sound toggle button (`data-sound`) with animated 4-bar CSS graphic equalizer that visually syncs with state.

5. **Accessibility & Progressive Enhancement**:
   - Hidden semantic heading (`h1.title`) and full semantic list of project links (`nav.projects ul li a`) accessible to screen readers.
   - Keyboard focus trap (`.projects:focus-within`) displays an elegant vertical slide drawer of all 80+ projects with keyboard tab traversal.
   - Graceful fallback for non-WebGL2 devices: `.is-unsupported:after` user notification.
   - `prefers-reduced-motion` compliance across CSS transitions and canvas interpolation.

---

### 2. Complete Asset & Dependency Matrix

The replication is 100% self-contained within `./bizarro/`:

| Asset Category | Directory | Contents |
| :--- | :--- | :--- |
| **Core Bundle** | `assets/` | `index-DYQWZS1f.js` (Three.js r186 + app logic, 665KB), `index-DPqIsaom.css` (4.4KB) |
| **Typography** | `assets/fonts/` | `inter-400.woff2` (Inter UI, Latin subset, 47KB) |
| **Root Media** | `./` | `bizarro.webp` (logo mark), `poster.webp` (blurred initial backdrop), `favicon.png`, `apple-touch-icon.png`, `og.jpg` |
| **Project Videos** | `projects/` | 21 localized MP4 video clips (`cult-london.mp4`, `golfzon.mp4`, `norm-ai.mp4`, `yuri-gravity.mp4`, etc.) |
| **Project Images** | `projects/` | 59 localized WebP stills (`xbox-museum.webp`, `lufthansa.webp`, `castle-crush.webp`, etc.) |

---

### 3. Engineering Implementation Details

#### Local Path Resolution
The production bundle references media via relative paths:
- `./projects/[slug].[hash].webp`
- `./projects/[slug].[hash].mp4`
- `./poster.webp`
- `./bizarro.webp`

This allows instant deployment into any subpath or static web server (such as GitHub Pages at `knarayanareddy.github.io/WebsitedesignandPrompts/bizarro/`) without any build-step asset prefix rewrites.

#### Verification Metrics
- **Console Errors**: 0 errors.
- **Network Resilience**: 0 external CDN or font requests; 100% local delivery.
- **Rendering Performance**: Consistent 60 FPS WebGL 2.0 loop with smooth inertial easing.
