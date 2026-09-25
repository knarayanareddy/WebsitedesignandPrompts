import { Reveal } from './Reveal';

interface Stat {
  readonly value: string;
  readonly label: string;
}

const STATS: readonly Stat[] = [
  { value: '12+', label: 'Years of Design Engineering' },
  { value: '84+', label: 'Global Production Shipments' },
  { value: '99.4%', label: 'Client Satisfaction Index' },
];

export default function Stats(): JSX.Element {
  return (
    <section className="mx-auto max-w-[1240px] border-t border-stroke px-6 py-24">
      <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
        {STATS.map((stat: Stat, index: number) => (
          <Reveal key={stat.label} delay={index * 0.1}>
            <div>
              <p className="font-display text-6xl italic text-text-primary md:text-7xl">
                {stat.value}
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-muted">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
