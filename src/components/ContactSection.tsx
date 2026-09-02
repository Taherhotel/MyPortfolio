'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">
              Let&apos;s <span className="text-red-400">Connect.</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-400 to-purple-500 mb-6"></div>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you need security consulting, a scalable full-stack solution, or an AI-powered system—I&apos;m ready to collaborate.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a href="mailto:hotelwalataher@gmail.com" className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors border border-white/5 group">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">SECURE_EMAIL</div>
                <div className="text-gray-300 group-hover:text-white transition-colors">hotelwalataher@gmail.com</div>
              </div>
            </a>
            
            <a href="https://github.com/Taherhotel" target="_blank" rel="noreferrer" className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors border border-white/5 group">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">GITHUB</div>
                <div className="text-gray-300 group-hover:text-white transition-colors">github.com/Taherhotel</div>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/taher-hotelwala-3501b3295/" target="_blank" rel="noreferrer" className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors border border-white/5 group">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">LINKEDIN</div>
                <div className="text-gray-300 group-hover:text-white transition-colors">Connect with me</div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-panel p-8 rounded-2xl border border-white/10 relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/10 rounded-full blur-xl pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-white">Send Message</h3>
                <span className="text-[10px] uppercase font-mono text-gray-500 px-2 py-1 bg-white/5 rounded border border-white/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  Encrypted
                </span>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Project details or inquiry..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 font-mono text-sm">
                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                    Transmitting...
                  </span>
                ) : (
                  <span className="font-mono text-sm">Submit Request</span>
                )}
              </button>
            </form>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}