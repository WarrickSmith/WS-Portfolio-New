import { cn } from '../../lib/cn'

type BaseSkillBadgeProps = {
  label: string
  className?: string
}

type DefaultSkillBadgeProps = BaseSkillBadgeProps & {
  variant?: 'default'
}

type LinkedSkillBadgeProps = BaseSkillBadgeProps & {
  variant: 'linked'
  ariaLabel: string
  onClick: () => void
}

export type SkillBadgeProps = DefaultSkillBadgeProps | LinkedSkillBadgeProps

const baseClassName =
  'inline-flex min-h-11 items-center rounded-full border px-3 py-2 text-left font-mono text-caption font-medium tracking-[0.02em] transition-[border-color,background-color,color,box-shadow] duration-150 focus-visible:outline-none'

const SkillBadge = (props: SkillBadgeProps) => {
  const { label, className } = props

  if (props.variant === 'linked') {
    const { ariaLabel, onClick } = props

    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={cn(
          baseClassName,
          'cursor-pointer border-border-accent bg-bg-card text-text-accent hover:bg-accent-primary-soft focus-visible:shadow-focus-ring active:bg-accent-primary-soft',
          className
        )}
      >
        {label}
      </button>
    )
  }

  return (
    <span
      className={cn(
        baseClassName,
        'border-border-subtle bg-bg-card-hover text-text-secondary',
        className
      )}
    >
      {label}
    </span>
  )
}

export default SkillBadge
