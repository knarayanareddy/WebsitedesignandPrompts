import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const MU = 398600; // km^3/s^2
const R_E = 6371; // km
const ACCENT = "#6FD8FF";

const PRESETS = [
  { k: "LEO", name: "Low Earth", alt: 550, inc: 53, note: "Broadband constellations, crew vehicles" },
  { k: "SSO", name: "Sun-synchronous", alt: 700, inc: 98, note: "Earth observation, constant light angle" },
  { k: "MEO", name: "Navigation", alt: 20200, inc: 55, note: "GNSS — 12-hour orbit" },
  { k: "GEO", name: "Geostationary", alt: 35786, inc: 0, note: "Fixed over one longitude" },
  { k: "LUNAR", name: "Lunar distance", alt: 384400, inc: 28.5, note: "Cislunar transfer & gateways" },
];

const MIN_LOG = Math.log10(300);
const MAX_LOG = Math.log10(400000);
const toSlider = (alt: number) => ((Math.log10(alt) - MIN_LOG) / (MAX_LOG - MIN_LOG)) * 100;
const fromSlider = (v: number) => Math.pow(10, MIN_LOG + (v / 100) * (MAX_LOG - MIN_LOG));

function fmtTime(s: number) {
  if (s < 3600 * 2) return `${(s / 60).toFixed(1)} min`;
  if (s < 86400 * 2) return `${(s / 3600).toFixed(2)} h`;
  return `${(s / 86400).toFixed(2)} days`;
}

export function OrbitSim() {
  const [alt, setAlt] = useState(550);
  const [inc, setInc] = useState(53);
  const [preset, setPreset] = useState<string | null>("LEO");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useRef({ alt, inc });
  params.current = { alt, inc };

  const stats = useMemo(() => {
    const r = R_E + alt;
    const v = Math.sqrt(MU / r);
    const T = 2 * Math.PI * Math.sqrt((r * r * r) / MU);
    const r1 = R_E + 300;
    const a = (r1 + r) / 2;
    const dv1 = Math.abs(Math.sqrt(MU / r1) * (Math.sqrt((2 * r) / (r1 + r)) - 1));
    const dv2 = Math.abs(Math.sqrt(MU / r) * (1 - Math.sqrt((2 * r1) / (r1 + r))));
    const transfer = Math.PI * Math.sqrt((a * a * a) / MU);
    return { v, T, dv: dv1 + dv2, latency: (alt / 299792) * 1000, transfer };
  }, [alt]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let theta = 0;
    let last = performance.now();
    let trail: { x: number; y: number }[] = [];
    let smoothR = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const TILT = (62 * Math.PI) / 180;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const { alt, inc } = params.current;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const cx = W / 2;
      const cy = H / 2;
      const earthPx = Math.min(W, H) * 0.12;
      const maxPx = Math.min(W, H) * 0.44;
      const target = earthPx + (maxPx - earthPx) * ((Math.log10(alt) - 2.4) / (5.6 - 2.4)) + earthPx * 0.15;
      smoothR += (target - (smoothR || target)) * Math.min(1, dt * 6) || 0;
      if (!smoothR) smoothR = target;
      const rpx = smoothR;

      const r = R_E + alt;
      const T = 2 * Math.PI * Math.sqrt((r * r * r) / MU);
      const omega = 1.6 * Math.pow(5700 / T, 0.33);
      theta += omega * dt;

      const i = (inc * Math.PI) / 180;
      const project = (th: number, rad: number) => {
        const x = rad * Math.cos(th);
        const y0 = rad * Math.sin(th) * Math.cos(i);
        const z0 = rad * Math.sin(th) * Math.sin(i);
        const Y = y0 * cosT - z0 * sinT;
        const depth = y0 * sinT + z0 * cosT;
        return { x: cx + x, y: cy + Y, depth };
      };

      ctx.clearRect(0, 0, W, H);

      // backdrop rings
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      [0.33, 0.66, 1].forEach((k) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, maxPx * k, maxPx * k * cosT, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.moveTo(cx - maxPx * 1.1, cy);
      ctx.lineTo(cx + maxPx * 1.1, cy);
      ctx.moveTo(cx, cy - maxPx * 1.1 * cosT);
      ctx.lineTo(cx, cy + maxPx * 1.1 * cosT);
      ctx.stroke();

      const drawOrbit = (back: boolean) => {
        ctx.beginPath();
        let started = false;
        for (let k = 0; k <= 180; k++) {
          const th = (k / 180) * Math.PI * 2;
          const p = project(th, rpx);
          const isBack = p.depth < 0;
          if (isBack !== back) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = back ? "rgba(111,216,255,0.22)" : "rgba(111,216,255,0.85)";
        ctx.lineWidth = back ? 1 : 1.4;
        if (back) ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      };

      drawOrbit(true);

      // Earth
      const g = ctx.createRadialGradient(cx - earthPx * 0.35, cy - earthPx * 0.35, earthPx * 0.1, cx, cy, earthPx);
      g.addColorStop(0, "#3f6d8a");
      g.addColorStop(0.6, "#173447");
      g.addColorStop(1, "#07121a");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, earthPx, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(111,216,255,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      // graticule
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, earthPx, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      for (let k = -2; k <= 2; k++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, earthPx, earthPx * 0.3 * Math.abs(k) + 0.001, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      const rot = now / 6000;
      for (let k = 0; k < 6; k++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, earthPx * Math.abs(Math.cos(rot + (k * Math.PI) / 6)), earthPx, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      drawOrbit(false);

      // satellite + trail
      const p = project(theta, rpx);
      const hidden = p.depth < 0 && Math.hypot(p.x - cx, p.y - cy) < earthPx;
      if (!hidden) trail.push({ x: p.x, y: p.y });
      else trail.push({ x: NaN, y: NaN });
      if (trail.length > 40) trail.shift();
      for (let k = 1; k < trail.length; k++) {
        const a = trail[k - 1];
        const b = trail[k];
        if (isNaN(a.x) || isNaN(b.x)) continue;
        ctx.strokeStyle = `rgba(255,255,255,${(k / trail.length) * 0.8})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      if (!hidden) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x - 8, p.y - 8, 16, 16);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = "10px 'Inter Tight', sans-serif";
        ctx.fillText(`${Math.round(alt).toLocaleString()} KM`, p.x + 14, p.y - 10);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const simFactor = (() => {
    const omega = 1.6 * Math.pow(5700 / stats.T, 0.33);
    return stats.T / ((2 * Math.PI) / omega);
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-[1728px] mx-auto">
      <div className="lg:col-span-7 relative bg-[#11151a] border border-white/10 rounded-[2px] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-[380px] sm:h-[480px] lg:h-[620px] block" />
        <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white/50">Live simulation · geocentric view</div>
        <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-white/50">Time ×{Math.round(simFactor).toLocaleString()}</div>
        <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest" style={{ color: ACCENT }}>
          ● {preset ?? "CUSTOM"}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-8">
          {PRESETS.map((p) => (
            <button
              key={p.k}
              onClick={() => {
                setAlt(p.alt);
                setInc(p.inc);
                setPreset(p.k);
              }}
              className={`px-4 py-3 text-sm uppercase transition-colors rounded-[2px] ${
                preset === p.k ? "text-black" : "bg-neutral-800 text-white/60 hover:text-white"
              }`}
              style={preset === p.k ? { background: ACCENT } : undefined}
            >
              {p.k}
            </button>
          ))}
        </div>

        <div className="text-white/50 text-sm mb-8 min-h-[40px]">
          {preset ? `${PRESETS.find((p) => p.k === preset)!.name} — ${PRESETS.find((p) => p.k === preset)!.note}` : "Custom orbit — tune altitude and inclination below."}
        </div>

        <div className="flex flex-col gap-7 mb-10">
          <div>
            <div className="flex justify-between text-xs uppercase tracking-wide mb-2">
              <span className="text-white/60">Altitude</span>
              <span>{Math.round(alt).toLocaleString()} km</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={toSlider(alt)}
              onChange={(e) => {
                setAlt(fromSlider(parseFloat(e.target.value)));
                setPreset(null);
              }}
              className="w-full"
              style={{ ["--thumb" as string]: ACCENT }}
            />
          </div>
          <div>
            <div className="flex justify-between text-xs uppercase tracking-wide mb-2">
              <span className="text-white/60">Inclination</span>
              <span>{inc.toFixed(1)}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={110}
              step={0.5}
              value={inc}
              onChange={(e) => {
                setInc(parseFloat(e.target.value));
                setPreset(null);
              }}
              className="w-full"
              style={{ ["--thumb" as string]: ACCENT }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-0 mt-auto">
          {[
            ["Orbital velocity", `${stats.v.toFixed(2)} km/s`],
            ["Period", fmtTime(stats.T)],
            ["Δv from 300 km LEO", `${stats.dv.toFixed(2)} km/s`],
            ["Hohmann transfer", fmtTime(stats.transfer)],
            ["One-way signal", `${stats.latency < 10 ? stats.latency.toFixed(2) : Math.round(stats.latency)} ms`],
            ["Orbits / day", (86400 / stats.T).toFixed(stats.T > 86400 ? 3 : 1)],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-white/15 pt-[10px] pb-5">
              <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1">{k}</div>
              <motion.div key={v} initial={{ opacity: 0.3, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-2xl tabular-nums">
                {v}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
