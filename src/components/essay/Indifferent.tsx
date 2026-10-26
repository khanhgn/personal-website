'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 6 — the same line, given to a machine that does what you said and an
// agent that does what you meant.

type Val = { s: string } | null
// Python-ish literal: 'x', "x" (with \n \t \\ \' \"), adjacent strings concatenate, ints/floats.
function literal(src: string): Val {
  const t = src.trim()
  if (/^-?\d+(\.\d+)?$/.test(t)) return { s: String(Number(t)) }
  const re = /\s*(["'])((?:\\.|(?!\1)[^\\])*)\1/y
  let out = '', pos = 0, m: RegExpExecArray | null
  while ((re.lastIndex = pos), (m = re.exec(t))) {
    out += m[2].replace(/\\(.)/g, (_, c) => ({ n: '\n', t: '\t' } as Record<string, string>)[c] ?? c)
    pos = re.lastIndex
  }
  return pos > 0 && t.slice(pos).trim() === '' ? { s: out } : null
}
function splitArgs(s: string) { // split on commas outside quotes
  const out: string[] = []; let cur = '', q = ''
  for (const ch of s) {
    if (q) { cur += ch; if (ch === q && !cur.endsWith('\\' + q)) q = ''; continue }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue }
    if (ch === ',') { out.push(cur); cur = ''; continue }
    cur += ch
  }
  return s.trim() ? [...out, cur] : []
}
type Parsed =
  | { kind: 'empty' } | { kind: 'syntax' } | { kind: 'name'; name: string; inCall?: string }
  | { kind: 'value'; out: string } | { kind: 'assign' }
  | { kind: 'call'; fn: string; args: string[] | null } // args null = an arg failed to parse
function parse(src: string): Parsed {
  const t = src.trim()
  if (!t) return { kind: 'empty' }
  const call = t.match(/^([A-Za-z_][\w.]*)\s*\(([\s\S]*)\)$/)
  if (call) {
    const raw = splitArgs(call[2]).map((a) => a.trim())
    const bad = raw.find((a) => /^[A-Za-z_]\w*$/.test(a))
    if (bad) return { kind: 'name', name: bad, inCall: call[1] }
    const parts = raw.map(literal)
    return { kind: 'call', fn: call[1], args: parts.every(Boolean) ? parts.map((p) => p!.s) : null }
  }
  if (/^[A-Za-z_]\w*\s*=[^=]/.test(t)) return { kind: 'assign' }
  if (/^[A-Za-z_]\w*$/.test(t)) return { kind: 'name', name: t }
  const lit = literal(t); if (lit) return { kind: 'value', out: /^["']/.test(t) ? `'${lit.s}'` : lit.s }
  if (/^[\d\s+\-*/().]+$/.test(t)) { try { return { kind: 'value', out: String(Function(`"use strict";return (${t})`)()) } } catch {} }
  return { kind: 'syntax' }
}
const dist = (a: string, b: string) => { const d = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)))
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return d[a.length][b.length] }
function machine(src: string) {
  const p = parse(src)
  switch (p.kind) {
    case 'empty': case 'assign': return { out: '', error: false }
    case 'value': return { out: p.out, error: false }
    case 'name': return { out: `NameError: name '${p.name}' is not defined`, error: true }
    case 'syntax': return { out: /^print\s+\S/.test(src.trim()) ? "SyntaxError: Missing parentheses in call to 'print'" : 'SyntaxError: invalid syntax', error: true }
    case 'call':
      if (p.fn !== 'print') return { out: `NameError: name '${p.fn.split('.')[0]}' is not defined`, error: true }
      if (!p.args) return { out: 'SyntaxError: invalid syntax', error: true }
      return { out: p.args.join(' '), error: false }
  }
}
function agent(src: string) {
  const p = parse(src)
  // what you "meant": the text inside quotes, or the words, minus the code
  const t = src.trim()
  const meant = () =>
    (src.match(/["']([^"']*)["']?/)?.[1] ?? t.match(/^[A-Za-z_][\w.]*\s*\((.*?)\)?$/)?.[1] ?? t.replace(/^print\s+/, '')).trim() || t
  switch (p.kind) {
    case 'empty': return { out: '', note: '' }
    case 'value': case 'assign': { const m = machine(src); return { out: m.out, note: '' } }
    case 'name':
      return p.inCall && dist(p.inCall, 'print') <= 2
        ? { out: p.name, note: "I assumed you meant the word, not a variable." }
        : { out: p.name, note: `${p.name} isn't defined, so I printed it instead.` }
    case 'syntax': return { out: meant(), note: 'I tidied up the syntax for you.' }
    case 'call': {
      const out = p.args ? p.args.join(' ') : meant()
      if (p.fn === 'print') return { out, note: p.args ? '' : 'I tidied up the syntax for you.' }
      if (dist(p.fn, 'print') <= 2) return { out, note: 'I assumed you meant print.' }
      return { out, note: `${p.fn} isn't defined, so I printed it instead.` }
    }
  }
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
