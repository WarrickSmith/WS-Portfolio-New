import { type ReactNode, type RefObject, useRef } from 'react'
import useFocusTrap from '../../hooks/useFocusTrap'
import CloseButton from './CloseButton'

type CardExpansionOverlayProps = {
  title: string
  onClose: () => void
  children: ReactNode
  closeButtonRef?: RefObject<HTMLButtonElement | null>
}

const CardExpansionOverlay = ({
  title,
  onClose,
  children,
  closeButtonRef,
}: CardExpansionOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useFocusTrap(containerRef)

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="card-expansion-overlay-surface relative flex h-full w-full flex-col overflow-hidden bg-bg-expanded"
      onClick={(event) => event.stopPropagation()}
    >
      <CloseButton ref={closeButtonRef} onClick={onClose} />
      <div className="relative z-20 flex h-full w-full items-start justify-center overflow-y-auto overscroll-contain px-6 py-6 tablet:px-12 tablet:py-12 desktop:px-16 desktop:py-16">
        <div className="w-full max-w-5xl @container/overlay">{children}</div>
      </div>
    </div>
  )
}

export default CardExpansionOverlay
