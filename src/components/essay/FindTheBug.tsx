'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 1 — a short function an agent wrote. One line is wrong. You have to point
// at it before you're allowed to run anything.
const LINES = [
  'def paginate(items, page, size):',
  '    """Return one page of items. Pages start at 1."""',
  '    if size <= 0:',
  '        raise ValueError("size must be positive")',
  '    start = page * size',
  '    end = start + size',
  '    return items[start:end]',
]
const BUG = 4

const ITEMS = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
const run = (page: number, size: number, fixed: boolean) => {
  const start = (fixed ? page - 1 : page) * size
  return ITEMS.slice(start, start + size)
}
const show = (xs: string[]) => `[${xs.map((x) => `'${x}'`).join(', ')}]`

export function FindTheBug() {
  const [pick, setPick] = useState<number | null>(null)
  const [ran, setRan] = useState(false)

  return (
    <Figure
      n={1}
      caption={
        <>
          an agent wrote this. one line is wrong. click it, then you&apos;re allowed
          to run it.
        </>
      }
    >
      <pre className="fb-code" role="listbox" aria-label="Lines of the function">
        <code>
          {LINES.map((l, i) => (
            <span
              key={i}
              role="option"
              aria-selected={pick === i}
              tabIndex={0}
              className={`fb-line${pick === i ? ' is-picked' : ''}${ran && i === BUG ? ' is-bug' : ''}`}
              onClick={() => !ran && setPick(i)}
              onKeyDown={(e) => {
                if (!ran && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  setPick(i)
                }
              }}
            >
              <span className="fb-no muted">{i + 1}</span>
              {l}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>

      <div className="debt-controls mono">
        <button type="button" disabled={pick === null || ran} onClick={() => setRan(true)}>
          {pick === null ? 'pick a line first' : ran ? 'ran' : `run it (you picked line ${pick + 1})`}
        </button>
        {ran && (
          <button
            type="button"
            onClick={() => {
              setRan(false)
              setPick(null)
            }}
          >
            reset
          </button>
        )}
      </div>

      {ran && (
        <div aria-live="polite">
          <pre className="is-error">
            <code>
              {`>>> paginate(${show(ITEMS)}, page=1, size=3)\n${show(run(1, 3, false))}    # wanted ${show(run(1, 3, true))}`}
            </code>
          </pre>
          <p className="fig-note">
            {pick === BUG
              ? 'You got it. Line 5 treats page 1 as if it were page 0, so it skips the first page. It reads perfectly well, which is why it ships.'
              : `Not line ${pick! + 1}. It's line 5: it treats page 1 as if it were page 0, so it skips the first page. The docstring tells you pages start at 1, and nothing in the code looks wrong until you run it.`}
          </p>
        </div>
      )}
    </Figure>
  )
}
