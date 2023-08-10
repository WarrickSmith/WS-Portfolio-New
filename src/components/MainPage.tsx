import { useState, useRef } from 'react'
import { GridContainer, DimmedLayer, Card } from './common/GridComponents'
import Box2 from './box2/Box2'
import Box3 from './box3/Box3'
import Box4 from './box4/Box4'
import Box5 from './box5/Box5'

const cards = [
  { id: 1, component: <></> },
  { id: 2, component: <Box2 /> },
  { id: 3, component: <Box3 /> },
  { id: 4, component: <Box4 /> },
  { id: 5, component: <Box5 /> },
]

const renderChildDiv = (selectedId: number | null) => {
  switch (selectedId) {
    case 3:
      return <h1>Child Div for Card 3</h1>
    case 4:
      return <h1>Child Div for Card 4</h1>
    case 5:
      return <h1>Child Div for Card 5</h1>
    default:
      return null
  }
}

export const MainPage = () => {
  const containerRefs = useRef(new Array())
  const [selectedId, setSelectedId] = useState<number | null>(null)

  if (selectedId === 1 || selectedId === 2) setSelectedId(null)

  return (
    <GridContainer>
      {cards.map((card, i) => (
        <Card
          opened={selectedId === card.id}
          key={i}
          layout
          ref={(el) => (containerRefs.current[card.id] = el)}
          onClick={() => setSelectedId(selectedId === card.id ? null : card.id)}
        >
          {selectedId !== card.id && card.component}
          {selectedId === card.id && (
            <>
              <div> X </div>
              <div>{renderChildDiv(selectedId)}</div>
            </>
          )}
        </Card>
      ))}
      <DimmedLayer animate={{ opacity: selectedId ? 0.3 : 0 }} />
    </GridContainer>
  )
}
