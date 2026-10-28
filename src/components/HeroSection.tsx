import React, { useState } from 'react';
import { DotGridCanvas } from './DotGridCanvas';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  // Track scroll position to spin the hero asterisk logo
  const { scrollY } = useScroll();
  const rawRotate = useTransform(scrollY, (y) => y * 0.45);
  const smoothRotate = useSpring(rawRotate, { stiffness: 120, damping: 25 });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between px-8 md:px-16 pt-28 pb-12 overflow-hidden bg-[#1e1e1e] text-white select-none"
    >
      {/* Interactive Dot Grid Background with Cursor Hover Depth */}
      <DotGridCanvas isDarkMode={true} />

      {/* Subtle Ambient Radial Highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 77, 0, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Empty top spacer to balance layout with navbar */}
      <div className="w-full h-8" />

      {/* Massive Center Asterisk Logo with Scroll-Driven Spin Animation */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-8">
        <motion.div
          style={{
            rotate: smoothRotate,
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          className="cursor-pointer select-none will-change-transform"
          onClick={() => onNavigate('about')}
          title="Click to discover About Binar"
        >
          <img
            src="/assets/aistudio/logo_27f2efb4.png"
            alt="Binar Najmuddin Center Logo"
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] object-contain drop-shadow-2xl transition-all duration-300 pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Bottom Row - Strict alignment matching Figma design */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Bottom Left: Role Specialties */}
        <div className="flex flex-col gap-0.5 text-left select-none">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Creative Website
          </h2>
          <p className="text-base sm:text-lg font-normal text-neutral-300">
            Mobile Software
          </p>
          <p className="text-base sm:text-lg font-normal text-neutral-300">
            Data Engineer
          </p>
        </div>

        {/* Bottom Right: Clean Contact Me Button */}
        <div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3 rounded-md bg-[#d8d8d8] hover:bg-white text-[#181818] font-normal text-base md:text-lg transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};
