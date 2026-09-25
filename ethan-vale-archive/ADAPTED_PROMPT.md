# Adapted AI Prompt: Ethan Vale 3D Spatial Photography Archive

> **Prompt Category:** 3D Web Design / Spatial UI / Fibonacci Sphere / Vanilla Modern Web  
> **Target Engine:** Single-file Vanilla HTML5, CSS3 3D Transforms, Hardware Acceleration, Vanilla ES6+  
> **Output:** Completely self-contained `index.html` (Zero external JS/CSS libraries, zero build tools)

---

## 🎯 Verbatim Master Prompt

Copy and paste the block below into any advanced coding AI agent (such as Antigravity, Claude 3.7 Sonnet, GPT-4.5, or Cursor) to reproduce or customize this interactive 3D spherical archive.

```markdown
Build one self-contained index.html. No frameworks, no bundler, no external CSS or JS. All styling lives in one <style> block and all behavior in one <script> at the end of <body>. Match this page exactly: a black wildlife-photography archive for Ethan Vale. Do not redesign, rename classes, substitute fonts, or swap asset URLs.

DOCUMENT
- <!DOCTYPE html>, lang="en"
- charset utf-8
- viewport: width=device-width, initial-scale=1, viewport-fit=cover
- <title>Ethan Vale — I See Through the Wild</title>
- meta description: Wildlife photography archive by Ethan Vale. Field notes from natural encounters, captured without intervention.
- preconnect https://fonts.googleapis.com and https://fonts.gstatic.com (crossorigin)
- Google Fonts stylesheet, exactly:
  https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap
- <body class="locked">

FONTS
- Serif: "Playfair Display", "Times New Roman", serif. Used for wordmark, splash mark, photographer name, sphere headline, lightbox title, grid captions, menu links. Weight 400. The <em> inside the wordmark is font-style:normal (it does not italicize).
- Sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif. Body weight 300. Antialiased.

COLORS AND TOKENS (set on :root)
- --bg:#000
- --ink:#f4f2ef
- --dim:#8c8783
- --line:rgba(244,242,239,.28)
- --pad:clamp(14px, 2.6vw, 34px)
- --ease:cubic-bezier(.22,.61,.36,1)
- --hw:min(56vw, 640px)
- --persp:1150px (JS overwrites this per breakpoint)
- --safe-top/right/bottom/left from env(safe-area-inset-*)
- --tap:44px
- html background #000 and scrollbar-gutter:stable (unlocking the page must not shift the cards)
- body: bg black, color ink, overflow-x hidden, min-height 100vh and 100dvh, overscroll-behavior-y:none
- body.locked: overflow hidden, height 100vh and 100dvh
- img display block, max-width 100%
- buttons: inherit font/color, no background, no border, pointer, tap highlight transparent, touch-action manipulation
- links: tap highlight transparent

ASSETS — USE THESE URLS EXACTLY
Intro film (CloudFront, muted, playsinline, autoplay, preload auto, disablepictureinpicture), playbackRate 2:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_195107_ed3f055a-3a13-4a71-b743-e10310454246.mp4

CDN base:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/
Thumbnail: {CDN}{id}_min.webp
Full still: {CDN}{id}.png

Avatar id (also shot 21):
hf_20260922_194417_a455843c-d8db-461c-8ef6-74a325d2472c

21 stills, in this order. Only "Left Behind" is tall (portrait card). Each record is id, title, place, note.

1. hf_20260922_194349_26ffdbfd-ac5e-49e9-a07d-c06d3f7cb4cb
   Before the Dust Settled — South Africa · Limpopo Province
   Wildlife photography is rarely about pressing the shutter. Most of the work happens earlier — waiting, staying still, and accepting that nature decides if the frame exists. This encounter lasted less than a minute.

2. hf_20260922_194350_5546ea3d-6336-42c7-a59f-06165c5802be
   The Long Walk Home — Kenya · Maasai Mara
   A matriarch leading her herd across open grass at the end of the day. I stayed low and let them close the distance on their own terms.

3. hf_20260922_194349_b4533691-cb49-41d4-b56c-51f0fdcbe250
   Something Understood — Botswana · Okavango Delta
   He held the look for about four seconds. Long enough to be certain neither of us intended to move first.

4. hf_20260922_194349_e588abd3-1bfa-4918-894f-05632cc51ccc
   Nine Hours of Nothing — Finland · Lapland
   A full day in a hide for a single turn of the head. That ratio is normal and I have stopped resenting it.

5. hf_20260922_194350_28d92c80-de66-41cb-911e-b3b44aebe1f5
   Borrowed Trust — Scotland · Cairngorms
   She had learned the shape of a person and decided it was uninteresting. That indifference is the rarest thing in this work.

6. hf_20260922_194349_04e89718-4214-4aff-bac5-490462bbfe2f
   Small Weather — Costa Rica · Osa Peninsula
   Rain had just stopped. Everything on that branch was the size of a thumbnail and lit like a stage.

7. hf_20260922_194417_2c031e22-2fad-4c81-a544-83cd6bba1c33
   Against the Weather — Alaska · Chilkat Valley
   Shot at a thousandth of a second into a rising storm. The light lasted eleven minutes.

8. hf_20260922_194349_a39c3226-7848-4b15-b840-98ad8aec467b
   The Pale Edge — India · Bandhavgarh
   Almost entirely hidden. I only found the frame because the foliage stopped moving in the wrong place.

9. hf_20260922_194417_555e4d90-f35f-4a1a-8c75-def1e8b71988
   Perfect Arithmetic — Indonesia · Raja Ampat
   Coiled with a precision that looks designed. Nothing about it is — it is just the cheapest way to hold heat.

10. hf_20260922_194417_e525a243-03c8-454b-83b4-60f541baf70a
    Shallow Water — French Polynesia · Fakarava
    Three metres down on a single breath. It passed close enough that I stopped composing and simply held the camera still.

11. hf_20260922_194349_ec830e6f-b8e6-4569-8540-ee7f33902c53
    Two of Nine — India · Ranthambore
    Siblings resting out the afternoon heat. The second one never opened its eyes.

12. hf_20260922_194417_35a9af5f-bd07-45a7-bb73-08b47d19d530
    Low Ground — Nepal · Chitwan
    Flat on the ground at her eye level, which is the only honest angle for an animal that hunts from there.

13. hf_20260922_194416_30e307a9-1265-45c3-a1a0-5c6fa5bb9f8d
    Everything at Once — Iceland · Southern Coast
    Free horses on a black beach at dusk. I panned and accepted whatever the frame gave back.

14. hf_20260922_194417_ff5cb9f8-8eed-4bfb-bb08-11256da92eae
    White on White — Canada · Ellesmere Island
    Snow removes every reference for exposure. The only reliable meter left is the eyes.

15. hf_20260922_194418_1d9bff4a-4971-4944-9e49-d72e755ceeb0
    Census — Namibia · Etosha
    Two of roughly sixteen thousand left. The number is the reason the frame exists.

16. hf_20260922_194349_75e53821-0807-4ebc-992d-34bae0ec2ce6
    The Whole Field — France · Provence
    Four millimetres of animal. At this magnification a breath of wind is an earthquake.

17. hf_20260922_194417_5a227847-3796-4438-805d-7e66e9538205
    First Season — Germany · Bavarian Forest
    Days old and already still enough to disappear. Stillness is the first thing anything here learns.

18. hf_20260922_194350_b49aa67e-0401-4029-af4f-f6ac3ee83398
    Listening Posture — Tanzania · Serengeti
    Ears forward, weight on the back legs. She heard something I never did.

19. hf_20260922_194349_89b82779-3a46-4c55-b7c5-f4a0fd955874
    A Line of Red — Spain · Fuente de Piedra
    Underexposed by two stops until only the shape survived.

20. hf_20260922_194416_47e18c62-253a-42e1-97a9-9e5f6a6b8d59  TALL
    Left Behind — Studio · Reykjavík
    Found beneath a roost at first light. The only frame in this archive an animal agreed to in advance.

21. hf_20260922_194417_a455843c-d8db-461c-8ef6-74a325d2472c
    The Other Side — Uganda · Kibale Forest
    Taken by a colleague between two long waits. Proof, mostly, that someone is holding the camera.

PAGE LAYERS, bottom to top
1. #scrolltrack — height 116vh, pointer-events none. The document is only 116vh tall, so the scrollable distance is 16vh. That 16vh is the entire zoom. Nothing exists past it. If scrollY exceeds 16vh, clamp scrollTo(0, max).
2. #stage — fixed inset 0, z-index 10, perspective var(--persp), perspective-origin 50% 50%, overflow hidden, touch-action none. On pointer:coarse, touch-action pan-y so a vertical swipe can still scroll. Contains #world (absolute, top 50% left 50%, width 0 height 0, transform-style preserve-3d, will-change transform). Inside #world: #orb (same zero-size preserve-3d, opacity 1, no entrance scale) and h1#headline. Both #orb and #headline share that one center point. The headline is not a fixed screen overlay and it is not a child of #orb.
3. .vig — fixed inset 0, z-index 12, pointer-events none. Radial gradient ellipse 88% 92% at 50% 50%: transparent 48%, rgba(0,0,0,.26) 80%, rgba(0,0,0,.72) 100%. Fades out in grid view and lightbox.
4. #grid — fixed inset 0, z-index 20, scrollable, opacity 0 until body.gridview.
5. header.chrome, .bio.chrome, .colophon.chrome, .gridbtn, .cue.chrome — chrome starts opacity 0 and fades in over 1.2s with 0.15s delay once body.revealed.
6. #menu — z-index 80.
7. #lit — z-index 90.
8. #intro — z-index 200.
9. #splash — z-index 250.
10. #dot custom cursor — z-index 300. Hidden on hover:none and pointer:coarse.

SPLASH #splash
Fixed inset 0, black, CSS grid place-items center, align-content center, gap 26px. Fades with opacity .6s ease. Class .out sets opacity 0 and pointer-events none, then the node is removed after 950ms.
- .mark: Playfair, clamp(28px, 4.4vw, 52px), letter-spacing .005em, color #f4f2ef. Text: Ethan<em>Vale</em>. Opacity 0, animation riseIn 1.25s ease .15s forwards.
- .bar: width clamp(120px, 17vw, 210px), height 1px, background rgba(244,242,239,.16). Inner <s id="bar"> is a block filling the bar, background #f4f2ef, scaleX(0) from the left, transition transform .55s ease. JS drives scaleX by loaded-asset progress.
- .tag: 10px, letter-spacing .26em, uppercase, color rgba(244,242,239,.38). Text: Field Notes 2026. riseIn .9s ease .7s forwards.
- @keyframes riseIn: from opacity 0 translateY(9px) to opacity 1 and no transform.
Hold the splash until every still plus the film has reported in, but at least ~1150ms from birth, and never longer than a 9000ms backstop. Then fill the bar, fade the splash, start the film.

INTRO FILM #intro
Fixed inset 0, black, grid place-items center, overflow hidden.
- video#film: width/height 100%, object-fit cover.
- .veil: absolute inset 0, black, opacity 0, transition opacity 1.15s ease. #intro.closing .veil opacity 1.
- #intro.gone: opacity 0, pointer-events none, transition opacity .5s linear, then remove after 700ms.
- button.skip#skip: absolute, right calc(pad + safe-right), bottom calc(pad + safe-bottom). 11px, letter-spacing .18em, uppercase, color rgba(244,242,239,.6), min-height 44px, padding 10px 18px, 1px solid rgba(244,242,239,.25), border-radius 999px, backdrop-filter blur(6px). Hover: color #fff, border rgba(255,255,255,.7). Hidden (opacity 0) while closing. Label: Skip.
- .fallback: absolute inset 0, radial-gradient(circle at 50% 46%, #14301a 0%, #060c07 42%, #000 72%), opacity 0. #intro.novideo shows it. Used if the film errors or autoplay never starts.
Film rules: set video.muted, defaultMuted, playsInline, and webkit-playsinline BEFORE play(). Always seek to 0 if currentTime > 0.05. playbackRate = 2, and set it again on the play event. On playing, reveal at (duration - currentTime - 0.45) / 2 seconds, minimum 300ms, so the cut lands just before the last frame under the black veil. Also listen for ended. Absolute reveal backstop 14000ms. If autoplay is blocked, the first frame stays as a poster; the first pointerdown, keydown, or touchstart calls play(); if still paused after 2600ms, reveal anyway. Skip calls the same reveal. On error, add novideo and reveal after 1300ms (or after splash if splash is still up).
Reveal sequence: add .closing, remove body.locked, restore documentElement overflow (it was hidden during the film), measure/layout the sphere twice inside the black veil (sync + rAF + again at the end of the 1000ms veil), then add body.revealed and #intro.gone. The sphere is already full size and already running its camera loop during the splash, so the first visible frame does not jump.

HEADER
Fixed top, full width, z-index 60, flex space-between align flex-start.
Padding: top calc(pad * .8 + safe-top), right calc(pad + safe-right), bottom calc(pad * .35), left calc(pad + safe-left).
mix-blend-mode: difference.
- a.wordmark href="#" aria-label="Ethan Vale": Playfair, clamp(19px, 2.1vw, 27px), letter-spacing .005em, line-height 1, color #fff, no underline, nowrap. Text Ethan<em>Vale</em>.
- button#menuBtn.menu-btn: column, align flex-end, gap 5px, min 44×44, padding 8px 0 4px. aria-expanded false, aria-controls menu, aria-label "Open menu".
  - span.menu-label "Menu": clamp(12px, 1.25vw, 15px), letter-spacing .01em, white, opacity transition .35s. Opacity 0 when menu is open.
  - span.bars: width clamp(42px, 4.4vw, 62px), height clamp(16px, 2vw, 22px). Two <i> bars, absolute, left 0 right 0, top 50%, height 1px, background #fff. First translates Y -5px. Second width clamp(34px, 3.6vw, 50px), translates Y 5px. Hover moves the short bar translateX(-8px).
  - Menu open: both bars width 100%, one rotates 45deg, the other -45deg, both translateY 0. Header z-index becomes 90, mix-blend-mode normal, wordmark and bars color #f4f2ef.

PHOTOGRAPHER CARD .bio
Fixed, left calc(pad + safe-left), bottom calc(pad + safe-bottom), z-index 55, max-width min(320px, 46vw).
.who: flex, align center, gap 14px, margin-bottom 14px.
Avatar img#avatar 52×52, border-radius 3px, object-fit cover, grayscale(.15), alt "Ethan Vale".
Name <b>Ethan Vale</b>: Playfair weight 400, 19px, letter-spacing .01em.
Paragraph, 12.5px, line-height 1.62, color rgba(244,242,239,.72):
Wildlife photography is less about taking pictures and more about learning when not to move. Every frame in this archive was captured in natural conditions without intervention.
Hide (opacity 0, translateY 10px, no pointer events) when body has .deep, .gridview, or .lit.

COLOPHON .colophon
Fixed right/bottom with the same safe padding, z-index 55, 12.5px, color rgba(244,242,239,.72). Text: Field Notes 2026.
Hidden on grid view and lightbox. display:none at max-width 768px.

GRID TOGGLE button#gridBtn.gridbtn
Fixed left/bottom, z-index 56, 44×44, padding 5px, display grid 2×2, gap 4px. Four <b> squares, background #f4f2ef, border-radius 2px. aria-label "Toggle grid view".
Starts opacity 0, translateY(8px), pointer-events none. Visible when body.deep or body.gridview.
Hover: each square background #fff and scale .86.
In grid view the first square translates (3px, 3px) and the fourth (-3px, -3px), so the icon reads as collapsing.

SCROLL CUE .cue
Fixed, left 50%, bottom calc(pad + safe-bottom + 4px), translateX(-50%), z-index 54. Flex, gap 10px, 10px uppercase, letter-spacing .24em, color rgba(244,242,239,.42), nowrap.
An <s> line 44×1 px, background rgba(244,242,239,.28), overflow hidden. Its ::after is a #f4f2ef bar translating X from -100% to 0 at 55% and to 100% at 100%, animation sweep 2.6s ease infinite.
Label: Drag to rotate.
Hidden when .deep, .gridview, or .lit, and display none under 640px.

3D ARCHIVE — THE CIRCLE AND ITS CENTER ARE THE SAME POINT
HTML, exactly:
<div id="stage">
  <div id="world">
    <div id="orb"></div>
    <h1 id="headline"><span class="inner"></span></h1>
  </div>
</div>

Copy this CSS verbatim. The center of the photo circle and the center of the title are the same 0×0 point.

#world{
  position:absolute; top:50%; left:50%;
  width:0; height:0;
  transform-style:preserve-3d;
  will-change:transform;
}
#orb{
  position:absolute; top:0; left:0;
  width:0; height:0;
  transform-style:preserve-3d;
  opacity:1;
  transform:none;
}
#headline{
  position:absolute; top:0; left:0;
  width:var(--hw);
  margin-left:calc(var(--hw) / -2);
  text-align:center;
  font-family:var(--serif);
  font-weight:400;
  font-size:clamp(25px, 3.7vw, 55px);
  line-height:1.06;
  letter-spacing:-.005em;
  color:#fff;
  text-shadow:0 2px 34px rgba(0,0,0,.55);
  pointer-events:none;
  user-select:none;
  -webkit-user-select:none;
}
#headline .inner{
  position:absolute; top:0; left:0;
  width:100%;
  transform:translateY(-50%);
}

Why this is the center of the circle:
- #stage is the full viewport. #world is a 0×0 point placed at top:50% and left:50%, so that point is the middle of the screen.
- Every photo card is positioned from that same point (absolute top 0 left 0 inside #orb, then translate3d by the sphere coordinates). The sphere origin is the center of the image circle.
- #headline is a sibling of #orb, also absolute at top:0 left:0 on that same point. It is inside the 3D world, so it sits in the middle of the circle, and nearer cards can cross in front of it.
- Horizontal center: margin-left is calc(var(--hw) / -2). That is half the title width, in pixels, pulled back from the center point. Parent width is 0, so margin-left:-50% is 0 and would leave the title starting at the center instead of centered on it. Do not use a percentage margin.
- Vertical center: the h1 has no in-flow height because .inner is absolute. .inner uses transform:translateY(-50%), which shifts the line up by half its own height so the words straddle the sphere origin. This transform stays on .inner forever. Do not move it to #headline.
- text-align:center centers the words inside the title box. The box is already centered on the origin by the negative margin.
- Do not center the title with position:fixed, top:50%, left:50%, transform:translate(-50%,-50%), flex, grid, place-items, or margin:auto. JavaScript replaces #headline.style.transform on every frame, so a CSS centering transform on #headline is destroyed and the title jumps off the circle.

--hw is min(56vw, 640px). At max-width 640px set --hw to min(84vw, 360px). At max-width 380px set --hw to min(88vw, 320px). At max-height 520px in landscape, font-size becomes clamp(18px, 4.8vh, 28px). At max-width 768px, font-size becomes clamp(22px, 6.4vw, 34px). The negative margin always reads var(--hw), so those changes keep the title on the center of the circle.

Words of "I See Through the Wild" are five inline-block spans inside .inner, with style="--i:0" through "--i:4", separated by normal spaces. Each span starts opacity 0, transform translateY(.42em), filter blur(7px). Those entrance transforms are on the spans only, never on .inner and never on #headline. On body.revealed each span goes to opacity 1, transform none, filter blur(0), with transition opacity 1.05s, transform 1.15s, filter 1.05s, delay calc(.9s + var(--i) * .085s).

Distribute the 21 cards on a Fibonacci sphere:
N = 21, GA = π * (3 - sqrt(5))
for i in 0..N-1:
  y = 1 - (i / (N - 1)) * 2
  rad = sqrt(max(0, 1 - y*y))
  theta = i * GA
  x = cos(theta) * rad
  z = sin(theta) * rad
  lat = asin(y) * 180/π
  lon = atan2(x, z) * 180/π
Each card is a div.card (plus .tall for Left Behind) data-idx=i, containing figure > img. Transform:
  translate3d(x*R px, -y*R px, z*R px) rotateY(lon deg) rotateX(lat deg)
Store the unit vector so layout can rerun. Card transforms are on the cards only. Never add a translate to #orb or #world to "center" the cards. They are already centered because their parent is the 0×0 point.

Radius R from the shorter viewport axis:
  hr = 0.38 if width<=380, else 0.42 if <=640, else 0.46
  wr = 0.48 if width<=380, else 0.52 if <=640, else 0.58
  floor = 108 / 120 / 155 at those same widths
  R = max(floor, min(480, innerHeight*hr, innerWidth*wr))
Card width --cw:
  scale 0.44 / 0.46 / 0.47 at <=380 / <=640 / else
  --cw = round(max(72, R * scale)) px
Landscape cards: height = cw / 1.5, margin-left -cw/2, margin-top -cw/3.
Tall card: height = cw * 1.25, margin-top = cw * -0.625.
Perspective --persp: 620px <=380, 760px <=640, 920px <=900, else 1150px.
Ignore resize deltas under 20px in either axis (scrollbar and mobile URL bar). On resize, orientationchange (after 220ms), and visualViewport resize/scroll, force a relayout.

Card chrome: figure fills the card, overflow hidden, border-radius 3px, background #0a0a0a. Hover scale 1.045 over .5s ease. img opacity 0 until class .in, then opacity 1. After body.revealed, img opacity transitions .8s ease-out. Do NOT fade cards in during the intro.
Depth is a flat black wash, not a CSS filter: figure::after inset 0, background rgba(0,0,0,var(--d,0)), inset box-shadow 0 0 0 1px rgba(255,255,255,.07), border-radius 3px, pointer-events none.

Image loading: the _min.webp files are ~2528px wide. Decode each once on a canvas, downscale to cardDecodeMax (420 / 520 / 640 / 760 px at <=380 / <=640 / <=900 / else), export webp quality 0.88, and use that blob URL on both the sphere card and the matching grid image. If natural width is already under the cap, or canvas/CORS fails, use the original thumb URL. Avatar is downscaled to max width 160. Splash progress counts 21 stills + the film. crossOrigin anonymous on the probe image.

CAMERA LOOP (requestAnimationFrame, started during the splash, one synchronous frame first)
State: spin 0, tilt -4 degrees, camZ 0, dragX/dragY 0, velX/velY 0, pitch limit 32 degrees, focused index -1.
The orb does not auto-rotate. It only carries drag momentum, and it freezes while a lightbox is open.
When not dragging and not lit: dragX += velX, dragY += velY, multiply velocities by 0.94, snap to 0 under 0.002. Clamp pitch so tilt+dragY stays inside ±32.
Scroll progress p = clamp(scrollY / (innerHeight * 0.16), 0, 1).
Zoom only dollies forward. camZTarget = p * min(64, R * 0.12). camZ eases toward target by 0.075. Never fly through the sphere.
sx = tilt + dragY. sy = spin + dragX.
world.style.transform must be exactly:
  translateZ(camZ px) rotateY(sy deg) rotateX(sx deg)
No translateX and no translateY on #world. The world stays on the viewport center while it yaws, pitches, and dollies.

HEADLINE TRANSFORM — THIS KEEPS THE TITLE IN THE CENTER OF THE CIRCLE
Every frame, set this and only this on the h1#headline element:
  rotateX(-sx deg) rotateY(-sy deg) translateZ((R * 0.62) px)
CSS applies the rightmost function first, so the order is mandatory:
  1. translateZ moves the title forward along its own axis, toward the camera, by 62% of the sphere radius. That is why only the nearest photos cross in front of the words. It does not move the title up, down, left, or right.
  2. rotateY(-sy) then rotateX(-sx) cancel the world rotation, so the words stay square to the camera and stay on the optical center.
At rest, before any drag, sy is 0 and sx is -4. The title must still be dead-center in the photo circle, not above the circle and not sitting on the lower photos.
Do not write translate(-50%, -50%), translateX, or translateY into headline.style.transform. Do not set a transform on .inner from JavaScript. .inner keeps its CSS translateY(-50%) for the whole session. Headline opacity = max(0, 1 - p * 0.55), written to headline.style.opacity.

Per card, rotate the unit vector by the same yaw/pitch and read world-space depth zf in -1..1.
base = 0.14 + 0.86 * ((zf+1)/2) ^ 0.85
shade = 1 - min(1, p * 1.6)
dim = shade * (1 - base)
near = perspective * 0.66
fade = 1, or if (zf*R + camZ) > near then max(0, 1 - (absZ - near) / 190)
When a shot is open, add 0.78 to every dim (clamped to 1) and set the focused card fade to 0 because the lightbox plate replaces it.
Write opacity and --d only when the value changes.

DRAG
Pointerdown on #stage (ignored if a shot is open): remember the .card under the cursor before setPointerCapture retargets the event. Mouse and pen rotate immediately and capture the pointer. Touch does not capture until the gesture is clearly horizontal: after 10px of movement, if vertical distance > horizontal * 1.15, cancel the drag and let the page scroll; otherwise capture and rotate.
Yaw from horizontal, pitch from vertical, 0.13 degrees per pixel. No roll. A drag must not also click: click slop is 14px on coarse pointers, 6px otherwise. Click the card that was under the cursor at pointerdown.
Dragging rotates #world. The headline counter-rotation runs in the same frame, so the words stay in the center of the circle while the photos turn around them.

FLAT GRID #grid
Padding calc(pad*3.4) pad calc(pad*4), background #000, opacity 0 until body.gridview, then pointer-events auto, transition .6s.
.rows: grid auto-fill minmax(260px, 1fr), gap clamp(10px, 1.4vw, 20px), max-width 1680px, centered.
Each figure aspect-ratio 3/2, radius 3px, background #0b0b0b, cursor pointer, data-idx.
img object-fit cover, opacity .82, hover scale 1.05 and opacity 1 over .8s.
figcaption: Playfair 15px, bottom gradient from transparent to rgba(0,0,0,.82), padding 26px 14px 12px, hidden until hover (opacity 0, translateY 6px).
Toggle body.gridview from the grid button. While grid view is on, #stage opacity 0, blur 14px, no pointer events, and the vignette fades out.

LIGHTBOX #lit
Fixed inset 0, z-index 90, grid place-items center, padding clamp(56px, 8vh, 84px) pad. Opacity 0 until body.lit. No dimming scrim and no backdrop blur: .scrim is an empty click-catcher. The archive stays visible in the dark.
.plate width min(72vw, 860px, (100vh - 230px) * 1.5). Transition transform .62s ease, opacity .42s ease.
.shot: relative, width 100%, aspect-ratio 3/2, radius 2px, background #0b0b0b, box-shadow 0 30px 90px rgba(0,0,0,.75). img object-fit cover, radius 2px.
Close button sits on the photo: absolute top 12px right 14px, 12.5px, min 44×44, padding 10px 14px, 1px solid rgba(244,242,239,.78), radius 6px, background rgba(0,0,0,.35), color #f4f2ef. Hover border #fff and background rgba(0,0,0,.55). Label: Close. data-close.
.meta: two columns minmax(0,.78fr) and minmax(0,1.22fr), gap clamp(22px, 3.2vw, 48px), padding-top 16px.
h2#litTitle: Playfair 400, clamp(22px, 2.15vw, 32px), line-height 1.08, letter-spacing -.01em, margin-bottom 6px.
.where#litWhere: 13px, rgba(244,242,239,.62).
.note#litNote: 13.5px, line-height 1.55, rgba(244,242,239,.92).
Open behavior: show the already-decoded card image immediately, then swap in the full .png only after that Image fires onload (ignore stale opens with a token). Set title, place, note. Lock page overflow. FLIP the plate from the clicked card's rect to center: measure, set transition none, transform translate(dx, dy) scale(cardWidth/plateWidth) and opacity 0, force reflow, clear inline transition/transform/opacity so CSS animates it home. Scale floor 0.04.
Close: clear focused immediately so the card lights back up, remove .lit, FLIP back toward the source card (sphere card or grid figure), opacity 0, and after 640ms strip the inline transform with transition none.
Click [data-close] or the scrim to close. Escape closes lightbox first, then menu, then grid view.

MENU #menu
Fixed inset 0, z-index 80, background #050505, grid place-items center. clip-path inset(0 0 100% 0) closed, inset(0) open, transition clip-path .85s ease. pointer-events none until open.
nav column, gap clamp(4px, 1vw, 10px), text center.
Links, Playfair, clamp(34px, 7.6vw, 78px), line-height 1.08, color #f4f2ef, no underline, opacity .55. Hover opacity 1 and letter-spacing .012em.
Links, in order: The Archive (data-grid, opens the flat grid), Field Notes, Studio, Contact (data-close-menu). All preventDefault and close the menu.
.addr absolute, left/right/bottom safe padding, 12.5px, color var(--dim), line-height 1.7:
Nairobi · Cape Town · Reykjavík
studio@ethanvale.photo

CUSTOM CURSOR #dot
Only for fine pointers. 19×19 circle, margin -9.5px, border-radius 50%, background rgba(214,212,209,.9), mix-blend-mode difference, border 1px solid transparent. Follow the pointer with lerp 0.2 via translate3d on rAF.
On .card, a, button, or #grid figure, add .wide: 52×52, margin -26px, background rgba(244,242,239,.14), border rgba(244,242,239,.75).
Transitions .35s ease on size, margin, background, border.

RESPONSIVE — IMPLEMENT ALL OF THESE
max-width 900px:
- bio max-width min(420px, 100vw minus pads and safe areas); bio p 12px
- colophon 11px
- lightbox meta becomes 1 column, gap 10px, padding-top 14px
- plate width min(92vw, (100dvh - 220px) * 1.5)
- grid columns minmax(150px, 1fr)
- grid padding-top calc(pad * 2.8 + safe-top)

max-width 768px:
- hide colophon
- bio max-width 100vw minus pads and safe areas
- headline font-size clamp(22px, 6.4vw, 34px). Do not change its centering. margin-left stays calc(var(--hw) / -2) and .inner stays translateY(-50%).
- menu links clamp(28px, 9vw, 54px)
- menu address 11.5px

max-width 640px:
- --hw min(84vw, 360px); --pad clamp(12px, 4vw, 18px)
- avatar 42×42; name 17px; bio p 11.5px line-height 1.55
- hide the scroll cue
- lightbox becomes a scrolling block (not a centered grid), padding calc(52px + safe-top) and side/bottom safe padding
- plate width 100%, max-width 560px, centered
- h2 clamp(20px, 5.6vw, 26px); note 12.5px line-height 1.58
- close top 8px right 8px
- grid is 2 columns, gap 8px, captions always visible at 13px
- grid padding uses safe areas on all sides

max-width 380px:
- --hw min(88vw, 320px)
- bio .who gap 10px, margin-bottom 10px
- hide the bio paragraph
- grid becomes 1 column
- menu gap 2px, links clamp(24px, 10vw, 40px)

max-height 520px and orientation landscape:
- hide bio, colophon, and cue
- headline font-size clamp(18px, 4.8vh, 28px). Centering method does not change.
- lightbox padding-top calc(36px + safe-top), meta padding-top 10px
- plate width min(58vw, (100dvh - 80px) * 1.5)
- header padding-top calc(8px + safe-top)

prefers-reduced-motion: all animations .01ms, all transitions .14s.

CHECK BEFORE YOU FINISH
With the page revealed and no drag, "I See Through the Wild" is visually in the middle of the ring of photos, on both axes, on desktop and on a 390px-wide phone. The left edge of the title is not on the center. The top edge of the title is not on the center. The whole line is centered on the sphere origin. Rotating the sphere keeps the words in that center while the photos move around them.

OUTPUT
One complete index.html. Black page, Playfair plus Inter, the CloudFront film URL above, all 21 CloudFront stills, splash, 2× intro with Skip, Fibonacci photo sphere, the centered headline "I See Through the Wild" on the sphere origin, drag to rotate, 16vh scroll dolly, flat grid, FLIP lightbox, full-screen menu, custom cursor, and the breakpoints above. Copy the written strings exactly, including the em dashes and the email studio@ethanvale.photo.
```

---

## 💡 Adaptation & Customization Guide

### 1. Adapting to Different Portfolios
To re-skin this 3D sphere experience for other domains (e.g., architectural firm, automotive design, fashion lookbook, digital agency):
1. **Asset Array (`SHOTS`)**: Replace the 21 CloudFront image records in the `SHOTS` array with your own imagery (remote CDN or local `./images/` directory).
2. **Metadata Fields**: Modify `title`, `place`, and `note` to fit your content (e.g., `client`, `year`, `materials`, or `dimensions`).
3. **Variable Sphere Density ($N$)**: If you have more or fewer than 21 items, simply update `const N = SHOTS.length`. The Fibonacci lattice algorithm automatically redistributes any arbitrary number $N$ evenly across the sphere without changing any mathematical constants.

### 2. Modifying the Sphere Dimensions & Physics
- **Orbit Radius ($R$)**: Located in `computeLayout()`. Adjust the ratio factors `hr` and `wr` (e.g., increase `hr` from `0.46` to `0.55` to expand the sphere).
- **Drag Sensitivity**: Look for `const rotDeg = 0.13;` in `onPointerMove()`. Increase to `0.2` for faster rotation, or reduce to `0.08` for heavier, cinematic drag.
- **Inertia Friction**: Modify `velX *= 0.94;` in `tick()`. Change to `0.97` for long glide momentum, or `0.88` for snappy braking.
- **Pitch Clamping**: Change `const PITCH_LIMIT = 32;` to allow full $360^\circ$ vertical tumbling if desired.

### 3. Adapting to Modern Frameworks (React / Vue / Svelte)
While this prompt specifies a zero-dependency vanilla `index.html`, the core mathematical formulas can be dropped into a React `useEffect` or Vue `onMounted` hook:
- Replace DOM lookups with `useRef()` handles.
- Store `spin`, `tilt`, and velocity vectors in a mutable ref (`useRef`) to avoid triggering React re-renders on every `requestAnimationFrame`.
