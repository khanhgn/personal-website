'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 2 — a small Gettier test. Two functions that both look like they work.
const A = `def dedupe(items):
    # keep the first of each, in order
    return list(set(items))`

const B = `def dedupe(items):
    # keep the first of each, in order
    seen = set()
    return [x for x in items
            if not (x in seen or seen.add(x))]`

export function Plausible() {
  const [pick, setPick] = useState<'a' | 'b' | null>(null)

  return (
    <Figure
      n={2}
      caption={<>which one is correct? one of them is what correct code looks like.</>}
    >
      <div className="fig-pair">
        {(['a', 'b'] as const).map((k) => {
          const chosen = pick === k
          const right = k === 'b'
          return (
            <button
              key={k}
              type="button"
              className={`fig-choice${chosen ? ' is-chosen' : ''}`}
              onClick={() => setPick(k)}
              aria-pressed={chosen}
            >
              <span className="mono">{k}.</span>
              <pre>
                <code>{k === 'a' ? A : B}</code>
              </pre>
              {pick && (
                <span className="mono fig-verdict">
                  {right ? 'correct' : 'plausible'}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {pick && (
        <p className="fig-note">
          {pick === 'a'
            ? 'Most people pick a. It reads cleanly and it runs. But a set has no order, so dedupe([3, 1, 3, 2]) can come back as [1, 2, 3]. The comment is true of b, not a.'
            : 'b looks like a trick, and it is the one that keeps order. If you knew that, you probably learned it by shipping a first and finding out.'}{' '}
          <button type="button" className="link-button mono" onClick={() => setPick(null)}>
            reset
          </button>
        </p>
      )}
    </Figure>
  )
}
