import { ThemeProvider } from '@/app/providers'
import { Container } from '@/components/Container'
import { Navigation } from '@/components/Navigation'
import ThemeSwitch from '@/components/ThemeSwitch'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import Link from 'next/link'
import './global.css'

const meta = {
  title: 'Khanh Nguyen',
  description:
    'Aspiring and sleep deprived DL research student',
  image: `${WEBSITE_HOST_URL}/og-preview.jpg`,
}

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: '%s | Khanh',
  },
  description: meta.description,
  // openGraph: {
  //   title: meta.title,
  //   description: meta.description,
  //   url: WEBSITE_HOST_URL,
  //   siteName: meta.title,
  //   locale: 'en-US',
  //   type: 'website',
  //   images: [
  //     {
  //       url: meta.image,
  //     },
  //   ],
  // },
  // twitter: {
  //   title: meta.title,
  //   description: meta.description,
  //   images: meta.image,
  //   card: 'summary_large_image',
  // },
  // alternates: {
  //   canonical: WEBSITE_HOST_URL,
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <header className="py-4">
            <Container>
              <div className="flex items-center justify-between py-6">
                <Navigation />
                <ThemeSwitch />
              </div>
            </Container>
          </header>
          <main>
            <Container>{children}</Container>
          </main> 
          <footer className="py-16">
            <Container>
              <p>
                Built by{' '}
                <Link className="link" href="https://twitter.com/khanhgng">
                  Khanh Nguyen
                </Link>
                <br></br>
                <Link className="link" href="https://twitter.com/khanhgng">
                  *inspired by Leerob
                </Link>
              </p>
            </Container>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
