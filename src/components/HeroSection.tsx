'use client';

import { motion, useTransform, MotionValue, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GLSLHills } from "./ui/glsl-hills";

const greetings = ["HELLO", "HOLA", "BONJOUR", "CIAO", "HALLO", "NAMASTE", "こんにちは", "مرحبا", "ПРИВЕТ", "안녕하세요"];
const roles = ["AN INNOVATOR", "A DESIGNER", "A DEVELOPER"];

export default function HeroSection({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const defaultScroll = useMotionValue(0);
  const activeScroll = scrollYProgress || defaultScroll;
  const scale = useTransform(activeScroll, [0, 0.15], [1, 0.5]);
  const opacity = useTransform(activeScroll, [0, 0.15], [1, 0]);
  const y = useTransform(activeScroll, [0, 0.15], ["0%", "50%"]);

  const [greetingIndex, setGreetingIndex] = useState(0);

  // Typewriter state for roles
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2500);
    return () => clearInterval(greetingInterval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = roles[roleIndex];

    if (isDeleting) {
      if (roleText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timer = setTimeout(() => setRoleText(currentWord.substring(0, roleText.length - 1)), 50);
      }
    } else {
      if (roleText === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), 2000); // pause at the end of the word
      } else {
        timer = setTimeout(() => setRoleText(currentWord.substring(0, roleText.length + 1)), 100);
      }
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex]);

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-black"
      style={{ scale, opacity, y }}
    >
      <GLSLHills />

      <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 -mt-48 md:-mt-64 w-full">

        <div className="h-16 relative w-full flex items-center justify-center mb-2">
          <AnimatePresence mode="wait">
            <motion.h2
              key={greetingIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-xl sm:text-2xl md:text-3xl font-black italic tracking-widest uppercase absolute"
              style={{ color: '#FFCC33', textShadow: '0 0 20px rgba(255,204,51,0.4)' }}
            >
              {greetings[greetingIndex]}, I AM
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          TAHER HOTELWALA
        </motion.h1>

        <motion.div
          className="text-base sm:text-lg md:text-2xl text-white font-bold tracking-widest uppercase flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span>AN ENGINEER BY PROFESSION,</span>
          
          <span
            className="font-black italic whitespace-nowrap"
            style={{ color: '#FFCC33', textShadow: '0 0 15px rgba(255,204,51,0.4)' }}
          >
            {roleText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[2px] h-[0.9em] bg-[#FFCC33] ml-1 align-baseline"
            />
          </span>
          
          <span>BY PASSION</span>
        </motion.div>
      </div>
    </motion.div>
  );
}