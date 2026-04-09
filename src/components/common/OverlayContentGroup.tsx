import { motion, type Transition, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type OverlayContentSlot = 'heading' | 'body' | 'actions'

type OverlayContentGroupProps = {
  children: ReactNode
  className?: string
  slot: OverlayContentSlot
}

const slotDelay: Record<OverlayContentSlot, number> = {
  heading: 0,
  body: 0.1,
  actions: 0.2,
}

const reducedMotionTransition: Transition = {
  duration: 0,
  ease: 'linear',
}

const OverlayContentGroup = ({
  children,
  className,
  slot,
}: OverlayContentGroupProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 0 }}
      transition={
        prefersReducedMotion
          ? reducedMotionTransition
          : {
              type: 'spring',
              stiffness: 280,
              damping: 30,
              mass: 0.85,
              delay: slotDelay[slot],
              visualDuration: 0.34,
            }
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default OverlayContentGroup
