Build a single full-screen hero section as a self-contained component. Dark luxury car-rental theme. Do NOT add any extra sections, components, or content beyond what is described.

BACKGROUND VIDEO
- Full-bleed background video covering the entire hero (position: absolute; inset: 0; width/height 100%; object-fit: cover; object-position: center 60%; pointer-events: none).
- Source URL: https://cdn.sceneai.art/Hero section video file (2)/37091057-3719-4207-815c-745ebf57aeb4.mp4
- The video must autoplay ALWAYS and NEVER stop: muted, looping, playsInline, preload auto, no scroll-scrubbing.
- Enforce continuous playback with JS: call play() on mount, and re-call play() on every "pause", "ended", "loadedmetadata", and "canplay" event, on document "visibilitychange" (tab re-focus), and via a 1-second watchdog interval that resumes the video whenever it is paused. Swallow any play() promise rejection. Clear the interval on unmount.
- Over the video, add a top-to-bottom dark gradient overlay for legibility: linear-gradient(180deg, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.15) 30%, rgba(8,8,10,0.25) 55%, rgba(8,8,10,0.92) 100%).

LAYOUT
- Section: position relative, width 100%, height 100vh, min-height 720px, overflow hidden, background #0a0a0b.
- Lock horizontal scroll globally: html, body { overflow-x: hidden; max-width: 100vw }.
- Font: Archivo (Google Fonts). Global reset (margin/padding 0, box-sizing border-box). Links: no underline, inherit color, hover #fff.

NAVBAR (top, z-index 3, flex space-between, padding 34px 56px)
- Left group: links Home / About / Cars / Contact, 14px, weight 500, color rgba(255,255,255,0.82), gap 42px; "Home" active (white with 2px white bottom border, padding-bottom 3px).
- Then text logo "VELORA": #fff, 26px, weight 700, letter-spacing 0.04em (no icon).
- Right: "Browse cars →" button — background rgba(255,255,255,0.08), 1px solid border rgba(255,255,255,0.2), color #FAF9F5, 14px, weight 600, padding 11px 20px, border-radius 10px, gap 10px, arrow span 15px; hover background #e9e9ec.

GIANT HEADLINE (absolute, top 92px, full width, centered, z-index 2)
- Text: "REGAL DRIVE", weight 800, line-height 0.9, letter-spacing -0.03em, white-space nowrap.
- Fully responsive font-size: 13.3vw (scales purely with frame width — no min/max cap, shrinks on mobile/tablet).
- White-to-grey vertical gradient fill: linear-gradient(180deg, #ffffff 55%, #b8b8bd 100%) clipped to text (transparent fill).

BOTTOM-LEFT HERO COPY (absolute, left 56px, bottom 56px, z-index 3, max-width 620px)
- Heading: "Rent Your Dream Luxury Car Today" — #fff, weight 600, font-size clamp(38px, 5.8vw, 66px), line-height 0.98, letter-spacing -0.02em.
- Paragraph: "Enjoy a premium rental experience with exclusive cars, seamless booking, and honest pricing." — color rgba(255,255,255,0.82), 15px, weight 400, line-height 1.5, max-width 480px, margin-top 18px.
- Button "DISCOVER NOW ↗": glass style — background rgba(255,255,255,0.08), 1px border rgba(255,255,255,0.2), backdrop-blur 6px, color #fff, 14px, weight 600, letter-spacing 0.04em, padding 13px 24px, border-radius 10px, gap 12px, arrow span 15px, margin-top 32px; hover fills solid white with dark text (#0a0a0b) and white border.
