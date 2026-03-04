import Link from 'next/link'
import {type ReactNode} from 'react'

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  external?: boolean
  className?: string
}

/**
 * Reusable styled button / link.
 * variant="primary"  → orange filled
 * variant="outline"  → orange border + text
 * variant="ghost"    → text only with underline
 */
export default function Button({
  href,
  onClick,
  children,
  variant = 'outline',
  external = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer'

  const variants = {
    primary:
      'px-7 py-3 bg-orange text-white hover:bg-orange-dim animate-glow-pulse',
    outline:
      'px-7 py-3 border border-orange text-orange hover:bg-orange hover:text-white',
    ghost: 'text-muted hover:text-text underline-offset-4 hover:underline',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
