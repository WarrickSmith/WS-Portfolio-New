import styled, { keyframes } from 'styled-components'

const explodeAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.2;
    transform: scale(1.8);
  }
`

const implodeAnimation = keyframes`
  0% {
    opacity: 0.2;
    transform: scale(1.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const neonGlow = `
  text-shadow:
    0 0 5px var(--color),
    0 0 10px var(--color),
    0 0 15px var(--color),
    0 0 20px var(--color-alt),
    0 0 30px var(--color-alt),
    0 0 40px var(--color-alt),
    0 0 50px var(--color-alt),
    0 0 75px var(--color-alt);
`

const neonGlowOff = keyframes`
  0% {
    text-shadow: none;
  }
  100% {
    text-shadow: none;
  }
`

const HoverTextWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-med);
  text-transform: uppercase;
  width: 100%;
  height: 100%;

  transition: text-shadow 1s ease-out;
  position: relative;
  &:hover {
    animation: ${explodeAnimation} 0.5s forwards,
      ${implodeAnimation} 0.5s forwards 0.5s, ${neonGlowOff} 0.5s forwards 1s;
    text-shadow: 0 0 5px var(--color), 0 0 10px var(--color),
      0 0 15px var(--color), 0 0 20px var(--color-alt),
      0 0 30px var(--color-alt), 0 0 40px var(--color-alt),
      0 0 50px var(--color-alt), 0 0 75px var(--color-alt);
  }
  &:hover:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: opacity 1s ease-out;
    opacity: 0;
  }
  &:hover:not(:active):after {
    opacity: 1;
  }
`

export default HoverTextWrapper
