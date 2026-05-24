import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { SDGSection } from '@/components/sections/SDGSection'
import { PartnerCTASection } from '@/components/sections/HomeSections'
import { STATIC_KPIS } from '@/lib/data/kpis-static'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impact — KPIs, SDGs, Climate Data',
  description: 'NutriLoop Africa Year 1 impact: 360t waste diverted, 630t CO₂-eq avoided, 8 SDGs addressed, 5 direct jobs. Full KPI dashboard and climate data.',
}

export default function ImpactPage() {
  return (
    <>
      <PageHero
        badge="Our Impact"
        headline="Every number here is independently verifiable."
        subheadline="Year 1 projections based on CGIAR-validated BSF economics, NEMA waste data, and Kenya feed market analysis. Not estimates. Projections with sources."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Impact' }]}
      />

      {/* Full KPI grid */}
      <section className="py-20 sm:py-28 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold uppercase tracking-widest mb-4">Year 1 KPIs</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">All 14 impact indicators.</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {STATIC_KPIS.map((kpi, i) => (
              <div key={kpi.key} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-brand-green-200 transition-all duration-200">
                <div className="font-mono text-2xl sm:text-3xl font-semibold text-brand-amber-600 tabular-nums mb-2 leading-none">
                  <AnimatedCounter value={kpi.value} prefix={kpi.prefix} unit={kpi.unit} suffix={kpi.suffix} duration={2000} delay={i * 60} />
                </div>
                <p className="text-sm text-gray-700 leading-snug font-medium mb-1">{kpi.label}</p>
                {kpi.description && <p className="text-xs text-gray-400">{kpi.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate breakdown */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-dark mb-3">How we avoid 630 tonnes of CO₂-eq.</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Two independent GHG avoidance pathways — both conservative, both documentable.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#F5F7F2] rounded-2xl p-7 border border-gray-100">
              <div className="font-mono text-3xl font-semibold text-brand-green-700 mb-2">~420t</div>
              <h3 className="font-bold text-brand-dark mb-2">Methane avoidance</h3>
              <p className="text-sm text-gray-500 leading-relaxed">360 tonnes of organic waste diverted from Dandora. At typical organic waste methane emission factors, decomposition avoidance = ~420t CO₂-eq. Conservative estimate — actual Dandora anaerobic conditions likely produce higher emissions.</p>
            </div>
            <div className="bg-[#F5F7F2] rounded-2xl p-7 border border-gray-100">
              <div className="font-mono text-3xl font-semibold text-brand-green-700 mb-2">~210t</div>
              <h3 className="font-bold text-brand-dark mb-2">Soy displacement</h3>
              <p className="text-sm text-gray-500 leading-relaxed">30 tonnes of BSF protein meal displacing imported soybean meal. Soy cultivation in South America carries a land-use change emission factor of ~7t CO₂-eq/t soy protein. Conservative displacement calculation = ~210t CO₂-eq avoided.</p>
            </div>
          </div>
          <div className="mt-6 p-5 bg-brand-green-50 rounded-2xl border border-brand-green-200 text-center">
            <p className="text-sm text-brand-green-700 font-medium">Combined Year 1 avoidance: <span className="font-mono font-bold text-lg">630t CO₂-eq</span></p>
            <p className="text-xs text-brand-green-600 mt-1">Verra VCS carbon credit certification pathway: Year 2 target. Both pathways eligible under VM0044 and VM0006 methodologies.</p>
          </div>
        </div>
      </section>

      {/* SDG section */}
      <SDGSection />

      {/* Jobs + community */}
      <section className="py-20 sm:py-24 bg-brand-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Jobs and livelihoods.</h2>
          <p className="text-white/55 max-w-xl mx-auto mb-10">NutriLoop Africa is not just a waste processor. It is employment infrastructure for Nairobi's informal and formal economy.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: '5', label: 'Direct employees', sub: 'Full-time, Year 1' },
              { val: '20+', label: 'Indirect jobs', sub: 'Collection, distribution' },
              { val: '120t', label: 'Frass to smallholders', sub: 'Supporting farm incomes' },
              { val: '30t', label: 'Protein to farmers', sub: 'Reducing feed costs' },
            ].map(({ val, label, sub }) => (
              <div key={label} className="bg-white/6 border border-white/10 rounded-2xl p-5">
                <p className="font-mono text-2xl font-semibold text-brand-amber-400 mb-1">{val}</p>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/40 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
          <Link href="/sustainability" className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white text-sm font-semibold transition-colors">
            Full sustainability & carbon roadmap <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <PartnerCTASection />
    </>
  )
}
