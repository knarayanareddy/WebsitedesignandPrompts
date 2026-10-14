# Adapted prompt — GRIDO1

## 1. Source and intended fidelity

Read [the detailed source brief](../../02-KIMI-F1-RACING-SYSTEMS.md) and [the catalog entry](../../templates/43-kimi.md). Build an original, production-shaped static **design demonstration**, not an impersonation of an operating business. Preserve the visual narrative: **Every thousandth tells a story.**. Do not claim an exact recreation when the remote references have not been visually inspected.

## 2. Deliverables and architecture

Create semantic `index.html`, a site-specific `theme.css`, and use the collection's local shared modules. Keep the HTML content available before JavaScript. Store authoring data in `tools/catalog.py`; regenerate with `python3 tools/build.py`. Avoid React, Next.js, a server API, import-map CDNs, and runtime font requests. Three.js is pinned at 0.165.0 and served locally.

Use only relative local asset paths so the page runs both at `/getlayersai/sites/kimi/` locally and under `/WebsitedesignandPrompts/getlayersai/sites/kimi/` on Pages. A site is an independent address inside one project Pages deployment, not a new GitHub repository or domain.

## 3. Design language

Set background `#080b0d`, text `#f4f6f8`, accent `#00f59b`, and panel `#12181b`. Use the local font family appropriate to the authored design: Geist for the base UI, Syne for bold expressive headings, Cormorant for serif moments. Limit line lengths, preserve generous whitespace, and use clear mono labels for simulated technical readouts. Use the authored page's section order, copy, and unique layout from the `kimi` record in `catalog.py`, not a generic repeated landing-page shell.

## 4. Signature scene

A constructed helmet (flattened sphere shell, dark curved visor, trim, and lower guard) uses metallic mint lighting. Pointer movement reveals a wireframe shell rather than a real portrait. A real SVG path length drives the lap-position marker and deterministic speed/gear/G-force readouts.

Use a single animation scheduler with a delta capped at 32 ms. Pointer spring constants are tension 180 and friction 24; device pixel ratio is capped at 1.6. Render a still state when reduced motion is requested, pause offscreen and when the document is hidden, and retain a meaningful fallback if WebGL is unavailable. Direct interactions must remain usable without continuous motion.

## 5. Functional acceptance criteria

1. Scrub to 50% and confirm marker, speed, gear, and G-force update.
2. Run a lap and confirm completion returns the button to enabled.
3. Check the independent-study disclaimer.

4. Every navigation link resolves to a real section or page. All primary inquiry actions open a labelled local modal, validate sample name/email, then clearly say that nothing was delivered or booked.
5. At 375 px and 1440 px, the page has no horizontal document overflow and all text controls remain reachable.
6. Escape closes dialogs and restores focus. Keyboard activation works without hover. Content remains visible with JavaScript disabled.
7. Readouts and synthetic actions must be marked as sample/demo content, not real financial, clinical, operational, or commercial claims.

## 6. Deliberate deviations

No licensed driver portrait or helmet texture was available. Helmet/wireframe inspection replaces portrait burn-off. Circuit geometry and telemetry are illustrative, not race-accurate; no live standings or endorsements.

## 7. Documentation and testing

Create this site's README, adapted prompt, build log, and browser methodology. Link every decision to the source brief or explicitly identify it as an authored adaptation. Run structural validation, automated browser tests, accessibility scans, and desktop/mobile screenshots. Record actual outcomes, not assumed success. Do not describe tests or deployments as passing until they have run successfully.
