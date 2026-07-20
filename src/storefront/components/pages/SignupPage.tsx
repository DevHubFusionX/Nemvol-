import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useStorefront } from '../useStorefront'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

export default function SignupPage() {
  const navigate = useNavigate()
  const { settings } = useStorefront()
  const storeName = settings?.storeName ?? 'Store'
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setError('')
    navigate('/')
  }

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong']
  const strengthColor  = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-500']

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left — brand panel */}
      <div className="hidden md:flex flex-col justify-between bg-stone-900 px-14 py-12">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">
          {storeName}<span className="text-violet-400">.</span>
        </Link>
        <div>
          <p className="text-3xl font-extralight text-white leading-snug tracking-tight mb-4">
            Join thousands of<br />happy customers.
          </p>
          <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
            Create your account to unlock faster checkout, order tracking, and exclusive member offers.
          </p>
        </div>
        <p className="text-xs text-stone-600">&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</p>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-white overflow-y-auto">

        {/* Mobile logo */}
        <Link to="/" className="md:hidden text-xl font-bold tracking-tight text-stone-900 mb-10">
          {storeName}<span className="text-violet-500">.</span>
        </Link>

        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-light text-stone-900 tracking-tight mb-1">Create an account</h1>
          <p className="text-xs text-stone-400 mb-8">Join us and start shopping today.</p>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-4 py-3 mb-6">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest text-stone-400 uppercase">First Name</label>
                <input value={form.firstName} onChange={set('firstName')} required placeholder="John"
                  className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest text-stone-400 uppercase">Last Name</label>
                <input value={form.lastName} onChange={set('lastName')} required placeholder="Doe"
                  className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest text-stone-400 uppercase">Email</label>
              <input type="email" value={form.email} onChange={set('email')} required placeholder="you@example.com"
                className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest text-stone-400 uppercase">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} required placeholder="Min. 8 characters"
                  className="w-full border border-stone-200 px-4 py-3 pr-11 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors" />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                  {showPw ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3].map(n => (
                      <span key={n} className={`h-1 flex-1 rounded-full transition-colors ${n <= strength ? strengthColor[strength] : 'bg-stone-200'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400">{strengthLabel[strength]}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest text-stone-400 uppercase">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={set('confirm')} required placeholder="••••••••"
                className={`border px-4 py-3 text-sm text-stone-900 outline-none transition-colors ${
                  form.confirm && form.confirm !== form.password ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-stone-500'
                }`} />
            </div>

            <button type="submit"
              className="w-full bg-stone-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-stone-700 transition-colors">
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-stone-100" />
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">or</span>
            <span className="flex-1 h-px bg-stone-100" />
          </div>

          <button className="w-full border border-stone-200 text-stone-700 text-xs tracking-wide py-3.5 flex items-center justify-center gap-3 hover:border-stone-400 transition-colors">
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="text-center text-xs text-stone-400 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-stone-900 underline underline-offset-2 hover:text-violet-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
