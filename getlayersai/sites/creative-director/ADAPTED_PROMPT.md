# Adapted prompt — ALEX / MORGAN

## 1. Source and intended fidelity

Read [the detailed source brief](../../07-CREATIVE-DIRECTOR-PORTFOLIO.md) and [the catalog entry](../../templates/04-creative-director.md). Build an original, production-shaped static **design demonstration**, not an impersonation of an operating business. Preserve the visual narrative: **Work that makes you feel something.**. Do not claim an exact recreation when the remote references have not been visually inspected.

## 2. Deliverables and architecture

Create semantic `index.html`, a site-specific `theme.css`, and use the collection's local shared modules. Keep the HTML content available before JavaScript. Store authoring data in `tools/catalog.py`; regenerate with `python3 tools/build.py`. Avoid React, Next.js, a server API, import-map CDNs, and runtime font requests. Three.js is pinned at 0.165.0 and served locally.

Use only relative local asset paths so the page runs both at `/getlayersai/sites/creative-director/` locally and under `/WebsitedesignandPrompts/getlayersai/sites/creative-director/` on Pages. A site is an independent address inside one project Pages deployment, not a new GitHub repository or domain.

## 3. Design language

Set background `#210706`, text `#fff0dd`, accent `#ff9e64`, and panel `#34110d`. Use the local font family appropriate to the authored design: Geist for the base UI, Syne for bold expressive headings, Cormorant for serif moments. Limit line lengths, preserve generous whitespace, and use clear mono labels for simulated technical readouts. Use the authored page's section order, copy, and unique layout from the `creative-director` record in `catalog.py`, not a generic repeated landing-page shell.

## 4. Signature scene

A full-plane GLSL domain-warped sine/noise field blends deep crimson, red, and orange with subtle grain. Pointer position warps the field; selected case rows update the hue target. Eight keyboard-operable case-study dialogs replace hover-only content.

Use a single animation scheduler with a delta capped at 32 ms. Pointer spring constants are tension 180 and friction 24; device pixel ratio is capped at 1.6. Render a still state when reduced motion is requested, pause offscreen and when the document is hidden, and retain a meaningful fallback if WebGL is unavailable. Direct interactions must remain usable without continuous motion.

## 5. Functional acceptance criteria

1. Open all eight case rows by keyboard.
2. Inspect pointer deformation and focus alternatives.
3. Verify no invented award claims or misleading email delivery.

4. Every navigation link resolves to a real section or page. All primary inquiry actions open a labelled local modal, validate sample name/email, then clearly say that nothing was delivered or booked.
5. At 375 px and 1440 px, the page has no horizontal document overflow and all text controls remain reachable.
6. Escape closes dialogs and restores focus. Keyboard activation works without hover. Content remains visible with JavaScript disabled.
7. Readouts and synthetic actions must be marked as sample/demo content, not real financial, clinical, operational, or commercial claims.

## 6. Deliberate deviations

Alex Morgan and every project are fictional. No Cannes/D&AD/Awwwards claims are reproduced. Contact uses a local inquiry demonstration rather than a real personal email. Shader approximates molten fluid without a physical fluid simulation.

## 7. Documentation and testing

Create this site's README, adapted prompt, build log, and browser methodology. Link every decision to the source brief or explicitly identify it as an authored adaptation. Run structural validation, automated browser tests, accessibility scans, and desktop/mobile screenshots. Record actual outcomes, not assumed success. Do not describe tests or deployments as passing until they have run successfully.
