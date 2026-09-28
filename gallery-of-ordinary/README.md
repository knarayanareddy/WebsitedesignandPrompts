# Gallery of Ordinary

> A type-only index that lets the pictures argue for themselves.

A self-contained website template: one `index.html`, zero build steps, zero
remote assets. Drop the folder on GitHub Pages and it works.

- **Archetype:** minimal photography index
- **Tags:** photography, index, quiet
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
| `--accent` | `#B4472E` |
| `--accent2` | `#3E5C76` |
| `--bg` | `#EDEAE4` |
| `--ink` | `#1A1A1A` |
| `--muted` | `#8A8A8A` |
| `--surface` | `#FFFFFF` |
| `--font-body` | `'Neue Haas Grotesk', 'Helvetica Neue', sans-serif` |
| `--font-display` | `'Libre Caslon Display', Georgia, serif` |

## Section map

| Anchor | Section | Role |
| --- | --- | --- |
| `#opening` | The problem, stated plainly | Gallery of Ordinary is a minimal photography index design built around one decision: a type-only index that lets the pi… |
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
