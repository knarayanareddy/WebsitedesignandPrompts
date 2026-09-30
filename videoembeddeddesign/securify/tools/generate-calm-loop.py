#!/usr/bin/env python3
"""Generate a seamless night-snowfall loop for the Securify 'calm' finale.

Output: 1920x1080, 30 fps, 15 s perfect loop (every particle returns to its
exact start state at t=T), soft bokeh snow in three depth layers on a dark
night gradient. Frames are piped raw into ffmpeg (H.264, CRF 23, +faststart).
"""
import math
import subprocess
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1920, 1080
FPS = 30
T = 15                      # seconds — BUILD_LOG §5 output spec is 8-15 s
N_FRAMES = FPS * T          # 450

rng = np.random.default_rng(20260930)

# ---------- background: dark night gradient + vignette + faint glow ----------
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
ny = yy / H
base_top = np.array([4, 5, 9], np.float32)       # near-black blue at top
base_bot = np.array([12, 15, 22], np.float32)    # slightly lifted slate at bottom
bg = base_top[None, None, :] * (1 - ny)[..., None] + base_bot[None, None, :] * ny[..., None]

# faint cold glow bottom-center (distant haze), very subtle
gx = (xx - W * 0.5) / (W * 0.75)
gy = (yy - H * 1.05) / (H * 0.85)
glow = np.exp(-(gx * gx + gy * gy) * 2.2)[..., None] * np.array([9, 11, 16], np.float32)
bg += glow

# vignette
vx = (xx - W / 2) / (W / 2)
vy = (yy - H / 2) / (H / 2)
vig = 1 - 0.22 * np.clip(vx * vx + vy * vy, 0, 1.6)
bg *= vig[..., None]
bg_img = Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8), "RGB")

# ---------- snow sprites (soft radial falloff) ----------
def make_sprite(radius: float, soft: float) -> Image.Image:
    size = max(3, int(math.ceil(radius * 2 + 4)))
    sprite = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    d = ImageDraw.Draw(sprite)
    for mul, a in ((1.0, 90), (0.72, 130), (0.45, 190)):
        r = radius * mul
        c = size / 2
        d.ellipse([c - r, c - r, c + r, c + r], fill=(255, 255, 255, a))
    if soft > 0:
        sprite = sprite.filter(ImageFilter.GaussianBlur(soft))
    return sprite

LAYERS = [
    # (count, radius range, alpha, descents/loop, sway px, softness)
    (230, (1.2, 2.6), 0.42, 1, (5, 12), 0.4),    # far haze
    (130, (2.6, 5.2), 0.62, 1, (10, 22), 1.0),   # mid fall
    (50,  (5.5, 11.0), 0.5, 2, (18, 38), 3.2),   # near bokeh
]

particles = []
for count, (rlo, rhi), alpha, k, (slo, shi), soft in LAYERS:
    radii = np.linspace(rlo, rhi, 5)
    variants = [make_sprite(float(r), soft) for r in radii]
    for _ in range(count):
        r = float(rng.uniform(rlo, rhi))
        sprite = variants[int(np.argmin([abs(r - v) for v in radii]))]
        wrap_h = H + 2 * r
        particles.append({
            "sprite": sprite,
            "alpha": alpha * float(rng.uniform(0.75, 1.15)),
            "x0": float(rng.uniform(-40, W + 40)),
            "y0": float(rng.uniform(0, wrap_h)),
            "r": r,
            # seamless vertical speed: exactly k descents of its wrap height per loop
            "speed": wrap_h * k / T,
            "sway_amp": float(rng.uniform(slo, shi)),
            "sway_k": int(rng.integers(1, 3)),   # integer cycles per loop → seamless
            "sway_ph": float(rng.uniform(0, 2 * math.pi)),
        })

alpha_cache = {}
def get_sprite(sprite: Image.Image, a: float) -> Image.Image:
    key = (id(sprite), round(a, 2))
    if key not in alpha_cache:
        s = sprite.copy()
        if a < 0.999:
            s.putalpha(s.getchannel("A").point(lambda v: int(v * min(1.0, a))))
        alpha_cache[key] = s
    return alpha_cache[key]

WIND_CYCLES = 2  # integer cycles per loop

def render_frame(t: float) -> Image.Image:
    frame = bg_img.copy()
    phase = 2 * math.pi * t / T
    wind = 16 * math.sin(WIND_CYCLES * phase + 1.0)
    for p in particles:
        y = (p["y0"] + p["speed"] * t) % (p["r"] * 2 + H) - p["r"]
        x = (p["x0"]
             + p["sway_amp"] * math.sin(p["sway_k"] * phase + p["sway_ph"])
             + wind)
        if y < -p["r"] * 2 or y > H + p["r"] or x < -p["r"] * 2 or x > W + p["r"] * 2:
            continue
        sprite = get_sprite(p["sprite"], p["alpha"])
        frame.paste(sprite, (int(x - sprite.width / 2), int(y - sprite.height / 2)), sprite)
    return frame

FFMPEG = sys.argv[1]
OUT_MP4 = sys.argv[2]

cmd = [
    FFMPEG, "-y", "-loglevel", "error",
    "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "23", "-preset", "slow",
    "-an", "-movflags", "+faststart", OUT_MP4,
]
proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
for i in range(N_FRAMES):
    proc.stdin.write(render_frame(i / FPS).tobytes())
    if i % 50 == 0:
        print(f"frame {i}/{N_FRAMES}", flush=True)
proc.stdin.close()
proc.wait()
if proc.returncode != 0:
    sys.exit(proc.returncode)
print("done", N_FRAMES, OUT_MP4)
