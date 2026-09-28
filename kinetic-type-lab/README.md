# Kinetic Type Lab

> A specimen sheet that animates every glyph it introduces.

A self-contained website template: one `index.html`, zero build steps, zero
remote assets. Drop the folder on GitHub Pages and it works.

- **Archetype:** type specimen
- **Tags:** typography, motion, specimen
- **Added:** 2026-09-28
- **Files:** `index.html`, `README.md`, `ADAPTED_PROMPT.md`

## Preview locally

```bash
# no install and no server required
open index.html

# or, if you prefer a local origin
python3 -m http.server 8000
```

## Design aesthetic tokens

| Token | Value |
| --- | --- |
| `--accent` | `#D7FF3E` |
| `--accent2` | `#FF6B4A` |
| `--bg` | `#171717` |
| `--ink` | `#FAFAFA` |
| `--muted` | `#8C8C8C` |
| `--surface` | `#1F1F1F` |
| `--font-body` | `'Inter', system-ui, sans-serif` |
| `--font-display` | `'Anton', 'Arial Black', sans-serif` |

## Section map

| Anchor | Section | Role |
| --- | --- | --- |
| `#opening` | The problem, stated plainly | Kinetic Type Lab is a type specimen design built around one decision: a specimen sheet that animates every glyph it int… |
| `#argument` | How the mechanism works | Show the structure that earns the promise above it. |
| `#details` | Three supporting beats | Specifics that survive a sceptical reading. |
| `#proof` | Proof and next step | Close with evidence, then a single unambiguous action. |

## What makes this design work

- **Contrast** — the ink/background pair is chosen for body-text legibility
  first; the accent is reserved for states and calls to action, so colour
  always carries meaning.
- **Type** — the display and body stacks are declared once as custom
  properties, so pairing a new typeface is a two-line change.
- **Motion** — one `IntersectionObserver` drives every reveal. There is no
  animation library, and `prefers-reduced-motion` turns the whole system off.

## Adapt it to your product

1. `cp -R . ../your-theme-slug` and rename the folder.
2. Edit the `:root` block: swap `--bg`, `--surface`, `--ink`, `--muted`,
   `--accent`, `--accent-2` for your brand.
3. Replace the `<h1>`, the hero lede, and the CTA labels.
4. Keep the structure; change the voice. The layout rhythm is what makes the
   design distinctive, and it is independent of the copy.
5. Read [`ADAPTED_PROMPT.md`](./ADAPTED_PROMPT.md) for the full design brief,
   the non-negotiable requirements, and the definition of done.

## Quality checklist

- [ ] Renders from `file://` with the network disabled
- [ ] No remote `src`/`href`/`url()` references (no broken image placeholders)
- [ ] Readable at 320px, 768px, and 1440px
- [ ] Keyboard-only traversal reaches every link
- [ ] `prefers-reduced-motion: reduce` removes the reveals
- [ ] Body-text contrast clears WCAG AA (4.5:1)
