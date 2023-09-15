import styled from 'styled-components'
import CloseButtonImage from '../../assets/211651_close_round_icon.svg'

type CloseButtonProps = {
  onClick: () => void
}

export const CloseButton = styled.img<CloseButtonProps>`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  filter: brightness(0) invert(1);
`

export default ({ onClick }: CloseButtonProps) => (
  <CloseButton src={CloseButtonImage} alt="Close" onClick={onClick} />
)
