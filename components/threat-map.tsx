'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, AlertTriangle, Activity } from 'lucide-react';

type AttackLine = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'ddos' | 'intrusion' | 'malware' | 'phishing';
  duration: number;
};

type AttackNode = {
  x: number;
  y: number;
  label: string;
  country: string;
  active: boolean;
};

const ATTACK_NODES: AttackNode[] = [
  { x: 52, y: 25, label: 'London', country: 'GB', active: true },
  { x: 55, y: 27, label: 'Berlin', country: 'DE', active: true },
  { x: 12, y: 32, label: 'New York', country: 'US', active: true },
  { x: 8, y: 40, label: 'Los Angeles', country: 'US', active: false },
  { x: 78, y: 32, label: 'Beijing', country: 'CN', active: true },
  { x: 82, y: 38, label: 'Tokyo', country: 'JP', active: true },
  { x: 65, y: 45, label: 'Mumbai', country: 'IN', active: false },
  { x: 30, y: 50, label: 'São Paulo', country: 'BR', active: true },
  { x: 57, y: 18, label: 'Moscow', country: 'RU', active: true },
  { x: 72, y: 58, label: 'Sydney', country: 'AU', active: false },
  { x: 48, y: 35, label: 'Paris', country: 'FR', active: true },
  { x: 25, y: 35, label: 'Toronto', country: 'CA', active: false },
  { x: 50, y: 48, label: 'Cairo', country: 'EG', active: true },
  { x: 68, y: 30, label: 'Dubai', country: 'AE', active: false },
  { x: 88, y: 30, label: 'Seoul', country: 'KR', active: true },
];

const ATTACK_TYPES = ['ddos', 'intrusion', 'malware', 'phishing'] as const;

const TYPE_COLORS: Record<string, string> = {
  ddos: '#ff4444',
  intrusion: '#ff8800',
  malware: '#ff44aa',
  phishing: '#ffcc00',
};

function generateAttack(id: number): AttackLine {
  const src = ATTACK_NODES[Math.floor(Math.random() * ATTACK_NODES.length)];
  let dst = ATTACK_NODES[Math.floor(Math.random() * ATTACK_NODES.length)];
  while (dst === src) dst = ATTACK_NODES[Math.floor(Math.random() * ATTACK_NODES.length)];
  return {
    id,
    x1: src.x,
    y1: src.y,
    x2: dst.x,
    y2: dst.y,
    type: ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)],
    duration: 2.5 + Math.random() * 2,
  };
}

const LIVE_ALERTS = [
  { msg: 'DDoS attack detected from AS4134 (China Telecom)', severity: 'HIGH' },
  { msg: 'SQL injection attempt on 10.0.0.45:3306', severity: 'MEDIUM' },
  { msg: 'Brute-force SSH detected: 1,240 attempts/min', severity: 'HIGH' },
  { msg: 'Ransomware signature found in email attachment', severity: 'CRITICAL' },
  { msg: 'Unauthorized API key usage detected', severity: 'MEDIUM' },
  { msg: 'Zero-day exploit attempt: CVE-2024-3400', severity: 'CRITICAL' },
  { msg: 'Lateral movement detected in 192.168.0.0/24', severity: 'HIGH' },
];

export function ThreatMap() {
  const [attacks, setAttacks] = useState<AttackLine[]>([]);
  const [alerts, setAlerts] = useState<{ id: number; msg: string; severity: string }[]>([]);
  const [counter, setCounter] = useState(0);
  const idRef = useRef(0);
  const alertIdRef = useRef(0);

  useEffect(() => {
    const addAttack = () => {
      const attack = generateAttack(idRef.current++);
      setAttacks((prev) => [...prev.slice(-15), attack]);
      setTimeout(() => {
        setAttacks((prev) => prev.filter((a) => a.id !== attack.id));
      }, attack.duration * 1000 + 500);
    };

    const addAlert = () => {
      const alert = LIVE_ALERTS[alertIdRef.current % LIVE_ALERTS.length];
      const id = alertIdRef.current++;
      setAlerts((prev) => [{ id, ...alert }, ...prev.slice(0, 4)]);
      setCounter((c) => c + 1);
    };

    addAttack();
    addAlert();

    const attackInterval = setInterval(addAttack, 1400);
    const alertInterval = setInterval(addAlert, 2200);

    return () => {
      clearInterval(attackInterval);
      clearInterval(alertInterval);
    };
  }, []);

  const severityColor: Record<string, string> = {
    LOW: '#00ff88',
    MEDIUM: '#ffcc00',
    HIGH: '#ff8800',
    CRITICAL: '#ff4444',
  };

  return (
    <section id="threatmap" className="py-24 px-6 relative overflow-hidden" style={{ background: '#030608' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(0,20,50,0.8) 0%, #030608 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.25)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#ff4444', boxShadow: '0 0 6px #ff4444', animation: 'blink 1.5s ease-in-out infinite' }}
              />
              <span className="text-xs tracking-wide font-medium" style={{ color: '#ff6666' }}>
                LIVE THREAT INTELLIGENCE
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
              Global Cyber Threat Map
            </h2>
          </div>
          <div className="flex gap-4">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span className="text-xs capitalize" style={{ color: 'rgba(160,190,220,0.6)' }}>
                  {type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-5">
          {/* Map */}
          <motion.div
            className="lg:col-span-3 rounded-2xl overflow-hidden relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(0,8,20,0.9)',
              border: '1px solid rgba(0,100,200,0.2)',
              height: 440,
            }}
          >
            <svg
              viewBox="0 0 100 60"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 30px rgba(0,60,150,0.3))' }}
            >
              {/* World map simplified */}
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,100,200,0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect width="100" height="60" fill="url(#mapGlow)" />

              {/* Grid lines */}
              {Array.from({ length: 7 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1="0" y1={i * 10} x2="100" y2={i * 10}
                  stroke="rgba(0,100,200,0.1)" strokeWidth="0.2"
                />
              ))}
              {Array.from({ length: 11 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 10} y1="0" x2={i * 10} y2="60"
                  stroke="rgba(0,100,200,0.1)" strokeWidth="0.2"
                />
              ))}

              {/* Continent shapes (simplified) */}
              {/* North America */}
              <path d="M5,15 L25,12 L28,18 L30,30 L22,40 L12,38 L8,28 Z" fill="rgba(0,60,150,0.25)" stroke="rgba(0,120,255,0.3)" strokeWidth="0.3" />
              {/* South America */}
              <path d="M22,40 L32,38 L34,52 L26,56 L18,50 Z" fill="rgba(0,60,150,0.25)" stroke="rgba(0,120,255,0.3)" strokeWidth="0.3" />
              {/* Europe */}
              <path d="M44,14 L58,12 L60,20 L54,24 L46,22 Z" fill="rgba(0,60,150,0.25)" stroke="rgba(0,120,255,0.3)" strokeWidth="0.3" />
              {/* Africa */}
              <path d="M46,24 L58,22 L60,42 L52,48 L44,42 L42,30 Z" fill="rgba(0,60,150,0.25)" stroke="rgba(0,120,255,0.3)" strokeWidth="0.3" />
              {/* Asia */}
              <path d="M58,12 L90,10 L92,32 L82,38 L70,36 L60,28 L58,22 Z" fill="rgba(0,60,150,0.25)" stroke="rgba(0,120,255,0.3)" strokeWidth="0.3" />
              {/* Australia */}
              <path d="M72,50 L84,48 L86,56 L78,58 Z" fill="rgba(0,60,150,0.25)" stroke="rgba(0,120,255,0.3)" strokeWidth="0.3" />

              {/* Attack lines */}
              {attacks.map((attack) => (
                <AttackBeam key={attack.id} attack={attack} />
              ))}

              {/* City nodes */}
              {ATTACK_NODES.map((node, i) => (
                <g key={i}>
                  {node.active && (
                    <>
                      <circle
                        cx={node.x} cy={node.y} r="1.2"
                        fill="rgba(0,245,255,0.3)"
                        stroke="none"
                      >
                        <animate
                          attributeName="r" values="1.2;2.2;1.2"
                          dur="3s" repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity" values="0.3;0;0.3"
                          dur="3s" repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx={node.x} cy={node.y} r="0.5"
                        fill="#00f5ff"
                        opacity="0.9"
                      />
                    </>
                  )}
                  {!node.active && (
                    <circle cx={node.x} cy={node.y} r="0.4" fill="rgba(0,245,255,0.3)" />
                  )}
                </g>
              ))}
            </svg>

            {/* Live counter */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-2"
              style={{ color: 'rgba(0,245,255,0.6)' }}
            >
              <Activity size={12} />
              <span className="terminal-font text-xs">
                {counter} attacks intercepted this session
              </span>
            </div>
          </motion.div>

          {/* Alert feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} style={{ color: '#ff6644' }} />
              <span className="text-sm font-semibold" style={{ color: '#e8f4ff' }}>
                Live Alerts
              </span>
            </div>

            <div className="flex flex-col gap-2 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl p-3"
                    style={{
                      background: 'rgba(10,15,30,0.8)',
                      border: `1px solid ${severityColor[alert.severity]}20`,
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: severityColor[alert.severity] }}
                      />
                      <span
                        className="text-[10px] font-bold tracking-wider"
                        style={{ color: severityColor[alert.severity] }}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs leading-snug" style={{ color: 'rgba(160,190,220,0.8)' }}>
                      {alert.msg}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Stats */}
            <div
              className="mt-auto rounded-xl p-4"
              style={{
                background: 'rgba(0,245,255,0.04)',
                border: '1px solid rgba(0,245,255,0.1)',
              }}
            >
              <div className="text-xs mb-3 font-semibold" style={{ color: 'rgba(0,245,255,0.7)' }}>
                Threat Distribution
              </div>
              {ATTACK_TYPES.map((type) => (
                <div key={type} className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-sm" style={{ background: TYPE_COLORS[type] }} />
                  <span className="text-xs capitalize flex-1" style={{ color: 'rgba(160,190,220,0.6)' }}>
                    {type}
                  </span>
                  <div
                    className="w-16 h-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: TYPE_COLORS[type],
                        width: `${30 + Math.random() * 60}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AttackBeam({ attack }: { attack: AttackLine }) {
  const color = TYPE_COLORS[attack.type];
  const pathLength = Math.sqrt(
    Math.pow(attack.x2 - attack.x1, 2) + Math.pow(attack.y2 - attack.y1, 2)
  );

  const cx = (attack.x1 + attack.x2) / 2;
  const cy = Math.min(attack.y1, attack.y2) - pathLength * 0.2;
  const pathD = `M ${attack.x1} ${attack.y1} Q ${cx} ${cy} ${attack.x2} ${attack.y2}`;

  return (
    <g>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="0.25"
        opacity="0.4"
        strokeDasharray={pathLength * 2}
        strokeDashoffset={pathLength * 2}
        style={{
          animation: `attack-beam ${attack.duration}s ease-in-out forwards`,
        }}
      />
      <circle cx={attack.x2} cy={attack.y2} r="0.5" fill={color} opacity="0.8">
        <animate attributeName="r" values="0.5;1;0.5" dur="0.5s" repeatCount="3" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="0.5s" repeatCount="3" />
      </circle>
    </g>
  );
}
