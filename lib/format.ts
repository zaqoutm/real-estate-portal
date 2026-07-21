import type { Locale } from '@/i18n/routing'

const localeMap: Record<Locale, string> = {
  en: 'en-US',
  nl: 'nl-NL',
  ar: 'ar-EG',
}

export function formatPrice(amount: number, currency: string, locale: Locale): string {
  try {
    return new Intl.NumberFormat(localeMap[locale] || 'en-US', {
      style: 'currency',
      currency: currency || 'EUR',
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}

export function formatDate(iso: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(localeMap[locale] || 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
