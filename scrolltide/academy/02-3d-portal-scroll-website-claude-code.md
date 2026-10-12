# Build INSANE Jaw-Dropping 3D Websites (Claude + ChatGPT)

- **Lesson URL**: https://www.scrolltide.co/academy/3d-portal-scroll-website-claude-code
- **YouTube Tutorial**: https://www.youtube.com/watch?v=lOHHabby8LI
- **Duration**: 8m 54s
- **Summary**: Build a layered 3D website with a zoom-into-the-portal scroll effect and floating clouds, using ChatGPT for the layers and Claude Code for the Next.js build.

---

## 03 — Break the scene into three layers (1:19)

Generate the background, the portal door and the clouds as three separate images, each on its own. This is the step the effect depends on.

Depth comes from moving them at different rates as the page scrolls, which is only possible if they are separate files. A single composed image can be scaled, but it cannot be moved through.

- Background: the environment, full-bleed
- Door: the portal alone, on transparency
- Clouds: foreground elements, on transparency

## 04 — Set up the Next.js project (1:39)

Start a fresh Next.js project in Claude Code and describe the structure before any of the effects: three stacked layers, correctly ordered, filling the viewport.

Confirm the stack renders correctly and the ordering is right before asking for a single frame of animation. Debugging motion on top of a broken stack is twice the work.

## 05 — Add the images and check the composite (3:09)

Drop the three layers in and look at the static composite. Edges, scale and alignment all get fixed here, while nothing is moving.

If the seams are visible standing still, they will be much more visible in motion.

## 06 — Refine with reference images until it matches (3:54)

Now the same loop as the physics build: screenshot what you have, put it next to the reference, and name the differences. Scale, position, how much of the door is visible at rest.

Each pass is small. The temptation to ask for a redesign is what loses the parts that were already right.

- Compare against the reference, not against a memory of it
- One correction per message

## 07 — Wire the zoom to the scroll (5:50)

Ask for the scroll to drive a zoom through the portal: the door scaling up and past the viewer, the background approaching more slowly, the clouds moving fastest of all because they are nearest.

Then tune the rates. Getting the relative speeds right is what makes it read as depth rather than as three images scaling at once — and it is worth asking for the parameters to be exposed so you can tune them without a rebuild.

- Nearest layer moves most, furthest moves least
- Tune the relative rates, not each one in isolation
- Check it on a trackpad and a mouse wheel — they scroll very differently

## What you end up with

A scroll-driven 3D scene with real depth, from three flat images and no 3D library.

The technique outlasts the specific build: separate your art into layers by distance, move them at different rates, and depth follows. Portals, windows, landscapes, product shots — the same three steps.

