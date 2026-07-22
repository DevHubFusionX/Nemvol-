import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultProductDetails from './page-variants/DefaultProductDetails'
import DroleProductDetails from './page-variants/DroleProductDetails'
import ModernProductDetails from './page-variants/ModernProductDetails'
import SplitProductDetails from './page-variants/SplitProductDetails'

export default function ProductDetails() {
  const { productPage } = useTemplateState()

  switch (productPage?.variant) {
    case 'drole': return <DroleProductDetails />
    case 'modern': return <ModernProductDetails />
    case 'split': return <SplitProductDetails />
    default: return <DefaultProductDetails />
  }
}
