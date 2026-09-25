import { memo } from 'react';
import type { CSSProperties } from 'react';
import type { Finish } from '../../data/surfaces';

const DEFAULT_TINTS = {
  hi: '#232327',
  mid: '#141416',
  lo: '#070708',
  sheen: 'rgba(255,255,255,0.14)',
};

/**
 * Surface 5 reveal — gentle iridescent reflection over the mirror-finish
 * device. The tint follows the selected finish.
 */
export const RevealIridescent = memo(function RevealIridescent({
  finish,
}: {
  finish?: Finish;
}) {
  const t = finish?.tints ?? DEFAULT_TINTS;
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          'radial-gradient(95% 75% at 50% 44%, #0c0c0e 0%, #050506 58%, #000 100%)',
      }}
    >
      {/* iridescent halo */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="iridescent-ring absolute inset-0 rounded-full opacity-35" />
      </div>

      {/* mirror-finish device */}
      <div
        key={finish?.name ?? 'default'}
        className="a-fade absolute left-1/2 top-1/2 aspect-square h-[54vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="device-disc absolute inset-0 rounded-full"
          style={
            {
              '--tint-hi': t.hi,
              '--tint-mid': t.mid,
              '--tint-lo': t.lo,
            } as CSSProperties
          }
        />
        <div
          className="device-sheen absolute inset-0 overflow-hidden rounded-full"
          style={{ '--sheen-tint': t.sheen } as CSSProperties}
        />
        {/* bezel tick marks */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'repeating-conic-gradient(rgba(255,255,255,0.3) 0deg 0.5deg, transparent 0.5deg 6deg)',
            WebkitMask: 'radial-gradient(closest-side, transparent 95.5%, #000 96.5%)',
            mask: 'radial-gradient(closest-side, transparent 95.5%, #000 96.5%)',
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: t.hi, boxShadow: '0 0 18px rgba(255,255,255,0.25)' }}
        />
      </div>

      <p className="absolute inset-x-0 bottom-10 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
        {finish ? `${finish.name} — Mirror Finish` : 'Mirror Finish'}
      </p>
    </div>
  );
});
