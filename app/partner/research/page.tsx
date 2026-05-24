import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Research Partners — ICIPE, CGIAR, Universities',
  description: 'NutriLoop Africa partners with ICIPE, CGIAR, and universities on BSF science. Data access, out-grower network, FLYgene, and live circular economy case studies.',
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        badge="For Research Partners"
        headline="A live commercial BSF facility in Nairobi. Open to research."
        subheadline="NutriLoop Africa is not just a business — it is the most data-rich Black Soldier Fly bioconversion operation in East Africa. We want research partners who help us measure, improve, and prove the model."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partner' }, { label: 'Research' }]}
      />

      <section className="py-20 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">What we offer the research community.</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>ICIPE's FLYgene programme produced the strain we work with. CGIAR's Alliance of Bioversity International validated the economics across 373 farms. We are the next step: commercial-scale, real-world data from Nairobi's actual organic waste stream.</p>
                <p>We welcome research collaborations in substrate composition and bioconversion efficiency, frass soil amendment impact, GHG avoidance quantification, circular economy systems modelling, and BSF protein nutritional validation for Kenyan livestock species.</p>
              </div>
              <Link href="/apply?tab=research" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold text-sm transition-all hover:-translate-y-px">
                Apply for research access <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { title: 'ICIPE partnership', desc: 'Active collaboration with the International Centre of Insect Physiology and Ecology — Africa\'s leading insect research institute.' },
                { title: 'CGIAR / Alliance Bioversity', desc: 'Our economic model is validated by CGIAR research across 373 BSF farms. We are extending this to Kenyan conditions.' },
                { title: 'Out-grower network data', desc: 'Access to substrate, conversion efficiency, and output quality data across our partner network as it scales.' },
                { title: 'Live case study for universities', desc: 'Several university partners have embedded NutriLoop as a live circular economy case study in environmental science programmes.' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-brand-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-brand-dark text-sm">{title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start a research collaboration.</h2>
          <p className="text-white/55 mb-8">Tell us your institution, your research area, and what data or access you need. We will respond within 48 hours.</p>
          <Link href="/apply?tab=research" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-base transition-all hover:-translate-y-0.5">
            Apply for research partnership <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
