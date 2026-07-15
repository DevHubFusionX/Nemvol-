import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Check } from 'lucide-react';

const perks = [
  'MVP delivered in 8–12 weeks',
  'Discovery-first, outcome-driven',
  'Full IP ownership — always yours',
  'Post-launch support included',
];

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => e.preventDefault();

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-400'];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left: Brand panel ── */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 px-14 py-14">
        <Link to="/" className="text-[17px] font-extrabold text-white tracking-tight">
          Nemvol
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="flex flex-col gap-10"
        >
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
              Why Nemvol
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white tracking-tight leading-snug max-w-sm">
              Your idea deserves to be built right.
            </h2>
            <p className="mt-3 text-[14px] text-slate-400 leading-relaxed max-w-xs">
              Join founders, startups, and SMEs building validated digital products with Nemvol.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[var(--color-brand-blue)]" />
                </div>
                <span className="text-[13px] text-slate-300">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="overflow-hidden select-none">
          <p
            className="font-extrabold tracking-tighter leading-none bg-linear-to-r from-[#0369a1] via-[#7dd3fc] to-[#0369a1] bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
          >
            Nemvol
          </p>
        </div>
      </div>

      {/* ── Right: Form panel ── */}
      <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-20 bg-white">

        {/* Mobile logo */}
        <Link to="/" className="lg:hidden text-[17px] font-extrabold text-slate-900 tracking-tight mb-12">
          Nemvol
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-sm mx-auto"
        >
          {/* Heading */}
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
            Get started
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-[13px] text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors">
              Sign in
            </Link>
          </p>

          {/* Google SSO — top for signup */}
          <button
            type="button"
            className="mt-8 w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">Full name</label>
              <input
                type="text" required placeholder="Winner Oyebanjo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">Work email</label>
              <input
                type="email" required placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">
                Company / Project name
                <span className="ml-1.5 text-[11px] font-semibold text-slate-300">(optional)</span>
              </label>
              <input
                type="text" placeholder="Acme Inc."
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength */}
              {form.password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= passwordStrength ? strengthColor[passwordStrength] : 'bg-slate-100'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">{strengthLabel[passwordStrength]}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 active:scale-[0.98] group"
            >
              Create account
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-[11px] text-slate-300 text-center leading-relaxed">
            By creating an account you agree to our{' '}
            <Link to="/faq" className="text-slate-400 hover:text-slate-600 transition-colors">Terms</Link>
            {' '}and{' '}
            <Link to="/faq" className="text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
