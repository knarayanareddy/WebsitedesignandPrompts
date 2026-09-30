import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Header, Reveal, AnimatedWords, Rule, SectionLabel, Wordmark, Footer, Arrow45 } from "../../shared/ui";
import { Calculator, PROFILES } from "./Calculator";

const ACCENT = "#C6F432";
const BG = "#0c0d0a";

/* ---------- Live sparkline in hero ---------- */
function LiveSpark() {
  const [pts, setPts] = useState<number[]>(() => {
    let v = 100;
    return Array.from({ length: 70 }, () => (v += (Math.random() - 0.42) * 2.2));
  });
  useEffect(() => {
    const id = setInterval(() => {
      setPts((p) => [...p.slice(1), p[p.length - 1] + (Math.random() - 0.42) * 2.6]);
    }, 700);
    return () => clearInterval(id);
  }, []);
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const W = 420;
  const H = 120;
  const d = pts.map((v, i) => `${i ? "L" : "M"}${(i / (pts.length - 1)) * W},${H - ((v - min) / (max - min || 1)) * (H - 10) - 5}`).join(" ");
  const last = pts[pts.length - 1];
  const chg = ((last - pts[0]) / pts[0]) * 100;
  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-[2px] w-full max-w-[460px]">
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50 mb-2">
        <span>Ledgr Balanced · live</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} /> streaming</span>
      </div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-4xl tabular-nums font-light">€{(last * 214.3).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        <span className={`text-sm tabular-nums ${chg >= 0 ? "" : "text-red-400"}`} style={chg >= 0 ? { color: ACCENT } : undefined}>
          {chg >= 0 ? "▲" : "▼"} {Math.abs(chg).toFixed(2)}%
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <path d={`${d} L${W},${H} L0,${H} Z`} fill={ACCENT} opacity="0.12" />
        <path d={d} fill="none" stroke={ACCENT} strokeWidth="1.8" />
      </svg>
    </div>
  );
}

/* ---------- Donut ---------- */
const SEGMENTS = ["Global equities", "Bonds", "Real assets", "Cash", "Alternatives"];
const COLORS = ["#C6F432", "#8FB31F", "#E9F8A8", "#566425", "#FFFFFF"];
const DESC = [
  "3,200 companies across 47 countries, cap-weighted.",
  "Investment-grade government and corporate debt.",
  "Listed property and infrastructure.",
  "Instant-access reserve earning overnight rates.",
  "Gold and systematic diversifiers.",
];
const ALLOC = [
  [25, 45, 10, 15, 5],
  [50, 25, 12, 8, 5],
  [72, 5, 12, 3, 8],
];

function Donut() {
  const [pi, setPi] = useState(1);
  const [hov, setHov] = useState<number | null>(null);
  const R = 90;
  const C = 2 * Math.PI * R;
  const a = ALLOC[pi];
  let acc = 0;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1728px] mx-auto items-center">
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="relative w-full max-w-[420px] aspect-square">
          <svg viewBox="0 0 240 240" className="w-full h-full -rotate-90">
            <circle cx="120" cy="120" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="26" />
            {a.map((pct, i) => {
              const len = (pct / 100) * C;
              const off = acc;
              acc += len;
              return (
                <motion.circle
                  key={i}
                  cx="120"
                  cy="120"
                  r={R}
                  fill="none"
                  stroke={COLORS[i]}
                  strokeWidth={hov === i ? 32 : 26}
                  animate={{ strokeDasharray: `${Math.max(0, len - 2)} ${C - Math.max(0, len - 2)}`, strokeDashoffset: -off, opacity: hov === null || hov === i ? 1 : 0.3 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-xs uppercase tracking-wider text-white/40">{hov === null ? PROFILES[pi].k : SEGMENTS[hov]}</div>
            <motion.div key={`${pi}-${hov}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-light tabular-nums" style={{ color: hov !== null ? COLORS[hov] : "#fff" }}>
              {hov === null ? `${PROFILES[pi].rate}%` : `${a[hov]}%`}
            </motion.div>
            <div className="text-[11px] uppercase tracking-wider text-white/40">{hov === null ? "expected / yr" : "of portfolio"}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full max-w-[420px] mt-8">
          {PROFILES.map((x, i) => (
            <button key={x.k} onClick={() => setPi(i)} className={`py-3 text-sm uppercase rounded-[2px] transition-colors ${pi === i ? "text-black" : "bg-neutral-800 text-white/60 hover:text-white"}`} style={pi === i ? { background: ACCENT } : undefined}>
              {x.k}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-7">
        <Rule />
        {SEGMENTS.map((s, i) => (
          <div key={s} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} className={`flex items-center gap-4 lg:gap-8 py-5 px-4 -mx-4 border-b border-white/15 transition-colors ${hov === i ? "bg-white/5" : ""}`}>
            <span className="w-3 h-3 shrink-0" style={{ background: COLORS[i] }} />
            <div className="flex-1 min-w-0">
              <div className={`text-xl lg:text-3xl transition-colors ${hov === i ? "text-white" : "text-white/70"}`}>{s}</div>
              <div className="text-sm text-white/40 mt-1">{DESC[i]}</div>
            </div>
            <motion.div key={a[i]} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="text-2xl lg:text-4xl tabular-nums">
              {a[i]}%
            </motion.div>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            ["Volatility", `±${PROFILES[pi].vol}%`],
            ["Worst year (hist.)", `${PROFILES[pi].dd}%`],
            ["Rebalancing", "Automatic"],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-white/15 pt-[10px]">
              <div className="text-[11px] uppercase tracking-wider text-white/40">{k}</div>
              <div className="text-xl lg:text-2xl">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Tilt card ---------- */
function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });
  const rx = useTransform(sy, [0, 1], [16, -16]);
  const ry = useTransform(sx, [0, 1], [-20, 20]);
  const glare = useTransform([sx, sy], ([x, y]) => `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.35), transparent 50%)`);
  const [flip, setFlip] = useState(false);
  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-center py-10 [perspective:1200px]"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative w-[320px] sm:w-[420px] lg:w-[480px] aspect-[1.586] cursor-pointer" onClick={() => setFlip((f) => !f)}>
        <motion.div className="absolute inset-0" animate={{ rotateY: flip ? 180 : 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 rounded-[14px] p-6 lg:p-8 flex flex-col justify-between overflow-hidden border border-white/15" style={{ background: "linear-gradient(135deg,#1a1d12,#0a0b07 60%,#232a10)", backfaceVisibility: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
            <motion.div className="absolute inset-0 pointer-events-none" style={{ background: glare }} />
            <div className="flex justify-between items-start relative">
              <span className="text-2xl font-semibold tracking-tight">Ledgr</span>
              <span className="text-[10px] uppercase tracking-widest text-white/50">Metal · Visa</span>
            </div>
            <div className="relative">
              <div className="w-11 h-8 rounded-[3px] mb-5" style={{ background: `linear-gradient(135deg, ${ACCENT}, #7d9c12)` }} />
              <div className="text-lg lg:text-2xl tracking-[0.25em] tabular-nums text-white/90">4821 ·· ·· 0093</div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50 mt-3">
                <span>A. Lindqvist</span>
                <span>09/29</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-[14px] overflow-hidden border border-white/15" style={{ background: "linear-gradient(135deg,#232a10,#0a0b07)", transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
            <div className="h-12 bg-black mt-8" />
            <div className="p-6 text-xs text-white/50 leading-relaxed">
              Round-ups invested automatically. 1.5% back in your portfolio on every spend. No FX fees in 150+ currencies.
              <div className="mt-4 uppercase tracking-widest" style={{ color: ACCENT }}>Tap to flip back</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const FAQ = [
  { q: "How are my investments protected?", a: "Assets are held with a regulated custodian, segregated from Ledgr's own balance sheet. Cash balances are covered up to €100,000 under the deposit guarantee scheme." },
  { q: "What does Ledgr cost?", a: "A flat 0.25% a year on invested assets — that's it. No trading fees, no exit fees, no minimums. Underlying fund costs average 0.07%." },
  { q: "Can I withdraw at any time?", a: "Yes. Request a withdrawal any weekday and funds reach your bank in one to two working days. There are no lock-ins." },
  { q: "How does automatic rebalancing work?", a: "Every night we compare your holdings to your target mix. If any slice drifts more than 2% we rebalance using new deposits first, selling only as a last resort." },
  { q: "Is this financial advice?", a: "Ledgr provides discretionary portfolio management based on your risk profile. Capital is at risk and past performance is not a guide to future returns." },
];

export default function Ledgr() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="text-white" style={{ background: BG }}>
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col overflow-hidden" style={{ background: `radial-gradient(ellipse at 75% 35%, rgba(198,244,50,0.14), transparent 55%), ${BG}` }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header
            brand="Ledgr"
            mark={
              <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none">
                <rect x="3" y="3" width="30" height="30" rx="2" fill={ACCENT} />
                <path d="M9 24l6-7 5 4 7-10" stroke="#000" strokeWidth="2.4" />
              </svg>
            }
            links={["Calculator", "Portfolios", "Card", "FAQ"]}
            cta="Open an account"
            secondary="Collection"
            accent={ACCENT}
          />
          <div className="relative flex flex-1 items-center justify-start lg:justify-end px-5 lg:px-10 py-10">
            <motion.span className="hidden lg:block absolute left-10 text-xs font-medium uppercase tracking-wide" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              AUTHORISED & REGULATED · DEPOSIT PROTECTED
            </motion.span>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} className="w-full flex lg:justify-end">
              <LiveSpark />
            </motion.div>
          </div>
          <div className="flex w-full flex-col items-start gap-6 px-5 pb-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-10 lg:gap-10">
            <motion.h1 className="text-[44px] leading-[1.02] font-normal sm:text-6xl lg:text-[120px] lg:leading-[0.95]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
              Money that
              <br />
              compounds <span style={{ color: ACCENT }}>quietly</span>
            </motion.h1>
            <motion.p className="w-full text-sm text-white/75 lg:w-96 lg:text-base" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
              Globally diversified portfolios for 0.25% a year. No jargon, no lock-ins — and a calculator that shows you exactly what time does.
            </motion.p>
          </div>
          <motion.div className="mx-auto h-[1px] w-[calc(100%-40px)] lg:w-[calc(100%-80px)] bg-white/25" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1 }} />
          <div className="flex w-full flex-col gap-2 px-5 py-4 text-[10px] uppercase tracking-wider sm:flex-row sm:justify-between lg:px-10 lg:py-6 lg:text-xs">
            <span className="text-stone-300">CAPITAL AT RISK · PAST PERFORMANCE IS NOT A GUIDE</span>
            <span className="text-neutral-400">SCROLL TO PROJECT YOUR FUTURE</span>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="max-w-[1728px] mx-auto mb-14 flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <SectionLabel n="02">Growth Calculator</SectionLabel>
            <h2 className="mt-6 text-[40px] sm:text-5xl lg:text-[81px] leading-[1.05] font-light">
              <AnimatedWords text="See what" />
              <br />
              <span className="opacity-50">
                <AnimatedWords text="time can do." delayStart={0.2} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.3} className="text-white/50 max-w-sm lg:mt-14">
            Move the sliders. Scrub the chart. Flip the fee switch to see exactly how much the small print costs over a lifetime.
          </Reveal>
        </div>
        <Calculator />
      </section>

      {/* PORTFOLIOS */}
      <section id="portfolios" className="px-5 py-16 lg:px-10 lg:py-32 border-t border-white/10">
        <div className="max-w-[1728px] mx-auto mb-14 flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <SectionLabel n="03">Portfolios</SectionLabel>
            <h2 className="mt-6 text-4xl lg:text-[60px] leading-[1.05]">
              What's <span className="text-stone-400">inside</span>
            </h2>
          </div>
          <Reveal delay={0.2} className="text-[#888888] max-w-[320px] lg:mt-10">
            Hover a slice. Switch profile. Every mix is rebalanced automatically, every night.
          </Reveal>
        </div>
        <Donut />
      </section>

      {/* CARD */}
      <section id="card" className="px-5 py-16 lg:px-10 lg:py-32 border-t border-white/10">
        <div className="grid w-full max-w-[1728px] mx-auto grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <SectionLabel n="04">The Card</SectionLabel>
            <Reveal delay={0.15} className="text-[#888888] max-w-[320px]">
              Spend anywhere. Invest the change. Tilt it, flip it — it's built to be held.
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <TiltCard />
            <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 mt-10">
              {[
                { t: "Round-ups", l: ["Every purchase rounded up", "Spare change auto-invested", "Pause or boost any time", "Weekly summary in-app"] },
                { t: "Travel", l: ["No FX fees in 150+ currencies", "Free ATM withdrawals abroad", "Instant freeze & unfreeze", "Contactless & wallet ready"] },
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
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 py-16 lg:px-10 lg:py-32 border-t border-white/10">
        <div className="max-w-[1728px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionLabel n="05">Questions</SectionLabel>
            <h2 className="mt-6 text-4xl lg:text-[60px] leading-[1.05]">
              Plainly <span className="text-stone-400">answered</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Rule />
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-white/25">
                  <button onClick={() => setOpen(isOpen ? null : i)} className="group w-full flex justify-between items-center gap-6 py-6 px-4 -mx-4 hover:bg-white/5 transition-colors text-left">
                    <span className={`text-xl lg:text-3xl transition-colors ${isOpen ? "text-white" : "text-white/60 group-hover:text-white"}`}>{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="shrink-0">
                      <Arrow45 className="w-4 h-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden">
                        <p className="pb-8 text-white/50 max-w-2xl">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Wordmark text="LEDGR" bgColor={BG} />
      <Footer
        brand="Ledgr"
        since="2020"
        partners={["Visa", "State Street", "Vanguard", "BlackRock", "Stripe"]}
        socials={["LinkedIn", "X", "Instagram", "GitHub"]}
        email="hello@ledgr.money"
        callText="Questions about your plan? Talk to a human planner — no scripts."
        callCta="Book a call"
        accent={ACCENT}
        bgColor={BG}
      />
    </main>
  );
}
