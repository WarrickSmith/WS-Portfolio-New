import {
  type AnimationEvent as ReactAnimationEvent,
  forwardRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useState,
} from 'react'
import type { HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/cn'
import ExpandableItem, { type ExpandableItemPreset } from './ExpandableItem'

type CardProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  className?: string
  closeRequestKey?: number
  expansionPreset?: ExpandableItemPreset
  interactive?: boolean
  onOverlayExitComplete?: () => void
  overlay?: ReactNode
  opened?: boolean
}

const DEFAULT_POINTER_POSITION = '50%'

type HoverPhase = 'idle' | 'animating' | 'holding'

const supportsFineHoverPointer = () => {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      closeRequestKey = 0,
      expansionPreset,
      interactive = true,
      onOverlayExitComplete,
      overlay,
      opened = false,
      onAnimationEnd,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      style,
      ...props
    },
    ref
  ) => {
    const previewInteractive = interactive && !opened
    const hoverCapablePointer = previewInteractive && supportsFineHoverPointer()
    const reducedMotion = previewInteractive && prefersReducedMotion()
    const [hoverPhase, setHoverPhase] = useState<HoverPhase>('idle')

    useEffect(() => {
      if (!previewInteractive && hoverPhase !== 'idle') {
        setHoverPhase('idle')
      }
    }, [hoverPhase, previewInteractive])

    const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
      onPointerEnter?.(event)

      if (!hoverCapablePointer) return

      setHoverPhase(reducedMotion ? 'holding' : 'animating')
    }

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event)

      if (!hoverCapablePointer) return

      const bounds = event.currentTarget.getBoundingClientRect()
      const x = `${event.clientX - bounds.left}px`
      const y = `${event.clientY - bounds.top}px`

      event.currentTarget.style.setProperty('--mx', x)
      event.currentTarget.style.setProperty('--my', y)
    }

    const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(event)

      if (!hoverCapablePointer) return

      setHoverPhase('idle')
      event.currentTarget.style.setProperty('--mx', DEFAULT_POINTER_POSITION)
      event.currentTarget.style.setProperty('--my', DEFAULT_POINTER_POSITION)
    }

    const handleAnimationEnd = (event: ReactAnimationEvent<HTMLDivElement>) => {
      onAnimationEnd?.(event)

      if (!hoverCapablePointer || reducedMotion) return

      if (!(event.target instanceof HTMLElement)) return
      if (event.target.dataset.goldPulseText !== 'true') return

      setHoverPhase('holding')
    }

    return (
      <ExpandableItem
        ref={ref}
        closeRequestKey={closeRequestKey}
        data-hover-phase={hoverPhase}
        data-opened={opened ? 'true' : 'false'}
        expanded={opened}
        className={cn(
          'relative flex h-full w-full overflow-hidden rounded-lg border border-border-subtle bg-gradient-to-br from-bg-card to-bg-card-deep shadow-[var(--shadow-ambient)]',
          interactive &&
            'group/card isolate transition-[border-color,box-shadow] duration-[400ms] ease-[var(--ease-standard)] motion-reduce:transition-none',
          previewInteractive &&
            'cursor-pointer pointer-fine:hover:border-border-hover pointer-fine:hover:shadow-[var(--shadow-card-hover)] pointer-coarse:active:border-border-accent pointer-coarse:active:shadow-[var(--shadow-touch-feedback)]',
          className,
          opened &&
            'fixed z-20 items-stretch justify-start overflow-hidden border-transparent bg-bg-expanded bg-none shadow-[var(--shadow-elevated)]'
        )}
        onOverlayExitComplete={onOverlayExitComplete}
        onAnimationEnd={handleAnimationEnd}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        overlay={overlay}
        preset={expansionPreset}
        style={style}
        {...props}
      >
        {interactive ? (
          <>
            <div
              aria-hidden="true"
              className="card-hover-corner-bleed pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-[500ms] ease-[var(--ease-standard)] motion-safe:pointer-fine:group-hover/card:opacity-100 motion-reduce:opacity-0 motion-reduce:transition-none group-data-[opened=true]/card:!opacity-0"
            />
            <div
              aria-hidden="true"
              className="card-hover-radial pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-[500ms] ease-[var(--ease-standard)] motion-safe:pointer-fine:group-hover/card:opacity-100 motion-reduce:opacity-0 motion-reduce:transition-none group-data-[opened=true]/card:!opacity-0"
            />
            <div
              aria-hidden="true"
              className="card-hover-sheen pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-[500ms] ease-[var(--ease-standard)] motion-safe:pointer-fine:group-hover/card:opacity-100 motion-reduce:opacity-0 motion-reduce:transition-none group-data-[opened=true]/card:!opacity-0"
            />
          </>
        ) : null}
        <div
          className={cn(
            'relative z-10 h-full w-full',
            interactive &&
              '[transform:translateZ(0)] transition-transform duration-[400ms] ease-[var(--ease-standard)] motion-safe:pointer-fine:group-hover/card:[transform:translateZ(0)_scale(1.02)] motion-reduce:[transform:none] motion-reduce:transition-none group-data-[opened=true]/card:![transform:translateZ(0)]'
          )}
        >
          {!opened ? children : null}
        </div>
      </ExpandableItem>
    )
  }
)

Card.displayName = 'Card'

export default Card
