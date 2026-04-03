import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type GoldPulseTextProps = {
  children: ReactNode
  className?: string
  pulse?: boolean
}

const GoldPulseText = ({
  children,
  className,
  pulse = false,
}: GoldPulseTextProps) => {
  return (
    <span
      data-gold-pulse-text={pulse ? 'true' : undefined}
      className={cn(
        'inline-flex items-center justify-center uppercase [text-shadow:var(--text-shadow-gold-rest)] transition-[text-shadow] duration-[500ms] ease-[var(--ease-standard)] motion-reduce:transition-none',
        pulse &&
          'motion-safe:pointer-fine:group-hover/card:[text-shadow:var(--text-shadow-gold-hover)] motion-safe:group-data-[hover-phase=animating]/card:animate-gold-pulse motion-reduce:pointer-fine:group-hover/card:[text-shadow:var(--text-shadow-gold-hover)]',
        className
      )}
    >
      {children}
    </span>
  )
}

export default GoldPulseText
