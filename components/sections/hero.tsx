"use client";

import { motion } from 'framer-motion';
import { ArrowDown, Download, Eye, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { ResumeModal } from '@/components/modals/resume-modal';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
const Particles = dynamic(() => import("@/components/ui/particles").then(m => m.Particles), { ssr: false });
import * as THREE from 'three';
import Image from 'next/image';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/use-device';
import { TextAnimate } from "@/components/magicui/text-animate";
import ClientOnly from "@/components/ClientOnly";

// Simple typewriter effect for roles
const roles = [
  'Full Stack Web Developer',
  'MERN Stack Specialist',
  'Future Tech Innovator',
  'Clean Code Advocate',
  'Open Source Contributor',
];

function AnimatedRoles() {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <TextAnimate
      key={roles[index]}
      animation="slideLeft"
      by="character"
      as="span" // ✅ Changed to span to avoid block element issues
      className="text-primary font-semibold inline-block"
    >
      {roles[index]}
    </TextAnimate>
  );
}

// --- Aurora Animated Background ---
const AuroraBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
   const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!mountRef.current) return;
    // Observe visibility: only run WebGL when actually on screen
    const observer = new IntersectionObserver((entries) => {
      setInView(entries[0]?.isIntersecting ?? false);
    }, { root: null, threshold: 0.1 });
    observer.observe(mountRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    if (reduced || isMobile || !inView) return;
    const currentMount = mountRef.current;
    
    // Get parent size
    const getSize = () => {
      const rect = currentMount.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    };
    
    let { width, height } = getSize();
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(1.25, window.devicePixelRatio || 1));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    
    currentMount.appendChild(renderer.domElement);
    
    const material = new THREE.ShaderMaterial({
      uniforms: { 
        iTime: { value: 0 }, 
        iResolution: { value: new THREE.Vector2(width, height) } 
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float iTime; 
        uniform vec2 iResolution;
        #define NUM_OCTAVES 3
        float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
        float noise(vec2 p){ 
          vec2 ip=floor(p);
          vec2 u=fract(p);
          u=u*u*(3.0-2.0*u);
          float res=mix(
            mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
            mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),
            u.y
          );
          return res*res; 
        }
        float fbm(vec2 x) { 
          float v=0.0;
          float a=0.3;
          vec2 shift=vec2(100);
          mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));
          for(int i=0;i<NUM_OCTAVES;++i){
            v+=a*noise(x);
            x=rot*x*2.0+shift;
            a*=0.4;
          }
          return v;
        }
        void main() {
          vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);
          vec4 o=vec4(0.);
          float f=2.+fbm(p+vec2(iTime*5.,0.))*.5;
          for(float i=0.;i++<35.;){
            vec2 v=p+cos(i*i+(iTime+p.x*.08)*.025+i*vec2(13.,11.))*3.5;
            float tailNoise=fbm(v+vec2(iTime*.5,i))*.3*(1.-(i/35.));
            vec4 auroraColors=vec4(.1+.3*sin(i*.2+iTime*.4),.3+.5*cos(i*.3+iTime*.5),.7+.3*sin(i*.4+iTime*.3),1.);
            vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.8))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));
            float thinnessFactor=smoothstep(0.,1.,i/35.)*.6;
            o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;
          }
          o=tanh(pow(o/100.,vec4(1.6)));
          gl_FragColor=o*1.5;
        }`
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    let animationFrameId: number;
    const animate = () => { 
      animationFrameId = requestAnimationFrame(animate); 
      material.uniforms.iTime.value += 0.016; 
      renderer.render(scene, camera); 
    };
    
    const handleResize = () => {
      const { width, height } = getSize();
      renderer.setSize(width, height);
      material.uniforms.iResolution.value.set(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => { 
      cancelAnimationFrame(animationFrameId); 
      window.removeEventListener('resize', handleResize); 
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement); 
      }
      renderer.dispose(); 
      material.dispose(); 
      geometry.dispose(); 
    };
  }, [reduced, isMobile, inView]);
  
  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

export function Hero() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme || 'dark';
  const [showScrollButton, setShowScrollButton] = useState(true);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const [heroInView, setHeroInView] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      setHeroInView(entries[0]?.isIntersecting ?? false);
    }, { threshold: 0.1 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const downloadResume = () => {
    const resumeUrl = '/My_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Ayan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      ref={(el) => { sectionRef.current = el; }}
      className={
        `relative min-h-screen flex items-center justify-center overflow-hidden ` +
        (theme === 'dark' ? 'bg-black' : 'bg-white')
      }
    >
      {/* Aurora Animated Background */}
      <AuroraBackground />
      
      {/* Particles Background */}
      {heroInView && !(isMobile || reduced) && (
        <Particles
          className="absolute inset-0 z-0"
          quantity={Math.max(35, 70 / Math.max(1, (window.devicePixelRatio || 1)))}
          ease={80}
          color={theme === 'dark' ? '#ffffff' : '#000000'}
          refresh
        />
      )}
      
      {/* Hero Content */}
      {/* ✅ Changed to flex-col and md:flex-row for responsiveness */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center min-h-[70vh] gap-10 md:gap-16 text-center md:text-left">
        {/* Ellipse Photo Frame on Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-shrink-0 flex justify-center items-center"
        >
          <div
            className={
              `overflow-hidden border-4 shadow-lg flex items-center justify-center ` +
              (theme === 'dark'
                ? 'border-blue-400 bg-black'
                : 'border-blue-700 bg-white')
            }
            style={{ width: 170, height: 220, borderRadius: '50% / 40%' }}
          >
            <Image
              src="/ayan.jpg"
              alt="Ayan's profile"
              width={340}
              height={440}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>
        
        {/* Right Side: Name, Typewriter, Buttons */}
        {/* ✅ Centered items on mobile with items-center and md:items-start */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
             // ✅ Adjusted text size for different screen sizes
            className={`text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight futuristic-font ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            <span className="block">
              {["Hey there,", "I'm"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.7, type: 'spring' }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7, type: 'spring' }}
                className="inline-block bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Ayan
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
             // ✅ Adjusted text size
            className={`text-lg sm:text-2xl mb-8 max-w-2xl ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}
          >
            <ClientOnly>
              <AnimatedRoles />
            </ClientOnly>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
             // ✅ Changed to flex-col on small screens, sm:flex-row on larger
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center md:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={downloadResume}
               // ✅ Ensured full width on mobile with w-full sm:w-auto
              className={`w-full sm:w-auto px-8 py-3 rounded-lg shadow-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 floating-cta ${theme === 'dark' ? 'bg-white text-black hover:bg-blue-200' : 'bg-black text-white hover:bg-blue-800'}`}
            >
              Download Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={goToProjects}
               // ✅ Ensured full width on mobile with w-full sm:w-auto
              className={`w-full sm:w-auto px-8 py-3 rounded-lg shadow-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 floating-cta ${theme === 'dark' ? 'bg-white/10 text-blue-200 hover:bg-white/20' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
            >
              View Projects
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      <ResumeModal 
        isOpen={showResumeModal} 
        onClose={() => setShowResumeModal(false)} 
      />
      
      <style jsx global>{`
        .futuristic-font {
          font-family: 'Orbitron', 'Montserrat', 'Segoe UI', Arial, sans-serif;
          letter-spacing: 0.04em;
        }
        .floating-cta {
          animation: floating 3s ease-in-out infinite;
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}