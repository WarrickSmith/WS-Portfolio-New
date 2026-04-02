import backgroundImage from '../assets/warrick.jpg'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import Card from './common/Card'
import CardGrid from './common/CardGrid'
import DimmedBackdrop from './common/DimmedBackdrop'
import { renderChildDiv, cards } from './common/renderChildDiv'
import CloseButton from './common/CloseButton'

export const MainPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const isClosingRef = useRef(false)

  const handleCardClick = (id: number | null) => {
    if (id === 1 || id === 2) return
    setSelectedId(id)
  }

  const closeCard = () => {
    if (isClosingRef.current || selectedId === null) return

    isClosingRef.current = true
    setSelectedId(null)
  }

  useEffect(() => {
    if (selectedId === null) {
      isClosingRef.current = false
    }
  }, [selectedId])

  useEffect(() => {
    if (selectedId === null) return

    const previousOverflow = document.body.style.overflow
    const previousOverflowX = document.body.style.overflowX
    const previousOverflowY = document.body.style.overflowY

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.overflowX = previousOverflowX
      document.body.style.overflowY = previousOverflowY
    }
  }, [selectedId])

  return (
    <CardGrid>
      {cards.map((card) => {
        const isHeroCard = card.id === 1
        const isStaticCard = card.id === 1 || card.id === 2

        return (
          <Card
            opened={selectedId === card.id}
            interactive={!isStaticCard}
            key={card.id}
            layout
            onClick={() => handleCardClick(card.id)}
            className={cn(
              isHeroCard &&
                'hidden min-h-[22rem] bg-cover bg-center bg-no-repeat tablet:flex tablet:col-span-full desktop:col-span-1 desktop:row-span-2 desktop:min-h-0',
              !isHeroCard &&
                'min-h-32 items-stretch tablet:min-h-[14rem] desktop:min-h-0',
              isStaticCard && 'cursor-default'
            )}
            style={
              isHeroCard
                ? { backgroundImage: `url(${backgroundImage})` }
                : undefined
            }
          >
            {selectedId !== card.id && card.component}
            {selectedId === card.id && (
              <>
                <CloseButton onClick={closeCard} />
                <div>{renderChildDiv(selectedId)}</div>
              </>
            )}
          </Card>
        )
      })}
      <AnimatePresence>
        {selectedId ? (
          <DimmedBackdrop
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={closeCard}
          />
        ) : null}
      </AnimatePresence>
    </CardGrid>
  )
}
