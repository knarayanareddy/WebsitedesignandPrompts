# GetLayers AI — Starter Workflow & AI Design Vault Prompts

These are the official foundational system prompts extracted from GetLayers AI (`textura-agency`) for setting up Next.js 16 + Claude/Cursor projects and enforcing the AI Design Vault specification.

---

## 1. Next.js 16 + Claude Starter Prompt (`starterPrompt`)

> **Copy and paste this directly into your AI coding assistant (Claude Code, Cursor, Antigravity, Windsurf):**

```text
Please clone https://github.com/textura-agency/next16-claude-starter and set it up as a fresh project. Remove connection to the current git and init a new one. Read the obsidian/ vault first (it's the single source of truth) — the README inside it tells you where everything lives. Look at how existing components are structured, where tokens live, and how motion is written. Copy .env.example to .env, then yarn dev.
```

---

## 2. AI Design Vault Prompt (`vaultPrompt`)

> **Use this to attach the GetLayers design system & motion rules to any existing repository:**

```text
Please clone https://github.com/textura-agency/ai-design-vault into this project as a reference vault — do not restructure the app around it. Read its README first; it is the map. From then on, follow its notes on layout, typography, colour, motion and tone for every change you make. Treat the vault as the law for how this product looks and feels.
```

---

## 3. Universal GetLayers Motion & Architecture System Prompt

When converting any single-file HTML GetLayers prompt into a multi-file Next.js / React / Astro application, include this instruction:

```text
You are an expert creative front-end developer.
Follow these non-negotiable engineering rules:
1. Motion is strictly spring-driven (hooke's law: tension, friction, velocity) or driven by a shared requestAnimationFrame ticker synced with Lenis smooth scroll. Avoid linear CSS transitions for layout or spatial movement.
2. WebGL canvases must run at capped devicePixelRatio (Math.min(window.devicePixelRatio, 2)), resize cleanly via ResizeObserver, and pause rendering when offscreen via IntersectionObserver.
3. Glassmorphic surfaces must use layered hairlines (1px solid rgba(255,255,255,0.08)), subtle radial pointer-tracking border glows, and backdrop-filter blur.
4. Typography uses tight display tracking (-0.03em to -0.05em) for headlines, balanced line-wraps, and tabular-nums for all live counters, telemetry, and pricing readouts.
```
