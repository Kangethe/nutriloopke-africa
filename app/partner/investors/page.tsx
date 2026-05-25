import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Investors & Funders — NutriLoop Africa',
  description: 'Two crises. One biological answer. 50%+ margin. 8 SDGs. USD 50K–500K investment sought. IRIS+ aligned, Verra VCS carbon credit pathway Year 2.',
}

const FUND_FIT = [
  { fund: 'Climate & Environment', sdgs: '13, 15, 12', note: '630t CO₂-eq Year 1; Verra VCS pathway Year 2' },
  { fund: 'Food Systems / Agri', sdgs: '2, 3, 8', note: 'Feed gap, protein security, Kenya smallholder farmers' },
  { fund: 'Circular Economy', sdgs: '12, 11, 9', note: 'Zero-waste model, urban waste-to-value, BSF tech transfer' },
  { fund: 'SME / Entrepreneurship', sdgs: '8, 9, 17', note: '50%+ gross margin, 5 direct jobs, replicable model' },
  { fund: 'Africa / Kenya Focus', sdgs: 'Multiple', note: 'Kenya-based, ICIPE-partnered, SWMA 2022 compliant' },
]

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        badge="For Investors & Funders"
        headline="Two crises. One biological answer. 50%+ margin."
        subheadline="Kenya generates 5.72 million tonnes of organic waste annually. Kenya's farmers import 60% of their livestock feed. NutriLoop Africa converts the first problem into the solution to the second."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partner' }, { label: 'Investors' }]}
      />

      <section className="py-20 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">This is a business — not a pilot looking for perpetual grant support.</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>NutriLoop Africa's gross margin exceeds 50% because our feedstock is free. Our impact is quantified in CO₂ avoided, jobs created, and frass applied to smallholder soils. Our KPI framework is aligned with IRIS+. Our carbon credit pathway targets Verra VCS certification in Year 2.</p>
                <p>We are a business whose unit economics improve with scale, whose feedstock grows with urbanisation, and whose market is structurally undersupplied. We are seeking USD 50,000–500,000 in phased investment.</p>
                <p className="font-medium text-brand-dark">We would like to show you the numbers.</p>
              </div>
              <div className="flex gap-3 mt-8 flex-wrap">
                <Link href="/apply?tab=investor" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-sm transition-all hover:-translate-y-px">
                  Request the investor brief <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '50%+', label: 'Gross margin', sub: 'CGIAR verified, 373 farms' },
                { val: 'USD 50K–500K', label: 'Investment sought', sub: 'Phased tranches' },
                { val: '8 SDGs', label: 'Directly addressed', sub: 'IRIS+ aligned KPIs' },
                { val: 'Year 2', label: 'Carbon credit target', sub: 'Verra VCS pathway' },
                { val: '630t', label: 'CO₂-eq Year 1', sub: 'Two avoidance pathways' },
                { val: 'KES 200B', label: 'Market size (TAM)', sub: 'Kenya animal feed' },
              ].map(({ val, label, sub }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <p className="font-mono text-xl font-semibold text-brand-green-700 mb-1">{val}</p>
                  <p className="text-sm font-semibold text-brand-dark">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center">Fund fit by mandate</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm" aria-label="Fund fit by mandate">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Fund Mandate', 'SDGs', 'NutriLoop Relevance'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FUND_FIT.map((row, i) => (
                  <tr key={row.fund} className={i < FUND_FIT.length - 1 ? 'border-b border-gray-50' : ''}>
                    <td className="px-5 py-4 font-semibold text-brand-dark">{row.fund}</td>
                    <td className="px-5 py-4 font-mono text-xs text-brand-green-600">{row.sdgs}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">What investors receive.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
            {[
              'Full financial model with sensitivity analysis (revenue, COGS, margin by scenario)',
              'IRIS+ aligned impact KPI framework with Year 1 and Year 3 projections',
              'CGIAR and ICIPE validation documents for the BSF model we are commercialising',
              'NEMA compliance documentation and SWMA 2022 alignment analysis',
              'Carbon credit methodology analysis (VM0044/VM0006) and Verra VCS timeline',
              'Founder CVs, advisory structure, and governance framework',
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 bg-white/6 border border-white/10 rounded-xl p-4">
                <CheckCircle size={14} className="text-brand-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>
          <Link href="/apply?tab=investor" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-base transition-all hover:-translate-y-0.5">
            Request investor brief <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
