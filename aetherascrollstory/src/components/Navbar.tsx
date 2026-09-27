import { ALL_IDS } from '../data/chapters'

/** Each item "owns" the chapters from its anchor up to the next item's anchor. */
const ITEMS = [
  { label: 'Home', href: '#silence' },
  { label: 'Studio', href: '#flow' },
  { label: 'About', href: '#ascent' },
  { label: 'Journal', href: '#eternal' },
  { label: 'Reach Us', href: '#begin' },
]

type Props = {
  /** id of the chapter currently in view (drives the active menu item) */
  active: string
}

/** Index of the nav item whose range contains the active chapter. */
function activeItemIndex(activeId: string): number {
  const chapterIndex = ALL_IDS.indexOf(activeId)
  let current = 0
  ITEMS.forEach((item, i) => {
    const itemChapter = ALL_IDS.indexOf(item.href.slice(1))
    if (itemChapter !== -1 && itemChapter <= chapterIndex) current = i
  })
  return current
}

/**
 * Fixed glassmorphic navigation: Aethera® wordmark (Instrument Serif, #000),
 * menu (active item #000, others #6F6F6F), black "Begin Journey" pill.
 * The frosted pill keeps the black-on-white type legible over dark chapters.
 */
export default function Navbar({ active }: Props) {
  const currentIndex = activeItemIndex(active)

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8 py-6">
        <div className="flex items-center gap-8 rounded-full border border-white/60 bg-white/70 py-2.5 pl-6 pr-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <a href="#silence" className="font-display text-3xl tracking-tight text-black">
            Aethera<sup className="align-super text-sm">®</sup>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {ITEMS.map((item, i) => {
              const isCurrent = i === currentIndex
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isCurrent ? 'location' : undefined}
                  className={`text-sm transition-colors ${
                    isCurrent ? 'text-black' : 'text-[#6F6F6F] hover:text-black'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
        <a
          href="#begin"
          className="rounded-full bg-black px-6 py-2.5 text-sm text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.03]"
        >
          Begin Journey
        </a>
      </nav>
    </header>
  )
}
