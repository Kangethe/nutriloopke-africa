import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from './database.types'

function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        'Check .env.local.example for all required variables.'
    )
  }
  return value
}

// ── Cookie-based Server Client ────────────────────────────────────────────────
// Use this in Server Components, Server Actions, and Route Handlers that need
// to act as the currently authenticated user.

export function getSupabaseServerClient() {
  const cookieStore = cookies()
  const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL')
  const supabaseAnonKey = getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch {
          // Same as above — safe to ignore in Server Components.
        }
      },
    },
  })
}

// ── Service Role Client ───────────────────────────────────────────────────────
// Use this ONLY in API route handlers (route.ts files) for privileged operations:
// inserting form submissions, reading all applications, etc.
// NEVER expose this client or its key to the browser.

export function getSupabaseServiceClient() {
  const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// ── Type-safe table helpers ───────────────────────────────────────────────────
// Convenience re-exports for common table row types

export type { Database } from './database.types'
