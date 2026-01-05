import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'VibeCoding Academy | Learn to Build Apps with AI',
    template: '%s | VibeCoding Academy',
  },
  description:
    'Transform from complete beginner to full-stack developer using AI-powered coding tools. No prior experience needed. Learn Claude Code, Lovable, Bolt, and more.',
  keywords: [
    'learn to code',
    'AI coding',
    'vibe coding',
    'Claude Code',
    'Lovable',
    'Bolt',
    'full stack developer',
    'web development',
    'mobile development',
    'coding bootcamp',
  ],
  authors: [{ name: 'VibeCoding Academy' }],
  creator: 'VibeCoding Academy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vibecoding.academy',
    title: 'VibeCoding Academy | Learn to Build Apps with AI',
    description:
      'Transform from complete beginner to full-stack developer using AI-powered coding tools.',
    siteName: 'VibeCoding Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeCoding Academy | Learn to Build Apps with AI',
    description:
      'Transform from complete beginner to full-stack developer using AI-powered coding tools.',
    creator: '@vibecoding',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
