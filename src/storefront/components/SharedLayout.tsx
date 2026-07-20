/**
 * SharedLayout: Universal layout shell used by all templates.
 *
 * Each template passes its ThemeConfig, which provides default variant
 * selections and design tokens. The ThemeBuilder can override any variant.
 */
import { Routes, Route } from 'react-router-dom'
import { CartProvider, CartDrawer } from './Cart/index'
import { ToastProvider } from './ui/ToastContext'
import { QuickViewProvider } from './QuickViewContext'
import QuickViewModal from './ui/QuickViewModal'
import ScrollToTop from './ui/ScrollToTop'
import NavbarSwitcher from './Navbar/NavbarSwitcher'
import FooterSwitcher from './Footer/FooterSwitcher'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotFoundPage from './pages/NotFoundPage'
import StorePage from './pages/StorePage'
import AccountPage from './pages/AccountPage'
import { useStorefront } from './useStorefront'
import type { ThemeConfig } from '../templates/types'

interface Props {
  theme: ThemeConfig
}

export default function SharedLayout({ theme }: Props) {
  const { settings, products } = useStorefront()

  if (!settings) return null

  return (
    <ToastProvider>
      <CartProvider>
        <QuickViewProvider>
          <ScrollToTop />
          <Routes>
            {/* Auth routes — no navbar/footer */}
            <Route path="login"  element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />

            {/* Main shell */}
            <Route path="*" element={
              <div className={`min-h-screen ${theme.tokens.bgClass} font-sans flex flex-col`}>
                <NavbarSwitcher settings={settings} products={products} />
                <div className="flex-1 flex flex-col">
                  <main className="flex-1">
                    <Routes>
                      <Route path="/"             element={<HomePage settings={settings} products={products} />} />
                      <Route path="products"      element={<ProductsPage products={products} />} />
                      <Route path="products/:id"  element={<ProductDetailPage products={products} />} />
                      <Route path="pages/:slug"   element={<StorePage />} />
                      <Route path="account"       element={<AccountPage />} />
                      <Route path="checkout"      element={<CheckoutPage />} />
                      <Route path="*"             element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  <FooterSwitcher settings={settings} />
                </div>
                <CartDrawer />
                <QuickViewModal />
              </div>
            } />
          </Routes>
        </QuickViewProvider>
      </CartProvider>
    </ToastProvider>
  )
}
