'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const STEPS = [
  {
    icon: '🗑️',
    step: '01',
    title: 'Organic Waste',
    desc: 'Collected free every morning from hotels, markets, and food businesses across Nairobi.',
    color: 'from-slate-700 to-slate-600',
    border: 'border-slate-500/30',
  },
  {
    icon: '🚛',
    step: '02',
    title: 'Collection',
    desc: 'Scheduled pickup on fixed routes — zero cost to the supplier, certified disposal record provided.',
    color: 'from-brand-green-900 to-brand-green-800',
    border: 'border-brand-green-700/30',
  },
  {
    icon: '🪲',
    step: '03',
    title: 'BSF Larvae',
    desc: 'Black Soldier Fly eggs hatched. Larvae consume the organic substrate in a controlled facility.',
    color: 'from-brand-brown-700 to-brand-brown-600',
    border: 'border-brand-brown-500/30',
  },
  {
    icon: '⏱️',
    step: '04',
    title: '14 Days',
    desc: 'In just two weeks, larvae reach pre-pupa stage — peak protein and fat content. Ready to harvest.',
    color: 'from-brand-amber-800 to-brand-amber-700',
    border: 'border-brand-amber-600/30',
  },
  {
    icon: '🌿',
    step: '05',
    title: 'Two Products',
    desc: 'Larvae become protein meal or fresh larvae (for buyers). Excrement becomes frass fertiliser.',
    color: 'from-brand-green-800 to-brand-green-700',
    border: 'border-brand-green-600/30',
  },
  {
    icon: '🌾',
    step: '06',
    title: 'Farm Impact',
    desc: 'Protein feeds Kenyan livestock. Frass restores smallholder soils. The loop closes.',
    color: 'from-emerald-800 to-emerald-700',
    border: 'border-emerald-600/30',
  },
]

export function BSFLifecycleSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F5F7F2]" aria-labelledby="bsf-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold uppercase tracking-widest mb-4">
            The Solution
          </span>
          <h2 id="bsf-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Waste to protein in{' '}
            <span className="text-brand-green-700">14 days.</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 text-lg leading-relaxed">
            Black Soldier Fly bioconversion — backed by ICIPE science, scaled for Nairobi's waste stream.
          </p>
        </motion.div>

        {/* Flow steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
          {STEPS.map((step, i) => (
            <div key={step.step} className="relative flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col h-full rounded-2xl bg-gradient-to-b ${step.color} border ${step.border} p-5 overflow-hidden group hover:-translate-y-1 transition-transform duration-250`}
              >
                {/* Step number */}
                <span className="text-[10px] font-mono font-semibold text-white/30 mb-3 tracking-wider">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="text-3xl mb-3" aria-hidden>{step.icon}</div>

                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-white/55 leading-relaxed flex-1">
                  {step.desc}
                </p>
              </motion.div>

              {/* Connector arrow between cards (not after last) */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute top-1/2 -right-2 z-10 hidden lg:flex items-center justify-center w-4 h-4 -translate-y-1/2"
                  aria-hidden
                >
                  <ArrowRight size={12} className="text-brand-green-400/60" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 px-7 py-5 shadow-sm"
        >
          <p className="text-sm text-gray-500 text-center sm:text-left">
            <span className="font-semibold text-gray-800">Powered by ICIPE-trained science.</span>{' '}
            Verified across 373 farms by CGIAR / Alliance of Bioversity International.
          </p>
          <Link
            href="/solution"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400"
          >
            Deep dive into the science <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
