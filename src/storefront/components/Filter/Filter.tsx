import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultFilter from './variants/DefaultFilter'
import DroleFilter from './variants/DroleFilter'

type SortOption = 'featured' | 'price-asc' | 'price-desc'

interface Props {
  activeCategory?: string
  sortBy: SortOption
  onSort: (s: SortOption) => void
  total: number
}

export default function Filter(props: Props) {
  const { filter } = useTemplateState()

  switch (filter?.variant) {
    case 'drole': return <DroleFilter {...props} />
    default: return <DefaultFilter {...props} />
  }
}
