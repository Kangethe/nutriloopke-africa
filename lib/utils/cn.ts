import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes safely, resolving conflicts correctly.
 * Uses clsx for conditional logic and tailwind-merge for conflict resolution.
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-green-500', 'px-4')
 * // → 'py-1 bg-green-500 px-4' (px-2 removed, px-4 wins)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
