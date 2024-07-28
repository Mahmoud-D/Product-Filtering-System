import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Inter } from 'next/font/google'

import Providers from '@/components/providers/Providers'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Product Filtering System',
  description:
    'This is a Product Filtering System built with Next.js, React Query, and Tailwind CSS, featuring internationalization support.'
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
