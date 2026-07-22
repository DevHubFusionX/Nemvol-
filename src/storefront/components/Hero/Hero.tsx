import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultHero from './variants/DefaultHero'
import FullscreenHero from './variants/FullscreenHero'
import EditorialHero from './variants/EditorialHero'
import ProductSpotlightHero from './variants/ProductSpotlightHero'

export default function Hero() {
  const { heroLook } = useTemplateState()

  switch (heroLook?.variant) {
    case 'fullscreen': return <FullscreenHero />
    case 'editorial': return <EditorialHero />
    case 'product-banner': return <ProductSpotlightHero />
    default: return <DefaultHero />
  }
}
