import React from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export interface ProjectData {
  id: string;
  title: string;
  year: string;
  tagline: string;
  type: string;
  thumbnail: string;
  description: string;
  fullOverview: string;
  stack: string[];
  features: string[];
  deliverables: string[];
}

export const projectsData: ProjectData[] = [
  {
    id: 'neuronauts',
    title: 'Neuronauts',
    year: '2026',
    tagline: 'Ubah perilaku belajar menjadi wawasan yang bermakna',
    type: 'Mobile Software & EdTech Platform',
    thumbnail: '/assets/aistudio/Neuronauts_Design_4656f261.png',
    description:
      'Gamified cognitive assessment and personalized learning ecosystem built with React Native for children and educators.',
    fullOverview:
      'Neuronauts is an interactive mobile learning application engineered to analyze learning habits and cognitive tendencies in school-aged children. By transforming psychometric evaluations into space-themed adventure quests, students remain engaged while educators receive structured cognitive profiles classifying learners into Explorer (Penjelajah Pikiran) and Analytical (Fokus Berpikir) archetypes.',
    stack: [
      'React Native',
      'TypeScript',
      'Expo',
      'Tailwind CSS',
      'Node.js / Express',
      'Firebase Auth & Firestore',
    ],
    features: [
      'Adaptive space adventure missions tailored to user pace',
      'Cognitive archetype clustering: Penjelajah Pikiran & Fokus Berpikir',
      'Real-time behavioral telemetry with child-friendly UI animations',
      'Educator & parent reporting dashboard with actionable milestones',
    ],
    deliverables: [
      'iOS & Android Cross-Platform Mobile Application',
      'Educator Analytics Portal',
      'Interactive Design System in Figma',
    ],
  },
  {
    id: 'mizuone',
    title: 'MizuOne Water',
    year: '2026',
    tagline: 'Air Minum Adalah Kebutuhan Bukan Kemewahan',
    type: 'IoT Smart Utility & Enterprise Web Platform',
    thumbnail: '/assets/aistudio/mizuone_thumbnail_40d042b0.png',
    description:
      'Next-generation clean drinking water distribution and automated partner telemetry platform.',
    fullOverview:
      'MizuOne Water operates on the foundational principle that high-grade purified water is an essential human necessity rather than a luxury. The enterprise web dashboard connects water filtration stations, monitoring water purification metrics (TDS, pH, flow rate) in real time while providing franchise partners with inventory management and telemetry dashboards.',
    stack: [
      'React & TypeScript',
      'Tailwind CSS',
      'IoT Sensor Telemetry',
      'PostgreSQL / Cloud SQL',
      'REST API',
    ],
    features: [
      'Live IoT water station monitoring (pH, TDS, temperature, filtration life)',
      'Franchise partnership onboarding portal ("Gabung Jadi Mitra")',
      'Automated consumable replenishment dispatch system',
      'Public consumer station finder with geographic proximity mapping',
    ],
    deliverables: [
      'Responsive Web Application & Operations Console',
      'Partner Mobile Web Portal',
      'Telemetry Alert Engine & Service Dispatch',
    ],
  },
];

interface ProjectsSectionProps {
  onNavigate: (sectionId: string) => void;
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onNavigate,
  onSelectProject,
}) => {
  const textColor = 'text-white';
  const subTextColor = 'text-neutral-400';

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-10 md:px-16 pt-32 pb-16 bg-[#1e1e1e] text-white select-none"
    >
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col justify-center">
        {/* Project Showcase Grid - Exact proportions & layout matching Figma design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start justify-center">
          {/* Left: Neuronauts (Mobile App Thumbnail) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-5 flex flex-col justify-self-center lg:justify-self-end w-full max-w-[340px] sm:max-w-[380px] group cursor-pointer"
            onClick={() => onSelectProject(projectsData[0])}
          >
            {/* Thumbnail Image Container */}
            <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#18181b] border border-white/10 shadow-2xl relative transition-all duration-300 group-hover:border-orange-500/50 group-hover:shadow-orange-500/10">
              <img
                src={projectsData[0].thumbnail}
                alt="Neuronauts Mobile App Thumbnail"
                className="w-full h-full object-cover object-top select-none transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Hover inspect overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-2xl pointer-events-none">
                <span className="px-4 py-2 rounded-full bg-white text-neutral-900 font-semibold text-xs flex items-center gap-2 shadow-xl">
                  Inspect Project Case Study <ExternalLink size={12} />
                </span>
              </div>
            </div>

            {/* Label below card: Title & Year */}
            <div className="flex items-center justify-between mt-3 px-1 text-sm sm:text-base font-normal select-none">
              <span className={`${textColor} group-hover:text-orange-500 transition-colors`}>
                Neuronauts
              </span>
              <span className={`tabular-nums ${subTextColor}`}>2026</span>
            </div>
          </motion.div>

          {/* Right: MizuOne Water (Web Dashboard Thumbnail) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-7 flex flex-col justify-self-center lg:justify-self-start w-full max-w-[580px] group cursor-pointer"
            onClick={() => onSelectProject(projectsData[1])}
          >
            {/* Thumbnail Image Container */}
            <div className="w-full aspect-[16/11] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5e7eb] border border-white/10 shadow-2xl relative transition-all duration-300 group-hover:border-orange-500/50 group-hover:shadow-orange-500/10">
              <img
                src={projectsData[1].thumbnail}
                alt="MizuOne Water Web Thumbnail"
                className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Hover inspect overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-2xl pointer-events-none">
                <span className="px-4 py-2 rounded-full bg-white text-neutral-900 font-semibold text-xs flex items-center gap-2 shadow-xl">
                  Inspect Project Case Study <ExternalLink size={12} />
                </span>
              </div>
            </div>

            {/* Label below card: Title & Year */}
            <div className="flex items-center justify-between mt-3 px-1 text-sm sm:text-base font-normal select-none">
              <span className={`${textColor} group-hover:text-orange-500 transition-colors`}>
                MizuOne Water
              </span>
              <span className={`tabular-nums ${subTextColor}`}>2026</span>
            </div>
          </motion.div>
        </div>

        {/* Center Bottom: More Project To Come & Downward Arrow */}
        <div className="flex flex-col items-center justify-center mt-16 sm:mt-20 select-none">
          <p
            className={`text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight mb-4 ${textColor}`}
          >
            More Project To Come...
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className={`cursor-pointer transition-transform duration-300 hover:translate-y-2 p-2 ${textColor}`}
            aria-label="Scroll to Contact section"
          >
            <ArrowDown size={36} strokeWidth={2.5} className="animate-pulse" />
          </button>
        </div>
      </div>
    </section>
  );
};
