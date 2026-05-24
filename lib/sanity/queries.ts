import { sanityClient, sanityAuthClient } from './client'
import type { NewsPost, TeamMember, Affiliate } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// News Posts
// ─────────────────────────────────────────────────────────────────────────────

const newsPostFields = `
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  publishedAt,
  excerpt,
  category,
  featuredImage {
    asset { _ref, _type },
    alt,
    caption
  },
  body,
  "author": author-> {
    _id,
    name,
    role,
    photo { asset { _ref, _type }, alt }
  },
  tags,
  seo
`

/**
 * Fetch the N most recent published news posts
 */
export async function getLatestPosts(limit = 3): Promise<NewsPost[]> {
  try {
    const posts = await sanityClient.fetch<NewsPost[]>(
      `*[_type == "newsPost" && defined(publishedAt)] | order(publishedAt desc) [0...$limit] {
        ${newsPostFields}
      }`,
      { limit: limit - 1 } // Sanity slice is 0-indexed: [0...limit] gives `limit` items
    )
    return posts ?? []
  } catch (error) {
    console.error('Failed to fetch latest posts from Sanity:', error)
    return []
  }
}

/**
 * Fetch all posts for the news listing page
 */
export async function getAllPosts(): Promise<NewsPost[]> {
  try {
    const posts = await sanityClient.fetch<NewsPost[]>(
      `*[_type == "newsPost" && defined(publishedAt)] | order(publishedAt desc) {
        ${newsPostFields}
      }`
    )
    return posts ?? []
  } catch (error) {
    console.error('Failed to fetch all posts from Sanity:', error)
    return []
  }
}

/**
 * Fetch a single post by slug for the dynamic [slug] page
 */
export async function getPostBySlug(slug: string, preview = false): Promise<NewsPost | null> {
  const client = preview ? sanityAuthClient : sanityClient
  try {
    const post = await client.fetch<NewsPost | null>(
      `*[_type == "newsPost" && slug.current == $slug][0] {
        ${newsPostFields}
      }`,
      { slug }
    )
    return post ?? null
  } catch (error) {
    console.error(`Failed to fetch post "${slug}" from Sanity:`, error)
    return null
  }
}

/**
 * Fetch all post slugs for static generation (generateStaticParams)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
      `*[_type == "newsPost" && defined(slug.current) && defined(publishedAt)] {
        "slug": slug
      }`
    )
    return (slugs ?? []).map((s) => s.slug.current)
  } catch (error) {
    console.error('Failed to fetch post slugs from Sanity:', error)
    return []
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Team Members
// ─────────────────────────────────────────────────────────────────────────────

const teamMemberFields = `
  _id,
  name,
  role,
  bio,
  photo { asset { _ref, _type }, alt },
  linkedin,
  twitter,
  email,
  isFounder,
  isAdvisor,
  affiliation,
  displayOrder
`

/**
 * Fetch all team members ordered by display order
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const members = await sanityClient.fetch<TeamMember[]>(
      `*[_type == "teamMember"] | order(displayOrder asc) {
        ${teamMemberFields}
      }`
    )
    return members ?? []
  } catch (error) {
    console.error('Failed to fetch team members from Sanity:', error)
    return []
  }
}

/**
 * Fetch founders only (for homepage and about page)
 */
export async function getFounders(): Promise<TeamMember[]> {
  try {
    const founders = await sanityClient.fetch<TeamMember[]>(
      `*[_type == "teamMember" && isFounder == true] | order(displayOrder asc) {
        ${teamMemberFields}
      }`
    )
    return founders ?? []
  } catch (error) {
    console.error('Failed to fetch founders from Sanity:', error)
    return []
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Affiliates / Partners logos
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all affiliate logos ordered by display order
 */
export async function getAffiliates(): Promise<Affiliate[]> {
  try {
    const affiliates = await sanityClient.fetch<Affiliate[]>(
      `*[_type == "affiliate"] | order(displayOrder asc) {
        _id,
        name,
        logo { asset { _ref, _type }, alt },
        url,
        category,
        displayOrder
      }`
    )
    return affiliates ?? []
  } catch (error) {
    console.error('Failed to fetch affiliates from Sanity:', error)
    return []
  }
}
