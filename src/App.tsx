import { useEffect, useState } from 'react'
import { MainContainer } from './components/common/GridComponents'
import { MainPage } from './components/MainPage'
import { VisitorTracker } from './components/VisitorTracker'

const App = () => {
  const [containerHeight, setContainerHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <MainContainer height={containerHeight}>
      <VisitorTracker />
      <MainPage />
    </MainContainer>
  )
}

export default App
