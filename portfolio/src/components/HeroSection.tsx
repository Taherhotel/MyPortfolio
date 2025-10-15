'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Box, Cylinder } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// 3D Lock Component
const CyberLock = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const lockRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (lockRef.current) {
      lockRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      lockRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={lockRef} position={position} scale={scale}>
        {/* Lock Body */}
        <Box args={[1, 1.2, 0.3]} position={[0, -0.3, 0]}>
          <meshStandardMaterial 
            color="#00ff41" 
            emissive="#00ff41" 
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        {/* Lock Shackle */}
        <Cylinder args={[0.4, 0.4, 0.1, 32]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#00ff41" 
            emissive="#00ff41" 
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 0.1, 32]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#000000" />
        </Cylinder>
      </group>
    </Float>
  );
};

// 3D Key Component
const CyberKey = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) => {
  const keyRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (keyRef.current) {
      keyRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <group ref={keyRef} position={position} rotation={rotation}>
        {/* Key Head */}
        <Cylinder args={[0.3, 0.3, 0.1, 6]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </Cylinder>
        {/* Key Shaft */}
        <Box args={[0.1, 1.2, 0.1]} position={[0, -0.8, 0]}>
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        {/* Key Teeth */}
        <Box args={[0.2, 0.1, 0.1]} position={[0.1, -1.2, 0]}>
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        <Box args={[0.15, 0.1, 0.1]} position={[0.08, -1.4, 0]}>
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </group>
    </Float>
  );
};

// Matrix Rain Effect Component
const MatrixRain = () => {
  const [characters, setCharacters] = useState<string[]>([]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = [];
    for (let i = 0; i < 50; i++) {
      charArray.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    setCharacters(charArray);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {characters.map((char, i) => (
        <div
          key={i}
          className="absolute text-green-400 font-mono text-sm opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animation: 'matrix-rain 8s linear infinite'
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden matrix-bg">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* 3D Cybersecurity Elements */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00ff41" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00ffff" />
          
          {/* Multiple 3D Locks */}
          <CyberLock position={[-4, 2, -2]} scale={0.8} />
          <CyberLock position={[4, -1, -3]} scale={1.2} />
          <CyberLock position={[-2, -3, -1]} scale={0.6} />
          
          {/* Multiple 3D Keys */}
          <CyberKey position={[3, 3, -2]} rotation={[0, 0, Math.PI / 4]} />
          <CyberKey position={[-3, -2, -4]} rotation={[0, 0, -Math.PI / 6]} />
          <CyberKey position={[5, 0, -1]} rotation={[0, 0, Math.PI / 3]} />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true} 
            autoRotate 
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-green-900/20 to-black/90 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 neon-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-500 bg-clip-text text-transparent">
              TAHER.EXE
            </span>
          </motion.h1>

          <motion.div
            className="text-xl sm:text-2xl lg:text-3xl text-green-400 mb-8 font-mono"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="text-cyan-400">&gt;</span> MULTI-DOMAIN DEVELOPER
            <span className="animate-pulse">_</span>
          </motion.div>

          <motion.p 
            className="text-lg sm:text-xl text-green-300 mb-12 max-w-2xl mx-auto leading-relaxed font-mono"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Cybersecurity • Full-Stack Development • AI & Machine Learning<br />
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 cyber-border font-mono"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? '[ACCESSING_PORTFOLIO...]' : '[VIEW_EXPLOITS]'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg hover:bg-green-400/10 transition-all duration-300 font-mono"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              [ESTABLISH_CONNECTION]
            </motion.button>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;