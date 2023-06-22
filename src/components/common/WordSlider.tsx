import React, { useState, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`

const slideOut = keyframes`
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

interface TextProps {
  animateIn: boolean
  animateOut: boolean
}

const Text = styled.span<TextProps>`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-alt);
  animation-duration: 1s;
  animation-fill-mode: forwards;

  ${({ animateIn, animateOut }) =>
    css`
      ${animateIn &&
      css`
        animation-name: ${slideIn};
      `}

      ${animateOut &&
      css`
        animation-name: ${slideOut};
      `}
    `}
`

interface WordSliderProps {
  words: string[]
}

const WordSlider: React.FC<WordSliderProps> = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [animateIn, setAnimateIn] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateOut(true)

      setTimeout(() => {
        setAnimateOut(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        setAnimateIn(true)
      }, 1000)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [words])

  useEffect(() => {
    if (animateIn) {
      setTimeout(() => {
        setAnimateIn(false)
      }, 1000)
    }
  }, [animateIn])

  return (
    <TextContainer>
      <Text animateIn={animateIn} animateOut={animateOut}>
        {words[currentWordIndex]}
      </Text>
    </TextContainer>
  )
}

export default WordSlider

