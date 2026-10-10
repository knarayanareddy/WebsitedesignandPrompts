# Validation Guide — evidence, coverage, and limits

## 1. Validation objective

This chapter explains how to validate a close **private, local, unchanged copy** of the current DesignByXam case-study source and how to design a similarly rigorous QA process for a separately authored site. The evidence summarized here comes from the recorded original-copy validation run. The guide does not claim that this documentation pack is an application, that a public site was deployed, or that third-party source or media may be redistributed.

Validation has several independent dimensions. Keep them separate in reports:

- **Acquisition integrity:** expected source files were collected and their content identities recorded.
- **Build integrity:** a generated serving tree contains exactly the intended files and bytes.
- **HTTP integrity:** the server returns the expected bytes and correct method/range behavior.
- **Functional behavior:** route changes, filters, overlays, and input work as observed.
- **Visual comparison:** selected, controlled reference and local states match.
- **Accessibility and device confidence:** keyboard/touch and reduced-motion paths work for exercised cases.
- **Scope and provenance:** evidence supports only the copied version and the tested environment, not rights, historical equivalence, or untested browsers.

A pass in one dimension cannot stand in for another. Identical files can be served with wrong MIME types; a correct screenshot can hide a broken Back button; a working canvas element can show no rendered object; a green test suite cannot confer publishing permission.

## 2. Recorded results and their interpretation

The completed run acquired **182 files**. Every manifest entry records a source URL, byte count, SHA-256, and acquisition status. The validation record reports exact path-set and per-file hash parity between the `original/` tree and `dist-original/`. It also reports that no source HTML, CSS, scripts, photographs, shadows, posters, or textures were rewritten.

The test command completed with **18 passed**, zero skipped, zero unexpected failures, and zero flaky tests, with no retries. Three reference/local screenshot pairs were generated under matching Chromium, device-pixel-ratio, reduced-motion, font, edit-data, and visible-image readiness conditions. The pairs were:

| State | Viewport | Result |
|---|---:|---|
| About desktop | 1280 × 800 | PNG byte-identical |
| About mobile | 390 × 844 | PNG byte-identical |
| Projects desktop | 1280 × 800 | PNG byte-identical |

Recorded SHA-256 values for both files in each pair are equal. This is strong evidence for those exact captured states and that browser configuration. It is not proof for every route, animation frame, device scale, browser engine, video frame, network condition, or future version of the live site. The reference and local screenshots had visible images and relevant fonts ready; this avoids mistaking a loading placeholder for a true design difference.

The suite also confirmed a source behavior that might otherwise be “fixed” accidentally: with the gallery scrubber focused, ArrowRight moves the displayed value from 1 to 3 on both the live reference and local copy. It is retained as an observed quirk in an as-is copy, not endorsed as ideal keyboard interaction. A reverse-wheel test was corrected to wait until the initial requested scroll destination had been reached before issuing the reverse input. Moving-overlay screenshot captures used clipped or viewport capture instead of altering the original animation merely to stabilize a locator.

The loopback preview was verified at `http://127.0.0.1:4173/#about`. This proves the local inspection route was reachable in the recorded environment; it is not a public deployment test.

## 3. Evidence chain: inventory to served bytes

A reliable validation chain starts with a manifest and ends with the HTTP response actually used by the browser.

### 3.1 Acquire from a bounded inventory

The acquisition script starts from saved HTML and edit JSON rather than treating a broad site crawl as the task. It extracts same-origin asset references from HTML attributes and source text, and recursively discovers URLs in the saved JSON. It limits accepted paths to known asset families and extensions; ignores `data:`, `blob:`, and fragment references; checks accepted resolved path components and rejects query-bearing URLs; restricts redirects to the expected host; bounds response size; and rejects an HTML response returned where an asset was expected. It includes derived poster paths for video assets and excludes edit data from the general discovered-asset set because that JSON is handled separately.

For each saved file, it records byte length, SHA-256, source URL, and status. Before reusing a cached copy, it checks the current local hash against the prior manifest value. After acquisition it recomputes each local hash and asserts parity. This establishes byte-level integrity relative to the recorded acquired inputs, not the publisher's authorship or permission. A manifest is only as trustworthy as the source snapshot and scope used to create it; keep its provenance and observation context alongside it.

When authoring a new site, apply the same evidence discipline to assets you are entitled to use: manifest every required path, record license/provenance separately from hashes, and fail clearly on missing or unexpected files. Never “solve” an asset failure by silently inserting a third-party equivalent. The helper filenames `tools/inventory.py` and `templates/asset-manifest.example.json` may be useful in the documentation pack, but inspect their actual help and schema before assuming interfaces or treating examples as evidence.

### 3.2 Compare exact trees

Tree parity has two parts: compare sorted relative path sets, then compare bytes for each expected path. Checking only file count can miss one missing path paired with one extra file. Checking only hashes of known paths can miss accidental extra files. The recorded acceptance gate compares both the acquired tree and `dist-original/` against the manifest and checks every file's SHA-256.

An independent implementation should also reject symlinks or unexpected file types if its threat model or packaging format makes them relevant. Normalize only path separators and representation required by the host filesystem; do not alter file contents. The proposed helper `tools/verify_tree.py` should be consulted for its real contract rather than assuming command options from this prose.

### 3.3 Verify the HTTP representation

Build parity does not prove correct serving. Playwright requests each manifest path and compares its body hash with the expected value. The local loopback server accepts GET/HEAD, rejects writes, confines paths to its root, blocks hidden components, and supports byte ranges. A test checks a 16-byte MP4 range response (`206`, `video/mp4`), hidden-path rejection, and POST rejection. These targeted checks are not a security audit; a new implementation may also need suffix, clipped, malformed, and unsatisfiable range cases.
Avoid testing only “URL returns 200.” For static assets, assert status, content type where material, response length, and content hash. For a range request, assert status 206 and `Content-Range` coordinates as well as body length. For forbidden writes, verify the state did not change if the server has any writable resource. In this copy, write methods are rejected outright; no editor/backend write path is asserted to exist locally.

## 4. Functional coverage by behavior

The 18-test suite is a bounded acceptance suite, not a line-by-line test of all 182 files' interpretation or every reachable UI state. Its behavior coverage is nevertheless deliberately broad.

### Routes and layout

Tests visit Home, About, Projects, Archive, and Contact; click route links; use browser Back; and check that the target view is visible. At widths 390, 768, 1280, and 1440, each of the five views is opened and checked for horizontal document overflow. This guards against obvious narrow-layout clipping and route wiring regressions. It does not test every intermediate width, browser zoom, translated content, or all content-height situations.

A more robust new-site test should assert the active heading/landmark, current navigation state, and focus behavior after transitions. A visible target alone may pass when an inactive view is also exposed. Deep-link loading should be tested in a fresh context for each route, and Back/Forward should be checked in both directions. Establish expected scroll restoration rather than assuming it.

### Filters and content state

The Projects test asserts six visible Branding entries, changes to Motion, checks seven visible items and the first item label, and returns to Branding. Archive testing switches to Merch and verifies the designed “on its way” state, then switches to Posters and opens a high-resolution poster in a lightbox. The test waits for a positive natural image width and closes with Escape.

### Photo and poster overlays

The About test decodes the source portrait and shadow images, asserts known intrinsic dimensions for the measured image pair, verifies the image is visible, and checks that no study badge or substitute UI has been inserted. It also observes JavaScript page errors. The archive lightbox test checks visibility, high-resolution image readiness, and Escape dismissal.

These checks are intentionally about the real acquired images in the private copy. A new project should not copy the dimensions or source image; instead assert the new image's own metadata and verify its intended crop. Overlay tests should also check focus enters the dialog, background content is not accidentally focusable, scroll lock is applied and released, and focus returns to the exact trigger. The existing suite checks focus restoration for the product viewer and mobile menu; it does not record a complete accessibility audit for every overlay.

### Pointer, wheel, keyboard, and touch

The dark-hover test captures a before state, hovers the Art Direction target, requires the screenshot to change, and moves away to check that the inverted-page class clears. The gallery test opens the photo gallery, checks an initial scrubber value, focuses the slider, presses ArrowRight, and asserts the measured 1-to-3 behavior before Escape and focus restoration. A dedicated mobile context enables touch and confirms the menu opens by tap, navigates by tap, closes with Escape, and returns focus to its trigger. The normal-motion wheel test moves over the About page, waits for the first requested window-scroll destination, then reverses and checks that scroll position decreases.

These are valuable end-to-end interactions because they use actual Playwright pointer, keyboard, touch-emulated, and wheel input. Touch emulation is not a physical phone. Pointer movement is not proof of assistive-technology compatibility. Add tests for Tab order, Shift+Tab, Space/Enter activation, focus visibility, screen-reader names, drag cancellation, reduced-motion behavior, and real-device touch when those are within scope.

### WebGL product viewers

Three test instances exercise the Bible, headphones, and laptop viewers. Each opens the named dialog, requires a visible canvas and hidden failure message, takes a clipped baseline screenshot, performs a controlled pointer drag across the canvas, and polls until the clipped image changes. It then captures an artifact, presses Escape, verifies the viewer's open class is removed, and checks focus returned to the trigger.

This is materially stronger than checking for a canvas node: it establishes that the viewer became visible, reported no known initialization failure, and produced a changed image after real pointer input. Still, a pixel difference alone may result from perpetual animation rather than the drag. For a new scene, disable or synchronize continuous animation during comparison, sample rendered pixels or scene state, and compare before/after only the controlled action. Test no-WebGL and context-loss fallback, repeated open/close resource cleanup, texture failures, and GPU/browser variation. The recorded tests do not establish physical GPU performance, memory bounds, or Safari behavior.

## 5. Visual comparison methodology

A screenshot pair is meaningful only when environment and page state are controlled. The capture script creates Chromium pages with a 1280×800 viewport, DPR 1, and reduced motion. It records page errors and failed same-origin responses. Before capture it waits for an identifiable saved edit-data marker, `document.fonts.ready`, removal of the temporary page-hidden class, and explicit decoding of the visible photo and shadow. For Projects, it further waits for visible project images to decode. It captures About desktop, changes to 390×844 for About mobile, and captures Projects desktop after returning to 1280×800.

The reference and local browsers use the same configured process and viewport conditions. PNG files are byte-compared and their SHA-256 values recorded. Exact PNG equality is stronger than a perceptual threshold for those pixels: it establishes identical bytes, not simply “looks close.” But it remains bounded to the image content and rasterization environment captured. It cannot establish semantic equivalence, motion equivalence, responsiveness outside those points, cross-browser behavior, or complete site equality.

When exact equality fails in a fresh reconstruction, first check readiness and environment rather than immediately moving elements. Confirm the route, edit/content data, font family and loaded face, viewport, DPR, color scheme, reduced motion, scroll position, image decode, active overlays, and animation state. Compare image dimensions and hashes; use a diff image or per-region analysis to locate divergence. Do not loosen the threshold until the cause is understood. In an authorized unchanged-copy task, however, byte identity of source trees is the primary integrity proof and screenshot parity is a scoped rendering proof.

Avoid `networkidle` as the sole readiness condition. Lazy-loaded images may not be requested until scroll; video and WebGL may remain active; fonts and edit data can be independent; third-party connections may stay open. Use condition-based readiness tied to the exact capture target: wait for data marker, fonts, image decode, and visibility. For moving elements, capture the viewport or a stable clipped region. Do not remove or alter the site's animation to make a screenshot locator pass.

The proposed `tools/compare_png.py` can be referenced for future comparisons only after its actual interface is known. A PNG byte comparison is not automatically an image-difference report, nor does a generated diff prove which rendering is correct.

## 6. Determinism, test repairs, and failure diagnosis

Use deterministic state setup: new browser context, known viewport and DPR, explicit media preferences, stable route, and no leftover overlays. Tests that depend on scroll should wait for the requested destination before applying another input. Otherwise a smooth-scroll animation may still be moving and a reverse-wheel assertion can become timing-dependent. The recorded reverse-scroll correction addressed exactly this sampling error; it did not change original source behavior.

Input event propagation can create surprising behavior. A focused scrubber may receive both a key event and a bubbling listener from its container, causing a two-step index change. Before labelling that a defect, reproduce it on both reference and local versions, record before/after state, and decide whether the task is faithful copying or fresh product design. The as-is copy retained it. A newly authored accessible gallery should usually choose a single event owner and test one-key-one-step behavior unless product requirements specify otherwise.

When screenshot testing an element that moves continuously, a locator may time out or a screenshot may capture different phases. Prefer stable viewport/clipped screenshots and explicit state predicates. Preserve original motion rather than disabling it in production solely to appease automation. Use reduced motion for static visual comparisons, and run normal motion separately for behavior.

A failure triage order:

1. Verify the reference/local URL, hash route, and page readiness marker.
2. Check console/page errors and failed requests; distinguish same-origin asset failures from external font/video failures.
3. Compare manifest paths and hashes; rebuild only from the intended tree.
4. Verify fonts, edit overrides, image decode, and viewport/DPR/media settings.
5. Inspect route state, overlay visibility, scroll position, and reduced-motion setting.
6. Re-run the smallest affected interaction in a fresh context, then the full suite.
7. Record whether the fix changed the site under test or only improved test synchronization.

## 7. Accessibility and responsive QA extensions

The recorded suite exercises Escape, focus return in selected overlays, named controls, touch menu navigation, and multiple viewport widths, but it is not a formal accessibility audit. Also verify semantic headings and landmarks, meaningful versus decorative image alternatives, logical reading order, keyboard-only operation and visible focus, dialog focus handling, contrast, reduced-motion results, zoom, and physical-device gestures where in scope.

For tab-like filters, either implement the complete ARIA tab pattern (roving focus, arrow keys, and associated panels) or use ordinary buttons with pressed/current state. Do not assign `role=tab` to arbitrary text and assume browser behavior will appear. An accessible name is not enough if keyboard activation is missing.

## 8. Limits, provenance, and reporting rules

The evidence establishes the captured current live front end and its local rendering under the recorded conditions. It does not establish a historical video version, remote editing backend, full soundtrack equivalence, complete video timing, legal permission, ownership, or public redistribution rights. External Google Fonts and Vimeo integrations remain external dependencies. Contact links were not activated, and no messages/forms were submitted. The local server rejects HTTP writes. Safari, Firefox, and physical-device behavior were not validated.

The local copy is not a newly authored recreation. The earlier independent prototype was superseded; vector caricatures and CSS fake 3D were rejected. The delivered result is the user-requested private unchanged front-end copy. Do not describe this as a fresh implementation, as a deployed demo, or as proof that the original author approved redistribution. The documentation chapters in this pack contain analysis and generic independently written guidance, not copied website source or media.

A truthful completion report should state separate counts and claims precisely: 182 acquired files with hash/path parity; 18 tests passed with zero skip/failure/flaky and no retries; three specified screenshot pairs byte-identical; WebGL interaction tested for three named objects; and limitations listed above. Do not generalize “three matched screenshots” into “all pages pixel-perfect.” Do not infer an image license from a successful fetch or hash. Do not infer performance from successful rendering. Do not claim CI, deployment, or browser coverage without corresponding observed evidence.

## 9. Acceptance summary

For an independently authored build, the minimum evidence bundle should cover routes and Back/Forward, authorized asset provenance, expected build paths, served bytes and media ranges, no-overflow layouts at representative widths, filter and empty states, overlay focus and cleanup, keyboard/touch/pointer input, reduced motion, image/font readiness, and WebGL pixels plus input and failure fallback where applicable. Label screenshot comparisons with viewport, DPR, browser, and motion preference. Explicitly leave historical timing, untested browsers/devices, permission, and deployment unclaimed. The objective is traceability, not maximizing test count: distinguish verified behavior from inference and proposed design.
