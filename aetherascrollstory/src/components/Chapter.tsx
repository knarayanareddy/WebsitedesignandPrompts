import type { ChapterDef } from '../data/chapters'
import VideoLoop from './VideoLoop'

type Props = {
  chapter: ChapterDef
  active: boolean
}

/**
 * One fullscreen chapter of the scroll story: looping background video,
 * gradient blends into the section background (top + bottom), kicker,
 * staggered display headline with italic muted accents, paragraph and stat.
 */
export default function Chapter({ chapter, active }: Props) {
  const light = chapter.tone === 'light'
  const right = chapter.align === 'right'

  const headingColor = light ? 'text-black' : 'text-white'
  const accentColor = light ? 'text-[#6F6F6F]' : 'text-white/60'
  const kickerColor = light ? 'text-[#6F6F6F]' : 'text-white/50'
  const bodyColor = light ? 'text-[#6F6F6F]' : 'text-white/70'

  return (
    <section
      id={chapter.id}
      className={`relative h-screen w-full overflow-hidden ${light ? 'bg-white' : 'bg-black'} ${
        active ? 'is-active' : ''
      }`}
    >
      <VideoLoop src={chapter.video} poster={chapter.poster} className="inset-0" />

      {/* Blend + readability overlays (monochrome, matching the chapter tone) */}
      <div
        className={`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b ${
          light ? 'from-white via-transparent to-white' : 'from-black via-transparent to-black'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b ${
          light ? 'from-white to-transparent' : 'from-black to-transparent'
        }`}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 md:px-10">
        <div className={`flex max-w-3xl flex-col gap-6 ${right ? 'ml-auto items-end text-right' : 'items-start text-left'}`}>
          {chapter.kicker && (
            <div className={`animate-fade-rise flex items-center gap-3 ${kickerColor}`}>
              <span className="text-xs tracking-[0.3em] md:text-sm">{chapter.kicker}</span>
              <span className={`h-px w-10 ${light ? 'bg-black/30' : 'bg-white/40'}`} />
            </div>
          )}

          <h2 className={`hero-title animate-fade-rise font-display font-normal text-5xl sm:text-7xl md:text-8xl ${headingColor}`}>
            {chapter.lines.map((line, i) => (
              <span key={i} className="block">
                {line.map((seg, j) =>
                  seg.accent ? (
                    <em key={j} className={`italic ${accentColor}`}>
                      {seg.text}
                    </em>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  ),
                )}
              </span>
            ))}
          </h2>

          <p className={`animate-fade-rise-delay max-w-xl text-base leading-relaxed sm:text-lg ${bodyColor} ${right ? 'text-right' : ''}`}>
            {chapter.paragraph}
          </p>

          {chapter.stat && (
            <div className="animate-fade-rise-delay-2 mt-4 flex flex-col">
              <div className={`flex items-center gap-3 ${right ? 'flex-row-reverse' : ''}`}>
                <span className={`font-display text-4xl tracking-tight md:text-5xl ${headingColor}`}>
                  {chapter.stat.value}
                </span>
                <span className={`hidden h-px w-24 md:block ${light ? 'bg-black/30 rotate-[20deg]' : 'bg-white/40 rotate-[20deg]'}`} />
              </div>
              <span className={`mt-1 text-xs md:text-sm ${bodyColor}`}>{chapter.stat.label}</span>
            </div>
          )}

          {chapter.cta && (
            <div className="animate-fade-rise-delay-2 mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#silence"
                className="rounded-full bg-black px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
              >
                Begin Journey
              </a>
              <a
                href="#silence"
                className={`rounded-full border px-8 py-5 text-base transition-colors ${
                  light ? 'border-black/20 text-black hover:bg-black/5' : 'border-white/40 text-white hover:bg-white/10'
                }`}
              >
                Reach Us
              </a>
            </div>
          )}
        </div>
      </div>

      {chapter.id === 'begin' && (
        <footer className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-6 text-[11px] text-[#6F6F6F]">
          <span>© 2026 Aethera</span>
          <a href="#silence" className="transition-colors hover:text-black">privacy</a>
          <a href="#silence" className="transition-colors hover:text-black">terms</a>
          <a href="#silence" className="transition-colors hover:text-black">journal</a>
        </footer>
      )}
    </section>
  )
}
