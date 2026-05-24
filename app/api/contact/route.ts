import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { ContactFormSchema } from '@/lib/utils/validators'
import { rateLimitContact } from '@/lib/utils/rate-limit'
import { getSupabaseServiceClient } from '@/lib/supabase/server'
import { getResendClient, FROM_EMAIL, FOUNDER_EMAIL } from '@/lib/resend/client'
import { formatDateTime } from '@/lib/utils/format'
import type { ApiResponse } from '@/types'

// ── Enquiry type display labels ───────────────────────────────────────────────
const ENQUIRY_LABELS: Record<string, string> = {
  general: 'General Enquiry',
  media: 'Media / Press',
  partnership: 'Partnership',
  investor: 'Investor',
  other: 'Other',
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  // 1. Rate limit: 3 messages per 5 minutes per IP
  const ip = request.headers.get('x-client-ip') ?? '0.0.0.0'
  const userAgent = request.headers.get('x-client-ua') ?? request.headers.get('user-agent') ?? 'unknown'

  const rateLimitResult = rateLimitContact(ip)
  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many messages sent. Please wait a few minutes before trying again.',
        code: 'RATE_LIMITED',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000)),
        },
      }
    )
  }

  // 2. Parse body
  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body — expected JSON.', code: 'INVALID_JSON' },
      { status: 400 }
    )
  }

  // 3. Validate
  let data: ReturnType<typeof ContactFormSchema.parse>
  try {
    data = ContactFormSchema.parse(rawBody)
  } catch (error) {
    if (error instanceof ZodError) {
      const firstIssue = error.issues[0]
      return NextResponse.json(
        {
          success: false,
          error: firstIssue?.message ?? 'Please check your form and try again.',
          code: 'VALIDATION_ERROR',
          field: firstIssue?.path.join('.'),
        },
        { status: 422 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Validation error.', code: 'VALIDATION_ERROR' },
      { status: 422 }
    )
  }

  // 4. Insert into Supabase
  const supabase = getSupabaseServiceClient()

  const { data: inserted, error: dbError } = await supabase
    .from('contact_submissions')
    .insert({
      name: data.name,
      email: data.email,
      organisation: data.organisation ?? null,
      subject: data.subject,
      message: data.message,
      enquiry_type: data.enquiry_type,
      ip_address: ip,
      user_agent: userAgent.slice(0, 500),
    })
    .select('id, created_at')
    .single()

  if (dbError || !inserted) {
    console.error('[/api/contact] Supabase insert error:', dbError)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send your message. Please email us directly at hello@nutriloopAfrica.com.',
        code: 'DATABASE_ERROR',
      },
      { status: 500 }
    )
  }

  const submittedAt = formatDateTime(inserted.created_at as string)

  // 5. Notify founders via Resend (plain HTML — no React template needed for internal ops)
  const resend = getResendClient()
  const enquiryLabel = ENQUIRY_LABELS[data.enquiry_type] ?? data.enquiry_type

  const [notificationResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: FOUNDER_EMAIL,
      reply_to: data.email,
      subject: `[Contact] ${enquiryLabel} — ${data.name}${data.organisation ? ` (${data.organisation})` : ''}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0A1A0A; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 18px;">New Contact Message</h1>
            <p style="color: #81C784; margin: 4px 0 0; font-size: 13px;">${enquiryLabel}</p>
          </div>
          <div style="border: 1px solid #E5E7EB; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; font-size: 12px; color: #6B7280; width: 120px;">From</td><td style="padding: 6px 0; font-size: 14px;">${data.name}</td></tr>
              <tr><td style="padding: 6px 0; font-size: 12px; color: #6B7280;">Email</td><td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #2E7D32;">${data.email}</a></td></tr>
              ${data.organisation ? `<tr><td style="padding: 6px 0; font-size: 12px; color: #6B7280;">Organisation</td><td style="padding: 6px 0; font-size: 14px;">${data.organisation}</td></tr>` : ''}
              <tr><td style="padding: 6px 0; font-size: 12px; color: #6B7280;">Subject</td><td style="padding: 6px 0; font-size: 14px;"><strong>${data.subject}</strong></td></tr>
              <tr><td style="padding: 6px 0; font-size: 12px; color: #6B7280;">Submitted</td><td style="padding: 6px 0; font-size: 13px; color: #9CA3AF;">${submittedAt}</td></tr>
            </table>
            <hr style="margin: 16px 0; border: none; border-top: 1px solid #E5E7EB;" />
            <div style="background: #F9FAF9; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${data.message}</div>
            <p style="margin: 16px 0 0; font-size: 12px; color: #9CA3AF;">Reply directly to this email to respond to ${data.name}.</p>
          </div>
        </div>
      `,
    }),
  ])

  if (notificationResult.status === 'rejected') {
    console.error('[/api/contact] Failed to send founder notification:', notificationResult.reason)
  }

  return NextResponse.json(
    {
      success: true,
      data: { id: inserted.id as string },
      message: `Thank you, ${data.name}. Your message has been received. We typically respond within 48 hours.`,
    },
    { status: 201 }
  )
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 })
}
