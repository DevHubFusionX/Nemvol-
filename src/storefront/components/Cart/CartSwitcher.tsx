import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from './CartContext'
import DefaultCart from './variants/DefaultCart'
import DroleCart from './variants/DroleCart'
import ModernCart from './variants/ModernCart'
import SplitCart from './variants/SplitCart'

import { useThemeConfig } from '../../hooks/useThemeConfig'

export default function CartSwitcher() {
  const { isOpen, closeCart } = useCart()
  const { getVariant } = useThemeConfig()

  const variant = getVariant('cartDrawer')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for overlays that do not cover the whole screen */}
          {variant !== 'modern' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/30 z-50"
            />
          )}

          {variant === 'drole' && <DroleCart />}
          {variant === 'modern' && <ModernCart />}
          {variant === 'split' && <SplitCart />}
          {variant === 'default' && <DefaultCart />}
        </>
      )}
    </AnimatePresence>
  )
}
