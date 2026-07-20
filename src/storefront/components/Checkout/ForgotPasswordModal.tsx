import { useState } from 'react'
import { X, Mail, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onClose: () => void
}

export default function ForgotPasswordModal({ onClose }: Props) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // TODO: wire to real auth reset
    setSent(true)
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
      >
        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={e => e.stopPropagation()}
          className="bg-white w-full max-w-md p-8 relative"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Close"
          >
            <X size={16} strokeWidth={1.5} />
          </button>

          {!sent ? (
            <>
              <div className="w-10 h-10 bg-stone-100 flex items-center justify-center mb-6">
                <Mail size={18} strokeWidth={1.5} className="text-stone-600" />
              </div>

              <h2 className="text-xl font-light text-stone-900 tracking-tight mb-1">
                Reset your password
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed mb-8">
                Enter the email address linked to your account and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-widest text-stone-400 uppercase">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-stone-700 transition-colors"
                >
                  Send Reset Link
                </button>
              </form>

              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors mt-6"
              >
                <ArrowLeft size={12} strokeWidth={1.5} />
                Back to sign in
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-4 gap-5">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Mail size={20} strokeWidth={1.5} className="text-green-500" />
              </div>

              <div>
                <h2 className="text-xl font-light text-stone-900 tracking-tight mb-1">Check your inbox</h2>
                <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
                  We sent a password reset link to{' '}
                  <span className="text-stone-700 font-medium">{email}</span>.
                  It may take a minute to arrive.
                </p>
              </div>

              <p className="text-[10px] text-stone-400">
                Didn't receive it?{' '}
                <button
                  onClick={() => setSent(false)}
                  className="text-stone-700 underline underline-offset-2 hover:text-stone-900"
                >
                  Try again
                </button>
              </p>

              <button
                onClick={onClose}
                className="w-full border border-stone-200 text-stone-600 text-xs tracking-[0.15em] uppercase py-3 hover:border-stone-400 transition-colors mt-2"
              >
                Back to Sign In
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
