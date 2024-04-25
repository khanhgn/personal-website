import Link from 'next/link'

export function Navigation() {
  return (
    <nav>
      <Link href="/" className="nav-link">
        Home
      </Link>
      <Link href="/about" className="nav-link">
        About
      </Link>
      <Link href="/blogs" className="nav-link">
        Blog
      </Link>
    </nav>
  )
}
