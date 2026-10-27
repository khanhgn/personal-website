'use client'

import { useEffect, useRef, useState } from 'react'
import { Figure } from './Figure'

// fig. 1 — changes stream in from an agent. Accept them as fast as you like.
// One of them is wrong. At the end you see how many you actually opened.
type Change = { title: string; diff: string; bug?: string }

const CHANGES: Change[] = [
  { title: 'Rename getUsr → getUser', diff: '- export function getUsr(id) {\n+ export function getUser(id) {' },
  { title: 'Add loading state to settings page', diff: '+ const [loading, setLoading] = useState(true)\n+ if (loading) return <Spinner />' },
  { title: 'Fix typo in onboarding copy', diff: '- "Welcome to the the app"\n+ "Welcome to the app"' },
  {
    title: 'Only admins can delete projects',
    diff: '- if (user.role === "admin") {\n+ if (user.role === "admin" || project.ownerId) {',
    bug: 'project.ownerId is set on every project, so this lets anyone delete anything. The title says the opposite of what the code does.',
  },
  { title: 'Bump date-fns to 3.6.0', diff: '- "date-fns": "^3.3.1"\n+ "date-fns": "^3.6.0"' },
  { title: 'Add retry to webhook sender', diff: '+ for (let i = 0; i < 3; i++) {\n+   if (await send(evt)) break\n+ }' },
  { title: 'Extract PriceTag component', diff: '+ export function PriceTag({ cents }) {\n+   return <span>{format(cents)}</span>\n+ }' },
  { title: 'Update tests for new copy', diff: '- expect(h1).toBe("Welcome to the the app")\n+ expect(h1).toBe("Welcome to the app")' },
]

const GAP = 1100

export function AcceptStream() {
  const [shown, setShown] = useState(0)
  const [accepted, setAccepted] = useState<Set<number>>(new Set())
  const [opened, setOpened] = useState<Set<number>>(new Set())
  const [running, setRunning] = useState(false)
  const start = useRef(0)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!running || shown >= CHANGES.length) return
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 200 : GAP)
    return () => clearTimeout(t)
  }, [running, shown])

  const done = shown === CHANGES.length && accepted.size === CHANGES.length

  useEffect(() => {
    if (done) setElapsed(Math.round((Date.now() - start.current) / 1000))
  }, [done])

  const begin = () => {
    setShown(0)
    setAccepted(new Set())
    setOpened(new Set())
    setElapsed(0)
    start.current = Date.now()
    setRunning(true)
  }
  const accept = (i: number) => setAccepted((s) => new Set(s).add(i))
  const toggle = (i: number) =>
    setOpened((s) => {
      const n = new Set(s)
      n.add(i)
      return n
    })
  const acceptAll = () => setAccepted(new Set(Array.from({ length: shown }, (_, i) => i)))

  const bugIndex = CHANGES.findIndex((c) => c.bug)

  return (
    <Figure
      n={1}
      caption={<>an agent is sending you changes. accept them as fast as you like.</>}
    >
      {!running ? (
        <div className="debt-controls mono">
          <button type="button" onClick={begin}>
            start the agent
          </button>
        </div>
      ) : (
        <>
          <div className="debt-controls mono as-bar">
            <span className="muted">
              {accepted.size}/{CHANGES.length} accepted
            </span>
            <button type="button" onClick={acceptAll} disabled={done || accepted.size >= shown}>
              accept all
            </button>
          </div>
          <ol className="as-list mono">
            {CHANGES.slice(0, shown).map((c, i) => {
              const isAcc = accepted.has(i)
              const isOpen = opened.has(i)
              return (
                <li key={i} className={`as-item${isAcc ? ' is-accepted' : ''}`}>
                  <div className="as-row">
                    <button type="button" className="link-button as-title" onClick={() => toggle(i)} aria-expanded={isOpen}>
                      {c.title}
                    </button>
                    <span className="debt-controls">
                      <button type="button" onClick={() => accept(i)} disabled={isAcc}>
                        {isAcc ? 'accepted' : 'accept'}
                      </button>
                    </span>
                  </div>
                  {isOpen && (
                    <pre>
                      <code>{c.diff}</code>
                    </pre>
                  )}
                  {done && c.bug && (
                    <pre className="is-error">
                      <code>{c.diff}</code>
                    </pre>
                  )}
                </li>
              )
            })}
          </ol>
          {done && (
            <div className="as-summary" aria-live="polite">
              <p className="fig-note">
                You accepted {CHANGES.length} changes in {elapsed} seconds and opened {opened.size} of them.{' '}
                {opened.has(bugIndex)
                  ? 'You opened the one that mattered. Did you catch it?'
                  : 'You never opened the one that mattered.'}{' '}
                <strong>“{CHANGES[bugIndex].title}”</strong>: {CHANGES[bugIndex].bug}
              </p>
              <div className="debt-controls mono">
                <button type="button" onClick={begin}>
                  run it again
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Figure>
  )
}
