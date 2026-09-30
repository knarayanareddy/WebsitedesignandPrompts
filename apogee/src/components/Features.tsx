import { useRef, type RefObject } from 'react';
import { Database, Layers, Radar, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import { useSpotlight, useTilt } from '@/lib/pointer';

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: TrendingUp,
    title: 'Predictive Models',
    body: 'Ensemble forecasters that learn your seasonality — not a generic curve fitted to a spreadsheet.',
  },
  {
    icon: Radar,
    title: 'Anomaly Detection',
    body: 'Every stream watched in real time. Drift, breakage and outliers surface in minutes, not quarters.',
  },
  {
    icon: Layers,
    title: 'Scenario Planning',
    body: 'Branch the future: run pricing, demand and risk assumptions side by side before you commit.',
  },
  {
    icon: Database,
    title: 'Data Fabric',
    body: 'Warehouses, lakes and event streams resolved into one live schema your models can trust.',
  },
  {
    icon: ShieldCheck,
    title: 'Model Governance',
    body: 'Lineage, approvals and audit trails for every prediction that ships to production.',
  },
  {
    icon: Zap,
    title: 'Real-time Signals',
    body: 'Sub-second ingestion with 12ms median reads — the operating layer built for the unknown.',
  },
];

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useTilt(ref as RefObject<HTMLElement | null>, 3);
  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="tilt tilt-glow h-full rounded-[24px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-8 transition-colors duration-300 hover:border-white/[0.12]"
      >
        <div className="w-11 h-11 rounded-[12px] bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
          <feature.icon className="w-5 h-5 text-white/80" strokeWidth={1.6} />
        </div>
        <h3 className="text-white text-[18px] sm:text-[20px] font-[450] leading-[1.25] mt-5">
          {feature.title}
        </h3>
        <p className="text-white/55 text-[14px] sm:text-[15px] font-[450] leading-[1.55] mt-3">
          {feature.body}
        </p>
      </div>
    </Reveal>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSpotlight(sectionRef as RefObject<HTMLElement | null>);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="relative w-full"
      style={{
        // cursor spotlight wash across the whole grid (see .section-spotlight in index.css)
        backgroundImage:
          'radial-gradient(520px circle at var(--mx, 50%) var(--my, 0px), rgba(41,56,140,0.16), transparent 70%)',
      }}
    >
      <div className="relative max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 sm:py-24">
        <Reveal>
          <p className="text-white/50 text-[11px] sm:text-[12px] font-[450] tracking-[0.28em] uppercase">
            Platform
          </p>
          <h2 className="text-white text-[28px] sm:text-[38px] md:text-[48px] font-normal leading-[1.05] tracking-[-0.02em] mt-4 sm:mt-5 max-w-[720px]">
            Advanced reasoning, end to end
          </h2>
          <p className="text-white/60 text-[15px] sm:text-[17px] font-[450] leading-[1.55] mt-5 sm:mt-6 max-w-[560px]">
            Six capabilities, one system of record for every forecast your organization depends
            on. Move your cursor across the grid — everything here responds.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={(i % 3) * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
