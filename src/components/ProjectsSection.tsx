'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Box, Sphere } from '@react-three/drei';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: 'fullstack' | 'ai' | 'cybersecurity' | 'tools';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'COMPLETED' | 'IN_PROGRESS';
  liveUrl?: string;
  githubUrl?: string;
}

// 3D Cyber Elements
const CyberCube = ({ position, color }: { position: [number, number, number], color: string }) => (
  <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
    <Box args={[0.5, 0.5, 0.5]} position={position}>
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.3}
        wireframe
      />
    </Box>
  </Float>
);

const SecurityOrb = ({ position }: { position: [number, number, number] }) => (
  <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
    <Sphere args={[0.3]} position={position}>
      <meshStandardMaterial 
        color="#00ff41" 
        emissive="#00ff41" 
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  </Float>
);

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered E-Commerce Platform",
    description: "Full-stack e-commerce platform with AI-driven product recommendations, real-time inventory management, and secure payment processing using modern web technologies.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "TensorFlow", "Stripe"],
    category: "fullstack",
    priority: "HIGH",
    status: "ACTIVE",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Catch-The-Phish",
    description: "Real-time phishing detection system using machine learning and deep learning models to identify and block phishing attempts with high accuracy.",
    technologies: ["Python", "CNN", "scikit-learn", "Flask", "React", "MongoDB"],
    category: "ai",
    priority: "CRITICAL",
    status: "COMPLETED",
    liveUrl: "#",
    githubUrl: "https://github.com/Taherhotel/Catch-The-Phish"
  },
  {
    id: 3,
    title: "Distributed Task Management System",
    description: "Scalable task management platform built with Go microservices, React frontend, and real-time collaboration features using WebSockets and distributed databases.",
    technologies: ["Go", "React", "TypeScript", "CouchDB", "PouchDB", "WebSockets", "Docker"],
    category: "fullstack",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Network Security Analyzer",
    description: "Advanced network security tool for vulnerability assessment, traffic analysis, and automated penetration testing with comprehensive reporting dashboard.",
    technologies: ["Python", "Linux", "Wireshark", "Burp Suite", "Metasploit", "React", "PostgreSQL"],
    category: "cybersecurity",
    priority: "CRITICAL",
    status: "ACTIVE",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Machine Learning Data Pipeline",
    description: "Automated ML pipeline for data processing, model training, and deployment with monitoring and A/B testing capabilities for production ML systems.",
    technologies: ["Python", "TensorFlow", "Flask", "Docker", "MongoDB", "Shell Script", "Kubernetes"],
    category: "ai",
    priority: "HIGH",
    status: "COMPLETED",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Cross-Platform Development Tools",
    description: "Suite of development tools and utilities for cross-platform development, including automated testing, deployment scripts, and performance monitoring.",
    technologies: ["Go", "Python", "Shell Script", "Docker", "C++", "Linux", "macOS"],
    category: "tools",
    priority: "MEDIUM",
    status: "ACTIVE",
    liveUrl: "#",
    githubUrl: "#"
  }
];

// Helper functions
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'fullstack': return '#3b82f6';
    case 'ai': return '#8b5cf6';
    case 'cybersecurity': return '#ef4444';
    case 'tools': return '#10b981';
    default: return '#10b981';
  }
};

const getCategoryBorder = (category: string) => {
  switch (category) {
    case 'fullstack': return 'border-blue-500/50';
    case 'ai': return 'border-purple-500/50';
    case 'cybersecurity': return 'border-red-500/50';
    case 'tools': return 'border-green-500/50';
    default: return 'border-green-500/50';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'LOW': return 'text-green-400';
    case 'MEDIUM': return 'text-yellow-400';
    case 'HIGH': return 'text-orange-400';
    case 'CRITICAL': return 'text-red-400';
    default: return 'text-green-400';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'text-green-400';
    case 'COMPLETED': return 'text-blue-400';
    case 'IN_PROGRESS': return 'text-yellow-400';
    default: return 'text-green-400';
  }
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'penetration': return '#ff0040';
      case 'defense': return '#0080ff';
      case 'forensics': return '#8000ff';
      case 'tools': return '#00ff41';
      default: return '#ffffff';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-400';
      case 'HIGH': return 'text-orange-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400';
      case 'COMPLETED': return 'text-blue-400';
      case 'CLASSIFIED': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cyber-border bg-black/80 backdrop-blur-sm overflow-hidden hover:scale-105 transition-all duration-300"
    >
      <motion.div
        animate={{ 
          rotateX: isHovered ? 2 : 0,
          rotateY: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative h-full"
      >
        {/* 3D Visualization */}
        <div className="relative h-48 bg-black overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color={getCategoryColor(project.category)} />
            <pointLight position={[-5, -5, -5]} intensity={0.4} color="#00ff41" />
            
            <CyberCube position={[1, 0, 0]} color={getCategoryColor(project.category)} />
            <CyberCube position={[-1, 1, -1]} color="#00ff41" />
            <SecurityOrb position={[0, -1, 1]} />
            
            {/* Additional floating elements based on category */}
            {project.category === 'cybersecurity' && (
              <>
                <CyberCube position={[2, -1, 0]} color="#ff0040" />
                <CyberCube position={[-2, 0, 1]} color="#ff0040" />
              </>
            )}
            {project.category === 'ai' && (
              <>
                <SecurityOrb position={[1.5, 1.5, 0]} />
                <SecurityOrb position={[-1.5, -1.5, 0]} />
              </>
            )}
          </Canvas>
          
          {/* Scan Line Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="scan-line" />
          </div>
          
          {/* Status Indicators */}
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <div className={`cyber-border px-2 py-1 text-xs font-mono ${getStatusColor(project.status)}`}>
              [{project.status}]
            </div>
            <div className={`cyber-border px-2 py-1 text-xs font-mono ${getPriorityColor(project.priority)}`}>
              PRIORITY: {project.priority}
            </div>
          </div>
          
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center space-x-4"
          >
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-border px-4 py-2 text-green-400 font-mono text-sm hover:neon-glow transition-all"
              >
                [LIVE]
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-border px-4 py-2 text-blue-400 font-mono text-sm hover:neon-glow transition-all"
              >
                [GITHUB]
              </motion.button>
            </>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-green-300 font-mono group-hover:neon-glow transition-all">
              &gt; {project.title}
            </h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full cyber-pulse ${
                project.status === 'ACTIVE' ? 'bg-green-400' : 
                project.status === 'COMPLETED' ? 'bg-blue-400' : 'bg-red-400'
              }`} />
            </div>
          </div>
          
          {/* Description */}
          <div className="cyber-border p-3 mb-4">
            <p className="text-green-300 text-sm leading-relaxed font-mono">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <div className="text-xs text-green-400 font-mono mb-2">[TECH_STACK]</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-xs bg-black border border-green-500/30 text-green-300 font-mono hover:border-green-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Stats */}
          <div className="cyber-border p-2">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xs text-green-400 font-mono">CATEGORY</div>
                <div className="text-xs font-mono" style={{ color: getCategoryColor(project.category) }}>
                  {project.category.toUpperCase()}
                </div>
              </div>
              <div>
                <div className="text-xs text-green-400 font-mono">PRIORITY</div>
                <div className={`text-xs font-mono ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </div>
              </div>
              <div>
                <div className="text-xs text-green-400 font-mono">STATUS</div>
                <div className={`text-xs font-mono ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getFilteredProjects = () => {
    if (activeFilter === 'all') return projects;
    return projects.filter(project => project.category === activeFilter);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/90 relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 matrix-bg opacity-5" />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
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
              &gt; TECH_PROJECTS.exe
            </span>
          </h2>
          <div className="cyber-border p-3 inline-block">
            <p className="text-green-300 font-mono">
              [SYSTEM] Loading multi-domain tech portfolio... <span className="cyber-pulse">●</span>
            </p>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { key: 'all', label: 'ALL_PROJECTS', color: 'text-green-400' },
            { key: 'fullstack', label: 'FULL_STACK', color: 'text-blue-400' },
            { key: 'ai', label: 'AI_&_ML', color: 'text-purple-400' },
            { key: 'cybersecurity', label: 'CYBERSECURITY', color: 'text-red-400' },
            { key: 'tools', label: 'TOOLS', color: 'text-green-400' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`cyber-border px-4 py-2 font-mono text-sm transition-all duration-300 hover:scale-105 ${
                activeFilter === filter.key 
                  ? `${filter.color} neon-glow` 
                  : 'text-green-300 hover:text-green-400'
              }`}
            >
              [{filter.label}]
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredProjects().map((project, index) => (
            <ProjectCard key={`${project.id}-${activeFilter}`} project={project} index={index} />
          ))}
        </div>

        {/* Security Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 cyber-border p-6"
        >
          <h3 className="text-2xl font-bold text-green-400 font-mono mb-6 text-center">
            [PROJECT_METRICS]
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 font-mono">6</div>
              <div className="text-sm text-green-300 font-mono">ACTIVE_PROJECTS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 font-mono">3</div>
              <div className="text-sm text-green-300 font-mono">TECH_DOMAINS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 font-mono">15+</div>
              <div className="text-sm text-green-300 font-mono">TECHNOLOGIES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 font-mono">∞</div>
              <div className="text-sm text-green-300 font-mono">INNOVATION_LEVEL</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="cyber-border p-4 inline-block">
            <p className="text-green-300 mb-4 font-mono">
              [CLASSIFIED] Want to explore more tech innovations?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-border px-8 py-4 text-green-400 font-mono font-semibold hover:neon-glow transition-all duration-300"
            >
              [REQUEST_ACCESS] &gt; Full Portfolio
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;