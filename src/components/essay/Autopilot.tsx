'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Figure } from './Figure'

// fig. 3 — turn the autopilot off and hold the nose level yourself.
const LIMIT = 22 // degrees of pitch before you "stall"

export function Autopilot() {
  const [auto, setAuto] = useState(true)
  const [view, setView] = useState({ pitch: 0, roll: 0 })
  const [held, setHeld] = useState(0)
  const [best, setBest] = useState(0)
  const [stalled, setStalled] = useState(false)

  const s = useRef({ p: 0, v: 0, gust: 0, t: 0, input: 0, auto: true, held: 0 })
  const keys = useRef({ up: false, down: false })
  const bestRef = useRef(0)
  const box = useRef<HTMLDivElement>(null)
  const release = () => { keys.current.up = false; keys.current.down = false }

  useEffect(() => {
    s.current.auto = auto
    if (!auto) s.current.held = 0
  }, [auto])

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    let visible = false
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) { last = performance.now(); raf = requestAnimationFrame(step) }
    })
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const st = s.current
      st.t += dt
      // turbulence: a slow random walk plus a little chop
      st.gust += (Math.random() - 0.5) * 30 * dt
      st.gust *= Math.pow(0.985, dt * 60)
      const chop = Math.sin(st.t * 2.3) * 1.5 + Math.sin(st.t * 0.7) * 2.5
      let control = 0
      if (st.auto) {
        control = -6 * st.p - 3.5 * st.v
      } else {
        const k = keys.current
        st.input = (k.up ? 1 : 0) - (k.down ? 1 : 0)
        control = st.input * 28 + 1.5 * st.p
      }
      st.v += (st.gust + chop + control) * dt
      st.v *= Math.pow(0.995, dt * 60)
      st.p += st.v * dt

      if (!st.auto) {
        st.held += dt
        if (st.p > LIMIT || st.p < -LIMIT * 1.4) {
          setStalled(true)
          if (st.held > bestRef.current) {
            bestRef.current = st.held
            setBest(st.held)
          }
          st.p = 0
          st.v = 0
          st.held = 0
          st.auto = true
          keys.current.up = keys.current.down = false
          setAuto(true)
        }
      }
      setView({ pitch: st.p, roll: st.gust * 0.8 + Math.sin(st.t * 0.9) * 3 })
      setHeld(st.held)
      if (visible) raf = requestAnimationFrame(step)
    }
    if (box.current) io.observe(box.current)
    window.addEventListener('blur', release)
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('blur', release) }
  }, [])

  const onKey = useCallback((e: React.KeyboardEvent, down: boolean) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      // arrow down pushes the nose down; up pulls it up
      if (e.key === 'ArrowUp') keys.current.up = down
      else keys.current.down = down
    }
  }, [])

  const hold = (dir: 'up' | 'down', on: boolean) => () => {
    keys.current[dir] = on
  }

  const danger = Math.min(1, Math.abs(view.pitch) / LIMIT)

  return (
    <Figure
      n={3}
      caption={
        <>
          autopilot on is boring. turn it off and keep the nose level. ↑ ↓ or
          hold the buttons.
        </>
      }
    >
      <div
        className="ap"
        ref={box}
        tabIndex={0}
        role="group"
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) release() }}
        onKeyDown={(e) => onKey(e, true)}
        onKeyUp={(e) => onKey(e, false)}
        aria-label="Attitude indicator. Use the arrow keys to fly."
      >
        <svg viewBox="-100 -100 200 200" className="ap-svg" role="img" aria-hidden="true">
          <defs>
            <clipPath id="ap-clip">
              <circle r="92" />
            </clipPath>
            <pattern id="ap-ground" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink-muted)" strokeWidth="1.2" />
            </pattern>
          </defs>
          <g clipPath="url(#ap-clip)">
            <g transform={`rotate(${-view.roll}) translate(0 ${view.pitch * 3.2})`}>
              <rect x="-300" y="-300" width="600" height="300" fill="var(--paper)" />
              <rect x="-300" y="0" width="600" height="300" fill="url(#ap-ground)" />
              <line x1="-300" x2="300" y1="0" y2="0" stroke="var(--ink)" strokeWidth="1.2" />
              {[-20, -10, 10, 20].map((d) => (
                <g key={d}>
                  <line x1={-14} x2={14} y1={-d * 3.2} y2={-d * 3.2} stroke="var(--ink)" strokeWidth="0.8" />
                  <text x={20} y={-d * 3.2 + 3} className="svg-mono" style={{ fontSize: 8 }}>
                    {Math.abs(d)}
                  </text>
                </g>
              ))}
            </g>
          </g>
          <circle r="92" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          {/* aircraft symbol, fixed */}
          <g stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="square">
            <polyline points="-46,0 -18,0 -10,8" />
            <polyline points="46,0 18,0 10,8" />
          </g>
          <circle r="2.5" fill="var(--ink)" />
        </svg>

        <div className="ap-side mono">
          <button
            type="button"
            className={`ap-toggle${auto ? ' is-on' : ''}`}
            onClick={() => {
              setStalled(false)
              const st = s.current
              if (!st.auto && st.held > bestRef.current) {
                bestRef.current = st.held
                setBest(st.held)
              }
              setAuto((a) => !a)
            }}
          >
            autopilot {auto ? 'on' : 'off'}
          </button>
          <dl className="fig-readout">
            <dt>pitch</dt>
            <dd>
              {(() => {
                const pv = Math.round(view.pitch * 10) / 10 || 0
                return `${pv > 0 ? '+' : ''}${pv.toFixed(1)}°`
              })()}
            </dd>
            <dt>by hand</dt>
            <dd>{auto ? '—' : `${held.toFixed(1)}s`}</dd>
            <dt>best</dt>
            <dd>{best ? `${best.toFixed(1)}s` : '—'}</dd>
          </dl>
          <div className="ap-meter" aria-hidden="true">
            <i style={{ width: `${danger * 100}%` }} />
          </div>
          <div className="ap-holds">
            <button
              type="button"
              tabIndex={-1}
              disabled={auto}
              onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); keys.current.up = true }}
              onPointerUp={hold('up', false)}
              onPointerCancel={hold('up', false)}
              onLostPointerCapture={hold('up', false)}
              onContextMenu={(e) => e.preventDefault()}
            >
              ↑ nose up
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={auto}
              onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); keys.current.down = true }}
              onPointerUp={hold('down', false)}
              onPointerCancel={hold('down', false)}
              onLostPointerCapture={hold('down', false)}
              onContextMenu={(e) => e.preventDefault()}
            >
              ↓ nose down
            </button>
          </div>
          <p className="fig-aside">
            {stalled
              ? 'stall. you hadn\'t practised.'
              : auto
                ? 'it never gets tired. you never get practice.'
                : 'you have it.'}
          </p>
        </div>
      </div>
    </Figure>
  )
}
