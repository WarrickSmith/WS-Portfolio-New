import backgroundImage from '../assets/warrick.jpg'
import { AnimatePresence } from 'framer-motion'
import {
  type CSSProperties,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '../lib/cn'
import Card from './common/Card'
import CardExpansionOverlay from './common/CardExpansionOverlay'
import CardGrid from './common/CardGrid'
import DimmedBackdrop from './common/DimmedBackdrop'
import { cards, getCardById } from './common/renderChildDiv'

type OverlayFallbackProps = {
  title: string
  message?: string
}

const OverlayFallback = ({
  title,
  message = `Loading ${title}...`,
}: OverlayFallbackProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="card-expansion-loading-panel rounded-lg px-5 py-4 text-body-sm text-text-secondary"
    >
      {message}
    </div>
  )
}

export const MainPage = () => {
  const [closeRequestKey, setCloseRequestKey] = useState(0)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [openedCardStyle, setOpenedCardStyle] = useState<CSSProperties>()
  const isClosingRef = useRef(false)
  const cardRefs = useRef(new Map<number, HTMLDivElement>())
  const openScrollYRef = useRef(0)

  const selectedCard = getCardById(selectedId)
  const SelectedContent = selectedCard?.expandedContent ?? null
  const isOverlayOpen = selectedId !== null

  const calculateOpenedCardStyle = (): CSSProperties => {
    if (typeof window === 'undefined') {
      return { top: 0, left: 0, width: 0, height: 0 }
    }

    if (window.innerWidth < 768) {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    const heroRect = cardRefs.current.get(1)?.getBoundingClientRect()
    const firstInteractiveRect = cardRefs.current
      .get(2)
      ?.getBoundingClientRect()

    if (!heroRect || !firstInteractiveRect) {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    if (window.innerWidth >= 1000) {
      const horizontalGap = Math.max(firstInteractiveRect.left - heroRect.right, 0)
      const left = heroRect.right + horizontalGap
      const rightInset = heroRect.left

      return {
        top: heroRect.top,
        left,
        width: window.innerWidth - left - rightInset,
        height: heroRect.height,
      }
    }

    const verticalGap = Math.max(firstInteractiveRect.top - heroRect.bottom, 0)
    const top = heroRect.bottom + verticalGap
    const bottomInset = heroRect.top

    return {
      top,
      left: heroRect.left,
      width: heroRect.width,
      height: window.innerHeight - top - bottomInset,
    }
  }

  const handleCardClick = useCallback(
    (id: number | null) => {
      if (selectedId !== null || id === null || id === 1 || id === 2) return

      openScrollYRef.current = window.scrollY
      setOpenedCardStyle(calculateOpenedCardStyle())
      setSelectedId(id)
    },
    [selectedId]
  )

  const requestClose = useCallback(() => {
    if (isClosingRef.current || selectedId === null) return

    isClosingRef.current = true
    setCloseRequestKey((currentKey) => currentKey + 1)
  }, [selectedId])

  const handleOverlayExitComplete = useCallback(() => {
    setSelectedId(null)
  }, [])

  useEffect(() => {
    if (selectedId === null) {
      isClosingRef.current = false
      setOpenedCardStyle(undefined)
    }
  }, [selectedId])

  useEffect(() => {
    if (!isOverlayOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      requestClose()
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOverlayOpen, requestClose])

  useEffect(() => {
    if (!isOverlayOpen) return

    const scrollY = openScrollYRef.current
    const previousOverflow = document.body.style.overflow
    const previousOverflowX = document.body.style.overflowX
    const previousOverflowY = document.body.style.overflowY
    const previousPosition = document.body.style.position
    const previousTop = document.body.style.top
    const previousLeft = document.body.style.left
    const previousRight = document.body.style.right
    const previousWidth = document.body.style.width

    document.body.style.overflow = 'hidden'
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.overflowX = previousOverflowX
      document.body.style.overflowY = previousOverflowY
      document.body.style.position = previousPosition
      document.body.style.top = previousTop
      document.body.style.left = previousLeft
      document.body.style.right = previousRight
      document.body.style.width = previousWidth
      window.scrollTo(0, scrollY)
    }
  }, [isOverlayOpen])

  return (
    <CardGrid>
      {cards.map((card) => {
        const isHeroCard = card.id === 1
        const isStaticCard = !card.interactive
        const isSelected = selectedId === card.id
        const backgroundInert = isOverlayOpen && !isSelected
        const cardInteractive = card.interactive && !backgroundInert

        return (
          <Card
            ref={(node) => {
              if (node) {
                cardRefs.current.set(card.id, node)
              } else {
                cardRefs.current.delete(card.id)
              }
            }}
            data-card-id={card.id}
            data-card-trigger-id={card.id}
            aria-hidden={backgroundInert ? 'true' : undefined}
            inert={backgroundInert || undefined}
            opened={isSelected}
            interactive={cardInteractive}
            key={card.id}
            layout
            closeRequestKey={isSelected ? closeRequestKey : undefined}
            expansionPreset={card.expansionPreset}
            onOverlayExitComplete={
              isSelected ? handleOverlayExitComplete : undefined
            }
            onClick={cardInteractive ? () => handleCardClick(card.id) : undefined}
            overlay={
              isSelected && selectedCard?.id === card.id ? (
                <CardExpansionOverlay title={card.title} onClose={requestClose}>
                  <Suspense fallback={<OverlayFallback title={card.title} />}>
                    {SelectedContent ? (
                      <SelectedContent />
                    ) : (
                      <OverlayFallback
                        title={card.title}
                        message={`Detailed content for ${card.title} is coming soon.`}
                      />
                    )}
                  </Suspense>
                </CardExpansionOverlay>
              ) : undefined
            }
            className={cn(
              isHeroCard &&
                'hidden min-h-[22rem] bg-cover bg-center bg-no-repeat tablet:flex tablet:col-span-full desktop:col-span-1 desktop:row-span-2 desktop:min-h-0',
              !isHeroCard &&
                'min-h-32 items-stretch tablet:min-h-[14rem] desktop:min-h-0',
              isStaticCard && !isSelected && 'cursor-default',
              backgroundInert && 'pointer-events-none select-none'
            )}
            style={
              isSelected
                ? openedCardStyle
                : isHeroCard
                  ? { backgroundImage: `url(${backgroundImage})` }
                  : undefined
            }
          >
            {card.preview}
          </Card>
        )
      })}
      <AnimatePresence>
        {isOverlayOpen ? (
          <DimmedBackdrop
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={requestClose}
          />
        ) : null}
      </AnimatePresence>
    </CardGrid>
  )
}
