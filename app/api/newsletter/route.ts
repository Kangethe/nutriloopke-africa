import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { NewsletterSchema } from '@/lib/utils/validators'
import { rateLimitNewsletter } from '@/lib/utils/rate-limit'
import { getSupabaseServiceClient } from '@/lib/supabase/server'
import { getResendClient, FROM_EMAIL } from '@/lib/resend/client'
import { WelcomeNewsletterEmail } from '@/lib/resend/templates/WelcomeNewsletter'
import type { ApiResponse } from '@/types'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Rate limit
    const ip = request.headers.get('x-client-ip') ?? '0.0.0.0'
    const rateLimitResult = rateLimitNewsletter(ip)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in a few minutes.', code: 'RATE_LIMITED' },
        { status: 429 }
      )
    }

    // 2. Parse body
    let rawBody: unknown
    try {
      rawBody = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid request body.', code: 'INVALID_JSON' },
        { status: 400 }
      )
    }

    // 3. Validate email
    let data: ReturnType<typeof NewsletterSchema.parse>
    try {
      data = NewsletterSchema.parse(rawBody)
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { success: false, error: error.issues[0]?.message ?? 'Please enter a valid email address.', code: 'VALIDATION_ERROR' },
          { status: 422 }
        )
      }
      return NextResponse.json(
        { success: false, error: 'Validation error.', code: 'VALIDATION_ERROR' },
        { status: 422 }
      )
    }

    // 4. Get Supabase client (uses service role key)
    const supabase = getSupabaseServiceClient()

    // 5. Check existing subscriber
    const { data: existing, error: lookupError } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', data.email)
      .maybeSingle()

    if (lookupError) {
      console.error('[/api/newsletter] lookup error:', lookupError)
      return NextResponse.json(
        { success: false, error: `Database lookup error: ${lookupError.message}`, code: 'DB_LOOKUP_ERROR' },
        { status: 500 }
      )
    }

    // 6. Already subscribed (active)
    if (existing && existing.status === 'active') {
      return NextResponse.json(
        { success: true, data: { status: 'already_subscribed' }, message: "You're already subscribed — we'll keep the updates coming." },
        { status: 200 }
      )
    }

    // 7. Previously unsubscribed – reactivate
    if (existing && existing.status === 'unsubscribed') {
      const { error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({ status: 'active', unsubscribed_at: null })
        .eq('id', existing.id)

      if (updateError) {
        return NextResponse.json(
          { success: false, error: `Reactivate error: ${updateError.message}`, code: 'DB_UPDATE_ERROR' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { success: true, data: { status: 'subscribed' }, message: "Welcome back — you're re-subscribed to NutriLoop Africa updates." },
        { status: 200 }
      )
    }

    // 8. New subscriber – insert
    const { data: inserted, error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: data.email,
        source: data.source ?? 'footer',
        status: 'active',
        ip_address: ip,
      })
      .select('id')
      .single()

    if (insertError || !inserted) {
      console.error('[/api/newsletter] insert error:', insertError)
      return NextResponse.json(
        { success: false, error: `Insert error: ${insertError?.message ?? 'unknown'}`, code: 'DB_INSERT_ERROR' },
        { status: 500 }
      )
    }

    // 9. Send welcome email (non‑blocking, but catch errors)
    try {
      const resend = getResendClient()
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: "You're in — NutriLoop Africa updates",
        react: WelcomeNewsletterEmail({ subscriberEmail: data.email }),
      })
    } catch (emailError) {
      console.error('[/api/newsletter] email send failed, but subscription saved:', emailError)
      // Do not return error to user – subscription already saved
    }

    return NextResponse.json(
      { success: true, data: { status: 'subscribed' }, message: "You're in. NutriLoop Africa updates will land in your inbox." },
      { status: 201 }
    )
  } catch (unknownError) {
    console.error('[/api/newsletter] Unhandled error:', unknownError)
    const errorMessage = unknownError instanceof Error ? unknownError.message : String(unknownError)
    return NextResponse.json(
      { success: false, error: `Internal error: ${errorMessage}`, code: 'UNHANDLED_ERROR' },
      { status: 500 }
    )
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Valid email address is required.', code: 'INVALID_EMAIL' },
      { status: 400 }
    )
  }

  const supabase = getSupabaseServiceClient()

  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
    .eq('email', email.toLowerCase())

  if (error) {
    console.error('[/api/newsletter DELETE] Supabase error:', error)
    return NextResponse.json(
      { success: false, error: 'Could not process your unsubscribe request.', code: 'DATABASE_ERROR' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { success: true, data: null, message: "You've been unsubscribed. No further emails will be sent." },
    { status: 200 }
  )
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 })
}