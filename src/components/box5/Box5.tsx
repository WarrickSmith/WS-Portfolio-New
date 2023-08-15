import HoverText from '../common/HoverText'
import HoverTextWrapper from '../common/HoverTextWrapper'

const words = ['Get', 'In', 'Touch']

const Box5: React.FC = () => {

  return (
        <HoverTextWrapper>
          <HoverText words={words} />
        </HoverTextWrapper>
  )
}

export default Box5
