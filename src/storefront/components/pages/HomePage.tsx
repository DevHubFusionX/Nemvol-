import NubiaHero from '../Hero/HeroSwitcher'
import NubiaFeaturedProduct from '../NubiaFeaturedProduct'
import NubiaProductGrid from '../ProductGrid/NubiaProductGrid'
import NubiaTestimonials from '../NubiaTestimonials'
import CategoryBanner from '../CategoryBanner'
import BrandStrip from '../ui/BrandStrip'
import PageTransition from '../ui/PageTransition'
import type { StoreSettings, Product } from '../../types'

interface Props {
  settings: StoreSettings
  products: Product[]
}

export default function HomePage({ settings, products }: Props) {
  const featured = products.find(p => p.tagList.includes('featured'))
  const grid = products.filter(p => !p.tagList.includes('featured'))

  return (
    <PageTransition>
      <NubiaHero settings={settings} products={products} />
      {featured && <NubiaFeaturedProduct product={featured} />}
      <CategoryBanner />
      <NubiaProductGrid products={grid} />
      <NubiaTestimonials />
      <BrandStrip />
    </PageTransition>
  )
}
