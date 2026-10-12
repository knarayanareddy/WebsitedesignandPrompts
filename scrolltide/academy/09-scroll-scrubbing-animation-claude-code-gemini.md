# I Built an Award-Winning Website in 9 Minutes using Claude Code (Full Tutorial)

- **Lesson URL**: https://www.scrolltide.co/academy/scroll-scrubbing-animation-claude-code-gemini
- **YouTube Tutorial**: https://www.youtube.com/watch?v=DTdogL3GKm0
- **Duration**: 9m 32s
- **Summary**: Turn an AI-generated image into video with Gemini, convert it to a frame sequence, and have Claude Code scrub it to the scroll — the big-budget agency effect.

---

## 01 — Find a reference with a single continuous movement (0:30)

Look for something with one clear motion running through it — a camera push, a rotation, a landscape passing. Scroll-scrubbing shows one movement well and a cut badly, because the reader controls the playhead and will inevitably sit on the cut.

Landscapes, orbits and slow pushes all work. Anything with a hard transition does not.

## 02 — Turn the reference into a custom image (0:53)

Use ChatGPT to produce your own image in the style of the reference, at the aspect ratio the section will occupy. Set the ratio now — a crop applied after the frame sequence exists means regenerating everything downstream.

This image is the first frame of everything that follows.

## 03 — Animate it with Gemini Pro (1:24)

Feed the still into Gemini's image-to-video and ask for one slow, continuous movement. Slow matters: the frame sequence samples this clip, and fast motion between sampled frames shows up as stutter that no amount of tuning fixes later.

Then clean the output — watermark removed, trimmed to the movement itself with nothing before or after it.

- One movement, no cuts
- Slower than feels right — it will be sampled
- Trim to the motion, not around it

## 04 — Repeat for the second section (3:05)

The video builds two scrubbing sections, and the second is generated the same way from its own reference and its own still.

Doing them one at a time — image, video, trim, and only then the next — keeps the two from drifting apart in style.

## 05 — Convert the clips into frame sequences (5:17)

This is the step that makes scrubbing possible. Each clip is exported as numbered still images, and the scroll position selects which one to draw.

Frame count is the whole trade-off: too few and the motion visibly steps, too many and the page is downloading megabytes before anything moves. Something in the region of 60–120 frames for a section-length scrub is a sensible starting point, tuned by eye afterwards.

- Consistent, zero-padded filenames so the sequence sorts correctly
- Compress every frame — this is the page's entire weight
- Fewer frames than instinct suggests; add more only if stepping shows

## 06 — Wire the scroll to the frames (7:12)

Give Claude Code the frame directory and describe the behaviour: as this section scrolls through the viewport, map scroll progress across the sequence and draw the matching frame.

Two things to insist on, because they are what separates a smooth implementation from a janky one — preload the frames before the section is reached, and draw to a canvas rather than swapping image sources.

- Preload the sequence before the section enters the viewport
- Draw to a canvas; do not swap `src` on an `<img>`
- Pin the section while the sequence plays through

## 07 — Build the hero and the rest of the page (8:04)

With the scrubbing sections working, hand over the hero reference and the typography direction and let Claude Code build the rest around them.

Leaving the hero until last is deliberate here. The scrubbing sections are the hard, load-bearing part, and it is much easier to design a hero that leads into a working effect than to retrofit an effect under a finished hero.

## What you end up with

A site with genuine scroll-scrubbed animation — the effect that reads as a large budget — built in an afternoon from generated assets.

The one thing to carry away is that scrubbing is a frame problem, not a video problem. Once the sequence exists and is preloaded, the scroll is just an index into an array, and everything that makes it feel expensive comes down to frame count and compression.

---

## Library Templates Used in This Lesson

- **Cortex** (`cortex` · Hero Section · Tier: `paid`): Data pulses through a glowing neural interface as the frame turns, equal parts diagnostic and dream — a hero for brands mapping what's happening inside the machine.
  - Preview: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/cortex.mp4
