'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, CheckCircle, Clock, Star } from 'lucide-react';

const modules = [
  {
    level: 'BEGINNER',
    color: '#00ff88',
    title: 'Foundations of Security',
    subtitle: 'Build your security mindset',
    duration: '4 weeks',
    topics: [
      'CIA Triad & Security Principles',
      'Networking Fundamentals',
      'Linux Command Line Basics',
      'Cryptography Essentials',
      'Introduction to Ethical Hacking',
    ],
    completed: true,
  },
  {
    level: 'INTERMEDIATE',
    color: '#00f5ff',
    title: 'Penetration Testing',
    subtitle: 'Learn offensive techniques',
    duration: '6 weeks',
    topics: [
      'Reconnaissance & OSINT',
      'Vulnerability Scanning with Nmap',
      'Web Application Attacks (OWASP Top 10)',
      'Exploitation with Metasploit',
      'Post-Exploitation & Persistence',
    ],
    completed: false,
    active: true,
  },
  {
    level: 'ADVANCED',
    color: '#0099ff',
    title: 'Network Defense & SOC',
    subtitle: 'Defend enterprise systems',
    duration: '8 weeks',
    topics: [
      'SIEM & Log Analysis',
      'Incident Response Procedures',
      'Malware Reverse Engineering',
      'Threat Hunting Methodology',
      'Digital Forensics',
    ],
    completed: false,
  },
  {
    level: 'EXPERT',
    color: '#ff8800',
    title: 'Red Team Operations',
    subtitle: 'Master adversarial simulation',
    duration: '10 weeks',
    topics: [
      'Advanced Persistent Threats (APT)',
      'Active Directory Attacks',
      'Cloud Security Penetration Testing',
      'Custom Exploit Development',
      'Red Team Report Writing',
    ],
    completed: false,
    locked: true,
  },
];

export function LearningPath() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <section id="learning" className="py-24 px-6 relative" style={{ background: '#05080f' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(0,102,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)' }}
          >
            <Star size={12} style={{ color: '#00f5ff' }} />
            <span className="text-xs tracking-wide font-medium" style={{ color: '#00f5ff' }}>
              STRUCTURED LEARNING PATHS
            </span>
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #fff, #a0c8ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Your Cybersecurity Roadmap
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(140,170,200,0.8)' }}>
            A guided journey from complete beginner to certified security expert, with
            hands-on labs at every step.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,245,255,0.3), rgba(0,245,255,0.1), transparent)' }}
          />

          <div className="space-y-4">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <PathModule
                  module={mod}
                  index={i}
                  isOpen={expanded === i}
                  onToggle={() => setExpanded(expanded === i ? null : i)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PathModule({
  module,
  index,
  isOpen,
  onToggle,
}: {
  module: (typeof modules)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="md:pl-16 relative">
      {/* Timeline dot */}
      <div
        className="absolute left-4.5 top-5 w-3 h-3 rounded-full hidden md:flex items-center justify-center"
        style={{
          background: module.completed ? module.color : module.active ? module.color : 'rgba(50,70,100,0.8)',
          border: `1px solid ${module.color}`,
          boxShadow: module.active ? `0 0 12px ${module.color}` : 'none',
          left: '18px',
        }}
      >
        {module.completed && <CheckCircle size={8} style={{ color: '#05080f' }} />}
      </div>

      <div
        className="rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: isOpen
            ? `linear-gradient(135deg, ${module.color}08, rgba(5,8,15,0.9))`
            : 'rgba(8,12,24,0.6)',
          border: `1px solid ${isOpen ? module.color + '40' : 'rgba(0,245,255,0.08)'}`,
          transition: 'all 0.3s ease',
        }}
        onClick={onToggle}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
              style={{
                background: `${module.color}15`,
                border: `1px solid ${module.color}30`,
                color: module.color,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-[10px] font-bold tracking-widest"
                  style={{ color: module.color }}
                >
                  {module.level}
                </span>
                {module.completed && (
                  <CheckCircle size={12} style={{ color: module.color }} />
                )}
                {module.locked && (
                  <Lock size={11} style={{ color: 'rgba(160,190,220,0.4)' }} />
                )}
                {module.active && (
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: `${module.color}20`,
                      color: module.color,
                      border: `1px solid ${module.color}30`,
                    }}
                  >
                    IN PROGRESS
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold" style={{ color: '#e8f4ff' }}>
                {module.title}
              </h3>
              <p className="text-xs" style={{ color: 'rgba(140,170,200,0.6)' }}>
                {module.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5">
              <Clock size={12} style={{ color: 'rgba(0,245,255,0.4)' }} />
              <span className="text-xs" style={{ color: 'rgba(140,170,200,0.6)' }}>
                {module.duration}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} style={{ color: 'rgba(0,245,255,0.5)' }} />
            </motion.div>
          </div>
        </div>

        {/* Expandable topics */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="px-5 pb-5"
                style={{ borderTop: `1px solid ${module.color}15` }}
              >
                <div className="grid sm:grid-cols-2 gap-2 pt-4">
                  {module.topics.map((topic, j) => (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.05 }}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: module.color }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: 'rgba(180,210,230,0.8)' }}
                      >
                        {topic}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {!module.locked && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: `${module.color}15`,
                      border: `1px solid ${module.color}40`,
                      color: module.color,
                    }}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${module.color}30` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {module.completed
                      ? 'Review Module'
                      : module.active
                      ? 'Continue Learning'
                      : 'Start Module'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
