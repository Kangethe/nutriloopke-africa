'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react'
import { ContactFormSchema, type ContactFormInput } from '@/lib/utils/validators'
import { cn } from '@/lib/utils/cn'

const inputClass = (hasError?: boolean) =>
  cn(
    'w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 bg-white transition-all duration-150 outline-none',
    'placeholder:text-gray-400 focus:ring-2 focus:ring-brand-green-500 focus:ring-offset-1 focus:border-brand-green-400',
    hasError ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 hover:border-gray-300'
  )

export function ContactForm() {
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { enquiry_type: 'general' },
  })

  const onSubmit = async (data: ContactFormInput) => {
    setApiError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json()) as { success: boolean; message?: string; error?: string }
      if (json.success) {
        setSubmitted(true)
        reset()
      } else {
        setApiError(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setApiError('Could not connect. Please check your connection and try again.')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center text-center py-12 px-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
          role="status"
        >
          <div className="w-16 h-16 rounded-full bg-brand-green-50 border-2 border-brand-green-200 flex items-center justify-center mb-5">
            <CheckCircle size={30} className="text-brand-green-600" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-2">Message received.</h3>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-6">
            We respond to every message within 48 hours. If your matter is urgent, WhatsApp us directly.
          </p>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white text-sm font-semibold transition-colors"
          >
            WhatsApp us now
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5"
          aria-label="Contact form"
        >
          {/* Enquiry type */}
          <div>
            <label htmlFor="enquiry_type" className="block text-sm font-medium text-gray-700 mb-1.5">
              Enquiry type
            </label>
            <select
              id="enquiry_type"
              className={inputClass(!!errors.enquiry_type)}
              {...register('enquiry_type')}
            >
              <option value="general">General enquiry</option>
              <option value="media">Media / press</option>
              <option value="partnership">Partnership</option>
              <option value="investor">Investor</option>
              <option value="other">Other</option>
            </select>
            {errors.enquiry_type && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5" role="alert">
                <AlertCircle size={12} />{errors.enquiry_type.message}
              </p>
            )}
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Your name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full name"
                className={inputClass(!!errors.name)}
                {...register('name')}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5" role="alert">
                  <AlertCircle size={12} />{errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@organisation.com"
                className={inputClass(!!errors.email)}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5" role="alert">
                  <AlertCircle size={12} />{errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Organisation (optional) */}
          <div>
            <label htmlFor="organisation" className="block text-sm font-medium text-gray-700 mb-1.5">
              Organisation
              <span className="ml-1.5 text-xs text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="organisation"
              type="text"
              placeholder="Company, fund, publication…"
              className={inputClass(!!errors.organisation)}
              {...register('organisation')}
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="What is your message about?"
              className={inputClass(!!errors.subject)}
              {...register('subject')}
            />
            {errors.subject && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5" role="alert">
                <AlertCircle size={12} />{errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message…"
              className={cn(inputClass(!!errors.message), 'resize-none')}
              {...register('message')}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5" role="alert">
                <AlertCircle size={12} />{errors.message.message}
              </p>
            )}
          </div>

          {/* API error */}
          {apiError && (
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200" role="alert">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{apiError}</p>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-brand-green-900/20 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Sending…</>
              ) : (
                <>Send message <Send size={14} /></>
              )}
            </button>
            <p className="mt-3 text-xs text-gray-400">
              We reply within 48 hours. For urgent matters:{' '}
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer"
                className="text-brand-green-600 hover:underline">
                WhatsApp us
              </a>.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
