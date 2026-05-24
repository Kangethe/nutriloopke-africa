import { timingSafeEqual, createHash } from 'crypto'
import type { NextAuthOptions, DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'

// ── Extend NextAuth types to include role ─────────────────────────────────────
declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      role: 'admin'
    }
  }
  interface JWT {
    role?: 'admin'
  }
}

// Zod schema for the login form credentials
const CredentialsSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

/**
 * Constant-time string comparison to prevent timing attacks.
 * Returns false immediately if lengths differ (not constant-time for length,
 * but leaking length is acceptable in this context).
 */
function safeCompare(a: string, b: string): boolean {
  try {
    // Hash both strings so they always have the same byte length,
    // enabling true constant-time comparison regardless of input length.
    const hashA = createHash('sha256').update(a).digest()
    const hashB = createHash('sha256').update(b).digest()
    return timingSafeEqual(hashA, hashB)
  } catch {
    return false
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'NutriLoop Admin',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'founders@nutriloopAfrica.com' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // Validate input shape
        const parsed = CredentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminEmail || !adminPassword) {
          console.error(
            '[NextAuth] ADMIN_EMAIL or ADMIN_PASSWORD not configured. ' +
              'Set both in .env.local to enable admin access.'
          )
          return null
        }

        // Both checks must pass — short-circuit only after both comparisons
        const emailMatch = safeCompare(email, adminEmail)
        const passwordMatch = safeCompare(password, adminPassword)

        if (emailMatch && passwordMatch) {
          return {
            id: 'admin-1',
            email: adminEmail,
            name: 'NutriLoop Admin',
          }
        }

        return null
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    // Session expires after 8 hours — forces re-login daily
    maxAge: 8 * 60 * 60,
  },

  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin' as const
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as 'admin') ?? 'admin'
      }
      return session
    },
  },

  // Use a secure, randomly-generated secret from NEXTAUTH_SECRET env var
  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
}
