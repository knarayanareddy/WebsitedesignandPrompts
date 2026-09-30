import Reveal from './Reveal';

const CUSTOMERS = [
  'NORTHWIND',
  'VERTEX LABS',
  'HELIOGRAPH',
  'ATLAS FREIGHT',
  'KINETIC',
  'MERIDIAN',
];

/** Thin trust band between the hero and the numbers. */
export default function Logos() {
  return (
    <section className="relative w-full border-y border-white/[0.06]">
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-10 sm:py-12">
        <Reveal>
          <p className="text-white/40 text-[11px] sm:text-[12px] font-[450] tracking-[0.28em] uppercase mb-7 sm:mb-8">
            Trusted by data teams at
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-14">
            {CUSTOMERS.map((name) => (
              <span
                key={name}
                className="text-white/35 text-[15px] sm:text-[18px] font-[450] tracking-[0.12em]"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
