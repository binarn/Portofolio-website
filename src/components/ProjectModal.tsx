import React, { useEffect } from 'react';
import { ProjectData } from './ProjectsSection';
import { X, CheckCircle, Layers, Cpu, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-4xl w-full my-auto rounded-3xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col bg-[#18181b] border-white/10 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
                Case Study
              </span>
              <span className="text-xs opacity-60 flex items-center gap-1">
                <Calendar size={12} />
                {project.year}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Title & Tagline */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                {project.title}
              </h2>
              <p className="text-lg text-orange-500 font-medium">
                {project.tagline}
              </p>
              <p className="text-sm opacity-75 mt-2 flex items-center gap-1.5">
                <Tag size={14} />
                {project.type}
              </p>
            </div>

            {/* Thumbnail Preview */}
            {project.thumbnail && (
              <div className="w-full max-h-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/40 flex items-center justify-center">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full max-h-[340px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Layers size={18} className="text-orange-500" />
                Project Architecture & Overview
              </h3>
              <p className="text-base leading-relaxed opacity-90">
                {project.fullOverview}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Cpu size={18} className="text-orange-500" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 dark:bg-white/10 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Key Engineering Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <CheckCircle
                      size={16}
                      className="text-orange-500 shrink-0 mt-0.5"
                    />
                    <span className="text-sm opacity-90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20">
              <h4 className="text-sm font-bold text-orange-500 mb-2">
                Deliverables & Production Impact
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm opacity-85">
                {project.deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs opacity-50">
              Binar Najmuddin — Engineering Portfolio
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
