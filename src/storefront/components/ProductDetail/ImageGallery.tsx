import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  images: string[]
  name: string
}

export default function ImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const slots = images.length > 0 ? images : Array(4).fill('')

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="bg-stone-100 aspect-[3/4] flex items-center justify-center overflow-hidden relative group cursor-zoom-in"
        onClick={() => slots[active] && setZoomed(true)}
      >
        {slots[active]
          ? <img src={slots[active]} alt={name} className="w-full h-full object-cover" />
          : <span className="text-stone-300 text-xs tracking-widest uppercase">Image</span>
        }
        {slots[active] && (
          <div className="absolute top-3 right-3 bg-white/80 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={14} className="text-stone-600" />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {slots.slice(0, 4).map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`aspect-square bg-stone-100 overflow-hidden border-2 transition-colors ${
              active === i ? 'border-stone-900' : 'border-transparent'
            }`}
          >
            {src
              ? <img src={src} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
              : <span className="w-full h-full flex items-center justify-center text-stone-300 text-[10px]">{i + 1}</span>
            }
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setZoomed(false)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={slots[active]} alt={name}
              className="max-h-[90vh] max-w-full object-contain"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
