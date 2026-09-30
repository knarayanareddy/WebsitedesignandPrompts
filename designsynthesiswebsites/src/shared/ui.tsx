import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, animate } from "framer-motion";
import { SITES } from "./sites";

/* ---------- Icons ---------- */
export function Arrow45({ className = "w-3 h-3", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 10L10 2M10 2H3.5M10 2V8.5" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}
export function ArrowDown({ className = "w-2 h-2" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 8 8" fill="none" aria-hidden>
      <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
export function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 8H14M9 3L14 8L9 13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* ---------- Motion primitives ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
  duration = 0.7,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedWords({
  text,
  className,
  delayStart = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delayStart?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: delayStart + i * stagger, ease: [0.25, 1, 0.5, 1] }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Rule({ delay = 0, light, className = "" }: { delay?: number; light?: boolean; className?: string }) {
  return (
    <motion.div
      className={`h-[1px] w-full origin-left ${light ? "bg-black/20" : "bg-white/25"} ${className}`}
      style={{ transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
    />
  );
}

export function SectionLabel({ n, children, light }: { n: string; children: ReactNode; light?: boolean }) {
  return (
    <Reveal y={10}>
      <div className={`text-[18px] ${light ? "text-black" : "text-white"}`}>
        {n} — {children}
      </div>
    </Reveal>
  );
}

/* Giant hover wordmark — weight shifts with horizontal mouse direction */
function HoverLetter({ char, low, high }: { char: string; low: number; high: number }) {
  const [weight, setWeight] = useState(high);
  return (
    <motion.span
      onMouseMove={(e) => {
        if (e.movementX > 0) setWeight(low);
        else if (e.movementX < 0) setWeight(high);
      }}
      className="text-[15vw] xl:text-[250px] leading-none tracking-tighter uppercase cursor-default"
      animate={{ fontWeight: weight }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {char}
    </motion.span>
  );
}

export function Wordmark({
  text,
  light,
  low = 300,
  high = 900,
  height = "h-[35vh]",
  bgColor,
  accent,
}: {
  text: string;
  light?: boolean;
  low?: number;
  high?: number;
  height?: string;
  bgColor?: string;
  accent?: string;
}) {
  const bg = bgColor ?? (light ? "#ECE7DF" : "#1b1b1b");
  const hx = bg.replace("#", "");
  const rgb = `${parseInt(hx.slice(0, 2), 16)},${parseInt(hx.slice(2, 4), 16)},${parseInt(hx.slice(4, 6), 16)}`;
  return (
    <section
      className={`relative w-full ${height} flex items-center justify-center overflow-hidden ${light ? "text-[#161616]" : "text-white"}`}
      style={{ background: bg, color: accent }}
    >
      <div className="flex flex-row items-center justify-between w-full max-w-[1728px] px-5 lg:px-10 mx-auto relative z-0">
        {text.split("").map((c, i) => (
          <HoverLetter key={`${c}-${i}`} char={c} low={low} high={high} />
        ))}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-full pointer-events-none z-10"
        style={{
          background: `linear-gradient(to top, ${bg} 0%, rgba(${rgb},0.98) 15%, rgba(${rgb},0.88) 35%, rgba(${rgb},0.65) 55%, rgba(${rgb},0.35) 75%, rgba(${rgb},0.1) 90%, transparent 100%)`,
        }}
      />
    </section>
  );
}

export function useCountUp(target: number, duration = 1.5, decimals = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v.toFixed(decimals)),
    });
    return () => c.stop();
  }, [inView, target, duration, decimals]);
  return { ref, val };
}

/* ---------- Header ---------- */
export function Header({
  brand,
  mark,
  links,
  cta,
  secondary = "Sign In",
  light,
  accent,
  overlay = true,
}: {
  brand: string;
  mark: ReactNode;
  links: string[];
  cta: string;
  secondary?: string;
  light?: boolean;
  accent?: string;
  overlay?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const fg = light ? "text-[#161616]" : "text-white";
  const line = light ? "bg-black/20" : "bg-white/25";
  return (
    <div className={`${overlay ? "relative z-20" : "relative"} ${fg}`}>
      <header className="hidden w-full items-center justify-between px-10 pt-[26px] pb-[14px] lg:flex">
        <div className="flex items-center gap-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "backOut" }}>
            {mark}
          </motion.div>
          <motion.span
            className="text-2xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {brand}
          </motion.span>
        </div>
        <nav className="flex items-center gap-[60px] text-xs font-semibold uppercase">
          {links.map((l, i) => (
            <motion.a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(l.toLowerCase().replace(/\s+/g, "-"))?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-1 hover:opacity-60 transition-opacity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            >
              {l}
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
            {secondary} <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.button
            className="px-5 py-4 text-base font-normal rounded-[2px]"
            style={{ background: accent ?? (light ? "#161616" : "#fff"), color: accent ? "#000" : light ? "#fff" : "#27272a" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
          >
            {cta}
          </motion.button>
        </div>
      </header>

      <header className="flex w-full items-center justify-between px-5 pt-5 pb-2 lg:hidden">
        <div className="flex items-center gap-3">
          {mark}
          <span className="text-xl font-medium">{brand}</span>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
        >
          <span className={`block h-[2px] w-6 ${light ? "bg-black" : "bg-white"} transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-6 ${light ? "bg-black" : "bg-white"} transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
        </button>
      </header>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden flex flex-col gap-5 px-5 pb-6 text-sm font-semibold uppercase"
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                document.getElementById(l.toLowerCase().replace(/\s+/g, "-"))?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {l}
            </a>
          ))}
          <button
            className="px-5 py-3 text-base font-normal normal-case w-fit rounded-[2px]"
            style={{ background: accent ?? (light ? "#161616" : "#fff"), color: accent ? "#000" : light ? "#fff" : "#27272a" }}
          >
            {cta}
          </button>
        </motion.div>
      )}
      <motion.div
        className={`mx-auto h-[1px] w-[calc(100%-40px)] lg:w-[calc(100%-80px)] ${line}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------- Footer ---------- */
export function Footer({
  brand,
  since,
  partners,
  socials,
  email,
  callText,
  mailText = "Don't like the forms? Drop us a line via email",
  callTitle = "Book a call",
  callCta = "Let's talk",
  light,
  accent,
  bgColor,
}: {
  bgColor?: string;
  brand: string;
  since: string;
  partners: string[];
  socials: string[];
  email: string;
  callText: string;
  mailText?: string;
  callTitle?: string;
  callCta?: string;
  light?: boolean;
  accent: string;
}) {
  const copyWords = `© ${brand} since ${since}. All rights reserved`.split(" ");
  const fg = light ? "text-[#161616]" : "text-white";
  const mute = light ? "text-black/60" : "text-white/60";
  const side = light ? "lg:border-black/20" : "lg:border-white/20";
  return (
    <footer
      className={`relative z-50 w-full pt-12 pb-8 px-5 lg:pt-16 lg:pb-10 lg:px-10 ${fg}`}
      style={{ background: bgColor ?? (light ? "#ECE7DF" : "#1b1b1b") }}
    >
      <motion.div
        className={`absolute top-0 left-0 w-full h-[1px] ${light ? "bg-black/20" : "bg-white/20"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10 w-full max-w-[1728px] mx-auto">
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between">
          <div className="flex flex-row flex-wrap items-center justify-start lg:justify-between w-full gap-x-6 gap-y-4 opacity-40 mb-12 lg:mb-24">
            {partners.map((p, i) => (
              <motion.span
                key={p}
                className="text-lg lg:text-xl font-semibold tracking-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              >
                {p}
              </motion.span>
            ))}
          </div>
          <div>
            <motion.p className="text-sm mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              Follow us:
            </motion.p>
            <div className="flex items-center gap-6 mb-8 text-sm">
              {socials.map((s, index) => (
                <motion.a
                  key={s}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="uppercase text-xs font-semibold tracking-wide hover:opacity-60 transition-opacity border border-current/30 px-2 py-1 rounded-[2px]"
                  initial={{ opacity: 0, rotate: -90 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.7, ease: "backOut", delay: index * 0.1 }}
                >
                  {s}
                </motion.a>
              ))}
            </div>
            <div className={`flex flex-wrap items-center text-sm ${mute}`}>
              {copyWords.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="mr-[5px]"
                >
                  {w}
                </motion.span>
              ))}
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                •
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline underline-offset-4 ml-[5px]" style={{ color: light ? "#555" : "#A2A2A2" }}>
                  Privacy Policy
                </a>
              </motion.span>
            </div>
          </div>
        </div>

        {[
          { title: "Mail us", text: mailText, cta: email, href: `mailto:${email}`, d: 0 },
          { title: callTitle, text: callText, cta: callCta, href: "#", d: 0.2 },
        ].map((c) => (
          <motion.div
            key={c.title}
            className={`col-span-1 lg:col-span-2 flex flex-col justify-between lg:border-l ${side} lg:pl-8`}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: c.d, ease: "easeOut" }}
          >
            <div>
              <h3 className="text-3xl font-normal mb-4">{c.title}</h3>
              <p className={`text-base leading-relaxed ${light ? "text-black/55" : "text-neutral-400"}`}>{c.text}</p>
            </div>
            <div className="mt-auto pt-16">
              <a
                href={c.href}
                onClick={(e) => c.href === "#" && e.preventDefault()}
                className="flex items-center gap-3 text-lg hover:opacity-80 transition-opacity break-all"
              >
                {c.cta}
                <span className="w-5 h-5 rounded-[3px] flex items-center justify-center shrink-0" style={{ background: accent }}>
                  <Arrow45 className="w-2.5 h-2.5" color="#000" />
                </span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </footer>
  );
}

/* ---------- Floating switcher ---------- */
export function Switcher({ current }: { current: string }) {
  const idx = SITES.findIndex((s) => s.slug === current);
  const prev = SITES[(idx - 1 + SITES.length) % SITES.length];
  const next = SITES[(idx + 1) % SITES.length];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-1 bg-black/75 backdrop-blur-md border border-white/15 rounded-[2px] p-1 text-[11px] uppercase font-semibold tracking-wide text-white">
      <a href={`#/${prev.slug}`} className="px-3 py-2 hover:bg-white/10 transition-colors" aria-label={`Previous: ${prev.name}`}>
        ←
      </a>
      <a href="#/" className="px-3 py-2 hover:bg-white/10 transition-colors border-x border-white/15">
        Collection · {String(idx + 1).padStart(2, "0")}/{String(SITES.length).padStart(2, "0")}
      </a>
      <a href={`#/${next.slug}`} className="px-3 py-2 hover:bg-white/10 transition-colors flex items-center gap-2">
        {next.name} →
      </a>
    </div>
  );
}
