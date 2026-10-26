'use client'

import { useEffect, useState } from 'react'

// A one-pixel reading line across the top of the page.
export function Progress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])
  return <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}
