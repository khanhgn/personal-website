'use client'

import { useEffect, useRef, useState } from 'react'
import { Figure } from './Figure'

// fig. 6 — a codebase, one square per file. Ship weeks, choose how much you read,
// and see where the incidents land.
type File = { read: boolean; hit: number }
const MAX = 520

export function Debt() {
  const [files, setFiles] = useState<File[]>([])
  const [week, setWeek] = useState(0)
  const [reading, setReading] = useState(20)
  const [log, setLog] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const readingRef = useRef(reading)
  readingRef.current = reading
  const sim = useRef({ files: [] as File[], week: 0 })

  // One source of truth in a ref, mirrored into state, so rapid ticks never read stale data.
  const shipWeek = () => {
    const { files: fs, week: w } = sim.current
    if (fs.length >= MAX) return false
    const frac = readingRef.current / 100
    const n = Math.max(1, Math.round(8 * (1 - 0.7 * frac)))
    const next = fs.map((f) => ({ ...f, hit: Math.max(0, f.hit - 1) }))
    for (let i = 0; i < n && next.length < MAX; i++)
      next.push({ read: Math.random() < frac, hit: 0 })
    let msg: string | null = null
    if (next.length > 8 && Math.random() < 0.3) {
      const i = Math.floor(Math.random() * next.length)
      next[i] = { ...next[i], hit: 3 }
      msg = next[i].read
        ? `week ${w + 1}: file ${i + 1} broke. someone had read it. fixed by lunch.`
        : `week ${w + 1}: file ${i + 1} broke. nobody knows how it works.`
    }
    sim.current = { files: next, week: w + 1 }
    setFiles(next)
    setWeek(w + 1)
    if (msg) setLog((l) => [msg as string, ...l].slice(0, 3))
    return true
  }

  const stop = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
    setRunning(false)
  }

  const runYear = () => {
    if (running) return stop()
    setRunning(true)
    let left = 52
    timer.current = setInterval(() => {
      if (!shipWeek() || --left <= 0) stop()
    }, 90)
  }

  useEffect(() => () => stop(), [])

  const reset = () => {
    stop()
    sim.current = { files: [], week: 0 }
    setFiles([])
    setWeek(0)
    setLog([])
  }

  const unread = files.filter((f) => !f.read).length
  const pct = files.length ? Math.round((unread / files.length) * 100) : 0

  return (
    <Figure
      n={6}
      caption={
        <>
          a codebase, one square per file. hollow squares are Gettier code:
          shipped, working, unread. when something around them changes, nobody knows how to fix them. reading more means shipping less.
        </>
      }
    >
      <label className="fig-slider mono">
        <span>time spent reading: {reading}%</span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={reading}
          onChange={(e) => setReading(Number(e.target.value))}
        />
      </label>

      <div className="debt-grid" aria-label={`${files.length} files, ${unread} unread`}>
        {files.map((f, i) => (
          <i key={i} className={`${f.read ? 'read' : ''}${f.hit ? ' hit' : ''}`} />
        ))}
        {files.length === 0 && <span className="mono muted">nothing shipped yet</span>}
      </div>

      <div className="debt-controls mono">
        <button
          type="button"
          aria-disabled={running || files.length >= MAX}
          onClick={() => !running && files.length < MAX && shipWeek()}
        >
          ship a week
        </button>
        <button
          type="button"
          aria-disabled={!running && files.length >= MAX}
          onClick={() => (running || files.length < MAX) && runYear()}
        >
          {running ? 'stop' : 'ship a year'}
        </button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </div>

      <dl className="fig-readout mono">
        <dt>week</dt>
        <dd>{week}</dd>
        <dt>files</dt>
        <dd>{files.length}</dd>
        <dt>unread</dt>
        <dd>
          {unread} ({pct}%)
        </dd>
      </dl>
      <ul className="debt-log mono">
        {log.map((l, i) => (
          <li key={i + l} className={l.includes('nobody') ? 'bad' : undefined}>
            {l}
          </li>
        ))}
      </ul>
    </Figure>
  )
}
