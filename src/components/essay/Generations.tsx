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
    lesson: 'taste from ?',
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
          three ways to learn the trade. tap an era. the mark at 2023 is me:
          a year of the old way, then the seam.
        </>
      }
    >
      <svg
        viewBox={`-16 0 ${W + 32} 112`}
        className="fig-svg"
        role="img"
        aria-label="Timeline of three generations of programmers: scarcity, friction, plausibility"
      >
        {ERAS.map((e) => {
          const on = e.id === active
          return (
            <g
              key={e.id}
              onClick={() => setActive(e.id)}
              onMouseEnter={() => setActive(e.id)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={x(e.from)}
                y={24}
                width={x(e.to) - x(e.from)}
                height={34}
                fill={on ? 'var(--ink)' : 'transparent'}
                stroke="var(--ink)"
                strokeWidth={1}
              />
              <text
                x={x(e.from) + 8}
                y={45}
                className="svg-mono"
                style={{ fill: on ? 'var(--paper)' : 'var(--ink)' }}
              >
                {e.label}
              </text>
            </g>
          )
        })}

        {/* the seam */}
        <line x1={x(2023)} x2={x(2023)} y1={10} y2={72} stroke="var(--ink)" strokeDasharray="2 2" />
        <text x={x(2023)} y={8} textAnchor="middle" className="svg-mono">
          2023 · me
        </text>

        {/* axis */}
        <line x1={0} x2={W} y1={80} y2={80} stroke="var(--hairline)" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={80} y2={84} stroke="var(--ink-muted)" />
            <text x={x(t)} y={98} textAnchor="middle" className="svg-mono muted-fill">
              {t}
            </text>
          </g>
        ))}
      </svg>

      <dl className="fig-readout mono">
        <dt>teacher</dt>
        <dd>{era.teacher}</dd>
        <dt>result</dt>
        <dd>{era.lesson}</dd>
      </dl>
    </Figure>
  )
}
