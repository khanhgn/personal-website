import Link from 'next/link'

// The three-part series, shown at the top and bottom of each part.
const PARTS = [
  { href: '/posts/the-last-programmers', title: 'Gettier Code and the Last Programmers' },
  { href: '/posts/we-cant-feel-our-own-speed', title: "We Can't Feel Our Own Speed" },
  { href: '/posts/after-us', title: 'After Us' },
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
    <aside className="series mono" aria-label="Series">
      <span className="muted">a series in three parts</span>
      <ol>
        {PARTS.map((p, i) => (
          <li key={p.href} className={i + 1 === part ? 'is-current' : undefined}>
            {i + 1 === part ? (
              <span aria-current="page">{p.title}</span>
            ) : (
              <Link href={p.href}>{p.title}</Link>
            )}
          </li>
        ))}
      </ol>
    </aside>
  )
}
