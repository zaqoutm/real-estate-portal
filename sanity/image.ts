import imageUrlBuilder from '@sanity/image-url'
import { sanityClient, isSanityConfigured } from './client'

const builder = isSanityConfigured && sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlForImage(source: unknown) {
  if (!builder) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any)
}
