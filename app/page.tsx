import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/hero';
const About = dynamic(() => import('@/components/sections/about'), { ssr: false });
const Experience = dynamic(() => import('@/components/sections/experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/sections/projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/contact'), { ssr: false });
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}