import { useState, useEffect } from 'react'
import { GridContainer, DimmedLayer, Card } from './common/GridComponents'
import { renderChildDiv, cards } from './common/renderChildDiv'
import CloseButton from './common/CloseButton'

export const MainPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isClosed, setIsClosed] = useState(false)

  const handleCardClick = (id: number | null) => {
    if (id === 1 || id === 2) return
    setSelectedId(id)
  }

  const closeCard = () => {
    setIsClosed(true)
    setSelectedId(null)
  }

  useEffect(() => {
    if (isClosed) {
      setIsClosed(false)
      setSelectedId(null)
    }
  }, [isClosed])

  return (
    <GridContainer>
      {cards.map((card, i) => (
        <Card
          opened={selectedId === card.id}
          key={i}
          layout
          onClick={() => handleCardClick(card.id)}
        >
          {selectedId !== card.id && card.component}
          {selectedId === card.id && !isClosed && (
            <>
              <CloseButton onClick={closeCard}/>
              <div>{renderChildDiv(selectedId)}</div>
            </>
          )}
        </Card>
      ))}
      <DimmedLayer animate={{ opacity: selectedId ? 0.3 : 0 }} />
    </GridContainer>
  )
}
