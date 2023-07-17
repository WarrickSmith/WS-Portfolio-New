// FullScreen.tsx

import React from 'react'
import styled from 'styled-components'

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 2rem;
  color: var(--color);
  cursor: pointer;
  font-size: var(--fs-lge);
`
const FullScreenComponent: React.FC<{
  onClose: () => void
  content: React.ReactNode
}> = ({ onClose, content }) => {
  return (
    <>
      <FullScreenOverlay>
        <CloseButton onClick={onClose}>x</CloseButton>
        {content}
      </FullScreenOverlay>
    </>
  )
}

export default FullScreenComponent
