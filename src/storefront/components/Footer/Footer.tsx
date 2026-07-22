import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultFooter from './DefaultFooter'
import MinimalFooter from './variants/MinimalFooter'
import CorporateFooter from './variants/CorporateFooter'
import DroleFooter from './variants/DroleFooter'
import SocialFooter from './variants/SocialFooter'

export default function Footer() {
  const { footer } = useTemplateState()

  switch (footer?.variant) {
    case 'drole': return <DroleFooter />
    case 'minimal': return <MinimalFooter />
    case 'corporate': return <CorporateFooter />
    case 'social': return <SocialFooter />
    default: return <DefaultFooter />
  }
}
