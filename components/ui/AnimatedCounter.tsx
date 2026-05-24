'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  prefix?: string
  unit?: string
  suffix?: string
  separator?: boolean
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2200,
  delay = 0,
  prefix,
  unit,
  suffix,
  separator = true,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return
    hasStarted.current = true

    const timer = window.setTimeout(() => {
      const startTime = performance.now()

      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(value * eased)
        setCount(current)
        if (progress < 1) {
          window.requestAnimationFrame(tick)
        }
      }

      window.requestAnimationFrame(tick)
    }, delay)

    return () => window.clearTimeout(timer)
  }, [isInView, value, duration, delay])

  const formatted = separator
    ? count.toLocaleString('en-KE')
    : count.toString()

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix && <span className="mr-0.5">{prefix}</span>}
      {formatted}
      {suffix && <span>{suffix}</span>}
      {unit && (
        <span className="ml-1.5 text-[0.55em] font-normal tracking-wide opacity-80">
          {unit}
        </span>
      )}
    </span>
  )
}
