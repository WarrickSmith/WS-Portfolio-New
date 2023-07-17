import React, { useState } from 'react'
import styled from 'styled-components'
import HoverText from '../common/HoverText'
import HoverTextWrapper from '../common/HoverTextWrapper'
import FullScreenComponent from '../common/FullScreen'

const words = ['Get', 'In', 'Touch']

const Box5: React.FC = () => {
  const [showFullScreen, setShowFullScreen] = useState(false)

  const handleClick = () => {
    setShowFullScreen(true)
  }

  const handleClose = () => {
    setShowFullScreen(false)
  }

  const Content = styled.div`
    color: var(--color-alt);
    font-size: var(--fs-lge);
  `
  const content = <Content>Box5 Content</Content>

  return (
    <>
      {showFullScreen ? (
        <FullScreenComponent onClose={handleClose} content={content} />
      ) : (
        <HoverTextWrapper onClick={handleClick}>
          <HoverText words={words} />
        </HoverTextWrapper>
      )}
    </>
  )
}


export default Box5
