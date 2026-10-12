# I Built a $2000 Interactive Website using Claude Code (Easy Full Tutorial)

- **Lesson URL**: https://www.scrolltide.co/academy/spotlight-hover-reveal-effect-claude-code
- **YouTube Tutorial**: https://www.youtube.com/watch?v=PniYeGLdRKw
- **Duration**: 6m 18s
- **Summary**: Build the cursor spotlight that reveals a hidden layer underneath — including the one image instruction the effect depends on and the exact radius that made it land.

---

## 01 — Find a reference with a still, front-on subject (0:52)

Look for a studio portrait: even lighting, a subject facing the camera, no strong perspective. The reveal works by swapping one layer for another in place, so anything with a dramatic angle or a busy background gives the two layers more chances to disagree.

Boring reference, better effect. The drama comes from the reveal, not the pose.

## 02 — Generate the base image (1:01)

Build the normal, unmasked version first and get it completely right — framing, crop, lighting, expression. Everything downstream is derived from this file, so a change here means regenerating the second image too.

Treat it as the one you are committing to, not a first draft.

## 03 — The instruction the whole effect depends on (1:36)

Now generate the second version — the futuristic mask, the alternate clothing, whatever is being revealed — and explicitly instruct that the pose, the lighting and the framing stay pixel-identical to the first image. Say it in those terms. Left to itself the model will produce a good picture that happens to be framed slightly differently, and slightly differently is fatal here.

This is the step people skip, and it is why their version of this effect never quite works. If the jaw sits four pixels lower in the second image, the spotlight reveals a face that visibly jumps. There is no CSS fix for that; there is only regenerating the image.

Check the two side by side at full size before continuing. If anything shifts, do this step again rather than pressing on.

- Name pose, lighting and framing explicitly as things that must not change
- Change exactly one thing between the two images
- Compare them at 100% before writing a line of code

## 04 — Build the hero section on its own first (2:03)

Hand Claude Code the base image and the layout reference and ask for the hero alone — typography, spacing, the image in position. No interaction yet.

Getting the static layout settled first means that when the reveal misbehaves, the only new variable is the reveal.

## 05 — Layer the second image and cut the spotlight through it (2:39)

Now add the masked image as a layer above the base and describe the interaction: a circular window that follows the cursor, revealing the layer underneath, with a feathered rather than a hard edge.

The feathering matters more than the radius. A hard-edged circle reads as a cut-out; a soft one reads as light.

- Stack the reveal layer above the base, not beside it
- Ask for the feathered edge in the same instruction, not as a follow-up

## 06 — Dial the spotlight in — expect to overshoot (3:47)

The first attempt came out far too large, which shows the whole trick at once and kills the mystery. The correction overshot the other way and made it too tight to read as a spotlight at all. It settled around 35% of the original, and the final spec was a 260px radius with a solid core and the fade starting at 40%.

Those numbers are a reasonable starting point, but the real lesson is the shape of the process: this parameter is tuned by eye, over several passes, and being wrong twice is the normal route to being right.

- Solid core, with the fade beginning around 40% of the radius
- 260px radius as a starting point for a face-sized subject
- Change one number per pass so you can tell what moved

## What you end up with

A hero section with a cursor-driven reveal that looks considerably more expensive than the four prompts it took.

The transferable idea is that the hard part of an interaction is often not the interaction. Here all the difficulty lives in generating two images that agree with each other, and the code is almost an afterthought once they do.

---

## Library Templates Used in This Lesson

- **Visor** (`visor` · Hero Section · Tier: `paid`): The rare light one: a headset shot held in a rounded 16:9 frame with FUTURE VISION set enormous around the wearer's head, and three cards fanned at opposing angles beneath it.
  - Preview: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/visor-hq.mp4
