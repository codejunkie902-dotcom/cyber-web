'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const steps = [
      { target: 30, delay: 100 },
      { target: 60, delay: 400 },
      { target: 85, delay: 700 },
      { target: 100, delay: 1100 },
    ];

    steps.forEach(({ target, delay }) => {
      setTimeout(() => {
        setProgress(target);
        if (target === 100) {
          setTimeout(() => {
            setPhase('done');
            setTimeout(() => setVisible(false), 600);
          }, 300);
        }
      }, delay);
    });
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#05080f' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 cyber-grid opacity-30" />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,245,255,0.02) 2px, rgba(0,245,255,0.02) 4px)',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-12"
          >
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                width: 120,
                height: 120,
                left: -10,
                top: -10,
                border: '1px solid rgba(0,245,255,0.3)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                width: 140,
                height: 140,
                left: -20,
                top: -20,
                border: '1px dashed rgba(0,255,136,0.15)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Shield icon */}
            <div
              className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,102,255,0.1))',
                border: '1px solid rgba(0,245,255,0.4)',
                boxShadow: '0 0 40px rgba(0,245,255,0.3)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 4L6 10V20C6 28.8 12.6 37 20 39C27.4 37 34 28.8 34 20V10L20 4Z"
                  stroke="#00f5ff"
                  strokeWidth="1.5"
                  fill="rgba(0,245,255,0.05)"
                />
                <path
                  d="M14 20L18 24L26 16"
                  stroke="#00ff88"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-2"
          >
            <span
              className="text-3xl font-semibold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff, #00f5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CyberScope
            </span>
            <span
              className="text-3xl font-semibold tracking-tight ml-2"
              style={{ color: '#00ff88' }}
            >
              AI
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="terminal-font text-xs tracking-[0.15em] mb-12"
            style={{ color: 'rgba(0,245,255,0.5)' }}
          >
            Initializing secure environment
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 relative">
            <div
              className="h-px w-full mb-3"
              style={{ background: 'rgba(0,245,255,0.1)' }}
            >
              <motion.div
                className="h-full loading-bar"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <div className="flex justify-between">
              <span className="terminal-font text-xs" style={{ color: 'rgba(0,245,255,0.4)' }}>
                SYS BOOT
              </span>
              <span
                className="terminal-font text-xs"
                style={{ color: '#00f5ff' }}
              >
                {progress}%
              </span>
            </div>
          </div>

          {/* Status messages */}
          <motion.div
            className="absolute bottom-12 terminal-font text-xs"
            style={{ color: 'rgba(0,245,255,0.3)' }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {progress < 30 && '> Establishing encrypted connection...'}
            {progress >= 30 && progress < 60 && '> Loading threat intelligence modules...'}
            {progress >= 60 && progress < 85 && '> Initializing AI security core...'}
            {progress >= 85 && '> System ready.'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
