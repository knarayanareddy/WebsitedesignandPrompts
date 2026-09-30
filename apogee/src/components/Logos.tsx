import Reveal from './Reveal';

const CUSTOMERS = [
  'NORTHWIND',
  'VERTEX LABS',
  'HELIOGRAPH',
  'ATLAS FREIGHT',
  'KINETIC',
  'MERIDIAN',
  'HALCYON',
  'BRIGHTFOLD',
];

/** Trust band: an infinite marquee of customer wordmarks (pauses on hover). */
export default function Logos() {
  return (
    <section className="relative w-full border-y border-white/[0.06] py-10 sm:py-12">
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal>
          <p className="text-white/40 text-[11px] sm:text-[12px] font-[450] tracking-[0.28em] uppercase mb-7 sm:mb-8">
            Trusted by data teams at
          </p>
        </Reveal>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {CUSTOMERS.map((name) => (
                <span key={`${copy}-${name}`} className="flex items-center">
                  <span className="text-white/35 text-[15px] sm:text-[18px] font-[450] tracking-[0.12em] whitespace-nowrap">
                    {name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20 mx-8 sm:mx-12" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
