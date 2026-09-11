import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Target,
  Eye,
  Activity,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsDemo } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = 'Email or User ID is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setIsTransitioning(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      await login(email, rememberMe);
      toast.success('Signed in successfully', 'Please verify your profile details and select your official role.');
      navigate('/profile-setup');
    } catch {
      setIsTransitioning(false);
      toast.error('Authentication Error', 'Failed to authenticate credential profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setIsLoading(true);
    setIsTransitioning(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      await loginAsDemo();
      toast.success(
        'Demo Access Granted',
        'Please select your operational role to proceed.',
      );
      navigate('/profile-setup');
    } catch {
      setIsTransitioning(false);
      toast.error('Error', 'Unable to initialize demo access.');
    } finally {
      setIsLoading(false);
    }
  };

  const capabilities = [
    {
      step: '01',
      title: 'PREDICT',
      desc: 'Cost & Schedule Risk',
      badge: 'Risk Drivers',
      icon: Target,
      color: 'text-[#1557D6]',
      bg: 'bg-blue-50/60',
    },
    {
      step: '02',
      title: 'EXPLAIN',
      desc: 'Key Risk Drivers',
      badge: 'Root Causes',
      icon: Eye,
      color: 'text-[#0E7490]',
      bg: 'bg-cyan-50/60',
    },
    {
      step: '03',
      title: 'PRIORITIZE',
      desc: 'Project Risk Ranking',
      badge: 'Ranked Impact',
      icon: Activity,
      color: 'text-[#D97706]',
      bg: 'bg-amber-50/60',
    },
    {
      step: '04',
      title: 'ACT',
      desc: 'Recommended Intervention',
      badge: 'Playbook',
      icon: Zap,
      color: 'text-[#10B981]',
      bg: 'bg-emerald-50/60',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans relative overflow-x-hidden bg-[var(--neo-bg)] text-[var(--neo-text-primary)] select-none">
      {/* Top National Institution Tricolor Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1557D6] via-[#0E7490] to-[#10B981] sticky top-0 z-50" />

      {/* Subtle Background Radial Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_25%_20%,rgba(255,255,255,0.85)_0%,transparent_55%),radial-gradient(ellipse_at_75%_75%,rgba(195,212,232,0.4)_0%,transparent_60%)]" />

      {/* Main Responsive Composition */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-10 flex-1 flex flex-col justify-between">
        
        {/* TOP BRANDING BAR */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between pb-6 sm:pb-8"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl neo-raised text-[#1557D6] flex items-center justify-center shadow-[5px_5px_12px_rgba(150,168,192,0.45),-5px_-5px_12px_rgba(255,255,255,0.95)] shrink-0">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--neo-text-primary)] text-2xl sm:text-3xl font-black tracking-tight">INFRA-PREDICT</span>
                <span className="neo-raised text-[#1557D6] text-xs px-2.5 py-0.5 rounded-lg font-black tracking-wider shadow-[2px_2px_5px_rgba(150,168,192,0.35),-2px_-2px_5px_rgba(255,255,255,0.9)]">AI</span>
              </div>
              <span className="text-[#0E7490] text-[11px] font-black tracking-[0.2em] uppercase mt-0.5 block">PAIMANA INTELLIGENCE LAYER</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl neo-inset text-[11px] font-bold text-[var(--neo-text-secondary)] shadow-[inset_2px_2px_4px_rgba(150,168,192,0.35),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[var(--neo-text-primary)]">MoSPI PAIMANA Baseline</span>
            <span className="text-[var(--neo-text-tertiary)]">•</span>
            <span className="text-[#0E7490] font-black uppercase text-[10px] tracking-wider">Decision Support Mode</span>
          </div>
        </motion.header>

        {/* 2-COLUMN BALANCED COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
          
          {/* LEFT: BRANDING, HERO & CAPABILITIES (7 Cols on large screens) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl neo-raised text-xs font-black text-[#1557D6] tracking-wide shadow-[2px_2px_6px_rgba(150,168,192,0.35),-2px_-2px_6px_rgba(255,255,255,0.95)]">
                <Sparkles className="w-4 h-4 text-[#1557D6]" />
                <span>OFFICIAL INFRASTRUCTURE DECISION PLATFORM</span>
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[var(--neo-text-primary)] tracking-tight leading-[1.12]">
                Decision Intelligence<br />
                <span className="text-[#1557D6]">for National Infrastructure.</span>
              </h1>
              <p className="text-sm sm:text-base text-[var(--neo-text-secondary)] font-medium leading-relaxed max-w-xl">
                Predict project risks early, understand why they emerge, and prioritize timely intervention across high-impact capital portfolios.
              </p>
            </motion.div>

            {/* INTEGRATED DECISION PIPELINE (PREDICT → EXPLAIN → PRIORITIZE → ACT) */}
            <div>
              <div className="neo-panel p-4 sm:p-5 rounded-2xl shadow-[8px_8px_20px_rgba(150,168,192,0.42),-8px_-8px_20px_rgba(255,255,255,0.95)] border border-[rgba(255,255,255,0.85)]">
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[rgba(190,205,222,0.4)]">
                  <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-[var(--neo-text-primary)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1557D6]" />
                    <span>Decision Intelligence Pipeline</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#0E7490] px-2.5 py-1 rounded-lg neo-inset">4-STAGE FLOW</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {capabilities.map((cap, index) => {
                    const Icon = cap.icon;
                    return (
                      <motion.div
                        key={cap.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                        className="p-3.5 rounded-xl neo-raised flex flex-col justify-between hover:translate-y-[-2px] transition-all group cursor-default shadow-[3px_3px_8px_rgba(150,168,192,0.32),-3px_-3px_8px_rgba(255,255,255,0.95)] min-h-[110px]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-1.5 rounded-lg ${cap.bg} ${cap.color}`}>
                            <Icon className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
                          </div>
                          <span className="text-[10px] font-black text-[var(--neo-text-tertiary)] font-mono">{cap.step}</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[var(--neo-text-primary)] font-black text-xs tracking-wide">{cap.title}</span>
                            {index < 3 && (
                              <ChevronRight className="w-3.5 h-3.5 text-[var(--neo-text-tertiary)] hidden sm:block opacity-60" />
                            )}
                          </div>
                          <div className="text-[var(--neo-text-secondary)] text-[11px] font-semibold mt-0.5 leading-tight">{cap.desc}</div>
                          <div className="mt-2 inline-block text-[9px] font-bold px-1.5 py-0.5 rounded neo-inset text-[var(--neo-text-tertiary)]">
                            {cap.badge}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Supporting Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-1 text-[var(--neo-text-tertiary)] text-xs"
            >
              <div className="font-bold text-[var(--neo-text-primary)] mb-1.5">From Infrastructure Monitoring to Predictive Action.</div>
              <div className="flex items-center gap-2.5 font-mono text-[11px]">
                <span className="text-[#1557D6] font-bold">Predict</span><span>•</span>
                <span className="text-[#0E7490] font-bold">Explain</span><span>•</span>
                <span className="text-[#D97706] font-bold">Prioritize</span><span>•</span>
                <span className="text-[#10B981] font-bold">Act</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: SECURE PORTAL SIGN-IN (5 Cols on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[460px] neo-panel p-8 sm:p-9 relative overflow-hidden rounded-[28px] shadow-[16px_16px_36px_rgba(145,164,190,0.52),-16px_-16px_36px_rgba(255,255,255,0.98)] border border-[rgba(255,255,255,0.9)]">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1557D6] via-[#0E7490] to-[#10B981]" />

              <div className="mb-7">
                <div className="flex items-center justify-between mb-1.5">
                  <h2 className="text-[var(--neo-text-primary)] text-2xl font-black tracking-tight">Secure Portal Sign-in</h2>
                  <span className="p-1.5 rounded-lg neo-raised text-[#1557D6]">
                    <Lock className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-[var(--neo-text-secondary)] text-xs font-medium">
                  Access the infrastructure project intelligence workspace.
                </p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4" noValidate>
                <Input
                  label="Official Email / User ID"
                  type="email"
                  placeholder="user@example.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  error={errors.email}
                  autoComplete="username"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  error={errors.password}
                  autoComplete="current-password"
                  required
                />
                
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--neo-text-secondary)] select-none font-semibold">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[rgba(185,202,222,0.7)] text-[#1557D6] focus:ring-[#1557D6] cursor-pointer"
                    />
                    <span>Remember Session</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.info('Password Recovery', 'Please contact your system administrator for password reset assistance.')}
                    className="font-bold text-[#1557D6] hover:text-[#0F45B3] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="space-y-3 pt-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full neo-button-primary font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_12px_rgba(21,87,214,0.38),-3px_-3px_8px_rgba(255,255,255,0.9)]"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Authenticating...</span>
                      </span>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="relative flex py-1.5 items-center">
                    <div className="flex-grow border-t border-[rgba(190,205,222,0.6)]" />
                    <span className="flex-shrink mx-3 text-[10px] font-black uppercase tracking-wider text-[var(--neo-text-tertiary)]">Or</span>
                    <div className="flex-grow border-t border-[rgba(190,205,222,0.6)]" />
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoAccess}
                    disabled={isLoading}
                    className="w-full neo-button-secondary font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-[3px_3px_8px_rgba(150,168,192,0.35),-3px_-3px_8px_rgba(255,255,255,0.95)]"
                  >
                    <Sparkles className="w-4 h-4 text-[#10B981]" />
                    <span>Demo Access</span>
                  </button>
                </div>
              </form>

              {/* Portal Footer Links */}
              <div className="mt-7 pt-4 border-t border-[rgba(190,205,222,0.45)] flex justify-center gap-6 text-[10px] font-black text-[var(--neo-text-tertiary)] uppercase tracking-widest">
                <button
                  type="button"
                  onClick={() => toast.info('Security Policy', 'Encrypted TLS 1.3 channel with Role-Based Access Control.')}
                  className="hover:text-[var(--neo-text-primary)] transition-colors cursor-pointer"
                >
                  Security
                </button>
                <button
                  type="button"
                  onClick={() => toast.info('Privacy Protocol', 'Data confidentiality and integrity maintained with industry-standard practices.')}
                  className="hover:text-[var(--neo-text-primary)] transition-colors cursor-pointer"
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={() => toast.info('Support', 'For technical assistance, please contact your system administrator.')}
                  className="hover:text-[var(--neo-text-primary)] transition-colors cursor-pointer"
                >
                  Support
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM GLOBAL FOOTER */}
        <footer className="pt-6 sm:pt-8 text-center text-[11px] font-semibold text-[var(--neo-text-tertiary)]">
          Government Infrastructure Decision Intelligence Platform • MoSPI PAIMANA Baseline Integration
        </footer>
      </div>

      {/* AUTH TRANSITION OVERLAY */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#EEF2F6]/92 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="text-center space-y-6 neo-panel p-8 rounded-3xl max-w-sm w-full mx-auto shadow-[12px_12px_28px_rgba(145,164,190,0.55),-12px_-12px_28px_rgba(255,255,255,0.98)]">
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 mx-auto p-3.5 rounded-2xl neo-raised text-[#1557D6] flex items-center justify-center shadow-[4px_4px_10px_rgba(150,168,192,0.45),-4px_-4px_10px_rgba(255,255,255,0.95)]"
              >
                <ShieldCheck className="w-full h-full" />
              </motion.div>
              <div className="space-y-2">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[var(--neo-text-primary)] text-xl font-black tracking-tight">
                  Initializing Project Intelligence...
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-[#10B981] text-sm font-bold">
                  Risk Engine Ready
                </motion.div>
              </div>
              <div className="w-64 h-2.5 neo-inset rounded-full overflow-hidden mx-auto p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#1557D6] to-[#10B981]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
