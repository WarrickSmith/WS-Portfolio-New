import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type CardGridProps = {
  children: ReactNode
  className?: string
}

const CardGrid = ({ children, className }: CardGridProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={cn(
          'grid h-[70vh] w-[85vw] grid-cols-3 grid-rows-2 gap-spacing-12',
          'max-[1000.98px]:w-[90vw] max-[1000.98px]:grid-cols-2 max-[1000.98px]:gap-spacing-8',
          'max-[768.98px]:h-auto max-[768.98px]:grid-cols-1 max-[768.98px]:gap-spacing-6',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default CardGrid
