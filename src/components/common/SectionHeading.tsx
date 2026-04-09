import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type SectionHeadingProps = {
  children: ReactNode
  className?: string
}

const SectionHeading = ({ children, className }: SectionHeadingProps) => {
  return (
    <h2
      className={cn(
        'mb-spacing-3 text-h3 font-semibold text-text-accent',
        className
      )}
    >
      {children}
    </h2>
  )
}

export default SectionHeading
