import { WEBSITE_HOST_URL } from '@/lib/constants'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export function GET() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  const items = posts
    .map((post) => {
      const url = `${WEBSITE_HOST_URL}${post.url}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gia Khanh Nguyen</title>
    <link>${WEBSITE_HOST_URL}</link>
    <description>Writing by Gia Khanh Nguyen: surfing gradients // drunk on apophenia.</description>
    <language>en</language>
    <image>
      <url>${WEBSITE_HOST_URL}/brand/feed-logo.png</url>
      <title>Gia Khanh Nguyen</title>
      <link>${WEBSITE_HOST_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <atom:link href="${WEBSITE_HOST_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date(posts[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
