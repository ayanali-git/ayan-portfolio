"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Smartphone,
  Server,
  Palette,
  GraduationCap,
  Briefcase,
  MapPin,
  Cpu,
  Calendar,
  Rocket,
  GitBranch,
  Trophy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCloud } from "@/components/magicui/icon-cloud";

const skills = [
  {
    category: "Frontend",
    icon: Globe,
    technologies: [
      "React",
      "Next",
      "Angular",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
    ],
  },
  {
    category: "Backend",
    icon: Server,
    technologies: ["Node.js", "ASP.NET Core", "Express", "FastAPI"],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    technologies: ["React Native", "Android", "Expo GO"],
  },
  {
    category: "Database",
    icon: Database,
    technologies: ["PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    category: "Tools",
    icon: Code,
    technologies: [
      "Git",
      "GitHub",
      "Digital Ocean",
      "Vercel",
      "VS Code",
    ],
  },
  {
    category: "Design",
    icon: Palette,
    technologies: ["UI/UX", "Figma", "Photoshop"],
  },
];

const iconCloudSlugs = [
  "typescript",
  "javascript",
  "python",
  "cplusplus",
  "react",
  "nextdotjs",
  "html5",
  "tailwindcss",
  "nodedotjs",
  "express",
  "postgresql",
  "mongodb",
  "redis",
  "prisma",
  "firebase",
  "vercel",
  "digitalocean",
  "nginx",
  "git",
  "github",
  "gitlab",
  "android",
  "flutter",
  "figma",
  "androidstudio",
  "jest",
];

const stats = [
  { number: "6+", label: "Months Industry Experience", icon: Calendar },
  { number: "10+", label: "Projects Shipped", icon: Rocket },
  { number: "20+", label: "Production Bugs Resolved", icon: GitBranch },
  { number: "1", label: "Intern of the Month Award", icon: Trophy },
];

const profileItems = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech in Information Technology",
    sub: "G H Patel College of Engineering & Technology",
  },
  {
    icon: Briefcase,
    label: "Industry Experience",
    value: "Full Stack Developer Intern",
    sub: "SeaNeB Technologies · TatvaSoft",
  },
  {
    icon: Cpu,
    label: "Core Focus",
    value: "MERN Stack & DevOps Engineer",
    sub: "Next.js · Express.js · AWS · Digital Ocean",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Gujarat, India",
    sub: "Available for Remote Opportunities",
  },
];

export default function About() {
  const images = iconCloudSlugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Label ─── */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            About Me
          </motion.h2>
        </div>

        {/* ─── Tagline ─── */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          Full-stack developer who turns complex problems into clean, seamless
          and scalable products — from architecture to deployment.
        </motion.p>

        {/* ═══════════════ STATS ROW ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_4px_24px_rgba(255,255,255,0.03)]">
                <stat.icon className="w-5 h-5 text-neutral-400 dark:text-neutral-500 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold tracking-tight mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══════════════ BIO + PROFILE GRID ═══════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 mb-20 sm:mb-28">
          {/* Left Column: Story */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="h-full p-5 sm:p-8 lg:p-10 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-neutral-800 dark:bg-neutral-200"></div>
                <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                  My Story
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold leading-snug mb-6">
                I build the systems behind seamless digital experiences — from
                <span className="text-neutral-500 dark:text-neutral-400">
                  {" "}
                  first pixel{" "}
                </span>
                to
                <span className="text-neutral-500 dark:text-neutral-400">
                  {" "}
                  production deploy
                </span>
                .
              </h3>

              <div className="space-y-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>
                  Currently a final-year{" "}
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
                    B.Tech student in Information Technology
                  </strong>
                  , I have spent the last two years deep in real-world product
                  development — not just coursework.
                </p>
                <p>
                  My daily stack revolves around{" "}
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
                    React, Next.js, Node.js, Express, and PostgreSQL
                  </strong>
                  . I architect multi-role platforms, design stateless
                  authentication systems, and ship features that real users
                  depend on.
                </p>
                <p>
                  On the DevOps side, I work with{" "}
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
                    Digital Ocean, GitHub Actions CI/CD
                  </strong>
                  , and deploy to{" "}
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
                    AWS & Vercel
                  </strong>{" "}
                  — because code that doesn&apos;t ship doesn&apos;t count.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Quick Profile */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="h-full p-5 sm:p-8 lg:p-10 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-neutral-800 dark:bg-neutral-200"></div>
                <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                  Quick Profile
                </span>
              </div>

              <div className="space-y-7">
                {profileItems.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 items-start"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    <div className="p-2.5 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 border border-neutral-300/50 dark:border-neutral-700/50 text-neutral-700 dark:text-neutral-300 flex-shrink-0">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                        {stat.label}
                      </p>
                      <p className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-100 mt-0.5 truncate">
                        {stat.value}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 truncate">
                        {stat.sub}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════ SKILLS & TECHNOLOGIES ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            The modern stack I use to build, deploy, and scale production-ready
            applications.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto items-stretch">
          {/* Skills cards */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg dark:hover:shadow-[0_4px_24px_rgba(255,255,255,0.03)] transition-all duration-300">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2.5 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 mr-3 border border-neutral-300/50 dark:border-neutral-700/50">
                          <skill.icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                        </div>
                        <h4 className="font-bold text-base sm:text-lg">
                          {skill.category}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs px-2.5 py-1 font-medium bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300/50 dark:border-neutral-700/50 hover:bg-neutral-300/80 dark:hover:bg-neutral-700/80 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* IconCloud — bigger, vertically + horizontally centered in its column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center items-center"
          >
            <div className="w-full max-w-[400px] sm:max-w-[540px] lg:max-w-[640px] aspect-square overflow-hidden">
              <IconCloud images={images} />
            </div>
          </motion.div>
        </div>

        {/* ═══════════════ WHY WORK WITH ME ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Why Work With Me?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Problem Solver",
                desc: "I approach every challenge with analytical thinking and creative solutions that scale.",
                svgPath:
                  "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
              },
              {
                title: "Team Player",
                desc: "Collaborative mindset with excellent communication — I make teams move faster.",
                svgPath:
                  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              },
              {
                title: "Continuous Learner",
                desc: "Always staying ahead — I adopt new technologies and best practices before they become mainstream.",
                svgPath:
                  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                <div className="h-full p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-center hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg dark:hover:shadow-[0_4px_24px_rgba(255,255,255,0.03)] transition-all duration-300">
                  <div className="w-12 h-12 bg-neutral-200/80 dark:bg-neutral-800 border border-neutral-300/50 dark:border-neutral-700/50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <svg
                      className="w-6 h-6 text-neutral-700 dark:text-neutral-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={item.svgPath}
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
