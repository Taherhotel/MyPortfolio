'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI E-Commerce",
    description: "Full-stack platform with AI-driven product recommendations and secure payments.",
    technologies: ["Next.js", "Node.js", "TensorFlow"],
    category: "Fullstack",
  },
  {
    id: 2,
    title: "Catch-The-Phish",
    description: "ML/DL system to identify and block phishing attempts with high accuracy.",
    technologies: ["Python", "CNN", "React"],
    category: "AI / Cyber",
  },
  {
    id: 3,
    title: "NetSec Analyzer",
    description: "Advanced network security tool for vulnerability assessment and automated testing.",
    technologies: ["Python", "Wireshark", "React"],
    category: "Cybersecurity",
  },
  {
    id: 4,
    title: "Distributed Task App",
    description: "Scalable platform with Go microservices and real-time collaboration.",
    technologies: ["Go", "React", "Docker"],
    category: "Fullstack",
  }
];

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-7xl flex flex-col h-full justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-10 flex flex-col items-start"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">
            Featured <span className="text-purple-400">Work.</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-500"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                project.category.includes('Cyber') ? 'from-red-500 to-purple-500' :
                project.category.includes('AI') ? 'from-purple-500 to-cyan-500' :
                'from-cyan-500 to-green-500'
              }`}></div>
              
              <div className="text-xs font-mono text-gray-500 mb-4 tracking-wider uppercase">
                {/* {project.category} */}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono bg-white/5 border border-white/10 rounded text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover overlay with buttons */}
              <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center gap-4 transition-opacity duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button className="px-6 py-2 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500 hover:text-black transition-colors font-mono text-sm">
                  [View Live]
                </button>
                <button className="px-6 py-2 border border-white/20 text-white rounded hover:bg-white hover:text-black transition-colors font-mono text-sm">
                  &lt;Source /&gt;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}