import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Header, Reveal, AnimatedWords, Rule, SectionLabel, Wordmark, Footer, Arrow45 } from "../../shared/ui";
import { engine, STEPS, TRACKS, KEYS, PRESETS } from "./engine";

const ACCENT = "#B58CFF";
const BG = "#0f0c14";

function useEngine() {
  const [, force] = useState(0);
  useEffect(() => engine.subscribe(() => force((n) => n + 1)), []);
  return engine;
}

/* ---------- Visualizer ---------- */
function Scope({ variant }: { variant: "hero" | "bars" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const smooth = new Float32Array(64);
    const draw = (t: number) => {
      const W = c.clientWidth;
      const H = c.clientHeight;
      ctx.clearRect(0, 0, W, H);
      const data = new Uint8Array(128);
      const live = engine.playing && engine.analyser;
      if (live) engine.analyser.getByteFrequencyData(data);
      const N = 64;
      for (let i = 0; i < N; i++) {
        const idle = 0.12 + 0.1 * Math.sin(t / 700 + i * 0.35) + 0.06 * Math.sin(t / 310 + i * 0.9);
        const target = live ? data[Math.floor(i * 1.6)] / 255 : idle;
        smooth[i] += (target - smooth[i]) * 0.25;
      }
      if (variant === "bars") {
        const bw = W / N;
        for (let i = 0; i < N; i++) {
          const h = Math.max(2, smooth[i] * H * 0.95);
          ctx.fillStyle = `rgba(181,140,255,${0.25 + smooth[i] * 0.75})`;
          ctx.fillRect(i * bw + 1, H - h, bw - 2, h);
        }
      } else {
        // hero: mirrored lines through vertical centre
        const cy = H * 0.52;
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          for (let i = 0; i <= N; i++) {
            const x = (i / N) * W;
            const v = smooth[Math.min(i, N - 1)];
            const y = cy - v * H * (0.22 + layer * 0.09) * Math.sin((i / N) * Math.PI) - Math.sin(t / 900 + i * 0.25 + layer) * 6;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(181,140,255,${0.7 - layer * 0.2})`;
          ctx.lineWidth = 1.5 - layer * 0.3;
          ctx.stroke();
          ctx.beginPath();
          for (let i = 0; i <= N; i++) {
            const x = (i / N) * W;
            const v = smooth[Math.min(i, N - 1)];
            const y = cy + v * H * (0.22 + layer * 0.09) * Math.sin((i / N) * Math.PI) + Math.sin(t / 900 + i * 0.25 + layer) * 6;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        // vertical ticks
        for (let i = 0; i < N; i++) {
          const x = ((i + 0.5) / N) * W;
          const h = smooth[i] * H * 0.18;
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.fillRect(x, cy - h, 1, h * 2);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ---------- Sequencer ---------- */
function Sequencer() {
  const e = useEngine();
  const labels = ["Kick", "Snare", "Hat", "Bass", "Lead"];
  return (
    <div className="w-full max-w-[1728px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8">
        <div className="bg-[#17121f] border border-white/10 p-4 lg:p-8 rounded-[2px]">
          <div className="flex flex-col gap-3">
            {TRACKS.map((t, ti) => (
              <div key={t} className="flex items-center gap-3">
                <div className="w-12 lg:w-16 shrink-0 text-[10px] lg:text-xs uppercase tracking-wider text-white/50">{labels[ti]}</div>
                <div className="grid grid-cols-16 gap-[3px] lg:gap-[6px] flex-1" style={{ gridTemplateColumns: `repeat(${STEPS}, minmax(0, 1fr))` }}>
                  {Array.from({ length: STEPS }).map((_, si) => {
                    const v = e.pattern[ti][si];
                    const isStep = e.step === si;
                    return (
                      <button
                        key={si}
                        onClick={() => e.toggleCell(ti, si)}
                        aria-label={`${t} step ${si + 1}`}
                        className={`aspect-[3/4] rounded-[1px] text-[9px] font-semibold flex items-center justify-center transition-all duration-75 ${
                          si % 4 === 0 && !v ? "bg-white/[0.12]" : !v ? "bg-white/[0.06]" : ""
                        } hover:bg-white/25`}
                        style={{
                          background: v ? ACCENT : undefined,
                          color: "#000",
                          outline: isStep ? "1px solid #fff" : "none",
                          transform: isStep && v ? "scaleY(1.12)" : undefined,
                          boxShadow: v && isStep ? `0 0 18px ${ACCENT}` : undefined,
                          opacity: isStep && !v ? 0.9 : 1,
                        }}
                      >
                        {ti === 4 && v ? v : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pl-[60px] lg:pl-[76px] grid text-[9px] text-white/30 tabular-nums" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[1, 2, 3, 4].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
        <div className="relative mt-4 h-[140px] bg-[#17121f] border border-white/10 rounded-[2px] overflow-hidden">
          <Scope variant="bars" />
          <div className="absolute top-3 left-4 text-[10px] uppercase tracking-widest text-white/40">Spectrum</div>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-8">
        <div className="flex gap-3">
          <button
            onClick={() => e.toggle()}
            className="flex-1 py-5 text-lg text-black rounded-[2px] flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
            style={{ background: ACCENT }}
          >
            {e.playing ? (
              <>
                <span className="w-3 h-3 bg-black" /> Stop
              </>
            ) : (
              <>
                <span className="border-l-[10px] border-l-black border-y-[6px] border-y-transparent" /> Play
              </>
            )}
          </button>
          <button onClick={() => e.randomize()} className="px-5 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-[2px] text-sm uppercase">
            Shuffle
          </button>
          <button onClick={() => e.clear()} className="px-5 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-[2px] text-sm uppercase">
            Clear
          </button>
        </div>

        <div>
          <div className="flex justify-between text-xs uppercase tracking-wide mb-2">
            <span className="text-white/60">Tempo</span>
            <span className="tabular-nums">{e.bpm} BPM</span>
          </div>
          <input type="range" min={60} max={160} value={e.bpm} onChange={(ev) => e.setBpm(parseInt(ev.target.value))} className="w-full" style={{ ["--thumb" as string]: ACCENT }} />
        </div>
        <div>
          <div className="flex justify-between text-xs uppercase tracking-wide mb-2">
            <span className="text-white/60">Volume</span>
            <span className="tabular-nums">{Math.round(e.volume * 100)}</span>
          </div>
          <input type="range" min={0} max={100} value={e.volume * 100} onChange={(ev) => e.setVolume(parseInt(ev.target.value) / 100)} className="w-full" style={{ ["--thumb" as string]: ACCENT }} />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide mb-3 text-white/60">Key — minor pentatonic</div>
          <div className="flex gap-2">
            {Object.keys(KEYS).map((k) => (
              <button
                key={k}
                onClick={() => e.setKey(k)}
                className={`flex-1 py-3 text-sm rounded-[2px] transition-colors ${e.key === k ? "text-black" : "bg-neutral-800 text-white/60 hover:text-white"}`}
                style={e.key === k ? { background: ACCENT } : undefined}
              >
                {k}m
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-white/15 pt-[10px] text-[#888888] text-sm leading-relaxed">
          Click a cell to place a hit. On the <span className="text-white">Lead</span> row, each click climbs the scale — numbers are scale degrees. Audio is generated live in your browser.
        </div>
      </div>
    </div>
  );
}

const MARQUEE = ["AMBIENT", "DUB TECHNO", "BROKEN BEAT", "MODULAR", "FIELD RECORDING", "NEO-SOUL", "DRONE", "ELECTRO"];

export default function Nocturne() {
  const e = useEngine();
  const seqRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => engine.stop(), []);

  const playRelease = (id: string) => {
    engine.load(id);
    engine.start();
  };

  return (
    <main className="text-white" style={{ background: BG }}>
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 60%, #2a1a45 0%, #0f0c14 65%)" }}>
        <Scope variant="hero" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header
            brand="Nocturne"
            mark={
              <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none">
                <path d="M26 6a13 13 0 1 0 4 20A11 11 0 0 1 26 6z" fill={ACCENT} />
              </svg>
            }
            links={["Instrument", "Releases", "Sessions"]}
            cta="Submit a demo"
            secondary="Collection"
            accent={ACCENT}
          />
          <div className="relative flex flex-1 items-center py-10 lg:py-0">
            <motion.span className="absolute left-5 lg:left-10 text-[10px] lg:text-xs font-medium uppercase tracking-wide" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              INDEPENDENT LABEL · EST. 2016
            </motion.span>
            <motion.span className="absolute right-5 lg:right-10 text-right text-[10px] lg:text-xs font-medium uppercase tracking-wide" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              {e.playing ? `● LIVE · ${e.bpm} BPM · ${e.key}m` : "○ PRESS PLAY — THE SITE IS AN INSTRUMENT"}
            </motion.span>
          </div>
          <div className="flex w-full flex-col items-start gap-6 px-5 pb-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-10 lg:gap-10">
            <motion.h1 className="text-[44px] leading-[1.02] font-normal sm:text-6xl lg:text-[130px] lg:leading-[0.95]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
              Play
              <br />
              the <span style={{ color: ACCENT }}>room</span>
            </motion.h1>
            <div className="flex flex-col gap-6 lg:w-96">
              <motion.p className="text-sm text-white/75 lg:text-base" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
                Nocturne is a label for slow-burn electronic music. Start the groove — then build your own on the instrument below.
              </motion.p>
              <motion.div className="flex gap-3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1, ease: "backOut" }}>
                <button onClick={() => engine.toggle()} className="px-7 py-4 text-black rounded-[2px] hover:opacity-90" style={{ background: ACCENT }}>
                  {e.playing ? "Stop the groove" : "Start the groove"}
                </button>
                <button onClick={() => seqRef.current?.scrollIntoView({ behavior: "smooth" })} className="px-7 py-4 bg-white/10 hover:bg-white/20 transition-colors rounded-[2px]">
                  Build your own
                </button>
              </motion.div>
            </div>
          </div>
          <motion.div className="mx-auto h-[1px] w-[calc(100%-40px)] lg:w-[calc(100%-80px)] bg-white/25" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1 }} />
          <div className="flex w-full flex-col gap-2 px-5 py-4 text-[10px] uppercase tracking-wider sm:flex-row sm:justify-between lg:px-10 lg:py-6 lg:text-xs">
            <span className="text-stone-300">HEADPHONES RECOMMENDED</span>
            <span className="text-neutral-400">SCROLL TO PLAY</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-white/15 py-5">
        <div className="marquee flex w-max gap-12 whitespace-nowrap text-2xl lg:text-4xl font-light">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className={i % 2 ? "text-white/40" : ""}>{m}</span>
              <span style={{ color: ACCENT }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* INSTRUMENT */}
      <section id="instrument" ref={seqRef} className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="max-w-[1728px] mx-auto mb-14 flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <SectionLabel n="02">The Instrument</SectionLabel>
            <h2 className="mt-6 text-[40px] sm:text-5xl lg:text-[81px] leading-[1.05] font-light">
              <AnimatedWords text="Sixteen steps." />
              <br />
              <span className="opacity-50">
                <AnimatedWords text="Infinite rooms." delayStart={0.2} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.3} className="text-white/50 max-w-sm lg:mt-14">
            A five-voice synthesiser and drum machine, engineered from raw oscillators. Sound is on when you press play — never before.
          </Reveal>
        </div>
        <Sequencer />
      </section>

      {/* RELEASES */}
      <section id="releases" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="max-w-[1728px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionLabel n="03">Releases</SectionLabel>
            <h2 className="mt-6 text-4xl lg:text-[60px] leading-[1.05]">
              Load a record <span className="text-stone-400">into the machine</span>
            </h2>
            <Reveal delay={0.2} className="mt-6 text-[#888888] max-w-[320px]">
              Each release carries its original groove. Press it to load tempo, key and pattern — then rewrite it.
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Rule />
            {PRESETS.map((p, i) => {
              const active = e.activePreset === p.id;
              return (
                <motion.div key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.1 }}>
                  <button onClick={() => playRelease(p.id)} className="group w-full flex items-center gap-4 lg:gap-8 py-5 px-4 -mx-4 hover:bg-white/5 transition-colors text-left">
                    <div
                      className="w-16 h-16 lg:w-24 lg:h-24 shrink-0 rounded-[2px] relative overflow-hidden"
                      style={{ background: `conic-gradient(from ${i * 70}deg, #1b1230, ${ACCENT}, #2d1b55, #0f0c14, ${ACCENT}99)` }}
                    >
                      <div className="absolute inset-2 rounded-full border border-white/30" style={{ animation: active && e.playing ? "spin 4s linear infinite" : undefined }} />
                      <div className="absolute inset-0 flex items-center justify-center text-xl text-white/90">{active && e.playing ? "❚❚" : "▶"}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-2xl lg:text-5xl transition-colors ${active ? "text-white" : "text-white/60 group-hover:text-white"}`} style={active ? { color: ACCENT } : undefined}>
                        {p.name}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-white/40 mt-2">
                        NCT-0{i + 1} · {p.bpm} BPM · {p.key} minor
                      </div>
                    </div>
                    <Arrow45 className="w-4 h-4 shrink-0" />
                  </button>
                  <Rule delay={i * 0.05} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SESSIONS */}
      <section id="sessions" className="px-5 py-16 lg:px-10 lg:py-32">
        <div className="grid w-full max-w-[1728px] mx-auto grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <SectionLabel n="04">Sessions</SectionLabel>
            <Reveal delay={0.15} className="text-[#888888] max-w-[320px]">
              Rooms, residencies and rehearsal spaces — for artists who want to make something patient.
            </Reveal>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {[
              { t: "Studio A", l: ["Analogue console, 32 channels", "Live room with 6 m ceilings", "Modular wall on request", "Overnight lock-outs"] },
              { t: "Residency", l: ["Two-week writing retreats", "Shared production partner", "Mastering included", "Release slot reserved"] },
              { t: "Sound Design", l: ["Custom instruments", "Field-recording commissions", "Interactive audio for games", "Brand sonic identity"] },
              { t: "Distribution", l: ["Vinyl & digital, worldwide", "Transparent 70/30 split", "Quarterly statements", "Artist-owned masters"] },
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

      <Wordmark text="NOCTURNE" bgColor={BG} low={200} />
      <Footer
        brand="Nocturne"
        since="2016"
        partners={["Bandcamp", "Resident Advisor", "Boiler Room", "Ableton", "Teenage Eng."]}
        socials={["Instagram", "SoundCloud", "Bandcamp", "X"]}
        email="hello@nocturne.fm"
        callText="Got a demo, a room to fill or a festival stage? Let's talk."
        callCta="Book a session"
        accent={ACCENT}
        bgColor={BG}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
