import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultNavbar from './variants/DefaultNavbar'
import MegaMenuNavbar from './variants/MegaMenuNavbar'
import MinimalLuxuryNavbar from './variants/MinimalLuxuryNavbar'
import StickyCategoryNavbar from './variants/StickyCategoryNavbar'

export default function Navbar() {
  const { nav } = useTemplateState()

  switch (nav?.variant) {
    case 'drole': return <MegaMenuNavbar />
    case 'classic': return <MinimalLuxuryNavbar />
    case 'minimal': return <StickyCategoryNavbar />
    default: return <DefaultNavbar />
  }
}
