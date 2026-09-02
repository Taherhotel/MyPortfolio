'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // We have 5 sections. To scroll through all 5, we shift left by 80% (4 out of 5)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <main ref={targetRef} className="h-[500vh] relative bg-transparent">
      <div className="designer-grid fixed inset-0 pointer-events-none opacity-30"></div>
      <div className="scanlines"></div>
      
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-[500vw]">
          <section id="home" className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative">
            <HeroSection scrollYProgress={scrollYProgress} />
          </section>
          
          <section id="about" className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative">
            <AboutSection />
          </section>
          
          <section id="projects" className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative">
            <ProjectsSection />
          </section>
          
          <section id="skills" className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative">
            <SkillsSection />
          </section>
          
          <section id="contact" className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative">
            <ContactSection />
          </section>
        </motion.div>
      </div>
    </main>
  );
}
