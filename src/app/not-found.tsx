import { PostCard } from '@/components/PostCard'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)

  return (
    <div className="not-found">
      <p className="mono">404 // no gradient here</p>
      <h1>This page wandered off.</h1>
      <p>
        It may have moved, or it never existed. Try the{' '}
        <Link href="/">home page</Link>, <Link href="/blogs">writing</Link> or{' '}
        <Link href="/projects">projects</Link>.
      </p>

      <h2>Recent writing</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <PostCard key={post.url} {...post} />
        ))}
      </ul>
    </div>
  )
}
