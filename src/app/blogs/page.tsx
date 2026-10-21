import { PostCard } from '@/components/PostCard'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Writing by Khanh Nguyen: surfing gradients (AI, products, coding teams) and drunk on apophenia (everything else).',
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
        coding teams, and <em>drunk on apophenia</em>, on everything else. New
        posts also go out on{' '}
        <a href="https://khanhcore.substack.com">Substack</a>.
      </p>
      <hr />
      <ul className="plain">
        {posts.map((post) => (
          <PostCard key={post.url} {...post} />
        ))}
      </ul>
    </>
  )
}
