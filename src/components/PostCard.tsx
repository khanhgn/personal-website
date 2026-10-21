import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <li>
      <span className="mono">{format(parseISO(post.date), 'yyyy-MM-dd')}</span>{' '}
      <Link href={post.url}>{post.title}</Link>
      <br />
      <span className="muted">{post.description}</span>
    </li>
  )
}
