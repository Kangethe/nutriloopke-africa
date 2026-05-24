'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Logo } from './Logo'
import { NAV_ITEMS } from '@/lib/data/navigation'
import type { NavItem } from '@/lib/data/navigation'
import { useScrollY } from '@/lib/hooks/useScrollY'

export default function Navbar() {
  const scrollY = useScrollY()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isScrolled = scrollY > 60
  const isHome = pathname === '/'

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const navbarClass = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled || !isHome
      ? 'bg-brand-dark/90 backdrop-blur-xl border-b border-brand-green-900/40 shadow-lg shadow-black/20'
      : 'bg-transparent'
  )

  const linkClass = cn(
    'text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded-md px-0.5',
    isScrolled || !isHome
      ? 'text-white/80 hover:text-white'
      : 'text-white/90 hover:text-white'
  )

  const isActive = (href?: string) =>
    href ? pathname === href || pathname.startsWith(href + '/') : false

  return (
    <>
      <nav className={navbarClass} role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Logo */}
            <Logo variant="white" size="md" />

            {/* Desktop nav */}
            <div
              ref={dropdownRef}
              className="hidden lg:flex items-center gap-1"
            >
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      className={cn(
                        linkClass,
                        'flex items-center gap-1 py-1 rounded-md',
                        item.children.some((c) => isActive(c.href)) && 'text-brand-green-300'
                      )}
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      }
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          activeDropdown === item.label && 'rotate-180'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        linkClass,
                        'py-1 block rounded-md',
                        isActive(item.href) && 'text-brand-green-300'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-brand-dark/95 backdrop-blur-xl border border-brand-green-900/40 shadow-2xl shadow-black/30 overflow-hidden"
                      >
                        <div className="p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'group flex flex-col gap-0.5 px-3 py-2.5 rounded-xl transition-colors duration-150',
                                'hover:bg-brand-green-900/40',
                                isActive(child.href) && 'bg-brand-green-900/30'
                              )}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-sm font-semibold text-white group-hover:text-brand-green-300 transition-colors">
                                {child.label}
                              </span>
                              <span className="text-xs text-white/50">{child.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA + Mobile trigger */}
            <div className="flex items-center gap-3">
              <Link
                href="/apply"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white text-sm font-semibold transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-brand-amber-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber-500"
              >
                Apply / Partner
                <ArrowUpRight size={14} />
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,100vw)] bg-brand-dark border-l border-brand-green-900/50 lg:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-green-900/30">
                <Logo variant="white" size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item, i) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    isActive={isActive}
                    index={i}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="px-4 pb-8 pt-2">
                <Link
                  href="/apply"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Apply / Partner
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Mobile Nav Item ────────────────────────────────────────────────────────────
function MobileNavItem({
  item,
  isActive,
  index,
  onClose,
}: {
  item: NavItem
  isActive: (href?: string) => boolean
  index: number
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)

  if (!item.children) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04 + 0.1, duration: 0.2 }}
      >
        <Link
          href={item.href!}
          onClick={onClose}
          className={cn(
            'flex items-center px-3 py-3 rounded-xl text-base font-medium transition-colors',
            isActive(item.href)
              ? 'bg-brand-green-900/40 text-brand-green-300'
              : 'text-white/80 hover:text-white hover:bg-white/8'
          )}
        >
          {item.label}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 + 0.1, duration: 0.2 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-base font-medium text-white/80 hover:text-white hover:bg-white/8 transition-colors"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-200 text-white/50', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-3 pb-1 space-y-0.5">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className={cn(
                    'block px-3 py-2.5 rounded-xl transition-colors',
                    isActive(child.href)
                      ? 'bg-brand-green-900/40 text-brand-green-300'
                      : 'text-white/70 hover:text-white hover:bg-white/8'
                  )}
                >
                  <div className="text-sm font-semibold">{child.label}</div>
                  <div className="text-xs text-white/40 mt-0.5">{child.desc}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
