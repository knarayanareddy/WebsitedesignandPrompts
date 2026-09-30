import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITES } from "./shared/sites";
import { AnimatedWords, Arrow45, Reveal, Rule, Wordmark, SectionLabel } from "./shared/ui";

export default function Home() {
  const [hover, setHover] = useState(0);
  const cur = SITES[hover];

  return (
    <main className="bg-[#1b1b1b] text-white min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 lg:px-10 pt-6 pb-4 text-xs font-semibold uppercase tracking-wide">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Six Worlds / Design Collection
        </motion.span>
        <motion.span className="text-white/50" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          One system · 06 domains
        </motion.span>
      </div>
      <motion.div
        className="mx-auto h-[1px] w-[calc(100%-40px)] lg:w-[calc(100%-80px)] bg-white/25"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
      />

      {/* Hero */}
      <section className="px-5 lg:px-10 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <h1 className="text-[44px] sm:text-6xl lg:text-[120px] leading-[1.02] font-light">
          <span className="block">
            <AnimatedWords text="Six worlds," />
          </span>
          <span className="block">
            <AnimatedWords text="one" delayStart={0.15} /> <span className="opacity-50"><AnimatedWords text="design language" delayStart={0.25} /></span>
          </span>
        </h1>
        <div className="mt-10 flex flex-col lg:flex-row lg:justify-between gap-6">
          <Reveal delay={0.5} className="max-w-md text-white/60 text-base">
            Dark, cinematic, hairline-precise. The same principles — scroll-choreographed reveals, 1px rules, square buttons, oversized type — applied to six unrelated industries. Each one is fully interactive.
          </Reveal>
          <Reveal delay={0.6} className="text-xs uppercase tracking-wider text-white/50 lg:text-right">
            Hover to preview
            <br />
            Click to enter →
          </Reveal>
        </div>
      </section>

      {/* List */}
      <section className="px-5 lg:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1728px] mx-auto">
          <div className="lg:col-span-4 lg:sticky lg:top-10 self-start order-2 lg:order-1">
            <SectionLabel n="01">The Collection</SectionLabel>
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mt-6"
              >
                <div className="relative overflow-hidden aspect-[4/5] lg:aspect-[3/4] rounded-[2px] p-6 flex flex-col justify-between" style={{ background: cur.light ? "#ECE7DF" : "#262626", color: cur.light ? "#161616" : "#fff" }}>
                  <div
                    className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl opacity-60"
                    style={{ background: cur.accent }}
                  />
                  <div className="relative text-xs uppercase tracking-wider font-semibold opacity-70">{cur.use}</div>
                  <div className="relative">
                    <div className="text-5xl lg:text-6xl font-light tracking-tight mb-3">{cur.name}</div>
                    <div className="text-base opacity-70 mb-6">{cur.tagline}</div>
                    <div className="h-px w-full mb-4" style={{ background: cur.accent }} />
                    <div className="text-xs uppercase tracking-wide opacity-70 leading-relaxed">{cur.interaction}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <Rule />
            {SITES.map((s, i) => (
              <motion.a
                key={s.slug}
                href={`#/${s.slug}`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                className="group block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className={`flex items-center justify-between gap-6 py-8 lg:py-10 px-4 lg:px-6 -mx-4 lg:-mx-6 transition-colors ${hover === i ? "bg-white/5" : ""}`}>
                  <div className="flex items-baseline gap-5 lg:gap-10 min-w-0">
                    <span className="text-sm text-white/40 tabular-nums">0{i + 1}</span>
                    <div className="min-w-0">
                      <div className={`text-4xl sm:text-5xl lg:text-[72px] leading-none tracking-tight transition-colors ${hover === i ? "text-white" : "text-white/50"}`} style={hover === i ? { color: s.accent } : undefined}>
                        {s.name}
                      </div>
                      <div className="mt-3 text-sm text-white/50">{s.domain}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden sm:block text-xs uppercase tracking-wide text-white/40">{s.use}</span>
                    <span className="w-9 h-9 flex items-center justify-center rounded-[2px] transition-colors" style={{ background: hover === i ? s.accent : "rgba(255,255,255,0.08)", color: hover === i ? "#000" : "#fff" }}>
                      <Arrow45 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                <Rule delay={i * 0.05} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-5 lg:px-10 py-16 lg:py-32 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1728px] mx-auto">
          <div className="lg:col-span-4">
            <SectionLabel n="02">Shared principles</SectionLabel>
            <Reveal delay={0.15} className="mt-6 text-[#888888] max-w-[320px]">
              What stays constant so the content can change completely.
            </Reveal>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
            {[
              { t: "Hairline structure", l: ["1px rules at 15–25% opacity", "Lines draw in on scroll", "12-column desktop grid"] },
              { t: "Choreographed motion", l: ["Word-mask headline reveals", "Staggered fades with small y offsets", "Back-out scale for buttons"] },
              { t: "Square-edged controls", l: ["2px corner radius, never pills", "One accent colour per world", "Uppercase micro-labels"] },
              { t: "Typographic drama", l: ["Inter Tight, weights 200–900", "Oversized hover-weight wordmarks", "Numbered sections: 03 — Label"] },
            ].map((b, idx) => (
              <div key={b.t} className="border-t border-white/15 pt-[10px]">
                <Reveal delay={idx * 0.1} y={20} className="text-2xl lg:text-[28px] mb-5">
                  {b.t}
                </Reveal>
                <ul className="flex flex-col gap-[3px] text-[#888888]">
                  {b.l.map((x, i) => (
                    <Reveal key={x} y={12} delay={idx * 0.1 + 0.15 + i * 0.08}>
                      <li>{x}</li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wordmark text="WORLDS" />
      <div className="px-5 lg:px-10 pb-10 text-xs uppercase tracking-wider text-white/40 flex justify-between">
        <span>© Six Worlds Collection</span>
        <span>Built with React · Framer Motion · Three.js · Web Audio</span>
      </div>
    </main>
  );
}
