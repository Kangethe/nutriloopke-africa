'use client'

import React, { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm, type FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, ChevronRight, Loader2 } from 'lucide-react'
import {
  WasteSupplierSchema,
  BuyerSchema,
  InvestorSchema,
  ResearchSchema,
  MediaSchema,
  type ApplyFormInput,
} from '@/lib/utils/validators'
import type { ApplicationType } from '@/types'
import { cn } from '@/lib/utils/cn'

// ─────────────────────────────────────────────────────────────────────────────
// Shared field primitives
// ─────────────────────────────────────────────────────────────────────────────

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}
      {optional && <span className="ml-1.5 text-xs text-gray-400 font-normal">(optional)</span>}
    </label>
  )
}

function FieldError({ error }: { error?: FieldError }) {
  if (!error) return null
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600" role="alert">
      <AlertCircle size={12} className="flex-shrink-0" />
      {error.message}
    </p>
  )
}

const inputClass = (hasError?: boolean) =>
  cn(
    'w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 bg-white transition-all duration-150 outline-none',
    'placeholder:text-gray-400 focus:ring-2 focus:ring-brand-green-500 focus:ring-offset-1 focus:border-brand-green-400',
    hasError ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 hover:border-gray-300'
  )

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: FieldError }
>(
  ({ id, type = 'text', placeholder, error, disabled, ...rest }, ref) => {
    return (
      <>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClass(!!error)}
          ref={ref}
          {...rest}
        />
        <FieldError error={error} />
      </>
    )
  }
)

Input.displayName = 'Input'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: FieldError }
>(
  ({ id, placeholder, rows = 4, error, disabled, ...rest }, ref) => {
    return (
      <>
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(inputClass(!!error), 'resize-none')}
          ref={ref}
          {...rest}
        />
        <FieldError error={error} />
      </>
    )
  }
)

Textarea.displayName = 'Textarea'

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: FieldError }
>(
  ({ id, children, error, disabled, ...rest }, ref) => {
    return (
      <>
        <select
          id={id}
          disabled={disabled}
          className={cn(inputClass(!!error), 'cursor-pointer')}
          ref={ref}
          {...rest}
        >
          {children}
        </select>
        <FieldError error={error} />
      </>
    )
  }
)

Select.displayName = 'Select'

function CheckboxGroup({
  legend, options, name, register, error, disabled,
}: {
  legend: string
  options: { value: string; label: string }[]
  name: string
  register: ReturnType<typeof useForm>['register']
  error?: FieldError
  disabled?: boolean
}) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700 mb-2.5">{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map(({ value, label }) => (
          <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              value={value}
              disabled={disabled}
              {...register(name)}
              className="w-4 h-4 rounded border-gray-300 text-brand-green-600 focus:ring-brand-green-500 focus:ring-offset-1 cursor-pointer"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">
              {label}
            </span>
          </label>
        ))}
      </div>
      <FieldError error={error} />
    </fieldset>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared field groups
// ─────────────────────────────────────────────────────────────────────────────

const WASTE_TYPES = [
  { value: 'food_scraps', label: 'Food scraps (cooked & raw)' },
  { value: 'vegetable_fruit', label: 'Vegetable & fruit waste' },
  { value: 'market_waste', label: 'Market unsold produce' },
  { value: 'brewery_grain', label: 'Brewery / spent grain' },
  { value: 'catering_waste', label: 'Catering / event waste' },
  { value: 'kitchen_waste', label: 'Kitchen waste (general)' },
]

const PRODUCTS = [
  { value: 'protein_meal', label: 'BSF Protein Meal (dried)' },
  { value: 'frass_fertiliser', label: 'Frass Fertiliser' },
  { value: 'fresh_larvae', label: 'Fresh Larvae' },
  { value: 'defatted_concentrate', label: 'Defatted Concentrate' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Shared submit hook
// ─────────────────────────────────────────────────────────────────────────────

function useApplySubmit(onSuccess: (id: string, name: string) => void) {
  const [apiError, setApiError] = useState<string | null>(null)

  const submit = async (payload: Record<string, unknown>) => {
    setApiError(null)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as {
        success: boolean
        data?: { id: string }
        message?: string
        error?: string
      }
      if (data.success && data.data) {
        onSuccess(data.data.id, (payload.contact_name as string) ?? '')
      } else {
        setApiError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setApiError('Could not connect. Please check your connection and try again.')
    }
  }

  return { submit, apiError, clearError: () => setApiError(null) }
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab 1 — Waste Supplier
// ─────────────────────────────────────────────────────────────────────────────

function WasteSupplierTabForm({ onSuccess }: { onSuccess: (id: string, name: string) => void }) {
  type F = Extract<ApplyFormInput, { type: 'waste_supplier' }>
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({
    resolver: zodResolver(WasteSupplierSchema),
  })
  const { submit, apiError } = useApplySubmit(onSuccess)

  return (
  <form onSubmit={handleSubmit((d) => submit({ ...d, type: 'waste_supplier' }))} noValidate>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2">
        <Label htmlFor="ws-org">Organisation name</Label>
        <Input
          id="ws-org"
          autoComplete="organization"
          placeholder="Nairobi Hilton, Kenyatta National Hospital…"
          error={errors.organisation_name}
          {...register('organisation_name')}
        />
      </div>
      <div>
        <Label htmlFor="ws-contact">Contact name</Label>
        <Input
          id="ws-contact"
          autoComplete="name"
          placeholder="Your full name"
          error={errors.contact_name}
          {...register('contact_name')}
        />
      </div>
      <div>
        <Label htmlFor="ws-email">Email address</Label>
        <Input
          id="ws-email"
          autoComplete="email"
          type="email"
          placeholder="you@organisation.com"
          error={errors.email}
          {...register('email')}
        />
      </div>
      <div>
        <Label htmlFor="ws-phone" optional>Phone number</Label>
        <Input
          id="ws-phone"
          autoComplete="tel"
          type="tel"
          placeholder="+254 700 000 000"
          error={errors.phone}
          {...register('phone')}
        />
      </div>
      <div>
        <Label htmlFor="ws-location">Location / area</Label>
        <Input
          id="ws-location"
          autoComplete="address-level2"
          placeholder="e.g. Westlands, Nairobi"
          error={errors.location}
          {...register('location')}
        />
      </div>
      <div className="sm:col-span-2">
        <CheckboxGroup
          legend="Waste types you generate"
          options={WASTE_TYPES}
          name="waste_type"
          register={register as any}
          error={errors.waste_type as FieldError}
        />
      </div>
      <div>
        <Label htmlFor="ws-volume">Estimated daily volume (kg)</Label>
        <Input
          id="ws-volume"
          type="number"
          min="1"
          placeholder="e.g. 200"
          error={errors.daily_volume_kg}
          {...register('daily_volume_kg', { valueAsNumber: true })}
        />
      </div>
      <div>
        <Label htmlFor="ws-addr">Collection address</Label>
        <Input
          id="ws-addr"
          autoComplete="street-address"
          placeholder="Full street address for pickup"
          error={errors.collection_address}
          {...register('collection_address')}
        />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="ws-notes" optional>Additional notes</Label>
        <Textarea
          id="ws-notes"
          placeholder="Anything else we should know about your waste stream…"
          rows={3}
          error={errors.notes}
          {...register('notes')}
        />
      </div>
    </div>
    {apiError && <ApiErrorBanner message={apiError} />}
    <SubmitButton loading={isSubmitting} />
  </form>
)
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab 2 — Buyer
// ─────────────────────────────────────────────────────────────────────────────

function BuyerTabForm({ onSuccess }: { onSuccess: (id: string, name: string) => void }) {
  type F = Extract<ApplyFormInput, { type: 'buyer' }>
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({
    resolver: zodResolver(BuyerSchema),
  })
  const { submit, apiError } = useApplySubmit(onSuccess)

  return (
    <form onSubmit={handleSubmit((d) => submit({ ...d, type: 'buyer' }))} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Label htmlFor="b-org">Organisation name</Label>
          <Input id="b-org" placeholder="Farm or company name" error={errors.organisation_name} {...register('organisation_name')} />
        </div>
        <div>
          <Label htmlFor="b-contact">Contact name</Label>
          <Input id="b-contact" placeholder="Your full name" error={errors.contact_name} {...register('contact_name')} />
        </div>
        <div>
          <Label htmlFor="b-email">Email address</Label>
          <Input id="b-email" type="email" placeholder="you@farm.com" error={errors.email} {...register('email')} />
        </div>
        <div>
          <Label htmlFor="b-phone" >Phone number</Label>
          <Input id="b-phone" type="tel" placeholder="+254 700 000 000" error={errors.phone} {...register('phone')} />
        </div>
        <div>
          <Label htmlFor="b-location">Location / area</Label>
          <Input id="b-location" placeholder="e.g. Kiambu, Nakuru" error={errors.location} {...register('location')} />
        </div>
        <div className="sm:col-span-2">
          <CheckboxGroup legend="Products you're interested in" options={PRODUCTS} name="product_interest" register={register as any} error={errors.product_interest as FieldError} />
        </div>
        <div>
          <Label htmlFor="b-volume">Monthly volume needed (kg)</Label>
          <Input id="b-volume" type="number" min="1" placeholder="e.g. 2000" error={errors.monthly_volume_kg} {...register('monthly_volume_kg', { valueAsNumber: true })} />
        </div>
        <div>
          <Label htmlFor="b-delivery">Delivery area</Label>
          <Input id="b-delivery" placeholder="Where should we deliver?" error={errors.delivery_area} {...register('delivery_area')} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="b-notes" optional>Additional notes</Label>
          <Textarea id="b-notes" placeholder="Feed species, current supplier, quality requirements…" rows={3} error={errors.notes} {...register('notes')} />
        </div>
      </div>
      {apiError && <ApiErrorBanner message={apiError} />}
      <SubmitButton loading={isSubmitting} />
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab 3 — Investor
// ─────────────────────────────────────────────────────────────────────────────

function InvestorTabForm({ onSuccess }: { onSuccess: (id: string, name: string) => void }) {
  type F = Extract<ApplyFormInput, { type: 'investor' }>
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({
    resolver: zodResolver(InvestorSchema),
  })
  const { submit, apiError } = useApplySubmit(onSuccess)

  return (
    <form onSubmit={handleSubmit((d) => submit({ ...d, type: 'investor' }))} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Label htmlFor="inv-org">Fund / Organisation name</Label>
          <Input id="inv-org" placeholder="Fund or organisation name" error={errors.organisation_name} {...register('organisation_name')} />
        </div>
        <div>
          <Label htmlFor="inv-contact">Contact name</Label>
          <Input id="inv-contact" placeholder="Your full name" error={errors.contact_name} {...register('contact_name')} />
        </div>
        <div>
          <Label htmlFor="inv-email">Email address</Label>
          <Input id="inv-email" type="email" placeholder="you@fund.com" error={errors.email} {...register('email')} />
        </div>
        <div>
          <Label htmlFor="inv-phone" optional>Phone number</Label>
          <Input id="inv-phone" type="tel" placeholder="+254 700 000 000" error={errors.phone} {...register('phone')} />
        </div>
        <div>
          <Label htmlFor="inv-type">Fund type</Label>
          <Select id="inv-type" error={errors.fund_type} {...register('fund_type')}>
            <option value="">Select fund type…</option>
            {['Impact investor / VC', 'Development finance institution', 'Climate / environment fund', 'Family office', 'Angel investor', 'Foundation / grant maker', 'Accelerator', 'Other'].map(v => <option key={v} value={v}>{v}</option>)}
          </Select>
        </div>
        <div>
          <Label htmlFor="inv-range">Investment range (USD)</Label>
          <Select id="inv-range" error={errors.investment_range} {...register('investment_range')}>
            <option value="">Select range…</option>
            {['USD 50,000 – 100,000', 'USD 100,000 – 250,000', 'USD 250,000 – 500,000', 'USD 500,000+', 'Grant funding (non-dilutive)'].map(v => <option key={v} value={v}>{v}</option>)}
          </Select>
        </div>
        <div>
          <Label htmlFor="inv-timeline">Investment timeline</Label>
          <Select id="inv-timeline" error={errors.timeline} {...register('timeline')}>
            <option value="">Select timeline…</option>
            {['Ready to move (< 3 months)', 'Short-term (3–6 months)', 'Medium-term (6–12 months)', 'Exploratory – no fixed timeline'].map(v => <option key={v} value={v}>{v}</option>)}
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="inv-notes" optional>Additional notes</Label>
          <Textarea id="inv-notes" placeholder="Mandate details, co-investors, specific questions for the founders…" rows={3} error={errors.notes} {...register('notes')} />
        </div>
      </div>
      {apiError && <ApiErrorBanner message={apiError} />}
      <SubmitButton loading={isSubmitting} label="Request investor brief" />
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab 4 — Research Partner
// ─────────────────────────────────────────────────────────────────────────────

function ResearchTabForm({ onSuccess }: { onSuccess: (id: string, name: string) => void }) {
  type F = Extract<ApplyFormInput, { type: 'research' }>
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({
    resolver: zodResolver(ResearchSchema),
  })
  const { submit, apiError } = useApplySubmit(onSuccess)

  return (
    <form onSubmit={handleSubmit((d) => submit({ ...d, type: 'research' }))} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Label htmlFor="res-inst">Institution name</Label>
          <Input id="res-inst" placeholder="University, research centre, NGO…" error={errors.institution} {...register('institution')} />
        </div>
        <div>
          <Label htmlFor="res-contact">Contact name</Label>
          <Input id="res-contact" placeholder="Your full name" error={errors.contact_name} {...register('contact_name')} />
        </div>
        <div>
          <Label htmlFor="res-email">Email address</Label>
          <Input id="res-email" type="email" placeholder="you@university.ac.ke" error={errors.email} {...register('email')} />
        </div>
        <div>
          <Label htmlFor="res-phone" optional>Phone number</Label>
          <Input id="res-phone" type="tel" placeholder="+254 700 000 000" error={errors.phone} {...register('phone')} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="res-area">Research area / topic</Label>
          <Textarea id="res-area" placeholder="Describe your research focus and what data or access you are seeking from NutriLoop Africa…" rows={4} error={errors.research_area} {...register('research_area')} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="res-notes" optional>Additional notes</Label>
          <Textarea id="res-notes" placeholder="Funding status, timeline, co-investigators…" rows={3} error={errors.notes} {...register('notes')} />
        </div>
      </div>
      {apiError && <ApiErrorBanner message={apiError} />}
      <SubmitButton loading={isSubmitting} label="Apply for research access" />
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab 5 — Media
// ─────────────────────────────────────────────────────────────────────────────

function MediaTabForm({ onSuccess }: { onSuccess: (id: string, name: string) => void }) {
  type F = Extract<ApplyFormInput, { type: 'media' }>
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({
    resolver: zodResolver(MediaSchema),
  })
  const { submit, apiError } = useApplySubmit(onSuccess)

  return (
    <form onSubmit={handleSubmit((d) => submit({ ...d, type: 'media' }))} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Label htmlFor="med-pub">Publication / outlet</Label>
          <Input id="med-pub" placeholder="Nation Media, Reuters, The EastAfrican…" error={errors.publication} {...register('publication')} />
        </div>
        <div>
          <Label htmlFor="med-name">Your name</Label>
          <Input id="med-name" placeholder="Journalist / editor name" error={errors.contact_name} {...register('contact_name')} />
        </div>
        <div>
          <Label htmlFor="med-email">Email address</Label>
          <Input id="med-email" type="email" placeholder="you@publication.com" error={errors.email} {...register('email')} />
        </div>
        <div>
          <Label htmlFor="med-phone" optional>Phone number</Label>
          <Input id="med-phone" type="tel" placeholder="+254 700 000 000" error={errors.phone} {...register('phone')} />
        </div>
        <div>
          <Label htmlFor="med-deadline" optional>Article deadline</Label>
          <Input id="med-deadline" type="date" error={errors.deadline} {...register('deadline')} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="med-angle">Story angle / brief</Label>
          <Textarea id="med-angle" placeholder="Describe the story you are working on and what you need from NutriLoop Africa…" rows={4} error={errors.story_angle} {...register('story_angle')} />
        </div>
      </div>
      {apiError && <ApiErrorBanner message={apiError} />}
      <SubmitButton loading={isSubmitting} label="Send press enquiry" />
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared submit button + error banner
// ─────────────────────────────────────────────────────────────────────────────

function SubmitButton({ loading, label = 'Submit application' }: { loading: boolean; label?: string }) {
  return (
    <div className="mt-7 pt-5 border-t border-gray-100">
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-brand-amber-900/20 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber-500 focus-visible:ring-offset-2"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting…</>
        ) : (
          <>{label} <ChevronRight size={16} /></>
        )}
      </button>
      <p className="mt-3 text-xs text-gray-400">
        We respond to every application within 48 hours. No spam, ever.
      </p>
    </div>
  )
}

function ApiErrorBanner({ message }: { message: string }) {
  return (
    <div className="mt-5 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200" role="alert">
      <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-700">{message}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Success screen
// ─────────────────────────────────────────────────────────────────────────────

function SuccessScreen({ name, applicationId, type }: { name: string; applicationId: string; type: ApplicationType }) {
  const typeMessages: Record<ApplicationType, string> = {
    waste_supplier: "We'll review your details and be in touch within 48 hours to arrange collection.",
    buyer: "We'll review your requirements and send pricing and availability within 48 hours.",
    investor: "We'll send the full investor brief to your email within 48 hours.",
    research: "We'll review your research proposal and respond within 48 hours.",
    media: "We'll be in touch with background materials and interview availability within 48 hours.",
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-12 px-6"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-brand-green-50 border-2 border-brand-green-200 flex items-center justify-center">
          <CheckCircle size={32} className="text-brand-green-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-brand-dark mb-3">
        Application received, {name.split(' ')[0]}.
      </h2>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
        {typeMessages[type]}
      </p>
      <div className="inline-block bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-6">
        <p className="text-xs text-gray-400 mb-1">Application reference</p>
        <p className="font-mono text-sm font-semibold text-brand-green-700 tracking-wider">
          {applicationId.slice(0, 8).toUpperCase()}
        </p>
      </div>
      <p className="text-xs text-gray-400">
        A confirmation has been sent to your email.
      </p>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab definitions
// ─────────────────────────────────────────────────────────────────────────────

const TABS: { id: ApplicationType; label: string; emoji: string; desc: string }[] = [
  { id: 'waste_supplier', label: 'Waste Supplier', emoji: '🗑️', desc: 'Hotels, hospitals, markets, schools' },
  { id: 'buyer', label: 'Product Buyer', emoji: '🌾', desc: 'Poultry, aquaculture, agrodealers' },
  { id: 'investor', label: 'Investor', emoji: '📈', desc: 'Impact funders, development finance' },
  { id: 'research', label: 'Research', emoji: '🔬', desc: 'Universities, ICIPE, CGIAR' },
  { id: 'media', label: 'Media', emoji: '📰', desc: 'Journalists, editors, press' },
]

const VALID_TABS = TABS.map((t) => t.id)

function isValidTab(v: string | null): v is ApplicationType {
  return VALID_TABS.includes(v as ApplicationType)
}

// ─────────────────────────────────────────────────────────────────────────────
// Inner component (uses useSearchParams — must be inside Suspense)
// ─────────────────────────────────────────────────────────────────────────────

function ApplyFormInner() {
  const searchParams = useSearchParams()
  const urlTab = searchParams.get('tab')
  const initialTab: ApplicationType = isValidTab(urlTab) ? urlTab : 'waste_supplier'

  const [activeTab, setActiveTab] = useState<ApplicationType>(initialTab)
  const [success, setSuccess] = useState<{ id: string; name: string } | null>(null)

  // Sync tab with URL param changes
  useEffect(() => {
    const t = searchParams.get('tab')
    if (isValidTab(t)) setActiveTab(t)
  }, [searchParams])

  const handleSuccess = (id: string, name: string) => setSuccess({ id, name })

  const activeTabDef = TABS.find((t) => t.id === activeTab)!

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tab bar */}
      {!success && (
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Application type">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => { setActiveTab(tab.id); setSuccess(null) }}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400',
                activeTab === tab.id
                  ? 'bg-brand-green-700 text-white shadow-md shadow-brand-green-900/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              )}
            >
              <span aria-hidden>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Panel card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {success ? (
          <SuccessScreen name={success.name} applicationId={success.id} type={activeTab} />
        ) : (
          <>
            <div className="border-b border-gray-50 px-7 pt-7 pb-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{activeTabDef.emoji}</span>
                <div>
                  <h2 className="text-lg font-bold text-brand-dark">{activeTabDef.label} Application</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{activeTabDef.desc}</p>
                </div>
              </div>
            </div>
            <div className="px-7 py-6" id={`panel-${activeTab}`} role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'waste_supplier' && <WasteSupplierTabForm onSuccess={handleSuccess} />}
                  {activeTab === 'buyer' && <BuyerTabForm onSuccess={handleSuccess} />}
                  {activeTab === 'investor' && <InvestorTabForm onSuccess={handleSuccess} />}
                  {activeTab === 'research' && <ResearchTabForm onSuccess={handleSuccess} />}
                  {activeTab === 'media' && <MediaTabForm onSuccess={handleSuccess} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Public export — wraps inner component in Suspense (required for useSearchParams)
// ─────────────────────────────────────────────────────────────────────────────

function FormSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto animate-pulse">
      <div className="flex gap-2 mb-8 flex-wrap">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="h-10 w-28 rounded-xl bg-gray-200" />
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-7 space-y-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n}>
            <div className="h-4 w-24 rounded bg-gray-200 mb-2" />
            <div className="h-10 rounded-xl bg-gray-100" />
          </div>
        ))}
        <div className="h-12 w-40 rounded-xl bg-gray-200 mt-6" />
      </div>
    </div>
  )
}

export function ApplyForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <ApplyFormInner />
    </Suspense>
  )
}
