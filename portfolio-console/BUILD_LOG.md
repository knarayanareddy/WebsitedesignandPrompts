# Build Log — The Portfolio Console (Debbie)

## 1. Executive Summary & Deliverables

A production-grade implementation of **The Portfolio Console** for Debbie, built from the official design handoff PDF (`portfolio-console-master-prompt.pdf`) and uncompressed master asset (`device-reference.png`, 1536 × 1024).

- **Visual Style:** Interactive retro-futurism with skeuomorphic mechanical keycaps and an authentic computer-terminal display.
- **Technology Stack:** React 18.3 + TypeScript + Vite 5.4 + Tailwind CSS 3.4 + Lucide Icons + Web Audio API.
- **Repository Location:** `WebsitedesignandPrompts/portfolio-console/`
- **Output Bundle:** Audit-clean production bundle in `dist/` with relative asset links (`base: './'`).

---

## 2. Hardware Geometry & Coordinate Derivation

To guarantee that interactive HTML keycaps and terminal telemetry never drift away from the underlying photograph at any viewport width (1440px desktop down to 390px mobile), the entire chassis uses an aspect ratio container bound to `1536 / 1024` with CSS container queries:

```css
.console-chassis {
  aspect-ratio: 1536 / 1024;
  container-type: inline-size;
}
```

### Keycap Percentage Coordinate System
Derived from Page 7 fit measurements using:
$$\text{Left} = \frac{\text{CentreX} - \frac{\text{Width}}{2}}{1536} \times 100\%$$
$$\text{Top} = \frac{\text{CentreY} - \frac{\text{Height}}{2}}{1024} \times 100\%$$

Each switch well incorporates:
1. **Underlying switch well shadow:** Radial falloff anchored to the chassis base plate (`rgba(0,0,0,0.85)`).
2. **Extruded 3D sidewall:** Rendered with `baseColor` (`#AD4017`, `#BC7512`, `#CAA58A`, `#193A23`, `#487A26`, `#B76F9B`, `#40150E`, `#101010`) dropping physical contact shadows into the well.
3. **Tactile keycap face:** Beveled top rim highlight (`inset 0 1.5px 1px rgba(255,255,255,0.45)`), concave dished glow, and precise letter ink coloration.
4. **Hardware perspective correction:** `transform: rotate(-3.2deg) skewX(4.8deg)`.

### Screen Bounding Box
- Position: `left: 21.8%`, `top: 17.9%`, `width: 56.9%`, `height: 15.3%`.
- Transform: `rotate(-3deg) skewX(5deg)`.
- Overlaid with CRT scanlines, CRT subtle phosphor glow, metadata header, status ping dot, and Courier New monospace character typing.

---

## 3. Kinetic Interaction & Motion Engine

### 1. Character Typing Loop
- **Cold Boot Delay:** 350ms cursor delay on initial load.
- **Reveal Velocity:** ~95–110ms per character with blinking amber vertical caret (`|`).
- **Dynamic Interactivity:** Hovering or keyboard-focusing any key immediately updates the screen destination. Any in-flight typing loop is cancelled cleanly without interleaved text or memory leaks.
- **Reversion:** When leaving keys, a 350ms delay fires before smoothly restoring the welcome title (`"{displayName}'s portfolio"`).

### 2. Spring Physics & Idle Wave
- **Rest State:** Face elevated 0.8% device width.
- **Hover/Focus:** Elevates to 2.7% via `cubic-bezier(0.22, 1.5, 0.4, 1)`.
- **Mechanical Press:** Instant 80ms bottom-out snap with Web Audio dual-oscillator acoustic click.
- **Idle Wave:** Cycles every 7 seconds across all 11 switches with 85ms stagger. Peaks at 3.8%, dips to 0.2%, and settles into 0.8%. Automatically pauses if mouse is hovered, key is focused, or modal is open.

### 3. In-Browser Web Audio Synthesizer
Zero external `.mp3` or `.wav` dependencies:
- **Click Transient:** High-frequency triangle oscillator (1400Hz &rarr; 320Hz over 40ms) simulates stem collision.
- **Case Thud:** Low-frequency sine oscillator (180Hz &rarr; 50Hz over 65ms) simulates the plastic chassis bottom-out.

---

## 4. Modal Dialog System & A11y Verification

All 5 destinations are wired to accessible modal views:
1. **Selected Work:** Concept 01 (Kinetic Console Interface) & Concept 02 (Editorial Digital Identity).
2. **About Debbie:** Backstory, vibe coder focus, stack overview.
3. **The Process:** 3-step iterative roadmap (Conversation &rarr; Shape Design &rarr; Build & Launch).
4. **Services:** Creative Dev & WebGL, Digital Product Design, Full-Stack Architecture.
5. **Contact:** Email clipboard action, delivery notice.

Features:
- `role="dialog"` and `aria-modal="true"`.
- Keyboard focus auto-placed on modal container.
- `Escape` key and outside backdrop clicks dismiss dialog.
- Focus returned cleanly to originating control upon close.
- Fully respects `prefers-reduced-motion` (instant text, animations disabled).

---

## 5. Verification Matrix

| Viewport | Dimension | Result | Keycap Alignment | Screen Overflow |
|:---|:---:|:---:|:---:|:---:|
| **Desktop High-DPI** | 1440 × 1100 @ 2x | PASSED | Perfectly seated in wells | None |
| **Tablet** | 768 × 1024 @ 2x | PASSED | Scaled identically via container | None |
| **Mobile** | 390 × 844 @ 2x | PASSED | 2-row header wrap, readable | None |

---

## 6. Content & Placeholder Audit

- Starter copy used verbatim from Section 06 of the master brief.
- Email address `hello@debbie.example` is documented and flagged in delivery notes as an intentional starter placeholder.
