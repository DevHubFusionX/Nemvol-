import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ChevronRight, CheckCircle2, ArrowLeft, CreditCard } from 'lucide-react'
import { useStorefront } from '../../context/StorefrontProvider'
import { useFormatPrice } from '../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../hooks/useStorefrontPaths'

export default function CheckoutPage() {
    const {
        cartItems,
        cartSubtotal,
        checkoutStep,
        checkoutAddress,
        checkoutShipping,
        shippingZones,
        shippingEnabled,
        paymentMethods,
        placedOrderId,
        setCheckoutStep,
        setCheckoutAddress,
        setCheckoutShipping,
        placeOrder,
        resetCheckout,
    } = useStorefront()

    const formatPrice = useFormatPrice()
    const { path } = useStorefrontPaths()
    const navigate = useNavigate()

    // Form states
    const [email, setEmail] = useState(checkoutAddress?.email || '')
    const [phone, setPhone] = useState(checkoutAddress?.phone || '')
    const [firstName, setFirstName] = useState(checkoutAddress?.firstName || '')
    const [lastName, setLastName] = useState(checkoutAddress?.lastName || '')
    const [address, setAddress] = useState(checkoutAddress?.address || '')
    const [city, setCity] = useState(checkoutAddress?.city || '')
    const [state, setState] = useState(checkoutAddress?.state || '')
    const [country] = useState(checkoutAddress?.country || 'US')
    const [zip, setZip] = useState(checkoutAddress?.zip || '')

    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    // Redirect to home if cart is empty and not in confirmation step
    useEffect(() => {
        if (cartItems.length === 0 && checkoutStep !== 'confirmation') {
            navigate(path('/'))
        }
    }, [cartItems, checkoutStep, navigate, path])

    // Reset checkout state on mount if order was already placed
    useEffect(() => {
        if (checkoutStep === 'confirmation' && !placedOrderId) {
            resetCheckout()
        }
    }, [])

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCheckoutAddress({
            email,
            phone,
            firstName,
            lastName,
            address,
            city,
            state,
            country,
            zip,
        })
        if (shippingEnabled && shippingZones.length > 0) {
            setCheckoutStep('shipping')
        } else {
            setCheckoutStep('payment')
        }
    }

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!checkoutShipping) return
        setCheckoutStep('payment')
    }

    const handlePlaceOrder = async () => {
        if (!selectedPayment) return
        setIsPlacingOrder(true)
        try {
            await placeOrder({
                subtotal: String(cartSubtotal),
                shippingCost: String(shippingCost),
                total: String(orderTotal),
                shippingAddress: `${firstName} ${lastName}, ${address}, ${city}, ${state}, ${country} ${zip}`,
                lines: cartItems.map((item) => ({
                    productName: item.name,
                    variantLabel: item.variantLabel || '',
                    quantity: String(item.quantity),
                    unitPrice: String(item.price),
                    lineTotal: String(item.price * item.quantity),
                })),
            } as any)
            setCheckoutStep('confirmation')
        } catch (err) {
            console.error('Failed to place order:', err)
        } finally {
            setIsPlacingOrder(false)
        }
    }

    const shippingCost = checkoutShipping?.rate || 0
    const orderTotal = cartSubtotal + shippingCost

    if (checkoutStep === 'confirmation') {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h1 className="font-serif text-3xl tracking-widest text-stone-950 uppercase font-light mb-4">
                    Thank you for your order
                </h1>
                <p className="text-stone-500 text-xs max-w-md leading-relaxed mb-8">
                    Your order has been placed successfully. We will send you a confirmation email with details of your order.
                </p>
                {placedOrderId && (
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 mb-8 w-full max-w-md text-left">
                        <div className="flex justify-between text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                            <span>Order ID</span>
                            <span className="font-mono text-stone-600">{placedOrderId}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-stone-900 uppercase tracking-wider">
                            <span>Total Amount</span>
                            <span>{formatPrice(orderTotal)}</span>
                        </div>
                    </div>
                )}
                <Link
                    to={path('/')}
                    onClick={() => resetCheckout()}
                    className="px-8 py-3.5 rounded-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors duration-150 shadow-sm"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs / Steps */}
            <div className="flex items-center space-x-3 text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-12 overflow-x-auto pb-2">
                <span className={checkoutStep === 'information' ? 'text-stone-950' : ''}>Address</span>
                {shippingEnabled && shippingZones.length > 0 && (
                    <>
                        <ChevronRight className="w-3 h-3" />
                        <span className={checkoutStep === 'shipping' ? 'text-stone-950' : ''}>Shipping</span>
                    </>
                )}
                <ChevronRight className="w-3 h-3" />
                <span className={checkoutStep === 'payment' ? 'text-stone-950' : ''}>Payment</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left: Step Forms */}
                <div className="lg:col-span-7 bg-white border border-stone-100 rounded-3xl p-6 sm:p-8">
                    {checkoutStep === 'information' && (
                        <form onSubmit={handleAddressSubmit} className="space-y-6">
                            <h2 className="font-serif text-xl tracking-wider text-stone-950 uppercase font-light mb-6">
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-bold tracking-widest text-stone-400 uppercase mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-950 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-bold tracking-widest text-stone-400 uppercase mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-950 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-bold tracking-widest text-stone-400 uppercase mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-950 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-bold tracking-widest text-stone-400 uppercase mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-950 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[9px] font-bold tracking-widest text-stone-400 uppercase mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-950 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="col-span-2 sm:col-span-2">
                                    <label className="block text-[9px] font-bold tracking-widest text-stone-400 uppercase mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-950 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-bold tracking-widest text-stone-400 uppercase mb-2">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-950 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-bold tracking-widest text-stone-400 uppercase mb-2">
                                        ZIP
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-950 transition-colors"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors duration-150 shadow-sm flex items-center justify-center gap-2"
                            >
                                <span>Continue to Shipping</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {checkoutStep === 'shipping' && (
                        <form onSubmit={handleShippingSubmit} className="space-y-6">
                            <div className="flex items-center gap-2 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setCheckoutStep('information')}
                                    className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <h2 className="font-serif text-xl tracking-wider text-stone-950 uppercase font-light">
                                    Shipping Method
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {shippingZones.map((zone) => (
                                    <label
                                        key={zone.id}
                                        className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-150 ${checkoutShipping?.zoneId === zone.id
                                            ? 'border-stone-950 bg-stone-50/50'
                                            : 'border-stone-200 hover:border-stone-400'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shippingMethod"
                                                checked={checkoutShipping?.zoneId === zone.id}
                                                onChange={() =>
                                                    setCheckoutShipping({
                                                        zoneId: zone.id,
                                                        zoneName: zone.name,
                                                        rate: parseFloat(zone.rate || '0'),
                                                        rateType: zone.rateType || 'flat',
                                                    })
                                                }
                                                className="text-stone-950 focus:ring-stone-950"
                                            />
                                            <div>
                                                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                                                    {zone.name}
                                                </span>
                                                <span className="text-[10px] text-stone-500 block mt-0.5">
                                                    Standard Delivery
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-stone-900">
                                            {formatPrice(parseFloat(zone.rate || '0'))}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={!checkoutShipping}
                                className="w-full py-4 rounded-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors duration-150 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Continue to Payment</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {checkoutStep === 'payment' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-6">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCheckoutStep(
                                            shippingEnabled && shippingZones.length > 0 ? 'shipping' : 'information'
                                        )
                                    }
                                    className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <h2 className="font-serif text-xl tracking-wider text-stone-950 uppercase font-light">
                                    Payment Method
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {Object.entries(paymentMethods).map(([key, method]) => {
                                    if (!method.enabled) return null
                                    return (
                                        <label
                                            key={key}
                                            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-150 ${selectedPayment === key
                                                ? 'border-stone-950 bg-stone-50/50'
                                                : 'border-stone-200 hover:border-stone-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    checked={selectedPayment === key}
                                                    onChange={() => setSelectedPayment(key)}
                                                    className="text-stone-950 focus:ring-stone-950"
                                                />
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4 text-stone-600" />
                                                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                                                        {key === 'cod' ? 'Cash on Delivery' : key === 'bank' ? 'Bank Transfer' : key}
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                    )
                                })}
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={!selectedPayment || isPlacingOrder}
                                className="w-full py-4 rounded-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors duration-150 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPlacingOrder ? (
                                    <span>Placing Order...</span>
                                ) : (
                                    <>
                                        <span>Place Order</span>
                                        <span>{formatPrice(orderTotal)}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Order Summary Sidebar */}
                <div className="lg:col-span-5 bg-stone-50 border border-stone-100 rounded-3xl p-6 sm:p-8 space-y-6">
                    <h2 className="font-serif text-lg tracking-wider text-stone-950 uppercase font-light">
                        Order Summary
                    </h2>

                    {/* Cart Items */}
                    <div className="divide-y divide-stone-200 max-h-60 overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={item.variantId} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-12 h-16 bg-white rounded-lg object-cover border border-stone-100"
                                    />
                                ) : (
                                    <div className="w-12 h-16 bg-white rounded-lg border border-stone-100 flex items-center justify-center text-stone-400">
                                        <ShoppingBag className="w-4 h-4" />
                                    </div>
                                )}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-stone-900 tracking-wide line-clamp-1">
                                            {item.name}
                                        </h3>
                                        {item.variantLabel && (
                                            <p className="text-[9px] text-stone-500 uppercase tracking-wider mt-0.5">
                                                {item.variantLabel}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-[10px] text-stone-500">Qty {item.quantity}</span>
                                        <span className="text-[11px] font-bold text-stone-900">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t border-stone-200 pt-6 space-y-3">
                        <div className="flex justify-between text-xs text-stone-500 uppercase tracking-wider">
                            <span>Subtotal</span>
                            <span className="font-bold text-stone-900">{formatPrice(cartSubtotal)}</span>
                        </div>
                        {shippingEnabled && shippingZones.length > 0 && (
                            <div className="flex justify-between text-xs text-stone-500 uppercase tracking-wider">
                                <span>Shipping</span>
                                <span className="font-bold text-stone-900">
                                    {checkoutShipping ? formatPrice(shippingCost) : 'Calculated next'}
                                </span>
                            </div>
                        )}
                        <div className="border-t border-stone-200 pt-4 flex justify-between text-xs font-bold text-stone-900 uppercase tracking-widest">
                            <span>Total</span>
                            <span>{formatPrice(orderTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
