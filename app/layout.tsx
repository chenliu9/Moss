import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import WeixinShareWrapper from '@/components/weixin-share-wrapper'
import { Analytics } from '@vercel/analytics/react'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = process.env.Metadata_Title || ''
const description = process.env.Metadata_Description || ''
const metadataBaseUrl = process.env.Metadata_URL || ''

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    type: 'website',
    images: [
      {
        url: `${metadataBaseUrl}/opengraph-image.png`, // Must be an absolute URL
        width: 512,
        height: 512,
        alt: 'InsightAI'
      }
    ]
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <WeixinShareWrapper
          url={metadataBaseUrl}
          title={title}
          desc={description}
          imgUrl={`${metadataBaseUrl}/opengraph-image.png`}
        />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Sidebar />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
