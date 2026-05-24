import { Resend } from 'resend'

let resendClient: Resend | null = null

export function getResendClient(): Resend {
  if (resendClient) return resendClient

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error(
      'Missing RESEND_API_KEY environment variable. ' +
        'Get your key from resend.com and set it in .env.local'
    )
  }

  resendClient = new Resend(apiKey)
  return resendClient
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'NutriLoop Africa <hello@nutriloopAfrica.com>'

export const FOUNDER_EMAIL =
  process.env.FOUNDER_NOTIFICATION_EMAIL ?? 'founders@nutriloopAfrica.com'

export const APPLICATION_TYPE_LABELS: Record<string, string> = {
  waste_supplier: 'Waste Supplier',
  buyer: 'Product Buyer',
  investor: 'Investor / Funder',
  research: 'Research Partner',
  media: 'Media / Press',
}
