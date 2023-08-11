import React, { useState } from 'react'
import styled from 'styled-components'
import HoverText from '../common/HoverText'
import HoverTextWrapper from '../common/HoverTextWrapper'
import FullScreenComponent from '../common/FullScreen'
import Box3Content from './Box3Content'

const words = ['About', 'Me']

const Box3: React.FC = () => {
  const [showFullScreen, setShowFullScreen] = useState(false)

  const handleClick = () => {
    setShowFullScreen(true)
  }

  const handleClose = () => {
    setShowFullScreen(false)
  }

  return (
    <>
      {/* {showFullScreen ? (
        <FullScreenComponent
          onClose={handleClose}
          content={Box3Content}
          transformX="50%"
          transformY="-50%"
        />
      ) : ( */}
        <HoverTextWrapper>
          <HoverText words={words} />
        </HoverTextWrapper>
      {/* )} */}
    </>
  )
}


export default Box3
