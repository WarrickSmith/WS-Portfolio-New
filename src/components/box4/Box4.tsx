import HoverText from '../common/HoverText'
import HoverTextWrapper from '../common/HoverTextWrapper'

const words = ['My', 'Portfolio']

const Box4: React.FC = () => {

  return (
        <HoverTextWrapper>
          <HoverText words={words} />
        </HoverTextWrapper>
  )
}

export default Box4
