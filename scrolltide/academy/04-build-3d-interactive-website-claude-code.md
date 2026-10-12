# Build a 3D Interactive Website step-by-step using Claude Code + ChatGPT Images (Full Tutorial)

- **Lesson URL**: https://www.scrolltide.co/academy/build-3d-interactive-website-claude-code
- **YouTube Tutorial**: https://www.youtube.com/watch?v=GLs8HfvgIo8
- **Duration**: 6m 44s
- **Summary**: Build an interactive site with a physics-based text curtain that reacts to the cursor — including the three rounds of debugging it took to make the physics work.

---

## 03 — Isolate it onto a transparent background (1:08)

Cut the gate out onto transparency. This is the step that decides whether the finished thing has depth: a gate on transparency can sit in front of a separate background with the curtain between them, and each layer can move at its own rate.

Check the edges at full size. Fringing that is invisible in a thumbnail is very visible at hero scale.

- One subject per image, always on transparency
- Inspect the cut-out at 100% before using it

## 04 — Generate the background scene separately (1:44)

Now generate the environment as its own image, matching the lighting of the gate. Two images that were generated independently rarely agree on light direction, so it is worth saying explicitly where the light comes from in both prompts.

You now have the layers the scene will be assembled from.

## 05 — Start the build with Claude Code on Opus (1:54)

Hand Claude Code the layers and describe the scene: gate in front, background behind, a curtain of text hanging between them that responds to the pointer.

The first result will be structurally right and physically wrong. That is the expected outcome, not a failure — the layout is describable in words and the physics is not.

## 06 — Fix it with screenshots, not adjectives (2:51)

This is the part worth the whole video. When the curtain came out wrong, the fix was not a better description — it was a screenshot of the wrong result handed back with a note about what specifically was wrong with it.

It took three rounds. Zoom and curtain physics in round one, still broken in round two, and only in the third round — after asking specifically for cursor-reactive movement rather than "more realistic" movement — did it settle.

The pattern generalises: for anything visual, show the model what it did and name the difference, rather than restating what you wanted.

- Screenshot the broken state and paste it in
- Name one specific difference between what you see and what you want
- Expect several rounds on physics — that is normal, not a sign to restart

## 07 — Add a control panel instead of re-prompting (5:30)

Once the physics works, ask for a small on-page control panel exposing the parameters — curtain weight, reaction distance, damping. Tuning those with sliders takes seconds, where every tweak through the model is a full rebuild.

Then ask for sound. Claude Code will add sound effects if you simply ask, and almost nobody does.

- Expose the variables you will want to tune, not all of them
- Ask for sound — it is one sentence and most builds skip it

## What you end up with

An interactive scene with layered depth, cursor-reactive physics and sound — none of it hand-written.

The transferable skill is the debugging loop. Screenshot the wrong result, name the specific difference, repeat. It is slower than hoping the next prompt lands, and it converges where re-describing the goal never does.

