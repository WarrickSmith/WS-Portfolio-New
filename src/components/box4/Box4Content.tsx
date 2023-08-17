import styled from 'styled-components'
import image1 from '../../assets/reservationizr.jpg'

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  /* grid-template-columns: repeat(auto-fit, minmax(768px, 2fr)); */
  /* gap: 1.5rem; */
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-top: 4rem;
  }
`
const AppImage = styled.img`
  padding: 1rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 1.5rem;
  cursor: pointer;
`
const Box4Content = () => {
return (
  <ImageContainer>
    <AppImage src={image1} />
    <AppImage src={image1} />
    <AppImage src={image1} />
  </ImageContainer>
)
}

export default Box4Content
