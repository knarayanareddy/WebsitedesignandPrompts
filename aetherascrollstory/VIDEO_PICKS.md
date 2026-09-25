# Aethera — Verified Video Picks (reviewed 2026-09-25)

Your reference clip is a **slow cinematic push-in over a painterly 3D valley**: rolling green
hills, a winding stream, wildflower patches, a stone bridge and cottage, hazy blue mountains
under a near-white sky (14.0 s, 1928×1072, 24 fps, AI-generated — CloudFront `hf_` filename).
Every pick below was **downloaded and frame-inspected with ffmpeg** to match that soft,
luminous, green-and-white palette. All Pexels clips are free for commercial use, no attribution
required (Pexels License: https://www.pexels.com/license/).

Each clip ships in `public/videos/` as a web-optimized 1080p H.264 cut (CRF 26–27, no audio,
`+faststart`, 24 fps) with a matching poster in `public/posters/`. Total payload ≈ 25 MB.
The optimize command used:

```
ffmpeg -i in.mp4 -t <8-12> -vf scale=1920:-2 -r 24 -an \
  -c:v libx264 -crf 27 -preset veryfast -movflags +faststart out.mp4
```

## The story reel (8 chapters, in scroll order)

| # | Chapter | Local file | Source (verified 200) | Specs | Why it fits |
|---|---------|-----------|----------------------|-------|-------------|
| 0 | silence (hero) | `videos/01-silence.mp4` | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4 | 1928×1072, 24 fps, 14 s | The reference itself — the brand statement. |
| 1 | still | `videos/02-still.mp4` | https://videos.pexels.com/video-files/38792926/16485958_3840_2160_24fps.mp4 · [page](https://www.pexels.com/video/serene-misty-valley-in-lush-green-hills-38792926/) | 4K, 24 fps, 16.7 s | Green valley road dissolving into a **white misty sky** — same green+white palette as the reference. |
| 2 | flow | `videos/03-flow.mp4` | https://videos.pexels.com/video-files/31202696/13328435_2160_3840_30fps.mp4 · [page](https://www.pexels.com/video/serene-forest-stream-cascading-over-mossy-rocks-31202696/) | 2160×3840 (center-cropped 16:9), 30 fps | Emerald moss + sparkling clear water = the reference's stream, alive. |
| 3 | bloom | `videos/04-bloom.mp4` | https://videos.pexels.com/video-files/31289523/13360106_3840_2160_30fps.mp4 · [page](https://www.pexels.com/video/beautiful-wildflower-meadow-in-spring-bloom-31289523/) | 4K, 30 fps | White daisy meadow — a direct echo of the reference's foreground flowers. |
| 4 | light | `videos/05-light.mp4` | https://videos.pexels.com/video-files/31486758/13425100_1920_1080_30fps.mp4 · [page](https://www.pexels.com/video/serene-meadow-with-wildflowers-at-sunset-31486758/) | 1080p, 30 fps, 64 s (cut at 4–14 s) | Backlit golden coneflowers with sun flare — the "warm hours" beat. |
| 5 | ascent | `videos/06-ascent.mp4` | https://videos.pexels.com/video-files/33395465/14216810_3840_2160_30fps.mp4 · [page](https://www.pexels.com/video/aerial-view-of-misty-green-hills-and-valleys-33395465/) | 4K, 30 fps, 13.3 s | Aerial over deep-green ridges with a low cloud ceiling — scale without losing calm. |
| 6 | eternal | `videos/07-eternal.mp4` | https://videos.pexels.com/video-files/12693832/12693832-uhd_3840_2160_25fps.mp4 · [page](https://www.pexels.com/video/time-lapse-of-a-starry-sky-over-a-mountain-peak-12693832/) | 4K, 25 fps, 6.4 s | Milky Way over a peak — the one dark beat; white Instrument Serif on night sky. |
| 7 | begin | `videos/08-begin.mp4` | https://videos.pexels.com/video-files/9737873/9737873-uhd_3840_2160_24fps.mp4 · [page](https://www.pexels.com/video/close-up-of-white-flowers-swaying-in-wind-9737873/) | 4K, 24 fps, 28 s (cut at 3–13 s) | White cosmos against a blown-out sky — dissolves the story back into pure white. |

## Reviewed but not used (and why)

- **Gray rocky river** 5161870 ([page](https://www.pexels.com/video/flowing-water-on-the-rocky-river-5161870/)) — palette too dry/gray next to the reference's emerald stream; the mossy 31202696 won.
- **Misty hills** 34626837 ([page](https://www.pexels.com/video/misty-green-hills-in-a-tranquil-landscape-34626837/)) — moody but dim; 38792926 has the white sky that matches.
- **Pink mallow** 38088507 ([page](https://www.pexels.com/video/serene-pink-wildflowers-sway-in-summer-breeze-38088507/)) — pretty, but the saturated blue sky breaks the palette. Good alternate for "bloom".
- **Snow set** (15434857 Flaine sunrise, 31572940 Tatra alpenglow, 28891508 Dolomites dusk, 12693832-adjacent starry clips 39086426) — frame-checked; gorgeous but a *winter* story, wrong world for this valley reference. 39086426 ([page](https://www.pexels.com/video/stunning-night-sky-with-milky-way-and-mountain-silhouette-39086426/)) is a valid alternate for "eternal".
- **Night-snowboard picks from the old `video_picks.md`** (6943040, 6286881, 6947537, …) — all still live (HEAD 200 on 2026-09-25) but they match your *previous* Securify reference, not this one.
- Portrait-only clips (36493805, 15446144, 33604778, 30146916, 39481766…) — 9:16 sources crop poorly for full-bleed 16:9 chapters; skipped except 31202696 whose centered action survives the crop.

## Tips carried over from the previous round

- `muted` + `playsInline` are mandatory for autoplay on Safari/iOS.
- `preload="metadata"` + poster on every chapter except the hero (`preload="auto"`).
- Only the visible chapter plays (IntersectionObserver at 35%) — scroll cost stays bounded.
- Respect `prefers-reduced-motion`: no autoplay, posters remain, reveals render visible.
- White/black gradient blends above and below each video hide the loop seam and the chapter edges.
