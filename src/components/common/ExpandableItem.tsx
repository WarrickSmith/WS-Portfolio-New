import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
  useReducedMotion,
} from 'framer-motion'
import {
  forwardRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '../../lib/cn'

export type ExpandableItemPreset = {
  id: string
  surfaceClassName?: string
  layoutTransition: Transition
  overlayMotion: {
    className?: string
    initial: HTMLMotionProps<'div'>['initial']
    animate: HTMLMotionProps<'div'>['animate']
    exit: HTMLMotionProps<'div'>['exit']
    transition: Transition
  }
}

type ExpandableItemProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  expanded?: boolean
  overlay?: ReactNode
  closeRequestKey?: number
  onOverlayExitComplete?: () => void
  preset?: ExpandableItemPreset
}

const DEFAULT_LAYOUT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 220,
  damping: 26,
  mass: 0.95,
  visualDuration: 0.5,
}

const DEFAULT_OVERLAY_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 28,
  mass: 0.9,
  visualDuration: 0.42,
}

const REDUCED_MOTION_LAYOUT_TRANSITION: Transition = {
  duration: 0,
}

const REDUCED_MOTION_OVERLAY_TRANSITION: Transition = {
  duration: 0,
  ease: 'linear',
}

const ExpandableItem = forwardRef<HTMLDivElement, ExpandableItemProps>(
  (
    {
      children,
      className,
      closeRequestKey = 0,
      expanded = false,
      layout = true,
      onOverlayExitComplete,
      overlay,
      preset,
      transition,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const [overlayVisible, setOverlayVisible] = useState(expanded)
    const handledCloseRequestRef = useRef(closeRequestKey)
    const wasExpandedRef = useRef(expanded)

    useEffect(() => {
      if (!expanded) {
        setOverlayVisible(false)
        wasExpandedRef.current = false
        return
      }

      if (!wasExpandedRef.current) {
        handledCloseRequestRef.current = closeRequestKey
        setOverlayVisible(true)
      }

      wasExpandedRef.current = true
    }, [closeRequestKey, expanded])

    useEffect(() => {
      if (!expanded) return
      if (closeRequestKey === handledCloseRequestRef.current) return

      handledCloseRequestRef.current = closeRequestKey
      setOverlayVisible(false)
    }, [closeRequestKey, expanded])

    const layoutTransition = prefersReducedMotion
      ? REDUCED_MOTION_LAYOUT_TRANSITION
      : preset?.layoutTransition ?? DEFAULT_LAYOUT_TRANSITION

    const overlayMotion = prefersReducedMotion
      ? {
          className: preset?.overlayMotion.className,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: REDUCED_MOTION_OVERLAY_TRANSITION,
        }
      : preset?.overlayMotion ?? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -16 },
          transition: DEFAULT_OVERLAY_TRANSITION,
        }

    return (
      <motion.div
        ref={ref}
        layout={layout}
        transition={{
          ...transition,
          layout: layoutTransition,
        }}
        className={cn(preset?.surfaceClassName, className)}
        {...props}
      >
        {children}
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => {
            if (expanded && !overlayVisible) {
              onOverlayExitComplete?.()
            }
          }}
        >
          {expanded && overlayVisible && overlay ? (
            <motion.div
              key="expanded-overlay"
              initial={overlayMotion.initial}
              animate={overlayMotion.animate}
              exit={overlayMotion.exit}
              transition={overlayMotion.transition}
              className={cn(
                'absolute inset-0 z-20',
                prefersReducedMotion ? 'will-change-auto' : 'will-change-transform',
                overlayMotion.className
              )}
            >
              {overlay}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    )
  }
)

ExpandableItem.displayName = 'ExpandableItem'

export default ExpandableItem
