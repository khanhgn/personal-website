'use client'

import NextImage, { type ImageProps } from 'next/image'
import { useCallback, useState } from 'react'

// An image that sits on a quiet paper-coloured placeholder and fades in once it has
// loaded, so pictures never pop in half-drawn. Essay images are small (Next resizes
// them), so they load eagerly: by the time you scroll to one it's already there.
export function FadeImage({ className, loading, priority, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  // the image can finish loading before React hydrates, when onLoad never fires
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])
  return (
    <span className={`fade-wrap${props.fill ? ' is-fill' : ''}${loaded ? ' is-loaded' : ''}`}>
    <NextImage
      {...props}
      ref={ref}
      priority={priority}
      loading={priority ? undefined : loading ?? 'eager'}
      className={`fade-img${loaded ? ' is-loaded' : ''}${className ? ` ${className}` : ''}`}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
    />
    </span>
  )
}
