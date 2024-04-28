import { PostCard } from '@/components/PostCard'
import { Button } from '@/components/ui/button'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Github } from 'lucide-react'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'

const meta = {
  title: 'My Blogs',
  description: 'Process > Result',
  url: `${WEBSITE_HOST_URL}/blogs`,
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  // openGraph: {
  //   title: meta.title,
  //   description: meta.description,
  //   url: meta.url,
  // },
  // twitter: {
  //   title: meta.title,
  //   description: meta.description,
  // },
  // alternates: {
  //   canonical: meta.url,
  // },
}

export default function About() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <>
      <h2>From the blog</h2>
      <p className="mt-2 leading-8">
      Blog posts are written with MDX and processed through Contentlayer.
      </p>
      <div className="mt-10 space-y-12 border-t border-gray-200 pt-10 dark:border-gray-700">
          {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
          ))}
      </div>
    </>
  )
}
