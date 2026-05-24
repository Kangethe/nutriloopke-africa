import type { ApplicationType, NewsCategory } from '@/types'

// ── Date formatting ───────────────────────────────────────────────────────────

/**
 * Format a date string for display (e.g. "12 May 2024")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Nairobi',
  }).format(date)
}

/**
 * Format a date string as relative time (e.g. "3 days ago")
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

/**
 * Format a date string with time (e.g. "12 May 2024 at 14:30 EAT")
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Nairobi',
    timeZoneName: 'short',
  }).format(date)
}

// ── Number formatting ─────────────────────────────────────────────────────────

/**
 * Format large numbers with commas (e.g. 22000 → "22,000")
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-KE').format(value)
}

/**
 * Format a number with optional prefix/suffix for KPI display
 * e.g. formatKpi(630, '', 't CO₂-eq') → "630 t CO₂-eq"
 */
export function formatKpi(
  value: number,
  prefix = '',
  suffix = '',
  unit = ''
): string {
  const formatted = formatNumber(value)
  const parts = [prefix, formatted, unit, suffix].filter(Boolean)
  return parts.join(' ')
}

// ── Label mappers ─────────────────────────────────────────────────────────────

export const APPLICATION_TYPE_LABELS: Record<ApplicationType, string> = {
  waste_supplier: 'Waste Supplier',
  buyer: 'Product Buyer',
  investor: 'Investor / Funder',
  research: 'Research Partner',
  media: 'Media / Press',
}

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  milestone: 'Milestone',
  media_coverage: 'Media Coverage',
  research: 'Research',
  partnership: 'Partnership',
  impact: 'Impact',
  product: 'Product',
}

export const NEWS_CATEGORY_COLORS: Record<NewsCategory, string> = {
  milestone: 'bg-brand-green-50 text-brand-green-800 border-brand-green-200',
  media_coverage: 'bg-blue-50 text-blue-800 border-blue-200',
  research: 'bg-purple-50 text-purple-800 border-purple-200',
  partnership: 'bg-brand-amber-50 text-brand-amber-800 border-brand-amber-200',
  impact: 'bg-green-50 text-green-800 border-green-200',
  product: 'bg-brand-brown-50 text-brand-brown-800 border-brand-brown-200',
}

// ── Truncation ────────────────────────────────────────────────────────────────

/**
 * Truncate a string to a maximum length with an ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trim() + '…'
}

/**
 * Strip HTML tags from a string (for email plain-text fallbacks)
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

// ── Slug helpers ──────────────────────────────────────────────────────────────

/**
 * Convert a string to a URL-safe slug
 * e.g. "NutriLoop Africa Launch" → "nutriloop-africa-launch"
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
