"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ExternalLink, Github, Calendar, Star, GitFork } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string | null;
  featured: boolean;
  stats: {
    stars: number;
    forks: number;
    lastUpdated: string;
  };
  category: string;
  longDescription?: string;
}

interface DetailModalProps {
  project: Project | null;
  onClose: () => void;
  layoutIdPrefix: string;
}

export function DetailModal({ project, onClose, layoutIdPrefix }: DetailModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  useOutsideClick(ref, onClose);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {project ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              layoutId={`card-${project.title}-${layoutIdPrefix}`}
              ref={ref}
              className="relative w-full max-w-4xl h-full md:h-fit md:max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700"
            >
              <motion.button
                key={`button-${project.title}-${layoutIdPrefix}`}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex absolute top-4 right-4 items-center justify-center bg-white dark:bg-neutral-800 rounded-full h-10 w-10 shadow-lg hover:scale-110 transition-transform z-10"
                onClick={onClose}
              >
                <CloseIcon />
              </motion.button>
              <motion.div layoutId={`image-${project.title}-${layoutIdPrefix}`} className="relative">
                <img
                  width={400}
                  height={300}
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-64 md:h-80 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      <motion.h3
                        layoutId={`title-${project.title}-${layoutIdPrefix}`}
                        className="font-bold text-xl md:text-2xl text-neutral-800 dark:text-neutral-100 mb-2"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${project.description}-${layoutIdPrefix}`}
                        className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed"
                      >
                        {project.description}
                      </motion.p>
                    </div>

                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col sm:flex-row gap-2 ml-4"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      </Button>
                      
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          asChild
                          className="flex items-center gap-2"
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs font-medium">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{project.stats.forks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {formatDate(project.stats.lastUpdated)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {project.longDescription || project.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-neutral-600 dark:text-neutral-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
