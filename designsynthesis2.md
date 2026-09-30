## Environment

This template is structured for a Next.js project with the App Router:

- File paths use /components/... and /app/page.tsx
- Components use the "use client" directive
- Imports use the @/components/... path alias
- Tailwind CSS for styling
- framer-motion for animations
- lucide-react for icons

If you support this exact structure, apply the files below as written.

If your builder uses a different structure (e.g. /src directory, Pages
Router, or Vite + React), adapt the file paths and entry point — but
keep every component file's CODE 100% IDENTICAL to what's provided
below. Do not rewrite, refactor, or reinterpret any component.

The only adaptations allowed are:
- File paths (e.g. /src/components/... instead of /components/...)
- Entry point file (e.g. src/App.tsx instead of app/page.tsx)
- Removing "use client" directives if your builder doesn't use Next.js
- Replacing the @/components/... alias with the correct relative path
- Replacing Next.js-specific imports (e.g. next/image, next/link) with
  standard equivalents (<img>, <a>) — only if your builder doesn't
  support Next.js
- Installing any missing dependencies via your builder's package manager
  before applying the files

Everything else — JSX, hooks, component names, default exports, props,
className values, animations, styling, logic — stays exactly as written.
The output must run without any errors.

If your builder cannot support React + JSX at all, stop and tell the user
before proceeding.

## Add Template: Mindfulness Landing Page Design - Solra

### File 1 of 8: /components/templates/mindfulness-landing-page-design-solra/Header 01 Solra.tsx

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, MapPin, Droplets, List, BookOpen, Clock, ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Sub-components ---

function Waveform() {
  const bars = Array.from({ length: 18 });
  const heights = [10, 20, 28, 24, 34, 36, 30, 32, 22, 16, 9, 5, 9, 13, 6, 4, 8, 5];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="flex items-center gap-[3px] w-[175px] h-[36px] overflow-hidden"
    >
      {bars.map((_: unknown, i: number) => (
        <motion.span
          key={i}
          className="inline-block w-[3px] shrink-0 rounded-[2px] origin-center"
          style={{
            height: heights[i] + "px",
            backgroundColor: i < 10 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)"
          }}
          animate={{
            scaleY: [0.25, 1, 1, 0.25],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity as number,
            ease: "easeInOut" as const,
            delay: i * 0.13,
          }}
        />
      ))}
    </motion.div>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 17 16" className="w-[16px] h-[16px] fill-[#85FA6C] shrink-0">
      <path d="M8.421 0l2.063 6.344H17l-5.29 3.844 2.02 6.343-5.309-3.86-5.308 3.86 2.02-6.343L0 6.344h6.516z" />
    </svg>
  );
}

function DropdownItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <a
      href="#"
      className="flex items-center gap-[10px] p-[9px_12px] rounded-[10px] no-underline text-white/75 text-sm font-medium transition-all hover:bg-[#85FA6C]/10 hover:text-[#85FA6C] group"
      role="menuitem"
    >
      <span className="w-[30px] h-[30px] rounded-lg bg-white/7 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#85FA6C]/18 group-hover:text-[#85FA6C]">
        {React.isValidElement(icon) &&
          React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: "w-[15px] h-[15px] stroke-current fill-none",
          })}
      </span>
      <span className="flex-1 leading-[1.2]">
        {title}
        <span className="text-[11px] text-white/38 font-normal mt-[1px] block">{desc}</span>
      </span>
    </a>
  );
}

export default function Header01Solra({ className }: { className?: string }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden flex flex-col items-start bg-[#1b1f1b]",
        className
      )}
      aria-label="Hero"
    >
      {/* Background */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('https://cdn.jiro.build/Solra/background%20image/Hero%2001%20BG.png')",
        }}
        role="img"
        aria-label="Person meditating in yoga pose"
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,28,18,0.92), rgba(20,28,18,0.75), rgba(20,28,18,0.10))" }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto pt-5 px-6 lg:px-[135px] pb-[60px] flex flex-col items-start self-stretch min-h-screen">

        {/* --- Navigation --- */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full relative z-[100]"
          role="banner"
        >
          <nav className="flex py-5 items-center justify-between gap-6 self-stretch" aria-label="Main navigation">
            {/* Logo */}
            <a href="#" className="flex items-center w-[175px] h-10 no-underline group" aria-label="FitZen home">
              <div className="relative h-full flex items-center justify-start" aria-hidden="true">
                <Image
                  src="https://cdn.jiro.build/Solra/Svg%20icon/Logo%201.svg"
                  alt="FitZen Logo"
                  width={175}
                  height={40}
                  className="w-auto h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div
              className="hidden md:flex px-4 py-2 items-center gap-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-[5.5px]"
              role="list"
            >
              <a href="#" className="text-white font-sans text-base font-semibold tracking-normal no-underline transition-opacity hover:opacity-75" role="listitem" aria-current="page">Home</a>
              <a href="#" className="text-white font-sans text-base font-normal tracking-[-0.4px] no-underline transition-opacity hover:opacity-75" role="listitem">About</a>
              <a href="#" className="text-white font-sans text-base font-normal tracking-[-0.4px] no-underline transition-opacity hover:opacity-75" role="listitem">Contact</a>

              <div className="relative">
                <button
                  className="flex items-center gap-1 text-white font-sans text-base font-normal tracking-[-0.4px] cursor-pointer bg-transparent border-none p-0 transition-opacity hover:opacity-75"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  aria-haspopup="true"
                  aria-expanded={isMoreOpen}
                >
                  More
                  <ChevronDown className={cn("w-[14px] h-[14px] transition-transform duration-200", isMoreOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      key="desktop-dropdown"
                      initial={{ opacity: 0, y: -8, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: -8, x: "-50%" }}
                      className="absolute top-[calc(100%+14px)] left-1/2 w-[220px] bg-[rgba(18,26,16,0.92)] border border-white/[0.14] rounded-2xl backdrop-blur-[20px] p-2 z-[100] shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                      role="menu"
                    >
                      {/* Arrow */}
                      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-[rgba(18,26,16,0.95)] border-t border-l border-white/[0.14] rotate-45" />

                      <div className="py-1">
                        <p className="text-[10px] font-bold tracking-[0.8px] uppercase text-white/35 px-3 pb-[6px] pt-1">Services</p>
                        <DropdownItem icon={<MapPin />} title="Personal Training" desc="1-on-1 coaching sessions" />
                        <DropdownItem icon={<Droplets />} title="Yoga & Mindfulness" desc="Classes for all levels" />
                        <DropdownItem icon={<List />} title="Nutrition Plans" desc="Personalized meal guides" />
                      </div>
                      <div className="py-1 border-t border-white/[0.08] mt-1 pt-2">
                        <p className="text-[10px] font-bold tracking-[0.8px] uppercase text-white/35 px-3 pb-[6px] pt-1">Resources</p>
                        <DropdownItem icon={<BookOpen />} title="Blog & Articles" desc="Tips, guides & wellness news" />
                        <DropdownItem icon={<Clock />} title="Free Webinars" desc="Live & recorded sessions" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop CTA */}
            <a
              href="#"
              className="hidden md:flex px-6 py-3 justify-center items-center rounded-full bg-white text-[#0f1b0f] text-sm font-semibold no-underline transition-all hover:bg-[#85FA6C] hover:-translate-y-[1px] whitespace-nowrap"
            >
              Book a Call
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 bg-white/10 border border-white/20 rounded-[10px]"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Open menu"
              aria-expanded={isMobileNavOpen}
            >
              <span className={cn("block w-[22px] h-[2px] bg-white rounded-[2px] transition-all", isMobileNavOpen && "translate-y-[7px] rotate-45")} />
              <span className={cn("block w-[22px] h-[2px] bg-white rounded-[2px] transition-all", isMobileNavOpen && "opacity-0 scale-x-0")} />
              <span className={cn("block w-[22px] h-[2px] bg-white rounded-[2px] transition-all", isMobileNavOpen && "-translate-y-[7px] rotate-45")} />
            </button>
          </nav>

          {/* Mobile Nav Drawer */}
          <AnimatePresence>
            {isMobileNavOpen && (
              <motion.div
                key="mobile-nav"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="md:hidden absolute top-full left-0 right-0 bg-[rgba(10,18,9,0.97)] backdrop-blur-[20px] border-b border-white/10 px-8 pb-7 pt-2 flex flex-col z-[999]"
                role="dialog"
                aria-modal={true}
              >
                <a href="#" className="flex items-center py-[13px] text-[#85FA6C] text-base font-semibold no-underline border-b border-white/[0.07]">Home</a>
                <a href="#" className="flex items-center py-[13px] text-white/85 text-base font-normal no-underline border-b border-white/[0.07]">About</a>
                <a href="#" className="flex items-center py-[13px] text-white/85 text-base font-normal no-underline border-b border-white/[0.07]">Contact</a>

                <button
                  className="flex items-center justify-between py-[13px] text-white/85 text-base font-normal border-b border-white/[0.07] bg-transparent w-full text-left font-sans cursor-pointer"
                  style={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}
                  onClick={() => setIsMobileSubmenuOpen(!isMobileSubmenuOpen)}
                >
                  More
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-[250ms]", isMobileSubmenuOpen && "rotate-180")} />
                </button>

                {isMobileSubmenuOpen && (
                  <div className="flex flex-col pl-4 border-l-2 border-[#85FA6C]/30 ml-1 mb-1">
                    <a href="#" className="text-sm text-white/60 py-[10px] border-b border-white/5 no-underline">Personal Training</a>
                    <a href="#" className="text-sm text-white/60 py-[10px] border-b border-white/5 no-underline">Yoga & Mindfulness</a>
                    <a href="#" className="text-sm text-white/60 py-[10px] border-b border-white/5 no-underline">Nutrition Plans</a>
                    <a href="#" className="text-sm text-white/60 py-[10px] border-b border-white/5 no-underline">Blog & Articles</a>
                    <a href="#" className="text-sm text-white/60 py-[10px] border-b border-white/5 no-underline">Free Webinars</a>
                  </div>
                )}

                <a
                  href="#"
                  className="flex mt-5 px-7 py-[14px] justify-center rounded-full bg-[#85FA6C] text-[#0f1b0f] font-bold text-[15px] no-underline"
                >
                  Book a Call
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* --- Hero Content --- */}
        <main className="pt-24 md:pt-[120px] flex flex-col items-start gap-8 md:gap-12 self-stretch">
          <div className="flex flex-col items-start gap-8 md:gap-12 w-full max-w-[650px]">

            <Waveform />

            {/* Social Proof Badge & Heading */}
            <div className="flex flex-col items-start gap-6">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-flex pt-[6px] pr-[20px] pb-[6px] pl-[16px] items-center gap-3 bg-white/20 backdrop-blur-[7px] rounded-[999px] border border-white/15"
                role="note"
              >
                <div className="flex items-center gap-1" aria-hidden="true">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <span className="text-[#ECFBEB] font-sans text-base font-normal tracking-[-0.4px]">Trusted by 30K+ clients</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.65 }}
                className="w-full lg:w-[612px] text-[#ECFBEB] font-serif text-[34px] sm:text-[42px] md:text-[52px] lg:text-[68px] font-semibold leading-[1.15] md:leading-[1.1] tracking-[-0.5px] md:tracking-[-1.6px]"
              >
                Transform Your Body. Calm Your Mind. Elevate Your Life.
              </motion.h1>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            role="group"
            aria-label="Call to action"
          >
            <a
              href="#"
              className="group flex px-7 py-3 md:py-4 justify-center items-center gap-3 rounded-full bg-[#85FA6C] text-[#0f1b0f] text-[15px] font-bold no-underline transition-all hover:bg-[#5fda48] hover:shadow-[0_8px_28px_rgba(133,250,109,0.30)] w-full sm:w-auto overflow-hidden"
            >
              Start Your Journey
              <span className="flex flex-col items-center h-4 overflow-hidden" aria-hidden="true">
                <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-full" />
                <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-full" />
              </span>
            </a>
            <a
              href="#"
              className="group flex px-7 py-3 md:py-4 justify-center items-center gap-3 rounded-full border border-white/40 bg-white/10 backdrop-blur-[7px] text-white text-[15px] font-medium no-underline transition-all hover:bg-[#85FA6C]/10 hover:border-[#85FA6C]/50 hover:text-[#85FA6C] w-full sm:w-auto"
            >
              Join Member
              <span className="flex overflow-hidden w-4 h-4 items-center" aria-hidden="true">
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </motion.div>
        </main>

        {/* --- Bottom-right Info Card --- */}
        <motion.aside
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-12 md:mt-[96px] lg:self-end flex flex-col items-start gap-4 z-[2] pb-12 md:pb-20 w-full lg:w-auto"
          aria-label="About FitZen"
        >
          <p className="w-full lg:w-[398px] text-[#DBFFD2] font-sans text-[18px] font-normal leading-[26px] tracking-[-0.18px]">
            Experience personalized fitness, yoga & mindfulness transformation.
          </p>

          <div className="flex flex-col sm:flex-row p-4 justify-between items-start sm:items-center self-stretch rounded-2xl border border-[#ECFBEB] bg-white/20 backdrop-blur-[7px] gap-4 w-full lg:w-[400px]">

            <div className="flex items-center gap-4 w-full sm:w-[204px]">
              <div className="w-[43px] h-[43px] rounded-[10px] flex items-center justify-center shrink-0 overflow-hidden" aria-hidden="true">
                <Image
                  src="https://cdn.jiro.build/Solra/Svg%20icon/Hand%20rise.svg"
                  alt="Hand Rise Icon"
                  width={43}
                  height={43}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col items-start w-[145px]">
                <p className="text-[#DBFFD2] font-sans text-[14px] font-medium leading-[22px] not-italic whitespace-nowrap">The care you deserve</p>
                <a href="#" className="self-stretch text-[#4AFD27] font-sans text-lg font-semibold leading-[26px] tracking-[-0.18px] no-underline hover:opacity-80 transition-opacity">Who we are</a>
              </div>
            </div>

            {/* Video Thumbnail */}
            <div className={cn("w-[100px] sm:w-[140px] h-[66px] sm:h-[86px] rounded-md overflow-hidden shrink-0 relative bg-[#111]", isPlaying && "playing")}>
              <video
                ref={videoRef}
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                poster="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&q=80"
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover block"
                aria-label="FitZen yoga video"
                suppressHydrationWarning
              />
              <button
                className={cn(
                  "absolute inset-0 flex items-center justify-center gap-3.5 bg-black/20 cursor-pointer transition-all hover:bg-black/40",
                  isPlaying && "opacity-0 pointer-events-none"
                )}
                onClick={toggleVideo}
                aria-label="Play video"
              >
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shrink-0 transition-transform hover:scale-110">
                  <Play className="w-3 h-3 fill-[#0f1b0f] ml-0.5" />
                </div>
              </button>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

### File 2 of 8: /components/templates/mindfulness-landing-page-design-solra/Features 05 Solra.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  label: string;
  description: string;
  image: string;
}

const services: ServiceItem[] = [
  {
    id: 0,
    title: "Functional Fitness",
    label: "Strength",
    description: "Expert guided programs that build strength reduce stress and create lasting balance.",
    image: "https://cdn.jiro.build/Solra/All%20Images/Services%202%20img.png"
  },
  {
    id: 1,
    title: "Yoga Therapy",
    label: "Flow",
    description: "Connect mind and body through specialized flow sequences designed for flexibility and inner peace.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Mindfulness Training",
    label: "Calm",
    description: "Master the art of presence with guided meditation and cognitive techniques for mental clarity.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "Personal Coaching",
    label: "Elite",
    description: "One-on-one sessions tailored to your specific health goals with data-driven progress tracking.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    title: "Community Classes",
    label: "Connect",
    description: "Join a supportive group environment that fosters motivation and collective wellness growth.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000"
  }
];

function TestimonialCard() {
  return (
    <div className="flex flex-col sm:flex-row p-5 items-center justify-between gap-4 w-full rounded-[13px] bg-[#EDFAEA]">
      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
          alt="William Johnson"
          className="w-12 h-12 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <span className="text-[#093701] font-inter text-base font-semibold leading-6">William Johnson</span>
          <span className="text-[#0B0D13] opacity-80 font-inter text-sm font-normal leading-[22px]">64 years old</span>
        </div>
      </div>
      <p className="text-[#093701] font-inter text-base italic font-medium leading-6 max-w-[274px] text-center sm:text-left">
        &quot;They truly understand my goals and push me beyond limits.&quot;
      </p>
    </div>
  );
}

interface ServiceCardProps {
  service: ServiceItem;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ServiceCard({ service, isActive, onClick, onMouseEnter, onMouseLeave }: ServiceCardProps) {
  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={false}
      animate={{
        backgroundColor: isActive ? "#093701" : "#FEFFFF",
        color: isActive ? "#FEFFFF" : "#093701"
      }}
      transition={{ duration: 0.4, ease: "easeInOut" as const }}
      className={"group cursor-pointer flex flex-col w-full p-[12px_16px] lg:p-5 rounded-[12px] lg:rounded-[20px] border transition-all duration-300 " + (isActive ? "border-transparent" : "border-[#EDFAEA] lg:border-[#e5e4e4] hover:border-[#85FB6C]/30")}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-[6px] flex-1 pr-4">
          <div className="flex items-center gap-2">
            <h4 className={"font-crimson text-[24px] lg:text-[30px] font-semibold leading-[32px] lg:leading-[36px] tracking-[-0.2px] whitespace-nowrap " + (isActive ? "text-white" : "text-[#093701]")}>
              {service.title}
            </h4>
            <span className={"font-inter text-[12px] font-medium leading-[18px] " + (isActive ? "text-[#85FB6C]" : "text-[#093701] opacity-60")}>
              ({service.label})
            </span>
          </div>
        </div>

        <motion.div
          animate={{
            backgroundColor: isActive ? "#85FB6C" : "#FEFFFF",
            borderColor: isActive ? "#85FB6C" : "#E2F9DF",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" as const }}
          className={"flex-shrink-0 w-[32px] h-[32px] lg:w-[58px] lg:h-[58px] rounded-full border-[0.552px] lg:border flex items-center justify-center transition-all duration-300 group-hover:shadow-md text-[#093701]"}
        >
          {isActive ? (
            <ArrowUpRight className="w-4 h-4 lg:w-6 lg:h-6" />
          ) : (
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring" as const, stiffness: 400 }}
            >
              <ArrowRight className="w-4 h-4 lg:w-6 lg:h-6" />
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key={"expanded-" + service.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-inter text-[14px] lg:text-[18px] font-normal leading-[22px] lg:leading-[26px] tracking-[-0.18px] text-[#EDFAEA] opacity-80 mt-2 mb-4 lg:max-w-none">
              {service.description}
            </p>
            <div className="md:hidden w-full aspect-[16/11] rounded-[24px] overflow-hidden mb-1 shadow-sm">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Features05Solra({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

      <section className={"w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#fdfdfd] " + (className || "")}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="inline-block text-[#0B0D13] opacity-80 font-inter text-base font-medium leading-6 mb-2 uppercase tracking-wide">
              &bull; OUR SERVICES
            </span>
            <h2 className="text-[#093701] font-crimson text-[40px] sm:text-[52px] font-semibold leading-[48px] sm:leading-[56px] tracking-[-0.8px]">
              Complete Wellness Programs
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
            <div className="w-full md:w-1/2 flex flex-col gap-6 order-2 md:order-1">
              <div className="hidden md:block relative w-full aspect-[560/500] lg:h-[600px] rounded-[30px] overflow-hidden shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={services[currentIndex].image}
                    alt={services[currentIndex].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeInOut" as const }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>
              <TestimonialCard />
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-3 order-1 md:order-2">
              {services.map((service: ServiceItem, index: number) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isActive={currentIndex === index}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

### File 3 of 8: /components/templates/mindfulness-landing-page-design-solra/Why us 05 Solra.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { HandHeart, Leaf, Brain, Users } from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleSecondary: string;
  image: string;
}

interface TabContent {
  id: string;
  label: string;
  features: Feature[];
}

const tabs: TabContent[] = [
  {
    id: "expert",
    label: "Expert Guidance",
    features: [
      {
        id: "expert-1",
        icon: <HandHeart className="w-6 h-6 text-white" />,
        title: "Our vision was to create a complete wellness system ",
        titleSecondary: "that blends fitness yoga and mindfulness into one powerful journey.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Feature%2004%20img%203.png"
      },
      {
        id: "expert-2",
        icon: <HandHeart className="w-6 h-6 text-white" />,
        title: "Personalized coaching tailored to your unique goals ",
        titleSecondary: "ensuring every movement brings you closer to your peak potential.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Feature%2004%20img%202.png"
      },
      {
        id: "expert-3",
        icon: <HandHeart className="w-6 h-6 text-white" />,
        title: "Expert instructors with years of clinical experience ",
        titleSecondary: "guiding you through safe and effective practices for all levels.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Services%202%20img.png"
      },
      {
        id: "expert-4",
        icon: <HandHeart className="w-6 h-6 text-white" />,
        title: "Holistic approach that considers your mental state ",
        titleSecondary: "as much as your physical strength for a truly balanced life.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Testimonial%20img%201%20solra.png"
      }
    ]
  },
  {
    id: "growth",
    label: "Sustainable Growth",
    features: [
      {
        id: "growth-1",
        icon: <Leaf className="w-6 h-6 text-white" />,
        title: "We focus on long-term results through habits ",
        titleSecondary: "that integrate seamlessly into your daily lifestyle for lasting change.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Services%202%20img.png"
      },
      {
        id: "growth-2",
        icon: <Leaf className="w-6 h-6 text-white" />,
        title: "Progressive training modules that evolve with you ",
        titleSecondary: "preventing plateaus and keeping your motivation at its peak.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Feature%2004%20img%203.png"
      },
      {
        id: "growth-3",
        icon: <Leaf className="w-6 h-6 text-white" />,
        title: "Nutritional guidance that supports your energy ",
        titleSecondary: "without restrictive diets, focusing on whole-body nourishment.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Feature%2004%20img%202.png"
      },
      {
        id: "growth-4",
        icon: <Leaf className="w-6 h-6 text-white" />,
        title: "Recovery protocols designed to heal and strengthen ",
        titleSecondary: "ensuring you can perform consistently week after week.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Testimonial%20img%201%20solra.png"
      }
    ]
  },
  {
    id: "structure",
    label: "Smart Structure",
    features: [
      {
        id: "structure-1",
        icon: <Brain className="w-6 h-6 text-white" />,
        title: "Every session is scientifically designed to optimize ",
        titleSecondary: "your physical performance while maintaining mental clarity and focus.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Feature%2004%20img%202.png"
      },
      {
        id: "structure-2",
        icon: <Brain className="w-6 h-6 text-white" />,
        title: "Data-driven insights to track your performance ",
        titleSecondary: "giving you a clear picture of your journey and areas for improvement.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Services%202%20img.png"
      },
      {
        id: "structure-3",
        icon: <Brain className="w-6 h-6 text-white" />,
        title: "Efficient 45-minute workouts for busy schedules ",
        titleSecondary: "maximizing every minute to deliver high-impact results in less time.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Feature%2004%20img%203.png"
      },
      {
        id: "structure-4",
        icon: <Brain className="w-6 h-6 text-white" />,
        title: "Adaptive programming that adjusts to your energy ",
        titleSecondary: "ensuring you train hard when ready and recover when needed.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Testimonial%20img%201%20solra.png"
      }
    ]
  },
  {
    id: "accountability",
    label: "Real Accountability",
    features: [
      {
        id: "accountability-1",
        icon: <Users className="w-6 h-6 text-white" />,
        title: "You are never alone in this journey with our ",
        titleSecondary: "dedicated community and expert coaches supporting every step you take.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Testimonial%20img%201%20solra.png"
      },
      {
        id: "accountability-2",
        icon: <Users className="w-6 h-6 text-white" />,
        title: "Weekly check-ins to keep you on the right path ",
        titleSecondary: "addressing challenges early and celebrating every win together.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Feature%2004%20img%202.png"
      },
      {
        id: "accountability-3",
        icon: <Users className="w-6 h-6 text-white" />,
        title: "Interactive group challenges to boost engagement ",
        titleSecondary: "fostering a sense of belonging and healthy competition.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Services%202%20img.png"
      },
      {
        id: "accountability-4",
        icon: <Users className="w-6 h-6 text-white" />,
        title: "24/7 support access through our member portal ",
        titleSecondary: "getting your questions answered whenever they arise.",
        image: "https://cdn.jiro.build/Solra/All%20Images/Feature%2004%20img%203.png"
      }
    ]
  }
];

export default function WhyUs05Solra({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setActiveFeature(0);
  };

  const currentTab = tabs[activeTab];
  const currentFeature = currentTab.features[activeFeature];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0.2, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{"\n        .no-scrollbar::-webkit-scrollbar { display: none; }\n        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }\n      "}</style>

      <section className={"flex w-full min-h-screen bg-[#EDFAEA] justify-center overflow-hidden " + (className || "")}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="flex w-full max-w-[1440px] px-6 sm:px-12 lg:px-[135px] py-16 lg:py-[120px] flex-col items-start gap-12 lg:gap-[80px]"
        >
          {/* Header Layout */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full lg:h-[124px] self-stretch">
            <motion.h2
              variants={itemVariants}
              className="text-[#093701] text-[36px] sm:text-[42px] lg:text-[48px] font-bold leading-[120%] tracking-[-0.3px] max-w-[400px]"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Why Choose to<br />Train With Us?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-[#093701] opacity-80 text-[18px] font-normal leading-[26px] tracking-[-0.18px] lg:w-[472px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We combine fitness yoga and mindset training to create sustainable results that go beyond temporary.
            </motion.p>
          </div>

          {/* Content Card Container */}
          <motion.div
            variants={itemVariants}
            className="flex w-full max-w-[1170px] p-6 sm:p-8 lg:p-[48px] flex-col items-center gap-0 rounded-[32px] lg:rounded-[40px] bg-white mx-auto shadow-sm"
          >
            {/* Top Pills Navigation */}
            <div className="flex w-full overflow-x-auto no-scrollbar pb-2 lg:pb-0 mb-8 lg:mb-[48px]">
              <div className="flex p-2 lg:p-[16px_10px] justify-start lg:justify-center items-center gap-4 lg:gap-[16px] self-stretch rounded-full bg-[#EDFAEA] min-w-max mx-auto lg:w-[1074px]">
                {tabs.map((tab: TabContent, idx: number) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(idx)}
                    onMouseEnter={() => handleTabChange(idx)}
                    className={
                      "flex px-4 py-3 lg:px-6 lg:py-4 justify-center items-center gap-[10px] rounded-full transition-all duration-300 " +
                      (activeTab === idx
                        ? "bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.05)]"
                        : "hover:bg-white/50")
                    }
                  >
                    <div
                      className={
                        "w-2 h-2 rounded-full transition-colors duration-300 " +
                        (activeTab === idx ? "bg-[#093701]" : "bg-[#093701]/30")
                      }
                    />
                    <span
                      className="text-[#093701] text-[16px] lg:text-[20px] font-semibold leading-[28px] whitespace-nowrap"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Card with Swipe Support */}
            <motion.div
              className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-[24px_24px_24px_48px] items-center gap-8 lg:gap-[48px] self-stretch bg-[#EDFAEA] rounded-[30px] cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
                const threshold = 50;
                if (info.offset.x < -threshold) {
                  setActiveFeature((prev: number) => (prev + 1) % currentTab.features.length);
                } else if (info.offset.x > threshold) {
                  setActiveFeature((prev: number) => (prev - 1 + currentTab.features.length) % currentTab.features.length);
                }
              }}
            >
              {/* Left Content */}
              <div className="flex flex-col items-start gap-6 flex-1 pointer-events-none select-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature.id}
                    initial={{ opacity: 1, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut" as const
                    }}
                    className="flex flex-col items-start gap-6"
                  >
                    {/* Icon */}
                    <div className="flex w-14 h-14 p-3 items-center justify-center rounded-full bg-[#093701]">
                      {currentFeature.icon}
                    </div>

                    {/* Vision Text */}
                    <h3
                      className="text-[#093701] text-[28px] sm:text-[32px] lg:text-[38px] font-semibold leading-[1.2] lg:leading-[48px] tracking-[-0.076px]"
                      style={{ fontFamily: "'Crimson Text', serif" }}
                    >
                      {(currentFeature.title + currentFeature.titleSecondary).split("").map((char: string, i: number) => (
                        <motion.span
                          key={currentFeature.id + "-char-" + i}
                          initial={{ opacity: 0.2 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.012,
                            ease: "easeOut" as const
                          }}
                          className="inline"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-[452px] h-[300px] sm:h-[400px] lg:h-[444px] relative overflow-hidden rounded-[30px] pointer-events-none select-none">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentFeature.id + "-img"}
                    src={currentFeature.image}
                    alt={currentTab.label}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {/* Breathing Motion Overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 8,
                    ease: "easeInOut" as const,
                    repeat: Infinity as number
                  }}
                />
              </div>
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-[8px] mt-6 lg:mt-[24px]">
              {currentTab.features.map((_: Feature, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  onMouseEnter={() => setActiveFeature(idx)}
                  className={
                    "w-[10px] h-[10px] rounded-full transition-all duration-300 border border-[#093701] " +
                    (activeFeature === idx
                      ? "bg-[#093701]"
                      : "bg-transparent opacity-30")
                  }
                  aria-label={"Go to feature " + (idx + 1)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

### File 4 of 8: /components/templates/mindfulness-landing-page-design-solra/Testimonials 05 Solra.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  percentage: number;
  startPercentage: number;
  image: string;
  videoUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Stefan Person",
    role: "Entrepreneur",
    quote: "\u201cThe structured coaching and mindful sessions helped me stay consistent even with my busy work schedule. I have more energy less stress and better focus every day and mindfulness completely. The structured coaching and mindful sessions helped me stay consistent even with my busy work schedule. I have more energy less stress and better focus every day and mindfulness completely.\u201d",
    percentage: 99,
    startPercentage: 10,
    image: "https://cdn.jiro.build/Solra/All%20Images/Testimonial%20img%201%20solra.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Entrepreneur",
    quote: "\u201cI finally found a program I can stick to. The community support and expert guidance made all the difference. My productivity has soared and I feel more balanced than ever before. The mindfulness sessions are a game changer. I finally found a program I can stick to. The community support and expert guidance made all the difference.\u201d",
    percentage: 96,
    startPercentage: 8,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80",
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  },
  {
    id: 3,
    name: "James Nolan",
    role: "Project Manager",
    quote: "\u201cThe mindfulness sessions are a game changer. As someone who spends all day in front of a screen, the physical and mental relief I've found here is priceless. The plans are smart and easy. I feel stronger and more focused. The mindfulness sessions are a game changer. As someone who spends all day in front of a screen.\u201d",
    percentage: 97,
    startPercentage: 9,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Graphic Designer",
    quote: "\u201cA complete shift in my daily energy levels. The plans are smart, easy to follow, and incredibly effective for long-term health. I feel stronger and more focused than I ever have. The community support is amazing. A complete shift in my daily energy levels. The plans are smart, easy to follow.\u201d",
    percentage: 99,
    startPercentage: 10,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80",
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  }
];

function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest: number) => Math.round(latest));
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: duration,
      ease: "easeInOut" as const,
    });
    return controls.stop;
  }, [from, to, duration, count]);

  return <motion.span ref={nodeRef}>{rounded}</motion.span>;
}

export default function Testimonials05Solra({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const autoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = testimonials[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showVideo]);

  const handleUserClick = (index: number) => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section
        className={cn("w-full bg-white py-20 md:py-[120px] px-6 lg:px-[135px] flex flex-col items-start gap-16 md:gap-[64px] max-w-[1440px] mx-auto", className)}
        aria-label="Success Stories"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 w-full max-w-[1170px] mx-auto"
        >
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-[#093600] font-serif text-3xl md:text-[52px] font-semibold leading-tight tracking-tight">
              Success Stories That Inspire
            </h2>
            <p className="text-[#093600]/70 font-sans text-base md:text-lg leading-relaxed whitespace-nowrap">
              Authentic experiences from people who committed to growth and achieved real results.
            </p>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] bg-[#EDFBEB] rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="relative w-10 h-10">
                <Image
                  src="https://cdn.jiro.build/Solra/Svg%20icon/Only%20logo.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#093600] font-sans text-xl font-bold">4.9/5</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_: unknown, i: number) => (
                    <Star key={i} className="w-4 h-4 fill-[#F37D27] text-[#F37D27]" />
                  ))}
                </div>
              </div>
              <p className="text-[#093600]/60 font-sans text-sm">Based on 37k+ reviews</p>
            </div>
          </div>
        </motion.div>

        <div className="w-full flex flex-col items-center gap-10 max-w-[1170px] mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
            className="w-full p-8 md:p-[48px] rounded-[30px] bg-[#EDFBEB] flex flex-col md:flex-row justify-between items-stretch gap-12 md:gap-16 relative overflow-hidden min-h-[300px]"
          >
            {/* Left Content (Quote) */}
            <div className="flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" as const }}
                  className="text-[#093600] font-serif text-[24px] md:text-[30px] font-semibold leading-[32px] md:leading-[36px] tracking-[-0.2px] line-clamp-6"
                >
                  {current.quote}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Right Content (Progress & Play) */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-8 md:gap-12 flex-shrink-0">
              {/* Vertical Progress Line (Desktop) */}
              <div className="hidden md:block w-[1px] h-[160px] bg-[#093600]/15 relative">
                <motion.div
                  key={currentIndex}
                  initial={{ height: String(current.startPercentage) + "%" }}
                  animate={{ height: String(current.percentage) + "%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" as const }}
                  className="absolute top-0 left-0 w-full bg-[#093600]"
                />
              </div>

              {/* Mobile Progress Line (Horizontal) */}
              <div className="md:hidden w-full h-[1px] bg-[#093600]/15 relative">
                <motion.div
                  key={currentIndex}
                  initial={{ width: String(current.startPercentage) + "%" }}
                  animate={{ width: String(current.percentage) + "%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" as const }}
                  className="absolute top-0 left-0 h-full bg-[#093600]"
                />
              </div>

              {/* Play Button and Percentage Layout */}
              <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-6 md:gap-[96px] w-full md:w-[160px]">
                {/* Percentage + Label */}
                <div className="flex flex-col items-start gap-1 order-1 md:order-2">
                  <div className="text-[#CE6101] font-serif text-[48px] md:text-[68px] font-semibold leading-tight md:leading-[72px] tracking-[-1.6px] flex items-baseline">
                    <Counter
                      key={currentIndex}
                      from={current.startPercentage}
                      to={current.percentage}
                      duration={2.5}
                    />
                    <span>%</span>
                  </div>
                  <p className="text-[#093600]/70 font-sans text-sm md:text-base whitespace-nowrap">Visible Results</p>
                </div>

                {/* Play Button Icon */}
                <div className="flex md:w-full md:justify-end order-2 md:order-1">
                  <button
                    onClick={() => setShowVideo(true)}
                    className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-[#093600] flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <div className="w-0 h-0 border-t-[7px] md:border-t-[6px] border-t-transparent border-l-[11px] md:border-l-[10px] border-l-white border-b-[7px] md:border-b-[6px] border-b-transparent ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom User Selector */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
            className="flex items-center justify-center gap-6 overflow-x-auto pb-4 md:pb-0 w-full"
          >
            {testimonials.map((user: Testimonial, index: number) => {
              const isActive = currentIndex === index;
              return (
                <button
                  key={user.id}
                  onClick={() => handleUserClick(index)}
                  aria-label={"View testimonial from " + user.name}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center justify-between gap-8 p-3 md:p-[12px_16px] rounded-xl border transition-all duration-300 flex-shrink-0 cursor-pointer min-w-[240px]",
                    isActive
                      ? "border-[#85FA6C] bg-[#EDFBEB] shadow-sm"
                      : "border-[#E5E7EA] bg-white hover:border-[#85FA6C]/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#093600]/10">
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#093600] font-sans text-sm font-bold leading-tight">
                        {user.name}
                      </span>
                      <span className="text-[#093600]/50 font-sans text-xs">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Quote Icon */}
                  <div className="text-[#093600]/10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21C14.017 16.5817 17.5987 13 22.017 13V15C19.8079 15 18.017 16.7909 18.017 19V21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM3 21C3 16.5817 6.58172 13 11 13V15C8.79086 15 7 16.7909 7 19V21H3Z" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              key="video-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                key="video-modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Close video"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <video
                  src={current.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  aria-label={"Success story video from " + current.name}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

### File 5 of 8: /components/templates/mindfulness-landing-page-design-solra/Team 01 Solra.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const trainers = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Strength Coach",
    image: "https://cdn.jiro.build/Solra/All%20Images/wellnes%20man%201.png",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Wellness Coach",
    image: "https://cdn.jiro.build/Solra/All%20Images/wellnes%20man%202.png",
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Fitness Enthusiast",
    image: "https://cdn.jiro.build/Solra/All%20Images/wellnes%20man%203.png",
  },
  {
    id: 4,
    name: "Stefan Person",
    role: "Entrepreneur",
    image: "https://cdn.jiro.build/Solra/All%20Images/wellnes%20man%204.png",
  },
  {
    id: 5,
    name: "David Chen",
    role: "Yoga Instructor",
    image: "https://cdn.jiro.build/Solra/All%20Images/wellnes%20man%205.png",
  },
  {
    id: 6,
    name: "Damon Salvatore",
    role: "Strength Coach",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
  },
  {
    id: 7,
    name: "Marcus Bennett",
    role: "Mindfulness Expert",
    image: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=800&q=80",
  },
  {
    id: 8,
    name: "Chris Evans",
    role: "Performance Coach",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    id: 9,
    name: "Liam Neeson",
    role: "Endurance Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
  },
  {
    id: 10,
    name: "Tom Hardy",
    role: "Boxing Trainer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
  },
  {
    id: 11,
    name: "Henry Cavill",
    role: "Bodybuilding Pro",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
  },
  {
    id: 12,
    name: "Jason Momoa",
    role: "Functional Fitness",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
  },
  {
    id: 13,
    name: "Idris Elba",
    role: "Holistic Health",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    id: 14,
    name: "Ryan Reynolds",
    role: "Mobility Expert",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d17a4d?w=800&q=80",
  },
];

export default function Team01Solra({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(3);
  const [startIndex, setStartIndex] = useState(0);

  const trainersPerWindow = 7;
  const visibleTrainers = trainers.slice(startIndex, startIndex + trainersPerWindow);

  const handleNext = () => {
    if (startIndex < trainers.length - trainersPerWindow) {
      setStartIndex((prev) => prev + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    } else {
      setStartIndex(trainers.length - trainersPerWindow);
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section className={"w-full bg-[#EDFAEA] py-[80px] md:py-[120px] px-6 lg:px-[135px] flex flex-col items-center " + (className || "")}>
        {/* Header */}
        <div className="flex flex-col items-center gap-4 self-stretch text-center max-w-[1170px] mx-auto mb-12 md:mb-[80px]">
          <h2 className="text-[#093701] font-serif text-[32px] md:text-[52px] font-semibold leading-[1.1] md:leading-[56px] tracking-[-0.8px] max-w-[800px]">
            Guided by Experience <br /> Driven by Results
          </h2>
          <p className="text-[#093701]/80 font-sans text-[16px] md:text-[18px] font-normal leading-[1.4] md:leading-[26px] tracking-[-0.18px] max-w-[600px]">
            Professional instructors committed to building stronger <br /> bodies and focused minds.
          </p>
        </div>

        {/* Trainers Interactive Row */}
        <div className="w-full max-w-[1170px] mx-auto relative group/section mb-12">
          {/* Navigation Arrows - Hidden on mobile */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[-24px] z-20">
            <button
              type="button"
              onClick={() => handlePrev()}
              className="w-12 h-12 rounded-full border-[1.6px] border-[#F5F5F5] bg-white flex items-center justify-center text-[#093701] shadow-[0_4px_14px_0_rgba(0,0,0,0.10)] transition-all hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.15)] cursor-pointer"
              aria-label="Previous trainer"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[-24px] z-20">
            <button
              type="button"
              onClick={() => handleNext()}
              className="w-12 h-12 rounded-full bg-[#093701] flex items-center justify-center text-white shadow-lg transition-all hover:shadow-xl cursor-pointer"
              aria-label="Next trainer"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center gap-5 h-[340px] w-full overflow-hidden">
            {visibleTrainers.map((trainer, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={trainer.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as const }}
                  className="h-full"
                  style={{
                    flex: isActive ? "3.35 1 0%" : "1 1 0%",
                    minWidth: "80px",
                  }}
                >
                  <Link
                    href="/trainer-details"
                    className="relative block w-full h-full overflow-hidden rounded-[20px] cursor-pointer group"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        className={"object-cover transition-all duration-700 " + (isActive ? "grayscale-0 scale-105" : "grayscale opacity-80 scale-100 group-hover:grayscale-0")}
                        referrerPolicy="no-referrer"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={"absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 " + (isActive ? "opacity-100" : "opacity-0")}
                      />

                      {/* Content */}
                      <div
                        className={"absolute bottom-0 left-0 w-full p-6 flex flex-col items-center text-center transition-all duration-700 " + (isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}
                      >
                        <h3 className="text-white font-sans text-[20px] font-semibold leading-[28px] whitespace-nowrap">
                          {trainer.name}
                        </h3>
                        <p className="text-white/70 font-sans text-[16px] font-normal leading-[24px] tracking-[-0.4px] whitespace-nowrap">
                          {trainer.role}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile/Tablet View */}
          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
            {trainers.map((trainer) => (
              <Link
                key={trainer.id}
                href="/trainer-details"
                className="flex-shrink-0 w-[280px] h-[360px] relative rounded-[20px] overflow-hidden snap-center"
              >
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center text-center">
                  <h3 className="text-white font-sans text-[20px] font-semibold leading-[28px]">
                    {trainer.name}
                  </h3>
                  <p className="text-white/70 font-sans text-[16px] font-normal leading-[24px] tracking-[-0.4px]">
                    {trainer.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="w-full max-w-[1170px] bg-white rounded-[20px] p-8 md:p-[32px_48px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-[130px] shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h4 className="text-[#093701] font-serif text-[24px] md:text-[30px] font-semibold leading-[1.2] tracking-[-0.2px]">
              Want to become a coach with us?
            </h4>
            <p className="text-[#093701]/80 font-sans text-[14px] md:text-[16px] font-normal leading-[1.5] tracking-[-0.4px]">
              Share your profile training background and expertise to get started.
            </p>
          </div>
          <Link href="/contact">
            <button
              type="button"
              className="flex items-center justify-center gap-3 bg-[#093701] text-white px-7 py-4 rounded-full font-sans font-semibold text-[16px] transition-all duration-500 group whitespace-nowrap hover:bg-[#84FB6D] hover:text-[#0B0C12] text-center shadow-[0px_4px_12px_rgba(10,13,18,0.08)] hover:shadow-[0px_12px_32px_rgba(10,13,18,0.15)]"
            >
              Apply Now
              <div className="relative w-5 h-5 flex items-center justify-center">
                <ArrowRight
                  size={20}
                  className="absolute transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-2 group-hover:scale-75"
                />
                <ArrowUpRight
                  size={20}
                  className="absolute opacity-0 -translate-x-2 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:text-[#0B0C12]"
                />
              </div>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

### File 6 of 8: /components/templates/mindfulness-landing-page-design-solra/Pricing 02 Solra.tsx

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { CheckCircle2, XCircle, MessageSquare, ShieldCheck } from 'lucide-react';

interface Plan {
  id: number;
  title: string;
  saving: string;
  total: string;
  subtotal: string;
  features: boolean[];
}

const plans: Plan[] = [
  {
    id: 1,
    title: "Online Transformation",
    saving: "6% Saving",
    total: "$89.00",
    subtotal: "$49.00",
    features: [true, true, true, true, true, false, false],
  },
  {
    id: 2,
    title: "Community Plan",
    saving: "16% Saving",
    total: "$149.00",
    subtotal: "$99.00",
    features: [true, true, true, true, true, false, false],
  },
  {
    id: 3,
    title: "1:1 Personal Coaching",
    saving: "24% Saving",
    total: "$350.00",
    subtotal: "$249.00",
    features: [true, true, true, true, true, true, true],
  },
];

const featureLabels: string[] = [
  "Personalized Workout Plans",
  "Program Duration Options",
  "Live and Recorded Sessions",
  "Community Access",
  "Mindfulness and Breathwork",
  "Priority Support",
  "1 on 1 Coaching Access",
];

function FeatureBoxContent({
  billingCycle,
  setBillingCycle,
  currentPlan,
}: {
  billingCycle: 'monthly' | 'one-time';
  setBillingCycle: (v: 'monthly' | 'one-time') => void;
  currentPlan: Plan;
}) {
  return (
    <>
      <div className="inline-flex p-1 rounded-full bg-[#EDFAEA] self-start">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={"px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-300 " + (billingCycle === 'monthly' ? 'bg-[#093701] text-white' : 'text-[#093701] opacity-60')}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('one-time')}
          className={"px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-300 " + (billingCycle === 'one-time' ? 'bg-[#093701] text-white' : 'text-[#093701] opacity-60')}
        >
          One Time
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="text-[#093701] text-[16px] font-semibold font-sans">Included:</h4>
        <ul className="flex flex-col gap-4">
          {featureLabels.map((label: string, idx: number) => (
            <li key={idx} className="flex items-center justify-between gap-3">
              <span className={"text-[16px] font-normal font-sans " + (currentPlan.features[idx] ? 'text-[#093701]' : 'text-[#093701] opacity-40')}>
                {label}
              </span>
              {currentPlan.features[idx] ? (
                <CheckCircle2 size={20} className="text-[#093701] shrink-0" />
              ) : (
                <XCircle size={20} className="text-[#093701] opacity-40 shrink-0" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Pricing02Solra({ className }: { className?: string }) {
  const [activePlanId, setActivePlanId] = useState<number>(2);
  const [hoveredPlanId, setHoveredPlanId] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'one-time'>('monthly');

  const currentPlan = plans.find((p: Plan) => p.id === (hoveredPlanId ?? activePlanId)) || plans[1];

  const containerVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section
        id="pricing-02-section"
        className={"w-full flex items-center justify-center bg-white py-[120px] px-4 md:px-[135px] overflow-hidden " + (className || "")}
      >
        <motion.div
          id="pricing-02-container"
          className="w-full max-w-[1440px] flex flex-col items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <div id="pricing-02-header" className="flex flex-col items-center gap-4 max-w-[800px] mb-[80px]">
            <motion.h2
              id="pricing-02-heading"
              variants={itemVariants}
              className="text-[#093701] text-[48px] font-bold leading-[120%] text-center font-serif"
              style={{ fontFamily: '"Crimson Pro", serif' }}
            >
              Choose Your Personalized<br />Wellness Path
            </motion.h2>
            <motion.p
              id="pricing-02-subheading"
              variants={itemVariants}
              className="text-[#093701] text-[18px] leading-[28px] opacity-80 text-center font-normal font-sans"
            >
              Online community or personal coaching tailored to your journey.
            </motion.p>
          </div>

          {/* Main Layout */}
          <div id="pricing-02-main" className="flex flex-col lg:flex-row w-full max-w-[1170px] gap-6 items-stretch mb-[48px]">

            {/* LEFT SIDE — Feature Box (Desktop Only) */}
            <motion.div
              id="pricing-02-feature-box-desktop"
              variants={itemVariants}
              className="hidden lg:flex w-[374px] p-6 rounded-[20px] border border-[#E5E7EB] flex-col gap-6 bg-white"
            >
              <FeatureBoxContent
                billingCycle={billingCycle}
                setBillingCycle={setBillingCycle}
                currentPlan={currentPlan}
              />
            </motion.div>

            {/* RIGHT SIDE — Pricing Plans */}
            <motion.div
              id="pricing-02-plans"
              variants={itemVariants}
              className="flex-1 flex flex-col gap-4"
            >
              {plans.map((plan: Plan) => {
                const isActive = (hoveredPlanId ?? activePlanId) === plan.id;

                return (
                  <React.Fragment key={plan.id}>
                    <div
                      id={"pricing-plan-" + plan.id}
                      onClick={() => setActivePlanId(plan.id)}
                      onMouseEnter={() => setHoveredPlanId(plan.id)}
                      onMouseLeave={() => setHoveredPlanId(null)}
                      className={"group flex flex-1 items-center justify-between p-5 md:p-6 rounded-[16px] border transition-all duration-300 cursor-pointer " + (isActive ? 'bg-[#093701] text-white border-transparent scale-[1.01] shadow-[0px_10px_24px_rgba(0,0,0,0.08)]' : 'bg-white text-[#093701] border-[#E5E7EB]')}
                    >
                      <div className="flex items-center gap-4">
                        <div className="shrink-0">
                          {isActive ? (
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#093701]">
                              <CheckCircle2 size={16} strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-[#093701]/20" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3
                            className="text-[20px] font-semibold font-serif"
                            style={{ fontFamily: '"Crimson Pro", serif' }}
                          >
                            {plan.title}
                          </h3>
                          <span className={"inline-block px-2 py-0.5 rounded-full text-[12px] font-medium w-fit " + (isActive ? 'bg-white/20 text-white' : 'bg-[#D0FBDF] text-[#093701]')}>
                            {plan.saving}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 md:gap-12">
                        <div className="hidden md:flex flex-col items-center">
                          <span className="text-[14px] font-normal opacity-60 font-sans mb-1">Total</span>
                          <span
                            className="text-[24px] font-semibold line-through opacity-40 font-serif"
                            style={{ fontFamily: '"Crimson Pro", serif' }}
                          >
                            {plan.total}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[14px] font-normal opacity-60 font-sans mb-1">Sub-Total</span>
                          <span
                            className="text-[32px] font-bold font-serif"
                            style={{ fontFamily: '"Crimson Pro", serif' }}
                          >
                            {plan.subtotal}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Feature Box */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key={"mobile-feature-" + plan.id}
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="lg:hidden overflow-hidden"
                        >
                          <div className="p-6 rounded-[20px] border border-[#E5E7EB] flex flex-col gap-6 bg-white mb-4">
                            <FeatureBoxContent
                              billingCycle={billingCycle}
                              setBillingCycle={setBillingCycle}
                              currentPlan={plan}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Features Row */}
          <motion.div
            id="pricing-02-bottom-features"
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mb-[32px]"
          >
            <div className="flex items-center gap-2 text-[#093701]">
              <XCircle size={20} className="opacity-80" />
              <span className="text-[16px] font-medium font-sans">No Long Term Contracts</span>
            </div>
            <div className="flex items-center gap-2 text-[#093701]">
              <MessageSquare size={20} className="opacity-80" />
              <span className="text-[16px] font-medium font-sans">Expert Support On Demand</span>
            </div>
            <div className="flex items-center gap-2 text-[#093701]">
              <ShieldCheck size={20} className="opacity-80" />
              <span className="text-[16px] font-medium font-sans">Secure and Easy Signup</span>
            </div>
          </motion.div>

          {/* Social Proof Row */}
          <motion.div
            id="pricing-02-social-proof"
            variants={itemVariants}
            className="flex items-center gap-3 bg-[#EDFAEA] px-4 py-2 rounded-full"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i: number) => (
                <img
                  key={i}
                  src={"https://picsum.photos/seed/user" + i + "/40/40"}
                  alt={"User " + i}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className="text-[#093701] text-[14px] font-medium font-sans">
              Join thousands who rely on our coaching programs every day.
            </p>
          </motion.div>

        </motion.div>
      </section>
    </>
  );
}

### File 7 of 8: /components/templates/mindfulness-landing-page-design-solra/FAQs 01 Solra.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowRight } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Is this program beginner friendly?",
    answer: "Yes, our programs are designed to accommodate all fitness levels, from absolute beginners to advanced athletes. We provide modifications for every exercise to ensure you can progress safely and effectively at your own pace."
  },
  {
    id: 2,
    question: "Do I need gym equipment?",
    answer: "No. Many of our workouts use bodyweight training and simple mobility exercises. Optional equipment can enhance results but is not mandatory. We focus on functional movements that you can perform anywhere."
  },
  {
    id: 3,
    question: "Is mindfulness included in all plans?",
    answer: "Absolutely. We believe in a holistic approach to wellness, so mindfulness, meditation, and mental well-being practices are core components of every plan we offer, helping you achieve balance in both mind and body."
  },
  {
    id: 4,
    question: "How long before I see results?",
    answer: "While individual results vary, most members report feeling increased energy, improved mood, and better mental clarity within the first two weeks. Physical transformations typically become noticeable after 4-6 weeks of consistent practice."
  },
  {
    id: 5,
    question: "Can I switch between plans later?",
    answer: "Yes, you can easily upgrade or switch your plan at any time through your account settings. Our goal is to support your evolving wellness journey, so we make it simple to adjust your subscription as your needs change."
  },
  {
    id: 6,
    question: "How much time do I need daily?",
    answer: "We recommend dedicating at least 20-30 minutes daily to see consistent progress. However, we also offer 'Express' 10-minute sessions for those particularly busy days, ensuring you can always find time for your well-being."
  }
];

export default function Faqs01Solra() {
  const [activeId, setActiveId] = useState<number | null>(2);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      />
      <section className="flex flex-col items-center w-full bg-white py-[80px] md:py-[120px] px-6 md:px-[135px] gap-[60px] md:gap-[80px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center w-full md:w-[772px] gap-4">
          <h2 className="font-serif text-[36px] md:text-[52px] md:w-[590px] font-semibold leading-[1.1] md:leading-[56px] tracking-[-0.8px] text-[#093600]">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] md:w-[475px] font-normal leading-[1.4] md:leading-[26px] tracking-[-0.18px] text-[#093600] opacity-80">
            Everything you need to know before starting your mind and body transformation journey.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col w-[350px] md:w-[772px] gap-2 md:gap-4 items-start">
          {faqs.map((faq: FAQItem) => {
            const isActive = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={"group flex flex-col w-full rounded-[8px] md:rounded-[12px] border transition-all duration-300 overflow-hidden self-stretch " + (
                  isActive 
                    ? "bg-[#093600] border-[#093600] shadow-lg" 
                    : "bg-[#EDFBEB] border-[#E9EBEB] hover:border-[#093600]/20"
                )}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className={"flex items-center justify-between w-full p-[10px_8px_10px_10px] md:p-[18px_18px_18px_24px] text-left gap-5 md:gap-4 " + (isActive ? "items-start" : "items-center")}
                >
                  <span className={"font-serif text-[18px] md:text-[24px] font-semibold leading-[26px] md:leading-[32px] tracking-[-0.036px] md:tracking-[-0.2px] transition-colors duration-300 " + (
                    isActive ? "text-white" : "text-[#093600]"
                  )}>
                    {faq.question}
                  </span>
                  <div className={"flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#F4F5F5] transition-all duration-300 flex-shrink-0 " + (
                    isActive ? "bg-[#85FA6C] text-[#093600] rotate-0" : "bg-white text-[#093600]"
                  )}>
                    {isActive ? <X size={14} className="md:w-[18px] md:h-[18px]" /> : <Plus size={14} className="md:w-[18px] md:h-[18px]" />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" as const }}
                    >
                      <div className="p-[10px_8px_10px_12px] md:pl-6 md:pr-[18px] md:pb-6 md:pt-1 flex flex-col gap-2 self-stretch">
                        <p className="font-sans text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-[24px] tracking-normal md:tracking-[-0.4px] text-white opacity-80 md:w-[634px] w-full self-stretch">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="flex flex-col items-center w-[350px] md:w-full md:max-w-[1170px] bg-white md:bg-[#EDFBEB] rounded-[16px] md:rounded-[32px] p-8 md:p-[64px] gap-5 md:gap-8 text-center">
          {/* Avatars */}
          <div className="flex items-center justify-center">
            <div className="flex -space-x-4">
              <div className="relative w-[48px] h-[48px] rounded-full border-[1.2px] border-white md:border-[#EDFBEB] overflow-hidden bg-gray-200 z-10">
                <Image 
                  src="https://picsum.photos/seed/man1/100/100" 
                  alt="Support Team" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative w-[56px] h-[56px] rounded-full border-[1.4px] border-white md:border-[#EDFBEB] overflow-hidden bg-gray-200 z-20 -mt-1">
                <Image 
                  src="https://picsum.photos/seed/man2/100/100" 
                  alt="Support Team" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative w-[48px] h-[48px] rounded-full border-[1.2px] border-white md:border-[#EDFBEB] overflow-hidden bg-gray-200 z-10">
                <Image 
                  src="https://picsum.photos/seed/man3/100/100" 
                  alt="Support Team" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-2 md:gap-3 self-stretch md:max-w-full">
            <h4 className="font-serif text-[24px] md:text-[30px] font-semibold leading-[32px] md:leading-[36px] tracking-[-0.2px] text-[#093600] text-center">
              Still Have Questions?
            </h4>
            <p className="font-sans text-[14px] md:text-[18px] font-normal leading-[22px] md:leading-[26px] tracking-normal md:tracking-[-0.18px] text-[#093600] opacity-80 text-center">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
          </div>

          {/* Button */}
          <Link href="/contact" className="w-full md:w-auto">
            <button className="flex items-center justify-center gap-[12px] w-full md:w-auto px-[22px] py-[12px] bg-[#093600] rounded-full transition-all duration-300 hover:bg-[#85FA6C] shadow-md group">
              <span className="text-[#85FA6C] font-sans text-[16px] font-semibold leading-[24px] transition-colors duration-300 group-hover:text-[#093600]">
                Get in Touch
              </span>
              <ArrowRight size={22} className="text-[#85FA6C] transition-all duration-300 group-hover:text-[#093600] group-hover:-rotate-45" />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

### File 8 of 8: /components/templates/mindfulness-landing-page-design-solra/Footer 01 Solra.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export default function Footer01Solra({ className }: { className?: string }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section className={"relative w-full min-h-[900px] flex flex-col items-center overflow-hidden " + (className || "")}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.jiro.build/Solra/background%20image/Footer%2001%20bg.png"
            alt="Footer Background"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/55" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] w-full px-6 md:px-10 pt-[80px] lg:pt-[200px] pb-6 flex flex-col items-center gap-[96px]">

          {/* Top CTA Content */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="font-serif text-[40px] md:text-[52px] font-semibold leading-[56px] tracking-[-0.8px] text-white mb-4"
            >
              Train With Expert Coaches Today
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-sans text-[18px] font-normal leading-[26px] tracking-[-0.18px] text-white opacity-80 max-w-[620px] mb-8"
            >
              Schedule your coaching session and begin your mind and body transformation journey.
            </motion.p>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0px 12px 30px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#85FA6C] text-[#093701] rounded-full font-sans font-semibold transition-all duration-250"
            >
              Get Started Today
              <div className="relative w-5 h-5 overflow-hidden">
                <ArrowRight className="absolute inset-0 transition-all duration-250 group-hover:opacity-0 group-hover:translate-x-2 group-hover:-translate-y-2" />
                <ArrowUpRight className="absolute inset-0 transition-all duration-250 opacity-0 translate-x-[-8px] translate-y-[8px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
              </div>
            </motion.button>
          </motion.div>

          {/* Glass Footer Container */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-[1360px] w-full px-6 py-10 md:px-[95px] md:pt-[48px] md:pb-0 flex flex-col items-start gap-16 rounded-[20px] border border-white/20 bg-white/14 backdrop-blur-[10px] transform-gpu overflow-hidden"
          >
            {/* Footer Top Row */}
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-12 lg:gap-8">

              {/* Brand Block */}
              <div className="flex flex-col items-start gap-4 max-w-[280px] text-left">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src="https://cdn.jiro.build/Solra/Svg%20icon/Brand%20Only%20logo%20Solra.svg"
                      alt="Solra Logo"
                      fill
                      className="object-contain brightness-0 invert"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-serif text-[38px] font-semibold leading-[48px] tracking-[-0.076px] text-white transition-colors duration-300 group-hover:text-[#85FA6C]">Solra</h3>
                </Link>
                <p className="font-sans text-[16px] leading-[24px] tracking-[-0.4px] text-white opacity-90">
                  A complete mind and body transformation ecosystem designed to deliver measurable results lasting habits.
                </p>
              </div>

              {/* Navigation Columns */}
              <div className="flex flex-wrap justify-start gap-12 md:gap-[80px]">
                {/* Navigate */}
                <div className="flex flex-col items-start gap-6">
                  <h4 className="font-serif text-[20px] font-semibold leading-[28px] tracking-[-0.04px] text-white">Navigate</h4>
                  <ul className="flex flex-col items-start gap-4">
                    {["Services", "About", "Contact", "Reviews"].map((link: string) => (
                      <li key={link}>
                        <span className="font-sans text-[16px] leading-[24px] tracking-[-0.4px] text-white opacity-90 hover:text-[#85FA6C] hover:font-medium transition-all duration-200">
                          {link}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div className="flex flex-col items-start gap-6">
                  <h4 className="font-serif text-[20px] font-semibold leading-[28px] tracking-[-0.04px] text-white">Solution</h4>
                  <ul className="flex flex-col items-start gap-4">
                    {["Latest News", "Career", "Gain Profession", "Blogs"].map((link: string) => (
                      <li key={link}>
                        <span className="font-sans text-[16px] leading-[24px] tracking-[-0.4px] text-white opacity-90 hover:text-[#85FA6C] hover:font-medium transition-all duration-200">
                          {link}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column (Newsletter) */}
              <div className="flex flex-col items-start gap-6 max-w-[400px] w-full text-left">
                <div className="flex flex-col items-start gap-3">
                  <h4 className="font-serif text-[20px] font-semibold leading-[28px] tracking-[-0.04px] text-white">Stay Connected with Nature</h4>
                  <p className="font-sans text-[16px] leading-[24px] tracking-[-0.4px] text-white opacity-90">
                    Join our community of explorers and receive updates on new destinations eco-friendly stays and exclusive travel offers.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white/20 rounded-full p-1.5 w-full max-w-[360px] md:max-w-none">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-transparent border-none outline-none font-sans text-[14px] text-white placeholder:text-white/60 min-w-0"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 bg-[#093701] text-white rounded-full font-sans text-[14px] font-medium transition-all duration-250 shrink-0"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/20" />

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 pb-6">
              <p className="font-sans text-[12px] leading-[18px] tracking-[-0.192px] text-[#EDFBEB] opacity-80 text-left">
                {"\u00A9 Copyright "}
                <a href="https://yscale.studio/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:text-[#85FA6C] transition-all duration-200">Yscale Studio</a>
                {" All rights reserved 2026"}
              </p>

              <div className="flex items-center gap-6">
                {["Privacy & Policy", "Terms & Condition"].map((link: string) => (
                  <span
                    key={link}
                    className="font-sans text-[12px] leading-[18px] tracking-[-0.192px] text-[#EDFBEB] opacity-90 hover:text-[#85FA6C] transition-all duration-200 text-left md:text-right">
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

### Install Dependencies:
npm install  + user.name}
                  aria-pressed={isActive}
                  className={cn(
                     framer-motion lucide-react

### Update /app/page.tsx:

Replace the contents of /app/page.tsx with:

"use client";

import Header01Solra from "@/components/templates/mindfulness-landing-page-design-solra/Header 01 Solra";
import Features05Solra from "@/components/templates/mindfulness-landing-page-design-solra/Features 05 Solra";
import WhyUs05Solra from "@/components/templates/mindfulness-landing-page-design-solra/Why us 05 Solra";
import Testimonials05Solra from "@/components/templates/mindfulness-landing-page-design-solra/Testimonials 05 Solra";
import Team01Solra from "@/components/templates/mindfulness-landing-page-design-solra/Team 01 Solra";
import Pricing02Solra from "@/components/templates/mindfulness-landing-page-design-solra/Pricing 02 Solra";
import Faqs01Solra from "@/components/templates/mindfulness-landing-page-design-solra/FAQs 01 Solra";
import Footer01Solra from "@/components/templates/mindfulness-landing-page-design-solra/Footer 01 Solra";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header01Solra />
      <Features05Solra />
      <WhyUs05Solra />
      <Testimonials05Solra />
      <Team01Solra />
      <Pricing02Solra />
      <Faqs01Solra />
      <Footer01Solra />
    </main>
  );
}

### Rules:
- Copy each file EXACTLY as provided
- Do NOT modify, refactor, or rename anything
- Do NOT change any Tailwind classes
- Do NOT add features or "improvements"
- Just create the 8 files and update page.tsx
