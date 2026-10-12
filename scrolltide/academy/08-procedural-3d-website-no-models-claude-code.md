# Claude Opus 5 Builds insane 3D Websites in Minutes

- **Lesson URL**: https://www.scrolltide.co/academy/procedural-3d-website-no-models-claude-code
- **YouTube Tutorial**: https://www.youtube.com/watch?v=b5qiUREeURU
- **Duration**: 7m 35s
- **Summary**: An exploded-view camera built entirely from code — geometry, custom shaders and scroll-driven disintegration, with no 3D model file anywhere in the project.

---

## 01 — Reference the parts, not the object (0:47)

On Pinterest, collect references of camera parts — individual lenses, rings, plates — rather than photographs of whole cameras.

The model is going to build this out of primitives, so what helps is reference for the components it will construct, not the finished object it is aiming at. Grab a separate background reference later; it is a different problem and mixing them at this stage muddies both.

## 02 — Stage the build: geometry, then shaders, then scroll (1:44)

The build runs off a staged guide rather than one large prompt: get the geometry right first, then the shaders, then the scroll-driven disintegration.

The staging is not politeness, it is debuggability. If geometry, materials and motion all arrive at once and the result is wrong, you have no idea which of the three is wrong. Built in order, each stage is verified before the next one can hide it.

- Geometry first — shapes and positions, flat shading
- Shaders second — glass, metal, light
- Scroll last — nothing moves until it looks right standing still

## 03 — Get a working version before polishing anything (2:09)

The first working version is not the good version, and that is fine. Once it works, the polish pass adds the glass treatment, the overlay and the typography.

Resist polishing a stage that is not yet correct. Nice materials on wrong geometry is wasted work twice over.

## 04 — Debug with screenshots, not descriptions (2:57)

A real bug appeared: every headline on the site lost its spaces. The fix was to screenshot it and describe what was wrong with what was on screen, rather than re-explaining what was wanted.

This is the same debugging loop as the physics build. For anything visual, showing the model its own output and naming the difference converges. Restating the goal does not, because the goal was never the thing it misunderstood.

- Screenshot the broken state and paste it in
- Describe the difference from what is on screen, not the original intent

## 05 — The 10% and the 90% (3:45)

Getting something impressive on screen is the first ten percent. The remaining ninety is the polish that makes it look finished rather than generated.

Worth internalising before you start, because the gap between "this is amazing" at minute two and "this is actually done" at minute seven is where most people stop and publish something that reads as a prototype.

## 06 — The background is not a detail (4:25)

The scene was sitting on a flat grey background and looked like a demo. A starfield reference from Pinterest, handed over as the new background, changed the whole impression instantly.

This is the highest-leverage single change in the video. A procedurally generated object has no environment of its own, so whatever you put behind it is doing all the work of making it look like it exists somewhere.

- Budget a real background, not a fill colour
- Reference it separately from the subject

## 07 — Make the background interactive too (5:28)

The last step pushes the background into shaders and WebGL so it responds rather than just sitting there — which is the point at which the video says it finally has soul.

Since there are no model files, this costs nothing in page weight. It is more code doing more work on the GPU, not more assets to download.

## What you end up with

A scroll-driven 3D scene with custom shaders and no model files at all — nothing to export, nothing to download, every part adjustable by asking.

Two things to take away: stage the build so each layer is verified before the next can hide it, and treat the background as a first-class decision rather than the last thing you fill in.

---

## Library Templates Used in This Lesson

- **Camera** (`camera` · 3D Website · Tier: `pro`): An exploded-view camera drifts apart in cold studio light, every lens and shutter plate suspended mid-thought — a hero for brands that sell precision, not just gear.
  - Preview: https://pub-1e5b4001b36b47e28e6a2fb775966a79.r2.dev/previews/camera.mp4
