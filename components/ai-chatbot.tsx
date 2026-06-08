'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Minimize2 } from 'lucide-react';

type Message = {
  id: number;
  role: 'user' | 'bot';
  text: string;
};

const AUTO_RESPONSES: Record<string, string> = {
  default: "I'm CyberScope AI, your security assistant. I can help with threat analysis, CVE lookups, ethical hacking concepts, and security best practices. What would you like to know?",
  hello: "Hello! I'm your AI security assistant. Ask me about threats, vulnerabilities, or any cybersecurity topic.",
  help: "I can help you with:\n• CVE vulnerability lookups\n• Ethical hacking techniques\n• Network defense strategies\n• Malware analysis guidance\n• Security certifications (CISSP, CEH, OSCP)",
  cve: "CVE (Common Vulnerabilities and Exposures) is a standardized identifier for known security vulnerabilities. The most critical recent CVEs include CVE-2024-3400 (PAN-OS), CVE-2024-21762 (Fortinet), and Log4Shell. Always patch within 24 hours of CISA KEV additions.",
  sql: "SQL Injection is a critical web vulnerability (OWASP #3). Prevention:\n1. Use parameterized queries/prepared statements\n2. Input validation & sanitization\n3. Least privilege database accounts\n4. WAF deployment\n\nExample payload: ' OR '1'='1",
  nmap: "Nmap is an essential network scanner. Common commands:\n• nmap -sV target (service detection)\n• nmap -sC target (default scripts)\n• nmap -A target (aggressive scan)\n• nmap -p- target (all ports)\nAlways get written authorization before scanning!",
  oscp: "OSCP (Offensive Security Certified Professional) is the gold standard for pentesters. Requirements:\n• 24-hour practical exam\n• Report writing\n• Prerequisites: Networking, Linux, scripting basics\n\nAverage prep time: 3-6 months on CyberScope AI.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(AUTO_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) return val;
  }
  return AUTO_RESPONSES.default;
}

let msgId = 0;

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: msgId++, role: 'bot', text: AUTO_RESPONSES.default },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: msgId++, role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const response = getResponse(input);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: msgId++, role: 'bot', text: response },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: open ? 'rgba(5,8,15,0.95)' : 'linear-gradient(135deg, #00c8d4, #0066ff)',
          border: '1px solid rgba(0,245,255,0.4)',
          boxShadow: '0 0 30px rgba(0,245,255,0.3)',
        }}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={open ? {} : {
          boxShadow: [
            '0 0 20px rgba(0,245,255,0.3)',
            '0 0 40px rgba(0,245,255,0.5)',
            '0 0 20px rgba(0,245,255,0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={20} color="#00f5ff" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Bot size={22} color="#fff" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-[199] w-[360px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              height: 480,
              background: 'rgba(5, 8, 15, 0.97)',
              border: '1px solid rgba(0,245,255,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,245,255,0.08)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{
                background: 'rgba(0,245,255,0.04)',
                borderBottom: '1px solid rgba(0,245,255,0.1)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,102,255,0.15))',
                    border: '1px solid rgba(0,245,255,0.3)',
                  }}
                >
                  <Bot size={14} style={{ color: '#00f5ff' }} />
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: '#e8f4ff' }}>
                    CyberScope AI
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ background: '#00ff88', boxShadow: '0 0 4px #00ff88' }}
                    />
                    <span className="text-[10px]" style={{ color: 'rgba(0,255,136,0.7)' }}>
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)}>
                <Minimize2 size={14} style={{ color: 'rgba(0,245,255,0.4)' }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background:
                        msg.role === 'bot'
                          ? 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,102,255,0.15))'
                          : 'linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,100,50,0.1))',
                      border: `1px solid ${msg.role === 'bot' ? 'rgba(0,245,255,0.25)' : 'rgba(0,255,136,0.25)'}`,
                    }}
                  >
                    {msg.role === 'bot' ? (
                      <Bot size={12} style={{ color: '#00f5ff' }} />
                    ) : (
                      <User size={12} style={{ color: '#00ff88' }} />
                    )}
                  </div>
                  <div
                    className="px-3.5 py-2.5 rounded-xl text-sm leading-relaxed max-w-[260px] whitespace-pre-wrap"
                    style={{
                      background:
                        msg.role === 'bot'
                          ? 'rgba(0,245,255,0.05)'
                          : 'rgba(0,255,136,0.07)',
                      border: `1px solid ${msg.role === 'bot' ? 'rgba(0,245,255,0.1)' : 'rgba(0,255,136,0.12)'}`,
                      color: 'rgba(200,225,240,0.9)',
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,102,255,0.15))',
                      border: '1px solid rgba(0,245,255,0.25)',
                    }}
                  >
                    <Bot size={12} style={{ color: '#00f5ff' }} />
                  </div>
                  <div
                    className="px-4 py-2.5 rounded-xl flex gap-1.5 items-center"
                    style={{
                      background: 'rgba(0,245,255,0.05)',
                      border: '1px solid rgba(0,245,255,0.1)',
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#00f5ff' }}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto flex-shrink-0">
              {['CVE lookup', 'OSCP tips', 'SQL injection'].map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); }}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg text-xs flex-shrink-0"
                  style={{
                    background: 'rgba(0,245,255,0.05)',
                    border: '1px solid rgba(0,245,255,0.12)',
                    color: 'rgba(0,245,255,0.6)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex gap-2 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(0,245,255,0.08)' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about cybersecurity..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: '#e8f4ff' }}
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
                style={{
                  background: 'linear-gradient(135deg, #00c8d4, #0066ff)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={14} color="#fff" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
