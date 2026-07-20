import { motion } from 'framer-motion'
import { useCart } from './Cart/CartContext'
import { useToast } from './ui/ToastContext'
import { useFormatPrice } from '../hooks/useFormatPrice'
import type { Product } from '../types'

interface Props {
  product: Product
}

export default function NubiaFeaturedProduct({ product }: Props) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const formatPrice = useFormatPrice()
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="block w-8 h-px bg-stone-300" />
          <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase">Featured Product</span>
        </div>

        {/* Main block — dark bg image panel + right copy */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[400px] lg:min-h-[560px]">

          {/* Image — takes 3 cols, dark background */}
          <div className="lg:col-span-3 bg-stone-900 flex items-center justify-center min-h-64 lg:min-h-full">
            {product.images[0]
              ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              : <span className="text-stone-600 text-xs tracking-widest uppercase">Product Image</span>
            }
          </div>

          {/* Copy — 2 cols, white, bordered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-2 border border-stone-200 lg:border-l-0 flex flex-col justify-between px-8 md:px-10 py-10 md:py-12"
          >
            <div className="flex flex-col gap-4 md:gap-5">
              <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase">{product.category}</span>
              <h2 className="text-3xl md:text-5xl font-extralight text-stone-900 leading-tight tracking-tight">
                {product.name}
              </h2>
              <p className="text-sm text-stone-400 leading-loose">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 mt-8 md:mt-10">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-light text-stone-900">{formatPrice(product.price)}</span>
                {product.compareAt && (
                  <span className="text-sm text-stone-400 line-through">{formatPrice(product.compareAt)}</span>
                )}
              </div>
              <button
                onClick={() => { addItem(product, 1, 'M', ''); toast(`${product.name} added to cart`) }}
                className="self-start bg-stone-900 text-white text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-stone-700 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
