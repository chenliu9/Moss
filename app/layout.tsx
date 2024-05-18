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

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'InsightAI - 基于数据与AI的驱动决策'
const description =
  '原生态的跨行业、跨领域的大数据与大模型分析引擎，实现动态、复杂、高维数据的智能分析与决策！'

export const metadata: Metadata = {
  metadataBase: new URL('https://demo.txz.tech'),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    type: 'website',
    images: [
      {
        url: `/opengraph-image.png`, // Must be an absolute URL
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
          url={'https://demo.txz.tech'}
          title={title}
          desc={description}
          imgUrl={'https://demo.txz.tech/opengraph-image.png'}
        />
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
