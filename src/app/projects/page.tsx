import { ProjectCard, type Project } from '@/components/ProjectCard'
import { RSS_ALTERNATE } from '@/lib/constants'
import type { Metadata } from 'next'

const title = 'Projects'
const description =
  'Research and products by Gia Khanh Nguyen: visual counting, vision–language models, AI security and agentic AI.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: '/projects', images: '/opengraph-image' },
  alternates: { canonical: '/projects', ...RSS_ALTERNATE },
}

const research: Project[] = [
  {
    title: 'CountEx',
    when: 'ECCV 2026',
    summary:
      'Counting where you say both what to count and what to leave out, with text and optional visual examples. Introduces the CoCount benchmark for fine-grained counting.',
    image: '/images/countex-teaser.jpg',
    links: [
      { label: 'paper', href: 'https://arxiv.org/abs/2602.19432' },
      { label: 'code', href: 'https://github.com/bbvisual/CountEx' },
    ],
  },
  {
    title: 'PairTally',
    when: 'DICTA 2025',
    summary:
      'A benchmark of 681 images that tests whether AI models count what we mean, not just what they see.',
    image: '/images/teaser.png',
    links: [
      { label: 'paper', href: 'https://arxiv.org/abs/2509.13939' },
      { label: 'code', href: 'https://github.com/bbvisual/PairTally_Benchmark' },
    ],
  },
  {
    title: 'Backdoor attacks on AI models',
    when: '2024',
    summary:
      'Research with Bach under Tobin South on poisoning language and text-to-image models, including planting a "best-drink" trigger in a diffusion model with six image–text pairs.',
    image: '/images/diffusion-backdoor.png',
    links: [{ label: 'write-up', href: '/posts/ai-backdoor' }],
  },
]

const work: Project[] = [
  {
    title: 'insightfactory.ai',
    when: 'Now',
    summary: 'Product, building agentic AI.',
    links: [{ label: 'site', href: 'https://insightfactory.ai/' }],
  },
]

export default function Projects() {
  return (
    <>
      <h1>Projects</h1>
      <p>Things I&apos;ve built or researched, newest first.</p>
      <h2>Research</h2>
      <ul className="post-list">
        {research.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </ul>
      <h2>Work</h2>
      <ul className="post-list">
        {work.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </ul>
    </>
  )
}
