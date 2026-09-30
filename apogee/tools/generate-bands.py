#!/usr/bin/env python3
"""Generate the three Apogee band loops (self-hosted, license-clean).

Each clip: 1920x1080, 30 fps, 15 s PERFECT loop (every motion term has an
integer number of cycles per loop), dark #080A19 palette with blue/red nebula
accents to match the hero. Frames are piped raw into ffmpeg (H.264 CRF 25,
yuv420p, no audio, +faststart).

  python generate-bands.py <ffmpeg> <out-dir> <poster-dir> [field|ascent|terrain|all]

  field.mp4   — drifting plexus network (data fabric)
  ascent.mp4  — rising light streaks (the climb to the peak)
  terrain.mp4 — flowing wireframe terrain (the horizon you forecast)
"""
import math
import subprocess
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1920, 1080
FPS = 30
T = 15
N_FRAMES = FPS * T
BG_TOP = (4, 5, 13)
BG_BOT = (10, 13, 28)


def background(glow_rgba):
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    ny = yy / H
    bg = np.array(BG_TOP, np.float32)[None, None, :] * (1 - ny)[..., None] + \
         np.array(BG_BOT, np.float32)[None, None, :] * ny[..., None]
    gx, gy, gc = glow_rgba
    dx = (xx - W * gx) / (W * 0.7)
    dy = (yy - H * gy) / (H * 0.7)
    glow = np.exp(-(dx * dx + dy * dy) * 2.0)[..., None] * np.array(gc, np.float32)
    bg += glow
    vx = (xx - W / 2) / (W / 2)
    vy = (yy - H / 2) / (H / 2)
    bg *= (1 - 0.2 * np.clip(vx * vx + vy * vy, 0, 1.6))[..., None]
    return Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8), "RGB")


def encode(name, render_frame, ffmpeg, out_mp4, poster_jpg, crf=25):
    cmd = [ffmpeg, "-y", "-loglevel", "error",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", str(crf), "-preset", "slow",
           "-an", "-movflags", "+faststart", out_mp4]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(N_FRAMES):
        proc.stdin.write(render_frame(i / FPS).tobytes())
        if i % 100 == 0:
            print(f"  {name}: frame {i}/{N_FRAMES}", flush=True)
    proc.stdin.close()
    if proc.wait() != 0:
        sys.exit(1)
    # poster = a mid-loop frame, rendered again (deterministic)
    render_frame(T * 0.47).save(poster_jpg.replace(".jpg", ".png"))
    subprocess.run([ffmpeg, "-y", "-loglevel", "error", "-i", poster_jpg.replace(".jpg", ".png"),
                    "-q:v", "3", poster_jpg], check=True)
    import os
    os.remove(poster_jpg.replace(".jpg", ".png"))
    print(f"  {name}: done -> {out_mp4}")


# ---------------------------------------------------------------- field
def make_field(rng):
    bg = background((0.5, 0.18, (14, 20, 52)))
    N = 85
    nodes = []
    for _ in range(N):
        nodes.append({
            "x0": float(rng.uniform(-100, W + 100)),
            "y0": float(rng.uniform(-100, H + 100)),
            "ax": float(rng.uniform(20, 90)),
            "ay": float(rng.uniform(16, 70)),
            "kx": int(rng.integers(1, 3)),
            "ky": int(rng.integers(1, 3)),
            "px": float(rng.uniform(0, 2 * math.pi)),
            "py": float(rng.uniform(0, 2 * math.pi)),
            "r": float(rng.uniform(1.6, 4.2)),
            "warm": bool(rng.random() < 0.08),
        })

    def render_frame(t):
        frame = bg.copy()
        d = ImageDraw.Draw(frame, "RGBA")
        phase = 2 * math.pi * t / T
        pts = [
            (n["x0"] + n["ax"] * math.sin(n["kx"] * phase + n["px"]),
             n["y0"] + n["ay"] * math.sin(n["ky"] * phase + n["py"]))
            for n in nodes
        ]
        LINK_R = 260
        for i in range(N):
            xi, yi = pts[i]
            for j in range(i + 1, N):
                xj, yj = pts[j]
                dx, dy = xi - xj, yi - yj
                dist2 = dx * dx + dy * dy
                if dist2 > LINK_R * LINK_R:
                    continue
                a = int(88 * (1 - math.sqrt(dist2) / LINK_R))
                d.line([xi, yi, xj, yj], fill=(120, 150, 225, a), width=1)
        for n, (x, y) in zip(nodes, pts):
            col = (255, 158, 120, 190) if n["warm"] else (188, 206, 255, 175)
            d.ellipse([x - n["r"], y - n["r"], x + n["r"], y + n["r"]], fill=col)
        return frame

    return render_frame


# -------------------------------------------------------------- ascent
def make_ascent(rng):
    bg = background((0.5, 1.05, (10, 14, 34)))
    sprites = []
    for r in (1.4, 2.2, 3.4, 5.0):
        for length in (26, 54, 96):
            s = Image.new("RGBA", (int(r * 4 + 6), length + 12), (255, 255, 255, 0))
            dr = ImageDraw.Draw(s)
            c = s.width / 2
            dr.ellipse([c - r, 6, c + r, length + 6], fill=(255, 255, 255, 150))
            sprites.append(s.filter(ImageFilter.GaussianBlur(r * 0.45)))
    streaks = []
    for _ in range(130):
        s = sprites[int(rng.integers(0, len(sprites)))]
        streaks.append({
            "sprite": s,
            "x0": float(rng.uniform(-60, W + 60)),
            "y0": float(rng.uniform(0, H + 320)),
            "speed": (H + 320) * int(rng.integers(1, 4)) / T,
            "alpha": float(rng.uniform(0.35, 0.9)),
            "warm": bool(rng.random() < 0.07),
            "sway": float(rng.uniform(6, 30)),
            "sk": int(rng.integers(1, 3)),
            "sp": float(rng.uniform(0, 2 * math.pi)),
        })

    def render_frame(t):
        frame = bg.copy()
        phase = 2 * math.pi * t / T
        for s in streaks:
            y = (s["y0"] - s["speed"] * t) % (H + 320) - 160
            x = s["x0"] + s["sway"] * math.sin(s["sk"] * phase + s["sp"])
            sp = s["sprite"]
            if s["warm"]:
                tint = sp.copy()
                tint.putalpha(tint.getchannel("A").point(lambda v: int(v * s["alpha"])))
                # warm tint: multiply toward (255,150,120) via composite
                solid = Image.new("RGBA", sp.size, (255, 150, 120, 0))
                solid.putalpha(tint.getchannel("A"))
                frame.paste(solid, (int(x - sp.width / 2), int(y - sp.height / 2)), solid)
            else:
                tint = sp.copy()
                tint.putalpha(tint.getchannel("A").point(lambda v: int(v * s["alpha"])))
                cool = Image.new("RGBA", sp.size, (190, 210, 255, 0))
                cool.putalpha(tint.getchannel("A"))
                frame.paste(cool, (int(x - sp.width / 2), int(y - sp.height / 2)), cool)
        return frame

    return render_frame


# ------------------------------------------------------------- terrain
def make_terrain():
    bg = background((0.5, 0.28, (16, 16, 44)))

    def render_frame(t):
        frame = bg.copy()
        d = ImageDraw.Draw(frame, "RGBA")
        phase = 2 * math.pi * t / T
        # height field (all terms integer cycles per loop)
        def height(x, y):
            return (
                62 * math.sin(2.2e-3 * x + 1 * phase + 0.9 * y)
                + 36 * math.sin(3.4e-3 * y - 2 * phase + 0.6)
                + 22 * math.sin(1.7e-3 * (x + y) + 2 * phase + 1.7)
                + 12 * math.sin(4.6e-3 * x + 3 * phase + 2.4 * y)
            )

        horizon = H * 0.34
        ROWS, COLS = 22, 42
        xs = np.linspace(-1.25 * W, 2.25 * W, COLS + 1)
        ys = np.linspace(1.0, 9.0, ROWS + 1)  # depth units

        def project(x, y):
            scale = 1.0 / y
            sx = W / 2 + x * scale * 0.22
            sy = horizon + scale * 320 - height(x, y) * scale * 3.2
            return sx, sy

        # rows (depth lines)
        for yi, y in enumerate(ys):
            pts = [project(x, y) for x in xs]
            depth = 1.0 - yi / ROWS
            a = int(18 + 120 * depth ** 1.8)
            col = (140, 170, 240, a)
            d.line(pts, fill=col, width=1 if yi % 2 else 2, joint="curve")
        # columns (sparse, perspective rays)
        for xi in range(0, COLS + 1, 3):
            pts = [project(xs[xi], y) for y in ys]
            d.line(pts, fill=(120, 150, 225, 30), width=1, joint="curve")

        # horizon glow band
        glow = Image.new("RGBA", (W, 160), (255, 255, 255, 0))
        gd = ImageDraw.Draw(glow)
        for i in range(80):
            gd.line([(0, 80 - i * 0.5), (W, 80 - i * 0.5)], fill=(120, 150, 235, int(1.6 * (80 - i))))
        glow = glow.filter(ImageFilter.GaussianBlur(6))
        frame.paste(glow, (0, int(horizon - 120)), glow)
        return frame

    return render_frame


def main():
    ffmpeg, out_dir, poster_dir = sys.argv[1], sys.argv[2], sys.argv[3]
    which = sys.argv[4] if len(sys.argv) > 4 else "all"
    import os
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(poster_dir, exist_ok=True)
    rng = np.random.default_rng(20260930)

    jobs = {
        "field": (make_field, 26),
        "ascent": (make_ascent, 26),
        "terrain": (make_terrain, 25),
    }
    for name, (factory, crf) in jobs.items():
        if which not in ("all", name):
            continue
        print(f"== {name}", flush=True)
        r = factory(rng) if name != "terrain" else factory()
        encode(name, r, ffmpeg,
               f"{out_dir}/{name}.mp4", f"{poster_dir}/poster-{name}.jpg", crf)


if __name__ == "__main__":
    main()
