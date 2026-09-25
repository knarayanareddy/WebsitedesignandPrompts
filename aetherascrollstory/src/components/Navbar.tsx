const ITEMS = [
  { label: 'Home', href: '#silence', home: true },
  { label: 'Studio', href: '#flow', home: false },
  { label: 'About', href: '#ascent', home: false },
  { label: 'Journal', href: '#eternal', home: false },
  { label: 'Reach Us', href: '#begin', home: false },
]

/**
 * Fixed glassmorphic navigation: Aethera® wordmark (Instrument Serif, #000),
 * menu (Home #000, others #6F6F6F), black "Begin Journey" pill.
 * The frosted pill keeps the black-on-white type legible over dark chapters.
 */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8 py-6">
        <div className="flex items-center gap-8 rounded-full border border-white/60 bg-white/70 py-2.5 pl-6 pr-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <a href="#silence" className="font-display text-3xl tracking-tight text-black">
            Aethera<sup className="align-super text-sm">®</sup>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm transition-colors ${
                  item.home ? 'text-black' : 'text-[#6F6F6F] hover:text-black'
                }`}
              >
                {item.label}
              </a>
            ))}
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
