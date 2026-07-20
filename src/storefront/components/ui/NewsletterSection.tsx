import { useState } from 'react'
import { useToast } from './ToastContext'

export default function NewsletterSection() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setEmail('')
    toast("You're subscribed! Welcome to the list.")
  }

  return (
    <section className="bg-stone-900 py-20">
      <div className="max-w-2xl mx-auto px-6 text-center flex flex-col gap-6">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-stone-500 uppercase mb-3">Stay in the loop</p>
          <h2 className="text-3xl font-extralight text-white tracking-tight">
            Get early access to new drops,<br />exclusive offers & more.
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto w-full">
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)} required
            placeholder="Enter your email"
            className="flex-1 bg-stone-800 border border-stone-700 px-4 py-3 text-sm text-white placeholder-stone-500 outline-none focus:border-stone-500 transition-colors"
          />
          <button type="submit"
            className="bg-white text-stone-900 text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-stone-100 transition-colors shrink-0">
            Subscribe
          </button>
        </form>
        <p className="text-[10px] text-stone-600">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
