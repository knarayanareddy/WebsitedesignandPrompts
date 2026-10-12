# Building Beautiful $2000 Websites with Google Antigravity for FREE

- **Lesson URL**: https://www.scrolltide.co/academy/build-animated-websites-free-google-antigravity
- **YouTube Tutorial**: https://www.youtube.com/watch?v=mgQFT-50ZVk
- **Duration**: 4m 18s
- **Summary**: Generate a character with Gemini, animate it into video, and have Google Antigravity build a full interactive landing page around it — for $0, in about five minutes.

---

## 01 — Find the layout before you generate anything (0:20)

Start on Pinterest and collect layout and typography references, not colour palettes. What you are looking for is the arrangement: where the character sits, how much room the headline gets, whether the navbar floats or sits flush.

This step costs two minutes and removes most of the back-and-forth later, because the model gets shown the composition instead of guessing it.

## 02 — Generate the character with Gemini (0:48)

Prompt Gemini for the character on a plain background. A plain background matters more than the character does — it is what makes the next two steps clean, and rescuing a subject from a busy background afterwards costs longer than regenerating it.

Iterate on the pose and the framing here rather than later. Once this image becomes a video, changing it means starting over.

- Ask for a plain or transparent background explicitly
- Get the pose right before the framing, and the framing before the styling

## 03 — Turn the still into a short animation (1:32)

Feed the image back into Gemini's image-to-video step and ask for subtle motion — a slight head turn, a breath, a shift in weight. Subtle is doing real work here: a dramatic animation reads as a video embedded in a page, while a small one reads as a page that is alive.

Generated clips almost always run longer than you need and start or end on an awkward frame.

- Ask for a loopable motion, not a performance
- Keep the camera still — the character moves, the frame does not

## 04 — Trim the clip down (2:10)

Any online trimmer will do. Cut to the section that loops cleanly, which is usually two or three seconds in the middle rather than anything at either end.

A hero video that visibly restarts is more distracting than no video at all, so this is worth the extra minute.

## 05 — Let Antigravity build the page around it (2:40)

Open Antigravity, hand it the trimmed clip and the reference layout, and describe the page: hero with the character, navbar, headline treatment, testimonials section. Then ask specifically for the cursor interaction — the head should follow the pointer.

That last instruction is the one that turns a nice-looking page into one people send to their friends, and it is a single sentence.

- Give it the asset and the reference together, in the first message
- Name the interaction explicitly — it will not be inferred
- Build the static page first, then add the interaction if it stalls

## 06 — Polish what the reference could not tell it (3:50)

What is left is spacing, type weight and the mobile layout — the things a single reference image never specifies. Work through them one instruction at a time.

Check the interaction on a touch device too. Cursor-tracking has no meaning without a cursor, so the mobile fallback needs to be a deliberate decision rather than an accident.

## What you end up with

A complete interactive landing page — animated character, cursor tracking, navbar, testimonials — built with tools that cost nothing.

The broader lesson is about asset order. Image first, then video, then trim, then build. Every step feeds the next, and doing them out of order means redoing the ones before it.

---

## Library Templates Used in This Lesson

- **Clover** (`clover` · Hero Section · Tier: `paid`): A soft, wide-eyed companion wanders through dappled forest light — a hero for brands that want to feel like an invitation outdoors.
  - Preview: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/clover.mp4
