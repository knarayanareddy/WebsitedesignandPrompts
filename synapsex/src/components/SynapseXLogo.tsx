import { useId } from 'react';

interface SynapseXLogoProps {
  className?: string;
}

const QUADRANT =
  'M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z';

/**
 * SynapseX mark: a single quadrant path repeated with
 * 4-fold rotational symmetry (0deg / 90deg / 180deg / 270deg).
 */
export default function SynapseXLogo({ className }: SynapseXLogoProps) {
  const rawId = useId();
  const pathId = `synapsex-quad-${rawId.replace(/:/g, '')}`;

  return (
    <svg
      viewBox="-50 -50 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id={pathId} d={QUADRANT} />
      </defs>
      <g fill="currentColor" stroke="none">
        <use href={`#${pathId}`} />
        <use href={`#${pathId}`} transform="rotate(90)" />
        <use href={`#${pathId}`} transform="rotate(180)" />
        <use href={`#${pathId}`} transform="rotate(270)" />
      </g>
    </svg>
  );
}
