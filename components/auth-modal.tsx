'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react';

type AuthMode = 'signin' | 'signup';

interface AuthModalContextValue {
  open: (mode?: AuthMode) => void;
  close: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return ctx;
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('signin');

  const open = useCallback((next: AuthMode = 'signin') => {
    setMode(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <AuthModalContext.Provider value={{ open, close }}>
      {children}
      <AuthModal isOpen={isOpen} mode={mode} setMode={setMode} onClose={close} />
    </AuthModalContext.Provider>
  );
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function AuthModal({
  isOpen,
  mode,
  setMode,
  onClose,
}: {
  isOpen: boolean;
  mode: AuthMode;
  setMode: (m: AuthMode) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isSignup = mode === 'signup';

  // Reset the whole form whenever the modal opens so it never shows stale input.
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setErrors({});
      setDone(false);
      setSubmitting(false);
    }
  }, [isOpen]);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  function validate(): boolean {
    const next: FormErrors = {};
    if (isSignup && name.trim().length < 2) {
      next.name = 'Please enter your name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address.';
    }
    if (password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // No backend in this project — simulate a request, then show success.
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 900);
  }

  function switchMode(next: AuthMode) {
    setMode(next);
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(3, 6, 12, 0.72)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={isSignup ? 'Create your account' : 'Sign in'}
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: '#0a0f1c',
              border: '1px solid rgba(120,150,190,0.16)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
            }}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-md transition-colors"
              style={{ color: 'rgba(160,180,210,0.7)' }}
            >
              <X size={18} />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-6">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(0,245,255,0.1)',
                    border: '1px solid rgba(0,245,255,0.25)',
                  }}
                >
                  <Shield size={18} color="#00f5ff" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-semibold" style={{ color: '#fff' }}>
                    CyberScope
                  </span>
                  <span className="text-base font-semibold" style={{ color: '#00ff88' }}>
                    AI
                  </span>
                </div>
              </div>

              {done ? (
                <div className="py-6 text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(0,255,136,0.12)', border: '1px solid rgba(0,255,136,0.3)' }}
                  >
                    <Check size={22} color="#00ff88" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1" style={{ color: '#f0f6ff' }}>
                    {isSignup ? "You're all set" : 'Welcome back'}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'rgba(150,175,205,0.8)' }}>
                    {isSignup
                      ? `Account created for ${email}. This is a demo — no data is stored.`
                      : `Signed in as ${email}. This is a demo — no data is stored.`}
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg btn-solid-cyber text-sm font-semibold"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-1" style={{ color: '#f0f6ff' }}>
                    {isSignup ? 'Create your account' : 'Sign in to your account'}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'rgba(150,175,205,0.75)' }}>
                    {isSignup
                      ? 'Start with hands-on labs and an AI tutor — free.'
                      : 'Welcome back. Pick up where you left off.'}
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {isSignup && (
                      <Field
                        id="auth-name"
                        label="Full name"
                        icon={<User size={16} />}
                        error={errors.name}
                      >
                        <input
                          id="auth-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="auth-input"
                          autoComplete="name"
                        />
                      </Field>
                    )}

                    <Field
                      id="auth-email"
                      label="Email"
                      icon={<Mail size={16} />}
                      error={errors.email}
                    >
                      <input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="auth-input"
                        autoComplete="email"
                      />
                    </Field>

                    <Field
                      id="auth-password"
                      label="Password"
                      icon={<Lock size={16} />}
                      error={errors.password}
                      trailing={
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          style={{ color: 'rgba(160,180,210,0.7)' }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      }
                    >
                      <input
                        id="auth-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isSignup ? 'At least 8 characters' : 'Your password'}
                        className="auth-input"
                        autoComplete={isSignup ? 'new-password' : 'current-password'}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-lg btn-solid-cyber text-sm font-semibold disabled:opacity-70"
                    >
                      {submitting
                        ? 'Please wait…'
                        : isSignup
                        ? 'Create account'
                        : 'Sign in'}
                    </button>
                  </form>

                  <p className="text-sm text-center mt-6" style={{ color: 'rgba(150,175,205,0.75)' }}>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      onClick={() => switchMode(isSignup ? 'signin' : 'signup')}
                      className="font-semibold"
                      style={{ color: '#00f5ff' }}
                    >
                      {isSignup ? 'Sign in' : 'Create one'}
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  icon,
  error,
  trailing,
  children,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  error?: string;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(170,195,225,0.85)' }}>
        {label}
      </label>
      <div
        className="flex items-center gap-2 px-3 rounded-lg"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${error ? 'rgba(248,113,113,0.55)' : 'rgba(120,150,190,0.18)'}`,
        }}
      >
        <span style={{ color: 'rgba(140,165,195,0.7)' }}>{icon}</span>
        {children}
        {trailing}
      </div>
      {error && (
        <p className="text-xs mt-1" style={{ color: '#f87171' }}>
          {error}
        </p>
      )}
    </div>
  );
}
