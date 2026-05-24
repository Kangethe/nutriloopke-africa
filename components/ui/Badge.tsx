import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'green' | 'amber' | 'brown' | 'dark' | 'outline' | 'white'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  green:
    'bg-brand-green-50 text-brand-green-800 border border-brand-green-200',
  amber:
    'bg-amber-50 text-amber-800 border border-amber-200',
  brown:
    'bg-brand-brown-50 text-brand-brown-700 border border-brand-brown-200',
  dark:
    'bg-brand-dark text-white border border-brand-green-800',
  outline:
    'bg-transparent text-brand-green-700 border border-brand-green-300',
  white:
    'bg-white/15 text-white border border-white/25 backdrop-blur-sm',
}

export function Badge({ variant = 'green', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: 'currentColor' }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
