import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultCategoryGrid from './variants/DefaultCategoryGrid'
import DroleCategoryGrid from './variants/DroleCategoryGrid'

export default function CategoryGrid() {
  const { categoryPage } = useTemplateState()

  switch (categoryPage?.variant) {
    case 'drole': return <DroleCategoryGrid />
    default: return <DefaultCategoryGrid />
  }
}
