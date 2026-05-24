import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { PartnerCTASection } from '@/components/sections/HomeSections'
import { ArrowRight, Target, Eye, Heart, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About NutriLoop Africa',
  description: 'The story, mission, and vision behind NutriLoop Africa — converting Nairobi\'s organic waste into protein and fertiliser using ICIPE-backed BSF science.',
}

const VALUES = [
  { icon: Target, title: 'Circular by design', desc: 'Nothing we process goes to waste. Every input becomes a product. The model only works if the loop is complete.' },
  { icon: Eye, title: 'Radical transparency', desc: 'We publish our impact KPIs. Our certifiers, partners, and waste suppliers see exactly what their contribution becomes.' },
  { icon: Heart, title: 'Science first', desc: 'Our bioconversion process is based on ICIPE research and validated across 373 farms by CGIAR. We do not guess.' },
  { icon: Zap, title: 'Built to scale', desc: 'Unit economics that improve with volume. Feedstock that grows with Nairobi. Infrastructure designed for replication.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Our Story"
        headline="We saw two crises and one answer."
        subheadline="Nairobi drowns in organic waste. Kenyan farmers import the feed it could become. NutriLoop Africa exists to close that gap — with science, for profit, at scale."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Founder story */}
      <section className="py-20 sm:py-28 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-green-600 mb-3 block">The Founding Team</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                Built by people who know the problem from the inside.
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  NutriLoop Africa was founded in Nairobi by a team with direct experience in Kenya's agricultural supply chain, waste management, and impact investment sectors. We spent two years watching the same tonnes of nutrient-rich organic waste leave Nairobi's best kitchens every morning — and disappear into a system that produced nothing from them.
                </p>
                <p>
                  At the same time, we watched Kenyan poultry farmers — particularly smallholders — absorb the full cost of imported soybean meal every quarter. The feed price volatility alone drives many out of business. The connection was obvious. The infrastructure to bridge it did not exist.
                </p>
                <p>
                  We built NutriLoop Africa to be that infrastructure — with ICIPE science at the core, commercial discipline throughout, and a partnership model that makes every stakeholder better off.
                </p>
              </div>
              <Link href="/team" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold text-sm transition-colors">
                Meet the team <ArrowRight size={14} />
              </Link>
            </div>

            {/* Stats sidebar */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2024', label: 'Year founded', sub: 'Nairobi, Kenya' },
                { value: '14 days', label: 'BSF conversion cycle', sub: 'Waste to product' },
                { value: '373', label: 'Farms in CGIAR study', sub: 'Validating our model' },
                { value: '8', label: 'SDGs directly addressed', sub: 'Independently verified' },
              ].map(({ value, label, sub }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <p className="font-mono text-2xl font-semibold text-brand-amber-600 tabular-nums mb-1.5">{value}</p>
                  <p className="text-sm font-semibold text-brand-dark">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-brand-dark rounded-2xl p-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-green-400 mb-3 block">Vision</span>
              <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
                A Kenya where organic waste is raw material, not refuse — and where every farmer can afford the protein their livestock needs.
              </p>
            </div>
            <div className="bg-brand-green-800 rounded-2xl p-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-green-200 mb-3 block">Mission</span>
              <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
                To convert Nairobi's organic waste stream into certified protein and fertiliser — at commercial scale, at margin, with every tonne documented and every stakeholder better off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark">What we stand for.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-green-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-green-700" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ICIPE partnership */}
      <section className="py-20 sm:py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-semibold uppercase tracking-widest mb-6">Science Partnership</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Our science comes from Africa's leading insect research institute.
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            ICIPE (the International Centre of Insect Physiology and Ecology) is the global authority on insect science in Africa. Their BSF research underpins our bioconversion protocols, strain selection, and quality benchmarks. This is not aspirational — it is the foundation of our facility design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.icipe.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 border border-white/12 text-white text-sm font-semibold hover:bg-white/14 transition-colors">
              Visit ICIPE <ArrowRight size={14} />
            </a>
            <Link href="/partner/research" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white text-sm font-semibold transition-colors">
              Research partnership <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <PartnerCTASection />
    </>
  )
}
