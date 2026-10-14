# Soda fidelity reset — reference audit

Date: 2026-10-14  
Status: **Reference acquired and inspected. A dedicated v02 review preview is in `../../rebuilds/soda/`; no replacement has been approved or published.**

## Why the first implementation is being rejected

The user requested websites resembling the original GetLayers sites. The first implementation delivered a simplified interpretation instead. Passing interaction, layout-overflow, and automated accessibility checks did not establish visual fidelity. The existing pink Soda page must not be treated as a reference for the rebuild.

## Evidence available in this repository

### Catalog metadata: `../../all_templates.json`, entry `id: soda`

The entry describes a `hero` / `ecommerce` template. Its keyword sequence contains these concrete visual details:

- Single-screen, zero-sugar product experience.
- Can floats dead center inside an **emerald radial glow**.
- **Cursive “pure” and “refreshingly clean” headlines flank** the can.
- A swarm of **cherries and leaves** responds to the cursor.
- Frosted/chrome navigation and flavor cards frame the edges.
- Bubbles drift continuously.
- Selecting a card spins the can, cross-fades the background **green → blue**, and swaps fruit to **blueberries**.

These are catalog descriptions, **not measurements taken from a screenshot**. Exact wording, positions, dimensions, fonts, model details, and transition timing remain unverified.

### Deep-dive markdown: `../../03-SODA-3D-INTERACTIVE-HERO.md`

This document conflicts with the metadata above:

| Aspect | Catalog metadata | Deep-dive instructions |
| --- | --- | --- |
| Initial palette | Emerald radial glow | Berry-pink background and glow |
| Typography/composition | Cursive headlines flanking a centered can | Bold display wordmark behind can |
| Flavor transition | Green to blue; cherries to blueberries | Wild Berry, Yuzu Citrus, Mango Chili |
| Scope | Single-screen hero | Hero, flavor carousel, bundle builder, footer |

The standalone template markdown repeats the original metadata but then adds generic full-page sections. The JSON entry contains descriptive metadata and media URLs, not executable source code or a full original copy-prompt payload. The archive's provenance claims do not resolve these contradictions.

## External-reference check performed in this revision

- The public page at `https://www.getlayers.ai/layer/soda` was read using the page-retrieval tool. It confirms the title, descriptive sentence, and the reference image links.
- Direct retrieval of `https://storage.getlayers.ai/templates/soda.webp` from the workspace failed with an SSL connection error.
- The page-retrieval tool also failed to retrieve that image (HTTP 500 reported by the tool).
- Image search did not return a verified screenshot of this design. Unrelated search results are not design references and must not be used as substitutes.
- **At the initial audit, no original screenshot or video had been visually inspected.** The blocker has since been resolved as recorded below.

## Blocker resolved without a user upload

A branch-scoped remote capture job fetched the original public poster and MP4s, extracted JPEG frames with FFmpeg, and exposed SHA-verified image chunks through the GitHub checks API. The local retrieval script recovered all 13 images successfully. The original master is 1440 × 1026 and 7.433333 seconds.

Inspected master states: 0.00 / 1.34 s green can and cherries; 2.68 s blurred blue can during transition; 4.01 / 5.35 / 6.69 s blue world and blueberries. The original clip confirms the catalog's single-screen emerald/cursive direction. The earlier download-failure notes above are historical evidence, **not a current blocker**.

- Capture workflow: https://github.com/knarayanareddy/WebsitedesignandPrompts/actions/runs/38624787534
- Capture commit: `36ae0822c43116b003886592852c6992471b9cc0`
- Restore frames: `python3 getlayersai/tools/retrieve-reference.py 36ae0822c43116b003886592852c6992471b9cc0`
- Dedicated implementation and detailed notes: [Soda v02](../../rebuilds/soda/README.md)

## Reference requirements used for implementation

One original desktop screenshot is the minimum needed to establish composition. A short video covering idle motion, pointer interaction, and a flavor switch is strongly preferred. The original “Copy prompt” text is also useful for resolving the conflicting archived specifications.

User-accessible source links:

- Page: https://www.getlayers.ai/layer/soda
- Poster: https://storage.getlayers.ai/templates/soda.webp
- Preview video: https://storage.getlayers.ai/templates/soda-preview.mp4
- Full video: https://storage.getlayers.ai/templates/soda.mp4

A user-provided attachment should be retained as a reference for analysis, not embedded as the website or re-published without checking its permitted use.

## Rebuild contract

1. Annotate the actual reference: viewport, hierarchy, text, alignment, can silhouette/scale/angle, lighting, fruit distribution, chrome/glass treatment, and flavor states. Identify measured facts separately from estimates.
2. Resolve the conflicting briefs against the inspected original, with the user's requested fidelity as the goal.
3. Build a dedicated Soda implementation. Reuse infrastructure where useful, but not the shared page generator's layout, generic cards, or invented copy.
4. Reconstruct the hero first. Do not add commercial sections that are absent from the inspected reference.
5. Refine can geometry, label proportions and UV mapping, rim/pull-tab details, metal reflections, condensation, fruit geometry, shadows, and depth of field as visible in the reference.
6. Implement coordinated flavor transitions: camera/can rotation, label change, background interpolation, fruit swap, and UI state must feel like one transition rather than disconnected toggles.
7. Compare the original and rebuilt page at matched viewports and key motion states. Technical test success is a separate gate, never a proxy for this comparison.
8. Keep the revision in local preview/on the working branch. Do not merge or replace the published collection until the user has inspected the result.

## Acceptance gates

- **Reference gate:** original screenshot actually inspected; video behavior distinguished from assumed behavior.
- **Composition gate:** layout and typography match the reference's visual hierarchy, not the prior implementation.
- **Rendering gate:** the product reads as a convincing can rather than a simple primitive with a stretched label; fruit, lighting, and depth support it.
- **Motion gate:** idle, pointer, and flavor-change states are coherent and deliberately timed.
- **Responsive gate:** preserve hierarchy at mobile sizes without shrinking an entire desktop composition indiscriminately.
- **Usability gate:** accessible controls, focus, reduced motion, fallback, and functional state checks still pass.
- **User gate:** explicit visual approval before deployment or expansion to the remaining sites.
