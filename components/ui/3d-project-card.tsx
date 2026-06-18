"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { DetailModal } from '@/components/modals/detail-modal';

interface Project {
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

interface ThreeDProjectCardProps {
  projects: Project[];
  featured?: boolean;
}

export default function ThreeDProjectCard({ projects, featured = false }: ThreeDProjectCardProps) {
  const [active, setActive] = useState<Project | null>(null);
  const id = useId();

  return (
    <>
      <DetailModal
        project={active}
        onClose={() => setActive(null)}
        layoutIdPrefix={id}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <CardContainer key={project.id} className="w-full h-full">
            <CardBody className="w-full h-full">
              <motion.div
                layoutId={`card-${project.title}-${id}`}
                onClick={() => setActive(project)}
                className="group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 w-full h-full"
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <motion.div layoutId={`image-${project.title}-${id}`}>
                    <CardItem translateZ="50" className="w-full">
                      <img
                        width={400}
                        height={250}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                    </CardItem>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <CardItem translateZ="30">
                    <motion.h3
                      layoutId={`title-${project.title}-${id}`}
                      className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-3 group-hover:text-primary transition-colors"
                    >
                      {project.title}
                    </motion.h3>
                  </CardItem>
                  
                  <CardItem translateZ="40">
                    <motion.p
                      layoutId={`description-${project.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4 overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {project.description}
                    </motion.p>
                  </CardItem>
                  
                  <CardItem translateZ="50" className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs font-medium">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs font-medium">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </CardItem>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="flex gap-2">
                    <CardItem translateZ="60">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg border border-neutral-200 dark:border-neutral-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        <span className="text-xs font-medium">Code</span>
                      </Button>
                    </CardItem>
                    
                    {project.liveUrl && (
                      <CardItem translateZ="60">
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl!, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          <span className="text-xs font-medium">Live</span>
                        </Button>
                      </CardItem>
                    )}
                  </div>
                </div>
              </motion.div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </>
  );
}
