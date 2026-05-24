'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { PRODUCTS } from '@/lib/data/products'

export function ProductsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold uppercase tracking-widest mb-4">
            What We Produce
          </span>
          <h2 id="products-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Three products. Zero waste.
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 text-lg">
            Every kilogram of substrate becomes product. Nothing goes to landfill.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Colour header */}
              <div
                className="h-2 w-full"
                style={{ background: `linear-gradient(90deg, ${product.accentHex}, ${product.accentHex}cc)` }}
                aria-hidden
              />

              <div className="p-7 flex flex-col flex-1">
                {/* Icon + Name */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-3xl mb-3 block" aria-hidden>{product.emoji}</span>
                    <h3 className="text-xl font-bold text-brand-dark">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{product.tagline}</p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {product.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-gray-50 rounded-xl px-3 py-2.5"
                    >
                      <p className="font-mono text-base font-semibold text-brand-dark tabular-nums">
                        {stat.value}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
                  {product.description}
                </p>

                {/* Target buyers */}
                <div className="mb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Target buyers
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.targetBuyers.map((buyer) => (
                      <span
                        key={buyer}
                        className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium"
                      >
                        {buyer}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2 key benefits */}
                <div className="space-y-2 mb-6">
                  {product.benefits.slice(0, 2).map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: product.accentHex }} />
                      <span className="text-xs text-gray-500 leading-snug">{b}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={product.ctaHref}
                  className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ background: product.accentHex }}
                >
                  {product.ctaText} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-sm text-gray-400"
        >
          Full specifications, pricing signals, and delivery areas on the{' '}
          <Link href="/products" className="text-brand-green-700 font-medium hover:underline">
            products page →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
