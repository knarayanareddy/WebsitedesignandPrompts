# Space Voyage (`space-voyage`)

- **ID:** `space-voyage`
- **Category:** Creative
- **Type:** `hero` (Page Type: `hero`, Tags: `hero`)
- **Tier:** Free (Unlocked)
- **Creator:** Sean Galt (@seanaiux)
- **Video / Animated Preview:** https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/space-voyage-video.mp4
- **Poster / Image Preview:** https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260914_124045_18663f83-33f3-40f6-821e-40c2a71e41a6.png&w=1920&q=85
- **Live URL:** `https://motionsites.ai/?prompt=space-voyage`

## Visual & Architectural DNA (`design_similarity`)

> planet-jumping-space-portal;immersive space travel planetary exploration cinematic sci-fi experience solar system interplanetary navigation mars earth venus mercury futuristic portal interface full-screen video background celestial travel cosmic discovery astronomy educational experience dark space aesthetic black cinematic backdrop white typography giant condensed planet title oversized mars wordmark immersive storytelling canvas-driven portal rounded-rectangle window fake-3d perspective cursor tilt screen-locked media parallax mask travel transition expanding portal cinematic wipe

## Complete Verbatim Build Prompt
*Source: Supabase Edge Function (get-prompt)*

```markdown
# Build: "Planet Jumping" — single-page immersive space portal experience

Create a SINGLE self-contained HTML file (inline <style> and <script>, no build step,
no external JS/CSS libraries). It must render a full-viewport cinematic landing
experience with a canvas-driven 3D "portal" and a video preloader sequence.

====================================================================
1. REMOTE ASSETS — use these EXACT URLs (do not substitute)
====================================================================
BASE = https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P

MARS_BG   (video) = BASE/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4
TO_EARTH  (video) = BASE/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4
TO_VENUS  (video) = BASE/b30f64d9-1637-477a-83df-d0fc6461a422.mp4
TO_MARS   (video) = BASE/5fc5651c-3b5d-4171-b507-87f7e635d1b4.mp4
MERCURY   (image) = BASE/d6fb8b6b-c15e-4aaa-9cf7-45bbb5e33372.jpg
LOGO      (svg)   = BASE/eb7e0f53-50cd-4af5-abc4-8b9a52cdc01b.svg

All <video> tags: muted, playsinline, preload="auto". No controls, no autoplay
attribute (playback is driven by JS).

====================================================================
2. FONTS
====================================================================
Declare four @font-face rules (load from local files if present, otherwise the
fallback stacks below must still produce the correct layout):
  - "SF Pro"      weight 400  -> fallback: Arial, sans-serif
  - "SF Pro"      weight 700
  - "SF Pro Thin" weight 100  -> fallback: 'SF Pro', Arial, sans-serif
  - "Aalto"       weight 400  -> fallback: 'Arial Narrow', sans-serif
                                 (a tall condensed display face; used ONLY for the
                                  giant planet title)
:root { font-family:'SF Pro',Arial,sans-serif; color:#fff; background:#090807;
        font-synthesis:none }

====================================================================
3. DOM STRUCTURE (exact ids/classes — the JS depends on them)
====================================================================
<main class="experience" data-planet="mars">
  <div class="backgrounds" aria-hidden="true">
    <video id="mars-background"  class="background is-visible" src=MARS_BG>
    <video id="earth-background" class="background"            src=TO_EARTH>
    <video id="venus-background" class="background"            src=TO_VENUS>
  </div>
  <div class="preloader" id="preloader" aria-label="Loading Mars">
    <video id="preloader-video" src=TO_MARS>
    <div class="preloader-shade"></div>
  </div>
  <img class="floating-logo" id="floating-logo" src=LOGO alt="Ubernatural">
  <div class="preloader-count" id="preloader-count" aria-live="polite">
    <span id="preloader-value">0</span><span class="percent">%</span>
  </div>
  <canvas id="scene-canvas" class="scene-canvas" aria-hidden="true"></canvas>
  <div class="shade" aria-hidden="true"></div>

  <header class="header chrome">
    <div class="header-actions">
      <nav class="nav" aria-label="Primary navigation">
        <a class="active" href="#about">About</a><a href="#explore">Explore</a><a href="#planets">Planets</a>
      </nav>
      <button class="menu" type="button">Menu</button>
    </div>
  </header>

  <aside class="planet-list chrome" aria-label="Planets"></aside>   <!-- JS-filled -->

  <canvas id="portal-canvas" class="portal-canvas" aria-hidden="true"></canvas>
  <section class="portal-wrap chrome" aria-label="Next destination">
    <div class="portal-heading">
      <span>Next:</span>
      <span><span id="next-number">[03]</span> <strong id="next-name">Earth</strong></span>
    </div>
    <button class="portal" id="portal" type="button" aria-label="Travel to Earth">
      <video id="portal-video" src=TO_EARTH>
      <img id="portal-image" src=MERCURY alt="Mercury">
    </button>
  </section>

  <section class="planet-content chrome" aria-live="polite">
    <h1 id="planet-title">MARS</h1>
    <dl id="facts"></dl>                                           <!-- JS-filled -->
  </section>

  <div class="transition-layer" aria-hidden="true"><video id="transition-video"></video></div>
  <div class="loading" aria-hidden="true">Preparing orbit…</div>
  <div class="custom-cursor" aria-hidden="true">
    <span class="cursor-orbit"></span><span class="cursor-dot"></span><span class="cursor-label">Enter</span>
  </div>
</main>

====================================================================
4. DATA MODEL
====================================================================
planets = ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune']

states = {
 mars:  { name:'Mars',  next:'Earth',   number:'[03]', portal:TO_EARTH,  background:'mars-background',
   facts:[['Distance:','About 228 million km (1.5 astronomical units).'],
          ['Year:','One Martian year is equal to 687 Earth days.'],
          ['Temperature:','Around -60 °C, dropping to -125 °C at the poles in winter.'],
          ['Atmosphere:','Very thin, consisting of 95% carbon dioxide, with frequent dust storms.']] },
 earth: { name:'Earth', next:'Venus',   number:'[02]', portal:TO_VENUS,  background:'earth-background',
   facts:[['Distance:','149.6 million km from the Sun.'],
          ['Year:','365.25 Earth days.'],
          ['Temperature:','Average surface temperature around 15 °C.'],
          ['Atmosphere:','Mostly nitrogen and oxygen, supporting life and liquid water.']] },
 venus: { name:'Venus', next:'Mercury', number:'[06]', image:MERCURY,    background:'venus-background',
   facts:[['Distance:','108.2 million km from the Sun.'],
          ['Year:','225 Earth days.'],
          ['Temperature:','Around 465 °C — the hottest planet in the Solar System.'],
          ['Atmosphere:','Extremely dense, mostly carbon dioxide, with clouds of sulfuric acid.']] }
}
Start state: 'mars'. Chain: mars -> earth -> venus (terminal; clicking at venus does nothing).

render() must: set data-planet; set #planet-title to name.toUpperCase(); set #next-name
and #next-number; set portal aria-label to `Travel to ${next}`; build #facts as
<div class="fact"><dt>KEY</dt><dd>VALUE</dd></div>; build .planet-list as
<span class="planet-item [active]">Name</span> for all 8 planets (active = current);
on every re-render after the first, retrigger .is-switching on .planet-list (remove
class, force reflow via offsetWidth, re-add); toggle .is-visible on the matching
.background video; show #portal-image / hide #portal-video when the state has `image`,
otherwise the inverse, swapping #portal-video.src to state.portal when it differs.

====================================================================
5. LAYOUT CSS (exact values)
====================================================================
*{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden}
.experience{position:relative;width:100%;height:100%;min-height:540px;overflow:hidden;background:#0a0908}
.backgrounds,.background,.shade,.transition-layer,.transition-layer video{position:absolute;inset:0;width:100%;height:100%}
.background{object-fit:cover;opacity:0;transition:opacity .8s ease} .background.is-visible{opacity:1}
.shade{z-index:1;background:linear-gradient(to bottom,transparent 52%,rgba(0,0,0,.88) 100%);pointer-events:none}
.chrome{position:absolute;z-index:4;transition:opacity .45s ease,filter .45s ease}
.experience.is-transitioning .chrome{opacity:0;filter:blur(8px);pointer-events:none}

HEADER  .header{left/right:clamp(18px,1.95vw,28px);top:clamp(18px,3.1vh,28px);display:flex;justify-content:space-between;align-items:center}
        .header-actions{margin-left:auto;display:flex;align-items:center}
        .nav{display:flex;align-items:center;height:42px;padding:4px 5px;border:1px solid rgba(255,255,255,.45);
             background:rgba(255,255,255,.1);backdrop-filter:blur(12px);border-radius:999px}
        .nav a{color:#fff;text-decoration:none;padding:8px 19px;border-radius:999px;line-height:1}
        .nav a.active{background:#fff;color:#000}
        .menu{height:42px;padding:0 20px;border:0;border-radius:999px;background:#fff;color:#000;cursor:pointer}

SIDEBAR .planet-list{left:clamp(18px,1.95vw,28px);top:50%;transform:translateY(-43%);display:flex;flex-direction:column;gap:6px;font-size:16px}
        .planet-item{display:flex;align-items:center;min-height:20px}
        .planet-item.active{font-size:18px;font-weight:700;gap:8px}
        .planet-item.active:before{content:'';width:16px;height:16px;border-radius:50%;background:#fff}

PORTAL  .portal-wrap{left:50%;top:50%;width:min(320px,31vw);transform:translate(-50%,-54%);perspective:none}
        .portal-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:16px;opacity:0}
        .portal-heading strong{font-size:18px;margin-left:8px}
        .portal{position:relative;display:block;width:100%;aspect-ratio:320/350;padding:0;overflow:visible;border:0;
                border-radius:90px;background:transparent;cursor:pointer;box-shadow:none;transform:none!important}
        .portal video,.portal img{visibility:hidden;position:absolute;width:1px;height:1px;pointer-events:none}
        .portal-canvas{position:fixed;inset:0;z-index:3;width:100%;height:100%;pointer-events:none}
        (The real media elements are INVISIBLE — they exist only as pixel sources the canvas samples.)

CONTENT .planet-content{left:clamp(28px,4vw,58px);right:clamp(28px,3vw,44px);bottom:clamp(24px,3vh,30px);
                        display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
        .planet-content h1{font-family:Aalto,'Arial Narrow',sans-serif;font-size:clamp(128px,21.8vw,314px);
          font-weight:400;line-height:.72;margin:0 0 -.04em;letter-spacing:0;transform:translateX(-32px);opacity:0}
        .planet-content dl{width:min(447px,34vw);margin:0;font-size:16px}
        .fact{display:grid;grid-template-columns:138px 1fr;gap:18px;padding:8px 0;
              border-bottom:1px solid rgba(255,255,255,.48);opacity:0}
        .fact:last-child{border-bottom:0} .fact dt{font-weight:700} .fact dd{margin:0}

MISC    .transition-layer{display:none} .scene-canvas{display:none}
        .loading{position:absolute;z-index:12;left:50%;bottom:30px;transform:translateX(-50%);opacity:0;
                 font-size:12px;letter-spacing:.14em;text-transform:uppercase;transition:opacity .2s}
        .experience.is-loading .loading{opacity:.8}
        .experience.is-transitioning .header,.experience.is-transitioning .planet-list{opacity:1;filter:none;pointer-events:auto}
        .experience.is-transitioning .shade{opacity:1}
        .experience.is-committing .background{transition:none!important}

====================================================================
6. PRELOADER (the first ~3 seconds)
====================================================================
.preloader{position:absolute;inset:0;z-index:20;background:#000;overflow:hidden}
.preloader video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.preloader-shade{position:absolute;inset:auto 0 0;height:35%;background:linear-gradient(to bottom,transparent,#000)}
.preloader.is-background{z-index:0} .preloader.is-background .preloader-shade{opacity:0}
.floating-logo{position:fixed;z-index:22;left:50%;top:50%;width:59px;height:58px;transform:translate(-50%,-50%);
  will-change:left,top,width,height,transform;
  transition:left 2s cubic-bezier(.16,1,.3,1),top 2s ...,width 2s ...,height 2s ...,transform 2s ...}
.floating-logo.is-docked{left:clamp(18px,1.95vw,28px);top:clamp(18px,3.1vh,28px);width:37px;height:36px;transform:none}
.floating-logo.is-settled{z-index:5}
.preloader-count{position:fixed;z-index:22;left:50%;bottom:clamp(22px,3.1vh,28px);display:flex;align-items:flex-end;
  gap:4px;transform:translateX(-50%);font-family:'SF Pro',Arial,sans-serif;line-height:1}
.preloader-count>span:first-child{font-family:'SF Pro Thin','SF Pro',Arial,sans-serif;font-size:64px;font-weight:100}
.preloader-count .percent{font-size:24px;padding-bottom:4px}
.preloader-count.is-leaving{animation:preload-count-out .75s cubic-bezier(.22,1,.36,1) both}
@keyframes preload-count-out{to{opacity:0;filter:blur(7px);transform:translate(-50%,-34px)}}
body:not(.preload-complete) .custom-cursor{opacity:0!important}

Behaviour: once #preloader-video metadata is ready, set
  video.playbackRate = Math.max(.25, video.duration / 3)      // sequence lasts ~3s
then play(). On each rAF write Math.round(currentTime/duration*100) into
#preloader-value. On 'ended' (or if play() rejects) run finish() ONCE:
  value = '100'; add .is-leaving to #preloader-count; add .is-docked to the logo
  (it flies from screen centre to the header slot over 2s); add .is-background to
  #preloader; add .preload-complete to body; call startExperience();
  remove the counter after 750ms; add .is-settled to the logo after 2000ms.

startExperience(): await the current portal media being loadable -> await
revealMask() -> add .intro-ready to body -> after 850ms call revealPlanetContent().

====================================================================
7. THE PORTAL — canvas mask with fake 3D (core mechanic, be precise)
====================================================================
A fixed full-screen canvas (#portal-canvas) paints a rounded-rectangle "window"
through which the portal media is visible. The media is drawn SCREEN-LOCKED in
cover mode, so the shape moves over a stationary image (parallax window, NOT a
textured card).

resizeCanvas(): d = Math.min(devicePixelRatio||1, 2); canvas.width = innerWidth*d;
canvas.height = innerHeight*d; CSS size = innerWidth/innerHeight px;
ctx.setTransform(d,0,0,d,0,0). Mirror the same for #scene-canvas unless a frozen
frame is being held. Re-run on resize.

drawCover(media): mw/mh = videoWidth||naturalWidth etc; scale = Math.max(innerWidth/mw,
innerHeight/mh); draw centered at ((innerWidth-w)/2,(innerHeight-h)/2,w,h).

Pointer tilt (skipped while busy):
  targetY = (clientX/innerWidth - .5) * 37.4
  targetX = (clientY/innerHeight - .5) * -33
  on pointerleave -> both 0
Per frame (dt clamped to 40ms):
  rotX += (targetX-rotX) * Math.min(1, dt*.009)   // same for rotY

Rounded-rect point sampling: for each of the 4 corners walk the arc in 10 steps,
producing ~44 points of a w×h rect with corner radius r (r clamped to w/2,h/2),
in local coords centred on origin. Corner arc ranges:
  [ w/2-r, -h/2+r, -PI/2, 0 ] [ w/2-r, h/2-r, 0, PI/2 ]
  [-w/2+r,  h/2-r,  PI/2, PI ] [-w/2+r,-h/2+r, PI, PI*1.5 ]

Projection (fake perspective, focal 850):
  ax = rx*PI/180; ay = ry*PI/180
  xx = x*cos(ay); yy = y*cos(ax); z = x*sin(ay) - y*sin(ax); p = 850/(850+z)
  screen = [ cx + xx*p, cy + yy*p ]

Frame loop:
  clear; if a frozen scene exists, blit #scene-canvas full-screen then drawShade()
  rect = #portal.getBoundingClientRect(); e = expansion (0..1)
  cx = rectCx + (innerWidth/2  - rectCx)*e
  cy = rectCy + (innerHeight/2 - rectCy)*e
  baseW = rect.width  + (innerWidth  - rect.width )*e
  baseH = rect.height + (innerHeight - rect.height)*e
  scale = e ? 1 : maskScale;  w = baseW*scale; h = baseH*scale
  r  = 90*(1-e)*scale;  rx = rotX*(1-e);  ry = rotY*(1-e)
  if (w>1 && h>1): build the projected path, ctx.save(), globalAlpha = canvasOpacity,
    clip(), fill '#030303' over the viewport, drawCover(transitionActive ? transitionVideo
    : (state.image ? portalImage : portalVideo)), if transitionActive drawShade(), restore()
So at e=0 you see a tilting rounded window; as e->1 it grows to fill the screen and
the corner radius and tilt both relax to 0.

drawShade(ctx): linear gradient from y=innerHeight*.52 (rgba(0,0,0,0)) to
y=innerHeight (rgba(0,0,0,.88)), filled over the bottom 48% of the viewport.

====================================================================
8. TRAVEL TRANSITION (click the portal)
====================================================================
Easing used everywhere in JS: t<.5 ? 4t³ : 1 - Math.pow(-2t+2,3)/2   (easeInOutCubic)
animateValue(setter, duration) drives a value 0->1 over rAF with that easing.

travel():
  guard: return if busy or current === 'venus'; set busy, zero the tilt targets
  next = current === 'mars' ? 'earth' : 'venus'
  #transition-video.src = states[current].portal; load(); add .is-loading
  await canplaythrough (or 'error', or a 1600ms timeout — whichever first)
  remove .is-loading/.content-revealing/.mask-revealing; add .is-transitioning
  currentTime=0; playbackRate = 1.3; canvasOpacity=1; transitionActive=true; await play()
  await animateValue(v => expansion = v, 1100)      // window swallows the screen
  await the video's 'ended'
  freeze its final frame into #scene-canvas (clear, drawCover into that context)
  current = next; add .is-committing; render(); await two rAFs
  transitionActive=false; expansion=0; maskScale=0; canvasOpacity=1
  remove .is-transitioning/.is-committing
  maskReveal = revealMask(); after 100ms revealPlanetContent(); await maskReveal
  after 450ms: drop the transition src, load(), busy=false
  On any throw: reset transitionActive=false, expansion=0, maskScale=1, canvasOpacity=1,
  strip the three state classes, busy=false.

revealMask(): retrigger .mask-revealing on .experience (remove -> offsetWidth -> add),
maskScale=0, then animateValue(v => maskScale = v, 1050).
revealPlanetContent(): retrigger .content-revealing the same way.

====================================================================
9. CUSTOM CURSOR
====================================================================
html,body,button,a,.portal{cursor:none!important}
.custom-cursor{display:block;position:fixed;left:0;top:0;z-index:100;width:1px;height:1px;
  pointer-events:none;opacity:0;transition:opacity .2s ease}
.custom-cursor.is-visible{opacity:1}
.cursor-dot,.cursor-orbit{position:absolute;left:0;top:0;border-radius:50%;transform:translate(-50%,-50%)}
.cursor-dot{width:12px;height:12px;background:#fff}
.cursor-orbit{width:36px;height:36px;border:1px solid #fff;background:rgba(255,255,255,.4);
  transition:transform .3s cubic-bezier(.22,1,.36,1)}
.custom-cursor.is-enter .cursor-orbit{transform:translate(-50%,-50%) scale(1.16)}
.cursor-label{position:absolute;top:26px;left:0;transform:translateX(-50%) translateY(-4px);
  font:16px/1.2 'SF Pro',Arial,sans-serif;white-space:nowrap;opacity:0;
  transition:opacity .2s ease,transform .3s cubic-bezier(.22,1,.36,1)}
.custom-cursor.is-enter .cursor-label{opacity:1;transform:translateX(-50%) translateY(0)}
JS: track pointer, lerp orbit position by 0.2 per frame, apply via
translate3d(x,y,0); add .is-visible on first move, remove on document mouseleave;
add/remove .is-enter on portal pointerenter/pointerleave.

====================================================================
10. ENTRANCE / SWITCH ANIMATIONS
====================================================================
body:not(.intro-ready) .header,.planet-list,.planet-content h1,.planet-content .fact{opacity:0}
.intro-ready .header       { animation:reveal-down .9s cubic-bezier(.22,1,.36,1) .1s both }
.intro-ready .planet-list  { animation:reveal-side .9s cubic-bezier(.22,1,.36,1) .65s both }
.content-revealing h1      { animation:title-rise 1.05s cubic-bezier(.16,1,.3,1) both }
.content-revealing .fact   { animation:fact-rise .72s cubic-bezier(.22,1,.36,1) both }
   .fact delays: 1)=.52s 2)=.68s 3)=.84s 4)=1s
.mask-revealing .portal-heading { animation:portal-caption .85s cubic-bezier(.22,1,.36,1) both }
.planet-list.is-switching .planet-item { animation:menu-row .58s cubic-bezier(.22,1,.36,1) both }
   item delays: .02 .05 .08 .11 .14 .17 .2 .23s
.planet-list.is-switching .planet-item.active:before { animation:active-dot .55s cubic-bezier(.22,1,.36,1) .18s both }

@keyframes reveal-down   {from{opacity:0;filter:blur(8px);transform:translateY(-18px)}      to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes reveal-side   {from{opacity:0;filter:blur(8px);transform:translate(-20px,-43%)}  to{opacity:1;filter:blur(0);transform:translate(0,-43%)}}
@keyframes title-rise    {from{opacity:0;filter:blur(12px);transform:translate(-32px,42px)} to{opacity:1;filter:blur(0);transform:translate(-32px,0)}}
@keyframes fact-rise     {from{opacity:0;filter:blur(7px);transform:translateY(18px)}       to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes portal-caption{from{opacity:0;filter:blur(7px);transform:translateY(22px)}       to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes menu-row      {from{opacity:.35;transform:translateX(-8px)}                      to{opacity:1;transform:translateX(0)}}
@keyframes active-dot    {from{opacity:0;transform:scale(0)}                                to{opacity:1;transform:scale(1)}}

====================================================================
11. RESPONSIVE
====================================================================
@media(max-width:900px){
  .nav{display:none}
  .portal-wrap{width:min(300px,48vw)}
  .planet-content h1{font-size:clamp(105px,24vw,190px)}
  .planet-content dl{width:43vw}
  .fact{grid-template-columns:110px 1fr}
  .planet-list{font-size:14px} .planet-item.active{font-size:16px}
}
@media(max-width:640px){
  .experience{min-height:600px}
  .planet-list{display:none}
  .portal-wrap{top:44%;width:min(260px,66vw)}
  .planet-content{left:18px;right:18px;bottom:18px;display:block}
  .planet-content h1{font-size:clamp(98px,30vw,160px);margin-bottom:20px}
  .planet-content dl{width:100%;font-size:13px}
  .fact{grid-template-columns:92px 1fr;padding:5px 0}
  .portal-heading{font-size:14px} .portal-heading strong{font-size:16px}
  .menu{height:38px} .portal{border-radius:70px}
}
@media(prefers-reduced-motion:reduce){*{transition-duration:.01ms!important}.portal{transform:none!important}}
On touch devices the tilt simply stays at 0 (no pointermove); tapping the portal
must still trigger the full travel sequence, and the canvas mask must still be
sized from the portal's live bounding rect so it lines up at every breakpoint.

====================================================================
12. BOOT ORDER (last lines of the script)
====================================================================
pause + rewind every .background video; resizeCanvas(); render();
requestAnimationFrame(draw); requestAnimationFrame(cursorLoop); runPreloader();

====================================================================
13. ACCEPTANCE CHECKLIST
====================================================================
[ ] Black screen -> Mars approach video plays for ~3s with a thin 0–100% counter
    bottom-centre and the logo floating dead-centre.
[ ] At 100% the counter blurs upward away, the logo glides to the top-left header
    slot over 2s, header fades down, planet list slides in from the left.
[ ] A rounded-rectangle window (radius 90px) grows open in the centre revealing the
    Earth-approach footage; the window tilts toward the pointer (max ~±18.7°/16.5°)
    with smooth easing while the footage behind it stays screen-locked.
[ ] "MARS" renders huge in the condensed display face bottom-left; four fact rows
    rise in with a stagger; "Next: [03] Earth" sits above the portal.
[ ] Clicking the portal blurs out the chrome, plays the transition at 1.3× while the
    window expands to fill the viewport, freezes the last frame, commits to Earth
    ("Next: [02] Venus"), and re-opens the mask on the new state.
[ ] Earth -> Venus works the same; at Venus the portal shows the Mercury still image
    and further clicks are ignored.
[ ] Custom cursor (12px dot + 36px translucent ring) follows with easing everywhere;
    ring scales 1.16× and the word "Enter" fades in over the portal.
[ ] No scrollbars at any size; layout holds at 375px, 768px and 1440px wide.
[ ] Zero console errors; no external libraries.
```
