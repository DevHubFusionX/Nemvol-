import { Routes, Route } from 'react-router-dom'
import { StorefrontProvider } from './context/StorefrontProvider'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import SummerCarousel from './components/Carousel/SummerCarousel'
import CategoryGrid from './components/Category/CategoryGrid'
import MembershipClub from './components/Membership/MembershipClub'
import Footer from './components/Footer/Footer'
import ProductDetails from './components/Product/ProductDetails'
import ProductsPage from './components/Product/ProductsPage'
import CheckoutPage from './components/Checkout/CheckoutPage'

const mockStore = {
    id: 'preview-id',
    name: 'Nemvol Preview Store',
    slug: 'preview',
    tagline: 'A beautiful minimalist storefront',
    theme: 'nubia',
    published: 'true',
    accentColor: '#1c1917',
    currency: 'USD',
    whatsapp: '1234567890',
}

export default function StorefrontPreview() {
    return (
        <StorefrontProvider slug="preview" store={mockStore as any}>
            <div className="min-h-screen bg-stone-50 flex flex-col">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Hero />
                                    <SummerCarousel />
                                    <CategoryGrid />
                                    <MembershipClub />
                                </>
                            }
                        />
                        <Route path="/product/:productId" element={<ProductDetails />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/category/:categoryId" element={<ProductsPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </StorefrontProvider>
    )
}
