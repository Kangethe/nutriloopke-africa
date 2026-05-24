import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsLink = ButtonBaseProps & {
  href: string
  external?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-amber-700 hover:bg-brand-amber-800 text-white shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0',
  secondary:
    'bg-transparent border-2 border-white/60 hover:border-white hover:bg-white/10 text-white',
  ghost:
    'bg-transparent hover:bg-brand-green-50 text-brand-green-800 hover:text-brand-green-900',
  outline:
    'bg-transparent border-2 border-brand-green-700 hover:bg-brand-green-700 text-brand-green-700 hover:text-white',
  dark:
    'bg-brand-dark hover:bg-black text-white shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-[0.9375rem] rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const classes = cn(base, variantClasses[variant], sizeClasses[size], className)

    if ('href' in props && props.href !== undefined) {
      const { href, external, ...rest } = props as ButtonAsLink & { href: string; external?: boolean }
      if (external) {
        return (
          <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className={classes} {...(rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}>
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled ?? loading}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
