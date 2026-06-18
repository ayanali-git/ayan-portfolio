"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedMenuButton } from '@/components/ui/animated-menu-button';
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle';
import { ResumeModal } from '@/components/modals/resume-modal';

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

const bottomBarVariants = {
  closed: { opacity: 0, y: 30 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.35, duration: 0.4, ease: "easeOut" },
  },
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowNav(false); // Hide on scroll down
      } else {
        setShowNav(true); // Show on scroll up
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
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
              {navItems.map((item, index) => (
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
                    <span className="text-3xl sm:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}

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