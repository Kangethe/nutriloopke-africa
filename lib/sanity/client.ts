import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageAsset } from '@/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-05-11'

if (!projectId) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. ' +
      'Set this in .env.local — get it from sanity.io/manage'
  )
}

// ── Read client (public CDN — no auth, suitable for SSR and ISR) ───────────
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Uses Sanity's global CDN for fast reads
  perspective: 'published', // Only show published content
})

// ── Authenticated client (for preview mode and admin operations) ───────────
export const sanityAuthClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Never use CDN for fresh reads in preview/admin
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts', // Include unpublished drafts for preview
})

// ── Image URL builder ────────────────────────────────────────────────────────
const builder = imageUrlBuilder(sanityClient)

export function getSanityImageUrl(source: SanityImageAsset) {
  return builder.image(source)
}

/**
 * Build a responsive image URL for a Sanity image asset.
 * Returns a URL string for use with next/image.
 *
 * @example
 * buildImageUrl(post.featuredImage, { width: 800, height: 450 })
 */
export function buildImageUrl(
  source: SanityImageAsset,
  options: {
    width?: number
    height?: number
    quality?: number
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  } = {}
): string {
  let urlBuilder = builder.image(source).auto('format')

  if (options.width) urlBuilder = urlBuilder.width(options.width)
  if (options.height) urlBuilder = urlBuilder.height(options.height)
  if (options.quality) urlBuilder = urlBuilder.quality(options.quality)
  if (options.fit) urlBuilder = urlBuilder.fit(options.fit)

  return urlBuilder.url()
}
