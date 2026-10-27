import { WEBSITE_HOST_URL } from '@/lib/constants'
import { loadOgImage, ogSize, renderOgCard } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Gia Khanh Nguyen'
export const size = ogSize
export const contentType = 'image/png'

export default async function Image() {
  // the front page card carries his face
  const face = await loadOgImage('/brand/headshot.png', WEBSITE_HOST_URL)
  return await renderOgCard({
    kicker: 'khanhcore.me',
    title: 'Gia Khanh Nguyen',
    tagline: 'surfing gradients // drunk on apophenia',
    footer: 'adelaide',
    image: face,
  })
}
