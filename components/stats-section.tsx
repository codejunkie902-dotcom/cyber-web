'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Shield, Cpu } from 'lucide-react';

const stats = [
  {
    icon: Shield,
    value: 2847391,
    suffix: '+',
    label: 'Threats Analyzed',
    description: 'Malware samples processed by AI',
    color: '#00f5ff',
    format: (n: number) =>
      n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n.toLocaleString(),
  },
  {
    icon: Users,
    value: 52400,
    suffix: '+',
    label: 'Active Learners',
    description: 'Security professionals trained',
    color: '#00ff88',
    format: (n: number) =>
      n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n.toLocaleString(),
  },
  {
    icon: Cpu,
    value: 180000,
    suffix: '+',
    label: 'Simulations Run',
    description: 'Lab environments launched',
    color: '#0099ff',
    format: (n: number) =>
      n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n.toLocaleString(),
  },
  {
    icon: TrendingUp,
    value: 98.6,
    suffix: '%',
    label: 'Detection Rate',
    description: 'Threat identification accuracy',
    color: '#ffcc00',
    format: (n: number) => n.toFixed(1),
  },
];

function Counter({
  value,
  format,
  suffix,
  color,
  active,
}: {
  value: number;
  format: (n: number) => string;
  suffix: string;
  color: string;
  active: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * value * 10) / 10);

      if (step >= steps) {
        clearInterval(timer);
        setCurrent(value);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, active]);

  return (
    <span
      className="text-5xl lg:text-6xl font-bold tracking-tight"
      style={{
        background: `linear-gradient(135deg, ${color}, #ffffff)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: 'none',
      }}
    >
      {format(current)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="stats"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#05080f' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,50,120,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 cyber-grid opacity-15" />

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
              BY THE NUMBERS
            </span>
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #fff, #a0c8ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Trusted by Security Professionals
            <br />
            Around the World
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl text-center overflow-hidden"
                style={{
                  background: 'rgba(8,14,30,0.7)',
                  border: '1px solid rgba(0,245,255,0.08)',
                  transition: 'all 0.4s ease',
                }}
                whileHover={{ y: -4 }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${stat.color}10, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: `${stat.color}12`,
                      border: `1px solid ${stat.color}25`,
                    }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>

                  <Counter
                    value={stat.value}
                    format={stat.format}
                    suffix={stat.suffix}
                    color={stat.color}
                    active={inView}
                  />

                  <div
                    className="text-base font-bold mt-2 mb-1"
                    style={{ color: '#e8f4ff' }}
                  >
                    {stat.label}
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(120,160,200,0.6)' }}>
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl p-8 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.08), rgba(0,245,255,0.05))',
            border: '1px solid rgba(0,245,255,0.15)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,245,255,0.02) 0px, rgba(0,245,255,0.02) 1px, transparent 1px, transparent 12px)',
            }}
          />
          <div className="relative z-10">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: '#e8f4ff' }}
            >
              Join the Next Generation of Cyber Defenders
            </h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(140,170,200,0.7)' }}>
              Get instant access to 200+ labs, real threat scenarios, and an AI tutor.
            </p>
            <motion.button
              className="px-8 py-3 rounded-xl btn-solid-cyber text-sm font-bold inline-flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Free — No Credit Card
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
