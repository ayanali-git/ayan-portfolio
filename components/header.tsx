"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedMenuButton } from '@/components/ui/animated-menu-button';
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle';
import { ResumeModal } from '@/components/modals/resume-modal';
import GlassSurface from '@/components/ui/glass-surface';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const menuOverlayVariants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 40px) 32px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40,
      when: "afterChildren",
    },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 40px) 32px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: 50,
    filter: "blur(10px)",
  },
  open: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Refs for measuring nav link positions for the glass pill
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillRect, setPillRect] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Track which section is in view using IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionIds = navItems.map(item => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [mounted]);

  // Measure the active nav link's position to place the glass pill
  const updatePillPosition = useCallback(() => {
    const activeIndex = navItems.findIndex(item => item.href === `#${activeSection}`);
    const activeRef = navRefs.current[activeIndex];
    const container = navContainerRef.current;

    if (activeRef && container) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeRef.getBoundingClientRect();
      setPillRect({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    }
  }, [activeSection]);

  useEffect(() => {
    updatePillPosition();
  }, [activeSection, updatePillPosition]);

  // Re-measure on resize
  useEffect(() => {
    window.addEventListener('resize', updatePillPosition);
    // Initial measurement after mount paint
    const timer = setTimeout(updatePillPosition, 100);
    return () => {
      window.removeEventListener('resize', updatePillPosition);
      clearTimeout(timer);
    };
  }, [updatePillPosition]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: showNav || isOpen ? 0 : -100 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="#home" className="text-2xl font-bold text-primary relative z-[60]">
                ayan.dev
              </Link>
            </motion.div>

            {/* Desktop Navigation with Glass Active Pill */}
            <div className="hidden md:flex items-center space-x-8">
              <div ref={navContainerRef} className="relative flex items-center space-x-1">
                {/* Glass pill behind the active link */}
                {pillRect.width > 0 && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-0"
                    animate={{
                      left: pillRect.left - 6,
                      width: pillRect.width + 12,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    style={{ height: 36 }}
                  >
                    <GlassSurface
                      width="100%"
                      height={36}
                      borderRadius={18}
                      brightness={45}
                      opacity={0.85}
                      blur={8}
                      displace={4}
                      distortionScale={-120}
                      redOffset={2}
                      greenOffset={8}
                      blueOffset={14}
                      backgroundOpacity={0.08}
                      saturation={1.2}
                      className="!p-0"
                    />
                  </motion.div>
                )}

                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        ref={(el) => { navRefs.current[index] = el; }}
                        href={item.href}
                        className={`relative z-10 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-foreground'
                            : 'text-foreground/60 hover:text-primary'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setShowResumeModal(true)}
                  className="flex items-center gap-2 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View Resume
                </Button>
                <AnimatedThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <AnimatedThemeToggle />
              <AnimatedMenuButton
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-background/98 backdrop-blur-xl md:hidden flex flex-col pt-16"
            variants={menuOverlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    className="border-b border-border/30"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between py-5 sm:py-6"
                    >
                      <span className={`text-3xl sm:text-4xl font-bold transition-colors duration-300 ${
                        isActive
                          ? 'text-primary'
                          : 'text-foreground group-hover:text-primary'
                      }`}>
                        {item.name}
                      </span>
                      <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ${
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground/40 group-hover:text-primary'
                      }`} />
                    </Link>
                  </motion.div>
                );
              })}

              {/* Resume link styled as nav item */}
              <motion.div variants={menuItemVariants}>
                <button
                  onClick={() => {
                    setShowResumeModal(true);
                    setIsOpen(false);
                  }}
                  className="group flex items-center justify-between py-5 sm:py-6 w-full text-left"
                >
                  <span className="text-3xl sm:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    Resume
                  </span>
                  <Eye className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" />
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal 
        isOpen={showResumeModal} 
        onClose={() => setShowResumeModal(false)} 
      />
    </>
  );
}
