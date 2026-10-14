# Validation record — GetLayers featured studies

**Date:** 2026-10-14. Results are recorded from actual runs, not inferred from source inspection.

## Browser suite

Command: `UPDATE_PREVIEWS=1 npm test` in `getlayersai/`, with the repository served over HTTP on port 8080.

- **302 assertions passed**, zero failed site/check groups.
- All **13 sites** passed; the **collection gallery** passed.
- Headless Chromium 138, Playwright 1.56.1; local SwiftShader WebGL, not a physical GPU.
- Desktop **1440 × 1080**, mobile **375 × 812**, tablet **768 × 1024** checked for document overflow.
- No uncaught page errors, failing HTTP responses, or external runtime requests during the site tests.
- **Zero axe-core violations** under WCAG 2 A/AA and WCAG 2.1 AA rules for the default page states of all 13 sites and gallery. This is an automated result, not a blanket accessibility certification.
- Verified each site's domain-specific controls: sample consoles, pricing calculators, flavor/bundle controls, telemetry, project dialogs, biomarker explorer, code tabs, workflow runner, light/material/orbit controls, court selection, and region explorer.
- Tested inquiry modal open/close, Escape, restored focus, native form validity, and explicit local-only confirmation.
- Tested mobile menu state and Escape, initial reduced-motion state, no-JavaScript semantic content on all sites, and explicit WebGL-disabled fallback on Vesper.
- Actual desktop and mobile screenshots generated for every site. Optimized desktop previews are checked in under `previews/`; full diagnostic captures stay in ignored `.cache/screenshots/` and CI artifacts.

### Bugs found and corrected during validation

1. Soda's wide display type overflowed on desktop/mobile: resized within the intended composition rather than hiding document overflow.
2. Vesper and AI Studio oversized mobile canvas containers overflowed: constrained the scene container to the mobile content width.
3. Kimi's closing display heading overflowed on narrow screens: applied a site-specific mobile size.
4. Reduced-motion scenes cleared after resizing: redraw once after renderer resize, without enabling continuous motion.
5. Gallery small labels did not meet AA contrast: darkened the paper-surface label colors.
6. The soda can's lathe UVs stretched its label: moved the label to a correctly mapped cylindrical shell.
7. A newly added screenshot-conversion dependency had advisories: upgraded Sharp to a patched pinned version; the collection's npm audit then reported zero vulnerabilities.

## Structural and integration validation

The scoped validator checks 13 complete documentation folders, 27 HTML documents, local links and anchors, local font/module references, and real gallery previews. The full repository build uses its existing app build and assembled-site verification before publishing.

Commands:

```sh
python3 getlayersai/tools/verify.py
bash scripts/build-site.sh
npm audit --prefix getlayersai --audit-level=high
```

Full-build and publication outcomes are appended below after those processes finish.

## Reproducibility

- `getlayersai/.cache/browser-report.json` is the machine-readable browser report.
- The GitHub workflow uploads browser reports and screenshots as `getlayers-browser-evidence` for seven days.
- `python3 getlayersai/tools/build.py` regenerates checked-in HTML/docs deterministically; CI fails if they drift from the authoring source.
- `BASE_URL` supports testing the same collection under a prefixed assembled path.

## Remaining manual validation

Manual screen-reader navigation, multiple real devices/GPUs, Safari/Firefox coverage, long-session memory profiling, and exact visual comparison against the original reference media remain unperformed. Automated scans cover default states, not a certification of every possible interactive state. Health, financial, network, and racing readouts are simulations; they are not validated scientific or service data.


## Completed full-repository build

`bash scripts/build-site.sh` completed successfully:

- All **11 pre-existing Vite applications** installed and built.
- All **13 pre-existing static entries** remained included, plus the new GetLayers collection.
- Final assembled output: **2,013 files**, approximately **356 MB** (mostly existing repository assets).
- New collection contribution: approximately **2.8 MB**, including archived source briefs, local fonts/Three.js, 13 actual previews, websites, and documentation.
- `verify-site.mjs`: **OK**, no development entry points and all checked asset references resolved.
- Existing DesignByXam verification: **186 rendition files**, all hashes matched, Unicode references matched Git.
- GetLayers source and assembled validators: **13 sites, 27 HTML documents, 385 local references**, no missing targets, fragment errors, or runtime CDN dependencies.
- An additional **36 assertions** passed against the assembled `/_site/getlayersai` path for Laocoon and Ascend, including their reduced-motion-compatible controls.
- `git diff --check` passed.

### Dependency audit scope

`npm audit --prefix getlayersai --audit-level=high` reported **zero vulnerabilities**. The 11 older app trees were also audited; several have pre-existing high/moderate development dependency advisories. Their counts and follow-up recommendation are documented in [REVIEW.md](./REVIEW.md). Those unrelated dependency trees were not silently upgraded.
