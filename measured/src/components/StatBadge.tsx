import { useEffect, useState } from 'react';

export function StatBadge({
  value,
  label,
  live,
  active,
}: {
  value: string;
  label: string;
  live?: (tick: number) => string;
  active: boolean;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active || !live) return;
    setTick(0);
    const id = window.setInterval(() => setTick((t) => t + 1), 250);
    return () => window.clearInterval(id);
  }, [active, live]);

  return (
    <div className="liquid-glass flex items-center gap-3 rounded-full px-4 py-2.5 md:px-5 md:py-3">
      <span aria-hidden className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
      <span className="font-mono text-sm tabular-nums text-white md:text-base">{value}</span>
      <span aria-hidden className="h-4 w-px bg-white/20" />
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/50 md:text-[10px]">
        {label}
      </span>
      {live && active && (
        <span className="hidden font-mono text-[10px] tabular-nums text-emerald-400/90 sm:inline">
          {live(tick)}
        </span>
      )}
    </div>
  );
}
