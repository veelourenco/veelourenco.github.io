import {type ReactNode} from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

const sizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-7xl',
  full: 'max-w-none',
}

/**
 * Reusable centered container with responsive horizontal padding.
 */
export default function Container({children, className = '', size = 'lg'}: ContainerProps) {
  return (
    <div className={`mx-auto px-6 md:px-10 ${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}
