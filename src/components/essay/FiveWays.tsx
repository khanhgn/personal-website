'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Figure } from './Figure'

// fig. 1 — one bug, found five ways. Each generation gets the same broken function
// and finds out it's wrong the way they would have. The waits are compressed but
// keep their order, and a log-scale chart underneath fills in as you try each one,
// so the shrinking gap between being wrong and finding out is visible.

const LINES = [
  'def average(nums):',
  '    total = 0',
  '    for x in nums:',
  '        total = x',
  '    return total / len(nums)',
  '',
  'print(average([2, 4, 6]))  # want 4.0',
]
const BUG = 3
const FIXED = '        total += x'
const INDENT = '        '

type GenId = 'cards' | 'terminal' | 'web' | 'so' | 'agent'

type Gen = {
  id: GenId
  label: string
  years: string
  setup: string
  result: string
  lesson: string
  secs: number // time to find out what's wrong, for the chart
  took: string
}

const GENS: Gen[] = [
  {
    id: 'cards',
    label: 'punch cards',
    years: '1955–75',
    setup: 'you write it on paper. someone punches one card per line. the machine is in another building.',
    result:
      'One wrong number, a day later. You found the bug by running the program in your head, card by card. The fix cost another day.',
    lesson: 'precision',
    secs: 16 * 3600,
    took: 'next day',
  },
  {
    id: 'terminal',
    label: 'terminal',
    years: '1975–93',
    setup: 'a terminal, then a computer of your own. a run takes seconds, so you can afford to be wrong.',
    result:
      'Wrong in seconds, again and again, until the answer moved. Every bad edit showed you another way it breaks.',
    lesson: 'how machines fail',
    secs: 600,
    took: '~10 min',
  },
  {
    id: 'web',
    label: 'view source',
    years: '1993–08',
    setup: "every page comes with its source. somewhere, someone's version works.",
    result:
      "You read their code against yours until += against = jumped out. Their names weren't yours, so you had to understand it to copy it.",
    lesson: 'reading',
    secs: 45,
    took: '~1 min',
  },
  {
    id: 'so',
    label: 'stack overflow',
    years: '2008–22',
    setup: 'an answer for almost everything, if you can describe the symptom.',
    result:
      'Someone else found it first. You still had to fit their answer to your code, so you understood it a little.',
    lesson: 'adaptation',
    secs: 8,
    took: 'seconds',
  },
  {
    id: 'agent',
    label: 'agent',
    years: '2022–',
    setup: 'you say what you want. it writes the code, runs it, and fixes what breaks.',
    result: 'Done before you looked. You never saw the bug, which is the point and the problem.',
    lesson: 'judgement, maybe',
    secs: 0,
    took: 'never seen',
  },
]

// ---------------------------------------------------------------------------
// small hooks

type Timer = ReturnType<typeof setTimeout>

// setTimeout that is cleared when the component unmounts.
function useLater() {
  const ids = useRef<Timer[]>([])
  useEffect(() => {
    const list = ids.current
    return () => {
      list.forEach((id) => clearTimeout(id))
      list.length = 0
    }
  }, [])
  return useCallback((fn: () => void, ms: number) => {
    const id: Timer = setTimeout(() => {
      ids.current = ids.current.filter((x) => x !== id)
      fn()
    }, ms)
    ids.current.push(id)
  }, [])
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(m.matches)
    sync()
    if (m.addEventListener) {
      m.addEventListener('change', sync)
      return () => m.removeEventListener('change', sync)
    }
    return undefined
  }, [])
  return reduced
}

// Types `text` one character at a time while `on` is true. Instant when reduced.
function useTyping(text: string, on: boolean, ms: number, reduced: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) {
      setN(0)
      return undefined
    }
    if (reduced) {
      setN(text.length)
      return undefined
    }
    setN(0)
    const id = setInterval(() => setN((k) => Math.min(k + 1, text.length)), ms)
    return () => clearInterval(id)
  }, [on, text, ms, reduced])
  return { shown: on ? text.slice(0, n) : '', done: on && n >= text.length }
}

// Runs from 0 to 1 over `ms` while `on`, then calls onEnd once.
function useProgress(on: boolean, ms: number, onEnd: () => void) {
  const [p, setP] = useState(0)
  const end = useRef(onEnd)
  end.current = onEnd
  useEffect(() => {
    if (!on) {
      setP(0)
      return undefined
    }
    const t0 = Date.now()
    setP(0)
    const id = setInterval(() => {
      const k = Math.min(1, (Date.now() - t0) / ms)
      setP(k)
      if (k >= 1) {
        clearInterval(id)
        end.current()
      }
    }, 40)
    return () => clearInterval(id)
  }, [on, ms])
  return p
}

// ---------------------------------------------------------------------------
// a tiny interpreter for line 4, so the terminal can really be edited and rerun

type Val = number | number[]
type Out = { k: 'out' | 'err' | 'ok'; t: string }

class PyError {
  constructor(public kind: string, public msg: string, public compile = false) {}
}

const NUMS = [2, 4, 6]

function pyType(v: Val) {
  return typeof v === 'number' ? (Number.isInteger(v) ? 'int' : 'float') : 'list'
}

function pyRepr(v: number, float: boolean) {
  if (v !== v) return 'nan'
  if (!isFinite(v)) return v > 0 ? 'inf' : '-inf'
  if (Number.isInteger(v) && float && Math.abs(v) < 1e16) return v.toFixed(1)
  return String(v)
}

function lex(s: string) {
  const toks: string[] = []
  let i = 0
  while (i < s.length) {
    const rest = s.slice(i)
    if (rest[0] === ' ' || rest[0] === '\t') {
      i++
      continue
    }
    const m = /^(\d+\.\d*|\.\d+|\d+|[A-Za-z_]\w*|\/\/|\*\*|[-+*/%(),])/.exec(rest)
    if (!m) throw new PyError('SyntaxError', 'invalid syntax', true)
    toks.push(m[1])
    i += m[1].length
  }
  return toks
}

function evaluate(src: string, env: { [k: string]: Val }) {
  const toks = lex(src)
  let i = 0
  const peek = () => toks[i]
  const take = () => toks[i++]
  const num = (v: Val, op: string, other: Val): number => {
    if (typeof v !== 'number' || typeof other !== 'number')
      throw new PyError(
        'TypeError',
        `unsupported operand type(s) for ${op}: '${pyType(v)}' and '${pyType(other)}'`
      )
    return v
  }
  const bin = (a: Val, op: string, b: Val): Val => {
    const x = num(a, op, b)
    const y = b as number
    if ((op === '/' || op === '//' || op === '%') && y === 0)
      throw new PyError('ZeroDivisionError', 'division by zero')
    if (op === '+') return x + y
    if (op === '-') return x - y
    if (op === '*') return x * y
    if (op === '/') return x / y
    if (op === '//') return Math.floor(x / y)
    if (op === '%') return ((x % y) + y) % y
    return Math.pow(x, y)
  }
  const atom = (): Val => {
    const t = take()
    if (t === undefined) throw new PyError('SyntaxError', 'invalid syntax', true)
    if (t === '(') {
      const v = expr()
      if (take() !== ')') throw new PyError('SyntaxError', "'(' was never closed", true)
      return v
    }
    if (/^[\d.]/.test(t)) return parseFloat(t)
    if (/^[A-Za-z_]/.test(t)) {
      if (peek() === '(') {
        take()
        const arg = expr()
        if (take() !== ')') throw new PyError('SyntaxError', "'(' was never closed", true)
        if (t === 'sum' || t === 'len' || t === 'max' || t === 'min') {
          if (typeof arg === 'number')
            throw new PyError('TypeError', `'${pyType(arg)}' object is not iterable`)
          if (t === 'sum') return arg.reduce((a, b) => a + b, 0)
          if (t === 'len') return arg.length
          return t === 'max' ? Math.max.apply(null, arg) : Math.min.apply(null, arg)
        }
        if (t === 'abs' || t === 'float' || t === 'int') {
          if (typeof arg !== 'number')
            throw new PyError('TypeError', `bad operand type for ${t}(): 'list'`)
          return t === 'abs' ? Math.abs(arg) : t === 'int' ? Math.trunc(arg) : arg
        }
        throw new PyError('NameError', `name '${t}' is not defined`)
      }
      if (t in env) return env[t]
      throw new PyError('NameError', `name '${t}' is not defined`)
    }
    throw new PyError('SyntaxError', 'invalid syntax', true)
  }
  const unary = (): Val => {
    if (peek() === '-') {
      take()
      return bin(0, '-', unary())
    }
    if (peek() === '+') {
      take()
      return unary()
    }
    const a = atom()
    if (peek() === '**') {
      take()
      return bin(a, '**', unary())
    }
    return a
  }
  const term = (): Val => {
    let a = unary()
    while (peek() === '*' || peek() === '/' || peek() === '//' || peek() === '%') {
      const op = take()
      a = bin(a, op, unary())
    }
    return a
  }
  const expr = (): Val => {
    let a = term()
    while (peek() === '+' || peek() === '-') {
      const op = take()
      a = bin(a, op, term())
    }
    return a
  }
  const v = expr()
  if (i < toks.length) throw new PyError('SyntaxError', 'invalid syntax', true)
  return v
}

// Runs the whole program with `line` as line 4. Returns what the terminal prints.
function runProgram(line: string): { ok: boolean; out: Out[] } {
  const code = line.replace(/#.*$/, '').replace(/\s+$/, '')
  const compileErr = (kind: string, msg: string): { ok: boolean; out: Out[] } => ({
    ok: false,
    out: [
      { k: 'out', t: '  File "avg.py", line 4' },
      { k: 'out', t: '    ' + line.trim() },
      { k: 'err', t: `${kind}: ${msg}` },
    ],
  })
  if (code.trim() === '')
    return compileErr('IndentationError', "expected an indented block after 'for' statement on line 3")
  if (/^\s/.test(code)) return compileErr('IndentationError', 'unexpected indent')
  try {
    const m = /^([A-Za-z_]\w*)\s*(\/\/|\*\*|[-+*/%])?=(?!=)\s*(.*)$/.exec(code)
    // check the line parses before running anything, like Python would
    if (m) lex(m[3])
    else if (code !== 'pass') lex(code)
    const env: { [k: string]: Val } = { total: 0, nums: NUMS.slice() }
    let ranLine = 4
    try {
      for (let j = 0; j < NUMS.length; j++) {
        env.x = NUMS[j]
        if (code === 'pass') continue
        if (!m) {
          evaluate(code, env)
          continue
        }
        if (m[3] === '') throw new PyError('SyntaxError', 'invalid syntax', true)
        const rhs = evaluate(m[3], env)
        if (m[2]) {
          if (!(m[1] in env)) throw new PyError('NameError', `name '${m[1]}' is not defined`)
          if (m[2] === '+' && Array.isArray(env[m[1]]) && Array.isArray(rhs)) {
            env[m[1]] = (env[m[1]] as number[]).concat(rhs)
          } else {
            const e: { [k: string]: Val } = { a: env[m[1]], b: rhs }
            env[m[1]] = evaluate(`a ${m[2]} b`, e)
          }
        } else env[m[1]] = rhs
      }
      ranLine = 5
      const total = env.total
      if (typeof total !== 'number')
        throw new PyError('TypeError', "unsupported operand type(s) for /: 'list' and 'int'")
      const v = total / NUMS.length
      const shown = pyRepr(v, true)
      return { ok: shown === '4.0', out: [{ k: shown === '4.0' ? 'ok' : 'out', t: shown }] }
    } catch (e) {
      if (e instanceof PyError && !e.compile)
        return {
          ok: false,
          out: [
            { k: 'out', t: 'Traceback (most recent call last):' },
            { k: 'out', t: `  File "avg.py", line ${ranLine}, in average` },
            { k: 'err', t: `${e.kind}: ${e.msg}` },
          ],
        }
      throw e
    }
  } catch (e) {
    if (e instanceof PyError) return compileErr(e.kind, e.msg)
    return compileErr('SyntaxError', 'invalid syntax')
  }
}

// ---------------------------------------------------------------------------
// shared bits

type StageProps = {
  reduced: boolean
  onFound: (insisted?: boolean) => void
  say: (msg: string) => void
  focus: boolean
}

function Primary({
  label,
  busy,
  onClick,
  focus,
}: {
  label: string
  busy?: boolean
  onClick: () => void
  focus: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (focus && ref.current) ref.current.focus({ preventScroll: true })
    // only on mount: focus moves here when the reader pressed "next"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <button
      ref={ref}
      type="button"
      aria-disabled={busy ? true : undefined}
      onClick={() => {
        if (!busy) onClick()
      }}
    >
      {label}
    </button>
  )
}

function Listing({
  lines,
  cls,
  label,
}: {
  lines: ReactNode[]
  cls?: (i: number) => string | undefined
  label: string
}) {
  return (
    <pre className="fw-code" aria-label={label}>
      <code>
        {lines.map((l, i) => {
          const c = [cls && cls(i), l === '' ? 'is-blank' : ''].filter(Boolean).join(' ')
          return (
            <span key={i} className={c ? `fw-ln ${c}` : 'fw-ln'}>
              <span className="fw-no" aria-hidden="true">
                {i + 1}
              </span>
              {l === '' ? ' ' : l}
            </span>
          )
        })}
      </code>
    </pre>
  )
}

function Meter({ p }: { p: number }) {
  return (
    <div className="ap-meter fw-meter" aria-hidden="true">
      <i style={{ width: `${Math.round(p * 1000) / 10}%` }} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// 1. punch cards: hand the deck over, wait overnight, trace it by hand

const TRACE: { card: number; x: string; total: string; want: string }[] = [
  { card: 1, x: '', total: '0', want: '0' },
  { card: BUG, x: '2', total: '2', want: '2' },
  { card: BUG, x: '4', total: '4', want: '6' },
  { card: BUG, x: '6', total: '6', want: '12' },
  { card: 4, x: '', total: '6/3 = 2.0', want: '4.0' },
]

const NIGHT_MS = 3400
const CLOCK_FROM = 16 * 60 + 52
const CLOCK_TO = 24 * 60 + 9 * 60 + 10

function clock(p: number) {
  const m = Math.round(CLOCK_FROM + (CLOCK_TO - CLOCK_FROM) * p)
  const day = m >= 24 * 60 ? 'Wed' : 'Tue'
  const mm = m % (24 * 60)
  const h = Math.floor(mm / 60)
  const min = mm % 60
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${day} ${h12}:${min < 10 ? '0' : ''}${min} ${h < 12 ? 'am' : 'pm'}`
}

function night(p: number) {
  if (p < 0.18) return 'the operator takes your deck. fourteen jobs ahead of yours.'
  if (p < 0.42) return 'you go home.'
  if (p < 0.72) return 'your job runs at 2:13 am. it takes four seconds.'
  return 'a printout goes in your pigeonhole.'
}

function Cards({ reduced, onFound, say, focus }: StageProps) {
  const [phase, setPhase] = useState<'desk' | 'away' | 'printout' | 'trace' | 'found' | 'repunched'>(
    'desk'
  )
  const [step, setStep] = useState(-1)
  const later = useLater()
  const p = useProgress(phase === 'away', NIGHT_MS, () => {
    setPhase('printout')
    say('Wednesday, 9:10 am. The printout says 2.0. You wanted 4.0.')
  })

  useEffect(() => {
    if (phase !== 'trace') return
    if (reduced) {
      setStep(TRACE.length - 1)
      setPhase('found')
      onFound()
      return
    }
    TRACE.forEach((_, k) =>
      later(() => {
        setStep(k)
        if (k === TRACE.length - 1)
          later(() => {
            setPhase('found')
            onFound()
            say('Card 4 overwrites the running total on every pass. It should be total += x.')
          }, 650)
      }, 150 + k * 620)
    )
  }, [phase, reduced, later, onFound, say])

  const busy = phase === 'away' || phase === 'trace' || phase === 'repunched'
  const label =
    phase === 'desk'
      ? 'hand the deck to the operator'
      : phase === 'away'
      ? 'waiting…'
      : phase === 'printout' || phase === 'trace'
      ? 'trace it by hand'
      : phase === 'found'
      ? 'repunch card 4'
      : 'resubmitted · back tomorrow'
  const act = () => {
    if (phase === 'desk') {
      setPhase('away')
      say('Deck handed in at 4:52 pm. Results tomorrow morning.')
    } else if (phase === 'printout') setPhase('trace')
    else if (phase === 'found') {
      setPhase('repunched')
      say('Card 4 repunched. Resubmit it and wait another night.')
    }
  }
  const hot = phase === 'trace' || phase === 'found' ? TRACE[Math.max(step, 0)].card : -1
  const showBug = phase === 'found' || phase === 'repunched'

  return (
    <div className="fw-split">
      <div className={`fw-deck${phase === 'away' ? ' is-away' : ''}`}>
        <ol className="fw-cards" aria-label="your deck, one card per line">
          {LINES.map((l, i) => {
            const repunched = phase === 'repunched' && i === BUG
            let c = 'fw-card'
            if (i === hot && !showBug) c += ' is-hot'
            if (showBug && i === BUG) c += repunched ? ' is-new' : ' is-bug'
            return (
              <li key={i} className={c} style={{ transitionDelay: `${i * 45}ms` }}>
                <span className="fw-card-no" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="fw-card-text">{repunched ? FIXED : l || ' '}</span>
                {showBug && i === BUG && (
                  <span className="fw-card-flag">{repunched ? 'new card' : '← overwrites'}</span>
                )}
              </li>
            )
          })}
        </ol>
        <p className="fw-deck-away mono" aria-hidden={phase !== 'away'}>
          deck with the operator · job 0412
        </p>
      </div>

      <div className="fw-side">
        <div className="debt-controls mono fw-controls">
          <Primary label={label} busy={busy} onClick={act} focus={focus} />
        </div>

        <div className="fw-desk">
          {phase === 'desk' && (
            <p className="mono muted fw-idle">
              nothing to do until the machine has read every card.
            </p>
          )}
          {phase === 'away' && (
            <div className="fw-night">
              <p className="fw-clock mono">{clock(p)}</p>
              <Meter p={p} />
              <p className="mono muted">{night(p)}</p>
            </div>
          )}
          {phase === 'printout' && (
            <div className="fw-pair">
              <pre className="fw-print" aria-label="printout">
                <code>
                  {'JOB 0412  WED 09:10 AM\n'}
                  <span className="fw-bad">{'   2.0'}</span>
                  {'\nEND OF JOB'}
                </code>
              </pre>
              <p className="mono muted fw-print-note">
                you wanted 4.0, and lost a day finding out. now find out why, without the machine.
              </p>
            </div>
          )}
          {phase !== 'desk' && phase !== 'away' && phase !== 'printout' && (
            <div className="fw-trace mono" aria-label="hand trace">
              <div className="fw-trace-row fw-trace-head">
                <span>card</span>
                <span>x</span>
                <span>total</span>
                <span>should be</span>
              </div>
              {TRACE.map((r, k) => (
                <div
                  key={k}
                  className={`fw-trace-row${k > step ? ' is-hidden' : ''}${
                    r.total !== r.want && k <= step ? ' is-off' : ''
                  }`}
                >
                  <span>{r.card + 1}</span>
                  <span>{r.x || '·'}</span>
                  <span>{r.total}</span>
                  <span>{r.want}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 2. terminal: edit line 4, run it, read the output, repeat

const CMD = 'python avg.py'

function Terminal({ reduced, onFound, say, focus }: StageProps) {
  const [src, setSrc] = useState('total = x')
  const [hist, setHist] = useState<Out[]>([])
  const [phase, setPhase] = useState<'idle' | 'typing' | 'running'>('idle')
  const [runs, setRuns] = useState(0)
  const [fixed, setFixed] = useState(false)
  const pending = useRef('')
  const input = useRef<HTMLInputElement>(null)
  const later = useLater()
  const typed = useTyping(CMD, phase === 'typing', 34, reduced)

  const run = () => {
    if (phase !== 'idle') return
    pending.current = src
    setPhase('typing')
  }

  useEffect(() => {
    if (phase !== 'typing' || !typed.done) return
    setPhase('running')
    later(() => {
      const r = runProgram(pending.current)
      setHist((h) => h.concat([{ k: 'out', t: '$ ' + CMD }], r.out).slice(-20))
      setRuns((n) => n + 1)
      setPhase('idle')
      const last = r.out[r.out.length - 1].t
      if (r.ok) {
        setFixed(true)
        onFound()
        say('It prints 4.0. Right, finally.')
      } else say(`It prints ${last}. Still wrong. Edit line 4 and run it again.`)
    }, reduced ? 120 : 520)
  }, [phase, typed.done, later, onFound, say, reduced])

  const width = Math.max(src.length + 1, 12)
  const hint = fixed
    ? `4.0 after ${runs} ${runs === 1 ? 'run' : 'runs'}. each one took seconds.`
    : runs === 0
    ? 'line 4 is editable. run it first and see what happens.'
    : 'wrong. change line 4 and run it again. (enter runs it too)'

  return (
    <>
      <Listing
        label="avg.py"
        cls={(i) => (i === BUG ? (fixed ? 'is-fixed' : 'is-edit') : undefined)}
        lines={LINES.map((l, i) =>
          i === BUG ? (
            <>
              {INDENT}
              <input
                ref={input}
                className="fw-edit"
                aria-label="line 4 of avg.py, editable"
                value={src}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                readOnly={phase !== 'idle'}
                style={{ width: `${width}ch` }}
                onChange={(e) => setSrc(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    run()
                  }
                }}
              />
            </>
          ) : (
            l
          )
        )}
      />

      <div className="fw-shell mono" aria-label="terminal">
        <div className="fw-shell-scroll">
          {hist.map((h, i) => (
            <div key={i} className={h.k === 'err' ? 'fw-bad' : h.k === 'ok' ? 'fw-ok-text' : undefined}>
              {h.t}
            </div>
          ))}
          <div>
            {'$ '}
            {typed.shown}
            {phase !== 'running' && <span className="fw-cursor" aria-hidden="true" />}
          </div>
        </div>
      </div>

      <div className="debt-controls mono fw-controls">
        <Primary label="run it" busy={phase !== 'idle'} onClick={run} focus={focus} />
        {!fixed && runs >= 3 && (
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setSrc('total += x')
              if (input.current) input.current.focus()
            }}
          >
            stuck? try +=
          </button>
        )}
      </div>
      <p className="mono muted fw-hint">{hint}</p>
    </>
  )
}

// ---------------------------------------------------------------------------
// 3. view source: someone's page that works, side by side with yours

type Seg = string | { em: string }
const ROWS: { mine: Seg[]; theirs: Seg[] }[] = [
  { mine: ['def average(nums):'], theirs: ['def mean(values):'] },
  { mine: ['    total = 0'], theirs: ['    s = 0'] },
  { mine: ['    for x in nums:'], theirs: ['    for v in values:'] },
  { mine: ['        total ', { em: '=' }, ' x'], theirs: ['        s ', { em: '+=' }, ' v'] },
  { mine: ['    return total / len(nums)'], theirs: ['    return s / len(values)'] },
  { mine: ['print(average([2, 4, 6]))'], theirs: ['print(mean([2, 4, 6]))'] },
]
const DIFF_ROW = 3
const URL = 'http://www.example.edu/~dana/python/mean.txt'

function segs(s: Seg[], em: boolean) {
  return s.map((x, i) =>
    typeof x === 'string' ? (
      x
    ) : em ? (
      <b key={i} className="fw-em">
        {x.em}
      </b>
    ) : (
      x.em
    )
  )
}

function ViewSource({ reduced, onFound, say, focus }: StageProps) {
  const [phase, setPhase] = useState<'mine' | 'typing' | 'loading' | 'side' | 'reading' | 'found' | 'fixed'>(
    'mine'
  )
  const [row, setRow] = useState(-1)
  const later = useLater()
  const typed = useTyping(URL, phase === 'typing', 18, reduced)
  const p = useProgress(phase === 'loading', 900, () => {
    setPhase('side')
    say('Their page loads. Their version prints 4.0. Now compare it with yours.')
  })

  useEffect(() => {
    if (phase === 'typing' && typed.done) setPhase('loading')
  }, [phase, typed.done])

  useEffect(() => {
    if (phase !== 'reading') return
    const finish = () => {
      setPhase('found')
      onFound()
      say('Line 4 differs: theirs adds with +=, yours overwrites with =.')
    }
    if (reduced) {
      setRow(ROWS.length - 1)
      finish()
      return
    }
    ROWS.forEach((_, k) =>
      later(() => {
        setRow(k)
        if (k === ROWS.length - 1) later(finish, 500)
      }, 120 + k * 480)
    )
  }, [phase, reduced, later, onFound, say])

  const loaded = phase === 'side' || phase === 'reading' || phase === 'found' || phase === 'fixed'
  const label =
    phase === 'mine' || phase === 'typing' || phase === 'loading'
      ? "find someone else's that works"
      : phase === 'side' || phase === 'reading'
      ? 'read them side by side'
      : phase === 'found'
      ? 'copy their line into yours'
      : 'copied'
  const busy = phase === 'typing' || phase === 'loading' || phase === 'reading' || phase === 'fixed'
  const act = () => {
    if (phase === 'mine') setPhase('typing')
    else if (phase === 'side') setPhase('reading')
    else if (phase === 'found') {
      setPhase('fixed')
      say('You rename s to total and v to x, and it prints 4.0.')
    }
  }
  const showDiff = phase === 'found' || phase === 'fixed'

  return (
    <>
      <div className="fw-url mono" aria-hidden={phase === 'mine'}>
        <span className="muted">address</span>
        <span className="fw-url-text">
          {phase === 'mine' ? '' : phase === 'typing' ? typed.shown : URL}
          {phase === 'typing' && <span className="fw-cursor" aria-hidden="true" />}
        </span>
      </div>
      {phase === 'loading' ? <Meter p={p} /> : <div className="fw-meter-gap" aria-hidden="true" />}

      <div className={`fw-cmp mono${loaded ? ' is-loaded' : ''}`} role="table" aria-label="your code next to theirs">
        <div className="fw-cmp-row fw-cmp-head" role="row">
          <span role="columnheader" aria-label="same?" />
          <span role="columnheader">yours · prints 2.0</span>
          <span role="columnheader">{loaded ? 'theirs · prints 4.0' : 'theirs'}</span>
        </div>
        {ROWS.map((r, i) => {
          const read = i <= row
          const diff = i === DIFF_ROW
          let c = 'fw-cmp-row'
          if (phase === 'reading' && i === row) c += ' is-hot'
          if (read && diff) c += ' is-diff'
          const fixedMine = phase === 'fixed' && diff
          return (
            <div key={i} className={c} role="row">
              <span className="fw-cmp-mark" role="cell">
                {read ? (diff ? '≠' : '=') : ''}
              </span>
              <span className="fw-cmp-mine" role="cell" data-who="you">
                {fixedMine ? FIXED : segs(r.mine, showDiff && diff)}
              </span>
              <span className="fw-cmp-theirs" role="cell" data-who="them">
                {loaded ? segs(r.theirs, showDiff && diff) : ' '}
              </span>
            </div>
          )
        })}
      </div>

      <div className="debt-controls mono fw-controls">
        <Primary label={label} busy={busy} onClick={act} focus={focus} />
      </div>
      <p className="mono muted fw-hint">
        {phase === 'fixed'
          ? 'renamed to fit yours. $ python avg.py → 4.0'
          : showDiff
          ? 'one line is a different shape. the rest only has different names.'
          : loaded
          ? "their names aren't yours. you have to read both to line them up."
          : 'the source of every page is one menu away.'}
      </p>
    </>
  )
}

// ---------------------------------------------------------------------------
// 4. stack overflow: search the symptom, read an answer, fit it to your code

const QUERY = 'python average function returns wrong number'

function Answer({ reduced, onFound, say, focus }: StageProps) {
  const [phase, setPhase] = useState<'mine' | 'typing' | 'loading' | 'answer' | 'pasted'>('mine')
  const [up, setUp] = useState(false)
  const typed = useTyping(QUERY, phase === 'typing', 26, reduced)
  const p = useProgress(phase === 'loading', 700, () => {
    setPhase('answer')
    onFound()
    say('Top answer, 214 votes: you are overwriting total on every pass. Use total += x.')
  })

  useEffect(() => {
    if (phase === 'typing' && typed.done) setPhase('loading')
  }, [phase, typed.done])

  const label =
    phase === 'answer' ? 'paste it into yours' : phase === 'pasted' ? 'pasted' : 'search the symptom'
  const busy = phase === 'typing' || phase === 'loading' || phase === 'pasted'
  const act = () => {
    if (phase === 'mine') setPhase('typing')
    else if (phase === 'answer') {
      setPhase('pasted')
      say('Pasted into line 4. It prints 4.0.')
    }
  }

  return (
    <>
      <Listing
        label="avg.py"
        lines={LINES.map((l, i) => (i === BUG && phase === 'pasted' ? FIXED : l))}
        cls={(i) => (i === BUG && phase === 'pasted' ? 'is-fixed' : undefined)}
      />

      <div className="fw-search mono">
        <span className="muted" aria-hidden="true">
          ⌕
        </span>
        <span className="fw-search-q">
          {phase === 'mine' ? (
            <span className="muted">describe the symptom</span>
          ) : phase === 'typing' ? (
            typed.shown
          ) : (
            QUERY
          )}
          {phase === 'typing' && <span className="fw-cursor" aria-hidden="true" />}
        </span>
      </div>
      {phase === 'loading' ? <Meter p={p} /> : <div className="fw-meter-gap" aria-hidden="true" />}

      <div className="fw-so-slot">
        {(phase === 'answer' || phase === 'pasted') && (
          <article className="fw-so" aria-label="top answer">
            <div className="fw-so-votes mono">
              <button
                type="button"
                className={`fw-vote${up ? ' is-on' : ''}`}
                aria-pressed={up}
                aria-label={up ? 'remove your upvote' : 'upvote this answer'}
                onClick={() => setUp((u) => !u)}
              >
                ▲
              </button>
              <span className="fw-so-n" aria-label={`${214 + (up ? 1 : 0)} votes`}>
                {214 + (up ? 1 : 0)}
              </span>
              <span className="fw-so-acc" title="accepted answer" aria-label="accepted answer">
                ✓
              </span>
            </div>
            <div className="fw-so-body">
              <p className="fw-so-q mono">Why does my average() return the last number?</p>
              <p className="fw-so-a">
                You&apos;re overwriting <code>total</code> on every pass, so only the last value
                survives. Add to it instead:
              </p>
              <pre>
                <code>{'for x in nums:\n    total += x'}</code>
              </pre>
              <p className="mono muted fw-so-meta">answered 2013 · someone else, for someone else</p>
            </div>
          </article>
        )}
      </div>
      <div className="debt-controls mono fw-controls">
        <Primary label={label} busy={busy} onClick={act} focus={focus} />
        {phase === 'pasted' && <span className="muted">$ python avg.py → 4.0</span>}
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// 5. agent: one green tick. the bug is only there if you go looking.

function Agent({ reduced, onFound, say, focus }: StageProps) {
  const [phase, setPhase] = useState<'ask' | 'working' | 'done'>('ask')
  const [depth, setDepth] = useState(0)
  const later = useLater()

  const act = () => {
    if (phase !== 'ask') return
    setPhase('working')
    later(() => {
      setPhase('done')
      onFound()
      say('Fixed a bug in average(). All tests pass.')
    }, reduced ? 150 : 320)
  }

  return (
    <>
      <Listing label="avg.py" lines={LINES.map((l, i) => (i === BUG && phase === 'done' ? FIXED : l))} />

      <div className="fw-ask mono">
        <span className="muted" aria-hidden="true">
          ›
        </span>{' '}
        average() gives the wrong answer. fix it.
      </div>

      <div className="debt-controls mono fw-controls">
        <Primary
          label={phase === 'ask' ? 'ask the agent' : phase === 'working' ? 'working…' : 'done'}
          busy={phase !== 'ask'}
          onClick={act}
          focus={focus}
        />
      </div>

      <div className="fw-agent-out">
        {phase === 'done' && (
          <>
            <p className="fw-tick">
              <span className="fw-tick-mark" aria-hidden="true">
                ✓
              </span>
              <span>Fixed a bug in average(). All tests pass.</span>
            </p>
            <p className="mono fw-insist">
              {depth === 0 && (
                <button type="button" className="link-button" onClick={() => setDepth(1)}>
                  what did it change?
                </button>
              )}
              {depth >= 1 && (
                <>
                  <span className="muted">1 file changed · avg.py · +1 −1 </span>
                  {depth === 1 && (
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        setDepth(2)
                        onFound(true)
                      }}
                    >
                      show me
                    </button>
                  )}
                </>
              )}
            </p>
            {depth === 2 && (
              <pre className="fw-diff" aria-label="the change">
                <code>
                  <span className="fw-diff-ctx">{'@@ avg.py, line 4 @@\n'}</span>
                  <span className="fw-diff-del">{'-        total = x\n'}</span>
                  <span className="fw-diff-add">{'+        total += x'}</span>
                </code>
              </pre>
            )}
          </>
        )}
      </div>
    </>
  )
}

const STAGES: { [K in GenId]: (p: StageProps) => JSX.Element } = {
  cards: Cards,
  terminal: Terminal,
  web: ViewSource,
  so: Answer,
  agent: Agent,
}

// ---------------------------------------------------------------------------
// the chart: time to find out, log scale, one row per generation you've tried

const MAX = 86400 // 1 day
const pos = (secs: number) => (secs <= 1 ? 0 : (Math.log10(secs) / Math.log10(MAX)) * 100)
const TICKS: { label: string; secs: number }[] = [
  { label: '1 s', secs: 1 },
  { label: '1 min', secs: 60 },
  { label: '1 h', secs: 3600 },
  { label: '1 day', secs: MAX },
]

function Chart({
  found,
  insisted,
  current,
}: {
  found: { [K in GenId]?: boolean }
  insisted: boolean
  current: GenId
}) {
  const n = GENS.filter((g) => found[g.id]).length
  if (n === 0) return null
  return (
    <div className="fw-chart mono">
      <p className="fw-chart-title">
        <span>time from wrong to knowing why</span>
        <span className="muted">log scale</span>
      </p>
      <ol className="fw-bars">
        {GENS.map((g) => {
          const on = !!found[g.id]
          const took = g.id === 'agent' && insisted ? 'you dug' : g.took
          return (
            <li key={g.id} className={`fw-bar${on ? ' is-on' : ''}${g.id === current ? ' is-current' : ''}`}>
              <span className="fw-bar-label">{g.label}</span>
              <span className="fw-bar-track" aria-hidden="true">
                <i style={{ width: on ? `${pos(g.secs)}%` : '0%' }} />
                {on && g.secs === 0 && <b className="fw-bar-zero" />}
              </span>
              <span className="fw-bar-val">{on ? (g.secs === 0 ? `0 · ${took}` : took) : '—'}</span>
            </li>
          )
        })}
        <li className="fw-bar fw-axis" aria-hidden="true">
          <span className="fw-bar-label" />
          <span className="fw-bar-track">
            {TICKS.map((t) => (
              <span key={t.label} className="fw-tick-label" style={{ left: `${pos(t.secs)}%` }}>
                {t.label}
              </span>
            ))}
          </span>
          <span className="fw-bar-val" />
        </li>
      </ol>
      <p className={`fw-chart-foot${n === GENS.length ? ' is-done' : ''}`}>
        {n === GENS.length
          ? 'a day, minutes, seconds, zero. each drop came sooner than the last.'
          : n === 0
          ? 'each generation you try adds a bar.'
          : `${n} of 5 tried.`}
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------

export function FiveWays() {
  const [gi, setGi] = useState(0)
  const [run, setRun] = useState(0)
  const [solved, setSolved] = useState(false)
  const [found, setFound] = useState<{ [K in GenId]?: boolean }>({})
  const [insisted, setInsisted] = useState(false)
  const [focusStage, setFocusStage] = useState(false)
  const [msg, setMsg] = useState('')
  const reduced = useReducedMotion()
  const g = GENS[gi]
  const Stage = STAGES[g.id]

  const pick = (i: number, focus: boolean) => {
    setGi(i)
    setRun((r) => r + 1)
    setSolved(false)
    setFocusStage(focus)
    setMsg('')
  }

  const id = g.id
  const onFound = useCallback(
    (didInsist?: boolean) => {
      setSolved(true)
      setFound((f) => (f[id] ? f : { ...f, [id]: true }))
      if (didInsist) setInsisted(true)
    },
    [id]
  )
  const say = useCallback((m: string) => setMsg(m), [])

  // after solving, offer the next generation not yet tried (or simply the next one)
  let next = -1
  for (let k = 1; k <= GENS.length; k++) {
    const j = (gi + k) % GENS.length
    if (!found[GENS[j].id] && j !== gi) {
      next = j
      break
    }
  }
  if (next === -1 && gi < GENS.length - 1) next = gi + 1

  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const onTabKey = (e: { key: string; preventDefault: () => void }, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const j = (i + d + GENS.length) % GENS.length
    const b = tabs.current[j]
    if (b) b.focus()
  }

  return (
    <Figure
      n={1}
      caption={
        <>
          one bug, five generations. find out what&apos;s wrong the way each would have. waits
          shortened; the code is modern Python throughout.
        </>
      }
    >
      <div className="fw-tabs mono" role="group" aria-label="Generation">
        {GENS.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[i] = el
            }}
            type="button"
            aria-pressed={i === gi}
            className={i === gi ? 'is-on' : undefined}
            onClick={() => pick(i, false)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            <span className="fw-tab-label">{x.label}</span>
            <span className="fw-tab-yrs">
              {x.years}
              {found[x.id] && (
                <span className="fw-tab-done">
                  {' '}
                  ✓<span className="fw-sr"> tried</span>
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      <p className="mono fw-setup">{g.setup}</p>

      <div className="fw-stage" data-gen={g.id}>
        <Stage key={`${g.id}-${run}`} reduced={reduced} onFound={onFound} say={say} focus={focusStage} />
      </div>

      <div className={`fw-result${solved ? ' is-on' : ''}`}>
        {solved ? (
          <>
            <p className="fig-note">
              {g.id === 'agent' && insisted
                ? 'Done before you looked. You saw the bug only because you went digging, and nothing asked you to.'
                : g.result}
            </p>
            <div className="fw-result-foot mono">
              <dl className="fig-readout">
                <dt>learned</dt>
                <dd>{g.lesson}</dd>
              </dl>
              {next !== -1 && (
                <button type="button" className="link-button" onClick={() => pick(next, true)}>
                  next: {GENS[next].label} →
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>

      <Chart found={found} insisted={insisted} current={g.id} />

      <p className="fw-sr" aria-live="polite">
        {msg}
      </p>
    </Figure>
  )
}
