import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(46,125,50,0.15) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* 404 number */}
        <p className="font-mono text-[120px] sm:text-[160px] font-semibold leading-none text-white/5 select-none mb-0">
          404
        </p>

        {/* Logo mark */}
        <div className="flex justify-center -mt-8 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-brand-green-700/40 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="NutriLoop Africa" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          This page doesn't exist.
        </h1>
        <p className="text-white/50 leading-relaxed mb-10">
          But Kenya's organic waste crisis does — and we're solving it. Let's
          get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold text-sm transition-all hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400"
          >
            <Home size={15} /> Back to home
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/14 border border-white/12 text-white font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Partner with us <ArrowRight size={15} />
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-white/8">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4 font-semibold">
            Popular pages
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Our Solution', href: '/solution' },
              { label: 'Products', href: '/products' },
              { label: 'Impact', href: '/impact' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-medium text-white/40 hover:text-white/80 transition-colors px-3 py-1.5 rounded-lg border border-white/8 hover:border-white/20"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
