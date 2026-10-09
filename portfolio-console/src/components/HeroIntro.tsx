import React, { useState } from 'react';
import { Edit3, Check } from 'lucide-react';

interface HeroIntroProps {
  displayName: string;
  onUpdateName: (name: string) => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  displayName,
  onUpdateName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(displayName);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = tempName.trim();
    if (trimmed) {
      onUpdateName(trimmed);
    } else {
      setTempName(displayName);
    }
    setIsEditing(false);
  };

  return (
    <section className="w-full max-w-[1120px] mx-auto px-4 pt-10 pb-6 text-center select-none">
      {/* Availability Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Available for work</span>
      </div>

      {/* Main Headline with Editable Name */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
        <span>Hi, I'm </span>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="inline-flex items-center gap-2">
            <input
              type="text"
              autoFocus
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={() => handleSubmit()}
              className="bg-neutral-800 text-[#E4A5CA] border border-[#E4A5CA]/60 rounded-lg px-2 py-0.5 text-3xl sm:text-5xl font-extrabold focus:outline-hidden text-center max-w-[260px]"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#E4A5CA] text-neutral-950 hover:bg-[#d891bc] transition-colors"
            >
              <Check className="size-5" />
            </button>
          </form>
        ) : (
          <span
            onClick={() => {
              setTempName(displayName);
              setIsEditing(true);
            }}
            title="Click to edit display name (saved locally on your device)"
            className="text-[#E4A5CA] underline decoration-pink-500/40 hover:decoration-pink-400 decoration-wavy cursor-pointer hover:opacity-90 transition-opacity inline-flex items-center gap-1 group relative"
          >
            {displayName}
            <Edit3 className="size-4 sm:size-5 opacity-0 group-hover:opacity-60 transition-opacity inline-block text-pink-300 ml-1" />
          </span>
        )}
      </h1>

      {/* Subtitle */}
      <p className="text-neutral-400 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
        A vibe coder with a curious mind building digital experiences.
      </p>
    </section>
  );
};
