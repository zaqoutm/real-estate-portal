import { sanityClient, isSanityConfigured } from '@/sanity/client'
import { allPropertiesQuery, propertyBySlugQuery } from '@/sanity/queries'
import { demoProperties } from './demo-data'
import type { Property } from './types'

// Returns every property. Uses Sanity when configured, otherwise demo data.
export async function getProperties(): Promise<Property[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const data = await sanityClient.fetch<Property[]>(allPropertiesQuery)
      if (data && data.length > 0) return data
    } catch (error) {
      console.log('[v0] Sanity fetch failed, using demo data:', error)
    }
  }
  return demoProperties
}

// Returns a single property by slug, or null if not found.
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const data = await sanityClient.fetch<Property | null>(propertyBySlugQuery, { slug })
      if (data) return data
    } catch (error) {
      console.log('[v0] Sanity fetch failed, using demo data:', error)
    }
  }
  return demoProperties.find((p) => p.slug === slug) ?? null
}

export async function getPropertySlugs(): Promise<string[]> {
  const properties = await getProperties()
  return properties.map((p) => p.slug)
}
