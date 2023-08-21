import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import * as icons from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import HoverText from './HoverText'

const TextContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: var(--fs-lge);
  text-transform: uppercase;
`

const DividerContainer = styled.div`
  padding: 3rem 0 0 0;
  width: calc(65.8vw - 1.5rem);

  .center-align {
    margin: 2rem 0;
    text-align: center;
  }
  .divider span {
    display: inline-block;
    vertical-align: middle;
  }
  .outer-line {
    width: 25%;
    border-bottom: 1px solid #666;
  }
  .fa {
    font-size: var(--fs-sm);
    margin: 0 2rem;
    color: var(--color-alt);
  }
`

const iconMap: { [key: string]: IconDefinition } = {
  faSuitcase: icons.faSuitcase,
  faCoffee: icons.faCoffee,
  faIdCard: icons.faIdCard,
  faEnvelopeOpen: icons.faEnvelopeOpen,
}

const CardHeader = ({
  words,
  icon = 'faSuitcase',
}: {
  words: string[]
  icon: string
}) => {
  const IconComponent = iconMap[icon]

  return (
    <DividerContainer>
      <TextContainer>
        <HoverText words={words} />
      </TextContainer>
      <div className="divider center-align">
        <span className="outer-line"></span>
        {IconComponent && (
          <FontAwesomeIcon icon={IconComponent} className="fa" />
        )}
        <span className="outer-line"></span>
      </div>
    </DividerContainer>
  )
}

export default CardHeader
