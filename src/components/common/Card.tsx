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
        'relative flex h-full w-full overflow-hidden rounded-radius-lg border border-border-subtle bg-bg-card',
        interactive && !opened && 'cursor-pointer',
        className,
        opened &&
          'fixed inset-0 z-20 mt-4 mr-4 ml-auto w-[calc(65.8vw-1rem)] h-[calc(100vh-2rem)] justify-start items-start overflow-y-auto max-[1000.98px]:m-auto max-[1000.98px]:w-[calc(100vw-1.5rem)] max-[1000.98px]:h-[calc(100vh-1.5rem)]'
      )}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
