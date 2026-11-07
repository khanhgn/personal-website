'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { FadeImage } from '@/components/FadeImage'
import {
  AcceptStream,
  Autopilot,
  Break,
  Debt,
  FindTheBug,
  FiveWays,
  Generations,
  Indifferent,
  Literacy,
  Note,
  Plausible,
  Samples,
  Series,
  Term,
} from '@/components/essay'

// The post body is compiled MDX that references the essay's interactive (client)
// components. Rendering it from a client component keeps those references real
// components rather than server-side client-module proxies, which the MDX runtime
// cannot inspect ("Cannot access X.propTypes on the server").
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  Image: (props) => <FadeImage {...(props as any)} />,
  Break,
  Generations,
  Plausible,
  Samples,
  Indifferent,
  Literacy,
  Autopilot,
  Debt,
  Term,
  Note,
  FiveWays,
  AcceptStream,
  FindTheBug,
  Series,
}

export function MdxBody({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={mdxComponents} />
}
