import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight } from "../../shared/ui";

const CDN = "https://qclay.design/lovable/ceptral";
const heroVideo = { url: `${CDN}/Professional_Mode_Large_group_of_small_fish_gracef (1).mp4` };

function Logo({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-label="Geptral">
      <circle cx="18" cy="18" r="17" stroke="#fff" strokeWidth="1.5" />
      <path d="M10 22c0-7 5-11 16-12-1 10-5 15-12 15-2 0-4-1-4-3z" fill="#fff" />
      <path d="M9 27c5-6 9-9 14-12" stroke="#1b1b1b" strokeWidth="1.3" />
    </svg>
  );
}

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black text-white lg:min-h-[100vh]">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ objectPosition: "center 20%" }}
        src={heroVideo.url}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative z-10 flex min-h-screen flex-col lg:min-h-[100vh]">
        {/* HEADER — DESKTOP */}
        <header className="hidden w-full items-center justify-between px-10 pt-[26px] pb-[14px] lg:flex">
          <div className="flex items-center gap-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "backOut" }}>
              <Logo className="h-9 w-9" />
            </motion.div>
            <motion.span
              className="text-2xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Geptral
            </motion.span>
          </div>

          <nav className="flex items-center gap-[60px] text-xs font-semibold uppercase">
            {[
              { l: "FUTURE", d: 0.2, arrow: true },
              { l: "ABOUT US", d: 0.3, arrow: true },
              { l: "PRESS RELEASES", d: 0.4, arrow: false },
            ].map((n) => (
              <motion.a
                key={n.l}
                href={`#${n.l}`}
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: n.d, ease: "easeOut" }}
              >
                {n.l} {n.arrow && <ArrowDown />}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-[50px]">
            <motion.a
              href="#/"
              className="flex items-center gap-2 text-base font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
            >
              Sign In <ArrowRight />
            </motion.a>
            <motion.a
              href="#join"
              onClick={(e) => e.preventDefault()}
              className="bg-white px-5 py-4 text-base font-normal text-zinc-800 rounded-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
            >
              Join the Movement
            </motion.a>
          </div>
        </header>

        {/* HEADER — MOBILE/TABLET */}
        <header className="flex w-full items-center justify-between px-5 pt-5 pb-2 lg:hidden">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-medium">Geptral</span>
          </div>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
          >
            <span className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden flex flex-col gap-5 px-5 pb-6 text-sm font-semibold uppercase"
            >
              <a href="#future" className="flex items-center gap-1">FUTURE <ArrowDown /></a>
              <a href="#about" className="flex items-center gap-1">ABOUT US <ArrowDown /></a>
              <a href="#press">PRESS RELEASES</a>
              <a href="#/" className="flex items-center gap-2 normal-case text-base font-medium">Sign In <ArrowRight /></a>
              <a href="#join" className="bg-white px-5 py-3 text-base font-normal normal-case text-zinc-800 w-fit">Join the Movement</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOP DIVIDER */}
        <motion.div
          className="mx-auto h-[1px] w-[calc(100%-40px)] bg-white/25 lg:w-[calc(100%-80px)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        />

        {/* MIDDLE TAGS */}
        <div className="relative flex flex-1 items-center py-10 lg:py-0">
          <motion.span
            className="absolute left-5 text-[10px] font-medium uppercase tracking-wide lg:left-10 lg:text-xs"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            RESTORE ECOSYSTEMS
          </motion.span>
          <motion.span
            className="absolute right-5 max-w-[55%] text-right text-[10px] font-medium uppercase tracking-wide lg:right-10 lg:max-w-none lg:text-xs"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            & RETURN NATURAL CYCLES TO HARMONY
          </motion.span>
        </div>

        {/* BOTTOM MAIN CONTENT */}
        <div className="flex w-full flex-col items-start gap-6 px-5 pb-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-10 lg:gap-10">
          <motion.h1
            className="text-[36px] leading-[1.05] font-normal sm:text-5xl lg:text-[100px] lg:leading-[1] lg:whitespace-nowrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            Preserving Nature
            <br />
            for Future Generations
          </motion.h1>
          <motion.p
            className="w-full text-sm font-normal text-white/75 lg:w-96 lg:text-base"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            We develop and implement innovative technologies that effectively clean water bodies from pollution and minimize the harm from agricultural waste.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto h-[1px] w-[calc(100%-40px)] bg-white/25 lg:w-[calc(100%-80px)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        />

        <div className="flex w-full flex-col gap-2 px-5 py-4 text-[10px] font-normal uppercase tracking-wider sm:flex-row sm:items-center sm:justify-between lg:px-10 lg:py-6 lg:text-xs">
          <motion.span
            className="text-stone-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            BE PART OF THE CHANGE RESTORING OUR PLANET
          </motion.span>
          <motion.span
            className="text-neutral-400"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            SCROLL TO EXPLORE
          </motion.span>
        </div>
      </div>
    </section>
  );
}
