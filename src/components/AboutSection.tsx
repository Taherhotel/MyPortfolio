'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const terminalLines = [
  '> whoami',
  'Taher - Multi-Domain Tech Expert',
  '> cat skills.txt',
  'Lang: Python, Go, TypeScript, JS, C++',
  'Core: React, Next.js, Flask, TensorFlow',
  'Data: PostgreSQL, MongoDB, CouchDB',
  'Sec: Metasploit, Burp Suite, Wireshark',
  '> echo $EXPERTISE',
  'Cybersecurity • Full-Stack • AI/ML',
];

const TypingTerminal = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const currentLine = terminalLines[currentLineIndex];
      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        }, 30);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + '\n');
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="w-full h-full min-h-[320px] bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 font-mono text-gray-300 text-sm overflow-hidden relative shadow-2xl flex flex-col">
      <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-white/10">
        <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full opacity-80"></div>
        <span className="ml-4 text-xs text-gray-500 opacity-60">terminal@taher:~</span>
      </div>
      <div className="whitespace-pre-wrap leading-relaxed flex-1">
        <span className="text-cyan-400">{displayedText}</span>
        <span className="animate-pulse text-white">|</span>
      </div>
    </div>
  );
};

export default function AboutSection() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="flex flex-col space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">
              About <span className="text-cyan-400">Me.</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mb-6"></div>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              I am a versatile technology professional bridging the gap between <strong className="text-white font-medium">security, development, and AI</strong>. I build robust, scalable solutions that are not just highly functional, but visually exceptional.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-panel p-5 rounded-xl border-t border-red-500/30">
              <h3 className="text-red-400 font-mono text-sm mb-2">&gt; SECURITY</h3>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Penetration Testing</li>
                <li>• Linux Security</li>
                <li>• Network Analysis</li>
              </ul>
            </div>
            
            <div className="glass-panel p-5 rounded-xl border-t border-cyan-500/30">
              <h3 className="text-cyan-400 font-mono text-sm mb-2">&gt; FULL_STACK</h3>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• React / Next.js</li>
                <li>• Python Flask</li>
                <li>• DB Architecture</li>
              </ul>
            </div>

            <div className="glass-panel p-5 rounded-xl border-t border-purple-500/30">
              <h3 className="text-purple-400 font-mono text-sm mb-2">&gt; AI_&_ML</h3>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• TensorFlow</li>
                <li>• Computer Vision</li>
                <li>• Neural Networks</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Terminal Component */}
        <motion.div 
          className="h-full w-full max-h-[500px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TypingTerminal />
        </motion.div>
        
      </div>
    </div>
  );
}