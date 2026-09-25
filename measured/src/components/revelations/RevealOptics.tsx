import { memo } from 'react';

const MONO = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Repeating PPG (photoplethysmogram) waveform path. */
function ppgPath(y: number, peak: number, period: number, width: number): string {
  let d = `M-40 ${y}`;
  for (let x = 0; x < width + period; x += period) {
    d += ` L${x + period * 0.42} ${y}`;
    d += ` L${x + period * 0.5} ${y - peak * 0.24}`;
    d += ` L${x + period * 0.56} ${y - peak * 0.12}`;
    d += ` L${x + period * 0.63} ${y - peak}`;
    d += ` L${x + period * 0.72} ${y - peak * 0.08}`;
    d += ` L${x + period * 0.84} ${y}`;
  }
  return d;
}

const ppg = ppgPath(660, 84, 240, 1560);

const BEAMS = Array.from({ length: 7 }, (_, i) => {
  const t = (i - 3) / 3;
  return {
    x0: 720 + t * 26,
    x1: 720 + t * 430,
    delay: `${-(i * 0.45).toFixed(2)}s`,
  };
});

/**
 * Surface 2 reveal — sub-dermal optics: the skin becomes translucent under the
 * spotlight, exposing quad-wavelength sensor rays, capillary waveforms and
 * micro-vessel illumination.
 */
export const RevealOptics = memo(function RevealOptics() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="opt-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c110e" />
          <stop offset="55%" stopColor="#120b09" />
          <stop offset="100%" stopColor="#080505" />
        </linearGradient>
        <linearGradient id="opt-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(52,211,153,0.55)" />
          <stop offset="70%" stopColor="rgba(16,185,129,0.14)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0)" />
        </linearGradient>
        <radialGradient id="opt-emitter">
          <stop offset="0%" stopColor="rgba(209,250,229,0.95)" />
          <stop offset="45%" stopColor="rgba(16,185,129,0.7)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0)" />
        </radialGradient>
        <filter id="opt-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#opt-skin)" />

      {/* fascia bands */}
      <g fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="42">
        <path d="M0 200 C 360 160, 1080 230, 1440 178" />
        <path d="M0 470 C 420 430, 1020 500, 1440 452" />
        <path d="M0 720 C 380 690, 1100 750, 1440 700" />
      </g>

      {/* micro-vessels */}
      <g fill="none" strokeWidth="1.2">
        <path
          className="a-pulse"
          style={{ animationDelay: '-0.6s' }}
          stroke="rgba(244,63,94,0.5)"
          d="M120 880 C 220 760, 180 660, 300 560 C 360 505, 340 470, 420 430"
        />
        <path
          className="a-pulse"
          style={{ animationDelay: '-1.7s' }}
          stroke="rgba(244,63,94,0.4)"
          d="M1320 880 C 1230 770, 1290 690, 1180 590 C 1110 528, 1150 480, 1080 440"
        />
        <path
          className="a-pulse"
          style={{ animationDelay: '-2.4s' }}
          stroke="rgba(244,63,94,0.32)"
          d="M300 560 C 260 520, 300 470, 260 420 M1180 590 C 1220 545, 1185 500, 1225 455"
        />
      </g>

      {/* sensor rays */}
      <g filter="url(#opt-glow)">
        {BEAMS.map((b, i) => (
          <polygon
            key={i}
            className="a-pulse"
            style={{ animationDelay: b.delay, animationDuration: '2.6s' }}
            points={`${b.x0 - 9},250 ${b.x0 + 9},250 ${b.x1 + 20},640 ${b.x1 - 20},640`}
            fill="url(#opt-ray)"
          />
        ))}
      </g>

      {/* sensor window */}
      <rect
        x="640"
        y="194"
        width="160"
        height="52"
        rx="15"
        fill="#0a0f0d"
        stroke="rgba(16,185,129,0.55)"
        strokeWidth="1.5"
      />
      <circle cx="720" cy="220" r="28" fill="url(#opt-emitter)" className="a-pulse" />
      <circle
        cx="720"
        cy="220"
        r="44"
        fill="none"
        stroke="rgba(16,185,129,0.35)"
        strokeWidth="1"
        strokeDasharray="3 6"
        className="a-spin"
      />
      <text
        x="820"
        y="212"
        fontFamily={MONO}
        fontSize="10"
        letterSpacing="2"
        fill="rgba(255,255,255,0.4)"
      >
        SAPPHIRE WINDOW
      </text>
      <line x1="806" y1="220" x2="812" y2="220" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* capillary + PPG waveforms */}
      <g fill="none">
        <path
          d={ppg}
          stroke="rgba(16,185,129,0.22)"
          strokeWidth="1.5"
        />
        <path
          d={ppg}
          stroke="#34d399"
          strokeWidth="2.5"
          strokeDasharray="90 1530"
          className="a-flow"
          filter="url(#opt-glow)"
        />
        <path
          d="M0 470 C 240 448, 480 494, 720 470 S 1200 448, 1440 470"
          stroke="rgba(52,211,153,0.18)"
          strokeWidth="1.5"
          strokeDasharray="5 12"
          className="a-dash"
        />
        <path
          d="M0 748 C 260 774, 520 726, 780 752 S 1240 776, 1440 746"
          stroke="rgba(244,63,94,0.28)"
          strokeWidth="1.5"
          strokeDasharray="5 12"
          className="a-dash"
          style={{ animationDuration: '4.5s' }}
        />
      </g>

      {/* depth scale */}
      <g stroke="rgba(255,255,255,0.2)" strokeWidth="1">
        <line x1="140" y1="120" x2="140" y2="780" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="134" x2="146" y1={120 + i * 60} y2={120 + i * 60} />
        ))}
      </g>
      <g fontFamily={MONO} fontSize="10" letterSpacing="1.5" fill="rgba(255,255,255,0.35)">
        <text x="156" y="124">0.0 MM</text>
        <text x="156" y="344">0.5 MM</text>
        <text x="156" y="564">1.0 MM</text>
        <text x="156" y="784">1.5 MM</text>
      </g>

      {/* labels */}
      <g fontFamily={MONO} fontSize="10" letterSpacing="2">
        <text x="1040" y="300" textAnchor="end" fill="rgba(255,255,255,0.5)">
          QUAD-WAVELENGTH PPG
        </text>
        <text x="1040" y="320" textAnchor="end" fill="rgba(16,185,129,0.75)">
          λ 660 · 880 · 940 · 950 NM
        </text>
        <text x="1040" y="560" textAnchor="end" fill="rgba(255,255,255,0.5)">
          250 HZ · CONTINUOUS
        </text>
        <text x="1040" y="580" textAnchor="end" fill="rgba(255,255,255,0.3)">
          TISSUE O₂ 98.2%
        </text>
      </g>

      {/* corner brackets */}
      <g fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5">
        <path d="M28 72 V28 H72" />
        <path d="M1368 28 H1412 V72" />
        <path d="M1412 828 V872 H1368" />
        <path d="M72 872 H28 V828" />
      </g>
    </svg>
  );
});
