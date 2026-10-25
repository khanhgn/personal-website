import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <li className="post-item">
      <Link className="post-item-title" href={post.url}>
        {post.title}
      </Link>
      <div className="post-item-meta">
        {format(parseISO(post.date), 'd MMMM, yyyy')} · {post.description}
      </div>
    </li>
  )
}
