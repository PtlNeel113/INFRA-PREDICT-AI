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
      await new Promise(resolve => setTimeout(resolve, 1200)); // Transition animation
      const user = await login(email, rememberMe);
      toast.success('Signed in successfully', `Welcome back, ${user.fullName}`);
      const destination =
        (location.state as { from?: { pathname: string } })?.from?.pathname ||
        (user.isProfileComplete ? '/dashboard' : '/profile-setup');
      navigate(destination);
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
      await new Promise(resolve => setTimeout(resolve, 1200)); // Transition animation
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
    <div className="min-h-screen w-full flex font-sans relative overflow-hidden bg-[#F7F8F5]">
      {/* 3D Infrastructure Scene Background */}
      <div className="absolute inset-0 z-0">
        <InfrastructureScene isTransitioning={isTransitioning} />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row">
        {/* Left Side: Branding */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
          {/* Top Branding */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3.5 mb-12">
              <div className="w-14 h-14 rounded-xl bg-[#1557D6] flex items-center justify-center text-white shadow-elevated shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[#0B1220] text-2xl sm:text-3xl font-black tracking-tight">INFRA-PREDICT</span>
                  <span className="bg-[#1557D6] text-white text-xs px-2 py-0.5 rounded font-bold">
                    AI
                  </span>
                </div>
                <span className="text-[#1557D6] text-xs font-bold tracking-[0.2em] uppercase mt-0.5 block">
                  PAIMANA Intelligence Layer
                </span>
              </div>
            </div>
          </motion.div>

          {/* Center Tagline & Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="text-[#0B1220] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Decision Intelligence
              <br />
              <span className="text-[#1557D6]">for National Infrastructure.</span>
            </h1>

            <p className="text-[#536174] text-base sm:text-lg leading-relaxed mb-8">
              Predict project risks early, understand why they emerge, and prioritize timely intervention.
            </p>

            {/* Capability Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="p-3 rounded-xl glass-card hover-lift group cursor-default"
                  >
                    <Icon className={`w-5 h-5 ${cap.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <div className="text-[#0B1220] font-bold text-sm mb-0.5">{cap.title}</div>
                    <div className="text-[#536174] text-xs leading-snug">{cap.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Bottom Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[#536174] text-sm"
          >
            <div className="font-bold text-[#0B1220] mb-2">
              From Infrastructure Monitoring to Predictive Action.
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#1557D6]">Predict</span>
              <span>•</span>
              <span className="text-[#0E7490]">Explain</span>
              <span>•</span>
              <span className="text-[#D97706]">Prioritize</span>
              <span>•</span>
              <span className="text-[#16A34A]">Act</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Login Panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="glass-panel p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1557D6] via-[#0E7490] to-[#16A34A]" />
              
              <div className="mb-8">
                <h2 className="text-[#0B1220] text-2xl font-black tracking-tight">
                  Secure Portal Sign-in
                </h2>
                <p className="text-[#536174] text-sm mt-2">
                  Access the infrastructure project intelligence workspace.
                </p>
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
                  <label className="flex items-center gap-2 cursor-pointer text-[#536174] select-none font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[rgba(15,30,50,0.12)] text-[#1557D6] focus:ring-[#1557D6] cursor-pointer"
                    />
                    <span>Remember Session</span>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      toast.info(
                        'Password Recovery',
                        'Please contact your system administrator for password reset assistance.',
                      )
                    }
                    className="font-bold text-[#1557D6] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1557D6] hover:bg-[#0A1B33] active:bg-[#0A1B33] text-white font-bold py-3.5 rounded-xl shadow-elevated transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
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

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-[rgba(15,30,50,0.08)]" />
                    <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-[#8B95A8]">
                      Or
                    </span>
                    <div className="flex-grow border-t border-[rgba(15,30,50,0.08)]" />
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoAccess}
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-[rgba(21,87,214,0.04)] border border-[rgba(15,30,50,0.12)] text-[#0B1220] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lifted hover-lift"
                  >
                    <Sparkles className="w-4 h-4 text-[#8EDC35]" />
                    <span>Demo Access</span>
                  </button>
                </div>
              </form>

              {/* Footer Links */}
              <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-[#8B95A8] uppercase tracking-widest">
                <button
                  type="button"
                  onClick={() =>
                    toast.info(
                      'Security Policy',
                      'Encrypted TLS 1.3 channel with Role-Based Access Control.',
                    )
                  }
                  className="hover:text-[#1557D6] transition-colors cursor-pointer"
                >
                  Security
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast.info(
                      'Privacy Protocol',
                      'Data confidentiality and integrity maintained with industry-standard practices.',
                    )
                  }
                  className="hover:text-[#1557D6] transition-colors cursor-pointer"
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast.info(
                      'Support',
                      'For technical assistance, please contact your system administrator.',
                    )
                  }
                  className="hover:text-[#1557D6] transition-colors cursor-pointer"
                >
                  Support
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Loading Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 glass-panel flex items-center justify-center"
            style={{ backdropFilter: 'blur(28px)' }}
          >
            <div className="text-center space-y-6">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-16 h-16 mx-auto"
              >
                <ShieldCheck className="w-full h-full text-[#1557D6]" />
              </motion.div>
              
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#0B1220] text-xl font-bold"
                >
                  Initializing Project Intelligence...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-[#16A34A] text-sm font-semibold"
                >
                  Risk Engine Ready
                </motion.div>
              </div>
              
              {/* Progress indicator */}
              <div className="w-64 h-1 bg-[rgba(15,30,50,0.08)] rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1557D6] to-[#16A34A]"
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
