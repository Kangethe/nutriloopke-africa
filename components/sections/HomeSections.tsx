'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

// ── Affiliations ──────────────────────────────────────────────────────────────
const AFFILIATES = [
  { name: 'ICIPE', url: 'https://www.icipe.org', role: 'Science Partner' },
  { name: 'CGIAR', url: 'https://www.cgiar.org', role: 'Research Validation' },
  { name: 'GCA Africa Hub', url: 'https://gca.org', role: 'Accelerator' },
  { name: 'AECF', url: 'https://www.aecf.org', role: 'Funder' },
  { name: 'NEMA Kenya', url: 'https://www.nema.go.ke', role: 'Regulatory Partner' },
  { name: 'Verra VCS', url: 'https://verra.org', role: 'Carbon Certification' },
]

export function AffiliationSection() {
  return (
    <section className="py-14 sm:py-16 bg-[#F5F7F2] border-t border-gray-100" aria-label="Partner organisations and affiliates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
          Backed by · Partnered with · Regulated by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {AFFILIATES.map((aff, i) => (
            <motion.a
              key={aff.name}
              href={aff.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group flex flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded-xl p-2"
              aria-label={`${aff.name} — ${aff.role}`}
            >
              <div className="px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm group-hover:shadow-md group-hover:border-brand-green-200 transition-all duration-200">
                <span className="font-bold text-sm text-gray-400 group-hover:text-brand-green-700 transition-colors tracking-tight">
                  {aff.name}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">
                {aff.role}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── News Grid ─────────────────────────────────────────────────────────────────
const PLACEHOLDER_POSTS = [
  {
    id: '1',
    slug: 'nutriloop-secures-icipe-partnership',
    title: 'NutriLoop Africa Formalises ICIPE Research Partnership',
    excerpt: 'NutriLoop Africa signs a collaborative agreement with the International Centre of Insect Physiology and Ecology, bringing BSF science expertise directly into our facility design.',
    category: 'Partnership',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    date: '2024-11-15',
    readTime: '3 min read',
  },
  {
    id: '2',
    slug: 'year-1-waste-diversion-projections',
    title: '360 Tonnes Diverted: Our Year 1 Waste Projections',
    excerpt: 'A detailed breakdown of how NutriLoop Africa will divert 360 tonnes of organic waste from Dandora in Year 1 — and what that means for Kenya\'s climate commitments.',
    category: 'Impact',
    categoryColor: 'bg-brand-green-50 text-brand-green-700 border-brand-green-200',
    date: '2024-10-28',
    readTime: '5 min read',
  },
  {
    id: '3',
    slug: 'bsf-protein-vs-soy-kenya',
    title: 'BSF vs. Soy: Why Kenyan Farmers Should Care',
    excerpt: 'An analysis of why Black Soldier Fly protein meal at 40% below imported soybean price changes the economics for Kenya\'s 700,000+ smallholder livestock farmers.',
    category: 'Research',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    date: '2024-09-10',
    readTime: '6 min read',
  },
]

export function NewsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white" aria-labelledby="news-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold uppercase tracking-widest mb-3">
              Latest Updates
            </span>
            <h2 id="news-heading" className="text-3xl sm:text-4xl font-bold text-brand-dark">
              What we're building.
            </h2>
          </div>
          <Link href="/news" className="flex-shrink-0 text-sm font-semibold text-brand-green-700 hover:text-brand-green-900 transition-colors">
            All updates →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PLACEHOLDER_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group flex flex-col rounded-2xl border border-gray-100 hover:border-brand-green-200 hover:shadow-lg hover:shadow-brand-green-50 transition-all duration-300 overflow-hidden bg-white"
            >
              {/* Category + date header */}
              <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${post.categoryColor}`}>
                  {post.category}
                </span>
                <time className="text-xs text-gray-400 flex items-center gap-1" dateTime={post.date}>
                  <Calendar size={11} />
                  {new Date(post.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                </time>
              </div>

              <div className="px-6 pb-6 flex flex-col flex-1">
                <h3 className="text-base font-bold text-brand-dark mb-2.5 leading-snug group-hover:text-brand-green-800 transition-colors">
                  <Link href={`/news/${post.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                  <Link href={`/news/${post.slug}`} className="text-xs font-semibold text-brand-green-700 hover:text-brand-green-900 flex items-center gap-1 transition-colors">
                    Read <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Partner CTA ───────────────────────────────────────────────────────────────
const CTA_BUTTONS = [
  {
    label: 'Become a waste supplier',
    href: '/apply?tab=waste_supplier',
    desc: 'Hotels, hospitals, schools, markets',
    emoji: '🗑️',
    variant: 'outline' as const,
  },
  {
    label: 'Buy our products',
    href: '/apply?tab=buyer',
    desc: 'Poultry, aquaculture, agrodealers',
    emoji: '🌾',
    variant: 'outline' as const,
  },
  {
    label: 'Fund NutriLoop',
    href: '/apply?tab=investor',
    desc: 'USD 50K–500K · 8 SDGs · 50%+ margin',
    emoji: '📈',
    variant: 'outline' as const,
  },
  {
    label: 'Research partnership',
    href: '/apply?tab=research',
    desc: 'ICIPE, CGIAR, universities',
    emoji: '🔬',
    variant: 'outline' as const,
  },
]

export function PartnerCTASection() {
  return (
    <section
      className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden"
      aria-labelledby="partner-cta-heading"
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(46,125,50,0.15) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-amber-900/40 border border-brand-amber-700/40 text-brand-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Ready to close the loop?
          </span>
          <h2 id="partner-cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your move.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-12">
The loop isn’t whole without you. Turn your waste into a resource. Let us cut Kenya’s food and feed bill. To investors, your capital is the engine of change andwith it, we scale the solution. Let us join hands, transform waste, and sustain the future.          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CTA_BUTTONS.map((btn, i) => (
            <motion.div
              key={btn.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={btn.href}
                className="group flex items-center gap-4 w-full px-6 py-5 rounded-2xl bg-white/6 hover:bg-white/12 border border-white/10 hover:border-brand-green-600/50 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400"
              >
                <span className="text-2xl flex-shrink-0" aria-hidden>{btn.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm group-hover:text-brand-green-300 transition-colors">
                    {btn.label}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5 truncate">{btn.desc}</p>
                </div>
                <ArrowRight size={16} className="text-white/30 group-hover:text-brand-green-400 flex-shrink-0 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
