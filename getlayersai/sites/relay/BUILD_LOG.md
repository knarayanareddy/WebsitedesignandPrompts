# Build log — relay

## Date and provenance

Implementation date: **2026-10-14**. Source archive: [`10-RELAY-WORKFLOW-AUTOMATION.md`](../../10-RELAY-WORKFLOW-AUTOMATION.md). The source contains prompt instructions and links to externally hosted previews; those previews were not retrievable in this environment. This work is a text-brief adaptation with original visuals, not a reverse-engineered copy of the reference implementation.

## 1. Extract the brief

- Domain: Automation.
- Narrative: Let the good work flow.
- Primary color constraint: `#c7f76d` against `#0c100b`.
- The source requests a single self-contained HTML file but also asks for remote libraries. We instead use independent static HTML entries with deduplicated, local assets. This makes the whole collection resilient to CDN failure and keeps 13 copies of Three.js out of the repository.

## 2. Make the visual system concrete

Start with the palette and the signature motif, then give the hero its own compositional hierarchy. Keep body UI predictable, but avoid treating the 13 pages as color variants of one layout. Hero alignment, display type, geometry, corner language, and editorial density are specific to this study. Content has no artificial preloader and is never hidden behind a successful animation callback.

## 3. Implement the visual mechanism

A perspective CSS workflow window connects four semantic DOM nodes. A guarded async sequence lights each node in order, announces completion once, and re-enables the run button. A 10k–10M range meter computes the published linear event-price formula.

Rendering is local and deterministic except elapsed animation time and the genuine local clock where used. Geometric random distributions use a seeded generator. Geometry/materials are disposed on page exit. ResizeObserver updates the drawing buffer and camera aspect, while IntersectionObserver suspends offscreen scheduling. Pointer and scroll update small state values rather than rebuilding DOM content.

## 4. Implement meaningful controls

- Run the workflow twice and verify all four completion states.
- Set event volume to 10,000 and 10,000,000; expect $19 and $8,011.
- Check keyboard focus and mobile node labels.


Shared inquiry forms are explicitly simulations. Case-study dialogs contain a brief, an approach, and a concept outcome rather than a generic empty popup. Native form validity handles required fields and email shape. No real personal data needs to be entered.

## 5. Resolve conflicts and document omissions

Native DOM/CSS light connections replace a continuous WebGL beam and blocking preloader. No actual Stripe, Slack, webhook, ledger, or billing integration. Motion does not obscure readability.

Cross-cutting substitutions: native scroll instead of Lenis; no scroll hijacking; no blocking loaders; local fonts instead of third-party requests; a DPR cap of 1.6 instead of 2 for a lower rendering budget; reusable files instead of a monolithic source string. No paid service, commercial asset license, or ownership of the reference brands is assumed.

## 6. Accessibility and failure paths

- Semantic content and local CSS load independently of WebGL.
- A CSS fallback appears if the renderer fails or loses context; the source scene is decorative, not the sole location of essential facts.
- Runtime reduced-motion changes update the motion state. Direct control changes still render a frame.
- Native dialog focus trapping, Escape handling, opener focus restoration, explicit labels, grouped pressed states, and polite output announcements.
- Clipboard denial gives honest manual-copy guidance rather than a false success message.
- Network-independent rendering: no remote API, tracking pixel, remote image, or CDN script.

## 7. Verify, inspect, publish

Run `python3 tools/verify.py`, then `npm test` against a local server. The browser suite records screenshots for desktop/mobile and covers sample inquiry, menu, errors, and site-specific controls. It also tests reduced-motion, no-JavaScript content, WebGL-disabled fallback, and automated WCAG checks. Actual counts and limitations belong in [VALIDATION.md](../../VALIDATION.md), not invented build claims.

The root assembly script copies `getlayersai/` as a static collection, excludes development folders, and runs the new structural validator. The existing PR workflow builds all existing apps too. Publication uses the repository's existing `main` → Pages workflow after an approved PR merge, so existing sites remain in the assembled tree.

## 8. Future work, intentionally not implied as complete

A manual screen-reader audit, real-device GPU profiling, licensing review of any future reference assets, pixel comparison against accessible reference media, and production backend work remain separate tasks. Additional archived templates (41 beyond this agreed featured set) are not built in this batch.
