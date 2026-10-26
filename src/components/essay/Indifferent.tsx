'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 6 — the same line, given to a machine that does what you said and an
// agent that does what you meant.

function distance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
  return d[a.length][b.length]
}

function parse(src: string) {
  const m = src.trim().match(/^([A-Za-z_]\w*)\s*\(\s*(["'])(.*)\2\s*\)$/)
  return m ? { fn: m[1], arg: m[3] } : null
}

function machine(src: string): { out: string; error: boolean } {
  const p = parse(src)
  if (!src.trim()) return { out: '', error: false }
  if (!p) return { out: 'SyntaxError: invalid syntax', error: true }
  if (p.fn !== 'print')
    return { out: `NameError: name '${p.fn}' is not defined`, error: true }
  return { out: p.arg, error: false }
}

function agent(src: string): { out: string; note: string } {
  const p = parse(src)
  if (!src.trim()) return { out: '', note: '' }
  if (!p) {
    const words = src.replace(/[^\w\s,!.']/g, ' ').trim()
    return { out: words, note: 'I tidied up the syntax for you.' }
  }
  if (p.fn === 'print') return { out: p.arg, note: '' }
  if (distance(p.fn, 'print') <= 2)
    return { out: p.arg, note: `I assumed you meant print.` }
  return { out: p.arg, note: `${p.fn} isn't defined, so I printed it instead.` }
}

export function Indifferent() {
  const [src, setSrc] = useState('pritn("hello, world")')
  const m = machine(src)
  const a = agent(src)

  return (
    <Figure
      n={6}
      caption={<>type anything. one of these will make you change.</>}
    >
      <label className="fig-input mono">
        <span>&gt;&gt;&gt;</span>
        <input
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="A line of Python"
        />
      </label>
      <div className="fig-pair">
        <div className="fig-pane">
          <p className="mono muted">the machine</p>
          <pre className={m.error ? 'is-error' : undefined}>
            <code>{m.out || ' '}</code>
          </pre>
        </div>
        <div className="fig-pane">
          <p className="mono muted">the agent</p>
          <pre>
            <code>{a.out || ' '}</code>
          </pre>
          {a.note && <p className="mono fig-aside">{a.note}</p>}
        </div>
      </div>
    </Figure>
  )
}
