import React from 'react'
import styled, { css } from 'styled-components'
import BoxContainer from '../common/BoxContainer'
import WordSlider from '../common/WordSlider'

const Intro = styled.span`
  display: inline-block;
  font-size: var(--fs-sm);
  font-weight: 400;
`

const MyName = styled.span`
  display: inline-block;
  font-size: var(--fs-lge);
  font-weight: 700;
`

const words = ['full stack', 'developer']

const Box2: React.FC = () => {
  return (
    <BoxContainer>
      <Intro>Hi There! - I'm</Intro>
      <MyName>Warrick Smith</MyName>
      <WordSlider words={words} />
    </BoxContainer>
  )
}

export default Box2