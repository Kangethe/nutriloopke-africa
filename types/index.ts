// ─────────────────────────────────────────────────────────────────────────────
// NutriLoop Africa — Central TypeScript Types
// Every interface in the project lives here. Zero `any`. Zero `unknown`
// without narrowing. Discriminated unions for all polymorphic forms.
// ─────────────────────────────────────────────────────────────────────────────

// ── API Response Wrappers ─────────────────────────────────────────────────────

export type ApiSuccess<T> = {
  success: true
  data: T
  message?: string
}

export type ApiError = {
  success: false
  error: string
  code?: string
  field?: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

// ── Apply Form — Discriminated Union ─────────────────────────────────────────

export type ApplicationType = 'waste_supplier' | 'buyer' | 'investor' | 'research' | 'media'

export type ApplicationStatus = 'pending' | 'reviewed' | 'contacted' | 'converted' | 'declined'

interface BaseApplicationFields {
  contact_name: string
  email: string
  phone?: string
  notes?: string
  source_tab?: string
}

export interface WasteSupplierApplication extends BaseApplicationFields {
  type: 'waste_supplier'
  organisation_name: string
  location: string
  waste_type: string[]
  daily_volume_kg: number
  collection_address: string
}

export interface BuyerApplication extends BaseApplicationFields {
  type: 'buyer'
  organisation_name: string
  location: string
  product_interest: string[]
  monthly_volume_kg: number
  delivery_area: string
}

export interface InvestorApplication extends BaseApplicationFields {
  type: 'investor'
  organisation_name: string
  fund_type: string
  investment_range: string
  timeline: string
}

export interface ResearchApplication extends BaseApplicationFields {
  type: 'research'
  institution: string
  research_area: string
}

export interface MediaApplication extends BaseApplicationFields {
  type: 'media'
  publication: string
  story_angle: string
  deadline?: string
}

export type ApplicationFormData =
  | WasteSupplierApplication
  | BuyerApplication
  | InvestorApplication
  | ResearchApplication
  | MediaApplication

// Row as stored in Supabase (includes db-generated fields)
export interface ApplicationRecord extends BaseApplicationFields {
  id: string
  type: ApplicationType
  status: ApplicationStatus
  organisation_name?: string
  location?: string
  waste_type?: string[]
  daily_volume_kg?: number
  collection_address?: string
  product_interest?: string[]
  monthly_volume_kg?: number
  delivery_area?: string
  fund_type?: string
  investment_range?: string
  timeline?: string
  institution?: string
  research_area?: string
  publication?: string
  story_angle?: string
  deadline?: string
  source_tab?: string
  ip_address?: string
  user_agent?: string
  created_at: string
  updated_at: string
}

// ── Contact Form ──────────────────────────────────────────────────────────────

export type ContactEnquiryType = 'general' | 'media' | 'partnership' | 'investor' | 'other'

export interface ContactFormData {
  name: string
  email: string
  organisation?: string
  subject: string
  message: string
  enquiry_type: ContactEnquiryType
}

export interface ContactRecord extends ContactFormData {
  id: string
  ip_address?: string
  user_agent?: string
  created_at: string
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export interface NewsletterFormData {
  email: string
  source?: string
}

export interface NewsletterRecord {
  id: string
  email: string
  source: string
  status: 'active' | 'unsubscribed'
  created_at: string
  unsubscribed_at?: string
}

// ── KPI Values ────────────────────────────────────────────────────────────────

export interface KpiValue {
  id: string
  key: string
  label: string
  value: number
  unit?: string
  prefix?: string
  suffix?: string
  description?: string
  updated_at: string
  updated_by?: string
}

export type KpiKey =
  | 'waste_daily_kenya'
  | 'organic_waste_mismanaged'
  | 'feed_imported'
  | 'bsf_conversion_days'
  | 'gross_margin'
  | 'waste_diverted_year1'
  | 'co2_avoided_year1'
  | 'sdgs_addressed'
  | 'protein_meal_year1'
  | 'frass_year1'
  | 'feed_market_tam'
  | 'price_vs_soy'
  | 'direct_jobs'
  | 'indirect_jobs'

// ── Sanity CMS Types ──────────────────────────────────────────────────────────

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface NewsPost {
  _id: string
  _type: 'newsPost'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: SanitySlug
  publishedAt: string
  excerpt: string
  category: NewsCategory
  featuredImage?: SanityImageAsset
  body: SanityBlock[]
  author?: TeamMember
  tags?: string[]
  seo?: SeoFields
}

export type NewsCategory =
  | 'milestone'
  | 'media_coverage'
  | 'research'
  | 'partnership'
  | 'impact'
  | 'product'

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  role: string
  bio: string
  photo?: SanityImageAsset
  linkedin?: string
  twitter?: string
  email?: string
  isFounder: boolean
  isAdvisor: boolean
  affiliation?: string
  displayOrder: number
}

export interface Affiliate {
  _id: string
  _type: 'affiliate'
  name: string
  logo: SanityImageAsset
  url: string
  category: AffiliateCategory
  displayOrder: number
}

export type AffiliateCategory =
  | 'science_partner'
  | 'funder'
  | 'regulatory'
  | 'certification'
  | 'accelerator'

export interface SanityBlock {
  _type: 'block'
  _key: string
  style: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks: string[]
  }>
  markDefs: Array<{
    _key: string
    _type: string
    href?: string
  }>
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImageAsset
  noIndex?: boolean
}

// ── Product Types ─────────────────────────────────────────────────────────────

export type ProductKey = 'protein_meal' | 'frass_fertiliser' | 'fresh_larvae' | 'defatted_concentrate'

export interface ProductSpec {
  key: ProductKey
  name: string
  tagline: string
  description: string
  stats: Array<{ label: string; value: string }>
  targetBuyers: string[]
  benefits: string[]
}

// ── SDG Types ─────────────────────────────────────────────────────────────────

export type SDGNumber =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17

export type SDGImpactLevel = 'direct' | 'indirect'

export interface SDGCard {
  number: SDGNumber
  title: string
  color: string
  impact: SDGImpactLevel
  nutriloopContribution: string
}

// ── Stakeholder Tab Types ─────────────────────────────────────────────────────

export type StakeholderType = 'waste_supplier' | 'buyer' | 'investor' | 'government'

export interface StakeholderTab {
  type: StakeholderType
  label: string
  headline: string
  description: string
  valueProps: string[]
  ctaText: string
  ctaHref: string
}

// ── Rate Limiting ─────────────────────────────────────────────────────────────

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

// ── Email Template Props ──────────────────────────────────────────────────────

export interface ApplicationReceivedEmailProps {
  applicantName: string
  applicationType: ApplicationType
  organisationOrPublication: string
  applicationId: string
}

export interface FounderNotificationEmailProps {
  applicantName: string
  applicantEmail: string
  applicationType: ApplicationType
  organisationOrPublication: string
  keyDetails: Record<string, string>
  applicationId: string
  submittedAt: string
}

export interface WelcomeNewsletterEmailProps {
  subscriberEmail: string
}
