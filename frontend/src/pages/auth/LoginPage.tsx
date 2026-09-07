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
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { InfrastructureScene } from '../../components/three/InfrastructureScene';

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
        'Logged in as Dr. Vikram Malhotra (Senior Decision Maker)',
      );
      navigate('/dashboard');
    } catch {
      setIsTransitioning(false);
      toast.error('Error', 'Unable to initialize demo access.');
    } finally {
      setIsLoading(false);
    }
  };

  const capabilities = [
    { title: 'PREDICT', desc: 'Cost & Schedule Risk', icon: Target, color: 'text-blue-500' },
    { title: 'EXPLAIN', desc: 'AI Risk Drivers', icon: Eye, color: 'text-teal-500' },
    { title: 'PRIORITIZE', desc: 'Project Risk Ranking', icon: Activity, color: 'text-amber-500' },
    { title: 'ACT', desc: 'Recommended Intervention', icon: Zap, color: 'text-emerald-500' },
  ];

  return (
    <div className="min-h-screen w-full flex font-sans relative overflow-hidden bg-[#07111F]">
      <div className="absolute inset-0 z-0">
        <InfrastructureScene isTransitioning={isTransitioning} />
      </div>
      <div className="relative z-10 w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3.5 mb-12">
              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-2xl sm:text-3xl font-black tracking-tight">INFRA-PREDICT</span>
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-bold">AI</span>
                </div>
                <span className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mt-0.5 block">PAIMANA INTELLIGENCE LAYER</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-xl">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Decision Intelligence<br /><span className="text-blue-500">for National Infrastructure.</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Predict project risks early, understand why they emerge, and prioritize timely intervention.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon;
                return (
                  <motion.div key={cap.title} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }} className="p-3.5 rounded-xl bg-[#0F1E33]/70 backdrop-blur-md border border-slate-700/50 hover:border-blue-500/40 transition-all group">
                    <Icon className={`w-5 h-5 ${cap.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <div className="text-white font-bold text-sm mb-0.5">{cap.title}</div>
                    <div className="text-slate-400 text-xs leading-snug">{cap.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="text-slate-400 text-sm">
            <div className="font-bold text-white mb-2">From Infrastructure Monitoring to Predictive Action.</div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-blue-400">Predict</span><span>•</span>
              <span className="text-teal-400">Explain</span><span>•</span>
              <span className="text-amber-400">Prioritize</span><span>•</span>
              <span className="text-emerald-400">Act</span>
            </div>
          </motion.div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="w-full max-w-md">
            <div className="bg-[#0D1829]/95 backdrop-blur-xl rounded-2xl border border-slate-700/60 shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500" />
              <div className="mb-8">
                <h2 className="text-white text-2xl font-black tracking-tight">Secure Portal Sign-in</h2>
                <p className="text-slate-400 text-sm mt-2">Access the infrastructure project intelligence workspace.</p>
              </div>
              <form onSubmit={handleSignIn} className="space-y-5" noValidate>
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
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-400 select-none font-medium">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-600 cursor-pointer" />
                    <span>Remember Session</span>
                  </label>
                  <button type="button" onClick={() => toast.info('Password Recovery', 'Please contact your system administrator for password reset assistance.')} className="font-bold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer">Forgot Password?</button>
                </div>
                <div className="space-y-3 pt-2">
                  <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? (<span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Authenticating...</span></span>) : (<><span>Sign In</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>)}
                  </button>
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-800" />
                    <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Or</span>
                    <div className="flex-grow border-t border-slate-800" />
                  </div>
                  <button type="button" onClick={handleDemoAccess} disabled={isLoading} className="w-full bg-[#132238] border border-slate-700/70 hover:bg-[#1A2E4C] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Demo Access</span>
                  </button>
                </div>
              </form>
              <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <button type="button" onClick={() => toast.info('Security Policy', 'Encrypted TLS 1.3 channel with Role-Based Access Control.')} className="hover:text-slate-200 transition-colors cursor-pointer">Security</button>
                <button type="button" onClick={() => toast.info('Privacy Protocol', 'Data confidentiality and integrity maintained with industry-standard practices.')} className="hover:text-slate-200 transition-colors cursor-pointer">Privacy</button>
                <button type="button" onClick={() => toast.info('Support', 'For technical assistance, please contact your system administrator.')} className="hover:text-slate-200 transition-colors cursor-pointer">Support</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center">
            <div className="text-center space-y-6">
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-16 h-16 mx-auto">
                <ShieldCheck className="w-full h-full text-blue-500" />
              </motion.div>
              <div className="space-y-2">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white text-xl font-bold">Initializing Project Intelligence...</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-emerald-400 text-sm font-semibold">Risk Engine Ready</motion.div>
              </div>
              <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
                <motion.div className="h-full bg-gradient-to-r from-blue-600 to-emerald-600" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1 }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
