# Velorah Focus (`velorah-focus-hero`)

- **ID:** `velorah-focus-hero`
- **Category:** Social Media
- **Type:** `social-media` (Page Type: `hero`, Tags: `social-media`)
- **Tier:** Premium
- **Video / Animated Preview:** https://motionsites.ai/assets/hero-velorah-focus-preview-Boo7l3W4.gif
- **Poster / Image Preview:** https://motionsites.ai/assets/hero-velorah-focus-poster-DahOTE6J.png
- **Live URL:** `https://motionsites.ai/?prompt=velorah-focus-hero`

## Visual & Architectural DNA (`design_similarity`)

> portrait social media card format black page centered vertical frame vhs noise fractal grain overlay analog retro texture looping video inside rounded bordered frame moody nostalgic filmic intimate stylized dark atmospheric

## Complete Verbatim Build Prompt
*Source: Supabase Public Search Index (prompts_public.search_keywords)*

```markdown
Social meida post #1 (on the left)
Create a React application that displays a stylized, 3:4 aspect ratio social media post/landing page. The app must exactly match the following specifications, layout, animations, and CSS effects:
1. Layout & Structure:
Main Container: Full screen, black background (min-h-screen bg-black), centering its child content.
Social Frame: A centered container measuring exactly 600px wide by 800px high (w-[600px] h-[800px]). It should have a subtle white border (border-white/10), rounded corners (rounded-2xl), hidden overflow, and a heavy drop shadow.
Video Background: An absolute-positioned, full-cover HTML <video> element playing continuously in the background (autoplay, loop, muted, playsInline).
Exact Video URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_110052_2e127257-5236-40b1-ba48-4690260f1185.mp4
2. Visual Effects & Overlays (Critical Custom CSS):
Add the following visual layers exactly as described using custom CSS in index.css:
VHS Noise: An absolute full-cover div using an inline SVG fractal noise filter as its background image, with mix-blend-mode: overlay, opacity: 0.15, and a 0.2s step-keyframe animation to simulate static.
VHS Scanlines: A repeating linear gradient over the entire frame (50% transparent, 50% slight black transparent) with a background size of 100% 4px.
VHS Glitch Bar: A 40px tall horizontal bar that moves from top to bottom continuously over 4 seconds (top: -10% to top: 110%). It should have a backdrop blur of 2px, a 5deg hue rotation, and subtle white top/bottom borders.
RGB Text Glitch: A custom CSS animation (rgb-text-glitch) that applies a flickering text-shadow consisting of offset red (rgba(255, 0, 0, 0.5)) and cyan (rgba(0, 255, 255, 0.5)).
3. Typography:
Import two Google Fonts: Instrument Serif (for headings and logo) and Inter (for body text and buttons). Map these to Tailwind's font-serif and font-sans.
4. Content Elements (Centered over the video, shifted slightly up by -mt-[180px]):
Headline: "Focus in a<br/>Distracted World". Uses Instrument Serif, text size 64px, tight leading, tight tracking (tracking-[-2.46px]), animated to fade and rise upwards, and applying the rgb-text-glitch effect.
Subtext: "We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work." Uses Inter, text size 17px, max-width 480px, delayed fade-rise animation, and applies the rgb-text-glitch effect.
Button: Text reads "Begin Journey". Uses Inter, 15px. Add a custom .liquid-glass CSS class. The liquid glass effect uses background: rgba(255, 255, 255, 0.01), a luminosity mix-blend-mode, 4px backdrop blur, and an advanced mask-composite border gradient trick to simulate a sleek glass edge. Add a slight hover scale effect.
Footer Logo: Positioned absolutely at the bottom center. Reads "Velorah" in Instrument Serif, size 3xl, with a small superscript trademark symbol ®. Applies the rgb-text-glitch effect.
5. Animations:
Implement a @keyframes fade-rise going from opacity: 0, translateY(24px) to opacity: 1, translateY(0).
Apply staggered animation classes to the headline (0s delay), paragraph (0.2s delay), and button (0.4s delay) so they slide in smoothly upon load.
Please write the complete React component (src/App.tsx) and the accompanying CSS stylesheet (src/index.css) utilizing standard React and Tailwind classes alongside the specific custom CSS for the VHS, glitch, and glassmorphism effects.
```
