import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import PublicationsSection from '@/components/PublicationsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5)

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gia Khanh Nguyen',
    alternateName: 'Khanh Nguyen',
    url: 'https://khanhcore.vercel.app',
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
        width={132}
        height={132}
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
        <a href="https://khanhcore.substack.com">substack</a>
      </p>

      <h2>Publications</h2>
      <PublicationsSection />

      <h2>Writing</h2>
      <ul className="plain">
        {posts.map((post) => (
          <li key={post.url}>
            <span className="mono">{format(parseISO(post.date), 'yyyy-MM-dd')}</span>{' '}
            <Link href={post.url}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/blogs">All writing</Link>, also on{' '}
        <a href="https://khanhcore.substack.com">Substack</a>.
      </p>

      <h2>Elsewhere</h2>
      <div className="photos">
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/main-page-images/guitar2.webp" alt="Playing guitar" loading="lazy" />
        <img src="/main-page-images/hike.webp" alt="Hiking with friends" loading="lazy" />
        <img src="/main-page-images/hoian1.webp" alt="Hoi An" loading="lazy" />
        <img src="/main-page-images/machi.webp" alt="At the Adelaide Medtech Hackathon" loading="lazy" />
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    </div>
  )
}
