import { ImageResponse } from 'next/server'

export const ogSize = { width: 1200, height: 630 }

const paper = '#f4f1ea'
const ink = '#141414'
const inkMuted = '#5e5a52'
const hairline = '#d9d3c7'

// ∇ ∴, drawn to match public/brand/publication.png
function BrandMark() {
  return (
    <svg width="112" height="56" viewBox="0 0 112 56">
      <path
        d="M4 6 H52 L28 50 Z"
        fill="none"
        stroke={ink}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <circle cx="90" cy="18" r="6" fill={ink} />
      <circle cx="78" cy="40" r="6" fill={ink} />
      <circle cx="102" cy="40" r="6" fill={ink} />
    </svg>
  )
}


// Fetch an artwork and inline it as a data URL, so a slow or failing host can never break the card.
// Wikimedia originals are huge, so ask for a 1280px thumbnail. Returns null on any problem.
export async function loadOgImage(src: string | undefined, origin: string): Promise<string | null> {
  if (!src) return null
  try {
    let url = src.startsWith('/') ? `${origin}${src}` : src
    const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f]\/[0-9a-f]{2})\/([^/]+)$/)
    if (m) url = `${m[1]}/thumb/${m[2]}/${m[3]}/1280px-${m[3]}`
    const res = await fetch(url)
    if (!res.ok) return null
    const type = res.headers.get('content-type') ?? ''
    if (!/image\/(png|jpeg)/.test(type)) return null
    const buf = await res.arrayBuffer()
    if (buf.byteLength > 3_000_000) return null
    let bin = ''
    const bytes = new Uint8Array(buf)
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
    return `data:${type};base64,${btoa(bin)}`
  } catch {
    return null
  }
}

export function renderOgCard({
  kicker,
  title,
  footer,
  image,
}: {
  kicker: string
  title: string
  footer: string
  image?: string | null
}) {
  if (image) return renderArtCard({ kicker, title, footer, image })
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: paper,
          color: ink,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 28,
            color: inkMuted,
          }}
        >
          <span>{kicker}</span>
          <BrandMark />
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 40 ? 64 : 80,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: `2px solid ${hairline}`,
            paddingTop: 28,
            fontSize: 28,
            color: inkMuted,
          }}
        >
          <span>Gia Khanh Nguyen</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    ogSize,
  )
}

// Cover-style card: the post's artwork runs across the top, the title sits under it.
function renderArtCard({ kicker, title, footer, image }: { kicker: string; title: string; footer: string; image: string }) {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: paper, color: ink }}>
        <div style={{ display: 'flex', width: '100%', height: 280, position: 'relative', background: hairline }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} width={1200} height={280} style={{ width: 1200, height: 280, objectFit: 'cover', objectPosition: '50% 50%' }} alt="" />
          <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: ink }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, padding: '34px 80px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 26, color: inkMuted }}>
            <span>{kicker}</span>
            <BrandMark />
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 28 ? 66 : 84,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: inkMuted }}>
            <span>Gia Khanh Nguyen</span>
            <span>{footer}</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  )
}
