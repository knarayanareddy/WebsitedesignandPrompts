import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { WaveGrid } from "./WaveGrid";
import { Arrow45 } from "../../shared/ui";

const CDN = "https://qclay.design/lovable/ceptral";

/* ============================== SECTION 3 ============================== */
const items = [
  { title: "Ecosystem Restoration", list: ["Wetland and watershed renewal", "Rewilding and biodiversity programs", "Soil and vegetation recovery", "Long-term ecological monitoring"] },
  { title: "Sustainable Infrastructure", list: ["Low-impact land use planning", "Renewable energy integration", "Closed-loop waste systems", "Climate-resilient design"] },
  { title: "Clean Water Initiatives", list: ["Agricultural runoff filtration", "River and lake purification systems", "Microplastics detection", "Zero-discharge processing"] },
  { title: "Environmental Research", list: ["Climate data analysis", "Environmental risk modeling", "Impact forecasting", "Scientific collaboration"] },
];

export function Section3() {
  return (
    <section id="focus" className="w-full bg-[#1b1b1b] px-5 py-16 text-white lg:px-10 lg:py-32">
      <div className="grid w-full max-w-[1728px] mx-auto grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div
            className="text-white text-[18px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            03 — Focus Areas
          </motion.div>
          <motion.p
            className="text-[#888888] text-base max-w-[320px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            We address the most pressing environmental challenges through scalable, science-driven solutions.
          </motion.p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {items.map((it, idx) => (
            <div key={it.title} className="border-t border-white/15 pt-[10px]">
              <motion.h3
                className="text-2xl lg:text-[28px] font-normal mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {it.title}
              </motion.h3>
              <ul className="flex flex-col gap-[3px] text-[#888888] text-base">
                {it.list.map((li, i) => (
                  <motion.li
                    key={li}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.15 + i * 0.08 }}
                  >
                    {li}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== SECTION 4 ============================== */
const tabs = [
  {
    label: "LOCATE CRITICAL ZONES",
    h: "Find high-impact targets",
    p: "Continuous environmental scanning that identifies the most at-risk regions and prioritizes action — in real time",
  },
  {
    label: "ACCELERATE WITH AI",
    h: "Models that never sleep",
    p: "Satellite, sensor and field data fused into living forecasts that surface tipping points months before they arrive",
  },
  {
    label: "SCALE ENVIRONMENTAL IMPACT",
    h: "From one wetland to a continent",
    p: "Repeatable restoration playbooks, local partners and transparent metrics so every hectare compounds",
  },
  {
    label: "SCIENCE & ADVISORY",
    h: "Peer-reviewed, field-tested",
    p: "Our researchers and partner institutions validate each intervention before it ever touches the ground",
  },
];

const listItems = [
  "Track pollution sources & flow",
  "Filter regions by restoration viability",
  "Analyze land, water, and vegetation impact",
  "Prioritize response by urgency & scale",
];

const PEAKS = [10, 15, 20, 15, 10, 15, 20, 15, 10, 15, 10, 5, 15, 25, 40, 55, 70, 85, 90, 95, 90, 85, 70, 55, 40, 25, 15, 10, 15, 20, 30, 20, 15, 10, 15, 20, 25, 15, 10, 15];

export function Section4() {
  const [active, setActive] = useState(0);
  return (
    <section className="w-full min-h-[90vh] bg-[#1b1b1b] text-white px-5 py-12 lg:px-10 lg:py-20 flex flex-col overflow-hidden">
      {/* Top Tabs */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full gap-3 lg:gap-5 mb-8 lg:mb-10">
        {tabs.map((t, index) => (
          <motion.button
            key={t.label}
            onClick={() => setActive(index)}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut", delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`uppercase text-sm lg:text-base px-4 py-3 lg:px-6 text-center w-full sm:flex-1 transition-colors ${
              active === index ? "bg-[#DE7D4D] text-black" : "bg-neutral-800 text-white/60 hover:text-white"
            }`}
          >
            {t.label}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full max-w-[1728px] mx-auto">
        {/* Left */}
        <div className="col-span-1 lg:col-span-6 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <h2 className="text-[36px] sm:text-5xl lg:text-[60px] leading-tight mb-4 lg:whitespace-nowrap">{tabs[active].h}</h2>
              <p className="text-white/50 text-base max-w-md mb-8">{tabs[active].p}</p>
            </motion.div>
          </AnimatePresence>
          <motion.button
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-zinc-300 text-black text-base px-8 py-3 w-fit mb-24 rounded-[2px] hover:bg-white transition-colors"
          >
            Get access
          </motion.button>

          <div className="mt-auto max-w-[384px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-sm text-white mb-1"
            >
              Discover hotspots & environmental threats
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-sm text-white/50 mb-6"
            >
              Access the world's most complete environmental data hub — filter by location, source, severity, and restoration potential.
            </motion.div>
            {listItems.map((item, i) => (
              <div className="relative py-4" key={item}>
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "82%" }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="absolute top-0 left-0 h-px bg-neutral-700"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="text-white/30 text-sm hover:text-white/80 transition-colors"
                >
                  {item}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.5, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="col-span-1 lg:col-span-6 relative flex items-center justify-center"
        >
          <div className="flex flex-col items-center pt-[30px] pb-[15px] relative w-full h-fit self-center overflow-hidden bg-[#2F2F2F]">
            {/* 3D Wave Grid */}
            <div
              className="absolute inset-0 z-0"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
            >
              <WaveGrid />
            </div>

            {/* Camera Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="grid grid-cols-3 grid-rows-3 w-full h-full opacity-10">
                {Array.from({ length: 9 }).map((_, i) => {
                  const col = i % 3;
                  const row = Math.floor(i / 3);
                  const borderR = col < 2 ? "border-r border-white" : "";
                  const borderB = row < 2 ? "border-b border-white" : "";
                  return <div key={i} className={`${borderR} ${borderB}`} />;
                })}
              </div>
            </div>

            {/* Card */}
            <div className="relative z-20 w-[280px] lg:w-[340px]">
              <div className="relative">
                <img src={`${CDN}/Card.png`} alt="California weather card" className="block w-full h-auto shadow-2xl rounded-lg" />
                <div className="absolute z-30 left-[12px] right-[12px] bottom-[38%] h-[8%] flex justify-between items-end gap-[3px] overflow-hidden pointer-events-none">
                  {PEAKS.map((peak, i) => {
                    const low = Math.max(8, peak * 0.35);
                    const duration = 0.5 + (i % 5) * 0.12;
                    const delay = (i % 7) * 0.08;
                    return (
                      <motion.div
                        key={i}
                        className="flex-1 w-[3px] bg-transparent border-l-[3px] border-dotted border-white/80"
                        initial={{ height: `${low}%` }}
                        animate={{ height: [`${low}%`, `${peak}%`, `${low}%`], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative z-20 mt-[40px] h-px w-1 opacity-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== SECTION 5 ============================== */
const noise = { url: `${CDN}/Noise.png` };
const sideShadow = { url: `${CDN}/Side-Image-Container.png` };

const IMAGES: string[] = Array.from({ length: 39 }, (_, i) => {
  const num = i + 1;
  if ([9, 14, 19, 20].includes(num)) return `${CDN}/image${num}.png`;
  return `${CDN}/image-${num}.png`;
});

const COLS = [
  { width: 78, itemH: 118, marginTopClass: "mt-[120px]", white: false },
  { width: 105, itemH: 158, marginTopClass: "mt-[40px]", white: false },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]", white: false },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]", white: false },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]", white: true },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]", white: true },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]", white: false },
  { width: 120, itemH: 182, marginTopClass: "-mt-[40px]", white: false },
  { width: 105, itemH: 158, marginTopClass: "mt-[40px]", white: false },
  { width: 78, itemH: 118, marginTopClass: "mt-[120px]", white: false },
];
const ITEMS_PER_COL = 5;

const randomImage = () => IMAGES[Math.floor(Math.random() * IMAGES.length)];

export function Section5() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState("0.0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, 3.2, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setCount(latest.toFixed(1)),
    });
    return () => controls.stop();
  }, [inView]);

  const [grid, setGrid] = useState<string[][]>(() =>
    COLS.map((c) => (c.white ? [] : Array.from({ length: ITEMS_PER_COL }, randomImage)))
  );

  useEffect(() => {
    const activeCells: { col: number; row: number }[] = [];
    COLS.forEach((c, ci) => {
      if (!c.white) {
        for (let r = 0; r < ITEMS_PER_COL; r++) activeCells.push({ col: ci, row: r });
      }
    });
    const id = setInterval(() => {
      setGrid((prev) => {
        const next = prev.map((col) => col.slice());
        for (let i = 0; i < 5; i++) {
          const cell = activeCells[Math.floor(Math.random() * activeCells.length)];
          next[cell.col][cell.row] = randomImage();
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={sectionRef} className="sticky top-0 z-0 h-[105vh] overflow-hidden bg-gradient-to-b from-[#523426] to-[#865438]">
      <motion.div
        initial={{ scale: 1.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute inset-0 flex justify-center gap-[32px] z-10 w-max left-1/2 -translate-x-1/2"
      >
        <div className="flex justify-center gap-[32px] scale-[1.04]">
          {COLS.map((col, ci) => (
            <div key={ci} className={`flex flex-col gap-[20px] ${col.marginTopClass}`} style={{ width: `${col.width}px` }}>
              {Array.from({ length: ITEMS_PER_COL }).map((_, ri) => {
                const src = grid[ci]?.[ri];
                if (col.white) {
                  return <div key={ri} className="w-full bg-white rounded-sm" style={{ height: `${col.itemH}px` }} />;
                }
                return (
                  <div key={ri} className="relative w-full overflow-hidden rounded-sm bg-[#6b4431]" style={{ height: `${col.itemH}px` }}>
                    <AnimatePresence>
                      <motion.img
                        key={src}
                        src={src}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                      />
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-20 bg-[#865438]/50 mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url(${noise.url})` }} />

      {/* Center Text UI */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-[130]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-white/80 text-xl font-normal mb-2"
        >
          Your referral helped restore
        </motion.div>
        <p className="text-white text-[120px] lg:text-[200px] leading-none font-light tabular-nums">{count}</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-white text-2xl lg:text-3xl mb-[110px]"
        >
          HA of Ecosystem
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-zinc-300 text-base lg:text-lg text-center max-w-[280px] sm:max-w-sm mb-[110px] leading-relaxed px-4"
        >
          From every action your network takes, real-world change happens. Track your collective environmental contribution.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white text-black text-xl font-normal px-10 py-5 rounded-[2px] hover:bg-gray-100 transition-colors"
        >
          Join Community
        </motion.button>
      </div>

      <img src={sideShadow.url} alt="" className="absolute top-0 left-1/2 -translate-x-1/2 w-[984px] h-full object-cover pointer-events-none z-[120]" />
    </section>
  );
}

/* ============================== SECTION 6 ============================== */
const ITEMS = [
  { t: "Segregated, Bankruptcy-Remote Structure", c: "Announcements" },
  { t: "Something new in the world", c: "Announcements" },
  { t: "Blog post about something", c: "insights" },
  { t: "Closed-loop waste systems", c: "insights" },
  { t: "Low-impact land use planning", c: "Newsletter" },
  { t: "Hello World", c: "Newsletter" },
];

const FILTERS = [
  { k: "ALL", label: "ALL (17)" },
  { k: "Announcements", label: "Announcements (7)" },
  { k: "insights", label: "insights (4)" },
  { k: "Newsletter", label: "Newsletter (6)" },
];

export function Section6() {
  const [filter, setFilter] = useState("ALL");
  const shown = ITEMS.filter((i) => filter === "ALL" || i.c === filter);
  return (
    <section className="relative z-40 w-full min-h-screen bg-[#1b1b1b] text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        {/* LEFT */}
        <div className="relative col-span-1 w-full h-full flex flex-col justify-start items-center lg:items-start pt-20 pb-20 px-10 lg:pt-[140px] lg:pb-[140px] lg:px-[125px]">
          <motion.img
            src={`${CDN}/BGCard.png`}
            alt=""
            className="absolute left-0 right-0 top-20 bottom-20 lg:top-[140px] lg:bottom-[140px] w-full h-[calc(100%-10rem)] lg:h-[calc(100%-280px)] object-cover z-0"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.img
            src={`${CDN}/FirstCard.png`}
            alt=""
            className="relative z-10 w-full max-w-[530px] h-auto object-contain shadow-2xl mt-10 lg:mt-20"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
          <div
            className="absolute left-0 right-0 top-20 bottom-20 lg:top-[140px] lg:bottom-[140px] z-20 bg-repeat opacity-[0.15] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url(${noise.url})` }}
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-1 flex flex-col pt-20 pb-20 px-10 lg:pt-[140px] lg:pb-[140px] lg:pr-[120px] lg:pl-10">
          <div className="flex flex-col items-start gap-6 w-full lg:flex-row lg:justify-between lg:items-start lg:gap-8">
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-[60px] leading-[1.05] max-w-[500px] lg:max-w-[600px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white">Announcements,</span> <span className="text-stone-300">insights and Newsletter</span>
            </motion.h2>
            <motion.button
              className="bg-white text-black text-base px-7 py-4 flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 rounded-[2px]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              See More
              <Arrow45 className="w-3 h-3" />
            </motion.button>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-4 lg:gap-8 mt-10 lg:mt-16 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            {FILTERS.map((f, i) => (
              <motion.button
                key={f.k}
                onClick={() => setFilter(f.k)}
                className={`text-sm font-medium uppercase transition-colors ${filter === f.k ? "text-white" : "text-white/40 hover:text-white/70"}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {f.label}
              </motion.button>
            ))}
          </motion.div>
          <motion.div
            className="w-full lg:w-[calc(100%+80px)] h-[1px] bg-white/25 mt-6 mb-10 lg:mb-12 origin-left"
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="flex flex-col w-full lg:w-[calc(100%+80px)]">
            <AnimatePresence mode="popLayout">
              {shown.map((it, index) => (
                <motion.div
                  key={it.t}
                  layout
                  className="flex flex-col cursor-pointer group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="flex justify-between items-center pt-6 pb-[20px] px-10 -mx-10 hover:bg-white/5 transition-colors">
                    <span className="text-lg text-white/60 group-hover:text-white transition-colors">{it.t}</span>
                    <Arrow45 className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-full h-[1px] bg-white/25" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
