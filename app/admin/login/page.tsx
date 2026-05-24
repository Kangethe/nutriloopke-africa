'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Loader2, Lock, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin'
  const isError = searchParams.get('error') === 'CredentialsSignin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    isError ? 'Invalid email or password. Please try again.' : null
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || loading) return

    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    if (result?.ok) {
      router.push(callbackUrl)
      router.refresh()
    } else {
      setError('Invalid email or password. Please check your admin credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(46,125,50,0.15) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-brand-green-700/40 shadow-xl mb-4">
            <Image
              src="/logo.png"
              alt="NutriLoop Africa"
              width={64}
              height={64}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-white">NutriLoop Africa</h1>
          <p className="text-white/40 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Login card */}
        <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={15} className="text-brand-green-400" />
            <h2 className="text-sm font-semibold text-white">Sign in to continue</h2>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-white/50 mb-1.5"
                >
                  Admin email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founders@nutriloopAfrica.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/8 text-white text-sm placeholder:text-white/25 outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-white/50 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/8 text-white text-sm placeholder:text-white/25 outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-950/50 border border-red-800/40">
                <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white text-sm font-semibold transition-all duration-150 hover:-translate-y-px disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        {/* Security note */}
        <p className="text-center text-xs text-white/20 mt-6">
          Restricted to authorised NutriLoop Africa team members.
          <br />
          Credentials are set via environment variables.
        </p>
      </div>
    </div>
  )
}
