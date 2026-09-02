'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    // We might not need traditional smooth scroll if we are doing horizontal sticky scroll.
    // In horizontal sticky scroll, clicking nav links is tricky because the sections are not stacked vertically, but inside a sticky horizontal container.
    // A simplified scroll action for now:
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
          ? 'py-2 bg-black/50 backdrop-blur-md border-b border-white/5' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 font-bold text-xl tracking-tighter text-white"
          >
            T<span className="text-cyan-400">.</span>H
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full ${
                  activeSection === item.href.slice(1)
                    ? 'text-black bg-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('#contact')}
              className="px-6 py-2 rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors text-sm font-semibold"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <motion.div
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current"
                />
                <motion.div
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-current"
                />
                <motion.div
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden mt-4"
        >
          <div className="flex flex-col gap-2 p-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;