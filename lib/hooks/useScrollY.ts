'use client'
import { useState, useEffect } from 'react'

/**
 * Returns current window scroll Y position.
 * Returns 0 on server (SSR safe).
 * Throttled to rAF for performance.
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Set initial value
    setScrollY(window.scrollY)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollY
}
