'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Shield, Zap, Lock } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useAuthModal } from '@/components/auth-modal';

const CyberGlobe = dynamic(
  () => import('./cyber-globe').then((m) => ({ default: m.CyberGlobe })),
  { ssr: false, loading: () => <GlobePlaceholder /> }
);

function GlobePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-80 h-80 rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
          border: '1px solid rgba(0,245,255,0.1)',
        }}
      />
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: 6 + Math.random() * 4,
    delay: Math.random() * 5,
    color: i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#00ff88' : '#0066ff',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function HexGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <polygon
            points="28,4 52,16 52,40 28,52 4,40 4,16"
            fill="none"
            stroke="#00f5ff"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { open } = useAuthModal();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#05080f' }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <HexGrid />
      <ParticleField />

      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,102,255,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #05080f)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div style={{ y, opacity }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: 'rgba(0,245,255,0.06)',
                border: '1px solid rgba(0,245,255,0.2)',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#00ff88',
                  boxShadow: '0 0 6px #00ff88',
                }}
              />
              <span className="text-xs font-medium tracking-wide" style={{ color: '#00f5ff' }}>
                AI-powered cybersecurity education
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-4"
              style={{ color: '#f0f6ff' }}
            >
              Learn{' '}
              <span style={{ color: '#00f5ff' }}>ethical hacking</span>
              <br />
              through hands-on simulation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: 'rgba(160,190,220,0.8)' }}
            >
              Practice real-world hacking, network defense, and threat analysis
              in safe, guided labs — and learn by actually doing it.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                onClick={() => open('signup')}
                className="group px-7 py-3.5 rounded-xl btn-solid-cyber flex items-center gap-2 text-sm font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap size={16} />
                Start Learning
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </motion.button>
              <motion.button
                onClick={() => {
                  document
                    .getElementById('terminal')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-7 py-3.5 rounded-xl btn-cyber flex items-center gap-2 text-sm font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={14} />
                Explore Simulations
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: <Shield size={14} />, text: 'SOC 2 Certified' },
                { icon: <Lock size={14} />, text: '256-bit Encryption' },
                { icon: <Zap size={14} />, text: '50K+ Learners' },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: 'rgba(120,160,190,0.7)' }}
                >
                  <span style={{ color: '#00f5ff' }}>{icon}</span>
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative h-[500px] lg:h-[620px]"
            style={{ y: useTransform(scrollY, [0, 600], [0, -60]) }}
          >
            {/* Glow behind globe */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,102,255,0.12) 0%, transparent 70%)',
              }}
            />
            <Suspense fallback={<GlobePlaceholder />}>
              <CyberGlobe />
            </Suspense>

            {/* Floating info cards */}
            <motion.div
              className="absolute top-12 -left-4 glass rounded-xl px-4 py-3 hidden lg:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }}
                />
                <span className="text-xs terminal-font" style={{ color: '#00ff88' }}>
                  THREAT DETECTED
                </span>
              </div>
              <div
                className="text-xs mt-1 terminal-font"
                style={{ color: 'rgba(160,200,220,0.6)' }}
              >
                172.16.0.4 → 10.0.0.1
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-20 -right-4 glass rounded-xl px-4 py-3 hidden lg:block"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
            >
              <div
                className="text-xs font-bold mb-1"
                style={{ color: '#00f5ff' }}
              >
                AI ANALYSIS
              </div>
              <div className="w-24 h-1 rounded-full" style={{ background: 'rgba(0,245,255,0.1)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: '#00f5ff' }}
                  animate={{ width: ['30%', '85%', '60%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div
                className="text-xs mt-1 terminal-font"
                style={{ color: 'rgba(160,200,220,0.6)' }}
              >
                Analyzing patterns...
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs tracking-wide" style={{ color: 'rgba(160,190,220,0.5)' }}>
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,245,255,0.6), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
