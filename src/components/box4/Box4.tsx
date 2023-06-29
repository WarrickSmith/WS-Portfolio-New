import React from 'react'
import HoverTextWrapper from '../common/HoverTextWrapper'
import HoverText from '../common/HoverText'

const words = ['My', 'Portfolio']

const Box4: React.FC = () => {
  return (
    <HoverTextWrapper>
      <HoverText words={words}></HoverText>
    </HoverTextWrapper>
  )
}

export default Box4
