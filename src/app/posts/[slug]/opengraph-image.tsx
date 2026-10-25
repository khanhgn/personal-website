import { ogSize, renderOgCard } from '@/lib/og'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

export const runtime = 'edge'
export const alt = 'Post by Gia Khanh Nguyen'
export const size = ogSize
export const contentType = 'image/png'

export default function Image({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  return renderOgCard({
    kicker: 'writing',
    title: post?.title ?? 'Writing',
    footer: post ? format(parseISO(post.date), 'yyyy-MM-dd') : '',
  })
}
