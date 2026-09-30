import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Header, Reveal, AnimatedWords, Rule, SectionLabel, Wordmark, Footer, Arrow45 } from "../../shared/ui";
import { Configurator } from "./Configurator";

const ACCENT = "#B5533C";
const BG = "#ECE7DF";
const px = (id: number, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const PROJECTS = [
  { id: "p1", name: "Casa Lago", cat: "Residential", year: 2024, area: "420 m²", loc: "Lake Como, IT", img: px(7031622), text: "A long single-storey villa that dissolves into the shoreline. Timber, stone and a 14-metre glazed wall turn the lake into the room's fifth wall." },
  { id: "p2", name: "Stair House", cat: "Residential", year: 2023, area: "260 m²", loc: "Antwerp, BE", img: px(7031591), text: "A suspended timber stair carries daylight from a north roof slot down through three floors of quiet rooms." },
  { id: "p3", name: "Hall of Ash", cat: "Cultural", year: 2025, area: "1,800 m²", loc: "Oslo, NO", img: px(15663488), text: "A concrete gallery whose corridors narrow and widen to choreograph how visitors meet each artwork." },
  { id: "p4", name: "Loft No. 9", cat: "Workplace", year: 2022, area: "510 m²", loc: "Berlin, DE", img: px(7031402), text: "A former print works turned studio: stone floors, LED-lit circulation and a kitchen that doubles as the meeting table." },
  { id: "p5", name: "Void Pavilion", cat: "Cultural", year: 2024, area: "380 m²", loc: "Lisbon, PT", img: px(5472812), text: "Rectangular apertures cut into raw concrete, framing sky like a slow-moving painting." },
  { id: "p6", name: "Fireplace Hall", cat: "Workplace", year: 2021, area: "340 m²", loc: "Zürich, CH", img: px(7031403), text: "A reception designed around a single linear fireplace, grey stone and warm concealed light." },
];

function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const set = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] lg:aspect-[16/8] w-full overflow-hidden select-none touch-none cursor-ew-resize rounded-[2px] bg-neutral-300"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        set(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && set(e.clientX)}
    >
      <img src={px(7031402, 1600)} alt="After" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={px(6207948, 1600)} alt="Before" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ filter: "grayscale(1) contrast(0.9) brightness(0.85)" }} draggable={false} />
      </div>
      <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] uppercase tracking-widest px-3 py-2 rounded-[2px]">The shell</div>
      <div className="absolute top-4 right-4 text-white text-[10px] uppercase tracking-widest px-3 py-2 rounded-[2px]" style={{ background: ACCENT }}>
        Completed
      </div>
      <div className="absolute top-0 bottom-0 w-px bg-white" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-black text-xs">◀ ▶</div>
      </div>
    </div>
  );
}

export default function Forma() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const clip = useTransform(scrollYProgress, [0, 0.25], [8, 0]);
  const clipPath = useTransform(clip, (v) => `inset(${v}% ${v}% 0% ${v}%)`);

  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<(typeof PROJECTS)[number] | null>(null);
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 400, damping: 40, mass: 0.5 });
  const shown = PROJECTS.filter((p) => filter === "All" || p.cat === filter);

  return (
    <main className="text-[#161616]" style={{ background: BG }}>
      {/* HERO */}
      <section ref={heroRef} className="relative">
        <Header
          brand="Forma"
          light
          mark={
            <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none">
              <rect x="3" y="3" width="30" height="30" stroke="#161616" strokeWidth="1.5" />
              <rect x="10" y="10" width="16" height="16" fill={ACCENT} />
            </svg>
          }
          links={["Projects", "Configurator", "Approach"]}
          cta="Start a project"
          secondary="Collection"
        />
        <div className="px-5 lg:px-10 pt-14 lg:pt-20">
          <div className="flex justify-between text-[10px] lg:text-xs uppercase tracking-wide font-medium mb-8">
            <span>ARCHITECTURE · INTERIORS · SINCE 2009</span>
            <span className="text-right">AMSTERDAM / MILAN</span>
          </div>
          <motion.h1 className="text-[52px] sm:text-7xl lg:text-[170px] leading-[0.92] font-normal tracking-tight" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}>
            Spaces that
            <br />
            think <span className="font-extralight italic" style={{ color: ACCENT }}>slowly</span>
          </motion.h1>
          <div className="mt-10 flex flex-col lg:flex-row lg:justify-between gap-6 pb-12">
            <motion.p className="max-w-md text-black/60" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
              We design homes, galleries and workplaces that reward attention — built from light, weight and time rather than trend.
            </motion.p>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1.1, ease: "backOut" }} className="flex gap-3">
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-[#161616] text-white px-7 py-4 rounded-[2px]">
                See projects
              </a>
              <a href="#configurator" onClick={(e) => { e.preventDefault(); document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" }); }} className="border border-black/30 px-7 py-4 rounded-[2px] hover:bg-black/5 transition-colors">
                Try the configurator
              </a>
            </motion.div>
          </div>
        </div>
        <div className="px-5 lg:px-10 pb-10">
          <motion.div style={{ clipPath }} className="overflow-hidden h-[60vh] lg:h-[85vh]">
            <motion.img src={px(7031622, 2000)} alt="Casa Lago" style={{ scale }} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="max-w-[1728px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-6 mb-12">
          <div>
            <SectionLabel n="02" light>Selected Work</SectionLabel>
            <h2 className="mt-6 text-[40px] sm:text-5xl lg:text-[81px] leading-[1.05] font-light">
              <AnimatedWords text="Fifteen years," />
              <br />
              <span className="opacity-50">
                <AnimatedWords text="six buildings." delayStart={0.2} />
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 lg:gap-8 items-end">
            {["All", "Residential", "Cultural", "Workplace"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`text-sm font-medium uppercase transition-colors ${filter === f ? "text-black" : "text-black/40 hover:text-black/70"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <Rule light className="max-w-[1728px] mx-auto mb-10" />
        <div className="max-w-[1728px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.button
                layout
                key={p.id}
                onClick={() => setOpen(p)}
                onPointerEnter={(e) => { mx.jump(e.clientX); my.jump(e.clientY); setHovering(true); }}
                onPointerMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}
                onPointerLeave={() => setHovering(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="text-left group"
              >
                <div className={`overflow-hidden bg-neutral-300 ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                </div>
                <div className="mt-4 flex justify-between items-baseline">
                  <span className="text-2xl lg:text-3xl">{p.name}</span>
                  <span className="text-xs uppercase tracking-wide text-black/50">{p.year}</span>
                </div>
                <div className="text-sm text-black/50 mt-1">{p.cat} · {p.loc}</div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* cursor label (desktop, only over projects) */}
      <motion.div
        className="hidden lg:flex fixed top-0 left-0 z-[90] pointer-events-none w-[90px] h-[90px] -ml-[45px] -mt-[45px] rounded-full items-center justify-center text-white text-xs uppercase tracking-wider"
        style={{ x: sx, y: sy, background: ACCENT }}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.3 }}
        transition={{ duration: 0.25 }}
      >
        View
      </motion.div>

      {/* Project modal */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[400] bg-black/70 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div
              className="bg-[#ECE7DF] w-full max-w-[1200px] max-h-[92vh] overflow-auto grid grid-cols-1 lg:grid-cols-2"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={open.img} alt={open.name} className="w-full h-full max-h-[60vh] lg:max-h-none object-cover" />
              <div className="p-8 lg:p-12 flex flex-col">
                <div className="flex justify-between text-xs uppercase tracking-wide text-black/50 mb-8">
                  <span>{open.cat}</span>
                  <button onClick={() => setOpen(null)} className="hover:text-black">Close ✕</button>
                </div>
                <h3 className="text-5xl lg:text-7xl font-light leading-none mb-6">{open.name}</h3>
                <p className="text-black/60 mb-10">{open.text}</p>
                <div className="grid grid-cols-3 gap-4 mt-auto">
                  {[["Location", open.loc], ["Area", open.area], ["Year", String(open.year)]].map(([k, v]) => (
                    <div key={k} className="border-t border-black/20 pt-[10px]">
                      <div className="text-[11px] uppercase tracking-wider text-black/40">{k}</div>
                      <div className="text-lg">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONFIGURATOR */}
      <section id="configurator" className="px-5 py-16 lg:px-10 lg:py-32 border-t border-black/10">
        <div className="max-w-[1728px] mx-auto mb-14 flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <SectionLabel n="03" light>Room Configurator</SectionLabel>
            <h2 className="mt-6 text-[40px] sm:text-5xl lg:text-[81px] leading-[1.05] font-light">
              <AnimatedWords text="Compose a room." />
              <br />
              <span className="opacity-50">
                <AnimatedWords text="Watch it breathe." delayStart={0.2} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.3} className="text-black/50 max-w-sm lg:mt-14">
            Choose finishes, slide the sun across the sky, and see an indicative fit-out price update with every decision.
          </Reveal>
        </div>
        <Configurator />
      </section>

      {/* BEFORE AFTER */}
      <section className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="max-w-[1728px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <SectionLabel n="04" light>Transformation</SectionLabel>
            <Reveal delay={0.15} className="mt-6 text-black/50 max-w-[320px]">
              Drag the line. Most of our work begins with an empty shell and a long conversation.
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="grid w-full max-w-[1728px] mx-auto grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <SectionLabel n="05" light>Approach</SectionLabel>
            <Reveal delay={0.15} className="text-black/50 max-w-[320px]">
              Four phases, no surprises. Every decision is drawn, modelled and priced before it's built.
            </Reveal>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {[
              { t: "Listen", l: ["Site and climate study", "Daily-life mapping", "Budget & programme workshop", "Fixed-fee proposal"] },
              { t: "Draw", l: ["Hand sketches first", "Physical massing models", "Daylight simulation", "Material library visits"] },
              { t: "Refine", l: ["Full-scale mock-ups", "Detail drawings at 1:5", "Fabricator pre-briefs", "Transparent cost plan"] },
              { t: "Build", l: ["On-site every week", "Craft-led contractors", "Snag-free handover", "Five-year care visit"] },
            ].map((it, idx) => (
              <div key={it.t} className="border-t border-black/20 pt-[10px]">
                <Reveal y={20} delay={idx * 0.1} className="text-2xl lg:text-[28px] mb-5">
                  {it.t}
                </Reveal>
                <ul className="flex flex-col gap-[3px] text-black/50">
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
        <div className="max-w-[1728px] mx-auto mt-16 flex items-center gap-3 text-sm">
          <Arrow45 className="w-3 h-3" /> <span className="text-black/60">Featured in Dezeen, Wallpaper*, Architectural Review</span>
        </div>
      </section>

      <Wordmark text="FORMA" light />
      <Footer
        light
        brand="Forma"
        since="2009"
        partners={["Dezeen", "Wallpaper*", "Vitra", "Arup", "Kvadrat"]}
        socials={["Instagram", "Pinterest", "LinkedIn", "Issuu"]}
        email="studio@forma.arch"
        callText="Tell us about the site. We reply within two working days."
        callCta="Start a project"
        accent={ACCENT}
      />
    </main>
  );
}
