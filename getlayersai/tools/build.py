#!/usr/bin/env python3
"""Deterministic static assembly. Run from any directory. No network or credentials."""
import sys, json, re
from pathlib import Path
from html import escape
from catalog import SITES

ROOT=Path(__file__).resolve().parents[1]
BASE='https://knarayanareddy.github.io/WebsitedesignandPrompts/getlayersai'
REPO='https://github.com/knarayanareddy/WebsitedesignandPrompts'

DIALOGS='''<dialog id="inquiry" aria-labelledby="inquiry-title"><button class="dialog-close" data-close aria-label="Close inquiry">×</button><div class="eyebrow">LOCAL DEMONSTRATION</div><h2 id="inquiry-title">Start a conversation</h2><p class="form-note">This is a design study. Nothing is sent, saved, booked, or purchased. Use sample details only.</p><form id="inquiry-form"><label for="name">Name</label><input id="name" name="name" required maxlength="80" autocomplete="off" placeholder="Sample name"><label for="email">Email</label><input id="email" name="email" type="email" required maxlength="160" autocomplete="off" placeholder="you@example.com"><label for="message">What are you exploring?</label><textarea id="message" name="message" rows="3" maxlength="1000" placeholder="Your sample brief"></textarea><button class="btn" type="submit">Complete local demo ↗</button></form><p id="inquiry-feedback" role="status" tabindex="-1"></p></dialog>
<dialog id="case-dialog" aria-labelledby="case-title"><button class="dialog-close" data-close aria-label="Close case study">×</button><div class="eyebrow">FICTIONAL CASE STUDY</div><h2 id="case-title">Case study</h2><h3>The brief</h3><p id="case-brief"></p><h3>The approach</h3><p id="case-approach"></p><h3>The concept outcome</h3><p id="case-outcome"></p><p class="form-note">An original design exercise. No real client relationship or commercial outcome is claimed.</p></dialog><div class="toast" id="toast" role="status"></div>'''

def write(p,s):
    p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s,encoding='utf-8')

for s in SITES:
    slug=s['slug'];folder=ROOT/'sites'/slug
    prompt=next(ROOT.glob(f"{s['number']:02d}-*.md")).name
    standalone=next(ROOT.glob(f'templates/*-{slug}.md')).name
    bg,fg,accent,surface=s['colors']
    config=json.dumps(dict(slug=slug,accent=accent,bg=bg))
    nav_names={'soda':['Flavors','Build a bundle'],'kimi':['Telemetry','The system'],'ai-studio':['Work','Process'],'creative-director':['Work','Thinking'],'dantora':['Markers','Our approach'],'clarix':['Terminal','The stack'],'lumora':['Work','Practice'],'laocoon':['Exhibition','On the work'],'baseline':['The courts','Academy'],'ascend':['Network','Developers'],'relay':['How it works','Pricing']}.get(slug,['Experience','The details'])
    html=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="{escape(s['blurb'])} An independent, interactive GetLayers prompt study."><meta name="theme-color" content="{bg}"><title>{s['name']} — GetLayers Studies</title><link rel="icon" href="../../shared/favicon.svg"><link rel="stylesheet" href="../../shared/base.css"><link rel="stylesheet" href="./theme.css"></head>
<body><a class="skip" href="#main">Skip to content</a><div class="wrap"><header class="topbar"><a class="brand" href="./" aria-label="{s['name']} home"><i aria-hidden="true">✳</i>{s['name']}</a><a class="back" href="../../">← The collection</a><button class="nav-toggle" aria-expanded="false" aria-controls="navigation">Menu +</button><nav class="nav-links" id="navigation" aria-label="Main navigation"><a href="#experience">{nav_names[0]}</a><a href="#details">{nav_names[1]}</a><a href="./methodology.html">Build notes</a><button class="btn small" data-inquiry>{'Get in touch' if s['category'] in ['Studio','Portfolio','Exhibition'] else 'Explore the demo'} ↗</button></nav></header>
<main id="main">{s['body']}</main><footer class="footer"><span>© 2026 {s['name']} · Independent design study</span><div class="study-tools"><a href="../../">All 13 studies ↗</a><a href="./methodology.html">Methodology ↗</a><a href="{REPO}/tree/main/getlayersai/sites/{slug}">Source ↗</a><button class="motion" data-motion aria-pressed="false">Pause motion</button></div><p class="disclaimer">Inspired by the archived GetLayers brief. Original implementation, not an exact replica or official service. All product metrics, projects, and commercial offers are illustrative. No tracking, checkout, or backend.</p></footer></div>{DIALOGS}<noscript><div class="toast">JavaScript is off. Content remains available; 3D scenes, forms, and interactive controls require JavaScript.</div></noscript><script id="site-config" type="application/json">{config}</script><script type="module" src="../../shared/interactions.js"></script></body></html>'''
    write(folder/'index.html',html)
    write(folder/'theme.css',f':root{{--bg:{bg};--fg:{fg};--accent:{accent};--surface:{surface}}}\n'+s['css']+'\n')
    readme=f'''# {s['name']} — {s['blurb']}

An independently implemented **{s['category'].lower()} design study**, based on the archived GetLayers brief. This is a functional static frontend, not a production service or pixel-identical replica.

- **Pages URL:** [{BASE}/sites/{slug}/]({BASE}/sites/{slug}/) (available after the deployment workflow succeeds)
- **Collection:** [{BASE}/]({BASE}/)
- **Browser-readable methodology:** [methodology.html](./methodology.html)
- **Source brief:** [../../{prompt}](../../{prompt})
- **Catalog brief:** [../../templates/{standalone}](../../templates/{standalone})
- **Rebuild prompt:** [ADAPTED_PROMPT.md](./ADAPTED_PROMPT.md)
- **Engineering log:** [BUILD_LOG.md](./BUILD_LOG.md)

## What was built

{s['blurb']} The page contains a bespoke hero, a domain-specific interactive experience, supporting narrative, and clearly labelled local inquiry flow. All copy and markup are rendered in `index.html`; the page does not depend on JavaScript to deliver its headings or explanatory content.

### Signature mechanism

{s['mechanic']}

### Inspect these interactions

'''+''.join(f'- {c}.\n' for c in s['checks'])+f'''
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
# Visit http://localhost:8080/getlayersai/sites/{slug}/
```

Do not open the page via `file://`; local ES modules require HTTP. The whole `getlayersai` tree must be served, not just this folder, because the shared assets are deliberately deduplicated.

## Reproduce changes

Edit the `{slug}` record in `../../tools/catalog.py` and, if needed, its named section in `../../shared/scenes.js` or `interactions.js`. Then run:

```sh
cd getlayersai
python3 tools/build.py
python3 tools/verify.py
npm ci
npm test  # needs the local HTTP server above; defaults to port 8080
```

The generator is deterministic. Hand-edits to generated HTML, theme CSS, or the three documentation files will be replaced on the next build. Shared source files are not generated. `npm run assets` restores the pinned local vendor files from npm; normal viewing and Python generation need no npm install.

## Palette and type

- Background `{bg}`; foreground `{fg}`; accent `{accent}`; surface `{surface}`.
- Shared local fonts: Geist (UI), Syne (expressive display), Cormorant Garamond (editorial serif); licensed copies ship in `shared/vendor`.
- Breakpoints: 900 px intermediate, 680 px stacked/mobile. Page width: `min(1320px, 90%)`.

## Explicit adaptations and limitations

{s['deviations']}

External reference images/video could not be inspected in this execution environment. This implementation follows the text briefs and uses original local procedural/CSS visuals. It is not evidence of visual parity with the reference site. Source claims, premium labels, and ownership statements in the archive have not been independently verified.

## Accessibility and privacy

Native anchors, buttons, labelled ranges, details/summary, and modal dialogs support keyboard use. The menu exposes `aria-expanded`; toggle groups expose `aria-pressed`. There is a skip link, visible focus, Escape-to-close dialogs, focus restoration, and polite result announcements. OS reduced-motion preference disables continuous rendering, with an explicit motion control in the footer. Offscreen and hidden-tab animations suspend. WebGL failure leaves a CSS visual fallback and all semantic content.

Inquiry submissions run only in memory, clear the input fields, and explicitly confirm **nothing was sent or saved**. There is no analytics, storage, service worker, authentication, payment, or backend endpoint. Never enter private information into a design demo.

## Verification

The actual recorded test results are in [../../VALIDATION.md](../../VALIDATION.md). Per-site browser coverage includes desktop, mobile overflow, console/network errors, the signature interactions above, reduced motion, keyboard dialog behavior, and an automated accessibility scan. Automated checks are not a certification; a manual screen-reader review remains recommended.
'''
    adapted=f'''# Adapted prompt — {s['name']}

## 1. Source and intended fidelity

Read [the detailed source brief](../../{prompt}) and [the catalog entry](../../templates/{standalone}). Build an original, production-shaped static **design demonstration**, not an impersonation of an operating business. Preserve the visual narrative: **{s['blurb']}**. Do not claim an exact recreation when the remote references have not been visually inspected.

## 2. Deliverables and architecture

Create semantic `index.html`, a site-specific `theme.css`, and use the collection's local shared modules. Keep the HTML content available before JavaScript. Store authoring data in `tools/catalog.py`; regenerate with `python3 tools/build.py`. Avoid React, Next.js, a server API, import-map CDNs, and runtime font requests. Three.js is pinned at 0.165.0 and served locally.

Use only relative local asset paths so the page runs both at `/getlayersai/sites/{slug}/` locally and under `/WebsitedesignandPrompts/getlayersai/sites/{slug}/` on Pages. A site is an independent address inside one project Pages deployment, not a new GitHub repository or domain.

## 3. Design language

Set background `{bg}`, text `{fg}`, accent `{accent}`, and panel `{surface}`. Use the local font family appropriate to the authored design: Geist for the base UI, Syne for bold expressive headings, Cormorant for serif moments. Limit line lengths, preserve generous whitespace, and use clear mono labels for simulated technical readouts. Use the authored page's section order, copy, and unique layout from the `{slug}` record in `catalog.py`, not a generic repeated landing-page shell.

## 4. Signature scene

{s['mechanic']}

Use a single animation scheduler with a delta capped at 32 ms. Pointer spring constants are tension 180 and friction 24; device pixel ratio is capped at 1.6. Render a still state when reduced motion is requested, pause offscreen and when the document is hidden, and retain a meaningful fallback if WebGL is unavailable. Direct interactions must remain usable without continuous motion.

## 5. Functional acceptance criteria

'''+''.join(f'{i+1}. {c}.\n' for i,c in enumerate(s['checks']))+f'''
4. Every navigation link resolves to a real section or page. All primary inquiry actions open a labelled local modal, validate sample name/email, then clearly say that nothing was delivered or booked.
5. At 375 px and 1440 px, the page has no horizontal document overflow and all text controls remain reachable.
6. Escape closes dialogs and restores focus. Keyboard activation works without hover. Content remains visible with JavaScript disabled.
7. Readouts and synthetic actions must be marked as sample/demo content, not real financial, clinical, operational, or commercial claims.

## 6. Deliberate deviations

{s['deviations']}

## 7. Documentation and testing

Create this site's README, adapted prompt, build log, and browser methodology. Link every decision to the source brief or explicitly identify it as an authored adaptation. Run structural validation, automated browser tests, accessibility scans, and desktop/mobile screenshots. Record actual outcomes, not assumed success. Do not describe tests or deployments as passing until they have run successfully.
'''
    log=f'''# Build log — {s['name']}

## Date and provenance

Implementation date: **2026-10-14**. Source archive: [`{prompt}`](../../{prompt}). The source contains prompt instructions and links to externally hosted previews; those previews were not retrievable in this environment. This work is a text-brief adaptation with original visuals, not a reverse-engineered copy of the reference implementation.

## 1. Extract the brief

- Domain: {s['category']}.
- Narrative: {s['blurb']}
- Primary color constraint: `{accent}` against `{bg}`.
- The source requests a single self-contained HTML file but also asks for remote libraries. We instead use independent static HTML entries with deduplicated, local assets. This makes the whole collection resilient to CDN failure and keeps 13 copies of Three.js out of the repository.

## 2. Make the visual system concrete

Start with the palette and the signature motif, then give the hero its own compositional hierarchy. Keep body UI predictable, but avoid treating the 13 pages as color variants of one layout. Hero alignment, display type, geometry, corner language, and editorial density are specific to this study. Content has no artificial preloader and is never hidden behind a successful animation callback.

## 3. Implement the visual mechanism

{s['mechanic']}

Rendering is local and deterministic except elapsed animation time and the genuine local clock where used. Geometric random distributions use a seeded generator. Geometry/materials are disposed on page exit. ResizeObserver updates the drawing buffer and camera aspect, while IntersectionObserver suspends offscreen scheduling. Pointer and scroll update small state values rather than rebuilding DOM content.

## 4. Implement meaningful controls

'''+''.join(f'- {c}.\n' for c in s['checks'])+f'''

Shared inquiry forms are explicitly simulations. Case-study dialogs contain a brief, an approach, and a concept outcome rather than a generic empty popup. Native form validity handles required fields and email shape. No real personal data needs to be entered.

## 5. Resolve conflicts and document omissions

{s['deviations']}

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
'''
    write(folder/'README.md',readme);write(folder/'ADAPTED_PROMPT.md',adapted);write(folder/'BUILD_LOG.md',log)
    method=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{s['name']} — Methodology</title><link rel="icon" href="../../shared/favicon.svg"><link rel="stylesheet" href="../../shared/base.css"><link rel="stylesheet" href="./theme.css"><style>.notes{{max-width:900px;padding:60px 0}}.notes h1{{font-size:clamp(42px,6vw,75px)}}.notes h2{{font:600 25px Geist;letter-spacing:-1px;margin-top:50px}}.notes p,.notes li{{color:var(--muted)}}.notes a{{text-decoration:underline}}.notes code{{overflow-wrap:anywhere}}.notes .eyebrow{{color:var(--accent)}}</style></head><body><main class="wrap notes"><a href="./">← Back to {s['name']}</a><div class="eyebrow" style="margin-top:60px">BUILD NOTES / 2026-10-14</div><h1>{s['name']}<br><span class="serif">From prompt to page.</span></h1><p>{s['blurb']} An independent static interpretation of the archived GetLayers brief.</p><h2>01 / Read the brief</h2><p>The text source is <a href="../../{prompt}">{prompt}</a>. Reference media could not be inspected in this environment. This is not a pixel-identical reconstruction.</p><h2>02 / Establish a visual system</h2><p>Background <code>{bg}</code>, foreground <code>{fg}</code>, accent <code>{accent}</code>, surface <code>{surface}</code>. Local fonts, a responsive 1320 px maximum grid, and a site-specific hero composition establish the hierarchy.</p><h2>03 / Build the signature mechanism</h2><p>{s['mechanic']}</p><h2>04 / Make it interactive</h2><ul>{''.join('<li>'+escape(c)+'</li>' for c in s['checks'])}</ul><h2>05 / Record the adaptations</h2><p>{s['deviations']}</p><p>Shared architecture: local Three.js, native scrolling, a single frame scheduler, capped pixel density, offscreen/hidden-tab suspension, reduced-motion support, CSS fallback, and no backend.</p><h2>06 / Validate honestly</h2><p>See the <a href="../../VALIDATION.md">actual validation record</a> for test results. Automated checks do not replace manual screen-reader testing or reference-image comparison. All readouts and submissions are illustrative and local.</p><h2>07 / Reproduce the build</h2><pre>python3 -m http.server 8080 --bind 0.0.0.0\n# Open /getlayersai/sites/{slug}/\n\ncd getlayersai\npython3 tools/build.py\npython3 tools/verify.py\nnpm ci\nnpm test</pre><p>Edit this site's record in <code>tools/catalog.py</code> before rebuilding. Shared rendering and interactions are in <code>shared/scenes.js</code> and <code>shared/interactions.js</code>. Generated HTML and documentation will be overwritten on regeneration.</p><h2>Complete source documentation</h2><div class="actions"><a class="btn secondary" href="./README.md">README ↗</a><a class="btn secondary" href="./ADAPTED_PROMPT.md">Adapted prompt ↗</a><a class="btn secondary" href="./BUILD_LOG.md">Build log ↗</a></div><footer class="footer" style="margin-top:70px"><a href="./">Explore the site ↗</a><a href="../../">Back to the collection ↗</a></footer></main></body></html>'''
    write(folder/'methodology.html',method)

# Gallery cards use actual browser screenshots, not inaccessible reference posters.
order=['vesper','soda','kimi','ai-studio','dantora','baseline','stride','creative-director','clarix','relay','lumora','laocoon','ascend']
by_slug={s['slug']:s for s in SITES}
card_html=''
for i,slug in enumerate(order):
    s=by_slug[slug]
    card_html+=f'''<article class="study" data-name="{escape((s['name']+' '+slug+' '+s['blurb']).lower())}" data-category="{s['category']}"><a class="study-image" href="./sites/{slug}/" aria-label="Explore {s['name']}"><img src="./previews/{slug}.webp" alt="Desktop preview of the {s['name']} design study" loading="{'eager' if i<3 else 'lazy'}" width="1000" height="750"><span class="image-arrow" aria-hidden="true">↗</span></a><div class="study-meta"><span>{i+1:02d} / {s['category'].upper()}</span><span>INTERACTIVE</span></div><div class="study-title"><h3><a href="./sites/{slug}/">{s['name']}</a></h3><a class="notes-link" href="./sites/{slug}/methodology.html" aria-label="{s['name']} build notes">Build notes ↗</a></div><p>{s['blurb']}</p></article>'''
gallery=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Thirteen independent, interactive websites built from the GetLayers prompt archive. Explore the live studies, original artwork, and detailed methodology."><title>Layers / Thirteen studies in motion</title><link rel="icon" href="./shared/favicon.svg"><link rel="stylesheet" href="./shared/gallery.css"></head><body><a class="skip" href="#collection">Skip to collection</a><div class="gallery-wrap"><header class="gallery-nav"><a class="gallery-brand" href="./"><span aria-hidden="true">▱</span> layers<span class="brand-suffix">/ studies</span></a><nav aria-label="Collection navigation"><a href="#collection">The collection <sup>13</sup></a><a href="#approach">The approach</a><a href="../index.html">Repository showcase ↗</a></nav></header><main><section class="gallery-hero"><div class="hero-topline"><span><i></i> AN INDEPENDENT DESIGN EXPLORATION</span><span>VOLUME 01 / 2026</span></div><h1>Prompts into pixels.<br><span>Ideas into motion.</span></h1><div class="gallery-intro"><p>Thirteen briefs. Thirteen different worlds.<br>A collection of interactive websites exploring what happens when a design prompt becomes something you can actually experience.</p><a class="gallery-button" href="#collection">Explore the collection <span>↓</span></a></div><div class="hero-bottomline"><span>DESIGNED TO EXPLORE. BUILT TO INSPECT.</span><span>ORIGINAL CODE / LOCAL ARTWORK / OPEN METHODOLOGY</span></div></section><section id="collection" class="collection"><div class="collection-heading"><h2>The collection<span> (13)</span></h2><label class="search"><span aria-hidden="true">⌕</span><input type="search" id="search" placeholder="Find a study…" aria-label="Search studies"><kbd>/</kbd></label></div><div class="collection-toolbar"><div class="filters" role="group" aria-label="Filter studies"><button data-filter="All" aria-pressed="true">All studies</button><button data-filter="Product & tech" aria-pressed="false">Product & tech</button><button data-filter="Creative" aria-pressed="false">Creative</button><button data-filter="Lifestyle" aria-pressed="false">Lifestyle</button></div><span id="result-count" role="status">13 studies</span></div><div class="study-grid">{card_html}</div><div id="empty" hidden><h3>No studies found.</h3><p>Try another name or clear your filters.</p><button id="reset">Reset collection ↗</button></div></section><section class="approach" id="approach"><div><span class="kicker">THE APPROACH / NOT JUST A PRETTY SURFACE</span><h2>Every pixel has<br>a <em>paper trail.</em></h2><p>These are independent interpretations of the featured GetLayers text briefs — not pixel-identical copies or working commercial services. Each site has its own visual direction, meaningful local interactions, and an honest record of how it was made.</p><a href="./REVIEW.md">Read the repository review ↗</a></div><div class="approach-steps"><article><span>01</span><div><h3>Read the source.</h3><p>Map the prompt’s narrative, palette, motion, and interactions. Resolve contradictions before writing code.</p></div></article><article><span>02</span><div><h3>Build the experience.</h3><p>Original procedural artwork. Local dependencies. Responsive layouts and controls you can actually try.</p></div></article><article><span>03</span><div><h3>Leave the notes.</h3><p>Individual rebuild prompts, engineering logs, test results, and explicit limitations. Nothing hidden behind the finish.</p></div></article></div></section></main><footer class="gallery-footer"><a class="gallery-brand" href="./">▱ layers<span class="brand-suffix">/ studies</span></a><p>Independent studies from the GetLayers prompt archive.<br>13 featured websites · 41 additional briefs remain in the archive.</p><a href="{REPO}/tree/main/getlayersai">Explore the source ↗</a><span>MADE WITH INTENTION. / 2026</span></footer></div><script src="./shared/gallery.js" defer></script></body></html>'''
write(ROOT/'index.html',gallery)
write(ROOT/'sites.json',json.dumps([{k:s[k] for k in ['slug','name','number','category','blurb','colors']} for s in SITES],indent=2)+'\n')
print(f'Built {len(SITES)} independent static sites, methodology pages, and collection gallery.')
