import { RSS_ALTERNATE, WEBSITE_HOST_URL } from '@/lib/constants'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import type { Metadata } from 'next'
import { FadeImage } from '@/components/FadeImage'
import { MdxBody } from '@/components/MdxBody'
import { notFound } from 'next/navigation'
import { Progress } from '@/components/essay'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) {
    return
  }

  const { title, description, date, url } = post

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      authors: ['Gia Khanh Nguyen'],
      url,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@khanhcore',
      title,
      description,
    },
    alternates: {
      canonical: url,
      ...RSS_ALTERNATE,
    },
  }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) {
    notFound()
  }

  const postUrl = `${WEBSITE_HOST_URL}${post.url}`
  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: postUrl,
    mainEntityOfPage: postUrl,
    image: `${postUrl}/opengraph-image`,
    author: {
      '@type': 'Person',
      name: 'Gia Khanh Nguyen',
      url: WEBSITE_HOST_URL,
    },
  }

  return (
    <div>
      <Progress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <header
        className={
          post.image
            ? `post-header has-image${post.imageLayout === 'wide' ? ' wide' : ''}`
            : 'post-header'
        }
      >
        <div>
          <h1>{post.title}</h1>
          <time dateTime={post.date}>{format(parseISO(post.date), 'd MMMM, yyyy')}</time>
          <p className="muted">{post.description}</p>
        </div>
        {post.image ? (
          <figure className="post-header-image">
            <div className="post-header-frame">
              <FadeImage
                src={post.image}
                alt=""
                fill
                sizes={post.imageLayout === 'wide' ? '(max-width: 700px) 100vw, 640px' : '(max-width: 600px) 100vw, 300px'}
                priority
              />
            </div>
            {post.imageCaption ? (
              <figcaption>
                {post.imageCaption}
                {post.imageCredit ? (
                  <>
                    {' '}
                    Public domain, via <a href={post.imageCredit}>Wikimedia Commons</a>.
                  </>
                ) : null}
              </figcaption>
            ) : post.imageSource ? (
              <figcaption>
                via <a href={post.imageSource}>Pinterest</a>
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </header>
      <article className="post">
        <MdxBody code={post.body.code} />
      </article>
    </div>
  )
}

export default PostLayout
