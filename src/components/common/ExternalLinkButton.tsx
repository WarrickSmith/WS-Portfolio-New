import { cn } from '../../lib/cn'
import FaIcon from './FaIcon'

type ExternalLinkButtonProps = {
  href: string
  label: string
  ariaLabel: string
  variant?: 'primary' | 'secondary'
  className?: string
}

const ExternalLinkButton = ({
  href,
  label,
  ariaLabel,
  variant = 'secondary',
  className,
}: ExternalLinkButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex min-h-11 items-center gap-2 rounded-radius-sm border px-4 py-2 text-body-sm font-semibold no-underline transition-[border-color,background-color,color,box-shadow] duration-150 focus-visible:outline-none focus-visible:shadow-focus-ring',
        variant === 'primary'
          ? 'border-border-accent text-text-accent hover:bg-accent-primary-soft active:bg-accent-primary-soft'
          : 'border-border-subtle text-text-secondary hover:border-border-hover hover:bg-bg-card-hover hover:text-text-primary active:bg-bg-card-hover',
        className
      )}
    >
      <span>{label}</span>
      <FaIcon icon="faArrowUpRightFromSquare" className="text-caption" />
    </a>
  )
}

export default ExternalLinkButton
