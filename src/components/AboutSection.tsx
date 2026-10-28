import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-between px-8 md:px-16 pt-32 pb-16 bg-[#ff4d00] text-black overflow-hidden select-none"
    >
      {/* Main Content Area */}
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col justify-center py-6">
        {/* Name Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[104px] font-bold tracking-tight leading-[0.95] text-black">
            Binar Najmuddin
            <br />
            Mahya
          </h1>
        </motion.div>

        {/* Bio Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-4xl"
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold leading-snug md:leading-tight text-black">
            Aspiring Information Technology professional with practical experience in
            cybersecurity, cloud computing, and full-stack development, enhanced by a
            foundation in visual design and leadership in project management.
          </p>
        </motion.div>
      </div>

      {/* Centered Navigation to Projects */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-center pt-8">
        <button
          onClick={() => onNavigate('projects')}
          className="flex items-center gap-2 text-base md:text-lg font-semibold tracking-wide text-black hover:opacity-75 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span>Explore Projects</span>
          <ArrowDown size={18} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};
