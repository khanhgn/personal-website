import Link from 'next/link'

export function Navigation() {
  return (
    <nav>
      <Link href="/" className="nav-link">
        home
      </Link>
      <Link href="/blogs" className="nav-link">
        writing
      </Link>
      <Link href="/reading" className="nav-link">
        readings
      </Link>
      <a href="https://khanhcore.substack.com" className="nav-link">
        substack
      </a>
    </nav>
  )
}
