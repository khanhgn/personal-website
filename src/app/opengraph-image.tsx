import { ogSize, renderOgCard } from '@/lib/og'

export const runtime = 'edge'
export const alt = 'Gia Khanh Nguyen'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderOgCard({
    kicker: 'surfing gradients // drunk on apophenia',
    title: 'Gia Khanh Nguyen',
    footer: 'khanhcore.vercel.app',
  })
}
