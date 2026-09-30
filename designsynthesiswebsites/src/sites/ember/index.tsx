import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Reveal, AnimatedWords, Rule, SectionLabel, Wordmark, Footer } from "../../shared/ui";

const ACCENT = "#F2B544";
const BG = "#140f0b";
const px = (id: number, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

type Tag = "V" | "P" | "GF";
type Dish = { id: string; name: string; desc: string; price: number; tags: Tag[]; img?: string };
type Course = { id: string; label: string; dishes: Dish[] };

const COURSES: Course[] = [
  {
    id: "snack",
    label: "Snack",
    dishes: [
      { id: "s1", name: "Smoked Oyster, Ember Butter", desc: "Pacific oyster, cold-smoked over vine cuttings", price: 14, tags: ["P", "GF"] },
      { id: "s2", name: "Charred Leek Tart", desc: "Buttery shell, leek ash, aged cheddar", price: 12, tags: ["V"] },
      { id: "s3", name: "Beef Tartare Crisp", desc: "Hand-cut sirloin, smoked yolk, pickled shallot", price: 15, tags: ["GF"] },
    ],
  },
  {
    id: "starter",
    label: "Starter",
    dishes: [
      { id: "t1", name: "Scallop, Burnt Apple, Dill Oil", desc: "Hand-dived scallop seared on cast iron", price: 28, tags: ["P", "GF"], img: px(8112888) },
      { id: "t2", name: "Roasted Beetroot, Goat's Curd", desc: "Embered beets, whipped curd, toasted hazelnut", price: 22, tags: ["V", "GF"], img: px(24245839) },
      { id: "t3", name: "Hen's Egg, Brown Butter", desc: "63° yolk, chive, sourdough soldiers", price: 20, tags: ["V"], img: px(24186308) },
    ],
  },
  {
    id: "fish",
    label: "Fish",
    dishes: [
      { id: "f1", name: "Coal-Grilled Salmon, Sea Herbs", desc: "Line-caught, lemon beurre noisette", price: 38, tags: ["P", "GF"], img: px(29168406) },
      { id: "f2", name: "Turbot, Champagne Beurre Blanc", desc: "On the bone, finished over oak", price: 46, tags: ["P"], img: px(24289213) },
      { id: "f3", name: "Charred Cauliflower, Tahini", desc: "Whole roasted head, dukkah, pomegranate", price: 30, tags: ["V", "GF"] },
    ],
  },
  {
    id: "meat",
    label: "Fire",
    dishes: [
      { id: "m1", name: "Dry-Aged Sirloin, Bone Marrow", desc: "45-day Hereford, bone-marrow jus, charred shallot", price: 52, tags: ["GF"], img: px(31235409) },
      { id: "m2", name: "Whole Roast Chicken, Tarragon", desc: "Free-range, brined 24h, spit-roasted", price: 40, tags: ["GF"], img: px(24186393) },
      { id: "m3", name: "Wild Mushroom Wellington", desc: "Duxelles, spinach, rich vegetarian gravy", price: 36, tags: ["V"] },
    ],
  },
  {
    id: "dessert",
    label: "Sweet",
    dishes: [
      { id: "d1", name: "Burnt Honey Ice Cream", desc: "Sea salt, barley crumb, bee pollen", price: 14, tags: ["V", "GF"] },
      { id: "d2", name: "Dark Chocolate, Smoked Cherry", desc: "70% ganache, cherry compote, cacao nib", price: 16, tags: ["V"] },
      { id: "d3", name: "Caramelised Pear Tarte", desc: "Flaky pastry, vanilla crème fraîche", price: 15, tags: ["V"] },
    ],
  },
];

const DIETS = ["Any", "Vegetarian", "Pescatarian", "Gluten-free"] as const;
const ok = (d: Dish, diet: string) =>
  diet === "Any" ||
  (diet === "Vegetarian" && d.tags.includes("V")) ||
  (diet === "Pescatarian" && (d.tags.includes("V") || d.tags.includes("P"))) ||
  (diet === "Gluten-free" && d.tags.includes("GF"));

/* ---------- Ember particles ---------- */
function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => {
      c.width = c.clientWidth;
      c.height = c.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const mk = () => ({ x: Math.random() * c.width, y: c.height + Math.random() * 100, vy: 0.4 + Math.random() * 1.2, r: 0.6 + Math.random() * 2, ph: Math.random() * 10, life: 0 });
    const ps = Array.from({ length: 70 }, () => ({ ...mk(), y: Math.random() * c.height }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach((p, i) => {
        p.y -= p.vy;
        p.x += Math.sin(p.ph + p.y / 60) * 0.5;
        p.life += 0.004;
        const a = Math.max(0, 1 - p.y / c.height) * 0.9;
        ctx.fillStyle = `rgba(${242},${140 + 60 * Math.sin(p.ph)},${60},${a})`;
        ctx.shadowColor = "#F2B544";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.y < -10) ps[i] = mk();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ---------- Menu builder ---------- */
function MenuBuilder() {
  const [diet, setDiet] = useState<(typeof DIETS)[number]>("Any");
  const [picks, setPicks] = useState<Record<string, string | null>>({});
  const [guests, setGuests] = useState(2);
  const [pairing, setPairing] = useState(false);
  const [preview, setPreview] = useState<Dish | null>(COURSES[1].dishes[0]);

  const chosen = COURSES.map((c) => c.dishes.find((d) => d.id === picks[c.id])).filter(Boolean) as Dish[];
  const food = chosen.reduce((s, d) => s + d.price, 0);
  const wine = pairing ? chosen.length * 22 : 0;
  const per = food + wine;
  const sub = per * guests;
  const service = Math.round(sub * 0.125);
  const total = sub + service;

  const pickDiet = (d: (typeof DIETS)[number]) => {
    setDiet(d);
    setPicks((p) => {
      const n = { ...p };
      COURSES.forEach((c) => {
        const dish = c.dishes.find((x) => x.id === n[c.id]);
        if (dish && !ok(dish, d)) n[c.id] = null;
      });
      return n;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1728px] mx-auto">
      <div className="lg:col-span-8">
        <div className="flex flex-wrap gap-2 mb-10">
          {DIETS.map((d) => (
            <button key={d} onClick={() => pickDiet(d)} className={`px-4 py-3 text-sm uppercase rounded-[2px] transition-colors ${diet === d ? "text-black" : "bg-neutral-800 text-white/60 hover:text-white"}`} style={diet === d ? { background: ACCENT } : undefined}>
              {d}
            </button>
          ))}
        </div>

        {COURSES.map((c, ci) => (
          <div key={c.id} className="mb-10">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-xs text-white/40 tabular-nums">0{ci + 1}</span>
              <span className="text-sm uppercase tracking-wider">{c.label}</span>
              {picks[c.id] && (
                <button onClick={() => setPicks((p) => ({ ...p, [c.id]: null }))} className="text-xs text-white/40 hover:text-white ml-auto">
                  Clear
                </button>
              )}
            </div>
            <Rule />
            {c.dishes.map((d) => {
              const allowed = ok(d, diet);
              const selected = picks[c.id] === d.id;
              return (
                <button
                  key={d.id}
                  disabled={!allowed}
                  onClick={() => setPicks((p) => ({ ...p, [c.id]: selected ? null : d.id }))}
                  onMouseEnter={() => setPreview(d)}
                  className={`group w-full text-left flex items-center justify-between gap-4 py-5 px-4 -mx-4 border-b border-white/15 transition-all ${allowed ? "hover:bg-white/5" : "opacity-25 cursor-not-allowed"}`}
                  style={selected ? { background: "rgba(242,181,68,0.08)" } : undefined}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <span className="mt-2 w-3 h-3 border shrink-0 transition-colors" style={{ borderColor: selected ? ACCENT : "rgba(255,255,255,0.3)", background: selected ? ACCENT : "transparent" }} />
                    <div className="min-w-0">
                      <div className={`text-xl lg:text-2xl transition-colors ${selected ? "text-white" : "text-white/70 group-hover:text-white"}`}>{d.name}</div>
                      <div className="text-sm text-white/40 mt-1">{d.desc}</div>
                      <div className="flex gap-2 mt-2">
                        {d.tags.map((t) => (
                          <span key={t} className="text-[10px] uppercase tracking-wider border border-white/20 px-1.5 py-0.5 text-white/50">
                            {t === "V" ? "Vegetarian" : t === "P" ? "Pescatarian" : "Gluten-free"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-lg tabular-nums shrink-0">€{d.price}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-8 flex flex-col gap-6">
          <div className="relative aspect-[4/5] bg-[#20170f] overflow-hidden rounded-[2px]">
            <AnimatePresence mode="wait">
              <motion.div key={preview?.id ?? "none"} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                {preview?.img ? (
                  <img src={preview.img} alt={preview.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[200px] font-extralight" style={{ color: ACCENT, background: "radial-gradient(circle at 50% 40%, #3a2412, #140f0b)" }}>
                    {preview?.name[0]}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <div className="text-2xl leading-tight">{preview?.name}</div>
                  <div className="text-sm text-white/60">{preview?.desc}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border border-white/15 p-5 lg:p-6 rounded-[2px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-white/50">Guests</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="w-9 h-9 bg-neutral-800 hover:bg-neutral-700 rounded-[2px]">−</button>
                <span className="w-4 text-center tabular-nums">{guests}</span>
                <button onClick={() => setGuests((g) => Math.min(10, g + 1))} className="w-9 h-9 bg-neutral-800 hover:bg-neutral-700 rounded-[2px]">+</button>
              </div>
            </div>
            <button onClick={() => setPairing((p) => !p)} className="w-full flex items-center justify-between py-3 border-t border-white/15 text-left">
              <span className="text-sm">Sommelier pairing <span className="text-white/40">(+€22 / course)</span></span>
              <span className="w-10 h-5 rounded-full relative transition-colors" style={{ background: pairing ? ACCENT : "#333" }}>
                <motion.span className="absolute top-0.5 w-4 h-4 rounded-full bg-white" animate={{ left: pairing ? 22 : 2 }} />
              </span>
            </button>
            <div className="border-t border-white/15 pt-4 text-sm flex flex-col gap-2">
              {chosen.length === 0 && <div className="text-white/40">Select a dish from each course to build your menu.</div>}
              {chosen.map((d) => (
                <motion.div key={d.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between gap-4">
                  <span className="text-white/70 truncate">{d.name}</span>
                  <span className="tabular-nums">€{d.price}</span>
                </motion.div>
              ))}
              {pairing && chosen.length > 0 && (
                <div className="flex justify-between text-white/70">
                  <span>Wine pairing</span>
                  <span className="tabular-nums">€{wine}</span>
                </div>
              )}
            </div>
            <div className="border-t border-white/15 mt-4 pt-4 text-sm flex flex-col gap-1 text-white/60">
              <div className="flex justify-between"><span>Per guest</span><span className="tabular-nums">€{per}</span></div>
              <div className="flex justify-between"><span>× {guests} guests</span><span className="tabular-nums">€{sub}</span></div>
              <div className="flex justify-between"><span>Service 12.5%</span><span className="tabular-nums">€{service}</span></div>
            </div>
            <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-white/15">
              <span className="text-xs uppercase tracking-wider text-white/50">Total</span>
              <motion.span key={total} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-light tabular-nums" style={{ color: ACCENT }}>
                €{total}
              </motion.span>
            </div>
            <button
              disabled={chosen.length === 0}
              onClick={() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-5 w-full py-4 text-black rounded-[2px] disabled:opacity-30 transition-opacity"
              style={{ background: ACCENT }}
            >
              Reserve a table with this menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reservation ---------- */
const TIMES = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

function Reservation() {
  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d;
      }),
    []
  );
  const [step, setStep] = useState(0);
  const [day, setDay] = useState(0);
  const [size, setSize] = useState(2);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [ref] = useState(() => "EMB-" + Math.random().toString(36).slice(2, 7).toUpperCase());

  const soldOut = (di: number, ti: number) => (di * 3 + ti * 5 + size) % 4 === 0;
  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
  const steps = ["Date & time", "Your details", "Confirmed"];
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex gap-2 lg:gap-4 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className="h-[2px] bg-white/15 relative overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0" style={{ background: ACCENT }} animate={{ width: step >= i ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
            </div>
            <div className={`text-xs uppercase tracking-wider mt-2 ${step >= i ? "text-white" : "text-white/30"}`}>
              0{i + 1} {s}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            <div className="text-xs uppercase tracking-wider text-white/50 mb-3">Date</div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-10">
              {days.map((d, i) => (
                <button key={i} onClick={() => { setDay(i); setTime(null); }} className={`py-4 rounded-[2px] text-center transition-colors ${day === i ? "text-black" : "bg-neutral-800/80 hover:bg-neutral-700"}`} style={day === i ? { background: ACCENT } : undefined}>
                  <div className="text-[10px] uppercase tracking-wider opacity-70">{d.toLocaleDateString("en-GB", { weekday: "short" })}</div>
                  <div className="text-2xl">{d.getDate()}</div>
                  <div className="text-[10px] uppercase opacity-70">{d.toLocaleDateString("en-GB", { month: "short" })}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mb-10 border-y border-white/15 py-4">
              <span className="text-xs uppercase tracking-wider text-white/50">Party size</span>
              <div className="flex items-center gap-5">
                <button onClick={() => { setSize((s) => Math.max(1, s - 1)); setTime(null); }} className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-[2px]">−</button>
                <span className="text-2xl w-6 text-center tabular-nums">{size}</span>
                <button onClick={() => { setSize((s) => Math.min(8, s + 1)); setTime(null); }} className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-[2px]">+</button>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider text-white/50 mb-3">Time</div>
            <div className="grid grid-cols-4 gap-2 mb-10">
              {TIMES.map((t, ti) => {
                const so = soldOut(day, ti);
                return (
                  <button key={t} disabled={so} onClick={() => setTime(t)} className={`py-4 rounded-[2px] tabular-nums transition-colors ${so ? "opacity-25 line-through cursor-not-allowed bg-neutral-800" : time === t ? "text-black" : "bg-neutral-800/80 hover:bg-neutral-700"}`} style={time === t ? { background: ACCENT } : undefined}>
                    {t}
                  </button>
                );
              })}
            </div>
            <button disabled={!time} onClick={() => setStep(1)} className="w-full lg:w-auto lg:px-14 py-4 text-black rounded-[2px] disabled:opacity-30" style={{ background: ACCENT }}>
              Continue
            </button>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            <div className="mb-8 text-white/60">
              {fmt(days[day])} · {time} · {size} {size === 1 ? "guest" : "guests"}
            </div>
            {[
              { l: "Full name", v: name, s: setName, t: "text" },
              { l: "Email", v: email, s: setEmail, t: "email" },
              { l: "Allergies or occasion (optional)", v: note, s: setNote, t: "text" },
            ].map((f) => (
              <label key={f.l} className="block mb-7">
                <span className="text-xs uppercase tracking-wider text-white/50">{f.l}</span>
                <input type={f.t} value={f.v} onChange={(e) => f.s(e.target.value)} className="w-full bg-transparent border-b border-white/25 focus:border-[#F2B544] outline-none py-3 text-xl transition-colors" />
              </label>
            ))}
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-[2px]">Back</button>
              <button disabled={!valid} onClick={() => setStep(2)} className="flex-1 lg:flex-none lg:px-14 py-4 text-black rounded-[2px] disabled:opacity-30" style={{ background: ACCENT }}>
                Confirm reservation
              </button>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "backOut" }}>
            <div className="border p-8 lg:p-12 relative rounded-[2px]" style={{ borderColor: ACCENT }}>
              <div className="text-xs uppercase tracking-widest mb-6" style={{ color: ACCENT }}>● Table secured · {ref}</div>
              <div className="text-4xl lg:text-6xl font-light mb-2">See you {fmt(days[day]).split(",")[0]}, {name.split(" ")[0]}.</div>
              <div className="text-white/60 mb-8">
                {fmt(days[day])} at {time} for {size}. A confirmation has been sent to {email}.
                {note && <> We've noted: “{note}”.</>}
              </div>
              <button onClick={() => { setStep(0); setTime(null); setName(""); setEmail(""); setNote(""); }} className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-[2px]">
                Make another booking
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Ember() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const gallery = [px(24186303), px(8112888), px(24289213), px(29168406), px(24245839), px(31235409)];

  return (
    <main className="text-white" style={{ background: BG }}>
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        <motion.img src={px(24186393, 2000)} alt="" className="absolute inset-0 w-full h-full object-cover" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "easeOut" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,15,11,0.65), rgba(20,15,11,0.35) 40%, rgba(20,15,11,0.92))" }} />
        <Embers />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header
            brand="Ember"
            mark={
              <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none">
                <path d="M18 3c3 6 9 9 9 17a9 9 0 0 1-18 0c0-4 2-6 4-8 0 3 2 4 3 4-1-5-1-9 2-13z" fill={ACCENT} />
              </svg>
            }
            links={["Menu", "Reserve", "Gallery"]}
            cta="Reserve a table"
            secondary="Collection"
            accent={ACCENT}
          />
          <div className="relative flex flex-1 items-center py-10 lg:py-0">
            <motion.span className="absolute left-5 lg:left-10 text-[10px] lg:text-xs font-medium uppercase tracking-wide" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              WOOD-FIRED · 28 SEATS · TUE–SAT
            </motion.span>
            <motion.span className="absolute right-5 lg:right-10 text-right text-[10px] lg:text-xs font-medium uppercase tracking-wide" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              ★ MICHELIN GUIDE 2025
            </motion.span>
          </div>
          <div className="flex w-full flex-col items-start gap-6 px-5 pb-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-10 lg:gap-10">
            <motion.h1 className="text-[44px] leading-[1.02] font-normal sm:text-6xl lg:text-[130px] lg:leading-[0.95]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
              Fire, salt,
              <br />
              <span style={{ color: ACCENT }}>patience</span>
            </motion.h1>
            <motion.p className="w-full text-sm text-white/75 lg:w-96 lg:text-base" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
              A single open hearth, twenty-eight seats and a menu you write yourself. Choose your courses, see the bill as you go, and book in under a minute.
            </motion.p>
          </div>
          <motion.div className="mx-auto h-[1px] w-[calc(100%-40px)] lg:w-[calc(100%-80px)] bg-white/25" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1 }} />
          <div className="flex w-full flex-col gap-2 px-5 py-4 text-[10px] uppercase tracking-wider sm:flex-row sm:justify-between lg:px-10 lg:py-6 lg:text-xs">
            <span className="text-stone-300">BUILD YOUR OWN TASTING MENU</span>
            <span className="text-neutral-400">SCROLL TO COMPOSE</span>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="max-w-[1728px] mx-auto mb-14 flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <SectionLabel n="02">The Menu</SectionLabel>
            <h2 className="mt-6 text-[40px] sm:text-5xl lg:text-[81px] leading-[1.05] font-light">
              <AnimatedWords text="Write your" />
              <br />
              <span className="opacity-50">
                <AnimatedWords text="own evening." delayStart={0.2} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.3} className="text-white/50 max-w-sm lg:mt-14">
            One dish per course. Filter by diet, add a sommelier pairing, and watch the evening take shape on the right.
          </Reveal>
        </div>
        <MenuBuilder />
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 lg:py-32 overflow-hidden">
        <div className="px-5 lg:px-10 max-w-[1728px] mx-auto mb-10 flex justify-between items-end">
          <div>
            <SectionLabel n="03">The Hearth</SectionLabel>
            <Reveal delay={0.15} className="mt-6 text-[#888888] max-w-[320px]">
              Drag through a few evenings.
            </Reveal>
          </div>
          <span className="text-xs uppercase tracking-wider text-white/40 hidden sm:block">← Drag →</span>
        </div>
        <div ref={galleryRef} className="px-5 lg:px-10">
          <motion.div drag="x" dragConstraints={galleryRef} className="flex gap-4 lg:gap-6 cursor-grab active:cursor-grabbing w-max">
            {gallery.map((g, i) => (
              <motion.div key={i} className={`shrink-0 overflow-hidden bg-neutral-800 rounded-[1px] ${i % 2 ? "w-[60vw] sm:w-[360px] lg:w-[440px] h-[360px] lg:h-[540px] mt-10" : "w-[70vw] sm:w-[420px] lg:w-[540px] h-[420px] lg:h-[620px]"}`} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.08 }}>
                <img src={g} alt="" draggable={false} className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-[1200ms]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" className="px-5 py-16 lg:px-10 lg:py-32 border-t border-white/10">
        <div className="max-w-[1728px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionLabel n="04">Reservations</SectionLabel>
            <h2 className="mt-6 text-4xl lg:text-[60px] leading-[1.05]">
              Take <span className="text-stone-400">a seat</span>
            </h2>
            <Reveal delay={0.2} className="mt-6 text-[#888888] max-w-[320px]">
              Tables release seven days ahead. Parties over eight, please write to us.
            </Reveal>
            <ul className="mt-10 flex flex-col gap-[3px] text-[#888888] border-t border-white/15 pt-[10px]">
              <li>Tuesday – Saturday</li>
              <li>Doors 17:30, last seating 21:00</li>
              <li>12 Coal Yard Lane, London</li>
              <li>+44 20 7946 0131</li>
            </ul>
          </div>
          <div className="lg:col-span-8">
            <Reservation />
          </div>
        </div>
      </section>

      <Wordmark text="EMBER" bgColor={BG} />
      <Footer
        brand="Ember"
        since="2017"
        partners={["Michelin", "Gault&Millau", "Decanter", "Hardy & Sons", "Wild Meadow"]}
        socials={["Instagram", "TikTok", "Resy", "X"]}
        email="table@ember.restaurant"
        callText="Private dining for 12–28. Let's design your evening together."
        callCta="Private events"
        accent={ACCENT}
        bgColor={BG}
      />
    </main>
  );
}
