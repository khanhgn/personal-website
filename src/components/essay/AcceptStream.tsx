'use client'

import { Fragment, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Figure } from './Figure'

// fig. 1 — an agent streams eight changes at you. Each one has a title, a diff
// you can open, and an Accept button. Everything about the panel rewards
// accepting: a tick, a counter, a velocity readout that sags when you stop to
// read. One change does the opposite of what its title says. At the end the
// panel compares how fast it felt with what you actually looked at.

type LineKind = 'ctx' | 'add' | 'del'
type DiffLine = { kind: LineKind; text: string; no: number }
type Change = {
  title: string
  path: string
  hunk: string
  lines: DiffLine[]
  adds: number
  dels: number
  bugAt: number // index into lines, -1 if this change is fine
}
type Raw = { title: string; path: string; hunk: string; body: string[]; bugAt?: number }
type Status = 'accepted' | 'rejected' | null
type Phase = 'idle' | 'running' | 'done'
type Report = {
  ms: number
  accepted: number
  rejected: number
  opened: number
  seen: number
  total: number
  adds: number
  dels: number
  bugMs: number
  bugOpened: boolean
  bugStatus: Status
  usedAuto: boolean
}

// Diff bodies: first character is ' ', '+' or '-', the rest is the line.
const RAW: Raw[] = [
  {
    title: 'Rename getUsr → getUser',
    path: 'src/lib/users.ts',
    hunk: '@@ -8,4 +8,4 @@',
    body: [" import { db } from './db'", ' ', '-export function getUsr(id: string) {', '+export function getUser(id: string) {', '   return db.users.find(id)'],
  },
  {
    title: 'Add loading state to settings page',
    path: 'src/app/settings/page.tsx',
    hunk: '@@ -14,2 +14,5 @@ export default function Settings() {',
    body: [
      '   const prefs = usePrefs()',
      '+  const [loading, setLoading] = useState(true)',
      '+  useEffect(() => { prefs.ready.then(() => setLoading(false)) }, [prefs])',
      '+  if (loading) return <Spinner />',
      '   return <SettingsForm prefs={prefs} />',
    ],
  },
  {
    title: 'Fix typo in onboarding copy',
    path: 'copy/onboarding.json',
    hunk: '@@ -3,3 +3,3 @@',
    body: ['   "step1": {', '-    "title": "Welcome to the the app",', '+    "title": "Welcome to the app",', '     "body": "Let\'s set up your workspace."'],
  },
  {
    title: 'Only admins can delete projects',
    path: 'src/api/projects/delete.ts',
    hunk: '@@ -21,8 +21,8 @@',
    body: [
      ' export async function deleteProject(user: User, id: string) {',
      '   const project = await db.projects.get(id)',
      '-  if (user.role === "admin") {',
      '+  if (user.role === "admin" || project.ownerId) {',
      '     await db.projects.delete(id)',
      '     return ok()',
      '   }',
      '   return forbidden()',
    ],
    bugAt: 3,
  },
  {
    title: 'Bump date-fns to 3.6.0',
    path: 'package.json',
    hunk: '@@ -18,3 +18,3 @@',
    body: ['     "clsx": "^2.1.0",', '-    "date-fns": "^3.3.1",', '+    "date-fns": "^3.6.0",', '     "zod": "^3.22.4"'],
  },
  {
    title: 'Add retry to webhook sender',
    path: 'src/jobs/webhooks.ts',
    hunk: '@@ -30,3 +30,6 @@ export async function deliver(evt: Event) {',
    body: [
      '   const body = JSON.stringify(evt)',
      '-  await send(evt.url, body)',
      '+  for (let i = 0; i < 3; i++) {',
      '+    if (await send(evt.url, body)) break',
      '+    await sleep(2 ** i * 500)',
      '+  }',
      ' }',
    ],
  },
  {
    title: 'Extract PriceTag component',
    path: 'src/components/PriceTag.tsx',
    hunk: '@@ -0,0 +1,5 @@',
    body: [
      "+import { formatCents } from '@/lib/money'",
      '+',
      '+export function PriceTag({ cents }: { cents: number }) {',
      '+  return <span className="price">{formatCents(cents)}</span>',
      '+}',
    ],
  },
  {
    title: 'Update tests for new copy',
    path: 'tests/onboarding.test.ts',
    hunk: "@@ -9,3 +9,3 @@ test('welcome title', async () => {",
    body: [
      "   const h1 = await screen.findByRole('heading')",
      "-  expect(h1).toHaveTextContent('Welcome to the the app')",
      "+  expect(h1).toHaveTextContent('Welcome to the app')",
      ' })',
    ],
  },
]

function build(r: Raw): Change {
  const m = /-(\d+)(?:,\d+)? \+(\d+)/.exec(r.hunk)
  let oldNo = m ? Number(m[1]) : 1
  let newNo = m ? Number(m[2]) : 1
  if (newNo === 0) newNo = 1
  let adds = 0
  let dels = 0
  const lines = r.body.map((raw): DiffLine => {
    const sign = raw.charAt(0)
    const text = raw.slice(1)
    if (sign === '+') {
      adds++
      return { kind: 'add', text, no: newNo++ }
    }
    if (sign === '-') {
      dels++
      return { kind: 'del', text, no: oldNo++ }
    }
    oldNo++
    return { kind: 'ctx', text, no: newNo++ }
  })
  return { title: r.title, path: r.path, hunk: r.hunk, lines, adds, dels, bugAt: r.bugAt === undefined ? -1 : r.bugAt }
}

const CHANGES: Change[] = RAW.map(build)
const N = CHANGES.length
const BUG = CHANGES.findIndex((c) => c.bugAt >= 0)
const TOTAL_LINES = CHANGES.reduce((a, c) => a + c.adds + c.dels, 0)

const FAST = 1100
const SLOW = 2800
const FIRST = 350
const GUARD = 450 // ms after a phase change during which the morphing button ignores clicks
const WINDOW = 4 // changes on screen at once, newest last; older ones drop off the top
const WINDOW_OPEN = 2 // with a diff open: that change, and the newest other one

// What the summary says about the change that mattered.
function judge(report: Report) {
  if (report.bugStatus === 'rejected')
    return {
      headline: `rejected, after ${secs(report.bugMs)} s open`,
      verdict: "You caught it. Notice that the stream didn't wait while you read.",
    }
  if (report.bugOpened)
    return {
      headline: `merged, after ${secs(report.bugMs)} s open`,
      verdict: 'You opened it and it still went through. The title is what you read; the diff is what shipped.',
    }
  return {
    headline: 'merged, 0 lines read',
    verdict: report.usedAuto
      ? 'You hit accept all. It merged without anyone looking.'
      : 'You never opened it. Its title did the reviewing.',
  }
}

function fill<T>(v: T): T[] {
  return CHANGES.map(() => v)
}
function put<T>(xs: T[], i: number, v: T): T[] {
  if (xs[i] === v) return xs
  const n = xs.slice()
  n[i] = v
  return n
}
const commas = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const secs = (ms: number) => (ms / 1000).toFixed(1)
const perMin = (count: number, ms: number) => (count === 0 ? 0 : count / (Math.max(ms, 1000) / 60000))

function tier(v: number): string {
  if (v >= 20) return 'best week ever'
  if (v >= 10) return 'flow state'
  if (v >= 4) return 'solid pace'
  return 'slipping'
}

function DiffView({ c, id, final, ghost }: { c: Change; id?: string; final?: boolean; ghost?: boolean }) {
  // in the summary, stop one line after the bug: the rest is unchanged context
  const lines = final && c.bugAt >= 0 ? c.lines.slice(0, c.bugAt + 2) : c.lines
  return (
    <div className={`as-diff${final ? ' is-final' : ''}`} id={id}>
      <div className="as-dhead">
        <span className="as-path">{c.path}</span>
        <span className="as-count" aria-label={`${c.adds} added, ${c.dels} removed`}>
          <span className="as-plus">+{c.adds}</span> <span className="as-minus">−{c.dels}</span>
        </span>
      </div>
      <div className="as-code" tabIndex={ghost ? undefined : 0} role="group" aria-label={`diff of ${c.path}`}>
        <div className="as-lines">
          <div className="as-hunk" aria-hidden="true">
            {c.hunk}
          </div>
          {lines.map((l, k) => {
            const bug = final && k === c.bugAt
            return (
              <Fragment key={k}>
                <div className={`as-line as-${l.kind}${bug ? ' is-bug' : ''}`}>
                  <span className="as-no" aria-hidden="true">
                    {l.no}
                  </span>
                  <span className="as-sign" aria-hidden="true">
                    {l.kind === 'add' ? '+' : l.kind === 'del' ? '−' : ' '}
                  </span>
                  <span className="as-text">
                    {l.kind !== 'ctx' && <span className="as-sr">{l.kind === 'add' ? 'added: ' : 'removed: '}</span>}
                    {l.text || ' '}
                  </span>
                </div>
                {bug && (
                  <div className="as-annot">
                    <span aria-hidden="true">↑ </span>every project has an ownerId, so this is always true
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

type CardHandlers = {
  diffId: string
  onToggle: () => void
  onAccept: (e: { detail: number }) => void
  onReject: (e: { detail: number }) => void
  acceptRef: (el: HTMLButtonElement | null) => void
} | null

// One change in the stream. With no handlers it is a hidden copy that only takes up room.
function card(c: Change, i: number, st: Status, isOpen: boolean, h: CardHandlers): ReactNode {
  return (
    <li key={i} className={`as-card${st === 'accepted' ? ' is-accepted' : st === 'rejected' ? ' is-rejected' : ''}`}>
      <div className="as-head">
        <button
          type="button"
          className="as-toggle"
          tabIndex={h ? undefined : -1}
          aria-expanded={h ? isOpen : undefined}
          aria-controls={h && isOpen ? h.diffId : undefined}
          onClick={h ? h.onToggle : undefined}
        >
          <span className="as-caret" aria-hidden="true">
            ▸
          </span>
          <span className="as-title">{c.title}</span>
          <span className="as-meta">
            <span className="as-path">{c.path}</span>
            <span className="as-count">
              <span className="as-plus">+{c.adds}</span> <span className="as-minus">−{c.dels}</span>
            </span>
          </span>
        </button>
        <span className="as-act">
          {st === null ? (
            <button
              type="button"
              className="as-btn"
              tabIndex={h ? undefined : -1}
              ref={h ? h.acceptRef : undefined}
              onClick={h ? h.onAccept : undefined}
              aria-label={`accept: ${c.title}`}
            >
              accept
            </button>
          ) : (
            <span className="as-done">
              <span className="as-tick" aria-hidden="true">
                {st === 'accepted' ? '✓' : '✕'}
              </span>
              {st === 'accepted' ? 'merged' : 'rejected'}
            </span>
          )}
        </span>
      </div>
      {isOpen && (
        <div className="as-open">
          <DiffView c={c} id={h ? h.diffId : undefined} ghost={!h} />
          {st === null && (
            <div className="as-dfoot">
              <button type="button" className="link-button" tabIndex={h ? undefined : -1} onClick={h ? h.onReject : undefined}>
                reject this change
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

// For the hidden copy with change k open: the other rows are the widest titles.
const BY_WIDTH = CHANGES.map((c, i) => ({ i, w: c.title.length + c.path.length }))
  .sort((a, b) => b.w - a.w)
  .map((x) => x.i)
const ghostRows = (k: number) => [k].concat(BY_WIDTH.filter((i) => i !== k).slice(0, WINDOW_OPEN - 1))

const GHOST_BASE: Report = {
  ms: 99900, accepted: N, rejected: N, opened: N, seen: TOTAL_LINES, total: TOTAL_LINES,
  adds: 0, dels: 0, bugMs: 99900, bugOpened: true, bugStatus: 'rejected', usedAuto: false,
}
const GHOST_REPORTS: Report[] = [
  GHOST_BASE,
  { ...GHOST_BASE, bugStatus: 'accepted' },
  { ...GHOST_BASE, bugStatus: 'accepted', bugOpened: false, usedAuto: true },
  { ...GHOST_BASE, bugStatus: 'accepted', bugOpened: false },
]

function Summary({ report, titleRef }: { report: Report; titleRef?: { current: HTMLParagraphElement | null } }) {
  const bug = CHANGES[BUG]
  const { headline, verdict } = judge(report)
  return (
    <div className="as-sum">
      <p className="as-sum-title" tabIndex={titleRef ? -1 : undefined} ref={titleRef}>
        review closed after {secs(report.ms)} s. you opened{' '}
        <b>
          {report.opened}/{N}
        </b>{' '}
        diffs, saw{' '}
        <b>
          {report.seen}/{report.total}
        </b>{' '}
        changed lines, rejected <b>{report.rejected}</b>.
      </p>
      <p className={`as-headline${report.bugStatus === 'rejected' ? '' : ' is-bad'}`}>
        <span className="as-sum-k">the one that mattered:</span> &quot;{bug.title}&quot; · {headline}
      </p>
      <DiffView c={bug} final ghost={!titleRef} />
      <p className="fig-note as-why">
        {report.bugStatus === 'rejected' ? 'It would have let anyone delete any project' : 'Anyone can now delete any project'}
        , the opposite of what the title says. {verdict}
      </p>
    </div>
  )
}

export function AcceptStream() {
  const uid = useId()
  const [phase, setPhase] = useState<Phase>('idle')
  const [shown, setShown] = useState(0)
  const [status, setStatus] = useState<Status[]>(() => fill<Status>(null))
  const [open, setOpen] = useState<boolean[]>(() => fill(false))
  const [seen, setSeen] = useState<boolean[]>(() => fill(false))
  const [auto, setAuto] = useState(false)
  const [usedAuto, setUsedAuto] = useState(false)
  const [gap, setGap] = useState(FAST)
  const [now, setNow] = useState(0)
  const [report, setReport] = useState<Report | null>(null)

  const t0 = useRef(0)
  const phaseAt = useRef(0)
  const autoRef = useRef(false)
  const openSince = useRef<Array<number | null>>(fill<number | null>(null))
  const openMs = useRef<number[]>(fill(0))
  const acceptBtns = useRef<Array<HTMLButtonElement | null>>(fill<HTMLButtonElement | null>(null))
  const mainBtn = useRef<HTMLButtonElement | null>(null)
  const sumRef = useRef<HTMLParagraphElement | null>(null)
  const focusNext = useRef<number | 'main' | null>(null)

  // The agent: one change every `gap` ms. Auto-accept merges on arrival.
  useEffect(() => {
    if (phase !== 'running' || shown >= N) return
    const t = window.setTimeout(
      () => {
        const i = shown
        setShown(i + 1)
        if (autoRef.current) setStatus((s) => put<Status>(s, i, 'accepted'))
      },
      shown === 0 ? FIRST : gap,
    )
    return () => window.clearTimeout(t)
  }, [phase, shown, gap])

  // Clock for the velocity readout. Only while running.
  useEffect(() => {
    if (phase !== 'running') return
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [phase])

  // Finish once everything has arrived and been decided.
  useEffect(() => {
    if (phase !== 'running' || shown < N || status.some((s) => s === null)) return
    const end = Date.now()
    for (let i = 0; i < N; i++) {
      const since = openSince.current[i]
      if (since !== null) {
        openMs.current[i] += end - since
        openSince.current[i] = null
      }
    }
    let adds = 0
    let dels = 0
    let seenLines = 0
    CHANGES.forEach((c, i) => {
      if (status[i] === 'accepted') {
        adds += c.adds
        dels += c.dels
      }
      if (seen[i]) seenLines += c.adds + c.dels
    })
    setReport({
      ms: end - t0.current,
      accepted: status.filter((s) => s === 'accepted').length,
      rejected: status.filter((s) => s === 'rejected').length,
      opened: seen.filter(Boolean).length,
      seen: seenLines,
      total: TOTAL_LINES,
      adds,
      dels,
      bugMs: openMs.current[BUG],
      bugOpened: seen[BUG],
      bugStatus: status[BUG],
      usedAuto,
    })
    setOpen(fill(false))
    setNow(end)
    phaseAt.current = end
    setPhase('done')
  }, [phase, shown, status, seen, usedAuto])

  // Hand focus to the summary so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (phase === 'done') sumRef.current?.focus({ preventScroll: true })
  }, [phase])

  // Move focus after the focused control unmounts (accept → tick).
  useLayoutEffect(() => {
    const f = focusNext.current
    if (f === null) return
    focusNext.current = null
    const el = f === 'main' ? mainBtn.current : acceptBtns.current[f]
    if (!el) return
    el.focus({ preventScroll: true })
  })

  // Clear any pending focus target on unmount (timers clean themselves above).
  useEffect(
    () => () => {
      focusNext.current = null
    },
    [],
  )

  const begin = (g: number) => {
    const t = Date.now()
    if (t - phaseAt.current < GUARD) return
    t0.current = t
    phaseAt.current = t
    autoRef.current = false
    openSince.current = fill<number | null>(null)
    openMs.current = fill(0)
    acceptBtns.current = fill<HTMLButtonElement | null>(null)
    setGap(g)
    setShown(0)
    setStatus(fill<Status>(null))
    setOpen(fill(false))
    setSeen(fill(false))
    setAuto(false)
    setUsedAuto(false)
    setReport(null)
    setNow(t)
    setPhase('running')
    focusNext.current = 'main'
  }

  const closeDiff = (i: number) => {
    const since = openSince.current[i]
    if (since !== null) {
      openMs.current[i] += Date.now() - since
      openSince.current[i] = null
    }
    setOpen((o) => put(o, i, false))
  }

  const toggle = (i: number) => {
    if (open[i]) {
      closeDiff(i)
      return
    }
    // one diff open at a time, so the stream keeps its size
    open.forEach((o, j) => {
      if (o && j !== i) closeDiff(j)
    })
    openSince.current[i] = Date.now()
    setOpen(fill(false).map((_, j) => j === i))
    setSeen((s) => put(s, i, true))
  }

  const nextPending = (i: number): number | 'main' => {
    for (let k = 1; k < shown; k++) {
      const j = (i + k) % shown
      if (status[j] === null && visible.includes(j)) return j
    }
    return 'main'
  }

  const decide = (i: number, v: 'accepted' | 'rejected', moveFocus: boolean) => {
    if (status[i] !== null) return
    closeDiff(i)
    setStatus((s) => put<Status>(s, i, v))
    if (moveFocus) focusNext.current = nextPending(i)
  }

  const acceptAll = () => {
    if (Date.now() - phaseAt.current < GUARD) return
    if (autoRef.current) {
      autoRef.current = false
      setAuto(false)
      return
    }
    autoRef.current = true
    setAuto(true)
    setUsedAuto(true)
    for (let i = 0; i < shown; i++) if (status[i] === null) closeDiff(i)
    setStatus((s) => s.map((v, i) => (i < shown && v === null ? 'accepted' : v)))
  }

  // ---- what's on screen: the newest few, and the open one wherever it is ----
  const openAt = open.findIndex((o, i) => o && i < shown)
  let visible: number[] = []
  if (openAt < 0) for (let i = Math.max(0, shown - WINDOW); i < shown; i++) visible.push(i)
  else {
    let other = shown - 1
    if (other === openAt) other--
    visible = other < 0 ? [openAt] : [openAt, other].sort((x, y) => x - y)
  }
  const earlier = shown - visible.length

  // ---- derived readouts ----
  const live = phase === 'running'
  const accepted = status.filter((s) => s === 'accepted').length
  const pending = status.slice(0, shown).filter((s) => s === null).length
  let adds = 0
  let dels = 0
  CHANGES.forEach((c, i) => {
    if (status[i] === 'accepted') {
      adds += c.adds
      dels += c.dels
    }
  })
  const elapsed = report ? report.ms : Math.max(0, now - t0.current)
  const vel = perMin(accepted, elapsed)
  const velText = accepted === 0 ? '—' : String(Math.round(vel))
  const week = Math.round((vel * 60 * 40) / 10) * 10

  let pace: string
  if (phase === 'idle') pace = 'nothing merged yet. the agent is ready when you are.'
  else if (phase === 'done') pace = `final pace: ${commas(week)} changes/week`
  else if (accepted === 0) pace = 'waiting on you.'
  else pace = `pace: ${commas(week)} changes/week · ${tier(vel)}`

  let statusLine: string
  if (phase === 'idle') statusLine = `agent idle · ${N} queued`
  else if (phase === 'done') statusLine = 'agent done · review closed'
  else if (shown < N) statusLine = `agent writing ${shown + 1}/${N}`
  else statusLine = `agent done · ${pending} waiting`

  const latest = shown > 0 ? CHANGES[shown - 1] : null
  return (
    <Figure n={1} caption={<>an agent is sending you changes. accept them as fast as you like.</>}>
      <div className="as">
        <dl className="as-stats" aria-label="session readout">
          <div className="as-stat">
            <dt className="as-k">merged</dt>
            <dd className="as-v">
              <b key={accepted} className={accepted > 0 && live ? 'as-bump' : undefined}>
                {accepted}
              </b>
              <small>/{N}</small>
            </dd>
          </div>
          <div className="as-stat">
            <dt className="as-k">lines shipped</dt>
            <dd className="as-v">
              +{adds}
              <small> −{dels}</small>
            </dd>
          </div>
          <div className="as-stat">
            <dt className="as-k">velocity</dt>
            <dd className="as-v">
              {velText}
              <small>/min</small>
            </dd>
          </div>
        </dl>
        <p className="as-pace fx-stack">
          <span>{pace}</span>
          <span className="fx-stack-off" aria-hidden="true">
            nothing merged yet. the agent is ready when you are.
          </span>
          <span className="fx-stack-off" aria-hidden="true">
            pace: 99,990 changes/week · best week ever
          </span>
        </p>

        <div className="as-status">
          <span className={`as-agent${live && shown < N ? ' is-busy' : ''}`}>
            <i aria-hidden="true" />
            {statusLine}
          </span>
          <span className="as-meter" aria-hidden="true">
            {CHANGES.map((_, i) => (
              <i
                key={i}
                className={
                  status[i] === 'accepted'
                    ? 'is-acc'
                    : status[i] === 'rejected'
                    ? 'is-rej'
                    : i < shown
                    ? 'is-in'
                    : undefined
                }
              />
            ))}
          </span>
        </div>
        <span className="as-sr" aria-live="polite">
          {live && latest ? `new change: ${latest.title}` : ''}
        </span>

        <div className="as-stage fx-stack">
          {phase === 'done' && report ? (
            // keyed apart from the stream box so it never inherits its state
            <Summary key="sum" report={report} titleRef={sumRef} />
          ) : (
            <div key="box" className="as-box">
              {phase === 'idle' ? (
                <div className="as-empty">
                  <p>
                    {N} changes are ready to stream in, about one a second.
                    <br />
                    open a title to see its diff. accept when you&apos;re happy.
                  </p>
                </div>
              ) : (
                <>
                  {earlier > 0 && (
                    <p className="as-earlier">
                      +{earlier} earlier
                    </p>
                  )}
                  <ol className="as-list" aria-label="changes from the agent">
                    {visible.map((i) =>
                      card(CHANGES[i], i, status[i], open[i], {
                        diffId: `${uid}-d${i}`,
                        onToggle: () => toggle(i),
                        onAccept: (e) => decide(i, 'accepted', e.detail === 0),
                        onReject: (e) => decide(i, 'rejected', e.detail === 0),
                        acceptRef: (el) => {
                          acceptBtns.current[i] = el
                        },
                      }),
                    )}
                  </ol>
                </>
              )}
            </div>
          )}
          {/* hidden copies of the tallest things this cell can hold, so it never changes size */}
          {CHANGES.map((_, k) => (
            <div key={`g${k}`} className="as-box fx-stack-off fx-ghost" aria-hidden="true">
              <p className="as-earlier">+{N} earlier</p>
              <ol className="as-list">
                {ghostRows(k).map((i) => card(CHANGES[i], i, null, i === k, null))}
              </ol>
            </div>
          ))}
          <div className="as-box fx-stack-off fx-ghost" aria-hidden="true">
            <p className="as-earlier">+{N} earlier</p>
            <ol className="as-list">{BY_WIDTH.slice(0, WINDOW).map((i) => card(CHANGES[i], i, null, false, null))}</ol>
          </div>
          {GHOST_REPORTS.map((r, k) => (
            <div key={`s${k}`} className="fx-stack-off fx-ghost" aria-hidden="true">
              <Summary report={r} />
            </div>
          ))}
        </div>

        <div className="debt-controls as-controls">
          {phase === 'idle' && (
            <button type="button" ref={mainBtn} onClick={() => begin(FAST)}>
              start the agent
            </button>
          )}
          {phase === 'running' && (
            <>
              <button
                type="button"
                ref={mainBtn}
                className={`as-all${auto ? ' is-on' : pending >= 2 ? ' is-hot' : ''}`}
                aria-pressed={auto}
                onClick={acceptAll}
              >
                {auto ? 'auto-accept on' : pending >= 2 ? `accept all (${pending})` : 'accept all'}
              </button>
              <span className="as-hint">
                {auto ? 'merging as they arrive · press to stop' : 'merges these and everything after'}
              </span>
            </>
          )}
          {phase === 'done' && (
            <>
              <button type="button" ref={mainBtn} onClick={() => begin(SLOW)}>
                try again, slower
              </button>
              <button type="button" onClick={() => begin(FAST)}>
                full speed
              </button>
            </>
          )}
        </div>
      </div>
    </Figure>
  )
}
