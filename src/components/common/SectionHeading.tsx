import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type SectionHeadingProps = {
  children: ReactNode
  className?: string
}

const SectionHeading = ({ children, className }: SectionHeadingProps) => {
  return (
    <h3
      className={cn(
        'mb-spacing-3 text-h3 font-semibold text-text-accent',
        className
      )}
    >
      {children}
    </h3>
  )
}

export default SectionHeading
