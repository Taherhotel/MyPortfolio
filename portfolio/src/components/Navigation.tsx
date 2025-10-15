'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  const navItems = [
    { name: 'HOME', href: '#home', command: 'cd ~/' },
    { name: 'ABOUT', href: '#about', command: 'cat about.txt' },
    { name: 'PROJECTS', href: '#projects', command: 'ls exploits/' },
    { name: 'SKILLS', href: '#skills', command: 'cat skills.cfg' },
    { name: 'CONTACT', href: '#contact', command: 'ssh contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-green-400/30 shadow-lg shadow-green-400/20' 
          : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="text-green-400 font-mono text-lg">
              <span className="text-cyan-400">root@</span>
              <span className="text-green-400">Taher</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$</span>
              <span className="animate-pulse text-green-400">_</span>
            </div>
          </motion.div>

          {/* System Status */}
          <div className="hidden lg:flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">SECURE</span>
            </div>
            <div className="text-cyan-400">{currentTime}</div>
            <div className="text-yellow-400">CPU: 12%</div>
            <div className="text-blue-400">MEM: 34%</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 65, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 text-sm font-mono transition-all duration-300 rounded border ${
                  activeSection === item.href.slice(1)
                    ? 'text-black bg-green-400 border-green-400 shadow-lg shadow-green-400/50'
                    : 'text-green-400 border-green-400/30 hover:border-green-400 hover:text-green-300'
                }`}
                title={item.command}
              >
                <span className="text-cyan-400 mr-1">[</span>
                {item.name}
                <span className="text-cyan-400 ml-1">]</span>
                
                {/* Cyber glow effect */}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="cyberGlow"
                    className="absolute inset-0 bg-green-400/20 rounded border border-green-400"
                    style={{ filter: 'blur(4px)' }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-green-400 hover:text-green-300 p-2 border border-green-400/30 rounded font-mono"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.div
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current mb-1"
                />
                <motion.div
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-current mb-1"
                />
                <motion.div
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current"
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden border-t border-green-400/30"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full text-left px-4 py-3 text-sm font-mono text-green-400 hover:text-green-300 hover:bg-green-400/10 border border-green-400/20 rounded transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span>
                    <span className="text-cyan-400">$</span> {item.command}
                  </span>
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
              </motion.button>
            ))}
            
            {/* Mobile System Status */}
            <div className="px-4 py-2 border-t border-green-400/30 mt-4">
              <div className="flex justify-between text-xs font-mono">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">SECURE</span>
                </div>
                <div className="text-cyan-400">{currentTime}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cyber scan line effect */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ width: '200%' }}
      />
    </motion.nav>
  );
};

export default Navigation;