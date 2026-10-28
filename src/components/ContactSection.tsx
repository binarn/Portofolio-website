import React, { useState } from 'react';
import { Copy, Check, Send, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const email = 'binarnajmuddin@gmail.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim() || !formMessage.trim()) return;
    setFormSent(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSent(false);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-between px-8 md:px-16 pt-32 pb-14 bg-[#ff4d00] text-black overflow-hidden select-none"
    >
      {/* Empty spacer for alignment */}
      <div className="w-full h-4" />

      {/* Massive Centered Editorial Typography matching Figma */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[124px] font-black uppercase tracking-tight leading-[0.92] text-black">
            LET’S TURN IDEA
            <br />
            INTO REALITY
          </h2>
        </motion.div>

      </div>

      {/* Bottom Footer Row - Exact Figma Alignment */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-8 border-t border-black/15">
        {/* Bottom Left: Email with Copy Action */}
        <div className="flex items-center gap-2.5">
          <a
            href={`mailto:${email}`}
            className="text-lg sm:text-xl font-normal text-black underline underline-offset-4 decoration-1 hover:decoration-2 transition-all"
          >
            {email}
          </a>
          <button
            onClick={handleCopyEmail}
            title="Copy email address"
            className="p-1.5 rounded-md hover:bg-black/10 text-neutral-900 transition-colors cursor-pointer"
          >
            {copied ? <Check size={16} className="text-emerald-700" /> : <Copy size={16} />}
          </button>
          {copied && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black text-white animate-fade-in">
              Copied!
            </span>
          )}
        </div>

        {/* Bottom Right: Social Channels */}
        <div className="flex items-center gap-8 text-base sm:text-lg font-normal text-black">
          <a
            href="https://www.linkedin.com/in/binar-najmuddin-mahya-038893318/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:opacity-70 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/binarn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:opacity-70 transition-opacity"
          >
            Github
          </a>
          <a
            href="https://www.instagram.com/ranib_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:opacity-70 transition-opacity"
          >
            Instagram
          </a>
        </div>
      </div>

    </section>
  );
};
