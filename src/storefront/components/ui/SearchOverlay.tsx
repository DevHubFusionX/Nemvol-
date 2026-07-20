import { useState, useEffect, useRef } from 'react'
import { X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStorefront } from '../useStorefront'
import { useFormatPrice } from '../../hooks/useFormatPrice'
import type { Product } from '../../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  products: Product[]
}

export default function SearchOverlay({ isOpen, onClose, products }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { go } = useStorefront()
  const formatPrice = useFormatPrice()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = query.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  function goToProduct(id: string) {
    onClose()
    go(`products/${id}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl"
          >
            <div className="max-w-2xl mx-auto px-6 py-5">
              <div className="flex items-center gap-4 border-b border-stone-200 pb-4">
                <Search size={18} className="text-stone-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="flex-1 text-base text-stone-900 outline-none placeholder:text-stone-300"
                />
                <button onClick={onClose} className="text-stone-400 hover:text-stone-900">
                  <X size={18} />
                </button>
              </div>

              {results.length > 0 && (
                <ul className="py-3 flex flex-col">
                  {results.map(p => (
                    <li key={p.id}>
                      <button
                        onClick={() => goToProduct(p.id)}
                        className="w-full flex items-center gap-4 px-2 py-3 hover:bg-stone-50 text-left transition-colors"
                      >
                        <div className="w-10 h-10 bg-stone-100 shrink-0 flex items-center justify-center overflow-hidden">
                          {p.images[0]
                            ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                            : <span className="text-stone-300 text-[9px]">IMG</span>
                          }
                        </div>
                        <div>
                          <p className="text-sm text-stone-900">{p.name}</p>
                          <p className="text-xs text-stone-400">{p.category} · {formatPrice(p.price)}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {query.trim().length > 1 && results.length === 0 && (
                <p className="py-6 text-sm text-stone-400 text-center">No results for "{query}"</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
