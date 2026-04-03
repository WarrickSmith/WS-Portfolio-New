import type { ReactNode } from 'react'
import CloseButton from './CloseButton'

type CardExpansionOverlayProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

const CardExpansionOverlay = ({
  title,
  onClose,
  children,
}: CardExpansionOverlayProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="card-expansion-overlay-surface relative flex h-full w-full flex-col overflow-hidden bg-bg-expanded"
      onClick={(event) => event.stopPropagation()}
    >
      <CloseButton onClick={onClose} />
      <div className="relative z-20 flex h-full w-full items-start justify-center overflow-y-auto overscroll-contain px-6 py-6 tablet:px-12 tablet:py-12 desktop:px-16 desktop:py-16">
        <div className="w-full max-w-[800px]">{children}</div>
      </div>
    </div>
  )
}

export default CardExpansionOverlay
