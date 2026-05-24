import type { Metadata } from 'next'
import { FAQAccordion } from './FAQAccordion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ — NutriLoop Africa Questions Answered',
  description: 'Answers to the most common questions about NutriLoop Africa — Black Soldier Fly bioconversion, waste collection, BSF protein meal, frass fertiliser, and how to partner with us.',
}

export const FAQ_ITEMS = [
  {
    q: 'What is Black Soldier Fly (BSF) bioconversion?',
    a: 'Black Soldier Fly (Hermetia illucens) bioconversion is the process of using BSF larvae to consume and transform organic waste into high-value outputs. The larvae eat organic material — food waste, market produce, brewery grain — and convert it into their own body mass: 40–55% crude protein and 15–20% crude fat. The process takes 14 days. It is the most efficient organic waste processing technology known: BSF larvae convert feed 10–20× more efficiently than cattle, using no additional water and a fraction of the land.',
  },
  {
    q: 'How does NutriLoop Africa collect organic waste?',
    a: 'NutriLoop Africa operates a scheduled morning collection route from registered waste supplier partners — hotels, hospitals, schools, markets, and residential estates across Nairobi. Collection is free of charge to the supplier. We provide a certified disposal record for every collection batch, which can be used for sustainability reporting, NEMA compliance, and EPR documentation.',
  },
  {
    q: 'What does it cost to register as a waste supplier?',
    a: 'Nothing. NutriLoop Africa collects organic waste at zero cost to the supplier. We provide the collection service, the vehicle, and the disposal documentation. The value exchange is simple: your waste becomes our raw material, and we convert it into food. Suppliers get free waste disposal, certified records, and an annual impact report showing what their waste became.',
  },
  {
    q: 'What is the protein content of NutriLoop\'s BSF protein meal?',
    a: 'NutriLoop Africa BSF protein meal contains 40–55% crude protein and 15–20% crude fat, with moisture content below 10%. The amino acid profile is comparable to premium fishmeal. It contains naturally occurring lauric acid, which has documented antimicrobial properties that support gut health in poultry and fish — reducing antibiotic dependency. Every batch is produced under ICIPE-validated protocols and accompanied by a specification sheet.',
  },
  {
    q: 'How does BSF protein compare to imported soybean meal?',
    a: 'BSF protein meal from NutriLoop Africa is priced approximately 40% below the landed cost of imported soybean meal in Kenya. Nutritionally, it offers higher crude protein (40–55% vs. 44–48% for soy), a better fat profile, and the addition of lauric acid — which soy does not contain. Unlike soy, BSF protein is produced domestically with no import duty, no shipping delay, and no foreign exchange exposure. For Kenyan smallholder farmers, the cost advantage alone makes a material difference to monthly feed bills.',
  },
  {
    q: 'What is frass fertiliser and why does it matter for Kenyan farmers?',
    a: 'Frass is the collective term for BSF larval excrement and shed exoskeletons — a nutrient-rich by-product of the bioconversion process. NutriLoop Africa processes frass into a balanced organic fertiliser with N:P:K ratios of approximately 4–6% nitrogen, 3–5% phosphorus, and 2–4% potassium. Crucially, frass contains chitin — a natural biostimulant that activates plant immune response, improves soil structure, and suppresses root-knot nematodes. For smallholder farmers on degraded soils, frass restores soil biology while delivering plant-available nutrients — reducing the need for synthetic fertiliser inputs.',
  },
  {
    q: 'Is NutriLoop Africa NEMA licensed?',
    a: 'NutriLoop Africa is in the process of applying for licensed organic waste processor status under Kenya\'s Sustainable Waste Management Act 2022 and NEMA regulations. We provide NEMA-compatible waste disposal records for all collections. Our operations are designed from day one to meet full licensing requirements.',
  },
  {
    q: 'What is the Sustainable Waste Management Act 2022 and how does it affect businesses?',
    a: 'The Sustainable Waste Management Act (SWMA) 2022 is Kenyan legislation that mandates organic waste go to licensed processors rather than open dumps or landfill. It also establishes Extended Producer Responsibility (EPR) requirements for food businesses. For hotels, hospitals, markets, and food processors, this means documented, licensed disposal is no longer optional — it is a legal requirement. A NutriLoop Africa supply agreement provides exactly this documentation.',
  },
  {
    q: 'How much investment is NutriLoop Africa seeking?',
    a: 'NutriLoop Africa is seeking USD 50,000–500,000 in phased investment. We welcome impact investors, development finance institutions, climate funds, angel investors, and grant makers whose mandates align with our SDG profile (direct: 2, 3, 8, 9, 11, 12, 13, 15, 17). Our gross margin exceeds 50% — confirmed by CGIAR research across 373 farms. Our KPI framework is aligned with IRIS+, and our carbon credit pathway targets Verra VCS certification in Year 2.',
  },
  {
    q: 'What is the scientific basis for NutriLoop Africa\'s approach?',
    a: 'NutriLoop Africa\'s bioconversion protocols are based on research from ICIPE (the International Centre of Insect Physiology and Ecology) — Africa\'s leading insect research institution. ICIPE\'s FLYgene programme has produced locally adapted BSF strains optimised for Kenyan conditions. The economic model has been independently validated by CGIAR\'s Alliance of Bioversity International and CIAT across 373 farms, confirming 50%+ gross margins at commercial scale.',
  },
  {
    q: 'Which UN Sustainable Development Goals does NutriLoop Africa address?',
    a: 'NutriLoop Africa directly addresses 8 SDGs: SDG 2 (Zero Hunger) through affordable protein for smallholder livestock farmers; SDG 3 (Good Health) through disease vector reduction in urban Nairobi; SDG 8 (Decent Work) through formal job creation; SDG 9 (Industry and Innovation) through technology commercialisation; SDG 11 (Sustainable Cities) through urban waste diversion; SDG 12 (Responsible Consumption) through a zero-waste circular model; SDG 13 (Climate Action) through 630 tonnes of CO₂-equivalent avoidance in Year 1; and SDG 15 (Life on Land) through frass-driven soil restoration.',
  },
  {
    q: 'How does NutriLoop Africa reduce carbon emissions?',
    a: 'NutriLoop Africa generates GHG avoidance through two independent pathways. First, methane avoidance: 360 tonnes of organic waste diverted from Dandora dumpsite avoids anaerobic decomposition, preventing an estimated 420 tonnes of CO₂-equivalent methane emissions in Year 1. Second, soy displacement: 30 tonnes of BSF protein meal replacing imported soybean meal avoids the land-use-change emissions associated with South American soy cultivation — approximately 210 tonnes of CO₂-equivalent. Combined Year 1 avoidance: 630 tonnes CO₂-equivalent. A Verra VCS carbon credit certification is targeted for Year 2.',
  },
  {
    q: 'Can my hotel or restaurant register as a waste supplier?',
    a: 'Yes. NutriLoop Africa actively partners with hotels, lodges, restaurants, and catering operations of all sizes. The process is simple: complete the waste supplier registration form (takes 5 minutes), tell us your estimated daily volume and collection address, and we will schedule a site visit and collection setup within 48 hours of your application. There is no cost, no minimum volume requirement, and no lock-in contract. You receive a NEMA-compatible disposal record for every collection.',
  },
  {
    q: 'How does the research partnership with ICIPE work?',
    a: 'ICIPE (the International Centre of Insect Physiology and Ecology) provides the scientific foundation for NutriLoop Africa\'s operations — including BSF strain selection, substrate protocols, and quality benchmarks validated for Kenyan organic waste streams. University and institutional researchers can apply to collaborate with NutriLoop Africa for data access, out-grower network studies, soil amendment research, and GHG quantification. Several universities have already embedded NutriLoop as a live case study in circular economy programmes.',
  },
  {
    q: 'Where can I buy BSF protein meal or frass fertiliser in Kenya?',
    a: 'NutriLoop Africa sells BSF protein meal, frass fertiliser, and fresh larvae directly from our Nairobi facility. We deliver to poultry farms, aquaculture operations, agrodealers, and feed manufacturers across Kenya. To enquire about pricing, minimum orders, and delivery to your area, submit a buyer enquiry through the Apply page or email hello@nutriloopAfrica.com. We respond within 48 hours.',
  },
]

// ── JSON-LD FAQPage schema for Google featured snippets / AEO ─────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="relative bg-brand-dark pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,125,50,0.18) 0%, transparent 70%)' }} aria-hidden />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">FAQ</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Every question. Properly answered.
          </h1>
          <p className="text-white/55 text-lg">
            15 questions covering BSF science, waste collection, product specs, investment, compliance, and how to partner with us.
          </p>
        </div>
      </div>

      {/* FAQ accordion */}
      <section className="py-16 sm:py-20 bg-[#F5F7F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={FAQ_ITEMS} />

          <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-7 shadow-sm text-center">
            <h2 className="font-bold text-brand-dark mb-2">Still have a question?</h2>
            <p className="text-gray-500 text-sm mb-5">We respond within 48 hours to every enquiry.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold text-sm transition-colors">
              Send us a message <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
