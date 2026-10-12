# Build $10,000 Websites Using Claude Code and ChatGPT in 10 mins (Full Tutorial)

- **Lesson URL**: https://www.scrolltide.co/academy/ai-generated-video-hero-section-claude-code
- **YouTube Tutorial**: https://www.youtube.com/watch?v=F_b23FL4IfY
- **Duration**: 5m 36s
- **Summary**: Turn a still image into a cinematic looping hero video with Gemini Veo 3, host it on Cloudinary, and have Claude Code build a full website around it.

---

## 01 — Collect references for the whole page, not just the hero (0:15)

Pull references for every section you intend to build, not only the top of the page. The hero is the part everyone plans and the part that sets expectations for everything under it — a cinematic hero above four flat sections reads worse than four consistent ones.

Keep them in one place. You will paste them back in repeatedly.

## 02 — Prep the still in ChatGPT (0:45)

Generate or adapt the hero image, then get it into the aspect ratio the hero will actually use. Doing this now rather than cropping later is what keeps the composition intact — a crop applied after animation throws away framing the video was built around.

Widescreen and a clear area where the headline will sit. The image has to survive having text on top of it.

- Set the aspect ratio before animating, never after
- Leave deliberate negative space for the headline
- Keep the contrast low where text will land

## 03 — Animate it with Gemini Veo 3 (1:30)

Feed the still into Veo 3 and ask for restrained motion: drifting cloud, a slow push, light moving across a surface. The goal is a loop that reads as atmosphere rather than a clip that demands to be watched.

Anything with a clear beginning and end fights the page. Anything that loops disappears into it, which is what you want behind a headline.

## 04 — Clean up the generated clip (2:35)

Generated video usually arrives watermarked and longer than needed. Remove the watermark, trim to the loopable section, and check the seam between the last frame and the first.

Then compress. A hero video is the largest asset on the page and the one blocking first paint, so this is a performance decision as much as a visual one.

- Trim to the cleanest loop, not the longest usable stretch
- Compress before uploading — the hero is your largest asset
- Always ship a poster image for the frames before playback starts

## 05 — Host it on Cloudinary (3:10)

Upload the clip to Cloudinary — the free tier is enough — and take the delivery URL. Serving video out of a repo is slow and, past a certain size, simply refused by most hosts.

Hand the URL to the model rather than the file. It is a much more reliable instruction.

## 06 — Build the site around it, one section at a time (3:45)

Give Claude Code the video URL and the hero reference, and ask for the hero alone. Get it right — the overlay darkness, the type scale, the mobile behaviour — before mentioning any other section.

Then repeat for each section below it, pasting that section's reference as you go. It is slower than one big prompt and it produces a site you don't have to unpick.

- Hero first, and finished, before anything else exists
- One reference image per section, sent with that section's request
- Set `muted`, `loop`, `playsInline` and `preload` deliberately

## What you end up with

A site with a hero video nobody else has, because it did not come from a stock library and was never filmed.

The reusable idea is the asset pipeline: prepare, animate, clean, host, then build. Each step has one job, and the build step goes smoothly precisely because the four before it were done separately.

---

## Library Templates Used in This Lesson

- **Eclipse** (`eclipse` · Hero Section · Tier: `paid`): Light and shadow trade places in a slow, dramatic reveal — built for the moment right before the big announcement.
  - Preview: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/eclipse.mp4
- **Monsoon** (`monsoon` · Hero Section · Tier: `free`): Motion builds like weather rolling in — a hero for brands with something big about to happen.
  - Preview: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/monsoon.mp4
