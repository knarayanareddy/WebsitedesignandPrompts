# Rebuild contract — Soda v02

## Authority order

1. **Inspected reference video frames** from the GetLayers master MP4, captured at 1440 × 1026.
2. The original catalog metadata where consistent with those frames.
3. Archived prose only where it does not contradict the visible design.
4. Never use the rejected first implementation as a visual reference.

The reference—not the number of passing tests—sets the visual target. If an original element is unavailable or reconstructed, label that limitation explicitly.

## Composition, measured approximately from the desktop frames

Use a full-window single hero. Do not append generic feature grids, pricing ledgers, FAQs, or a bundle-builder section that do not appear in the clip.

| Element | Approximate placement at 1440 × 1026 |
| --- | --- |
| Brand | x 58, y 50; outlined plus circle + small script Soda |
| Navigation | Near horizontal center, y 34; about 460 × 51; frosted rounded pill |
| Contact | Right inset about 58; dark pill |
| Pure / Zero | Left inset about 58; starts near y 160; white Lobster-like script around 147 px |
| Supporting copy | Left inset about 58; near y 450; three relaxed lines |
| Shop Now | Below copy; dark pill with pink circular plus at its right |
| Can | Large central diagonal; top near 150, bottom near 920; rotated clockwise about 22° |
| Flavor cards | Top-right, roughly 17.7% down; two narrow glass cards; miniature cans rise above their edges |
| Refreshingly / Clean | Lower right, right aligned; same script scale; overlaps the product scene |
| Signature | Lower left, icon + two small text lines |

These measurements are working targets, not claims of exact recovery of the original CSS. Keep screenshot viewports identical for visual inspection.

## Color and material language

- Initial world: emerald center glow, deep green near the outer frame, almost-black corners.
- Alternate world: midnight navy, blue center glow, same structural chrome.
- Typography: ivory-white display, softly desaturated green-white body, pale pink active navigation and plus controls.
- Can: convincingly metallic, not a matte toy. Bare aluminum top and lower skirt; slim rolled rims, inset lid, pull-tab; printed green/blue sidewall with reconstructed reference label.
- Fruit: glossy, subtly irregular cherries with curved stems; dusty/mottled blue berries with a small natural crown. Avoid identical featureless spheres or repeating sine stripes.
- Leaves: curved thin geometry, visible but restrained veins, irregular orientation.
- Bubbles: faint ring/specular shapes at varied scales. They support depth rather than becoming confetti.

## Typography

Use the local Lobster font for the two large script blocks and the small Soda wordmark. Use restrained local Geist for navigation and product labels. Preserve the original visible text: “Pure Zero”, “Refreshingly Clean”, “Diet Classic”, “Zero Lime”, and the zero-sugar supporting paragraph.

Do not replace the script with a wide sans-serif wordmark. Do not move the product to a small half-width card.

## Scene construction

Use a dedicated Three.js renderer served locally. A lathed can profile needs genuinely shaped shoulders/base, correct vertical UV coordinates, and separate printed/unprinted material groups. Group indices into contiguous material ranges to avoid hundreds of unnecessary draw calls.

Create a canvas texture with the observed silver/red/green emblem, script Guaraná lettering, upper “Original do Brasil” line, 350 ml marking, and smaller label details. Record that these are reconstructed artwork—not original source assets. Use a high-dynamic-range procedural studio environment for elongated specular reflections.

Generate the two product-card thumbnails from the same geometry and lighting; do not crop the source video and pass it off as the recreated model. Retain a local authored static SVG fallback if WebGL is unavailable.

## Motion sequence

Observed sequence:

1. Green can, cherries, emerald environment; subtle pointer-responsive product rotation.
2. Blue flavor selected.
3. Can rotates rapidly and briefly blurs; label changes during rotation while the backdrop transitions.
4. Blue world and larger blueberries settle into view.
5. Pointer interaction continues; UI retains position.

Implement one animation scheduler and a small pointer spring. Flavor changes must coordinate camera/can rotation, label change, fruit swap, background color, and pressed state. Direct selection must still work in reduced-motion mode, but settle immediately instead of spinning. Pause automatically when hidden/offscreen. The product must remain inspectable with motion paused.

## Interaction rules

- Product cards and previous/next arrows both change flavor.
- The same selected state drives scene, accessible status, selected border, and local shop details.
- Shop Now opens a compact local quantity demo; totals update correctly; no real checkout.
- Contact validates sample inputs and explicitly confirms nothing was sent/stored.
- Navigation buttons for unseen source sections may open clearly labelled explanatory sheets. Do not invent reviews, ingredients, credentials, or unseen original pages.
- The original award line must not become a false accolade claim; use an equivalent-size design-study signature instead.

## Review gates

1. Inspect original green, spin, and blue frames before code changes.
2. Capture this page at 1440 × 1026 and compare hierarchy, anchors, can silhouette, lighting, and fruit distribution.
3. Fix visible mismatches before broad interaction testing. Tests cannot approve design quality.
4. Test mobile at 375/390/430 px, tablet at 768 px, keyboard focus, dialogs, reduced motion, no-JS, WebGL failure, and no runtime external requests.
5. Keep the implementation under `getlayersai/rebuilds/soda/`, outside publication assembly, until the user approves it.
6. Only then discuss replacing the first Soda and applying the reference-led approach to another site.
