'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-2" role="list">
      {items.map(({ q, a }, i) => {
        const isOpen = openIndex === i
        const id = `faq-${i}`
        const panelId = `faq-panel-${i}`

        return (
          <div
            key={id}
            role="listitem"
            className={cn(
              'rounded-2xl border transition-all duration-200',
              isOpen
                ? 'bg-white border-brand-green-200 shadow-sm shadow-brand-green-50'
                : 'bg-white border-gray-100 hover:border-gray-200'
            )}
          >
            <button
              id={id}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 focus-visible:ring-inset rounded-2xl"
            >
              <span
                className={cn(
                  'text-sm font-semibold leading-snug transition-colors',
                  isOpen ? 'text-brand-green-800' : 'text-brand-dark'
                )}
              >
                {q}
              </span>
              <span
                className={cn(
                  'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors mt-0.5',
                  isOpen
                    ? 'bg-brand-green-100 text-brand-green-700'
                    : 'bg-gray-100 text-gray-500'
                )}
                aria-hidden
              >
                {isOpen ? <Minus size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">
                    {a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
