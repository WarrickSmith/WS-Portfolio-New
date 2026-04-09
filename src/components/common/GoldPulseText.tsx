import type { JSX, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type GoldPulseTextProps = {
  as?: keyof JSX.IntrinsicElements
  children: ReactNode
  className?: string
  pulse?: boolean
}

const GoldPulseText = ({
  as: Component = 'span',
  children,
  className,
  pulse = false,
}: GoldPulseTextProps) => {
  return (
    <Component
      data-gold-pulse-text={pulse ? 'true' : undefined}
      className={cn(
        'm-0 inline-flex flex-wrap items-center justify-center uppercase [text-shadow:var(--text-shadow-gold-rest)] transition-[text-shadow] duration-[500ms] ease-[var(--ease-standard)] motion-reduce:transition-none motion-reduce:[text-shadow:var(--text-shadow-gold-hover)]',
        pulse &&
          'motion-safe:pointer-fine:group-hover/card:[text-shadow:var(--text-shadow-gold-hover)] motion-safe:group-data-[hover-phase=animating]/card:animate-gold-pulse motion-reduce:pointer-fine:group-hover/card:[text-shadow:var(--text-shadow-gold-hover)]',
        className
      )}
    >
      {children}
    </Component>
  )
}

export default GoldPulseText
