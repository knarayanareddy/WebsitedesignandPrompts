# Build Log — From a Visually Wrong Approximation to an Unchanged Local Reference

This is a decision/evidence record. It explains what was tried, what failed, what changed, and what the successful experiment actually proved. It is not a fictional story that an assistant created the author's website from scratch.

## 1. Brief and references

The user supplied an X video demonstrating a website and asked to recreate it with the previously developed reconstruction/motion skills. The post identified the portfolio of Samuel Idowu / designbyxam; the live reference was [samuelidowu.com](https://samuelidowu.com/).

The reference clip did not decode in the available inspection browser. The usable evidence was its thumbnail plus unmodified live-site DOM/styles, decoded still imagery and browser interactions. Continuous clip timing and soundtrack analysis were not completed. The later exact-copy result targets the current live site, not an independently recovered historical video version.

## 2. Initial evidence and renderer classification

The visible Home/About states contained no canvas. Their main visual elements were ordinary text and image layers. That justified a DOM/CSS baseline, but did not establish that the entire site lacked WebGL.

Inspection found hash-based Home/About/Projects/Archive/Contact views, a split Home typography/work-column layout, a long About collage, services, experience, personal-object cards, poster archives, project filters and secondary overlays. Later source-first inspection established lazy `lib/three.min.js` loading and actual procedural Three.js object viewers with real texture imagery.

The correct classification is therefore **hybrid**: DOM/CSS photographic main site, plus real optional WebGL viewers. A canvas count on the unopened hero was only evidence about that state.

## 3. Baseline readiness problem

The first About capture looked almost blank, with clipped/faint entrance text and no settled portrait. Readiness inspection showed a hidden/background tab, loaded fonts/assets and reveal state still in progress. A later settled capture exposed the intended composition.

Lesson: document load completion is not rendering completion. Wait on the actual visible state's font/config/image/reveal conditions. An additional capture helper incorrectly waited for an off-screen biography at a 577px-high first fold; its pending IntersectionObserver state was correct and the wait was the error. Capture readiness was changed rather than rewriting the page.

## 4. The rejected first build

The initial implementation was independently written HTML/CSS/JavaScript with five routes, original poster graphics, SVG stand-in people/shadows, service effects, gallery and CSS-3D object approximations. It was a functional local prototype.

After fixes, its recorded suite reached 21 passing interaction/responsive/fallback checks. Four desktop headline boxes were close to the live measurements. Neither result made the core imagery faithful.

The user correctly objected that the character and shadow looked like caricatures rather than actual pictures. The substitute figure used simple vector shapes and gradients; the shadow was an abstract filled path. Missing photographic skin/fabric/edge/pose detail dominated the visual mismatch. This was a deliberate substitution decision, not a browser/WebGL limitation.

The exact correction was to stop treating a placeholder as the deliverable. The user then specified: create it as-is, do not take liberties and do not shy away from the original.

## 5. Contract change

The active lane changed from independent reconstruction to an **unchanged private local front-end copy**. That meant:

- preserve acquired HTML, inline CSS/scripts, content and relative paths;
- use original photographs and original cast-shadow images;
- preserve original poster/work collections and public data overrides;
- preserve the actual Three.js viewer rather than CSS lookalikes;
- keep original names/biography/labels and source quirks;
- remove the prototype's inserted page disclosures because they were not part of the original output;
- keep README, evidence, server/build/test infrastructure outside the front end;
- do not publish the copied site/media or claim ownership;
- do not create a fake remote editing/messaging backend.

The earlier contract and prototype remained available as history; they were no longer the served/built deliverable.

## 6. Acquired source and dependency inventory

A bounded linked-asset inventory was constructed from the public document and the public configuration used by the frontend. Acquisition stayed within the approved site/asset scope, with limited concurrency/size/timeouts and per-file records. It did not recursively crawl unrelated pages or export browser credentials.

Dependencies came from image attributes, `srcset`, CSS/local fonts, quoted runtime paths, high-resolution posters, public `site/edits.json`, its uploaded image paths and secondary viewer/gallery logic.

Two corrections mattered:

1. `lib/three.min.js` was a lazy local runtime dependency. The initial extension/prefix inventory omitted JavaScript/library paths; adding it restored the real viewer.
2. The gallery derived `ab/b6-poster.jpg` from its MP4 entry at runtime. The literal static inventory did not contain that full pathname. Source logic and an actual successful origin response established the needed file; it was not an arbitrary guessed crawl.

Final recorded inventory:

| Extension | Files |
|---|---:|
| `.webp` | 176 |
| `.html` | 1 |
| `.jpg` | 1 |
| `.js` | 1 |
| `.json` | 1 |
| `.mp4` | 1 |
| `.woff2` | 1 |
| **Total** | **182** |

Recorded acquired bytes: **18,632,135**. Source/local/build relative-path sets and per-file hashes matched. These values describe that recorded snapshot; a future current-site acquisition can differ and must be recounted.

## 7. Separate serving/build infrastructure

The copied front-end tree was served from a dedicated `original/` root. A separate Node HTTP server bound to loopback and provided:

- GET/HEAD only;
- correct image, font, JavaScript, JSON and video MIME types;
- no-store during development/comparison;
- file containment and hidden-path rejection;
- valid MP4 byte-range responses;
- rejection of HTTP writes.

The build created `dist-original/` from the acquired manifest, after validating source hashes, and rechecked every output file. It did not rewrite URLs, minify the document, normalize line endings, replatform the original or copy the prototype's unrelated assets into the output set.

Original Google Fonts and Vimeo integrations remained external dependencies. A local static frontend is not an unexposed editing backend. Tests did not activate external contact links or send messages.

## 8. Test disagreements and their resolution

### 8.1 Gallery keyboard step

A test expected focused-scrubber ArrowRight to advance one image. Both the reference and local copy advanced item 1 → item 3. Source/input observation established a double-handling quirk across focused-control and document-level listeners.

In the unchanged lane, that source behavior was preserved. The test was updated to assert measured parity, not used as a pretext to repair the original. This is not a general recommendation to double-step a fresh gallery; a new implementation should define its own intended state transition.

### 8.2 Reverse scrolling

The first reverse-scroll test sampled the forward motion after it passed an intermediate position, then compared the reverse result to that moving sample. A final reverse target could still be larger than the intermediate forward sample. That did not establish a broken wheel controller.

The corrected test waited for the first requested forward destination to settle before issuing reverse input. No source scrolling code was changed.

### 8.3 Moving-overlay screenshots

Locator screenshots waited for the animated viewer element to be geometrically stable and timed out, even while visible 3D content was rendered. The capture path changed to viewport/clipped screenshots, and scene checks ran with bounded resources. The original viewer code/animations remained unchanged.

The resulting browser checks verified actual rendered object output and changes under real dragging, rather than treating an existing canvas as proof.

### 8.4 Source whitespace and local Git status

A strict diff check flagged an original whitespace-only line. The source bytes were retained because an unchanged copy must not be formatted to appease a generic lint gate. Separately authored infrastructure can be checked strictly without normalizing the source.

A local-copy Git commit later remained pending when its approval prompt timed out. It was not retried or routed around. Files and browser evidence already existed; a pending commit was not falsely reported as published work. The new documentation-repository task is a separate authorized publication, not retroactive approval to retry that earlier blocked workflow.

## 9. Final recorded browser verification

The recorded final Chromium suite passed **18 tests**, with zero skipped/failed/flaky results and zero retries. It covered:

- complete acquired/source/build path and hash parity;
- every served resource's bytes;
- real primary photograph/shadow decode and no inserted substitute UI;
- five views/navigation/Back;
- six branding/seven motion project entries;
- archive filtering and high-resolution lightbox;
- original dark hover and leave behavior;
- real WebGL Bible/headphones/laptop rendering and real pointer dragging;
- original photo gallery/scrubber behavior;
- emulated touch mobile menu/Escape/focus return;
- 390, 768, 1280 and 1440 viewport-width checks;
- normal-motion forward/reverse wheel behavior;
- video range handling and rejected local writes/hidden paths.

These are recorded private-case tests, not tests that a reader runs against a bundled application in this public folder. This folder publishes the process, compact facts and original offline helpers instead.

## 10. Matched image evidence

The original and local page captures used the same Chromium viewport/DPR/motion settings, with public configuration applied, fonts ready and relevant visible images decoded. The matching PNG-file hashes were:

| State | Viewport | SHA-256 shared by reference/local PNG |
|---|---|---|
| About desktop | 1280×800 | `55082eff799b968ae719c9b8ed2d41f2323116afb0a9ce8f5714bfc13c5e962a` |
| About mobile | 390×844 | `50103fa0f1d3692e8cca6cae9fc44e5f641a8e80ebba06c61bd7f482c74b7a66` |
| Projects desktop | 1280×800 | `e9cf1dee077374af2a21e43dcd9c977c3ed948b1ceb983d73862c6bda15a5416` |

DPR 1, reduced-motion capture. Normal motion remained in the delivered front end and was tested separately. Three byte-identical pairs establish those stationary matched states; they do not establish every temporal frame, every input, Safari/Firefox fidelity or full soundtrack equality.

The public kit contains hashes/facts, not the third-party-artwork screenshots themselves. See [evidence/case-results.json](evidence/case-results.json).

## 11. What this new folder contributes

The repository's Apogee documentation pattern was inspected first: `README.md`, `ADAPTED_PROMPT.md` and `BUILD_LOG.md`. This folder follows that organization and adds a full process guide, technical implementation chapter, validation manual, asset/rights policy, evidence summary, templates and offline original helper programs.

Helpers discover asset metadata from saved inputs, compare complete local trees and compare PNG bytes. They do not acquire the author's assets or publish them. Their synthetic fixtures exercise negative cases such as equal-count/different-path trees, changed bytes, symlinks, suspect credential paths, token-query redaction and unequal/invalid PNG inputs.

No application entry point or new Pages slug is introduced. The repository's deployment script explicitly lists apps/statics; this documentation-only folder is intentionally not added to that list. Existing Apogee and other templates are left untouched.

## 12. Honest remaining limits

- No full continuous decoding/timing/audio analysis of the supplied X clip.
- Current live-site copy, not a historical video-version recovery.
- No commercial/public redistribution permission inferred for third-party photographs/source/media.
- No remote backend/editor/database/authentication clone.
- Original external font/video dependencies remain network-dependent.
- No complete accessibility/performance/security production audit or physical-phone/Safari/Firefox verification.
- A fresh independently authored site based on this prompt still needs its own implementation, owned/licensed assets and QA; the private-copy results cannot be transferred to it by assertion.

The reusable lesson is precise: match the user's actual fidelity lane, resolve photographic assets early, preserve source when instructed, and prove images **and** interactions rather than relabeling an approximation as a replica.
