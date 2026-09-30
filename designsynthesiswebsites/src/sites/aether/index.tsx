import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Reveal, AnimatedWords, Rule, SectionLabel, Wordmark, Footer, Arrow45, useCountUp } from "../../shared/ui";
import { OrbitSim } from "./OrbitSim";

const ACCENT = "#6FD8FF";
const BG = "#0b0d10";

/* ---------- Hero starfield ---------- */
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const mouse = { x: 0, y: 0 };
    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.9 + 0.1,
      tw: Math.random() * Math.PI * 2,
    }));
    let shoot: { x: number; y: number; life: number } | null = null;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);
    const draw = (t: number) => {
      const W = c.clientWidth;
      const H = c.clientHeight;
      ctx.clearRect(0, 0, W, H);
      // planet limb
      const pr = W * 1.1;
      const g = ctx.createRadialGradient(W / 2, H + pr * 0.78, pr * 0.9, W / 2, H + pr * 0.78, pr * 1.02);
      g.addColorStop(0, "rgba(111,216,255,0)");
      g.addColorStop(0.75, "rgba(111,216,255,0.25)");
      g.addColorStop(0.9, "rgba(111,216,255,0.6)");
      g.addColorStop(1, "rgba(111,216,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#05070a";
      ctx.beginPath();
      ctx.arc(W / 2 - mouse.x * 20, H + pr * 0.78 - mouse.y * 10, pr * 0.9, 0, Math.PI * 2);
      ctx.fill();

      for (const s of stars) {
        const px = s.x * W - mouse.x * 60 * s.z;
        const py = s.y * H - mouse.y * 40 * s.z;
        const a = 0.3 + 0.7 * Math.abs(Math.sin(t / 1000 * s.z + s.tw));
        ctx.fillStyle = `rgba(255,255,255,${a * s.z})`;
        ctx.fillRect(px, py, s.z * 1.8, s.z * 1.8);
      }
      if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * W, y: Math.random() * H * 0.4, life: 0 };
      if (shoot) {
        shoot.life += 0.03;
        const x = shoot.x + shoot.life * 260;
        const y = shoot.y + shoot.life * 110;
        const grad = ctx.createLinearGradient(x, y, x - 90, y - 38);
        grad.addColorStop(0, `rgba(255,255,255,${1 - shoot.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 90, y - 38);
        ctx.stroke();
        if (shoot.life >= 1) shoot = null;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

function Countdown() {
  const [target] = useState(() => Date.now() + (3 * 86400 + 4 * 3600 + 27 * 60 + 12) * 1000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.max(0, target - now) / 1000;
  const parts = [
    ["D", Math.floor(d / 86400)],
    ["H", Math.floor((d % 86400) / 3600)],
    ["M", Math.floor((d % 3600) / 60)],
    ["S", Math.floor(d % 60)],
  ] as const;
  return (
    <div className="flex gap-4 tabular-nums">
      {parts.map(([l, v]) => (
        <div key={l} className="flex items-baseline gap-1">
          <span className="text-3xl lg:text-5xl font-light">{String(v).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase text-white/40">{l}</span>
        </div>
      ))}
    </div>
  );
}

const LOG = [
  { id: "AE-014", name: "Halcyon-3", status: "ACTIVE", orbit: "SSO · 700 km", year: "2025", text: "Twelve-satellite optical constellation delivering 40 cm imagery with under 90 minutes revisit over any point on Earth." },
  { id: "AE-015", name: "Tessera Relay", status: "ACTIVE", orbit: "GEO · 35,786 km", year: "2025", text: "Laser-linked relay node that aggregates constellation downlink and cuts ground-station dependency by 60%." },
  { id: "AE-016", name: "Periapsis", status: "UPCOMING", orbit: "Cislunar · NRHO", year: "2026", text: "A reusable tug that shuttles payloads between LEO and lunar gateway orbit on a 5-day Hohmann-class transfer." },
  { id: "AE-011", name: "Lantern", status: "COMPLETE", orbit: "LEO · 550 km", year: "2023", text: "Technology demonstrator — validated autonomous collision avoidance across 4,200 conjunction events." },
  { id: "AE-017", name: "Cairn", status: "UPCOMING", orbit: "MEO · 20,200 km", year: "2027", text: "Resilient positioning payload providing decimetre-level navigation independent of legacy GNSS." },
  { id: "AE-009", name: "First Light", status: "COMPLETE", orbit: "LEO · 480 km", year: "2021", text: "Our first flight. Eighteen months nominal, deorbited cleanly with zero debris generated." },
];

export default function Aether() {
  const [filter, setFilter] = useState("ALL");
  const [open, setOpen] = useState<string | null>("AE-014");
  const shown = LOG.filter((l) => filter === "ALL" || l.status === filter);
  const { ref: cRef, val } = useCountUp(1284, 1.8, 0);

  return (
    <main className="text-white" style={{ background: BG }}>
      {/* HERO */}
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black">
        <Starfield />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header
            brand="Aether"
            mark={
              <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="6" fill={ACCENT} />
                <ellipse cx="18" cy="18" rx="16" ry="7" stroke="#fff" strokeWidth="1.3" transform="rotate(-25 18 18)" />
              </svg>
            }
            links={["Simulator", "Capabilities", "Missions"]}
            cta="Request a launch"
            secondary="Collection"
            accent={ACCENT}
          />
          <div className="relative flex flex-1 items-center py-10 lg:py-0">
            <motion.span className="absolute left-5 lg:left-10 text-[10px] lg:text-xs font-medium uppercase tracking-wide" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              NEXT LAUNCH · PERIAPSIS-01
            </motion.span>
            <motion.div className="absolute right-5 lg:right-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
              <div className="text-[10px] lg:text-xs uppercase tracking-wide text-white/50 mb-2 text-right">T-MINUS</div>
              <Countdown />
            </motion.div>
          </div>
          <div className="flex w-full flex-col items-start gap-6 px-5 pb-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-10 lg:gap-10">
            <motion.h1 className="text-[40px] leading-[1.05] font-normal sm:text-6xl lg:text-[110px] lg:leading-[0.98]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
              Orbit,
              <br />
              made <span style={{ color: ACCENT }}>legible</span>
            </motion.h1>
            <motion.p className="w-full text-sm text-white/75 lg:w-96 lg:text-base" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
              Aether builds, launches and operates small-satellite fleets — with mission tools so transparent you can feel the physics.
            </motion.p>
          </div>
          <motion.div className="mx-auto h-[1px] w-[calc(100%-40px)] lg:w-[calc(100%-80px)] bg-white/25" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1 }} />
          <div className="flex w-full flex-col gap-2 px-5 py-4 text-[10px] uppercase tracking-wider sm:flex-row sm:justify-between lg:px-10 lg:py-6 lg:text-xs">
            <span className="text-stone-300">EVERY ORBIT IS A TRADE-OFF — SEE THEM ALL</span>
            <span className="text-neutral-400">SCROLL TO SIMULATE</span>
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="simulator" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="max-w-[1728px] mx-auto mb-14 flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <SectionLabel n="02">Mission Designer</SectionLabel>
            <h2 className="mt-6 text-[40px] sm:text-5xl lg:text-[81px] leading-[1.05] font-light">
              <AnimatedWords text="Choose an orbit." />
              <br />
              <span className="opacity-50">
                <AnimatedWords text="Feel the cost." delayStart={0.2} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.3} className="text-white/50 max-w-sm lg:mt-14">
            Drag altitude from 300 km to lunar distance. Velocity, period, Δv and latency are computed from real two-body mechanics.
          </Reveal>
        </div>
        <OrbitSim />
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="grid w-full max-w-[1728px] mx-auto grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <SectionLabel n="03">Capabilities</SectionLabel>
            <Reveal delay={0.15} className="text-[#888888] max-w-[320px]">
              From a blank sheet to an operating constellation — one integrated team, one ground segment.
            </Reveal>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {[
              { t: "Spacecraft Bus", l: ["12–180 kg modular platforms", "Electric & cold-gas propulsion", "Radiation-tolerant avionics", "Six-week integration cycle"] },
              { t: "Launch Services", l: ["Rideshare & dedicated slots", "Sun-synchronous and equatorial", "Orbit-raising tug included", "Insurance and licensing handled"] },
              { t: "Ground & Operations", l: ["Global antenna network", "Autonomous conjunction avoidance", "Laser inter-satellite links", "24/7 mission control"] },
              { t: "Data & Analytics", l: ["Tasking API in minutes", "On-orbit edge processing", "Open formats, no lock-in", "Sovereign data options"] },
            ].map((it, idx) => (
              <div key={it.t} className="border-t border-white/15 pt-[10px]">
                <Reveal y={20} delay={idx * 0.1} className="text-2xl lg:text-[28px] mb-5">
                  {it.t}
                </Reveal>
                <ul className="flex flex-col gap-[3px] text-[#888888]">
                  {it.l.map((li, i) => (
                    <Reveal key={li} y={12} delay={idx * 0.1 + 0.15 + i * 0.08}>
                      <li>{li}</li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={cRef as unknown as React.RefObject<HTMLElement>} className="relative h-[90vh] overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(to bottom, #0b0d10, #10252e)" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: `${i * 22}vmin`, height: `${i * 22}vmin` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30 + i * 14, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-[3px] left-1/2 w-[6px] h-[6px]" style={{ background: ACCENT }} />
          </motion.div>
        ))}
        <div className="relative z-10 flex flex-col items-center text-center px-5">
          <Reveal className="text-white/80 text-xl mb-2">Objects tracked in real time by Aether SSA</Reveal>
          <div className="text-[90px] sm:text-[140px] lg:text-[220px] leading-none font-light tabular-nums">{Number(val).toLocaleString()}</div>
          <Reveal className="text-2xl lg:text-3xl mb-10">active satellites monitored</Reveal>
          <Reveal className="text-zinc-300 max-w-sm mb-10">Open conjunction data, free to every operator. Safer orbits are everyone's business.</Reveal>
          <button className="text-black text-lg px-10 py-5 rounded-[2px] hover:opacity-90 transition-opacity" style={{ background: ACCENT }}>
            Open the data feed
          </button>
        </div>
      </section>

      {/* MISSION LOG */}
      <section id="missions" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="max-w-[1728px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionLabel n="05">Mission Log</SectionLabel>
            <h2 className="mt-6 text-4xl lg:text-[60px] leading-[1.05]">
              Flights, <span className="text-stone-400">past & planned</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-4 lg:gap-8 mb-6">
              {["ALL", "ACTIVE", "UPCOMING", "COMPLETE"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`text-sm font-medium uppercase transition-colors ${filter === f ? "text-white" : "text-white/40 hover:text-white/70"}`}>
                  {f} ({f === "ALL" ? LOG.length : LOG.filter((l) => l.status === f).length})
                </button>
              ))}
            </div>
            <Rule />
            <AnimatePresence mode="popLayout">
              {shown.map((l) => {
                const isOpen = open === l.id;
                return (
                  <motion.div key={l.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-white/25">
                    <button onClick={() => setOpen(isOpen ? null : l.id)} className="group w-full flex items-center justify-between gap-4 py-6 hover:bg-white/5 px-4 -mx-4 transition-colors text-left">
                      <div className="flex items-baseline gap-4 lg:gap-8">
                        <span className="text-xs text-white/40 tabular-nums">{l.id}</span>
                        <span className={`text-2xl lg:text-4xl transition-colors ${isOpen ? "text-white" : "text-white/60 group-hover:text-white"}`}>{l.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] uppercase tracking-wider px-2 py-1 border rounded-[2px]" style={{ borderColor: l.status === "ACTIVE" ? ACCENT : "rgba(255,255,255,0.2)", color: l.status === "ACTIVE" ? ACCENT : "rgba(255,255,255,0.6)" }}>
                          {l.status}
                        </span>
                        <motion.span animate={{ rotate: isOpen ? 90 : 0 }}>
                          <Arrow45 className="w-3 h-3" />
                        </motion.span>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden">
                          <div className="pb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                            <p className="md:col-span-2 text-white/60 text-base">{l.text}</p>
                            <div className="flex flex-col gap-2 text-white/50">
                              <span>Orbit — <span className="text-white">{l.orbit}</span></span>
                              <span>Year — <span className="text-white">{l.year}</span></span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Wordmark text="AETHER" bgColor={BG} />
      <Footer
        brand="Aether"
        since="2019"
        partners={["ESA", "Rocket Lab", "Airbus", "NOAA", "Maxar"]}
        socials={["LinkedIn", "X", "YouTube", "GitHub"]}
        email="ops@aether.space"
        callText="Tell us the orbit and the payload. We'll come back with a manifest."
        callCta="Plan a mission"
        accent={ACCENT}
        bgColor={BG}
      />
    </main>
  );
}
