# ADAPTED_PROMPT.md — Brutalist Ledger

> The prompt below is the complete design brief used to build and adapt this
> template. Paste it into a coding assistant (Antigravity, Claude, ChatGPT,
> Cursor, …) to reproduce the design or retarget it at your own product.

## 1. Design intent

Raw concrete, hard rules, and one screaming accent colour.

- **Archetype**: brutalist editorial
- **Tags**: brutalism, editorial, high-contrast
- **Deliverable**: one self-contained `index.html` (inline CSS and JS, no build
  step, no remote assets) plus this prompt and a `README.md`.

## 2. Design tokens

| Token | Value |
| --- | --- |
| `--accent` | `#FF3B00` |
| `--accent2` | `#1B3CFF` |
| `--bg` | `#F2F0EB` |
| `--ink` | `#111111` |
| `--muted` | `#6B6B6B` |
| `--surface` | `#FFFFFF` |
| `--font-body` | `'IBM Plex Mono', 'SFMono-Regular', monospace` |
| `--font-display` | `'Archivo Black', 'Arial Black', sans-serif` |

Use these values verbatim first, then diverge once the structure feels right.
Every token maps to a CSS custom property declared in `:root`, so a rebrand is
a palette swap rather than a rewrite.

## 3. Layout and section order

1. **The problem, stated plainly** (`#opening`) — Brutalist Ledger is a brutalist editorial design built around one decision: raw concrete, hard rules, and one screaming accent colour
2. **How the mechanism works** (`#argument`) — Show the structure that earns the promise above it.
3. **Three supporting beats** (`#details`) — Specifics that survive a sceptical reading.
4. **Proof and next step** (`#proof`) — Close with evidence, then a single unambiguous action.

## 4. Non-negotiable requirements

1. **No remote assets.** No `http(s)` `src`/`href` and no remote `url()` in CSS.
   All artwork is inline SVG data URIs or CSS gradients, so the page never shows
   a broken image placeholder.
2. **No build step.** One `index.html`, inline `<style>` and inline `<script>`,
   no bundler, no framework, no npm install.
3. **Responsive from 320px up.** Fluid type via `clamp()`, content-first
   breakpoints, and horizontal scrolling only inside deliberate overflow
   containers.
4. **Accessible by default.** Semantic landmarks, one `h1`, labelled nav,
   visible `:focus-visible` states, and a skip link.
5. **Motion is opt-out.** Animations are gated behind
   `prefers-reduced-motion: no-preference`, and the reveal script degrades to
   fully visible content when `IntersectionObserver` is missing.
6. **Modern typography.** A system font stack by default; if a webfont is
   requested, self-host it with `font-display: swap` and provide the fallback
   stack so the first paint is never invisible.

## 5. Adaptation guide

1. Duplicate the folder and rename it to your own theme slug.
2. Edit the `:root` block: `--bg`, `--surface`, `--ink`, `--muted`, `--accent`,
   `--accent-2`, `--font-display`, `--font-body`.
3. Replace the hero copy, the section titles, and the CTA labels.
4. Point `.hero__art` at your own inline SVG, or delete the element if the
   design reads better without it.
5. Re-check contrast: `--ink` on `--bg` and `--accent` on `--bg` should both
   clear 4.5:1 for body text.
6. Re-run the checklist in `README.md` before publishing.

## 6. Definition of done

- [ ] Renders correctly from `file://` with the network disabled.
- [ ] No console errors and no 404s in the network tab.
- [ ] Passes the 320px, 768px, and 1440px viewport checks.
- [ ] Keyboard-only traversal reaches every interactive element.
- [ ] `prefers-reduced-motion: reduce` removes all non-essential motion.
- [ ] The design reads as `brutalist editorial` at a glance, not as a generic landing page.
