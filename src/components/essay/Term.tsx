'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const DEFS: Record<string, string> = {
  'gettier-code': 'Code that works, for reasons nobody who depends on it understands.',
  'gettier-debt':
    'The stock of Gettier code in a system. Invisible until something breaks, then due all at once.',
  'rented-taste': "Judgment you use but don't own. It works exactly as long as the subscription does.",
  'write-only-literacy': 'When everyone can write code and almost no one can read it.',
  'the-unread': "People whose working lives run on code they can't read, and were never made to learn.",
  'synthetic-friction':
    'Difficulty added on purpose, with the agent switched off, so you can still learn by being wrong.',
}

export function Term({ id, children }: { id: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [shift, setShift] = useState(0)
  const root = useRef<HTMLSpanElement>(null)
  const pop = useRef<HTMLSpanElement>(null)
  const tipId = useId()
  const hovered = useRef(false)

  useIsoLayoutEffect(() => {
    if (!open) return
    // keep the popover inside the viewport (16px gutter)
    const r = pop.current?.getBoundingClientRect()
    if (r) setShift(Math.min(0, document.documentElement.clientWidth - 16 - r.right) || Math.max(0, 16 - r.left))
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); setShift(0) }
  }, [open])

  return (
    <span
      ref={root}
      className="term"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') { hovered.current = true; setOpen(true) } }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') { hovered.current = false; setOpen(false) } }}
    >
      <button
        type="button"
        className="term-word"
        aria-describedby={open ? tipId : undefined}
        onClick={() => setOpen((o) => hovered.current || !o)}
        onFocus={(e) => e.currentTarget.matches(':focus-visible') && setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </button>
      {open && (
        <span ref={pop} id={tipId} className="term-pop" role="tooltip" style={shift ? { left: shift } : undefined}>
          <span className="mono">def.</span> {DEFS[id]}
        </span>
      )}
    </span>
  )
}

export function Note({ n, children }: { n: number; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const bodyId = useId()
  return (
    <>
      <sup className="note-ref">
        <button type="button" aria-expanded={open} aria-controls={bodyId} aria-label={`Source ${n}`} onClick={() => setOpen((o) => !o)}>
          {n}
        </button>
      </sup>
      {open && <span id={bodyId} className="note-body mono">{n}. {children}</span>}
    </>
  )
}
