import styled from 'styled-components'
import HoverText from './HoverText'
import FaIcon from '../common/FaIcon'

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
  .fa-icon {
    font-size: var(--fs-sm);
    margin: 0 2rem;
    color: var(--color-alt);
  }
  @media (max-width: 1000px) {
    width: calc(100vw - 1.5rem);
  }
`

const CardHeader = ({
  words,
  icon = 'faSuitcase',
}: {
  words: string[]
  icon: string
}) => {
  return (
    <DividerContainer>
      <TextContainer>
        <HoverText words={words} />
      </TextContainer>
      <div className="divider center-align">
        <span className="outer-line"></span>
        <FaIcon icon={icon} className="fa-icon" />
        <span className="outer-line"></span>
      </div>
    </DividerContainer>
  )
}

export default CardHeader
