import React from 'react'
import styled, { css } from 'styled-components'
import BoxContainer from '../common/BoxContainer'
import HoverText from '../common/HoverText'

const words = ['full stack', 'developer']

const Box3: React.FC = () => {
  return (
    <BoxContainer>
      <HoverText>About Me</HoverText>
    </BoxContainer>
  )
}

export default Box3
