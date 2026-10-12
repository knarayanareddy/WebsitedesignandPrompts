# Build $5000 Animated Websites using AI (Full Tutorial | Claude Code)

- **Lesson URL**: https://www.scrolltide.co/academy/perfect-loop-ai-video-scroll-frames
- **YouTube Tutorial**: https://www.youtube.com/watch?v=kbH_YbBgnK4
- **Duration**: 10m 16s
- **Summary**: Generate a video that loops back to its exact starting frame with Veo 3.1, extract it to WebP frames, and tie it to scroll position with Claude Code.

---

## 01 — Screenshot a reference frame by frame (0:42)

Find a reference video of the motion you want and screenshot it at intervals rather than trying to describe the movement from memory.

You are not copying it. You are building an accurate description of a movement, and stills are far easier to describe precisely than a remembered clip.

## 02 — Have ChatGPT turn the frames into a prompt (1:12)

Feed the screenshots to ChatGPT and ask it to describe the animation sequence as a video prompt. Generate two candidate prompts and merge them into one, taking the strongest parts of each.

Merging beats picking. The two attempts usually get different things right.

## 03 — Isolate clean start and end frames (1:44)

Pull one clean frame for the start of the motion and one for the end. Clean means no motion blur and no partially occluded subject — these two images are about to define the entire clip.

This is the setup for the loop trick in the next step, and it does not work with soft frames.

## 04 — The trick to a loop that does not drift (3:02)

In Google Flow with Veo 3.1 Quality, give it a start frame, an end frame and the prompt — and make the end frame the same image as the start frame.

The model then generates a clip that travels through the motion and arrives back exactly where it began. Because the first and last frames are the same file, there is nothing to snap between; the loop is seamless by construction rather than by luck.

Generating and hoping is what produces the drift. This removes the hope.

- Start frame and end frame set to the same image
- The prompt describes the journey between them, not the endpoints
- Use the quality model — sampling amplifies compression artifacts

## 05 — Extract to WebP at maximum quality (4:03)

192 frames — eight seconds at 24fps — exported as WebP at maximum quality settings.

WebP rather than JPEG or PNG for a reason: it is the only common format that gives you PNG-grade edges at roughly JPEG file sizes, and a frame sequence is the one place on a page where both matter at once. Max quality here is affordable precisely because WebP is doing the compression.

- 192 frames = 8 seconds at 24fps
- WebP at max quality, not JPEG
- Zero-padded filenames so the sequence sorts correctly

## 06 — Prompt the build section by section (5:39)

In Claude Code with React and Vite, the site goes up one section at a time: navbar redesigned from a Pinterest reference, then the frame-driven hero, then a glass-morphism bento grid built with Framer Motion that converges as you scroll, then the footer from its own reference.

Each section gets its own reference image and its own prompt. As the video says at 9:03, this is never a one-prompt build — and treating it as one is how you get a site where every section is slightly wrong.

- One reference image per section
- Finish a section before starting the next

## 07 — Expect a real bug near the end (7:45)

The footer would not stay sticky. The first fix attempt failed outright; the second one worked.

Worth including because it is the honest shape of these builds. Position and stacking bugs are the most common failure in scroll-driven layouts, they rarely resolve on the first try, and one failed attempt is not a reason to start over.

## What you end up with

A scroll-driven site whose hero animation loops seamlessly because it was generated to, rather than trimmed until it nearly did.

The loop trick is the piece to remember. Setting the end frame equal to the start frame costs nothing at generation time and removes an entire class of problem you would otherwise be fighting in the edit.

---

## Library Templates Used in This Lesson

- **Helix** (`helix` · Hero Section · Tier: `paid`): A double helix turns slowly through the dark, equal parts biology and blueprint — a hero for brands built on precision.
  - Preview: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/helix.mp4
