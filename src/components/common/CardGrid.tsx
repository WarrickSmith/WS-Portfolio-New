import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import AmbientBackground from './AmbientBackground'

type CardGridProps = {
  children: ReactNode
  className?: string
}

const CardGrid = ({ children, className }: CardGridProps) => {
  return (
    <main
      aria-label="Portfolio"
      className="relative min-h-screen bg-bg-base px-6 py-6 tablet:px-8 tablet:py-8 desktop:px-12 desktop:py-12"
    >
      <AmbientBackground />
      <div
        className={cn(
          'relative z-[1] mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-[96rem] grid-cols-1 gap-6',
          'tablet:min-h-[calc(100vh-4rem)] tablet:grid-cols-2 tablet:gap-8',
          'desktop:min-h-[calc(100vh-6rem)] desktop:grid-cols-3 desktop:grid-rows-2 desktop:gap-12',
          className
        )}
      >
        {children}
      </div>
    </main>
  )
}

export default CardGrid
