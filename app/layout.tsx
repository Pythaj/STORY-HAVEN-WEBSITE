import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OpeningAnimation from '@/components/OpeningAnimation'
import PageTransition from '@/components/PageTransition'
import LoadingBar from '@/components/LoadingBar'
import { SiteProvider } from '@/contexts/SiteContext'

export const metadata: Metadata = {
  title: 'Story Haven - Experience the Magic of Words by Dray Harmony',
  description: 'A premium storytelling platform featuring stories, audio tales, and animations by Dray Harmony. Read, listen, and watch captivating narratives.',
  keywords: 'stories, audio stories, animations, Dray Harmony, African stories, storytelling, books',
  authors: [{ name: 'Dray Harmony' }],
  openGraph: {
    title: 'Story Haven - Premium Storytelling Platform',
    description: 'Experience the Magic of Words, Sounds, and Motion',
    type: 'website',
    locale: 'en_US',
    siteName: 'Story Haven',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Story Haven',
    description: 'Experience the Magic of Words, Sounds, and Motion',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo.jpg" />
      </head>
      <body className="antialiased">
        <SiteProvider>
          <OpeningAnimation />
          <PageTransition>
            <Navbar />
            <main className="min-h-screen relative overflow-hidden">
              {children}
            </main>
            <Footer />
          </PageTransition>
        </SiteProvider>
      </body>
    </html>
  )
}
