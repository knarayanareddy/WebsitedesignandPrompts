import { useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { SurfaceConfig } from '../data/surfaces';
import { useInView } from '../hooks/useInView';
import { useSurfaceEngine } from '../hooks/useSurfaceEngine';
import { StatBadge } from './StatBadge';
import { RevealVideo } from './revelations/RevealVideo';
import { RevealOptics } from './revelations/RevealOptics';
import { RevealSleep } from './revelations/RevealSleep';
import { RevealSchematic } from './revelations/RevealSchematic';
import { RevealIridescent } from './revelations/RevealIridescent';

const ALIGN: Record<SurfaceConfig['layout'], string> = {
  center: 'items-center text-center justify-center',
  left: 'items-start text-left justify-center',
  right: 'items-end text-right justify-center',
};

function Heading({ cfg, as }: { cfg: SurfaceConfig; as: 'h1' | 'h2' }) {
  const it = cfg.headingItalic;
  const i = it ? cfg.heading.indexOf(it) : -1;
  const node =
    i >= 0 && it ? (
      <>
        {cfg.heading.slice(0, i)}
        <em className="italic">{it}</em>
        {cfg.heading.slice(i + it.length)}
      </>
    ) : (
      cfg.heading
    );
  const Tag = as;
  return (
    <Tag
      id={`${cfg.id}-title`}
      className={`font-serif tracking-tight text-white leading-[0.9] ${
        cfg.id === 'hero'
          ? 'text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[14rem]'
          : 'max-w-4xl text-5xl sm:text-7xl md:text-8xl lg:text-9xl'
      }`}
    >
      {node}
    </Tag>
  );
}

export function SurfaceSection({ cfg }: { cfg: SurfaceConfig }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const baseRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const [finish, setFinish] = useState(0);
  const [reserved, setReserved] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const active = useInView(sectionRef, 0.25);
  useSurfaceEngine({
    sectionRef,
    gridRef,
    baseRef,
    maskRef,
    insetTop: cfg.insetTop,
    active,
  });

  const baseSrc = imgFailed && cfg.baseFallback ? cfg.baseFallback : cfg.base;

  const reveal = useMemo(() => {
    switch (cfg.reveal) {
      case 'video':
        return <RevealVideo src={cfg.video} active={active} />;
      case 'optics':
        return <RevealOptics />;
      case 'sleep':
        return <RevealSleep />;
      case 'schematic':
        return <RevealSchematic />;
      case 'iridescent':
        return <RevealIridescent finish={cfg.finishes ? cfg.finishes[finish] : undefined} />;
    }
  }, [cfg.reveal, cfg.video, cfg.finishes, active, finish]);

  return (
    <section
      ref={sectionRef}
      id={cfg.id}
      aria-labelledby={`${cfg.id}-title`}
      className="snap-start relative h-svh min-h-[560px] w-full overflow-hidden bg-black"
    >
      {/* Layer 0 — parallax grid */}
      <div ref={gridRef} aria-hidden className="grid-layer absolute -inset-20 z-0" />

      {/* Layer 1 — static base atmosphere */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div
          ref={baseRef}
          className="absolute -inset-6 will-change-transform"
          style={{ transform: 'scale(1.07)' }}
        >
          <img
            src={baseSrc}
            alt={cfg.baseAlt}
            draggable={false}
            loading={cfg.id === 'hero' ? 'eager' : 'lazy'}
            className="h-full w-full select-none object-cover"
            onError={() => setImgFailed(true)}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(130% 100% at 50% 42%, transparent 38%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.92) 100%)',
          }}
        />
      </div>

      {/* Layer 2 — editorial content */}
      <div className="relative z-20 flex h-full flex-col px-6 pb-20 pt-24 md:px-10 md:pt-28">
        <div className={`flex flex-1 flex-col gap-5 ${ALIGN[cfg.layout]}`}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            {cfg.kicker}
          </p>
          <Heading cfg={cfg} as={cfg.id === 'hero' ? 'h1' : 'h2'} />
          <p className="max-w-md text-sm leading-relaxed text-white/80 md:text-base">{cfg.sub}</p>

          {cfg.id === 'reserve' && cfg.finishes && (
            <div className="mt-8 flex flex-col items-center gap-5">
              <div
                className="liquid-glass flex items-center gap-1 rounded-full p-1.5"
                role="group"
                aria-label="Finish selector"
              >
                {cfg.finishes.map((f, i) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setFinish(i)}
                    aria-pressed={i === finish}
                    className={`flex items-center gap-2.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-300 ${
                      i === finish ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/85'
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-4 w-4 rounded-full ring-1 ring-white/25"
                      style={{ background: f.swatch }}
                    />
                    <span className="hidden sm:inline">{f.name}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => setReserved(true)}
                  className={`group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
                    reserved
                      ? 'bg-emerald-400 text-black'
                      : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {reserved ? 'Reserved — Batch 01 ✓' : 'Reserve Batch 01'}
                  {!reserved && (
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  )}
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {reserved
                    ? 'Confirmation sent — see you in 2027'
                    : `Selected — ${cfg.finishes[finish].name} · Lifetime membership`}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-4">
          <StatBadge value={cfg.statValue} label={cfg.statLabel} live={cfg.live} active={active} />
          <div className="pb-1 font-mono text-[10px] tracking-[0.3em] text-white/35">
            {cfg.chapter} / 05
          </div>
        </div>
      </div>

      {cfg.id === 'hero' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-2.5"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40">
            Scroll
          </span>
          <span className="relative block h-8 w-px overflow-hidden bg-white/15">
            <span className="scroll-dot absolute left-0 top-0 block h-3 w-px bg-white/80" />
          </span>
        </div>
      )}

      {/* Layer 3 — spotlight reveal */}
      <div
        className="zone-fade pointer-events-none absolute inset-x-0 bottom-0 z-30"
        style={
          {
            top: `${cfg.insetTop}%`,
            '--play': active ? 'running' : 'paused',
          } as CSSProperties
        }
      >
        <div ref={maskRef} className="spotlight-mask absolute inset-0 overflow-hidden">
          {reveal}
        </div>
      </div>

      {/* Layer 4 — top/bottom readability bleeds */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-black/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-36 bg-gradient-to-b from-transparent to-black"
      />
    </section>
  );
}
