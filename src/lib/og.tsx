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
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 0x8000)))
    return `data:${type};base64,${btoa(bin)}`
  } catch {
    return null
  }
}

// The site's own typefaces, so a shared link looks like the page it points to.
// Fetched as TTF from Google Fonts for just the glyphs we draw; if that fails the card
// still renders, in the default font.
type OgFont = { name: string; data: ArrayBuffer; weight: 400; style: 'normal' | 'italic' }

async function loadFont(family: string, italic: boolean, text: string, name: string): Promise<OgFont | null> {
  try {
    const axis = italic ? 'ital,wght@1,400' : 'wght@400'
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:${axis}&text=${encodeURIComponent(text)}`)
    ).text()
    const url = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/)?.[1]
    if (!url) return null
    const res = await fetch(url)
    if (!res.ok) return null
    return { name, data: await res.arrayBuffer(), weight: 400, style: italic ? 'italic' : 'normal' }
  } catch {
    return null
  }
}

async function loadFonts(text: string): Promise<OgFont[]> {
  const all = await Promise.all([
    loadFont('Libre+Baskerville', false, text, 'Serif'),
    loadFont('Libre+Baskerville', true, text, 'Serif'),
    loadFont('Roboto+Mono', false, text, 'Mono'),
  ])
  return all.filter((f): f is OgFont => f !== null)
}

const serif = 'Serif, Georgia, serif'
const mono = 'Mono, monospace'

export async function renderOgCard({
  kicker,
  title,
  footer,
  tagline,
  image,
}: {
  kicker: string
  title: string
  footer: string
  tagline?: string
  image?: string | null
}) {
  const fonts = await loadFonts(`${kicker}${title}${footer}${tagline ?? ''} .,'-:/∇∴—`)
  const big = title.length > 30 ? 64 : title.length > 14 ? 84 : 112
  if (image) {
    // the artwork carries the whole card; the words sit on a plain paper placard, like a museum label
    const small = title.length > 30 ? 52 : title.length > 14 ? 64 : 84
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: ink }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} width={1200} height={630} style={{ width: 1200, height: 630, objectFit: 'cover' }} alt="" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              left: 56,
              bottom: 52,
              width: 700,
              padding: '34px 44px 30px',
              background: paper,
              color: ink,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: mono, fontSize: 20, color: inkMuted }}>
              <span>{kicker}</span>
              <BrandMark />
            </div>
            <div style={{ display: 'flex', marginTop: 22, fontFamily: serif, fontSize: small, lineHeight: 1.12, letterSpacing: '-0.015em' }}>{title}</div>
            {tagline ? (
              <div style={{ display: 'flex', marginTop: 16, fontFamily: serif, fontStyle: 'italic', fontSize: 23, lineHeight: 1.4, color: inkMuted }}>
                {tagline}
              </div>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26, paddingTop: 16, borderTop: `2px solid ${hairline}`, fontFamily: mono, fontSize: 18, color: inkMuted }}>
              <span>gia khanh nguyen</span>
              <span>{footer}</span>
            </div>
          </div>
        </div>
      ),
      { ...ogSize, fonts: fonts.length ? fonts : undefined },
    )
  }
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: paper,
          color: ink,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            padding: '72px 88px 56px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: mono, fontSize: 22, color: inkMuted }}>
            <span>{kicker}</span>
            <BrandMark />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: serif, fontSize: big, lineHeight: 1.12, letterSpacing: '-0.015em' }}>{title}</div>
            {tagline ? (
              <div
                style={{
                  display: 'flex',
                  marginTop: 18,
                  fontFamily: serif,
                  fontStyle: 'italic',
                  fontSize: 27,
                  lineHeight: 1.4,
                  color: inkMuted,
                  maxWidth: 920,
                }}
              >
                {tagline}
              </div>
            ) : null}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 20, color: inkMuted }}>
            <span>gia khanh nguyen</span>
            <span>{footer}</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  )
}
