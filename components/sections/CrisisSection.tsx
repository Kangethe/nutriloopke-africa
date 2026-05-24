'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const CRISES = [
  {
    stat: 22000,
    suffix: '+',
    unit: 'tonnes/day',
    label: 'Organic waste Kenya generates every single day',
    detail:
      '75% of it is mismanaged — ending in open dumps, drainage channels, or Dandora dumpsite. It pollutes water, attracts disease vectors, and produces methane.',
    color: '#2E7D32',
    link: '/problem#waste',
  },
  {
    stat: 60,
    suffix: '%',
    unit: 'imported',
    label: 'Of Kenya\'s livestock feed is imported',
    detail:
      'Kenyan poultry and fish farmers pay foreign exchange premiums for soybean meal that could be replaced with domestically produced insect protein.',
    color: '#B85C00',
    link: '/problem#feed',
  },
  {
    stat: 75,
    suffix: '%',
    unit: 'mismanaged',
    label: 'Of organic waste never reaches a licensed processor',
    detail:
      'The Sustainable Waste Management Act 2022 mandates organic waste go to licensed processors. NutriLoop is applying for that licence — and building the infrastructure.',
    color: '#6D3B0A',
    link: '/problem#soil',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function CrisisSection() {
  return (
    <section className="bg-brand-dark py-20 sm:py-28" aria-labelledby="crisis-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-red-950/50 border border-red-900/40 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
            The Crisis
          </span>
          <h2 id="crisis-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Two crises. One solution.
          </h2>
          <p className="max-w-xl mx-auto text-white/50 text-lg leading-relaxed">
            Kenya drowns in waste it cannot process and imports food it could produce. NutriLoop Africa fixes both.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CRISES.map((crisis, i) => (
            <motion.div
              key={crisis.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="group relative bg-white/[0.06] backdrop-blur-lg border border-white/10 rounded-2xl p-7 hover:bg-white/[0.09] hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Accent glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: crisis.color }}
                aria-hidden
              />

              {/* Number */}
              <div className="font-mono text-5xl sm:text-6xl font-semibold tabular-nums mb-1 leading-none"
                style={{ color: crisis.color }}>
                <AnimatedCounter value={crisis.stat} suffix={crisis.suffix} separator />
                <span className="ml-1.5 text-base font-normal text-white/40">{crisis.unit}</span>
              </div>

              <h3 className="text-white font-semibold text-base leading-snug mb-3 mt-3">
                {crisis.label}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">
                {crisis.detail}
              </p>

              <Link
                href={crisis.link}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded"
              >
                Learn more <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
