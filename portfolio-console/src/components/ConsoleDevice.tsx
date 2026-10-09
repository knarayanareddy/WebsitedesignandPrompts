import React, { useState, useEffect, useRef } from 'react';
import { KEYCAPS, KeycapConfig, ModalSection } from '../types/console';
import { Keycap } from './Keycap';
import { TerminalScreen } from './TerminalScreen';

interface ConsoleDeviceProps {
  displayName: string;
  onOpenSection: (section: ModalSection) => void;
  isModalOpen: boolean;
}

export const ConsoleDevice: React.FC<ConsoleDeviceProps> = ({
  displayName,
  onOpenSection,
  isModalOpen,
}) => {
  const defaultTitle = `${displayName}'s portfolio`;
  const defaultDesc = 'A curious mind. A world of possibilities.';

  const [activeTitle, setActiveTitle] = useState(defaultTitle);
  const [activeDesc, setActiveDesc] = useState(defaultDesc);
  const [isCustomHover, setIsCustomHover] = useState(false);
  const [wavingKeyIndex, setWavingKeyIndex] = useState<number | null>(null);

  const hoverTimeoutRef = useRef<any>(null);
  const userInteractingRef = useRef(false);

  // Update default text if displayName changes
  useEffect(() => {
    if (!isCustomHover) {
      setActiveTitle(`${displayName}'s portfolio`);
    }
  }, [displayName, isCustomHover]);

  // Idle wave manager: triggers every 7 seconds if idle
  useEffect(() => {
    let waveInterval: any = null;
    let waveTimeouts: any[] = [];

    const startWave = () => {
      if (userInteractingRef.current || isModalOpen) return;

      // Stagger through the 11 keys with 85ms interval
      KEYCAPS.forEach((_, idx) => {
        const timeout = setTimeout(() => {
          if (!userInteractingRef.current && !isModalOpen) {
            setWavingKeyIndex(idx);
          }
        }, idx * 85);
        waveTimeouts.push(timeout);
      });

      // Clear after full wave finishes (11 * 85 + 1100ms)
      const clearTimeoutId = setTimeout(() => {
        setWavingKeyIndex(null);
      }, KEYCAPS.length * 85 + 1150);
      waveTimeouts.push(clearTimeoutId);
    };

    // First wave after 2.5s, then every 7s
    const initialDelay = setTimeout(() => {
      startWave();
      waveInterval = setInterval(startWave, 7000);
    }, 2500);

    return () => {
      clearTimeout(initialDelay);
      if (waveInterval) clearInterval(waveInterval);
      waveTimeouts.forEach(clearTimeout);
    };
  }, [isModalOpen]);

  const handleHoverStart = (config: KeycapConfig) => {
    userInteractingRef.current = true;
    setWavingKeyIndex(null);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsCustomHover(true);
    setActiveTitle(config.screenTitle);
    setActiveDesc(config.screenDesc);
  };

  const handleHoverEnd = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // 350ms delay before restoring welcome title per brief
    hoverTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false;
      setIsCustomHover(false);
      setActiveTitle(`${displayName}'s portfolio`);
      setActiveDesc(defaultDesc);
    }, 350);
  };

  const handleKeyClick = (config: KeycapConfig) => {
    userInteractingRef.current = true;
    if (config.destination) {
      onOpenSection(config.destination);
    }
  };

  return (
    <div className="w-full max-w-[1120px] mx-auto px-2 sm:px-4 my-2 sm:my-6 relative">
      {/* Device chassis container scaled via 1536 x 1024 coordinate system */}
      <div
        className="w-full relative rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] select-none overflow-hidden"
        style={{
          aspectRatio: '1536 / 1024',
          containerType: 'inline-size',
        }}
      >
        {/* Background device hardware photography */}
        <img
          src="./device-reference.png"
          alt="The Portfolio Console Hardware"
          className="w-full h-full object-cover block select-none pointer-events-none"
          draggable={false}
        />

        {/* CRT Computer-Terminal Screen Overlay */}
        <TerminalScreen
          targetTitle={activeTitle}
          targetDesc={activeDesc}
          isCustomHover={isCustomHover}
          displayName={displayName}
        />

        {/* Interactive Keycaps Over Fitted Switch Openings */}
        {KEYCAPS.map((keyConfig, index) => (
          <Keycap
            key={keyConfig.id}
            config={keyConfig}
            isWaveActive={wavingKeyIndex === index}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            onClick={handleKeyClick}
          />
        ))}
      </div>
    </div>
  );
};
