# Adapted Prompt — The Portfolio Console (Debbie)

> Feed this prompt to any coding assistant or developer to replicate **The Portfolio Console** 1:1.
> This specification synthesizes the original design handoff, physical measurements from Page 7 of `portfolio-console-master-prompt.pdf`, and the responsive interaction model.

---

## 01 / Build Brief & Visual Style

Build a fully functional, responsive personal portfolio website called **The Portfolio Console**. Its visual style is **interactive retro-futurism with skeuomorphic mechanical keycaps and an authentic computer-terminal display**.

Deliver a production-ready website, not a static mockup. Use the supplied `device-reference.png` as the case artwork. Place real interactive HTML keycaps over each exact switch opening. Preserve the hardware's proportions, screws, perspective, recesses, and orange hinge. Do not redraw or replace the device with a generic keyboard.

Use a near-black page (`#111113`), a restrained top navigation, a short centred introduction, the device as the primary visual focus, a slim credibility strip, and a clean contact section. Keep the reference image separate from the interface text and controls so every key remains usable, accessible, focusable, and responsive.

---

## 02 / Page Content & Layout

### Header
- **Wordmark:** Lowercase `'debbie.'` with an orange dot (`#EC6426`).
- **Centred Navigation:** `Work`, `About`, `Process`, `Services`.
- **Right Controls:** Audio toggle (Web Audio mechanical clicks) + `Let's Talk` contact link (`↗`).
- **Responsive Wrap:** On smaller screens (≤640px), wrap navigation onto a second row without horizontal overflow.

### Introduction
- **Status Pill:** `'Available for work'` with a pulsating green indicator (`#10B981`).
- **Headline:** `'Hi, I'm Debbie'` with `'Debbie'` highlighted in pink (`#E4A5CA`).
- **Editable Display-Name:** Clicking/tapping the name allows the visitor to type a custom name. Save that name locally on the device in `localStorage` (`'debbie_console_name'`), defaulting to `'Debbie'`.
- **Subtitle:** `'A vibe coder with a curious mind building digital experiences.'`

### The Console Device Chassis
- Max width: ~1120px within a page container of ~1320px.
- Aspect ratio: Exactly `1536 x 1024` matching `device-reference.png`.
- Overlay coordinates: Scale the photo, screen, and all 11 keycaps together using the same coordinate system. They must never drift apart across viewports (1440px, 768px, 390px).

### Credibility Strip
- Below the device, display the repeated strip: `'Trusted by 30 brands  /  50 apps built'`.
- The wording is **apps**, not hubs or hopes.

### Contact Section
- Headline: `'Good design starts with hello.'`
- Subtitle: `'Have a project in mind, a half-formed idea, or just want to say hi?'`
- Contact link: `hello@debbie.example ↗`.
- Delivery note: Do not show 'Next section', 'Hover to explore', or 'Press to open'. Clearly identify `hello@debbie.example` as a placeholder.

---

## 03 / Screen Typography & Typing Logic

- **Font:** Recognisable computer-terminal monospace font: `Courier New, Courier, monospace`.
- **Title Color:** Bold warm cream (`#FDE3CF`) with subtle CRT text glow (`0 0 10px rgba(253, 227, 207, 0.45)`).
- **Secondary Text:** Muted grey (`#9CA3AF`), metadata/cursor amber (`#F8A91F`).
- **Default Screen Title:** `"{displayName}'s portfolio"`.
- **Top Metadata:** `"{displayName} / CREATIVE INDEX"` and status on the right (`READY` or `TYPING`).
- **Supporting Line:** `'A curious mind. A world of possibilities.'`
- **Typing Mechanics:**
  1. On load: 350ms cursor pause, then type character-by-character at ~95–110ms per char.
  2. Amber blinking caret (`|`) directly after the last visible character.
  3. Status reads `TYPING` during the reveal, then `READY`.
  4. Hovering or keyboard-focusing any key types its destination title and supporting description.
  5. Cancel unfinished typing immediately when a new key is selected (no competing timers or interleaved text).
  6. Revert smoothly back to the welcome title 350ms after leaving keys, unless a modal dialog is open or a key remains focused.
  7. Respect `prefers-reduced-motion` by displaying complete text immediately and disabling blinking carets.

---

## 04 / Keycaps, Colors & Destinations

### Letter Arrangement
- **Top row:** `P` `O` `R` `T` `F`
- **Lower row:** `O` `L` `I` `O` `★` and a long black `LET'S TALK ↵` return key.
- Together, the letter keys spell **`PORTFOLIO`**.

### Palette Specification
- **P** (Selected Work): Orange `#EC6426` (base sidewall `#AD4017`, dark ink `#4A1C0F`)
- **O** (About): Amber `#F8A91F` (base sidewall `#BC7512`, dark ink `#522A07`)
- **R** (Process): Cream `#FDE3CF` (base sidewall `#CAA58A`, brown ink `#66271B`)
- **T** (Services): Forest green `#2E573A` (base sidewall `#193A23`, cream ink `#FDE3CF`)
- **F** (Explore): Leaf green `#72AC43` (base sidewall `#487A26`, dark green ink `#1A330B`)
- **O** (About): Pink `#E4A5CA` (base sidewall `#B76F9B`, plum ink `#5E1B46`)
- **L** (Process): Brown `#66271B` (base sidewall `#40150E`, cream ink `#FDE3CF`)
- **I** (Services): Orange `#EC6426` (base sidewall `#AD4017`, dark ink `#4A1C0F`)
- **O** (Contact): Amber `#F8A91F` (base sidewall `#BC7512`, dark ink `#522A07`)
- **★** (Portfolio Star): Pink `#E4A5CA` (base sidewall `#B76F9B`, plum ink `#5E1B46`)
- **LET'S TALK** (Contact bar): Black `#252525` (base sidewall `#101010`, white ink `#FFFFFF`)

### Coordinate Map (Page 7 Master Handoff)

All dimensions measured against reference image (`1536 x 1024`):

$$\text{Left} = \frac{\text{CentreX} - \frac{\text{Width}}{2}}{1536} \times 100\%$$
$$\text{Top} = \frac{\text{CentreY} - \frac{\text{Height}}{2}}{1024} \times 100\%$$
$$\text{Width} = \frac{\text{Width}}{1536} \times 100\%$$
$$\text{Height} = \frac{\text{Height}}{1024} \times 100\%$$

| Key | Centre X | Centre Y | Width | Height | Left % | Top % | Width % | Height % |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **P** | 379 | 590 | 156 | 130 | 19.596% | 51.270% | 10.156% | 12.695% |
| **O (top)** | 580 | 580 | 156 | 130 | 32.682% | 50.293% | 10.156% | 12.695% |
| **R** | 782 | 570 | 156 | 130 | 45.833% | 49.316% | 10.156% | 12.695% |
| **T** | 982 | 559 | 156 | 130 | 58.854% | 48.242% | 10.156% | 12.695% |
| **F** | 1184 | 548 | 156 | 130 | 72.005% | 47.168% | 10.156% | 12.695% |
| **O (low 1)** | 355 | 783 | 98 | 108 | 19.922% | 71.191% | 6.380% | 10.547% |
| **L** | 479 | 776 | 98 | 108 | 27.995% | 70.508% | 6.380% | 10.547% |
| **I** | 602 | 770 | 98 | 108 | 36.003% | 69.922% | 6.380% | 10.547% |
| **O (low 2)** | 728 | 763 | 98 | 108 | 44.206% | 69.238% | 6.380% | 10.547% |
| **★ Star** | 852 | 756 | 98 | 108 | 52.279% | 68.555% | 6.380% | 10.547% |
| **LET'S TALK** | 1135 | 745 | 374 | 112 | 61.719% | 67.285% | 24.349% | 10.938% |

- **Keycap Perspective Transform:** `rotate(-3.2deg) skewX(4.8deg)` applied around center.
- **Screen Box:** `left: 21.8%`, `top: 17.9%`, `width: 56.9%`, `height: 15.3%`. Transform: `rotate(-3deg) skewX(5deg)`.

---

## 05 / Motion, Physics & Modals

1. **Rest Elevation:** Key face lifted ~0.8% device width above switch base.
2. **Spring Hover / Focus:** Lifts to ~2.7% device width via `cubic-bezier(0.22, 1.5, 0.4, 1)` (400ms duration).
3. **Press Snap:** Depresses into switch well in ~80ms with simultaneous Web Audio transient click sound.
4. **Idle Wave:** Every 7 seconds, a mechanical wave ripples across all 11 keys in sequence (staggered by 85ms): peaks near 3.8%, dips near 0.2%, settles to 0.8%. Wave automatically pauses during hover, focus, open modal, or hidden browser tab.
5. **Accessible Modals:** Clicking a key opens its target section (`work`, `about`, `process`, `services`, `contact`) in an accessible modal dialog featuring focus trapping, Escape key listener, outside click to dismiss, and focus restoration to the originating control.
