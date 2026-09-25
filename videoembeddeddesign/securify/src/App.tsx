import { useCallback, useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------ */
/*  story chapters — one video each, one beat of the securify story    */
/* ------------------------------------------------------------------ */

type Word = { text: string; cls: string }

type Stat = {
  value: string
  label: string
  cls: string // absolute position of the whole block
  divider: 'before' | 'after' // where the diagonal divider sits
  align: 'left' | 'right'
}

type Chapter = {
  id: string
  kicker?: string
  video: string
  poster: string
  shade: string // extra overlay class for bright videos
  wordSize: string
  words: Word[]
  para?: string
  paraCls?: string
  stat?: Stat
  cta?: boolean
}

const REF_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4'

const CHAPTERS: Chapter[] = [
  {
    id: 'hero',
    video: REF_VIDEO,
    poster: 'poster-hero.jpg',
    shade: '',
    wordSize: 'text-[14vw] md:text-[13vw]',
    words: [
      { text: 'protect', cls: 'left-4 md:left-10 top-[18%]' },
      { text: 'your', cls: 'right-4 md:right-10 top-[38%]' },
      { text: 'data', cls: 'left-[18%] md:left-[28%] top-[58%]' },
    ],
    para: 'we guard your data with the utmost care, empowering you with privacy everywhere',
    paraCls: 'left-6 md:left-10 top-[46%]',
    stat: {
      value: '+65k',
      label: 'startups use',
      cls: 'right-6 md:right-24 top-[14%]',
      divider: 'before',
      align: 'right',
    },
  },
  {
    id: 'motion',
    kicker: '01 / in motion',
    video: 'https://videos.pexels.com/video-files/6947516/6947516-hd_1920_1080_30fps.mp4',
    poster:
      'https://images.pexels.com/videos/6947516/extreme-sports-mountain-snow-snowboard-6947516.jpeg?auto=compress&w=1600',
    shade: 'bg-black/35',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: 'your data', cls: 'right-4 md:right-10 top-[22%]' },
      { text: 'never', cls: 'left-[8%] md:left-[14%] top-[42%]' },
      { text: 'stops', cls: 'right-[14%] md:right-[20%] top-[62%]' },
    ],
    para:
      'every click, sync and stream pushes your data through devices, teams and clouds — nonstop',
    paraCls: 'left-6 md:left-10 bottom-24 md:bottom-28',
    stat: {
      value: '0.3s',
      label: 'to detect a leak',
      cls: 'right-6 md:right-10 bottom-24 md:bottom-28',
      divider: 'after',
      align: 'left',
    },
  },
  {
    id: 'risk',
    kicker: '02 / the risk',
    video: 'https://videos.pexels.com/video-files/5843724/5843724-hd_1920_1080_30fps.mp4',
    poster:
      'https://images.pexels.com/videos/5843724/pexels-photo-5843724.jpeg?auto=compress&w=1600',
    shade: '',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: "the trail", cls: 'left-4 md:left-10 top-[24%]' },
      { text: "isn't", cls: 'right-4 md:right-10 top-[44%]' },
      { text: 'always safe', cls: 'left-[10%] md:left-[16%] top-[64%]' },
    ],
    para:
      'leaks, breaches and shadow traffic hide in plain sight — one missed turn and it is gone',
    paraCls: 'right-6 md:right-10 top-[40%] text-right',
    stat: {
      value: '0',
      label: 'breaches accepted',
      cls: 'left-6 md:left-10 bottom-24',
      divider: 'after',
      align: 'left',
    },
  },
  {
    id: 'watch',
    kicker: '03 / the watch',
    video: 'https://videos.pexels.com/video-files/6943040/6943040-hd_1920_1080_30fps.mp4',
    poster:
      'https://images.pexels.com/videos/6943040/4k-resolution-board-mountain-ski-6943040.jpeg?auto=compress&w=1600',
    shade: 'bg-black/20',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: 'we watch', cls: 'right-4 md:right-10 top-[22%]' },
      { text: 'every', cls: 'left-[6%] md:left-[10%] top-[42%]' },
      { text: 'turn', cls: 'right-[18%] md:right-[26%] top-[62%]' },
    ],
    para:
      'real-time monitoring follows your data end to end, flagging anomalies before they become incidents',
    paraCls: 'left-6 md:left-10 bottom-24',
    stat: {
      value: '24/7',
      label: 'always watching',
      cls: 'right-6 md:right-10 bottom-24 md:bottom-28',
      divider: 'before',
      align: 'right',
    },
  },
  {
    id: 'detail',
    kicker: '04 / the detail',
    video: 'https://videos.pexels.com/video-files/6286881/6286881-hd_1920_1080_30fps.mp4',
    poster:
      'https://images.pexels.com/videos/6286881/pexels-photo-6286881.jpeg?auto=compress&w=1600',
    shade: 'bg-black/40',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: 'we see what', cls: 'left-4 md:left-10 top-[20%]' },
      { text: 'others', cls: 'right-4 md:right-10 top-[42%]' },
      { text: 'miss', cls: 'left-[20%] md:left-[26%] top-[64%]' },
    ],
    para:
      'behavioral analytics inspects every packet, every permission, every pattern — down to the last byte',
    paraCls: 'right-6 md:right-10 bottom-24 text-right',
    stat: {
      value: '99.99%',
      label: 'threat detection',
      cls: 'left-6 md:left-10 bottom-24',
      divider: 'after',
      align: 'left',
    },
  },
  {
    id: 'control',
    kicker: '05 / the control',
    video: 'https://videos.pexels.com/video-files/6947537/6947537-hd_1920_1080_30fps.mp4',
    poster:
      'https://images.pexels.com/videos/6947537/extreme-sports-mountain-ski-skiing-6947537.jpeg?auto=compress&w=1600',
    shade: 'bg-black/35',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: 'you stay', cls: 'right-4 md:right-10 top-[22%]' },
      { text: 'in', cls: 'left-[8%] top-[42%]' },
      { text: 'control', cls: 'right-[12%] md:right-[18%] top-[62%]' },
    ],
    para:
      'granular policies, zero-trust access and one clean console — your rules, your data, your call',
    paraCls: 'left-6 md:left-10 bottom-24',
    stat: {
      value: '1',
      label: 'console, zero trust',
      cls: 'right-6 md:right-10 bottom-24 md:bottom-28',
      divider: 'before',
      align: 'right',
    },
  },
  {
    id: 'scale',
    kicker: '06 / the scale',
    video: 'https://videos.pexels.com/video-files/7166365/7166365-hd_1920_1080_24fps.mp4',
    poster:
      'https://images.pexels.com/videos/7166365/pexels-photo-7166365.jpeg?auto=compress&w=1600',
    shade: 'bg-black/35',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: 'privacy', cls: 'left-4 md:left-10 top-[20%]' },
      { text: 'every', cls: 'right-4 md:right-10 top-[40%]' },
      { text: 'where', cls: 'left-[18%] md:left-[28%] top-[60%]' },
    ],
    para:
      'from one laptop to a global team — the same protection follows your data, everywhere it goes',
    paraCls: 'right-6 md:right-10 bottom-24 text-right',
    stat: {
      value: '+1.5b',
      label: 'gb of data protected',
      cls: 'left-6 md:left-10 bottom-24',
      divider: 'after',
      align: 'left',
    },
  },
  {
    id: 'speed',
    kicker: '07 / the speed',
    video: 'https://videos.pexels.com/video-files/6818701/6818701-hd_1920_1080_30fps.mp4',
    poster:
      'https://images.pexels.com/videos/6818701/pexels-photo-6818701.jpeg?auto=compress&w=1600',
    shade: 'bg-black/35',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: 'fast', cls: 'right-4 md:right-10 top-[24%]' },
      { text: 'without', cls: 'left-[8%] top-[44%]' },
      { text: 'friction', cls: 'right-[12%] md:right-[16%] top-[64%]' },
    ],
    para:
      'security that never slows you down — inline protection in milliseconds, invisible to your users',
    paraCls: 'left-6 md:left-10 bottom-24',
    stat: {
      value: '0.2ms',
      label: 'median overhead',
      cls: 'right-6 md:right-10 bottom-24 md:bottom-28',
      divider: 'before',
      align: 'right',
    },
  },
  {
    id: 'proof',
    kicker: '08 / the proof',
    video: 'https://videos.pexels.com/video-files/11618451/11618451-hd_1920_1080_60fps.mp4',
    poster:
      'https://images.pexels.com/videos/11618451/pexels-photo-11618451.jpeg?auto=compress&w=1600',
    shade: 'bg-black/30',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: 'trusted', cls: 'left-4 md:left-10 top-[22%]' },
      { text: 'and', cls: 'right-[10%] md:right-[14%] top-[42%]' },
      { text: 'proven', cls: 'left-[16%] md:left-[22%] top-[62%]' },
    ],
    para:
      'soc 2, gdpr-ready, independently audited — the answers your security team will ask for',
    paraCls: 'right-6 md:right-10 bottom-24 text-right',
    stat: {
      value: '4',
      label: 'compliance frameworks',
      cls: 'left-6 md:left-10 bottom-24',
      divider: 'after',
      align: 'left',
    },
  },
  {
    id: 'momentum',
    kicker: '09 / the momentum',
    video: 'https://videos.pexels.com/video-files/11270206/11270206-hd_1920_1080_60fps.mp4',
    poster:
      'https://images.pexels.com/videos/11270206/pink-snowboard-ski-resort-skiing-snowboard-11270206.jpeg?auto=compress&w=1600',
    shade: 'bg-black/35',
    wordSize: 'text-[11.5vw] md:text-[10.5vw]',
    words: [
      { text: 'keep', cls: 'right-4 md:right-10 top-[20%]' },
      { text: 'moving', cls: 'left-[6%] md:left-[10%] top-[40%]' },
      { text: 'forward', cls: 'right-[10%] md:right-[16%] top-[62%]' },
    ],
    para:
      'ship faster, sleep better — securify grows with you, from first commit to global scale',
    paraCls: 'left-6 md:left-10 bottom-24',
    stat: {
      value: '+300k',
      label: 'downloads',
      cls: 'right-6 md:right-10 bottom-24 md:bottom-28',
      divider: 'before',
      align: 'right',
    },
  },
  {
    id: 'calm',
    kicker: '10 / the calm',
    video: 'https://videos.pexels.com/video-files/35552773/15063226_2560_1440_30fps.mp4',
    poster:
      'https://images.pexels.com/videos/35552773/black-effect-particle-slowmotion-35552773.jpeg?auto=compress&w=1600',
    shade: '',
    wordSize: 'text-[12vw] md:text-[11vw]',
    words: [
      { text: 'quiet.', cls: 'left-4 md:left-10 top-[26%]' },
      { text: 'safe.', cls: 'right-4 md:right-10 top-[46%]' },
      { text: 'yours.', cls: 'left-[18%] md:left-[28%] top-[66%]' },
    ],
    cta: true,
  },
]

/* ------------------------------------------------------------------ */
/*  hooks                                                              */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  return reduced
}

/* ------------------------------------------------------------------ */
/*  pieces                                                             */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <svg viewBox="0 0 256 256" className="h-5 w-5" fill="#ffffff" aria-hidden="true">
      <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
    </svg>
  )
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 pt-6">
      <nav className="flex items-center justify-between gap-4">
        <a
          href="#hero"
          className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3"
        >
          <Logo />
          <span className="text-white text-sm font-normal tracking-tight">securify</span>
        </a>

        <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
          <a href="#watch" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
            platform
          </a>
          <a href="#scale" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
            solutions
          </a>
          <a href="#proof" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
            company
          </a>
          <a href="#calm" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
            support
          </a>
        </div>

        <a
          href="#calm"
          className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
        >
          get started
        </a>
      </nav>
    </header>
  )
}

function StatBlock({ stat }: { stat: Stat }) {
  const divider =
    stat.divider === 'before' ? (
      <span className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
    ) : (
      <span className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
    )
  return (
    <div className={`absolute ${stat.cls}`}>
      <div
        className={`flex items-center gap-3 ${
          stat.align === 'right' ? 'justify-end flex-row-reverse' : ''
        } ${stat.divider === 'after' ? 'flex-row-reverse' : ''}`}
      >
        {stat.divider === 'before' && divider}
        <span className="text-4xl md:text-5xl font-medium tracking-tight text-white">
          {stat.value}
        </span>
        {stat.divider === 'after' && divider}
      </div>
      <div
        className={`text-xs md:text-sm text-white/70 mt-1 ${
          stat.align === 'right' ? 'text-right' : ''
        }`}
      >
        {stat.label}
      </div>
    </div>
  )
}

function CTA() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-28 w-full px-6 flex flex-col items-center gap-7">
      <p className="max-w-[340px] text-[15px] leading-snug text-white/90 text-center">
        your data, at rest. encrypted, monitored, at peace — while you keep moving
      </p>
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="bg-white text-black text-sm font-normal rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors"
        >
          get started
        </a>
        <a
          href="#"
          className="border border-white/40 text-white text-sm font-normal rounded-full px-8 py-4 hover:bg-white/10 transition-colors"
        >
          talk to us
        </a>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-6 text-[11px] text-white/50">
      <span>© 2026 securify</span>
      <a href="#" className="hover:text-white transition-colors">
        privacy
      </a>
      <a href="#" className="hover:text-white transition-colors">
        terms
      </a>
      <a href="#" className="hover:text-white transition-colors">
        security
      </a>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  scene                                                              */
/* ------------------------------------------------------------------ */

function Scene({
  ch,
  index,
  onActive,
}: {
  ch: Chapter
  index: number
  onActive: (i: number, v: boolean) => void
}) {
  const { ref, inView } = useInView<HTMLElement>(0.35)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const HeadingTag = index === 0 ? 'h1' : 'h2'

  useEffect(() => {
    if (inView) onActive(index, true)
  }, [inView, index, onActive])

  useEffect(() => {
    const v = videoRef.current
    if (!v || reduced) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView, reduced])

  return (
    <section ref={ref} id={ch.id} className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={ch.video}
        poster={ch.poster}
        autoPlay={index === 0}
        loop
        muted
        playsInline
        preload={index === 0 ? 'auto' : 'metadata'}
      />

      {/* readability overlays — monochrome only */}
      {ch.shade && <div className={`absolute inset-0 pointer-events-none ${ch.shade}`} />}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />

      {/* foreground */}
      <div className="relative z-10 h-full w-full">
        {ch.kicker && (
          <div className="absolute left-6 md:left-10 top-24 md:top-28 flex items-center gap-3">
            <span className="text-white/50 text-xs md:text-sm tracking-[0.3em]">{ch.kicker}</span>
            <span className="h-px w-10 bg-white/40" />
          </div>
        )}

        <HeadingTag className="contents">
          {ch.words.map((w, i) => (
            <span
              key={i}
              className={`hero-title absolute text-white font-medium ${ch.wordSize} ${w.cls}`}
            >
              {w.text}
            </span>
          ))}
        </HeadingTag>

        {ch.para && !ch.cta && (
          <p className={`absolute max-w-[240px] text-[15px] leading-snug text-white/90 ${ch.paraCls ?? ''}`}>
            {ch.para}
          </p>
        )}

        {ch.stat && <StatBlock stat={ch.stat} />}

        {index === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[11px] tracking-[0.3em] text-white/60">scroll</span>
            <span className="scroll-cue block h-8 w-px bg-white/60" />
          </div>
        )}

        {ch.cta && <CTA />}
        {ch.cta && <Footer />}
      </div>
    </section>
  )
}

function Dots({ active }: { active: number }) {
  return (
    <div className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {CHAPTERS.map((c, i) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          aria-label={c.kicker ?? c.id}
          className={`block rounded-full transition-all duration-500 ${
            i === active ? 'h-6 w-1.5 bg-white' : 'h-1.5 w-1.5 bg-white/30 hover:bg-white/60'
          }`}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  app                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [active, setActive] = useState(0)
  const handleActive = useCallback((i: number) => setActive(i), [])

  return (
    <main className="bg-black">
      <Navbar />
      <Dots active={active} />
      {CHAPTERS.map((ch, i) => (
        <Scene key={ch.id} ch={ch} index={i} onActive={handleActive} />
      ))}
    </main>
  )
}
