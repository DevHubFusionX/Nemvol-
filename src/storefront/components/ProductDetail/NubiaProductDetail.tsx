import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useStorefront } from '../useStorefront'
import type { Product } from '../../types'
import ImageGallery from './ImageGallery.tsx'
import ProductInfo from './ProductInfo.tsx'
import ProductTabs from './ProductTabs.tsx'
import RelatedProducts from './RelatedProducts.tsx'
import StickyAddToCart from './StickyAddToCart.tsx'
import PageTransition from '../ui/PageTransition.tsx'

interface Props {
  product: Product
  related?: Product[]
}

export default function NubiaProductDetail({ product, related = [] }: Props) {
  const { settings } = useStorefront()
  const navigate = useNavigate()
  const [size, setSize] = useState('M')
  const [color] = useState('#c8b89a')

  const variant = (settings as any).productPage?.variant || 'default'

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* 1. Drole Editorial Hero */}
        {variant === 'drole' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32 md:pb-24">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors mb-8 font-mono"
            >
              &larr; Return
            </button>
            
            {/* Giant editorial header */}
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-bold mb-3">{product.category}</p>
              <h1 className="text-4xl md:text-7xl font-serif font-light tracking-tight text-stone-900 leading-tight max-w-4xl mx-auto">
                {product.name}
              </h1>
            </div>

            {/* Wide gallery spacing */}
            <div className="max-w-5xl mx-auto mb-16">
              <ImageGallery images={product.images} name={product.name} />
            </div>

            {/* Centered content block below */}
            <div className="max-w-2xl mx-auto border-t border-stone-200/60 pt-10">
              <ProductInfo product={product} onSizeChange={setSize} />
              <div className="mt-12">
                <ProductTabs product={product} />
              </div>
            </div>

            <RelatedProducts products={related} />
          </div>
        )}

        {/* 2. Modern Grid-First Layout */}
        {variant === 'modern' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32 md:pb-24">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-xs text-stone-400 hover:text-stone-700 transition-colors mb-8"
            >
              <ArrowLeft size={13} strokeWidth={1.5} /> Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Stacked vertical list of all images */}
              <div className="lg:col-span-7 space-y-6">
                {product.images.length > 0 ? (
                  product.images.map((img, i) => (
                    <div key={i} className="aspect-4/5 bg-stone-50 overflow-hidden rounded-xl border border-stone-100">
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="aspect-4/5 bg-stone-50 flex items-center justify-center rounded-xl border border-stone-100">
                    <span className="text-stone-300 text-xs font-mono uppercase">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Sticky details on the right */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <ProductInfo product={product} onSizeChange={setSize} />
                <div className="mt-8 border-t border-stone-100 pt-6">
                  <ProductTabs product={product} />
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-stone-150/40 pt-12">
              <RelatedProducts products={related} />
            </div>
          </div>
        )}

        {/* 3. Split Detail Columns */}
        {variant === 'split' && (
          <div className="w-full pt-16 lg:pt-0">
            <div className="flex flex-col lg:flex-row items-stretch min-h-[90vh] bg-white">
              {/* Left Column: Fixed high-resolution single product image */}
              <div className="relative w-full lg:w-1/2 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] bg-stone-50 overflow-hidden border-r border-stone-100 flex items-center justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-full px-4 py-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-600 hover:text-stone-950 transition-colors shadow-sm"
                >
                  <ArrowLeft size={12} /> Back
                </button>
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-stone-355 text-xs font-mono uppercase">Image Placeholder</span>
                )}
              </div>

              {/* Right Column: Scrollable detail forms */}
              <div className="w-full lg:w-1/2 px-6 md:px-16 py-12 md:py-20 flex flex-col justify-center">
                <div className="max-w-xl w-full mx-auto">
                  <ProductInfo product={product} onSizeChange={setSize} />
                  <div className="mt-10 border-t border-stone-100 pt-6">
                    <ProductTabs product={product} />
                  </div>
                </div>
              </div>
            </div>

            {/* Related products below */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-stone-100">
              <RelatedProducts products={related} />
            </div>
          </div>
        )}

        {/* 4. Default Layout (Standard Grid Columns) */}
        {variant === 'default' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32 md:pb-24">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-xs text-stone-400 hover:text-stone-700 transition-colors mb-6"
            >
              <ArrowLeft size={13} strokeWidth={1.5} /> Back
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <ImageGallery images={product.images} name={product.name} />
              <ProductInfo product={product} onSizeChange={setSize} />
            </div>
            <ProductTabs product={product} />
            <RelatedProducts products={related} />
          </div>
        )}
      </motion.div>
      
      {/* Render sticky action bar overlay for non-split/non-fullscreen layout options */}
      {variant !== 'split' && (
        <StickyAddToCart product={product} size={size} qty={1} color={color} />
      )}
    </PageTransition>
  )
}
