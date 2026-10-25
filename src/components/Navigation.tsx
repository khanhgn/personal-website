import Link from 'next/link'
import { Fragment } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/blogs', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
]

export function Navigation() {
  return (
    <nav className="site-nav">
      {links.map((link, i) => (
        <Fragment key={link.href}>
          {i > 0 ? (
            <span className="nav-sep" aria-hidden="true">
              ❖
            </span>
          ) : null}
          <Link href={link.href}>{link.label}</Link>
        </Fragment>
      ))}
    </nav>
  )
}
