'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 5 — literacy inverted. Out of 100 people, who can read and who can write.
// Illustrative proportions, not historical data.
const ERAS = {
  '1650': { read: 60, write: 30, note: 'a public: many can check, few can produce' },
  '2035': { read: 6, write: 96, note: 'a priesthood: everyone produces, few can check' },
} as const
type Era = keyof typeof ERAS

function Row({ label, n }: { label: string; n: number }) {
  return (
    <div className="lit-row">
      <span className="mono">{label}</span>
      <div className="lit-ticks" role="img" aria-label={`${n} of 100`}>
        {Array.from({ length: 100 }, (_, i) => (
          <i key={i} className={i < n ? 'on' : undefined} />
        ))}
      </div>
      <span className="mono lit-n">{n}</span>
    </div>
  )
}

export function Literacy() {
  const [era, setEra] = useState<Era>('1650')
  const e = ERAS[era]
  return (
    <Figure
      n={5}
      caption={<>out of a hundred people. illustrative, not data.</>}
    >
      <div className="lit-toggle mono" role="group" aria-label="Era">
        {(Object.keys(ERAS) as Era[]).map((k) => (
          <button
            key={k}
            type="button"
            className={k === era ? 'is-on' : undefined}
            aria-pressed={k === era}
            onClick={() => setEra(k)}
          >
            {k === '1650' ? '1650 · books' : '2035 · code'}
          </button>
        ))}
      </div>
      <Row label="can read" n={e.read} />
      <Row label="can write" n={e.write} />
      <p className="mono fig-aside">{e.note}</p>
    </Figure>
  )
}
