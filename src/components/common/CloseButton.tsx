import { cn } from '../../lib/cn'

type CloseButtonProps = {
  onClick: () => void
  className?: string
}

const CloseButton = ({ onClick, className }: CloseButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Close"
    className={cn(
      'fixed top-6 right-6 z-30 flex h-8 w-8 items-center justify-center rounded-radius-sm',
      'border border-border-subtle bg-bg-elevated text-lg leading-none text-text-secondary',
      'cursor-pointer transition-colors duration-150 hover:border-border-hover hover:text-text-primary',
      'focus-visible:border-border-accent focus-visible:shadow-focus-ring',
      className
    )}
  >
    &times;
  </button>
)

export { CloseButton }

export default CloseButton
