'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Learn', href: '#features' },
  { label: 'Simulations', href: '#terminal' },
  { label: 'Threat Map', href: '#threatmap' },
  { label: 'Roadmap', href: '#learning' },
  { label: 'About', href: '#testimonials' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          background: scrolled ? 'rgba(5, 8, 15, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,102,255,0.15))',
                border: '1px solid rgba(0,245,255,0.4)',
              }}
            >
              <Shield size={16} color="#00f5ff" />
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: '0 0 15px rgba(0,245,255,0.4)' }}
              />
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-base font-semibold tracking-tight"
                style={{ color: '#fff' }}
              >
                CyberScope
              </span>
              <span
                className="text-base font-semibold tracking-tight"
                style={{ color: '#00ff88' }}
              >
                AI
              </span>
            </div>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors relative group"
                style={{ color: 'rgba(200,220,240,0.7)' }}
                whileHover={{ color: '#00f5ff' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: '#00f5ff' }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              className="px-4 py-2 text-sm rounded-lg btn-cyber"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className="px-4 py-2 text-sm rounded-lg btn-solid-cyber flex items-center gap-1.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap size={14} />
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden p-2"
            style={{ color: '#00f5ff' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Active indicator bar */}
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{
            background: scrolled ? 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)' : 'transparent',
          }}
        />
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-[99] md:hidden"
            style={{
              background: 'rgba(5, 8, 15, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,245,255,0.1)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm py-2"
                  style={{ color: 'rgba(200,220,240,0.8)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full py-2.5 text-sm rounded-lg btn-solid-cyber mt-2">
                Get Started Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
