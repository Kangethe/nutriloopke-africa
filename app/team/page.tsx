import type { Metadata } from 'next'
import Link from 'next/link'
import { Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react'
import { PartnerCTASection } from '@/components/sections/HomeSections'

export const metadata: Metadata = {
  title: 'Team — NutriLoop Africa Founders & Advisors',
  description: 'Meet the founders and advisors behind NutriLoop Africa — experienced in Kenya\'s agricultural supply chain, waste management, and impact investment.',
}

const FOUNDERS = [
  {
    name: 'Founder & CEO',
    role: 'Founder & Chief Executive Officer',
    bio: 'Background in agricultural supply chain and circular economy systems across East Africa. Previously led waste-to-value initiatives in the NGO sector before founding NutriLoop Africa to build the commercial infrastructure Kenya\'s organic waste system needs.',
    affiliation: 'ICIPE Research Associate',
    linkedin: '#',
    twitter: '#',
    email: 'hello@nutriloopAfrica.com',
    initials: 'NL',
    color: 'bg-brand-green-700',
  },
  {
    name: 'Co-Founder & CTO',
    role: 'Co-Founder & Chief Technology Officer',
    bio: 'Trained in biochemical engineering with specialisation in insect bioconversion. Spent three years at ICIPE\'s Thomas Odhiambo Campus studying BSF bioconversion at scale before co-founding NutriLoop Africa to commercialise that science.',
    affiliation: 'ICIPE – Thomas Odhiambo Campus',
    linkedin: '#',
    twitter: '#',
    email: 'hello@nutriloopAfrica.com',
    initials: 'NL',
    color: 'bg-brand-brown-600',
  },
]

const ADVISORS = [
  {
    name: 'BSF Science Advisor',
    role: 'Advisory — Insect Science',
    affiliation: 'ICIPE',
    desc: 'Leading researcher in Black Soldier Fly biology and substrate optimisation for African waste streams.',
    initials: 'SA',
    color: 'bg-brand-green-800',
  },
  {
    name: 'Impact Investment Advisor',
    role: 'Advisory — Finance & Impact',
    affiliation: 'AECF',
    desc: 'Former fund manager with 12 years of impact investment experience across Sub-Saharan Africa.',
    initials: 'IA',
    color: 'bg-brand-amber-700',
  },
  {
    name: 'Regulatory & Policy Advisor',
    role: 'Advisory — Kenya Regulatory',
    affiliation: 'NEMA Kenya',
    desc: 'Expert in Kenya environmental law, SWMA 2022 compliance, and EPR regulatory frameworks.',
    initials: 'RA',
    color: 'bg-blue-700',
  },
  {
    name: 'Agribusiness Advisor',
    role: 'Advisory — Agribusiness',
    affiliation: 'CGIAR',
    desc: 'Agricultural economist specialising in smallholder farm economics across Kenya and Uganda.',
    initials: 'AA',
    color: 'bg-purple-700',
  },
]

export default function TeamPage() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-brand-dark pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,125,50,0.18) 0%, transparent 70%)' }} aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
            The Team
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Built by people who know the problem.</h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Founders with direct experience in Kenya's agricultural supply chain, waste management, and BSF science. Advisors from ICIPE, CGIAR, AECF, and NEMA.
          </p>
        </div>
      </div>

      {/* Founders */}
      <section className="py-16 sm:py-20 bg-[#F5F7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-10">Founding team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDERS.map((founder) => (
              <div key={founder.role} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Avatar + name header */}
                <div className="p-7 flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-2xl ${founder.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xl font-bold">{founder.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg">{founder.name}</h3>
                    <p className="text-sm text-gray-500">{founder.role}</p>
                    {founder.affiliation && (
                      <span className="mt-1.5 inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-green-50 text-brand-green-700 border border-brand-green-200">
                        {founder.affiliation}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-7 pb-7">
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{founder.bio}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    {founder.linkedin && (
                      <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-brand-green-50 hover:text-brand-green-700 transition-colors">
                        <Linkedin size={14} />
                      </a>
                    )}
                    {founder.twitter && (
                      <a href={`https://twitter.com/${founder.twitter}`} target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-brand-green-50 hover:text-brand-green-700 transition-colors">
                        <Twitter size={14} />
                      </a>
                    )}
                    <a href={`mailto:${founder.email}`} aria-label="Email"
                      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-brand-green-50 hover:text-brand-green-700 transition-colors">
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-10">Advisory board</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ADVISORS.map((adv) => (
              <div key={adv.role} className="flex gap-4 bg-[#F5F7F2] rounded-2xl border border-gray-100 p-5">
                <div className={`w-12 h-12 rounded-xl ${adv.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-bold">{adv.initials}</span>
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-sm">{adv.name}</h3>
                  <p className="text-xs text-gray-500 mb-1.5">{adv.role}</p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-500">
                    {adv.affiliation}
                  </span>
                  <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-400 text-center">
            Team bios are managed via Sanity CMS — connect at <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">/studio</code> to add photos and full bios.
          </p>
        </div>
      </section>

      {/* ICIPE governance */}
      <section className="py-14 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Science governance.</h2>
          <p className="text-white/55 max-w-xl mx-auto mb-7 leading-relaxed">
            NutriLoop Africa's bioconversion protocols are reviewed under ICIPE's scientific governance framework. Our research collaboration is subject to ICIPE's institutional research ethics and data governance standards.
          </p>
          <Link href="/partner/research" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white text-sm font-semibold transition-colors">
            Research partnership details <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <PartnerCTASection />
    </>
  )
}
