type TechBadgeProps = {
  label: string
}

const TechBadge = ({ label }: TechBadgeProps) => {
  return (
    <span className="inline-flex min-h-8 items-center rounded-full border border-border-subtle bg-bg-card-deep px-2.5 py-1 font-mono text-caption font-medium tracking-[0.02em] text-text-tertiary">
      {label}
    </span>
  )
}

export default TechBadge
