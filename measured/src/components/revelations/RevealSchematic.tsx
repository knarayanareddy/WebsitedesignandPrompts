import { memo } from 'react';

const MONO = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const CY = 450;

const PART_LABELS: Array<[number, string, string]> = [
  [210, 'SAPPHIRE', 'Ø 42.5 MM · AR'],
  [420, 'DISPLAY', '2000 NITS · 120 HZ'],
  [630, 'PPG SENSOR', '4× LED · 8× PD'],
  [840, 'FLEX', '0.18 MM · 34 TR'],
  [1050, 'BATTERY', '3× 302 MAH'],
  [1256, 'SI-MED1', 'CUSTOM SILICON'],
];

/**
 * Surface 4 reveal — exploded schematic: flex circuits, battery cells, custom
 * silicon, sapphire and display module, gently floating along the axis.
 */
export const RevealSchematic = memo(function RevealSchematic() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id="sch-dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(255,255,255,0.055)" />
        </pattern>
      </defs>

      <rect width="1440" height="900" fill="#050507" />
      <rect width="1440" height="900" fill="url(#sch-dots)" />

      {/* axis */}
      <line
        x1="80"
        y1={CY}
        x2="1360"
        y2={CY}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        strokeDasharray="3 8"
      />

      {/* reticle */}
      <circle
        className="a-spin"
        cx="720"
        cy={CY}
        r="252"
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
        strokeDasharray="2 7"
      />
      <circle
        cx="720"
        cy={CY}
        r="188"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="6 12"
      />

      {/* 1 — sapphire crystal */}
      <g className="a-float" style={{ animationDuration: '7.6s' }}>
        <ellipse
          cx="210"
          cy={CY}
          rx="30"
          ry="118"
          fill="rgba(96,165,250,0.06)"
          stroke="rgba(191,219,254,0.65)"
          strokeWidth="1.5"
        />
        <ellipse cx="210" cy={CY} rx="20" ry="96" fill="none" stroke="rgba(191,219,254,0.25)" strokeWidth="1" />
      </g>

      {/* 2 — display */}
      <g className="a-float" style={{ animationDuration: '8.4s', animationDelay: '-1.3s' }}>
        <rect
          x="356"
          y="368"
          width="128"
          height="164"
          rx="16"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
        />
        <rect x="370" y="382" width="100" height="136" rx="10" fill="none" stroke="rgba(255,255,255,0.16)" />
      </g>

      {/* 3 — PPG sensor module */}
      <g className="a-float" style={{ animationDuration: '7.9s', animationDelay: '-2.5s' }}>
        <circle
          cx="630"
          cy={CY}
          r="62"
          fill="rgba(16,185,129,0.05)"
          stroke="rgba(16,185,129,0.6)"
          strokeWidth="1.5"
        />
        <circle
          cx="630"
          cy={CY}
          r="34"
          fill="none"
          stroke="rgba(16,185,129,0.25)"
          strokeDasharray="2 5"
        />
        <line x1="578" y1={CY} x2="682" y2={CY} stroke="rgba(16,185,129,0.3)" />
        <line x1="630" y1="398" x2="630" y2="502" stroke="rgba(16,185,129,0.3)" />
        {[0, 90, 180, 270].map((a) => (
          <circle
            key={a}
            className="a-pulse"
            style={{ animationDelay: `-${(a / 50).toFixed(1)}s` }}
            cx={630 + 45 * Math.cos((a * Math.PI) / 180)}
            cy={CY + 45 * Math.sin((a * Math.PI) / 180)}
            r="5"
            fill="#10b981"
          />
        ))}
      </g>

      {/* 4 — flex circuit */}
      <g className="a-float" style={{ animationDuration: '8.8s', animationDelay: '-3.6s' }}>
        <path
          d="M828 348 c 32 26 32 46 0 72 c -32 26 -32 46 0 72 c 32 26 32 46 0 72"
          fill="none"
          stroke="rgba(52,211,153,0.65)"
          strokeWidth="2.5"
          strokeDasharray="5 12"
          className="a-dash"
        />
        <path
          d="M852 348 c 32 26 32 46 0 72 c -32 26 -32 46 0 72 c 32 26 32 46 0 72"
          fill="none"
          stroke="rgba(52,211,153,0.3)"
          strokeWidth="1.5"
          strokeDasharray="5 12"
          className="a-dash"
          style={{ animationDuration: '4.5s' }}
        />
        <rect x="820" y="324" width="16" height="22" rx="3" fill="none" stroke="rgba(255,255,255,0.4)" />
        <rect x="844" y="554" width="16" height="22" rx="3" fill="none" stroke="rgba(255,255,255,0.4)" />
      </g>

      {/* 5 — battery cells */}
      <g className="a-float" style={{ animationDuration: '9.2s', animationDelay: '-4.8s' }}>
        {[330, 398, 466].map((y, i) => (
          <g key={i}>
            <rect
              x="1006"
              y={y}
              width="88"
              height="56"
              rx="10"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.5"
            />
            <line x1="1022" y1={y + 18} x2="1022" y2={y + 38} stroke="rgba(255,255,255,0.35)" />
            <line x1="1012" y1={y + 28} x2="1032" y2={y + 28} stroke="rgba(255,255,255,0.35)" />
          </g>
        ))}
      </g>

      {/* 6 — custom silicon */}
      <g className="a-float" style={{ animationDuration: '8.1s', animationDelay: '-5.5s' }}>
        <rect
          x="1208"
          y="398"
          width="96"
          height="104"
          rx="10"
          fill="rgba(212,162,74,0.05)"
          stroke="rgba(212,162,74,0.6)"
          strokeWidth="1.5"
        />
        <rect x="1222" y="412" width="68" height="76" rx="6" fill="none" stroke="rgba(212,162,74,0.28)" />
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i} stroke="rgba(212,162,74,0.5)">
            <line x1={1222 + i * 17} y1="384" x2={1222 + i * 17} y2="398" />
            <line x1={1222 + i * 17} y1="502" x2={1222 + i * 17} y2="516" />
          </g>
        ))}
        <text
          x="1256"
          y="458"
          textAnchor="middle"
          fontFamily={MONO}
          fontSize="11"
          letterSpacing="2"
          fill="rgba(212,162,74,0.9)"
        >
          SI-MED1
        </text>
      </g>

      {/* part labels */}
      <g fontFamily={MONO} fontSize="10" letterSpacing="2" textAnchor="middle">
        {PART_LABELS.map(([x, a, b]) => (
          <g key={a}>
            <line x1={x} y1="584" x2={x} y2="606" stroke="rgba(255,255,255,0.14)" />
            <text x={x} y="628" fill="rgba(255,255,255,0.55)">
              {a}
            </text>
            <text x={x} y="646" fill="rgba(255,255,255,0.28)">
              {b}
            </text>
          </g>
        ))}
      </g>

      {/* dimension line */}
      <g stroke="rgba(255,255,255,0.2)" strokeWidth="1">
        <line x1="210" y1="700" x2="1256" y2="700" />
        <line x1="210" y1="692" x2="210" y2="708" />
        <line x1="1256" y1="692" x2="1256" y2="708" />
      </g>

      <text
        x="720"
        y="208"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="10"
        letterSpacing="3"
        fill="rgba(255,255,255,0.5)"
      >
        MEASURED · HWR-04 EXPLODED SCHEMATIC
      </text>
      <text
        x="720"
        y="730"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="3"
        fill="rgba(255,255,255,0.3)"
      >
        Ti-6AL-4V · SCALE 4:1
      </text>
    </svg>
  );
});
