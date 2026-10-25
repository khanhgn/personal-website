import { PostCard } from '@/components/PostCard'
import { RSS_ALTERNATE } from '@/lib/constants'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import type { Metadata } from 'next'

const title = 'Writing'
const description =
  'Writing by Gia Khanh Nguyen: surfing gradients (AI, products, coding teams) and drunk on apophenia (everything else).'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: '/blogs', images: '/opengraph-image' },
  alternates: { canonical: '/blogs', ...RSS_ALTERNATE },
}

export default function Writing() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <>
      <h1>Writing</h1>
      <p>
        Two streams: <em>surfing gradients</em>, on AI, building products and
        coding teams, and <em>drunk on apophenia</em>, on everything else.
      </p>
      <p>
        You can subscribe through{' '}
        <a href="https://khanhcore.substack.com">Substack</a> or{' '}
        <a href="/feed.xml">RSS</a>.
      </p>
      <h2>All posts</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <PostCard key={post.url} {...post} />
        ))}
      </ul>
    </>
  )
}
