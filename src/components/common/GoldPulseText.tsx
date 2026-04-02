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
      className={cn(
        'inline-flex items-center justify-center uppercase',
        pulse && 'motion-safe:animate-gold-pulse',
        pulse &&
          'motion-reduce:[text-shadow:0_0_18px_oklch(from_#ffb400_l_c_h_/_35%)]',
        className
      )}
    >
      {children}
    </span>
  )
}

export default GoldPulseText
