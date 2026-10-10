# Adapted Prompt — Photographic Editorial Portfolio With Real Object Viewers

This is the copy-ready specification for a coding/design assistant. Like [Apogee's prompt](../apogee/ADAPTED_PROMPT.md), it makes fidelity constraints and implementation details explicit. Unlike Apogee, this folder does not bundle a runnable third-party website. Fill the input contract first. **Do not treat all observed values as universal responsive rules, and do not treat this prompt as a license to acquire or publish another person's assets.**

## Part A — Master prompt

Copy the following block and replace the input placeholders.

```text
You are building a high-fidelity photographic editorial portfolio.

INPUT CONTRACT
Reference page/video: <exact reference URL(s)>
Actual live site, if established: <URL or unknown>
Target folder/repository: <explicit writable target>
Owner/brand and approved content: <identity and content source>
Deliverable lane: <fresh independent build | faithful recreation | unchanged authorized local copy>
Assets and permitted uses: <owned/licensed/provided paths and provenance; or unresolved>
Approved changes: <explicit list; empty means none in unchanged lane>
Approved viewports/states: <viewport, DPR, route, scroll/progress, motion preference>
External/paid/outbound actions: <explicitly allowed actions; otherwise no spending, sends or publishing>
Publication destination: <separate release scope, or local only>

OPERATING RULES
1. Inspect existing files/stack and reference evidence before writing code.
2. Keep every supplied identifier, value and URL literal. Do not repair an invalid token silently.
3. Distinguish observed facts, source-confirmed mechanics, inferred candidates and unverified states.
4. Do not claim full video/audio understanding if you have only a thumbnail, transcript or stills.
5. Determine renderer per surface. Use DOM/CSS for the photographic editorial page; use actual WebGL only for surfaces whose approved behavior calls for it.
6. Photographic cut-outs and their pose-matched shadows are core assets, not decorations. Never replace them with SVG caricatures, generic silhouettes, CSS avatars or unrelated AI art without explicit approval.
7. Resolve missing asset rights/availability before final visual acceptance. Temporary placeholders must remain marked incomplete.
8. In unchanged local-copy mode, preserve original frontend bytes, paths, text, imagery and quirks. Do not add a badge, rewrite biography, simplify models, retime effects, fix source defects or replatform it. Keep local serving/tests/provenance outside the frontend.
9. In independent-build mode, author original implementation code and use permitted assets. Match the approved visual/behavioral contract; do not copy unapproved source or media.
10. A passing build/test suite is not a visual-quality or fidelity score. Validate images and actual interaction separately.
11. Never export credentials, browser cookies, private headers, storage tokens or signed URLs. Never bypass a wall or turn a read-only task into a form submission.
12. Do not publish a private source/media copy as part of documentation without separately confirmed release scope.

DESIGN OUTCOME
Create an editorial white/black portfolio whose hierarchy comes from oversized tightly tracked type, real cut-out photography and large cast-shadow layers. The main page is not a card-dashboard or generic SaaS landing page. Main surfaces: Home, About, Projects, Archive and Contact. Secondary surfaces: poster/lightbox, photo gallery, optional real object viewer and mobile menu.

BEFORE IMPLEMENTATION
Produce a brief reconstruction contract and state table; collect baseline font/geometry/assets; identify unresolved core assets; choose the architecture from observed needs; state which reference version is being matched. If a live reference is available but the clip fails, use live behavior and label historical clip timing unknown.

IMPLEMENTATION ORDER
Fonts/assets/route shell → stable photographic hero → distinct mobile composition → biography/services/experience → project/archive data and controls → service interactions with cleanup → actual object viewer/gallery → motion/reduced motion → matched comparisons/real-input QA.

ACCEPTANCE
The deliverable must actually run. Verify asset decode, running process, navigation/Back, filters and correct data counts/order, overlay dismissal/focus, pointer/wheel/keyboard/touch behavior, responsive layouts, reduced motion and cleanup. For byte-fidelity mode, compare complete source/local/build path sets and hashes, then served bytes. Compare matched images with fonts and visible assets ready. If a test fails, inspect whether source, test or contract is wrong before changing anything.

DELIVERY
Return the artifact/preview, tested states, evidence paths, remaining limitations and release status. Do not say 'pixel-perfect' for an untested full experience or 'backend cloned' for a static frontend. Do not claim a push/deployment without reading back the actual remote target.
```

## Part B — Visual specification for a new implementation

This section describes a fresh independently authored site in this design family. It is **not** a transcription of the author's entire HTML/CSS/JS and is not the byte-preserving lane.

### B1. Overall art direction

- White page canvas; black foreground typography; pale-gray editorial background words.
- Large human photography sits in front of some words and behind others; shadows connect the figure to the typography and open space.
- Small navigation contrasts with very large display type. Negative space is intentional; do not fill it with badges, gradients, rounded panels or arbitrary section dividers.
- Content is a creative person's real work and biography, not fabricated enterprise statistics.
- Use actual work artwork; do not substitute repeated generic poster templates and call the archive complete.
- Build depth through scale, overlap, type contrast and photo/shadow relationships before adding parallax or effects.

### B2. Typographic calibration

Observed reference desktop values at 1280-wide viewport/DPR 1:

| Property | Observed value | Scope |
|---|---|---|
| Main typeface | Inter Tight | Main reference DOM typography |
| Display weight | 500 | About phrase |
| Display size | 168.889px | The measured desktop state |
| Tracking | −3.37778px, approximately −0.02em | Same measured display size |
| Compact line box | 135.109px | A Brand/Designer/With rows |
| Foreground two-line box | 347.906px total | Artist/Heart state |
| Pale display text | `#e9e9e9` | Decorative ghost text |
| Foreground type | black | Artist/Heart and primary text |
| Secondary hover type | Local Butler family was observed | Source-specific serif effect; license must be resolved |

Do not turn 168.889px into a universal fixed mobile size. In fresh code, calculate a desktop design scale from the approved artboard and derive element values, then independently specify mobile behavior. Validate the rendered glyph bounds: a font's nominal size is not its visible cap-height.

For a faithful desktop rebuild, use the measured anchors below as an initial calibration, then recapture at the exact approved viewport:

| Phrase block | x | y | Width | Height |
|---|---:|---:|---:|---:|
| A Brand | 34.656 | 103.094 | 565.359 | 135.109 |
| Designer | 604.438 | 231.984 | 638.250 | 135.109 |
| With/an | 34.656 | 338.656 | 338.656 | 270.219 |
| Artist/Heart | 738.656 | 473.753 | 516.438 | 347.906 |

With/an and Artist/Heart are right aligned. Keep text, image-box and visible silhouette coordinates separate. Original photograph transparency must not be compensated for by misaligning the whole text grid.

### B3. Photographic asset contract

Require these before calling the hero complete:

1. Approved primary full-body photographic cut-out with real face, fabric detail and clean alpha edge.
2. Approved alternative full-body poses for the long About composition.
3. Separate pose-matched cast-shadow plates or approved physically plausible shadows generated from the supplied photograph.
4. Approved footer/group image if the design needs it.
5. Project covers at appropriate display resolutions.
6. Poster thumbnails and corresponding high-resolution originals.
7. Personal-object cover/screen/reference textures and gallery media, with release scope recorded.

Do not invent a person with SVG paths. Do not stretch one generic shadow behind every pose. Do not apply heavy filtering to compensate for poor source quality. A missing primary photograph is a blocking content dependency, not a styling task.

### B4. Page and component architecture

For a new modular implementation, a suggested architecture is:

```text
src/
  app/                 route lifecycle, content/data loading, global overlay state
  pages/               Home, About, Projects, Archive, Contact
  components/          SiteNav, PortraitLayer, WorkColumn, ServiceRows, ExperienceList
                       ProjectGrid, PosterGrid, SiteFooter, MobileMenu
  motion/              reveal lifecycle, pointer effects, optional smooth-wheel controller
  overlays/            PosterLightbox, PhotoGallery, ObjectViewer shell
  viewer/              scene/camera, model factories, materials/textures, controls, disposal
  content/             approved owner biography/work/categories/experience
  styles/              tokens, desktop coordinates, responsive overrides, motion states
  assets/              only approved public-deliverable media
```

This is a recommended fresh-build organization, **not a claim that the observed original used React, these filenames or this module tree**. Do not install a framework solely because a sample prompt uses one. Preserve the surrounding project's conventions when adapting an existing app.

### B5. Route and overlay behavior

Use stable canonical routes and direct-link support. The observed source uses hash navigation: Home at its empty/default hash, then `#about`, `#projects`, `#archive` and `#contact`. Do not invent `#home` as the original canonical route if byte/behavior fidelity is required.

On route change:

- cancel/reset page-specific hover effects;
- close active overlays safely;
- stop and dispose active scene work;
- restore the intended scrolling context;
- update title and visible navigation;
- establish predictable focus without jumping the user into an unrelated control;
- initialize only the new surface's allowed reveals.

For a new implementation, keyboard semantics and focus handling are part of the product contract. For an unchanged copy, document original limitations/quirks instead of improving them inside the copied frontend.

### B6. Home surface

Desktop composition: an editorial title/portrait/copy area beside a substantial work column. The work column scrolls independently where the source calls for it. Preserve the distinction between window scrolling and column scrolling.

Cards need true work artwork, title, category and the correct click behavior. Do not invent working case studies if the approved source says “coming soon.” If the contract includes a center bulge/scale effect while the work stack scrolls, derive it from normalized card-center distance within that column, not global window scroll.

Fresh-build instructions:

- define scroller ownership explicitly;
- record card dimensions and gaps;
- update transforms through a bounded rAF path;
- keep pointer labeling independent of touch behavior;
- remove duplicates from accessibility navigation if a seamless visual loop requires cloned cards;
- provide static/reduced-motion behavior as a separately approved variant.

No exact numerical bulge coefficient is implied by a still screenshot. Read permitted source or calibrate behavior and label the inference.

### B7. About surface

Do not collapse the entire About page into one screen. It combines:

- oversized phrase collage;
- real primary portrait/cast shadow;
- staggered biography/photographic poses;
- service effects;
- experience rows;
- personal objects/gallery affordances;
- editorial footer.

Place photographs in transparent, overflow-aware wrappers. Give image/shadow/text layers explicit stacking and avoid accidental global stacking contexts. In a fresh build, reserve image space and make crop/visible bounds inspectable.

Measure the mobile composition directly. The recorded original mobile first fold places the phrase and Artist/Heart high in the page and the main photograph lower; it is not a miniature of the desktop center portrait. Do not copy the initial prototype's mobile layout, which was an approximation and was superseded.

### B8. Services

Four observed service families: Visual Identity, Motion Design, Interaction Design and Art Direction. Effects are part of the design, not generic “animate on hover” decoration:

- Visual Identity: a poster/rain-like visual layer.
- Motion Design: a letter/ball bounce treatment.
- Interaction Design: letter/typeface variation around pointer interaction.
- Art Direction: full-site black/white inversion while active.

For fresh code, each effect has explicit stable/enter/active/leave/route-exit states, resource/listener cleanup and a touch/keyboard policy. Poster rain requires approved artwork and bounded live elements. Letter effects must preserve an accessible full label even if the visual letters are split. Dark mode must not remain stuck after navigation.

Do not invent exact source easing, delay or random seed from still frames. Use source-confirmed values where access is permitted; otherwise document candidate values and verify real-time behavior.

### B9. Projects and Archive

Content is data-driven, with category selection changing the actual visible collection, not simply recoloring a tab. In the recorded original project surface, six branding and seven motion entries were observed/tested; a new owner's dataset may differ, so derive counts from approved data instead of hardcoding these as universal requirements.

Archive requirements:

- distinct category controls and correct empty states;
- thumbnail and high-resolution asset linkage;
- actual full-resolution lightbox decode;
- close/Escape/focus behavior;
- touch and scrolling policies;
- no accidental image swaps caused by stale `srcset` after content updates.

If public configuration overlays text/images/positions, load and validate it explicitly. A screenshot taken before those edits apply may reproduce the obsolete base document rather than the visible live page.

### B10. Real object viewers

If the approved experience requires a freely rotatable object, implement a real 3D scene rather than a CSS caricature. Load the viewer only when opened; the photographic main page does not need to pay its startup cost.

Read the approved model/scene contract. The observed original constructs objects procedurally and uses real cover/screen imagery. A fresh alternative may use licensed glTF or original procedural geometry, but an exact lane cannot silently swap those implementations if output/behavior changes.

Define:

- perspective camera and aspect updates;
- object bounds, center and framing;
- texture color-space handling;
- physically coherent material roughness/lighting;
- environment and contact-shadow strategy;
- normalized pointer drag and rotation representation;
- momentum and idle behavior;
- wheel/pinch zoom limits;
- reset and interruption semantics;
- resize handling and resource disposal;
- loading/error state and non-WebGL fallback policy.

Prove actual rendered output, not only a canvas tag or the Three.js revision marker. Use real dragging and verify render changes. A matched static hero image cannot validate a viewer's hit testing or quaternion math.

### B11. Photo gallery

Specify the source of the photographs, sequence/order, captions, current selection, adjacent-card layout, scrubber and pointer/wheel/keyboard interaction. Do not replace a real personal/photo gallery with a repeated poster carousel and call it complete.

Moving image entries require the proper poster, muted-loop behavior if approved, playable encoding and byte-range support. Do not analyze or attach audio when the allowed evidence lane is text/stills only.

For a new implementation, one input should have one intended state transition. For an unchanged copy, retain source quirks and test them against the source. The recorded original focused-scrubber ArrowRight event advanced from item 1 to item 3; that parity was preserved deliberately rather than reauthored away.

### B12. Motion, interruption and responsive behavior

Maintain an explicit motion brief:

| Motion | Purpose | Required state logic |
|---|---|---|
| Page entrance | Establish hierarchy | Loading, settled, skipped/reduced, interrupted |
| Scroll reveal | Connect content to reading | Enter, leave/reset or one-shot policy, resize |
| Photo drift | Controlled spatial depth | Progress bounds, reverse scroll, reduced motion |
| Work-column scale | Emphasize central card | Local-scroller geometry, no layout thrash |
| Service effect | Show discipline/brand character | Pointer/touch activation, leave and route cleanup |
| Object rotation | Direct manipulation | Drag, momentum, idle, zoom, reset and close |
| Gallery selection | Preserve spatial continuity | Scrub/drag/wheel/keyboard and selection update |

Do not apply a single timing recipe everywhere. A new implementation may use native CSS/Web Animations/rAF or an existing animation library where appropriate; library installation is not proof of better fidelity.

Test interruptions: reverse wheel before settle, change route during an effect, close a viewer during load, resize mid-gesture and change reduced-motion preference. The documented successful screenshot comparisons used reduced motion to establish stable-state equality, while normal wheel/motion behavior was tested separately. That does not mean the delivered original had its animations disabled.

## Part C — Authorized unchanged local-copy prompt

Use this only when permitted source/asset acquisition and local-use scope have been established.

```text
Create an unchanged local front-end copy of the approved reference.

Scope: <exact reference origin and approved linked paths>
Inputs: <approved source snapshot and assets, or bounded permitted acquisition>
Local destination: <folder>
Publication: local only unless a separate release decision exists

Do not reimplement, redesign, simplify or 'improve' the original. Keep HTML/CSS/JS,
photographs, shadows, poster sets, configuration, models/textures, labels and paths
unchanged. Do not insert banners or replace core photography with placeholders.
Preserve original quirks. Put README, provenance, server/build/test code outside the
copied front end.

Discover dependencies from actual markup/srcset/CSS/source/public configuration
and relevant runtime requests. Include lazy libraries and source-derived posters;
do not guess arbitrary remote paths or recursively scrape unrelated areas. Record
allowlisted URLs, status/type/size/path/hash. Bound requests, concurrency and bytes.
Never export browser credentials or signed/private request data.

Verify every asset and the complete path set. Copy source bytes without formatting,
minification, newline normalization, URL rewriting or source-whitespace cleanup.
If hosting needs adaptation, keep it in the separate server or obtain explicit
approval for a documented source change. A base-path migration is not byte-identical
if it rewrites asset URLs.

Serve only from the dedicated copy root with correct MIME types. Bind to loopback
for local study, support GET/HEAD and media byte ranges, reject HTTP writes, and do
not fake unexposed APIs. Preserve original external integrations and list their
network requirements. Do not activate external contact links in automated tests.

Acceptance: source/local/build path sets and per-file hashes match; returned server
bytes match; real original images decode; pages/filter/lightboxes/gallery/viewers
behave as observed; actual WebGL renders; matched screenshots are compared with
font/config/visible-asset readiness. Report states and limitations precisely.
```

**Historical note:** this is the lane the successful final case used. It is not evidence that an assistant generated the original site from scratch. Do not present a preserved third-party bundle as independently authored code or commercially reusable template.

## Part D — Staged assistant prompts

### D1. Discovery and modality

```text
Inspect the supplied reference and locate its actual live site, if possible.
Return the identification evidence, observation limits, viewport/route baseline,
main/secondary surface list and asset questions. Use only the media modalities
actually available; do not pretend a URL or thumbnail provides moving video/audio.
Do not start implementing or acquiring unrelated assets in this phase.
```

### D2. Fidelity contract

```text
Write a literal acceptance contract for the chosen lane. Separate visual, content,
behavioral, byte-integrity, release and backend requirements. List approved changes
and missing core assets. For 'as is', reject creative substitutions and silent fixes.
Map every acceptance criterion to the evidence that will establish it.
```

### D3. Photography and shadows

```text
Audit the approved portrait/shadow assets at rendered size. Verify alpha edges,
resolution, crop, pose consistency and cast-shadow geometry. If any core photograph
is missing, stop that visual gate and request the actual permitted asset; do not
make a vector person. Return an asset-to-surface map and explicit readiness status.
```

### D4. DOM and state implementation

```text
Implement only the approved DOM surfaces first. Match stationary typography,
portrait/shadow layering, route shell and distinct mobile composition. Then add
correct content collections and controls. Keep main-page rendering separate from
lazy optional object-viewer code. Exercise navigation and data updates before effects.
```

### D5. Motion and real 3D

```text
Implement the approved effects with entry/active/exit/interruption cleanup and
reduced motion. For real object manipulation use a real renderer, approved assets,
correct color/material/camera handling, actual pointer/wheel/pinch controls and
resource disposal. Do not infer exact shaders/camera/easing from a video still.
```

### D6. Matched QA

```text
Run the artifact and inspect its actual output. Compare approved matched states at
identical viewport/DPR/route/scroll/motion preference after fonts/config/visible
assets are ready. Use real browser inputs, not only DOM synthetic events. Verify
focus, reverse scroll, filters, overlay close and WebGL render changes. Separate
source defects from mistaken tests; do not change an as-is source to make QA green.
```

### D7. Delivery and publication

```text
Produce a verified artifact plus evidence matrix and limitations. Audit the public
included-file set separately from the private working copy. Publish only approved
files; exclude third-party media/source unless release permission exists. Verify
remote commit, paths and hashes after push. Stop if authorization/approval blocks.
```

## Part E — Acceptance contract for a fresh build

A fresh implementation is done only when each approved gate has real evidence:

1. The site starts and a browser is executing the current files.
2. The photographic subject/shadows are the approved real assets.
3. The stationary desktop layout matches calibrated text/image geometry.
4. Mobile follows its approved composition rather than a blind shrink of desktop.
5. Direct routes and Back work; entering/exiting views cleans up active effects.
6. Work/project/archive data and category counts derive from approved content.
7. Lightboxes show decoded high-resolution assets and close correctly.
8. Service effects have verified activation/exit behavior on the required input devices.
9. Object viewers display actual approved objects and respond to real manipulation.
10. Gallery selection, media posters, scrubber and captions update correctly.
11. Reduced motion remains understandable; no important content is permanently opacity-zero.
12. No horizontal overflow, broken visible assets or unexpected local JS errors in approved states.
13. Input interruption, reverse scrolling and overlay load/close races are exercised.
14. Visual comparison and behavioral tests are both reported, not conflated.
15. Release rights, external dependencies, backend omissions and untested browsers are explicit.

For an unchanged copy, add complete path-set/hash/served-byte parity and source-quirk preservation. Do not replace these gates with a numerical “9/10” opinion or a generic “all tests pass” statement.

## Part F — What not to ask an assistant to do

Bad prompt: “Clone this video, make it cooler, use Three.js, fill missing assets yourself, and tell me it is pixel-perfect.” It invites arbitrary substitutions, renderer overreach and invented evidence.

Better prompt: “Use the agreed lane and permitted actual assets; measure before implementing; preserve literal fidelity requirements; run and compare the artifact; stop a missing core-asset gate rather than faking it; report observed states and unknowns.”

Use the shorter staged prompts for iteration, but keep the master contract in the project. A correction like “create it as is” must update that contract and the deliverable—not merely soften the wording of the completion report.
