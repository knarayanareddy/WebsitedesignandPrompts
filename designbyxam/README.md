# DesignByXam — Photographic Editorial Portfolio: Process and Prompt Kit

A detailed, evidence-backed guide to creating a portfolio in the visual and interaction family of [Samuel Idowu / designbyxam](https://samuelidowu.com/): oversized editorial typography, real photographic cut-outs and cast shadows, a scrolling work column, poster archives, responsive page navigation, tactile service effects, and optional **actual Three.js object viewers**.

Reference video: [the supplied X post](https://x.com/designbyxam/status/2107519830521720984/video/1). Documentation structure follows this repository's [Apogee kit](../apogee/README.md): an adapted build prompt, an implementation/build record, and a navigable overview, expanded here into a full process and validation manual.

> **Now includes the requested live rendition:** [GitHub Pages demo](https://knarayanareddy.github.io/WebsitedesignandPrompts/designbyxam/#about). The deployable original front end is in [`site/`](site/), alongside this exhaustive process/prompt kit. See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting, verification and provenance. Original work remains Samuel Idowu's; the repository license does not grant third-party asset rights.

## Run the rendition

```bash
npm ci --include=dev
npm run build
npm test
npm run dev
```

Local preview mirrors the Pages subpath: `http://127.0.0.1:4174/WebsitedesignandPrompts/designbyxam/#about`. If Chromium is absent, run `npx --no-install playwright install chromium` after dependency installation. The shared repository deploy script publishes only `site/`, not the documentation or test/dependency files.

## Read in this order

| Document | Purpose |
|---|---|
| [PROCESS.md](PROCESS.md) | End-to-end workflow: scope, source discovery, evidence, asset preparation, specification, implementation, comparison, delivery and publication |
| [ADAPTED_PROMPT.md](ADAPTED_PROMPT.md) | Copy-ready master prompt and staged prompts for a fresh implementation or a separately authorized unchanged local copy |
| [TECHNICAL_GUIDE.md](TECHNICAL_GUIDE.md) | Deep mechanics: photographic layering, typography, viewport coordinates, scroll/hover state, filters, galleries and WebGL |
| [VALIDATION.md](VALIDATION.md) | Asset/hash/visual/behavioral checks; readiness, real input, test isolation and limitations |
| [BUILD_LOG.md](BUILD_LOG.md) | What actually happened, why the first prototype failed visually, the correction, measured results and preserved source quirks |
| [ASSETS_AND_RIGHTS.md](ASSETS_AND_RIGHTS.md) | Photo/shadow preparation, provenance, local-use versus publication boundaries, and the public-folder inclusion policy |
| [references/SOURCES.md](references/SOURCES.md) | Reference URLs, evidence classification and primary technical documentation |

## The result this case study actually established

The successful final experiment was a **private, unchanged copy of the current published front end**, after the user rejected an independently authored approximation with SVG character/shadow substitutes.

- **182 acquired files:** original source/local/build path sets and SHA-256 hashes matched.
- **18 Chromium checks passed:** no skipped, failed or flaky cases in the recorded final run; zero retries.
- **Three matched screenshot pairs were byte-identical:** About desktop at 1280×800, About mobile at 390×844, and Projects desktop at 1280×800; DPR 1 and matching reduced-motion settings.
- Original WebGL Bible, headphones and laptop viewers rendered and responded to real pointer dragging.
- Original gallery keyboard double-step behavior was measured on both reference and local copy and retained, not repaired.

Those are specific recorded results, **not a promise that an independently generated new site will automatically be pixel-identical, award-winning, accessible, production-ready or identical at every animation time**. The original video did not decode in the inspection browser, so historical-video timing/audio equivalence was not established. See [BUILD_LOG.md](BUILD_LOG.md) and [evidence/case-results.json](evidence/case-results.json).

## Choose the right lane

1. **Build a new site with this design language:** independently implement the layout and behaviors with owned/licensed photography, shadows, content and models. Follow the master prompt's fresh-build lane. Treat numerical observations as calibration targets, not permission to use another person's identity or artwork.
2. **Reproduce an authorized reference exactly:** obtain the permitted source/assets or an allowed local snapshot; preserve bytes/paths and original quirks; keep infrastructure outside the front end. This was the final lane in the recorded experiment.
3. **Analyze an inaccessible reference:** use black-box observations and explicit unknowns. Do not call cartoons or fabricated geometry a faithful photographic replica. Resolve missing core assets with the user before declaring visual completion.

## Original helper tools in this folder

These operate **offline** on local, supplied files. They do not fetch the author's website, bypass login, read browser credentials, submit forms or upload assets.

```bash
# Run deterministic fixture tests and package/document checks.
python3 tools/test_tools.py
python3 tools/validate_docs.py

# Inventory a saved HTML page plus optional saved public configuration.
python3 tools/inventory.py path/to/page.html --origin https://example.com/ \
  --json path/to/public-config.json --derive-mp4-posters

# Print a path/byte/SHA-256 manifest for an explicitly chosen local tree.
python3 tools/verify_tree.py manifest path/to/source

# Compare two local trees, including both path sets and byte hashes.
python3 tools/verify_tree.py compare path/to/source path/to/build

# Exact PNG-file comparison; unequal files exit nonzero.
python3 tools/compare_png.py path/to/reference.png path/to/local.png
```

Python 3.9+; standard library only. Asset inventory is a discovery aid, not an authorization or an exhaustive JavaScript interpreter. PNG-file equality is a strong positive when true; inequality does not tell you the cause or a perceptual similarity score. All counts and equality claims must be computed, not eyeballed.

## Templates

- [Reconstruction contract](templates/reconstruction-contract.example.json): lane, assets, allowed changes, viewports, state table and completion gates.
- [Asset manifest](templates/asset-manifest.example.json): local paths, provenance, source role, hash and acquisition/reuse status.
- [Acceptance matrix](templates/acceptance-matrix.md): requirement-to-evidence mapping.

Do not run a new site's acquisition or publishing step merely because a prompt mentions it. Rights, origin, writable paths, outbound actions and intended release are explicit inputs to the contract.

## Public-repository boundary

The initial publication contained documentation only. The follow-up explicitly requested a github.io rendition, so `site/` now contains the original front end and linked imagery/vendor files, with original attribution retained. No ownership or additional license is asserted. Credentials, cookies, signed URLs, dependency/build caches and test screenshots remain excluded. The deployment integration is documented in [DEPLOYMENT.md](DEPLOYMENT.md); original historical case evidence is kept distinct from the new Pages validation.
