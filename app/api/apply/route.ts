import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { ApplyFormSchema } from '@/lib/utils/validators'
import { rateLimitApply } from '@/lib/utils/rate-limit'
import { getSupabaseServiceClient } from '@/lib/supabase/server'
import { getResendClient, FROM_EMAIL, FOUNDER_EMAIL, APPLICATION_TYPE_LABELS } from '@/lib/resend/client'
import { ApplicationReceivedEmail } from '@/lib/resend/templates/ApplicationReceived'
import { FounderNotificationEmail } from '@/lib/resend/templates/FounderNotification'
import { formatDateTime } from '@/lib/utils/format'
import type { ApiResponse, ApplicationFormData } from '@/types'

// ── Helper: extract key display details per application type ─────────────────
function extractKeyDetails(data: ApplicationFormData): Record<string, string> {
  switch (data.type) {
    case 'waste_supplier':
      return {
        'Organisation': data.organisation_name,
        'Location': data.location,
        'Waste types': data.waste_type.join(', '),
        'Daily volume': `${data.daily_volume_kg.toLocaleString()} kg/day`,
        'Collection address': data.collection_address,
        ...(data.phone ? { 'Phone': data.phone } : {}),
        ...(data.notes ? { 'Notes': data.notes } : {}),
      }

    case 'buyer':
      return {
        'Organisation': data.organisation_name,
        'Location': data.location,
        'Products of interest': data.product_interest.join(', '),
        'Monthly volume': `${data.monthly_volume_kg.toLocaleString()} kg/month`,
        'Delivery area': data.delivery_area,
        ...(data.phone ? { 'Phone': data.phone } : {}),
        ...(data.notes ? { 'Notes': data.notes } : {}),
      }

    case 'investor':
      return {
        'Fund / Organisation': data.organisation_name,
        'Fund type': data.fund_type,
        'Investment range': data.investment_range,
        'Timeline': data.timeline,
        ...(data.phone ? { 'Phone': data.phone } : {}),
        ...(data.notes ? { 'Notes': data.notes } : {}),
      }

    case 'research':
      return {
        'Institution': data.institution,
        'Research area': data.research_area,
        ...(data.phone ? { 'Phone': data.phone } : {}),
        ...(data.notes ? { 'Notes': data.notes } : {}),
      }

    case 'media':
      return {
        'Publication': data.publication,
        'Story angle': data.story_angle,
        ...(data.deadline ? { 'Deadline': data.deadline } : {}),
        ...(data.phone ? { 'Phone': data.phone } : {}),
        ...(data.notes ? { 'Notes': data.notes } : {}),
      }
  }
}

function getOrganisationName(data: ApplicationFormData): string {
  switch (data.type) {
    case 'waste_supplier':
    case 'buyer':
    case 'investor':
      return data.organisation_name
    case 'research':
      return data.institution
    case 'media':
      return data.publication
  }
}

// ── Helper: build Supabase insert payload from validated form data ────────────
function buildInsertPayload(
  data: ApplicationFormData,
  ip: string,
  userAgent: string
) {
  const base = {
    type: data.type,
    contact_name: data.contact_name,
    email: data.email,
    phone: data.phone ?? null,
    notes: data.notes ?? null,
    ip_address: ip,
    user_agent: userAgent.slice(0, 500),
  }

  switch (data.type) {
    case 'waste_supplier':
      return {
        ...base,
        organisation_name: data.organisation_name,
        location: data.location,
        waste_type: data.waste_type,
        daily_volume_kg: data.daily_volume_kg,
        collection_address: data.collection_address,
        source_tab: 'waste_supplier',
      }
    case 'buyer':
      return {
        ...base,
        organisation_name: data.organisation_name,
        location: data.location,
        product_interest: data.product_interest,
        monthly_volume_kg: data.monthly_volume_kg,
        delivery_area: data.delivery_area,
        source_tab: 'buyer',
      }
    case 'investor':
      return {
        ...base,
        organisation_name: data.organisation_name,
        fund_type: data.fund_type,
        investment_range: data.investment_range,
        timeline: data.timeline,
        source_tab: 'investor',
      }
    case 'research':
      return {
        ...base,
        institution: data.institution,
        research_area: data.research_area,
        source_tab: 'research',
      }
    case 'media':
      return {
        ...base,
        publication: data.publication,
        story_angle: data.story_angle,
        deadline: data.deadline ?? null,
        source_tab: 'media',
      }
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  // 1. Extract client IP from middleware-injected header
  const ip = request.headers.get('x-client-ip') ?? '0.0.0.0'
  const userAgent = request.headers.get('x-client-ua') ?? request.headers.get('user-agent') ?? 'unknown'

  // 2. Rate limit: 5 submissions per 10 minutes per IP
  const rateLimitResult = rateLimitApply(ip)
  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many applications submitted. Please wait a few minutes and try again.',
        code: 'RATE_LIMITED',
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(rateLimitResult.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimitResult.reset),
          'Retry-After': String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000)),
        },
      }
    )
  }

  // 3. Parse request body
  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body — expected JSON.', code: 'INVALID_JSON' },
      { status: 400 }
    )
  }

  // 4. Validate with Zod discriminated union
  let data: ApplicationFormData
  try {
    data = ApplyFormSchema.parse(rawBody)
  } catch (error) {
    if (error instanceof ZodError) {
      const firstIssue = error.issues[0]
      return NextResponse.json(
        {
          success: false,
          error: firstIssue?.message ?? 'Validation failed. Please check your form and try again.',
          code: 'VALIDATION_ERROR',
          field: firstIssue?.path.join('.'),
        },
        { status: 422 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Unexpected validation error.', code: 'VALIDATION_ERROR' },
      { status: 422 }
    )
  }

  // 5. Insert into Supabase
  const supabase = getSupabaseServiceClient()
  const payload = buildInsertPayload(data, ip, userAgent)

  const { data: inserted, error: dbError } = await supabase
    .from('partner_applications')
    .insert(payload)
    .select('id, created_at')
    .single()

  if (dbError || !inserted) {
    console.error('[/api/apply] Supabase insert error:', dbError)
    return NextResponse.json(
      {
        success: false,
        error: 'We could not save your application. Please try again or email us directly at hello@nutriloopAfrica.com.',
        code: 'DATABASE_ERROR',
      },
      { status: 500 }
    )
  }

  const applicationId: string = inserted.id
  const organisationOrPublication = getOrganisationName(data)
  const keyDetails = extractKeyDetails(data)
  const typeLabel = APPLICATION_TYPE_LABELS[data.type] ?? 'Partner'

  // 6. Send emails (fire both, don't block on either failing)
  const resend = getResendClient()
  const submittedAt = formatDateTime(inserted.created_at as string)

  const [applicantEmailResult, founderEmailResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Your ${typeLabel} application — NutriLoop Africa`,
      react: ApplicationReceivedEmail({
        applicantName: data.contact_name,
        applicationType: data.type,
        organisationOrPublication,
        applicationId,
      }),
    }),

    resend.emails.send({
      from: FROM_EMAIL,
      to: FOUNDER_EMAIL,
      subject: `[New Application] ${typeLabel} — ${data.contact_name} (${organisationOrPublication})`,
      react: FounderNotificationEmail({
        applicantName: data.contact_name,
        applicantEmail: data.email,
        applicationType: data.type,
        organisationOrPublication,
        keyDetails,
        applicationId,
        submittedAt,
      }),
    }),
  ])

  // Log email failures — don't expose to client
  if (applicantEmailResult.status === 'rejected') {
    console.error('[/api/apply] Failed to send applicant confirmation:', applicantEmailResult.reason)
  }
  if (founderEmailResult.status === 'rejected') {
    console.error('[/api/apply] Failed to send founder notification:', founderEmailResult.reason)
  }

  // 7. Return success — application is saved regardless of email status
  return NextResponse.json(
    {
      success: true,
      data: { id: applicationId },
      message: `Thank you, ${data.contact_name}. Your ${typeLabel.toLowerCase()} application has been received. We will be in touch within 48 hours.`,
    },
    { status: 201 }
  )
}

// Block non-POST methods explicitly
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 })
}
