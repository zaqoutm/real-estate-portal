import { isSanityConfigured, sanityClient } from '@/sanity/client'
import { allPropertiesQuery, propertyBySlugQuery } from '@/sanity/queries'
import { demoProperties } from './demo-data'
import type { Property } from './types'

// Returns every property. Uses Sanity when configured, otherwise demo data.
export async function getProperties(): Promise<Property[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const data = await sanityClient.fetch<Property[]>(allPropertiesQuery)
      if (data) return data
      return []
    } catch (error) {
      console.error('getProperties() Sanity fetch failed, using demo data:', error)
    }
  }
  console.warn('getProperties() Sanity not configured, using demo data.')
  return demoProperties
}

// Returns a single property by slug, or null if not found.
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const data = await sanityClient.fetch<Property | null>(propertyBySlugQuery, { slug })
      if (data) return data
    } catch (error) {
      console.error('getPropertyBySlug() Sanity fetch failed, using demo data:', error)
    }
  }
  return demoProperties.find((p) => p.slug === slug) ?? null
}
