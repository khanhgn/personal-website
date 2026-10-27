'use client'

import { Fragment, useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Figure } from './Figure'

// fig. 1 — a small gym. Three functions an agent wrote, each with one wrong
// line. Mark the line you suspect, then run the test and see. Every transcript
// below is exactly what CPython prints for the code as shown.

type Call = { input: string; got: string; want?: string }
type DiffLine = { sign: '-' | '+' | ' '; no: number; text: string }
type Round = {
  name: string
  lines: string[]
  spec: number // index of the docstring line
  bug: number // index of the wrong line
  calls: Call[]
  fix: DiffLine[]
  hint: string
  why: string
  decoys: Record<number, string>
}

const ROUNDS: Round[] = [
  {
    name: 'paginate',
    lines: [
      'def paginate(items, page, size):',
      '    """Return one page of items. Pages start at 1."""',
      '    if size <= 0:',
      '        raise ValueError("size must be positive")',
      '    start = page * size',
      '    end = start + size',
      '    return items[start:end]',
    ],
    spec: 1,
    bug: 4,
    calls: [
      { input: "items = ['a', 'b', 'c', 'd', 'e', 'f', 'g']", got: '' },
      { input: 'paginate(items, 1, 3)', got: "['d', 'e', 'f']", want: "['a', 'b', 'c']" },
      { input: 'paginate(items, 3, 3)', got: '[]', want: "['g']" },
    ],
    fix: [
      { sign: '-', no: 5, text: '    start = page * size' },
      { sign: '+', no: 5, text: '    start = (page - 1) * size' },
    ],
    hint: 'The docstring is the spec. Work out page 1 by hand: which index should it start at?',
    why: 'Line 5 treats page 1 as if it were page 0, so the first page is skipped and the last one comes back empty. It reads perfectly well, which is why it ships.',
    decoys: {
      2: 'Line 3 is fine: a page of zero items makes no sense, so refusing it is right.',
      3: 'Line 4 is fine: it only runs when size is bad.',
      5: 'Line 6 is fine: a page is size items long, once it starts in the right place.',
      6: 'Line 7 is fine: slicing past the end is safe in Python, it just returns fewer items.',
    },
  },
  {
    name: 'dedupe',
    lines: [
      'def dedupe(emails):',
      '    """Drop repeats, ignoring case. Keep the first of each."""',
      '    seen = set()',
      '    kept = []',
      '    for email in emails:',
      '        key = email.lower()',
      '        if key not in seen:',
      '            seen.add(email)',
      '            kept.append(email)',
      '    return kept',
    ],
    spec: 1,
    bug: 7,
    calls: [
      { input: "dedupe(['ann@x.io', 'Ann@x.io'])", got: "['ann@x.io']", want: "['ann@x.io']" },
      {
        input: "dedupe(['Ann@x.io', 'ann@x.io', 'ANN@x.io'])",
        got: "['Ann@x.io', 'ann@x.io']",
        want: "['Ann@x.io']",
      },
    ],
    fix: [
      { sign: '-', no: 8, text: '            seen.add(email)' },
      { sign: '+', no: 8, text: '            seen.add(key)' },
    ],
    hint: "Follow 'Ann@x.io' through the loop. What actually goes into seen?",
    why: 'Line 8 remembers the email as written, but line 7 checks the lowercased key, so a repeat gets through whenever the first copy had a capital letter. It passes the obvious test, because the obvious test is all lowercase.',
    decoys: {
      5: 'Line 6 is fine: lowercasing the key is exactly what "ignoring case" means.',
      6: 'Line 7 is fine: checking the key is right. The trouble is what goes into seen.',
      8: 'Line 9 is fine: the spec says keep the first one as written, not lowercased.',
      9: 'Line 10 is fine: it returns what was kept.',
    },
  },
  {
    name: 'add_tag',
    lines: [
      'def add_tag(tag, tags=[]):',
      '    """Add tag to tags (a new list if none given)."""',
      '    if tag not in tags:',
      '        tags.append(tag)',
      '    return tags',
    ],
    spec: 1,
    bug: 0,
    calls: [
      { input: "add_tag('draft')", got: "['draft']", want: "['draft']" },
      { input: "add_tag('urgent')", got: "['draft', 'urgent']", want: "['urgent']" },
    ],
    fix: [
      { sign: '-', no: 1, text: 'def add_tag(tag, tags=[]):' },
      { sign: '+', no: 1, text: 'def add_tag(tag, tags=None):' },
      { sign: ' ', no: 2, text: '    """Add tag to tags (a new list if none given)."""' },
      { sign: '+', no: 3, text: '    if tags is None:' },
      { sign: '+', no: 4, text: '        tags = []' },
    ],
    hint: "Call it twice without passing tags. Where does the second call's list come from?",
    why: 'The default [] on line 1 is built once, when def runs, not on every call. Every call that leaves out tags shares, and grows, the same list. It is the most famous gotcha in Python and it still reads as correct.',
    decoys: {
      2: 'Line 3 is fine: it keeps the tags unique.',
      3: 'Line 4 is fine: appending is right. The trouble is which list it appends to.',
      4: 'Line 5 is fine: it returns the list it was given, or the default.',
    },
  },
]

type Outcome = 'clean' | 'hinted' | 'missed'
type Result = { outcome: Outcome; pick: number }
type Phase = 'pick' | 'running' | 'done'

const STEP_MS = 420

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The REPL transcript, one entry per line, so "run" can play it back.
type Out = { k: 'in' | 'out'; text: string; want?: string }
const transcript = (r: Round): Out[] => {
  const out: Out[] = []
  r.calls.forEach((c) => {
    out.push({ k: 'in', text: c.input })
    if (c.got) out.push({ k: 'out', text: c.got, want: c.want })
  })
  return out
}

// The fix, folded into the listing: which lines it removes, and what it adds after each line.
const fold = (r: Round) => {
  const removed = new Set<number>()
  const after: Record<number, DiffLine[]> = {}
  let anchor = -1
  r.fix.forEach((d) => {
    if (d.sign === '+') (after[anchor] = after[anchor] || []).push(d)
    else {
      anchor = d.no - 1
      if (d.sign === '-') removed.add(anchor)
    }
  })
  return { removed, after }
}

const fixText = (r: Round) =>
  r.fix
    .filter((d) => d.sign !== ' ')
    .map((d) => (d.sign === '-' ? `remove line ${d.no}, ${d.text.trim()}` : `add ${d.text.trim()}`))
    .join('; ')

const tallyText = (res: Result, rd: Round) =>
  res.outcome === 'clean'
    ? `found line ${rd.bug + 1}`
    : res.outcome === 'hinted'
      ? `found line ${rd.bug + 1}, with the hint`
      : `missed: you marked ${res.pick + 1}, bug on ${rd.bug + 1}`

// The fix in one line for the scorecard: the first line removed, then the first added.
const fixPair = (r: Round) => {
  const del = r.fix.find((d) => d.sign === '-')
  const add = r.fix.find((d) => d.sign === '+')
  return `${del ? del.text.trim() : ''}  →  ${add ? add.text.trim() : ''}`
}

function Pip({ state }: { state: Outcome | 'current' | 'todo' }) {
  return <i className={`fb-pip is-${state}`} aria-hidden="true" />
}

export function FindTheBug() {
  const uid = useId()
  const [round, setRound] = useState(0) // ROUNDS.length = the scorecard
  const [pick, setPick] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  const [hinted, setHinted] = useState(false)
  const [phase, setPhase] = useState<Phase>('pick')
  const [shown, setShown] = useState(0)
  const [results, setResults] = useState<Result[]>([])

  const listRef = useRef<HTMLSpanElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const againRef = useRef<HTMLButtonElement>(null)
  const moved = useRef(false) // only move focus after the reader has acted
  const midRef = useRef<HTMLDivElement>(null)
  const verdictRef = useRef<HTMLParagraphElement>(null)

  const finished = round >= ROUNDS.length
  const r = ROUNDS[Math.min(round, ROUNDS.length - 1)]
  const lines = transcript(r)
  const result: Result | undefined = results[round]

  // Play the transcript back a line at a time.
  useEffect(() => {
    if (phase !== 'running') return
    if (shown >= lines.length) {
      setPhase('done')
      return
    }
    const t = window.setTimeout(() => setShown((s) => s + 1), STEP_MS)
    return () => window.clearTimeout(t)
  }, [phase, shown, lines.length])

  // The middle region has a fixed height. Keep the newest transcript line in view
  // while it plays, then show as much of the verdict as fits, from its first line.
  useEffect(() => {
    const box = midRef.current
    if (!box) return
    if (phase === 'pick') {
      box.scrollTop = 0
      return
    }
    const v = verdictRef.current
    if (phase === 'done' && v) {
      const top = v.offsetTop // .fb-mid is the offset parent
      const room = box.clientHeight
      // the whole verdict if it fits, otherwise its start
      const want = Math.max(0, Math.min(top - 4, top + v.offsetHeight - room))
      if (want > box.scrollTop) box.scrollTop = want
    } else box.scrollTop = box.scrollHeight
  }, [phase, shown, round])

  // Keep keyboard focus somewhere sensible as the exercise moves on.
  useEffect(() => {
    if (!moved.current) return
    if (finished) againRef.current?.focus({ preventScroll: true })
    else if (phase === 'done') nextRef.current?.focus({ preventScroll: true })
    else if (phase === 'pick') listRef.current?.focus({ preventScroll: true })
  }, [phase, round, finished])

  const locked = phase !== 'pick'

  const choose = (i: number) => {
    if (locked) return
    setActive(i)
    setPick(i)
  }

  const onListKey = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (locked) return
    const last = r.lines.length - 1
    let to: number | null = null
    if (e.key === 'ArrowDown') to = Math.min(last, active + (pick === null ? 0 : 1))
    else if (e.key === 'ArrowUp') to = Math.max(0, active - (pick === null ? 0 : 1))
    else if (e.key === 'Home') to = 0
    else if (e.key === 'End') to = last
    else if (e.key === 'Enter' || e.key === ' ') to = active
    if (to === null) return
    e.preventDefault()
    choose(to)
  }

  const run = () => {
    if (pick === null || locked) return
    moved.current = true
    const outcome: Outcome = pick !== r.bug ? 'missed' : hinted ? 'hinted' : 'clean'
    const next = results.slice(0, round)
    next.push({ outcome, pick })
    setResults(next)
    if (reducedMotion()) {
      setShown(lines.length)
      setPhase('done')
    } else {
      setShown(1)
      setPhase('running')
    }
  }

  const advance = () => {
    moved.current = true
    setRound(round + 1)
    setPick(null)
    setActive(0)
    setHinted(false)
    setShown(0)
    setPhase('pick')
  }

  const restart = () => {
    moved.current = true
    setResults([])
    setRound(0)
    setPick(null)
    setActive(0)
    setHinted(false)
    setShown(0)
    setPhase('pick')
  }

  const pipState = (i: number): Outcome | 'current' | 'todo' => {
    const res = results[i]
    if (res && (i < round || phase === 'done')) return res.outcome
    return i === round ? 'current' : 'todo'
  }

  const caption = (
    <>
      three functions an agent wrote. each has one wrong line. mark it before you
      run anything.
    </>
  )

  if (finished) {
    const found = results.filter((x) => x.outcome !== 'missed').length
    const withHint = results.filter((x) => x.outcome === 'hinted').length
    return (
      <Figure n={1} caption={caption}>
        <div className="fb fb-card" aria-live="polite">
          <p className="fb-score">
            <span className="fb-big">
              {found}/{ROUNDS.length}
            </span>{' '}
            found before running
            {withHint > 0 && (
              <span className="fb-sub mono">
                {' '}
                · {withHint === 1 ? 'one' : withHint} with a hint
              </span>
            )}
          </p>
          <ol className="fb-tally mono">
            {ROUNDS.map((rd, i) => {
              const res = results[i]
              return (
                <li key={rd.name} className={res ? `is-${res.outcome}` : undefined}>
                  <Pip state={res ? res.outcome : 'todo'} />
                  <span className="fb-tally-name">{rd.name}()</span>
                  <span className="fb-tally-what">{res ? tallyText(res, rd) : ''}</span>
                  <span className="fb-tally-fix">
                    <span className="fb-sr">the fix: </span>
                    {fixPair(rd)}
                  </span>
                </li>
              )
            })}
          </ol>
          <p className="fig-note">
            {found === ROUNDS.length
              ? 'Clean. '
              : found === 0
                ? 'That is normal on a first go. '
                : ''}
            None of these needed a computer. Reading code is a skill like any other: it
            comes from reps, from being wrong on purpose while being wrong is cheap, and
            from coming back tomorrow.
          </p>
          <div className="debt-controls mono fb-foot">
            <button type="button" ref={againRef} onClick={restart}>
              go again
            </button>
          </div>
        </div>
      </Figure>
    )
  }

  const optId = (i: number) => `${uid}-l${i}`
  const correct = result?.outcome === 'clean' || result?.outcome === 'hinted'
  const revealed = phase === 'done'
  const folded = fold(r)
  let fixTagged = false

  return (
    <Figure n={1} caption={caption}>
      <div className="fb">
      <div className="fb-head mono">
        <span>
          round {round + 1} of {ROUNDS.length} · <span className="fb-fn">{r.name}()</span>
        </span>
        <span className="fb-pips" aria-hidden="true">
          {ROUNDS.map((_, i) => (
            <Pip key={i} state={pipState(i)} />
          ))}
        </span>
      </div>

      <pre className={`fb-code${revealed ? ' is-revealed' : ''}`}>
        <span
          ref={listRef}
          className="fb-list"
          role="listbox"
          tabIndex={0}
          aria-label={`${r.name}, ${r.lines.length} lines. Mark the line with the bug.`}
          aria-readonly={locked}
          aria-activedescendant={optId(active)}
          onKeyDown={onListKey}
        >
          {r.lines.map((text, i) => {
            const isPick = pick === i
            const isBug = revealed && i === r.bug
            const cls = [
              'fb-line',
              i === active ? 'is-active' : '',
              isPick && !revealed ? 'is-picked' : '',
              isPick && revealed && !isBug ? 'is-wrong' : '',
              isBug ? 'is-bug' : '',
              revealed && folded.removed.has(i) ? 'is-del' : '',
              i === r.spec ? 'is-spec' : '',
            ]
              .filter(Boolean)
              .join(' ')
            const adds = revealed ? folded.after[i] || [] : []
            return (
              <Fragment key={i}>
              <span
                id={optId(i)}
                role="option"
                aria-selected={isPick}
                className={cls}
                onClick={() => {
                  moved.current = true
                  choose(i)
                }}
              >
                <span className="fb-no" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="fb-text">
                  {/^\s*/.exec(text)![0]}
                  <span className="fb-body">{text.trimStart()}</span>
                </span>
                {isBug && (
                  <span className="fb-tag is-bug-tag">
                    {correct ? '  ← found it' : '  ← the bug'}
                  </span>
                )}
                {isPick && revealed && !isBug && (
                  <span className="fb-tag">{'  ← your mark'}</span>
                )}
              </span>
              {adds.map((d, k) => {
                const tag = !fixTagged
                fixTagged = true
                return (
                  <span
                    key={`a${k}`}
                    className="fb-line is-add"
                    aria-hidden="true"
                    style={{ animationDelay: `${k * 90}ms` }}
                  >
                    <span className="fb-no">+</span>
                    <span className="fb-text">{d.text}</span>
                    {tag && <span className="fb-tag">{'  ← the fix'}</span>}
                  </span>
                )
              })}
              </Fragment>
            )
          })}
        </span>
      </pre>

      {/* the one part that changes: the hint, then the test run and the verdict */}
      <div className="fb-mid" ref={midRef}>
        {phase === 'pick' && (
          <div className="fb-wait">
            <div aria-live="polite">
              {hinted && (
                <p className="fig-note fb-hint">
                  <span className="mono fb-label">hint</span> {r.hint}
                </p>
              )}
            </div>
            <p className="mono muted fb-wait-line">
              <span className="fb-prompt" aria-hidden="true">
                {'>>> '}
              </span>
              the test run prints here once you&apos;ve marked a line.
            </p>
          </div>
        )}

        {phase !== 'pick' && (
          <div className="fb-result">
            <pre className="fb-out" aria-live="polite" aria-label="Test run">
              <code>
                {lines.slice(0, shown).map((l, i) =>
                  l.k === 'in' ? (
                    <span key={i} className="fb-o is-in">
                      <span className="fb-prompt">{'>>> '}</span>
                      {l.text}
                    </span>
                  ) : (
                    <span
                      key={i}
                      className={`fb-o${l.want !== undefined && l.want !== l.text ? ' is-bad' : ''}`}
                    >
                      {l.text}
                      {l.want !== undefined && l.want !== l.text && (
                        <span className="fb-want">{`    # wanted ${l.want}`}</span>
                      )}
                    </span>
                  ),
                )}
                {phase === 'running' && <span className="fb-o fb-cursor" aria-hidden="true" />}
              </code>
            </pre>

            {revealed && result && (
              <p className="fig-note fb-verdict" ref={verdictRef}>
                <strong>
                  {result.outcome === 'clean'
                    ? 'Found it. '
                    : result.outcome === 'hinted'
                      ? 'Found it, with the hint. '
                      : `Not line ${result.pick + 1}. `}
                </strong>
                {result.outcome === 'missed' &&
                  (r.decoys[result.pick] ? `${r.decoys[result.pick]} ` : '')}
                {r.why}
                <span className="fb-sr"> The fix: {fixText(r)}.</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="debt-controls mono fb-controls fb-foot">
        {phase === 'pick' && (
          <>
            <button type="button" disabled={pick === null} onClick={run}>
              {pick === null ? 'mark a line first' : `run it · you marked line ${pick + 1}`}
            </button>
            {!hinted && (
              <button
                type="button"
                className="link-button fb-hint-button"
                onClick={() => setHinted(true)}
              >
                hint (costs you this round)
              </button>
            )}
          </>
        )}
        {phase === 'running' && <span className="muted fb-running">running the tests…</span>}
        {phase === 'done' && (
          <button type="button" ref={nextRef} onClick={advance}>
            {round + 1 < ROUNDS.length ? 'next function →' : 'see your score →'}
          </button>
        )}
      </div>
      </div>
    </Figure>
  )
}
