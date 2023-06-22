import React from 'react'
import styled, { css } from 'styled-components'
import BoxContainer from '../common/BoxContainer'
import HoverText from '../common/HoverText'

const Intro = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 400;
`

const MyName = styled.span`
  display: inline-block;
  font-size: 3rem;
  font-weight: 700;
`

const words = ['full stack', 'developer']

const Box3: React.FC = () => {
  return (
    <BoxContainer>
      <HoverText>About Me</HoverText>
    </BoxContainer>
  )
}

export default Box3
