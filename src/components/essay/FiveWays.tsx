'use client'

import { useEffect, useRef, useState } from 'react'
import { Figure } from './Figure'

// fig. 1 — one bug, found five ways. Each generation gets the same broken function
// and finds out it's wrong the way they would have. The wait is compressed but
// keeps its proportions roughly in order.
const CODE = `def average(nums):
    total = 0
    for x in nums:
        total = x
    return total / len(nums)

print(average([2, 4, 6]))   # want 4.0`

type Gen = {
  id: string
  label: string
  years: string
  action: string
  wait: number // ms, compressed
  waitLabel: string
  found: string
  result: string
  lesson: string
}

const GENS: Gen[] = [
  {
    id: 'cards',
    label: 'punch cards',
    years: '1955–75',
    action: 'hand the deck to the operator',
    wait: 2600,
    waitLabel: 'results tomorrow morning…',
    found: 'printout, next day:\n  2.0',
    result: 'One wrong number, a day later. You go through the deck card by card until you spot total = x.',
    lesson: 'precision',
  },
  {
    id: 'terminal',
    label: 'terminal',
    years: '1975–93',
    action: 'run it',
    wait: 700,
    waitLabel: 'running…',
    found: '$ python avg.py\n2.0',
    result: 'Seconds later you have the wrong answer. You change a line, run it again, and again, until it moves.',
    lesson: 'how machines fail',
  },
  {
    id: 'web',
    label: 'view source',
    years: '1993–2008',
    action: 'find someone else’s that works',
    wait: 1100,
    waitLabel: 'loading page…',
    found: '# from a page that worked\nfor x in nums:\n    total += x',
    result: 'You put their code next to yours and read both until the difference jumps out: += versus =.',
    lesson: 'reading',
  },
  {
    id: 'so',
    label: 'stack overflow',
    years: '2008–22',
    action: 'search the symptom',
    wait: 1300,
    waitLabel: 'searching “python average wrong answer”…',
    found: '▲ 214  You’re overwriting total on every\n       pass. Use total += x.',
    result: 'Someone else found it first. You still have to fit their answer to your code, so you understand it a little.',
    lesson: 'adaptation',
  },
  {
    id: 'agent',
    label: 'agent',
    years: '2022–',
    action: 'ask the agent',
    wait: 250,
    waitLabel: 'working…',
    found: '✓ Fixed a bug in average(). All tests pass.',
    result: 'Done before you looked. You never saw the bug, which is the point and the problem.',
    lesson: 'judgment, maybe',
  },
]

export function FiveWays() {
  const [gi, setGi] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'waiting' | 'done'>('idle')
  const [showDiff, setShowDiff] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const g = GENS[gi]

  useEffect(() => () => clearTimeout(timer.current), [])

  const pick = (i: number) => {
    clearTimeout(timer.current)
    setGi(i)
    setPhase('idle')
    setShowDiff(false)
  }
  const go = () => {
    if (phase !== 'idle') return
    setPhase('waiting')
    timer.current = setTimeout(() => setPhase('done'), g.wait)
  }

  return (
    <Figure
      n={1}
      caption={
        <>
          one bug, five generations. pick one and find out what&apos;s wrong the
          way they would have. the waits are shortened, but the order is right.
        </>
      }
    >
      <div className="lit-toggle gen-eras mono fw-tabs" role="group" aria-label="Generation">
        {GENS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={i === gi}
            className={i === gi ? 'is-on' : undefined}
            onClick={() => pick(i)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <pre className="fw-code">
        <code>{CODE}</code>
      </pre>

      <div className="debt-controls mono fw-controls">
        <button type="button" onClick={go} disabled={phase !== 'idle'}>
          {g.action}
        </button>
        <span className="muted">{g.years}</span>
      </div>

      <div className="fw-out" aria-live="polite">
        {phase === 'waiting' && (
          <>
            <p className="mono muted">{g.waitLabel}</p>
            <div className="ap-meter fw-meter">
              <i style={{ animationDuration: `${g.wait}ms` }} />
            </div>
          </>
        )}
        {phase === 'done' && (
          <>
            <pre className={g.id === 'cards' || g.id === 'terminal' ? 'is-error' : undefined}>
              <code>{g.found}</code>
            </pre>
            <p className="fig-note">{g.result}</p>
            {g.id === 'agent' && (
              <p className="mono">
                <button type="button" className="link-button" onClick={() => setShowDiff((s) => !s)}>
                  {showDiff ? 'hide what it changed' : 'show what it changed'}
                </button>
                {showDiff && <span className="fw-diff">{'  - total = x\n  + total += x'}</span>}
              </p>
            )}
            <dl className="fig-readout mono">
              <dt>learned</dt>
              <dd>{g.lesson}</dd>
            </dl>
          </>
        )}
      </div>
    </Figure>
  )
}
