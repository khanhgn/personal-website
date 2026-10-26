import { RSS_ALTERNATE, WEBSITE_HOST_URL } from '@/lib/constants'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import type { MDXComponents } from 'mdx/types'
import type { Metadata } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import NextImage from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Autopilot,
  Break,
  Debt,
  Generations,
  Indifferent,
  Literacy,
  Note,
  Plausible,
  Progress,
  Samples,
  Term,
} from '@/components/essay'

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

// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  Image: (props) => <NextImage {...props} />,
  Break,
  Generations,
  Plausible,
  Samples,
  Indifferent,
  Literacy,
  Autopilot,
  Debt,
  Term,
  Note,
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) {
    notFound()
  }

  const MDXContent = useMDXComponent(post.body.code)

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
      <p className="mono">
        <Link href="/blogs">writing</Link> /{' '}
        <time dateTime={post.date}>{format(parseISO(post.date), 'yyyy-MM-dd')}</time>
      </p>
      <h1>{post.title}</h1>
      <p className="muted">{post.description}</p>
      <hr />
      <article className="post">
        <MDXContent components={mdxComponents} />
      </article>
    </div>
  )
}

export default PostLayout
