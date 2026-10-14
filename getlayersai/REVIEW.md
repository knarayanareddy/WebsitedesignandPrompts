# Repository review and GetLayers build plan

**Review date:** 2026-10-14  
**Starting revision:** `2d0370ae3e1d3e841a45a09ff4c05bfc6345026d`  
**Scope agreed with the user:** the **13 featured deep-dive websites**, not all 54 catalog entries. Publish via a pull request and merge after validation.

## Executive assessment

The repository is already a mixed static/Vite website showcase with a working project-level GitHub Pages pipeline. The safest extension is **one static collection with 13 independently addressable sites**, not 13 new repositories, a replacement root application, or an unrelated hosting service.

The existing `apogee` folder supplies the documentation convention: `README.md` for use and scope, `ADAPTED_PROMPT.md` for reproduction, and `BUILD_LOG.md` for implementation decisions. Every new site follows that convention and adds `methodology.html` so its notes can be inspected alongside the live site.

## What was inspected

- Repository root, current branch/status, top-level README, existing review documents, and showcase entry point.
- `getlayersai/README.md`, catalog inventory, standalone briefs, and all 13 deep-dive prompt documents (02–14).
- `apogee/README.md`, `ADAPTED_PROMPT.md`, `BUILD_LOG.md`, folder structure, and build configuration pattern.
- `.github/workflows/deploy.yml`, `scripts/build-site.sh`, `scripts/verify-site.mjs`, media checker conventions, and `.gitignore`.
- GitHub Pages API configuration and recent workflow results: Pages uses the **`gh-pages` branch**, generated from `main`, under `https://knarayanareddy.github.io/WebsitedesignandPrompts/`.

This is an integration-focused review, **not** a line-by-line security audit of every pre-existing application. Actual new-site tests and full build outcomes are recorded separately in [VALIDATION.md](./VALIDATION.md).

## Findings, with evidence and disposition

| Priority | Finding | Evidence | Disposition |
| --- | --- | --- | --- |
| High | Static sources and built Vite output must not be confused. Publishing `/src/main.tsx` entries to Pages creates blank sites. | Existing comments and guards in `scripts/build-site.sh` and `verify-site.mjs`. | Retain the complete existing build pipeline. New sites are genuinely static and are published through an explicit assembly step. |
| High | Reference media is a runtime availability and licensing risk. | Every featured prompt points to `storage.getlayers.ai` images/videos; that host is outside this environment's network allowlist. The archive labels many entries Premium. | No downloaded commercial models, hot-linked media, or inferred asset license. Build original local procedural visuals and disclose that reference screenshots were not visually inspected. |
| High | The briefs mix design fiction with real-seeming medical, financial, racing, and infrastructure readouts. | Dantora biomarker percentiles/physician credentials; Stride financial services; Kimi telemetry/standings; Ascend region counts/latency. | Explicit sample labels, fictional/no-service notices, no real credentials or endorsements, no transaction or medical claims. Local forms explicitly confirm nothing was sent. |
| Medium | The requested technology is internally inconsistent. | Deep-dive prompts demand one self-contained HTML file but also remote import-map libraries; metadata mentions Next.js/React/Three.js. | Prefer static semantic HTML and deduplicated local CSS/ES modules. No Next server or third-party runtime imports. Record the adaptation rather than claiming literal compliance. |
| Medium | Tone descriptions conflict with concrete tokens. | Stride/Lumora metadata says light while their supplied background tokens are dark. Dantora describes light clinical styling alongside green particle effects. | Follow concrete dark palettes for Stride/Lumora; use a coherent light clinical palette for Dantora. Capture each choice in the individual build log. |
| Medium | Existing review counts are historical, not current inventory. | `REPO_REVIEW.md` is dated 2026-09-30 and describes eight demo sites; current assembly lists eleven Vite apps and thirteen static entries before this addition. | Preserve the historical review; append a scoped current review and a new collection entry in the root README/showcase rather than silently rewriting historical claims. |
| Medium | A 54-item archive is not the same as 54 built websites. | `getlayersai/templates/` and the full-catalog JSON contain 54 briefs, while documents 02–14 cover 13 featured subjects. | Ask for scope; build the agreed 13. Gallery and docs state that 41 additional briefs remain unbuilt. |
| Medium | Adding `getlayersai` via naive recursive copy would publish test tooling and dependencies. | New development tools require npm, and the archive includes authoring sources. | Explicitly publish only HTML, site folders, shared runtime assets, previews, documentation, and source brief markdown. No `node_modules`, `.cache`, tests, or authoring tools. |
| Medium | Existing site verification does not deeply validate all nested relative links and fragment targets. | `verify-site.mjs` focuses on dev entries and selected asset URL patterns. | Add a scoped HTML parser validator for all 27 new HTML documents, their local links, fragments, fonts, modules, previews, and per-site documentation. |
| Medium | Motion-heavy briefs need an explicit accessibility and failure strategy. | Continuous shaders, huge point clouds, custom cursors, scroll hijacking, and blocking preloaders are common in the source. | Native scroll, no blocking preloaders, normal cursor, reduced-motion support, explicit pause, offscreen/hidden-tab suspension, semantic content, and WebGL fallback. |
| Low | Duplicating a complete dependency tree per site would add maintenance cost. | Thirteen related static sites share primitives and rendering lifecycle needs. | One local Three.js copy and font set; site-specific content, layout, geometry, and controls. Each site remains an independent URL with its own documentation. |

## Implementation layout

```text
getlayersai/
  index.html                 searchable collection
  sites.json                 explicit 13-site manifest
  sites/<slug>/
    index.html               independent site
    theme.css                specific tokens and layout
    methodology.html         live build notes
    README.md
    ADAPTED_PROMPT.md
    BUILD_LOG.md
  shared/
    base.css                 shared accessible UI primitives
    scenes.js                procedural Three.js / GLSL / ASCII scenes
    interactions.js          domain-specific control behavior
    gallery.css / gallery.js
    vendor/                  pinned Three.js, fonts, licenses
  previews/                  actual rendered website screenshots
  tools/                     deterministic generator and static verifier
  tests/                     Playwright / axe integration suite
  REVIEW.md                  this review
  IMPLEMENTATION.md          cross-site methodology and provenance
  VALIDATION.md              recorded outcomes and remaining work
```

## Publication strategy

1. Leave existing sites and the root showcase intact; add a collection entry.
2. Build the 13 sites and verify local interactions, mobile layout, reduced motion, and accessibility.
3. Assemble the full existing project and validate every published entry, including the new collection.
4. Push only the session branch and create a PR into `main`.
5. Wait for the full build and new browser/accessibility checks to pass.
6. Merge the explicit PR number using GitHub's PR operation, as authorized by the user.
7. Allow the existing workflow to generate `gh-pages`. No manual push or branch switch to `main` or `gh-pages` is needed.
8. Confirm the deployment workflow and Pages build complete; distinguish deployment confirmation from live HTTP inspection if the environment cannot reach `github.io`.

## Remaining boundaries

This work does not implement the other 41 catalog prompts, the separate shader library as standalone demos, real AI/banking/medical/commerce APIs, authentication, checkout, production analytics, asset-rights clearance for external reference media, or exact visual comparison against inaccessible references. Those should be separate, explicitly scoped follow-ups.


## Dependency audit follow-up from the full build

The full build succeeded, but `npm audit --json` on the **11 existing app dependency trees** reported pre-existing advisories. This is a package-level report, not an exploitability assessment; it includes development tooling and transitive dependency chains. No unrelated lockfile was changed as part of this collection build.

| Existing app | High | Moderate | Critical |
| --- | ---: | ---: | ---: |
| `aetherascrollstory` | 6 | 2 | 0 |
| `apogee` | 6 | 2 | 0 |
| `measured` | 1 | 0 | 0 |
| `portfolio` | 6 | 2 | 0 |
| `synapsex` | 6 | 2 | 0 |
| `jack` | 6 | 2 | 0 |
| `videoembeddeddesign/securify` | 1 | 0 | 0 |
| `brunosimon` | 4 | 1 | 0 |
| `senbuzy` | 1 | 1 | 0 |
| `portfolio-console` | 6 | 3 | 0 |
| `guillaumecolombel` | 0 | 0 | 0 |

Repeated flagged chains include Tailwind/glob/watch tooling (`braces`, `micromatch`, `chokidar`, `fast-glob`), `source-map-js`, and some Vite versions. Prioritize a separate dependency-upgrade PR with each app's build and visual regression checks. Do not expose these development servers publicly as production services. The **new GetLayers toolchain reports zero npm vulnerabilities** at the time of this run; its published frontend loads no npm service or development server.
