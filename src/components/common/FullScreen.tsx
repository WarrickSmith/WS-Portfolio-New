import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const FullScreenComponentWrapper = styled.div<{
  transformX: string
  transformY: string
}>`
  z-index: 9995;
  position: fixed;
  top: 0;
  left: 33%;
  width: 66.67%;
  height: 100%;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease-out;
  transform: translateX(${(props) => props.transformX})
    translateY(${(props) => props.transformY});
  cursor: default;

  &.open {
    transform: translateX(0) translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
  }
`

const FullScreenContent = styled.div`
  /* Common styles for the content of the FullScreenComponent */
`

const CloseButton = styled.div`
  position: absolute;
  top: 0rem;
  right: 1rem;
  padding: 0rem 1rem;
  color: var(--color);
  background-color: var(--bg-color);
  cursor: pointer;
  font-size: var(--fs-lge);
  font-weight:500;
`

const FullScreenComponent: React.FC<{
  onClose: () => void
  content: React.ReactNode
  transformX: string
  transformY: string
}> = ({ onClose, content, transformX, transformY }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 500)
  }

  return (
    <FullScreenComponentWrapper className={isOpen ? 'open' : ''} transformX={transformX} transformY={transformY} >
      <CloseButton onClick={handleClose}>x</CloseButton>
      <FullScreenContent>{content}</FullScreenContent>
    </FullScreenComponentWrapper>
  )
}

export default FullScreenComponent
