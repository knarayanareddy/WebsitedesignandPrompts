import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Chapter from './components/Chapter'
import ProgressDots from './components/ProgressDots'
import VideoLoop from './components/VideoLoop'
import { ALL_IDS, CHAPTERS, HERO } from './data/chapters'

/**
 * Hero layout constants (values from the original spec):
 *  - the video layer starts HERO_VIDEO_TOP_PX below the top of the viewport so
 *    the headline sits on plain white;
 *  - the copy block's top padding is 8rem minus HERO_COPY_LIFT_PX so the
 *    headline overlaps the video's top edge.
 */
const HERO_VIDEO_TOP_PX = 300
const HERO_COPY_LIFT_PX = 75
const HERO_COPY_PADDING_TOP = `calc(8rem - ${HERO_COPY_LIFT_PX}px)`
const HERO_COPY_PADDING_BOTTOM = '10rem'

export default function App() {
  const [active, setActive] = useState<string>(HERO.id)

  // Track the chapter currently in view (drives reveals + progress dots).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { threshold: 0.35 },
    )
    for (const id of ALL_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <Navbar active={active} />
      <ProgressDots ids={ALL_IDS} active={active} />

      {/* ---------------- Chapter 0 — the statement (hero) ---------------- */}
      <section
        id={HERO.id}
        className={`relative min-h-svh w-full overflow-hidden bg-white ${active === HERO.id ? 'is-active' : ''}`}
      >
        {/* Background video layer, positioned per spec: top 300px, pinned to sides/bottom */}
        <VideoLoop
          eager
          src={HERO.video}
          poster={HERO.poster}
          style={{ top: HERO_VIDEO_TOP_PX, right: 0, bottom: 0, left: 0 }}
        />
        {/* Gradient blends the video into the white page, top and bottom */}
        <div
          className="pointer-events-none absolute z-[1] bg-gradient-to-b from-white via-transparent to-white"
          style={{ top: HERO_VIDEO_TOP_PX, right: 0, bottom: 0, left: 0 }}
        />

        <div
          className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
          style={{ paddingTop: HERO_COPY_PADDING_TOP, paddingBottom: HERO_COPY_PADDING_BOTTOM }}
        >
          <h1 className="hero-title animate-fade-rise max-w-7xl font-display text-5xl font-normal text-black sm:text-7xl md:text-8xl">
            Beyond <em className="italic text-[#6F6F6F]">silence,</em> we build{' '}
            <em className="italic text-[#6F6F6F]">the eternal.</em>
          </h1>
          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg">
            Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through
            the noise, we craft digital havens for deep work and pure flows.
          </p>
          <a
            href="#still"
            className="animate-fade-rise-delay-2 mt-12 rounded-full bg-black px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
          >
            Begin Journey
          </a>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[11px] tracking-[0.3em] text-[#6F6F6F]">scroll</span>
          <span className="scroll-cue-line bg-black/60" />
        </div>
      </section>

      {/* ---------------- Chapters 1–7 of the story ---------------- */}
      {CHAPTERS.map((chapter) => (
        <Chapter key={chapter.id} chapter={chapter} active={active === chapter.id} />
      ))}
    </div>
  )
}
