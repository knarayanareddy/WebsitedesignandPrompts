import React, { useState } from 'react';
import { CornerDownLeft, Star } from 'lucide-react';
import { KeycapConfig } from '../types/console';
import { playKeyClick } from '../utils/audio';

interface KeycapProps {
  config: KeycapConfig;
  isWaveActive: boolean;
  onHoverStart: (config: KeycapConfig) => void;
  onHoverEnd: () => void;
  onClick: (config: KeycapConfig) => void;
}

export const Keycap: React.FC<KeycapProps> = ({
  config,
  isWaveActive,
  onHoverStart,
  onHoverEnd,
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Derive bounding percentages
  const leftPct = ((config.centreX - config.width / 2) / 1536) * 100;
  const topPct = ((config.centreY - config.height / 2) / 1024) * 100;
  const widthPct = (config.width / 1536) * 100;
  const heightPct = (config.height / 1024) * 100;

  const handleMouseDown = () => {
    setIsPressed(true);
    playKeyClick('down');
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    playKeyClick('up');
  };

  const handleClick = () => {
    onClick(config);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsPressed(true);
      playKeyClick('down');
      setTimeout(() => {
        setIsPressed(false);
        playKeyClick('up');
        onClick(config);
      }, 100);
    }
  };

  // Base elevation transform
  // Hover elevates -6px to -8px (-16%), Press snaps down +3px (+8%)
  let liftClass = 'translate-y-[-5%]'; // rest elevation ~0.8%
  if (isPressed) {
    liftClass = 'translate-y-[8%] scale-[0.985]';
  } else if (isHovered) {
    liftClass = 'translate-y-[-20%] scale-[1.015] shadow-xl';
  }

  return (
    <div
      className="absolute select-none cursor-pointer group"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: `${widthPct}%`,
        height: `${heightPct}%`,
        transform: 'rotate(-3.2deg) skewX(4.8deg)',
        transformOrigin: 'center center',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart(config);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
        onHoverEnd();
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      onFocus={() => {
        setIsHovered(true);
        onHoverStart(config);
      }}
      onBlur={() => {
        setIsHovered(false);
        onHoverEnd();
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${config.label} key`}
    >
      {/* Fitted Key Well Shadow (anchored in the case) */}
      <div
        className="absolute inset-0 rounded-[18%] opacity-70"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)',
          filter: 'blur(3px)',
          transform: 'translateY(12%) scale(0.96)',
        }}
      />

      {/* 3D Keycap Physical Body */}
      <div
        className={`w-full h-full relative transition-transform duration-300 ease-spring ${liftClass} ${
          isWaveActive && !isHovered && !isPressed ? 'animate-idle-wave' : ''
        }`}
      >
        {/* Darker Sidewall (3D extrusion depth) */}
        <div
          className="absolute inset-0 rounded-[16%] transition-all"
          style={{
            backgroundColor: config.baseColor,
            transform: 'translateY(10%)',
            boxShadow: '0 6px 14px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.8)',
          }}
        />

        {/* Top Keycap Face */}
        <div
          className="absolute inset-0 rounded-[15%] flex flex-col items-center justify-center transition-all duration-150"
          style={{
            backgroundColor: config.color,
            color: config.inkColor,
            boxShadow: `
              inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45),
              inset 0 -2px 3px 0 rgba(0, 0, 0, 0.28),
              0 1px 2px 0 rgba(0, 0, 0, 0.2)
            `,
          }}
        >
          {/* Keycap Content */}
          {config.isSpecial ? (
            config.specialIcon === 'star' ? (
              <Star
                className="size-[55%] stroke-[2.5]"
                fill="currentColor"
                style={{ color: config.inkColor }}
              />
            ) : (
              // Long Return / LET'S TALK bar
              <div className="flex items-center justify-between w-full px-[8%] font-mono">
                <span className="font-bold tracking-wider text-[clamp(9px,1.25cqi,16px)]">
                  {config.char}
                </span>
                <CornerDownLeft className="size-[clamp(11px,1.4cqi,18px)] stroke-[2.5] opacity-80" />
              </div>
            )
          ) : (
            <span
              className={`font-mono font-black ${config.fontSize} tracking-tighter drop-shadow-2xs select-none`}
              style={{
                fontSize: 'clamp(14px, 2.5cqi, 34px)',
                lineHeight: 1,
              }}
            >
              {config.char}
            </span>
          )}

          {/* Dished top subtle concave glow */}
          <div
            className="absolute inset-[8%] rounded-[12%] pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.7) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
