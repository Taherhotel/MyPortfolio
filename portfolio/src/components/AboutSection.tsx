'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box } from '@react-three/drei';

// Typing Terminal Component
const TypingTerminal = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  const terminalLines = [
    '> whoami',
    'Taher - Multi-Domain Tech Expert',
    '',
    '> cat skills.txt',
    'Languages: Python, Go, TypeScript, JS, C++',
    'Frameworks: React, Next.js, Flask, TensorFlow',
    'Databases: PostgreSQL, MongoDB, CouchDB',
    'Security: Metasploit, Burp Suite, Wireshark',
    'OS: macOS, Ubuntu Linux, Parrot OS',
    '',
    '> echo $EXPERTISE',
    'Cybersecurity • Full-Stack • AI/ML',
  ];

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const currentLine = terminalLines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        }, 50); // Typing speed
        
        return () => clearTimeout(timer);
      } else {
        // Move to next line
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + '\n');
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 500); // Pause between lines
        
        return () => clearTimeout(timer);
      }
    } else {
      // Reset animation after completion
      const resetTimer = setTimeout(() => {
        setDisplayedText('');
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 2000); // Wait 3 seconds before restarting
      
      return () => clearTimeout(resetTimer);
    }
  }, [currentLineIndex, currentCharIndex, terminalLines]);

  return (
    <div className="w-full h-96 bg-black border-2 border-green-400 rounded-lg p-4 font-mono text-green-400 text-sm overflow-hidden relative">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-400/30">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-xs">terminal@taher:~</span>
      </div>
      
      {/* Terminal Content */}
      <div className="whitespace-pre-wrap leading-relaxed">
        {displayedText}
        <span className="animate-pulse">|</span>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-line opacity-20"></div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/90 relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 matrix-bg opacity-10" />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-green-500/20" />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
                <span className="neon-text">
                  &gt; ABOUT_ME.exe
                </span>
              </h2>
              <div className="cyber-border p-1 mb-4">
                <div className="bg-black p-2">
                  <span className="text-green-400 font-mono text-sm">
                    [SYSTEM] Loading profile... ████████████ 100%
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="cyber-border p-4">
                <p className="text-green-300 leading-relaxed font-mono">
                  <span className="text-purple-400">[MULTI_DOMAIN]</span> Versatile technology professional with expertise 
                  spanning cybersecurity, full-stack development, and artificial intelligence. Passionate about building 
                  secure, intelligent systems that solve real-world problems.
                </p>
              </div>

              <div className="cyber-border p-4">
                <p className="text-green-300 leading-relaxed font-mono">
                  <span className="text-blue-400">[MISSION]</span> Bridging the gap between security, development, and AI 
                  to create robust, scalable solutions. Experienced in Python, Go, TypeScript, and modern frameworks 
                  with a focus on secure coding practices and intelligent automation.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-3 gap-4 pt-6"
            >
              <div className="cyber-border p-4">
                <h3 className="text-lg font-semibold text-red-400 font-mono mb-3">
                  &gt; SECURITY
                </h3>
                <ul className="text-green-300 space-y-2 font-mono text-xs">
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">●</span>Penetration Testing
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">●</span>Linux Security
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">●</span>Network Analysis
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">●</span>Security Tools
                  </li>
                </ul>
              </div>
              
              <div className="cyber-border p-4">
                <h3 className="text-lg font-semibold text-blue-400 font-mono mb-3">
                  &gt; FULL_STACK
                </h3>
                <ul className="text-green-300 space-y-2 font-mono text-xs">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">●</span>React/Next.js
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">●</span>FLask
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">●</span>Database Management
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">●</span>Microservices
                  </li>
                </ul>
              </div>

              <div className="cyber-border p-4">
                <h3 className="text-lg font-semibold text-purple-400 font-mono mb-3">
                  &gt; AI_&_ML
                </h3>
                <ul className="text-green-300 space-y-2 font-mono text-xs">
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">●</span>TensorFlow
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">●</span>Computer Vision
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">●</span>Neural Networks
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">●</span>Data Analysis
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Tech Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="cyber-border p-4 mt-6"
            >
              <h3 className="text-lg font-semibold text-yellow-400 font-mono mb-3">
                [TECH_METRICS]
              </h3>
              <div className="grid grid-cols-2 gap-4 text-green-300 font-mono text-sm">
                <div>
                  <span className="text-yellow-400">Languages:</span> 8+
                </div>
                <div>
                  <span className="text-yellow-400">Frameworks:</span> 6+
                </div>
                <div>
                  <span className="text-yellow-400">Databases:</span> 4+
                </div>
                <div>
                  <span className="text-yellow-400">OS Platforms:</span> 3+
                </div>
              </div>
            </motion.div>
          </div>

          {/* Typing Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="relative"
          >
            <TypingTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;