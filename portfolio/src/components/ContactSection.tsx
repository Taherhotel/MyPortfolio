'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, Cylinder } from '@react-three/drei';



const MatrixRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="matrix-bg opacity-20" />
    </div>
  );
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    security_clearance: 'public'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '[SYSTEM] Secure communication channel initialized...',
    '[INFO] Encryption protocols active',
    '[STATUS] Ready to receive transmission'
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Terminal simulation
    setTerminalOutput(prev => [
      ...prev,
      '[TRANSMISSION] Encrypting message...',
      '[SECURITY] Verifying sender credentials...',
      '[NETWORK] Establishing secure connection...'
    ]);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setTerminalOutput(prev => [
      ...prev,
      '[SUCCESS] Message transmitted successfully',
      '[INFO] Response expected within 24 hours',
      '[SYSTEM] Connection terminated'
    ]);
    
    // Reset form
    setFormData({ name: '', email: '', message: '', security_clearance: 'public' });
    setIsSubmitting(false);
    
    console.log('Secure message sent:', formData);
  };

  const contactChannels = [
    {
      icon: '🔐',
      label: 'SECURE_EMAIL',
      value: 'hotelwalataher@gmail.com',
      href: 'hotelwalataher@gmail.com',
      status: 'ENCRYPTED',
      color: 'text-green-400'
    },
    {
      icon: '🛡️',
      label: 'LINKEDIN_SEC',
      value: 'linkedin.com/in/taherhotelwala',
      href: 'https://www.linkedin.com/in/taher-hotelwala-3501b3295/',
      status: 'VERIFIED',
      color: 'text-blue-400'
    },
    {
      icon: '⚡',
      label: 'GITHUB_REPO',
      value: 'github.com/Taherhotel',
      href: 'https://github.com/Taherhotel',
      status: 'ACTIVE',
      color: 'text-purple-400'
    },
    {
      icon: '🔥',
      label: 'TRYHACKME',
      value: '@Thacks123',
      href: 'https://tryhackme.com/p/Thacks123',
      status: 'LIVE',
      color: 'text-cyan-400'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/95 relative overflow-hidden">
      {/* Matrix Background */}
      <MatrixRain />
      
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
              &gt; SECURE_CONTACT.exe
            </span>
          </h2>
          <div className="cyber-border p-3 inline-block">
            <p className="text-green-300 font-mono">
              [CLASSIFIED] Establishing encrypted communication channel... <span className="cyber-pulse">●</span>
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Secure Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="cyber-border bg-black/80 backdrop-blur-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-green-400 font-mono">
                  [SECURE_TRANSMISSION]
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full cyber-pulse" />
                  <span className="text-xs text-green-400 font-mono">ENCRYPTED</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-green-400 mb-2">
                    [AGENT_NAME]
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black cyber-border text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 transition-all font-mono"
                    placeholder="Enter your codename..."
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-green-400 mb-2">
                    [SECURE_CHANNEL]
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black cyber-border text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 transition-all font-mono"
                    placeholder="secure@encrypted.com"
                  />
                </div>

                <div>
                  <label htmlFor="security_clearance" className="block text-sm font-mono text-green-400 mb-2">
                    [CLEARANCE_LEVEL]
                  </label>
                  <select
                    id="security_clearance"
                    name="security_clearance"
                    value={formData.security_clearance}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black cyber-border text-green-300 focus:outline-none focus:border-green-400 transition-all font-mono"
                  >
                    <option value="public">PUBLIC</option>
                    <option value="confidential">CONFIDENTIAL</option>
                    <option value="secret">SECRET</option>
                    <option value="top_secret">TOP_SECRET</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-green-400 mb-2">
                    [ENCRYPTED_MESSAGE]
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-black cyber-border text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 transition-all resize-none font-mono"
                    placeholder="Enter classified information..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 cyber-border text-green-400 font-mono font-semibold hover:neon-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
                      <span>[TRANSMITTING...]</span>
                    </div>
                  ) : (
                    '[SEND_ENCRYPTED] &gt; Execute'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Channels & 3D Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Communication Channels */}
            <div className="space-y-4">
              <h4 className="text-lg font-mono text-green-400 mb-4">[FIND_ME_AT]</h4>
              {contactChannels.map((channel, index) => (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center justify-between p-4 cyber-border bg-black/60 hover:bg-black/80 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{channel.icon}</div>
                    <div>
                      <p className="text-green-400 text-sm font-mono">[{channel.label}]</p>
                      <p className={`font-mono text-sm ${channel.color} group-hover:neon-glow transition-all`}>
                        {channel.value}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full cyber-pulse ${
                      channel.status === 'ENCRYPTED' ? 'bg-green-400' :
                      channel.status === 'VERIFIED' ? 'bg-blue-400' :
                      channel.status === 'ACTIVE' ? 'bg-purple-400' : 'bg-cyan-400'
                    }`} />
                    <span className={`text-xs font-mono ${channel.color}`}>
                      {channel.status}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="cyber-border p-6 bg-black/80"
            >
              <h4 className="text-lg font-mono text-red-400 mb-3">[SECURITY_NOTICE]</h4>
              <div className="space-y-2 text-green-300 font-mono text-sm">
                <p>• All communications are encrypted end-to-end</p>
                <p>• Response time: &lt; 24 hours for standard inquiries</p>
                <p>• Emergency contacts available for critical security issues</p>
                <p>• PGP key available upon request for sensitive data</p>
              </div>
              
              <div className="mt-4 cyber-border p-2 bg-black/60">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-green-400">ENCRYPTION: AES-256</span>
                  <span className="text-blue-400">PROTOCOL: TLS 1.3</span>
                  <span className="text-purple-400">STATUS: ACTIVE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="cyber-border p-6 inline-block bg-black/80">
            <h3 className="text-xl font-mono text-green-400 mb-4">[READY_TO_COLLABORATE]</h3>
            <p className="text-green-300 mb-6 font-mono text-sm max-w-2xl">
              Whether you need penetration testing, AI-powered security solutions, or Secure Full stack development,
              I&apos;m here to help secure your digital assets. Let&apos;s build something bulletproof together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-border px-6 py-3 text-green-400 font-mono hover:neon-glow transition-all duration-300"
              >
                [SCHEDULE_CONSULTATION]
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-border px-6 py-3 text-red-400 font-mono hover:neon-glow transition-all duration-300"
              >
                [EMERGENCY_RESPONSE]
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;