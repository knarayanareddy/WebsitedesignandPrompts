# Adapted prompt — Vesper

## 1. Source and intended fidelity

Read [the detailed source brief](../../04-VESPER-SAAS-LIVING-ORB.md) and [the catalog entry](../../templates/01-vesper.md). Build an original, production-shaped static **design demonstration**, not an impersonation of an operating business. Preserve the visual narrative: **A living instrument for a world in motion.**. Do not claim an exact recreation when the remote references have not been visually inspected.

## 2. Deliverables and architecture

Create semantic `index.html`, a site-specific `theme.css`, and use the collection's local shared modules. Keep the HTML content available before JavaScript. Store authoring data in `tools/catalog.py`; regenerate with `python3 tools/build.py`. Avoid React, Next.js, a server API, import-map CDNs, and runtime font requests. Three.js is pinned at 0.165.0 and served locally.

Use only relative local asset paths so the page runs both at `/getlayersai/sites/vesper/` locally and under `/WebsitedesignandPrompts/getlayersai/sites/vesper/` on Pages. A site is an independent address inside one project Pages deployment, not a new GitHub repository or domain.

## 3. Design language

Set background `#05060b`, text `#f0f4f8`, accent `#4dffb8`, and panel `#111621`. Use the local font family appropriate to the authored design: Geist for the base UI, Syne for bold expressive headings, Cormorant for serif moments. Limit line lengths, preserve generous whitespace, and use clear mono labels for simulated technical readouts. Use the authored page's section order, copy, and unique layout from the `vesper` record in `catalog.py`, not a generic repeated landing-page shell.

## 4. Signature scene

A seeded 7,000-point Three.js buffer geometry interpolates between spherical, spiral, and two-lobe neural coordinates with page progress. Additive mint and violet vertex colors provide light without post-processing.

Use a single animation scheduler with a delta capped at 32 ms. Pointer spring constants are tension 180 and friction 24; device pixel ratio is capped at 1.6. Render a still state when reduced motion is requested, pause offscreen and when the document is hidden, and retain a meaningful fallback if WebGL is unavailable. Direct interactions must remain usable without continuous motion.

## 5. Functional acceptance criteria

1. Submit revenue, latency, risk, and an unknown console command.
2. Change billing and seats; check $145 monthly and $116 annual at five seats.
3. Scroll through the orb → galaxy → neural transitions.

4. Every navigation link resolves to a real section or page. All primary inquiry actions open a labelled local modal, validate sample name/email, then clearly say that nothing was delivered or booked.
5. At 375 px and 1440 px, the page has no horizontal document overflow and all text controls remain reachable.
6. Escape closes dialogs and restores focus. Keyboard activation works without hover. Content remains visible with JavaScript disabled.
7. Readouts and synthetic actions must be marked as sample/demo content, not real financial, clinical, operational, or commercial claims.

## 6. Deliberate deviations

7,000 rather than 32,000 particles; a stylized two-lobe neural shape, not an anatomical brain. No real AI, financial feed, or external inference. Native scroll replaces Lenis.

## 7. Documentation and testing

Create this site's README, adapted prompt, build log, and browser methodology. Link every decision to the source brief or explicitly identify it as an authored adaptation. Run structural validation, automated browser tests, accessibility scans, and desktop/mobile screenshots. Record actual outcomes, not assumed success. Do not describe tests or deployments as passing until they have run successfully.
