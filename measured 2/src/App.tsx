import { useEffect, useState, type ComponentType } from 'react'
import Atlas from './Atlas'
import { DomainShell } from './lib/shell'
import { DOMAINS } from './data/registry'
import Measured from './domains/Measured'
import Aurum from './domains/Aurum'
import Meridian from './domains/Meridian'
import Vireo from './domains/Vireo'
import Halcyon from './domains/Halcyon'
import Voltara from './domains/Voltara'
import Sonora from './domains/Sonora'
import Terra from './domains/Terra'
import Cipher from './domains/Cipher'
import Fathom from './domains/Fathom'

const PAGES: Record<string, ComponentType> = {
  measured: Measured,
  aurum: Aurum,
  meridian: Meridian,
  vireo: Vireo,
  halcyon: Halcyon,
  voltara: Voltara,
  sonora: Sonora,
  terra: Terra,
  cipher: Cipher,
  fathom: Fathom,
}

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const slug = hash.startsWith('#/d/') ? hash.slice(4) : ''
  const domain = DOMAINS.find((d) => d.slug === slug)

  useEffect(() => {
    const root = document.documentElement
    const prev = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    root.style.scrollBehavior = prev
    document.title = domain ? `${domain.name} — ${domain.product} · Measured Atlas` : 'Measured Atlas — Ten Products, Ten Hidden Layers'
  }, [slug, domain])

  if (domain) {
    const Page = PAGES[domain.slug]
    return (
      <DomainShell key={domain.slug} d={domain}>
        <Page />
      </DomainShell>
    )
  }
  return <Atlas />
}
