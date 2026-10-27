import Link from 'next/link'

// The three-part series, shown at the top and bottom of each part.
// `short` is the label used in the compact one-line nav at the top of a post.
const PARTS = [
  { href: '/posts/the-last-programmers', title: 'Gettier Code and the Last Programmers', short: 'Gettier Code' },
  { href: '/posts/slot-machine-coding', title: 'Slot-Machine Coding', short: 'Slot-Machine Coding' },
  { href: '/posts/after-us', title: 'After Us', short: 'After Us' },
]

export function Series({ part, end = false }: { part: 1 | 2 | 3; end?: boolean }) {
  const next = PARTS[part]
  if (end) {
    return (
      <aside className="series series-end mono" aria-label="Series">
        {next ? (
          <>
            <span className="muted">next · part {part + 1} of 3</span>
            <Link href={next.href}>{next.title} →</Link>
          </>
        ) : (
          <>
            <span className="muted">that&apos;s the series. start again from</span>
            <Link href={PARTS[0].href}>part 1 · {PARTS[0].title}</Link>
          </>
        )}
      </aside>
    )
  }
  return (
    <aside className="series series-top mono" aria-label="Series">
      <span className="series-label">Part {part} of 3</span>
      <ol>
        {PARTS.map((p, i) => (
          <li key={p.href} className={i + 1 === part ? 'is-current' : undefined}>
            <span className="series-num">{i + 1}</span>
            {' '}
            {i + 1 === part ? (
              <span aria-current="page">{p.short}</span>
            ) : (
              <Link href={p.href} title={p.title}>
                {p.short}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </aside>
  )
}
