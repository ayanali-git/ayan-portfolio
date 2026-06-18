"use client";

import React from 'react';
import { Award, Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Timeline } from '@/components/ui/timeline';

const timelineData = [
  {
    title: "2020",
    subtitle: "School",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            JAY AMBE GROUP OF SCHOOL
          </h4>
          <p className="text-sm font-medium text-primary mt-1">
            Higher Secondary Education (Class XI & XII - Science)
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <span>completed 2021-22</span>
            </div>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <span>Grade: A</span>
            </div>
          </div>
        </div>

        <div className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
          <ul className="list-disc pl-5 space-y-2">
            <li>Completed Class XI & XII in the Science stream with a strong focus on analytical and technical subjects.</li>
            <li>Developed robust foundational knowledge in mathematics and physics, laying the groundwork for engineering studies.</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <h5 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-2">Key Subjects:</h5>
          <div className="flex flex-wrap gap-2">
            {["Mathematics", "Physics", "Chemistry"].map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    title: "2022",
    subtitle: "College",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            G H Patel College of Engineering & Technology
          </h4>
          <p className="text-sm font-medium text-primary mt-1">
            Bachelor of Technology (B.Tech) - Information Technology
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <span>Sep 2022 – Jul 2026</span>
            </div>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <span>Grade: B</span>
            </div>
          </div>
        </div>

        <div className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
          <ul className="list-disc pl-5 space-y-2">
            <li>Pursuing a Bachelor of Technology in Information Technology, focusing on software engineering principles and modern web stacks.</li>
            <li>Completed coursework in key computational subjects: Data Structures & Algorithms, Database Management Systems, Computer Networks, and Operating Systems.</li>
            <li>Built various web applications and full-stack projects using React, Node.js, and relational/non-relational databases.</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <h5 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-2">Associated Skills & Coursework:</h5>
          <div className="flex flex-wrap gap-2">
            {["HTML", "HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Data Structures & Algorithms", "Git", "GitHub"].map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    title: "2025",
    subtitle: "Summer Internship",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            TatvaSoft – 15-Day Summer Internship Program
          </h4>
          <div className="flex items-center gap-2 mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            <Calendar className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
            <span>26 May – 13 June 2025</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/ayan-x1/TatvaSoft-15_days-Summer-Internship-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity border border-neutral-200 dark:border-neutral-800 shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Repository
          </a>
        </div>

        <div className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
          <ul className="list-disc pl-5 space-y-2">
            <li>Completed a structured 15-day internship at TatvaSoft, practicing real-world full-stack development.</li>
            <li>Daily assignments included building robust front-end components with <strong>Angular</strong> and implementing business logic, RESTful services and data models in <strong>ASP.NET Core</strong>.</li>
            <li>Developed and tested APIs using Swagger UI, allowing easy exploration, validation, and documentation of endpoints.</li>
            <li>Deployed applications on a cloud hosting platform (e.g., Azure/AWS/Netlify), with live links and CI/CD workflow configured.</li>
            <li>Gained experience in component-based UI design, form handling, HTTP client integration, debugging Angular services, and modular project architecture.</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <h5 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-2">Tech Stack & Tooling:</h5>
          <div className="flex flex-wrap gap-2">
            {["ASP.NET Core", "Angular", "TypeScript", "HTML5", "SCSS", "SQL Server", "Swagger", "Git", "VS Code"].map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    title: "2025",
    subtitle: "Industrial Internship",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            SeaNeB Technologies Pvt. Ltd.
          </h4>
          <p className="text-sm font-medium text-primary mt-1">
            Full Stack Developer Intern
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <span>Dec 2025 – Jun 2026</span>
            </div>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <span>Anand, Gujarat (On-site)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-[0_0_12px_rgba(255,255,255,0.06)]">
            <Award className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Intern of the Month (Feb 2026)
            </span>
          </div>
        </div>

        <div className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
          <ul className="list-disc pl-5 space-y-2">
            <li>Architected and shipped a dual-domain <strong>Next.js 14</strong> multi-role platform (TiffinService) with role-based access across Normal Users, End Users, and TSPs.</li>
            <li>Designed a stateless tri-token authentication system (access, refresh, and CSRF) with SSO and cross-domain cookie strategy, resolving critical authentication production failures.</li>
            <li>Delivered a subscription-aware TSP dashboard with Tiffin & Menu CRUD operations, plan-gated feature access, and skeleton-based conditional loaders.</li>
            <li>Resolved 20+ production bugs across two code repositories related to SSO race conditions, layout accessibility, and regressions.</li>
            <li>Led a codebase-wide refactoring: centralized the icon registry, standardized API error responses, and restructured the monorepo folder architecture.</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <h5 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-2">Tech Stack & Tooling:</h5>
          <div className="flex flex-wrap gap-2">
            {["Next.js 14", "React.js", "Tailwind CSS", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Docker", "Git", "GitHub"].map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

export default function Experience() {
  return (
    <section id="experience" className="bg-neutral-50/30 dark:bg-neutral-950/20 border-y border-neutral-100 dark:border-neutral-900/50">
      <Timeline data={timelineData} />
    </section>
  );
}
