import React from 'react';

export const CredibilityStrip: React.FC = () => {
  return (
    <section className="w-full py-8 my-4 border-y border-white/[0.05] overflow-hidden select-none bg-white/[0.01]">
      <div className="max-w-[1320px] mx-auto px-4 flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-mono text-neutral-400 tracking-wider">
        <div className="flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-[#EC6426]" />
          <span>Trusted by 30 brands</span>
        </div>
        <span className="text-neutral-600 font-bold">/</span>
        <div className="flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-[#72AC43]" />
          <span>50 apps built</span>
        </div>
        <span className="hidden md:inline text-neutral-600 font-bold">✦</span>
        <div className="hidden md:flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-[#F8A91F]" />
          <span>Trusted by 30 brands</span>
        </div>
        <span className="hidden md:inline text-neutral-600 font-bold">/</span>
        <div className="hidden md:flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-[#E4A5CA]" />
          <span>50 apps built</span>
        </div>
      </div>
    </section>
  );
};
