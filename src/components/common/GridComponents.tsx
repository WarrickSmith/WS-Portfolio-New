import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import backgroundImage from '../../assets/warrick.jpg'

interface CardProps {
  opened: boolean
}

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: calc(100% - 3rem);
  height: calc(100% - 3rem);
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`

export const DimmedLayer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: black;
  opacity: 0;
  pointer-events: none;
`

export const Card = styled(motion.div)<CardProps>`
  display: grid;
  place-items: center;
  background-color: var(--bg-color-alt);
  border: 2px solid var(--color);
  border-radius: 1.5rem;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:nth-child(1) {
    grid-row: span 2;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
  }

  @media (max-width: 768px) {
    &:nth-child(1) {
      display: none;
    }
  }

  ${(props) =>
    props.opened &&
    css`
      display: grid;
      place-items: center;
      color: var(--color);
      background-color: grey;
      border: 2px solid var(--color);
      border-radius: 1.5rem;
      cursor: pointer;
      height: calc(100vh - 7rem);
      width: calc(100vw - 7em);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 10;
    `}
`
