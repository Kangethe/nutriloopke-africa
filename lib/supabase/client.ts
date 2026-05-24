import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

// Singleton instance — prevents multiple GoTrueClient warnings in dev
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
        'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    )
  }

  browserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  return browserClient
}
