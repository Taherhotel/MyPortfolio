'use client';

import { motion } from 'framer-motion';

const skills = [
  { category: 'Cybersecurity', items: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Wireshark', 'Pen Testing'] },
  { category: 'Programming', items: ['Python', 'Go', 'TypeScript', 'JavaScript', 'C++', 'Shell'] },
  { category: 'Full Stack', items: ['React', 'Next.js', 'Flask', 'MongoDB', 'PostgreSQL', 'Docker'] },
  { category: 'AI & ML', items: ['TensorFlow', 'OpenCV', 'Neural Networks', 'Machine Learning'] }
];

export default function SkillsSection() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">
            Tech <span className="text-green-400">Arsenal.</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-500"></div>
          <p className="mt-4 text-gray-400 max-w-2xl font-mono text-sm">
            {/* Multi-domain expertise across security, engineering, and artificial intelligence. */}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400/50 to-transparent rounded-t-2xl group-hover:from-green-400 transition-colors"></div>
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-green-400">&gt;</span> {skillGroup.category}
              </h3>
              
              <div className="flex flex-col gap-3">
                {skillGroup.items.map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50"></div>
                    <span className="text-gray-300 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}