"use client";

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Use a single source of truth for the resume URL. Files in `public/` are served from root.
  const resumeUrl = '/My-Resume.pdf';

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useOutsideClick(ref, onClose);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Ayan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  // Many mobile browsers (iOS/Android) block inline PDF rendering. Detect and avoid embedding.
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-3 sm:p-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl h-full sm:h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700"
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex absolute top-3 right-3 sm:top-4 sm:right-4 items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-full h-8 w-8 sm:h-10 sm:w-10 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:scale-110 transition-transform z-10"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-600 dark:text-neutral-300"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Header */}
              <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <h2 className="font-bold text-lg sm:text-2xl text-neutral-800 dark:text-neutral-100 mb-3 sm:mb-4">
                  Resume
                </h2>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadResume}
                    className="flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    onClick={openInNewTab}
                    className="flex items-center gap-1.5 text-xs sm:text-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Open in new tab
                  </Button>
                </div>
              </div>

              {/* PDF Content */}
              <div className="flex-1 overflow-hidden p-3 sm:p-4 min-h-0">
                <div className="w-full h-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                  {isMobile ? (
                    <div className="flex items-center justify-center h-full bg-neutral-100 dark:bg-neutral-800">
                      <div className="text-center px-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                          <Download className="w-7 h-7 text-neutral-500 dark:text-neutral-400" />
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-300 mb-6 text-sm sm:text-base leading-relaxed">
                          Inline PDF viewers are limited on mobile.<br />
                          Open in a new tab or download instead.
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                          <Button onClick={openInNewTab} className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Open in new tab
                          </Button>
                          <Button onClick={downloadResume} variant="outline" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={`${resumeUrl}#view=FitH`}
                      className="w-full h-full"
                      title="Resume PDF"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
