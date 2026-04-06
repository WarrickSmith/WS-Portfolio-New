type TechBadgeProps = {
  label: string
}

const TechBadge = ({ label }: TechBadgeProps) => {
  return (
    <span className="inline-flex min-h-9 items-center rounded-full border border-border-hover bg-bg-card-hover px-3 py-1.5 font-mono text-body-sm font-medium tracking-[0.02em] text-text-primary">
      {label}
    </span>
  )
}

export default TechBadge
