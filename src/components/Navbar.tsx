import React, { useState, useEffect } from 'react';
import { AsteriskLogo } from './AsteriskLogo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBlog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBlog,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // In the design: Hero & Projects are dark; About & Contact are vivid orange
  const isDarkCanvas = activeSection === 'hero' || activeSection === 'projects';

  const textColorClass = isDarkCanvas
    ? 'text-white hover:text-orange-400'
    : 'text-black hover:opacity-70';

  const activeLinkClass = isDarkCanvas
    ? 'text-white font-semibold'
    : 'text-black font-extrabold';

  // Glass background styling with rounded corners
  const glassContainerStyle = isDarkCanvas
    ? 'bg-black/40 border-white/15 text-white shadow-black/40'
    : 'bg-white/25 border-black/15 text-black shadow-orange-950/20';

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3 md:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      {/* Floating Glass Container with shrink-to-center on scroll */}
      <div
        className={`pointer-events-auto backdrop-blur-xl border shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${glassContainerStyle} ${
          isScrolled
            ? 'w-full max-w-lg md:max-w-xl px-5 md:px-8 py-2 md:py-2.5 rounded-full shadow-2xl'
            : 'w-full max-w-6xl px-6 md:px-12 py-3.5 md:py-4 rounded-2xl md:rounded-full'
        } flex items-center justify-between`}
      >
        {/* Left Links */}
        <nav
          className={`flex items-center tracking-normal transition-all duration-300 ${
            isScrolled ? 'gap-5 text-xs sm:text-sm' : 'gap-6 md:gap-8 text-sm md:text-base'
          }`}
        >
          <button
            onClick={() => handleLinkClick('about')}
            className={`transition-colors duration-200 cursor-pointer whitespace-nowrap ${textColorClass} ${
              activeSection === 'about' ? activeLinkClass : 'opacity-85 hover:opacity-100'
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick('projects')}
            className={`transition-colors duration-200 cursor-pointer whitespace-nowrap ${textColorClass} ${
              activeSection === 'projects' ? activeLinkClass : 'opacity-85 hover:opacity-100'
            }`}
          >
            Projects
          </button>
        </nav>

        {/* Center: Brand or Asterisk Logo */}
        <div className="flex items-center justify-center mx-2">
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
            aria-label="Return to top"
          >
            {activeSection === 'hero' ? (
              <span
                className={`font-bold tracking-tight whitespace-nowrap transition-all duration-300 ${
                  isScrolled ? 'text-sm md:text-base' : 'text-base md:text-xl'
                } ${isDarkCanvas ? 'text-white' : 'text-black'}`}
              >
                Binar Najmuddin
              </span>
            ) : (
              <div
                className={`transition-transform duration-300 ${
                  isScrolled ? 'scale-85' : 'scale-100'
                }`}
              >
                <AsteriskLogo
                  color={isDarkCanvas ? 'white' : 'black'}
                  size={isScrolled ? 26 : 32}
                  className="transition-all duration-300"
                />
              </div>
            )}
          </button>
        </div>

        {/* Right Links (theme switcher completely removed) */}
        <div
          className={`flex items-center tracking-normal transition-all duration-300 ${
            isScrolled ? 'gap-5 text-xs sm:text-sm' : 'gap-6 md:gap-8 text-sm md:text-base'
          }`}
        >
          <button
            onClick={onOpenBlog}
            className={`hidden sm:inline-block transition-colors duration-200 cursor-pointer whitespace-nowrap ${textColorClass} opacity-85 hover:opacity-100`}
          >
            Blog
          </button>
          <button
            onClick={() => handleLinkClick('contact')}
            className={`hidden sm:inline-block transition-colors duration-200 cursor-pointer whitespace-nowrap ${textColorClass} ${
              activeSection === 'contact' ? activeLinkClass : 'opacity-85 hover:opacity-100'
            }`}
          >
            Contact
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`sm:hidden p-1 rounded-md ${textColorClass} cursor-pointer`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`sm:hidden fixed top-20 left-4 right-4 pointer-events-auto p-5 rounded-2xl backdrop-blur-2xl border shadow-2xl flex flex-col gap-3 ${
            isDarkCanvas
              ? 'bg-[#181818]/95 border-white/10 text-white'
              : 'bg-[#ff4d00]/95 border-black/15 text-black'
          }`}
        >
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-left text-base font-semibold py-1.5 cursor-pointer"
          >
            Home (Hero)
          </button>
          <button
            onClick={() => handleLinkClick('about')}
            className="text-left text-base font-semibold py-1.5 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick('projects')}
            className="text-left text-base font-semibold py-1.5 cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBlog();
            }}
            className="text-left text-base font-semibold py-1.5 cursor-pointer"
          >
            Blog
          </button>
          <button
            onClick={() => handleLinkClick('contact')}
            className="text-left text-base font-semibold py-1.5 cursor-pointer"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
