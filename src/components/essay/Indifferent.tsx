'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 5 — the same line, given to a machine that does what you said and an
// agent that does what you meant.

// A tiny Python-ish evaluator: enough that "the machine" is honest about common lines.
type V =
  | { t: 'int' | 'float'; v: number }
  | { t: 'str'; v: string }
  | { t: 'bool'; v: boolean }
  | { t: 'none' }
  | { t: 'fn'; name: string }
// thrown as a plain object so it survives ES5 transpilation
type PyError = { py: string }
const err = (m: string): PyError => ({ py: m })
const isPyError = (e: unknown): e is PyError => typeof e === 'object' && e !== null && 'py' in e

type Tok = { k: 'num' | 'str' | 'name' | 'op'; s: string }
function tokenize(src: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (c === ' ' || c === '\t') { i++; continue }
    if (c === '#') break
    const num = /^\d+(\.\d+)?/.exec(src.slice(i))
    if (num) { out.push({ k: 'num', s: num[0] }); i += num[0].length; continue }
    if (c === '"' || c === "'") {
      let j = i + 1, s = ''
      while (j < src.length && src[j] !== c) {
        if (src[j] === '\\' && j + 1 < src.length) {
          const e = src[j + 1]
          s += e === 'n' ? '\n' : e === 't' ? '\t' : e
          j += 2
        } else s += src[j++]
      }
      if (j >= src.length) throw err('SyntaxError: unterminated string literal')
      out.push({ k: 'str', s }); i = j + 1; continue
    }
    const name = /^[A-Za-z_][\w.]*/.exec(src.slice(i))
    if (name) { out.push({ k: 'name', s: name[0] }); i += name[0].length; continue }
    const op = /^(\/\/|\*\*|==|[-+*/%(),=])/.exec(src.slice(i))
    if (op) { out.push({ k: 'op', s: op[0] }); i += op[0].length; continue }
    throw err('SyntaxError: invalid syntax')
  }
  return out
}

const typeName = (x: V) => (x.t === 'none' ? 'NoneType' : x.t === 'fn' ? 'builtin_function_or_method' : x.t)
function repr(x: V): string {
  switch (x.t) {
    case 'str': return `'${x.v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`
    case 'float': return Number.isInteger(x.v) ? `${x.v}.0` : String(x.v)
    case 'int': return String(x.v)
    case 'bool': return x.v ? 'True' : 'False'
    case 'none': return 'None'
    case 'fn': return `<built-in function ${x.name}>`
  }
}
const str = (x: V) => (x.t === 'str' ? x.v : repr(x))
const num = (x: V) => (x.t === 'int' || x.t === 'float' ? x.v : x.t === 'bool' ? (x.v ? 1 : 0) : NaN)
const isNum = (x: V) => x.t === 'int' || x.t === 'float' || x.t === 'bool'
const mk = (v: number, float: boolean): V => ({ t: float ? 'float' : 'int', v })

const BUILTINS = new Set(['print', 'len', 'str', 'int', 'float', 'abs', 'input', 'type'])
let printed: string[] = []

function call(fn: string, args: V[]): V {
  switch (fn) {
    case 'print': printed.push(args.map(str).join(' ')); return { t: 'none' }
    case 'len': {
      const a = args[0]
      if (!a || a.t !== 'str') throw err(`TypeError: object of type '${a ? typeName(a) : 'NoneType'}' has no len()`)
      return { t: 'int', v: a.v.length }
    }
    case 'str': return { t: 'str', v: args[0] ? str(args[0]) : '' }
    case 'int': {
      const a = args[0]
      if (!a) return { t: 'int', v: 0 }
      if (a.t === 'str') {
        if (!/^\s*-?\d+\s*$/.test(a.v)) throw err(`ValueError: invalid literal for int() with base 10: ${repr(a)}`)
        return { t: 'int', v: parseInt(a.v, 10) }
      }
      return { t: 'int', v: Math.trunc(num(a)) }
    }
    case 'float': return { t: 'float', v: args[0] ? Number(args[0].t === 'str' ? args[0].v : num(args[0])) : 0 }
    case 'abs': return mk(Math.abs(num(args[0])), args[0]?.t === 'float')
    case 'input': throw err('EOFError: EOF when reading a line')
    case 'type': return { t: 'str', v: `<class '${args[0] ? typeName(args[0]) : 'NoneType'}'>` }
  }
  throw err(`NameError: name '${fn}' is not defined`)
}

function binop(op: string, a: V, b: V): V {
  if (op === '+' && a.t === 'str' && b.t === 'str') return { t: 'str', v: a.v + b.v }
  if (op === '*' && a.t === 'str' && b.t === 'int') return { t: 'str', v: a.v.repeat(Math.max(0, b.v)) }
  if (op === '*' && a.t === 'int' && b.t === 'str') return { t: 'str', v: b.v.repeat(Math.max(0, a.v)) }
  if (op === '==') return { t: 'bool', v: repr(a) === repr(b) }
  if (!isNum(a) || !isNum(b)) {
    if (op === '+' && a.t === 'str') throw err(`TypeError: can only concatenate str (not "${typeName(b)}") to str`)
    throw err(`TypeError: unsupported operand type(s) for ${op}: '${typeName(a)}' and '${typeName(b)}'`)
  }
  const x = num(a), y = num(b), f = a.t === 'float' || b.t === 'float'
  switch (op) {
    case '+': return mk(x + y, f)
    case '-': return mk(x - y, f)
    case '*': return mk(x * y, f)
    case '**': return mk(x ** y, f || y < 0)
    case '/': if (y === 0) throw err('ZeroDivisionError: division by zero'); return mk(x / y, true)
    case '//': if (y === 0) throw err('ZeroDivisionError: integer division or modulo by zero'); return mk(Math.floor(x / y), f)
    case '%': if (y === 0) throw err('ZeroDivisionError: integer modulo by zero'); return mk(((x % y) + y) % y, f)
  }
  throw err('SyntaxError: invalid syntax')
}

function evaluate(toks: Tok[]): V {
  let p = 0
  const peek = () => toks[p]
  const eat = (s?: string) => {
    const t = toks[p]
    if (!t || (s && t.s !== s)) throw err('SyntaxError: invalid syntax')
    p++
    return t
  }
  const atom = (): V => {
    const t = eat()
    if (t.k === 'num') return mk(Number(t.s), t.s.includes('.'))
    if (t.k === 'str') {
      let s = t.s
      while (peek()?.k === 'str') s += eat().s // "a" "b" -> "ab"
      return { t: 'str', v: s }
    }
    if (t.k === 'op' && t.s === '(') { const v = expr(); eat(')'); return v }
    if (t.k === 'op' && t.s === '-') { const v = atom(); return binop('*', v, { t: 'int', v: -1 }) }
    if (t.k === 'name') {
      if (t.s === 'True' || t.s === 'False') return { t: 'bool', v: t.s === 'True' }
      if (t.s === 'None') return { t: 'none' }
      const root = t.s.split('.')[0]
      if (!BUILTINS.has(t.s)) throw err(`NameError: name '${root}' is not defined`)
      let v: V = { t: 'fn', name: t.s }
      while (peek()?.s === '(') {
        eat('(')
        const args: V[] = []
        while (peek() && peek().s !== ')') {
          args.push(expr())
          if (peek()?.s === ',') eat(',')
          else break
        }
        eat(')')
        if (v.t !== 'fn') throw err(`TypeError: '${typeName(v)}' object is not callable`)
        v = call(v.name, args)
      }
      return v
    }
    throw err('SyntaxError: invalid syntax')
  }
  const power = (): V => {
    const a = atom()
    if (peek()?.s === '**') { eat(); return binop('**', a, power()) }
    return a
  }
  const term = (): V => {
    let a = power()
    while (peek() && ['*', '/', '//', '%'].includes(peek().s)) { const op = eat().s; a = binop(op, a, power()) }
    return a
  }
  const sum = (): V => {
    let a = term()
    while (peek() && ['+', '-'].includes(peek().s)) { const op = eat().s; a = binop(op, a, term()) }
    return a
  }
  const expr = (): V => {
    const a = sum()
    if (peek()?.s === '==') { eat(); return binop('==', a, sum()) }
    return a
  }
  const v = expr()
  if (p < toks.length) throw err('SyntaxError: invalid syntax')
  return v
}

function run(src: string): { out: string; error: boolean } {
  printed = []
  const line = src.trim()
  if (!line) return { out: '', error: false }
  try {
    if ((line.match(/\(/g) ?? []).length > (line.match(/\)/g) ?? []).length) throw err("SyntaxError: '(' was never closed")
    let toks = tokenize(line)
    if (toks.length === 0) return { out: '', error: false }
    // print "x" is Python 2
    if (toks[0].s === 'print' && toks[1] && toks[1].s !== '(')
      throw err("SyntaxError: Missing parentheses in call to 'print'. Did you mean print(...)?")
    const assign = toks[0].k === 'name' && toks[1]?.s === '='
    if (assign) toks = toks.slice(2)
    const v = evaluate(toks)
    const shown = assign || v.t === 'none' ? '' : repr(v)
    return { out: [...printed, shown].filter((s, i, a) => s !== '' || (i < a.length - 1)).join('\n'), error: false }
  } catch (e) {
    if (isPyError(e)) return { out: [...printed, e.py].join('\n'), error: true }
    throw e
  }
}

const dist = (a: string, b: string) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)))
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

function machine(src: string) {
  return run(src)
}

// The agent: if the machine objects, guess what you meant, fix it, and try again.
function agent(src: string): { out: string; note: string } {
  let t = src.trim()
  let m = run(t)
  const notes: string[] = []
  for (let attempt = 0; m.error && attempt < 4; attempt++) {
    const name = /NameError: name '([^']+)'/.exec(m.out)?.[1]
    let next: string | null = null
    if (name && t === name) {
      return { out: name, note: `${name} isn't defined, so I treated it as text.` }
    } else if (name && new RegExp(`^${name.replace(/\./g, '\\.')}[\\w.]*\\s*\\(`).test(t)) {
      next = t.replace(/^[\w.]+\s*\(/, 'print(')
      notes.push(dist(name.toLowerCase(), 'print') <= 2 ? 'I assumed you meant print.' : `${name} isn't defined, so I printed it instead.`)
    } else if (name) {
      next = t.replace(new RegExp(`\\b${name}\\b`), `"${name}"`)
      notes.push(`${name} isn't defined, so I treated it as text.`)
    } else if (/^print\s+[^(]/.test(t)) {
      next = `print(${t.replace(/^print\s+/, '')})`
      notes.push('I added the parentheses.')
    } else if ((t.match(/\(/g) ?? []).length > (t.match(/\)/g) ?? []).length) {
      next = t + ')'
      notes.push('I closed the bracket.')
    } else if (/^TypeError: (can only concatenate|unsupported operand)/.test(m.out)) {
      next = t.replace(/(^|[^\w."'])(\d+(?:\.\d+)?)(?![\w."'])/g, '$1str($2)')
      notes.push('I turned the number into text.')
    } else if (/^ValueError/.test(m.out)) {
      return { out: '0', note: "That isn't a number, so I used 0." }
    } else if (/^ZeroDivisionError/.test(m.out)) {
      return { out: 'inf', note: "You can't divide by zero, so I used infinity." }
    } else if (/^EOFError/.test(m.out)) {
      return { out: '', note: "I can't ask you for input here, so I left it empty." }
    }
    if (next === null || next === t) break
    t = next
    m = run(t)
  }
  if (!m.error) return { out: m.out, note: notes.join(' ') }
  const meant = (/["']([^"']*)["']?/.exec(src)?.[1] ?? src.replace(/[^\w\s,.!?']/g, ' ').replace(/\s+/g, ' ')).trim()
  return { out: meant || src.trim(), note: 'I tidied up the syntax for you.' }
}

export function Indifferent({ n = 5 }: { n?: number }) {
  const [src, setSrc] = useState('pritn("hello, world")')
  const m = machine(src)
  const a = agent(src)

  return (
    <Figure
      n={n}
      caption={<>type anything. one of these will make you change.</>}
    >
      <label className="fig-input mono">
        <span>&gt;&gt;&gt;</span>
        <input
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          aria-label="A line of Python"
        />
      </label>
      <div className="fig-pair ind-pair">
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
          {/* always there, so the figure doesn't shift when a note comes and goes */}
          <p className="mono fig-aside ind-note">{a.note || ' '}</p>
        </div>
      </div>
    </Figure>
  )
}
