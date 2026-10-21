'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      className="mono underline underline-offset-2"
      onClick={() => setTheme(otherTheme)}
    >
      {mounted ? `[${otherTheme}]` : '[theme]'}
    </button>
  )
}

export default ThemeSwitch
