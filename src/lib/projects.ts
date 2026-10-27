import type { Project } from '@/components/ProjectCard'

export const research: Project[] = [
  {
    title: 'ReCount',
    when: 'In submission to CVPR',
    summary:
      'Repetition counting in rounds: the model makes a first count, then refines it round by round instead of guessing once. With Minh Hoai Nguyen.',
    image: '/images/recount-teaser.png',
    links: [{ label: 'paper' }, { label: 'code' }],
  },
  {
    title: 'CountEx',
    when: 'ECCV 2026',
    summary:
      'Counting where you say both what to count and what to leave out, with text and optional visual examples. Introduces the CoCount benchmark for fine-grained counting.',
    image: '/images/countex-architecture.png',
    imageFit: 'contain',
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
    image: '/images/pairtally-chips.jpg',
    links: [
      { label: 'paper', href: 'https://arxiv.org/abs/2509.13939' },
      { label: 'code', href: 'https://github.com/bbvisual/PairTally_Benchmark' },
    ],
  },
  {
    title: 'Backdoor attacks on AI models',
    when: '2024',
    summary:
      'Research with Bach and Tobin South on poisoning language and text-to-image models, including planting a "best-drink" trigger in a diffusion model with six image–text pairs.',
    image: '/images/diffusion-backdoor.png',
    links: [],
  },
]

export const work: Project[] = [
  {
    title: 'insightfactory.ai',
    when: 'Now',
    summary: 'Product, building agentic AI.',
    links: [{ label: 'site', href: 'https://insightfactory.ai/' }],
  },
]
