const COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Product', links: ['Platform', 'Pricing', 'Changelog', 'Status'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
  { title: 'Resources', links: ['Documentation', 'API', 'Guides', 'Support'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
];

export default function SiteFooter() {
  return (
    <footer className="relative w-full border-t border-white/[0.06]">
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-16 sm:pt-20 pb-10">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Brand block */}
          <div className="max-w-[320px]">
            <div className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 256 256" fill="none">
                <path
                  fill="white"
                  d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
                />
              </svg>
              <span className="text-white text-[22px] font-[450] leading-none tracking-[-0.02em]">
                Apogee
              </span>
            </div>
            <p className="text-white/50 text-[14px] font-[450] leading-[1.55] mt-5">
              Advanced reasoning systems and predictive models built for the unknown.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-10">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-white/40 text-[11px] font-[450] tracking-[0.22em] uppercase">
                  {col.title}
                </p>
                <div className="flex flex-col gap-3 mt-5">
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-white/70 text-[14px] font-[450] leading-[1.4] hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-14 sm:mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-white/35 text-[12px] font-[450] leading-[1.5]">
            © 2026 Apogee Systems. All rights reserved.
          </p>
          <p className="text-white/35 text-[12px] font-[450] leading-[1.5]">
            Built for the unknown.
          </p>
        </div>
      </div>
    </footer>
  );
}
