'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface NewsletterInputProps {
  variant?: 'dark' | 'light'
  placeholder?: string
  className?: string
  source?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterInput({
  variant = 'dark',
  placeholder = 'Your email address',
  className,
  source = 'footer',
}: NewsletterInputProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = (await res.json()) as { success: boolean; message?: string; error?: string }

      if (data.success) {
        setStatus('success')
        setMessage(data.message ?? "You're in.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Could not connect. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex items-center gap-2.5 px-4 py-3 rounded-xl',
          variant === 'dark' ? 'bg-brand-green-900/40 text-brand-green-300' : 'bg-brand-green-50 text-brand-green-700',
          className
        )}
        role="status"
      >
        <CheckCircle size={18} className="flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => { void handleSubmit(e) }} className={cn('w-full', className)} noValidate>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address for newsletter
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            placeholder={placeholder}
            required
            autoComplete="email"
            className={cn(
              'w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150',
              'focus:ring-2 focus:ring-brand-green-500 focus:ring-offset-1',
              variant === 'dark'
                ? 'bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:bg-white/15 focus:ring-offset-transparent'
                : 'bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm',
              status === 'error' && 'ring-2 ring-red-500'
            )}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          aria-label="Subscribe to newsletter"
          className={cn(
            'flex items-center justify-center w-12 flex-shrink-0 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber-500',
            'bg-brand-amber-700 hover:bg-brand-amber-800 text-white disabled:opacity-50 disabled:pointer-events-none'
          )}
        >
          {status === 'loading' ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <ArrowRight size={18} />
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {message}
        </p>
      )}
    </form>
  )
}
