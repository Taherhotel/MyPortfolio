'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import { GLSLHills } from '@/components/ui/glsl-hills';

// True CSS 3D Depth Section
function DepthSection({
  children,
  cameraZ,
  depth
}: {
  children: React.ReactNode,
  cameraZ: MotionValue<number>,
  depth: number
}) {
  const targetCameraZ = -depth;
  const opacity = useTransform(
    cameraZ,
    [targetCameraZ - 1500, targetCameraZ - 500, targetCameraZ + 500, targetCameraZ + 1500],
    [0, 1, 1, 0]
  );

  // For the very first section (Hero at depth 0), it starts visible
  const isFirst = depth === 0;
  const initialOpacity = isFirst ?
    useTransform(cameraZ, [0, 500, 1000], [1, 1, 0]) : opacity;

  const pointerEvents = useTransform(
    cameraZ,
    (z) => (Math.abs(z - targetCameraZ) < 500 ? 'auto' : 'none')
  );

  return (
    <motion.div
      style={{
        transform: `translateZ(${depth}px)`,
        opacity: initialOpacity,
        pointerEvents
      }}
      className="absolute inset-0 flex items-center justify-center w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress on the main window natively (safest)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Non-linear mapping to create the "wait" effect natively without scroll snapping!
  // The camera pauses at each section for 5-10% of the scroll length, allowing the user to read.
  const cameraZ = useTransform(
    scrollYProgress,
    [
      0, 0.05,        // Pause at Hero
      0.2, 0.25,      // Pause at About (-3000)
      0.4, 0.45,      // Pause at Projects (-6000)
      0.6, 0.65,      // Pause at Skills (-9000)
      0.8, 1.0        // Pause at Contact (-12000)
    ],
    [
      0, 0,
      3000, 3000,
      6000, 6000,
      9000, 9000,
      12000, 12000
    ]
  );

  // Fade out hills earlier (start fading at 1000, fully faded by 2000). About is at 3000.
  const hillsOpacity = useTransform(cameraZ, [0, 1000, 2000], [1, 1, 0]);

  return (
    <main 
      ref={targetRef} 
      className="h-[1000vh] relative bg-black"
    >
      {/* Fixed Global 3D Background */}
      <motion.div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: hillsOpacity }}>
        <GLSLHills scrollYProgress={scrollYProgress} />
      </motion.div>

      <div className="designer-grid fixed inset-0 pointer-events-none opacity-30 z-10"></div>
      <div className="scanlines fixed inset-0 pointer-events-none z-10"></div>

      {/* Viewport with Perspective */}
      <div className="fixed inset-0 h-full w-full overflow-hidden z-20 pointer-events-none" style={{ perspective: '800px' }}>

        {/* Camera Wrapper */}
        <motion.div
          className="w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            z: cameraZ
          }}
        >
          {/* Depth: 0 */}
          <DepthSection cameraZ={cameraZ} depth={0}>
            <HeroSection scrollYProgress={scrollYProgress} />
          </DepthSection>

          {/* Depth: -3000 */}
          <DepthSection cameraZ={cameraZ} depth={-3000}>
            <AboutSection />
          </DepthSection>

          {/* Depth: -6000 */}
          <DepthSection cameraZ={cameraZ} depth={-6000}>
            <ProjectsSection />
          </DepthSection>

          {/* Depth: -9000 */}
          <DepthSection cameraZ={cameraZ} depth={-9000}>
            <SkillsSection />
          </DepthSection>

          {/* Depth: -12000 */}
          <DepthSection cameraZ={cameraZ} depth={-12000}>
            <ContactSection />
          </DepthSection>

        </motion.div>
      </div>
    </main>
  );
}
