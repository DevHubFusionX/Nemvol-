import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cartItems, cartSubtotal, updateCartItem, removeFromCart } = useStorefront()
    const formatPrice = useFormatPrice()
    const { path } = useStorefrontPaths()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
                            <h2 className="text-sm font-bold tracking-widest text-stone-900 uppercase">
                                Shopping Cart
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-stone-400 hover:text-stone-900 transition-colors duration-150"
                                aria-label="Close cart"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                    <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 mb-6">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-sm font-bold tracking-wider text-stone-900 uppercase mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-stone-500 text-xs mb-8 max-w-xs leading-relaxed">
                                        Add items to your cart to see them here and proceed to checkout.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3.5 rounded-full border border-stone-200 text-stone-950 text-xs font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors duration-200"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.variantId} className="flex gap-4 pb-6 border-b border-stone-100 last:border-none last:pb-0">
                                        {/* Item Image */}
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-20 h-24 bg-stone-50 rounded-lg object-cover object-center shrink-0 border border-stone-100"
                                            />
                                        ) : (
                                            <div className="w-20 h-24 bg-stone-50 rounded-lg border border-stone-100 flex items-center justify-center text-stone-400 shrink-0">
                                                <ShoppingBag className="w-5 h-5" />
                                            </div>
                                        )}

                                        {/* Item Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between gap-2">
                                                    <h3 className="text-xs font-bold text-stone-900 tracking-wide line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                    <span className="text-xs font-bold text-stone-900 shrink-0">
                                                        {formatPrice(item.price)}
                                                    </span>
                                                </div>
                                                {item.variantLabel && (
                                                    <p className="text-[10px] text-stone-500 mt-1 uppercase tracking-wider">
                                                        {item.variantLabel}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Quantity & Remove */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-stone-200 rounded-full py-1 px-2.5 bg-stone-50">
                                                    <button
                                                        onClick={() => updateCartItem(item.variantId, item.quantity - 1)}
                                                        className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-bold text-stone-900 px-3 min-w-[24px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateCartItem(item.variantId, item.quantity + 1)}
                                                        className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.variantId)}
                                                    className="p-2 text-stone-400 hover:text-red-600 transition-colors duration-150"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-stone-100 p-6 bg-stone-50/50 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                                        Subtotal
                                    </span>
                                    <span className="text-sm font-bold text-stone-900">
                                        {formatPrice(cartSubtotal)}
                                    </span>
                                </div>
                                <Link
                                    to={path('/checkout')}
                                    onClick={onClose}
                                    className="w-full py-4 rounded-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors duration-150 shadow-sm flex items-center justify-center gap-2"
                                >
                                    <span>Proceed to Checkout</span>
                                    <span className="text-sm">↗</span>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
