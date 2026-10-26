'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 3 — how many lessons a career gives you at each layer. Illustrative numbers:
// ~100 afternoon-sized mistakes a year, ~1 year-sized mistake every three years.
const PER_YEAR_SMALL = 100
const PER_YEAR_LARGE = 0.3

export function Samples() {
  const [years, setYears] = useState(20)
  const small = Math.round(years * PER_YEAR_SMALL)
  const large = Math.floor(years * PER_YEAR_LARGE)

  return (
    <Figure
      n={4}
      caption={
        <>
          a career&apos;s worth of samples. each small dot is a wrong loop, an
          afternoon. each large one is a wrong product, a year. illustrative,
          not data.
        </>
      }
    >
      <label className="fig-slider mono">
        <span>career: {years} {years === 1 ? 'year' : 'years'}</span>
        <input
          type="range"
          min={1}
          max={40}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        />
      </label>

      <div className="fig-rows">
        <div>
          <p className="mono">wrong loops · {small.toLocaleString()}</p>
          <div className="dots dots-small" aria-hidden="true">
            {Array.from({ length: small }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
        <div>
          <p className="mono">wrong products · {large}</p>
          <div className="dots dots-large" aria-hidden="true">
            {Array.from({ length: large }, (_, i) => (
              <i key={i} />
            ))}
            {large === 0 && <span className="mono muted">none yet</span>}
          </div>
        </div>
      </div>
    </Figure>
  )
}
