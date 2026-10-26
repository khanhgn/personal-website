'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 1 — the three generations on one axis, with the seam marked.
const START = 1950
const END = 2040
const W = 640
const x = (year: number) => ((year - START) / (END - START)) * W

const ERAS = [
  {
    id: 'scarcity',
    label: 'scarcity',
    from: 1950,
    to: 1995,
    teacher: 'the machine charged you for resources',
    lesson: 'taste from cost',
  },
  {
    id: 'friction',
    label: 'friction',
    from: 1995,
    to: 2022.9,
    teacher: 'the machine charged you for mistakes',
    lesson: 'taste from scar tissue',
  },
  {
    id: 'plausibility',
    label: 'plausibility',
    from: 2022.9,
    to: 2040,
    teacher: 'the machine gives you what you meant',
    lesson: 'taste, rented',
  },
] as const

export function Generations() {
  const [active, setActive] = useState<string>('friction')
  const era = ERAS.find((e) => e.id === active) ?? ERAS[1]
  const ticks = [1950, 1970, 1990, 2010, 2030]

  return (
    <Figure
      n={1}
      caption={
        <>
          three ways to learn the trade. tap an era. the mark is me: I started
          in 2023, just after the seam opened, and spent a year learning the old
          way anyway.
        </>
      }
    >
      <div className="lit-toggle gen-eras mono" role="group" aria-label="Era">
        {ERAS.map((e) => (
          <button
            key={e.id}
            type="button"
            aria-pressed={e.id === active}
            className={e.id === active ? 'is-on' : undefined}
            onClick={() => setActive(e.id)}
            onMouseEnter={() => setActive(e.id)}
          >
            {e.label}
          </button>
        ))}
      </div>

      <svg viewBox={`-16 0 ${W + 32} 92`} className="fig-svg" aria-hidden="true">
        {ERAS.map((e) => {
          const on = e.id === active
          return (
            <rect
              key={e.id}
              x={x(e.from)}
              y={24}
              width={x(e.to) - x(e.from)}
              height={22}
              style={{ fill: on ? 'var(--ink)' : 'transparent', cursor: 'pointer' }}
              stroke="var(--ink)"
              strokeWidth={1}
              onClick={() => setActive(e.id)}
              onMouseEnter={() => setActive(e.id)}
            />
          )
        })}

        {/* the seam, and me */}
        <line x1={x(2022.9)} x2={x(2022.9)} y1={14} y2={56} stroke="var(--ink)" strokeDasharray="2 2" />
        <text x={x(2022.9)} y={9} textAnchor="middle" className="svg-mono">
          2023 · me
        </text>

        <line x1={0} x2={W} y1={62} y2={62} stroke="var(--hairline)" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={62} y2={66} stroke="var(--ink-muted)" />
            <text x={x(t)} y={82} textAnchor="middle" className="svg-mono muted-fill">
              {t}
            </text>
          </g>
        ))}
      </svg>

      <dl className="fig-readout mono" aria-live="polite">
        <dt>teacher</dt>
        <dd>{era.teacher}</dd>
        <dt>result</dt>
        <dd>{era.lesson}</dd>
      </dl>
    </Figure>
  )
}
