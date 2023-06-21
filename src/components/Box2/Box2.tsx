import React from 'react'
import styled, { css } from 'styled-components'
import WordSlider from '../common/WordSlider'

const Container = styled.div`
  text-transform: uppercase;
  color: white;
  transition: all 2.5s ease-in-out;
`

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

const Box2: React.FC = () => {
  return (
    <Container>
      <Intro>Hi There! - I'm</Intro>
      <MyName>Warrick Smith</MyName>
      <WordSlider words={words} />
    </Container>
  )
}

export default Box2
