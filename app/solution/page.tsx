import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { BSFLifecycleSection } from '@/components/sections/BSFLifecycleSection'
import { PartnerCTASection } from '@/components/sections/HomeSections'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Solution — BSF Bioconversion Science',
  description: 'How NutriLoop Africa uses Black Soldier Fly bioconversion — backed by ICIPE science — to convert organic waste into protein meal and frass fertiliser in 14 days.',
}

const ALTERNATIVES = [
  { name: 'Composting', pro: 'Organic matter return', con: 'Weeks/months; low protein value; no animal feed', winner: false },
  { name: 'Anaerobic Digestion', pro: 'Biogas + digestate', con: 'High capex; digestate not protein; limited Kenya infrastructure', winner: false },
  { name: 'Landfill / Open Dump', pro: 'Low upfront cost', con: 'Methane emissions; leachate; SWMA 2022 non-compliant; no value', winner: false },
  { name: 'BSF Bioconversion', pro: '14-day cycle; 40–55% protein; frass + protein outputs; 50%+ margin; SWMA compliant', con: 'Requires controlled facility and expertise', winner: true },
]

const OUTPUT_SPECS = [
  { product: 'BSF Protein Meal', protein: '40–55%', fat: '15–20%', moisture: '<10%', form: 'Dried, milled', market: 'Poultry, aquaculture, feed mfrs' },
  { product: 'Frass Fertiliser', protein: '—', fat: '—', moisture: '<30%', form: 'Granular/pellet', market: 'Smallholder farmers, agrodealers' },
  { product: 'Fresh Larvae', protein: '40%+', fat: '30%+', moisture: '65–70%', form: 'Whole, live', market: 'Premium poultry, fish hatcheries' },
]

export default function SolutionPage() {
  return (
    <>
      <PageHero
        badge="The Solution"
        headline="14 days from waste to protein."
        highlight="protein."
        subheadline="Black Soldier Fly bioconversion is the most efficient organic waste processing technology on the planet. ICIPE proved it. We're scaling it."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Solution' }]}
      />

      {/* BSF lifecycle */}
      <BSFLifecycleSection />

      {/* BSF Science deep-dive */}
      <section id="bsf-science" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-green-600 mb-3 block">The Biology</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-6">Why Black Soldier Fly?</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p><em>Hermetia illucens</em> (Black Soldier Fly) is not a pest. It doesn't bite, it doesn't spread disease, and adult flies don't eat — they have no functional mouthparts. The larvae are the engine: voracious bioconverters that can consume their body weight daily.</p>
                <p>BSF larvae produce antimicrobial compounds that suppress pathogens in the substrate, making the process safer than open composting. Their gut microbiome is uniquely adapted to process high-moisture organic waste that would overwhelm other bioconversion organisms.</p>
                <p>The resulting larvae are 40–55% crude protein and 15–20% crude fat — nutritional profiles comparable to premium fishmeal, at a fraction of the cost.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { val: '10–20×', label: 'feed conversion vs. cattle' },
                  { val: '100×', label: 'less land than soy per kg protein' },
                  { val: '0', label: 'water for BSF vs. 2,400L for soy/kg' },
                  { val: '14', label: 'days from waste to harvest' },
                ].map(({ val, label }) => (
                  <div key={label} className="bg-[#F5F7F2] rounded-xl p-4">
                    <p className="font-mono text-xl font-semibold text-brand-green-700">{val}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-dark rounded-2xl p-8 text-white">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-green-400 mb-3 block">ICIPE Partnership</span>
              <h3 className="text-xl font-bold mb-4">Science built on 20 years of African insect research.</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6">The International Centre of Insect Physiology and Ecology has been studying Black Soldier Fly in African conditions since the early 2000s. Their FLYgene programme has produced locally-adapted strains optimised for Kenyan organic waste substrates — higher growth rates, better conversion efficiency, and climate resilience built in.</p>
              <ul className="space-y-3">
                {['Substrate protocols validated for Kenyan organic waste streams', 'Strain selection for Nairobi altitude and temperature range', 'CGIAR: 50%+ gross margin confirmed across 373 farms', 'Biosafety and pathogen suppression data independently verified'].map(b => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-brand-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/70">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/partner/research" className="inline-flex items-center gap-2 mt-6 text-xs font-semibold text-brand-green-400 hover:text-brand-green-300 transition-colors">
                Research partnership details <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Output specs table */}
      <section className="py-20 sm:py-24 bg-[#F5F7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-dark">Three outputs. Every kilogram of substrate counted.</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-sm" aria-label="Product output specifications">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Product', 'Crude Protein', 'Crude Fat', 'Moisture', 'Form', 'Primary Market'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OUTPUT_SPECS.map((row, i) => (
                  <tr key={row.product} className={i < OUTPUT_SPECS.length - 1 ? 'border-b border-gray-50' : ''}>
                    <td className="px-5 py-4 font-semibold text-brand-dark">{row.product}</td>
                    <td className="px-5 py-4 font-mono text-brand-green-700">{row.protein}</td>
                    <td className="px-5 py-4 font-mono text-gray-600">{row.fat}</td>
                    <td className="px-5 py-4 font-mono text-gray-600">{row.moisture}</td>
                    <td className="px-5 py-4 text-gray-600">{row.form}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{row.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* vs alternatives */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-dark mb-3">BSF vs. every alternative.</h2>
            <p className="text-gray-500">Why bioconversion wins on every dimension that matters.</p>
          </div>
          <div className="space-y-3">
            {ALTERNATIVES.map(({ name, pro, con, winner }) => (
              <div key={name} className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center p-5 rounded-2xl border ${winner ? 'bg-brand-green-50 border-brand-green-200' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex items-center gap-3 sm:w-44 flex-shrink-0">
                  {winner
                    ? <CheckCircle size={18} className="text-brand-green-600 flex-shrink-0" />
                    : <XCircle size={18} className="text-gray-300 flex-shrink-0" />}
                  <span className={`font-semibold text-sm ${winner ? 'text-brand-green-800' : 'text-gray-500'}`}>{name}</span>
                  {winner && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-green-700 text-white">NutriLoop</span>}
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-400 mr-1">✓</span><span className={winner ? 'text-brand-green-700' : 'text-gray-500'}>{pro}</span></div>
                  <div><span className="text-gray-300 mr-1">✗</span><span className="text-gray-400">{con}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PartnerCTASection />
    </>
  )
}
