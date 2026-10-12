# Claude Opus 5 Just Changed Web Design Forever! (Full Claude Code Tutorial)

- **Lesson URL**: https://www.scrolltide.co/academy/switching-ai-tools-mid-build-hover-reveal
- **YouTube Tutorial**: https://www.youtube.com/watch?v=dSIVC9br7v8
- **Duration**: 5m 15s
- **Summary**: The same hover-reveal refused to work in Google AI Studio and came out first try in Claude Code. When to stop prompting, switch tools, and clean your assets.

---

## 01 — Start from a bold hero reference (0:24)

Pinterest first, as always — a hero with a large subject and confident typography. The reveal needs a subject big enough on screen that a spotlight-sized window shows something meaningful.

A small subject means the spotlight reveals a fragment, and a fragment reads as a glitch rather than an effect.

## 02 — Isolate the character, then generate the alternate (0:47)

Use ChatGPT to isolate the character from the reference, then generate the masked version and, separately, the gradient background.

Three separate assets, generated in that order. The background comes last because it has to sit behind whatever the first two turned out to be, not the other way around.

- Character isolated on its own
- Masked version derived from it
- Background generated last, to fit the pair

## 03 — Recognise when to switch tools rather than re-prompt (1:50)

The effect was tried in Google AI Studio first and it did not behave. Rather than keep rewording, the build moved to Claude Code and the same request produced a working reveal.

The signal to watch is the shape of the failures. If each attempt is wrong in a new way, the prompt is probably the problem and rewording will help. If every attempt is wrong in the same way, more prompting will not fix it — that is the model telling you something about what it is reliable at, and moving is cheaper than persisting.

Two or three attempts is a fair test. Ten is a sunk cost.

- Failures that vary → keep refining the prompt
- Failures that repeat identically → change tools
- Set yourself an attempt budget before you start

## 04 — Build the hero in React and Vite (2:01)

In Claude Code, set up a React and Vite project and prompt the hero section — the character, the typography, the background in place.

Then add the spotlight logic as a second, separate instruction once the layout is settled.

## 05 — Clean the PNGs before feeding them back (3:18)

The isolated character came back with background artifacts around the edges — the faint halo an automatic cut-out leaves behind. Against a gradient it was obvious.

Run the assets through a background remover, then hand the cleaned files back to Claude Code and ask it to swap them in. This is a two-minute fix that no amount of prompting substitutes for, because the flaw is in the file rather than in the code.

Look at every generated PNG at full size, on the background it will actually sit on. Artifacts hide well on white.

- Inspect cut-outs against the real background, not a checkerboard
- Fix the asset, not the code, when the flaw is in the asset

## 06 — Size the spotlight to the subject (4:14)

The first spotlight was too small to read. Enlarging it until it comfortably covers a face-sized area of the frame is what makes the reveal feel deliberate rather than accidental.

It is the same tuning pass every version of this effect needs, and it is always done by eye.

## What you end up with

A working hover-reveal hero in React and Vite, and a more useful habit than the effect itself: treating "which tool" as a variable you are allowed to change mid-project.

Most time lost to AI builds is not lost to hard problems. It is lost to persisting with a tool that has already told you, three identical failures in a row, that this is not the one.

---

## Library Templates Used in This Lesson

- **Visor** (`visor` · Hero Section · Tier: `paid`): The rare light one: a headset shot held in a rounded 16:9 frame with FUTURE VISION set enormous around the wearer's head, and three cards fanned at opposing angles beneath it.
  - Preview: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/visor-hq.mp4
