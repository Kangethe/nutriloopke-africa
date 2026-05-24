import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { PartnerCTASection } from '@/components/sections/HomeSections'
import { ArrowRight, AlertTriangle, TrendingDown, Leaf, CloudRain } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Problem — Kenya\'s Waste Crisis and Feed Gap',
  description: 'Kenya generates 22,000+ tonnes of organic waste daily while importing 60% of its livestock feed. NutriLoop Africa addresses both crises with one circular solution.',
}

const CRISIS_STATS = [
  { value: '22,000+', label: 'tonnes of organic waste generated across Kenya daily', source: 'NEMA, 2022' },
  { value: '75%', label: 'of that waste is mismanaged — open dumps, drains, Dandora', source: 'UNEP, 2021' },
  { value: '5.72M', label: 'tonnes of organic waste Kenya generates annually', source: 'NEMA, 2022' },
  { value: 'KES 2B+', label: 'annual cost of waste mismanagement to Nairobi County', source: 'World Bank, 2020' },
]

const FEED_STATS = [
  { value: '60%', label: 'of Kenya\'s livestock feed is imported', source: 'USAID, 2023' },
  { value: 'KES 200B', label: 'Kenya animal feed market — total addressable market', source: 'KAFMA, 2023' },
  { value: '40%', label: 'price premium farmers pay for imported soy vs. local alternatives', source: 'NutriLoop analysis' },
  { value: '700K+', label: 'smallholder livestock farmers affected by feed price volatility', source: 'KNBS, 2022' },
]

export default function ProblemPage() {
  return (
    <>
      <PageHero
        badge="The Problem"
        headline="Two crises. Happening simultaneously. In the same city."
        subheadline="Nairobi drowns in organic waste it cannot process. Kenya's farmers import the feed that waste could become. These are not separate problems."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'The Problem' }]}
      />

      {/* Crisis 1 — Waste */}
      <section id="waste" className="py-20 sm:py-28 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-red-600">Crisis 01</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                Kenya's organic waste has nowhere to go.
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Every morning, Nairobi's hotels, restaurants, markets, hospitals, and schools produce tonnes of organic food waste. The system that should handle it — licensed processors, composting facilities, bioconversion plants — largely does not exist at scale.</p>
                <p>The waste ends up in open-air dumps, drainage channels, or Dandora — Nairobi's overwhelmed municipal dumpsite. There, organic matter decomposes anaerobically, releasing methane (a greenhouse gas 25x more potent than CO₂) and leaching into groundwater.</p>
                <p>The Sustainable Waste Management Act 2022 mandates organic waste go to licensed processors. <strong className="text-brand-dark">The infrastructure to comply does not yet exist.</strong> NutriLoop Africa is building it.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {CRISIS_STATS.map(({ value, label, source }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <p className="font-mono text-2xl sm:text-3xl font-semibold text-red-500 tabular-nums mb-2 leading-none">{value}</p>
                  <p className="text-sm text-gray-600 leading-snug mb-2">{label}</p>
                  <p className="text-xs text-gray-400">{source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Crisis 2 — Feed */}
      <section id="feed" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {FEED_STATS.map(({ value, label, source }) => (
                <div key={label} className="bg-[#F5F7F2] rounded-2xl border border-gray-100 p-6">
                  <p className="font-mono text-2xl sm:text-3xl font-semibold text-brand-amber-600 tabular-nums mb-2 leading-none">{value}</p>
                  <p className="text-sm text-gray-600 leading-snug mb-2">{label}</p>
                  <p className="text-xs text-gray-400">{source}</p>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-amber-50 flex items-center justify-center">
                  <TrendingDown size={16} className="text-brand-amber-700" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-amber-700">Crisis 02</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                Kenya imports the feed its farms need to survive.
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Kenya's livestock sector — 700,000+ smallholder farmers — depends on soybean meal as its primary protein supplement. Almost none of it is produced domestically. It arrives by ship from South America or India, with import duties, shipping costs, and foreign exchange exposure baked in.</p>
                <p>When the Kenyan shilling weakens, feed prices spike. When global soy harvests disappoint, Kenyan chickens and fish go underfed. Smallholder farmers absorb these shocks with no hedging tools and thin margins.</p>
                <p><strong className="text-brand-dark">A domestically produced protein at 40% below imported soy changes this entirely.</strong> That is what BSF protein meal is, and what NutriLoop Africa produces.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soil + Climate */}
      <section id="soil" className="py-20 sm:py-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/6 border border-white/10 rounded-2xl p-8">
              <div className="w-8 h-8 rounded-lg bg-brand-green-900/50 flex items-center justify-center mb-4">
                <Leaf size={16} className="text-brand-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Soil degradation</h3>
              <p className="text-white/55 leading-relaxed text-sm">Decades of synthetic fertiliser use without organic matter replenishment has degraded Kenya's smallholder soils. Reduced water retention means more irrigation needed. Reduced microbial life means more chemical input needed. Frass fertiliser — a BSF by-product with chitin biostimulant — reverses this cycle.</p>
            </div>
            <div className="bg-white/6 border border-white/10 rounded-2xl p-8">
              <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center mb-4">
                <CloudRain size={16} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Climate cost of inaction</h3>
              <p className="text-white/55 leading-relaxed text-sm">Organic waste decomposing in open dumps releases methane at scale. Soybean cultivation drives Amazon deforestation — importing soy imports those emissions. NutriLoop Africa avoids both: 630 tonnes of CO₂-equivalent in Year 1 alone, with a Verra VCS carbon credit pathway in Year 2.</p>
            </div>
          </div>
          <div className="text-center">
            <Link href="/solution" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-sm transition-all hover:-translate-y-0.5">
              See our solution <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <PartnerCTASection />
    </>
  )
}
