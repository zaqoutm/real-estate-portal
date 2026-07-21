import type { Locale } from '@/i18n/routing'

// A field that carries translations for every supported locale.
export type LocalizedString = Record<Locale, string>

export type PropertyType = 'apartment' | 'house' | 'studio' | 'villa'

export interface PropertyImage {
  url: string
  alt: string
}

export interface Property {
  _id: string
  slug: string
  title: LocalizedString
  description: LocalizedString
  type: PropertyType
  price: number
  currency: string
  city: string
  address: string
  bedrooms: number
  bathrooms: number
  area: number
  amenities: string[]
  images: PropertyImage[]
  featured: boolean
  availableFrom: string
}

// Safely read a localized field, falling back to English then any value.
export function localized(field: LocalizedString, locale: Locale): string {
  if (!field) return ''
  return field[locale] || field.en || Object.values(field)[0] || ''
}
