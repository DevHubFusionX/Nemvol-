import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function useStorefrontBase() {
  const { slug } = useParams<{ slug: string }>()
  return slug ? `/store/${slug}` : ''
}

export function useStorefrontPaths() {
  const base = useStorefrontBase()
  const navigate = useNavigate()

  const path = useCallback(
    (segment = '') => {
      if (!segment || segment === '/') return base || '/'
      const clean = segment.startsWith('/') ? segment.slice(1) : segment
      return base ? `${base}/${clean}` : `/${clean}`
    },
    [base],
  )

  const go = useCallback(
    (segment = '') => navigate(path(segment)),
    [navigate, path],
  )

  return { base, path, go }
}
