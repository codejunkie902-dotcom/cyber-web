'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Linkedin, Youtube, ArrowRight, Mail } from 'lucide-react';

const footerLinks = {
  Platform: ['Ethical Hacking Labs', 'Malware Analysis', 'Network Defense', 'AI Security Assistant', 'CTF Challenges'],
  Resources: ['Documentation', 'Blog', 'Threat Reports', 'Security Research', 'CVE Database'],
  Company: ['About Us', 'Careers', 'Press Kit', 'Partners', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'],
};

const socials = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#020508' }}
    >
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), rgba(0,255,136,0.2), rgba(0,245,255,0.4), transparent)',
        }}
      />

      {/* Particle effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,245,255,0.5), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* Newsletter CTA */}
        <motion.div
          className="rounded-2xl p-8 lg:p-10 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.08), rgba(0,245,255,0.05))',
            border: '1px solid rgba(0,245,255,0.12)',
          }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(60deg, rgba(0,245,255,0.02) 0px, rgba(0,245,255,0.02) 1px, transparent 1px, transparent 20px)',
            }}
          />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl font-black mb-2"
                style={{ color: '#e8f4ff' }}
              >
                Stay Ahead of Threats
              </h3>
              <p className="text-sm" style={{ color: 'rgba(140,170,200,0.7)' }}>
                Weekly threat intelligence, CVE alerts, and security tutorials. No spam.
              </p>
            </div>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl"
                style={{
                  background: 'rgba(0,255,136,0.1)',
                  border: '1px solid rgba(0,255,136,0.3)',
                  color: '#00ff88',
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: '#00ff88' }} />
                <span className="text-sm font-medium">Subscribed! Check your inbox.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-72">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'rgba(0,245,255,0.4)' }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: 'rgba(0,245,255,0.05)',
                      border: '1px solid rgba(0,245,255,0.15)',
                      color: '#e8f4ff',
                    }}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-5 py-3 rounded-xl btn-solid-cyber text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                  <ArrowRight size={14} />
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,102,255,0.15))',
                  border: '1px solid rgba(0,245,255,0.4)',
                }}
              >
                <Shield size={16} color="#00f5ff" />
              </div>
              <span className="font-black text-sm tracking-wider" style={{ color: '#fff' }}>
                CYBERSCOPE<span style={{ color: '#00ff88' }}>AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(120,160,200,0.6)' }}>
              The world&apos;s most advanced cybersecurity education platform. Learn by doing.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(0,245,255,0.05)',
                    border: '1px solid rgba(0,245,255,0.1)',
                    color: 'rgba(0,245,255,0.5)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: 'rgba(0,245,255,0.4)',
                    color: '#00f5ff',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs font-bold tracking-widest mb-4"
                style={{ color: 'rgba(0,245,255,0.6)' }}
              >
                {category.toUpperCase()}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(120,160,200,0.6)' }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = 'rgba(0,245,255,0.9)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.color = 'rgba(120,160,200,0.6)';
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(0,245,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(100,140,180,0.5)' }}>
            © 2026 CyberScope AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-1.5 text-xs"
              style={{ color: 'rgba(0,255,136,0.5)' }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#00ff88',
                  boxShadow: '0 0 4px #00ff88',
                  animation: 'blink 2s ease-in-out infinite',
                }}
              />
              All systems operational
            </div>
            <span className="text-xs" style={{ color: 'rgba(100,140,180,0.4)' }}>
              SOC 2 Type II Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
