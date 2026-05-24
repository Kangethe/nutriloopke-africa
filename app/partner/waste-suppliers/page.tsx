import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Waste Suppliers — Hotels, Hospitals, Schools, Markets',
  description: 'NutriLoop Africa collects organic waste free of charge and provides NEMA-compatible disposal records. For hotels, hospitals, schools, markets, and residential estates across Nairobi.',
}

const SEGMENTS = [
  {
    emoji: '🏨',
    audience: 'Hotels, restaurants, lodges — premium hospitality',
    headline: 'Your kitchen waste has been costing you. Now it can count for something.',
    body: 'Every day your kitchen generates tonnes of organic waste. Right now it goes into a bin, onto a truck, to a dumpsite — and disappears from your sustainability report as a cost. NutriLoop Africa collects it for free, every morning, and converts it into protein that feeds Kenyan farmers and fertiliser that restores Kenyan soils. We give you a certified waste disposal record for every collection — documentation your sustainability team, your international certifiers, and your guests will want to see. You do nothing differently. Your waste starts doing something extraordinary.',
    cta: 'Register your hotel as a NutriLoop waste partner',
  },
  {
    emoji: '🏥',
    audience: 'Hospitals and healthcare institutions',
    headline: 'Your food service waste deserves a better destination than a dumpsite.',
    body: "Your hospital cafeteria and kitchen generates a consistent, clean stream of organic food waste every day. Unlike clinical waste, this fraction is safe, nutrient-rich, and valuable — but it rarely gets treated that way. NutriLoop collects your organic food waste on a scheduled basis, provides batch disposal records, and converts it into certified animal feed and organic fertiliser. Responsible waste management is part of a healthcare institution's duty of care — not just to patients, but to the environment they operate in.",
    cta: 'Talk to us about your waste stream',
  },
  {
    emoji: '🎓',
    audience: 'Schools, universities, colleges',
    headline: 'Turn your canteen waste into a lesson your students will remember.',
    body: "Your institution talks about sustainability in classrooms. NutriLoop Africa makes it visible in the canteen. We partner with educational institutions to collect organic food waste, convert it into BSF-derived protein and fertiliser, and provide impact data that you can share with students, governors, and funders. Some of our university partners have turned this into active research collaborations — using our pilot as a live commercial case study in environmental science and circular economy management.",
    cta: 'Start a waste partnership with your institution',
  },
  {
    emoji: '🏪',
    audience: 'Markets, food processors, breweries',
    headline: 'Your waste problem is our raw material. Let\'s make this official.',
    body: "City Market, Gikomba, Wakulima — every market in Nairobi ends each day with tonnes of unsold vegetables, fruit, and grain. It blocks drains. It attracts pests. It is expensive to dispose of. NutriLoop Africa is a licensed organic waste processor that collects your market waste on a fixed schedule, provides NEMA-compliant disposal records, and can offer revenue-sharing arrangements for consistently high-quality substrates like brewery grain. EPR-registered food businesses: a NutriLoop supply agreement is documented evidence of responsible waste disposal for your EPR reporting.",
    cta: 'Become a feedstock partner',
  },
  {
    emoji: '🏘️',
    audience: 'Residential estates, apartments, gated communities',
    headline: 'Your building\'s organic waste can feed farms, not landfills.',
    body: "Many residential estates in Nairobi are already thinking about waste sorting. NutriLoop Africa works with estate managers and facilities teams to set up simple organic waste segregation at point of generation — food scraps, kitchen waste — collected by our team on a regular schedule. Residents see the impact: where their waste went, what it became, and the CO₂ their estate avoided. A small action. A documented difference.",
    cta: 'Set up collection for your estate',
  },
]

const WHAT_YOU_GET = [
  'Free collection on a fixed schedule — no disruption to your operations',
  'Certified NEMA-compatible disposal record for every collection',
  'Annual impact report: waste diverted, CO₂ avoided, protein produced',
  'Sustainability documentation for your certifiers, guests, and funders',
  'Zero cost. Zero change to your workflow. Documented difference.',
]

export default function WasteSuppliersPage() {
  return (
    <>
      <PageHero
        badge="For Waste Suppliers"
        headline="Your waste has been a cost. We make it a credential."
        subheadline="NutriLoop Africa collects organic food waste from across Nairobi — free of charge — and converts it into protein and fertiliser. You get NEMA-compliant disposal records and a sustainability story your stakeholders can see."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partner' }, { label: 'Waste Suppliers' }]}
      />

      {/* What you get */}
      <section className="py-16 bg-[#F5F7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark mb-5">What every waste supplier receives:</h2>
            <ul className="space-y-3">
              {WHAT_YOU_GET.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {SEGMENTS.map((seg, i) => (
            <div key={seg.audience} className={`rounded-2xl border p-8 ${i === 0 ? 'bg-brand-dark border-brand-green-900/40 text-white' : 'bg-[#F5F7F2] border-gray-100'}`}>
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0" aria-hidden>{seg.emoji}</span>
                <div className="flex-1">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${i === 0 ? 'text-brand-green-400' : 'text-gray-400'}`}>{seg.audience}</p>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-4 leading-snug ${i === 0 ? 'text-white' : 'text-brand-dark'}`}>{seg.headline}</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${i === 0 ? 'text-white/65' : 'text-gray-600'}`}>{seg.body}</p>
                  <Link href="/apply?tab=waste_supplier" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-px ${i === 0 ? 'bg-brand-amber-700 hover:bg-brand-amber-800 text-white' : 'bg-brand-green-700 hover:bg-brand-green-800 text-white'}`}>
                    {seg.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-green-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to register?</h2>
          <p className="text-brand-green-200 mb-8">Tell us your organisation type, estimated daily volume, and collection address. We'll be in touch within 48 hours to arrange a site visit.</p>
          <Link href="/apply?tab=waste_supplier" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-base transition-all hover:-translate-y-0.5 shadow-xl shadow-brand-amber-900/30">
            Register as a waste supplier <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
