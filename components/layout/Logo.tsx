import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface LogoProps {
  variant?: 'default' | 'white'
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  className?: string
  linkClassName?: string
}

const sizeMark = {
  sm: 32,
  md: 40,
  lg: 52,
}

const sizeText = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
}

export function Logo({
  variant = 'default',
  size = 'md',
  showWordmark = true,
  className,
  linkClassName,
}: LogoProps) {
  const markSize = sizeMark[size]

  return (
    <Link
      href="/"
      aria-label="NutriLoop Africa — home"
      className={cn('inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded-lg', linkClassName)}
    >
      <div
        className={cn(
          'relative flex-shrink-0 rounded-full overflow-hidden',
          // Give the circular logo a subtle ring on dark backgrounds
          variant === 'white' && 'ring-1 ring-white/20',
          className
        )}
        style={{ width: markSize, height: markSize }}
      >
        <Image
          src="/logo.png"
          alt="NutriLoop Africa logo mark — larva, leaf, recycling circle"
          width={markSize}
          height={markSize}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              'font-bold tracking-tight',
              sizeText[size],
              variant === 'white' ? 'text-white' : 'text-brand-green-900'
            )}
          >
            NutriLoop
          </span>
          <span
            className={cn(
              'font-medium tracking-widest uppercase',
              size === 'sm' ? 'text-[9px]' : size === 'md' ? 'text-[10px]' : 'text-[11px]',
              variant === 'white' ? 'text-brand-green-300' : 'text-brand-green-600'
            )}
          >
            Africa
          </span>
        </div>
      )}
    </Link>
  )
}
