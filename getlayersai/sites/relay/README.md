# relay — Let the good work flow.

An independently implemented **automation design study**, based on the archived GetLayers brief. This is a functional static frontend, not a production service or pixel-identical replica.

- **Pages URL:** [https://knarayanareddy.github.io/WebsitedesignandPrompts/getlayersai/sites/relay/](https://knarayanareddy.github.io/WebsitedesignandPrompts/getlayersai/sites/relay/) (available after the deployment workflow succeeds)
- **Collection:** [https://knarayanareddy.github.io/WebsitedesignandPrompts/getlayersai/](https://knarayanareddy.github.io/WebsitedesignandPrompts/getlayersai/)
- **Browser-readable methodology:** [methodology.html](./methodology.html)
- **Source brief:** [../../10-RELAY-WORKFLOW-AUTOMATION.md](../../10-RELAY-WORKFLOW-AUTOMATION.md)
- **Catalog brief:** [../../templates/07-relay.md](../../templates/07-relay.md)
- **Rebuild prompt:** [ADAPTED_PROMPT.md](./ADAPTED_PROMPT.md)
- **Engineering log:** [BUILD_LOG.md](./BUILD_LOG.md)

## What was built

Let the good work flow. The page contains a bespoke hero, a domain-specific interactive experience, supporting narrative, and clearly labelled local inquiry flow. All copy and markup are rendered in `index.html`; the page does not depend on JavaScript to deliver its headings or explanatory content.

### Signature mechanism

A perspective CSS workflow window connects four semantic DOM nodes. A guarded async sequence lights each node in order, announces completion once, and re-enables the run button. A 10k–10M range meter computes the published linear event-price formula.

### Inspect these interactions

- Run the workflow twice and verify all four completion states.
- Set event volume to 10,000 and 10,000,000; expect $19 and $8,011.
- Check keyboard focus and mobile node labels.

## Folder and dependency map

| File | Responsibility |
| --- | --- |
| `index.html` | Semantic page, copy, controls, embedded safe scene configuration |
| `theme.css` | This site's tokens, unique layout, and responsive overrides |
| `methodology.html` | Human-readable methodology on GitHub Pages |
| `README.md` | Scope, running instructions, controls, and limitations |
| `ADAPTED_PROMPT.md` | Reproducible site-specific implementation brief |
| `BUILD_LOG.md` | Decisions, mechanism, validation contract, and deferred work |
| `../../shared/base.css` | Shared typography, structural primitives, accessibility |
| `../../shared/scenes.js` | Original procedural geometry/shaders and ASCII renderer |
| `../../shared/interactions.js` | Site-scoped controls and lifecycle management |
| `../../shared/vendor/` | Pinned local Three.js, fonts, and their licenses |
| `../../tools/catalog.py` | Editable source of this site's content and documentation data |

## Run locally

From the repository root:

```sh
python3 -m http.server 8080 --bind 0.0.0.0
# Visit http://localhost:8080/getlayersai/sites/relay/
```

Do not open the page via `file://`; local ES modules require HTTP. The whole `getlayersai` tree must be served, not just this folder, because the shared assets are deliberately deduplicated.

## Reproduce changes

Edit the `relay` record in `../../tools/catalog.py` and, if needed, its named section in `../../shared/scenes.js` or `interactions.js`. Then run:

```sh
cd getlayersai
python3 tools/build.py
python3 tools/verify.py
npm ci
npm test  # needs the local HTTP server above; defaults to port 8080
```

The generator is deterministic. Hand-edits to generated HTML, theme CSS, or the three documentation files will be replaced on the next build. Shared source files are not generated. `npm run assets` restores the pinned local vendor files from npm; normal viewing and Python generation need no npm install.

## Palette and type

- Background `#0c100b`; foreground `#f5f7ec`; accent `#c7f76d`; surface `#171f13`.
- Shared local fonts: Geist (UI), Syne (expressive display), Cormorant Garamond (editorial serif); licensed copies ship in `shared/vendor`.
- Breakpoints: 900 px intermediate, 680 px stacked/mobile. Page width: `min(1320px, 90%)`.

## Explicit adaptations and limitations

Native DOM/CSS light connections replace a continuous WebGL beam and blocking preloader. No actual Stripe, Slack, webhook, ledger, or billing integration. Motion does not obscure readability.

External reference images/video could not be inspected in this execution environment. This implementation follows the text briefs and uses original local procedural/CSS visuals. It is not evidence of visual parity with the reference site. Source claims, premium labels, and ownership statements in the archive have not been independently verified.

## Accessibility and privacy

Native anchors, buttons, labelled ranges, details/summary, and modal dialogs support keyboard use. The menu exposes `aria-expanded`; toggle groups expose `aria-pressed`. There is a skip link, visible focus, Escape-to-close dialogs, focus restoration, and polite result announcements. OS reduced-motion preference disables continuous rendering, with an explicit motion control in the footer. Offscreen and hidden-tab animations suspend. WebGL failure leaves a CSS visual fallback and all semantic content.

Inquiry submissions run only in memory, clear the input fields, and explicitly confirm **nothing was sent or saved**. There is no analytics, storage, service worker, authentication, payment, or backend endpoint. Never enter private information into a design demo.

## Verification

The actual recorded test results are in [../../VALIDATION.md](../../VALIDATION.md). Per-site browser coverage includes desktop, mobile overflow, console/network errors, the signature interactions above, reduced motion, keyboard dialog behavior, and an automated accessibility scan. Automated checks are not a certification; a manual screen-reader review remains recommended.
