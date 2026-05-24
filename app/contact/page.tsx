import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact NutriLoop Africa',
  description: 'Get in touch with NutriLoop Africa. Email, WhatsApp, or the contact form — we respond within 48 hours to every enquiry.',
}

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-brand-dark pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,125,50,0.18) 0%, transparent 70%)' }} aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
            Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Talk to the founders.</h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            We're a small team. Every message gets a direct response. No ticket numbers, no auto-replies.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Contact info sidebar */}
            <aside className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-bold text-brand-dark mb-5">Direct contact</h2>
                <div className="space-y-4">
                  <a href="mailto:hello@nutriloopAfrica.com"
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-green-700 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-brand-green-50 flex items-center justify-center group-hover:bg-brand-green-100 transition-colors flex-shrink-0">
                      <Mail size={15} className="text-brand-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Email</p>
                      <p className="font-medium text-gray-800">hello@nutriloopAfrica.com</p>
                    </div>
                  </a>

                  <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-green-700 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors flex-shrink-0">
                      <Phone size={15} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">WhatsApp (preferred)</p>
                      <p className="font-medium text-gray-800">+254 700 000 000</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-amber-50 flex items-center justify-center flex-shrink-0">
                      <MapPin size={15} className="text-brand-amber-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Location</p>
                      <p className="text-sm font-medium text-gray-800">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-brand-dark mb-4 text-sm">Follow us</h3>
                <div className="space-y-3">
                  {[
                    { Icon: Linkedin, label: 'LinkedIn', sub: 'Updates for funders & partners', href: 'https://linkedin.com/company/nutriloop-africa' },
                    { Icon: Instagram, label: 'Instagram', sub: 'Behind the scenes at the facility', href: 'https://instagram.com/nutriloopAfrica' },
                    { Icon: Twitter, label: 'X / Twitter', sub: 'Real-time impact data & commentary', href: 'https://twitter.com/NutriLoopAfrica' },
                    { Icon: Youtube, label: 'YouTube', sub: 'BSF lifecycle, facility tours', href: 'https://youtube.com/@NutriLoopAfrica' },
                  ].map(({ Icon, label, sub, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded-xl p-1 -mx-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-brand-green-50 transition-colors flex-shrink-0">
                        <Icon size={14} className="text-gray-500 group-hover:text-brand-green-600 transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{label}</p>
                        <p className="text-[11px] text-gray-400">{sub}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-brand-dark rounded-2xl p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Response time</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  We reply to every message within <span className="text-white font-semibold">48 hours</span>. For urgent matters — facility visits, live press deadlines, or time-sensitive partnerships — WhatsApp is the fastest route.
                </p>
              </div>
            </aside>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
