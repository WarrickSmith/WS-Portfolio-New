import { forwardRef, type MouseEvent } from 'react'
import { cn } from '../../lib/cn'

type CloseButtonProps = {
  onClick: () => void
  className?: string
}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ onClick, className }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        onClick()
      }}
      aria-label="Close"
      className={cn(
        'absolute top-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-sm',
        'border border-border-subtle bg-bg-elevated text-[1.75rem] leading-none text-text-secondary',
        'cursor-pointer transition-colors duration-150 hover:border-border-hover hover:text-text-primary',
        'focus-visible:border-border-accent focus-visible:shadow-focus-ring',
        className
      )}
    >
      &times;
    </button>
  )
)

CloseButton.displayName = 'CloseButton'

export { CloseButton }

export default CloseButton
