import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { ModalSection } from '../types/console';

interface ContactSectionProps {
  onOpenContactModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenContactModal,
}) => {
  return (
    <section className="w-full max-w-[1120px] mx-auto px-4 py-16 sm:py-24 my-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/[0.08]">
        {/* Left Headline */}
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Good design starts with hello.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Have a project in mind, a half-formed idea, or just want to say hi?
          </p>
        </div>

        {/* Right Contact Link */}
        <div className="shrink-0">
          <button
            onClick={onOpenContactModal}
            className="group inline-flex items-center gap-3 text-lg sm:text-xl font-medium text-white hover:text-[#EC6426] transition-colors cursor-pointer"
          >
            <span className="underline underline-offset-8 decoration-neutral-700 group-hover:decoration-[#EC6426] transition-colors">
              hello@debbie.example
            </span>
            <div className="size-9 rounded-full bg-white/[0.06] group-hover:bg-[#EC6426] group-hover:text-white flex items-center justify-center transition-all">
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <div>
          © 2026 The Portfolio Console. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span>Skeuomorphic Retro-Futurism</span>
          <span>•</span>
          <span>Courier Monospace Engine</span>
        </div>
      </div>
    </section>
  );
};
