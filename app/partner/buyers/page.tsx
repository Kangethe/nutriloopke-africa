import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { PRODUCTS } from '@/lib/data/products'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Buyers — BSF Protein Meal, Frass, Fresh Larvae',
  description: 'Buy Kenya-made BSF protein meal at 40% below imported soy. Ideal for poultry farms, aquaculture, feed manufacturers, and agrodealers.',
}

const BUYER_TYPES = [
  { emoji: '🐔', type: 'Poultry farms', desc: 'Layer and broiler operations of all scales. BSF meal replaces soy 1:1 at 40% lower cost with superior palatability.' },
  { emoji: '🐟', type: 'Aquaculture', desc: 'Tilapia, catfish, and trout farmers. BSF meal replaces fishmeal with equivalent protein profile — at significantly lower price.' },
  { emoji: '🏪', type: 'Agrodealers', desc: 'Stock and distribute BSF meal and frass to your farmer network. Consistent supply, batch certificates, and margin built in.' },
  { emoji: '🏭', type: 'Feed manufacturers', desc: 'Incorporate BSF meal into compound feeds. Ingredient specification sheets, amino acid profiles, and ICIPE validation data available.' },
]

export default function BuyersPage() {
  return (
    <>
      <PageHero
        badge="For Buyers"
        headline="40–55% protein. Made in Kenya. 40% below imported soy."
        subheadline="NutriLoop Africa produces BSF protein meal, frass fertiliser, and fresh larvae from Nairobi's organic waste — and delivers to farm gate."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partner' }, { label: 'Buyers' }]}
      />

      {/* Why buy */}
      <section className="py-20 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">Why switch to NutriLoop protein?</h2>
              <div className="space-y-4">
                {[
                  { title: 'Price certainty', desc: 'No foreign exchange exposure. No import duty. No shipping delays. Kenya-produced protein at a fixed local price.' },
                  { title: 'Supply reliability', desc: 'Year-round production from a consistent Nairobi waste stream. No seasonal shortfalls, no shipping delays.' },
                  { title: 'Nutritional equivalence', desc: '40–55% crude protein. 15–20% crude fat. Amino acid profile comparable to premium fishmeal. ICIPE-validated.' },
                  { title: 'Traceability', desc: 'Every batch comes with substrate source, harvest date, and protein assay. Your compliance team will thank you.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle size={16} className="text-brand-green-600 flex-shrink-0 mt-0.5" />
                    <div><p className="text-sm font-semibold text-brand-dark">{title}</p><p className="text-sm text-gray-500 mt-0.5">{desc}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/apply?tab=buyer" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-sm transition-all hover:-translate-y-px">
                Enquire about buying <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '40–55%', label: 'Crude protein' },
                { val: '−40%', label: 'vs. imported soy price' },
                { val: '30t', label: 'protein meal Year 1' },
                { val: 'Same day', label: 'fresh larvae delivery' },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <p className="font-mono text-2xl font-semibold text-brand-green-700">{val}</p>
                  <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who buys */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center">Who buys from NutriLoop Africa?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BUYER_TYPES.map(({ emoji, type, desc }) => (
              <div key={type} className="bg-[#F5F7F2] rounded-2xl p-6 border border-gray-100">
                <span className="text-3xl mb-3 block" aria-hidden>{emoji}</span>
                <h3 className="font-bold text-brand-dark mb-2">{type}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products quick view */}
      <section className="py-16 bg-[#F5F7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center">Our products at a glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PRODUCTS.map(p => (
              <div key={p.key} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <span className="text-3xl mb-3 block" aria-hidden>{p.emoji}</span>
                <h3 className="font-bold text-brand-dark mb-1">{p.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{p.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stats.slice(0, 2).map(s => (
                    <span key={s.label} className="text-xs px-2 py-1 rounded-md bg-gray-50 border border-gray-100 font-mono text-gray-600">{s.value} {s.label}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/products" className="text-sm font-semibold text-brand-green-700 hover:text-brand-green-900">Full product specifications →</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-green-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to buy?</h2>
          <p className="text-brand-green-200 mb-8">Tell us which product you need, your estimated monthly volume, and your delivery area. We'll respond within 48 hours with pricing and availability.</p>
          <Link href="/apply?tab=buyer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-green-800 font-semibold text-base transition-all hover:-translate-y-0.5 shadow-xl">
            Submit a buying enquiry <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
