'use client';

import { motion } from 'framer-motion';
import {
  Terminal,
  Brain,
  Bug,
  Network,
  Globe,
  Trophy,
  ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: 'Ethical Hacking Labs',
    description:
      'Practice penetration testing in isolated virtual environments. Real tools, real techniques, zero risk.',
    color: '#00f5ff',
    gradient: 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(0,102,255,0.05))',
    tag: 'HANDS-ON',
  },
  {
    icon: Brain,
    title: 'AI Security Assistant',
    description:
      'Chat with an AI trained on 10M+ security reports. Get instant answers about threats, CVEs, and defenses.',
    color: '#00ff88',
    gradient: 'linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,200,100,0.05))',
    tag: 'AI-POWERED',
  },
  {
    icon: Bug,
    title: 'Malware Analysis',
    description:
      'Dissect real malware samples in sandboxed VMs. Understand behavior, reverse engineer payloads.',
    color: '#ff6644',
    gradient: 'linear-gradient(135deg, rgba(255,100,68,0.1), rgba(200,50,30,0.05))',
    tag: 'ADVANCED',
  },
  {
    icon: Network,
    title: 'Network Monitoring',
    description:
      'Visualize live traffic flows, detect anomalies, and practice defensive security operations in real time.',
    color: '#00aaff',
    gradient: 'linear-gradient(135deg, rgba(0,170,255,0.1), rgba(0,100,200,0.05))',
    tag: 'BLUE TEAM',
  },
  {
    icon: Globe,
    title: 'Dark Web Intelligence',
    description:
      'Monitor threat actor activity, track data breaches, and understand underground marketplaces safely.',
    color: '#aa88ff',
    gradient: 'linear-gradient(135deg, rgba(170,136,255,0.1), rgba(100,60,200,0.05))',
    tag: 'OSINT',
  },
  {
    icon: Trophy,
    title: 'Security Challenges',
    description:
      'CTF-style challenges from beginner to expert. Earn badges, climb leaderboards, prove your skills.',
    color: '#ffcc00',
    gradient: 'linear-gradient(135deg, rgba(255,204,0,0.1), rgba(200,150,0,0.05))',
    tag: 'GAMIFIED',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 relative" style={{ background: '#05080f' }}>
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,102,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)' }}
          >
            <span className="text-xs tracking-wide font-medium" style={{ color: '#00f5ff' }}>
              PLATFORM CAPABILITIES
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
            Everything You Need to
            <br />
            Master Cybersecurity
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(140,170,200,0.8)' }}>
            A complete ecosystem for learning offensive and defensive security
            through real-world simulations.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
}: {
  feature: (typeof features)[number];
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      className="group relative p-6 rounded-2xl h-full cursor-pointer overflow-hidden"
      style={{
        background: feature.gradient,
        border: `1px solid ${feature.color}20`,
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 30% 30%, ${feature.color}10, transparent)`,
          boxShadow: `inset 0 1px 0 ${feature.color}30`,
        }}
      />

      {/* Animated border top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Tag */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[10px] font-bold tracking-widest px-2 py-1 rounded"
            style={{
              background: `${feature.color}15`,
              color: feature.color,
              border: `1px solid ${feature.color}25`,
            }}
          >
            {feature.tag}
          </span>
          <ChevronRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 duration-300"
            style={{ color: feature.color }}
          />
        </div>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
          style={{
            background: `${feature.color}12`,
            border: `1px solid ${feature.color}30`,
          }}
        >
          <Icon size={22} style={{ color: feature.color }} />
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ boxShadow: `0 0 20px ${feature.color}40` }}
          />
        </div>

        <h3 className="text-lg font-bold mb-2" style={{ color: '#e8f4ff' }}>
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(140,170,200,0.75)' }}>
          {feature.description}
        </p>

        {/* Bottom link */}
        <div
          className="flex items-center gap-1 mt-5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
          style={{ color: feature.color }}
        >
          Explore module
          <ChevronRight size={12} />
        </div>
      </div>
    </motion.div>
  );
}
