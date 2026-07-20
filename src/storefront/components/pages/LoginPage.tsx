import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useStorefront } from '../useStorefront'
import { createPublicLead } from '../../lib/publicApi'

export default function LoginPage() {
  const { path, go, settings, slug, tools, grantAccess, setCustomer } = useStorefront()
  const storeName = settings?.storeName ?? 'Store'
  const [searchParams] = useSearchParams()
  const isGateMode = searchParams.get('gate') === '1'

  const gate = tools?.toolsConfig?.accessGate as Record<string, unknown> | undefined
  const gateTitle       = gate?.title       as string | undefined
  const gateDescription = gate?.description as string | undefined
  const gateButtonLabel = gate?.buttonLabel as string | undefined

  const [email, setEmail]         = useState('')
  const [name, setName]           = useState('')
  const [error, setError]         = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) { setError('Please enter your email.'); return }
    setError('')
    setSubmitting(true)

    try {
      await createPublicLead(slug, {
        name: name || undefined,
        email,
        source: isGateMode ? 'access_gate' : 'account',
      })
    } catch { /* fire-and-forget */ }

    // Save to session
    setCustomer({ id: email, email, firstName: name || undefined })

    if (isGateMode) {
      grantAccess()
      go()
    } else {
      go('account')
    }
  }

  const leftHeading = isGateMode
    ? (gateTitle ?? 'Get exclusive access')
    : 'Track your orders,\nanytime.'

  const leftSub = isGateMode
    ? (gateDescription ?? 'Enter your details to access this store.')
    : 'Enter your email to create or resume your account.'

  const submitLabel = isGateMode
    ? (gateButtonLabel ?? 'Continue to Store')
    : 'Continue'

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left — brand panel */}
      <div className="hidden md:flex flex-col justify-between bg-stone-900 px-14 py-12">
        <Link to={path()} className="text-2xl font-bold tracking-tight text-white">
          {storeName}<span className="text-violet-400">.</span>
        </Link>
        <div>
          <p className="text-3xl font-extralight text-white leading-snug tracking-tight mb-4 whitespace-pre-line">
            {leftHeading}
          </p>
          <p className="text-sm text-stone-400 leading-relaxed max-w-xs">{leftSub}</p>
        </div>
        <p className="text-xs text-stone-600">&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</p>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-white">

        <Link to={path()} className="md:hidden text-xl font-bold tracking-tight text-stone-900 mb-10">
          {storeName}<span className="text-violet-500">.</span>
        </Link>

        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-light text-stone-900 tracking-tight mb-1">
            {isGateMode ? 'Access this store' : 'Welcome'}
          </h1>
          <p className="text-xs text-stone-400 mb-8">
            {isGateMode ? 'Enter your details to continue.' : 'Enter your email to get started.'}
          </p>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-4 py-3 mb-6">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest text-stone-400 uppercase">Name <span className="normal-case text-stone-300">(optional)</span></label>
              <input
                value={name} onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest text-stone-400 uppercase">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@example.com"
                className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors"
              />
            </div>

            <button type="submit" disabled={submitting}
              className="w-full bg-stone-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-stone-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1">
              {submitting && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {submitLabel}
            </button>
          </form>

          <p className="text-center text-xs text-stone-400 mt-8">
            By continuing you agree to share your details with this store.
          </p>
        </div>
      </div>
    </div>
  )
}
