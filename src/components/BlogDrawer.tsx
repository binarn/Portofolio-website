import React from 'react';
import { X, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlogDrawer: React.FC<BlogDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-lg w-full p-10 rounded-3xl bg-[#141414] border border-white/10 text-white flex flex-col items-center justify-center text-center shadow-2xl select-none"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="w-14 h-14 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6">
            <Hammer size={26} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
            Under Development
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-sm mb-8 leading-relaxed">
            The blog and editorial section is currently under development. Stay tuned for engineering articles and technical insights.
          </p>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Back to Portfolio
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
