import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ApplyForm } from '@/components/forms/ApplyForm'
import { CheckCircle, Clock, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Apply — Waste Supplier, Buyer, Investor, Research, Media',
  description: 'Register as a NutriLoop Africa waste supplier, product buyer, investor, research partner, or media contact. We respond within 48 hours.',
}

const PROMISES = [
  { icon: Clock, text: 'We respond to every application within 48 hours.' },
  { icon: CheckCircle, text: 'Waste suppliers: free collection setup, no contract lock-in.' },
  { icon: CheckCircle, text: 'Buyers: pricing and availability in the first response.' },
  { icon: CheckCircle, text: 'Investors: full financial model sent on first contact.' },
  { icon: Mail, text: 'A branded confirmation email goes to you immediately.' },
]

export default function ApplyPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-brand-dark pt-28 pb-14">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,125,50,0.18) 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
              Get involved
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Ready to close the loop?
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              Whether your waste is our raw material, your farm is our customer, or your fund is our fuel — select your role and we'll take it from there.
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <section className="bg-[#F5F7F2] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-bold text-brand-dark mb-4 text-base">What to expect</h2>
                <ul className="space-y-3">
                  {PROMISES.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <Icon size={14} className="text-brand-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 leading-snug">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-dark rounded-2xl p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Not sure which tab?</p>
                <div className="space-y-2.5 text-sm">
                  <p><span className="text-brand-green-400 font-semibold">Waste Supplier</span> — you generate organic food waste</p>
                  <p><span className="text-brand-amber-400 font-semibold">Buyer</span> — you need protein feed or fertiliser</p>
                  <p><span className="text-blue-400 font-semibold">Investor</span> — you want to fund the business</p>
                  <p><span className="text-purple-400 font-semibold">Research</span> — you want data or a collaboration</p>
                  <p><span className="text-pink-400 font-semibold">Media</span> — you're writing a story</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Prefer to reach us directly?</p>
                <a href="mailto:hello@nutriloopAfrica.com"
                  className="text-sm font-medium text-brand-green-700 hover:text-brand-green-900 block transition-colors mb-2">
                  hello@nutriloopAfrica.com
                </a>
                <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-green-700 hover:text-brand-green-900 block transition-colors">
                  WhatsApp: +254 700 000 000
                </a>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={
                <div className="w-full max-w-2xl animate-pulse space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {[1,2,3,4,5].map(n => <div key={n} className="h-10 w-28 rounded-xl bg-gray-200"/>)}
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 p-7 space-y-4">
                    {[1,2,3,4].map(n => <div key={n}><div className="h-4 w-24 rounded bg-gray-200 mb-2"/><div className="h-10 rounded-xl bg-gray-100"/></div>)}
                  </div>
                </div>
              }>
                <ApplyForm />
              </Suspense>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
