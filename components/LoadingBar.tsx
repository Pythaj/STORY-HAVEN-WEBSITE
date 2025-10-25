'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingBar() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-1 bg-dark-900">
      <div className="h-full bg-gradient-to-r from-primary-gold via-accent-orange to-primary-gold animate-loading-bar" />
    </div>
  )
}
