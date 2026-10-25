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

export function renderOgCard({
  kicker,
  title,
  footer,
}: {
  kicker: string
  title: string
  footer: string
}) {
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
