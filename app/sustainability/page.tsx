import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { SDGSection } from '@/components/sections/SDGSection'
import { PartnerCTASection } from '@/components/sections/HomeSections'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sustainability — SDGs, Carbon Credits, Climate Impact',
  description: 'NutriLoop Africa addresses 8 SDGs directly, avoids 630t CO₂-eq in Year 1, and targets Verra VCS carbon credit certification in Year 2. Full sustainability report.',
}

const CARBON_TIMELINE = [
  {
    phase: 'Year 1 — Q1',
    title: 'GHG baseline established',
    desc: 'Document pre-diversion waste stream composition and methane emission factors at Dandora reference site. Commission independent GHG measurement.',
    status: 'active',
  },
  {
    phase: 'Year 1 — Q2–Q4',
    title: 'Continuous monitoring begins',
    desc: 'Monthly waste diversion records, soy displacement calculations, and frass soil amendment data collected. NEMA records provide third-party verification.',
    status: 'active',
  },
  {
    phase: 'Year 2 — Q1',
    title: 'Verra VCS pre-submission',
    desc: 'Select applicable methodology (VM0044 Biochar / VM0006 Organic waste diversion). Engage Verra-approved third-party auditor for validation.',
    status: 'planned',
  },
  {
    phase: 'Year 2 — Q2–Q3',
    title: 'Third-party validation',
    desc: 'Independent auditor validates project design document. Public comment period. Verra VCS project registration.',
    status: 'planned',
  },
  {
    phase: 'Year 2 — Q4',
    title: 'First carbon credits issued',
    desc: 'Verified carbon units issued against Year 1 and partial Year 2 avoidance. Credits available for direct purchase by corporate buyers or carbon markets.',
    status: 'planned',
  },
]

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        badge="Sustainability"
        headline="8 SDGs. 630t CO₂ avoided. Carbon credits in Year 2."
        subheadline="NutriLoop Africa's impact is not a side effect of the business model — it is the business model. Every tonne of waste processed generates measurable, documentable environmental and social value."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sustainability' }]}
      />

      {/* Climate impact numbers */}
      <section className="py-16 sm:py-20 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold uppercase tracking-widest mb-4">
              Climate Impact · Year 1
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">Two avoidance pathways. Both independently documentable.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { val: '360t', label: 'Organic waste diverted', sub: 'From Dandora dumpsite', color: 'text-brand-green-700' },
              { val: '~420t', label: 'CO₂-eq: methane avoided', sub: 'Landfill diversion pathway', color: 'text-brand-green-700' },
              { val: '~210t', label: 'CO₂-eq: soy displaced', sub: 'Land-use-change avoided', color: 'text-brand-green-700' },
              { val: '630t', label: 'Total CO₂-eq avoided', sub: 'Year 1 combined', color: 'text-brand-amber-600' },
            ].map(({ val, label, sub, color }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
                <p className={`font-mono text-3xl font-semibold mb-2 ${color}`}>{val}</p>
                <p className="text-sm font-semibold text-brand-dark leading-snug">{label}</p>
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
              </div>
            ))}
          </div>

          {/* Methodology note */}
          <div className="bg-brand-green-50 border border-brand-green-200 rounded-2xl p-6">
            <h3 className="font-bold text-brand-green-800 mb-3 text-sm">Calculation methodology (conservative estimates)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-green-700 leading-relaxed">
              <div>
                <p className="font-semibold mb-1">Methane avoidance pathway</p>
                <p>360t organic waste × IPCC Tier 1 methane emission factor for tropical open dump conditions × GWP100 of methane (25 CO₂-eq). Conservative — actual Dandora anaerobic conditions may produce higher emissions.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Soy displacement pathway</p>
                <p>30t BSF protein meal × soy displacement ratio (0.8 kg soy / kg BSF protein) × land-use-change emission factor for Brazilian soy (~7t CO₂-eq/t soy protein). Eligible under VM0006 methodology.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <SDGSection />

      {/* Carbon credit roadmap */}
      <section id="carbon" className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-green-50 border border-brand-green-200 text-brand-green-700 text-xs font-semibold uppercase tracking-widest mb-4">
              Carbon Credits
            </span>
            <h2 className="text-3xl font-bold text-brand-dark mb-3">Verra VCS certification pathway.</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              NutriLoop Africa's GHG avoidance qualifies under two Verra VCS methodologies. Year 2 target for first credit issuance.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden />

            <div className="space-y-6">
              {CARBON_TIMELINE.map((item, i) => (
                <div key={item.phase} className="relative flex gap-5">
                  {/* Dot */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                      item.status === 'active'
                        ? 'bg-brand-green-700 border-brand-green-700 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {i + 1}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 pb-2 ${i < CARBON_TIMELINE.length - 1 ? 'pb-6' : ''}`}>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${item.status === 'active' ? 'text-brand-green-600' : 'text-gray-400'}`}>
                      {item.phase}
                    </p>
                    <h3 className="font-bold text-brand-dark mb-1.5">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-brand-dark rounded-2xl p-7 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h3 className="font-bold mb-2">Interested in purchasing carbon credits?</h3>
                <p className="text-white/55 text-sm">Corporate buyers, offset programmes, and intermediaries can register interest now for Year 2 credit issuance.</p>
              </div>
              <Link href="/contact?type=investor" className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white text-sm font-semibold transition-colors">
                Register interest <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications and affiliates */}
      <section className="py-14 bg-[#F5F7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-brand-dark text-center mb-8">Frameworks, certifications, and standards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { name: 'IRIS+', desc: 'Impact KPI framework alignment', status: 'Aligned' },
              { name: 'Verra VCS', desc: 'Verified Carbon Standard — Year 2 target', status: 'In progress' },
              { name: 'SWMA 2022', desc: 'Sustainable Waste Management Act compliance', status: 'Compliant' },
              { name: 'NEMA Kenya', desc: 'Licensed organic waste processor (applying)', status: 'Applying' },
              { name: 'ICIPE Science', desc: 'BSF protocols and strain validation', status: 'Active' },
              { name: 'CGIAR Verified', desc: 'Economic model validated across 373 farms', status: 'Verified' },
            ].map(({ name, desc, status }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="font-bold text-brand-dark text-sm mb-1">{name}</p>
                <p className="text-xs text-gray-500 mb-3 leading-snug">{desc}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  status === 'Active' || status === 'Verified' || status === 'Aligned' || status === 'Compliant'
                    ? 'bg-brand-green-50 text-brand-green-700 border border-brand-green-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnerCTASection />
    </>
  )
}
