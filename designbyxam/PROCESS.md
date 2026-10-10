# Process — Building a Photographic Editorial Portfolio Without Losing Fidelity

This is a reproducible production method, not a claim that a video can reveal all source code. It covers discovery, design reconstruction, original-site creation, authorized exact-copy work, tests and publication. For a copy-ready specification use [ADAPTED_PROMPT.md](ADAPTED_PROMPT.md); for low-level implementation use [TECHNICAL_GUIDE.md](TECHNICAL_GUIDE.md).

## 1. Define the job before choosing the stack

The word “replicate” can mean three different jobs:

| Job | What must stay fixed | What may change |
|---|---|---|
| Unchanged authorized local copy | Acquired front-end bytes, linked assets, paths, labels and source behavior | Separate local serving, evidence and test infrastructure |
| Faithful independently implemented recreation | Approved visual/behavioral contract and real permitted assets | Internal code structure, where it does not alter the approved result |
| New portfolio inspired by the design language | Approved mood, information architecture and quality expectations | Owner identity, copy, photographs, work, art direction and implementation |

Do not slide from the first job to the third without asking. A source defect is not permission to redesign. Conversely, do not promise byte parity for a newly authored implementation whose modules and markup necessarily differ.

Write a contract containing the reference, intended deliverable, local folder, publication destination, writable paths, allowed changes, asset provenance, browser/viewports, state table and gates. Start with [the example contract](templates/reconstruction-contract.example.json), replacing its example values rather than treating them as measured facts.

For this case, the original interpretation was an independent reconstruction. The user rejected the synthetic character and shadow and explicitly required the original as-is. The contract changed to an unchanged local front-end copy. That change is the central decision, not a minor cosmetic adjustment.

### Non-negotiable fidelity rules

- If photography carries the design, deliver photography—not a stylized drawing unless substitution is explicitly approved.
- Do not round measured spacing or replace a distinctive font merely because the framework has a convenient default class.
- Preserve captions, ordering, intentionally repeated labels and source quirks in an as-is lane.
- Keep an uncertainty register. “Not inspected,” “not licensed,” “not decoded,” “observed” and “inferred” are different states.
- Treat documentation, code structure, running output, image quality and interaction correctness as separate acceptance dimensions.

## 2. Recover the actual website from the reference

A social-media video is usually a demonstration of an experience, not the site itself. Read the post caption, author/profile links, visible browser address and public metadata. Search the author's exact handle/name only when necessary. Record which source established the destination.

Here the supplied X post led to `samuelidowu.com`. The live site was then inspected directly. Clip playback did not decode in the available browser, so it could not be used to claim continuous audiovisual understanding. A thumbnail and live stills helped identify the composition, while live DOM/runtime observation supplied stronger implementation evidence.

Do not spend the whole task repeatedly trying the same failed decoder when a live reference is available. A different evidence lane can satisfy the design task without pretending the original video worked. Record the limitation and use the live page for current behavior. If the live version has changed since the video, distinguish current-site fidelity from historical-video fidelity.

### A compact discovery record

Record:

- supplied URL exactly;
- resolved site URL and source establishing it;
- page title, route and observation time;
- browser, viewport, DPR and motion preference;
- which visual states were actually seen;
- whether captions/video/audio were available;
- source or asset access boundaries;
- known external dependencies.

Avoid collecting unrelated profile information, private headers, cookies, browser storage or signed request parameters. A site inspection does not require exporting a user's sessions.

## 3. Observe an unmodified baseline

Use a task-owned browser context. Do not borrow a user's active tabs or change shared browser settings to get around a permission problem. Before adding hooks, establish what the page looks like normally.

Read DOM text, headings, links, styles, image metadata and canvas bounds. Screenshot only when visual information matters, and inspect the screenshot rather than assuming it contains the final layout. Record the page's loading sequence and actual readiness signals.

A nearly blank page can be an entrance state. In this case a background browser tab reported a complete document and loaded fonts while some reveal elements were still hidden. The first image was not the finished design. `document.visibilityState`, reveal opacity/class state, font readiness and image decode distinguished it from a missing page.

### Readiness is a contract, not a timer

For a visible portrait hero, wait for:

1. the intended route/view;
2. public configuration that updates the page, if applicable;
3. actual font readiness;
4. decode of the **visible** portrait/shadow assets;
5. finite entrance/reveal completion for the state being captured.

Do not wait for an off-screen biography to be fully revealed in a short first-fold capture: IntersectionObserver may intentionally keep it pending until scrolled into view. That wait never completes even though the page is correct. Also, `networkidle` does not establish that a perpetual scene, delayed overlay or lazy asset is ready.

Use condition-based waits. Fixed sleeps either delay a fast page or fail on a slow one. When a capture condition times out, inspect its element bounds relative to the viewport before increasing the timeout.

## 4. Classify each surface, not the whole site by one screenshot

This reference is a hybrid:

- Main Home/About/Projects/Archive/Contact surfaces use ordinary DOM, CSS and JavaScript.
- Portraits and cast shadows are image layers, not 3D character models.
- Some personal-object previews load a genuine Three.js renderer only when opened.
- Gallery layout uses its own DOM-based state/input system.

A zero-canvas count on the hero says nothing about an unopened object viewer. Similarly, a WebGL constructor existing on `window` is not evidence that anything is rendered. Open the relevant surface, observe its dependency requests and verify pixels/input.

Do not force Three.js on a photographic page simply because the reconstruction skill is named “WebGL.” It increases work while making texture/lighting fidelity worse. Equally, do not replace genuine object viewers with flat CSS boxes and call them equivalent. Choose the least complicated **correct** implementation per surface.

## 5. Build the state and interaction table

List the states before extracting internals or writing components:

| Surface | Inputs | Stable output | Cleanup/exit |
|---|---|---|---|
| Home | Load, wheel over work column, card hover | Editorial name block and independently scrollable work stack | Route change resets applicable local UI |
| About hero | Load, scroll, resize | Ghost text, real portrait, pose-aligned cast shadow and biography | Reverse scroll remains coherent |
| Services | Hover, focus where supported, touch | Rain, bounce, serif or dark-mode effect | Leave, route change or explicit touch exit |
| Projects | Category selection, card click | Correct subset/order and original preview/coming-soon behavior | Filter reset/navigation |
| Archive | Tabs, poster click, Escape | Poster collection, category empty state, high-resolution lightbox | Close and return to the archive |
| Object viewer | Click, pointer drag, wheel/pinch, reset, Escape | Rendered object, responsive orientation/zoom | Stop renderer and return focus |
| Photo gallery | Click, drag/wheel, scrubber keys, Escape | Front photo, caption and updated selection | Dismiss and restore context |
| Mobile menu | Open, select route, outside press, Escape | Route-appropriate link panel | Close with predictable focus return |

For every row record the starting route/scroll, input coordinates or semantic target, elapsed time, expected visible change, and what remains unknown. “It animates” is not a specification.

In fresh development, add keyboard/touch equivalents where the product needs them. In an unchanged copy, preserve behavior and report existing limitations instead of silently modifying it. Keep those two policies distinct throughout QA.

## 6. Prepare the assets before spending time on effects

The person and shadow dominate this design. Start with their asset quality, not a font-animation library.

For a new portfolio, arrange a shoot with stable camera/lighting, enough full-body margin and several poses. Export real alpha cut-outs with clean hair, clothing and shoe edges; remove background fringing; preserve garment texture; keep a master at sufficient resolution. Prepare a separate shadow plate aligned with each pose. See [ASSETS_AND_RIGHTS.md](ASSETS_AND_RIGHTS.md) for preparation and provenance detail.

The first attempt here drew geometric SVG people and an abstract shadow. It could reproduce headline bounds and pass interaction checks, but it destroyed the reference's photographic identity. That was a specification/asset decision failure, not a CSS/WebGL rendering limitation. Its test score did not justify visual completion.

### Asset gate before implementation

Do not mark the hero ready until:

- the actual approved photographic subject is available;
- its transparent cut-out decodes correctly;
- each required shadow exists and matches the intended pose;
- fonts are available under the intended release conditions;
- project/poster images represent the approved content;
- object-viewer textures and gallery media have known provenance;
- a substitution is approved or the missing asset is explicitly blocking.

A temporary silhouette can test layout, but it must not quietly become the final replica.

## 7. Inventory dependencies in the permitted scope

For an authorized source-first or unchanged-local lane, build a bounded manifest. Do not mirror an entire domain recursively or enumerate unrelated routes. Begin with the actual front-end document and public configuration used by it.

Inspect at least:

- image `src`, lazy `data-src`, `poster` and relevant data attributes;
- every `srcset` candidate, not only the currently chosen thumbnail;
- CSS `url(...)` references, including local fonts;
- quoted asset paths and runtime loader modules;
- published JSON/configuration that changes content or positions;
- high-resolution lightbox images;
- generated media-poster names derived by visible source logic;
- external integrations, classified separately from locally acquired files.

The case initially found most imagery but required two important follow-ups: the lazy local `lib/three.min.js` and the gallery's derived `ab/b6-poster.jpg`. Omitting either would allow an initial hero screenshot to pass while later interactions failed. The corrected acquired inventory contained 182 files.

Use an allowlisted origin/path scope, modest concurrency, bounded sizes/timeouts and resumable records. Reject or separately review unexpected redirects, HTML returned as an image, query-bearing/signed URLs, missing dependencies or new asset classes. Do not treat a filename regex as a complete JavaScript interpreter.

The [offline inventory helper](tools/inventory.py) intentionally only discovers metadata from supplied files. It does not download anything or grant reuse permission. Its optional MP4-poster derivation emits a candidate requiring verification; that naming convention is not universal.

## 8. Specify layout in measured coordinates

Capture exact font family/weight/size, tracking, line height, alignment, color, bounding box and layering order for each anchor element. Use the same viewport/DPR when comparing.

A measured About desktop observation at 1280×577/DPR 1 established approximately:

| Anchor | x | y | Width | Height |
|---|---:|---:|---:|---:|
| A Brand | 34.656 | 103.094 | 565.359 | 135.109 |
| Designer | 604.438 | 231.984 | 638.250 | 135.109 |
| With / an | 34.656 | 338.656 | 338.656 | 270.219 |
| Artist / Heart | 738.656 | 473.753 | 516.438 | 347.906 |

Observed display type: Inter Tight, weight 500, size 168.889px, tracking −3.37778px; pale headings were `#e9e9e9`, foreground words black. Right alignment mattered for With/an and Artist/Heart. These are reference measurements, not universal values for every viewport or a promise about an earlier video version.

Treat visible text bounds separately from image boxes. Transparent padding in a photograph means the image element's left edge is not the face's left edge. Do not repeatedly move the text to compensate for the wrong crop. Compare silhouette/pose/crop before fine material/effect details.

For a fresh implementation, a design-coordinate system can express desktop positions as scaled values while mobile gets a deliberately specified layout. Do not hardcode the desktop collage onto a phone or infer mobile placement from desktop alone. The reference's mobile hero is substantially different: typography precedes a lower portrait rather than simply shrinking every desktop overlap.

## 9. Choose architecture after measuring it

The final copied source was predominantly a static document with inline CSS/JavaScript, a public edit-data overlay and a lazy Three.js module. The successful copy did **not** rewrite it into React/Vite merely to resemble Apogee's stack.

For a new implementation, choose based on project needs:

- Plain HTML/CSS/ES modules: small portfolio, minimal build/runtime footprint, direct layout control.
- Vite + TypeScript: helpful for modular authoring, typed data, dev server and builds.
- React/R3F: appropriate if the surrounding app already benefits from component/state architecture or substantial scene composition; not mandatory for this design.

Separate content data, routes, DOM surfaces, motion/effects, asset manifest and optional viewer code. A fresh module map is an implementation recommendation, not a statement that the original used that module tree.

Design a route transaction: close overlays, stop active effects, dispose active viewer resources, restore scrolling, update view/URL/title, establish focus and then start the new view's allowed transitions. Rapid navigation must not leave the old page dark or its animation loop running.

## 10. Build from stable content outward

A productive implementation order is:

1. Establish fonts, real assets and route shell.
2. Match stationary hero geometry and image/shadow layering.
3. Implement the actual mobile composition and navigation.
4. Add biography, services, experience and personal-object cards.
5. Build Home work-column scroll, Projects filters and Archive/lightboxes.
6. Add service effects one at a time with exit/cleanup behavior.
7. Implement real object viewers and gallery input.
8. Add entrance/reveal/momentum behavior and reduced motion.
9. Add loading/error paths appropriate to the approved lane.
10. Recompare matched states, exercise interruptions and fix the largest mismatch first.

Do not optimize bundle size before the portrait is correct, and do not add decorative animation to distract from missing content. A motion brief should say what an effect communicates, its entry/active/exit states, and how input interrupts it. Arbitrary global “550ms everywhere” tokens were part of the approximation, not the source's verified motion system.

## 11. Serve without altering the front end

In an unchanged lane, keep hosting adaptation outside the copied files. Preserve directory paths so relative images, fonts, configuration and lazy libraries resolve normally. Give the local server correct MIME types, no-store during comparison and GET/HEAD support. MP4 media needs valid byte-range responses for efficient seeking/playback.

The case's local server bound to loopback and rejected HTTP writes. That preserved published frontend output without pretending to recreate the remote editing backend. Original outbound fonts/Vimeo integrations stayed external. Automated checks did not activate contact links or send messages.

A local static snapshot is not a clone of unseen databases, uploads, authentication, analytics or transactional mail. Do not implement fake API success responses to create the impression that those services were recovered.

## 12. Validate assets, images and behavior independently

Use four complementary gates:

### Gate A — inventory and bytes

Compare the complete relative path sets, byte lengths and hashes of acquired source, local serve root and built output. Matching counts alone are insufficient: two different missing/extra files can cancel each other out. Hash equality should be checked on every included file, including unchanged tracked files.

### Gate B — served resources

Request the actual running server's document and assets and compare returned bytes to the manifest. A correct disk tree does not prove the process serves that tree. Check MIME types, video ranges, rejected writes and traversal/hidden-file behavior.

### Gate C — matched visual states

Use the same viewport, DPR, font readiness, route, scroll, motion preference and visible-asset readiness. Compare PNGs or a justified image-diff metric, and inspect images. Exact PNG equality is a strong positive for that captured state. An unequal PNG is not proof of a design defect: timing, loading, metadata, anti-aliasing or environment can differ.

### Gate D — real input

Use actual browser pointer/wheel/keyboard/touch events where they matter. JavaScript `scrollTo` alone does not test a wheel handler, and synthetic DOM events do not establish trusted input behavior. Verify focus return, forward/reverse scroll, changing categories, dismissing overlays, real WebGL render changes under dragging and responsive transitions.

The successful final case passed 18 such checks and three matched PNG pairs. That result did not come from treating the first approximation's 21 passing tests as a quality score.

## 13. Diagnose the test before changing the source

A failing assertion is a disagreement, not automatic evidence that the application is wrong.

- A moving overlay's locator screenshot waited for geometric stability. Capturing the viewport/clipped canvas avoided that automation obstacle without editing the original animation.
- A reverse-scroll test compared against an intermediate first-scroll position. Waiting for the initial target to settle made the intended reverse test meaningful.
- Gallery ArrowRight advanced two items because both focused-control and document handlers acted. The same behavior occurred in the original. The unchanged copy retained it and the test recorded that parity rather than “fixing” the source.
- A whitespace-only Git check flagged an original line. Source byte parity took priority; authored infrastructure was checked separately.

Read traces and live measurements, decide explicitly whether the code, test or contract is wrong, and correct the right layer. Never increase retries to launder a race into green.

## 14. Separate private experimentation from publication

The private local copy and this public documentation pack are different artifacts. A user's request to document the process does not authorize redistributing an author's photographs, personal gallery, website bundle or vendor files into a public repository.

Publish the method, independent helpers, prompts, provenance notes and compact factual results. Exclude original media/source, cookies/tokens/signed URLs, dependency/build caches and copied screenshots unless separately cleared. Provide source links and credit instead of asserting the repository's general license covers third-party assets.

For a new public site, use an asset manifest with explicit ownership/license/release scope. For an allowed exact migration, verify rights and base-path/hosting adaptations before deployment. Preserve any intended “as-is” source bytes and document infrastructure separately.

## 15. Commit, push and verify the requested destination

Inspect the target repo's examples and existing history before creating a folder. Check authentication/write permission early, avoid colliding with existing work, and stage only the reviewed new-folder paths. Do not change unrelated templates or deploy pipelines as a side effect of a documentation task.

Run document/link/schema/helper tests, inspect diffs and scan for secrets or unintended binaries. Commit with the authorized identity. Push without force. Read back the actual remote commit/folder and compare the published file set and hashes with the local included manifest, preferably through a fresh clone.

A successful commit is local; a successful push is transport; a verified remote tree is the publication result. If approval times out, stop and report the pending step—do not rephrase the blocked command or route around it.

## 16. Completion checklist

- [ ] Deliverable lane and permitted assets agreed.
- [ ] Actual site identified; unavailable video/audio limitations disclosed.
- [ ] Baseline and state table recorded before instrumentation.
- [ ] Core photographic subject/shadow quality approved.
- [ ] Main DOM surfaces and optional WebGL surfaces classified separately.
- [ ] Fonts, thumbnails/HQ assets, public data and runtime-derived dependencies accounted for.
- [ ] Desktop and mobile layouts match their own approved references.
- [ ] Exit/cleanup, interruption, keyboard/touch and reduced motion checked.
- [ ] Source/local/build path sets and hashes verified where byte fidelity is required.
- [ ] Running process and served bytes checked.
- [ ] Matched images plus real behavioral tests exercised.
- [ ] Source quirks preserved or separately authorized for repair.
- [ ] Release rights and backend/external-dependency limits explicit.
- [ ] Public included-file set reviewed and remote publication verified.

This checklist is deliberately longer than a “clone this URL” prompt: it prevents a convincing approximation from quietly replacing the actual requested website.
