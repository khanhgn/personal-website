import { RSS_ALTERNATE } from '@/lib/constants'
import type { Metadata } from 'next'
import Link from 'next/link'

const title = 'Now'
const description = 'What Gia Khanh Nguyen is focused on at the moment.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: '/now', images: '/opengraph-image' },
  alternates: { canonical: '/now', ...RSS_ALTERNATE },
}

export default function Now() {
  return (
    <>
      <h1>Now</h1>
      <p className="muted">
        What I&apos;m focused on at the moment. Updated October 2026.
      </p>

      <h2>Work</h2>
      <p>
        Product at <a href="https://insightfactory.ai/">insightfactory.ai</a>,
        building agentic AI.
      </p>

      <h2>Research</h2>
      <p>
        Vision–language models and visual reasoning with Prof. Minh Hoai
        Nguyen&apos;s <a href="https://minhhoai.net/lab.html">BBVisual Lab</a> at
        the{' '}
        <a href="https://www.adelaide.edu.au/aiml/">
          Australian Institute for Machine Learning
        </a>
        . Our counting paper, CountEx, is at ECCV 2026; more in{' '}
        <Link href="/projects">Projects</Link>.
      </p>

      <h2>Life</h2>
      <p>Based in Adelaide, South Australia.</p>
    </>
  )
}
