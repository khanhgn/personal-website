import type { ReactNode } from 'react'

// Shared frame for essay figures: hairline box, mono caption underneath.
export function Figure({
  n,
  caption,
  children,
}: {
  n: number
  caption: ReactNode
  children: ReactNode
}) {
  return (
    <figure className="fig">
      <div className="fig-body">{children}</div>
      <figcaption className="mono">
        fig. {n}. {caption}
      </figcaption>
    </figure>
  )
}

// Section break ornament: ∇ ∴
export function Break() {
  return (
    <p className="break mono" aria-hidden="true">
      ∇ ∴
    </p>
  )
}
