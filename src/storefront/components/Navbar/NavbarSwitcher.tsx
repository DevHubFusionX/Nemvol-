import { useState } from 'react'
import DefaultNavbar from './variants/DefaultNavbar'
import DroleNavbar from './variants/DroleNavbar'
import ClassicNavbar from './variants/ClassicNavbar'
import MinimalNavbar from './variants/MinimalNavbar'
import SearchOverlay from '../ui/SearchOverlay'
import { useThemeConfig } from '../../hooks/useThemeConfig'
import type { StoreSettings, Product } from '../../types'

interface Props {
  settings: StoreSettings
  products?: Product[]
}

export default function NavbarSwitcher({ settings, products = [] }: Props) {
  const [searchOpen, setSearchOpen] = useState(false)
  const { getVariant } = useThemeConfig()
  const variant = getVariant('nav')

  return (
    <>
      {variant === 'drole' && (
        <DroleNavbar
          settings={settings}
          products={products}
          onSearchOpen={() => setSearchOpen(true)}
        />
      )}
      {variant === 'classic' && (
        <ClassicNavbar
          settings={settings}
          onSearchOpen={() => setSearchOpen(true)}
        />
      )}
      {variant === 'minimal' && (
        <MinimalNavbar
          settings={settings}
          products={products}
          onSearchOpen={() => setSearchOpen(true)}
        />
      )}
      {variant === 'default' && (
        <DefaultNavbar
          settings={settings}
          onSearchOpen={() => setSearchOpen(true)}
        />
      )}

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
      />
    </>
  )
}
