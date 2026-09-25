import { memo } from 'react';

const MONO = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const X0 = 110;
const X1 = 1330;

const STAGE_Y: Record<string, number> = {
  WAKE: 240,
  REM: 322,
  N1: 404,
  N2: 486,
  N3: 568,
};
const STAGE_COLOR: Record<string, string> = {
  WAKE: 'rgba(245,158,11,0.4)',
  REM: 'rgba(139,92,246,0.38)',
  N1: 'rgba(148,163,184,0.32)',
  N2: 'rgba(59,130,246,0.32)',
  N3: 'rgba(30,64,175,0.5)',
};
const SEGMENTS: Array<[number, number, string]> = [
  [0, 0.05, 'N1'],
  [0.05, 0.18, 'N2'],
  [0.18, 0.33, 'N3'],
  [0.33, 0.4, 'N2'],
  [0.4, 0.5, 'REM'],
  [0.5, 0.62, 'N3'],
  [0.62, 0.7, 'N2'],
  [0.7, 0.82, 'REM'],
  [0.82, 0.88, 'N2'],
  [0.88, 0.92, 'N1'],
  [0.92, 0.94, 'WAKE'],
  [0.94, 1, 'N2'],
];

function stepPath(): string {
  let d = '';
  SEGMENTS.forEach(([f0, f1, s], i) => {
    const x0 = X0 + (X1 - X0) * f0;
    const x1 = X0 + (X1 - X0) * f1;
    const y = STAGE_Y[s];
    d += i === 0 ? `M${x0} ${y}` : ` L${x0} ${y}`;
    d += ` L${x1} ${y}`;
  });
  return d;
}

function hrvPath(): string {
  let d = '';
  for (let i = 0; i <= 220; i++) {
    const x = X0 + ((X1 - X0) * i) / 220;
    const base = 0.32 + 0.34 * (i / 220);
    const wobble = Math.sin(i * 0.42) * 9 + Math.sin(i * 0.13) * 13;
    const y = 800 - base * 130 - wobble;
    d += `${i === 0 ? 'M' : ' L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const STARS = Array.from({ length: 26 }, (_, i) => ({
  x: 40 + (((i * 137.508) % 100) / 100) * 1360,
  y: 30 + (((i * 89.733) % 100) / 100) * 330,
  r: 0.6 + (((i * 7.3) % 10) / 10) * 1.1,
  delay: -((i * 0.73) % 4.5),
}));

const step = stepPath();
const hrv = hrvPath();

/**
 * Surface 3 reveal — circadian data: a real-time hypnogram of sleep stages
 * plus an HRV recovery curve, over the deep night landscape.
 */
export const RevealSleep = memo(function RevealSleep() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="slp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#081120" />
          <stop offset="55%" stopColor="#04070f" />
          <stop offset="100%" stopColor="#020308" />
        </linearGradient>
        <linearGradient id="slp-hrv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(16,185,129,0.28)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0)" />
        </linearGradient>
        <filter id="slp-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#slp-bg)" />

      {STARS.map((s, i) => (
        <circle
          key={i}
          className="a-twinkle"
          style={{ animationDelay: `${s.delay}s` }}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#dbeafe"
        />
      ))}

      {/* stage bands */}
      {SEGMENTS.map(([f0, f1, s], i) => (
        <rect
          key={i}
          x={X0 + (X1 - X0) * f0}
          y={STAGE_Y[s] - 9}
          width={(X1 - X0) * (f1 - f0)}
          height="18"
          fill={STAGE_COLOR[s]}
        />
      ))}

      {/* hypnogram */}
      <path
        d={step}
        pathLength={1000}
        strokeDasharray="1000"
        className="a-draw"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* stage labels */}
      <g fontFamily={MONO} fontSize="10" letterSpacing="2" fill="rgba(255,255,255,0.35)">
        {Object.entries(STAGE_Y).map(([k, y]) => (
          <text key={k} x="36" y={y + 3.5}>
            {k}
          </text>
        ))}
      </g>

      {/* time axis */}
      <line x1={X0} y1="600" x2={X1} y2="600" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <g fontFamily={MONO} fontSize="9" fill="rgba(255,255,255,0.3)" letterSpacing="1">
        {['23:00', '01:00', '03:00', '05:00', '07:00'].map((t, i) => (
          <g key={t}>
            <line
              x1={X0 + ((X1 - X0) * i) / 4}
              y1="594"
              x2={X0 + ((X1 - X0) * i) / 4}
              y2="606"
              stroke="rgba(255,255,255,0.2)"
            />
            <text x={X0 + ((X1 - X0) * i) / 4 - 16} y="624">
              {t}
            </text>
          </g>
        ))}
      </g>

      {/* HRV recovery curve */}
      <path d={`${hrv} L${X1} 830 L${X0} 830 Z`} fill="url(#slp-hrv)" />
      <path d={hrv} fill="none" stroke="#10b981" strokeWidth="2" filter="url(#slp-glow)" />
      <circle
        r="9"
        fill="rgba(16,185,129,0.25)"
        className="a-travel"
        style={{ offsetPath: `path("${hrv}")`, offsetRotate: '0deg' }}
      />
      <circle
        r="3.5"
        fill="#34d399"
        className="a-travel"
        style={{ offsetPath: `path("${hrv}")`, offsetRotate: '0deg' }}
      />

      {/* labels */}
      <g fontFamily={MONO} fontSize="10" letterSpacing="2">
        <text x="40" y="172" fill="rgba(255,255,255,0.5)">
          SLEEP ARCHITECTURE — LAST NIGHT
        </text>
        <text x="1400" y="640" textAnchor="end" fill="rgba(255,255,255,0.45)">
          DEEP 1H 48M
        </text>
        <text x="1400" y="662" textAnchor="end" fill="rgba(255,255,255,0.45)">
          REM 1H 32M
        </text>
        <text x="1400" y="700" textAnchor="end" fill="rgba(16,185,129,0.8)">
          HRV RECOVERY 46 MS ↑
        </text>
        <text x="1400" y="722" textAnchor="end" fill="rgba(255,255,255,0.35)">
          CORE THERMAL −0.4 °C
        </text>
      </g>
    </svg>
  );
});
