import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { PartnerCTASection } from '@/components/sections/HomeSections'
import { PRODUCTS } from '@/lib/data/products'
import { CheckCircle, ArrowRight, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Products — BSF Protein Meal, Frass Fertiliser, Fresh Larvae',
  description: 'NutriLoop Africa produces BSF protein meal (40–55% protein), frass fertiliser, and fresh larvae from organic waste bioconversion. Kenya-made, ICIPE-validated.',
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        badge="Our Products"
        headline="Three outputs. Zero waste."
        highlight="Zero waste."
        subheadline="Every kilogram of organic substrate NutriLoop Africa processes becomes either protein or fertiliser. Nothing goes to landfill."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="py-20 sm:py-28 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {PRODUCTS.map((product, i) => (
            <div key={product.key} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Details */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl" aria-hidden>{product.emoji}</span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 block">Product 0{i + 1}</span>
                    <h2 className="text-2xl font-bold text-brand-dark">{product.name}</h2>
                  </div>
                </div>
                <p className="text-lg font-medium text-brand-green-700 mb-4">{product.tagline}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                <ul className="space-y-2.5 mb-6">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: product.accentHex }} />
                      <span className="text-sm text-gray-600">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link href={product.ctaHref} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-px" style={{ background: product.accentHex }}>
                    {product.ctaText} <ArrowRight size={14} />
                  </Link>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-semibold hover:border-gray-300 transition-colors">
                    <Download size={14} /> Spec sheet
                  </button>
                </div>
              </div>
              {/* Stats card */}
              <div className={`rounded-2xl p-8 text-white ${i % 2 === 1 ? 'lg:col-start-1' : ''}`} style={{ background: `linear-gradient(135deg, ${product.accentHex}ee, ${product.accentHex}99)` }}>
                <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-5">Specifications</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {product.stats.map(stat => (
                    <div key={stat.label} className="bg-white/15 rounded-xl px-4 py-3">
                      <p className="font-mono text-xl font-semibold tabular-nums">{stat.value}</p>
                      <p className="text-xs opacity-70 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs opacity-60 mb-2">Target buyers</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.targetBuyers.map(b => (
                    <span key={b} className="text-xs px-2.5 py-1 rounded-full bg-white/20 font-medium">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality + traceability */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Quality and traceability on every batch.</h2>
          <p className="text-gray-500 leading-relaxed mb-8">Every delivery comes with a batch record: substrate source, harvest date, protein and moisture assay results, and chain-of-custody documentation. Built for EPR-reporting food businesses and international-standard buyers.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['ICIPE-validated protocols', 'Batch protein assays', 'Substrate traceability', 'NEMA disposal records', 'Same-day fresh delivery'].map(feat => (
              <span key={feat} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold">
                <CheckCircle size={12} /> {feat}
              </span>
            ))}
          </div>
        </div>
      </section>
      <PartnerCTASection />
    </>
  )
}
