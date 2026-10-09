import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ModalSection } from '../types/console';

interface HeaderProps {
  onOpenSection: (section: ModalSection) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  displayName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSection,
  soundEnabled,
  onToggleSound,
  displayName,
}) => {
  const brandName = displayName.toLowerCase();

  return (
    <header className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 pt-6 pb-4 flex flex-wrap items-center justify-between gap-y-4 text-sm font-medium border-b border-white/[0.06]">
      {/* Wordmark */}
      <div className="flex items-center gap-1.5 cursor-pointer select-none group" onClick={() => onOpenSection('about')}>
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
          {brandName}
        </span>
        <span className="size-2 rounded-full bg-[#EC6426] shadow-[0_0_8px_#EC6426]" />
      </div>

      {/* Centered Navigation */}
      <nav className="flex items-center gap-6 sm:gap-8 text-neutral-400 order-3 sm:order-2 w-full sm:w-auto justify-center sm:justify-start pt-2 sm:pt-0">
        <button
          onClick={() => onOpenSection('work')}
          className="hover:text-white transition-colors cursor-pointer py-1 focus:outline-hidden focus:text-[#FDE3CF]"
        >
          Work
        </button>
        <button
          onClick={() => onOpenSection('about')}
          className="hover:text-white transition-colors cursor-pointer py-1 focus:outline-hidden focus:text-[#FDE3CF]"
        >
          About
        </button>
        <button
          onClick={() => onOpenSection('process')}
          className="hover:text-white transition-colors cursor-pointer py-1 focus:outline-hidden focus:text-[#FDE3CF]"
        >
          Process
        </button>
        <button
          onClick={() => onOpenSection('services')}
          className="hover:text-white transition-colors cursor-pointer py-1 focus:outline-hidden focus:text-[#FDE3CF]"
        >
          Services
        </button>
      </nav>

      {/* Right Controls: Sound Toggle + Let's Talk */}
      <div className="flex items-center gap-4 sm:gap-5 order-2 sm:order-3">
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute mechanical clicks' : 'Enable mechanical clicks'}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
        >
          {soundEnabled ? (
            <Volume2 className="size-4 text-[#F8A91F]" />
          ) : (
            <VolumeX className="size-4 text-neutral-500" />
          )}
        </button>

        <button
          onClick={() => onOpenSection('contact')}
          className="text-neutral-200 hover:text-white flex items-center gap-1.5 border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs"
        >
          <span>Let's Talk</span>
          <span className="text-[#EC6426]">↗</span>
        </button>
      </div>
    </header>
  );
};
