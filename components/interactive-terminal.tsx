'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Maximize2, Minus, X } from 'lucide-react';

type LogEntry = {
  type: 'command' | 'output' | 'error' | 'success' | 'info';
  text: string;
};

const DEMO_SEQUENCE: LogEntry[] = [
  { type: 'command', text: '> nmap -sV -sC 192.168.1.1' },
  { type: 'info', text: 'Starting Nmap 7.94 ( https://nmap.org )' },
  { type: 'output', text: 'Scanning 192.168.1.1 [1000 ports]...' },
  { type: 'success', text: 'PORT     STATE  SERVICE  VERSION' },
  { type: 'output', text: '22/tcp   open   ssh      OpenSSH 8.9' },
  { type: 'output', text: '80/tcp   open   http     Apache httpd 2.4.52' },
  { type: 'output', text: '443/tcp  open   https    nginx 1.22.1' },
  { type: 'error', text: '3389/tcp open   ms-wbt    VULNERABLE: CVE-2024-8841' },
  { type: 'success', text: '[!] 1 vulnerability found' },
  { type: 'command', text: '> exploit --target 192.168.1.1 --vuln CVE-2024-8841' },
  { type: 'info', text: '[*] Initializing exploit module...' },
  { type: 'output', text: '[*] Establishing connection...' },
  { type: 'output', text: '[*] Sending payload (4096 bytes)...' },
  { type: 'success', text: '[+] Connection established!' },
  { type: 'success', text: '[+] Shell obtained: root@target:~#' },
  { type: 'command', text: '> whoami && id' },
  { type: 'success', text: 'root' },
  { type: 'success', text: 'uid=0(root) gid=0(root) groups=0(root)' },
  { type: 'command', text: '> cat /etc/shadow' },
  { type: 'error', text: '[!] Sensitive data exposed — Capture the Flag!' },
  { type: 'info', text: '[CTF] Flag: CyberScope{r00t_pwn_3d_2024}' },
];

const COMMANDS: Record<string, LogEntry[]> = {
  help: [
    { type: 'info', text: 'Available commands:' },
    { type: 'output', text: '  nmap     - Network discovery and port scanning' },
    { type: 'output', text: '  exploit  - Run exploit against target' },
    { type: 'output', text: '  hashcat  - Password hash cracker' },
    { type: 'output', text: '  wireshark- Capture network packets' },
    { type: 'output', text: '  clear    - Clear terminal' },
  ],
  clear: [],
  'hashcat -m 0 hash.txt wordlist.txt': [
    { type: 'info', text: 'hashcat v6.2.6 starting...' },
    { type: 'output', text: 'Dictionary cache built: 14.3M words (143.5MB)' },
    { type: 'output', text: 'Cracking MD5 hashes...' },
    { type: 'success', text: '5f4dcc3b5aa765d61d8327deb882cf99:password123' },
    { type: 'success', text: 'Session completed. Recovered: 1/1 (100%)' },
  ],
};

export function InteractiveTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState('');
  const [autoRunning, setAutoRunning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const runAutoDemo = () => {
    if (autoRunning) return;
    setAutoRunning(true);
    setLogs([]);
    let i = 0;
    const run = () => {
      if (i >= DEMO_SEQUENCE.length) {
        setAutoRunning(false);
        return;
      }
      const entry = DEMO_SEQUENCE[i];
      const delay = entry.type === 'command' ? 800 : 200;
      setTimeout(() => {
        setLogs((prev) => [...prev, entry]);
        i++;
        run();
      }, delay);
    };
    run();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLogs((prev) => [...prev, { type: 'command', text: `> ${cmd}` }]);
    setInput('');

    if (trimmed === 'clear') {
      setLogs([]);
      return;
    }
    const response = COMMANDS[trimmed];
    if (response) {
      response.forEach((entry, i) => {
        setTimeout(() => setLogs((prev) => [...prev, entry]), i * 80);
      });
    } else if (trimmed) {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { type: 'error', text: `bash: ${cmd}: command not found. Type 'help' for commands.` },
        ]);
      }, 150);
    }
  };

  const textColor: Record<LogEntry['type'], string> = {
    command: '#00f5ff',
    output: 'rgba(160,200,220,0.8)',
    error: '#ff4444',
    success: '#00ff88',
    info: 'rgba(0,245,255,0.6)',
  };

  return (
    <section
      id="terminal"
      className="py-24 px-6 relative"
      style={{ background: '#05080f' }}
    >
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)' }}
          >
            <Terminal size={13} style={{ color: '#00ff88' }} />
            <span className="text-xs tracking-wide font-medium" style={{ color: '#00ff88' }}>
              INTERACTIVE LAB
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
            Hack the Terminal
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(140,170,200,0.8)' }}>
            Practice real penetration testing in a safe, simulated environment.
            No harm, all skill.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            border: '1px solid rgba(0,255,136,0.2)',
            boxShadow: '0 0 60px rgba(0,255,136,0.06), 0 40px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{
              background: 'rgba(5,12,25,0.95)',
              borderBottom: '1px solid rgba(0,255,136,0.1)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div
                  className="w-3 h-3 rounded-full cursor-pointer hover:opacity-80"
                  style={{ background: '#ff5f57' }}
                  onClick={() => setLogs([])}
                />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <span
                className="terminal-font text-xs ml-2"
                style={{ color: 'rgba(0,255,136,0.6)' }}
              >
                cyberscope@kali-lab:~#
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={runAutoDemo}
                disabled={autoRunning}
                className="px-3 py-1 rounded text-xs terminal-font disabled:opacity-40"
                style={{
                  background: 'rgba(0,255,136,0.1)',
                  border: '1px solid rgba(0,255,136,0.3)',
                  color: '#00ff88',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {autoRunning ? '▶ Running...' : '▶ Run Demo'}
              </motion.button>
              <Maximize2 size={13} style={{ color: 'rgba(0,255,136,0.3)' }} />
            </div>
          </div>

          {/* Terminal body */}
          <div
            className="relative h-[480px] flex flex-col"
            style={{ background: 'rgba(3,8,18,0.97)' }}
          >
            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,255,136,0.012) 2px, rgba(0,255,136,0.012) 4px)',
              }}
            />

            {/* Log output */}
            <div className="flex-1 overflow-y-auto p-5 space-y-1">
              {logs.length === 0 && (
                <div className="text-center py-8">
                  <p className="terminal-font text-sm mb-2" style={{ color: 'rgba(0,255,136,0.3)' }}>
                    Welcome to CyberScope AI Terminal v4.2.0
                  </p>
                  <p className="terminal-font text-xs" style={{ color: 'rgba(0,255,136,0.2)' }}>
                    Type &apos;help&apos; or click &apos;Run Demo&apos; to begin
                  </p>
                </div>
              )}
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="terminal-font text-sm leading-relaxed"
                  style={{ color: textColor[log.type] }}
                >
                  {log.text}
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input line */}
            <div
              className="flex items-center gap-2 px-5 py-3"
              style={{ borderTop: '1px solid rgba(0,255,136,0.08)' }}
              onClick={() => inputRef.current?.focus()}
            >
              <span className="terminal-font text-sm" style={{ color: '#00ff88' }}>
                $
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim()) handleCommand(input);
                }}
                className="flex-1 bg-transparent outline-none terminal-font text-sm"
                style={{ color: '#00f5ff', caretColor: '#00ff88' }}
                placeholder="Enter command..."
                spellCheck={false}
              />
              <div
                className="w-2 h-4"
                style={{
                  background: '#00ff88',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Suggested commands */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {['help', 'nmap -sV 192.168.1.1', 'hashcat -m 0 hash.txt wordlist.txt'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-3 py-1.5 rounded-lg terminal-font text-xs transition-all"
              style={{
                background: 'rgba(0,245,255,0.05)',
                border: '1px solid rgba(0,245,255,0.15)',
                color: 'rgba(0,245,255,0.7)',
              }}
            >
              {cmd}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
