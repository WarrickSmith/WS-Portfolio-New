import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/cn'

type CardProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  className?: string
  interactive?: boolean
  opened?: boolean
}

const Card = ({
  children,
  className,
  interactive = true,
  opened = false,
  style,
  ...props
}: CardProps) => {
  return (
    <motion.div
      className={cn(
        'relative flex h-full w-full overflow-hidden rounded-lg border border-border-subtle bg-gradient-to-br from-bg-card to-bg-card-deep shadow-[var(--shadow-ambient)]',
        interactive && !opened && 'cursor-pointer',
        className,
        opened &&
          'fixed inset-x-3 inset-y-3 z-20 justify-start items-start overflow-y-auto bg-bg-expanded bg-none shadow-[var(--shadow-elevated)] tablet:inset-x-4 tablet:inset-y-4 desktop:left-auto desktop:w-[calc(65.8vw-1rem)]'
      )}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
