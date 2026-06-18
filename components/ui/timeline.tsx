"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TimelineEntry {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
}

export const Timeline = ({ 
  data, 
  title = "Experience", 
  description = "A timeline of my professional journey, internships, and key achievements." 
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [lineTop, setLineTop] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeHeight, setActiveHeight] = useState(0);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const calculateBoundsAndProgress = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);

        const rows = ref.current.querySelectorAll(".timeline-row");
        if (rows.length > 0) {
          const lastRow = rows[rows.length - 1] as HTMLElement;
          const isMobile = window.innerWidth < 768;
          
          const firstTop = isMobile ? 56 : 180;
          setLineTop(firstTop);

          // Line ends exactly at the last bullet point
          const totalLineHeight = lastRow.offsetTop;
          setLineHeight(totalLineHeight);

          // Calculate current scroll progress based on viewport center threshold
          const anchors = ref.current.querySelectorAll(".timeline-anchor");
          if (anchors.length > 0) {
            const firstAnchorRect = anchors[0].getBoundingClientRect();
            
            const viewportHeight = window.innerHeight;
            const threshold = viewportHeight * 0.5; // Center of viewport
            
            const totalDistance = totalLineHeight;
            const currentProgress = threshold - firstAnchorRect.top;

            if (totalDistance > 0) {
              const ratio = currentProgress / totalDistance;
              const clampedRatio = Math.max(0, Math.min(1, ratio));
              setActiveHeight(clampedRatio * totalLineHeight);
            } else {
              setActiveHeight(0);
            }

            // Determine which items are "reached" by the progress line
            const newActiveIndices = new Set<number>();
            anchors.forEach((anchor, i) => {
              const anchorRect = anchor.getBoundingClientRect();
              // Item glows when its anchor reaches the viewport center
              if (anchorRect.top <= threshold) {
                newActiveIndices.add(i);
              }
            });
            setActiveIndices(newActiveIndices);
          }
        }
      }
    };

    calculateBoundsAndProgress();
    window.addEventListener("scroll", calculateBoundsAndProgress, { passive: true });
    window.addEventListener("resize", calculateBoundsAndProgress);

    // Callbacks to ensure accurate calculation after client-side hydration
    const timer1 = setTimeout(calculateBoundsAndProgress, 100);
    const timer2 = setTimeout(calculateBoundsAndProgress, 500);
    const timer3 = setTimeout(calculateBoundsAndProgress, 1500);

    return () => {
      window.removeEventListener("scroll", calculateBoundsAndProgress);
      window.removeEventListener("resize", calculateBoundsAndProgress);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [ref, data]);

  return (
    <div
      className="w-full bg-transparent font-sans"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-black dark:text-white">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
        {data.map((item, index) => {
          const isActive = activeIndices.has(index);

          return (
            <div
              key={index}
              className="timeline-row flex justify-start pt-10 md:pt-40 md:gap-10 relative"
            >
              {/* Non-sticky anchor for accurate line measurement regardless of scrolling */}
              <div className="timeline-anchor absolute left-2 md:left-3 top-10 md:top-40 h-8 w-8 md:h-10 md:w-10 pointer-events-none opacity-0" />

              <div className="flex flex-col md:flex-row z-40 items-center self-start max-w-xs lg:max-w-sm md:w-full">
                {/* Bullet — lights up when active */}
                <div
                  className={`timeline-bullet h-8 w-8 md:h-10 md:w-10 absolute left-2 md:left-3 rounded-full flex items-center justify-center border transition-all duration-700 ease-out ${
                    isActive
                      ? "bg-black dark:bg-black border-neutral-500 dark:border-neutral-500 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                      : "bg-black dark:bg-black border-neutral-800 dark:border-neutral-800"
                  }`}
                >
                  <div
                    className={`h-3 w-3 md:h-4 md:w-4 rounded-full transition-all duration-700 ease-out ${
                      isActive
                        ? "bg-white dark:bg-white"
                        : "bg-neutral-700 dark:bg-neutral-700"
                    }`}
                  />
                </div>

                {/* Year + subtitle (desktop) */}
                <div className="hidden md:block md:pl-20">
                  <h3
                    className={`text-xl md:text-5xl font-bold transition-all duration-700 ease-out ${
                      isActive
                        ? "text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-300 dark:text-neutral-700"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p
                      className={`text-sm md:text-base font-medium mt-1 transition-all duration-700 ease-out ${
                        isActive
                          ? "text-neutral-500 dark:text-neutral-400"
                          : "text-neutral-300 dark:text-neutral-800"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Content (right side) */}
              <div
                className={`relative pl-12 sm:pl-16 md:pl-4 w-full transition-all duration-700 ease-out ${
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-[0.15] translate-y-4"
                }`}
              >
                {/* Year + subtitle (mobile) */}
                <div className="md:hidden block mb-4">
                  <h3
                    className={`text-2xl text-left font-bold transition-all duration-700 ease-out ${
                      isActive
                        ? "text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-300 dark:text-neutral-700"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p
                      className={`text-xs font-medium mt-0.5 transition-all duration-700 ease-out ${
                        isActive
                          ? "text-neutral-400 dark:text-neutral-600"
                          : "text-neutral-300 dark:text-neutral-800"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>
                {item.content}
              </div>
            </div>
          );
        })}
        <div
          style={{
            top: lineTop + "px",
            height: lineHeight + "px",
          }}
          className="absolute left-[39px] sm:left-[47px] md:left-[55px] lg:left-[63px] overflow-hidden w-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-full"
        >
          <div
            style={{
              height: activeHeight + "px",
              opacity: activeHeight > 2 ? 1 : 0,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-neutral-800 dark:bg-neutral-200 rounded-full transition-[height] duration-200 ease-out"
          />
        </div>
      </div>
    </div>
  );
};
