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

  return (
    <CardGrid>
      {cards.map((card) => {
        const isStaticCard = card.id === 1 || card.id === 2

        return (
          <Card
            opened={selectedId === card.id}
            interactive={!isStaticCard}
            key={card.id}
            layout
            onClick={() => handleCardClick(card.id)}
            className={cn(
              card.id === 1
                ? 'hidden row-span-2 bg-cover bg-center min-[1001px]:flex'
                : 'items-center justify-center bg-bg-card max-[768.98px]:min-h-32',
              isStaticCard && 'cursor-default'
            )}
            style={
              card.id === 1
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
