'use client'

import { useState } from 'react'
import { Figure } from './Figure'

// fig. 2 — Two Sum, twice. The versions differ by where one line sits, and both pass
// the example test.
const A = `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        seen[x] = i
        if target - x in seen:
            return [seen[target - x], i]`

const B = `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i`

// The same two functions, in JS, so the tests really run.
function runA(nums: number[], target: number) {
  const seen = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    seen.set(nums[i], i)
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i])!, i]
  }
  return null
}
function runB(nums: number[], target: number) {
  const seen = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i])!, i]
    seen.set(nums[i], i)
  }
  return null
}

const TESTS: { nums: number[]; target: number; expected: number[]; label: string }[] = [
  { nums: [2, 7, 11, 15], target: 9, expected: [0, 1], label: 'example' },
  { nums: [3, 2, 4], target: 6, expected: [1, 2], label: 'hidden' },
  { nums: [3, 3], target: 6, expected: [0, 1], label: 'hidden' },
]

const fmt = (r: number[] | null) => (r ? `[${r.join(', ')}]` : 'None')
const same = (a: number[] | null, b: number[]) => !!a && a[0] === b[0] && a[1] === b[1]

export function Plausible() {
  const [pick, setPick] = useState<'a' | 'b' | null>(null)
  const [ran, setRan] = useState<number>(0) // how many tests have been run

  const verdict = (k: 'a' | 'b') => (k === 'b' ? 'correct' : 'plausible')

  return (
    <Figure
      n={2}
      caption={
        <>
          two sum, twice. one is correct, one only looks it. the difference is
          where one line sits. pick the one you&apos;d ship, then run the tests.
        </>
      }
    >
      <div className="pl-stack">
        {(['a', 'b'] as const).map((k) => {
          const chosen = pick === k
          return (
            <button
              key={k}
              type="button"
              className={`fig-choice${chosen ? ' is-chosen' : ''}`}
              onClick={() => setPick(k)}
              aria-pressed={chosen}
            >
              <span className="pl-head mono">
                <span>{k}.</span>
                <span className={ran >= 2 || chosen ? 'fig-verdict' : 'muted'}>
                  {ran >= 2 ? verdict(k) : chosen ? 'your pick' : 'pick'}
                </span>
              </span>
              <pre>
                <code>
                  {(k === 'a' ? A : B).split('\n').map((line, i) => (
                    <span
                      key={i}
                      className={`pl-line${ran >= 2 && line.trim() === 'seen[x] = i' ? ' is-swapped' : ''}`}
                    >
                      {line + '\n'}
                    </span>
                  ))}
                </code>
              </pre>
            </button>
          )
        })}
      </div>

      <div className="pl-tests">
        <div className="debt-controls mono">
          <button type="button" onClick={() => setRan((r) => Math.min(TESTS.length, r + 1))} disabled={ran >= TESTS.length}>
            {ran === 0 ? 'run example test' : ran < TESTS.length ? 'run next hidden test' : 'all tests run'}
          </button>
          {ran > 0 && (
            <button type="button" onClick={() => setRan(0)}>
              reset
            </button>
          )}
        </div>
        {ran > 0 && (
          <table className="pl-table mono">
            <thead>
              <tr>
                <th>input</th>
                <th>expected</th>
                <th>a</th>
                <th>b</th>
              </tr>
            </thead>
            <tbody>
              {TESTS.slice(0, ran).map((t, i) => {
                const a = runA(t.nums, t.target)
                const b = runB(t.nums, t.target)
                return (
                  <tr key={i}>
                    <td>
                      [{t.nums.join(', ')}], {t.target}
                      <span className="muted pl-label"> · {t.label}</span>
                    </td>
                    <td>{fmt(t.expected)}</td>
                    <td className={same(a, t.expected) ? 'ok' : 'bad'}>
                      {fmt(a)} {same(a, t.expected) ? '✓' : '✗'}
                    </td>
                    <td className={same(b, t.expected) ? 'ok' : 'bad'}>
                      {fmt(b)} {same(b, t.expected) ? '✓' : '✗'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {pick && ran >= 2 && (
        <p className="fig-note">
          {pick === 'a'
            ? "a stores each number before looking for its partner, so it can pair a number with itself. It passes the example because the example never tests that. Plausible code is wrong code that hasn't met its edge case yet. From the outside it looks exactly like Gettier code, which is why someone has to read it."
            : "b looks for the partner first, then stores the number. That's the whole difference. If you saw it, you probably learned it by shipping a, once."}
        </p>
      )}
    </Figure>
  )
}
