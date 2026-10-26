'use client'

import { useState, type ReactNode } from 'react'

// Coined terms: dotted underline, tap or hover for the definition.
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
  return (
    <span
      className="term"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="term-word"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </button>
      {open && (
        <span className="term-pop" role="tooltip">
          <span className="mono">def.</span> {DEFS[id]}
        </span>
      )}
    </span>
  )
}

// Numbered source note: tap the superscript, the source opens inline.
export function Note({ n, children }: { n: number; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <sup className="note-ref">
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {n}
        </button>
      </sup>
      {open && <span className="note-body mono">{n}. {children}</span>}
    </>
  )
}
