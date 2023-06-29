import React from 'react'
import HoverText from '../common/HoverText'
import HoverTextWrapper from '../common/HoverTextWrapper'

const words = ['About', 'Me']

const Box3: React.FC = () => {
  return (
    <HoverTextWrapper> 
      <HoverText words={words}></HoverText>
    </HoverTextWrapper>
  )
}

export default Box3
