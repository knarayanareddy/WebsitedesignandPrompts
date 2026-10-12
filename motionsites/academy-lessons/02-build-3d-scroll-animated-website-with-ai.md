# How to Build a 3D Scroll-Animated Website with AI (Step-by-Step)

- **Lesson Slug:** `build-3d-scroll-animated-website-with-ai`
- **Live URL:** `https://motionsites.ai/academy/build-3d-scroll-animated-website-with-ai`
- **YouTube Video Tutorial:** https://youtu.be/-0zReivPgBM
- **Associated MotionSites Prompt ID:** `sky-cookie`
- **SEO Description:** Turn a single image into a 3D model with AI, then use Claude and Three.js to build a scroll-driven 3D website — step by step, no agency required.

## Introduction

TL;DR: Turn a single image into a 3D model with AI, then use Claude to build a scroll-driven 3D website with Three.js — no agency, no months of dev time. Total cost: whatever you pay for AI credits. You can build an award-winning-style 3D website in an afternoon using AI. Here's the exact workflow I use after 10 years of designing websites — now fully AI-assisted.

## What You'll Need

- An image of any object (a cookie, candy, product — anything)
- An AI image tool (GPT Image, Nano Banana / Gemini)
- An AI image-to-3D generator
- **Claude** (desktop app, Code mode)

## Step 1: Turn One Image into Multi-View References

Pick a reference image. Ask your AI image tool:

> Create an image like this, but from the front, back, left, and right. This is for my 3D model.

Crop the result into four separate views (Figma works fine for this) and export as PNG or JPEG.

## Step 2: Generate the 3D Model

Upload your four views to an AI image-to-3D generator using multi-view mode (front, back, left, right). Generate the model, then **export at 1K–2K texture resolution** — smaller textures mean faster load times on the web. Save it as a GLB file.

## Step 3: Build the Website Structure in Claude

Open Claude, switch to **Code**, and create a new project folder. Describe your layout. Example prompt:

> Create a website where the page doesn't scroll — everything is pinned on screen, and scrolling drives the animation from scene one to scene two. Scene one: a giant bold headline. Scene two: a second headline. On scroll, the headline letters scatter and fly upward.

## Step 4: Add the 3D Model and Animation

Drag your GLB file into the project along with a reference video of the animation you want (Claude can now watch videos, not just images). Then prompt:

> Use this GLB file and animate it in the website as shown in the reference video. Implement it with Three.js.

Specify your fonts too — Google Fonts (like Passion One for headlines, Inter for body text) need no links or files.

## Step 5: Fix Dark 3D Renders (Common Issue)

Claude often renders GLB models dark and muddy. The fix is one line:

> Apply tone mapping — without it, the model renders dark and muddy.

That's it. You now have an interactive, scroll-animated 3D website that would've taken an agency months.

## Bonus: Market It on X (Twitter)

Building is only half the job. Record a screen capture of your live site, scroll through it so people see it's real, and post it with a simple caption like “Built this with Claude and Three.js.” Keep it short — overloaded captions kill reach. Tag one account maximum.

Tag **@viktoroddy** — if your design is accepted into MotionSites, you get **free lifetime access**.

## FAQ

**Do I need to know how to code?**

No. Claude writes all the Three.js code. You describe the layout and animations in plain language.

**What file format should the 3D model be?**

GLB, exported at 1K–2K textures for fast web performance.

**Why does my 3D model look dark on the website?**

Missing tone mapping — a common issue with AI-generated Three.js scenes. Ask Claude to apply tone mapping.

**Can I skip the design step?**

Yes. Copy ready-made prompts and code from the MotionSites library and customize from there.
