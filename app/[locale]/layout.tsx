import type { Metadata, Viewport } from 'next'
import { Inter, Cairo } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { routing, rtlLocales, type Locale } from '@/i18n/routing'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo', display: 'swap' })

export const metadata: Metadata = {
  title: 'StayRent — Find your next home to rent',
  description:
    'Search apartments, houses, studios and villas for rent. Multilingual rental marketplace with low prices for short and long stays.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#003b95',
  colorScheme: 'light',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const dir = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${cairo.variable}`}>
      <body>
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
