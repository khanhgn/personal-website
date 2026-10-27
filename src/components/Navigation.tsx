import Link from 'next/link'

// The whole site lives on the home page; the mark is the only navigation.
export function Navigation() {
  return (
    <nav className="site-nav">
      <Link href="/" className="site-mark" aria-label="Gia Khanh Nguyen, home">
        ∇ ∴
      </Link>
    </nav>
  )
}
