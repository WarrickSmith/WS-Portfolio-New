import HoverText from '../common/HoverText'
import HoverTextWrapper from '../common/HoverTextWrapper'

const words = ['About', 'Me']

const Box3: React.FC = () => {

  return (
        <HoverTextWrapper>
          <HoverText words={words} />
        </HoverTextWrapper>
  )
}

export default Box3
