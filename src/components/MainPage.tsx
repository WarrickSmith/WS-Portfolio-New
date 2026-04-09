import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import {
  type CSSProperties,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  ABOUT_CARD_ID,
  IDENTITY_CARD_ID,
  PORTFOLIO_CARD_ID,
} from '../constants/cardIds'
import type { SkillId } from '../data/personalData'
import type { PortfolioProjectId } from '../data/portfolioData'
import { cn } from '../lib/cn'
import Card from './common/Card'
import CardExpansionOverlay from './common/CardExpansionOverlay'
import CardGrid from './common/CardGrid'
import DimmedBackdrop from './common/DimmedBackdrop'
import {
  cards,
  getCardById,
  renderExpandedCardContent,
} from './common/renderChildDiv'

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

const CROSS_CARD_NAVIGATION_DELAY_MS = 150

const parseGridGap = (value: string): number => {
  const parsedGap = Number.parseFloat(value)
  return Number.isFinite(parsedGap) ? parsedGap : 0
}

export const MainPage = () => {
  const prefersReducedMotion = useReducedMotion()
  const [closeRequestKey, setCloseRequestKey] = useState(0)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [pendingProjectNavigation, setPendingProjectNavigation] =
    useState<PortfolioProjectId | null>(null)
  const [pendingSkillNavigation, setPendingSkillNavigation] =
    useState<SkillId | null>(null)
  const [selectedProjectId, setSelectedProjectId] =
    useState<PortfolioProjectId | null>(null)
  const [selectedSkillId, setSelectedSkillId] = useState<SkillId | null>(null)
  const [openedCardStyle, setOpenedCardStyle] = useState<CSSProperties>()
  const isClosingRef = useRef(false)
  const cardRefs = useRef(new Map<number, HTMLDivElement>())
  const openScrollYRef = useRef(0)
  const triggerCardIdRef = useRef<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const selectedCard = getCardById(selectedId)
  const isOverlayOpen = selectedId !== null

  const calculateOpenedCardStyle = useCallback((): CSSProperties => {
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

    const identityElement = cardRefs.current.get(IDENTITY_CARD_ID)
    const identityRect = identityElement?.getBoundingClientRect()

    if (!identityRect) {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    const cardGrid = identityElement?.closest('[data-card-grid]')
    const computedGridStyle
      = cardGrid instanceof HTMLElement
        ? window.getComputedStyle(cardGrid)
        : null
    const columnGap = computedGridStyle
      ? parseGridGap(computedGridStyle.columnGap)
      : 0
    const rowGap = computedGridStyle
      ? parseGridGap(computedGridStyle.rowGap)
      : 0

    if (window.innerWidth >= 1000) {
      const left = identityRect.right + columnGap
      const rightInset = identityRect.left

      return {
        top: identityRect.top,
        left,
        width: window.innerWidth - left - rightInset,
        height: identityRect.height,
      }
    }

    const top = identityRect.bottom + rowGap
    const bottomInset = identityRect.top

    return {
      top,
      left: identityRect.left,
      width: identityRect.width,
      height: window.innerHeight - top - bottomInset,
    }
  }, [])

  const openCard = useCallback(
    (id: number) => {
      triggerCardIdRef.current = id
      openScrollYRef.current = window.scrollY
      setOpenedCardStyle(calculateOpenedCardStyle())
      setSelectedId(id)
    },
    [calculateOpenedCardStyle]
  )

  const handleCardClick = useCallback(
    (id: number | null) => {
      if (selectedId !== null || id === null || id === IDENTITY_CARD_ID) return

      setPendingProjectNavigation(null)
      setPendingSkillNavigation(null)
      setSelectedProjectId(null)
      setSelectedSkillId(null)
      openCard(id)
    },
    [openCard, selectedId]
  )

  const requestClose = useCallback(() => {
    if (isClosingRef.current || selectedId === null) return

    isClosingRef.current = true
    setCloseRequestKey((currentKey) => currentKey + 1)
  }, [selectedId])

  const handleOverlayExitComplete = useCallback(() => {
    const triggerCardId = triggerCardIdRef.current
    const hasPendingNavigation =
      pendingProjectNavigation !== null || pendingSkillNavigation !== null

    setSelectedId(null)

    if (!hasPendingNavigation && triggerCardId !== null) {
      requestAnimationFrame(() => {
        const triggerElement = cardRefs.current.get(triggerCardId)
        triggerElement?.focus({ focusVisible: true } as FocusOptions)
      })
    }
  }, [pendingProjectNavigation, pendingSkillNavigation])

  const handleNavigateToProject = useCallback(
    (projectId: PortfolioProjectId) => {
      if (selectedId !== ABOUT_CARD_ID) return

      setPendingSkillNavigation(null)
      setSelectedSkillId(null)
      setPendingProjectNavigation(projectId)
      requestClose()
    },
    [requestClose, selectedId]
  )

  const handleNavigateToSkill = useCallback(
    (skillId: SkillId) => {
      if (selectedId !== PORTFOLIO_CARD_ID) return

      setPendingProjectNavigation(null)
      setSelectedProjectId(null)
      setPendingSkillNavigation(skillId)
      requestClose()
    },
    [requestClose, selectedId]
  )

  useEffect(() => {
    if (selectedId === null) {
      isClosingRef.current = false
      setOpenedCardStyle(undefined)
    }
  }, [selectedId])

  useEffect(() => {
    if (selectedId !== null) return

    if (
      pendingProjectNavigation === null &&
      pendingSkillNavigation === null
    ) {
      setSelectedProjectId(null)
      setSelectedSkillId(null)
      return
    }

    const completePendingNavigation = () => {
      if (pendingProjectNavigation !== null) {
        setSelectedProjectId(pendingProjectNavigation)
        setSelectedSkillId(null)
        setPendingProjectNavigation(null)
        openCard(PORTFOLIO_CARD_ID)
        return
      }

      if (pendingSkillNavigation !== null) {
        setSelectedSkillId(pendingSkillNavigation)
        setSelectedProjectId(null)
        setPendingSkillNavigation(null)
        openCard(ABOUT_CARD_ID)
      }
    }

    if (prefersReducedMotion) {
      completePendingNavigation()
      return
    }

    // Keep the card grid visible for a beat between overlay transitions.
    const timeoutId = window.setTimeout(
      completePendingNavigation,
      CROSS_CARD_NAVIGATION_DELAY_MS
    )

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [
    openCard,
    pendingProjectNavigation,
    pendingSkillNavigation,
    prefersReducedMotion,
    selectedId,
  ])

  useEffect(() => {
    if (!isOverlayOpen) return

    let attempt = 0
    let timeoutId: number | null = null

    const tryFocus = () => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus()
        return
      }

      attempt += 1
      if (attempt < 5) {
        timeoutId = window.setTimeout(tryFocus, 50)
      }
    }

    timeoutId = window.setTimeout(tryFocus, 50)

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [isOverlayOpen])

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

    let frameId: number | null = null

    const syncOpenedCardStyle = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }

      frameId = window.requestAnimationFrame(() => {
        setOpenedCardStyle(calculateOpenedCardStyle())
      })
    }

    syncOpenedCardStyle()
    window.addEventListener('resize', syncOpenedCardStyle)
    window.addEventListener('orientationchange', syncOpenedCardStyle)

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }

      window.removeEventListener('resize', syncOpenedCardStyle)
      window.removeEventListener('orientationchange', syncOpenedCardStyle)
    }
  }, [calculateOpenedCardStyle, isOverlayOpen])

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

  const expandedContent = selectedCard
    ? renderExpandedCardContent(selectedCard.id, {
        onNavigateToProject: handleNavigateToProject,
        onNavigateToSkill: handleNavigateToSkill,
        selectedProjectId,
        selectedSkillId,
      })
    : null

  return (
    <MotionConfig reducedMotion="user">
      <CardGrid>
      {cards.map((card) => {
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
            isExpanded={isSelected}
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
                <CardExpansionOverlay title={card.title} onClose={requestClose} closeButtonRef={closeButtonRef}>
                  <Suspense fallback={<OverlayFallback title={card.title} />}>
                    {expandedContent ? (
                      expandedContent
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
              'min-h-32 items-stretch tablet:min-h-[14rem] desktop:min-h-0',
              isStaticCard && !isSelected && 'cursor-default',
              backgroundInert && 'pointer-events-none select-none',
              card.gridClassName
            )}
            style={isSelected ? openedCardStyle : undefined}
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
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            onClick={requestClose}
          />
        ) : null}
      </AnimatePresence>
      </CardGrid>
    </MotionConfig>
  )
}
