import { z } from 'zod'

// ─────────────────────────────────────────────────────────────────────────────
// Shared Field Validators
// ─────────────────────────────────────────────────────────────────────────────

const emailField = z
  .string({ required_error: 'Email address is required' })
  .trim()
  .min(1, 'Email address is required')
  .email('Please enter a valid email address')
  .max(254, 'Email address is too long')
  .toLowerCase()

const phoneField = z
  .string()
  .trim()
  .regex(
    /^(\+?[\d\s\-().]{7,20})?$/,
    'Please enter a valid phone number (e.g. +254 700 123 456)'
  )
  .optional()

const nameField = (label: string) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(100, `${label} must be under 100 characters`)

const organisationField = (label = 'Organisation name') =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(200, `${label} must be under 200 characters`)

const notesField = z.string().trim().max(1000, 'Notes must be under 1,000 characters').optional()

// Sanitise: strip leading/trailing whitespace and collapse internal spaces
const sanitisedString = (minLen: number, maxLen: number, label: string) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(minLen, `${label} must be at least ${minLen} characters`)
    .max(maxLen, `${label} must be under ${maxLen} characters`)
    .transform((val) => val.replace(/\s+/g, ' '))

// ─────────────────────────────────────────────────────────────────────────────
// Apply Form Schemas — Discriminated Union
// ─────────────────────────────────────────────────────────────────────────────

export const WasteSupplierSchema = z.object({
  type: z.literal('waste_supplier'),
  organisation_name: organisationField('Organisation name'),
  contact_name: nameField('Contact name'),
  email: emailField,
  phone: phoneField,
  location: sanitisedString(2, 200, 'Location / area'),
  waste_type: z
    .array(z.string().min(1))
    .min(1, 'Please select at least one waste type')
    .max(10, 'Please select no more than 10 waste types'),
  daily_volume_kg: z
    .number({ required_error: 'Please estimate your daily waste volume' })
    .int('Volume must be a whole number')
    .positive('Volume must be greater than 0')
    .max(50_000, 'Volume seems too high — please contact us directly'),
  collection_address: sanitisedString(10, 500, 'Collection address'),
  notes: notesField,
})

export const BuyerSchema = z.object({
  type: z.literal('buyer'),
  organisation_name: organisationField('Organisation name'),
  contact_name: nameField('Contact name'),
  email: emailField,
  phone: phoneField,
  location: sanitisedString(2, 200, 'Location / area'),
  product_interest: z
    .array(z.string().min(1))
    .min(1, 'Please select at least one product')
    .max(5, 'Please select no more than 5 products'),
  monthly_volume_kg: z
    .number({ required_error: 'Please estimate your monthly purchase volume' })
    .int('Volume must be a whole number')
    .positive('Volume must be greater than 0')
    .max(500_000, 'Volume seems very high — please contact us directly'),
  delivery_area: sanitisedString(2, 200, 'Delivery area'),
  notes: notesField,
})

export const InvestorSchema = z.object({
  type: z.literal('investor'),
  organisation_name: organisationField('Fund / Organisation name'),
  contact_name: nameField('Contact name'),
  email: emailField,
  phone: phoneField,
  fund_type: z
    .string({ required_error: 'Please describe your fund type' })
    .trim()
    .min(2, 'Fund type must be at least 2 characters')
    .max(100, 'Fund type must be under 100 characters'),
  investment_range: z
    .string({ required_error: 'Please indicate your investment range' })
    .trim()
    .min(2, 'Investment range must be at least 2 characters')
    .max(100, 'Investment range must be under 100 characters'),
  timeline: z
    .string({ required_error: 'Please indicate your investment timeline' })
    .trim()
    .min(2, 'Timeline must be at least 2 characters')
    .max(100, 'Timeline must be under 100 characters'),
  notes: notesField,
})

export const ResearchSchema = z.object({
  type: z.literal('research'),
  institution: organisationField('Institution name'),
  contact_name: nameField('Contact name'),
  email: emailField,
  phone: phoneField,
  research_area: sanitisedString(
    5,
    300,
    'Research area / topic'
  ),
  notes: notesField,
})

export const MediaSchema = z.object({
  type: z.literal('media'),
  publication: organisationField('Publication / outlet name'),
  contact_name: nameField('Your name'),
  email: emailField,
  phone: phoneField,
  story_angle: sanitisedString(10, 1000, 'Story angle / brief'),
  deadline: z
    .string()
    .trim()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Please use YYYY-MM-DD format'
    )
    .optional()
    .or(z.literal('')),
  notes: z.string().trim().max(500, 'Notes must be under 500 characters').optional(),
})

export const ApplyFormSchema = z.discriminatedUnion('type', [
  WasteSupplierSchema,
  BuyerSchema,
  InvestorSchema,
  ResearchSchema,
  MediaSchema,
])

export type ApplyFormInput = z.infer<typeof ApplyFormSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Contact Form Schema
// ─────────────────────────────────────────────────────────────────────────────

export const ContactFormSchema = z.object({
  name: nameField('Your name'),
  email: emailField,
  organisation: z
    .string()
    .trim()
    .max(200, 'Organisation name must be under 200 characters')
    .optional(),
  subject: sanitisedString(3, 200, 'Subject'),
  message: sanitisedString(10, 5000, 'Message'),
  enquiry_type: z.enum(
    ['general', 'media', 'partnership', 'investor', 'other'],
    { required_error: 'Please select an enquiry type' }
  ),
})

export type ContactFormInput = z.infer<typeof ContactFormSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Newsletter Schema
// ─────────────────────────────────────────────────────────────────────────────

export const NewsletterSchema = z.object({
  email: emailField,
  source: z.string().trim().max(50).optional().default('footer'),
})

export type NewsletterInput = z.infer<typeof NewsletterSchema>
