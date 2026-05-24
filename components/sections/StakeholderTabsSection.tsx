'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const TABS = [
  {
    id: 'waste_supplier',
    label: 'Waste Suppliers',
    emoji: '🗑️',
    who: 'Hotels, hospitals, schools, markets, residential estates',
    headline: 'Your waste has been costing you. Now it can count for something.',
    bullets: [
      'Free collection every morning — zero cost to you',
      'Certified NEMA-compatible disposal records for every pickup',
      'Documented sustainability asset for your certifiers and guests',
    ],
    cta: 'Register your organisation',
    href: '/partner/waste-suppliers',
    applyTab: 'waste_supplier',
  },
  {
    id: 'buyer',
    label: 'Buyers',
    emoji: '🌾',
    who: 'Poultry farms, aquaculture, agrodealers, feed manufacturers',
    headline: '40–55% protein. 40% below imported soy. Made in Kenya.',
    bullets: [
      'Direct replacement for soybean meal at competitive farm-gate pricing',
      'Kenya-made: no import duty, no foreign exchange exposure',
      'ICIPE-validated composition, consistent batch quality',
    ],
    cta: 'Enquire about buying',
    href: '/partner/buyers',
    applyTab: 'buyer',
  },
  {
    id: 'investor',
    label: 'Investors',
    emoji: '📈',
    who: 'Impact investors, development finance, climate funders',
    headline: 'Two crises. One biological answer. 50%+ margin. 8 SDGs.',
    bullets: [
      'USD 50K–500K phased investment sought — show us your model',
      'IRIS+ aligned KPI framework, Verra VCS carbon credits in Year 2',
      'Unit economics that improve with scale, feedstock that grows with urbanisation',
    ],
    cta: 'Download the investor brief',
    href: '/partner/investors',
    applyTab: 'investor',
  },
  {
    id: 'government',
    label: 'Government',
    emoji: '🏛️',
    who: 'County government, NEMA, Ministry of Environment',
    headline: 'Every tonne we process is a tonne that does not reach Dandora.',
    bullets: [
      'SWMA 2022 compliant — applying for licensed organic waste processor status',
      '360 tonnes diverted from Dandora in Year 1, 630t CO₂-eq avoided',
      'NEMA-compatible quarterly diversion records, EPR documentation',
    ],
    cta: 'Explore a county waste MOU',
    href: '/partner/government',
    applyTab: 'waste_supplier',
  },
]

export function StakeholderTabsSection() {
  const [active, setActive] = useState(TABS[0].id)
  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0]

  return (
    <section className="py-20 sm:py-28 bg-brand-dark" aria-labelledby="stakeholders-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
            Who We Serve
          </span>
          <h2 id="stakeholders-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Built for four audiences.
          </h2>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
          role="tablist"
          aria-label="Stakeholder types"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400
                ${active === tab.id
                  ? 'bg-brand-green-700 text-white shadow-lg shadow-brand-green-900/30'
                  : 'bg-white/6 text-white/60 hover:bg-white/10 hover:text-white border border-white/8'}
              `}
            >
              <span aria-hidden>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`panel-${active}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 max-w-3xl mx-auto"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-3">
              {activeTab.who}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
              {activeTab.headline}
            </h3>

            <ul className="space-y-3 mb-8" aria-label="Key value propositions">
              {activeTab.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-brand-green-400" />
                  <span className="text-white/70 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={activeTab.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white text-sm font-semibold transition-all hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber-400"
              >
                {activeTab.cta} <ArrowRight size={14} />
              </Link>
              <Link
                href={`/apply?tab=${activeTab.applyTab}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/14 border border-white/12 text-white text-sm font-semibold transition-all"
              >
                Apply now
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
