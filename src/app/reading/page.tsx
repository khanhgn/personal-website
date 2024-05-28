import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'

const meta = {
  title: 'Readings',
  description: 'What I have been reading',
  url: `${WEBSITE_HOST_URL}/reading`,
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  // openGraph: {
  //   title: meta.title,
  //   description: meta.description,
  //   url: meta.url,
  // },
  // twitter: {
  //   title: meta.title,
  //   description: meta.description,
  // },
  // alternates: {
  //   canonical: meta.url,
  // },
}

export default function reading() {
  return (
    <div className="space-y-7">
      <h1>reading</h1>
      <p>Welcome to the reading page</p>
    </div>
  )
}
