import { ThemeProvider } from '@/app/providers'
import { Container } from '@/components/Container'
import { Navigation } from '@/components/Navigation'
import ThemeSwitch from '@/components/ThemeSwitch'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { Libre_Baskerville, Roboto_Mono } from 'next/font/google'
import './global.css'

const serif = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const meta = {
  title: 'Khanh Nguyen',
  description:
    'Khanh Nguyen — surfing gradients // drunk on apophenia. Product at insightfactory.ai, building agentic AI, and researcher at the Australian Institute for Machine Learning, Adelaide.',
}

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_HOST_URL),
  title: {
    default: meta.title,
    template: '%s | Khanh Nguyen',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <header className="pt-8 pb-2">
            <Container>
              <div className="flex items-baseline justify-between gap-4">
                <Navigation />
                <ThemeSwitch />
              </div>
            </Container>
          </header>
          <main>
            <Container>{children}</Container>
          </main>
          <footer className="pt-12 pb-10">
            <Container>
              <hr />
              <p className="mono">
                surfing gradients // drunk on apophenia
                <br />
                Last updated October 2026.
              </p>
            </Container>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
