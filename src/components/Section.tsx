import {type ReactNode} from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
}

/**
 * Reusable full-width section with cinematic vertical spacing.
 */
export default function Section({children, className = ''}: SectionProps) {
  return <section className={`section-gap ${className}`}>{children}</section>
}
