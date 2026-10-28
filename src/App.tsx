/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection, ProjectData } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { BlogDrawer } from './components/BlogDrawer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  // Set up intersection observer to detect active section for smooth scrolling navigation
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation support for smooth section jumping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const sections = ['hero', 'about', 'projects', 'contact'];
      const currentIndex = sections.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < sections.length - 1) {
          e.preventDefault();
          handleNavigate(sections[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          handleNavigate(sections[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen w-full relative font-sans bg-[#181818] overflow-x-hidden">
      {/* Persistent Rounded Glass Top Navigation that shrinks to center on scroll */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBlog={() => setIsBlogOpen(true)}
      />

      {/* Floating Section Quick-Jump Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
        {[
          { id: 'hero', label: 'Hero' },
          { id: 'about', label: 'About' },
          { id: 'projects', label: 'Projects' },
          { id: 'contact', label: 'Contact' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => handleNavigate(sec.id)}
            title={sec.label}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeSection === sec.id
                ? 'bg-orange-500 scale-125'
                : 'bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Jump to ${sec.label}`}
          />
        ))}
      </div>

      {/* Main Pages Flow: Hero (Dark) -> About (Orange) -> Projects (Dark) -> Contact (Orange) */}
      <main className="w-full flex flex-col">
        {/* 1. Hero Page */}
        <HeroSection onNavigate={handleNavigate} />

        {/* 2. About Page (Orange) */}
        <AboutSection onNavigate={handleNavigate} />

        {/* 3. Projects Page (Dark) */}
        <ProjectsSection
          onNavigate={handleNavigate}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 4. Contact Page (Orange) */}
        <ContactSection onNavigate={handleNavigate} />
      </main>

      {/* Interactive Project Case Study Lightbox */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Blog Page under development */}
      <BlogDrawer
        isOpen={isBlogOpen}
        onClose={() => setIsBlogOpen(false)}
      />
    </div>
  );
}
