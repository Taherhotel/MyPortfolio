'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'cybersecurity' | 'fullstack' | 'ai' | 'languages' | 'tools';
  icon: string;
  description: string;
}

const skills: Skill[] = [
  // Cybersecurity
  { name: 'Kali Linux', level: 95, category: 'cybersecurity', icon: '🜶', description: 'Advanced Linux administration & security' },
  { name: 'Metasploit Framework', level: 90, category: 'cybersecurity', icon: '⚡', description: 'Penetration testing & exploitation' },
  { name: 'ParrotOS', level: 88, category: 'cybersecurity', icon: '🦜', description: 'Security-focused Linux distribution' },
  { name: 'Burp Suite', level: 92, category: 'cybersecurity', icon: '🕷️', description: 'Web application security testing' },
  { name: 'Wireshark', level: 85, category: 'cybersecurity', icon: '🦈', description: 'Network protocol analysis' },
  { name: 'Penetration Testing', level: 90, category: 'cybersecurity', icon: '🔓', description: 'Vulnerability assessment & exploitation' },
  
  // Programming Languages
  { name: 'Python', level: 95, category: 'languages', icon: '🐍', description: 'Backend development & automation' },
  { name: 'Go', level: 88, category: 'languages', icon: '🔷', description: 'High-performance backend services' },
  { name: 'TypeScript', level: 92, category: 'languages', icon: '📘', description: 'Type-safe JavaScript development' },
  { name: 'JavaScript', level: 90, category: 'languages', icon: '💛', description: 'Frontend & backend development' },
  { name: 'C++', level: 85, category: 'languages', icon: '⚙️', description: 'System programming & performance' },
  { name: 'Shell Scripting', level: 88, category: 'languages', icon: '🖥️', description: 'Automation & system administration' },
  
  // Full-Stack Development
  { name: 'React', level: 93, category: 'fullstack', icon: '⚛️', description: 'Modern frontend development' },
  { name: 'Next.js', level: 90, category: 'fullstack', icon: '▲', description: 'Full-stack React framework' },
  { name: 'Flask', level: 85, category: 'fullstack', icon: '🌶️', description: 'Python web framework' },
  { name: 'MongoDB', level: 85, category: 'fullstack', icon: '🍃', description: 'NoSQL document database' },
  { name: 'CouchDB/PouchDB', level: 82, category: 'fullstack', icon: '🛋️', description: 'Distributed database systems' },
  
  // AI & Machine Learning
  { name: 'OpenCV', level: 85, category: 'ai', icon: '👁️', description: 'Computer vision & image processing' },
  { name: 'Machine Learning', level: 87, category: 'ai', icon: '🤖', description: 'ML algorithms & model training' },
  { name: 'Neural Networks', level: 86, category: 'ai', icon: '🕸️', description: 'Deep learning architectures' },
  
  // Development Tools
  { name: 'macOS', level: 95, category: 'tools', icon: '🍎', description: 'Primary development environment' },
  { name: 'Linux', level: 90, category: 'tools', icon: '🐧', description: 'Server & development environment' },
  { name: 'GitHub', level: 92, category: 'tools', icon: '📚', description: 'Version control & collaboration' },

];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cybersecurity': return 'from-red-500 to-red-700';
      case 'fullstack': return 'from-blue-500 to-blue-700';
      case 'ai': return 'from-purple-500 to-purple-700';
      case 'languages': return 'from-green-500 to-green-700';
      case 'tools': return 'from-yellow-500 to-yellow-700';
      default: return 'from-green-500 to-green-700';
    }
  };

  const getCategoryBorder = (category: string) => {
    switch (category) {
      case 'cybersecurity': return 'border-red-500/50';
      case 'fullstack': return 'border-blue-500/50';
      case 'ai': return 'border-purple-500/50';
      case 'languages': return 'border-green-500/50';
      case 'tools': return 'border-yellow-500/50';
      default: return 'border-gray-500/50';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group cyber-border p-4 hover:scale-105 transition-all duration-300 ${getCategoryBorder(skill.category)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <span className="text-green-300 font-mono font-medium">{skill.name}</span>
            {isHovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-green-400 font-mono mt-1"
              >
                {skill.description}
              </motion.p>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="text-green-400 text-sm font-mono font-bold">{skill.level}%</span>
          <div className="text-xs text-green-500 font-mono">
            PROFICIENCY
          </div>
        </div>
      </div>
      
      <div className="relative h-2 bg-black border border-green-500/30 rounded-sm overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} relative`}
        >
          <div className="absolute inset-0 neon-glow opacity-50" />
          <motion.div
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-4 bg-white/30 skew-x-12"
          />
        </motion.div>
      </div>
      
      {/* Terminal-style progress indicator */}
      <div className="mt-2 font-mono text-xs text-green-400">
        <span>[</span>
        <span className="text-green-300">
          {'█'.repeat(Math.floor(skill.level / 10))}
          {'░'.repeat(10 - Math.floor(skill.level / 10))}
        </span>
        <span>] {skill.level}%</span>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const cybersecuritySkills = skills.filter(skill => skill.category === 'cybersecurity');
  const fullstackSkills = skills.filter(skill => skill.category === 'fullstack');
  const aiSkills = skills.filter(skill => skill.category === 'ai');
  const languageSkills = skills.filter(skill => skill.category === 'languages');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');

  const getFilteredSkills = () => {
    switch (activeCategory) {
      case 'cybersecurity': return cybersecuritySkills;
      case 'fullstack': return fullstackSkills;
      case 'ai': return aiSkills;
      case 'languages': return languageSkills;
      case 'tools': return toolsSkills;
      default: return skills;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/90 relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 matrix-bg opacity-5" />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-r border-green-500/20" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
            <span className="neon-text">
              &gt; TECH_ARSENAL.exe
            </span>
          </h2>
          <div className="cyber-border p-2 inline-block">
            <p className="text-green-300 font-mono">
              [SYSTEM] Initializing multi-domain expertise... <span className="cyber-pulse">●</span>
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { key: 'all', label: 'ALL_SKILLS', color: 'text-green-400' },
            { key: 'cybersecurity', label: 'CYBERSECURITY', color: 'text-red-400' },
            { key: 'fullstack', label: 'FULL_STACK', color: 'text-blue-400' },
            { key: 'ai', label: 'AI_&_ML', color: 'text-purple-400' },
            { key: 'languages', label: 'LANGUAGES', color: 'text-green-400' },
            { key: 'tools', label: 'TOOLS', color: 'text-yellow-400' }
          ].map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`cyber-border px-4 py-2 font-mono text-sm transition-all duration-300 hover:scale-105 ${
                activeCategory === category.key 
                  ? `${category.color} neon-glow` 
                  : 'text-green-300 hover:text-green-400'
              }`}
            >
              [{category.label}]
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {getFilteredSkills().map((skill, index) => (
            <SkillBar key={`${skill.name}-${activeCategory}`} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Tech Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 cyber-border p-6"
        >
          <h3 className="text-2xl font-bold text-green-400 font-mono mb-6 text-center">
            [TECH_DASHBOARD]
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 font-mono">6+</div>
              <div className="text-sm text-green-300 font-mono">PROGRAMMING_LANGUAGES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 font-mono">7+</div>
              <div className="text-sm text-green-300 font-mono">FRAMEWORKS_&_LIBRARIES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 font-mono">5+</div>
              <div className="text-sm text-green-300 font-mono">AI_&_ML_TECHNOLOGIES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 font-mono">3</div>
              <div className="text-sm text-green-300 font-mono">OPERATING_SYSTEMS</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;