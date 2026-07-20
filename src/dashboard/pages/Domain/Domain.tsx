import { useState } from 'react'
import DomainHeader from './DomainHeader'
import DomainCards from './DomainCards'
import ConnectDomainDrawer from './modals/ConnectDomainDrawer'
import GetDomainDrawer from './modals/GetDomainDrawer'

export default function Domain() {
  const [connectOpen, setConnectOpen] = useState(false)
  const [getNewOpen, setGetNewOpen] = useState(false)

  return (
    <div className="space-y-5">
      <DomainHeader
        onConnect={() => setConnectOpen(true)}
        onGetNew={() => setGetNewOpen(true)}
      />
      <DomainCards />

      <ConnectDomainDrawer
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
      />
      <GetDomainDrawer
        open={getNewOpen}
        onClose={() => setGetNewOpen(false)}
      />
    </div>
  )
}
