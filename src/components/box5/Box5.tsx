import React, { useState } from 'react'
import styled from 'styled-components'
import HoverText from '../common/HoverText'
import HoverTextWrapper from '../common/HoverTextWrapper'
import FullScreenComponent from '../common/FullScreen'
import Box5Content from './Box5Content'

const words = ['Get', 'In', 'Touch']

const Box5: React.FC = () => {
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
        <FullScreenComponent onClose={handleClose} content={Box5Content} />
      ) : (
        <HoverTextWrapper onClick={handleClick}>
          <HoverText words={words} />
        </HoverTextWrapper>
      )}
    </>
  )
}


export default Box5
