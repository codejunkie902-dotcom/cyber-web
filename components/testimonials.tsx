'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Senior Penetration Tester',
    company: 'CrowdStrike',
    avatar: 'AC',
    color: '#00f5ff',
    rating: 5,
    text: 'CyberScope AI completely transformed how I think about security education. The interactive labs are more realistic than any training I had in a corporate environment. I passed my OSCP on the first attempt after 3 months here.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Security Operations Analyst',
    company: 'Palo Alto Networks',
    avatar: 'SM',
    color: '#00ff88',
    rating: 5,
    text: 'The AI-powered threat simulation is incredibly realistic. I\'ve used 5+ security platforms and none compare to the depth of knowledge you gain here. The 3D threat visualization alone is worth the subscription.',
  },
  {
    name: 'Marcus Webb',
    role: 'CISO',
    company: 'TechVenture Group',
    avatar: 'MW',
    color: '#0099ff',
    rating: 5,
    text: 'We onboarded our entire security team using CyberScope AI. The structured learning path from beginner to expert is exactly what enterprise teams need. ROI was immediate — our incident response time dropped by 40%.',
  },
  {
    name: 'Priya Sharma',
    role: 'Bug Bounty Hunter',
    company: 'Independent Researcher',
    avatar: 'PS',
    color: '#ffaa00',
    rating: 5,
    text: 'As someone who shifted careers from software development, CyberScope AI made the transition painless. The terminal labs feel like real pentesting environments. I\'ve earned $85K in bug bounties this year alone.',
  },
  {
    name: 'David Okafor',
    role: 'Malware Analyst',
    company: 'Mandiant',
    avatar: 'DO',
    color: '#ff6644',
    rating: 5,
    text: 'The malware analysis module is exceptional. Sandboxed VMs, real samples, and AI-guided analysis — it\'s the closest thing to hands-on experience without putting real systems at risk. A must for every analyst.',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [auto]);

  const prev = () => {
    setAuto(false);
    setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setAuto(false);
    setCurrent((i) => (i + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#030810' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,60,150,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
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
            <Star size={12} style={{ color: '#00f5ff' }} fill="#00f5ff" />
            <span className="text-xs tracking-wide font-medium" style={{ color: '#00f5ff' }}>
              COMMUNITY VOICES
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
            What Security Professionals Say
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative rounded-2xl p-8 lg:p-10"
              style={{
                background: 'rgba(8,14,30,0.8)',
                border: `1px solid ${t.color}25`,
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, transparent, ${t.color}60, transparent)`,
                }}
              />

              {/* Quote icon */}
              <Quote
                size={40}
                className="absolute top-6 right-8 opacity-10"
                style={{ color: t.color }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star key={i} size={16} fill="#ffcc00" style={{ color: '#ffcc00' }} />
                ))}
              </div>

              {/* Quote text */}
              <p
                className="text-xl lg:text-2xl leading-relaxed font-medium mb-8"
                style={{ color: 'rgba(220,235,250,0.9)' }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}30, ${t.color}10)`,
                    border: `1px solid ${t.color}40`,
                    color: t.color,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold" style={{ color: '#e8f4ff' }}>
                    {t.name}
                  </div>
                  <div className="text-sm" style={{ color: 'rgba(120,160,200,0.7)' }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAuto(false); setCurrent(i); }}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === current ? '#00f5ff' : 'rgba(0,245,255,0.2)',
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0,245,255,0.06)',
                  border: '1px solid rgba(0,245,255,0.15)',
                  color: 'rgba(0,245,255,0.7)',
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0,245,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0,245,255,0.06)',
                  border: '1px solid rgba(0,245,255,0.15)',
                  color: 'rgba(0,245,255,0.7)',
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0,245,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Company logos row */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12 opacity-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
        >
          {['CrowdStrike', 'Palo Alto', 'Mandiant', 'Rapid7', 'Tenable', 'Fortinet'].map((co) => (
            <div
              key={co}
              className="text-sm font-bold tracking-wider"
              style={{ color: 'rgba(160,190,220,0.8)' }}
            >
              {co}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
