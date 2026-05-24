'use client'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { HOME_KPIS } from '@/lib/data/kpis-static'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function KPIStripSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#F5F7F2]" aria-labelledby="kpi-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold uppercase tracking-widest mb-4">
            Year 1 Impact
          </span>
          <h2 id="kpi-heading" className="text-3xl sm:text-4xl font-bold text-brand-dark">
            The numbers tell the story.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {HOME_KPIS.map((kpi, i) => (
            <motion.div
              key={kpi.key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white px-6 py-7 flex flex-col items-center text-center group hover:bg-brand-green-50 transition-colors duration-200"
            >
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-brand-amber-600 tabular-nums leading-none mb-2">
                <AnimatedCounter
                  value={kpi.value}
                  prefix={kpi.prefix}
                  unit={kpi.unit}
                  suffix={kpi.suffix}
                  duration={2000}
                  delay={i * 80}
                />
              </div>
              <p className="text-xs text-gray-500 leading-snug max-w-[120px]">{kpi.label}</p>
              {kpi.description && (
                <p className="text-[10px] text-gray-400 mt-1">{kpi.description}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-700 hover:text-brand-green-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded"
          >
            Full impact dashboard <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
