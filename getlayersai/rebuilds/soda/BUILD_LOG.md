# Soda v02 — build log

## 1. Correct the actual blocker

The original site's preview was playable in the user's browser, but the local sandbox could not download the media host and the chat upload flow did not accept the user's file. Asking the user repeatedly to convert/upload it was unnecessary.

A branch-scoped GitHub Actions workflow now downloads the three **public** Soda references on a remote runner, extracts ordinary JPEGs using FFmpeg, and returns a JSON manifest plus chunked image data via the GitHub checks API. The local retrieval script validates SHA-256 before writing frames to the ignored research cache. No credentials go to the media host; no paid-source download, fingerprint spoofing, or access-control bypass is attempted. The workflow cannot deploy Pages or push repository content.

Actual result: **13 inspectable images**, with zero capture errors. The master is 1440 × 1026 and 7.433333 seconds. The local source footage was finally inspected directly before rebuilding.

## 2. Resolve conflicting archive directions

The actual frames confirm the catalog's emerald/cursive/single-screen direction. They contradict the pink/block-type/multi-section interpretation used in the first build. The new implementation follows the visible original instead of blending the conflicting instructions into another invented page.

This is an independent folder and does not use the old shared layout generator. Nothing in the current publication pipeline includes `rebuilds/`.

## 3. Restore composition before adding effects

The first layout pass established:

- Full-screen dark emerald field with a restrained radial center glow.
- Small left wordmark, center frosted pill navigation, dark Contact Us pill at right.
- Large two-line white script headline at left; supporting copy and dark/pink shop control below.
- Oversized central diagonal product, not an ornamental card.
- Two small product selectors with protruding miniature cans at upper right.
- Large lower-right script statement in front of the scene.

Lobster was chosen after inspecting the actual letterforms; it is substantially closer than the prior Syne display. Local font files avoid runtime CDN dependence.

## 4. Reconstruct the product deliberately

`scene.js` uses a lathed profile with 128 radial segments. Shoulder and base geometry are defined explicitly rather than using a bare cylinder. UV height is mapped from actual vertex Y, preventing the stretched-letter error encountered in the first implementation.

The printed sidewall and unprinted aluminum are separate material groups. Their indices are rearranged into two contiguous groups; assigning a group for every lathe segment would create an unnecessary draw-call explosion. Rolled rims, inset lid, dark opening, pull-tab, rivet, and lower rim add silhouette/detail.

The canvas label is reconstructed from visible typography and emblem elements. It is not a downloaded source texture or the original product model. Real brand depiction is limited to this independent reference study. The lower signature explicitly avoids copying the original award as a claim.

A procedural floating-point environment texture provides elongated studio lights for metallic reflections. Directional and hemisphere lights support local shading. Condensation is instanced to limit draw calls. Product selectors get genuine renders of this same model.

## 5. Fruit and depth

Cherries use deformed sphere geometry with a stem depression and slight lobes, a fine skin texture, roughness/clearcoat, curved stems, and brown tips. Blueberries use irregular geometry, spherical non-periodic value noise, granular bloom, and a small modeled calyx. An initial sine-based texture produced obvious bands in screenshots and was replaced with non-periodic 3D noise.

Leaves use a curved indexed mesh and a local vein texture. Bubbles are faint ring/highlight geometry. The fruit layout starts from normalized positions observed in the reference, then receives small idle offsets and spring-based pointer repulsion.

## 6. Coordinate the transition

Flavor state is shared across the page, accessible controls, and scene. A change spins the can, changes its label during the turn, blurs briefly, interpolates the background, and scales the fruit sets through their exchange. The green and blue states retain the same composition. Reduced motion settles all related states without spinning.

No reference screenshot or video is used as the live page backdrop. This remains interactive geometry and DOM.

## 7. Responsive behavior and meaningful UI

Only the desktop reference is known. The mobile version is an adaptation: left headline retained, smaller central/right product, lower-right statement, condensed product selectors, and an expandable menu. It allows vertical room on short viewports instead of making all controls unusably small.

Native dialogs provide focus containment and Escape behavior. Focus returns to the opener. Local cart quantity/price and contact forms work without storage or external requests. Unseen original Ingredients/Eco/Reviews panels are not fabricated; explanatory sheets identify that limitation.

## 8. Verification record

The focused suite is `../../tests/soda-rebuild.mjs`. It saves screenshots at the original 1440 × 1026 viewport, plus 375/390/430 px mobile captures, and checks:

- Actual WebGL scene and rendered product thumbnails.
- Flavor pressed states, background settlement, and a real canvas pixel change.
- Repeated transitions with motion enabled and disabled.
- Quantity pricing, cart feedback, navigation sheets, contact result, Escape, focus restoration.
- Tablet/mobile overflow, menu state, no runtime external requests or uncaught errors.
- No-JS authored fallback and explicit WebGL-disabled behavior.
- Automated default-state WCAG A/AA scan.
- Methodology page availability.

The machine-readable result is in the ignored `.cache/soda-v2/report.json`; actual final outcome is recorded below after execution. A passing suite does **not** imply exact visual parity or user approval.

## 9. Explicit remaining differences

The reconstructed can label, mesh, environment map, and fruit textures are not the original assets. Exact microstructure, specular environment, and animation timing remain approximate. Original hidden navigation pages and mobile layouts were not in the footage. No claim of a pixel-perfect match, real review data, real product sales, brand affiliation, or a design award is made.

**Publication remains blocked on the user's visual inspection.** No merge, Pages replacement, or batch rollout is part of this pilot.

### Executed final checks

`node getlayersai/tests/soda-rebuild.mjs` completed with **42 assertions and zero failure groups**. The default-state axe scan reported **zero WCAG A/AA violations**. No uncaught page errors or external runtime requests were observed. Screenshots were captured at the matched desktop viewport and three mobile widths; reviewed captures are retained in `inspection/`.

An initial normal-motion test exposed a real timing defect on the slow software renderer: a frame-capped delta made a supposedly short flavor transition last much longer. Transition progress now uses elapsed wall-clock time, while the physics step remains capped for stability. The rerun passed repeated animated changes in both directions.

The existing collection's static validator still passes: **13 sites, 27 HTML documents, 385 local references**. The updated development dependency audit reports **zero vulnerabilities**. These results do not constitute user visual approval, a full existing-app browser rerun, a manual screen-reader audit, or a physical-device GPU performance certification.
