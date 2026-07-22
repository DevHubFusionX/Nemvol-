import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultCartDrawer from './variants/DefaultCartDrawer'
import DroleCartDrawer from './variants/DroleCartDrawer'
import ModernCartDrawer from './variants/ModernCartDrawer'
import SplitCartDrawer from './variants/SplitCartDrawer'

interface Props { isOpen: boolean; onClose: () => void }

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { cartDrawer } = useTemplateState()

  switch (cartDrawer?.variant) {
    case 'drole': return <DroleCartDrawer isOpen={isOpen} onClose={onClose} />
    case 'modern': return <ModernCartDrawer isOpen={isOpen} onClose={onClose} />
    case 'split': return <SplitCartDrawer isOpen={isOpen} onClose={onClose} />
    default: return <DefaultCartDrawer isOpen={isOpen} onClose={onClose} />
  }
}
