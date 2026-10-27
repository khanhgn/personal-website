import { ProjectCard } from '@/components/ProjectCard'
import { research, work } from '@/lib/projects'
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
