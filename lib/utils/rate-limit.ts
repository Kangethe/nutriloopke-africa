import type { RateLimitResult } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// In-Memory Sliding Window Rate Limiter
//
// This implementation uses an in-memory Map and works correctly for:
// - Local development (single process)
// - Single-instance deployments
//
// For Vercel serverless (multi-instance), upgrade to Upstash Redis:
// npm install @upstash/ratelimit @upstash/redis
// See: https://github.com/upstash/ratelimit-js
// ─────────────────────────────────────────────────────────────────────────────

interface RateLimitEntry {
  requests: number[]  // Timestamps of requests in the current window
  blocked: boolean
  blockedUntil?: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    // Remove entries with no recent requests and not blocked
    const hasRecentRequests = entry.requests.some((ts) => ts > now - 60_000)
    const isStillBlocked = entry.blocked && (entry.blockedUntil ?? 0) > now
    if (!hasRecentRequests && !isStillBlocked) {
      store.delete(key)
    }
  }
}, CLEANUP_INTERVAL_MS)

/**
 * Sliding window rate limiter.
 *
 * @param identifier - Unique key, typically IP + route (e.g. "1.2.3.4:/api/apply")
 * @param limit - Max requests allowed in the window
 * @param windowMs - Window duration in milliseconds
 * @returns RateLimitResult with success flag and metadata
 */
export function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()
  const windowStart = now - windowMs

  let entry = store.get(identifier)

  if (!entry) {
    entry = { requests: [], blocked: false }
    store.set(identifier, entry)
  }

  // If currently blocked, check if block has expired
  if (entry.blocked && entry.blockedUntil) {
    if (now < entry.blockedUntil) {
      return {
        success: false,
        limit,
        remaining: 0,
        reset: entry.blockedUntil,
      }
    } else {
      // Block expired — reset
      entry.blocked = false
      entry.blockedUntil = undefined
      entry.requests = []
    }
  }

  // Remove requests outside the current window
  entry.requests = entry.requests.filter((ts) => ts > windowStart)

  // Check if limit exceeded
  if (entry.requests.length >= limit) {
    // Block for the duration of one full window
    entry.blocked = true
    entry.blockedUntil = now + windowMs
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.blockedUntil,
    }
  }

  // Record this request
  entry.requests.push(now)

  return {
    success: true,
    limit,
    remaining: limit - entry.requests.length,
    reset: windowStart + windowMs,
  }
}

// ── Pre-configured limiters for each route ────────────────────────────────────

/**
 * Apply form: 5 submissions per 10 minutes per IP
 */
export function rateLimitApply(ip: string): RateLimitResult {
  return rateLimit(`apply:${ip}`, 5, 10 * 60 * 1000)
}

/**
 * Contact form: 3 submissions per 5 minutes per IP
 */
export function rateLimitContact(ip: string): RateLimitResult {
  return rateLimit(`contact:${ip}`, 3, 5 * 60 * 1000)
}

/**
 * Newsletter: 3 subscriptions per 5 minutes per IP
 */
export function rateLimitNewsletter(ip: string): RateLimitResult {
  return rateLimit(`newsletter:${ip}`, 3, 5 * 60 * 1000)
}
