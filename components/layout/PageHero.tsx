'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface Breadcrumb { label: string; href?: string }

interface PageHeroProps {
  badge?: string
  headline: string
  highlight?: string           // word(s) in headline to colour amber
  subheadline: string
  breadcrumbs?: Breadcrumb[]
  variant?: 'dark' | 'green'
  children?: React.ReactNode   // optional extra content below subheadline
  className?: string
}

export function PageHero({
  badge, headline, highlight, subheadline, breadcrumbs,
  variant = 'dark', children, className,
}: PageHeroProps) {
  const bg = variant === 'green'
    ? 'bg-brand-green-800'
    : 'bg-brand-dark'

  const headlineParts = highlight
    ? headline.split(highlight)
    : null

  return (
    <section
      className={cn('relative pt-32 pb-16 sm:pt-36 sm:pb-20 overflow-hidden', bg, className)}
      aria-label="Page header"
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(46,125,50,0.25) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 mb-5 text-xs text-white/40">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={11} />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white/70 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/60">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/15 text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-5"
        >
          {headlineParts
            ? <>{headlineParts[0]}<span className="text-brand-amber-400">{highlight}</span>{headlineParts[1]}</>
            : headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed"
        >
          {subheadline}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
