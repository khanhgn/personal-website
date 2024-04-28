import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="flex flex-wrap justify-center md:justify-start">
      <Link href="/" className="nav-link">
        Home
      </Link>
      <Link href="/about" className="nav-link">
        About
      </Link>
      <Link href="/blogs" className="nav-link">
        Blog
      </Link>
      <Link href="/resume" className="nav-link hidden md:block">
        Resume
      </Link>
      <Link href="/transcript" className="nav-link hidden md:block">
        Transcript
      </Link>
    </nav>
  )
}
