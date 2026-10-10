# Technical Guide — DesignByXam portfolio case study

## 1. Scope, evidence, and the implementation boundary

This chapter documents a completed **private, unchanged local copy** of the public portfolio at `https://samuelidowu.com`. It is an implementation and QA guide for understanding the observed front end and for designing a separate, independently authored implementation. It is not source code, a deployment recipe for the original, or permission to publish the original work. The captured front-end tree was kept byte-for-byte intact; an unexposed original source repository was not recovered. Source photographs, posters, shadows, textures, fonts, JavaScript, CSS, HTML, and video are intentionally not reproduced in this documentation pack.

Keep three categories of statement separate:

1. **Measured case facts** are observations from the current live reference, saved source metadata, the local copy, or recorded test outputs. They describe this captured version only.
2. **Implementation interpretation** explains how observed behavior can be understood architecturally. It is a model, not a claim that the original author used that exact internal design process.
3. **Fresh implementation proposals** are generic design guidance for a new work. Pseudocode and examples below are deliberately small, non-source reproductions. Recreate the visual grammar and interaction intent with original assets and original code; do not transplant the third-party site's files or distinctive editorial content.

The capture represents the live site when verified, not the historical state depicted in a reference video. The site includes both ordinary DOM/CSS composition and actual Three.js WebGL product viewers. It is inaccurate to describe the entire site as either a static HTML mock-up or a wholly WebGL-rendered experience.

## 2. System shape: route shell, views, and layered interactions

The observed site behaves as a compact multi-view portfolio. Its primary destinations are Home, About, Projects, Archive, and Contact. Navigation is hash-based; these are not evidenced as independently served page documents. A useful fresh implementation can retain that straightforward mental model while separating concerns into a route controller, view templates, shared navigation, content data, and narrowly scoped interaction controllers.

The original document contains all principal view regions and switches visibility according to the current location hash. This provides fast in-document transitions and makes browser Back/Forward meaningful, but it also means route correctness depends on more than rendering one page: initial deep links, hash changes, scroll position, focus, view visibility, and overlays must agree. Build the new version with explicit route resolution and a single owner for route changes rather than multiple unrelated click handlers. Unknown hashes should resolve deliberately to a safe default or a designed not-found state; never silently show two views at once.

A conceptual state model is:

```text
Route = home | about | projects | archive | contact
Overlay = none | poster-viewer | photo-gallery | product-viewer | video-viewer | mobile-menu
Filter = route-specific category

on hash change:
  resolve route
  close or reconcile route-bound overlays
  expose exactly one route view
  apply route's scroll/focus policy
  update accessible current-page state
```

This is proposed pseudocode, not copied source. The key invariant is *one active route view, with overlays modeled independently*. Do not represent every interaction by mutating a global class with no owner: a menu, a poster lightbox, and a Three.js dialog each have different focus, scroll-lock, and cleanup requirements.

The home screen has a striking split composition. A light intro/identity panel sits beside a dark work column. At desktop widths the right work region is its own vertical scroller and the featured list repeats to create an effectively continuous column. A looping list must keep duplicate content out of the accessibility tree and keyboard tab sequence. The compact layout changes to normal document scrolling and presents a finite sequence that allows the reader to continue to the footer. Wheel input over the left region is forwarded to the work region in the desktop arrangement. That behavior is easy to omit when independently recreating the layout; it is also easy to overdo and trap scroll. Specify trackpad, wheel, touch, and keyboard expectations explicitly, and ensure the user can reach every region without a precision gesture.

About is a long editorial canvas, not merely a stack of conventional cards. Large alternating words, small discipline labels, real portraits, separate cast-shadow imagery, copy blocks, services, experience rows, and a personal-interest tile grid form a deliberately composed sequence. On wide screens, absolute placement and a shared design coordinate scale establish the intended overlap and negative space. At narrower widths, the layout changes to a single-column reading order; it is not simply a scaled-down desktop canvas. Keep content order semantic in a fresh implementation and create overlap as a presentation layer so assistive technologies encounter a sensible reading sequence.

Projects and Archive are browse surfaces with category controls. The observed Projects route has branding and motion groups; measured tests found six visible branding projects and seven motion entries. The Archive route exposes Posters, Merch, and Animations; Merch has an intentional empty/coming-soon message in the tested state. Project tiles are primarily image-led, while poster items can reveal a higher-resolution image in a lightbox. A category change should update the visible data, selected-state semantics, and empty-state message as one transaction. If a floating filter mirrors a top filter during scroll, both controls must remain synchronized and have clear names; duplicated controls should not claim contradictory pressed/selected values.

Contact uses oversized typographic link treatments. The recorded run intentionally did not activate external contact links or submit messages. A future build should use genuine, validated destinations supplied by the site owner, preserve keyboard focus visibility, and avoid inventing links or implying that a message was sent.

## 3. Layout mathematics and responsive reconstruction

The original styles reveal a design coordinate system based on a 1440-by-900 desktop composition. A scale factor is derived from viewport width and height for the split Home canvas; other long-form views use width-based scaling. This is a useful forensic clue, not a universal responsive technique. Width-only scaling can make type and spacing too small on very wide, shallow displays, while viewport-min scaling can compress the entire design based on a constrained height. A fresh implementation should choose its own tested rules and document where it intentionally preserves fixed proportions.

A generic scaled-coordinate relation is:

```text
scale = min(viewportWidth / referenceWidth,
            viewportHeight / referenceHeight)
renderedX = designX * scale
renderedY = designY * scale
```

Use this only when the visual system truly depends on a fixed canvas. For reading content, prefer fluid containers, `max-width`, grid/flex constraints, `clamp()` typography, and content-driven height. At a breakpoint, reflow the content instead of shrinking text until it technically fits. Derive breakpoints from the moment the navigation, wordmark, image, and content columns cease to have adequate space; then test just below, at, and just above each threshold.

For the observed site, the main responsive transition occurs around 860 CSS pixels. Desktop uses the side-by-side home and spatially placed long pages; narrow screens change to vertically flowing content, smaller navigation, compact project filters, and adapted image layouts. Archive also changes grid columns at a wider threshold before becoming two columns on small screens. Thus responsive behavior is view-specific, not a single global “mobile mode.” The test matrix used 390, 768, 1280, and 1440-pixel widths for the five route views, with a separate 390-by-844 touch-emulated menu case. These are tested points, not proof for every intermediate size or device.

For a new implementation, write a layout contract before coding:

- Identify the reference composition and its principal alignment anchors.
- Record content order separately from visual coordinates.
- Mark images whose aspect ratios are intrinsic and those intentionally cropped or distorted.
- Define which desktop overlaps are allowed and which must disappear at narrow widths.
- Select viewport widths where columns or navigation change structure.
- Define a horizontal overflow check for every route at each representative width.
- Treat safe-area insets, browser zoom, long translated labels, and reduced viewport height as explicit edge cases.

Avoid relying on screenshot coordinates alone. A screenshot can show that elements line up in one viewport but cannot establish keyboard order, semantics, text wrapping under a different font, or the layout at a slightly different width. When positioning absolutely, use a stable containing block and document the coordinate basis. Do not position every individual word independently unless that is part of the intended visual system and the narrow layout has a deliberate alternative.

## 4. Typography, imagery, shadows, and visual hierarchy

Typography is a major structural element. The captured page uses an externally hosted Inter Tight family, with system fallbacks. Large display words use tight tracking, compact line-height, and pale-grey contrast against white; body and nav text are much smaller and heavier. This creates the visible hierarchy and spacing. If an external font fails, browser fallback metrics can materially change line widths and therefore absolute alignments. A fresh project should license or create its own font strategy, provide a robust fallback stack, and measure the actual rendered font before adjusting positions. Do not copy the captured font file into a public replica without rights.

Photos and shadows are distinct compositing layers. About portraits are transparent photographic cut-outs, while the cast-shadow images are separate assets positioned beyond the photo bounds. Their location, scale, opacity, and overlap with type are part of the composition. Replacing these with vector caricatures or generic CSS blobs changes both semantics and appearance; the earlier prototype's fake 3D/vector treatment was rejected. For a new, lawful design, use original photography with an appropriately produced transparent cut-out and shadow, or choose a different original visual concept. A CSS shadow can work for a box or simple silhouette, but it is not a faithful substitute for a photographic cast-shadow plate.

Use real asset metadata in implementation. For each image, record its role, intrinsic dimensions, intended crop, alternative text, and loading policy. `object-fit: cover` suits fixed tiles with controlled crop; `contain` suits product imagery with transparent margins; `fill` can distort and should be used only when the original art direction explicitly requires it. Decorative shadow layers should be hidden from assistive technology; meaningful portraits need concise alt text. Lazy loading is suitable below the fold, but the first visible portrait or hero image should not be delayed. Decode images before screenshot capture rather than assuming the network response means pixels are ready.

The Archive's posters are compositions in their own right, and at least one observed poster is assembled from text and photographic layers in the page. Treat this as a design detail, not a requirement to copy that artwork. For independently created poster work, decide whether each poster should be a single authored image or a responsive DOM composition. The former simplifies consistent rendering; the latter enables selectable text and adaptation but can vary with fonts and rasterization. A poster lightbox should use a separate high-resolution asset when appropriate, constrain the image to available viewport space, expose a labelled close control, and restore focus to the item that opened it.

## 5. Motion and interaction architecture

Motion is layered and purposeful: route entrances, scroll reveals, hover treatments, a continuously looping work column, poster transition effects, and interactive gallery/viewer movement. Capture each effect as a small behavior contract: trigger, start/end state, duration class, cancellation, reduced-motion behavior, and whether it changes layout. Keep animations primarily on transform and opacity when possible, and avoid introducing an animation merely because it appears in a single frame. Long-running effects should be pausable or static under `prefers-reduced-motion: reduce`; transitions that communicate state should resolve immediately rather than leave controls visually ambiguous.

The captured HTML contains reduced-motion rules that disable transitions and many entrance animations. Therefore a reduced-motion screenshot is a stable layout comparison but not a motion-quality assessment. A complete new QA pass needs both reduced-motion and normal-motion runs. For normal motion, wait for a known state (target scroll position, class, or element position) rather than arbitrary elapsed time. Avoid changing source animations only to satisfy automation; adapt the capture method to moving elements instead.

Interaction patterns to model explicitly:

- **Navigation and menu:** hash destinations, responsive menu state, close behavior, focus restoration, Escape behavior, and scroll locking. Keep an open mobile panel usable at keyboard and touch sizes.
- **Category filters:** current category, visible item set, empty message, and any mirrored floating control. Use real buttons or a complete tab pattern with arrow-key behavior; presentational spans with ARIA roles need all required keyboard behavior.
- **Poster lightbox:** item activation, high-resolution image readiness, backdrop/close interaction, Escape, scroll lock, and return focus.
- **Photo gallery:** photo index, drag/touch scrubber, keyboard input, labels, loading states, and cancellation when the dialog closes. Pointer, touch, and keyboard event paths can interact through bubbling; test the actual observed sequence rather than assuming one event equals one step.
- **Project video:** poster before activation, explicit user action before loading a remote video, accessible title and close path, and a clear unavailable state if the provider is unreachable. The local copy preserves remote Vimeo references, so the local browser is not evidence that those streams are self-hosted.
- **3D product viewer:** model rendering, pointer drag, zoom or momentum if present, close/keyboard behavior, renderer failure state, and GPU resource disposal.

The original view includes genuine WebGL, loaded through its local copy of Three.js. The Bible, headphones, and laptop viewers render an actual canvas and respond to pointer dragging. Inspection notes establish that this includes procedural model geometry plus real texture images. That distinction matters: testing that a `<canvas>` exists is insufficient, and naming the entire website “WebGL” is equally wrong. The rest of the portfolio is primarily HTML/CSS and image-based.

A fresh product-viewer design can be partitioned into four layers: (1) a dialog and accessible controls, (2) renderer and canvas lifecycle, (3) scene/camera/lighting/material setup, and (4) pointer/keyboard input. Use a perspective camera only if the object and framing need perspective; keep the object centered in a predictable orbit target. A physically based material needs plausible roughness/metalness and appropriate color-space handling for textures. Environment lighting or PMREM filtering can make reflective surfaces legible; it should not be confused with a mesh's own geometry. Procedural geometry is useful for simple original objects, but recognizably detailed products may need a separately authored model. Do not claim that a generic primitive reproduces the reference object.

For an orbit interaction, normalize pointer displacement against the canvas dimensions, apply bounded changes to the object's orientation or camera orbit, and avoid jumps when a drag starts. Use pointer capture so a drag remains active if the pointer leaves the canvas. On touch devices, explicitly define whether one-finger movement rotates and how pinch/scroll is handled. Keyboard users need a labelled viewer and a reliable close path; the canvas itself does not automatically provide equivalent interaction. Reduce or disable inertia for reduced-motion settings. On close or route teardown, stop the render loop, cancel pending animation frames, remove event listeners, dispose geometries/materials/textures, and release the renderer where supported. Otherwise repeated open/close cycles can leak GPU memory.

Do not use canvas presence as the only visual test. A blank canvas can still satisfy a DOM locator. Verify successful initialization, absence of the renderer error message, non-empty rendered pixels, and an interaction-driven pixel change. Pixel changes alone can result from animation; capture matched states or compare a bounded canvas region before and after a controlled drag. The recorded suite used a real pointer drag and screenshot change for all three product viewers.

### 5.1 Source-confirmed viewer configuration

The following are inspected values from the recorded original viewer, not recommendations for every new product scene or proof of the artist's development process. The public kit explains the configuration without reproducing the original program.

| Concern | Observed configuration | Why it matters |
|---|---|---|
| Renderer | Antialiasing and alpha enabled | Smooth object edges and compositing against the surrounding viewer |
| Render resolution | Device pixel ratio capped at 2 | Avoids unrestricted high-DPR framebuffer cost; this is not a measured performance guarantee |
| Output/color | sRGB output; color textures tagged sRGB | Prevents treating photographed color data as linear scalar data |
| Tone mapping | ACES Filmic, exposure 1.05 | Controls the final perceived intensity/highlight roll-off |
| Camera | Perspective, 28-degree vertical FOV, near 0.05, far 100 | Frames objects with controlled perspective rather than a CSS planar illusion |
| Environment | A procedural studio room filtered through PMREM | Provides broad reflected light for glossy/metal surfaces |
| Key light | White directional light, intensity 1.1, position (2, 4, 3) | Adds directional form cues beyond the environment |
| Framing | Object center from bounds; bounding-sphere-based camera distance | Supports several differently shaped objects without unrelated hand-placed cameras |
| Contact shadow | Transparent generated radial texture on a horizontal plane | Anchors the object; distinct from the photographic About-page cast shadows |

The camera framing derives distance from bounding-sphere radius and the sine of half the camera FOV, with a small margin factor of 1.08. Portrait-oriented viewports apply a further distance multiplier of 1.45. Those source-specific choices explain the visible framing; they do not establish an optimal camera for a new asset. A new model's aspect, depth and silhouette need independent review.

Color space must follow the type of data. A photograph/cover color map has different treatment from scalar roughness or metalness data. In the observed laptop, a procedural material-control texture is explicitly marked as non-color data, while cover/screen color textures receive color-space handling. Do not fix a washed-out cover by randomly changing all lights: first verify whether the texture is being interpreted in the intended space, then exposure, then material parameters.

### 5.2 Model construction and material intent

The original viewer did not retrieve a glTF model of every object. It builds recognizably different object families procedurally, with material and texture detail. This is why acquiring only image tiles, or replacing them with CSS rectangles, cannot reproduce the full viewer.

- **Bible:** distinct front/back boards, a page block, rounded spine, texture detail and metallic-looking decorative typography/bands. The front uses real cover imagery where available; separate generated texture treatment supplies backing/edge detail. A box alone omits the spine, page edges, surface character and silhouette.
- **Book:** cover/page/spine faces are treated separately, and a real back-cover image can arrive after initial construction and replace an initial material map. A test taken before that image arrives is not necessarily a final material comparison.
- **Headphones:** multiple materials separate matte plastic, leather/fabric cushions and metallic rings/stems. Lathed/swept/extruded forms describe the oval ear cups and headband; it is not a pair of flat image sprites.
- **Laptop:** beveled slabs, a keyboard/deck texture, material-control texture, screen and edge details create a coherent object. Source comments describe a particular physical-product proportion, but those comments are not an independent measurement of the real device.

For a new original scene, list component parts and material roles before choosing primitives. Decide which details need geometry, which can be texture, and which are too small to contribute at the approved framing. Use owned photographs/models and preserve texture-to-part mapping. Material appearance cannot be copied by copying geometry alone, and a shader name without its parameters, textures and scene state is not a complete reconstruction.

### 5.3 Rotation, momentum, zoom and reset

The inspected interaction stores object orientation as a quaternion. Drag displacement is normalized by the smaller canvas dimension and converted into rotations about screen-oriented axes. Pointer capture keeps the gesture active outside the immediate hit area. Pinch derives its change from the ratio of two-pointer distances, while wheel input changes a bounded zoom multiplier exponentially. This avoids treating one mouse event as a fixed camera jump across every screen size.

Source-specific behavior includes a zoom-multiplier range of 0.55 to 1.6, residual angular velocity decaying by 0.93 per animation iteration, and idle turntable motion beginning after 2.5 seconds when reduced motion is not requested. The camera eases toward the requested distance instead of immediately snapping. Double-click resets orientation and zoom, using quaternion interpolation for the orientation transition.

These values are not a blanket motion prescription. Per-frame damping can depend on effective frame rate; a new implementation should decide whether to use frame-based or time-normalized motion and test its actual device range. Likewise, a constant that feels good for a compact book may not suit an elongated object. Use controlled gestures and observed results rather than claiming an exact easing curve from a still.

The normal entrance in the inspected viewer develops over 1300ms with a cubic ease-out formulation, an orientation offset, vertical rise and scale settling. Reduced motion starts in the resolved entrance state and suppresses the idle turntable path. That gives static comparisons a meaningful settled state while leaving actual delivered normal motion intact.

### 5.4 Resource ownership and teardown

A renderer that opens correctly once can still be badly integrated. In the recorded source, the viewer owns its animation-loop state and resize listener. Teardown cancels the animation frame, removes the listener, traverses scene geometry/materials, disposes maps/materials, disposes the environment texture and PMREM generator, and releases the renderer/context when supported.

For a new implementation, define ownership for shared textures versus per-view textures so closing one overlay does not dispose a resource another view still needs. Track late image/model promises: a response arriving after close must not recreate a scene or allocate an abandoned texture. Verify repeated open/drag/close cycles and rapid route changes, not only initial opening. Disposal calls in source are evidence of an intended cleanup path; a production memory bound still requires measurement.

The personal-object contact shadow is a renderer-generated plane/texture. The huge portrait cast shadows on About are separate image layers. Keeping those pipelines distinct prevents a common conceptual mistake: trying to obtain the photographed person's dramatic projected silhouette by tweaking the object-viewer's radial shadow or a CSS drop-shadow.

## 6. Assets, provenance, and local serving

The private copy acquired 182 files, including the HTML, site edit data, image variants, shadows, textures, font files, scripts, and local media. The original asset families observed include `ab`, `img`, `pj`, `t`, `hq`, `site`, `fonts`, and `lib`. The page's saved `site/edits.json` supplies text and position overrides; failing to load it can produce a seemingly functioning but compositionally incorrect view. This file is data, not permission to reproduce or publish the content. The copy also retains external Google Fonts and Vimeo dependencies.

The acquisition script was deliberately constrained: it reads a previously captured HTML document and JSON edit file, extracts same-origin asset paths from a narrow allowlist, rejects signed/query URLs, limits asset sizes and redirects, avoids HTML masquerading as media, and records source URL, byte count, SHA-256, and status. Those controls are useful examples of evidence-oriented acquisition, not a general license to crawl. A fresh lawful project should use creator-owned assets, assets with documented licenses, or placeholders. Track source, license/permission status, transformation, and intended publication scope in an asset manifest. If permission is unknown, exclude the asset from public output.

The local preview server is intentionally narrow: it binds only to `127.0.0.1`, supports only GET and HEAD, rejects HTTP writes, guards resolved paths against escaping the content root and hidden path components, and supports byte ranges for video. It serves the original tree by default and can serve the build tree via an environment switch. This is a private inspection harness, not a production web server, authentication layer, or security certification. Range support allows browser media seeking; validate partial-content status, content range, and body length rather than only checking that a video tag appears.

## 7. Independently authored implementation plan

A disciplined new build can proceed in these phases without importing original assets or source:

1. **Observation inventory:** record routes, content hierarchy, breakpoints, interactive controls, motion triggers, and expected fallback states. Use screenshots and browser behavior as observations, not as source code to transcribe wholesale.
2. **Rights and content plan:** select original copy, photography, illustrations, and product models; record provenance and permitted use. Replace names, project identities, testimonials, and metrics with truthful owner-provided content.
3. **Semantic skeleton:** implement route views, headings, landmarks, meaningful links, buttons, filters, and dialog semantics before fine visual styling.
4. **Layout system:** implement the desktop composition and a true narrow-screen reflow. Establish type scale, spacing variables, and image behavior. Avoid embedding every measurement as a one-off coordinate.
5. **Interaction modules:** add navigation, filters, overlays, gallery, and any independently authored viewer, each with explicit lifecycle and keyboard support.
6. **Motion and accessibility:** add route entrances and pointer effects only after static layout is sound; implement reduced motion, visible focus, alt text, and touch behavior.
7. **Evidence:** validate asset completeness, route behavior, breakpoints, browser console, interactive behavior, screenshots, and the claimed deployment target separately.

Example design tokens should express intent, not copied source values:

```css
:root {
  --canvas: #f7f6f2;
  --ink: #171715;
  --display-scale: clamp(3rem, 13vw, 12rem);
  --content-gutter: clamp(1rem, 2.5vw, 2.5rem);
}
```

These are generic illustrative tokens only; they are not the captured palette or a rendering claim. Prefer a small token set that can be reviewed for contrast and consistency. For unusual editorial typography, preserve line breaks only where they are part of the authored design; avoid hard-coded `<br>` as a substitute for responsive text wrapping unless deliberate.

## 8. Failure modes and architectural decisions

**A visually similar first viewport is not a complete recreation.** It misses route state, deep links, Back, category counts, archive empty states, image readiness, modals, keyboard, touch, and real 3D interaction. Build the route and interaction inventory first.

**A decorative placeholder is not equivalent content.** Fake portraits, generic shadows, or CSS shapes can conceal that the photo compositing or texture pipeline has not been implemented. Use authorized original assets or an openly labelled placeholder, and do not claim equivalence.

**A static test is not proof of dynamic behavior.** A screenshot cannot prove that a scrubber responds, that the selected filter updates, or that WebGL renders. Use action-and-result assertions and state-reset discipline.

**Canvas is not proof of rendering.** WebGL context creation may fail, shaders may compile unsuccessfully, textures may be missing, or the canvas may be transparent. Test visible pixels and interaction, and exercise a no-WebGL fallback.

**Network quiet is not readiness.** Lazy images, custom fonts, edit overrides, delayed reveals, and media can arrive after `domcontentloaded` or network idle. Wait for the exact data, fonts, decode promises, and overlay state used in the capture.

**A current clone is not a historical reconstruction.** A live site can change without notice. Record observation date/version context and avoid claims about the timing or contents of an earlier video unless those are separately captured and measured.

**Private local fidelity is not redistribution permission.** Hash equality establishes bytes; it establishes neither ownership nor license. The actual completed outcome here is private and unchanged, and this documentation does not add a public build or deployment path.

For companion context, see `PROCESS.md`, `ADAPTED_PROMPT.md`, `BUILD_LOG.md`, `ASSETS_AND_RIGHTS.md`, `VALIDATION.md`, and `README.md`. The repository may also include generic offline-safe helpers such as `tools/inventory.py`, `tools/verify_tree.py`, `tools/compare_png.py`, and illustrative templates under `templates/`. Consult their actual help/output before using them; this chapter does not prescribe unverified command-line interfaces.
