'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to your error monitoring service here (e.g. Sentry)
    console.error('[NutriLoop Error Boundary]', error)
  }, [error])

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,92,0,0.10) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-brand-amber-700/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="NutriLoop Africa" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Something went wrong.
        </h1>
        <p className="text-white/50 leading-relaxed mb-3">
          An unexpected error occurred. Our team has been notified. Please try
          refreshing — it usually resolves itself.
        </p>

        {/* Show digest only in development */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <p className="font-mono text-xs text-white/25 mb-6 bg-white/5 px-3 py-2 rounded-lg">
            Error digest: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-sm transition-all hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber-400"
          >
            <RefreshCw size={15} /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/14 border border-white/12 text-white font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <Home size={15} /> Go home
          </Link>
        </div>

        <p className="mt-10 text-xs text-white/25">
          Persistent issue?{' '}
          <a
            href="mailto:hello@nutriloopAfrica.com"
            className="text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
          >
            Email us
          </a>
        </p>
      </div>
    </div>
  )
}
