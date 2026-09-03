'use client';

import { motion, AnimatePresence, MotionValue, useTransform, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';

const greetings = ["HELLO", "HOLA", "BONJOUR", "CIAO", "HALLO", "NAMASTE", "こんにちは", "مرحبا", "ПРИВЕТ", "안녕하세요"];
const roles = ["AN INNOVATOR", "A DESIGNER", "A DEVELOPER"];

export default function HeroSection({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {

  const [greetingIndex, setGreetingIndex] = useState(0);

  // Typewriter state for roles
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll animations for tearing apart effect
  const fallbackScroll = useMotionValue(0);
  const scroll = scrollYProgress || fallbackScroll;

  // The text starts tearing apart as soon as we start scrolling (0 to 0.15)
  const leftX = useTransform(scroll, [0, 0.15], [0, -1200]);
  const leftRotate = useTransform(scroll, [0, 0.15], [0, -35]);
  
  const rightX = useTransform(scroll, [0, 0.15], [0, 1200]);
  const rightRotate = useTransform(scroll, [0, 0.15], [0, 35]);

  const topY = useTransform(scroll, [0, 0.15], [0, -800]);
  const bottomY = useTransform(scroll, [0, 0.15], [0, 800]);
  
  const textOpacity = useTransform(scroll, [0.02, 0.15], [1, 0]);

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
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
      <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 -mt-48 md:-mt-64 w-full">

        <motion.div 
          className="h-16 relative w-full flex items-center justify-center mb-2"
          style={{ y: topY, opacity: textOpacity }}
        >
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
        </motion.div>

        <motion.div 
          className="flex flex-row items-center justify-center gap-6 mb-6"
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase origin-bottom-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ x: leftX, rotate: leftRotate, opacity: textOpacity }}
          >
            TAHER
          </motion.h1>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase origin-bottom-left"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ x: rightX, rotate: rightRotate, opacity: textOpacity }}
          >
            HOTELWALA
          </motion.h1>
        </motion.div>

        <motion.div
          className="text-base sm:text-lg md:text-2xl text-white font-bold tracking-widest uppercase flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ y: bottomY, opacity: textOpacity }}
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
    </div>
  );
}