import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, Copy, Check, Sparkles, Code, Palette, Rocket, Layers } from 'lucide-react';
import { ModalSection } from '../types/console';

interface ModalDialogProps {
  section: ModalSection;
  displayName: string;
  onClose: () => void;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  section,
  displayName,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Focus trap & Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!section) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@debbie.example');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#18181C] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 relative text-left focus:outline-hidden"
      >
        {/* Top Header Row with Close button */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="size-2.5 rounded-full bg-[#EC6426] shadow-[0_0_8px_#EC6426]" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              The Console / {section}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer group"
            aria-label="Close dialog (Esc)"
          >
            <X className="size-5 transition-transform group-hover:rotate-90 duration-200" />
          </button>
        </div>

        {/* Section 1: Selected Work */}
        {section === 'work' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Selected Work
              </h2>
              <p className="text-neutral-400 text-lg">
                Selected website and identity concepts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-white/[0.07] hover:border-[#EC6426]/50 transition-all group">
                <div className="h-32 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center mb-4 border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#EC6426_1px,transparent_1px)] [background-size:12px_12px]" />
                  <Layers className="size-10 text-[#EC6426] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#EC6426] transition-colors">
                    Kinetic Console Interface
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                    Concept 01
                  </span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Interactive skeuomorphic hardware experience exploring tactile keys and terminal telemetry.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-white/[0.07] hover:border-[#72AC43]/50 transition-all group">
                <div className="h-32 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center mb-4 border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#72AC43_1px,transparent_1px)] [background-size:12px_12px]" />
                  <Sparkles className="size-10 text-[#72AC43] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#72AC43] transition-colors">
                    Editorial Digital Identity
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                    Concept 02
                  </span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Minimalist typography and fluid spatial animations curated for forward-thinking creative studios.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: About */}
        {section === 'about' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                About {displayName}
              </h2>
              <p className="text-[#E4A5CA] font-medium text-lg">
                Welcome to my portfolio. A little personality. A lot of possibility.
              </p>
            </div>

            <div className="prose prose-invert text-neutral-300 leading-relaxed space-y-4 text-base">
              <p>
                I am a vibe coder and creative design engineer bridging the gap between bespoke visual craft and rock-solid code. I design and build immersive digital experiences that leave a lasting tactile impression.
              </p>
              <p>
                My focus spans interactive retro-futurism, micro-interactions, custom design systems, and frontend architecture that feels physically responsive beneath your fingertips.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08]">
              <div className="p-3 rounded-xl bg-white/[0.03] text-center">
                <div className="text-xs font-mono text-neutral-400">Role</div>
                <div className="text-sm font-semibold text-white mt-1">Vibe Coder</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] text-center">
                <div className="text-xs font-mono text-neutral-400">Stack</div>
                <div className="text-sm font-semibold text-white mt-1">React / TS</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] text-center">
                <div className="text-xs font-mono text-neutral-400">Design</div>
                <div className="text-sm font-semibold text-white mt-1">Skeuomorphism</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] text-center">
                <div className="text-xs font-mono text-neutral-400">Status</div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">Available</div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Process */}
        {section === 'process' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                The Process
              </h2>
              <p className="text-neutral-400 text-lg">
                We start with a conversation, shape the design together, then build and launch your website.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-3">
                <div className="size-8 rounded-lg bg-[#EC6426]/20 text-[#EC6426] flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h4 className="font-bold text-white text-base">Conversation</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We discover your creative intent, identity tone, and technical constraints through open dialogue.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-3">
                <div className="size-8 rounded-lg bg-[#F8A91F]/20 text-[#F8A91F] flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h4 className="font-bold text-white text-base">Shape Design</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Rapid visual and interactive prototyping to discover tactile mechanics and typography rhythm.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-3">
                <div className="size-8 rounded-lg bg-[#72AC43]/20 text-[#72AC43] flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h4 className="font-bold text-white text-base">Build & Launch</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Pixel-perfect implementation, accessible mechanics, 60 FPS performance tuning, and launch.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Services */}
        {section === 'services' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Services
              </h2>
              <p className="text-neutral-400 text-lg">
                Thoughtful design, clear communication, and a website built around your business.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
                  <Code className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">Creative Development & Interaction</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Custom mechanical UI elements, terminal shaders, responsive physics, and high-performance WebGL animations.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 shrink-0">
                  <Palette className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">Digital Product Design & Identity</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Bespoke web aesthetics that break out of boilerplate templates into distinctive retro-futuristic craft.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Rocket className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">Full-Stack Frontend Architecture</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Production-grade React and TypeScript applications with robust accessibility, keyboard shortcuts, and zero lag.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Contact */}
        {section === 'contact' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Good design starts with hello.
              </h2>
              <p className="text-neutral-400 text-lg">
                Have a project in mind, a half-formed idea, or just want to say hi?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Direct Contact
              </div>
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                <span className="font-mono text-base sm:text-lg text-[#FDE3CF]">
                  hello@debbie.example
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-600/30 text-amber-300 text-xs leading-relaxed">
                <strong>Delivery Note:</strong> The address <code className="text-amber-200">hello@debbie.example</code> is a starter placeholder. Replace it with your verified production email prior to public client campaigns.
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">Esc</kbd> or click outside to dismiss</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
