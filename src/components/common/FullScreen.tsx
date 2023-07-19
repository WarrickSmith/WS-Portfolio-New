// FullScreen.tsx

import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const FullScreenComponentWrapper = styled.div`
  z-index: 9998;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-in;
  cursor: default;
`

const FullScreenContent = styled.div`
  /* Your styles for the content of the FullScreenComponent */
`

const CloseButton = styled.div`
  z-index: 9997;
  position: absolute;
  top: 0rem;
  right: 1rem;
  padding: 0rem 1rem;
  color: var(--color);
  background-color: var(--bg-color);
  cursor: pointer;
  font-size: var(--fs-lge);
`

const FullScreenComponent: React.FC<{
  onClose: () => void
  content: React.ReactNode
}> = ({ onClose, content }) => {
  return (
    <FullScreenComponentWrapper>
      <CloseButton onClick={onClose}>x</CloseButton>
      <FullScreenContent>{content}</FullScreenContent>
    </FullScreenComponentWrapper>
  )
}

export default FullScreenComponent
