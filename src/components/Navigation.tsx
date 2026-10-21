import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="flex flex-wrap justify-center md:justify-start">
      <Link href="/" className="nav-link">
        Home
      </Link>
      <Link href="/reading" className="nav-link">
        Readings
      </Link>
      <Link href="/blogs" className="nav-link">
        Blog
      </Link>
    </nav>
  )
}
