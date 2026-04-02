import type { ReactNode } from 'react'
import FaIcon from './FaIcon'
import GoldPulseText from './GoldPulseText'

type CardPreviewProps = {
  description: string
  icon: string
  title: ReactNode
}

const CardPreview = ({ description, icon, title }: CardPreviewProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 p-6 tablet:p-8 desktop:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle bg-bg-surface text-xl text-text-accent">
        <FaIcon icon={icon} />
      </div>
      <div className="space-y-3">
        <GoldPulseText className="justify-start text-2xl leading-[1.3] tracking-[-0.01em] font-semibold">
          {title}
        </GoldPulseText>
        <p className="max-w-[26ch] text-body-sm font-normal text-text-secondary">
          {description}
        </p>
      </div>
    </div>
  )
}

export default CardPreview
