'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import { SDG_DATA } from '@/lib/data/sdgs'
import type { SDGData } from '@/lib/data/sdgs'

export function SDGSection() {
  const [selected, setSelected] = useState<SDGData | null>(null)

  return (
    <section className="py-20 sm:py-28 bg-white" aria-labelledby="sdg-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold uppercase tracking-widest mb-4">
            Global Goals
          </span>
          <h2 id="sdg-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-3">
            8 SDGs directly. 9 more indirectly.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            One circular model addresses the UN Sustainable Development Goals that matter most for Kenya.
            <span className="block mt-1 text-sm text-gray-400">Click any goal to see NutriLoop's specific contribution.</span>
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-brand-green-600" />
            <span>Direct impact (8 SDGs)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-gray-200" />
            <span>Indirect contribution (9 SDGs)</span>
          </div>
        </div>

        {/* 17-card grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2"
          role="list"
          aria-label="UN Sustainable Development Goals"
        >
          {SDG_DATA.map((sdg, i) => (
            <motion.button
              key={sdg.number}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              onClick={() => setSelected(selected?.number === sdg.number ? null : sdg)}
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded-xl text-center p-2 cursor-pointer
                transition-all duration-200 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-green-400
                ${sdg.impact === 'indirect' ? 'opacity-40 hover:opacity-80' : 'opacity-100'}
                ${selected?.number === sdg.number ? 'ring-2 ring-white ring-offset-2 scale-105' : ''}
              `}
              style={{ background: sdg.color }}
              aria-label={`SDG ${sdg.number}: ${sdg.title} — ${sdg.impact} impact`}
              role="listitem"
            >
              <span className="text-[10px] font-bold text-white/70 leading-none">{sdg.number}</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight mt-1 line-clamp-2">
                {sdg.title}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Contribution tooltip/modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="mt-6 relative rounded-2xl p-6 border-l-4"
              style={{
                borderLeftColor: selected.color,
                background: `${selected.color}12`,
                borderColor: `${selected.color}30`,
              }}
              role="region"
              aria-live="polite"
              aria-label={`SDG ${selected.number} contribution details`}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-black/10 transition-colors"
                aria-label="Close contribution detail"
              >
                <X size={14} className="text-gray-500" />
              </button>

              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: selected.color }}
                >
                  {selected.number}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    SDG {selected.number} · {selected.title} ·{' '}
                    <span style={{ color: selected.color }}>
                      {selected.impact === 'direct' ? 'Direct impact' : 'Indirect contribution'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
                    {selected.contribution}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/sustainability"
            className="inline-flex items-center gap-1.5 text-sm text-brand-green-700 font-semibold hover:text-brand-green-900 transition-colors"
          >
            Full sustainability & carbon roadmap →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
