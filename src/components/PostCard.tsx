import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { FadeImage as Image } from '@/components/FadeImage'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <li className="post-item">
      <Link className="post-item-thumb" href={post.url} tabIndex={-1} aria-hidden="true">
        {post.thumbnail || post.image ? (
          <Image src={(post.thumbnail || post.image) as string} alt="" fill sizes="72px" loading="eager" />
        ) : null}
      </Link>
      <div>
        <Link className="post-item-title" href={post.url}>
          {post.title}
        </Link>
        <div className="post-item-meta">
          {format(parseISO(post.date), 'd MMMM, yyyy')} · {post.description}
        </div>
      </div>
    </li>
  )
}
