import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { PostCard } from '@/components/PostCard'
import PublicationsSection from '@/components/PublicationsSection'
import { RSS_ALTERNATE, WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/', ...RSS_ALTERNATE },
}

export default function Home() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gia Khanh Nguyen',
    alternateName: 'Khanh Nguyen',
    url: WEBSITE_HOST_URL,
    jobTitle: 'Product',
    worksFor: { '@type': 'Organization', name: 'insightfactory.ai', url: 'https://insightfactory.ai' },
    affiliation: {
      '@type': 'Organization',
      name: 'Australian Institute for Machine Learning',
      url: 'https://www.adelaide.edu.au/aiml/',
    },
    address: { '@type': 'PostalAddress', addressLocality: 'Adelaide', addressRegion: 'SA', addressCountry: 'AU' },
    sameAs: [
      'https://github.com/khanhgn',
      'https://www.linkedin.com/in/khanh-nguyen-58445a261/',
      'https://khanhcore.substack.com',
      'https://x.com/khanhcore',
      'https://youtube.com/@khanhcore',
    ],
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="headshot"
        src="/main-page-images/headshot.webp"
        alt="Gia Khanh Nguyen"
        width={160}
        height={174}
      />
      <p className="mono">surfing gradients // drunk on apophenia</p>
      <h1>Gia Khanh Nguyen</h1>

      <p>
        Product at <a href="https://insightfactory.ai/">insightfactory.ai</a>,
        building agentic AI.
      </p>
      <p>
        Research at the{' '}
        <a href="https://www.adelaide.edu.au/aiml/">
          Australian Institute for Machine Learning
        </a>{' '}
        with Prof. Minh Hoai Nguyen&apos;s{' '}
        <a href="https://minhhoai.net/lab.html">BBVisual Lab</a>, on
        vision–language models and visual reasoning.
      </p>
      <p>Adelaide, South Australia.</p>

      <p className="mono">
        <a href="https://github.com/khanhgn">github</a> ·{' '}
        <a href="https://www.linkedin.com/in/khanh-nguyen-58445a261/">linkedin</a>{' '}
        · <a href="https://x.com/khanhcore">x</a> ·{' '}
        <a href="https://youtube.com/@khanhcore">youtube</a> ·{' '}
        <a href="https://khanhcore.substack.com">substack</a> ·{' '}
        <a href="/feed.xml">rss</a>
      </p>

      <h2>Writing</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <PostCard key={post.url} {...post} />
        ))}
      </ul>
      <p>
        Also on <a href="https://khanhcore.substack.com">Substack</a> and{' '}
        <a href="/feed.xml">RSS</a>.
      </p>

      <h2>Publications</h2>
      <PublicationsSection />
    </div>
  )
}
