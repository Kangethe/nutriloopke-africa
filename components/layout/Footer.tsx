import Link from 'next/link'
import { Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'
import { Logo } from './Logo'
import { NewsletterInput } from '@/components/forms/NewsletterInput'
import { FOOTER_LINKS } from '@/lib/data/navigation'

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/nutriloop-africa', Icon: Linkedin },
  { label: 'Instagram', href: 'https://instagram.com/nutriloopAfrica', Icon: Instagram },
  { label: 'X / Twitter', href: 'https://twitter.com/NutriLoopAfrica', Icon: Twitter },
  { label: 'YouTube', href: 'https://youtube.com/@NutriLoopAfrica', Icon: Youtube },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#050E05] border-t border-brand-green-950/60" role="contentinfo">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo variant="white" size="md" />
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              Closing the loop on Kenya's food system. We convert Nairobi's organic waste into Black Soldier Fly protein and frass fertiliser — in 14 days, at 50%+ margin.
            </p>

            {/* Newsletter */}
            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2.5">
                Get updates
              </p>
              <NewsletterInput variant="dark" source="footer" />
              <p className="mt-2 text-xs text-white/30">
                Impact data, milestones, and BSF science. No spam.
              </p>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/6 hover:bg-brand-green-800/50 text-white/50 hover:text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap columns */}
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Solutions" links={FOOTER_LINKS.solutions} />
          <FooterColumn title="Partners" links={FOOTER_LINKS.partners} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30 text-center sm:text-left">
            © {year} NutriLoop Africa Ltd · Nairobi, Kenya
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span className="opacity-50">NEMA Licence: Pending (Year 1)</span>
            <span className="w-px h-3 bg-white/20" aria-hidden />
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/55 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-green-400 rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
