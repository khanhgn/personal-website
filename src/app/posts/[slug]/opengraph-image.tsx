import { WEBSITE_HOST_URL } from '@/lib/constants'
import { loadOgImage, ogSize, renderOgCard } from '@/lib/og'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

export const runtime = 'edge'
export const alt = 'Post by Gia Khanh Nguyen'
export const size = ogSize
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  const part = post?.description.match(/^Part (\d) of (\d)\./)
  const art = post ? await loadOgImage(post.image ?? post.thumbnail, WEBSITE_HOST_URL) : null

  return renderOgCard({
    kicker: part ? `part ${part[1]} of ${part[2]}` : 'writing',
    title: post?.title ?? 'Writing',
    footer: post ? format(parseISO(post.date), 'yyyy-MM-dd') : '',
    image: art,
  })
}
