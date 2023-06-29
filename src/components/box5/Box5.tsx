import React from 'react'
import HoverTextWrapper from '../common/HoverTextWrapper'
import HoverText from '../common/HoverText'

const words = ['get', 'In', 'Touch']

const Box5: React.FC = () => {
  return (
    <HoverTextWrapper>
      <HoverText words={words}></HoverText>
    </HoverTextWrapper>
  )
}

export default Box5
