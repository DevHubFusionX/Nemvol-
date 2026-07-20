import { useThemeConfig } from '../../hooks/useThemeConfig'
import type { Product } from '../../types'
import DefaultCard from './variants/DefaultCard'
import DroleCard from './variants/DroleCard'
import MinimalCard from './variants/MinimalCard'
import ModernCard from './variants/ModernCard'
import ElevatedCard from './variants/ElevatedCard'

interface Props {
  product: Product
}

export default function CardSwitcher({ product }: Props) {
  const { getVariant } = useThemeConfig()
  const variant = getVariant('productCard')

  if (variant === 'drole') {
    return <DroleCard product={product} />
  }
  if (variant === 'minimal') {
    return <MinimalCard product={product} />
  }
  if (variant === 'modern') {
    return <ModernCard product={product} />
  }
  if (variant === 'elevated') {
    return <ElevatedCard product={product} />
  }
  return <DefaultCard product={product} />
}
