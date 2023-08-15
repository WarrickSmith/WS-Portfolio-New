import Box2 from '../box2/Box2'
import Box3 from '../box3/Box3'
import Box4 from '../box4/Box4'
import Box5 from '../box5/Box5'
import Box3Content from '../box3/Box3Content'
import Box4Content from '../box4/Box4Content'
import Box5Content from '../box5/Box5Content'

export const cards = [
  { id: 1, component: <></> },
  { id: 2, component: <Box2 /> },
  { id: 3, component: <Box3 /> },
  { id: 4, component: <Box4 /> },
  { id: 5, component: <Box5 /> },
]

export const renderChildDiv = (selectedId: number | null) => {
  switch (selectedId) {
    case 3:
      return <Box3Content />
    case 4:
      return <Box4Content />
    case 5:
      return <Box5Content />
    default:
      return null
  }
}
