import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { ArrowRight, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Government — NEMA, SWMA 2022, County Waste MOU',
  description: 'NutriLoop Africa is a licensed organic waste processor supporting SWMA 2022 compliance. 360t diverted from Dandora, NEMA-compatible records, county waste MOU available.',
}

export default function GovernmentPage() {
  return (
    <>
      <PageHero
        badge="For Government"
        headline="Every tonne we process is a tonne that does not reach Dandora."
        subheadline="NutriLoop Africa is applying for licensed organic waste processor status. We need county-managed market waste as feedstock. We produce food, restore soils, hire locally, and document everything."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partner' }, { label: 'Government' }]}
      />

      {/* SWMA 2022 alignment */}
      <section className="py-20 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-green-600 mb-3 block">SWMA 2022 Compliance</span>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">We are the infrastructure the law has been waiting for.</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>The Sustainable Waste Management Act 2022 requires organic waste to go to licensed processors. The challenge: licensed processors with the capacity to handle Nairobi's organic waste stream at scale barely exist. NutriLoop Africa is applying for that licence — and we need county-managed market waste as our feedstock.</p>
                <p>This is not a compliance burden. It is an opportunity. A licensed NutriLoop facility produces food, restores soils, diverts waste from Dandora, creates jobs, and generates NEMA-compatible documentation that the county can use in its own compliance reporting.</p>
                <p>We are not a burden on the county waste system. <strong className="text-brand-dark">We are part of the infrastructure it has been waiting for.</strong></p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: FileText, title: 'NEMA-compatible disposal records', desc: 'Quarterly diversion documentation formatted for NEMA reporting requirements.' },
                { icon: FileText, title: 'SWMA 2022 compliance', desc: 'NutriLoop is applying for licensed organic waste processor status under the Act.' },
                { icon: FileText, title: 'County waste MOU', desc: 'Formal agreement for county-managed market waste as NutriLoop feedstock.' },
                { icon: FileText, title: 'EPR documentation', desc: 'Supply agreements providing documented evidence for EPR-registered food businesses.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-brand-green-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-brand-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Year 1 impact numbers */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center">What a NutriLoop partnership delivers for the county.</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: '360t', label: 'organic waste diverted', sub: 'From Dandora — Year 1' },
              { val: '630t', label: 'CO₂-eq avoided', sub: 'GHG avoidance — Year 1' },
              { val: '5+', label: 'direct jobs', sub: 'Formal employment' },
              { val: '100%', label: 'NEMA documented', sub: 'Every collection batch' },
            ].map(({ val, label, sub }) => (
              <div key={label} className="bg-brand-green-50 border border-brand-green-200 rounded-2xl p-6 text-center">
                <p className="font-mono text-3xl font-semibold text-brand-green-700 mb-1">{val}</p>
                <p className="text-sm font-semibold text-brand-dark">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore a county waste supply MOU</h2>
          <p className="text-white/55 mb-8 leading-relaxed">We are ready to discuss a formal memorandum of understanding for county-managed organic waste supply. This is the fastest route to SWMA 2022 compliance infrastructure for your county.</p>
          <Link href="/contact?type=government" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold text-base transition-all hover:-translate-y-0.5">
            Contact us about a county MOU <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
