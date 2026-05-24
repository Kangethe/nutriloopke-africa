'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

// Live waste ticker — Kenya generates ~22,000t/day = ~0.2546 kg/second
const DAILY_TONNES = 22000
const KG_PER_SECOND = (DAILY_TONNES * 1000) / 86400

function useLiveWasteTicker() {
  const [kg, setKg] = useState(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    // Start from a random point in today's "accumulation" for drama
    const nowMs = Date.now()
    const midnight = new Date()
    midnight.setHours(0, 0, 0, 0)
    const secondsSinceMidnight = (nowMs - midnight.getTime()) / 1000
    const startKg = secondsSinceMidnight * KG_PER_SECOND
    startRef.current = performance.now() - secondsSinceMidnight * 1000

    const update = (now: number) => {
      const elapsed = (now - (startRef.current ?? now)) / 1000
      setKg(Math.floor(elapsed * KG_PER_SECOND + startKg))
      requestAnimationFrame(update)
    }
    const raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return kg
}

export function HeroSection() {
  const wasteKg = useLiveWasteTicker()

  const formatted = wasteKg.toLocaleString('en-KE')

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-dark"
      aria-label="NutriLoop Africa hero"
    >
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,125,50,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(184,92,0,0.08) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green-900/40 border border-brand-green-700/40 text-brand-green-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green-400 animate-pulse" aria-hidden />
            ICIPE-backed science · Nairobi, Kenya
          </span>
        </motion.div>

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-brand-green-700/40 shadow-2xl shadow-brand-green-900/30">
            <Image src="/logo.png" alt="NutriLoop Africa" fill className="object-cover" priority />
          </div>
        </motion.div>

        {/* Hero headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.6rem] sm:text-6xl lg:text-[5.25rem] font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          <span className="block text-brand-green-300">Kenya's waste</span>
          <span className="block">is its next</span>
          <span className="block text-brand-amber-400">protein source.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-white/60 leading-relaxed mb-10"
        >
          NutriLoop Africa converts organic waste from Nairobi's hotels, markets, and food businesses into BSF protein meal and frass fertiliser —{' '}
          <span className="text-white/90 font-medium">in 14 days, at 50%+ margin.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-amber-700 hover:bg-brand-amber-800 text-white font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-amber-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            Partner with us
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/solution"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/8 hover:bg-white/14 border border-white/15 hover:border-white/25 text-white font-semibold text-base transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            See how it works
          </Link>
        </motion.div>

        {/* Live waste ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-block"
          aria-live="polite"
          aria-label={`Kenya has generated ${formatted} kg of organic waste today`}
        >
          <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1.5">
              Kenya organic waste generated today
            </p>
            <p className="font-mono text-3xl sm:text-4xl font-semibold text-brand-amber-400 tabular-nums">
              {formatted}
              <span className="ml-2 text-base font-normal text-white/50">kg</span>
            </p>
            <p className="text-xs text-white/30 mt-1.5">
              Live counter · Resets at midnight EAT
            </p>
          </div>
        </motion.div>
      </div>

      {/* Glassmorphism stat cards at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: '22,000+', label: 'tonnes waste / day', sub: 'Kenya national' },
            { value: '60%', label: 'feed imported', sub: 'livestock dependency' },
            { value: '14 days', label: 'to protein', sub: 'BSF bioconversion' },
            { value: '50%+', label: 'gross margin', sub: 'CGIAR verified' },
          ].map(({ value, label, sub }) => (
            <div
              key={label}
              className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-4 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <p className="font-mono text-xl sm:text-2xl font-semibold text-brand-amber-400 tabular-nums leading-none mb-1.5">
                {value}
              </p>
              <p className="text-xs font-medium text-white/80 leading-snug">{label}</p>
              <p className="text-[10px] text-white/35 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/25"
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  )
}
