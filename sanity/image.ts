import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient, isSanityConfigured } from './client'

const builder = isSanityConfigured && sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlForImage(source: SanityImageSource) {
  if (!builder) return null
  return builder.image(source)
}
