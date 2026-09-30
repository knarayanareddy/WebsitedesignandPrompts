import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#B5533C";

const WALLS = [
  { k: "Limewash", c: "#E6DFD2", c2: "#D4CCBC", price: 38 },
  { k: "Clay", c: "#C98D6E", c2: "#B47957", price: 46 },
  { k: "Sage", c: "#A9B29A", c2: "#939D84", price: 42 },
  { k: "Charcoal", c: "#3A3A3C", c2: "#2B2B2D", price: 52 },
];
const FLOORS = [
  { k: "Oak", c: "#B98B5E", line: "rgba(80,50,20,0.25)", price: 120 },
  { k: "Concrete", c: "#9C9B96", line: "rgba(0,0,0,0.08)", price: 85 },
  { k: "Terrazzo", c: "#D8D0C3", line: "rgba(0,0,0,0.04)", price: 210, dots: true },
  { k: "Walnut", c: "#5B3D2C", line: "rgba(0,0,0,0.3)", price: 165 },
];
const SOFAS = [
  { k: "Bouclé", c: "#EFE8DB", price: 4200 },
  { k: "Terracotta", c: "#B5533C", price: 4600 },
  { k: "Olive", c: "#6B7048", price: 4400 },
  { k: "Ink", c: "#1E2A3A", price: 4800 },
];

const DOTS = Array.from({ length: 70 }, (_, i) => {
  const s = Math.sin(i * 91.7) * 10000;
  const r = s - Math.floor(s);
  const s2 = Math.sin(i * 37.1 + 4) * 10000;
  const r2 = s2 - Math.floor(s2);
  return { x: 80 + r * 640, y: 345 + r2 * 150, r: 1.5 + ((i * 7) % 5) * 0.8, c: ["#B5533C", "#6B7048", "#444", "#fff"][i % 4] };
});

export function Configurator() {
  const [wall, setWall] = useState(0);
  const [floor, setFloor] = useState(0);
  const [sofa, setSofa] = useState(1);
  const [hour, setHour] = useState(15);
  const [area, setArea] = useState(42);

  const w = WALLS[wall];
  const f = FLOORS[floor];
  const s = SOFAS[sofa];
  const day = Math.max(0, Math.sin(((hour - 6) / 14) * Math.PI));
  const off = ((hour - 13) / 7) * 180;
  const dark = wall === 3;

  const total = useMemo(() => Math.round(area * (w.price + f.price) + s.price + 1800), [area, w, f, s]);
  const skyTop = day > 0.05 ? `rgb(${Math.round(120 + 100 * day)},${Math.round(150 + 80 * day)},${Math.round(200 + 50 * day)})` : "#10131f";
  const skyBot = hour < 9 || hour > 17 ? "#F2A36B" : "#DCEBF5";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1728px] mx-auto">
      <div className="lg:col-span-8">
        <div className="relative bg-[#1c1c1c] overflow-hidden rounded-[2px]">
          <svg viewBox="0 0 800 500" className="w-full h-auto block" role="img" aria-label="Room preview">
            <defs>
              <clipPath id="floorClip">
                <polygon points="0,500 800,500 600,340 200,340" />
              </clipPath>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={skyTop} />
                <stop offset="1" stopColor={skyBot} />
              </linearGradient>
              <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFF4D6" stopOpacity={0.75 * day} />
                <stop offset="1" stopColor="#FFF4D6" stopOpacity={0.25 * day} />
              </linearGradient>
              <radialGradient id="lamp" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#FFD9A0" stopOpacity="0.9" />
                <stop offset="1" stopColor="#FFD9A0" stopOpacity="0" />
              </radialGradient>
              <pattern id="planks" width="80" height="22" patternUnits="userSpaceOnUse">
                <rect width="80" height="22" fill="none" />
                <line x1="0" y1="0" x2="80" y2="0" stroke={f.line} strokeWidth="1.5" />
                <line x1="40" y1="0" x2="40" y2="22" stroke={f.line} strokeWidth="1" />
              </pattern>
            </defs>

            {/* surfaces */}
            <motion.polygon animate={{ fill: w.c }} transition={{ duration: 0.5 }} points="200,100 600,100 600,340 200,340" />
            <motion.polygon animate={{ fill: w.c2 }} transition={{ duration: 0.5 }} points="0,0 200,100 200,340 0,500" />
            <motion.polygon animate={{ fill: w.c2 }} transition={{ duration: 0.5 }} points="800,0 600,100 600,340 800,500" style={{ filter: "brightness(0.92)" }} />
            <motion.polygon animate={{ fill: w.c }} transition={{ duration: 0.5 }} points="0,0 800,0 600,100 200,100" style={{ filter: "brightness(1.06)" }} />
            <motion.polygon animate={{ fill: f.c }} transition={{ duration: 0.5 }} points="0,500 800,500 600,340 200,340" />
            <g clipPath="url(#floorClip)">
              {floor === 0 || floor === 3 ? <rect x="0" y="340" width="800" height="160" fill="url(#planks)" /> : null}
              {f.dots && DOTS.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity="0.55" />)}
              {/* sun beam */}
              <polygon points={`300,340 500,340 ${520 + off * 2.1},520 ${230 + off * 2.1},520`} fill="url(#beam)" />
            </g>

            {/* window */}
            <rect x="300" y="140" width="200" height="140" fill="url(#sky)" />
            <rect x="300" y="140" width="200" height="140" fill="none" stroke={dark ? "#888" : "#2a2a2a"} strokeWidth="5" />
            <line x1="400" y1="140" x2="400" y2="280" stroke={dark ? "#888" : "#2a2a2a"} strokeWidth="3" />
            <line x1="300" y1="210" x2="500" y2="210" stroke={dark ? "#888" : "#2a2a2a"} strokeWidth="3" />
            <circle cx={310 + ((hour - 6) / 14) * 180} cy={250 - day * 90} r="10" fill="#FFF3C4" opacity={day > 0.05 ? 0.95 : 0} />

            {/* rug */}
            <ellipse cx="400" cy="430" rx="190" ry="36" fill="#000" opacity="0.14" />
            <ellipse cx="400" cy="425" rx="180" ry="32" fill={dark ? "#555" : "#EDE3D0"} opacity="0.92" />

            {/* sofa */}
            <motion.g animate={{ fill: s.c }} transition={{ duration: 0.4 }}>
              <rect x="250" y="300" width="300" height="46" rx="8" />
              <rect x="230" y="320" width="44" height="64" rx="8" />
              <rect x="526" y="320" width="44" height="64" rx="8" />
              <rect x="250" y="340" width="300" height="44" rx="8" style={{ filter: "brightness(1.12)" }} />
            </motion.g>
            <rect x="262" y="384" width="8" height="12" fill="#222" />
            <rect x="530" y="384" width="8" height="12" fill="#222" />

            {/* coffee table */}
            <rect x="350" y="404" width="100" height="10" fill="#222" />
            <rect x="360" y="414" width="6" height="18" fill="#222" />
            <rect x="434" y="414" width="6" height="18" fill="#222" />

            {/* lamp */}
            <circle cx="650" cy="260" r="80" fill="url(#lamp)" opacity={1 - day} />
            <line x1="650" y1="270" x2="650" y2="410" stroke="#222" strokeWidth="3" />
            <path d="M628 270 L672 270 L662 235 L638 235 Z" fill="#F4E6CC" />
            <ellipse cx="650" cy="412" rx="22" ry="5" fill="#222" />

            {/* plant */}
            <path d="M150 400 Q140 340 160 300 Q170 350 160 400 Z" fill="#4C6A3C" />
            <path d="M160 400 Q175 330 205 310 Q190 360 170 400 Z" fill="#5F7F4C" />
            <path d="M150 400 Q120 350 110 320 Q140 340 158 400 Z" fill="#3E5A31" />
            <path d="M130 400 L190 400 L182 445 L138 445 Z" fill={ACCENT} />

            {/* daylight */}
            <rect width="800" height="500" fill="#0b0d1a" opacity={(1 - day) * 0.5} style={{ mixBlendMode: "multiply" }} />
          </svg>
          <div className="absolute top-4 left-4 bg-black/60 text-white text-[10px] uppercase tracking-widest px-3 py-2 rounded-[2px] backdrop-blur">
            Living room · {String(Math.floor(hour)).padStart(2, "0")}:{String(Math.round((hour % 1) * 60)).padStart(2, "0")}
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-xs uppercase tracking-wide mb-2">
            <span className="text-black/60">Time of day — watch the light move</span>
            <span>{day > 0.5 ? "Daylight" : day > 0.05 ? "Golden hour" : "Night"}</span>
          </div>
          <input type="range" min={6} max={21} step={0.1} value={hour} onChange={(e) => setHour(parseFloat(e.target.value))} className="w-full" style={{ ["--thumb" as string]: ACCENT }} />
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-8">
        {[
          { t: "Walls", list: WALLS, cur: wall, set: setWall, col: (x: (typeof WALLS)[number]) => x.c },
          { t: "Floor", list: FLOORS, cur: floor, set: setFloor, col: (x: (typeof FLOORS)[number]) => x.c },
          { t: "Sofa", list: SOFAS, cur: sofa, set: setSofa, col: (x: (typeof SOFAS)[number]) => x.c },
        ].map((g) => (
          <div key={g.t}>
            <div className="flex justify-between text-xs uppercase tracking-wide mb-3">
              <span className="text-black/60">{g.t}</span>
              <span>{(g.list as { k: string }[])[g.cur].k}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(g.list as { k: string; c: string }[]).map((o, i) => (
                <button
                  key={o.k}
                  onClick={() => g.set(i)}
                  aria-label={o.k}
                  className={`h-14 rounded-[2px] transition-all ${g.cur === i ? "ring-2 ring-offset-2 ring-offset-[#ECE7DF] ring-black scale-[1.03]" : "hover:scale-[1.03]"}`}
                  style={{ background: o.c }}
                />
              ))}
            </div>
          </div>
        ))}
        <div>
          <div className="flex justify-between text-xs uppercase tracking-wide mb-2">
            <span className="text-black/60">Floor area</span>
            <span className="tabular-nums">{area} m²</span>
          </div>
          <input type="range" min={20} max={120} value={area} onChange={(e) => setArea(parseInt(e.target.value))} className="w-full" style={{ ["--thumb" as string]: ACCENT }} />
        </div>
        <div className="border-t border-black/20 pt-4 mt-auto">
          <div className="text-xs uppercase tracking-wide text-black/50 mb-1">Indicative fit-out</div>
          <motion.div key={total} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-5xl lg:text-6xl font-light tabular-nums">
            €{total.toLocaleString()}
          </motion.div>
          <div className="text-sm text-black/50 mt-2">Surfaces, furniture and labour. Excludes structural work.</div>
          <button className="mt-6 w-full bg-[#161616] text-white py-4 rounded-[2px] hover:bg-black transition-colors">Send this brief to the studio</button>
        </div>
      </div>
    </div>
  );
}
