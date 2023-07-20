import React, { useState } from 'react'
import styled from 'styled-components'
import HoverText from '../common/HoverText'
import HoverTextWrapper from '../common/HoverTextWrapper'
import FullScreenComponent from '../common/FullScreen'
import Box4Content from './Box4Content'

const words = ['My', 'Portfolio']

const Box4: React.FC = () => {
  const [showFullScreen, setShowFullScreen] = useState(false)

  const handleClick = () => {
    setShowFullScreen(true)
  }

  const handleClose = () => {
    setShowFullScreen(false)
  }

  return (
    <>
      {showFullScreen ? (
        <FullScreenComponent onClose={handleClose} content={Box4Content} />
      ) : (
        <HoverTextWrapper onClick={handleClick}>
          <HoverText words={words} />
        </HoverTextWrapper>
      )}
    </>
  )
}


export default Box4
